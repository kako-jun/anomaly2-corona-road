import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import ledger from 'virtual:dialogue'
import anomalies from 'virtual:anomalies'
import {
  STAGE_ORDER,
  LABELS,
  LAST_NIGHT,
  MEMO_FLAG_TEXT,
  MEMO_LINE_KNOWN_FROM,
  OUTCOMES,
  STAGES,
  STAGE_FLAGS,
} from './investigationNotes'
import type { KnownPair, Pair, Stage } from './investigationNotes'

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
/** The one-liners in the anomaly ledger (#325): they are handwritten lines on the same paper. */
const LEDGER_MEMOS: Pair[] = anomalies.flatMap(e => (e.memo ? [e.memo] : []))
const ALL = [
  STAGES,
  OUTCOMES,
  LAST_NIGHT,
  LABELS,
  MEMO_FLAG_TEXT,
  LEDGER_MEMOS,
].flatMap(pairs)

/**
 * One data entry = one handwritten line, never wrapped by the browser (white-space: nowrap). The real width is
 * checked in a browser by `npm run check:note-wrap`; these are the character caps that check was tuned to
 * (Japanese 15px on a 308px line = 20 characters; Caveat 20px is about 40).
 */
const JA_MAX = 20
const EN_MAX = 40
const MAX_RULED = 7

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
      expect(t.tail).toBeLessThanOrEqual(Math.min(2, t.lines.length)) // the kept tail is two lines at most
    }
    for (const o of Object.values(OUTCOMES))
      for (const l of [
        ...o.lines,
        ...(o.firstNight ?? []),
        ...(o.ifFound ?? []),
      ]) {
        expect(l.ja.length, l.ja).toBeLessThanOrEqual(JA_MAX)
        expect(l.en.length, l.en).toBeLessThanOrEqual(EN_MAX)
      }
    for (const l of Object.values(LAST_NIGHT)) {
      expect(l.ja.length).toBeLessThanOrEqual(JA_MAX)
      expect(l.en.length).toBeLessThanOrEqual(EN_MAX)
    }
  })
  it('every memo line (the hypotheses and the ledger one-liners) fits one handwritten line, in both languages', () => {
    for (const [flag, l] of Object.entries(MEMO_FLAG_TEXT)) {
      expect(l.ja.length, `${flag} ja`).toBeLessThanOrEqual(JA_MAX)
      expect(l.en.length, `${flag} en`).toBeLessThanOrEqual(EN_MAX)
      expect(l.en, flag).not.toBe('')
    }
    for (const l of LEDGER_MEMOS) {
      expect(l.ja.length, l.ja).toBeLessThanOrEqual(JA_MAX)
      expect(l.en.length, l.en).toBeLessThanOrEqual(EN_MAX)
    }
  })
  it('a memo line never uses the word 進捗 (kako-jun)', () => {
    for (const p of [...Object.values(MEMO_FLAG_TEXT), ...LEDGER_MEMOS])
      expect(p.ja).not.toContain('進捗')
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
  it('scribbles are lines too: at most 3, each a single line of the same width as the synopsis', () => {
    for (const [name, t] of Object.entries({ ...STAGES, ...OUTCOMES })) {
      expect(t.scrib?.length ?? 0, name).toBeLessThanOrEqual(3)
      for (const l of t.scrib ?? []) {
        expect(l.ja.length, l.ja).toBeLessThanOrEqual(JA_MAX)
        expect(l.en.length, l.en).toBeLessThanOrEqual(EN_MAX)
      }
    }
  })
  it('the first night is short: six lines at most, no scribble', () => {
    expect(STAGES.start.lines.length).toBeLessThanOrEqual(6)
    expect(STAGES.start.scrib).toEqual([])
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

/**
 * No spoilers (#297). `knownFrom` is the writer's own claim of the earliest stage that may show a sentence, grounded
 * in docs/story.md (DESIGN.md lists which sentences are `start` and where story.md says so). It is NOT a mechanical
 * match against story.md, and the word list below is only a net under it: it catches a wrong annotation for the
 * facts it names, nothing more. A new sentence still needs its story.md source checked by a human.
 * Two nets: (1) no stage shows a sentence whose `knownFrom` is later than itself; (2) words for facts that are
 * learned only at a given stage are banned from every sentence annotated earlier.
 */
describe('no spoilers: every sentence is shown only from the stage where it is known', () => {
  const idx = (s: Stage) => STAGE_ORDER.indexOf(s)
  const NOT_STORY = '段階の根拠が story.md に無いので、どの段階にも出さない'
  /** [pattern, first stage that may say it, reason (docs/story.md)] */
  const LEARNED: [RegExp, Stage, string][] = [
    [/シャッター|shutter/i, 'child', `作業仮説。${NOT_STORY}`],
    [/昭和|Showa/i, 'child', `昭和の異変・昭和の記憶。${NOT_STORY}`],
    [
      /帰りたくない|帰らない|戻らない|帰ろうとしない|go home|come back/i,
      'elder1',
      '老人に会って初めて分かる',
    ],
    [/現実|reality|主張|達観/i, 'elder1', '老人が主張する'],
    [/懐かし|nostalg|記憶|memor/i, 'elder1', '老人の様子・記憶'],
    [/食べ物|餓死|starv|food/i, 'elder1', '老人たちの様子から分かること'],
    [
      /おじいさん|おばあさん|老婆|old man|old lady|old woman/i,
      'elder1',
      '老人を見つけて初めて分かる',
    ],
    [/老人|old person|elder/i, 'elder1', '老人を見つけて初めて分かる'],
    [/様子|個性|trait/i, 'elder1', '老人に会って初めて分かる'],
    [/実務的|practical|頑固|stubborn/i, 'elder1', '老人1人目の個性'],
    [/人当たり|Warm|気遣|worries/i, 'elder2', '老人2人目の個性'],
    [/乾いた|冗談|Dry jokes|joke/i, 'elder3', '老人3人目の個性'],
    [
      /優しい|kind|3人とも|All three/i,
      'elder3',
      '3人とも、と言えるのは3人目から',
    ],
    [
      /家族|family|子供の家|(?<!go )home|親|parents|虐待/i,
      'child',
      '子供を見つけて初めて出る疑問',
    ],
  ]
  const entries = (): { where: string; stage: Stage; p: KnownPair }[] => [
    ...Object.entries(STAGES).flatMap(([st, t]) =>
      [...t.lines, ...t.scrib].map(p => ({
        where: `stage ${st}`,
        stage: st as Stage,
        p,
      }))
    ),
    // outcomes and last-night lines are usable from `start` unless annotated later; they are never tied to one stage
    ...Object.entries(OUTCOMES).flatMap(([o, t]) =>
      [
        ...t.lines,
        ...(t.firstNight ?? []),
        ...(t.ifFound ?? []),
        ...(t.scrib ?? []),
      ].map(p => ({
        where: `outcome ${o}`,
        stage: p.knownFrom,
        p,
      }))
    ),
    ...Object.entries(LAST_NIGHT).map(([o, p]) => ({
      where: `last night ${o}`,
      stage: p.knownFrom,
      p,
    })),
    // memo lines (#325): the hypotheses are shown from their own stage, the ledger one-liners from MEMO_LINE_KNOWN_FROM
    ...Object.entries(MEMO_FLAG_TEXT).map(([f, p]) => ({
      where: `memo flag ${f}`,
      stage: p.knownFrom,
      p,
    })),
    ...LEDGER_MEMOS.map(m => ({
      where: 'ledger memo',
      stage: MEMO_LINE_KNOWN_FROM,
      p: { ...m, knownFrom: MEMO_LINE_KNOWN_FROM },
    })),
  ]
  it('every sentence has a knownFrom that is a real stage', () => {
    for (const { where, p } of entries())
      expect(STAGE_ORDER, `${where} ${p.ja}`).toContain(p.knownFrom)
  })
  it('no stage shows a sentence that is known only from a later stage', () => {
    for (const { where, stage, p } of entries())
      expect(idx(p.knownFrom), `${where}: ${p.ja}`).toBeLessThanOrEqual(
        idx(stage)
      )
  })
  it('words for facts learned later are never in a sentence allowed earlier', () => {
    for (const { where, p } of entries())
      for (const [re, from, why] of LEARNED)
        if (re.test(p.ja) || re.test(p.en))
          expect(
            idx(p.knownFrom),
            `${where} "${p.ja}" says a fact known only from ${from} (${why})`
          ).toBeGreaterThanOrEqual(idx(from))
  })
  it('the first two stages show only what story.md gives at the start', () => {
    for (const st of ['start', 'none'] as const)
      for (const l of [...STAGES[st].lines, ...STAGES[st].scrib])
        expect(l.knownFrom, l.ja).toBe('start')
  })
  it('the true-ending lines are only known from the child', () => {
    for (const l of OUTCOMES.ending.lines) expect(l.knownFrom).toBe('child')
  })
})

describe('stock lines that depend on the night', () => {
  it('the first-night result has no "also" and no line that says more than it knows', () => {
    expect(OUTCOMES.newKinds.firstNight?.map(l => l.ja).join('')).not.toContain(
      'も'
    )
    expect(OUTCOMES.newKinds.firstNight?.map(l => l.en).join(' ')).not.toMatch(
      /\bMore\b/
    )
  })
  it('"found counts" is conditional on having found something; nothing story.md lacks is jotted for a no-lead night', () => {
    expect(OUTCOMES.withdraw.lines.map(l => l.ja).join('')).not.toContain(
      '見つけた分'
    )
    expect(OUTCOMES.withdraw.ifFound?.length).toBe(1)
    expect(OUTCOMES.noNewKinds.scrib).toBeUndefined()
  })
  it('last-night lines are known from the start but are never part of the first-night (start) synopsis', () => {
    for (const l of Object.values(LAST_NIGHT)) expect(l.knownFrom).toBe('start')
  })
})
