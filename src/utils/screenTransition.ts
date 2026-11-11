/**
 * Screen transitions (#336): the one place the look and the length are set.
 *
 * The game state is committed at once; only what is shown fades. `fade` dips to black (the old screen goes
 * dark for half of the time, the new one comes up from black for the other half), so the whole change takes
 * `SCREEN_FADE_MS`.
 */
export const SCREEN_FADE_MS = 400

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
