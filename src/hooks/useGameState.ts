import { useState, useEffect, useCallback, useRef } from 'react'
import { GameState, GameStats, Anomaly, AnomalyCategory } from '../types/game'
import {
  DEFAULT_CONFIG,
  CAMERAS,
  msToGameTime,
  getGamePhase,
} from '../utils/gameConfig'
import { createAnomaly, pickLedgerEntry } from '../utils/anomalyData'
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
}

const TOAST_MS = 1500
/** When a spawn could not happen only for lack of a free camera, try again after this (not every frame). */
const SPAWN_RETRY_MS = 1000

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

  // Refs hold the latest game state so the rAF loop and event handlers
  // avoid stale closures without forcing the loop to be re-created on every spawn.
  const startTimeRef = useRef<number>(0)
  const lastAnomalyTimeRef = useRef<number>(0)
  const firstSpawnDoneRef = useRef<boolean>(false)
  const statsRef = useRef(stats)
  const currentIndexRef = useRef(currentCameraIndex)
  const activeAnomaliesRef = useRef(activeAnomalies)
  const feedbackIdRef = useRef(0)
  // Set once every ledger entry has been used: spawning stops for the rest of the shift.
  const ledgerExhaustedRef = useRef(false)
  // Ledger ids already shown this shift (no repeats within a shift).
  const usedLedgerIdsRef = useRef<Set<string>>(new Set())

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
    setStats({
      currentTime: 0,
      correctReports: 0,
      misreports: 0,
      totalAnomalies: 0,
      detectedAnomalies: 0,
    })
    usedLedgerIdsRef.current = new Set()
    ledgerExhaustedRef.current = false
    setActiveAnomalies([])
    setFeedback(null)
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
    (kind: Exclude<FeedbackKind, null>, message: string) => {
      feedbackIdRef.current += 1
      setFeedback({ id: feedbackIdRef.current, kind, message })
    },
    []
  )

  const clearFeedback = useCallback((id: number) => {
    setFeedback(prev => (prev && prev.id === id ? null : prev))
  }, [])

  // Ref-symmetric report — same pattern as the game loop, so we never depend on
  // freshly-rendered `cameras` / `activeAnomalies` props inside the callback.
  const reportAnomaly = useCallback(
    (category: AnomalyCategory) => {
      const currentCamera = CAMERAS[currentIndexRef.current]
      const anomalyOnCamera = activeAnomaliesRef.current.find(
        a => a.cameraId === currentCamera.id && !a.detectedAt
      )

      if (anomalyOnCamera && anomalyOnCamera.category === category) {
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
        return
      }

      // Misreport — pure state, no setGameState inside the updater (React StrictMode safe).
      const newMisreports = statsRef.current.misreports + 1
      setStats(prev => ({ ...prev, misreports: prev.misreports + 1 }))
      const reason = anomalyOnCamera ? 'WRONG CATEGORY' : 'NO ANOMALY HERE'
      pushFeedback('wrong', `FALSE REPORT — ${reason}`)
      if (newMisreports >= DEFAULT_CONFIG.maxMisreports) {
        // Brief delay so the result OSD is visible before the game-over screen.
        window.setTimeout(() => setGameState('lose'), TOAST_MS)
      }
    },
    [pushFeedback]
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
      for (;;) {
        const entry = pickLedgerEntry(ANOMALY_LEDGER, freeCameraIds, used)
        if (!entry) break
        used.add(entry.id)
        let url: string
        try {
          url = overlayUrlFor(entry)
        } catch (e) {
          console.warn(`Skipping anomaly "${entry.id}":`, e)
          continue
        }
        const newAnomaly = createAnomaly(entry, getGamePhase(currentTime), url)
        setActiveAnomalies(prev => [...prev, newAnomaly])
        setStats(prev => ({
          ...prev,
          totalAnomalies: prev.totalAnomalies + 1,
        }))
        return 'spawned'
      }
      return ANOMALY_LEDGER.some(e => !used.has(e.id))
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
        setGameState(
          statsRef.current.correctReports >= DEFAULT_CONFIG.minCorrectReports
            ? 'win'
            : 'lose'
        )
        return
      }

      const interval = firstSpawnDoneRef.current
        ? DEFAULT_CONFIG.anomalyIntervalMs
        : DEFAULT_CONFIG.firstAnomalyDelayMs
      const sinceLast = elapsed - lastAnomalyTimeRef.current
      const activeCount = activeAnomaliesRef.current.filter(
        a => !a.detectedAt
      ).length

      if (sinceLast >= interval && !ledgerExhaustedRef.current) {
        if (activeCount >= DEFAULT_CONFIG.maxConcurrentAnomalies) {
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
  }, [gameState, spawnAnomaly])

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
    startGame,
    switchCamera,
    reportAnomaly,
    gameTime: msToGameTime(stats.currentTime),
  }
}
