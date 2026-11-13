import { describe, expect, it, vi } from 'vitest'
import { AnomalyCategory } from '../types/game'
import { ImageAnomalyType, LedgerEntry } from './anomalyLedger'
import { createAnomaly, pickLedgerEntry } from './anomalyData'

const entry = (id: string, cameraId: number): LedgerEntry => ({
  id,
  cameraId,
  category: 'Object',
  anomalyType: 'add_object',
  overlay: `assets/anomaly-overlays/${id}.webp`,
  origin: { x: 1, y: 2 },
  size: { w: 3, h: 4 },
})

/** rng that returns the given values in order, then the last one forever. */
const seq =
  (...values: number[]) =>
  () =>
    values.length > 1 ? values.shift()! : values[0]

const mk = (
  id: string,
  cameraId: number,
  category: AnomalyCategory,
  anomalyType: ImageAnomalyType
): LedgerEntry => ({ ...entry(id, cameraId), category, anomalyType })

/** Number of `i/N` sweeps (i = 0..N-1) of one rng stage for which `pick` returns a matching entry. */
const N = 1000
const sweep = (
  entries: readonly LedgerEntry[],
  free: number[],
  used: Set<string>,
  stage: 0 | 1 | 2 | 3,
  exponent: number | undefined,
  match: (e: LedgerEntry) => boolean
) => {
  let n = 0
  for (let i = 0; i < N; i++) {
    const v = [0, 0, 0, 0]
    v[stage] = i / N
    const r = pickLedgerEntry(entries, free, used, seq(...v), exponent)
    if (r && match(r)) n++
  }
  return n
}

/** Every combination of a coarse rng grid on all four stages: the set of ids ever returned. */
const reachable = (
  entries: readonly LedgerEntry[],
  free: number[],
  used: Set<string>
) => {
  const grid = [0, 0.25, 0.5, 0.75, 1 - Number.EPSILON]
  const ids = new Set<string | null>()
  for (const a of grid)
    for (const b of grid)
      for (const c of grid)
        for (const d of grid)
          ids.add(
            pickLedgerEntry(entries, free, used, seq(a, b, c, d))?.id ?? null
          )
  return ids
}

const TOP = 1 - Number.EPSILON
// S: heavily skewed ledger, 10 add_object and 1 displace, all Object on cam 1.
const S = [
  ...Array.from({ length: 10 }, (_, i) =>
    mk(`o${i + 1}`, 1, 'Object', 'add_object')
  ),
  mk('d1', 1, 'Object', 'displace'),
]
// M: mixed.
const M = [
  mk('m1', 1, 'Object', 'add_object'),
  mk('m2', 1, 'Object', 'add_object'),
  mk('m3', 1, 'Object', 'displace'),
  mk('m4', 1, 'Person', 'add_person'),
  mk('m5', 2, 'Environment', 'state_change'),
]
const person = (id: string, t: ImageAnomalyType) => mk(id, 1, 'Person', t)
const objects = (n: number) =>
  Array.from({ length: n }, (_, i) =>
    mk(`o${i + 1}`, 1, 'Object', 'add_object')
  )
