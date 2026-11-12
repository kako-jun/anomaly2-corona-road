import { describe, expect, it } from 'vitest'
import {
  SAVE_LIMITS,
  createSaveStore,
  emptySave,
  mergeSave,
  validateSave,
} from './saveData'
import {
  MAX_CODE_CHARS,
  encodeSave,
  importedSave,
  parseCode,
} from './transferCode'

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

describe('transfer code: limits and hostile input', () => {
  const b64 = (o: unknown) => btoa(JSON.stringify(o))
  it('refuses a huge paste without decoding it', () => {
    expect(parseCode('A'.repeat(MAX_CODE_CHARS + 10))).toEqual({
      ok: false,
      error: 'tooLarge',
    })
    expect(parseCode(' '.repeat(MAX_CODE_CHARS * 2))).toEqual({
      ok: false,
      error: 'tooLarge',
    })
  })
  it('refuses oversized lists, key sets and strings', () => {
    const big = (over: object) => ({ ...emptySave(), ...over })
    const ids = Array.from(
      { length: SAVE_LIMITS.listLength + 1 },
      (_, i) => `i${i}`
    )
    expect(validateSave(big({ foundIds: ids }))).toBeNull()
    expect(
      validateSave(
        big({ foundIds: ['x'.repeat(SAVE_LIMITS.stringLength + 1)] })
      )
    ).toBeNull()
    const flags = Object.fromEntries(
      Array.from({ length: SAVE_LIMITS.keys + 1 }, (_, i) => [`f${i}`, true])
    )
    expect(validateSave(big({ flags }))).toBeNull()
    expect(validateSave(big({ usedLines: { a: ids } }))).toBeNull()
    expect(validateSave(big({ foundIds: ids.slice(0, 5000) }))).not.toBeNull()
  })
  it('refuses counters that are not sane integers', () => {
    expect(validateSave({ ...emptySave(), loops: 1e300 })).toBeNull()
    expect(validateSave({ ...emptySave(), foundTotal: 2 ** 53 })).toBeNull()
    expect(validateSave({ ...emptySave(), loops: -0 })).not.toBeNull()
  })
  it('epoch: at or above the limit is invalid; below it imports as max+1', () => {
    const at = (epoch: number) => parseCode(b64({ ...emptySave(), epoch }))
    expect(at(Number.MAX_SAFE_INTEGER)).toEqual({ ok: false, error: 'invalid' })
    expect(at(SAVE_LIMITS.epoch)).toEqual({ ok: false, error: 'invalid' })
    const r = at(SAVE_LIMITS.epoch - 1)
    expect(r.ok).toBe(true)
    if (r.ok) {
      const out = importedSave(emptySave(), r.save)
      expect(out.epoch).toBe(SAVE_LIMITS.epoch)
      expect(validateSave(out)).not.toBeNull()
    }
    expect(at(-0).ok).toBe(true)
    expect(at(-1)).toEqual({ ok: false, error: 'invalid' })
  })
  it('keeps "__proto__" keys as plain data through parse and merge', () => {
    const json =
      '{"v":1,"foundTotal":0,"foundIds":[],"loops":0,"flags":{"__proto__":true},"usedLines":{"__proto__":["x"]},"usedChatter":[]}'
    const r = parseCode(btoa(json))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    const merged = mergeSave(r.save, emptySave())
    expect(Object.getPrototypeOf(merged.usedLines)).toBe(Object.prototype)
    expect(Object.keys(merged.usedLines)).toEqual(['__proto__'])
    expect(({} as { x?: unknown }).x).toBeUndefined()
    const plain = mergeSave(
      { ...emptySave(), usedLines: { a: ['1'] } },
      emptySave()
    )
    expect(plain.usedLines).toEqual({ a: ['1'] })
  })
  it('keeps unknown memo ids and round-trips an empty save', () => {
    const s = { ...emptySave(), pendingMemos: ['no-such-anomaly'] }
    const r = parseCode(encodeSave(s))
    expect(r.ok && r.save.pendingMemos).toEqual(['no-such-anomaly'])
    expect(parseCode(encodeSave(emptySave()))).toEqual({
      ok: true,
      save: emptySave(),
    })
  })
  it('a code without "v" (another game) is refused as invalid', () => {
    expect(parseCode(b64({ score: 5 }))).toEqual({
      ok: false,
      error: 'invalid',
    })
  })
})
