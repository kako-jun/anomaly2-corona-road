import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import { DIALOGUE_FILES } from './dialogueLedger'
import { MAX_PHRASE_CHARS } from './subtitle'

/** A phrase longer than MAX_PHRASE_CHARS (src/utils/subtitle.ts) may not fit one subtitle line (#323). */

const texts = DIALOGUE_FILES.flatMap(file => {
  const doc = parse(
    readFileSync(join(process.cwd(), 'dialogue', `${file}.yaml`), 'utf8')
  ) as { dialogues?: { id: string; lines: { text: string }[] }[] }
  return (doc.dialogues ?? []).flatMap(d =>
    d.lines.map((l, i) => ({ where: `${file} ${d.id}#${i + 1}`, text: l.text }))
  )
})

describe('dialogue phrases (#323)', () => {
  it('reads every line of the ledger', () => {
    expect(texts.length).toBeGreaterThan(1000)
  })

  it(`no phrase is longer than ${MAX_PHRASE_CHARS} characters, so every phrase fits one subtitle line`, () => {
    const tooLong = texts.flatMap(({ where, text }) =>
      text
        .split('　')
        .filter(p => [...p].length > MAX_PHRASE_CHARS)
        .map(p => `${where}: ${p}`)
    )
    expect(tooLong).toEqual([])
  })
})
