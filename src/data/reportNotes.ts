/**
 * The sticky notes under the category keys of the report dialog (#346, the category definitions of #236): one picture
 * per category and language (paper, tape and handwriting like the title notes, #296). `reportNotes.json` is the only
 * table: the words (heading + bullet lines), the file and its size. `scripts/report-notes.py` draws the pictures
 * FROM this table, so a picture cannot disagree with it. The words are the category definitions of
 * `prompts/README.md` (the ledger) in short; change both together.
 *
 * The pictures are not preloaded: they are loaded when the dialog opens (`loading="lazy"` is not needed, the dialog
 * mounts them), so they sit outside the 800KB UI preload budget and have their own ceilings below.
 */
import table from './reportNotes.json'
import type { Language } from '../utils/language'
import type { AnomalyCategory } from '../types/game'

export const REPORT_NOTES_DIR = '/report-notes'

/** Byte ceilings: one picture, the five of one language (what a player may load), and all ten (what is deployed). */
export const MAX_REPORT_NOTE_BYTES = 40 * 1024
export const MAX_REPORT_NOTES_LANGUAGE_BYTES = 150 * 1024
export const MAX_REPORT_NOTES_TOTAL_BYTES = 300 * 1024

export interface ReportNote {
  src: string
  /** Pixel size of the file; the note is drawn as wide as its key. */
  width: number
  height: number
  /** The words, read aloud (sr-only, `aria-describedby` of the key); the picture itself has `alt=""`. */
  text: string
}

const sentence = (lines: string[], language: Language): string =>
  language === 'ja' ? lines.map(l => `${l}。`).join('') : `${lines.join('. ')}.`

export const reportNote = (
  category: AnomalyCategory,
  language: Language
): ReportNote => {
  const note = table.notes.find(n => n.id === category)
  if (!note) throw new Error(`no report note for ${category}`)
  const d = note[language]
  return {
    src: `${REPORT_NOTES_DIR}/${d.file}`,
    width: d.width,
    height: d.height,
    text: sentence(d.lines, language),
  }
}

/** The raw table for the vitest checks. */
export const REPORT_NOTE_TABLE = table
