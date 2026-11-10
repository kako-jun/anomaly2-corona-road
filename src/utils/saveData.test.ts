import { describe, expect, it, vi } from 'vitest'
import {
  BROKEN_KEY,
  PROBE_KEY,
  SAVE_KEY,
  createSaveStore,
  emptySave,
  mergeSave,
  validateSave,
} from './saveData'
import type { SaveData } from './saveData'

const save = (over: Partial<SaveData> = {}): SaveData => ({
  ...emptySave(),
  ...over,
})

/** A fake Storage whose operations can be made to throw. */
const fakeStorage = (init: Record<string, string> = {}) => {
  const data = new Map(Object.entries(init))
  const fail = { get: false, set: false, remove: false, setKey: '' as string }
  const storage = {
    getItem: (k: string) => {
      if (fail.get) throw new Error('getItem failed')
      return data.has(k) ? (data.get(k) as string) : null
    },
    setItem: (k: string, v: string) => {
      if (fail.set && (!fail.setKey || fail.setKey === k))
        throw new Error('quota')
      data.set(k, v)
    },
    removeItem: (k: string) => {
      if (fail.remove) throw new Error('removeItem failed')
      data.delete(k)
    },
  } as unknown as Storage
  return { storage, data, fail }
}

describe('validateSave', () => {
  it('accepts a valid save', () => {
    const s = save({ foundTotal: 3, foundIds: ['a'], loops: 1 })
    expect(validateSave(s)).toEqual(s)
  })
  it('removes duplicates from foundIds', () => {
    expect(validateSave(save({ foundIds: ['a', 'a', 'b'] }))?.foundIds).toEqual(
      ['a', 'b']
    )
  })
  it('removes duplicates from usedChatter', () => {
    expect(
      validateSave(save({ usedChatter: ['x', 'x'] }))?.usedChatter
    ).toEqual(['x'])
  })
  it('removes duplicates inside each usedLines list', () => {
    expect(
      validateSave(save({ usedLines: { k: ['x', 'x', 'y'] } }))?.usedLines
    ).toEqual({ k: ['x', 'y'] })
  })
  it.each([
    ['null', null],
    ['a string', 'x'],
    ['a number', 1],
    ['an array', []],
    ['undefined', undefined],
  ])('rejects %s', (_n, raw) => {
    expect(validateSave(raw)).toBeNull()
  })
  it.each([
    [0, false],
    [1, true],
    [2, false],
    [1.5, false],
    ['1', false],
    [undefined, false],
  ])('version %j accepted=%s', (v, ok) => {
    const r = validateSave({ ...save(), v })
    if (ok) expect(r).not.toBeNull()
    else expect(r).toBeNull()
  })
  it.each([
    [-1, false],
    [0, true],
    [1, true],
    [1.5, false],
    ['1', false],
  ])('foundTotal %j accepted=%s', (n, ok) => {
    expect(validateSave({ ...save(), foundTotal: n } as unknown) !== null).toBe(
      ok
    )
  })
  it.each([
    [-1, false],
    [0, true],
    [1, true],
    [1.5, false],
    ['1', false],
  ])('loops %j accepted=%s', (n, ok) => {
    expect(validateSave({ ...save(), loops: n } as unknown) !== null).toBe(ok)
  })
  it('rejects a non-boolean flag value', () => {
    expect(validateSave({ ...save(), flags: { a: 1 } })).toBeNull()
  })
  it('rejects flags that is not a mapping', () => {
    expect(validateSave({ ...save(), flags: [] })).toBeNull()
  })
  it('rejects a usedLines value that is not an array', () => {
    expect(validateSave({ ...save(), usedLines: { k: 'x' } })).toBeNull()
  })
  it('rejects a non-string in foundIds', () => {
    expect(validateSave({ ...save(), foundIds: ['a', 1] })).toBeNull()
  })
  it('rejects a non-string in usedChatter', () => {
    expect(validateSave({ ...save(), usedChatter: [1] })).toBeNull()
  })
  it('accepts a save without settings', () => {
    expect(validateSave(save())?.settings).toBeUndefined()
  })
  it('keeps valid settings', () => {
    const s = save({ settings: { brightness: 40, contrast: 60 } })
    expect(validateSave(s)?.settings).toEqual({ brightness: 40, contrast: 60 })
  })
  it.each([
    ['missing contrast', { brightness: 40 }],
    ['missing brightness', { contrast: 40 }],
    ['non-number', { brightness: '40', contrast: 40 }],
    ['not an object', 5],
  ])('rejects settings with %s', (_n, settings) => {
    expect(validateSave({ ...save(), settings })).toBeNull()
  })
  it('rejects pendingStories that is not an array', () => {
    expect(validateSave({ ...save(), pendingStories: 'x' })).toBeNull()
  })
  it('rejects pendingStories holding a non-string', () => {
    expect(validateSave({ ...save(), pendingStories: [1] })).toBeNull()
  })
  it('treats an old save without pendingStories as []', () => {
    const old: Record<string, unknown> = { ...save() }
    delete old.pendingStories
    expect(validateSave(old)?.pendingStories).toEqual([])
  })
  it('treats an old save without endingReached as not reached (#294)', () => {
    const old: Record<string, unknown> = { ...save() }
    delete old.endingReached
    expect(validateSave(old)?.endingReached).toBe(false)
  })
  it('keeps endingReached true and rejects a non-boolean', () => {
    expect(validateSave(save({ endingReached: true }))?.endingReached).toBe(
      true
    )
    expect(validateSave({ ...save(), endingReached: 1 })).toBeNull()
  })
  it('merges endingReached with OR', () => {
    expect(mergeSave(save({ endingReached: true }), save()).endingReached).toBe(
      true
    )
    expect(mergeSave(save(), save()).endingReached).toBe(false)
  })
  it('removes duplicates from pendingStories', () => {
    expect(
      validateSave(save({ pendingStories: ['a', 'a'] }))?.pendingStories
    ).toEqual(['a'])
  })
})

