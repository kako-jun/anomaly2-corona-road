#!/usr/bin/env node
/**
 * Full-width digits and marks in the Japanese wording (Issue #352 numerals, #334 ！？).
 *
 *   node scripts/fullwidth-ja.mjs            # rewrite the sources in place (idempotent: a second run changes nothing)
 *   node scripts/fullwidth-ja.mjs --check    # exit 1 if a run would change anything (npm run check:fullwidth)
 *   node scripts/fullwidth-ja.mjs --report   # print every line a run would change, without writing
 *
 * Rules (kako-jun, 2026-11-12): Japanese subtitles, notes and memos write numbers in full-width digits
 * (０-９) unless that reads unnatural, and use full-width ！？ ("…" is kept; English `en` is never touched).
 *   A  a kanji numeral + a counter (つ 枚 本 人 杯 分 秒 回 段 桁 ...) becomes full-width digits: 二人目 -> ２人目.
 *      The counters are listed in COUNTERS; the exceptions (idioms that read as words) in KEEP below.
 *   B  kept as kanji: もう一度 / もう一回 / 一緒 / 一瞬 / 一部 / 一面 / 四角 / 三角 / 一升瓶 / 三輪車 ... (no counter, or an
 *      idiom). C  kept as kanji too: 「を一度見て」「一歩前へ」「最後の一口」 (a kanji numeral not followed by a counter).
 *   D  half-width digits 0-9 in Japanese wording become ０-９ (the run-time numbers are converted in
 *      src/utils/fullWidth.ts, the one place for them).
 * Idioms stay kanji even where a count would fit: 一度・一歩・一口・一瞬 (回数でも慣用の語は漢数字のまま);
 * a counter such as 一回・一杯・一本・一つ・一枚 becomes full-width.
 * Sources: dialogue/*.yaml `text:`, src/data/investigationNotes.ts (Japanese string literals).
 * titleNotes.json is NOT converted: its lines/alt mirror the text baked into the sticky-note images
 * (「まちがいは3回まで」), which change only when the images are regenerated.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = new Set(process.argv.slice(2))

const KANJI = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 }
/** Counters that make a kanji numeral a count. */
const COUNTERS = [
  'か月',
  'ヶ月',
  'つ',
  '枚',
  '本',
  '輪',
  '羽',
  '足',
  '滴',
  '段',
  '桁',
  '人',
  '杯',
  '分',
  '秒',
  '回',
  '件',
  '個',
  '冊',
  '台',
  '匹',
]
/** After the numeral+counter: an idiom that is a word, not a count (一人で = alone, 一人称, ...). */
const KEEP_AFTER = new Map([
  ['人', /^(?:で(?!す)|ぼっち|称|きり|っ子)/],
  ['輪', /^車/], // 三輪車 is a word (tricycle), not a count of wheels
  ['段', /^落と/], // 一段落とす (turn it down a notch) would read as 段落 (paragraph) after １
])
/** Before the numeral+counter: もう一回 is the idiom "once more" (B), like もう一度. */
const KEEP_BEFORE_COUNTER = new Map([['回', /もう$/]])

const kanjiToNumber = s => {
  // 一〜九, 十, 十一〜九十九 (the wording never goes higher)
  if (s === '十') return 10
  const m = /^([一二三四五六七八九])?十([一二三四五六七八九])?$/.exec(s)
  if (m) return (m[1] ? KANJI[m[1]] : 1) * 10 + (m[2] ? KANJI[m[2]] : 0)
  return s.length === 1 && KANJI[s] ? KANJI[s] : null
}
const full = n =>
  String(n).replace(/[0-9]/g, d =>
    String.fromCharCode(d.charCodeAt(0) + 0xfee0)
  )

const NUMERAL = new RegExp(
  `([一二三四五六七八九十]+)(${COUNTERS.join('|')})`,
  'g'
)

/** One Japanese wording string -> converted (A numerals, D half-width digits, ！？). */
export const convert = s =>
  s
    .replace(NUMERAL, (all, num, counter, offset, whole) => {
      const n = kanjiToNumber(num)
      if (n === null) return all
      if (num === '十' && counter === '分') return all // 十分 (enough)
      const after = KEEP_AFTER.get(counter)
      if (after && after.test(whole.slice(offset + all.length))) return all
      const before = KEEP_BEFORE_COUNTER.get(counter)
      if (before && before.test(whole.slice(0, offset))) return all
      return full(n) + counter
    })
    .replace(/[0-9]/g, d => String.fromCharCode(d.charCodeAt(0) + 0xfee0))
    .replace(/!/g, '！')
    .replace(/\?/g, '？')

const changes = []
const handle = (file, lineNo, before) => {
  const after = convert(before)
  if (after !== before) changes.push({ file, lineNo, before, after })
  return after
}

const rewrite = (file, perLine) => {
  const path = join(ROOT, file)
  const src = readFileSync(path, 'utf8')
  const out = src
    .split('\n')
    .map((line, i) => perLine(line, i + 1, file))
    .join('\n')
  if (out !== src && !args.has('--check') && !args.has('--report'))
    writeFileSync(path, out)
}

// dialogue/*.yaml: text: '...' or text: "..."
for (const f of readdirSync(join(ROOT, 'dialogue')).filter(f =>
  f.endsWith('.yaml')
)) {
  rewrite(`dialogue/${f}`, (line, no, file) => {
    // block style: `text: plain scalar` on its own line
    const plain = /^(\s*(?:-\s+)?text:\s+)([^'"{\s].*)$/.exec(line)
    if (plain) return plain[1] + handle(file, no, plain[2])
    // flow style: `{ who: A, text: '...' ...}` (single or double quoted)
    return line.replace(
      /(\btext:\s*)('(?:[^']|'')*'|"(?:[^"\\]|\\.)*")/,
      (all, key, val) => key + handle(file, no, val)
    )
  })
}

// src/data/investigationNotes.ts: single-quoted literals that contain Japanese
rewrite('src/data/investigationNotes.ts', (line, no, file) =>
  line.replace(/'((?:[^'\\]|\\.)*)'/g, (all, body) =>
    /[぀-ヿ一-鿿]/.test(body) ? `'${handle(file, no, body)}'` : all
  )
)

if (args.has('--report') || args.has('--check')) {
  for (const c of changes)
    console.log(
      `${c.file}:${c.lineNo}\n  - ${c.before.trim()}\n  + ${c.after.trim()}`
    )
}
const byFile = {}
for (const c of changes) byFile[c.file] = (byFile[c.file] ?? 0) + 1
console.log(
  `${args.has('--check') || args.has('--report') ? 'would change' : 'changed'} ${changes.length} lines`,
  byFile
)
if (args.has('--check') && changes.length > 0) {
  console.error('run: node scripts/fullwidth-ja.mjs')
  process.exit(1)
}
