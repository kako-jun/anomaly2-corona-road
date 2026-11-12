import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import {
  ANOMALY_TYPES,
  isGameRecord,
  parseAnomalyType,
  parseCameraId,
  parseCategory,
  parseDimensions,
  parseLedger,
  parseLedgerEntry,
  parseLedgerRecord,
  parseLedgerRecords,
  parseOrigin,
  toLedgerEntry,
} from './anomalyLedger'

const raw = (over: Record<string, unknown> = {}) => ({
  id: 'AR-01-notice',
  camera_id: 'CAM01',
  category: 'object',
  anomaly_type: 'add_object',
  overlay: 'assets/anomaly-overlays/cam01/notice.webp',
  overlay_origin: '(137,379)',
  dimensions: '46x97',
  ...over,
})

describe('parseOrigin', () => {
  it.each([
    ['(137,379)', { x: 137, y: 379 }],
    ['(0,0)', { x: 0, y: 0 }],
    ['( 12 , 34 )', { x: 12, y: 34 }],
  ])('parses %s', (text, expected) => {
    expect(parseOrigin(text)).toEqual(expected)
  })
  it.each([
    ['', 'empty'],
    ['137,379', 'no parentheses'],
    ['(1.5,2)', 'decimal'],
    ['(-1,2)', 'negative'],
    ['(1;2)', 'wrong separator'],
    ['(1,2,3)', 'three values'],
    ['(a,b)', 'non-numeric'],
    [' (1,2)', 'leading space (fields are trimmed by the caller)'],
  ])('rejects %j (%s)', text => {
    expect(() => parseOrigin(text)).toThrow(/overlay_origin/)
  })
})

describe('parseDimensions', () => {
  it.each([
    ['46x97', { w: 46, h: 97 }],
    ['1x1', { w: 1, h: 1 }],
    ['46 x 97', { w: 46, h: 97 }],
  ])('parses %s', (text, expected) => {
    expect(parseDimensions(text)).toEqual(expected)
  })
  it.each(['0x5', '5x0', '0x0'])('rejects non-positive %s', text => {
    expect(() => parseDimensions(text)).toThrow(/must be positive/)
  })
  it.each(['', '46', '46x', 'x97', '4.6x97', '-4x9', '46*97', '46X97'])(
    'rejects malformed %j',
    text => {
      expect(() => parseDimensions(text)).toThrow(/dimensions/)
    }
  )
})

describe('parseCameraId', () => {
  it.each([
    ['CAM01', 1],
    ['CAM08', 8],
    ['CAM1', 1],
    ['CAM12', 12],
  ])('parses %s', (text, expected) => {
    expect(parseCameraId(text)).toBe(expected)
  })
  it.each(['CAM00', 'CAM', 'cam01', 'CAM-1', '1', '', 'CAM01x'])(
    'rejects %j',
    text => {
      expect(() => parseCameraId(text)).toThrow(/camera_id/)
    }
  )
})

describe('parseCategory', () => {
  it.each([
    ['camera', 'Camera'],
    ['object', 'Object'],
    ['environment', 'Environment'],
    ['person', 'Person'],
    ['surreal', 'Surreal'],
  ])('maps ledger value %s to game enum %s', (text, expected) => {
    expect(parseCategory(text)).toBe(expected)
  })
  it('is case-insensitive', () => {
    expect(parseCategory('OBJECT')).toBe('Object')
    expect(parseCategory('Surreal')).toBe('Surreal')
  })
  it.each(['', 'ghost', 'objects', ' object'])('rejects unknown %j', text => {
    expect(() => parseCategory(text)).toThrow(/category/)
  })
})

