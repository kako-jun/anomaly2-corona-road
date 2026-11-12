import type { Language } from './language'

/**
 * The magnifier loupe (#341). Every number kako-jun tunes by eye lives here, in this one place.
 * Hold the monitor (about HOLD_MS, hardly moving) and a round loupe appears on the control panel; moving the finger
 * (or mouse) while holding moves the magnified spot; letting go removes it.
 */
export const LOUPE = {
  /** How long the press must stay put before the loupe shows (ms). A faster move past SWIPE_PX is a camera swipe. */
  HOLD_MS: 250,
  /** While the loupe has not shown yet, moving more than this (px) means "not a hold": no loupe, the gesture is a swipe. */
  HOLD_SLOP_PX: 12,
  /** Horizontal travel (px) from press to release that switches the camera (when no loupe was shown). */
  SWIPE_PX: 50,
  /** Magnification of the picture inside the loupe. */
  ZOOM: 2.5,
  /** Diameter of the round loupe (px). */
  DIAMETER_PX: 160,
  /** How fast the magnified spot follows the finger: the time (ms) it takes to cover about 63% of the remaining distance. */
  FOLLOW_TAU_MS: 55,
} as const

/** The always-visible hint near the monitor (no hidden operations). Follows the browser's language, like the note. */
export const LOUPE_HINT: Record<Language, string> = {
  ja: '押し続けるとルーペ',
  en: 'Hold to magnify',
}

/**
 * The centre of the magnified spot, in the glass's own px, kept so that the source window (DIAMETER / ZOOM wide)
 * stays inside the glass: the loupe never shows anything outside the original picture.
 */
export const clampLoupeCenter = (
  x: number,
  y: number,
  glassW: number,
  glassH: number,
  diameter: number = LOUPE.DIAMETER_PX,
  zoom: number = LOUPE.ZOOM
): { x: number; y: number } => {
  const half = diameter / zoom / 2
  const clamp = (v: number, size: number) =>
    size <= half * 2 ? size / 2 : Math.min(Math.max(v, half), size - half)
  return { x: clamp(x, glassW), y: clamp(y, glassH) }
}

/** One smoothing step toward the target (exponential, independent of the frame rate). */
export const followStep = (
  current: number,
  target: number,
  dtMs: number,
  tauMs: number = LOUPE.FOLLOW_TAU_MS
): number => {
  if (tauMs <= 0) return target
  const next = current + (target - current) * (1 - Math.exp(-dtMs / tauMs))
  return Math.abs(target - next) < 0.05 ? target : next
}

/**
 * Camera change by a short tap on the monitor's frame (#354). The zone is the bezel beside the picture only: the picture
 * itself (.glass) is never a zone. Above / below the picture only the columns beside it count, so the corners extend
 * the side bands.
 *
 * Which way a short tap at `x` goes: 'prev' left of the picture's box, 'next' right of it, null in between (the picture's
 * columns, which are the picture itself or the middle of the top / bottom band). The caller only passes taps inside the
 * bezel and not on the picture box.
 */
export const edgeTapDirection = (
  x: number,
  glassLeft: number,
  glassWidth: number
): 'prev' | 'next' | null => {
  if (x < glassLeft) return 'prev'
  if (x > glassLeft + glassWidth) return 'next'
  return null
}
