import { describe, expect, it } from 'vitest'
import ledger from 'virtual:dialogue'
import { SUBTITLE_EN_ENABLED } from './gameConfig'
import {
  EN_GUIDE_CHARS,
  longEnglishLines,
  pickSubtitle,
  subtitleHoldMs,
} from './subtitle'

const chars = (n: number) => 'あ'.repeat(n)

describe('subtitleHoldMs', () => {
  it('is the 2200 minimum for 0 chars', () => {
    expect(subtitleHoldMs(chars(0))).toBe(2200)
  })
  it('is still the minimum at 4 chars (1600+480=2080 < 2200)', () => {
    expect(subtitleHoldMs(chars(4))).toBe(2200)
  })
  it('switches to the formula at 5 chars (1600+600=2200)', () => {
    expect(subtitleHoldMs(chars(5))).toBe(2200)
  })
  it('grows at 6 chars (1600+720)', () => {
    expect(subtitleHoldMs(chars(6))).toBe(2320)
  })
  it('counts a full-width space as one char', () => {
    expect(subtitleHoldMs('　'.repeat(10))).toBe(1600 + 10 * 120)
  })
  it('counts the ellipsis "……" as two chars', () => {
    expect(subtitleHoldMs('……'.repeat(5))).toBe(1600 + 10 * 120)
  })
  it('counts "?" as one char', () => {
    expect(subtitleHoldMs('?'.repeat(10))).toBe(1600 + 10 * 120)
  })
  it('counts a surrogate pair as 2 (current behaviour, UTF-16 length)', () => {
    expect(subtitleHoldMs('𠮷'.repeat(10))).toBe(1600 + 20 * 120)
  })
  it('is finite and >= 2200 for every line of the dialogue ledger', () => {
    for (const e of ledger.entries) {
      for (const l of e.lines) {
        const ms = subtitleHoldMs(l.text)
        expect(Number.isFinite(ms)).toBe(true)
        expect(ms).toBeGreaterThanOrEqual(2200)
      }
    }
  })
})

describe('pickSubtitle (#326)', () => {
  const both = { text: 'こんばんは', en: 'Evening' }
  const jaOnly = { text: 'こんばんは' }

  it.each([
    // [language, enabled, line, expected]
    ['en', true, both, { text: 'Evening', english: true }],
    ['en', true, jaOnly, { text: 'こんばんは', english: false }],
    ['en', false, both, { text: 'こんばんは', english: false }],
    ['ja', true, both, { text: 'こんばんは', english: false }],
    ['ja', false, both, { text: 'こんばんは', english: false }],
    ['ja', true, jaOnly, { text: 'こんばんは', english: false }],
  ] as const)('language %s, switch %s', (language, enabled, line, expected) => {
    expect(pickSubtitle(line, language, enabled)).toEqual(expected)
  })

  it('ships with the switch off', () => {
    expect(SUBTITLE_EN_ENABLED).toBe(false)
  })
})

describe('longEnglishLines (#326)', () => {
  it('lists only the en lines over the guide, with id and 1-based line', () => {
    const ok = 'a'.repeat(EN_GUIDE_CHARS)
    const long = 'a'.repeat(EN_GUIDE_CHARS + 1)
    expect(
      longEnglishLines([
        { id: 'x-1', lines: [{ en: ok }, { en: long }, {}] },
        { id: 'x-2', lines: [{ en: long }] },
      ])
    ).toEqual([
      { id: 'x-1', line: 2, chars: EN_GUIDE_CHARS + 1 },
      { id: 'x-2', line: 1, chars: EN_GUIDE_CHARS + 1 },
    ])
  })
})
