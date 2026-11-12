// Report how many spawn-hint conversations (dialogue/spawn-hints.yaml, #343) each produced image anomaly has, and
// which ones have fewer than MIN (3). Progress display: the exit code is 0 whenever the ledger parses (a short
// anomaly must not fail the build). Uses the same parser as the build (Node >=22.18, built-in type stripping).
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
for (const r of short) console.log(`  ${r.id}: ${count.get(r.id) ?? 0}`)
