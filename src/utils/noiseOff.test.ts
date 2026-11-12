import { describe, expect, it } from 'vitest'
import {
  KNOCK_GAP_MS,
  KNOCK_SLOP_PX,
  SHAKE_COUNT,
  SHAKE_MIN_GAP_MS,
  SHAKE_THRESHOLD,
  SHAKE_WINDOW_MS,
  createShakeDetector,
  isKnock,
  motionMagnitude,
} from './noiseOff'

describe('shake detector', () => {
  const hard = SHAKE_THRESHOLD + 1
  it('fires on SHAKE_COUNT peaks inside the window, once', () => {
    const d = createShakeDetector()
    const gap = SHAKE_MIN_GAP_MS + 20
    const out: boolean[] = []
    for (let i = 0; i < SHAKE_COUNT; i++) {
      out.push(d.push(hard, i * gap * 2))
      d.push(0, i * gap * 2 + gap)
    }
    expect(out).toEqual([...Array(SHAKE_COUNT - 1).fill(false), true])
    expect(d.push(hard, SHAKE_COUNT * gap * 2)).toBe(false) // forgotten after firing
  })
  it('a value at the threshold is not a peak', () => {
    const d = createShakeDetector()
    for (let i = 0; i < 10; i++)
      expect(d.push(SHAKE_THRESHOLD, i * 200)).toBe(false)
  })
  it('peaks outside the time window do not add up', () => {
    const d = createShakeDetector()
    for (let i = 0; i < 6; i++)
      expect(d.push(hard, i * (SHAKE_WINDOW_MS / (SHAKE_COUNT - 1) + 50))).toBe(
        false
      )
  })
  it('one jolt ringing in quick events is a single peak', () => {
    const d = createShakeDetector()
    for (let i = 0; i < 4; i++)
      expect(d.push(hard, i * (SHAKE_MIN_GAP_MS / 4))).toBe(false)
  })
  it('a long hard movement that never drops below the threshold is one peak (no shake)', () => {
    const d = createShakeDetector()
    for (let i = 0; i < 40; i++)
      expect(d.push(hard, i * SHAKE_MIN_GAP_MS)).toBe(false)
  })
  it('a real shake (up, down, up, down, up) fires', () => {
    const d = createShakeDetector()
    const out: boolean[] = []
    for (let i = 0; i < SHAKE_COUNT; i++) {
      out.push(d.push(hard, i * 200))
      out.push(d.push(0, i * 200 + 100))
    }
    expect(out.filter(Boolean)).toHaveLength(1)
    expect(out[out.length - 2]).toBe(true)
  })
  it('reset forgets the peaks', () => {
    const d = createShakeDetector()
    d.push(hard, 0)
    d.push(hard, 100)
    d.reset()
    expect(d.push(hard, 200)).toBe(false)
  })
})

describe('motionMagnitude', () => {
  it('uses the gravity-free acceleration when there is one', () => {
    expect(motionMagnitude({ acceleration: { x: 3, y: 4, z: 0 } })).toBe(5)
  })
  it('falls back to the gravity-included one minus 1 g, and to 0 without data', () => {
    expect(
      motionMagnitude({
        acceleration: { x: null, y: null, z: null },
        accelerationIncludingGravity: { x: 0, y: 0, z: 9.81 },
      })
    ).toBeCloseTo(0)
    expect(
      motionMagnitude({ accelerationIncludingGravity: { x: 0, y: 0, z: 20 } })
    ).toBeCloseTo(10.19)
    expect(motionMagnitude({})).toBe(0)
  })
})

describe('knock (double tap)', () => {
  const t0 = { t: 1000, x: 100, y: 100 }
  it('needs a previous tap close in time and place', () => {
    expect(isKnock(null, t0)).toBe(false)
    expect(isKnock(t0, { t: 1000 + KNOCK_GAP_MS, x: 100, y: 100 })).toBe(true)
    expect(isKnock(t0, { t: 1001 + KNOCK_GAP_MS, x: 100, y: 100 })).toBe(false)
    expect(isKnock(t0, { t: 1100, x: 100 + KNOCK_SLOP_PX, y: 100 })).toBe(true)
    expect(isKnock(t0, { t: 1100, x: 101 + KNOCK_SLOP_PX, y: 100 })).toBe(false)
  })
})
