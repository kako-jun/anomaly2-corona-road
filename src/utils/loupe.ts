/**
 * The magnifier loupe (#341, instant since #409). Every number kako-jun tunes by eye lives here, in this one place.
 * Press the monitor's picture and a round loupe appears at once on the control panel; moving the finger (or mouse)
 * while pressing moves the magnified spot; letting go removes it. There is no camera swipe.
 */
export const LOUPE = {
  /** The ceiling of a short tap (ms): a press released under it (and moved at most TAP_SLOP_PX) is a tap (edge tap #354, double tap #342); 180 since kako-jun's 2026-11-12 tuning. Not a hold wait any more: the loupe shows on press. */
  TAP_MAX_MS: 180,
  /** A press that moves more than this (px) is not a tap (no edge tap, no knock). */
  TAP_SLOP_PX: 12,
  /** Magnification of the picture inside the loupe. */
  ZOOM: 2.5,
  /** Diameter of the round loupe (px). kako-jun asked for it bigger (2026-11-12): 160 -> 240. Tune it here only; CSS and layout follow. */
  DIAMETER_PX: 240,
  /** How fast the magnified spot follows the finger: the time (ms) it takes to cover about 63% of the remaining distance. */
  FOLLOW_TAU_MS: 55,
} as const

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
