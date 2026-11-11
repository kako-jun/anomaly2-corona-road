import { describe, expect, it } from 'vitest'
import {
  MIN_ANY_GAP,
  MIN_NEIGHBOUR_GAP,
  NEIGHBOURS,
  TILT,
  TILT_BY_NAME,
  tiltVars,
} from './noteTilt'

describe('note tilt (hand-made look)', () => {
  const names = Object.keys(TILT_BY_NAME)
  it('neighbours never tilt alike (at least 1 degree apart)', () => {
    for (const [a, b] of NEIGHBOURS) {
      expect(TILT_BY_NAME[a], a).toBeDefined()
      expect(TILT_BY_NAME[b], b).toBeDefined()
      expect(
        Math.abs(TILT_BY_NAME[a] - TILT_BY_NAME[b]),
        `${a} ~ ${b}`
      ).toBeGreaterThanOrEqual(MIN_NEIGHBOUR_GAP)
    }
  })
  it('no two elements anywhere on the paper share an angle', () => {
    for (let i = 0; i < names.length; i++)
      for (let j = i + 1; j < names.length; j++)
        expect(
          Math.abs(TILT_BY_NAME[names[i]] - TILT_BY_NAME[names[j]]),
          `${names[i]} / ${names[j]}`
        ).toBeGreaterThanOrEqual(MIN_ANY_GAP)
  })
  it('stays inside the ranges: stamps 1-4 deg, scribbles and writing 0.5-3 deg, tape 3-8 deg', () => {
    const abs = Math.abs
    expect(abs(TILT.tape)).toBeGreaterThanOrEqual(3)
    expect(abs(TILT.tape)).toBeLessThanOrEqual(8)
    for (const v of [TILT.stamp, TILT.stampBig]) {
      expect(abs(v)).toBeGreaterThanOrEqual(1)
      expect(abs(v)).toBeLessThanOrEqual(4)
    }
    for (const v of [TILT.scrib, TILT.night, TILT.action, ...TILT.label]) {
      expect(abs(v)).toBeGreaterThanOrEqual(0.5)
      expect(abs(v)).toBeLessThanOrEqual(3)
    }
  })
  it('is not evenly stepped (no regular spacing between the sorted angles)', () => {
    const v = Object.values(TILT_BY_NAME).sort((a, b) => a - b)
    const gaps = v.slice(1).map((x, i) => +(x - v[i]).toFixed(2))
    expect(new Set(gaps).size).toBeGreaterThan(gaps.length / 2)
  })
  it('hands every angle to the CSS as a custom property', () => {
    expect(Object.keys(tiltVars())).toHaveLength(11)
  })
})
