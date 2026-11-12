import type { AnomalyCategory } from '../types/game'

// NOTE: scripts/ledger-summary.mjs imports this file via Node's type stripping. Use only erasable
// TypeScript here (no enum, namespace or constructor parameter properties) or only Node breaks.

/**
 * Pure helpers for the anomaly ledger (`prompts/anomalies.yaml`, the single source of truth).
 * `vite.config.ts` uses them to turn the YAML into the `virtual:anomalies` module, and the game
 * only ever sees the trimmed `LedgerEntry` shape.
 */

/** `anomaly_type` values of image (overlay) anomalies (source of truth: `prompts/README.md` "異変の種類 enum"). */
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

/** `anomaly_type` values of non-image anomalies (no overlay: feed glitch, sound, UI, rules). */
export const NON_IMAGE_ANOMALY_TYPES = [
  'feed_glitch',
  'sound',
  'ui_corruption',
  'rule_break',
] as const
export type NonImageAnomalyType = (typeof NON_IMAGE_ANOMALY_TYPES)[number]

/** Every `anomaly_type` the ledger accepts (the `prompts/README.md` enum table lists exactly these). */
export const ANOMALY_TYPES = [
  ...IMAGE_ANOMALY_TYPES,
  ...NON_IMAGE_ANOMALY_TYPES,
] as const
export type AnomalyType = (typeof ANOMALY_TYPES)[number]

export const LEDGER_STATUSES = ['produced', 'planned'] as const
export type LedgerStatus = (typeof LEDGER_STATUSES)[number]
export const LEDGER_KINDS = ['image', 'non_image'] as const
export type LedgerKind = (typeof LEDGER_KINDS)[number]

/**
 * The memo flags (hypotheses) a ledger entry may raise when it is reported (#325): `memo_flag` in the ledger. Each
 * has its wording in `src/data/investigationNotes.ts` (MEMO_FLAG_TEXT). `reiwa` is also raised by `reiwa: true`.
 */
export const MEMO_FLAGS = ['shutter', 'food', 'reiwa'] as const
export type MemoFlag = (typeof MEMO_FLAGS)[number]

/** A one-line memo (`memo` in the ledger): the detective's note on that anomaly, Japanese and English. */
export interface MemoText {
  ja: string
  en: string
}

/** The only fields the game needs from one ledger entry (kind=image, status=produced). */
export interface LedgerEntry {
  id: string
  cameraId: number
  /** The primary category (the first of the ledger's `category`): shown in the feedback, drawn by, counted by. */
  category: AnomalyCategory
  /**
   * Every correct report (the ledger's `category` as an array, primary first, no duplicates); present only when
   * the ledger lists more than one. Absent = `category` alone is correct.
   */
  categories?: AnomalyCategory[]
  anomalyType: ImageAnomalyType
  /** Repo-relative path of the transparent overlay, e.g. `assets/anomaly-overlays/cam01/notice.webp`. */
  overlay: string
  /** Top-left of the overlay on the base photo, in base-photo pixels. */
  origin: { x: number; y: number }
  /** Overlay size in pixels. */
  size: { w: number; h: number }
  /** True for a Reiwa anomaly (the ledger's explicit `reiwa: true`, #83); absent otherwise. */
  reiwa?: true
  /** Appears only once this flag (dialogue/flags.yaml) is saved (the ledger's `unlock: { flag }`, #77). */
  unlockFlag?: string
  /** Never appears while another unreported anomaly of the same group is running (the ledger's `exclusive`, #77). */
  exclusiveGroup?: string
  /** Hypothesis memo flags this anomaly raises when reported (the ledger's `memo_flag`, #325). */
  memoFlags?: MemoFlag[]
  /** The one-line memo of this anomaly (the ledger's `memo`, #325). */
  memo?: MemoText
  /** A scribble shown with the one-liner (the ledger's `memo_image`, a file in `public/note-sketches/`, #325). */
  memoImage?: string
}

/**
 * The only fields the game needs from one non-image ledger entry (kind=non_image, status=produced, #77). There is no
 * camera: the camera is drawn at random each time it appears. Reporting it needs a `category` (the ledger gives
 * every produced non-image entry one).
 */
