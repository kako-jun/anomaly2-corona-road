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
  it('a duplicate report does not reach a milestone of distinct kinds', async () => {
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

describe('recordShiftEnd', () => {
  it('adds 1 to loops each time', async () => {
    const { recordShiftEnd, load } = await fresh()
    recordShiftEnd()
    recordShiftEnd()
    expect(load().loops).toBe(2)
  })
  it('does not raise flags by itself (they rise at the next start)', async () => {
    const { recordShiftEnd, load } = await fresh()
    recordShiftEnd()
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
    recordShiftEnd()
    expect(raiseFlagsAtStart()).toEqual(['again'])
    expect(load().flags).toEqual({ again: true })
    expect(load().pendingStories).toEqual(['again'])
  })
  it('raises loops flags at their own boundary on the next start', async () => {
    const { recordShiftEnd, raiseFlagsAtStart, load } = await fresh()
    recordShiftEnd()
    expect(raiseFlagsAtStart()).toEqual(['again'])
    expect(load().flags.twice).toBeUndefined()
    recordShiftEnd()
    expect(load().flags.twice).toBeUndefined()
    expect(raiseFlagsAtStart()).toEqual(['twice'])
    expect(load().flags).toEqual({ again: true, twice: true })
  })
  it('does not return the same flag twice', async () => {
    const { recordShiftEnd, raiseFlagsAtStart } = await fresh()
    recordShiftEnd()
    raiseFlagsAtStart()
    expect(raiseFlagsAtStart()).toEqual([])
  })
})
