// Print how many anomalies the ledger (prompts/anomalies.yaml) holds, by kind / status / category /
// anomaly_type and cross tabs. The ledger is the single source of truth for progress; do not copy
// these numbers into docs. Uses the same parser/validation as the build (src/utils/anomalyLedger.ts,
// loaded through Node's built-in TypeScript type stripping), so a broken entry fails here too.
//
//   npm run ledger:summary [path/to/ledger.yaml]   (default: prompts/anomalies.yaml)
//
// Requires Node >=22.18 (package.json "engines"): the TypeScript parser is imported as-is.
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const [major, minor] = process.versions.node.split('.').map(Number)
if (major < 22 || (major === 22 && minor < 18)) {
  console.error(
    `ledger:summary needs Node >=22.18 (found ${process.versions.node}): it imports src/utils/anomalyLedger.ts directly and relies on Node's built-in TypeScript type stripping, which is only on by default from 22.18.`
  )
  process.exit(1)
}

const { parse: parseYaml } = await import('yaml')
const { parseLedgerRecords } = await import('../src/utils/anomalyLedger.ts')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ledgerPath = process.argv[2]
  ? resolve(process.argv[2])
  : join(root, 'prompts', 'anomalies.yaml')
const records = parseLedgerRecords(parseYaml(readFileSync(ledgerPath, 'utf8')))

const NONE = '(none)'
const counts = keyFn => {
  const map = new Map()
  for (const r of records) {
    const k = keyFn(r)
    map.set(k, (map.get(k) ?? 0) + 1)
  }
  return [...map.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  )
}

const printCounts = (title, keyFn) => {
  console.log(`\n${title}`)
  for (const [k, n] of counts(keyFn)) console.log(`  ${k.padEnd(18)} ${n}`)
}

const printCross = (title, rowFn, colFn) => {
  const rows = [...new Set(records.map(rowFn))].sort()
  const cols = [...new Set(records.map(colFn))].sort()
  const cell = (r, c) =>
    records.filter(x => rowFn(x) === r && colFn(x) === c).length
  const w = Math.max(18, ...cols.map(c => c.length + 2))
  console.log(`\n${title}`)
  console.log('  ' + ''.padEnd(18) + cols.map(c => c.padStart(w)).join(''))
  for (const r of rows) {
    console.log(
      '  ' +
        r.padEnd(18) +
        cols.map(c => String(cell(r, c) || '-').padStart(w)).join('')
    )
  }
}

console.log(`anomalies.yaml: ${records.length} entries`)
printCounts('kind', r => r.kind)
printCounts('status', r => r.status)
printCounts('category', r => r.category ?? NONE)
printCounts('anomaly_type', r => r.anomalyType)
printCross(
  'kind x status',
  r => r.kind,
  r => r.status
)
printCross(
  'category x status',
  r => r.category ?? NONE,
  r => r.status
)
printCross(
  'anomaly_type x status',
  r => r.anomalyType,
  r => r.status
)
printCross(
  'category x kind/status',
  r => r.category ?? NONE,
  r => `${r.kind}/${r.status}`
)
