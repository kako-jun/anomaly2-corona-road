// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DialogueLedger } from './dialogueLedger'
import type { LastShift } from './saveData'

/** The scribble that goes with an anomaly's one-liner (#325): picked with it, shown once, dropped when it cannot load. */
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
  entry('cat', { memo: line('cat'), memoImage: 'cat.webp' }),
  entry('plain', { memo: line('plain') }),
  entry('none'),
]
const dialogue: DialogueLedger = { flags: [], entries: [] }
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
  const { InvestigationNote } = await import('../components/InvestigationNote')
  return {
    ...progress,
    ...saveData,
    buildNote: note.buildNote,
    InvestigationNote,
  }
}

afterEach(cleanup)

describe('the memo scribble across shifts', () => {
  const viewOf = (p: Awaited<ReturnType<typeof fresh>>, lang: 'ja' | 'en') =>
    p.buildNote(
      {
        mode: 'after',
        save: p.load(),
        shift: p.load().lastShift as LastShift,
      },
      lang
    )

  it('comes with the one-liner of an anomaly that has one, in both languages, and again when the result is reopened', async () => {
    const p = await fresh()
    p.recordFound('cat')
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift?.memo).toBe('cat')
    for (const lang of ['ja', 'en'] as const) {
      expect(viewOf(p, lang).sketch).toBe('/note-sketches/cat.webp')
      expect(viewOf(p, lang).sketch).toBe('/note-sketches/cat.webp')
    }
  })

  it('is not shown for a one-liner without one, for an anomaly with no one-liner, or before a shift', async () => {
    const p = await fresh()
    p.recordFound('plain')
    p.recordFound('none')
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift?.memo).toBe('plain')
    expect(viewOf(p, 'ja').sketch).toBeUndefined()
    expect(viewOf(p, 'ja')).not.toHaveProperty('sketch')
    p.recordFound('cat')
    expect(
      p.buildNote({ mode: 'before', save: p.load() }, 'ja')
    ).not.toHaveProperty('sketch')
  })

  it('is never shown twice: it goes with the one-liner, which is shown once', async () => {
    const p = await fresh()
    p.recordFound('cat')
    p.recordShiftEnd(SHIFT)
    expect(viewOf(p, 'ja').sketch).toBeDefined()
    p.recordFound('cat') // found again
    p.recordShiftEnd(SHIFT)
    expect(p.load().lastShift?.memo).toBeUndefined()
    expect(viewOf(p, 'ja').sketch).toBeUndefined()
    expect(p.load().shownMemos).toEqual(['cat'])
  })

  it('adds nothing to the save: no key for it (the shape of the save is unchanged)', async () => {
    const p = await fresh()
    p.recordFound('cat')
    p.recordShiftEnd(SHIFT)
    expect(JSON.stringify(p.load())).not.toMatch(
      /note-sketches|memoImage|cat\.webp/
    )
  })

  it('is drawn as a lazy, alt-less, hidden image next to the one-liner; the text is the readable part', async () => {
    const p = await fresh()
    p.recordFound('cat')
    p.recordShiftEnd(SHIFT)
    const { container } = render(
      createElement(p.InvestigationNote, {
        view: viewOf(p, 'ja'),
        onAction: () => {},
      })
    )
    const img = container.querySelector('img.note-sketch') as HTMLImageElement
    expect(img.getAttribute('src')).toBe('/note-sketches/cat.webp')
    expect(img.getAttribute('alt')).toBe('')
    expect(img.getAttribute('aria-hidden')).toBe('true')
    expect(img.getAttribute('loading')).toBe('lazy')
    expect(container.querySelector('.note-syn')?.contains(img)).toBe(true)
    expect(
      [...container.querySelectorAll('.note-syn p')].map(e => e.textContent)
    ).toContain('メモcat')
  })

  it('draws no image for a one-liner without one', async () => {
    const p = await fresh()
    p.recordFound('plain')
    p.recordShiftEnd(SHIFT)
    const { container } = render(
      createElement(p.InvestigationNote, {
        view: viewOf(p, 'en'),
        onAction: () => {},
      })
    )
    expect(container.querySelector('img.note-sketch')).toBeNull()
    expect(container.textContent).toContain('memo plain')
  })

  it('drops an image that cannot be loaded and keeps the words (no broken image)', async () => {
    const p = await fresh()
    p.recordFound('cat')
    p.recordShiftEnd(SHIFT)
    const { container } = render(
      createElement(p.InvestigationNote, {
        view: viewOf(p, 'en'),
        onAction: () => {},
      })
    )
    const img = container.querySelector('img.note-sketch') as HTMLImageElement
    fireEvent.error(img)
    expect(container.querySelector('img.note-sketch')).toBeNull()
    expect(
      [...container.querySelectorAll('.note-syn p')].map(e => e.textContent)
    ).toContain('memo cat')
  })
})
