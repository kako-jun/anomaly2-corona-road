import type { FeedGlitchKind } from '../utils/feedGlitch'

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

/**
 * Where a running anomaly can be reported from (#77, prompts/README.md "報告できる範囲"): `camera` = only while its
 * camera is the one being watched (image anomalies, feed_glitch, sound); `monitor` = from any camera (ui_corruption,
 * rule_break: the whole monitor is wrong).
 */
export type ReportScope = 'camera' | 'monitor'

export interface Anomaly {
  /** Ledger id (prompts/anomalies.yaml). */
  id: string
  /** Primary category (first of the ledger's `category`): shown in the feedback. */
  category: AnomalyCategory
  /** Every correct report, primary first (ledger `category` as an array); absent = `category` alone. */
  categories?: AnomalyCategory[]
  cameraId: number
  detectedAt?: number
  phase: GamePhase
  /** The transparent image of an image anomaly; absent for a non-image one. */
  overlay?: AnomalyOverlay
  /** Reporting scope; absent = `camera` (every image anomaly). */
  scope?: ReportScope
  /** The ledger's `exclusive` group: no other unreported anomaly of this group is drawn while this one runs (#77). */
  exclusiveGroup?: string
  /** Non-image only: the camera feed glitch drawn on `cameraId` while it is watched (removed when reported). */
  feedGlitch?: FeedGlitchKind
  /** A feed glitch that shows on several cameras (RT-FEED-28): every camera it shows on, `cameraId` included; absent = `cameraId` alone. */
  feedGlitchCameraIds?: number[]
}

export interface Camera {
  id: number
  name: string
  location: string
  image: string
  /** The text after "CAM " on the monitor OSD; absent = the id ("CAM 1"). The ending's virtual camera uses "09" (#273). */
  osdNumber?: string
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
