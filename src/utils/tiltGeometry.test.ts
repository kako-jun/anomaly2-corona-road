import { describe, expect, it } from 'vitest'
import { NO_TILT, localRect, toLocalPoint, unrotatedSize } from './tiltGeometry'
import type { Tilt } from './tiltGeometry'

const DEG = Math.PI / 180

/**
 * What a w x h layout rect centred at (cx, cy) looks like once drawn rotated by `theta` and scaled by `scale` about its
 * centre: the bounding box (what getBoundingClientRect returns) and the screen position of a layout point.
 */
const drawn = (
  w: number,
  h: number,
  cx: number,
  cy: number,
  { theta, scale }: Tilt
) => {
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const at = (lx: number, ly: number) => {
    const dx = (lx - w / 2) * scale
    const dy = (ly - h / 2) * scale
    return { x: cx + dx * c - dy * s, y: cy + dx * s + dy * c }
  }
  const pts = [at(0, 0), at(w, 0), at(0, h), at(w, h)]
  const xs = pts.map(p => p.x)
  const ys = pts.map(p => p.y)
  const box = {
    left: Math.min(...xs),
    top: Math.min(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  }
  return { at, box }
}

const TILTS: [string, Tilt][] = [
  ['3 deg', { theta: 3 * DEG, scale: 1 }],
  ['-3 deg', { theta: -3 * DEG, scale: 1 }],
  ['3 deg scaled to 0.9', { theta: 3 * DEG, scale: 0.9 }],
  ['10 deg scaled to 0.8', { theta: 10 * DEG, scale: 0.8 }],
]

describe('tiltGeometry (RT-UI-11)', () => {
  it('with no tilt nothing changes', () => {
    const box = { left: 100, top: 50, width: 400, height: 600 }
    expect(unrotatedSize(400, 600)).toEqual({ w: 400, h: 600 })
    expect(toLocalPoint(130, 90, box)).toEqual({ x: 30, y: 40 })
    expect(localRect(box, box, NO_TILT)).toEqual({
      left: 0,
      top: 0,
      width: 400,
      height: 600,
    })
  })
  it.each(TILTS)(
    'recovers the layout size from the bounding box (%s)',
    (_n, t) => {
      const { box } = drawn(400, 600, 300, 350, t)
      const { w, h } = unrotatedSize(box.width, box.height, t)
      expect(w).toBeCloseTo(400, 6)
      expect(h).toBeCloseTo(600, 6)
    }
  )
  it.each(TILTS)(
    'maps the corners, the centre and a point of the drawn rect back to layout coordinates (%s)',
    (_n, t) => {
      const { at, box } = drawn(400, 600, 300, 350, t)
      for (const [lx, ly] of [
        [0, 0],
        [400, 0],
        [0, 600],
        [400, 600],
        [200, 300],
        [30, 500],
      ]) {
        const p = at(lx, ly)
        const l = toLocalPoint(p.x, p.y, box, t)
        expect(l.x).toBeCloseTo(lx, 6)
        expect(l.y).toBeCloseTo(ly, 6)
      }
    }
  )
  it.each(TILTS)(
    'places a child rect (the picture frame) in the glass axes (%s)',
    (_n, t) => {
      const glass = drawn(400, 600, 300, 350, t)
      // the frame: 360 x 300 layout px, its top-left 20 / 100 inside the glass
      const c = glass.at(20 + 180, 100 + 150)
      const frame = drawn(360, 300, c.x, c.y, t)
      const l = localRect(frame.box, glass.box, t)
      expect(l.left).toBeCloseTo(20, 6)
      expect(l.top).toBeCloseTo(100, 6)
      expect(l.width).toBeCloseTo(360, 6)
      expect(l.height).toBeCloseTo(300, 6)
    }
  )
})
