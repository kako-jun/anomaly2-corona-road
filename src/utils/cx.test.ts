import { describe, expect, it } from 'vitest'
import { cx } from './cx'

describe('cx', () => {
  it('joins names with a single space', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c')
  })
  it('drops false, null, undefined and empty string', () => {
    expect(cx('a', false, null, undefined, '', 'b')).toBe('a b')
  })
  it('returns an empty string when nothing is truthy', () => {
    expect(cx(false, null)).toBe('')
  })
  it('keeps a name behind a true condition', () => {
    const lit = true
    expect(cx('lamp', lit && 'lit')).toBe('lamp lit')
  })
})
