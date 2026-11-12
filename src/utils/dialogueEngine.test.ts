import { describe, expect, it } from 'vitest'
import {
  DEFAULT_MIDPOINT_THRESHOLDS,
  DEFAULT_SERIOUS_QUIET_MS,
  applyUsed,
  chatterAllowed,
  drawFromBag,
  isFlagMet,
  midpointStage,
  newlyRaisedFlags,
  pickChatter,
  pickClosing,
  pickFalseReport,
  pickMidpoint,
  pickOpening,
  pickSpawnHint,
  pickStory,
  selectNext,
} from './dialogueEngine'
import type { FlagProgress, UsedState } from './dialogueEngine'
import type {
  DialogueEntry,
  DialogueKind,
  DialogueLedger,
  FlagDef,
} from './dialogueLedger'

const mk = (
  id: string,
  kind: DialogueKind,
  when: Record<string, string> = {},
  tone: 'light' | 'serious' = 'light'
): DialogueEntry =>
  ({
    id,
    kind,
    tone,
    when,
    lines: [{ who: 'A', text: id }],
  }) as DialogueEntry

const bag = (...ids: string[]) => ids.map(id => mk(id, 'chatter'))
const ledgerOf = (
  entries: DialogueEntry[],
  flags: FlagDef[] = []
): DialogueLedger => ({ flags, entries })
const noUsed = (): UsedState => ({ usedLines: {}, usedChatter: [] })
const rng0 = () => 0
const rngHigh = () => 0.999999
/** rng returning the given values in turn. */
const seq = (...v: number[]) => {
  let i = 0
  return () => v[Math.min(i++, v.length - 1)]
}

describe('drawFromBag', () => {
  it('returns null with no candidates', () => {
    expect(drawFromBag([], ['x'], rng0)).toBeNull()
  })
  it('draws only among unused candidates', () => {
    const c = bag('a', 'b', 'c')
    const d = drawFromBag(c, ['a', 'c'], rng0)
    expect(d?.entry.id).toBe('b')
    expect(d?.used).toEqual(['a', 'c', 'b'])
  })
  it('keeps the used ids of other bags', () => {
    const d = drawFromBag(bag('a', 'b'), ['other', 'a'], rng0)
    expect(d?.used).toEqual(['other', 'a', 'b'])
  })
  it('refills when all are used, forgetting only this bag ids', () => {
    const d = drawFromBag(bag('a', 'b'), ['other', 'a', 'b'], rng0)
    expect(d?.used).toContain('other')
    expect(d?.used.filter(id => id === 'a' || id === 'b')).toHaveLength(1)
    expect(d?.used).toHaveLength(2)
  })
  it('after a refill avoids the entry drawn last (2+ candidates)', () => {
    // last used is "b"; with rng 0 the first of the remaining ("a") must come out
    expect(drawFromBag(bag('a', 'b'), ['a', 'b'], rng0)?.entry.id).toBe('a')
    // last used is "a": the only other choice is "b" even with the highest rng
    expect(drawFromBag(bag('a', 'b'), ['b', 'a'], rngHigh)?.entry.id).toBe('b')
    expect(drawFromBag(bag('a', 'b'), ['b', 'a'], rng0)?.entry.id).toBe('b')
  })
  it('with one candidate the same entry comes again after a refill', () => {
    const d = drawFromBag(bag('a'), ['a'], rng0)
    expect(d?.entry.id).toBe('a')
    expect(d?.used).toEqual(['a'])
  })
  it('stays in range at rng = 0', () => {
    expect(drawFromBag(bag('a', 'b', 'c'), [], rng0)?.entry.id).toBe('a')
  })
  it('stays in range at rng = 0.999999', () => {
    expect(drawFromBag(bag('a', 'b', 'c'), [], rngHigh)?.entry.id).toBe('c')
  })
  it('works when used holds ids no longer in the ledger', () => {
    const d = drawFromBag(bag('a', 'b'), ['gone', 'a'], rng0)
    expect(d?.entry.id).toBe('b')
    expect(d?.used).toEqual(['gone', 'a', 'b'])
  })
  it('works for a full bag when used holds an old id as the last one', () => {
    const d = drawFromBag(bag('a', 'b'), ['a', 'b', 'gone'], rng0)
    expect(['a', 'b']).toContain(d?.entry.id)
  })
})

