import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import { DIALOGUE_FILES } from './dialogueLedger'

/**
 * A subtitle line breaks only between phrases (the text between two full-width spaces, #323), so a phrase longer than
 * one line cannot be shown whole. A line holds about 16-18 characters at every picture size (the subtitle is 4.9cqw of
 * the picture), so a phrase of up to 17 always fits. `npm run check:subtitle` measures the real wrapping in a browser.
 */
const MAX_PHRASE = 17

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

  it(`no phrase is longer than ${MAX_PHRASE} characters, so every phrase fits one subtitle line`, () => {
    const tooLong = texts.flatMap(({ where, text }) =>
      text
        .split('　')
        .filter(p => [...p].length > MAX_PHRASE)
        .map(p => `${where}: ${p}`)
    )
    expect(tooLong).toEqual([])
  })
})
