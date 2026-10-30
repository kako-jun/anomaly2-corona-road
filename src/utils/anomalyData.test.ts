import { describe, expect, it } from 'vitest'
import { LedgerEntry } from './anomalyLedger'
import { createAnomaly, pickLedgerEntry } from './anomalyData'

const entry = (id: string, cameraId: number): LedgerEntry => ({
  id,
  cameraId,
  category: 'Object',
  overlay: `assets/anomaly-overlays/${id}.webp`,
  origin: { x: 1, y: 2 },
  size: { w: 3, h: 4 },
})

/** rng that returns the given values in order, then the last one forever. */
const seq =
  (...values: number[]) =>
  () =>
    values.length > 1 ? values.shift()! : values[0]

const E = [entry('a1', 1), entry('a2', 1), entry('a3', 1), entry('b1', 2)]

describe('pickLedgerEntry', () => {
  it('returns null for an empty ledger', () => {
    expect(pickLedgerEntry([], [1, 2], new Set(), () => 0)).toBeNull()
  })
  it('returns null when no camera is free', () => {
    expect(pickLedgerEntry(E, [], new Set(), () => 0)).toBeNull()
  })
  it('skips entries already used', () => {
    const r = pickLedgerEntry(E, [1], new Set(['a1', 'a2']), () => 0)
    expect(r?.id).toBe('a3')
  })
  it('only returns entries on free cameras', () => {
    for (const v of [0, 0.3, 0.6, 0.99]) {
      expect(pickLedgerEntry(E, [2], new Set(), () => v)?.cameraId).toBe(2)
    }
  })
  it('returns null once every entry on the free cameras is used', () => {
    const used = new Set(['a1', 'a2', 'a3'])
    expect(pickLedgerEntry(E, [1], used, () => 0)).toBeNull()
  })
  it('ignores used entries on cameras that are not free, and vice versa', () => {
    const r = pickLedgerEntry(E, [2], new Set(['a1']), () => 0)
    expect(r?.id).toBe('b1')
  })
  it('does not mutate the used set', () => {
    const used = new Set(['a1'])
    pickLedgerEntry(E, [1, 2], used, () => 0)
    expect([...used]).toEqual(['a1'])
  })
  it('is reproducible for the same rng sequence', () => {
    const a = pickLedgerEntry(E, [1, 2], new Set(), seq(0.2, 0.7))
    const b = pickLedgerEntry(E, [1, 2], new Set(), seq(0.2, 0.7))
    expect(a).toEqual(b)
  })
  it('first rng value picks the camera, second picks the entry', () => {
    // cameras in ledger order: [1, 2]
    expect(pickLedgerEntry(E, [1, 2], new Set(), seq(0, 0))?.id).toBe('a1')
    expect(pickLedgerEntry(E, [1, 2], new Set(), seq(0, 0.5))?.id).toBe('a2')
    expect(pickLedgerEntry(E, [1, 2], new Set(), seq(0, 0.99))?.id).toBe('a3')
    expect(pickLedgerEntry(E, [1, 2], new Set(), seq(0.5, 0))?.id).toBe('b1')
  })
  it('stays in range at the top of rng [0,1)', () => {
    const top = 1 - Number.EPSILON
    expect(pickLedgerEntry(E, [1, 2], new Set(), () => top)?.id).toBe('b1')
    expect(pickLedgerEntry(E, [1], new Set(), () => top)?.id).toBe('a3')
  })
  it('does not favour the camera with more entries', () => {
    // 3 entries on cam 1 vs 1 on cam 2: sweep the camera-choosing rng uniformly.
    const N = 1000
    let cam2 = 0
    for (let i = 0; i < N; i++) {
      const r = pickLedgerEntry(E, [1, 2], new Set(), seq(i / N, 0))
      if (r?.cameraId === 2) cam2++
    }
    expect(cam2).toBe(N / 2)
  })
  it('re-weights cameras after one runs out', () => {
    const used = new Set(['a1', 'a2', 'a3'])
    for (const v of [0, 0.5, 0.99]) {
      expect(pickLedgerEntry(E, [1, 2], used, () => v)?.id).toBe('b1')
    }
  })
})

describe('createAnomaly', () => {
  const e = entry('x', 3)
  it('maps the ledger entry to a running anomaly', () => {
    expect(createAnomaly(e, 'mid', '/o/x.webp')).toEqual({
      id: 'x',
      category: 'Object',
      cameraId: 3,
      phase: 'mid',
      overlay: {
        url: '/o/x.webp',
        origin: { x: 1, y: 2 },
        size: { w: 3, h: 4 },
      },
    })
  })
  it('starts undetected', () => {
    expect(createAnomaly(e, 'early', 'u').detectedAt).toBeUndefined()
  })
  it('uses the resolved URL, not the repo-relative path', () => {
    expect(createAnomaly(e, 'early', '/hashed.webp').overlay.url).toBe(
      '/hashed.webp'
    )
  })
})