describe('applyUsed', () => {
  const st = (usedChatter: string[], usedLines = {}): UsedState => ({
    usedChatter,
    usedLines,
  })
  it('removes only the ids this draw dropped, keeping another tab additions', () => {
    const r = applyUsed(st(['x']), st(['o1', 'o2']), st(['o3']))
    expect(r.usedChatter).toEqual(['x', 'o3'])
  })
  it('without a refill it is a plain union', () => {
    const r = applyUsed(st(['x']), st(['a']), st(['a', 'b']))
    expect(r.usedChatter).toEqual(['x', 'a', 'b'])
  })
  it('does not duplicate ids present in both', () => {
    const r = applyUsed(st(['a']), st(['a']), st(['a', 'b']))
    expect(r.usedChatter).toEqual(['a', 'b'])
  })
  it('handles usedLines per anomaly key, including a key only the other tab has', () => {
    const r = applyUsed(
      st([], { k1: ['x'], k2: ['y'] }),
      st([], { k1: ['o1'] }),
      st([], { k1: ['n1'] })
    )
    expect(r.usedLines).toEqual({ k1: ['x', 'n1'], k2: ['y'] })
  })
  it('keeps a "__proto__" key as plain data (the prototype stays an Object)', () => {
    const hostile = JSON.parse('{"__proto__":["x"]}')
    const r = applyUsed(st([], hostile), st([], {}), st([], {}))
    expect(Object.getPrototypeOf(r.usedLines)).toBe(Object.prototype)
    expect(Object.keys(r.usedLines)).toEqual(['__proto__'])
    expect(
      applyUsed(st([], {}), st([], {}), st([], hostile)).usedLines
    ).toEqual(hostile)
  })
  it('does not mutate its inputs', () => {
    const cur = st(['x'])
    const prev = st(['o1'])
    const next = st(['o3'])
    applyUsed(cur, prev, next)
    expect(cur.usedChatter).toEqual(['x'])
    expect(prev.usedChatter).toEqual(['o1'])
    expect(next.usedChatter).toEqual(['o3'])
  })
})

describe('pick by kind and when', () => {
  const ledger = ledgerOf([
    mk('opening-1', 'opening'),
    mk('chatter-1', 'chatter'),
    mk('false-report-1', 'false-report'),
    mk('closing-d', 'closing', { result: 'dawn' }),
    mk('closing-w', 'closing', { result: 'withdraw' }),
    mk('midpoint-f', 'midpoint', { stage: 'few' }),
    mk('midpoint-m', 'midpoint', { stage: 'many' }),
    mk('story-a', 'story', { flag: 'a' }),
    mk('story-b', 'story', { flag: 'b' }),
  ])
  it('pickOpening takes only openings', () => {
    expect(pickOpening(ledger, noUsed(), rngHigh)?.entry.id).toBe('opening-1')
  })
  it('pickChatter takes only chatter', () => {
    expect(pickChatter(ledger, noUsed(), rngHigh)?.entry.id).toBe('chatter-1')
  })
  it('pickClosing filters by result', () => {
    expect(pickClosing(ledger, 'dawn', noUsed(), rng0)?.entry.id).toBe(
      'closing-d'
    )
    expect(pickClosing(ledger, 'withdraw', noUsed(), rng0)?.entry.id).toBe(
      'closing-w'
    )
  })
  it('pickClosing returns null when no closing matches', () => {
    expect(pickClosing(ledger, 'ending', noUsed(), rng0)).toBeNull()
  })
  it('pickMidpoint filters by stage and returns null for a missing stage', () => {
    expect(pickMidpoint(ledger, 'many', noUsed(), rng0)?.entry.id).toBe(
      'midpoint-m'
    )
    expect(pickMidpoint(ledger, 'mid', noUsed(), rng0)).toBeNull()
  })
  it('pickStory filters by flag and returns null for a flag without story', () => {
    expect(pickStory(ledger, 'b', noUsed(), rng0)?.entry.id).toBe('story-b')
    expect(pickStory(ledger, 'zzz', noUsed(), rng0)).toBeNull()
  })
  it('a pick records the id in usedChatter and keeps usedLines', () => {
    const used: UsedState = { usedLines: { k: ['z'] }, usedChatter: [] }
    const p = pickOpening(ledger, used, rng0)
    expect(p?.used.usedChatter).toEqual(['opening-1'])
    expect(p?.used.usedLines).toEqual({ k: ['z'] })
  })
})

