import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import type { Anomaly } from '../types/game'
import type { LedgerEntry, NonImageEntry } from './anomalyLedger'
import {
  createNonImageAnomaly,
  hasUnusedEntry,
  spawnableEntries,
  pickNonImageEntry,
  pickSpawn,
} from './anomalyData'
import { NON_IMAGE_DRAW_SHARE, checkedShare } from './gameConfig'
import {
  hasNonImageEffect,
  pickFeedGlitchKind,
  reportScopeOf,
} from './nonImageEffects'
import { reportTargetsFor } from './reportTarget'

const img = (id: string, cameraId: number): LedgerEntry => ({
  id,
  cameraId,
  category: 'Object',
  anomalyType: 'add_object',
  overlay: `assets/anomaly-overlays/${id}.webp`,
  origin: { x: 1, y: 2 },
  size: { w: 3, h: 4 },
})
const glitch = (
  id: string,
  extra: Partial<NonImageEntry> = {}
): NonImageEntry => ({
  id,
  category: 'Camera',
  anomalyType: 'feed_glitch',
  ...extra,
})

describe('the ledger and the effects agree', () => {
  const ledger = parse(
    readFileSync(join(process.cwd(), 'prompts/anomalies.yaml'), 'utf8')
  ) as {
    anomalies: {
      id: string
      kind?: string
      status?: string
      anomaly_type: string
    }[]
  }
  const produced = ledger.anomalies.filter(
    e => e.kind === 'non_image' && e.status === 'produced'
  )

  it('every produced non_image entry has an effect the game can show (never a visible-nothing anomaly)', () => {
    expect(produced.length).toBeGreaterThan(0)
    for (const e of produced) {
      expect(
        hasNonImageEffect(
          glitch(e.id, { anomalyType: e.anomaly_type as 'feed_glitch' })
        ),
        `${e.id} is produced but has no effect`
      ).toBe(true)
    }
  })

  it('every entry with a feed glitch effect is produced (the ledger is promoted together with the effect)', () => {
    const producedIds = new Set(produced.map(e => e.id))
    const drawn = ledger.anomalies.filter(e =>
      hasNonImageEffect(
        glitch(e.id, { anomalyType: e.anomaly_type as 'feed_glitch' })
      )
    )
    for (const e of drawn) expect(producedIds.has(e.id), e.id).toBe(true)
  })
})

describe('reportScopeOf', () => {
  it('feed_glitch and sound are reported on their camera; ui_corruption and rule_break from any camera', () => {
    expect(reportScopeOf('feed_glitch')).toBe('camera')
    expect(reportScopeOf('sound')).toBe('camera')
    expect(reportScopeOf('ui_corruption')).toBe('monitor')
    expect(reportScopeOf('rule_break')).toBe('monitor')
  })
})

describe('pickFeedGlitchKind', () => {
  it('picks among the kinds of one ledger entry (exposure: bright or dark)', () => {
    const e = glitch('RT-FEED-04')
    expect(pickFeedGlitchKind(e, () => 0)).toBe('bright')
    expect(pickFeedGlitchKind(e, () => 0.99)).toBe('dark')
  })
  it('is undefined for an entry with no feed glitch', () => {
    expect(pickFeedGlitchKind(glitch('RT-FEED-07'))).toBeUndefined()
    expect(
      pickFeedGlitchKind(glitch('RT-FEED-22', { anomalyType: 'sound' }))
    ).toBeUndefined()
  })
})

describe('NON_IMAGE_DRAW_SHARE (provisional)', () => {
  it('is within [0, 1]', () => {
    expect(NON_IMAGE_DRAW_SHARE).toBeGreaterThanOrEqual(0)
    expect(NON_IMAGE_DRAW_SHARE).toBeLessThanOrEqual(1)
  })
  it('checkedShare accepts 0 and 1 and throws on anything outside (including NaN)', () => {
    expect(checkedShare('x', 0)).toBe(0)
    expect(checkedShare('x', 1)).toBe(1)
    for (const bad of [-0.1, 1.1, NaN, Infinity]) {
      expect(() => checkedShare('x', bad)).toThrow(/within \[0, 1\]/)
    }
  })
  it('pickSpawn rejects a bad share', () => {
    expect(() =>
      pickSpawn([img('a', 1)], [glitch('RT-FEED-22')], [1], new Set(), {
        nonImageShare: 2,
      })
    ).toThrow(/nonImageShare/)
  })
})

