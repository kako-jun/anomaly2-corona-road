import type { AnomalyCategory } from '../types/game'

// NOTE: scripts/ledger-summary.mjs imports this file via Node's type stripping. Use only erasable
// TypeScript here (no enum, namespace or constructor parameter properties) or only Node breaks.

/**
 * Pure helpers for the anomaly ledger (`prompts/anomalies.yaml`, the single source of truth).
 * `vite.config.ts` uses them to turn the YAML into the `virtual:anomalies` module, and the game
 * only ever sees the trimmed `LedgerEntry` shape.
 */

/** `anomaly_type` values of image (overlay) anomalies (source of truth: `prompts/README.md` "異変タイプ enum"). */
export const IMAGE_ANOMALY_TYPES = [
  'add_object',
  'remove_object',
  'add_person',
  'add_creature',
  'state_change',
  'duplicate',
  'multiply',
  'displace',
  'color_shift',
  'text_change',
  'surreal',
  'reflection',
] as const
export type ImageAnomalyType = (typeof IMAGE_ANOMALY_TYPES)[number]

/** `anomaly_type` values of runtime anomalies (no overlay: feed glitch, sound, UI, rules). */
export const RUNTIME_ANOMALY_TYPES = [
  'feed_glitch',
  'sound',
  'ui_corruption',
  'rule_break',
] as const
export type RuntimeAnomalyType = (typeof RUNTIME_ANOMALY_TYPES)[number]

/** Every `anomaly_type` the ledger accepts (the `prompts/README.md` enum table lists exactly these). */
export const ANOMALY_TYPES = [
  ...IMAGE_ANOMALY_TYPES,
  ...RUNTIME_ANOMALY_TYPES,
] as const
export type AnomalyType = (typeof ANOMALY_TYPES)[number]

export const LEDGER_STATUSES = ['produced', 'planned'] as const
export type LedgerStatus = (typeof LEDGER_STATUSES)[number]
export const LEDGER_KINDS = ['image', 'runtime'] as const
export type LedgerKind = (typeof LEDGER_KINDS)[number]

/** The only fields the game needs from one ledger entry (kind=image, status=produced). */
export interface LedgerEntry {
  id: string
  cameraId: number
  category: AnomalyCategory
  /** Optional second correct report for a genuinely split anomaly (always differs from `category`). */
  alsoCategory?: AnomalyCategory
  anomalyType: ImageAnomalyType
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

/** Optional `also_category`: absent / null / blank -> undefined; otherwise a valid category different from `category`. */
export const parseAlsoCategory = (
  value: unknown,
  category: AnomalyCategory
): AnomalyCategory | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string') {
    throw new Error('"also_category" is not a string')
  }
  // Same preprocessing as the other fields (trim); a blank cell counts as "no column".
  const text = value.trim()
  if (text === '') return undefined
  let also: AnomalyCategory
  try {
    also = parseCategory(text)
  } catch {
    throw new Error(`also_category "${text}" is unknown`)
  }
  if (also === 'Camera') {
    throw new Error(
      `also_category "${text}" is not allowed (camera is a runtime anomaly, not an image entry)`
    )
  }
  if (also === category) {
    throw new Error(`also_category "${text}" is the same as category`)
  }
  return also
}

export const parseAnomalyType = (text: string): AnomalyType => {
  const type = ANOMALY_TYPES.find(t => t === text)
  if (!type) throw new Error(`anomaly_type "${text}" is unknown`)
  return type
}

/** 'assets/anomaly-overlays/cam01/notice.webp' shape: the game resolves the URL by this exact path. */
export const OVERLAY_PATH = /^assets\/anomaly-overlays\/cam\d+\/.+\.webp$/

export const parseOverlayPath = (text: string): string => {
  if (!OVERLAY_PATH.test(text)) {
    throw new Error(
      `overlay "${text}" is not "assets/anomaly-overlays/camNN/<name>.webp"`
    )
  }
  return text
}

/** One validated ledger entry of any kind/status (the whole-ledger view, e.g. for the summary script). */
export interface LedgerRecord {
  id: string
  status: LedgerStatus
  kind: LedgerKind
  anomalyType: AnomalyType
  /** Absent only for runtime entries (the camera is drawn at random when the anomaly appears). */
  cameraId?: number
  /** Absent only for runtime `ui_corruption` / `rule_break` (no report window yet, #80); every image entry has one. */
  category?: AnomalyCategory
  alsoCategory?: AnomalyCategory
  /** Pointer to the production spec (e.g. a `### id` section of candidate-pool.md). */
  spec?: string
  detail?: string
  /** Present for image+produced; optional for image+planned; never for runtime. */
  overlay?: string
  origin?: { x: number; y: number }
  size?: { w: number; h: number }
}

const has = (rec: Record<string, unknown>, key: string): boolean =>
  rec[key] !== undefined && rec[key] !== null

const oneOf = <T extends string>(
  list: readonly T[],
  rec: Record<string, unknown>,
  key: string,
  fallback: T
): T => {
  if (rec[key] === undefined || rec[key] === null) return fallback
  const text = field(rec, key)
  const found = list.find(v => v === text)
  if (!found) throw new Error(`${key} "${text}" is unknown`)
  return found
}

const IMAGE_TYPE_SET: readonly string[] = IMAGE_ANOMALY_TYPES
const RUNTIME_TYPE_SET: readonly string[] = RUNTIME_ANOMALY_TYPES

