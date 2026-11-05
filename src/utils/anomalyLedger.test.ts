import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
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
    const section = md.split('## 異変タイプ enum')[1].split(/\n## /)[0]
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

describe('parseLedgerEntry also_categories (#236)', () => {
  it('is undefined (key absent) when the column is missing', () => {
    const e = parseLedgerEntry(raw(), 0)
    expect(e.alsoCategories).toBeUndefined()
    expect('alsoCategories' in e).toBe(false)
  })
  it('is undefined (key absent) when the value is null', () => {
    const e = parseLedgerEntry(raw({ also_categories: null }), 0)
    expect('alsoCategories' in e).toBe(false)
  })
  it.each([
    ['object', 'Object'],
    ['environment', 'Environment'],
    ['person', 'Person'],
    ['surreal', 'Surreal'],
  ])('accepts %s when it differs from category', (value, expected) => {
    const category = expected === 'Person' ? 'camera' : 'person'
    expect(
      parseLedgerEntry(raw({ category, also_categories: [value] }), 0)
        .alsoCategories
    ).toEqual([expected])
  })
  it('treats case like parseCategory does', () => {
    expect(
      parseLedgerEntry(raw({ also_categories: ['PERSON'] }), 0).alsoCategories
    ).toEqual(['Person'])
    expect(
      parseLedgerEntry(raw({ also_categories: ['Surreal'] }), 0).alsoCategories
    ).toEqual(['Surreal'])
  })
  it('rejects an unknown value, naming the entry', () => {
    expect(() =>
      parseLedgerEntry(raw({ also_categories: ['ghost'] }), 0)
    ).toThrow(/entry "AR-01-notice".*also_categories "ghost" is unknown/)
  })
  it.each(['object', 'Object', 'OBJECT'])(
    'rejects %s when it equals category, naming the entry',
    v => {
      expect(() => parseLedgerEntry(raw({ also_categories: [v] }), 0)).toThrow(
        /entry "AR-01-notice".*is the same as category/
      )
    }
  )
  it.each([
    ['a number item', [12]],
    ['a boolean item', [true]],
    ['a plain string', 'person'],
  ])('rejects a value that is %s', (_n, v) => {
    expect(() => parseLedgerEntry(raw({ also_categories: v }), 0)).toThrow(
      /entry "AR-01-notice".*also_categories/
    )
  })
  it.each(['camera', ' Camera ', 'CAMERA'])(
    'rejects camera as also_categories (%j) with the entry id',
    v => {
      expect(() => parseLedgerEntry(raw({ also_categories: [v] }), 0)).toThrow(
        /entry "AR-01-notice".*also_categories "[Cc][Aa][Mm][Ee][Rr][Aa]" is not allowed/
      )
    }
  )

  it('adds alsoCategories without changing any other field', () => {
    const base = parseLedgerEntry(raw(), 0)
    const withAlso = parseLedgerEntry(raw({ also_categories: ['person'] }), 0)
    expect(withAlso).toEqual({ ...base, alsoCategories: ['Person'] })
  })
  it('trims surrounding whitespace and accepts the value', () => {
    expect(
      parseLedgerEntry(raw({ also_categories: [' person '] }), 0).alsoCategories
    ).toEqual(['Person'])
  })
  it.each(['', '   '])('treats blank %j as no column', v => {
    const e = parseLedgerEntry(raw({ also_categories: [v] }), 0)
    expect('alsoCategories' in e).toBe(false)
  })
  it('reports the trimmed value in the unknown error', () => {
    expect(() =>
      parseLedgerEntry(raw({ also_categories: [' ghost '] }), 0)
    ).toThrow(/entry "AR-01-notice".*also_categories "ghost" is unknown/)
  })
  it('rejects a padded value equal to category', () => {
    expect(() =>
      parseLedgerEntry(raw({ also_categories: [' object '] }), 0)
    ).toThrow(/entry "AR-01-notice".*also_categories "object" is the same as/)
  })
})

describe('parseLedgerEntry also_categories array shapes (#240)', () => {
  const also = (v: unknown, over: Record<string, unknown> = {}) =>
    parseLedgerEntry(raw({ also_categories: v, ...over }), 0).alsoCategories
  it('accepts two items and keeps their order', () => {
    expect(also(['person', 'surreal'])).toEqual(['Person', 'Surreal'])
    expect(also(['surreal', 'person'])).toEqual(['Surreal', 'Person'])
  })
  it('accepts three or more items and keeps their order', () => {
    expect(also(['surreal', 'environment', 'person'])).toEqual([
      'Surreal',
      'Environment',
      'Person',
    ])
  })
  it.each([
    ['an empty array', []],
    ['only blank items', ['', '  ']],
  ])('treats %s as no column', (_n, v) => {
    const e = parseLedgerEntry(raw({ also_categories: v }), 0)
    expect('alsoCategories' in e).toBe(false)
  })
  it('skips blank items among valid ones', () => {
    expect(also(['person', '  ', 'surreal'])).toEqual(['Person', 'Surreal'])
  })
  it('trims every item', () => {
    expect(also([' person ', '\tsurreal  '])).toEqual(['Person', 'Surreal'])
  })
  it.each([
    ['a number', [12]],
    ['null', [null]],
    ['a nested array', [['person']]],
    ['a valid item then a number', ['person', 3]],
  ])('rejects an item that is %s', (_n, v) => {
    expect(() => parseLedgerEntry(raw({ also_categories: v }), 0)).toThrow(
      /entry "AR-01-notice".*"also_categories" has a non-string item/
    )
  })
  it.each([
    ['true', true],
    ['a number', 12],
    ['an object', { a: 1 }],
  ])('rejects %s as not an array', (_n, v) => {
    expect(() => parseLedgerEntry(raw({ also_categories: v }), 0)).toThrow(
      /entry "AR-01-notice".*"also_categories" is not an array/
    )
  })
  it('rejects a bare string', () => {
    expect(() =>
      parseLedgerEntry(raw({ also_categories: 'person' }), 0)
    ).toThrow(/entry "AR-01-notice".*"also_categories" is not an array/)
  })
  it('rejects camera mixed in with valid items', () => {
    expect(() =>
      parseLedgerEntry(raw({ also_categories: ['person', 'camera'] }), 0)
    ).toThrow(/entry "AR-01-notice".*also_categories "camera" is not allowed/)
    expect(() =>
      parseLedgerEntry(
        raw({ category: 'person', also_categories: ['object', 'camera'] }),
        0
      )
    ).toThrow(/also_categories "camera" is not allowed/)
  })
  it('rejects the primary category in the middle of the array', () => {
    expect(() =>
      parseLedgerEntry(
        raw({ also_categories: ['person', 'object', 'surreal'] }),
        0
      )
    ).toThrow(
      /entry "AR-01-notice".*also_categories "object" is the same as category/
    )
  })
  it.each([
    ['person', 'person'],
    ['person', 'PERSON'],
    [' Person ', 'person'],
  ])('rejects duplicates (%j, %j)', (a, b) => {
    expect(() =>
      parseLedgerEntry(raw({ also_categories: [a, 'surreal', b] }), 0)
    ).toThrow(/entry "AR-01-notice".*also_categories "person" is duplicated/i)
  })
  it('accepts every non-camera combination that avoids the primary', () => {
    const all = ['object', 'environment', 'person', 'surreal']
    for (const primary of all) {
      const others = all.filter(c => c !== primary)
      expect(also(others, { category: primary })).toHaveLength(3)
    }
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

const runtime = (over: Record<string, unknown> = {}) => ({
  id: 'RT-01',
  kind: 'runtime',
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
    'accepts runtime feed_glitch (%s) with camera_id',
    status => {
      const r = parseLedgerRecord(
        runtime({ status, camera_id: 'CAM05', spec: 's' }),
        0
      )
      expect(r).toMatchObject({
        kind: 'runtime',
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
  it('accepts runtime feed_glitch without camera_id', () => {
    const r = parseLedgerRecord(runtime(), 0)
    expect(r.cameraId).toBeUndefined()
    expect('cameraId' in r).toBe(false)
  })
  it('accepts runtime sound with category environment', () => {
    const r = parseLedgerRecord(
      runtime({ anomaly_type: 'sound', category: 'environment' }),
      0
    )
    expect(r.category).toBe('Environment')
    expect(r.anomalyType).toBe('sound')
  })
  it.each(['ui_corruption', 'rule_break'])(
    'accepts runtime %s with an empty or valid category',
    type => {
      const none = parseLedgerRecord(
        without(runtime({ anomaly_type: type }), 'category'),
        0
      )
      expect('category' in none).toBe(false)
      expect(
        parseLedgerRecord(runtime({ anomaly_type: type, category: null }), 0)
          .category
      ).toBeUndefined()
      expect(
        parseLedgerRecord(
          runtime({ anomaly_type: type, category: 'surreal' }),
          0
        ).category
      ).toBe('Surreal')
    }
  )
  it('accepts a valid also_categories on runtime entries', () => {
    expect(
      parseLedgerRecord(
        runtime({
          anomaly_type: 'sound',
          category: 'environment',
          also_categories: ['object'],
        }),
        0
      ).alsoCategories
    ).toEqual(['Object'])
    expect(
      parseLedgerRecord(runtime({ also_categories: ['surreal'] }), 0)
        .alsoCategories
    ).toEqual(['Surreal'])
  })
})

describe('parseLedgerRecord also_categories without category (#240)', () => {
  const noCat = (v: unknown) =>
    without(
      runtime({ anomaly_type: 'ui_corruption', also_categories: v }),
      'category'
    )
  it.each([
    ['an empty array', []],
    ['null', null],
    ['blank items only', ['', ' ']],
  ])('tolerates %s', (_n, v) => {
    const r = parseLedgerRecord(noCat(v), 0)
    expect(r.alsoCategories).toBeUndefined()
    expect('alsoCategories' in r).toBe(false)
  })
  it('rejects a non-empty array', () => {
    expect(() => parseLedgerRecord(noCat(['x']), 0)).toThrow(
      /also_categories needs a category/
    )
  })
})

describe('parseLedgerRecord: rejected shapes (#77)', () => {
  it.each([
    ['unknown status', raw({ status: 'done' }), /status "done" is unknown/],
    ['unknown kind', raw({ kind: 'audio' }), /kind "audio" is unknown/],
    [
      'unknown anomaly_type on runtime',
      runtime({ anomaly_type: 'ghost' }),
      /anomaly_type "ghost" is unknown/,
    ],
    [
      'runtime type on an image entry',
      raw({ anomaly_type: 'sound' }),
      /runtime type but kind is image/,
    ],
    [
      'image type on a runtime entry',
      runtime({ anomaly_type: 'add_object' }),
      /image type but kind is runtime/,
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
      'runtime without anomaly_type',
      without(runtime(), 'anomaly_type'),
      /"anomaly_type" is missing/,
    ],
    [
      'runtime without detail',
      without(runtime(), 'detail'),
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
      'runtime with overlay',
      runtime({ overlay: 'assets/anomaly-overlays/cam01/x.webp' }),
      /overlay is not allowed on a runtime entry/,
    ],
    [
      'runtime with only dimensions',
      runtime({ dimensions: '3x4' }),
      /dimensions is not allowed on a runtime entry/,
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
      runtime({ category: 'object' }),
      /feed_glitch needs category camera/,
    ],
    [
      'feed_glitch with no category',
      without(runtime(), 'category'),
      /feed_glitch needs category camera/,
    ],
    [
      'sound without category',
      without(runtime({ anomaly_type: 'sound' }), 'category'),
      /sound needs one/,
    ],
    [
      'also_categories without category',
      without(
        runtime({ anomaly_type: 'ui_corruption', also_categories: ['object'] }),
        'category'
      ),
      /also_categories needs a category/,
    ],
    [
      'runtime also_categories camera',
      runtime({
        anomaly_type: 'sound',
        category: 'environment',
        also_categories: ['camera'],
      }),
      /also_categories "camera" is not allowed/,
    ],
    [
      'ui_corruption with an invalid category',
      runtime({ anomaly_type: 'ui_corruption', category: 'ghost' }),
      /category "ghost" is unknown/,
    ],
    [
      'rule_break with an invalid category',
      runtime({ anomaly_type: 'rule_break', category: 'ghost' }),
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
      runtime({ id: 'rt-feed' }),
      runtime({
        id: 'rt-sound',
        anomaly_type: 'sound',
        category: 'environment',
      }),
      raw({ id: 'img-2', camera_id: 'CAM03' }),
      without(
        runtime({ id: 'rt-ui', anomaly_type: 'ui_corruption' }),
        'category'
      ),
      runtime({
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
  it('parseLedgerEntry throws for planned and runtime entries', () => {
    expect(() => parseLedgerEntry(planned(), 0)).toThrow(
      /entry "PL-01": not a produced image entry/
    )
    expect(() => parseLedgerEntry(runtime(), 0)).toThrow(
      /entry "RT-01": not a produced image entry/
    )
    expect(() => parseLedgerEntry(runtime({ status: 'produced' }), 0)).toThrow(
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
      isGameRecord(parseLedgerRecord(runtime({ status: 'produced' }), 0))
    ).toBe(false)
  })
  it('rejects duplicate ids across kinds and statuses', () => {
    expect(() =>
      parseLedgerRecords({
        anomalies: [raw({ id: 'same' }), runtime({ id: 'same' })],
      })
    ).toThrow(/duplicate id "same"/)
    expect(() =>
      parseLedger({ anomalies: [planned({ id: 'same' }), raw({ id: 'same' })] })
    ).toThrow(/duplicate id "same"/)
  })
  it('validates planned and runtime entries even though parseLedger drops them', () => {
    expect(() =>
      parseLedger({
        anomalies: [raw(), planned({ id: 'bad', category: 'ghost' })],
      })
    ).toThrow(/entry "bad".*category "ghost"/)
    expect(() =>
      parseLedger({ anomalies: [raw(), runtime({ id: 'bad', detail: '' })] })
    ).toThrow(/entry "bad".*"detail"/)
  })
})
