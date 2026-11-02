import { describe, expect, it, vi } from 'vitest'
import { DEFAULT_CONFIG } from './gameConfig'
import { misreportLampCount, misreportLimitText } from './startScreen'

describe('misreportLampCount', () => {
  it('defaults to DEFAULT_CONFIG.maxMisreports', () => {
    expect(misreportLampCount()).toBe(DEFAULT_CONFIG.maxMisreports)
  })
  it.each([1, 3, 10])('returns %i as is', n => {
    expect(misreportLampCount(n)).toBe(n)
  })
  it('returns 0 for 0', () => {
    expect(misreportLampCount(0)).toBe(0)
  })
  it.each([-1, -100, -0.5])('clamps negative %d to 0', n => {
    expect(misreportLampCount(n)).toBe(0)
  })
  it.each([
    [2.9, 2],
    [3.1, 3],
    [0.99, 0],
  ])('floors the decimal %d to %d', (n, expected) => {
    expect(misreportLampCount(n)).toBe(expected)
  })
  it('turns NaN into 0 so a bad config cannot break the screen', () => {
    expect(misreportLampCount(NaN)).toBe(0)
  })
  it('turns Infinity into 0 (non-finite is a config error)', () => {
    expect(misreportLampCount(Infinity)).toBe(0)
  })
  it('turns -Infinity into 0', () => {
    expect(misreportLampCount(-Infinity)).toBe(0)
  })
})

describe('misreportLimitText', () => {
  it('defaults to "N回まで" derived from DEFAULT_CONFIG', () => {
    expect(misreportLimitText()).toBe(`${DEFAULT_CONFIG.maxMisreports}回まで`)
  })
  it.each([1, 5])('formats an explicit %i', n => {
    expect(misreportLimitText(n)).toBe(`${n}回まで`)
  })
  it('shows 0回まで for 0 and negatives (same clamp as the lamps)', () => {
    expect(misreportLimitText(0)).toBe('0回まで')
    expect(misreportLimitText(-2)).toBe('0回まで')
  })
  it('floors decimals', () => {
    expect(misreportLimitText(2.7)).toBe('2回まで')
  })
  it('follows DEFAULT_CONFIG when maxMisreports changes', () => {
    const original = DEFAULT_CONFIG.maxMisreports
    const spy = vi
      .spyOn(DEFAULT_CONFIG, 'maxMisreports', 'get')
      .mockReturnValue(original + 2)
    expect(misreportLimitText()).toBe(`${original + 2}回まで`)
    expect(misreportLampCount()).toBe(original + 2)
    spy.mockRestore()
  })
})
