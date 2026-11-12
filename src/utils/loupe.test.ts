import { describe, expect, it } from 'vitest'
import { LOUPE, clampLoupeCenter, edgeTapDirection, followStep } from './loupe'

describe('clampLoupeCenter', () => {
  const half = LOUPE.DIAMETER_PX / LOUPE.ZOOM / 2
  it('keeps a centre that is well inside as it is', () => {
    expect(clampLoupeCenter(200, 300, 400, 600)).toEqual({ x: 200, y: 300 })
  })
  it('pulls a centre near an edge in so the source window stays inside the picture', () => {
    expect(clampLoupeCenter(0, 0, 400, 600)).toEqual({ x: half, y: half })
    expect(clampLoupeCenter(999, 999, 400, 600)).toEqual({
      x: 400 - half,
      y: 600 - half,
    })
    expect(clampLoupeCenter(-50, 300, 400, 600).x).toBe(half)
  })
  it('centres a glass smaller than the window', () => {
    expect(clampLoupeCenter(0, 0, 20, 10)).toEqual({ x: 10, y: 5 })
  })
})

describe('followStep', () => {
  it('moves toward the target without overshooting, and arrives', () => {
    let v = 0
    for (let i = 0; i < 5; i++) {
      const n = followStep(v, 100, 16)
      expect(n).toBeGreaterThan(v)
      expect(n).toBeLessThan(100)
      v = n
    }
    for (let i = 0; i < 200; i++) v = followStep(v, 100, 16)
    expect(v).toBe(100)
  })
  it('is frame-rate independent (two 8 ms steps = one 16 ms step)', () => {
    const two = followStep(followStep(0, 100, 8), 100, 8)
    expect(two).toBeCloseTo(followStep(0, 100, 16), 6)
  })
  it('jumps at once with a zero time constant (reduced motion)', () => {
    expect(followStep(0, 100, 16, 0)).toBe(100)
  })
})

describe('edgeTapDirection (#354)', () => {
  const left = 100
  const width = 400
  it('left of the picture box is prev, right of it is next', () => {
    expect(edgeTapDirection(left - 1, left, width)).toBe('prev')
    expect(edgeTapDirection(left + width + 1, left, width)).toBe('next')
  })
  it('the box itself, edges included, is nothing', () => {
    expect(edgeTapDirection(left, left, width)).toBeNull()
    expect(edgeTapDirection(left + 1, left, width)).toBeNull()
    expect(edgeTapDirection(left + width - 1, left, width)).toBeNull()
    expect(edgeTapDirection(left + width, left, width)).toBeNull()
  })
})
