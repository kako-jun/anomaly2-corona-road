import { describe, expect, it } from 'vitest'
import { BURST_MS, GAP_MS, between, makeBands } from './titleFx'

describe('title noise timing', () => {
  it('bursts are long and frequent', () => {
    expect(BURST_MS).toEqual([400, 1100])
    expect(GAP_MS).toEqual([800, 3500])
    expect(between(BURST_MS, 0)).toBe(400)
    expect(between(BURST_MS, 1)).toBe(1100)
    expect(between(GAP_MS, 0.5)).toBe(2150)
  })
  it('makes 3 to 6 thin bands inside the picture', () => {
    for (const r of [0, 0.5, 0.999]) {
      const bands = makeBands(() => r)
      expect(bands.length).toBeGreaterThanOrEqual(3)
      expect(bands.length).toBeLessThanOrEqual(6)
      for (const b of bands) {
        expect(b.top).toBeGreaterThanOrEqual(0)
        expect(b.top).toBeLessThanOrEqual(100)
        expect(b.height).toBeLessThanOrEqual(2.6)
      }
    }
  })
})
