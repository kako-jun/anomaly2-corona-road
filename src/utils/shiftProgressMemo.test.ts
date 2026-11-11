// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import type { DialogueLedger } from './dialogueLedger'
import type { LastShift } from './saveData'

/** The memo flow across shifts (#325), on a small ledger of its own. */
const entry = (id: string, over: Record<string, unknown> = {}) => ({
  id,
  cameraId: 1,
  category: 'Object',
  anomalyType: 'add_object',
  overlay: 'assets/anomaly-overlays/cam01/x.webp',
  origin: { x: 0, y: 0 },
  size: { w: 1, h: 1 },
  ...over,
})
const line = (n: string) => ({ ja: `メモ${n}`, en: `memo ${n}` })
const ENTRIES = [
  entry('shut', { memoFlags: ['shutter'] }),
  entry('eat', { memoFlags: ['food'], memo: line('eat') }),
  entry('rei', { reiwa: true }),
  entry('a', { memo: line('a') }),
  entry('b', { memo: line('b') }),
  entry('c', { memo: line('c') }),
  entry('plain'),
]
const dialogue: DialogueLedger = {
  flags: [
    { name: 'elder1', when: { foundTotal: 2 } },
    { name: 'child', when: { foundTotal: 99 } },
  ],
  entries: [],
}
const SHIFT: LastShift = {
  found: 3,
  fresh: 1,
  misreports: 0,
  durationMs: 480000,
  closing: 'dawn',
  raised: [],
}

const fresh = async () => {
  localStorage.clear()
  vi.resetModules()
  vi.doMock('virtual:dialogue', () => ({ default: dialogue }))
  vi.doMock('virtual:anomalies', () => ({ default: ENTRIES }))
  const progress = await import('./shiftProgress')
  const saveData = await import('./saveData')
  const note = await import('./investigationNote')
  return { ...progress, ...saveData, buildNote: note.buildNote }
}

