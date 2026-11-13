import { readFileSync, readdirSync, statSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { DEFAULT_CONFIG } from '../utils/gameConfig'
import { toFullWidthDigits } from '../utils/fullWidth'
import {
  MAX_NOTES_LANGUAGE_BYTES,
  MAX_NOTES_TOTAL_BYTES,
  MAX_NOTE_BYTES,
  TITLE_NOTES_DIR,
  TITLE_NOTE_COUNT,
  TITLE_NOTE_TABLE,
  titleNotes,
} from './titleNotes'

const LANGS = ['ja', 'en'] as const
const plain = (s: string) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, '')

/** Width and height of a webp file (VP8, VP8L or VP8X). */
const webpSize = (file: string): [number, number] => {
  const b = readFileSync(file)
  expect(b.toString('ascii', 0, 4)).toBe('RIFF')
  const kind = b.toString('ascii', 12, 16)
  if (kind === 'VP8X') return [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1]
  if (kind === 'VP8L') {
    const v = b.readUInt32LE(21)
    return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]
  }
  return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]
}

describe('title notes table (#296)', () => {
  it('has three notes in each language', () => {
    expect(TITLE_NOTE_COUNT).toBe(3)
    for (const l of LANGS) expect(titleNotes(l)).toHaveLength(3)
  })
  it('every picture exists, has the size the table says, and stays in the budget', () => {
    let total = 0
    for (const l of LANGS) {
      let perLanguage = 0
      for (const n of titleNotes(l)) {
        const file = `public${n.src}`
        expect(n.src.startsWith(`${TITLE_NOTES_DIR}/`)).toBe(true)
        const [w, h] = webpSize(file)
        expect([w, h]).toEqual([n.width, n.height])
        const bytes = statSync(file).size
        expect(bytes).toBeLessThanOrEqual(MAX_NOTE_BYTES)
        perLanguage += bytes
      }
      expect(perLanguage).toBeLessThanOrEqual(MAX_NOTES_LANGUAGE_BYTES)
      total += perLanguage
    }
    expect(total).toBeLessThanOrEqual(MAX_NOTES_TOTAL_BYTES)
  })
  it('has no picture in public/title-notes that the table does not name', () => {
    const named = LANGS.flatMap(l => titleNotes(l)).map(n =>
      n.src.slice(TITLE_NOTES_DIR.length + 1)
    )
    expect(readdirSync('public/title-notes').sort()).toEqual(named.sort())
  })
  it("the alt text carries every line of the picture (the table's words)", () => {
    for (const note of TITLE_NOTE_TABLE.notes)
      for (const l of LANGS) {
        const t = note[l]
        for (const line of t.lines) expect(plain(t.alt)).toContain(plain(line))
        expect(t.alt.length).toBeGreaterThan(20)
      }
  })
  it('says the misreport limit the game really has', () => {
    const last = TITLE_NOTE_TABLE.notes[2]
    expect(last.ja.alt).toContain(
      `${toFullWidthDigits(DEFAULT_CONFIG.maxMisreports)}回まで`
    )
    expect(last.en.alt).toContain(`up to ${DEFAULT_CONFIG.maxMisreports} times`)
  })
  it('explains touch and mouse only: no keyboard, no story, no detective', () => {
    for (const l of LANGS)
      for (const n of titleNotes(l))
        expect(n.alt).not.toMatch(
          /キー(?!ワ)|矢印|keyboard|arrow|刑事|detective|事件/i
        )
  })
  it('names the controls it has to explain', () => {
    const all = (l: (typeof LANGS)[number]) =>
      titleNotes(l)
        .map(n => n.alt)
        .join(' ')
    for (const w of ['左右の枠', 'ドラッグ', 'REPORT', '３回まで'])
      expect(all('ja')).toContain(w)
    for (const w of ['frame', 'Drag', 'REPORT', 'up to 3 times'])
      expect(all('en')).toContain(w)
  })
})