/** An entry with a post-flag release gate. */
const lk = (
  id: string,
  kind: DialogueKind,
  unlock: string,
  when: Record<string, string> = {}
): DialogueEntry => ({ ...mk(id, kind, when), unlock }) as DialogueEntry

describe('unlock (post-flag release gate)', () => {
  const locked = [
    lk('opening-u', 'opening', 'g'),
    lk('chatter-u', 'chatter', 'g'),
    lk('false-report-u', 'false-report', 'g'),
    lk('closing-u', 'closing', 'g', { result: 'dawn' }),
    lk('midpoint-u', 'midpoint', 'g', { stage: 'mid' }),
    lk('story-u', 'story', 'g', { flag: 'a' }),
  ]
  type Flags = Record<string, boolean>
  const pickers: [string, (l: DialogueLedger, f?: Flags) => unknown][] = [
    ['opening', (l, f) => pickOpening(l, noUsed(), rng0, f)],
    ['chatter', (l, f) => pickChatter(l, noUsed(), rng0, f)],
    ['false-report', (l, f) => pickFalseReport(l, null, noUsed(), rng0, f)],
    ['closing', (l, f) => pickClosing(l, 'dawn', noUsed(), rng0, f)],
    ['midpoint', (l, f) => pickMidpoint(l, 'mid', noUsed(), rng0, f)],
    ['story', (l, f) => pickStory(l, 'a', noUsed(), rng0, f)],
  ]
  const idOf: Record<string, string> = {
    opening: 'opening-u',
    chatter: 'chatter-u',
    'false-report': 'false-report-u',
    closing: 'closing-u',
    midpoint: 'midpoint-u',
    story: 'story-u',
  }
  it.each(pickers)('%s: a locked entry is not a candidate', (_kind, run) => {
    const l = ledgerOf(locked)
    expect(run(l)).toBeNull()
    expect(run(l, {})).toBeNull()
    expect(run(l, { g: false })).toBeNull()
    expect(run(l, { other: true })).toBeNull()
  })
  it.each(pickers)('%s: an unlocked entry is a candidate', (kind, run) => {
    const p = run(ledgerOf(locked), { g: true }) as { entry: DialogueEntry }
    expect(p.entry.id).toBe(idOf[kind])
  })
  it('anomaly-line: locked own lines are skipped and not marked used', () => {
    const own = lk('an-x-u', 'anomaly-line', 'g', { anomaly: 'x' })
    const common = mk('false-report-1', 'false-report')
    const l = ledgerOf([own, common])
    const p = pickFalseReport(l, 'x', noUsed(), rng0, {})
    expect(p?.entry.id).toBe('false-report-1')
    expect(p?.used.usedLines).toEqual({})
    const q = pickFalseReport(l, 'x', noUsed(), rng0, { g: true })
    expect(q?.entry.id).toBe('an-x-u')
    expect(q?.used.usedLines).toEqual({ x: ['an-x-u'] })
  })
  it('a locked entry never enters the bag nor the used list', () => {
    const l = ledgerOf([
      mk('chatter-1', 'chatter'),
      lk('chatter-u', 'chatter', 'g'),
    ])
    let used = noUsed()
    for (let i = 0; i < 6; i++) {
      const p = pickChatter(l, used, rngHigh, {})
      expect(p?.entry.id).toBe('chatter-1')
      used = p!.used
    }
    expect(used.usedChatter).not.toContain('chatter-u')
  })
  it('after the flag is raised the entry joins the bag', () => {
    const l = ledgerOf([
      mk('chatter-1', 'chatter'),
      lk('chatter-u', 'chatter', 'g'),
    ])
    const used: UsedState = { usedLines: {}, usedChatter: ['chatter-1'] }
    expect(pickChatter(l, used, rng0, {})?.entry.id).toBe('chatter-1')
    expect(pickChatter(l, used, rng0, { g: true })?.entry.id).toBe('chatter-u')
  })
  it('entries without unlock stay valid whatever the flags', () => {
    const l = ledgerOf([mk('chatter-1', 'chatter')])
    expect(pickChatter(l, noUsed(), rng0)?.entry.id).toBe('chatter-1')
    expect(pickChatter(l, noUsed(), rng0, {})?.entry.id).toBe('chatter-1')
    expect(pickChatter(l, noUsed(), rng0, { g: true })?.entry.id).toBe(
      'chatter-1'
    )
  })
  it('selectNext passes the flags to every source', () => {
    const l = ledgerOf(locked)
    const input = {
      ledger: l,
      used: noUsed(),
      rng: rng0,
      pendingFlags: ['a'],
      pendingFalseReport: { anomalyId: null },
      pendingMidpoint: 'mid' as const,
    }
    const flags = { g: true }
    expect(selectNext(input)).toBeNull()
    expect(selectNext({ ...input, flags })?.entry.id).toBe('story-u')
    const noStory = { ...input, pendingFlags: [], flags }
    expect(selectNext(noStory)?.entry.id).toBe('false-report-u')
    const noFalse = { ...noStory, pendingFalseReport: null }
    expect(selectNext(noFalse)?.entry.id).toBe('midpoint-u')
    expect(selectNext({ ...noFalse, pendingMidpoint: null })?.entry.id).toBe(
      'chatter-u'
    )
  })
})