// C: 9 Object + 1 Person(add_person). X: 9 Object + 1 Person(add_object).
const C = [...objects(9), person('p1', 'add_person')]
const X = [...objects(9), person('p1', 'add_object')]
// Y: Object has 4 add_object + 1 displace; Person has 5 add_object (types counted per category).
const Y = [
  ...objects(4),
  mk('od1', 1, 'Object', 'displace'),
  ...Array.from({ length: 5 }, (_, i) => person(`p${i + 1}`, 'add_object')),
]
const isDisplace = (e: LedgerEntry) => e.anomalyType === 'displace'
const isPerson = (e: LedgerEntry) => e.category === 'Person'

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
  it('first rng value picks the camera, fourth picks the entry', () => {
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

describe('pickLedgerEntry weighted draw (#221)', () => {
  const none = new Set<string>()

  describe('type step weights (unused count ^ exponent)', () => {
    it('exponent 0 is uniform over types: displace exactly half', () => {
      expect(sweep(S, [1], none, 2, 0, isDisplace)).toBe(500)
    })
    it('exponent 1 is proportional to count: displace is 10/11 of the way up', () => {
      // displace when t >= 10/11 -> i >= 910 -> 90 of 1000
      expect(sweep(S, [1], none, 2, 1, isDisplace)).toBe(90)
    })
    it('default exponent 0.75: displace starts at 10^0.75/(10^0.75+1)', () => {
      // 5.623/6.623 = 0.8491 -> i >= 850 -> 150 of 1000
      expect(sweep(S, [1], none, 2, undefined, isDisplace)).toBe(150)
    })
    it('default sits strictly between count-proportional and uniform', () => {
      const prop = sweep(S, [1], none, 2, 1, isDisplace)
      const def = sweep(S, [1], none, 2, undefined, isDisplace)
      const uni = sweep(S, [1], none, 2, 0, isDisplace)
      expect(prop).toBeLessThan(def)
      expect(def).toBeLessThan(uni)
    })
    it('4 vs 1 entries is 4^0.75:1 (about 2.83:1) by default: the rarer type from 0.7388 up', () => {
      const four = [...objects(4), mk('d1', 1, 'Object', 'displace')]
      // 2.828/3.828 = 0.7388 -> i >= 739 -> 261
      expect(sweep(four, [1], none, 2, undefined, isDisplace)).toBe(261)
    })
    it('type counts are per category, not ledger-wide', () => {
      // Object: 4 add_object vs 1 displace -> 261 (0.7388 up). Ledger-wide add_object would be 9 vs 1 (0.8387 up -> 161).
      expect(sweep(Y, [1], none, 2, undefined, isDisplace)).toBe(261)
      // Person has a single type, so with the category fixed to Person nothing else can appear.
      for (let i = 0; i < 20; i++) {
        const r = pickLedgerEntry(Y, [1], none, seq(0, 0.99, i / 20, 0))
        expect(r?.category).toBe('Person')
      }
    })
    it('a Person add_object is a separate group from Object add_object (X)', () => {
      expect(sweep(X, [1], none, 1, undefined, isPerson)).toBe(161)
      for (let i = 0; i < 20; i++) {
        expect(pickLedgerEntry(X, [1], none, seq(0, 0.99, i / 20, 0))?.id).toBe(
          'p1'
        )
      }
    })
  })

  describe('category step weights', () => {
    it('exponent 0 is uniform: Person exactly half', () => {
      expect(sweep(C, [1], none, 1, 0, isPerson)).toBe(500)
    })
    it('default exponent 0.75: Person from 1 - 1/(1+9^0.75) = 0.8386 up', () => {
      expect(sweep(C, [1], none, 1, undefined, isPerson)).toBe(161)
    })
    it('exponent 1 is proportional: Person from 0.9 up', () => {
      expect(sweep(C, [1], none, 1, 1, isPerson)).toBe(100)
    })
    it('the category weight does not depend on the entries types (X = C)', () => {
      expect(sweep(X, [1], none, 1, undefined, isPerson)).toBe(161)
    })
  })

  describe('camera step stays uniform', () => {
    it('the camera with one entry still gets exactly half', () => {
      expect(sweep(M, [1, 2], none, 0, undefined, e => e.cameraId === 2)).toBe(
        500
      )
    })
  })

  describe('exhaustion and exclusion', () => {
    it('never picks the displace type once its only entry is used', () => {
      const ids = reachable(M, [1], new Set(['m3']))
      expect(ids).toEqual(new Set(['m1', 'm2', 'm4']))
    })
    it('Person disappears once its only entry is used', () => {
      expect(reachable(M, [1], new Set(['m4']))).toEqual(
        new Set(['m1', 'm2', 'm3'])
      )
    })
    it('the last Object entries gone leaves Person', () => {
      for (const v of [0, 0.5, TOP]) {
        expect(
          pickLedgerEntry(M, [1], new Set(['m1', 'm2', 'm3']), () => v)?.id
        ).toBe('m4')
      }
    })
    it('falls through to the other camera when cam 1 is used up', () => {
      const used = new Set(['m1', 'm2', 'm3', 'm4'])
      expect(reachable(M, [1, 2], used)).toEqual(new Set(['m5']))
    })
    it('leaves the last displace when all add_object are used', () => {
      const used = new Set(S.slice(0, 10).map(e => e.id))
      expect(reachable(S, [1], used)).toEqual(new Set(['d1']))
    })
    it('returns null when everything is used', () => {
      expect(
        pickLedgerEntry(S, [1], new Set(S.map(e => e.id)), () => 0)
      ).toBeNull()
    })
    it('returns null when no entry is on a free camera', () => {
      expect(reachable(M, [3], none)).toEqual(new Set([null]))
    })
    it('ignores used ids that are not in the ledger', () => {
      const used = new Set(['nope', 'm3'])
      expect(reachable(M, [1], used)).toEqual(new Set(['m1', 'm2', 'm4']))
    })
    it('weights fall as entries are used: displace becomes more likely', () => {
      const base = sweep(S, [1], none, 2, undefined, isDisplace)
      const five = new Set(['o1', 'o2', 'o3', 'o4', 'o5'])
      const nine = new Set(S.slice(0, 9).map(e => e.id))
      const afterFive = sweep(S, [1], five, 2, undefined, isDisplace)
      const afterNine = sweep(S, [1], nine, 2, undefined, isDisplace)
      // 5^0.75 = 3.344 vs 1 -> from 0.7698 -> i >= 770 -> 230; 1 vs 1 -> 500
      expect(base).toBe(150)
      expect(afterFive).toBe(230)
      expect(afterNine).toBe(500)
    })
  })

  describe('single remaining entry', () => {
    it('returns it whatever the rng says', () => {
      const used = new Set(['m1', 'm2', 'm3', 'm4'])
      for (const v of [0, 0.5, TOP]) {
        expect(pickLedgerEntry(M, [1, 2], used, () => v)?.id).toBe('m5')
      }
    })
    it('a one-entry ledger returns the same object reference', () => {
      const only = [mk('z', 1, 'Surreal', 'surreal')]
      expect(pickLedgerEntry(only, [1], none, () => 0.7)).toBe(only[0])
    })
  })

  describe('rng boundaries', () => {
    it('all stages 0 pick the first entry in ledger order', () => {
      expect(pickLedgerEntry(M, [1, 2], none, () => 0)?.id).toBe('m1')
    })
    it('all stages at the top pick the last group of each stage', () => {
      expect(pickLedgerEntry(M, [1, 2], none, () => TOP)?.id).toBe('m5')
      expect(pickLedgerEntry(M, [1], none, () => TOP)?.id).toBe('m4')
      expect(pickLedgerEntry(S, [1], none, () => TOP)?.id).toBe('d1')
    })
    it('camera boundary: exactly 0.5 goes to the second camera', () => {
      expect(pickLedgerEntry(M, [1, 2], none, seq(0.5, 0, 0, 0))?.id).toBe('m5')
      expect(
        pickLedgerEntry(M, [1, 2], none, seq(0.5 - Number.EPSILON, 0, 0, 0))?.id
      ).toBe('m1')
    })
    it('category boundary: exactly on the cumulative edge goes to the next group', () => {
      // exponent 0: two equal categories, the edge is exactly 0.5
      expect(pickLedgerEntry(C, [1], none, seq(0, 0.5, 0, 0), 0)?.id).toBe('p1')
      expect(
        pickLedgerEntry(C, [1], none, seq(0, 0.5 - Number.EPSILON, 0, 0), 0)
          ?.category
      ).toBe('Object')
      // default: edge at 0.8386 (Object 9^0.75 vs Person 1)
      expect(pickLedgerEntry(C, [1], none, seq(0, 0.84, 0, 0))?.id).toBe('p1')
      expect(pickLedgerEntry(C, [1], none, seq(0, 0.83, 0, 0))?.category).toBe(
        'Object'
      )
    })
    it('type boundary: exactly 0.5 with exponent 0 is the second type', () => {
      expect(pickLedgerEntry(S, [1], none, seq(0, 0, 0.5, 0), 0)?.id).toBe('d1')
      expect(
        pickLedgerEntry(S, [1], none, seq(0, 0, 0.5 - Number.EPSILON, 0), 0)
          ?.anomalyType
      ).toBe('add_object')
    })
    it('entry boundary: exactly 0.5 of two is the second entry', () => {
      expect(pickLedgerEntry(M, [1], none, seq(0, 0, 0, 0.5))?.id).toBe('m2')
      expect(
        pickLedgerEntry(M, [1], none, seq(0, 0, 0, 0.5 - Number.EPSILON))?.id
      ).toBe('m1')
    })
  })

  describe('purity and rng consumption', () => {
    it('does not mutate the entries or the used set, and returns an entry reference', () => {
      const entries = M.map(e => ({ ...e }))
      const before = JSON.stringify(entries)
      const used = new Set(['m3'])
      for (const e of entries) Object.freeze(e)
      Object.freeze(entries)
      const r = pickLedgerEntry(entries, [1, 2], used, seq(0.3, 0.6, 0.2, 0.8))
      expect(JSON.stringify(entries)).toBe(before)
      expect([...used]).toEqual(['m3'])
      expect(entries).toContain(r)
    })
    it('consumes exactly four rng values when there is a candidate', () => {
      const rng = vi.fn(() => 0.3)
      pickLedgerEntry(M, [1, 2], new Set(), rng)
      expect(rng).toHaveBeenCalledTimes(4)
    })
    it('consumes four even with a single choice at every step', () => {
      const rng = vi.fn(() => 0.3)
      pickLedgerEntry([M[4]], [2], new Set(), rng)
      expect(rng).toHaveBeenCalledTimes(4)
    })
    it('consumes none when there is no candidate', () => {
      const rng = vi.fn(() => 0.3)
      expect(pickLedgerEntry(M, [3], new Set(), rng)).toBeNull()
      expect(pickLedgerEntry([], [1], new Set(), rng)).toBeNull()
      expect(rng).not.toHaveBeenCalled()
    })
    it('the same rng sequence gives the same result', () => {
      const a = pickLedgerEntry(M, [1, 2], new Set(), seq(0.3, 0.6, 0.2, 0.8))
      const b = pickLedgerEntry(M, [1, 2], new Set(), seq(0.3, 0.6, 0.2, 0.8))
      expect(a).toBe(b)
    })
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
    expect(createAnomaly(e, 'early', '/hashed.webp').overlay?.url).toBe(
      '/hashed.webp'
    )
  })
  it('carries categories over when the entry has them, primary first', () => {
    const a = createAnomaly(
      { ...e, categories: ['Object', 'Person', 'Surreal'] },
      'early',
      'u'
    )
    expect(a.categories).toEqual(['Object', 'Person', 'Surreal'])
    expect(a.category).toBe('Object')
  })
  it('has no categories key for an empty array', () => {
    expect(
      'categories' in createAnomaly({ ...e, categories: [] }, 'early', 'u')
    ).toBe(false)
  })
  it('has no categories key when the entry has none', () => {
    expect('categories' in createAnomaly(e, 'early', 'u')).toBe(false)
  })
})
