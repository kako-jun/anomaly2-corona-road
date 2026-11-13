import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import type { Anomaly } from '../types/game'
import type { LedgerEntry, NonImageEntry } from './anomalyLedger'
import {
  createNonImageAnomaly,
  pickGlitchCameras,
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
    // The 15 feed glitches promoted in #77; the ledger is the master, so this is only a floor against a mass demotion.
    expect(produced.length).toBeGreaterThanOrEqual(15)
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

describe('the six feed filters (#406)', () => {
  const css = readFileSync(
    join(process.cwd(), 'src/styles/feedGlitch.css'),
    'utf8'
  )
  const cases = [
    ['RT-FEED-12', 'letterbox'],
    ['RT-FEED-16', 'green'],
    ['RT-FEED-17', 'flip'],
    ['RT-FEED-18', 'heavyvignette'],
    ['RT-FEED-27', 'mono'],
    ['RT-FEED-28', 'nonoise'],
  ] as const
  it.each(cases)(
    '%s is drawn as %s and the stylesheet has a rule for it',
    (id, kind) => {
      expect(pickFeedGlitchKind(glitch(id), () => 0)).toBe(kind)
      expect(css).toMatch(new RegExp(`data-glitch='${kind}'|\\.${kind}\\b`))
    }
  )
  it('pickGlitchCameras gives 1 to 3 distinct cameras with the drawn one first', () => {
    const all = [1, 2, 3, 4, 5, 6, 7, 8]
    expect(pickGlitchCameras(4, all, () => 0)).toEqual([4])
    const three = pickGlitchCameras(4, all, () => 0.99)
    expect(three.length).toBe(3)
    expect(three[0]).toBe(4)
    expect(new Set(three).size).toBe(3)
    expect(pickGlitchCameras(4, [4], () => 0.99)).toEqual([4])
  })
  it('takes the other cameras only from the free ones (a camera with an anomaly is never a second camera)', () => {
    // free: 4 (drawn), 6; busy: 1, 2, 3, 5, 7, 8
    for (const r of [0, 0.4, 0.99]) {
      const got = pickGlitchCameras(4, [4, 6], () => r)
      expect(got.every(id => id === 4 || id === 6)).toBe(true)
    }
  })
  it('the count is uniform over 1, 2, 3 (the ledger only says "1 to 3 at random")', () => {
    const all = [1, 2, 3, 4, 5, 6]
    expect(pickGlitchCameras(1, all, () => 0).length).toBe(1)
    expect(pickGlitchCameras(1, all, () => 0.4).length).toBe(2)
    expect(pickGlitchCameras(1, all, () => 0.99).length).toBe(3)
  })
  it('createNonImageAnomaly gives only RT-FEED-28 a camera list', () => {
    const cams = [1, 2, 3, 4]
    const a = createNonImageAnomaly(
      glitch('RT-FEED-28'),
      2,
      'early',
      () => 0.99,
      cams
    )
    expect(a.feedGlitchCameraIds?.length).toBe(3)
    expect(
      createNonImageAnomaly(glitch('RT-FEED-27'), 2, 'early', () => 0.99, cams)
        .feedGlitchCameraIds
    ).toBeUndefined()
  })
  it('a report on any camera of the list is a hit, on another camera it is not', () => {
    const list = [
      {
        id: 'RT-FEED-28',
        category: 'Camera',
        cameraId: 2,
        phase: 'early',
        feedGlitchCameraIds: [2, 5],
      },
    ] as Anomaly[]
    expect(reportTargetsFor(list, 5, 'Camera').hit?.id).toBe('RT-FEED-28')
    expect(reportTargetsFor(list, 3, 'Camera').hit).toBeUndefined()
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

describe('shares over many draws (#286 Reiwa 6% of all, #77 non-image of the ordinary)', () => {
  const mulberry = (seed: number) => () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const images = [
    ...Array.from({ length: 24 }, (_, i) => img(`o${i}`, (i % 8) + 1)),
    ...Array.from({ length: 4 }, (_, i) => ({
      ...img(`r${i}`, (i % 8) + 1),
      reiwa: true as const,
    })),
  ]
  const non = ['RT-FEED-01', 'RT-FEED-02', 'RT-FEED-03', 'RT-FEED-22'].map(id =>
    glitch(id)
  )
  it('keeps Reiwa at about 6% of all draws and non-image at its share of the ordinary draws', () => {
    const rng = mulberry(77)
    const free = [1, 2, 3, 4, 5, 6, 7, 8]
    let reiwa = 0
    let ordinaryNon = 0
    let ordinary = 0
    const N = 200_000
    for (let i = 0; i < N; i++) {
      const s = pickSpawn(images, non, free, new Set(), {
        rng,
        reiwaUnlocked: true,
      })!
      const isReiwa = s.kind === 'image' && s.entry.reiwa === true
      if (isReiwa) reiwa++
      else {
        ordinary++
        if (s.kind === 'non_image') ordinaryNon++
      }
    }
    expect(reiwa / N).toBeGreaterThan(0.055)
    expect(reiwa / N).toBeLessThan(0.065)
    expect(ordinaryNon / ordinary).toBeGreaterThan(NON_IMAGE_DRAW_SHARE - 0.01)
    expect(ordinaryNon / ordinary).toBeLessThan(NON_IMAGE_DRAW_SHARE + 0.01)
  }, 60_000)
})