describe('pickFalseReport (decision table)', () => {
  const own1 = mk('an-x-1', 'anomaly-line', { anomaly: 'x' })
  const own2 = mk('an-x-2', 'anomaly-line', { anomaly: 'x' })
  const common = mk('false-report-1', 'false-report')

  it('1. id with unused own lines: draws from own, usedLines grows, usedChatter unchanged', () => {
    const used: UsedState = { usedLines: {}, usedChatter: ['c'] }
    const p = pickFalseReport(ledgerOf([own1, own2, common]), 'x', used, rng0)
    expect(p?.entry.id).toBe('an-x-1')
    expect(p?.used.usedLines).toEqual({ x: ['an-x-1'] })
    expect(p?.used.usedChatter).toEqual(['c'])
  })
  it('1b. skips own lines already used', () => {
    const used: UsedState = { usedLines: { x: ['an-x-1'] }, usedChatter: [] }
    const p = pickFalseReport(ledgerOf([own1, own2, common]), 'x', used, rng0)
    expect(p?.entry.id).toBe('an-x-2')
  })
  it('2. id with own lines all used: common bag, usedChatter grows', () => {
    const used: UsedState = {
      usedLines: { x: ['an-x-1', 'an-x-2'] },
      usedChatter: [],
    }
    const p = pickFalseReport(ledgerOf([own1, own2, common]), 'x', used, rng0)
    expect(p?.entry.id).toBe('false-report-1')
    expect(p?.used.usedChatter).toEqual(['false-report-1'])
    expect(p?.used.usedLines).toEqual({ x: ['an-x-1', 'an-x-2'] })
  })
  it('3. own all used and no common bag: null', () => {
    const used: UsedState = { usedLines: { x: ['an-x-1'] }, usedChatter: [] }
    expect(pickFalseReport(ledgerOf([own1]), 'x', used, rng0)).toBeNull()
  })
  it('4. the anomaly has no own conversations: common bag', () => {
    const p = pickFalseReport(ledgerOf([own1, common]), 'other', noUsed(), rng0)
    expect(p?.entry.id).toBe('false-report-1')
    expect(p?.used.usedChatter).toEqual(['false-report-1'])
  })
  it('5. anomaly id null: common bag even if own lines exist', () => {
    const p = pickFalseReport(ledgerOf([own1, common]), null, noUsed(), rng0)
    expect(p?.entry.id).toBe('false-report-1')
  })
  it('6. anomaly id null and no common bag: null', () => {
    expect(pickFalseReport(ledgerOf([own1]), null, noUsed(), rng0)).toBeNull()
  })
  it('does not mutate the used state it was given', () => {
    const used: UsedState = { usedLines: { x: [] }, usedChatter: [] }
    pickFalseReport(ledgerOf([own1]), 'x', used, rng0)
    expect(used).toEqual({ usedLines: { x: [] }, usedChatter: [] })
  })
})

describe('midpointStage', () => {
  it.each([
    [0, 'few'],
    [1, 'few'],
    [2, 'mid'],
    [3, 'mid'],
    [4, 'many'],
    [5, 'many'],
  ] as const)('default thresholds: %i found -> %s', (n, stage) => {
    expect(midpointStage(n)).toBe(stage)
  })
  it('default thresholds are mid=2, many=4', () => {
    expect(DEFAULT_MIDPOINT_THRESHOLDS).toEqual({ mid: 2, many: 4 })
  })
  it.each([
    [4, 'few'],
    [5, 'mid'],
    [9, 'mid'],
    [10, 'many'],
  ] as const)('overridden thresholds (5/10): %i -> %s', (n, stage) => {
    expect(midpointStage(n, { mid: 5, many: 10 })).toBe(stage)
  })
})

