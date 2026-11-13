import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'

const root = process.cwd()
const files = [
  'opening',
  'closing',
  'midpoint',
  'chatter',
  'story',
  'false-report',
  'quota-reached',
  'situation',
  'anomaly-lines',
]

const entries = []
for (const file of files) {
  const path = join(root, 'dialogue', `${file}.yaml`)
  const parsed = parse(readFileSync(path, 'utf8'))
  for (const entry of parsed?.dialogues ?? []) {
    entries.push({ file, ...entry })
  }
}

const byFile = Object.fromEntries(files.map(file => [file, 0]))
const byCondition = {}
const ids = new Set()
const duplicateIds = []
let sampleEntries = 0

for (const entry of entries) {
  byFile[entry.file]++
  if (entry.id?.includes('-sample-')) sampleEntries++
  if (ids.has(entry.id)) duplicateIds.push(entry.id)
  ids.add(entry.id)

  const selector = entry.when
    ? Object.entries(entry.when)
        .map(([key, value]) => `${key}:${Array.isArray(value) ? value.join(',') : value}`)
        .join('&')
    : 'always'
  const key = `${entry.file}:${selector}`
  byCondition[key] = (byCondition[key] ?? 0) + 1
}

console.log(
  JSON.stringify(
    {
      totalEntries: entries.length,
      sampleEntries,
      byFile,
      byCondition,
      duplicateIds,
    },
    null,
    2
  )
)

if (duplicateIds.length > 0) process.exitCode = 1
