// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { StrictMode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DIALOGUE } from '../data/dialogue'
import {
  SUBTITLE_GAP_MS,
  hintGroups,
  normalLines,
  subtitleHoldMs,
} from '../utils/subtitle'
import { useSubtitle } from './useSubtitle'

const NORMAL = normalLines(DIALOGUE)
const HINTS = hintGroups(DIALOGUE)
const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms))
/** Time from one line appearing to the next line appearing. */
const cycle = (text: string) => subtitleHoldMs(text) + SUBTITLE_GAP_MS

beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})

const setup = (id: number | null = null) =>
  renderHook(({ id }: { id: number | null }) => useSubtitle(id), {
    initialProps: { id },
  })

/** Show the first line and return to just after it appeared. */
const showFirst = () => advance(SUBTITLE_GAP_MS)

describe('useSubtitle', () => {
  it('starts empty and hidden', () => {
    const { result } = setup()
    expect(result.current).toEqual({ text: '', visible: false })
  })

  it('shows nothing at gap-1 ms', () => {
    const { result } = setup()
    advance(SUBTITLE_GAP_MS - 1)
    expect(result.current.text).toBe('')
    expect(result.current.visible).toBe(false)
  })

  it('shows the first line at exactly the gap', () => {
    const { result } = setup()
    showFirst()
    expect(result.current).toEqual({ text: NORMAL[0], visible: true })
  })

  it('moves to the next line after hold+gap, hiding in between', () => {
    const { result } = setup()
    showFirst()
    advance(subtitleHoldMs(NORMAL[0]))
    expect(result.current.visible).toBe(false)
    advance(SUBTITLE_GAP_MS)
    expect(result.current).toEqual({ text: NORMAL[1], visible: true })
  })

  it('goes through all normal lines and loops back to the first', () => {
    const { result } = setup()
    showFirst()
    for (let i = 1; i <= NORMAL.length; i++) {
      advance(cycle(NORMAL[i - 1]))
      expect(result.current.text).toBe(NORMAL[i % NORMAL.length])
    }
  })

  it('shows the hint lines first on a false report, two in a row', () => {
    const { result, rerender } = setup()
    showFirst()
    rerender({ id: 1 })
    advance(SUBTITLE_GAP_MS)
    expect(result.current.text).toBe(HINTS[0][0])
    advance(cycle(HINTS[0][0]))
    expect(result.current.text).toBe(HINTS[0][1])
  })

  it('resumes normal lines from where they were after the hints', () => {
    const { result, rerender } = setup()
    showFirst()
    advance(cycle(NORMAL[0])) // now showing NORMAL[1]
    rerender({ id: 1 })
    advance(SUBTITLE_GAP_MS)
    advance(cycle(HINTS[0][0]))
    advance(cycle(HINTS[0][1]))
    expect(result.current.text).toBe(NORMAL[2])
  })

  it('does not requeue hints when re-rendered with the same id', () => {
    const { result, rerender } = setup()
    showFirst()
    rerender({ id: 1 })
    rerender({ id: 1 })
    advance(SUBTITLE_GAP_MS)
    advance(cycle(HINTS[0][0]))
    advance(cycle(HINTS[0][1]))
    expect(result.current.text).toBe(NORMAL[1])
  })

  it('uses the next hint group for each new id, cycling when exhausted', () => {
    const { result, rerender } = setup()
    showFirst()
    for (let n = 0; n < HINTS.length + 1; n++) {
      rerender({ id: n + 1 })
      advance(SUBTITLE_GAP_MS)
      expect(result.current.text).toBe(HINTS[n % HINTS.length][0])
    }
  })

  it('does not flash the old text when a report lands during the gap', () => {
    const { result, rerender } = setup()
    showFirst()
    advance(subtitleHoldMs(NORMAL[0])) // line faded, next one still pending
    rerender({ id: 1 })
    expect(result.current.visible).toBe(false)
    advance(SUBTITLE_GAP_MS)
    expect(result.current.text).toBe(HINTS[0][0])
    expect(result.current.visible).toBe(true)
  })

  it('does nothing when the id returns to null', () => {
    const { result, rerender } = setup()
    showFirst()
    rerender({ id: 1 })
    advance(SUBTITLE_GAP_MS)
    rerender({ id: null })
    expect(result.current.text).toBe(HINTS[0][0])
    expect(result.current.visible).toBe(true)
  })

  it('leaves no timers behind after unmount', () => {
    const { unmount } = setup()
    showFirst()
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('under StrictMode (mount, cleanup, mount) still starts at the first normal line', () => {
    const plain = setup()
    advance(SUBTITLE_GAP_MS)
    const expected = plain.result.current.text
    plain.unmount()

    const { result } = renderHook(() => useSubtitle(null), {
      wrapper: StrictMode,
    })
    advance(SUBTITLE_GAP_MS)
    expect(result.current.text).toBe(NORMAL[0])
    expect(result.current.text).toBe(expected)
  })
})
