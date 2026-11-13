/**
 * Screen transitions (#336): the one place the look and the length are set.
 *
 * The game state is committed at once; only what is shown fades. `fade` dips to black (the old screen goes
 * dark, then the new one comes up from black). The length of each half depends on the kind of change and is
 * decided only in `transitionTiming`.
 */
export interface TransitionTiming {
  /** The old screen goes dark (ms). The new screen is mounted when this is over. */
  outMs: number
  /** The new screen comes up from black (ms). */
  inMs: number
}

/** Every change except the start of a shift: 200 ms dark + 200 ms up. */
const DEFAULT_TIMING: TransitionTiming = { outMs: 200, inMs: 200 }

/**
 * The start of a shift (the note before it -> the monitor): kako-jun wants the monitor to appear slowly out of
 * the black, about 3x the usual time (#336). The darkening stays short (the note is only left), the rest is the
 * slow rise: 1200 ms in all.
 */
const START_SHIFT_TIMING: TransitionTiming = { outMs: 200, inMs: 1000 }

/** The whole change, for the default timing (kept for the `cross` look and as the reference length). */
export const SCREEN_FADE_MS = DEFAULT_TIMING.outMs + DEFAULT_TIMING.inMs

/** A shift begins: the note before it, or the result note ("once more"), -> the monitor. */
export const isShiftStart = (from: string, to: string): boolean =>
  to === 'shift' && (from === 'memo-before' || from === 'result')

/** The timing of the change from screen `from` to screen `to` (the `screenKey`s of `App`). */
export const transitionTiming = (from: string, to: string): TransitionTiming =>
  isShiftStart(from, to) ? START_SHIFT_TIMING : DEFAULT_TIMING

export const totalMs = (t: TransitionTiming): number => t.outMs + t.inMs

export type TransitionMode = 'fade' | 'cross' | 'none'

const MODES: readonly TransitionMode[] = ['fade', 'cross', 'none']

/**
 * The mode asked for by `?transition=` — for comparing the looks while developing. A production build always
 * uses `fade` (the param is ignored there).
 */
export const parseTransitionMode = (
  search: string,
  dev: boolean
): TransitionMode => {
  if (!dev) return 'fade'
  const value = new URLSearchParams(search).get('transition')
  return MODES.find(m => m === value) ?? 'fade'
}

export const prefersReducedMotion = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