export interface NonImageEntry {
  id: string
  category: AnomalyCategory
  /** Every correct report (primary first); present only when the ledger lists more than one. */
  categories?: AnomalyCategory[]
  anomalyType: NonImageAnomalyType
  reiwa?: true
  unlockFlag?: string
  exclusiveGroup?: string
  memoFlags?: MemoFlag[]
  memo?: MemoText
  memoImage?: string
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

/**
 * The ledger's `category`: a string (one category) or an array (several correct reports, #347). The first is the
 * primary; the rest are grazing answers that are also correct. Blank items are skipped; every item must be a valid
 * category and none may repeat. An image entry cannot have `camera` first (camera is the whole feed's glitch), but
 * may list it second or later (a big surface change that reads as the whole screen being wrong).
 * Returns the list (primary first).
 */
export const parseCategories = (
  value: unknown,
  kind: LedgerKind
): AnomalyCategory[] => {
  const list = Array.isArray(value) ? value : [value]
  const result: AnomalyCategory[] = []
  for (const item of list) {
    if (typeof item !== 'string') {
      throw new Error(
        Array.isArray(value)
          ? '"category" has a non-string item'
          : '"category" is missing or not a string'
      )
    }
    const text = item.trim()
    if (text === '') continue
    const cat = parseCategory(text)
    if (result.includes(cat)) {
      throw new Error(`category "${text}" is duplicated`)
    }
    result.push(cat)
  }
  if (result.length === 0) throw new Error('"category" is missing or blank')
  if (kind === 'image' && result[0] === 'Camera') {
    throw new Error(
      'category "camera" cannot be first on an image entry (camera is a whole-feed glitch; list it second or later only for a big surface change)'
    )
  }
  return result
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
  /** Absent only for non-image entries (the camera is drawn at random when the anomaly appears). */
  cameraId?: number
  /** Absent only for non-image `ui_corruption` / `rule_break` (no report window yet, #80); every image entry has one. */
  category?: AnomalyCategory
  /** Every correct report (primary first); only when the ledger's `category` lists more than one. */
  categories?: AnomalyCategory[]
  /** The ledger's `reiwa: true` (a thing the Showa era did not have); absent = not Reiwa. Any kind may carry it. */
  reiwa?: true
  /** The ledger's `unlock: { flag }`: the entry may appear only after this flag is saved. Any kind may carry it. */
  unlockFlag?: string
  /** The ledger's `exclusive`: a group name; two unreported anomalies of one group never run together. Any kind. */
  exclusiveGroup?: string
  /** The ledger's `memo_flag` (a name or a list of names from MEMO_FLAGS, no duplicates). Any kind may carry it. */
  memoFlags?: MemoFlag[]
  /** The ledger's `memo`: a Japanese and an English one-liner. Any kind may carry it. */
  memo?: MemoText
  /** The ledger's `memo_image`: a scribble file in `public/note-sketches/` shown with the one-liner. Needs `memo`. */
  memoImage?: string
  /** Pointer to the production spec (e.g. a `### id` section of candidate-pool.md). */
  spec?: string
  detail?: string
  /** Present for image+produced; optional for image+planned; never for non-image. */
  overlay?: string
  origin?: { x: number; y: number }
  size?: { w: number; h: number }
}

const has = (rec: Record<string, unknown>, key: string): boolean =>
  rec[key] !== undefined && rec[key] !== null

/** Optional `unlock`: `{ flag: <name> }` (the name itself is checked against dialogue/flags.yaml at build time). */
export const parseUnlock = (value: unknown): string | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('"unlock" must be a mapping like { flag: elder1 }')
  }
  const rec = value as Record<string, unknown>
  const extra = Object.keys(rec).filter(k => k !== 'flag')
  if (extra.length > 0)
    throw new Error(`unlock has an unknown key "${extra[0]}"`)
  if (typeof rec.flag !== 'string' || rec.flag.trim() === '') {
    throw new Error('unlock.flag is missing or not a string')
  }
  return rec.flag.trim()
}

/** Optional `exclusive`: a group name (lowercase letters, digits, hyphens). */
export const parseExclusive = (value: unknown): string | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(value)) {
    throw new Error(
      `exclusive "${String(value)}" must be a group name of lowercase letters, digits and hyphens`
    )
  }
  return value
}

