import { useState, useEffect, useCallback, useRef } from 'react'
import { GameState, GameStats, Anomaly, AnomalyCategory } from '../types/game'
import {
  DEFAULT_CONFIG,
  CAMERAS,
  msToGameTime,
  getGamePhase,
} from '../utils/gameConfig'
import {
  CHILD_FLAG,
  isChildFound,
  judgeTimeUp,
  pacingFor,
} from '../utils/endingJudge'
import { load } from '../utils/saveData'
import { STAGE_FLAGS } from '../data/investigationNotes'
import nonImageLedger from 'virtual:non-image-anomalies'
import {
  REIWA_UNLOCK_FLAG,
  createAnomaly,
  createNonImageAnomaly,
  exhaustedGroups,
  groupKeyOfSpawn,
  hasUnusedEntry,
  pickSpawn,
  storyPersonFor,
} from '../utils/anomalyData'
import { reportTargetsFor, showsOnCamera } from '../utils/reportTarget'
import { isAudible } from '../utils/audioSettings'
import { hasFinePointer, monitorEffectPlayable } from '../utils/monitorEffects'
import { resetVoiceHistory, voiceReady } from '../utils/voiceSounds'
import type { FlagEvent } from './useSubtitle'
import {
  duePerson,
  flagOfTrigger,
  raiseFlagsAtStart,
  raiseTrigger,
  recordFound,
  recordShiftEnd,
  shiftDurationMs,
  recordEndingReached,
  unretire,
} from '../utils/shiftProgress'
import {
  ANOMALY_LEDGER,
  overlayUrlFor,
  preloadOverlays,
} from '../data/anomalyLedger'

export type FeedbackKind = 'correct' | 'wrong' | null

export interface Feedback {
  id: number
  kind: Exclude<FeedbackKind, null>
  message: string
  /** Wrong reports only: the anomaly showing on the watched camera at that moment (null = none). */
  anomalyId?: string | null
}

const TOAST_MS = 1500
/** When a spawn could not happen only for lack of a free camera, try again after this (not every frame). */
const SPAWN_RETRY_MS = 1000
/** How often the game looks whether a story person (#430) may appear now (real time; they come "at once"). */
const PERSON_CHECK_MS = 250

/** How a shift ended: the closing conversation to play, and the result screen that follows. */
export interface Ending {
  closing: 'dawn' | 'withdraw' | 'ending'
  outcome: 'win' | 'lose'
}

