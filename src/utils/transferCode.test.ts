import { describe, expect, it } from 'vitest'
import { createSaveStore, emptySave, mergeSave } from './saveData'
import { encodeSave, importedSave, parseCode } from './transferCode'

const played = () => ({
  ...emptySave(),
  foundTotal: 5,
  foundIds: ['a', 'b'],
  loops: 2,
  flags: { elder1: true },
  usedLines: { a: ['x'] },
  usedChatter: ['c1'],
  pendingStories: ['elder1'],
  endingReached: true,
  epoch: 3,
})

describe('transfer code', () => {
  it('round-trips a save', () => {
    const r = parseCode(encodeSave(played()))
    expect(r).toEqual({ ok: true, save: played() })
  })
  it('keeps non-ASCII text intact', () => {
    const s = { ...played(), foundIds: ['異変１'] }
    const r = parseCode(encodeSave(s))
    expect(r.ok && r.save.foundIds).toEqual(['異変１'])
  })
  it('ignores whitespace and line breaks from copying', () => {
    const code = encodeSave(played())
    const spaced = `  ${code.slice(0, 20)}\n${code.slice(20)}\n`
    expect(parseCode(spaced).ok).toBe(true)
  })
  it('refuses empty, non-code, damaged and newer input without throwing', () => {
    const b64 = (o: unknown) => btoa(JSON.stringify(o))
    expect(parseCode('  ')).toEqual({ ok: false, error: 'empty' })
    expect(parseCode('hello world!')).toEqual({ ok: false, error: 'notCode' })
    expect(parseCode('QUJD')).toEqual({ ok: false, error: 'notCode' })
    expect(parseCode(b64({ v: 1, foundTotal: 'x' }))).toEqual({
      ok: false,
      error: 'invalid',
    })
    expect(parseCode(b64([1, 2]))).toEqual({ ok: false, error: 'invalid' })
    expect(parseCode(b64({ v: 99 }))).toEqual({ ok: false, error: 'newer' })
    expect(parseCode(encodeSave(played()).slice(0, -9)).ok).toBe(false)
  })
  it('accepts a code without the newer fields (an old save)', () => {
    const old = {
      v: 1,
      foundTotal: 1,
      foundIds: ['a'],
      loops: 1,
      flags: {},
      usedLines: {},
      usedChatter: [],
    }
    const r = parseCode(btoa(JSON.stringify(old)))
    expect(r.ok && r.save.epoch).toBe(0)
  })
})

describe('importedSave', () => {
  it('writes epoch = max(local, imported) + 1 and takes the imported progress whole', () => {
    const local = { ...emptySave(), epoch: 5, foundIds: ['z'] }
    const out = importedSave(local, played())
    expect(out.epoch).toBe(6)
    expect(out.foundIds).toEqual(['a', 'b'])
    expect(importedSave({ ...emptySave(), epoch: 1 }, played()).epoch).toBe(4)
  })
  it('keeps this device settings, else the imported ones', () => {
    const imp = { ...played(), settings: { brightness: 1 } }
    expect(
      importedSave({ ...emptySave(), settings: { contrast: 2 } }, imp).settings
    ).toEqual({ contrast: 2 })
    expect(importedSave(emptySave(), imp).settings).toEqual({ brightness: 1 })
  })
  it('beats an older tab holding the previous progress', () => {
    const old = { ...emptySave(), foundIds: ['old'], foundTotal: 9 }
    const out = importedSave(old, { ...played(), epoch: 0 })
    expect(mergeSave(old, out)).toEqual(out)
    expect(mergeSave(out, old)).toEqual(out)
  })
  it('is written through the store and survives a reload', () => {
    const mem = new Map<string, string>()
    const storage = {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => void mem.set(k, v),
      removeItem: (k: string) => void mem.delete(k),
    } as unknown as Storage
    const store = createSaveStore({ getStorage: () => storage })
    store.update(() => ({ ...emptySave(), epoch: 2 }))
    store.update(cur => importedSave(cur, played()))
    const again = createSaveStore({ getStorage: () => storage }).load()
    expect(again.epoch).toBe(4)
    expect(again.flags).toEqual({ elder1: true })
  })
})

describe('transfer code: memo fields (#325)', () => {
  const withMemos = () => ({
    ...played(),
    pendingMemoFlags: ['f1'],
    shownMemoFlags: ['f0'],
    pendingMemos: ['m1', 'm2'],
    shownMemos: ['m0'],
    lastShift: {
      found: 3,
      fresh: 1,
      misreports: 0,
      durationMs: 1000,
      closing: 'dawn' as const,
      raised: [],
      memoFlag: 'f0',
      memo: 'm0',
    },
  })
  it('keeps the memo queues and the last shift memo through a round trip', () => {
    const r = parseCode(encodeSave(withMemos()))
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.save.pendingMemoFlags).toEqual(['f1'])
      expect(r.save.shownMemoFlags).toEqual(['f0'])
      expect(r.save.pendingMemos).toEqual(['m1', 'm2'])
      expect(r.save.shownMemos).toEqual(['m0'])
      expect(r.save.lastShift?.memoFlag).toBe('f0')
      expect(r.save.lastShift?.memo).toBe('m0')
    }
  })
  it('imports the memo queues whole and sets epoch = max + 1', () => {
    const local = { ...emptySave(), epoch: 7, pendingMemos: ['zz'] }
    const out = importedSave(local, withMemos())
    expect(out.epoch).toBe(8)
    expect(out.pendingMemos).toEqual(['m1', 'm2'])
    const out2 = importedSave({ ...emptySave(), epoch: 1 }, withMemos())
    expect(out2.epoch).toBe(4)
  })
})