/** Every `unlock.flag` of the records must be a flag defined in dialogue/flags.yaml (an unknown one fails the build). */
export const checkUnlockFlags = (
  records: readonly { id: string; unlockFlag?: string }[],
  flagNames: ReadonlySet<string>
): void => {
  for (const r of records) {
    if (r.unlockFlag !== undefined && !flagNames.has(r.unlockFlag)) {
      throw new Error(
        `anomalies.yaml entry "${r.id}": unlock.flag "${r.unlockFlag}" is not defined in dialogue/flags.yaml`
      )
    }
  }
}

/** Optional `memo_flag`: a name or a list of names from MEMO_FLAGS (no duplicates, none unknown). */
export const parseMemoFlags = (value: unknown): MemoFlag[] | undefined => {
  if (value === undefined || value === null) return undefined
  const list = Array.isArray(value) ? value : [value]
  const out: MemoFlag[] = []
  for (const item of list) {
    const found = MEMO_FLAGS.find(f => f === item)
    if (!found) {
      throw new Error(
        `memo_flag "${String(item)}" is unknown (one of ${MEMO_FLAGS.join(', ')})`
      )
    }
    if (out.includes(found)) {
      throw new Error(`memo_flag "${found}" is listed twice`)
    }
    out.push(found)
  }
  return out.length > 0 ? out : undefined
}

/** Optional `memo`: `{ ja, en }`, both non-empty single-line strings. */
export const parseMemo = (value: unknown): MemoText | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('"memo" must be a mapping with ja and en')
  }
  const rec = value as Record<string, unknown>
  const text = (key: 'ja' | 'en'): string => {
    const v = rec[key]
    if (typeof v !== 'string' || v.trim() === '') {
      throw new Error(`memo.${key} is missing or not a string`)
    }
    if (/[\r\n]/.test(v)) throw new Error(`memo.${key} must be one line`)
    return v.trim()
  }
  const extra = Object.keys(rec).filter(k => k !== 'ja' && k !== 'en')
  if (extra.length > 0) throw new Error(`memo has an unknown key "${extra[0]}"`)
  return { ja: text('ja'), en: text('en') }
}

/** Folder (under `public/`) of the memo sketches: loaded only when a result note shows one, never preloaded (#325). */
export const MEMO_IMAGE_DIR = 'note-sketches'

