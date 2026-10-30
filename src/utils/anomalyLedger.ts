import { AnomalyCategory } from '../types/game'

/**
 * Pure helpers for the anomaly ledger (`prompts/anomalies.yaml`, the single source of truth).
 * `vite.config.ts` uses them to turn the YAML into the `virtual:anomalies` module, and the game
 * only ever sees the trimmed `LedgerEntry` shape.
 */

/** The only fields the game needs from one ledger entry. */
export interface LedgerEntry {
  id: string
  cameraId: number
  category: AnomalyCategory
  /** Repo-relative path of the transparent overlay, e.g. `assets/anomaly-overlays/cam01/notice.webp`. */
  overlay: string
  /** Top-left of the overlay on the base photo, in base-photo pixels. */
  origin: { x: number; y: number }
  /** Overlay size in pixels. */
  size: { w: number; h: number }
}

const CATEGORY_BY_LEDGER_VALUE: Record<string, AnomalyCategory> = {
  camera: 'Camera',
  object: 'Object',
  environment: 'Environment',
  person: 'Person',
  surreal: 'Surreal',
}

const field = (raw: Record<string, unknown>, key: string): string => {
  const value = raw[key]
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`"${key}" is missing or not a string`)
  }
  return value.trim()
}

/** '(137,379)' -> { x: 137, y: 379 }. */
export const parseOrigin = (text: string): { x: number; y: number } => {
  const m = /^\(\s*(\d+)\s*,\s*(\d+)\s*\)$/.exec(text)
  if (!m) throw new Error(`overlay_origin "${text}" is not "(x,y)"`)
  return { x: Number(m[1]), y: Number(m[2]) }
}

/** '46x97' -> { w: 46, h: 97 }. Both must be positive. */
export const parseDimensions = (text: string): { w: number; h: number } => {
  const m = /^(\d+)\s*x\s*(\d+)$/.exec(text)
  if (!m) throw new Error(`dimensions "${text}" is not "WxH"`)
  const w = Number(m[1])
  const h = Number(m[2])
  if (w <= 0 || h <= 0) throw new Error(`dimensions "${text}" must be positive`)
  return { w, h }
}

/** 'CAM03' -> 3. */
export const parseCameraId = (text: string): number => {
  const m = /^CAM(\d+)$/.exec(text)
  if (!m || Number(m[1]) <= 0)
    throw new Error(`camera_id "${text}" is not "CAMnn"`)
  return Number(m[1])
}

export const parseCategory = (text: string): AnomalyCategory => {
  const category = CATEGORY_BY_LEDGER_VALUE[text.toLowerCase()]
  if (!category) throw new Error(`category "${text}" is unknown`)
  return category
}

/** Parse and validate one raw YAML entry. Throws an Error naming the entry on any problem. */
export const parseLedgerEntry = (raw: unknown, index: number): LedgerEntry => {
  const rec = (raw ?? {}) as Record<string, unknown>
  const label =
    typeof rec.id === 'string' ? `"${rec.id}"` : `at index ${index} (no id)`
  try {
    if (typeof raw !== 'object' || raw === null)
      throw new Error('not a mapping')
    return {
      id: field(rec, 'id'),
      cameraId: parseCameraId(field(rec, 'camera_id')),
      category: parseCategory(field(rec, 'category')),
      overlay: field(rec, 'overlay'),
      origin: parseOrigin(field(rec, 'overlay_origin')),
      size: parseDimensions(field(rec, 'dimensions')),
    }
  } catch (e) {
    throw new Error(`anomalies.yaml entry ${label}: ${(e as Error).message}`)
  }
}

/** Parse the whole `anomalies:` list; ids must be unique. */
export const parseLedger = (parsedYaml: unknown): LedgerEntry[] => {
  const list = (parsedYaml as { anomalies?: unknown } | null)?.anomalies
  if (!Array.isArray(list)) {
    throw new Error('anomalies.yaml: top-level "anomalies" list is missing')
  }
  const entries = list.map(parseLedgerEntry)
  const seen = new Set<string>()
  for (const e of entries) {
    if (seen.has(e.id))
      throw new Error(`anomalies.yaml: duplicate id "${e.id}"`)
    seen.add(e.id)
  }
  return entries
}
