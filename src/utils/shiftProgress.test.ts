// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import type { DialogueLedger } from './dialogueLedger'

const story = (id: string, flag: string) => ({
  id,
  kind: 'story' as const,
  tone: 'serious' as const,
  when: { flag },
  lines: [{ who: 'A' as const, text: 'あ' }],
})

const ledger: DialogueLedger = {
  flags: [
    { name: 'first', when: { foundUnique: 2 } },
    { name: 'quiet', when: { foundUnique: 3 } },
    { name: 'child', when: { reiwaFound: 1, requires: ['first'] } },
    { name: 'again', when: { loops: 1 } },
    { name: 'twice', when: { loops: 2 } },
    { name: 'many', when: { foundTotal: 4 } },
  ],
  // "quiet" has no story conversation on purpose.
  entries: [
    story('story-first', 'first'),
    story('story-child', 'child'),
    story('story-again', 'again'),
  ],
}

const fresh = async () => {
  localStorage.clear()
  vi.resetModules()
  vi.doMock('virtual:dialogue', () => ({ default: ledger }))
  const progress = await import('./shiftProgress')
  const saveData = await import('./saveData')
  return { ...progress, load: saveData.load }
}

describe('recordFound', () => {
  it('adds 1 to foundTotal even for a duplicate report', async () => {
    const { recordFound, load } = await fresh()
    recordFound('a')
    recordFound('a')
    expect(load().foundTotal).toBe(2)
  })
  it('raises a foundTotal flag exactly at the boundary, counting repeats', async () => {
    const { recordFound, load } = await fresh()
    for (let i = 0; i < 3; i++) expect(recordFound('a')).toEqual([])
    expect(load().flags.many).toBeUndefined()
    expect(recordFound('a')).toEqual(['many'])
    expect(load().flags.many).toBe(true)
    expect(load().foundIds).toEqual(['a'])
  })
  it('a foundTotal flag without a story is not queued', async () => {
    const { recordFound, load } = await fresh()
    for (let i = 0; i < 4; i++) recordFound('a')
    expect(load().pendingStories).toEqual([])
  })
  it('does not duplicate foundIds', async () => {
    const { recordFound, load } = await fresh()
    recordFound('a')
    recordFound('a')
    recordFound('b')
    expect(load().foundIds).toEqual(['a', 'b'])
  })
  it('returns an empty list before any milestone', async () => {
    const { recordFound } = await fresh()
    expect(recordFound('a')).toEqual([])
  })
  it('raises a flag at its milestone and returns it', async () => {
    const { recordFound, load } = await fresh()
    recordFound('a')
    expect(recordFound('b')).toEqual(['first'])
    expect(load().flags.first).toBe(true)
  })
  it('does not return an already raised flag on a repeated report', async () => {
    const { recordFound } = await fresh()
    recordFound('a')
    recordFound('b')
    expect(recordFound('b')).toEqual([])
  })
  it('a duplicate report does not reach a milestone of distinct anomalies', async () => {
    const { recordFound, load } = await fresh()
    recordFound('a')
    expect(recordFound('a')).toEqual([])
    expect(load().flags.first).toBeUndefined()
  })
  it('queues the story of a raised flag in pendingStories', async () => {
    const { recordFound, load } = await fresh()
    recordFound('a')
    recordFound('b')
    expect(load().pendingStories).toEqual(['first'])
  })
  it('does not queue a flag that has no story conversation', async () => {
    const { recordFound, load } = await fresh()
    recordFound('a')
    recordFound('b')
    expect(recordFound('c')).toEqual(['quiet'])
    expect(load().flags.quiet).toBe(true)
    expect(load().pendingStories).toEqual(['first'])
  })
  it('does not raise a chained flag while reiwaIds is empty', async () => {
    const { recordFound, load } = await fresh()
    recordFound('a')
    recordFound('b')
    recordFound('c')
    expect(load().flags.child).toBeUndefined()
  })
})

const SHIFT = {
  found: 3,
  fresh: 1,
  misreports: 0,
  durationMs: 480000,
  closing: 'dawn' as const,
  raised: [],
}

