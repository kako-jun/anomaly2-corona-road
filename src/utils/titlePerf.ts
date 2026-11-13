/**
 * The title screen's way out on a slow device (#331): the blur patch and the noise are decoration, so when the frames are too
 * slow for long enough they step down, once and for good (never back up: that would flicker).
 *   full -> lite (the patch stops moving: still and faint) -> off (no patch, no noise; the photo's drift stays)
 * Pure functions: `stepPerf` takes the state and one animation-frame time and returns the next state.
 */
export type PerfLevel = 'full' | 'lite' | 'off'

/** The average frame interval over one window that counts as too slow (20 fps). */
export const SLOW_FRAME_MS = 50
/** How long the frames must stay too slow, in one stretch, to step down. */
export const SLOW_WINDOW_MS = 2000
/** A gap this long between two frames is a hidden tab or a pause, not slowness: the window starts again. */
export const PAUSE_GAP_MS = 1000

export interface PerfState {
  level: PerfLevel
  /** Time of the window's first frame, and the number of frames since (the first included). */
  start: number | null
  frames: number
  last: number | null
}

export const initialPerf: PerfState = {
  level: 'full',
  start: null,
  frames: 0,
  last: null,
}

const lower = (l: PerfLevel): PerfLevel => (l === 'full' ? 'lite' : 'off')

export const stepPerf = (s: PerfState, now: number): PerfState => {
  if (s.level === 'off') return s
  const paused = s.last !== null && now - s.last > PAUSE_GAP_MS
  if (s.start === null || paused)
    return { level: s.level, start: now, frames: 1, last: now }
  const frames = s.frames + 1
  const elapsed = now - s.start
  if (elapsed < SLOW_WINDOW_MS)
    return { level: s.level, start: s.start, frames, last: now }
  const slow = elapsed / (frames - 1) > SLOW_FRAME_MS
  return {
    level: slow ? lower(s.level) : s.level,
    start: now,
    frames: 1,
    last: now,
  }
}
