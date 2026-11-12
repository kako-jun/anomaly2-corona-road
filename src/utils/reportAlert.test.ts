import { describe, expect, it } from 'vitest'
import { ALERT_UNREPORTED_MIN } from './gameConfig'
import { shouldAlert } from './reportAlert'

describe('shouldAlert (#344)', () => {
  it('uses 3 as the default threshold', () => {
    expect(ALERT_UNREPORTED_MIN).toBe(3)
  })
  it.each([
    [0, false],
    [1, false],
    [2, false],
    [3, true],
    [4, true],
    [8, true],
  ])('%i unreported -> %s', (n, expected) => {
    expect(shouldAlert(n)).toBe(expected)
  })
  it('follows an explicit threshold', () => {
    expect(shouldAlert(4, 5)).toBe(false)
    expect(shouldAlert(5, 5)).toBe(true)
  })
})
