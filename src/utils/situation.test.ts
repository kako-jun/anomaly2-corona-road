import { describe, expect, it } from 'vitest'
import { DEFAULT_CONFIG, DIALOGUE_CONFIG } from './gameConfig'
import type { Situation } from './dialogueLedger'
import { createSituationTracker } from './situation'
import type { SituationConfig } from './situation'

const CFG: SituationConfig = DIALOGUE_CONFIG.situations
/** A config where every opportunity speaks (chance 1) and nothing limits it, to test the detection alone. */
const ALWAYS: SituationConfig = {
  ...CFG,
  rules: {
    hot: { chance: 1, minGapMs: 0, maxPerShift: 99 },
    cold: { chance: 1, minGapMs: 0, maxPerShift: 99 },
    brink: { chance: 1, minGapMs: 0, maxPerShift: 99 },
    tenth: { chance: 1, minGapMs: 0, maxPerShift: 99 },
  },
}

/** Mulberry32: a small seeded generator, so the statistics are reproducible. */
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

describe('situation detection (every opportunity speaks)', () => {
  it('hot: three finds within the window, or the fourth find with no false report', () => {
    const t = createSituationTracker(ALWAYS, () => 0)
    t.found(10_000, 10_000, 1, 0)
    t.found(40_000, 40_000, 2, 0)
    expect(t.take(40_000)).toBeNull()
    t.found(70_000, 70_000, 3, 0)
    expect(t.take(70_000)).toBe('hot')

    const slow = createSituationTracker(ALWAYS, () => 0)
    for (const [i, at] of [0, 200_000, 400_000].entries())
      slow.found(at, at, i + 1, 0)
    expect(slow.take(400_000)).toBeNull() // too far apart
    slow.found(450_000, 450_000, 4, 0)
    expect(slow.take(450_000)).toBe('hot') // fourth with a clean run

    const missed = createSituationTracker(ALWAYS, () => 0)
    for (const [i, at] of [0, 200_000, 400_000, 450_000].entries())
      missed.found(at, at, i + 1, 1)
    expect(missed.take(450_000)).toBeNull() // a false report spoils the clean run
  })
  it('tenth: the tenth find of the shift, and it wins over hot', () => {
    const t = createSituationTracker(ALWAYS, () => 0)
    for (let i = 1; i <= 9; i++) t.found(i * 1000, i * 1000, i, 0)
    t.settle('hot', 1) // clear whatever hot said
    expect(t.take(9000)).toBeNull()
    t.found(10_000, 10_000, 10, 0)
    expect(t.take(10_000)).toBe('tenth')
  })
  it('brink: exactly when the false reports reach one short of a withdraw', () => {
    const t = createSituationTracker(ALWAYS, () => 0)
    t.misreport(1000, 1)
    expect(t.take(1000)).toBeNull()
    t.misreport(2000, DEFAULT_CONFIG.maxMisreports - 1)
    expect(t.take(2000)).toBe('brink')
  })
  it('cold: one opportunity per coldAfterMs without a find, restarted by a find', () => {
    const t = createSituationTracker(ALWAYS, () => 0)
    t.tick(CFG.coldAfterMs - 1, 1)
    expect(t.take(1)).toBeNull()
    t.tick(CFG.coldAfterMs, 2)
    expect(t.take(2)).toBe('cold')
    t.settle('cold', 3)
    t.tick(CFG.coldAfterMs + 5000, 4) // the same stretch does not offer again
    expect(t.take(4)).toBeNull()
    t.found(CFG.coldAfterMs + 6000, 5, 1, 0)
    t.tick(CFG.coldAfterMs + 6000 + CFG.coldAfterMs, 6)
    expect(t.take(6)).toBe('cold')
  })
  it('a situation that did not speak within expireMs is dropped, not carried', () => {
    const t = createSituationTracker(ALWAYS, () => 0)
    t.misreport(1000, 2)
    expect(t.take(1000 + CFG.expireMs)).toBe('brink')
    expect(t.take(1000 + CFG.expireMs + 1)).toBeNull()
  })
  it('one waiting situation is not replaced by a new opportunity', () => {
    const t = createSituationTracker(ALWAYS, () => 0)
    t.misreport(1000, 2)
    t.found(2000, 2000, 10, 0)
    expect(t.take(2000)).toBe('brink')
  })
})

describe('situation limits', () => {
  it('a missed roll is forgotten, not carried over', () => {
    let roll = 0.99 // above every chance
    const t = createSituationTracker(CFG, () => roll)
    t.misreport(1000, 2)
    expect(t.take(1000)).toBeNull()
    roll = 0 // the next opportunity is a new one; the old miss does not come back
    expect(t.take(2000)).toBeNull()
  })
  it('the same situation keeps minGapMs and is capped at maxPerShift', () => {
    const rules = {
      ...ALWAYS.rules,
      cold: { chance: 1, minGapMs: 100_000, maxPerShift: 2 },
    }
    const t = createSituationTracker({ ...ALWAYS, rules }, () => 0)
    let wall = 0
    const say = () => {
      wall += 1
      const s = t.take(wall)
      if (s) t.settle(s, wall)
      return s
    }
    t.tick(CFG.coldAfterMs, wall)
    expect(say()).toBe('cold')
    wall = 50_000
    t.found(wall, wall, 1, 0)
    t.tick(wall + CFG.coldAfterMs, wall) // too soon after the last cold
    expect(say()).toBeNull()
    wall = 200_000
    t.found(wall, wall, 2, 0)
    t.tick(wall + CFG.coldAfterMs, wall)
    expect(say()).toBe('cold')
    wall = 400_000
    t.found(wall, wall, 3, 0)
    t.tick(wall + CFG.coldAfterMs, wall) // the cap of two
    expect(say()).toBeNull()
  })
})

