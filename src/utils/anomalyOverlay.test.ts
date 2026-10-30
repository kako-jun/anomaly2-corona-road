import { describe, expect, it } from 'vitest'
import { overlayPlacement } from './anomalyOverlay'

const at = (x: number, y: number, w: number, h: number) => ({
  origin: { x, y },
  size: { w, h },
})

describe('overlayPlacement', () => {
  it('converts pixels to percentages of the base photo', () => {
    expect(overlayPlacement(at(100, 200, 50, 100), 500, 1000)).toEqual({
      left: 20,
      top: 20,
      width: 10,
      height: 10,
    })
  })
  it('places an origin of (0,0) at 0%', () => {
    const p = overlayPlacement(at(0, 0, 10, 10), 100, 100)!
    expect(p.left).toBe(0)
    expect(p.top).toBe(0)
  })
  it('fits exactly when the overlay ends on the bottom-right corner', () => {
    const p = overlayPlacement(at(600, 800, 76, 100), 676, 900)!
    expect(p.left + p.width).toBeCloseTo(100)
    expect(p.top + p.height).toBeCloseTo(100)
  })
  it('does not clamp an overlay that sticks out of the photo', () => {
    const p = overlayPlacement(at(90, 90, 20, 20), 100, 100)!
    expect(p.left + p.width).toBeCloseTo(110)
    expect(p.top + p.height).toBeCloseTo(110)
  })
  it('is independent of the display size (only the base size matters)', () => {
    const a = overlayPlacement(at(10, 20, 30, 40), 100, 200)
    const b = overlayPlacement(at(10, 20, 30, 40), 100, 200)
    expect(a).toEqual(b)
  })
  it('tracks the base photo size: doubling it halves the percentages', () => {
    const a = overlayPlacement(at(10, 20, 30, 40), 100, 200)!
    const b = overlayPlacement(at(10, 20, 30, 40), 200, 400)!
    expect(b.left).toBeCloseTo(a.left / 2)
    expect(b.height).toBeCloseTo(a.height / 2)
  })
  it.each([
    ['zero width', 0, 100],
    ['zero height', 100, 0],
    ['negative width', -1, 100],
    ['negative height', 100, -1],
    ['NaN width', NaN, 100],
    ['NaN height', 100, NaN],
    ['both zero', 0, 0],
  ])('returns null for %s', (_n, w, h) => {
    expect(overlayPlacement(at(1, 1, 1, 1), w, h)).toBeNull()
  })
  // Documents current behaviour: Infinity passes the ">0" guard and yields 0%.
  it('accepts Infinity as a size (yields 0%, current behaviour)', () => {
    const p = overlayPlacement(at(1, 1, 1, 1), Infinity, 100)
    expect(p).not.toBeNull()
    expect(p!.left).toBe(0)
  })
})