describe('isFlagMet', () => {
  const progress = (over: Partial<FlagProgress> = {}): FlagProgress => ({
    foundIds: ['a', 'b', 'c'],
    loops: 2,
    flags: { other: true },
    reiwaIds: new Set(['a', 'b']),
    ...over,
  })
  const all: FlagDef = {
    name: 'f',
    when: {
      foundUnique: 3,
      reiwaFound: 2,
      loops: 2,
      found: ['a', 'c'],
      requires: ['other'],
    },
  }
  it('holds when every condition holds', () => {
    expect(isFlagMet(all, progress())).toBe(true)
  })
  it('fails when only foundUnique fails', () => {
    expect(isFlagMet(all, progress({ foundIds: ['a', 'c'] }))).toBe(false)
  })
  it('fails when only reiwaFound fails', () => {
    expect(isFlagMet(all, progress({ reiwaIds: new Set(['a']) }))).toBe(false)
  })
  it('fails when only loops fails', () => {
    expect(isFlagMet(all, progress({ loops: 1 }))).toBe(false)
  })
  it('fails when only found fails (a required id was not found)', () => {
    expect(
      isFlagMet(
        { ...all, when: { ...all.when, found: ['a', 'zzz'] } },
        progress()
      )
    ).toBe(false)
  })
  it('fails when only requires fails', () => {
    expect(isFlagMet(all, progress({ flags: {} }))).toBe(false)
  })
  it('a flag with a single condition ignores the others', () => {
    expect(
      isFlagMet(
        { name: 'g', when: { loops: 1 } },
        progress({ foundIds: [], reiwaIds: new Set() })
      )
    ).toBe(true)
  })
  it.each([
    [2, false],
    [3, true],
    [4, true],
  ])('foundUnique 3 with %i distinct found -> %s', (n, ok) => {
    const ids = Array.from({ length: n }, (_, i) => `i${i}`)
    expect(
      isFlagMet(
        { name: 'g', when: { foundUnique: 3 } },
        progress({ foundIds: ids })
      )
    ).toBe(ok)
  })
  it.each([
    [1, false],
    [2, true],
    [3, true],
  ])('reiwaFound 2 with %i Reiwa found -> %s', (n, ok) => {
    const ids = Array.from({ length: n }, (_, i) => `r${i}`)
    expect(
      isFlagMet(
        { name: 'g', when: { reiwaFound: 2 } },
        progress({ foundIds: ids, reiwaIds: new Set(ids) })
      )
    ).toBe(ok)
  })
  it.each([
    [1, false],
    [2, true],
    [3, true],
  ])('loops 2 with %i loops -> %s', (n, ok) => {
    expect(
      isFlagMet({ name: 'g', when: { loops: 2 } }, progress({ loops: n }))
    ).toBe(ok)
  })
  it('counts duplicated foundIds as their number of distinct anomalies', () => {
    expect(
      isFlagMet(
        { name: 'g', when: { foundUnique: 3 } },
        progress({ foundIds: ['a', 'a', 'a', 'b'] })
      )
    ).toBe(false)
  })
  it('does not count a duplicated Reiwa id twice', () => {
    expect(
      isFlagMet(
        { name: 'g', when: { reiwaFound: 2 } },
        progress({ foundIds: ['a', 'a'], reiwaIds: new Set(['a']) })
      )
    ).toBe(false)
  })
  it.each([
    [2, false],
    [3, true],
    [4, true],
  ])('foundTotal 3 with %i total -> %s', (n, ok) => {
    expect(
      isFlagMet(
        { name: 'g', when: { foundTotal: 3 } },
        progress({ foundTotal: n })
      )
    ).toBe(ok)
  })
  it('foundTotal counts repeats; foundUnique does not', () => {
    const p = progress({ foundIds: ['a'], foundTotal: 3 })
    expect(isFlagMet({ name: 'g', when: { foundTotal: 3 } }, p)).toBe(true)
    expect(isFlagMet({ name: 'g', when: { foundUnique: 2 } }, p)).toBe(false)
  })
  it('a missing foundTotal in the progress counts as 0', () => {
    expect(
      isFlagMet(
        { name: 'g', when: { foundTotal: 1 } },
        progress({ foundTotal: undefined })
      )
    ).toBe(false)
  })
  it.each([
    [0, false],
    [1, true],
  ])('foundUnique 1 with %i distinct found anomalies -> %s', (n, ok) => {
    expect(
      isFlagMet(
        { name: 'g', when: { foundUnique: 1 } },
        progress({ foundIds: Array.from({ length: n }, (_, i) => `k${i}`) })
      )
    ).toBe(ok)
  })
  it('uses the raised argument for requires when given', () => {
    const def: FlagDef = { name: 'g', when: { requires: ['p'] } }
    expect(isFlagMet(def, progress({ flags: {} }), { p: true })).toBe(true)
    expect(isFlagMet(def, progress({ flags: { p: true } }), {})).toBe(false)
  })
})

