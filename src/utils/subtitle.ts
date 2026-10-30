import { DialogueLine } from '../data/dialogue'

/** Delay between the previous line fading out and the next one fading in. */
export const SUBTITLE_GAP_MS = 600
const MIN_HOLD_MS = 2200
const BASE_HOLD_MS = 1600
const PER_CHAR_MS = 120

/** How long a subtitle stays on screen, by its length. */
export const subtitleHoldMs = (text: string): number =>
  Math.max(MIN_HOLD_MS, BASE_HOLD_MS + text.length * PER_CHAR_MS)

/** Normal (non-hint) lines, in order. */
export const normalLines = (dialogue: DialogueLine[]): string[] =>
  dialogue.filter(d => !d.hint).map(d => d.text)

/** Hint lines grouped in pairs (one group is queued per false report). */
export const hintGroups = (dialogue: DialogueLine[]): string[][] => {
  const hints = dialogue.filter(d => d.hint).map(d => d.text)
  const groups: string[][] = []
  for (let i = 0; i < hints.length; i += 2) groups.push(hints.slice(i, i + 2))
  return groups
}

export interface SubtitleCursor {
  /** Index of the next normal line. */
  index: number
  /** Queued hint lines; these are shown before normal lines resume. */
  pending: string[]
}

/** One speaker at a time: queued hint lines first, then the normal sequence (looping). */
export const nextSubtitle = (
  normal: string[],
  cursor: SubtitleCursor
): { text: string; cursor: SubtitleCursor } => {
  if (cursor.pending.length > 0) {
    const [text, ...rest] = cursor.pending
    return { text, cursor: { ...cursor, pending: rest } }
  }
  return {
    text: normal[cursor.index % normal.length],
    cursor: { ...cursor, index: cursor.index + 1 },
  }
}

/** Queue the next hint group (cycling) after a false report. */
export const queueHint = (
  groups: string[][],
  cursor: SubtitleCursor,
  hintIndex: number
): { cursor: SubtitleCursor; hintIndex: number } => {
  if (groups.length === 0) return { cursor, hintIndex }
  return {
    cursor: { ...cursor, pending: [...groups[hintIndex % groups.length]] },
    hintIndex: hintIndex + 1,
  }
}
