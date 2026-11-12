import { GameConfig, Camera } from '../types/game'

export const DEFAULT_CONFIG: GameConfig = {
  totalDurationMs: 480_000, // 8 real minutes = 22:00 -> 06:00 in game
  firstAnomalyDelayMs: 12_000, // first anomaly within 12 s — no dead opening
  anomalyIntervalMs: 30_000, // 30 s between spawns
  maxConcurrentAnomalies: 4, // 4 decided by kako-jun 2026-11-11 (#344)
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

/** In-game clock starts at 22:00 (night shift). 1 real second = 1 in-game minute, so 480 s -> 06:00. */
export const GAME_START_MINUTE_OF_DAY = 22 * 60

export const msToGameTime = (ms: number): string => {
  // Clamp to the shift: before 0 -> 22:00, after the end -> stop at 06:00.
  const clamped = Math.min(Math.max(0, ms), DEFAULT_CONFIG.totalDurationMs)
  const elapsedGameMinutes = Math.floor(clamped / 1000)
  const minuteOfDay =
    (GAME_START_MINUTE_OF_DAY + elapsedGameMinutes) % (24 * 60)
  const hours = Math.floor(minuteOfDay / 60)
  const minutes = minuteOfDay % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

// Phases are thirds of the whole shift (derived from totalDurationMs, no separate constants).
export const getGamePhase = (ms: number): 'early' | 'mid' | 'late' => {
  const third = DEFAULT_CONFIG.totalDurationMs / 3
  if (ms < third) return 'early'
  if (ms < third * 2) return 'mid'
  return 'late'
}

/**
 * Anomaly draw (#221): at the category and type steps a group's weight is (its unused count) ^ this.
 * The count is the unused entries inside the camera already chosen. 0 = uniform, 1 = proportional
 * to count (at these two steps; the old behaviour there. The camera step and the final entry step
 * are always uniform). 0.75 was picked by simulating the real ledger (299 entries,
 * 6-11 per shift, 50k shifts; the shift was 6 minutes at the time of that simulation, now 8): at 0.5 an entry that is the only one of its category in a camera
 * showed up about 3x as often as before (up to 9.5%), which worsens repeats; at 0.75 the maximum
 * is about 5.4% (about 1.9x the mean) and the add_object share falls from 36% to 28%.
 */
export const DRAW_WEIGHT_EXPONENT = 0.75

/** Dialogue timing and thresholds (docs/save-data.md and dialogue/README.md describe the behaviour). */
export const DIALOGUE_CONFIG = {
  /** Wait after the shift starts before the opening conversation. */
  openingDelayMs: 4_000,
  /** Silence between conversations (chatter, and after any other conversation). */
  chatterIntervalMs: 30_000,
  /** When the single midpoint comment is due, in seconds of play time (the middle of the shift, derived from totalDurationMs). */
  midpointAtSec: DEFAULT_CONFIG.totalDurationMs / 2 / 1000,
  /** Quiet time after a `serious` conversation before chatter may appear. */
  seriousQuietMs: 20_000,
  /** Master switch of the spawn hint (#343): a hint subtitle for an anomaly left unreported too long (repeats, `spawn-hints.yaml`). */
  hintEnabled: true,
  /** How long an anomaly may stay unreported before its hint subtitle becomes due (play-time ms; provisional, tune by playing). */
  hintDelayMs: 45_000,
  /** Minimum gap between two spawn hints (wall-clock ms; provisional). */
  hintMinGapMs: 20_000,
  /** Chance (0-1) that a hint opportunity (once per `hintMinGapMs` of play time after `hintDelayMs`, per unreported anomaly) actually speaks; a miss waits for the next opportunity. */
  hintChance: 0.5,
}

/**
 * Master switch of the English subtitles (#326). While false, the subtitles stay Japanese even in an English
 * environment; turn it on once the `en` lines of `dialogue/` are in and the Japanese has been playtested enough
 * (language policy, 2026-11-10). The only place this is read is `useSubtitle.ts` (through `pickSubtitle`).
 */
export const SUBTITLE_EN_ENABLED = false

/** The REPORT lamp blinks while this many anomalies or more are unreported (kako-jun, #344). */
export const ALERT_UNREPORTED_MIN = 3

/**
 * Pacing once the child has been found (the `child` flag is raised), Issue #86. kako-jun only said
 * "more anomalies appear after the child is found". The interval (15 s) is a PLACEHOLDER; the caps (4 normally, 8 here) are decided
 * by kako-jun (2026-11-11, #344); reading "the end" as "after the child is found" was confirmed by kako-jun (2026-11-12, #325/#344).
 * They replace `anomalyIntervalMs` / `maxConcurrentAnomalies` of `DEFAULT_CONFIG` for the rest of the shift.
 */
export const CHILD_FOUND_PACING = {
  anomalyIntervalMs: 15_000,
  maxConcurrentAnomalies: 8,
}

/** The still image the screen switches to for the true ending (the bar one month later, 675x900). */
export const ENDING_BAR_CAMERA: Camera = {
  id: 9, // placeholder: only shown in the "CAM n" label on the monitor
  name: 'CAM 09',
  location: 'Bar',
  image: '/images/ending-bar.webp',
}
