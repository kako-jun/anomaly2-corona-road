/**
 * Transfer code (#84, docs/save-data.md rule 9): the whole save as JSON, UTF-8, Base64. Used to move progress to
 * another device or to recover after the browser dropped the site data.
 */
import { SAVE_VERSION, update, validateSave, type SaveData } from './saveData'

export type TransferError = 'empty' | 'notCode' | 'invalid' | 'newer'

export type ParseResult =
  | { ok: true; save: SaveData }
  | { ok: false; error: TransferError }

/** Message shown to the player for each way a pasted code can be refused. */
export const TRANSFER_ERROR_TEXT: Record<TransferError, string> = {
  empty: 'Nothing was pasted. Paste a transfer code first.',
  notCode: 'This is not a transfer code. Copy the whole code and try again.',
  invalid: 'This code is damaged or incomplete. Nothing was changed.',
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
  const code = input.replace(/\s+/g, '')
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
    epoch: Math.max(local.epoch, imported.epoch) + 1,
    ...(settings ? { settings } : {}),
  }
}

/** Replace this device's progress with the imported save (after the player's confirmation). */
export const applyImport = (imported: SaveData): void => {
  update(cur => importedSave(cur, imported))
}

/** One line telling what a code holds, shown before it replaces anything. */
export const summarize = (s: SaveData): string =>
  `${s.foundIds.length} anomalies found, ${s.loops} shifts${s.endingReached ? ', investigation closed' : ''}`