/** Optional `memo_image`: a plain file name ending in `.webp` (the file itself is checked at build time). */
export const parseMemoImage = (value: unknown): string | undefined => {
  if (value === undefined || value === null) return undefined
  if (
    typeof value !== 'string' ||
    !/^[A-Za-z0-9][A-Za-z0-9._-]*\.webp$/.test(value)
  ) {
    throw new Error(
      `memo_image "${String(value)}" must be a plain file name ending in .webp (no folder)`
    )
  }
  return value
}

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
const NON_IMAGE_TYPE_SET: readonly string[] = NON_IMAGE_ANOMALY_TYPES

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
    if (rec.kind === 'runtime') {
      throw new Error(
        'kind "runtime" was renamed to "non_image" (see the glossary in prompts/README.md)'
      )
    }
    const kind = oneOf(LEDGER_KINDS, rec, 'kind', 'image')
    const anomalyType = parseAnomalyType(field(rec, 'anomaly_type'))
    if (kind === 'image' && !IMAGE_TYPE_SET.includes(anomalyType)) {
      throw new Error(
        `anomaly_type "${anomalyType}" is a non-image type but kind is image`
      )
    }
    if (kind === 'non_image' && !NON_IMAGE_TYPE_SET.includes(anomalyType)) {
      throw new Error(
        `anomaly_type "${anomalyType}" is an image type but kind is non_image`
      )
    }

    // camera_id: required for image; optional for non-image (drawn at random on appearance).
    const cameraId =
      kind === 'image' || has(rec, 'camera_id')
        ? parseCameraId(field(rec, 'camera_id'))
        : undefined

    // category: required for image. Non-image: feed_glitch must be camera, sound needs one,
    // ui_corruption / rule_break may leave it empty (no report window yet, #80).
    let categories: AnomalyCategory[] | undefined
    if (kind === 'image' || has(rec, 'category')) {
      categories = parseCategories(rec.category, kind)
    }
    const category = categories?.[0]
    if (anomalyType === 'feed_glitch' && category !== 'Camera') {
      throw new Error('feed_glitch needs category camera')
    }
    if (anomalyType === 'sound' && category === undefined) {
      throw new Error('"category" is missing (sound needs one)')
    }

    const detail = kind === 'non_image' ? field(rec, 'detail') : undefined
    // reiwa: optional; only `true` is accepted (omit it for a non-Reiwa entry).
    if (has(rec, 'reiwa') && rec.reiwa !== true) {
      throw new Error(
        `reiwa "${String(rec.reiwa)}" must be true (omit the key for a non-Reiwa entry)`
      )
    }
    const reiwa = rec.reiwa === true ? (true as const) : undefined
    const unlockFlag = parseUnlock(rec.unlock)
    const exclusiveGroup = parseExclusive(rec.exclusive)
    const memoFlags = parseMemoFlags(rec.memo_flag)
    const memo = parseMemo(rec.memo)
    const memoImage = parseMemoImage(rec.memo_image)
    if (memoImage && !memo) {
      throw new Error(
        'memo_image needs a memo (the scribble goes with the one-liner)'
      )
    }
    const spec = has(rec, 'spec') ? field(rec, 'spec') : undefined

    // overlay / overlay_origin / dimensions: all required for image+produced, all-or-none for
    // image+planned, forbidden for non-image.
    const overlayKeys = ['overlay', 'overlay_origin', 'dimensions']
    const present = overlayKeys.filter(k => has(rec, k))
    if (kind === 'non_image' && present.length > 0) {
      throw new Error(`${present[0]} is not allowed on a non_image entry`)
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
      ...(categories && categories.length > 1 ? { categories } : {}),
      ...(reiwa ? { reiwa } : {}),
      ...(unlockFlag ? { unlockFlag } : {}),
      ...(exclusiveGroup ? { exclusiveGroup } : {}),
      ...(memoFlags ? { memoFlags } : {}),
      ...(memo ? { memo } : {}),
      ...(memoImage ? { memoImage } : {}),
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

/** True for the non-image entries the game can show: kind=non_image and status=produced (an effect must exist, see nonImageEffects.ts). */
export const isNonImageGameRecord = (r: LedgerRecord): boolean =>
  r.kind === 'non_image' && r.status === 'produced'

/** Trim a validated non_image+produced record to the game's `NonImageEntry` shape. */
export const toNonImageEntry = (r: LedgerRecord): NonImageEntry => {
  if (!isNonImageGameRecord(r) || r.category === undefined) {
    throw new Error(
      `anomalies.yaml entry "${r.id}": not a produced non_image entry with a category`
    )
  }
  return {
    id: r.id,
    category: r.category,
    ...(r.categories ? { categories: r.categories } : {}),
    anomalyType: r.anomalyType as NonImageAnomalyType,
    ...(r.reiwa ? { reiwa: r.reiwa } : {}),
    ...(r.unlockFlag ? { unlockFlag: r.unlockFlag } : {}),
    ...(r.exclusiveGroup ? { exclusiveGroup: r.exclusiveGroup } : {}),
    ...(r.memoFlags ? { memoFlags: r.memoFlags } : {}),
    ...(r.memo ? { memo: r.memo } : {}),
    ...(r.memoImage ? { memoImage: r.memoImage } : {}),
  }
}

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
    ...(r.categories ? { categories: r.categories } : {}),
    anomalyType: r.anomalyType as ImageAnomalyType,
    overlay: r.overlay,
    origin: r.origin,
    size: r.size,
    ...(r.reiwa ? { reiwa: r.reiwa } : {}),
    ...(r.unlockFlag ? { unlockFlag: r.unlockFlag } : {}),
    ...(r.exclusiveGroup ? { exclusiveGroup: r.exclusiveGroup } : {}),
    ...(r.memoFlags ? { memoFlags: r.memoFlags } : {}),
    ...(r.memo ? { memo: r.memo } : {}),
    ...(r.memoImage ? { memoImage: r.memoImage } : {}),
  }
}

/** Ids of the Reiwa entries (`reiwa` marked), without duplicates, in ledger order. */
export const reiwaIdsOf = (
  entries: readonly { id: string; reiwa?: true }[]
): string[] => [
  ...new Set(entries.filter(e => e.reiwa === true).map(e => e.id)),
]

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
