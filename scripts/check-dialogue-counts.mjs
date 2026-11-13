// Check that every quota / situation condition has enough conversations (#428): closing dawn x quota, closing withdraw
// (quota met), false report after the quota, the quota-reached moment and the four situations. Below the minimum of a
// condition (DIALOGUE_COUNT_RULES in src/utils/dialogueLedger.ts) exits 1, like `check:spawn-hints`. Also prints, per
// condition, how many distinct conversation openings and endings there are and the most repeated ones, to spot a
// lopsided script (the same opening or ending again and again). Same parser as the build (Node >=22.18).
//
//   npm run check:dialogue-counts
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const { parse: parseYaml } = await import('yaml')
const { DIALOGUE_FILES, DIALOGUE_COUNT_RULES, parseDialogueLedger } =
  await import('../src/utils/dialogueLedger.ts')
const { parseLedgerRecords } = await import('../src/utils/anomalyLedger.ts')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = path => parseYaml(readFileSync(join(root, path), 'utf8'))
const anomalyIds = new Set(
  parseLedgerRecords(read('prompts/anomalies.yaml')).map(e => e.id)
)
const parsed = { flags: read('dialogue/flags.yaml') }
for (const f of DIALOGUE_FILES) parsed[f] = read(`dialogue/${f}.yaml`)
const { entries } = parseDialogueLedger(parsed, anomalyIds)

let failed = false
const head = t => [...t.split('　')[0]].slice(0, 4).join('')
const tail = t => [...t.split('　').at(-1)].slice(-3).join('')
const tally = items =>
  [...items.reduce((m, k) => m.set(k, (m.get(k) ?? 0) + 1), new Map())].sort(
    (a, b) => b[1] - a[1]
  )
for (const r of DIALOGUE_COUNT_RULES) {
  const hit = entries.filter(r.match)
  const ok = hit.length >= r.min
  if (!ok) failed = true
  console.log(
    `${ok ? 'ok  ' : 'FAIL'} ${r.label}: ${hit.length} (min ${r.min})`
  )
  const lines = hit.flatMap(e => e.lines)
  for (const [name, f] of [
    ['opening', head],
    ['ending', tail],
  ]) {
    const t = tally(lines.map(l => f(l.text)))
    const top = t
      .filter(([, n]) => n > 1)
      .slice(0, 3)
      .map(([k, n]) => `${k}x${n}`)
    console.log(
      `       ${name}: ${t.length} kinds of ${lines.length} lines` +
        (top.length ? `; repeated: ${top.join(' ')}` : '')
    )
  }
}
const ids = entries.map(e => e.id)
const dup = ids.filter((id, i) => ids.indexOf(id) !== i)
if (dup.length > 0) {
  failed = true
  console.log(`duplicate ids: ${dup.join(', ')}`)
}
if (failed) process.exit(1)
