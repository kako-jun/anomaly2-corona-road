import { EDGE_NAMES, FRAME_WIDTH } from '../data/noteFrames'
import type { FrameName, FrameSpec } from '../data/noteFrames'

export interface FrameEdge {
  /** The four corners of a thin tapered quad (thickness changes along the edge). */
  points: [number, number][]
  alpha: number
}

/**
 * The four edges of a hand-ruled frame around a w x h box: each a separate straight, slightly tilted stroke that
 * overshoots or stops short of the corners, thicker at one end than the other. Pure geometry, no randomness.
 */
export const frameEdges = (
  w: number,
  h: number,
  spec: FrameSpec,
  baseWidth: number
): FrameEdge[] => {
  const i = baseWidth / 2 // the edge's centre line sits half a stroke inside the box, like a CSS border
  const c: [number, number][] = [
    [i, i],
    [w - i, i],
    [w - i, h - i],
    [i, h - i],
  ]
  return EDGE_NAMES.map((name, k) => {
    const e = spec[name]
    const a = c[k]
    const b = c[(k + 1) % 4]
    const mx = (a[0] + b[0]) / 2
    const my = (a[1] + b[1]) / 2
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + (e.tilt * Math.PI) / 180
    const half = Math.hypot(b[0] - a[0], b[1] - a[1]) / 2
    const dx = Math.cos(ang)
    const dy = Math.sin(ang)
    const p0: [number, number] = [
      mx - dx * (half + e.start),
      my - dy * (half + e.start),
    ]
    const p1: [number, number] = [
      mx + dx * (half + e.end),
      my + dy * (half + e.end),
    ]
    const n0 = (baseWidth * e.w0) / 2
    const n1 = (baseWidth * e.w1) / 2
    const nx = -dy
    const ny = dx
    return {
      alpha: e.alpha,
      points: [
        [p0[0] + nx * n0, p0[1] + ny * n0],
        [p1[0] + nx * n1, p1[1] + ny * n1],
        [p1[0] - nx * n1, p1[1] - ny * n1],
        [p0[0] - nx * n0, p0[1] - ny * n0],
      ],
    }
  })
}

export const frameBaseWidth = (name: FrameName): number => FRAME_WIDTH[name]
