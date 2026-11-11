import { useState, useEffect, useCallback, useRef } from 'react'
import { GameState, GameStats, Anomaly, AnomalyCategory } from '../types/game'
import {
  DEFAULT_CONFIG,
  CAMERAS,
  msToGameTime,
  getGamePhase,
  DRAW_WEIGHT_EXPONENT,
} from '../utils/gameConfig'
import {
  CHILD_FLAG,
  isChildFound,
  judgeTimeUp,
  pacingFor,
} from '../utils/endingJudge'
import { load } from '../utils/saveData'
import { STAGE_FLAGS } from '../data/investigationNotes'
import {
  REIWA_UNLOCK_FLAG,
  createAnomaly,
  pickLedgerEntry,
} from '../utils/anomalyData'
import type { FlagEvent } from './useSubtitle'
import {
  raiseFlagsAtStart,
  recordFound,
  recordShiftEnd,
  shiftDurationMs,
  recordEndingReached,
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
  // The child has been found (flag saved): the rest of this shift, and later shifts, run faster (Issue #86).
  const childFoundRef = useRef(false)
  // Ids that appeared after the child was found in this shift, and how many of them were reported.
  const afterChildIdsRef = useRef<Set<string>>(new Set())
  const afterChildReportedRef = useRef(0)
  // For the investigation note (#297): distinct finds before this shift, and the story-stage flags raised in it.
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

  const startGame = useCallback(() => {
    // After the true ending the save cannot start a shift; the title offers "start over" only (#294).
    if (load().endingReached) return
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
      const anomalyOnCamera = activeAnomaliesRef.current.find(
        a => a.cameraId === currentCamera.id && !a.detectedAt
      )

      if (
        anomalyOnCamera &&
        (anomalyOnCamera.category === category ||
          anomalyOnCamera.alsoCategories?.includes(category))
      ) {
        setStats(prev => ({
          ...prev,
          correctReports: prev.correctReports + 1,
          detectedAnomalies: prev.detectedAnomalies + 1,
        }))
        setActiveAnomalies(prev =>
          prev.map(a =>
            a.id === anomalyOnCamera.id
              ? { ...a, detectedAt: statsRef.current.currentTime }
              : a
          )
        )
        pushFeedback('correct', `CONFIRMED — ${anomalyOnCamera.category}`)
        if (afterChildIdsRef.current.has(anomalyOnCamera.id)) {
          afterChildReportedRef.current += 1
        }
        const raised = recordFound(anomalyOnCamera.id)
        noteStageFlags(raisedRef.current, raised)
        if (raised.includes(CHILD_FLAG)) childFoundRef.current = true
        if (raised.length > 0) {
          flagSeqRef.current += 1
          setFlagEvent({ seq: flagSeqRef.current, flags: raised })
        }
        return
      }

      // Misreport — pure state, no setGameState inside the updater (React StrictMode safe).
      const newMisreports = statsRef.current.misreports + 1
      setStats(prev => ({ ...prev, misreports: prev.misreports + 1 }))
      const reason = anomalyOnCamera ? 'WRONG CATEGORY' : 'NO ANOMALY HERE'
      pushFeedback(
        'wrong',
        `FALSE REPORT — ${reason}`,
        anomalyOnCamera?.id ?? null
      )
      if (newMisreports >= DEFAULT_CONFIG.maxMisreports) {
        misreportCapRef.current = true
        // Brief delay so the result OSD is visible before the game-over screen.
        window.setTimeout(() => endShift('withdraw', 'lose'), TOAST_MS)
      }
    },
    [pushFeedback, endShift]
  )

  /**
   * 'spawned'  - an anomaly was added.
   * 'no-free-camera' - unused entries remain but none is on a camera without an anomaly (retry soon).
   * 'exhausted' - no unused entry is left at all (stop spawning for this shift).
   * An entry whose overlay cannot be resolved is skipped (and marked used) instead of throwing, so the
   * game loop is never stopped by one bad entry.
   */
  const spawnAnomaly = useCallback(
    (currentTime: number): 'spawned' | 'no-free-camera' | 'exhausted' => {
      const freeCameraIds = CAMERAS.filter(
        c =>
          !activeAnomaliesRef.current.some(
            a => a.cameraId === c.id && !a.detectedAt
          )
      ).map(c => c.id)
      const used = usedLedgerIdsRef.current
      // Reiwa anomalies join the draw once elder3 is saved; one raised mid-shift counts from the next spawn.
      const reiwaUnlocked = load().flags[REIWA_UNLOCK_FLAG] === true
      for (;;) {
        const entry = pickLedgerEntry(
          ANOMALY_LEDGER,
          freeCameraIds,
          used,
          Math.random,
          DRAW_WEIGHT_EXPONENT,
          reiwaUnlocked
        )
        if (!entry) break
        used.add(entry.id)
        let url: string
        try {
          url = overlayUrlFor(entry)
        } catch (e) {
          console.warn(`Skipping anomaly "${entry.id}":`, e)
          continue
        }
        if (childFoundRef.current) afterChildIdsRef.current.add(entry.id)
        const newAnomaly = createAnomaly(entry, getGamePhase(currentTime), url)
        setActiveAnomalies(prev => [...prev, newAnomaly])
        setStats(prev => ({
          ...prev,
          totalAnomalies: prev.totalAnomalies + 1,
        }))
        return 'spawned'
      }
      return ANOMALY_LEDGER.some(
        e => !used.has(e.id) && (reiwaUnlocked || e.reiwa !== true)
      )
        ? 'no-free-camera'
        : 'exhausted'
    },
    []
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
  }, [gameState, spawnAnomaly, endShift])

  useEffect(() => {
    if (!feedback) return
    const id = feedback.id
    const timer = window.setTimeout(() => clearFeedback(id), TOAST_MS)
    return () => window.clearTimeout(timer)
  }, [feedback, clearFeedback])

  const activeAnomalyHere = activeAnomalies.find(
    a => a.cameraId === CAMERAS[currentCameraIndex].id && !a.detectedAt
  )

  return {
    gameState,
    stats,
    cameras: CAMERAS,
    currentCameraIndex,
    currentCamera: CAMERAS[currentCameraIndex],
    activeAnomalies,
    activeAnomalyHere,
    feedback,
    ending,
    flagEvent,
    finishEnding,
    returnToTitle,
    startGame,
    switchCamera,
    reportAnomaly,
    gameTime: msToGameTime(stats.currentTime),
  }
}
