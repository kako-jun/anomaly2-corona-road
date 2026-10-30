import { describe, expect, it } from 'vitest'
import { parseWear } from './wear'

describe('parseWear', () => {
  it.each([
    ['empty string', ''],
    ['other param only', '?foo=1'],
    ['empty value', '?wear='],
    ['whitespace only', '?wear=%20%20'],
    ['non-numeric', '?wear=abc'],
  ])('returns null for %s', (_n, search) => {
    expect(parseWear(search)).toBeNull()
  })
  it('parses a value in range', () => {
    expect(parseWear('?wear=0.5')).toBe(0.5)
  })
  it('accepts a search string without the leading ?', () => {
    expect(parseWear('wear=0.25')).toBe(0.25)
  })
  it('clamps below 0 to 0', () => {
    expect(parseWear('?wear=-0.1')).toBe(0)
  })
  it('clamps above 1 to 1', () => {
    expect(parseWear('?wear=1.0001')).toBe(1)
  })
  it('keeps the endpoint 0', () => {
    expect(parseWear('?wear=0')).toBe(0)
  })
  it('keeps the endpoint 1', () => {
    expect(parseWear('?wear=1')).toBe(1)
  })
  it('reads a numeric prefix like parseFloat (0.5abc -> 0.5)', () => {
    expect(parseWear('?wear=0.5abc')).toBe(0.5)
  })
  it('maps Infinity to 1', () => {
    expect(parseWear('?wear=Infinity')).toBe(1)
  })
  it('maps -Infinity to 0', () => {
    expect(parseWear('?wear=-Infinity')).toBe(0)
  })
  it('works alongside other params', () => {
    expect(parseWear('?a=1&wear=0.3&b=2')).toBe(0.3)
  })
})