describe('mergeSave keeps what only one side has', () => {
  const side = (own: string[]) =>
    save({ foundIds: own, usedChatter: own, pendingStories: own })
  const m = mergeSave(side(['a-only', 'both']), side(['both', 'b-only']))
  const expected = ['a-only', 'b-only', 'both']
  it('usedChatter is a union of both sides', () =>
    expect([...m.usedChatter].sort()).toEqual(expected))
  it('pendingStories is a union of both sides', () =>
    expect([...m.pendingStories].sort()).toEqual(expected))
  it('foundIds is a union of both sides', () =>
    expect([...m.foundIds].sort()).toEqual(expected))
})

describe('mergeSave', () => {
  const a = save({
    foundTotal: 5,
    foundIds: ['x', 'y'],
    loops: 1,
    flags: { f: true },
    usedLines: { k1: ['a'], k2: ['b'] },
    usedChatter: ['c1'],
    pendingStories: ['p1'],
    settings: { brightness: 1, contrast: 1 },
  })
  const b = save({
    foundTotal: 3,
    foundIds: ['y', 'z'],
    loops: 4,
    flags: { g: true },
    usedLines: { k1: ['a', 'c'], k3: ['d'] },
    usedChatter: ['c1', 'c2'],
    pendingStories: ['p2', 'p1'],
    settings: { brightness: 9, contrast: 9 },
  })
  const m = mergeSave(a, b)
  it('takes the larger foundTotal', () => expect(m.foundTotal).toBe(5))
  it('takes the larger loops', () => expect(m.loops).toBe(4))
  it('unions foundIds', () => expect(m.foundIds).toEqual(['x', 'y', 'z']))
  it('unions flags', () => expect(m.flags).toEqual({ f: true, g: true }))
  it('unions usedChatter', () => expect(m.usedChatter).toEqual(['c1', 'c2']))
  it('unions pendingStories', () =>
    expect(m.pendingStories).toEqual(['p1', 'p2']))
  it('combines usedLines per key', () =>
    expect(m.usedLines).toEqual({
      k1: ['a', 'c'],
      k2: ['b'],
      k3: ['d'],
    }))
  it('prefers the settings of b', () =>
    expect(m.settings).toEqual({ brightness: 9, contrast: 9 }))
  it('falls back to the settings of a when b has none', () => {
    expect(mergeSave(a, save()).settings).toEqual({
      brightness: 1,
      contrast: 1,
    })
  })
  it('has no settings when neither has', () => {
    expect(mergeSave(save(), save()).settings).toBeUndefined()
  })
  it('does not mutate its inputs', () => {
    const before = JSON.stringify([a, b])
    mergeSave(a, b)
    expect(JSON.stringify([a, b])).toBe(before)
  })
})