describe('pickNonImageEntry', () => {
  const pool = [glitch('RT-FEED-22'), glitch('RT-FEED-24')]
  it('draws the camera at random among the free ones, not from the entry', () => {
    const a = pickNonImageEntry(pool, [2, 5, 7], new Set(), () => 0)
    const b = pickNonImageEntry(pool, [2, 5, 7], new Set(), () => 0.99)
    expect(a?.cameraId).toBe(2)
    expect(b?.cameraId).toBe(7)
  })
  it('never picks a used entry, an entry with no effect, or anything when no camera is free', () => {
    expect(
      pickNonImageEntry(pool, [1], new Set(['RT-FEED-22']), () => 0)?.entry.id
    ).toBe('RT-FEED-24')
    expect(pickNonImageEntry([glitch('RT-FEED-07')], [1], new Set())).toBeNull()
    expect(pickNonImageEntry(pool, [], new Set())).toBeNull()
    expect(
      pickNonImageEntry(pool, [1], new Set(['RT-FEED-22', 'RT-FEED-24']))
    ).toBeNull()
  })
  it('keeps Reiwa entries out until reiwaUnlocked', () => {
    const rz = [glitch('RT-FEED-22', { reiwa: true })]
    expect(
      pickNonImageEntry(rz, [1], new Set(), () => 0, 0.75, false)
    ).toBeNull()
    expect(
      pickNonImageEntry(rz, [1], new Set(), () => 0, 0.75, true)
    ).not.toBeNull()
  })
})

describe('pickSpawn', () => {
  const images = [img('a', 1), img('b', 2)]
  const non = [glitch('RT-FEED-22')]
  const share = 0.2

  it('sends `share` of the draws to the non-image side while both exist (one extra rng call first)', () => {
    const low = pickSpawn(images, non, [1, 2], new Set(), {
      rng: () => 0.1,
      nonImageShare: share,
    })
    const high = pickSpawn(images, non, [1, 2], new Set(), {
      rng: () => 0.5,
      nonImageShare: share,
    })
    expect(low?.kind).toBe('non_image')
    expect(high?.kind).toBe('image')
  })

  it('share 0 never draws non-image while images exist, share 1 always does', () => {
    for (const r of [0, 0.5, 0.99]) {
      expect(
        pickSpawn(images, non, [1, 2], new Set(), {
          rng: () => r,
          nonImageShare: 0,
        })?.kind
      ).toBe('image')
      expect(
        pickSpawn(images, non, [1, 2], new Set(), {
          rng: () => r,
          nonImageShare: 1,
        })?.kind
      ).toBe('non_image')
    }
  })

  it('uses the only side that has a candidate, with no extra rng call', () => {
    let calls = 0
    const rng = () => (calls++, 0)
    expect(pickSpawn([], non, [3], new Set(), { rng })?.kind).toBe('non_image')
    const afterNon = calls
    calls = 0
    // images only: exactly what pickLedgerEntry alone would consume (camera, category, type, entry)
    expect(pickSpawn(images, [], [1, 2], new Set(), { rng })?.kind).toBe(
      'image'
    )
    expect(afterNon).toBeGreaterThan(0)
    expect(calls).toBe(4)
  })

  it('falls back to the other side when the camera of the image entries is full', () => {
    const picked = pickSpawn(images, non, [5], new Set(), {
      rng: () => 0.99,
      nonImageShare: share,
    })
    expect(picked?.kind).toBe('non_image')
    expect(picked && 'cameraId' in picked ? picked.cameraId : null).toBe(5)
  })

  it('returns null when nothing can appear (all used, or no camera free)', () => {
    expect(
      pickSpawn(images, non, [1, 2], new Set(['a', 'b', 'RT-FEED-22']))
    ).toBeNull()
    expect(pickSpawn(images, non, [], new Set())).toBeNull()
  })

  it('keeps Reiwa images behind the unlock and shares as before', () => {
    const rz = [{ ...img('rz', 1), reiwa: true as const }]
    expect(pickSpawn(rz, [], [1], new Set())).toBeNull()
    expect(
      pickSpawn(rz, [], [1], new Set(), { reiwaUnlocked: true })?.kind
    ).toBe('image')
  })
})

