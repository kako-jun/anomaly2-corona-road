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

/** How many 15px/20px characters fit on one ruled line of the 308px synopsis column (measured in the browser). */
const JA_PER_LINE = 21
const EN_PER_LINE = 40
const MAX_RULED = 7

describe('investigation note data', () => {
  it('stage flags exist in dialogue/flags.yaml', () => {
    for (const f of STAGE_FLAGS)
      expect(ledger.flags.map((d: { name: string }) => d.name)).toContain(f)
  })
  it('every entry has Japanese and English text', () => {
    expect(ALL.length).toBeGreaterThan(40)
    for (const p of ALL) {
      expect(p.en === '' && p.ja !== '' && /^[件種回]$/.test(p.ja)).toBe(
        p.en === ''
      ) // only the Japanese counters may lack an English word
      if (p.en !== '') expect(p.ja).not.toBe('')
    }
  })
  it('a start-of-night synopsis fits the ruled area in both languages', () => {
    for (const [stage, t] of Object.entries(STAGES)) {
      const extra = 1 // the last-night line
      const rows = (lang: 'ja' | 'en', per: number) =>
        t.lines.reduce((n, l) => n + Math.ceil(l[lang].length / per), 0) +
        (stage === 'start'
          ? 0
          : Math.ceil(LAST_NIGHT.withdraw[lang].length / per) * extra)
      expect(rows('ja', JA_PER_LINE), stage).toBeLessThanOrEqual(MAX_RULED)
      expect(rows('en', EN_PER_LINE), stage).toBeLessThanOrEqual(MAX_RULED)
    }
  })
  it('an end-of-night synopsis (stock + last two stage lines) fits the ruled area', () => {
    for (const [stage, t] of Object.entries(STAGES)) {
      if (stage === 'start') continue
      for (const [name, o] of Object.entries(OUTCOMES)) {
        for (const [lang, per] of [
          ['ja', JA_PER_LINE],
          ['en', EN_PER_LINE],
        ] as const) {
          const n = [...o.lines, ...t.lines.slice(-2)].reduce(
            (s, l) => s + Math.ceil(l[lang].length / per),
            0
          )
          expect(n, `${stage}/${name}/${lang}`).toBeLessThanOrEqual(MAX_RULED)
        }
      }
    }
  })
  it('scribbles stay short', () => {
    for (const t of [...Object.values(STAGES), ...Object.values(OUTCOMES)]) {
      const s = t.scrib ?? []
      expect(s.length).toBeLessThanOrEqual(2)
      for (const l of s) {
        expect(l.ja.length).toBeLessThanOrEqual(26)
        expect(l.en.length).toBeLessThanOrEqual(46)
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
})
