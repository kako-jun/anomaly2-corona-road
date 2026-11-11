import { describe, expect, it } from 'vitest'
import { toFullWidthDigits } from './fullWidth'

describe('toFullWidthDigits', () => {
  it('turns ASCII digits into full-width digits and leaves the rest', () => {
    expect(toFullWidthDigits(8)).toBe('８')
    expect(toFullWidthDigits('06:00')).toBe('０６:００')
    expect(toFullWidthDigits('1234567890')).toBe('１２３４５６７８９０')
    expect(toFullWidthDigits('3人目 #4 ！')).toBe('３人目 #４ ！')
  })
})
