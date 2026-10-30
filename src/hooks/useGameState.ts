import { useState, useEffect, useCallback, useRef } from 'react'
import {
  GameState,
  GameStats,
  Anomaly,
  Camera,
  AnomalyCategory,
} from '../types/game'
import {
  DEFAULT_CONFIG,
  CAMERAS,
  msToGameTime,
  getGamePhase,
} from '../utils/gameConfig'
import { createAnomaly, pickLedgerEntry } from '../utils/anomalyData'
import { ANOMALY_LEDGER, overlayUrlFor } from '../data/anomalyLedger'

export type FeedbackKind = 'correct' | 'wrong' | null

export interface Feedback {
  id: number
  kind: Exclude<FeedbackKind, null>
  message: string
}

const TOAST_MS = 1500

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [stats, setStats] = useState<GameStats>({
    currentTime: 0,
    correctReports: 0,
    misreports: 0,
    totalAnomalies: 0,
    detectedAnomalies: 0,
  })
  const [cameras] = useState<Camera[]>(CAMERAS)
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0)
  const [activeAnomalies, setActiveAnomalies] = useState<Anomaly[]>([])
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  // Refs hold the latest game state so the rAF loop and event handlers
  // avoid stale closures without forcing the loop to be re-created on every spawn.
  const startTimeRef = useRef<number>(0)
  const lastAnomalyTimeRef = useRef<number>(0)
  const firstSpawnDoneRef = useRef<boolean>(false)
  const statsRef = useRef(stats)
  const camerasRef = useRef(cameras)
  const currentIndexRef = useRef(currentCameraIndex)
  const activeAnomaliesRef = useRef(activeAnomalies)
  const feedbackIdRef = useRef(0)
  // Ledger ids already shown this shift (no repeats within a shift).
  const usedLedgerIdsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    statsRef.current = stats
  }, [stats])
  useEffect(() => {
    camerasRef.current = cameras
  }, [cameras])
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
      const currentCamera = camerasRef.current[currentIndexRef.current]
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

  /** Returns false when the ledger has nothing left to show, so no anomaly was spawned. */
  const spawnAnomaly = useCallback((currentTime: number): boolean => {
    const freeCameraIds = CAMERAS.filter(
      c =>
        !activeAnomaliesRef.current.some(
          a => a.cameraId === c.id && !a.detectedAt
        )
    ).map(c => c.id)
    const entry = pickLedgerEntry(
      ANOMALY_LEDGER,
      freeCameraIds,
      usedLedgerIdsRef.current
    )
    if (!entry) return false

    usedLedgerIdsRef.current.add(entry.id)
    const newAnomaly = createAnomaly(
      entry,
      getGamePhase(currentTime),
      overlayUrlFor(entry)
    )
    setActiveAnomalies(prev => [...prev, newAnomaly])
    setStats(prev => ({ ...prev, totalAnomalies: prev.totalAnomalies + 1 }))
    return true
  }, [])

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

      if (sinceLast >= interval) {
        // Advance the cadence even when the cap blocks the spawn — otherwise
        // clearing the cap immediately triggers a back-to-back burst.
        lastAnomalyTimeRef.current = elapsed
        if (activeCount < DEFAULT_CONFIG.maxConcurrentAnomalies) {
          if (spawnAnomaly(elapsed)) firstSpawnDoneRef.current = true
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
    a => a.cameraId === cameras[currentCameraIndex].id && !a.detectedAt
  )

  return {
    gameState,
    stats,
    cameras,
    currentCameraIndex,
    currentCamera: cameras[currentCameraIndex],
    activeAnomalies,
    activeAnomalyHere,
    feedback,
    startGame,
    switchCamera,
    reportAnomaly,
    gameTime: msToGameTime(stats.currentTime),
  }
}
