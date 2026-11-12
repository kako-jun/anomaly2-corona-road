// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DIALOGUE_CONFIG } from '../utils/gameConfig'
import { SUBTITLE_GAP_MS } from '../utils/subtitle'
import { SubtitleInput, useSubtitle } from './useSubtitle'

// The English subtitle path (#326), with the switch and the language controlled by the test.
// Fixtures only: dialogue/*.yaml carries no en yet.
const H = vi.hoisted(() => ({
  enabled: true,
  language: 'en' as 'ja' | 'en',
  ledger: {
    flags: [],
    entries: [
      {
        kind: 'opening',
        id: 'opening-1',
        when: {},
        tone: 'light',
        lines: [
          { who: 'A', text: 'にほんご1', en: 'English one' },
          { who: 'M', text: 'にほんご2' },
        ],
      },
    ],
  },
}))
vi.mock('virtual:dialogue', () => ({ default: H.ledger }))
vi.mock('../utils/gameConfig', async importOriginal => {
  const actual = await importOriginal<typeof import('../utils/gameConfig')>()
  return {
    ...actual,
    get SUBTITLE_EN_ENABLED() {
      return H.enabled
    },
  }
})
vi.mock('../utils/language', () => ({ currentLanguage: () => H.language }))

const base: SubtitleInput = {
  wrongFeedbackId: null,
  wrongAnomalyId: null,
  elapsedMs: 0,
  foundThisPlay: 0,
  flagEvent: null,
  ending: null,
  onClosingDone: () => {},
}
const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms))
const firstLine = (enabled: boolean, language: 'ja' | 'en') => {
  H.enabled = enabled
  H.language = language
  const { result } = renderHook(() => useSubtitle(base))
  advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS)
  return result
}

beforeEach(() => {
  vi.useFakeTimers()
  localStorage.clear()
  vi.spyOn(Math, 'random').mockReturnValue(0)
})
afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('useSubtitle English (#326)', () => {
  it('shows the en line when the language is English and the switch is on', () => {
    const r = firstLine(true, 'en')
    expect(r.current).toEqual({
      text: 'English one',
      english: true,
      visible: true,
    })
  })

  it('shows Japanese when the switch is off', () => {
    expect(firstLine(false, 'en').current.text).toBe('にほんご1')
    expect(firstLine(false, 'en').current.english).toBe(false)
  })

  it('shows Japanese when the language is Japanese', () => {
    expect(firstLine(true, 'ja').current.text).toBe('にほんご1')
  })

  it('falls back to Japanese for a line without en', () => {
    const r = firstLine(true, 'en')
    advance(10_000)
    expect(r.current).toMatchObject({ text: 'にほんご2', english: false })
  })

  it('picks the language per line: a change while a conversation plays shows from the next line on', () => {
    const entry = H.ledger.entries[0]
    const saved = entry.lines
    entry.lines = [
      { who: 'A', text: 'にほんご1', en: 'English one' },
      { who: 'M', text: 'にほんご2', en: 'English two' },
    ]
    try {
      const r = firstLine(true, 'en')
      expect(r.current.text).toBe('English one')
      H.language = 'ja'
      advance(10_000)
      expect(r.current).toMatchObject({ text: 'にほんご2', english: false })
    } finally {
      entry.lines = saved
    }
  })
})
