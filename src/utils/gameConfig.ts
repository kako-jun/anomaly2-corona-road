import { GameConfig, Camera } from '../types/game'

export const DEFAULT_CONFIG: GameConfig = {
  totalDurationMs: 360_000, // 6 minutes
  firstAnomalyDelayMs: 12_000, // first anomaly within 12 s — no dead opening
  anomalyIntervalMs: 30_000, // 30 s between spawns
  maxConcurrentAnomalies: 2,
  maxMisreports: 3,
  minCorrectReports: 4,
}

export const CAMERAS: Camera[] = [
  {
    id: 1,
    name: 'CAM 01',
    location: 'North Entrance',
    image: '/images/cam1.webp',
  },
  {
    id: 2,
    name: 'CAM 02',
    location: 'Main Corridor',
    image: '/images/cam2.webp',
  },
  {
    id: 3,
    name: 'CAM 03',
    location: 'South Exit',
    image: '/images/cam3.webp',
  },
  {
    id: 4,
    name: 'CAM 04',
    location: 'Underground Junction',
    image: '/images/cam4.webp',
  },
  {
    id: 5,
    name: 'CAM 05',
    location: 'Emergency Stairwell',
    image: '/images/cam5.webp',
  },
  {
    id: 6,
    name: 'CAM 06',
    location: 'Shop Front Row',
    image: '/images/cam6.webp',
  },
  {
    id: 7,
    name: 'CAM 07',
    location: 'Maintenance Corridor',
    image: '/images/cam7.webp',
  },
  {
    id: 8,
    name: 'CAM 08',
    location: 'Security Office',
    image: '/images/cam8.webp',
  },
]

// 1 real minute = 1 in-game hour. 6 real minutes -> 00:00 → 06:00.
export const msToGameTime = (ms: number): string => {
  const totalMinutes = Math.floor(ms / 60_000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

export const getGamePhase = (ms: number): 'early' | 'mid' | 'late' => {
  if (ms < 120_000) return 'early'
  if (ms < 240_000) return 'mid'
  return 'late'
}

/**
 * Anomaly draw (#221): at the category and type steps a group's weight is (its unused count) ^ this.
 * The count is the unused entries inside the camera already chosen. 0 = uniform, 1 = proportional
 * to count (same as no balancing). 0.75 was picked by simulating the real ledger (299 entries,
 * 6-11 per shift, 50k shifts): at 0.5 an entry that is the only one of its category in a camera
 * showed up about 3x as often as before (up to 9.5%), which worsens repeats; at 0.75 the maximum
 * is 5.5% (about 1.9x the mean) and the add_object share falls from 36% to 28%. The camera step
 * and the final entry step stay uniform.
 */
export const DRAW_WEIGHT_EXPONENT = 0.75

/** Dialogue timing and thresholds (docs/save-data.md and dialogue/README.md describe the behaviour). */
export const DIALOGUE_CONFIG = {
  /** Wait after the shift starts before the opening conversation. */
  openingDelayMs: 4_000,
  /** Silence between conversations (chatter, and after any other conversation). */
  chatterIntervalMs: 30_000,
  /** When the single midpoint comment is due, in seconds of play time (4 min of the current 6 min shift). */
  midpointAtSec: 240,
  /** Quiet time after a `serious` conversation before chatter may appear. */
  seriousQuietMs: 20_000,
}
