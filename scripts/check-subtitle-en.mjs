// Print how many subtitle lines still lack an English `en` (Issue #326), per dialogue file and in total, for
// whoever translates. The dialogue ledger is the only record of progress: do not copy these numbers into docs.
// Uses the same parser/validation as the build (src/utils/dialogueLedger.ts, via Node's built-in TypeScript type
// stripping), so a broken `en` fails here too. The exit code is 0 whenever the ledger parses (progress display).
//
//   npm run check:subtitle-en
//
// Requires Node >=22.18 (package.json "engines").
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const [major, minor] = process.versions.node.split('.').map(Number)
if (major < 22 || (major === 22 && minor < 18)) {
  console.error(
    `check:subtitle-en needs Node >=22.18 (found ${process.versions.node}): it imports src/utils/*.ts directly and relies on Node's built-in TypeScript type stripping.`
  )
  process.exit(1)
}

const { parse: parseYaml } = await import('yaml')
const { DIALOGUE_FILES, parseDialogueFile, parseFlags, countEnglish } =
  await import('../src/utils/dialogueLedger.ts')
const { EN_GUIDE_CHARS, longEnglishLines } = await import(
  '../src/utils/subtitle.ts'
)
const { parseLedgerRecords } = await import('../src/utils/anomalyLedger.ts')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = path => parseYaml(readFileSync(join(root, path), 'utf8'))

const anomalyIds = new Set(
  parseLedgerRecords(read('prompts/anomalies.yaml')).map(e => e.id)
)
const flags = parseFlags(read('dialogue/flags.yaml'), anomalyIds)
const ctx = { flagNames: new Set(flags.map(f => f.name)), anomalyIds }

const longOnes = []
let all = { total: 0, translated: 0, untranslated: 0 }
console.log('Subtitle lines without an English `en` (Issue #326)\n')
console.log(
  `${'file'.padEnd(20)}${'lines'.padStart(7)}${'en'.padStart(7)}${'todo'.padStart(7)}`
)
for (const file of DIALOGUE_FILES) {
  const entries = parseDialogueFile(file, read(`dialogue/${file}.yaml`), ctx)
  longOnes.push(...longEnglishLines(entries))
  const c = countEnglish(entries)
  console.log(
    `${file.padEnd(20)}${String(c.total).padStart(7)}${String(c.translated).padStart(7)}${String(c.untranslated).padStart(7)}`
  )
  all = {
    total: all.total + c.total,
    translated: all.translated + c.translated,
    untranslated: all.untranslated + c.untranslated,
  }
}
console.log(
  `${'TOTAL'.padEnd(20)}${String(all.total).padStart(7)}${String(all.translated).padStart(7)}${String(all.untranslated).padStart(7)}`
)

console.log(
  `\nLong English lines (over ${EN_GUIDE_CHARS} characters, EN_GUIDE_CHARS in src/utils/subtitle.ts): ${longOnes.length}`
)
for (const l of longOnes)
  console.log(`  ${l.id}#${l.line}  ${l.chars} characters`)