describe('createSaveStore.load', () => {
  it('returns an empty save when the key is absent', () => {
    const { storage } = fakeStorage()
    const store = createSaveStore({ getStorage: () => storage })
    expect(store.load()).toEqual(emptySave())
    expect(store.canPersist()).toBe(true)
  })
  it('loads a stored valid save', () => {
    const s = save({ foundIds: ['a'], foundTotal: 1 })
    const { storage } = fakeStorage({ [SAVE_KEY]: JSON.stringify(s) })
    const store = createSaveStore({ getStorage: () => storage })
    expect(store.load()).toEqual(s)
  })
  it('sets broken JSON aside under the broken key and removes the main key', () => {
    const { storage, data } = fakeStorage({ [SAVE_KEY]: '{oops' })
    const store = createSaveStore({ getStorage: () => storage })
    expect(store.load()).toEqual(emptySave())
    expect(data.get(BROKEN_KEY)).toBe('{oops')
    expect(data.has(SAVE_KEY)).toBe(false)
  })
  it('sets a save of the wrong shape aside', () => {
    const bad = JSON.stringify({ v: 1, foundTotal: 'x' })
    const { storage, data } = fakeStorage({ [SAVE_KEY]: bad })
    const store = createSaveStore({ getStorage: () => storage })
    expect(store.load()).toEqual(emptySave())
    expect(data.get(BROKEN_KEY)).toBe(bad)
    expect(data.has(SAVE_KEY)).toBe(false)
  })
  it('honours custom key names', () => {
    const { storage, data } = fakeStorage({ mine: '{oops' })
    createSaveStore({
      getStorage: () => storage,
      key: 'mine',
      brokenKey: 'mine:broken',
    }).load()
    expect(data.get('mine:broken')).toBe('{oops')
  })

  describe('a save of a newer version', () => {
    const newer = JSON.stringify({ ...save(), v: 2, future: 'data' })
    it('is neither set aside nor overwritten', () => {
      const { storage, data } = fakeStorage({ [SAVE_KEY]: newer })
      const store = createSaveStore({ getStorage: () => storage })
      store.load()
      expect(data.get(SAVE_KEY)).toBe(newer)
      expect(data.has(BROKEN_KEY)).toBe(false)
    })
    it('runs in memory with an empty save and canPersist is false', () => {
      const { storage } = fakeStorage({ [SAVE_KEY]: newer })
      const store = createSaveStore({ getStorage: () => storage })
      expect(store.load()).toEqual(emptySave())
      expect(store.canPersist()).toBe(false)
    })
    it('stops writing afterwards but keeps progress in memory', () => {
      const { storage, data } = fakeStorage({ [SAVE_KEY]: newer })
      const store = createSaveStore({ getStorage: () => storage })
      store.load()
      const r = store.update(cur => ({ ...cur, loops: 3 }))
      expect(r.loops).toBe(3)
      expect(store.load().loops).toBe(3)
      expect(data.get(SAVE_KEY)).toBe(newer)
      expect(data.has(BROKEN_KEY)).toBe(false)
    })
    it('does not call requestPersist', () => {
      const { storage } = fakeStorage({ [SAVE_KEY]: newer })
      const requestPersist = vi.fn()
      const store = createSaveStore({
        getStorage: () => storage,
        requestPersist,
      })
      store.load()
      store.update(cur => cur)
      expect(requestPersist).not.toHaveBeenCalled()
    })
  })

  describe('unusable storage', () => {
    it('getStorage returning null: canPersist false and memory works', () => {
      const store = createSaveStore({ getStorage: () => null })
      expect(store.load()).toEqual(emptySave())
      expect(store.canPersist()).toBe(false)
      store.update(cur => ({ ...cur, loops: 2 }))
      expect(store.load().loops).toBe(2)
    })
    it('getStorage throwing: canPersist false and memory works', () => {
      const store = createSaveStore({
        getStorage: () => {
          throw new Error('blocked')
        },
      })
      expect(store.load()).toEqual(emptySave())
      expect(store.canPersist()).toBe(false)
      store.update(cur => ({ ...cur, foundIds: ['a'] }))
      expect(store.load().foundIds).toEqual(['a'])
    })
    it('getItem throwing: canPersist false and memory works', () => {
      const { storage, fail } = fakeStorage()
      fail.get = true
      const store = createSaveStore({ getStorage: () => storage })
      expect(store.load()).toEqual(emptySave())
      expect(store.canPersist()).toBe(false)
      store.update(cur => ({ ...cur, loops: 1 }))
      expect(store.load().loops).toBe(1)
    })
    it('setItem throwing (quota): canPersist false and memory works', () => {
      const { storage, fail } = fakeStorage()
      fail.set = true
      const store = createSaveStore({ getStorage: () => storage })
      store.load()
      expect(store.canPersist()).toBe(true)
      store.update(cur => ({ ...cur, loops: 5 }))
      expect(store.canPersist()).toBe(false)
      expect(store.load().loops).toBe(5)
    })
    it('the set-aside setItem throwing: no exception, canPersist false', () => {
      const { storage, fail } = fakeStorage({ [SAVE_KEY]: '{oops' })
      fail.set = true
      const store = createSaveStore({ getStorage: () => storage })
      expect(() => store.load()).not.toThrow()
      expect(store.canPersist()).toBe(false)
    })
    it('the set-aside removeItem throwing: no exception, canPersist false', () => {
      const { storage, fail } = fakeStorage({ [SAVE_KEY]: '{oops' })
      fail.remove = true
      const store = createSaveStore({ getStorage: () => storage })
      expect(() => store.load()).not.toThrow()
      expect(store.canPersist()).toBe(false)
    })
  })
})

