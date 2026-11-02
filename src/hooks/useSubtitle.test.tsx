// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { StrictMode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DIALOGUE_CONFIG } from '../utils/gameConfig'
import { SUBTITLE_GAP_MS, subtitleHoldMs } from '../utils/subtitle'
import { SubtitleInput, useSubtitle } from './useSubtitle'

const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms))

const base: SubtitleInput = {
  wrongFeedbackId: null,
  wrongAnomalyId: null,
  elapsedMs: 0,
  foundThisPlay: 0,
  flagEvent: null,
  ending: null,
  onClosingDone: () => {},
}

beforeEach(() => {
  vi.useFakeTimers()
  localStorage.clear()
})
afterEach(() => {
  vi.useRealTimers()
})

const setup = (over: Partial<SubtitleInput> = {}) =>
  renderHook((p: SubtitleInput) => useSubtitle(p), {
    initialProps: { ...base, ...over },
  })

describe('useSubtitle', () => {
  it('starts empty and waits for the opening delay', () => {
    const { result } = setup()
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS - 1)
    expect(result.current).toEqual({ text: '', visible: false })
  })

  it('shows an opening line after the delay', () => {
    const { result } = setup()
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS)
    expect(result.current.visible).toBe(true)
    expect(result.current.text).not.toBe('')
  })

  it('is silent after the conversation, then speaks again after the interval', () => {
    const { result } = setup()
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS)
    // opening samples have two lines
    for (let i = 0; i < 2; i++)
      advance(subtitleHoldMs(result.current.text) + SUBTITLE_GAP_MS)
    advance(DIALOGUE_CONFIG.chatterIntervalMs / 2)
    expect(result.current.visible).toBe(false)
    advance(DIALOGUE_CONFIG.chatterIntervalMs / 2)
    expect(result.current.visible).toBe(true)
  })

  it('plays the closing conversation, then calls onClosingDone', () => {
    const done = vi.fn()
    const { rerender } = setup({ onClosingDone: done })
    rerender({ ...base, onClosingDone: done, ending: 'dawn' })
    expect(done).not.toHaveBeenCalled()
    advance(60_000)
    expect(done).toHaveBeenCalledTimes(1)
  })

  it('leaves no timers behind after unmount', () => {
    const { unmount } = setup()
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS)
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('works under StrictMode', () => {
    const { result } = renderHook(() => useSubtitle(base), {
      wrapper: StrictMode,
    })
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS)
    expect(result.current.visible).toBe(true)
  })
})
