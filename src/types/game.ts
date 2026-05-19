export type AnomalyCategory =
  | 'Camera'
  | 'Object'
  | 'Environment'
  | 'Person'
  | 'Surreal'

export type GamePhase = 'early' | 'mid' | 'late'

export type GameState = 'idle' | 'playing' | 'win' | 'lose'

export interface Anomaly {
  id: string
  category: AnomalyCategory
  cameraId: number
  description: string
  detectedAt?: number
  phase: GamePhase
  // Meta property: some anomalies will break expected rules
  isMeta?: boolean
}

export interface Camera {
  id: number
  name: string
  location: string
  image: string
  hasAnomaly: boolean
}

export interface GameConfig {
  totalDurationMs: number // 6 minutes = 360000ms
  firstAnomalyDelayMs: number // time before the very first anomaly spawn
  anomalyIntervalMs: number // average spawn cadence
  maxConcurrentAnomalies: number // spawn skipped while at this cap
  maxMisreports: number // strikes
  minCorrectReports: number // Minimum to win
}

export interface GameStats {
  currentTime: number // 0-360000ms
  correctReports: number
  misreports: number
  totalAnomalies: number
  detectedAnomalies: number
}