describe('createSaveStore.update', () => {
  it('applies fn to the latest storage content (another tab wrote in between)', () => {
    const { storage } = fakeStorage()
    const store = createSaveStore({ getStorage: () => storage })
    store.load()
    storage.setItem(SAVE_KEY, JSON.stringify(save({ foundIds: ['other'] })))
    const seen: string[][] = []
    store.update(cur => {
      seen.push(cur.foundIds)
      return { ...cur, loops: cur.loops + 1 }
    })
    expect(seen).toEqual([['other']])
  })
  it('writes the result so a fresh store loads it back', () => {
    const { storage } = fakeStorage()
    const a = createSaveStore({ getStorage: () => storage })
    a.update(cur => ({ ...cur, foundTotal: 2, foundIds: ['a', 'b'], loops: 1 }))
    const b = createSaveStore({ getStorage: () => storage })
    expect(b.load()).toMatchObject({
      foundTotal: 2,
      foundIds: ['a', 'b'],
      loops: 1,
    })
  })
  it('returns the new save', () => {
    const { storage } = fakeStorage()
    const store = createSaveStore({ getStorage: () => storage })
    expect(store.update(cur => ({ ...cur, loops: 7 })).loops).toBe(7)
  })
  it('requestPersist is called once, after the first successful write', () => {
    const { storage } = fakeStorage()
    const requestPersist = vi.fn()
    const store = createSaveStore({ getStorage: () => storage, requestPersist })
    store.update(cur => cur)
    store.update(cur => cur)
    store.update(cur => cur)
    expect(requestPersist).toHaveBeenCalledTimes(1)
  })
  it('requestPersist is not called by load alone', () => {
    const { storage } = fakeStorage()
    const requestPersist = vi.fn()
    createSaveStore({ getStorage: () => storage, requestPersist }).load()
    expect(requestPersist).not.toHaveBeenCalled()
  })
  it('requestPersist is not called after a failed write', () => {
    const { storage, fail } = fakeStorage()
    fail.set = true
    const requestPersist = vi.fn()
    const store = createSaveStore({ getStorage: () => storage, requestPersist })
    store.update(cur => cur)
    expect(requestPersist).not.toHaveBeenCalled()
  })
  it('a throwing requestPersist is ignored', () => {
    const { storage } = fakeStorage()
    const store = createSaveStore({
      getStorage: () => storage,
      requestPersist: () => {
        throw new Error('denied')
      },
    })
    expect(() => store.update(cur => ({ ...cur, loops: 1 }))).not.toThrow()
    expect(store.canPersist()).toBe(true)
  })
  it('two stores updating alternately end with the union (multiple tabs)', () => {
    const { storage } = fakeStorage()
    const tabA = createSaveStore({ getStorage: () => storage })
    const tabB = createSaveStore({ getStorage: () => storage })
    tabA.load()
    tabB.load()
    tabA.update(cur => ({ ...cur, foundIds: [...cur.foundIds, 'a'] }))
    tabB.update(cur => ({ ...cur, foundIds: [...cur.foundIds, 'b'] }))
    tabA.update(cur => ({ ...cur, foundIds: [...cur.foundIds, 'c'] }))
    const fresh = createSaveStore({ getStorage: () => storage }).load()
    expect([...fresh.foundIds].sort()).toEqual(['a', 'b', 'c'])
  })
})

