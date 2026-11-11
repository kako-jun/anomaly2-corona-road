/**
 * The title screen's sticky notes (#296): one picture per note and language (handwritten, generated artwork,
 * words checked letter by letter against this table). `titleNotes.json` is the only table (file, size, words, alt
 * text); the app depends on nothing else but the files under `public/title-notes/`, so a picture can be swapped
 * by replacing the file (keep the name, update the size). The tilt (+2 / -3 / +1 degrees) and the tape are part of
 * the pictures: no CSS rotation is added. The notes are about operating the game, seen from outside the game: no
 * detective, no story.
 */
import table from './titleNotes.json'
import type { Language } from '../utils/saveData'

export interface TitleNote {
  id: string
  /** URL under public/. */
  src: string
  /** Pixel size of the file; it is drawn at half that in CSS px (2x). */
  width: number
  height: number
  /** Exactly what the picture says, in the chosen language. */
  alt: string
}

/** Where the images live. */
export const TITLE_NOTES_DIR = '/title-notes'

/** Budget (bytes). One note picture and all of them (both languages) have a ceiling, so a later swap of the picture source cannot quietly bloat the page. */
export const MAX_NOTE_BYTES = 32 * 1024
/** One language's three pictures (what a player loads), and all six (what is deployed). */
export const MAX_NOTES_LANGUAGE_BYTES = 90 * 1024
export const MAX_NOTES_TOTAL_BYTES = 170 * 1024

export const TITLE_NOTE_COUNT = table.notes.length

export const titleNotes = (language: Language): TitleNote[] =>
  table.notes.map(n => ({
    id: n.id,
    src: `${TITLE_NOTES_DIR}/${n[language].file}`,
    width: n[language].width,
    height: n[language].height,
    alt: n[language].alt,
  }))

/** The raw table for the vitest checks. */
export const TITLE_NOTE_TABLE = table

/** The label of the bundle for assistive technology, and the hidden hint of the page-turning button. */
export const NOTES_LABEL: Record<Language, string> = {
  ja: '遊び方',
  en: 'How to play',
}
export const NEXT_HINT: Record<Language, string> = {
  ja: '次の付箋へ',
  en: 'Next note',
}