describe('hasUnusedEntry', () => {
  it('counts unused entries of both kinds (only non-image ones with an effect), Reiwa only when unlocked', () => {
    const images = [img('a', 1)]
    const non = [glitch('RT-FEED-22'), glitch('RT-FEED-07')]
    expect(hasUnusedEntry(images, non, new Set(['a']), false)).toBe(true)
    expect(
      hasUnusedEntry(images, non, new Set(['a', 'RT-FEED-22']), false)
    ).toBe(false)
    expect(
      hasUnusedEntry(
        [],
        [glitch('RT-FEED-22', { reiwa: true })],
        new Set(),
        false
      )
    ).toBe(false)
    expect(
      hasUnusedEntry(
        [],
        [glitch('RT-FEED-22', { reiwa: true })],
        new Set(),
        true
      )
    ).toBe(true)
  })
})

describe('createNonImageAnomaly', () => {
  it('builds a camera-scope anomaly with the glitch kind, no overlay, categories kept', () => {
    const a = createNonImageAnomaly(
      glitch('RT-FEED-19', { categories: ['Camera', 'Surreal'] }),
      4,
      'mid',
      () => 0.99
    )
    expect(a).toMatchObject({
      id: 'RT-FEED-19',
      cameraId: 4,
      phase: 'mid',
      scope: 'camera',
      feedGlitch: 'hardshake',
      categories: ['Camera', 'Surreal'],
    })
    expect(a.overlay).toBeUndefined()
    expect(a.detectedAt).toBeUndefined()
  })
  it('a ui_corruption anomaly is monitor scope', () => {
    expect(
      createNonImageAnomaly(
        glitch('RT-UI-01', {
          anomalyType: 'ui_corruption',
          category: 'Surreal',
        }),
        1,
        'early'
      ).scope
    ).toBe('monitor')
  })
})

describe('reportTargetsFor', () => {
  const a = (over: Partial<Anomaly>): Anomaly => ({
    id: 'x',
    category: 'Camera',
    cameraId: 1,
    phase: 'early',
    ...over,
  })
  it('a camera-scope anomaly is a target only on its own camera', () => {
    const list = [a({ id: 'g', cameraId: 3 })]
    expect(reportTargetsFor(list, 3, 'Camera').hit?.id).toBe('g')
    expect(reportTargetsFor(list, 4, 'Camera')).toEqual({
      hit: undefined,
      shown: undefined,
    })
  })
  it('a monitor-scope anomaly is a target from any camera', () => {
    const list = [
      a({ id: 'm', cameraId: 3, category: 'Surreal', scope: 'monitor' }),
    ]
    for (const cam of [1, 3, 8]) {
      expect(reportTargetsFor(list, cam, 'Surreal').hit?.id).toBe('m')
    }
  })
  it('the wrong category is no hit but names what was shown (the watched camera first)', () => {
    const list = [
      a({ id: 'm', cameraId: 5, category: 'Surreal', scope: 'monitor' }),
      a({ id: 'g', cameraId: 3 }),
    ]
    expect(reportTargetsFor(list, 3, 'Object')).toMatchObject({
      hit: undefined,
      shown: { id: 'g' },
    })
    expect(reportTargetsFor(list, 3, 'Surreal').hit?.id).toBe('m')
    expect(reportTargetsFor(list, 3, 'Camera').hit?.id).toBe('g')
  })
  it('a reported (cleared) anomaly is no longer a target', () => {
    expect(
      reportTargetsFor([a({ detectedAt: 5 })], 1, 'Camera').hit
    ).toBeUndefined()
  })
  it('honours a category array', () => {
    const list = [a({ categories: ['Camera', 'Surreal'] })]
    expect(reportTargetsFor(list, 1, 'Surreal').hit).toBeDefined()
  })
})

