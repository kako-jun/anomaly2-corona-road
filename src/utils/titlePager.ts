/** Page turning of the title notes on a narrow screen (#296): the notes are shown one at a time. */

/** The next page; the one after the last is the first. */
export const nextPage = (index: number, count: number): number =>
  count <= 0 ? 0 : (index + 1) % count

/** The previous page; the one before the first is the last. */
export const prevPage = (index: number, count: number): number =>
  count <= 0 ? 0 : (index - 1 + count) % count

/** A drag shorter than this (px) is a tap / click. */
export const SWIPE_MIN_PX = 30

/** Which way a horizontal movement counts: left -> next, right -> previous, small -> none (a tap). */
export const swipeDirection = (dx: number): 'next' | 'prev' | null =>
  Math.abs(dx) < SWIPE_MIN_PX ? null : dx < 0 ? 'next' : 'prev'