describe('shiftDurationMs', () => {
  it('is the whole shift when time ran out, even if the last tick read a little less', async () => {
    const { shiftDurationMs } = await fresh()
    expect(shiftDurationMs('dawn', 479990)).toBe(480000)
    expect(shiftDurationMs('ending', 479000)).toBe(480000)
    expect(shiftDurationMs('dawn', 480013)).toBe(480000)
  })
  it('keeps the real time of a withdraw, within the shift', async () => {
    const { shiftDurationMs } = await fresh()
    expect(shiftDurationMs('withdraw', 221000)).toBe(221000)
    expect(shiftDurationMs('withdraw', 480500)).toBe(480000)
    expect(shiftDurationMs('withdraw', -1)).toBe(0)
  })
})

describe('recordShiftEnd', () => {
  it('keeps how the shift went for the investigation note, the later one replacing the earlier', async () => {
    const { recordShiftEnd, load } = await fresh()
    recordShiftEnd(SHIFT)
    expect(load().lastShift).toEqual(SHIFT)
    const next = { ...SHIFT, found: 5, closing: 'withdraw' as const }
    recordShiftEnd(next)
    expect(load().lastShift).toEqual(next)
  })
  it('adds 1 to loops each time', async () => {
    const { recordShiftEnd, load } = await fresh()
    recordShiftEnd(SHIFT)
    recordShiftEnd(SHIFT)
    expect(load().loops).toBe(2)
  })
  it('does not raise flags by itself (they rise at the next start)', async () => {
    const { recordShiftEnd, load } = await fresh()
    recordShiftEnd(SHIFT)
    expect(load().flags.again).toBeUndefined()
  })
})

describe('raiseFlagsAtStart', () => {
  it('returns an empty list when nothing became true', async () => {
    const { raiseFlagsAtStart } = await fresh()
    expect(raiseFlagsAtStart()).toEqual([])
  })
  it('raises only the loops-based flag after a completed play', async () => {
    const { recordShiftEnd, raiseFlagsAtStart, load } = await fresh()
    recordShiftEnd(SHIFT)
    expect(raiseFlagsAtStart()).toEqual(['again'])
    expect(load().flags).toEqual({ again: true })
    expect(load().pendingStories).toEqual(['again'])
  })
  it('raises loops flags at their own boundary on the next start', async () => {
    const { recordShiftEnd, raiseFlagsAtStart, load } = await fresh()
    recordShiftEnd(SHIFT)
    expect(raiseFlagsAtStart()).toEqual(['again'])
    expect(load().flags.twice).toBeUndefined()
    recordShiftEnd(SHIFT)
    expect(load().flags.twice).toBeUndefined()
    expect(raiseFlagsAtStart()).toEqual(['twice'])
    expect(load().flags).toEqual({ again: true, twice: true })
  })
  it('does not return the same flag twice', async () => {
    const { recordShiftEnd, raiseFlagsAtStart } = await fresh()
    recordShiftEnd(SHIFT)
    raiseFlagsAtStart()
    expect(raiseFlagsAtStart()).toEqual([])
  })
})

describe('recordEndingReached / resetProgress (#294)', () => {
  it('marks the ending and persists it', async () => {
    const p = await fresh()
    expect(p.load().endingReached).toBe(false)
    p.recordEndingReached()
    expect(p.load().endingReached).toBe(true)
    expect(
      JSON.parse(localStorage.getItem('corona-road:save') ?? '{}')
    ).toMatchObject({
      endingReached: true,
    })
  })

  it('wipes all progress but keeps the display settings', async () => {
    const p = await fresh()
    const saveData = await import('./saveData')
    saveData.update(cur => ({
      ...cur,
      foundTotal: 9,
      foundIds: ['a', 'b'],
      loops: 3,
      flags: { child: true },
      usedLines: { a: ['x'] },
      usedChatter: ['c'],
      pendingStories: ['child'],
      endingReached: true,
      settings: { brightness: 30, contrast: 70 },
    }))
    p.resetProgress()
    expect(p.load()).toEqual({
      ...saveData.emptySave(),
      epoch: 1,
      settings: { brightness: 30, contrast: 70 },
    })
    expect(
      JSON.parse(localStorage.getItem('corona-road:save') ?? '{}').endingReached
    ).toBe(false)
  })

  it('leaves a save without settings without settings', async () => {
    const p = await fresh()
    p.recordEndingReached()
    p.resetProgress()
    expect(p.load().settings).toBeUndefined()
  })
})