describe('newlyRaisedFlags', () => {
  const base = (over: Partial<FlagProgress> = {}): FlagProgress => ({
    foundIds: ['a', 'b'],
    loops: 0,
    flags: {},
    reiwaIds: new Set(),
    ...over,
  })
  const defs: FlagDef[] = [
    { name: 'one', when: { foundUnique: 1 } },
    { name: 'two', when: { foundUnique: 2, requires: ['one'] } },
    { name: 'three', when: { foundUnique: 3 } },
  ]
  it('raises the flags whose conditions hold, in definition order', () => {
    expect(newlyRaisedFlags(defs, base())).toEqual(['one', 'two'])
  })
  it('chains a flag that requires one raised in the same pass', () => {
    expect(newlyRaisedFlags(defs, base({ foundIds: ['a', 'b'] }))).toContain(
      'two'
    )
  })
  it('does not return flags that are already raised', () => {
    expect(newlyRaisedFlags(defs, base({ flags: { one: true } }))).toEqual([
      'two',
    ])
  })
  it('chains even when the definition order is reversed', () => {
    const rev = [defs[1], defs[0]]
    expect(newlyRaisedFlags(rev, base())).toEqual(['one', 'two'])
  })
  it('chains a three-step requires in reverse order', () => {
    const d: FlagDef[] = [
      { name: 'c', when: { requires: ['b'] } },
      { name: 'b', when: { requires: ['a'] } },
      { name: 'a', when: { loops: 1 } },
    ]
    expect(newlyRaisedFlags(d, base({ loops: 1 }))).toEqual(['a', 'b', 'c'])
  })
  it('does not raise a flag whose requirement stays unmet', () => {
    expect(newlyRaisedFlags(defs, base({ foundIds: [] }))).toEqual([])
  })
  it('does not mutate the progress it was given', () => {
    const p = base({ flags: { x: true } })
    newlyRaisedFlags(defs, p)
    expect(p.flags).toEqual({ x: true })
  })
  it('terminates on a requires cycle and raises none of it', () => {
    const cyc: FlagDef[] = [
      { name: 'p', when: { requires: ['q'] } },
      { name: 'q', when: { requires: ['p'] } },
    ]
    expect(newlyRaisedFlags(cyc, base())).toEqual([])
  })
  it('returns each flag at most once', () => {
    const out = newlyRaisedFlags(defs, base({ foundIds: ['a', 'b', 'c'] }))
    expect(new Set(out).size).toBe(out.length)
  })
})

describe('chatterAllowed', () => {
  const last = (tone: 'light' | 'serious') => ({ tone, endedAtMs: 100_000 })
  it('default quiet time is 20000 ms', () => {
    expect(DEFAULT_SERIOUS_QUIET_MS).toBe(20_000)
  })
  it('holds back chatter at 19999 ms after a serious conversation', () => {
    expect(chatterAllowed(last('serious'), 119_999)).toBe(false)
  })
  it('allows chatter at exactly 20000 ms (strict <)', () => {
    expect(chatterAllowed(last('serious'), 120_000)).toBe(true)
  })
  it('allows chatter at 20001 ms', () => {
    expect(chatterAllowed(last('serious'), 120_001)).toBe(true)
  })
  it('always allows after a light conversation', () => {
    expect(chatterAllowed(last('light'), 100_000)).toBe(true)
  })
  it('allows when nothing was shown yet', () => {
    expect(chatterAllowed(null, 0)).toBe(true)
  })
  it('honours the quietMs argument', () => {
    expect(chatterAllowed(last('serious'), 104_999, 5000)).toBe(false)
    expect(chatterAllowed(last('serious'), 105_000, 5000)).toBe(true)
  })
})

