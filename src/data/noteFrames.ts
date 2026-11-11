/**
 * Hand-ruled frames of the investigation note's boxes (the red stamps, the number form), Issue #297.
 * A frame is four separate straight edges, never a closed rectangle: each edge has its own small tilt, a corner
 * overshoot (+) or gap (-), an uneven thickness and a slightly different ink. Fixed numbers (no randomness, a reload
 * looks the same), one set per box so neighbouring boxes never share a shape. The frames of the sketches are static
 * SVGs written by `scripts/note-frames.py` (same rules, checked by `noteFrames.test.ts`).
 */
export interface EdgeSpec {
  /** Degrees the edge is turned from the true line between its two corners. */
  tilt: number
  /** Px the edge sticks out past its start corner (+) or stops short of it (-). */
  start: number
  /** Same at the end corner. */
  end: number
  /** Thickness at the start and the end, as multiples of the frame's base width. */
  w0: number
  w1: number
  /** Ink strength (0..1) of this edge. */
  alpha: number
}
export interface FrameSpec {
  top: EdgeSpec
  right: EdgeSpec
  bottom: EdgeSpec
  left: EdgeSpec
}
export type FrameName = 'stamp' | 'stampBig' | 'form'

export const FRAMES: Readonly<Record<FrameName, FrameSpec>> = {
  stamp: {
    top: { tilt: 0.7, start: 1.4, end: -0.9, w0: 1, w1: 1.3, alpha: 0.95 },
    right: { tilt: -0.5, start: -0.8, end: 2.1, w0: 1.25, w1: 1, alpha: 0.82 },
    bottom: { tilt: -0.4, start: 0.9, end: 1.7, w0: 1, w1: 1.15, alpha: 0.9 },
    left: { tilt: 1.1, start: 1.6, end: -1.2, w0: 1, w1: 1.4, alpha: 0.86 },
  },
  stampBig: {
    top: { tilt: -0.6, start: -1.2, end: 2.4, w0: 1.1, w1: 1, alpha: 0.9 },
    right: { tilt: 0.9, start: 1.8, end: -0.7, w0: 1, w1: 1.35, alpha: 1 },
    bottom: {
      tilt: 0.3,
      start: -0.6,
      end: 1.1,
      w0: 1.4,
      w1: 1.05,
      alpha: 0.84,
    },
    left: { tilt: -1.0, start: 2.2, end: 0.6, w0: 1.15, w1: 1, alpha: 0.93 },
  },
  form: {
    top: { tilt: 0.2, start: 2.4, end: -1.3, w0: 1, w1: 1.2, alpha: 0.9 },
    right: { tilt: -0.8, start: -0.9, end: 1.6, w0: 1.3, w1: 1, alpha: 0.78 },
    bottom: { tilt: -0.7, start: 1.1, end: 2.7, w0: 1, w1: 1.45, alpha: 0.95 },
    left: { tilt: 0.6, start: -1.7, end: 0.8, w0: 1.1, w1: 1.25, alpha: 0.85 },
  },
}

/** Base line widths in px (what the old CSS borders were). */
export const FRAME_WIDTH: Readonly<Record<FrameName, number>> = {
  stamp: 2,
  stampBig: 3,
  form: 1.5,
}

export const EDGE_NAMES = ['top', 'right', 'bottom', 'left'] as const

// The rules (held by noteFrames.test.ts)
export const TILT_RANGE = [0.2, 1.2] as const
export const OVERSHOOT_RANGE = [0.5, 3] as const
export const MAX_THICKNESS_RATIO = 1.5
export const MIN_OPPOSITE_TILT_GAP = 0.3
export const MIN_TILT_GAP_BETWEEN_FRAMES = 0.08