/** Parse and validate one raw YAML entry of any kind/status. Throws an Error naming the entry on any problem. */
export const parseLedgerRecord = (
  raw: unknown,
  index: number
): LedgerRecord => {
  const rec = (raw ?? {}) as Record<string, unknown>
  const label =
    typeof rec.id === 'string' ? `"${rec.id}"` : `at index ${index} (no id)`
  try {
    if (typeof raw !== 'object' || raw === null)
      throw new Error('not a mapping')
    const id = field(rec, 'id')
    const status = oneOf(LEDGER_STATUSES, rec, 'status', 'produced')
    const kind = oneOf(LEDGER_KINDS, rec, 'kind', 'image')
    const anomalyType = parseAnomalyType(field(rec, 'anomaly_type'))
    if (kind === 'image' && !IMAGE_TYPE_SET.includes(anomalyType)) {
      throw new Error(
        `anomaly_type "${anomalyType}" is a runtime type but kind is image`
      )
    }
    if (kind === 'runtime' && !RUNTIME_TYPE_SET.includes(anomalyType)) {
      throw new Error(
        `anomaly_type "${anomalyType}" is an image type but kind is runtime`
      )
    }

    // camera_id: required for image; optional for runtime (drawn at random on appearance).
    const cameraId =
      kind === 'image' || has(rec, 'camera_id')
        ? parseCameraId(field(rec, 'camera_id'))
        : undefined

    // category: required for image. Runtime: feed_glitch must be camera, sound needs one,
    // ui_corruption / rule_break may leave it empty (no report window yet, #80).
    let category: AnomalyCategory | undefined
    if (kind === 'image' || has(rec, 'category')) {
      category = parseCategory(field(rec, 'category'))
    }
    if (anomalyType === 'feed_glitch' && category !== 'Camera') {
      throw new Error('feed_glitch needs category camera')
    }
    if (anomalyType === 'sound' && category === undefined) {
      throw new Error('"category" is missing (sound needs one)')
    }
    if (category === undefined && has(rec, 'also_category')) {
      const also = rec.also_category
      if (typeof also !== 'string' || also.trim() !== '') {
        throw new Error('also_category needs a category')
      }
    }
    const alsoCategory =
      category === undefined
        ? undefined
        : parseAlsoCategory(rec.also_category, category)

    const detail = kind === 'runtime' ? field(rec, 'detail') : undefined
    const spec = has(rec, 'spec') ? field(rec, 'spec') : undefined

    // overlay / overlay_origin / dimensions: all required for image+produced, all-or-none for
    // image+planned, forbidden for runtime.
    const overlayKeys = ['overlay', 'overlay_origin', 'dimensions']
    const present = overlayKeys.filter(k => has(rec, k))
    if (kind === 'runtime' && present.length > 0) {
      throw new Error(`${present[0]} is not allowed on a runtime entry`)
    }
    let overlay: string | undefined
    let origin: LedgerRecord['origin']
    let size: LedgerRecord['size']
    if (kind === 'image' && (status === 'produced' || present.length > 0)) {
      overlay = parseOverlayPath(field(rec, 'overlay'))
      origin = parseOrigin(field(rec, 'overlay_origin'))
      size = parseDimensions(field(rec, 'dimensions'))
    }

    return {
      id,
      status,
      kind,
      anomalyType,
      ...(cameraId !== undefined ? { cameraId } : {}),
      ...(category ? { category } : {}),
      ...(alsoCategory ? { alsoCategory } : {}),
      ...(spec ? { spec } : {}),
      ...(detail ? { detail } : {}),
      ...(overlay && origin && size ? { overlay, origin, size } : {}),
    }
  } catch (e) {
    throw new Error(`anomalies.yaml entry ${label}: ${(e as Error).message}`)
  }
}

/** True for the entries the game draws from: kind=image and status=produced. */
export const isGameRecord = (r: LedgerRecord): boolean =>
  r.kind === 'image' && r.status === 'produced'

/** Trim a validated image+produced record to the game's `LedgerEntry` shape. */
export const toLedgerEntry = (r: LedgerRecord): LedgerEntry => {
  if (
    !isGameRecord(r) ||
    r.cameraId === undefined ||
    r.category === undefined ||
    !r.overlay ||
    !r.origin ||
    !r.size
  ) {
    throw new Error(
      `anomalies.yaml entry "${r.id}": not a produced image entry`
    )
  }
  return {
    id: r.id,
    cameraId: r.cameraId,
    category: r.category,
    ...(r.alsoCategory ? { alsoCategory: r.alsoCategory } : {}),
    anomalyType: r.anomalyType as ImageAnomalyType,
    overlay: r.overlay,
    origin: r.origin,
    size: r.size,
  }
}

/** Parse and validate one raw YAML entry as a game entry (kind=image, status=produced). */
export const parseLedgerEntry = (raw: unknown, index: number): LedgerEntry =>
  toLedgerEntry(parseLedgerRecord(raw, index))

/** Parse and validate the whole `anomalies:` list (every kind/status); ids must be unique. */
export const parseLedgerRecords = (parsedYaml: unknown): LedgerRecord[] => {
  const list = (parsedYaml as { anomalies?: unknown } | null)?.anomalies
  if (!Array.isArray(list)) {
    throw new Error('anomalies.yaml: top-level "anomalies" list is missing')
  }
  const records = list.map(parseLedgerRecord)
  const seen = new Set<string>()
  for (const e of records) {
    if (seen.has(e.id))
      throw new Error(`anomalies.yaml: duplicate id "${e.id}"`)
    seen.add(e.id)
  }
  return records
}

/** Validate the whole ledger and return only what the game draws from (image + produced). */
export const parseLedger = (parsedYaml: unknown): LedgerEntry[] =>
  parseLedgerRecords(parsedYaml).filter(isGameRecord).map(toLedgerEntry)
