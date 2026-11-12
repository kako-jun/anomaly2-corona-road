import { describe, expect, it } from 'vitest'
import { MEMO_FLAG_TEXT, STAGE_ORDER } from '../data/investigationNotes'
import type { LedgerEntry } from './anomalyLedger'
import {
  markShown,
  memoIndexOf,
  memoSeed,
  pickMemos,
  queueMemos,
} from './memoSelect'
import type { MemoMeta } from './memoSelect'
import { emptySave } from './saveData'
import type { SaveData } from './saveData'

const entry = (id: string, over: Partial<LedgerEntry> = {}): LedgerEntry => ({
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
const save = (over: Partial<SaveData> = {}): SaveData => ({
  ...emptySave(),
  ...over,
})

const index = memoIndexOf([
  entry('s1', { memoFlags: ['shutter'] }),
  entry('s2', { memoFlags: ['shutter'], memo: line('s2') }),
  entry('f1', { memoFlags: ['food'], memo: line('f1') }),
  entry('r1', { reiwa: true }),
  entry('fr', { memoFlags: ['food'], reiwa: true }),
  entry('m1', { memo: line('m1') }),
  entry('m2', { memo: line('m2') }),
  entry('m3', { memo: line('m3') }),
  entry('plain'),
])

describe('memoIndexOf', () => {
  it('lists only entries that carry a flag or a one-liner; reiwa: true also raises the reiwa flag', () => {
    expect([...index.keys()]).toEqual([
      's1',
      's2',
      'f1',
      'r1',
      'fr',
      'm1',
      'm2',
      'm3',
    ])
    expect(index.get('r1')?.flags).toEqual(['reiwa'])
    expect(index.get('fr')?.flags).toEqual(['food', 'reiwa'])
    expect(index.get('plain')).toBeUndefined()
  })
  it('carries the scribble of a one-liner (the ledger memo_image), and only with a one-liner', () => {
    const i = memoIndexOf([
      entry('p', { memo: line('p'), memoImage: 'p.webp' }),
      entry('q', { memo: line('q') }),
      entry('r', { memoFlags: ['food'], memoImage: 'r.webp' }),
    ])
    expect(i.get('p')?.image).toBe('p.webp')
    expect(i.get('q')).not.toHaveProperty('image')
    expect(i.get('r')).not.toHaveProperty('image')
  })
  it('does not list reiwa twice when it is marked both ways', () => {
    const i = memoIndexOf([entry('x', { memoFlags: ['reiwa'], reiwa: true })])
    expect(i.get('x')?.flags).toEqual(['reiwa'])
  })
})

describe('queueMemos', () => {
  const m = (id: string): MemoMeta | undefined => index.get(id)
  it('queues flags in the order they were raised and a one-liner id once', () => {
    let s = save()
    s = queueMemos(s, 'f1', m('f1'))
    s = queueMemos(s, 's2', m('s2'))
    s = queueMemos(s, 'f1', m('f1'))
    expect(s.pendingMemoFlags).toEqual(['food', 'shutter'])
    expect(s.pendingMemos).toEqual(['f1', 's2'])
  })
  it('a flag-only anomaly queues no one-liner; an unknown anomaly changes nothing', () => {
    const s = queueMemos(save(), 's1', m('s1'))
    expect(s.pendingMemoFlags).toEqual(['shutter'])
    expect(s.pendingMemos).toEqual([])
    const same = save()
    expect(queueMemos(same, 'plain', undefined)).toBe(same)
  })
  it('never queues what was shown before', () => {
    const s = queueMemos(
      save({ shownMemoFlags: ['shutter'], shownMemos: ['s2'] }),
      's2',
      m('s2')
    )
    expect(s.pendingMemoFlags).toEqual([])
    expect(s.pendingMemos).toEqual([])
  })
})

describe('pickMemos', () => {
  it('shows nothing on a night that raised nothing', () => {
    expect(pickMemos(save(), 'child', index)).toEqual({})
  })
  it('shows one hypothesis (the oldest waiting) and one one-liner at once, never two of a kind', () => {
    const s = save({
      pendingMemoFlags: ['food', 'shutter'],
      pendingMemos: ['m1', 'm2'],
    })
    const pick = pickMemos(s, 'child', index)
    expect(pick.memoFlag).toBe('food')
    expect(['m1', 'm2']).toContain(pick.memo)
  })
  it('keeps a flag waiting until the stage its wording is known from, and moves to the next one meanwhile', () => {
    const s = save({ pendingMemoFlags: ['shutter', 'food', 'reiwa'] })
    // shutter and reiwa are known only from the child; food from the first elder.
    expect(pickMemos(s, 'none', index).memoFlag).toBeUndefined()
    expect(pickMemos(s, 'elder1', index).memoFlag).toBe('food')
    expect(pickMemos(s, 'child', index).memoFlag).toBe('shutter')
  })
  it('every flag becomes pickable at the stage of its text, and not a stage earlier', () => {
    for (const [flag, text] of Object.entries(MEMO_FLAG_TEXT)) {
      const at = STAGE_ORDER.indexOf(text.knownFrom)
      STAGE_ORDER.forEach((stage, i) => {
        const got = pickMemos(save({ pendingMemoFlags: [flag] }), stage, index)
        expect(got.memoFlag === flag, `${flag} at ${stage}`).toBe(i >= at)
      })
    }
  })
  it('skips a flag the build does not know and an anomaly no longer in the ledger', () => {
    const s = save({
      pendingMemoFlags: ['gone', 'food'],
      pendingMemos: ['removed', 'plain', 'm1'],
    })
    expect(pickMemos(s, 'child', index)).toEqual({
      memoFlag: 'food',
      memo: 'm1',
    })
  })
  it('picks the same one-liner for the same save, every time', () => {
    const s = save({
      loops: 4,
      foundTotal: 11,
      foundIds: ['m1', 'm2', 'm3'],
      pendingMemos: ['m1', 'm2', 'm3'],
    })
    const first = pickMemos(s, 'elder1', index).memo
    for (let i = 0; i < 20; i++)
      expect(pickMemos({ ...s }, 'elder1', index).memo).toBe(first)
    expect(memoSeed(s)).toBe(memoSeed({ ...s }))
  })
  it('spreads over the waiting one-liners as the save changes (random, not always the first)', () => {
    const seen = new Set<string>()
    for (let loops = 0; loops < 60; loops++) {
      const s = save({ loops, pendingMemos: ['m1', 'm2', 'm3'] })
      const p = pickMemos(s, 'elder1', index).memo
      if (p) seen.add(p)
    }
    expect(seen).toEqual(new Set(['m1', 'm2', 'm3']))
  })
})

describe('markShown', () => {
  it('moves the picked ones from waiting to shown and leaves the rest waiting', () => {
    const s = save({
      pendingMemoFlags: ['food', 'shutter'],
      pendingMemos: ['m1', 'm2'],
    })
    const next = markShown(s, { memoFlag: 'food', memo: 'm2' })
    expect(next.pendingMemoFlags).toEqual(['shutter'])
    expect(next.shownMemoFlags).toEqual(['food'])
    expect(next.pendingMemos).toEqual(['m1'])
    expect(next.shownMemos).toEqual(['m2'])
  })
  it('changes nothing when nothing was picked', () => {
    const s = save({ pendingMemoFlags: ['food'] })
    expect(markShown(s, {})).toEqual(s)
  })
})
