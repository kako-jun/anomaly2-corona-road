import { describe, expect, it } from 'vitest'
import { DIALOGUE, DialogueLine } from '../data/dialogue'
import {
  SubtitleCursor,
  hintGroups,
  nextSubtitle,
  normalLines,
  queueHint,
  subtitleHoldMs,
} from './subtitle'

const chars = (n: number) => 'あ'.repeat(n)

describe('subtitleHoldMs', () => {
  it('is the 2200 minimum for 0 chars', () => {
    expect(subtitleHoldMs(chars(0))).toBe(2200)
  })
  it('is still the minimum at 4 chars (1600+480=2080 < 2200)', () => {
    expect(subtitleHoldMs(chars(4))).toBe(2200)
  })
  it('switches to the formula at 5 chars (1600+600=2200)', () => {
    expect(subtitleHoldMs(chars(5))).toBe(2200)
  })
  it('grows at 6 chars (1600+720)', () => {
    expect(subtitleHoldMs(chars(6))).toBe(2320)
  })
  it('counts a full-width space as one char', () => {
    expect(subtitleHoldMs('　'.repeat(10))).toBe(1600 + 10 * 120)
  })
  it('counts the ellipsis "……" as two chars', () => {
    expect(subtitleHoldMs('……'.repeat(5))).toBe(1600 + 10 * 120)
  })
  it('counts "?" as one char', () => {
    expect(subtitleHoldMs('?'.repeat(10))).toBe(1600 + 10 * 120)
  })
  it('counts a surrogate pair as 2 (current behaviour, UTF-16 length)', () => {
    expect(subtitleHoldMs('𠮷'.repeat(10))).toBe(1600 + 20 * 120)
  })
  it('is finite and >= 2200 for every real DIALOGUE line', () => {
    for (const d of DIALOGUE) {
      const ms = subtitleHoldMs(d.text)
      expect(Number.isFinite(ms)).toBe(true)
      expect(ms).toBeGreaterThanOrEqual(2200)
    }
  })
})

const sample: DialogueLine[] = [
  { who: 'A', text: 'n1' },
  { who: 'M', text: 'h1', hint: true },
  { who: 'A', text: 'n2' },
  { who: 'M', text: 'h2', hint: true },
  { who: 'A', text: 'h3', hint: true },
  { who: 'M', text: 'n3' },
]

describe('normalLines', () => {
  it('excludes hint lines and keeps order', () => {
    expect(normalLines(sample)).toEqual(['n1', 'n2', 'n3'])
  })
})

describe('hintGroups', () => {
  const mk = (n: number): DialogueLine[] =>
    Array.from({ length: n }, (_, i) => ({
      who: 'A' as const,
      text: `h${i}`,
      hint: true,
    }))
  it('returns no groups for 0 hints', () => {
    expect(hintGroups(mk(0))).toEqual([])
  })
  it('returns one single-line group for 1 hint', () => {
    expect(hintGroups(mk(1))).toEqual([['h0']])
  })
  it('returns one pair for 2 hints', () => {
    expect(hintGroups(mk(2))).toEqual([['h0', 'h1']])
  })
  it('returns a pair and a single for 3 hints', () => {
    expect(hintGroups(mk(3))).toEqual([['h0', 'h1'], ['h2']])
  })
  it('returns two pairs for 4 hints', () => {
    expect(hintGroups(mk(4))).toEqual([
      ['h0', 'h1'],
      ['h2', 'h3'],
    ])
  })
  it('splits the real DIALOGUE into 2 groups of 2', () => {
    const g = hintGroups(DIALOGUE)
    expect(g).toHaveLength(2)
    expect(g.map(x => x.length)).toEqual([2, 2])
  })
})

describe('nextSubtitle', () => {
  const normal = ['a', 'b', 'c']
  it('prefers pending: returns its head and keeps the rest pending', () => {
    const r = nextSubtitle(normal, { index: 1, pending: ['h1', 'h2'] })
    expect(r.text).toBe('h1')
    expect(r.cursor).toEqual({ index: 1, pending: ['h2'] })
  })
  it('returns the normal line at index and advances when pending is empty', () => {
    const r = nextSubtitle(normal, { index: 1, pending: [] })
    expect(r.text).toBe('b')
    expect(r.cursor).toEqual({ index: 2, pending: [] })
  })
  it('loops past the end of the normal lines', () => {
    expect(nextSubtitle(normal, { index: 3, pending: [] }).text).toBe('a')
    expect(nextSubtitle(normal, { index: 7, pending: [] }).text).toBe('b')
  })
  it('does not mutate its input cursor', () => {
    const cursor: SubtitleCursor = { index: 0, pending: ['h1', 'h2'] }
    nextSubtitle(normal, cursor)
    expect(cursor).toEqual({ index: 0, pending: ['h1', 'h2'] })
    const c2: SubtitleCursor = { index: 0, pending: [] }
    nextSubtitle(normal, c2)
    expect(c2).toEqual({ index: 0, pending: [] })
  })
})

describe('queueHint', () => {
  const groups = [['g0a', 'g0b'], ['g1a']]
  it('returns the same cursor reference when there are no groups', () => {
    const cursor: SubtitleCursor = { index: 2, pending: [] }
    const r = queueHint([], cursor, 5)
    expect(r.cursor).toBe(cursor)
    expect(r.hintIndex).toBe(5)
  })
  it('queues the group at hintIndex and advances hintIndex', () => {
    const r = queueHint(groups, { index: 2, pending: [] }, 0)
    expect(r.cursor).toEqual({ index: 2, pending: ['g0a', 'g0b'] })
    expect(r.hintIndex).toBe(1)
  })
  it('cycles when hintIndex exceeds the number of groups', () => {
    expect(
      queueHint(groups, { index: 0, pending: [] }, 2).cursor.pending
    ).toEqual(['g0a', 'g0b'])
    expect(
      queueHint(groups, { index: 0, pending: [] }, 3).cursor.pending
    ).toEqual(['g1a'])
  })
  it('replaces (drops) an existing pending queue', () => {
    const r = queueHint(groups, { index: 0, pending: ['old'] }, 1)
    expect(r.cursor.pending).toEqual(['g1a'])
  })
  it('does not mutate the source groups when the cursor is later consumed', () => {
    const copy = structuredClone(groups)
    const r = queueHint(groups, { index: 0, pending: [] }, 0)
    nextSubtitle(['x'], r.cursor)
    r.cursor.pending.push('zzz')
    expect(groups).toEqual(copy)
  })
})

describe('real DIALOGUE sequence', () => {
  it('plays normal, then false-report hints, then resumes normal', () => {
    const normal = normalLines(DIALOGUE)
    const groups = hintGroups(DIALOGUE)
    let cursor: SubtitleCursor = { index: 0, pending: [] }
    const out: string[] = []
    const step = () => {
      const r = nextSubtitle(normal, cursor)
      cursor = r.cursor
      out.push(r.text)
    }
    step()
    step()
    cursor = queueHint(groups, cursor, 0).cursor
    step()
    step()
    step()
    expect(out).toEqual([
      normal[0],
      normal[1],
      groups[0][0],
      groups[0][1],
      normal[2],
    ])
  })
})
