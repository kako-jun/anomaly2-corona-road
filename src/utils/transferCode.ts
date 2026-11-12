/**
 * Transfer code (#84, docs/save-data.md rule 9): the whole save as JSON, UTF-8, Base64. Used to move progress to
 * another device or to recover after the browser dropped the site data.
 */
import {
  SAVE_LIMITS,
  SAVE_VERSION,
  canPersist,
  load,
  nextEpoch,
  update,
  validateSave,
  type SaveData,
} from './saveData'

export type TransferError =
  | 'empty'
  | 'notCode'
  | 'invalid'
  | 'newer'
  | 'tooLarge'
  | 'notSaved'

/**
 * Longest pasted text we will even look at. A save with every limit in SAVE_LIMITS filled is well past this; a
 * real one is a few tens of KB (about 40 KB as a code). 400,000 characters (about 300 KB of JSON) keeps a wide
 * margin and still decodes instantly, so a huge paste is refused before it can freeze the page.
 */
export const MAX_CODE_CHARS = 400_000

export type ParseResult =
  | { ok: true; save: SaveData }
  | { ok: false; error: TransferError }

/** Message shown to the player for each way a pasted code can be refused. */
export const TRANSFER_ERROR_TEXT: Record<TransferError, string> = {
  empty: 'Nothing was pasted. Paste a transfer code first.',
  notCode:
    'This is not a transfer code of this game. Copy the whole code and try again.',
  tooLarge:
    'This text is far too long to be a transfer code. Nothing was changed.',
  notSaved:
    'This device cannot store the imported progress (storage is full or blocked). Nothing was changed.',
  invalid:
    'This code is damaged, incomplete, or from another game. Nothing was changed.',
  newer: 'This code is from a newer version of the game. Nothing was changed.',
}

const toBase64 = (text: string): string => {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

const fromBase64 = (b64: string): string => {
  const bin = atob(b64)
  const bytes = Uint8Array.from(bin, c => c.charCodeAt(0))
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
}

/** The save as a transfer code. */
export const encodeSave = (save: SaveData): string =>
  toBase64(JSON.stringify(save))

/** Read a pasted code. Whitespace (line breaks from copying) is ignored. Never throws. */
export const parseCode = (input: string): ParseResult => {
  // Checked before touching the text: replace() and atob() on a huge paste would be the slow part.
  if (input.length > MAX_CODE_CHARS * 1.1)
    return { ok: false, error: 'tooLarge' }
  const code = input.replace(/\s+/g, '')
  if (code.length > MAX_CODE_CHARS) return { ok: false, error: 'tooLarge' }
  if (code === '') return { ok: false, error: 'empty' }
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(code))
    return { ok: false, error: 'notCode' }
  let parsed: unknown
  try {
    parsed = JSON.parse(fromBase64(code))
  } catch {
    return { ok: false, error: 'notCode' }
  }
  if (
    typeof parsed === 'object' &&
    parsed !== null &&
    typeof (parsed as { v?: unknown }).v === 'number' &&
    (parsed as { v: number }).v > SAVE_VERSION
  )
    return { ok: false, error: 'newer' }
  const save = validateSave(parsed)
  // One below the limit, so that importing (max + 1) never lands on a value the next read would refuse.
  if (save && save.epoch >= SAVE_LIMITS.epoch)
    return { ok: false, error: 'invalid' }
  return save ? { ok: true, save } : { ok: false, error: 'invalid' }
}

/**
 * What the device holds after importing: the code's progress whole, one generation above both sides
 * (`max(local, imported) + 1`), so an older tab still holding the previous progress cannot bring it back
 * through the epoch merge. The display settings stay as this device has them (they are not progress).
 */
export const importedSave = (local: SaveData, imported: SaveData): SaveData => {
  const settings = local.settings ?? imported.settings
  const { settings: _drop, ...rest } = imported
  void _drop
  return {
    ...rest,
    epoch: nextEpoch(Math.max(local.epoch, imported.epoch)),
    ...(settings ? { settings } : {}),
  }
}

/**
 * Replace this device's progress with the imported save (after the player's confirmation). Returns false, with
 * the previous progress put back, when the browser could not store it: reporting success while only memory
 * holds the import would lose it on the next reload.
 */
export const applyImport = (imported: SaveData): boolean => {
  const before = load()
  update(cur => importedSave(cur, imported))
  if (canPersist()) return true
  update(() => before)
  return false
}

/** One line telling what a code holds, shown before it replaces anything. */
export const summarize = (s: SaveData): string =>
  `${s.foundIds.length} anomalies found, ${s.loops} shifts${s.endingReached ? ', investigation closed' : ''}`