describe('unlock flag, exclusive group and audibility gates (#77, #79)', () => {
  const e = (id: string, extra: Partial<NonImageEntry> = {}): NonImageEntry =>
    glitch(id, extra)
  const ids = (list: readonly { id: string }[]) => list.map(x => x.id)

  it('an entry with an unlock flag waits until that flag is saved', () => {
    const list = [e('a'), e('b', { unlockFlag: 'elder1' })]
    expect(ids(spawnableEntries(list, false))).toEqual(['a'])
    expect(ids(spawnableEntries(list, false, { flags: {} }))).toEqual(['a'])
    expect(
      ids(spawnableEntries(list, false, { flags: { elder1: false } }))
    ).toEqual(['a'])
    expect(
      ids(spawnableEntries(list, false, { flags: { elder1: true } }))
    ).toEqual(['a', 'b'])
  })

  it('an entry of a busy exclusive group is left out; other groups and ungrouped ones stay', () => {
    const list = [
      e('p14', { exclusiveGroup: 'model-plate' }),
      e('p28', { exclusiveGroup: 'model-plate' }),
      e('x', { exclusiveGroup: 'other' }),
      e('y'),
    ]
    expect(
      ids(
        spawnableEntries(list, false, { busyGroups: new Set(['model-plate']) })
      )
    ).toEqual(['x', 'y'])
    expect(
      ids(spawnableEntries(list, false, { busyGroups: new Set() }))
    ).toHaveLength(4)
  })

  it('sound entries are left out while nothing is audible, and back when it is', () => {
    const list = [
      e('s', { anomalyType: 'sound', category: 'Environment' }),
      e('g'),
    ]
    expect(ids(spawnableEntries(list, false, { audible: false }))).toEqual([
      'g',
    ])
    expect(ids(spawnableEntries(list, false, { audible: true }))).toEqual([
      's',
      'g',
    ])
    expect(ids(spawnableEntries(list, false))).toEqual(['s', 'g']) // default: audible
  })

  it('pickSpawn honours the unlock flag and the busy group (image entries too)', () => {
    const locked = { ...img('lk', 1), unlockFlag: 'elder1' }
    expect(pickSpawn([locked], [], [1], new Set())).toBeNull()
    expect(
      pickSpawn([locked], [], [1], new Set(), { flags: { elder1: true } })?.kind
    ).toBe('image')
    const grouped = { ...img('gp', 1), exclusiveGroup: 'plate' }
    expect(
      pickSpawn([grouped], [], [1], new Set(), {
        busyGroups: new Set(['plate']),
      })
    ).toBeNull()
  })

  it('hasUnusedEntry keeps counting an entry that waits for a flag, a group or sound', () => {
    const waiting = [e('w', { unlockFlag: 'elder1' })]
    expect(hasUnusedEntry([], waiting, new Set(), false)).toBe(false) // no effect for it only because the id is unknown
    expect(
      hasUnusedEntry(
        [],
        [e('RT-FEED-22', { unlockFlag: 'elder1' })],
        new Set(),
        false
      )
    ).toBe(true)
  })

  it('createNonImageAnomaly carries the exclusive group', () => {
    expect(
      createNonImageAnomaly(
        e('RT-FEED-22', { exclusiveGroup: 'g' }),
        1,
        'early'
      ).exclusiveGroup
    ).toBe('g')
  })
})