/**
 * Statistics over many shifts (#428): the situation lines are not an extra subtitle and do not come too often.
 * A shift is simulated the way the hook runs it: a conversation slot every chatterIntervalMs (a situation that is due
 * takes the slot, otherwise chatter does), finds and false reports at random times.
 */
describe('situation statistics over many shifts', () => {
  const SHIFTS = 2000
  const SLOT_MS = DIALOGUE_CONFIG.chatterIntervalMs
  const TOTAL = DEFAULT_CONFIG.totalDurationMs

  interface Result {
    subtitles: number
    chatter: number
    said: Situation[]
    sameTwiceInARow: number
    opportunities: number
  }
  const shift = (seed: number, withSituations: boolean): Result => {
    const rng = seeded(seed)
    const roll = seeded(seed * 7 + 1)
    // Wrap the roller to count the opportunities (each roll is one opportunity that survived the limits).
    let opportunities = 0
    const counting = () => {
      opportunities++
      return roll()
    }
    const t = createSituationTracker(CFG, counting)
    // Random events: a find roughly every 25-60 s, a false report roughly every 120-200 s.
    const events: { at: number; kind: 'find' | 'miss' }[] = []
    for (
      let at = 20_000 + rng() * 30_000;
      at < TOTAL;
      at += 25_000 + rng() * 35_000
    )
      events.push({ at, kind: 'find' })
    for (
      let at = 60_000 + rng() * 100_000;
      at < TOTAL;
      at += 120_000 + rng() * 80_000
    )
      events.push({ at, kind: 'miss' })
    events.sort((a, b) => a.at - b.at)
    let found = 0
    let miss = 0
    let ei = 0
    const said: Situation[] = []
    let chatter = 0
    let sameTwiceInARow = 0
    let previousSlot: Situation | null = null
    // Slots: the opening at 4 s, then one slot per 30 s of silence plus a few seconds on screen (about 40 s).
    for (let at = 4000; at < TOTAL; at += SLOT_MS + 10_000) {
      while (ei < events.length && events[ei].at <= at) {
        const e = events[ei++]
        if (e.kind === 'find') {
          found++
          if (withSituations) t.found(e.at, e.at, found, miss)
        } else {
          miss++
          if (withSituations) t.misreport(e.at, miss)
        }
      }
      if (withSituations) t.tick(at, at)
      const s = withSituations ? t.take(at) : null
      if (s) {
        t.settle(s, at)
        if (previousSlot === s) sameTwiceInARow++
        said.push(s)
        previousSlot = s
      } else {
        chatter++
        previousSlot = null
      }
    }
    return {
      subtitles: said.length + chatter,
      chatter,
      said,
      sameTwiceInARow,
      opportunities,
    }
  }

  const all = Array.from({ length: SHIFTS }, (_, i) => ({
    on: shift(i + 1, true),
    off: shift(i + 1, false),
  }))

  it('the number of subtitles is exactly what chatter alone would give (a situation takes a chatter slot)', () => {
    for (const { on, off } of all) expect(on.subtitles).toBe(off.subtitles)
    const mean = (f: (r: Result) => number, k: 'on' | 'off') =>
      all.reduce((a, r) => a + f(r[k]), 0) / SHIFTS
    expect(
      Math.abs(mean(r => r.subtitles, 'on') - mean(r => r.subtitles, 'off'))
    ).toBe(0)
  })
  it('a situation is not said every time: on average well under one extra line in four slots, within the per-shift cap', () => {
    const perShift = all.map(r => r.on.said.length)
    const mean = perShift.reduce((a, b) => a + b, 0) / SHIFTS
    const slots = all[0].on.subtitles
    expect(mean).toBeGreaterThan(0.3) // they do come
    expect(mean / slots).toBeLessThan(0.25) // but a chatter slot is mostly still a chatter
    for (const r of all) {
      for (const s of ['hot', 'cold', 'brink', 'tenth'] as Situation[])
        expect(r.on.said.filter(x => x === s).length).toBeLessThanOrEqual(
          CFG.rules[s].maxPerShift
        )
    }
  })
  it('the share of opportunities that speak is near each chance (rolled once, a miss is forgotten)', () => {
    // brink: one opportunity per shift that reaches 2 false reports; the spoken share follows its chance.
    let offered = 0
    let spoken = 0
    for (let i = 0; i < SHIFTS; i++) {
      const r = seeded(i + 99)
      const t = createSituationTracker(CFG, r)
      t.misreport(1000, CFG.brinkMisreports)
      offered++
      if (t.take(1000) === 'brink') spoken++
    }
    expect(spoken / offered).toBeGreaterThan(CFG.rules.brink.chance - 0.04)
    expect(spoken / offered).toBeLessThan(CFG.rules.brink.chance + 0.04)
  })
  it('the same situation never takes two slots in a row within a shift', () => {
    expect(all.reduce((a, r) => a + r.on.sameTwiceInARow, 0)).toBe(0)
  })
})