describe('selectNext priority', () => {
  const ledger = ledgerOf([
    mk('story-a', 'story', { flag: 'a' }),
    mk('story-b', 'story', { flag: 'b' }),
    mk('false-report-1', 'false-report'),
    mk('midpoint-m', 'midpoint', { stage: 'mid' }),
    mk('chatter-1', 'chatter'),
  ])
  const seriousNow = { tone: 'serious' as const, endedAtMs: 0 }

  it('a flag conversation beats everything', () => {
    const s = selectNext({
      ledger,
      used: noUsed(),
      rng: rng0,
      pendingFlags: ['a'],
      pendingFalseReport: { anomalyId: null },
      pendingMidpoint: 'mid',
    })
    expect(s).toMatchObject({ source: 'flag', flag: 'a' })
    expect(s?.entry.id).toBe('story-a')
  })
  it('the flag conversation ignores the chatter gate', () => {
    const s = selectNext({
      ledger,
      used: noUsed(),
      rng: rng0,
      pendingFlags: ['a'],
      last: seriousNow,
      nowMs: 1,
    })
    expect(s?.source).toBe('flag')
  })
  it('a false report beats a midpoint comment', () => {
    const s = selectNext({
      ledger,
      used: noUsed(),
      rng: rng0,
      pendingFalseReport: { anomalyId: null },
      pendingMidpoint: 'mid',
    })
    expect(s?.source).toBe('false-report')
  })
  it('a midpoint comment beats chatter', () => {
    const s = selectNext({
      ledger,
      used: noUsed(),
      rng: rng0,
      pendingMidpoint: 'mid',
    })
    expect(s?.source).toBe('midpoint')
  })
  it('a midpoint comment is not stopped by the chatter gate', () => {
    const s = selectNext({
      ledger,
      used: noUsed(),
      rng: rng0,
      pendingMidpoint: 'mid',
      last: seriousNow,
      nowMs: 1,
    })
    expect(s?.source).toBe('midpoint')
  })
  it('chatter is chosen when allowed', () => {
    const s = selectNext({
      ledger,
      used: noUsed(),
      rng: rng0,
      last: { tone: 'light', endedAtMs: 0 },
      nowMs: 1,
    })
    expect(s?.source).toBe('chatter')
  })
  it('chatter is chosen with no history at all', () => {
    expect(selectNext({ ledger, used: noUsed(), rng: rng0 })?.source).toBe(
      'chatter'
    )
  })
  it('chatter is held back (null = silence) right after a serious one', () => {
    expect(
      selectNext({
        ledger,
        used: noUsed(),
        rng: rng0,
        last: seriousNow,
        nowMs: 19_999,
      })
    ).toBeNull()
  })
  it('chatter returns once the quiet time passed', () => {
    expect(
      selectNext({
        ledger,
        used: noUsed(),
        rng: rng0,
        last: seriousNow,
        nowMs: 20_000,
      })?.source
    ).toBe('chatter')
  })
  it('skips a pending flag without a story and takes the next one', () => {
    const s = selectNext({
      ledger,
      used: noUsed(),
      rng: rng0,
      pendingFlags: ['no-story', 'b'],
    })
    expect(s).toMatchObject({ source: 'flag', flag: 'b' })
  })
  it('takes several pending flags oldest first', () => {
    const s = selectNext({
      ledger,
      used: noUsed(),
      rng: rng0,
      pendingFlags: ['b', 'a'],
    })
    expect(s?.flag).toBe('b')
  })
  it('moves on to the midpoint when no false-report conversation exists', () => {
    const l = ledgerOf([
      mk('midpoint-m', 'midpoint', { stage: 'mid' }),
      mk('chatter-1', 'chatter'),
    ])
    const s = selectNext({
      ledger: l,
      used: noUsed(),
      rng: rng0,
      pendingFalseReport: { anomalyId: 'x' },
      pendingMidpoint: 'mid',
    })
    expect(s?.source).toBe('midpoint')
  })
  it('moves on to chatter when the pending midpoint stage has no entry', () => {
    const s = selectNext({
      ledger,
      used: noUsed(),
      rng: rng0,
      pendingMidpoint: 'many',
    })
    expect(s?.source).toBe('chatter')
  })
  it('returns null when there is no chatter either', () => {
    expect(
      selectNext({ ledger: ledgerOf([]), used: noUsed(), rng: rng0 })
    ).toBeNull()
  })
  it('does not mutate the used state of its input', () => {
    const used: UsedState = { usedLines: { k: ['z'] }, usedChatter: ['q'] }
    const before = JSON.parse(JSON.stringify(used))
    selectNext({ ledger, used, rng: rng0, pendingFlags: ['a'] })
    selectNext({ ledger, used, rng: rng0 })
    expect(used).toEqual(before)
  })
  it('returns the new used state including the drawn id', () => {
    const s = selectNext({ ledger, used: noUsed(), rng: rng0 })
    expect(s?.used.usedChatter).toEqual(['chatter-1'])
  })
  it('uses the injected rng for the draw', () => {
    const l = ledgerOf(bag('c1', 'c2', 'c3'))
    expect(
      selectNext({ ledger: l, used: noUsed(), rng: seq(0.99) })?.entry.id
    ).toBe('c3')
  })
})

