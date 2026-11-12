// Check the spawn-hint conversations (dialogue/spawn-hints.yaml, #343): every produced image anomaly has at least MIN
// (3), ids are unique (exit 1 otherwise), and print the most repeated lines and predicates (to spot a lopsided
// script). Uses the same parser as the build (Node >=22.18, built-in type stripping).
//
//   npm run check:spawn-hints
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const MIN = 3
const { parse: parseYaml } = await import('yaml')
const { parseDialogueFile, parseFlags } = await import(
  '../src/utils/dialogueLedger.ts'
)
const { parseLedgerRecords } = await import('../src/utils/anomalyLedger.ts')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = path => parseYaml(readFileSync(join(root, path), 'utf8'))
const records = parseLedgerRecords(read('prompts/anomalies.yaml'))
const anomalyIds = new Set(records.map(e => e.id))
const flags = parseFlags(read('dialogue/flags.yaml'), anomalyIds)
const ctx = { flagNames: new Set(flags.map(f => f.name)), anomalyIds }
const entries = parseDialogueFile(
  'spawn-hints',
  read('dialogue/spawn-hints.yaml'),
  ctx
)

const count = new Map()
for (const e of entries)
  count.set(e.when.anomaly, (count.get(e.when.anomaly) ?? 0) + 1)
const targets = records.filter(
  r => r.kind === 'image' && r.status === 'produced'
)
const short = targets.filter(r => (count.get(r.id) ?? 0) < MIN)
console.log(
  `Spawn hints: ${entries.length} conversations; ${targets.length - short.length} of ${targets.length} produced image anomalies have ${MIN}+`
)
for (const r of short.slice(0, 20))
  console.log(`  ${r.id}: ${count.get(r.id) ?? 0}`)
if (short.length > 20) console.log(`  ... and ${short.length - 20} more`)

const ids = entries.map(e => e.id)
const dup = ids.filter((id, i) => ids.indexOf(id) !== i)
if (dup.length > 0) console.log(`  duplicate ids: ${dup.join(', ')}`)

const tally = (items, top) =>
  [...items.reduce((m, k) => m.set(k, (m.get(k) ?? 0) + 1), new Map())]
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
const lines = entries.flatMap(e => e.lines.map(l => `${l.who} ${l.text}`))
console.log('\nMost repeated lines (count, line):')
for (const [t, n] of tally(lines, 10))
  console.log(`  ${String(n).padStart(3)}  ${t}`)
const PRED = [
  '見てみて',
  '見てください',
  '見ます',
  '見てみます',
  '確認します',
  '見ましょう',
  '見てくれる',
]
console.log('\nPredicate counts (lines containing it):')
for (const p of PRED)
  console.log(
    `  ${String(lines.filter(t => t.includes(p)).length).padStart(3)}  ${p}`
  )
if (short.length > 0 || dup.length > 0) process.exitCode = 1