describe('memos across shifts', () => {
  it('a night with no flag and no one-liner anomaly gives the ordinary memo', async () => {
    const p = await fresh()
    p.recordFound('plain')
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift).toEqual(SHIFT)
    expect(p.load().shownMemoFlags).toEqual([])
  })

  it('queues what a report raises, in the order of the reports, and not twice', async () => {
    const p = await fresh()
    p.recordFound('rei')
    p.recordFound('shut')
    p.recordFound('rei')
    expect(p.load().pendingMemoFlags).toEqual(['reiwa', 'shutter'])
    p.recordFound('a')
    p.recordFound('a')
    expect(p.load().pendingMemos).toEqual(['a'])
  })

  it('shows one hypothesis and one one-liner per result and carries the rest to the next ones', async () => {
    const p = await fresh()
    // Stage elder1 from the first night (foundTotal flag), so food can show; shutter and reiwa wait for the child.
    p.recordFound('eat')
    p.recordFound('shut')
    p.recordFound('a')
    p.recordFound('b')
    p.recordFound('c')
    expect(p.load().flags.elder1).toBe(true)
    p.recordShiftEnd(SHIFT)
    const first = p.load().lastShift
    expect(first?.memoFlag).toBe('food')
    expect(['eat', 'a', 'b', 'c']).toContain(first?.memo)
    expect(p.load().pendingMemoFlags).toEqual(['shutter'])
    expect(p.load().shownMemoFlags).toEqual(['food'])
    // The one-liners come out one a night, each only once, in a night when nothing new was found.
    const seen = [first?.memo]
    for (let i = 0; i < 3; i++) {
      p.recordShiftEnd(SHIFT)
      seen.push(p.load().lastShift?.memo)
    }
    expect([...seen].sort()).toEqual(['a', 'b', 'c', 'eat'])
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift?.memo).toBeUndefined()
    // The hypothesis that is not yet known stays waiting, and nothing but the stage is needed to show it.
    expect(p.load().pendingMemoFlags).toEqual(['shutter'])
    expect(p.load().lastShift?.memoFlag).toBeUndefined()
  })

  it('shows a waiting hypothesis once the stage is reached, even on a night when nothing was found', async () => {
    const p = await fresh()
    p.recordFound('shut')
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift?.memoFlag).toBeUndefined()
    p.update(cur => ({ ...cur, flags: { ...cur.flags, child: true } }))
    p.recordShiftEnd({ ...SHIFT, found: 0, fresh: 0 })
    expect(p.load().lastShift?.memoFlag).toBe('shutter')
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift?.memoFlag).toBeUndefined()
  })

  it('never shows the same hypothesis again, however often it is raised again', async () => {
    const p = await fresh()
    p.update(cur => ({ ...cur, flags: { child: true } }))
    p.recordFound('shut')
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift?.memoFlag).toBe('shutter')
    p.recordFound('shut')
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift?.memoFlag).toBeUndefined()
    expect(p.load().pendingMemoFlags).toEqual([])
  })

  it('the result keeps showing the same memos when it is opened again', async () => {
    const p = await fresh()
    p.update(cur => ({ ...cur, flags: { child: true } }))
    p.recordFound('shut')
    p.recordFound('a')
    p.recordFound('b')
    p.recordShiftEnd(SHIFT)
    const view = () =>
      p
        .buildNote(
          {
            mode: 'after',
            save: p.load(),
            shift: p.load().lastShift as LastShift,
          },
          'ja'
        )
        .lines.map(l => l.text)
    const first = view()
    expect(first.some(t => t.startsWith('メモ'))).toBe(true)
    expect(first.some(t => t.includes('シャッター'))).toBe(true)
    expect(view()).toEqual(first)
    expect(view()).toEqual(first)
  })

  it('puts the hypothesis before the one-liner, after the ordinary lines, in both languages', async () => {
    const p = await fresh()
    p.update(cur => ({ ...cur, flags: { child: true } }))
    p.recordFound('shut')
    p.recordFound('a')
    p.recordShiftEnd(SHIFT)
    for (const lang of ['ja', 'en'] as const) {
      const lines = p
        .buildNote(
          {
            mode: 'after',
            save: p.load(),
            shift: p.load().lastShift as LastShift,
          },
          lang
        )
        .lines.map(l => l.text)
      expect(lines[lines.length - 1]).toBe(lang === 'ja' ? 'メモa' : 'memo a')
      expect(lines[lines.length - 2]).toMatch(
        lang === 'ja' ? /シャッター/ : /shutter/
      )
    }
  })

  it('ERASE ALL clears waiting and shown memos, so they can come again', async () => {
    const p = await fresh()
    p.update(cur => ({ ...cur, flags: { child: true } }))
    p.recordFound('shut')
    p.recordFound('a')
    p.recordFound('b')
    p.recordShiftEnd(SHIFT)
    expect(p.load().shownMemoFlags).toEqual(['shutter'])
    p.resetProgress()
    const s = p.load()
    expect(s.pendingMemoFlags).toEqual([])
    expect(s.shownMemoFlags).toEqual([])
    expect(s.pendingMemos).toEqual([])
    expect(s.shownMemos).toEqual([])
    p.update(cur => ({ ...cur, flags: { child: true } }))
    p.recordFound('shut')
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift?.memoFlag).toBe('shutter')
  })

  it('an old save without any memo field loads and works', async () => {
    localStorage.clear()
    localStorage.setItem(
      'corona-road:save',
      JSON.stringify({
        v: 1,
        foundTotal: 5,
        foundIds: ['a'],
        loops: 2,
        flags: { elder1: true },
        usedLines: {},
        usedChatter: [],
        pendingStories: [],
      })
    )
    vi.resetModules()
    vi.doMock('virtual:dialogue', () => ({ default: dialogue }))
    vi.doMock('virtual:anomalies', () => ({ default: ENTRIES }))
    const p = await import('./shiftProgress')
    const saveData = await import('./saveData')
    expect(saveData.load().foundTotal).toBe(5)
    expect(saveData.load().pendingMemoFlags).toEqual([])
    p.recordFound('eat')
    p.recordShiftEnd(SHIFT)
    expect(saveData.load().lastShift?.memoFlag).toBe('food')
  })
})