describe('spawn hint (#343)', () => {
  const h1 = mk('spawn-hint-x-1', 'spawn-hint', { anomaly: 'x' })
  const h2 = mk('spawn-hint-x-2', 'spawn-hint', { anomaly: 'x' })
  const h3 = mk('spawn-hint-x-3', 'spawn-hint', { anomaly: 'x' })
  const l = ledgerOf([
    h1,
    h2,
    h3,
    mk('an-x-1', 'anomaly-line', { anomaly: 'x' }),
    mk('false-report-1', 'false-report'),
    ...bag('c1'),
  ])

  it('draws only spawn-hint conversations of that anomaly, and never touches the used state', () => {
    const used: UsedState = { usedLines: { x: ['an-x-1'] }, usedChatter: [] }
    const p = pickSpawnHint(l, 'x', used, rng0)
    expect(p?.entry.id).toBe('spawn-hint-x-1')
    expect(p?.used).toBe(used)
  })
  it('can be drawn again and again (not used up)', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 20; i++)
      seen.add(pickSpawnHint(l, 'x', noUsed(), rngHigh)!.entry.id)
    expect(seen).toEqual(new Set(['spawn-hint-x-3']))
  })
  it('avoids the one shown last when there is a choice', () => {
    for (const r of [0, 0.34, 0.7, 0.999]) {
      const p = pickSpawnHint(l, 'x', noUsed(), () => r, {}, 'spawn-hint-x-2')
      expect(p?.entry.id).not.toBe('spawn-hint-x-2')
    }
  })
  it('allows the same one when it is the only one', () => {
    const one = ledgerOf([h1])
    expect(
      pickSpawnHint(one, 'x', noUsed(), rng0, {}, 'spawn-hint-x-1')?.entry.id
    ).toBe('spawn-hint-x-1')
  })
  it('returns null with no spawn-hint (no fallback to the false-report ones)', () => {
    expect(pickSpawnHint(l, 'nope', noUsed())).toBeNull()
    expect(
      pickSpawnHint(
        ledgerOf([mk('false-report-1', 'false-report')]),
        'x',
        noUsed()
      )
    ).toBeNull()
  })
  it('selectNext: flag > false report > spawn hint > midpoint > chatter', () => {
    const full = ledgerOf([
      h1,
      mk('false-report-1', 'false-report'),
      mk('m1', 'midpoint', { stage: 'few' }),
      mk('s1', 'story', { flag: 'f' }),
      ...bag('c1'),
    ])
    const run = (over: object) =>
      selectNext({
        ledger: full,
        used: noUsed(),
        rng: rng0,
        pendingSpawnHints: ['x'],
        pendingMidpoint: 'few',
        ...over,
      })
    expect(run({})?.source).toBe('spawn-hint')
    expect(run({})?.hintedAnomaly).toBe('x')
    expect(run({ pendingFalseReport: { anomalyId: null } })?.source).toBe(
      'false-report'
    )
    expect(run({ pendingFlags: ['f'] })?.source).toBe('flag')
    expect(run({ pendingSpawnHints: [] })?.source).toBe('midpoint')
  })
  it('selectNext skips an anomaly without a hint and passes the last one to avoid', () => {
    const l2 = ledgerOf([
      h1,
      h2,
      mk('spawn-hint-y-1', 'spawn-hint', { anomaly: 'y' }),
    ])
    const p = selectNext({
      ledger: l2,
      used: noUsed(),
      rng: rng0,
      pendingSpawnHints: ['nope', 'x'],
      lastSpawnHints: { x: 'spawn-hint-x-1' },
    })
    expect(p?.hintedAnomaly).toBe('x')
    expect(p?.entry.id).toBe('spawn-hint-x-2')
  })
})