describe('createSaveStore.probe', () => {
  it('keeps canPersist true when writes work', () => {
    const { storage } = fakeStorage()
    const store = createSaveStore({ getStorage: () => storage })
    store.probe()
    expect(store.canPersist()).toBe(true)
  })
  it('leaves no probe key behind', () => {
    const { storage, data } = fakeStorage()
    createSaveStore({ getStorage: () => storage }).probe()
    expect(data.has(PROBE_KEY)).toBe(false)
  })
  it('never writes the save key', () => {
    const { storage, data } = fakeStorage()
    const setItem = vi.spyOn(storage, 'setItem')
    createSaveStore({ getStorage: () => storage }).probe()
    expect(setItem.mock.calls.map(c => c[0])).toEqual([PROBE_KEY])
    expect(data.has(SAVE_KEY)).toBe(false)
  })
  it('does not touch an existing save', () => {
    const { storage, data } = fakeStorage({ [SAVE_KEY]: '{"keep":1}' })
    createSaveStore({ getStorage: () => storage }).probe()
    expect(data.get(SAVE_KEY)).toBe('{"keep":1}')
  })
  it('setItem throwing: canPersist false', () => {
    const { storage, fail } = fakeStorage()
    fail.set = true
    const store = createSaveStore({ getStorage: () => storage })
    expect(() => store.probe()).not.toThrow()
    expect(store.canPersist()).toBe(false)
  })
  it('removeItem throwing: canPersist false, no exception', () => {
    const { storage, fail } = fakeStorage()
    fail.remove = true
    const store = createSaveStore({ getStorage: () => storage })
    expect(() => store.probe()).not.toThrow()
    expect(store.canPersist()).toBe(false)
  })
  it('getStorage returning null: canPersist false', () => {
    const store = createSaveStore({ getStorage: () => null })
    store.probe()
    expect(store.canPersist()).toBe(false)
  })
  it('getStorage throwing: canPersist false, no exception', () => {
    const store = createSaveStore({
      getStorage: () => {
        throw new Error('blocked')
      },
    })
    expect(() => store.probe()).not.toThrow()
    expect(store.canPersist()).toBe(false)
  })
  it('is stable when called twice', () => {
    const { storage, data } = fakeStorage()
    const store = createSaveStore({ getStorage: () => storage })
    store.probe()
    store.probe()
    expect(store.canPersist()).toBe(true)
    expect(data.has(PROBE_KEY)).toBe(false)
  })
  it('a failed probe stays failed on a second probe', () => {
    const { storage, fail } = fakeStorage()
    fail.set = true
    const store = createSaveStore({ getStorage: () => storage })
    store.probe()
    store.probe()
    expect(store.canPersist()).toBe(false)
  })
})

