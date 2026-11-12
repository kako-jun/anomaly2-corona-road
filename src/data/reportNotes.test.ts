import { readFileSync, readdirSync, statSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  MAX_REPORT_NOTES_LANGUAGE_BYTES,
  MAX_REPORT_NOTES_TOTAL_BYTES,
  MAX_REPORT_NOTE_BYTES,
  REPORT_NOTES_DIR,
  REPORT_NOTE_TABLE,
  reportNote,
} from './reportNotes'
import type { AnomalyCategory } from '../types/game'

const LANGS = ['ja', 'en'] as const
const CATEGORIES: AnomalyCategory[] = [
  'Camera',
  'Object',
  'Environment',
  'Person',
  'Surreal',
]

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

describe('report notes table (#346)', () => {
  it('has one note per category, in the order of the keys', () => {
    expect(REPORT_NOTE_TABLE.notes.map(n => n.id)).toEqual(CATEGORIES)
  })

  it('every picture exists, has the size the table says, and stays in the budget', () => {
    let total = 0
    for (const l of LANGS) {
      let perLanguage = 0
      for (const c of CATEGORIES) {
        const n = reportNote(c, l)
        expect(n.src.startsWith(`${REPORT_NOTES_DIR}/${l}-`)).toBe(true)
        const file = `public${n.src}`
        expect(webpSize(file)).toEqual([n.width, n.height])
        const bytes = statSync(file).size
        expect(bytes).toBeLessThanOrEqual(MAX_REPORT_NOTE_BYTES)
        perLanguage += bytes
      }
      expect(perLanguage).toBeLessThanOrEqual(MAX_REPORT_NOTES_LANGUAGE_BYTES)
      total += perLanguage
    }
    expect(total).toBeLessThanOrEqual(MAX_REPORT_NOTES_TOTAL_BYTES)
  })

  it('has no picture in public/report-notes that the table does not name', () => {
    const named = LANGS.flatMap(l =>
      CATEGORIES.map(c =>
        reportNote(c, l).src.slice(REPORT_NOTES_DIR.length + 1)
      )
    )
    expect(readdirSync('public/report-notes').sort()).toEqual(named.sort())
  })

  it('has bullet lines for every note, no bullet glyph in the words (the dots are in the picture)', () => {
    for (const n of REPORT_NOTE_TABLE.notes)
      for (const l of LANGS) {
        expect(n[l].lines.length).toBeGreaterThanOrEqual(2)
        expect(n[l].lines.length).toBeLessThanOrEqual(4)
        for (const line of n[l].lines) {
          expect(line).not.toMatch(/^[・•\-*]/)
          expect(line).not.toMatch(/[。.]$/)
        }
      }
  })

  it('Japanese words use full-width ！？ and digits (#352), the English ones half-width', () => {
    for (const n of REPORT_NOTE_TABLE.notes) {
      for (const line of [...n.ja.lines, n.ja.heading])
        expect(line).not.toMatch(/[!?0-9]/)
      for (const line of [...n.en.lines, n.en.heading])
        expect(line).not.toMatch(/[！？０-９]/)
    }
  })

  it('keeps the words that the category definitions of prompts/README.md hinge on (both languages)', () => {
    const words = (id: string, l: (typeof LANGS)[number]) => {
      const n = REPORT_NOTE_TABLE.notes.find(x => x.id === id)
      return n ? n[l].lines.join('\n') : ''
    }
    // person: animals are not people; object / environment: floor, wall, ceiling; camera: a surface across the view
    expect(words('Person', 'ja')).toContain('動物は含まない')
    expect(words('Person', 'en')).toContain('Not animals')
    expect(words('Object', 'ja')).toContain('床や壁、天井')
    expect(words('Environment', 'ja')).toContain('床、壁、天井')
    expect(words('Object', 'en')).toMatch(/floor, wall, ceiling/i)
    expect(words('Environment', 'en')).toMatch(/floor, wall, ceiling/i)
    expect(words('Camera', 'ja')).toContain('横切る')
    expect(words('Camera', 'en')).toContain('across the view')
  })

  it('the notes are not preloaded: index.html names none of them (they load when the dialog opens)', () => {
    expect(readFileSync('index.html', 'utf8')).not.toContain('report-notes')
  })
})
