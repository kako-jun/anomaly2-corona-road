import { describe, expect, it } from 'vitest'
import {
  checkStoryPersons,
  parseLedgerRecord,
  type LedgerEntry,
} from './anomalyLedger'
import {
  duePersonFlags,
  newlyRaisedFlags,
  type FlagProgress,
} from './dialogueEngine'
import { parseFlags, type FlagDef } from './dialogueLedger'
import {
  exhaustedGroups,
  hasUnusedEntry,
  pickSpawn,
  spawnableEntries,
  storyPersonFor,
} from './anomalyData'

// Story persons (#430): the ledger's `story_flag`, the flags that only say "may appear", and the placement rules.

const rec = (over: Record<string, unknown> = {}) => ({
  id: 'AR-06-elder',
  camera_id: 'CAM06',
  category: 'person',
  anomaly_type: 'add_person',
  overlay: 'assets/anomaly-overlays/cam06/elder.webp',
  overlay_origin: '(10,20)',
  dimensions: '30x60',
  story_flag: 'elder1',
  ...over,
})

describe('story_flag in the ledger', () => {
  it('is read onto the record', () => {
    expect(parseLedgerRecord(rec(), 0).storyFlag).toBe('elder1')
  })
  it('needs category person alone (no other accepted category)', () => {
    expect(() =>
      parseLedgerRecord(rec({ category: ['person', 'object'] }), 0)
    ).toThrow(/person alone/)
    expect(() => parseLedgerRecord(rec({ category: 'object' }), 0)).toThrow(
      /person alone/
    )
  })
  it('is only for an image entry, and must be a flag-like name', () => {
    expect(() =>
      parseLedgerRecord(
        rec({
          kind: 'non_image',
          anomaly_type: 'sound',
          detail: 'd',
          overlay: undefined,
          overlay_origin: undefined,
          dimensions: undefined,
        }),
        0
      )
    ).toThrow(/story_flag/)
    expect(() => parseLedgerRecord(rec({ story_flag: 'a b' }), 0)).toThrow(
      /story_flag/
    )
  })
  it('checkStoryPersons: unknown flag, one person per flag, one person per camera', () => {
    const names = new Set(['elder1', 'elder2'])
    expect(() =>
      checkStoryPersons(
        [
          { id: 'a', storyFlag: 'elder1', cameraId: 1 },
          { id: 'b', storyFlag: 'elder2', cameraId: 2 },
          { id: 'c', cameraId: 2 },
        ],
        names
      )
    ).not.toThrow()
    expect(() =>
      checkStoryPersons([{ id: 'a', storyFlag: 'nope', cameraId: 1 }], names)
    ).toThrow(/not defined/)
    expect(() =>
      checkStoryPersons(
        [
          { id: 'a', storyFlag: 'elder1', cameraId: 1 },
          { id: 'b', storyFlag: 'elder1', cameraId: 2 },
        ],
        names
      )
    ).toThrow(/one person per flag/)
    expect(() =>
      checkStoryPersons(
        [
          { id: 'a', storyFlag: 'elder1', cameraId: 3 },
          { id: 'b', storyFlag: 'elder2', cameraId: 3 },
        ],
        names
      )
    ).toThrow(/one person per camera/)
  })
})

const person = (id: string, cameraId: number, flag: string): LedgerEntry => ({
  id,
  cameraId,
  category: 'Person',
  anomalyType: 'add_person',
  overlay: `assets/anomaly-overlays/cam0${cameraId}/${id}.webp`,
  origin: { x: 1, y: 2 },
  size: { w: 3, h: 4 },
  storyFlag: flag,
})
const plain = (id: string, cameraId: number): LedgerEntry => ({
  ...person(id, cameraId, 'x'),
  category: 'Object',
  anomalyType: 'add_object',
  storyFlag: undefined,
})

describe('a story person is not part of the ordinary draw', () => {
  const list = [plain('a', 1), person('p', 2, 'elder1')]
  it('spawnableEntries leaves it out', () => {
    expect(spawnableEntries(list, true).map(e => e.id)).toEqual(['a'])
  })
  it('pickSpawn never returns it, even when it is the only entry on a free camera', () => {
    for (let i = 0; i < 20; i++) {
      const s = pickSpawn([person('p', 2, 'elder1')], [], [2], new Set())
      expect(s).toBeNull()
    }
  })
  it('does not stop its camera from being used up (#427), nor keep the shift from being exhausted', () => {
    expect(exhaustedGroups(list, [], ['a'], true)).toEqual([
      { key: 'cam:1', ids: ['a'], last: 'a' },
    ])
    expect(
      hasUnusedEntry([person('p', 2, 'elder1')], [], new Set(), true)
    ).toBe(false)
  })
})

