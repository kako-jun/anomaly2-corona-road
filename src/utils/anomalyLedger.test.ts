import { describe, expect, it } from 'vitest'
import {
  parseCameraId,
  parseCategory,
  parseDimensions,
  parseLedger,
  parseLedgerEntry,
  parseOrigin,
} from './anomalyLedger'

const raw = (over: Record<string, unknown> = {}) => ({
  id: 'AR-01-notice',
  camera_id: 'CAM01',
  category: 'object',
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

describe('parseLedgerEntry', () => {
  it('maps every field to the game shape', () => {
    expect(parseLedgerEntry(raw(), 0)).toEqual({
      id: 'AR-01-notice',
      cameraId: 1,
      category: 'Object',
      overlay: 'assets/anomaly-overlays/cam01/notice.webp',
      origin: { x: 137, y: 379 },
      size: { w: 46, h: 97 },
    })
  })
  it('ignores the other ledger columns', () => {
    const e = parseLedgerEntry(raw({ note: 'x', element_id: 'CAM01-E09' }), 0)
    expect(Object.keys(e).sort()).toEqual(
      ['cameraId', 'category', 'id', 'origin', 'overlay', 'size'].sort()
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
    ['bad origin', { overlay_origin: '137,379' }, /overlay_origin/],
    ['bad dimensions', { dimensions: '0x9' }, /dimensions/],
    ['bad camera', { camera_id: 'CAM00' }, /camera_id/],
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
