import { describe, expect, it } from 'vitest'
import { SWIPE_MIN_PX, nextPage, prevPage, swipeDirection } from './titlePager'

describe('title pager', () => {
  it('goes forward and wraps from the last page to the first', () => {
    expect([0, 1, 2].map(i => nextPage(i, 3))).toEqual([1, 2, 0])
  })
  it('goes back and wraps from the first page to the last', () => {
    expect([0, 1, 2].map(i => prevPage(i, 3))).toEqual([2, 0, 1])
  })
  it('survives an empty set', () => {
    expect(nextPage(0, 0)).toBe(0)
    expect(prevPage(0, 0)).toBe(0)
  })
  it('a swipe left is next, right is previous, a short move is a tap', () => {
    expect(swipeDirection(-SWIPE_MIN_PX)).toBe('next')
    expect(swipeDirection(SWIPE_MIN_PX)).toBe('prev')
    expect(swipeDirection(SWIPE_MIN_PX - 1)).toBeNull()
    expect(swipeDirection(0)).toBeNull()
  })
})