describe('parseAnomalyType', () => {
  it.each(ANOMALY_TYPES)('accepts %s', t => {
    expect(parseAnomalyType(t)).toBe(t)
  })
  it('ANOMALY_TYPES has 16 distinct values', () => {
    expect(ANOMALY_TYPES).toHaveLength(16)
    expect(new Set(ANOMALY_TYPES).size).toBe(16)
  })
  it('matches the enum table in prompts/README.md', () => {
    const md = readFileSync(
      resolve(__dirname, '../../prompts/README.md'),
      'utf8'
    )
    const section = md
      .split('## 異変の種類 enum（anomaly_type）')[1]
      .split(/\n## /)[0]
    const types = [...section.matchAll(/^\|\s*`([a-z_]+)`\s*\|/gm)].map(
      m => m[1]
    )
    expect(types).toHaveLength(16)
    expect([...ANOMALY_TYPES].sort()).toEqual([...types].sort())
  })
  it.each([
    '',
    ' add_object',
    'Add_Object',
    'ADD_OBJECT',
    'add-object',
    'add_objects',
  ])('rejects %j (case-sensitive, no trimming here)', t => {
    expect(() => parseAnomalyType(t)).toThrow(/is unknown/)
  })
})

describe('parseLedgerEntry', () => {
  it('maps every field to the game shape', () => {
    expect(parseLedgerEntry(raw(), 0)).toEqual({
      id: 'AR-01-notice',
      cameraId: 1,
      category: 'Object',
      anomalyType: 'add_object',
      overlay: 'assets/anomaly-overlays/cam01/notice.webp',
      origin: { x: 137, y: 379 },
      size: { w: 46, h: 97 },
    })
  })
  it('ignores the other ledger columns', () => {
    const e = parseLedgerEntry(raw({ note: 'x', element_id: 'CAM01-E09' }), 0)
    expect(Object.keys(e).sort()).toEqual(
      [
        'anomalyType',
        'cameraId',
        'category',
        'id',
        'origin',
        'overlay',
        'size',
      ].sort()
    )
  })
  it('reads anomaly_type, trimming surrounding whitespace', () => {
    expect(
      parseLedgerEntry(raw({ anomaly_type: 'displace' }), 0).anomalyType
    ).toBe('displace')
    expect(
      parseLedgerEntry(raw({ anomaly_type: '  displace  ' }), 0).anomalyType
    ).toBe('displace')
  })
  it.each(['Add_Object', 'add-object', 'add_objects'])(
    'rejects anomaly_type %s through the entry parser',
    v => {
      expect(() => parseLedgerEntry(raw({ anomaly_type: v }), 0)).toThrow(
        /entry "AR-01-notice": anomaly_type/
      )
    }
  )
  it.each([
    ['null', null],
    ['a number', 12],
    ['whitespace only', '   '],
    ['empty', ''],
  ])('rejects anomaly_type that is %s, naming the entry', (_n, v) => {
    expect(() => parseLedgerEntry(raw({ anomaly_type: v }), 0)).toThrow(
      /entry "AR-01-notice".*"anomaly_type" is missing or not a string/
    )
  })
  it('trims surrounding whitespace in values', () => {
    const e = parseLedgerEntry(
      raw({ id: '  a  ', camera_id: ' CAM02 ', category: ' Person ' }),
      0
    )
    expect(e.id).toBe('a')
    expect(e.cameraId).toBe(2)
    expect(e.category).toBe('Person')
  })
  it.each([
    'id',
    'camera_id',
    'category',
    'anomaly_type',
    'overlay',
    'overlay_origin',
    'dimensions',
  ])('throws when %s is missing, naming the entry id', key => {
    const r = raw()
    delete (r as Record<string, unknown>)[key]
    expect(() => parseLedgerEntry(r, 3)).toThrow(
      key === 'id' ? /at index 3 \(no id\)/ : /"AR-01-notice"/
    )
  })
  it('rejects a blank value', () => {
    expect(() => parseLedgerEntry(raw({ overlay: '   ' }), 0)).toThrow(
      /"overlay" is missing/
    )
  })
  it('rejects a non-string value (YAML number)', () => {
    expect(() => parseLedgerEntry(raw({ camera_id: 1 }), 0)).toThrow(
      /"camera_id" is missing or not a string/
    )
  })
  it.each([
    ['unknown category', { category: 'ghost' }, /category "ghost"/],
    [
      'unknown anomaly_type',
      { anomaly_type: 'ghost' },
      /anomaly_type "ghost" is unknown/,
    ],
    ['bad origin', { overlay_origin: '137,379' }, /overlay_origin/],
    ['bad dimensions', { dimensions: '0x9' }, /dimensions/],
    ['bad camera', { camera_id: 'CAM00' }, /camera_id/],
    ['uppercase X in dimensions', { dimensions: '46X97' }, /dimensions/],
    [
      'overlay outside the overlay dir',
      { overlay: 'public/x.webp' },
      /overlay/,
    ],
    [
      'overlay with a traversal',
      { overlay: 'assets/anomaly-overlays/../x.webp' },
      /overlay/,
    ],
    [
      'overlay not under a camNN dir',
      { overlay: 'assets/anomaly-overlays/x.webp' },
      /overlay/,
    ],
    [
      'overlay not webp',
      { overlay: 'assets/anomaly-overlays/cam01/x.png' },
      /overlay/,
    ],
    [
      'overlay with a leading slash',
      { overlay: '/assets/anomaly-overlays/cam01/x.webp' },
      /overlay/,
    ],
  ])('%s: error names the id and the problem', (_n, over, problem) => {
    expect(() => parseLedgerEntry(raw(over), 0)).toThrow(
      /^anomalies\.yaml entry "AR-01-notice": /
    )
    expect(() => parseLedgerEntry(raw(over), 0)).toThrow(problem)
  })
  it.each([null, 'text', 42, undefined])(
    'rejects a non-mapping entry %j with its index',
    value => {
      expect(() => parseLedgerEntry(value, 5)).toThrow(/at index 5 \(no id\)/)
    }
  )
})

describe('parseLedger', () => {
  it('parses entries in order', () => {
    const r = parseLedger({
      anomalies: [raw({ id: 'a' }), raw({ id: 'b', camera_id: 'CAM02' })],
    })
    expect(r.map(e => e.id)).toEqual(['a', 'b'])
  })
  it('accepts an empty list', () => {
    expect(parseLedger({ anomalies: [] })).toEqual([])
  })
  it.each([
    ['null document', null],
    ['no anomalies key', {}],
    ['anomalies not a list', { anomalies: 'x' }],
    ['anomalies null', { anomalies: null }],
  ])('rejects %s', (_n, doc) => {
    expect(() => parseLedger(doc)).toThrow(/"anomalies" list is missing/)
  })
  it('rejects duplicate ids and names the id', () => {
    expect(() =>
      parseLedger({ anomalies: [raw({ id: 'dup' }), raw({ id: 'dup' })] })
    ).toThrow(/duplicate id "dup"/)
  })
  it('allows the same overlay path with different ids', () => {
    expect(() =>
      parseLedger({ anomalies: [raw({ id: 'a' }), raw({ id: 'b' })] })
    ).not.toThrow()
  })
  it('names the broken entry when one of many is invalid', () => {
    expect(() =>
      parseLedger({
        anomalies: [raw({ id: 'ok' }), raw({ id: 'bad', category: 'x' })],
      })
    ).toThrow(/entry "bad"/)
  })
})

describe('parseLedgerEntry category as a string or an array (#347)', () => {
  const cats = (v: unknown) => parseLedgerEntry(raw({ category: v }), 0)
  it('a string is one category: category set, no categories key', () => {
    const e = cats('object')
    expect(e.category).toBe('Object')
    expect('categories' in e).toBe(false)
  })
  it('a one-item array means the same as the string', () => {
    const e = cats(['object'])
    expect(e.category).toBe('Object')
    expect('categories' in e).toBe(false)
  })
  it('an array keeps its order; the first is the primary', () => {
    const e = cats(['surreal', 'person', 'object'])
    expect(e.category).toBe('Surreal')
    expect(e.categories).toEqual(['Surreal', 'Person', 'Object'])
  })
  it('treats case and surrounding whitespace like parseCategory', () => {
    expect(cats([' PERSON ', '\tSurreal  ']).categories).toEqual([
      'Person',
      'Surreal',
    ])
  })
  it('skips blank items among valid ones', () => {
    expect(cats(['person', '  ', 'surreal']).categories).toEqual([
      'Person',
      'Surreal',
    ])
  })
  it('changes no other field', () => {
    const base = parseLedgerEntry(raw(), 0)
    const multi = cats(['object', 'person'])
    expect({ ...multi, categories: undefined }).toEqual(base)
  })
  it('names the entry for an unknown item (also after the first)', () => {
    expect(() => cats(['object', 'ghost'])).toThrow(
      /entry "AR-01-notice".*category "ghost" is unknown/
    )
  })
  it.each([
    ['person', 'person'],
    ['person', 'PERSON'],
    [' Person ', 'person'],
  ])('rejects duplicates (%j, %j)', (a, b) => {
    expect(() => cats([a, 'surreal', b])).toThrow(
      /entry "AR-01-notice".*category "person" is duplicated/i
    )
  })
  it.each([
    ['a number item', [12]],
    ['null item', [null]],
    ['a nested array', [['person']]],
    ['a valid item then a number', ['person', 3]],
  ])('rejects %s', (_n, v) => {
    expect(() => cats(v)).toThrow(
      /entry "AR-01-notice".*"category" has a non-string item/
    )
  })
  it.each([
    ['true', true],
    ['a number', 12],
    ['an object', { a: 1 }],
  ])('rejects %s', (_n, v) => {
    expect(() => cats(v)).toThrow(/entry "AR-01-notice".*"category"/)
  })
  it.each([
    ['an empty array', []],
    ['only blank items', ['', '  ']],
  ])('rejects %s on an image entry', (_n, v) => {
    expect(() => cats(v)).toThrow(/"category" is missing or blank/)
  })
  it('accepts every non-camera combination of the four keys', () => {
    const all = ['object', 'environment', 'person', 'surreal']
    for (const primary of all) {
      const others = all.filter(c => c !== primary)
      expect(cats([primary, ...others]).categories).toHaveLength(4)
    }
  })
  it.each(['camera', ' Camera ', 'CAMERA'])(
    'rejects camera first on an image entry (%j), as a string or an array',
    v => {
      expect(() => cats(v)).toThrow(
        /entry "AR-01-notice".*category "camera" cannot be first on an image entry/i
      )
      expect(() => cats([v, 'surreal'])).toThrow(/cannot be first/)
    }
  )
  it('accepts camera second or later on an image entry', () => {
    expect(cats(['environment', 'camera']).categories).toEqual([
      'Environment',
      'Camera',
    ])
    expect(cats(['surreal', 'environment', 'camera']).categories).toEqual([
      'Surreal',
      'Environment',
      'Camera',
    ])
  })
})

// ---- kind / status (#77) ----

const planned = (over: Record<string, unknown> = {}) => ({
  id: 'PL-01',
  status: 'planned',
  camera_id: 'CAM02',
  category: 'person',
  anomaly_type: 'add_person',
  spec: 'candidate-pool.md#PL-01',
  ...over,
})

const nonImage = (over: Record<string, unknown> = {}) => ({
  id: 'RT-01',
  kind: 'non_image',
  status: 'planned',
  anomaly_type: 'feed_glitch',
  category: 'camera',
  detail: 'the feed freezes for a second',
  ...over,
})

const without = (r: Record<string, unknown>, ...keys: string[]) => {
  const c = { ...r }
  for (const k of keys) delete c[k]
  return c
}

describe('parseLedgerRecord: accepted shapes (#77)', () => {
  it('treats missing kind/status as image + produced', () => {
    const r = parseLedgerRecord(raw(), 0)
    expect(r.kind).toBe('image')
    expect(r.status).toBe('produced')
    expect(isGameRecord(r)).toBe(true)
    expect(r.overlay).toBe('assets/anomaly-overlays/cam01/notice.webp')
  })
  it('accepts explicit kind=image status=produced', () => {
    const r = parseLedgerRecord(raw({ kind: 'image', status: 'produced' }), 0)
    expect(r).toEqual(parseLedgerRecord(raw(), 0))
  })
  it('accepts image+planned without overlay fields, keeping spec', () => {
    const r = parseLedgerRecord(planned(), 0)
    expect(r).toMatchObject({
      id: 'PL-01',
      kind: 'image',
      status: 'planned',
      cameraId: 2,
      category: 'Person',
      anomalyType: 'add_person',
      spec: 'candidate-pool.md#PL-01',
    })
    expect(r.overlay).toBeUndefined()
    expect(r.origin).toBeUndefined()
    expect(r.size).toBeUndefined()
    expect(isGameRecord(r)).toBe(false)
  })
  it('accepts image+planned with all three overlay fields', () => {
    const r = parseLedgerRecord(
      planned({
        overlay: 'assets/anomaly-overlays/cam02/pl.webp',
        overlay_origin: '(1,2)',
        dimensions: '3x4',
      }),
      0
    )
    expect(r.overlay).toBe('assets/anomaly-overlays/cam02/pl.webp')
    expect(r.origin).toEqual({ x: 1, y: 2 })
    expect(r.size).toEqual({ w: 3, h: 4 })
  })
  it('accepts spec on a produced image entry too', () => {
    expect(parseLedgerRecord(raw({ spec: 'x#y' }), 0).spec).toBe('x#y')
  })
  it.each(['planned', 'produced'])(
    'accepts non-image feed_glitch (%s) with camera_id',
    status => {
      const r = parseLedgerRecord(
        nonImage({ status, camera_id: 'CAM05', spec: 's' }),
        0
      )
      expect(r).toMatchObject({
        kind: 'non_image',
        status,
        anomalyType: 'feed_glitch',
        category: 'Camera',
        cameraId: 5,
        detail: 'the feed freezes for a second',
        spec: 's',
      })
      expect(r.overlay).toBeUndefined()
      expect(isGameRecord(r)).toBe(false)
    }
  )
  it('accepts non-image feed_glitch without camera_id', () => {
    const r = parseLedgerRecord(nonImage(), 0)
    expect(r.cameraId).toBeUndefined()
    expect('cameraId' in r).toBe(false)
  })
  it('accepts non-image sound with category environment', () => {
    const r = parseLedgerRecord(
      nonImage({ anomaly_type: 'sound', category: 'environment' }),
      0
    )
    expect(r.category).toBe('Environment')
    expect(r.anomalyType).toBe('sound')
  })
  it.each(['ui_corruption', 'rule_break'])(
    'accepts non-image %s with an empty or valid category',
    type => {
      const none = parseLedgerRecord(
        without(nonImage({ anomaly_type: type }), 'category'),
        0
      )
      expect('category' in none).toBe(false)
      expect(
        parseLedgerRecord(nonImage({ anomaly_type: type, category: null }), 0)
          .category
      ).toBeUndefined()
      expect(
        parseLedgerRecord(
          nonImage({ anomaly_type: type, category: 'surreal' }),
          0
        ).category
      ).toBe('Surreal')
    }
  )
  it('accepts a category array on non-image entries (primary first)', () => {
    expect(
      parseLedgerRecord(
        nonImage({
          anomaly_type: 'sound',
          category: ['environment', 'object'],
        }),
        0
      ).categories
    ).toEqual(['Environment', 'Object'])
    expect(
      parseLedgerRecord(nonImage({ category: ['camera', 'surreal'] }), 0)
        .categories
    ).toEqual(['Camera', 'Surreal'])
  })
})

describe('parseLedgerRecord: rejected shapes (#77)', () => {
  it.each([
    ['unknown status', raw({ status: 'done' }), /status "done" is unknown/],
    ['unknown kind', raw({ kind: 'audio' }), /kind "audio" is unknown/],
    [
      'old kind runtime (renamed to non_image)',
      raw({ kind: 'runtime' }),
      /kind "runtime" was renamed to "non_image"/,
    ],
    [
      'unknown anomaly_type on non-image',
      nonImage({ anomaly_type: 'ghost' }),
      /anomaly_type "ghost" is unknown/,
    ],
    [
      'non-image type on an image entry',
      raw({ anomaly_type: 'sound' }),
      /non-image type but kind is image/,
    ],
    [
      'image type on a non_image entry',
      nonImage({ anomaly_type: 'add_object' }),
      /image type but kind is non_image/,
    ],
    [
      'image+planned without camera_id',
      without(planned(), 'camera_id'),
      /"camera_id" is missing/,
    ],
    [
      'image+planned without category',
      without(planned(), 'category'),
      /"category" is missing/,
    ],
    [
      'image+planned without anomaly_type',
      without(planned(), 'anomaly_type'),
      /"anomaly_type" is missing/,
    ],
    [
      'non-image without anomaly_type',
      without(nonImage(), 'anomaly_type'),
      /"anomaly_type" is missing/,
    ],
    [
      'non-image without detail',
      without(nonImage(), 'detail'),
      /"detail" is missing/,
    ],
    [
      'image+produced without overlay',
      without(raw(), 'overlay'),
      /"overlay" is missing/,
    ],
    [
      'image+produced without overlay_origin',
      without(raw(), 'overlay_origin'),
      /"overlay_origin" is missing/,
    ],
    [
      'image+produced without dimensions',
      without(raw(), 'dimensions'),
      /"dimensions" is missing/,
    ],
    [
      'non-image with overlay',
      nonImage({ overlay: 'assets/anomaly-overlays/cam01/x.webp' }),
      /overlay is not allowed on a non_image entry/,
    ],
    [
      'non-image with only dimensions',
      nonImage({ dimensions: '3x4' }),
      /dimensions is not allowed on a non_image entry/,
    ],
    [
      'planned with only overlay',
      planned({ overlay: 'assets/anomaly-overlays/cam02/pl.webp' }),
      /"overlay_origin" is missing/,
    ],
    [
      'planned with overlay + origin but no dimensions',
      planned({
        overlay: 'assets/anomaly-overlays/cam02/pl.webp',
        overlay_origin: '(1,2)',
      }),
      /"dimensions" is missing/,
    ],
    [
      'planned with only dimensions',
      planned({ dimensions: '3x4' }),
      /"overlay" is missing/,
    ],
    [
      'feed_glitch with a non-camera category',
      nonImage({ category: 'object' }),
      /feed_glitch needs category camera/,
    ],
    [
      'feed_glitch with no category',
      without(nonImage(), 'category'),
      /feed_glitch needs category camera/,
    ],
    [
      'sound without category',
      without(nonImage({ anomaly_type: 'sound' }), 'category'),
      /sound needs one/,
    ],
    [
      'feed_glitch with camera second only',
      nonImage({ category: ['object', 'camera'] }),
      /feed_glitch needs category camera/,
    ],
    [
      'image entry with camera first',
      raw({ category: ['camera', 'surreal'] }),
      /category "camera" cannot be first on an image entry/,
    ],
    [
      'ui_corruption with an invalid category',
      nonImage({ anomaly_type: 'ui_corruption', category: 'ghost' }),
      /category "ghost" is unknown/,
    ],
    [
      'rule_break with an invalid category',
      nonImage({ anomaly_type: 'rule_break', category: 'ghost' }),
      /category "ghost" is unknown/,
    ],
  ])('%s: error names the entry', (_n, input, problem) => {
    const id = (input as { id: string }).id
    expect(() => parseLedgerRecord(input, 0)).toThrow(
      new RegExp(`^anomalies\\.yaml entry "${id}": `)
    )
    expect(() => parseLedgerRecord(input, 0)).toThrow(problem)
  })
})

describe('mixed ledger (#77)', () => {
  const mixed = () => ({
    anomalies: [
      raw({ id: 'img-1' }),
      planned({ id: 'plan-1' }),
      nonImage({ id: 'rt-feed' }),
      nonImage({
        id: 'rt-sound',
        anomaly_type: 'sound',
        category: 'environment',
      }),
      raw({ id: 'img-2', camera_id: 'CAM03' }),
      without(
        nonImage({ id: 'rt-ui', anomaly_type: 'ui_corruption' }),
        'category'
      ),
      nonImage({
        id: 'rt-rule',
        anomaly_type: 'rule_break',
        status: 'produced',
      }),
    ],
  })
  it('parseLedger returns only image+produced entries, in order', () => {
    const r = parseLedger(mixed())
    expect(r.map(e => e.id)).toEqual(['img-1', 'img-2'])
    expect(r[1].cameraId).toBe(3)
  })
  it('parseLedgerRecords returns every entry', () => {
    const r = parseLedgerRecords(mixed())
    expect(r.map(e => e.id)).toEqual([
      'img-1',
      'plan-1',
      'rt-feed',
      'rt-sound',
      'img-2',
      'rt-ui',
      'rt-rule',
    ])
    expect(r.filter(isGameRecord).map(e => e.id)).toEqual(['img-1', 'img-2'])
  })
  it('parseLedgerEntry throws for planned and non-image entries', () => {
    expect(() => parseLedgerEntry(planned(), 0)).toThrow(
      /entry "PL-01": not a produced image entry/
    )
    expect(() => parseLedgerEntry(nonImage(), 0)).toThrow(
      /entry "RT-01": not a produced image entry/
    )
    expect(() => parseLedgerEntry(nonImage({ status: 'produced' }), 0)).toThrow(
      /not a produced image entry/
    )
  })
  it('toLedgerEntry rejects non-game records', () => {
    expect(() => toLedgerEntry(parseLedgerRecord(planned(), 0))).toThrow(
      /not a produced image entry/
    )
  })
  it('isGameRecord is true only for image+produced', () => {
    expect(isGameRecord(parseLedgerRecord(raw(), 0))).toBe(true)
    expect(isGameRecord(parseLedgerRecord(planned(), 0))).toBe(false)
    expect(
      isGameRecord(parseLedgerRecord(nonImage({ status: 'produced' }), 0))
    ).toBe(false)
  })
  it('rejects duplicate ids across kinds and statuses', () => {
    expect(() =>
      parseLedgerRecords({
        anomalies: [raw({ id: 'same' }), nonImage({ id: 'same' })],
      })
    ).toThrow(/duplicate id "same"/)
    expect(() =>
      parseLedger({ anomalies: [planned({ id: 'same' }), raw({ id: 'same' })] })
    ).toThrow(/duplicate id "same"/)
  })
  it('validates planned and non-image entries even though parseLedger drops them', () => {
    expect(() =>
      parseLedger({
        anomalies: [raw(), planned({ id: 'bad', category: 'ghost' })],
      })
    ).toThrow(/entry "bad".*category "ghost"/)
    expect(() =>
      parseLedger({ anomalies: [raw(), nonImage({ id: 'bad', detail: '' })] })
    ).toThrow(/entry "bad".*"detail"/)
  })
})

describe('memo_flag and memo (#325)', () => {
  it('reads a name or a list of names, and a Japanese and English one-liner', () => {
    const one = parseLedgerRecord(raw({ memo_flag: 'shutter' }), 0)
    expect(one.memoFlags).toEqual(['shutter'])
    const two = parseLedgerRecord(raw({ memo_flag: ['food', 'reiwa'] }), 0)
    expect(two.memoFlags).toEqual(['food', 'reiwa'])
    const withMemo = parseLedgerRecord(
      raw({ memo: { ja: ' 古い紙。 ', en: 'An old paper.' } }),
      0
    )
    expect(withMemo.memo).toEqual({ ja: '古い紙。', en: 'An old paper.' })
    expect(parseLedgerRecord(raw(), 0).memoFlags).toBeUndefined()
    expect(parseLedgerRecord(raw(), 0).memo).toBeUndefined()
  })
  it('hands both to the game entry', () => {
    const e = toLedgerEntry(
      parseLedgerRecord(
        raw({ memo_flag: 'food', memo: { ja: 'あ', en: 'a' } }),
        0
      )
    )
    expect(e.memoFlags).toEqual(['food'])
    expect(e.memo).toEqual({ ja: 'あ', en: 'a' })
    expect(toLedgerEntry(parseLedgerRecord(raw(), 0))).not.toHaveProperty(
      'memo'
    )
  })
  it.each([
    [{ memo_flag: 'nope' }, 'unknown flag'],
    [{ memo_flag: ['food', 'food'] }, 'a flag twice'],
    [{ memo: 'text' }, 'a memo that is not a mapping'],
    [{ memo: { ja: 'あ' } }, 'a memo without English'],
    [{ memo: { ja: 'あ', en: ' ' } }, 'a blank English memo'],
    [{ memo: { ja: 'あ\nい', en: 'a' } }, 'a two-line memo'],
    [{ memo: { ja: 'あ', en: 'a', fr: 'b' } }, 'an unknown memo key'],
  ] as [Record<string, unknown>, string][])(
    'rejects %j (%s) and names the entry',
    over => {
      expect(() => parseLedgerRecord(raw(over), 0)).toThrow(/AR-01-notice/)
    }
  )
})

describe('the real ledger carries the memo marks (#325)', () => {
  const records = parseLedgerRecords(
    parseYaml(
      readFileSync(resolve(__dirname, '../../prompts/anomalies.yaml'), 'utf8')
    )
  )
  const withFlag = (f: string) =>
    records.filter(r => r.memoFlags?.includes(f as 'food')).map(r => r.id)
  it('marks the shutter anomalies named in the issue', () => {
    expect(withFlag('shutter')).toEqual(
      expect.arrayContaining([
        'AR-01-shutter-light',
        'AR-02-shutter-crayon-drawings',
        'AR-03-shutter-wave',
        'AR-01-shutter-stripe-break',
      ])
    )
  })
  it('marks food anomalies, and every flagged entry is a produced image one the game can draw', () => {
    expect(withFlag('food')).toContain('AR-02-coffee')
    for (const r of records.filter(r => r.memoFlags))
      expect(isGameRecord(r), r.id).toBe(true)
  })
  it('gives every entry a one-liner (#325 2nd stage); a new entry must bring its memo', () => {
    const without = records.filter(r => !r.memo).map(r => r.id)
    expect(without).toEqual([])
  })
  it('never uses the same one-liner twice, in either language', () => {
    for (const lang of ['ja', 'en'] as const) {
      const seen = new Map<string, string>()
      for (const r of records) {
        const text = r.memo?.[lang] ?? ''
        expect(
          seen.get(text),
          `${lang}: ${r.id} repeats ${text}`
        ).toBeUndefined()
        seen.set(text, r.id)
      }
    }
  })
})

describe('the real ledger keeps category well-formed (#347)', () => {
  const records = parseLedgerRecords(
    parseYaml(
      readFileSync(resolve(__dirname, '../../prompts/anomalies.yaml'), 'utf8')
    )
  )
  it('has no leftover also_categories key', () => {
    const text = readFileSync(
      resolve(__dirname, '../../prompts/anomalies.yaml'),
      'utf8'
    )
    expect(text).not.toMatch(/also_?categor/)
  })
  it('every image entry has a non-camera primary; arrays have no repeat', () => {
    for (const r of records) {
      const all = r.categories ?? (r.category ? [r.category] : [])
      expect(new Set(all).size, r.id).toBe(all.length)
      if (r.kind === 'image') expect(r.category, r.id).not.toBe('Camera')
    }
  })
  it('a non-human animal is not a person; a human-shaped picture is (kako-jun 2026-11-12)', () => {
    const catsOf = (id: string) => {
      const r = records.find(x => x.id === id)
      expect(r, id).toBeDefined()
      return r?.categories ?? [r?.category]
    }
    for (const id of [
      'AR-05-aisle-goldfish',
      'AR-02-cat',
      'AR-08-cat',
      'AR-03-walking-cat',
      'AR-07-stairs-cat',
      'AR-01-threshold-pigeon',
      'AR-08-pillar-sparrow',
      'AR-04-rat-left-floor',
      'AR-06-wall-gecko',
      'AR-01-ceiling-spider',
    ]) {
      expect(catsOf(id), id).toEqual(['Object'])
    }
    for (const id of [
      'AR-03-face-ornament',
      'AR-05-film-poster',
      'AR-01-wall-faces',
      'AR-06-wall-same-poster',
      'AR-02-shutter-crayon-drawings',
      'AR-07-pictogram-flip',
    ]) {
      expect(catsOf(id), id).toContain('Person')
    }
    expect(catsOf('AR-01-window-peeping-face')[0]).toBe('Person')
  })
  it('lists camera second or later on the surface-wide image entries', () => {
    const r = records.find(x => x.id === 'AR-07-floor-frost')
    expect(r?.categories).toEqual(['Environment', 'Surreal', 'Camera'])
  })
})