describe('flags of the persons: a permission to appear, in a fixed order', () => {
  const defs: FlagDef[] = [
    { name: 'elder1', when: { foundUnique: 10 } },
    { name: 'elder2', when: { foundUnique: 30, requires: ['elder1'] } },
    { name: 'elder3', when: { foundUnique: 60, requires: ['elder2'] } },
  ]
  const persons = new Set(['elder1', 'elder2', 'elder3'])
  const progress = (n: number, flags: Record<string, boolean> = {}) =>
    ({
      foundIds: Array.from({ length: n }, (_, i) => `i${i}`),
      loops: 0,
      flags,
      reiwaIds: new Set(),
    }) as FlagProgress

  it('newlyRaisedFlags leaves a manual flag alone however far the progress is', () => {
    expect(
      newlyRaisedFlags(defs, { ...progress(100), manualFlags: persons })
    ).toEqual([])
  })
  it('only the first person is due, even when the second one is also met (no two at once)', () => {
    expect(duePersonFlags(defs, progress(100), persons)).toEqual(['elder1'])
  })
  it('the next one is due as soon as the previous is reported (flag raised), in the same shift', () => {
    expect(
      duePersonFlags(defs, progress(100, { elder1: true }), persons)
    ).toEqual(['elder2'])
    expect(
      duePersonFlags(
        defs,
        progress(100, { elder1: true, elder2: true }),
        persons
      )
    ).toEqual(['elder3'])
  })
  it('nothing is due before the count, or after the person has been reported', () => {
    expect(duePersonFlags(defs, progress(9), persons)).toEqual([])
    expect(
      duePersonFlags(
        defs,
        progress(100, { elder1: true, elder2: true, elder3: true }),
        persons
      )
    ).toEqual([])
  })
  it('a count-flag that is not a person is untouched', () => {
    expect(duePersonFlags(defs, progress(100), new Set())).toEqual([])
  })
})

describe('parseFlags: trigger flags', () => {
  it('reads a trigger flag, which stands alone', () => {
    expect(
      parseFlags({ flags: { pre: { trigger: 'childDue' } } }, new Set())
    ).toEqual([{ name: 'pre', when: { trigger: 'childDue' } }])
    expect(() =>
      parseFlags({ flags: { pre: { trigger: 'nope' } } }, new Set())
    ).toThrow(/trigger/)
    expect(() =>
      parseFlags(
        { flags: { pre: { trigger: 'childDue', foundUnique: 1 } } },
        new Set()
      )
    ).toThrow(/cannot be combined/)
  })
  it('a trigger flag is never raised by progress', () => {
    const defs: FlagDef[] = [{ name: 'pre', when: { trigger: 'childDue' } }]
    expect(
      newlyRaisedFlags(defs, {
        foundIds: ['a'],
        loops: 5,
        flags: {},
        reiwaIds: new Set(),
      })
    ).toEqual([])
  })
})

describe('storyPersonFor: where and when a person can be placed', () => {
  const list = [person('p', 6, 'elder1'), plain('a', 1)]
  const none = new Set<number>()
  const noIds = new Set<string>()
  it('places it on its own camera', () => {
    expect(storyPersonFor(list, 'elder1', 1, none, noIds)?.id).toBe('p')
  })
  it('never on the watched camera (#418)', () => {
    expect(storyPersonFor(list, 'elder1', 6, none, noIds)).toBeNull()
  })
  it('waits while its camera holds another anomaly (nothing is removed for it)', () => {
    expect(storyPersonFor(list, 'elder1', 1, new Set([6]), noIds)).toBeNull()
  })
  it('is not placed twice while it is running', () => {
    expect(storyPersonFor(list, 'elder1', 1, none, new Set(['p']))).toBeNull()
  })
  it('no person for an unknown flag', () => {
    expect(storyPersonFor(list, 'elder9', 1, none, noIds)).toBeNull()
  })
})
