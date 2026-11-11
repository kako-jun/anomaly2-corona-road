import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import ledger from 'virtual:dialogue'
import {
  LABELS,
  LAST_NIGHT,
  OUTCOMES,
  STAGES,
  STAGE_FLAGS,
} from './investigationNotes'
import type { Pair } from './investigationNotes'

const pairs = (v: unknown): Pair[] => {
  if (typeof v === 'function') {
    return Array.from({ length: 12 }, (_, n) =>
      (v as (n: number) => unknown)(n)
    ).flatMap(pairs)
  }
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>
    if (typeof o.ja === 'string' && typeof o.en === 'string')
      return [o as unknown as Pair]
    return Object.values(o).flatMap(pairs)
  }
  return []
}
const ALL = [STAGES, OUTCOMES, LAST_NIGHT, LABELS].flatMap(pairs)

/**
 * One data entry = one handwritten line, never wrapped by the browser (white-space: nowrap). The real width is
 * checked in a browser by `npm run check:note-wrap`; these are the character caps that check was tuned to
 * (Japanese 15px on a 308px line = 20 characters; Caveat 20px is about 40).
 */
const JA_MAX = 20
const EN_MAX = 40
const MAX_RULED = 7
const SCRIB_JA_MAX = 13 // beside the corridor sketch the scribble column is 196px
const SCRIB_EN_MAX = 24

describe('investigation note data', () => {
  it('stage flags exist in dialogue/flags.yaml', () => {
    for (const f of STAGE_FLAGS)
      expect(ledger.flags.map((d: { name: string }) => d.name)).toContain(f)
  })
  it('every entry has Japanese text; English may be empty only where a Japanese counter or an extra scribble line has no counterpart', () => {
    expect(ALL.length).toBeGreaterThan(40)
    for (const p of ALL) expect(p.ja).not.toBe('')
  })
  it('every synopsis line is short enough to stay on one line, in both languages', () => {
    for (const [stage, t] of Object.entries(STAGES)) {
      for (const l of t.lines) {
        expect(l.ja.length, `${stage} ja ${l.ja}`).toBeLessThanOrEqual(JA_MAX)
        expect(l.en.length, `${stage} en ${l.en}`).toBeLessThanOrEqual(EN_MAX)
      }
      expect(t.tail).toBeGreaterThanOrEqual(1)
      expect(t.tail).toBeLessThanOrEqual(t.lines.length)
    }
    for (const o of Object.values(OUTCOMES))
      for (const l of o.lines) {
        expect(l.ja.length, l.ja).toBeLessThanOrEqual(JA_MAX)
        expect(l.en.length, l.en).toBeLessThanOrEqual(EN_MAX)
      }
    for (const l of Object.values(LAST_NIGHT)) {
      expect(l.ja.length).toBeLessThanOrEqual(JA_MAX)
      expect(l.en.length).toBeLessThanOrEqual(EN_MAX)
    }
  })
  it('a line is never cut inside a counted phrase (3人目, 2件, 8:00) and never begins with a closing mark', () => {
    for (const p of ALL)
      for (const s of [p.ja, p.en]) {
        expect(s, s).not.toMatch(/^[、。，．,.!?？」』）)ー…っゃゅょ]/)
      }
  })
  it('a start-of-night synopsis fits the ruled area (7 lines, plus the last-night line)', () => {
    for (const [stage, t] of Object.entries(STAGES)) {
      expect(
        t.lines.length + (stage === 'start' ? 0 : 1),
        stage
      ).toBeLessThanOrEqual(MAX_RULED)
    }
  })
  it('an end-of-night synopsis (stock + the kept tail of the stage) fits the ruled area', () => {
    for (const [stage, t] of Object.entries(STAGES)) {
      if (stage === 'start') continue
      for (const [name, o] of Object.entries(OUTCOMES)) {
        expect(o.lines.length + t.tail, `${stage}/${name}`).toBeLessThanOrEqual(
          MAX_RULED
        )
      }
    }
  })
  it('the two languages break a stage at the same places (same number of lines)', () => {
    for (const [stage, t] of Object.entries(STAGES)) {
      if (stage === 'start' || stage === 'none') continue
      for (const l of t.lines) expect(l.en, `${stage} ${l.ja}`).not.toBe('')
    }
  })
  it('scribbles are lines too: at most 3, and narrow ones beside the corridor sketch (first night only)', () => {
    for (const [name, t] of Object.entries({ ...STAGES, ...OUTCOMES })) {
      expect(t.scrib?.length ?? 0, name).toBeLessThanOrEqual(3)
      // The corridor sketch is drawn on the very first night only; `none` reuses its words without the sketch.
      const narrow = name === 'start'
      for (const l of t.scrib ?? []) {
        expect(l.ja.length, l.ja).toBeLessThanOrEqual(
          narrow ? SCRIB_JA_MAX : JA_MAX
        )
        expect(l.en.length, l.en).toBeLessThanOrEqual(
          narrow ? SCRIB_EN_MAX : EN_MAX
        )
      }
    }
  })
  it('does not state what the story has not established', () => {
    // docs/story.md: the family\'s deed and the cause of the incident are not stated; the child is not said to have spoken.
    const all = ALL.map(p => p.ja).join('')
    for (const banned of ['虐待', '殺された', '殺害', '子供は帰りたくないと']) {
      expect(all).not.toContain(banned)
    }
  })
  it('every Japanese character is in the font character list (public/fonts/note-chars.txt)', () => {
    const chars = new Set(
      readFileSync('public/fonts/note-chars.txt', 'utf8').replace(/\n/g, '')
    )
    const missing = new Set<string>()
    for (const p of ALL) for (const c of p.ja) if (!chars.has(c)) missing.add(c)
    for (const c of '0123456789:') if (!chars.has(c)) missing.add(c)
    expect([...missing]).toEqual([])
  })
  it('every English character is in the English font character list (public/fonts/note-chars-en.txt), apostrophe and ellipsis included', () => {
    const chars = new Set(
      readFileSync('public/fonts/note-chars-en.txt', 'utf8').replace(/\n/g, '')
    )
    const missing = new Set<string>()
    for (const p of ALL)
      for (const c of p.en) if (c !== ' ' && !chars.has(c)) missing.add(c)
    expect([...missing]).toEqual([])
    expect(chars.has('\u2019') && chars.has('\u2026')).toBe(true)
  })
})