describe('epoch (reset generation)', () => {
  it('reads a save without epoch as 0 and rejects a bad epoch', () => {
    const old: Partial<SaveData> = save()
    delete old.epoch
    expect(validateSave(old)?.epoch).toBe(0)
    expect(validateSave(save({ epoch: -1 }))).toBeNull()
    expect(validateSave({ ...save(), epoch: 'x' })).toBeNull()
    expect(validateSave(save({ epoch: 3 }))?.epoch).toBe(3)
  })
  it('a higher epoch wins whole; the older progress is dropped', () => {
    const old = save({
      foundTotal: 40,
      foundIds: ['a'],
      loops: 5,
      flags: { child: true },
      endingReached: true,
      usedChatter: ['x'],
    })
    const reset = save({ epoch: 1 })
    expect(mergeSave(old, reset)).toEqual(reset)
    expect(mergeSave(reset, old)).toEqual(reset)
  })
  it('keeps the loser settings when the winner has none; same epoch still merges', () => {
    const s = { brightness: 1, contrast: 2 }
    expect(
      mergeSave(save({ settings: s }), save({ epoch: 1 })).settings
    ).toEqual(s)
    const m = mergeSave(
      save({ epoch: 2, foundTotal: 1, foundIds: ['a'] }),
      save({ epoch: 2, foundTotal: 4, foundIds: ['b'] })
    )
    expect(m).toMatchObject({ epoch: 2, foundTotal: 4, foundIds: ['a', 'b'] })
  })
  it('a stale tab (memory) cannot undo a reset written by another tab', () => {
    const { storage, data } = fakeStorage()
    const a = createSaveStore({ getStorage: () => storage })
    const b = createSaveStore({ getStorage: () => storage })
    a.update(() => save({ foundTotal: 40, loops: 5, endingReached: true }))
    b.load()
    a.update(cur => ({ ...save(), epoch: cur.epoch + 1 }))
    b.update(cur => ({ ...cur, foundTotal: cur.foundTotal + 1 }))
    const stored = JSON.parse(data.get(SAVE_KEY) as string)
    expect(stored).toMatchObject({
      epoch: 1,
      foundTotal: 1,
      loops: 0,
      endingReached: false,
    })
    expect(b.load().endingReached).toBe(false)
  })
  it('rejects an epoch beyond the safe integers as broken', () => {
    expect(validateSave({ ...save(), epoch: 1e300 })).toBeNull()
    expect(validateSave({ ...save(), epoch: 2 ** 53 })).toBeNull()
    expect(
      validateSave(save({ epoch: Number.MAX_SAFE_INTEGER }))
    ).not.toBeNull()
    const bad = JSON.stringify({ ...save(), epoch: 1e300 })
    const { storage, data } = fakeStorage({ [SAVE_KEY]: bad })
    expect(createSaveStore({ getStorage: () => storage }).load()).toEqual(
      emptySave()
    )
    expect(data.get(BROKEN_KEY)).toBe(bad)
  })
  it('latest(): a larger epoch in storage beats a smaller one in memory', () => {
    const { storage } = fakeStorage()
    const b = createSaveStore({ getStorage: () => storage })
    b.update(() => save({ foundTotal: 9, foundIds: ['x'] }))
    storage.setItem(
      SAVE_KEY,
      JSON.stringify(save({ epoch: 4, foundTotal: 1, foundIds: ['y'] }))
    )
    expect(b.load()).toMatchObject({ epoch: 4, foundTotal: 1, foundIds: ['y'] })
  })
  it('resumes from epoch 0 after a broken save is set aside', () => {
    const { storage, data } = fakeStorage({ [SAVE_KEY]: '{oops' })
    const s = createSaveStore({ getStorage: () => storage })
    expect(s.load().epoch).toBe(0)
    const next = s.update(cur => ({ ...cur, foundTotal: 2 }))
    expect(next).toMatchObject({ epoch: 0, foundTotal: 2 })
    expect(JSON.parse(data.get(SAVE_KEY) as string)).toMatchObject({
      epoch: 0,
      foundTotal: 2,
    })
    expect(data.get(BROKEN_KEY)).toBe('{oops')
  })
  it('works in memory only when storage is unusable', () => {
    const s = createSaveStore({ getStorage: () => null })
    s.update(cur => ({ ...cur, foundTotal: 3 }))
    s.update(cur => ({ ...save(), epoch: cur.epoch + 1 }))
    expect(s.load()).toMatchObject({ epoch: 1, foundTotal: 0 })
  })
})
