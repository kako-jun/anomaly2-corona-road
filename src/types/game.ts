export type AnomalyCategory =
  | 'Camera'
  | 'Object'
  | 'Environment'
  | 'Person'
  | 'Surreal'

export type GamePhase = 'early' | 'mid' | 'late'

export type GameState = 'idle' | 'playing' | 'ending' | 'win' | 'lose'

/** The transparent image laid over the base photo; pixel values are in base-photo pixels. */
export interface AnomalyOverlay {
  url: string
  origin: { x: number; y: number }
  size: { w: number; h: number }
}

export interface Anomaly {
  /** Ledger id (prompts/anomalies.yaml). */
  id: string
  category: AnomalyCategory
  /** Optional extra correct reports (ledger `also_categories`). */
  alsoCategories?: AnomalyCategory[]
  cameraId: number
  detectedAt?: number
  phase: GamePhase
  overlay: AnomalyOverlay
}

export interface Camera {
  id: number
  name: string
  location: string
  image: string
}

export interface GameConfig {
  totalDurationMs: number // 8 minutes = 480000ms (22:00 -> 06:00 in game)
  firstAnomalyDelayMs: number // time before the very first anomaly spawn
  anomalyIntervalMs: number // average spawn cadence
  maxConcurrentAnomalies: number // spawn skipped while at this cap
  maxMisreports: number // strikes
  minCorrectReports: number // Minimum to win
}

export interface GameStats {
  currentTime: number // 0-480000ms
  correctReports: number
  misreports: number
  totalAnomalies: number
  detectedAnomalies: number
}