/** Remember the story-stage flags among `names` (investigation note, #297). */
const noteStageFlags = (into: string[], names: string[]) => {
  for (const n of names) {
    if ((STAGE_FLAGS as readonly string[]).includes(n) && !into.includes(n))
      into.push(n)
  }
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [stats, setStats] = useState<GameStats>({
    currentTime: 0,
    correctReports: 0,
    misreports: 0,
    totalAnomalies: 0,
    detectedAnomalies: 0,
  })
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0)
  const [activeAnomalies, setActiveAnomalies] = useState<Anomaly[]>([])
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [ending, setEnding] = useState<Ending | null>(null)
  const [flagEvent, setFlagEvent] = useState<FlagEvent | null>(null)

  // Refs hold the latest game state so the rAF loop and event handlers
  // avoid stale closures without forcing the loop to be re-created on every spawn.
  const startTimeRef = useRef<number>(0)
  const lastAnomalyTimeRef = useRef<number>(0)
  const firstSpawnDoneRef = useRef<boolean>(false)
  const statsRef = useRef(stats)
  const currentIndexRef = useRef(currentCameraIndex)
  const activeAnomaliesRef = useRef(activeAnomalies)
  const feedbackIdRef = useRef(0)
  const flagSeqRef = useRef(0)
  // Set when the shift is over (the closing conversation is playing); blocks further reports and a second end.
  const endedRef = useRef(false)
  // Set when the false-report limit is reached: reports stop being accepted while the withdraw ending is pending.
  const misreportCapRef = useRef(false)
  const endingRef = useRef<Ending | null>(null)
  // Set once every ledger entry has been used: spawning stops for the rest of the shift.
  const ledgerExhaustedRef = useRef(false)
  // Ledger ids already shown this shift (no repeats within a shift).
  const usedLedgerIdsRef = useRef<Set<string>>(new Set())
  // Per group (#427): the id found last before the group was refilled, avoided on the next draw from that group.
  // Deliberately kept across shifts and START OVER (the ref lives as long as the page): it is only a one-draw preference
  // for variety, never a rule, and a draw falls back to it when the group has no other choice.
  const avoidNextRef = useRef<Map<string, string>>(new Map())
  // The child has been found (flag saved): the rest of this shift, and later shifts, run faster (Issue #86).
  const childFoundRef = useRef(false)
  // Ids that appeared after the child was found in this shift, and how many of them were reported.
  const afterChildIdsRef = useRef<Set<string>>(new Set())
  const afterChildReportedRef = useRef(0)
  // For the investigation note (#297): distinct finds before this shift, and the story-stage flags raised in it.
  const lastPersonCheckRef = useRef(0)
  // The child's foreshadowing conversation (the `childDue` trigger flag) has been played to its end (#430).
  const preludeDoneRef = useRef(false)
  const startUniqueRef = useRef(0)
  const raisedRef = useRef<string[]>([])

  useEffect(() => {
    statsRef.current = stats
  }, [stats])
  useEffect(() => {
    currentIndexRef.current = currentCameraIndex
  }, [currentCameraIndex])
  useEffect(() => {
    activeAnomaliesRef.current = activeAnomalies
  }, [activeAnomalies])

  /**
   * Take back a running anomaly that can never be shown (a voice whose file failed to load for good, #407): it counts
   * as if it never appeared - gone from the slots, the cap, the REPORT lamp and the false-report check - and its id
   * stays used, so it is not drawn again this shift. A reported or unknown id is left alone.
   */
  const withdrawAnomaly = useCallback((id: string) => {
    if (!activeAnomaliesRef.current.some(a => a.id === id && !a.detectedAt))
      return
    activeAnomaliesRef.current = activeAnomaliesRef.current.filter(
      a => a.id !== id || a.detectedAt
    )
    setActiveAnomalies(prev => prev.filter(a => a.id !== id || a.detectedAt))
    setStats(prev => ({
      ...prev,
      totalAnomalies: Math.max(0, prev.totalAnomalies - 1),
    }))
    afterChildIdsRef.current.delete(id)
  }, [])

  const startGame = useCallback(() => {
    // After the true ending the save cannot start a shift; the title offers "start over" only (#294).
    if (load().endingReached) return
    resetVoiceHistory()
    setStats({
      currentTime: 0,
      correctReports: 0,
      misreports: 0,
      totalAnomalies: 0,
      detectedAnomalies: 0,
    })
    usedLedgerIdsRef.current = new Set()
    ledgerExhaustedRef.current = false
    afterChildIdsRef.current = new Set()
    afterChildReportedRef.current = 0
    setActiveAnomalies([])
    setFeedback(null)
    setEnding(null)
    endedRef.current = false
    misreportCapRef.current = false
    endingRef.current = null
    // Flags that became true between shifts (loop-based ones) cut in once the shift is running.
    const raised = raiseFlagsAtStart()
    raisedRef.current = []
    noteStageFlags(raisedRef.current, raised)
    startUniqueRef.current = load().foundIds.length
    // The flag is saved, so a shift that starts after the child was found is a "child found" shift from the start.
    childFoundRef.current = isChildFound(load().flags)
    lastPersonCheckRef.current = 0
    {
      // Played in an earlier shift (raised and no longer waiting) counts as done; one waiting plays at this start.
      const prelude = flagOfTrigger('childDue')
      const cur = load()
      preludeDoneRef.current =
        prelude !== undefined &&
        cur.flags[prelude] === true &&
        !cur.pendingStories.includes(prelude)
    }
    flagSeqRef.current += 1
    setFlagEvent(
      raised.length > 0 ? { seq: flagSeqRef.current, flags: raised } : null
    )
    setCurrentCameraIndex(0)
    startTimeRef.current = Date.now()
    lastAnomalyTimeRef.current = 0
    firstSpawnDoneRef.current = false
    setGameState('playing')
  }, [])

  const switchCamera = useCallback((direction: 'next' | 'prev' | number) => {
    const length = CAMERAS.length
    setCurrentCameraIndex(prev => {
      if (typeof direction === 'number') {
        return Math.max(0, Math.min(length - 1, direction))
      }
      if (direction === 'next') return (prev + 1) % length
      return prev === 0 ? length - 1 : prev - 1
    })
  }, [])

  const pushFeedback = useCallback(
    (
      kind: Exclude<FeedbackKind, null>,
      message: string,
      anomalyId?: string | null
    ) => {
      feedbackIdRef.current += 1
      setFeedback({ id: feedbackIdRef.current, kind, message, anomalyId })
    },
    []
  )

  const clearFeedback = useCallback((id: number) => {
    setFeedback(prev => (prev && prev.id === id ? null : prev))
  }, [])

  /**
   * The shift is over: count the loop and hand over to the closing conversation (`Cabinet` plays it,
   * then calls `finishEnding`). 'dawn' = time ran out, 'withdraw' = too many false reports,
   * 'ending' = time ran out after the child was found without reporting any anomaly that appeared
   * since (Issue #86; it counts as a win and one loop, like dawn).
   */
  const endShift = useCallback(
    (closing: Ending['closing'], outcome: Ending['outcome']) => {
      if (endedRef.current) return
      endedRef.current = true
      recordShiftEnd({
        found: statsRef.current.correctReports,
        fresh: Math.max(0, load().foundIds.length - startUniqueRef.current),
        misreports: statsRef.current.misreports,
        durationMs: shiftDurationMs(closing, statsRef.current.currentTime),
        closing,
        raised: [...raisedRef.current],
      })
      if (closing === 'ending') recordEndingReached()
      const e = { closing, outcome }
      endingRef.current = e
      setEnding(e)
      setGameState('ending')
    },
    []
  )

  const returnToTitle = useCallback(() => setGameState('idle'), [])

  const finishEnding = useCallback(() => {
    const e = endingRef.current
    if (e) setGameState(e.outcome)
  }, [])

  // Ref-symmetric report — same pattern as the game loop, so we never depend on
  // freshly-rendered `cameras` / `activeAnomalies` props inside the callback.
  const reportAnomaly = useCallback(
    (category: AnomalyCategory) => {
      if (endedRef.current || misreportCapRef.current) return
      const currentCamera = CAMERAS[currentIndexRef.current]
      // Camera-scope anomalies count only on the watched camera; monitor-scope ones from any camera (#77).
      const { hit: anomalyOnCamera, shown } = reportTargetsFor(
        activeAnomaliesRef.current,
        currentCamera.id,
        category
      )

      if (anomalyOnCamera) {
        setStats(prev => ({
          ...prev,
          correctReports: prev.correctReports + 1,
          detectedAnomalies: prev.detectedAnomalies + 1,
        }))
        const raised = recordFound(anomalyOnCamera.id)
        // The ref is updated here too (not only by the effect after render), so a withdrawal in the same tick sees
        // this anomaly as reported and leaves it alone.
        const reportedAt = statsRef.current.currentTime
        const markReported = (list: Anomaly[]) =>
          list.map(a =>
            a.id === anomalyOnCamera.id
              ? {
                  ...a,
                  detectedAt: reportedAt,
                  // A story person stays on screen until its conversation has ended (#430) - but only when this
                  // report raised its flag now, so a conversation is queued that will end (not when another tab
                  // had already raised it).
                  ...(a.storyFlag && raised.includes(a.storyFlag)
                    ? { hold: true }
                    : {}),
                }
              : a
          )
        activeAnomaliesRef.current = markReported(activeAnomaliesRef.current)
        // The state update is a function of the latest state (not the ref's value), so an anomaly that spawned in
        // the same batch is not overwritten.
        setActiveAnomalies(markReported)
        // The category the player chose, never the ledger's first one: a ledger may accept several, and the
        // player must not see that (#423).
        pushFeedback('correct', `CONFIRMED — ${category}`)
        if (afterChildIdsRef.current.has(anomalyOnCamera.id)) {
          afterChildReportedRef.current += 1
        }
        noteStageFlags(raisedRef.current, raised)
        if (raised.includes(CHILD_FLAG)) childFoundRef.current = true
        if (raised.length > 0) {
          flagSeqRef.current += 1
          setFlagEvent({ seq: flagSeqRef.current, flags: raised })
        }
        return
      }

      // A story person already reported is still on screen while its conversation runs (#430): pressing its category
      // again is ignored, not a false report (and it does not stop the conversation).
      if (
        activeAnomaliesRef.current.some(
          a =>
            a.hold &&
            showsOnCamera(a, currentCamera.id) &&
            (a.categories ?? [a.category]).includes(category)
        )
      )
        return

      // Misreport — pure state, no setGameState inside the updater (React StrictMode safe).
      const newMisreports = statsRef.current.misreports + 1
      setStats(prev => ({ ...prev, misreports: prev.misreports + 1 }))
      const reason = shown ? 'WRONG CATEGORY' : 'NO ANOMALY HERE'
      pushFeedback('wrong', `FALSE REPORT — ${reason}`, shown?.id ?? null)
      if (newMisreports >= DEFAULT_CONFIG.maxMisreports) {
        misreportCapRef.current = true
        // Brief delay so the result OSD is visible before the game-over screen.
        window.setTimeout(() => endShift('withdraw', 'lose'), TOAST_MS)
      }
    },
    [pushFeedback, endShift]
  )

  /** A flag raised by the game itself (a trigger, #430): hand it to the subtitles like a flag that rose by a report. */
  const announce = useCallback((flag: string | null) => {
    if (flag === null) return
    noteStageFlags(raisedRef.current, [flag])
    flagSeqRef.current += 1
    setFlagEvent({ seq: flagSeqRef.current, flags: [flag] })
  }, [])

  /**
   * The story person (#430) whose conditions hold appears at once: the subtitle for the child's arrival is raised
   * first, then the person is placed on its fixed camera if that is free and not the watched one (otherwise it waits).
   * It takes a slot like any anomaly but is not held back by the concurrent cap. Returns whether one appeared.
   */
  const spawnPerson = useCallback(
    (currentTime: number): boolean => {
      const running = activeAnomaliesRef.current
      // A person is already out there waiting to be reported: nothing to do (and no save is read).
      if (running.some(a => a.storyFlag && !a.detectedAt)) return false
      const flag = duePerson(load())
      if (flag === null) return false
      if (flag === CHILD_FLAG) {
        // The child comes only after the foreshadowing conversation has been played to its end (#430).
        announce(raiseTrigger('childDue'))
        if (flagOfTrigger('childDue') !== undefined && !preludeDoneRef.current)
          return false
      }
      const entry = storyPersonFor(
        ANOMALY_LEDGER,
        flag,
        CAMERAS[currentIndexRef.current]?.id,
        new Set(
          running
            .filter(a => !a.detectedAt || a.hold)
            .flatMap(a => [a.cameraId, ...(a.feedGlitchCameraIds ?? [])])
        ),
        new Set(running.filter(a => !a.detectedAt).map(a => a.id))
      )
      if (!entry) return false
      let url: string
      try {
        url = overlayUrlFor(entry)
      } catch (e) {
        console.warn(`Skipping person "${entry.id}":`, e)
        return false
      }
      const person = createAnomaly(entry, getGamePhase(currentTime), url)
      activeAnomaliesRef.current = [...activeAnomaliesRef.current, person]
      setActiveAnomalies(prev => [...prev, person])
      setStats(prev => ({ ...prev, totalAnomalies: prev.totalAnomalies + 1 }))
      return true
    },
    [announce]
  )

  /** The conversation of a story person's flag has ended: its picture goes now (#430). */
  const releasePerson = useCallback((flag: string) => {
    if (flag === flagOfTrigger('childDue')) preludeDoneRef.current = true
    const drop = (list: Anomaly[]) =>
      list.filter(a => !(a.hold && a.storyFlag === flag))
    activeAnomaliesRef.current = drop(activeAnomaliesRef.current)
    setActiveAnomalies(drop)
  }, [])

  /**
   * 'spawned'  - an anomaly was added.
   * 'no-free-camera' - unused entries remain but none is on a camera without an anomaly (retry soon).
   * 'exhausted' - no unused entry is left at all (stop spawning for this shift).
   * An entry whose overlay cannot be resolved is skipped (and marked used) instead of throwing, so the
   * game loop is never stopped by one bad entry.
   */
  const spawnAnomaly = useCallback(
    (currentTime: number): 'spawned' | 'no-free-camera' | 'exhausted' => {
      // Never on the camera being watched (#418): the player must not see an anomaly pop in. It appears on a camera
      // out of sight, so switching there shows it already present. No exception: when the watched camera is the only
      // free one, this returns 'no-free-camera' and the caller retries. Every camera of a multi-camera glitch
      // (RT-FEED-28) is drawn from this same list, so none of them is the watched one either.
      const watchedId = CAMERAS[currentIndexRef.current]?.id
      const freeNow = CAMERAS.filter(
        c =>
          c.id !== watchedId &&
          !activeAnomaliesRef.current.some(
            a => showsOnCamera(a, c.id) && (!a.detectedAt || a.hold)
          )
      ).map(c => c.id)
      const used = usedLedgerIdsRef.current
      const save = load()
      // A story person waiting to appear keeps its camera (#430): the ordinary draw does not take it meanwhile.
      const waitingFlag = duePerson(save)
      const waitingCameraId =
        waitingFlag === null
          ? undefined
          : ANOMALY_LEDGER.find(e => e.storyFlag === waitingFlag)?.cameraId
      const freeCameraIds = freeNow.filter(id => id !== waitingCameraId)
      // Reiwa anomalies join the draw once elder3 is saved; one raised mid-shift counts from the next spawn.
      const reiwaUnlocked = save.flags[REIWA_UNLOCK_FLAG] === true
      const finePointer = hasFinePointer()
      const playableNonImages = nonImageLedger.filter(
        entry =>
          voiceReady(entry.id) && monitorEffectPlayable(entry.id, finePointer)
      )
      // A group (one camera's images / the non-image entries) whose candidates have all been found is refilled now
      // (#427): its retired ids are released. The one found last is remembered per group and avoided on the next draw
      // FROM THAT GROUP (it may take several spawns to come to it, e.g. when its camera is the watched one), so it does
      // not come straight back while the group has another choice.
      const refilled = exhaustedGroups(
        ANOMALY_LEDGER,
        playableNonImages,
        save.retiredIds,
        reiwaUnlocked,
        save.flags
      )
      unretire(refilled.flatMap(g => g.ids))
      for (const g of refilled) avoidNextRef.current.set(g.key, g.last)
      const released = new Set(refilled.flatMap(g => g.ids))
      // Retired (found) ids are out of the draw like the ones already shown this shift.
      const blocked = new Set([
        ...used,
        ...save.retiredIds.filter(id => !released.has(id)),
      ])
      for (;;) {
        const draw = (skip: ReadonlySet<string>) =>
          pickSpawn(ANOMALY_LEDGER, playableNonImages, freeCameraIds, skip, {
            reiwaUnlocked,
            flags: save.flags,
            audible: isAudible(),
            busyGroups: new Set(
              activeAnomaliesRef.current
                .filter(a => !a.detectedAt && a.exclusiveGroup)
                .map(a => a.exclusiveGroup as string)
            ),
          })
        const avoid = new Set(avoidNextRef.current.values())
        const spawn =
          (avoid.size > 0 ? draw(new Set([...blocked, ...avoid])) : null) ??
          draw(blocked)
        if (!spawn) break
        // This group has now been drawn from: the avoided id is free again.
        avoidNextRef.current.delete(groupKeyOfSpawn(spawn))
        used.add(spawn.entry.id)
        blocked.add(spawn.entry.id)
        let newAnomaly: Anomaly
        if (spawn.kind === 'image') {
          let url: string
          try {
            url = overlayUrlFor(spawn.entry)
          } catch (e) {
            console.warn(`Skipping anomaly "${spawn.entry.id}":`, e)
            continue
          }
          newAnomaly = createAnomaly(
            spawn.entry,
            getGamePhase(currentTime),
            url
          )
        } else {
          newAnomaly = createNonImageAnomaly(
            spawn.entry,
            spawn.cameraId,
            getGamePhase(currentTime),
            Math.random,
            freeCameraIds
          )
        }
        // The first Reiwa anomaly to appear is announced once, by subtitle only (#430).
        if (spawn.entry.reiwa === true) announce(raiseTrigger('reiwaAppeared'))
        if (childFoundRef.current) afterChildIdsRef.current.add(spawn.entry.id)
        activeAnomaliesRef.current = [...activeAnomaliesRef.current, newAnomaly]
        setActiveAnomalies(prev => [...prev, newAnomaly])
        setStats(prev => ({
          ...prev,
          totalAnomalies: prev.totalAnomalies + 1,
        }))
        return 'spawned'
      }
      // Not filtered by voiceReady: a voice whose file has not answered yet must keep the shift from being called
      // exhausted (that is permanent for the shift). A voice whose probe failed (404, under 60 s) is never used up,
      // so it counts as unused for the rest of the shift; that only keeps the cheap retry going, nothing is drawn.
      // 'Exhausted' is decided on the ids shown THIS shift only. Found (retired) ids that are not yet released
      // (their group still has an unfound candidate) do not stop the shift: the spawner keeps its 1 s retry, so the
      // shift can never end up unable to show anything for good.
      return hasUnusedEntry(ANOMALY_LEDGER, nonImageLedger, used, reiwaUnlocked)
        ? 'no-free-camera'
        : 'exhausted'
    },
    [announce]
  )

  // Warm the cache for the overlay images once play starts (runs once per page, see preload.ts).
  useEffect(() => {
    if (gameState === 'playing') preloadOverlays()
  }, [gameState])

  // Game loop — built once per gameState transition; reads everything through refs.
  useEffect(() => {
    if (gameState !== 'playing') return

    let frame = 0
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current
      setStats(prev =>
        prev.currentTime === elapsed ? prev : { ...prev, currentTime: elapsed }
      )

      if (elapsed >= DEFAULT_CONFIG.totalDurationMs) {
        // The false-report cap was reached first (its withdraw is still waiting out the toast):
        // that came first, so it stays a withdraw/lose even though time ran out in between.
        if (misreportCapRef.current) {
          endShift('withdraw', 'lose')
          return
        }
        if (
          judgeTimeUp({
            spawnedAfterChild: afterChildIdsRef.current.size,
            reportedAfterChild: afterChildReportedRef.current,
          }) === 'ending'
        ) {
          endShift('ending', 'win')
          return
        }
        endShift(
          'dawn',
          statsRef.current.correctReports >= DEFAULT_CONFIG.minCorrectReports
            ? 'win'
            : 'lose'
        )
        return
      }

      // A story person whose conditions hold comes at once, ahead of the ordinary draw (#430).
      if (elapsed - lastPersonCheckRef.current >= PERSON_CHECK_MS) {
        lastPersonCheckRef.current = elapsed
        spawnPerson(elapsed)
      }

      const pacing = pacingFor(childFoundRef.current)
      const interval = firstSpawnDoneRef.current
        ? pacing.anomalyIntervalMs
        : DEFAULT_CONFIG.firstAnomalyDelayMs
      const sinceLast = elapsed - lastAnomalyTimeRef.current
      const activeCount = activeAnomaliesRef.current.filter(
        a => !a.detectedAt
      ).length

      if (sinceLast >= interval && !ledgerExhaustedRef.current) {
        if (activeCount >= pacing.maxConcurrentAnomalies) {
          // Advance the cadence even when the cap blocks the spawn — otherwise
          // clearing the cap immediately triggers a back-to-back burst.
          lastAnomalyTimeRef.current = elapsed
        } else {
          const result = spawnAnomaly(elapsed)
          if (result === 'spawned') {
            lastAnomalyTimeRef.current = elapsed
            firstSpawnDoneRef.current = true
          } else if (result === 'exhausted') {
            ledgerExhaustedRef.current = true
          } else {
            // A failed attempt does not use up the interval: retry shortly (not every frame).
            lastAnomalyTimeRef.current = elapsed - interval + SPAWN_RETRY_MS
          }
        }
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [gameState, spawnAnomaly, spawnPerson, endShift])

  useEffect(() => {
    if (!feedback) return
    const id = feedback.id
    const timer = window.setTimeout(() => clearFeedback(id), TOAST_MS)
    return () => window.clearTimeout(timer)
  }, [feedback, clearFeedback])

  const watchedId = CAMERAS[currentCameraIndex].id
  // The image anomaly on the watched camera (the one with an overlay), if any.
  const activeAnomalyHere = activeAnomalies.find(
    a => a.cameraId === watchedId && (!a.detectedAt || a.hold) && a.overlay
  )
  // The feed glitch to draw now: a running (not yet reported) feed_glitch on the watched camera only (#77).
  const feedGlitchHere = activeAnomalies.find(
    a => showsOnCamera(a, watchedId) && !a.detectedAt && a.feedGlitch
  )?.feedGlitch

  const unreportedCount = activeAnomalies.filter(a => !a.detectedAt).length

  return {
    gameState,
    stats,
    cameras: CAMERAS,
    currentCameraIndex,
    currentCamera: CAMERAS[currentCameraIndex],
    activeAnomalies,
    activeAnomalyHere,
    feedGlitchHere,
    unreportedCount,
    feedback,
    ending,
    flagEvent,
    finishEnding,
    returnToTitle,
    startGame,
    switchCamera,
    reportAnomaly,
    withdrawAnomaly,
    releasePerson,
    gameTime: msToGameTime(stats.currentTime),
  }
}
