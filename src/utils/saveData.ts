/**
 * Save data (docs/save-data.md): one versioned JSON under one localStorage key. The game only uses
 * `load()` / `update(fn)`; swapping the backend later means changing this file only.
 */

export const SAVE_VERSION = 1
export const SAVE_KEY = 'corona-road:save'
export const BROKEN_KEY = 'corona-road:save:broken'

export interface SaveSettings {
  brightness: number
  contrast: number
}

export interface SaveData {
  v: typeof SAVE_VERSION
  /** Total correct finds across all plays, duplicates counted. A record only; never used for milestones. */
  foundTotal: number
  /** Distinct anomaly ids ever found. Its length is what milestones use. */
  foundIds: string[]
  /** Completed plays (dawn or withdraw). */
  loops: number
  /** Raised story flags (names from dialogue/flags.yaml). */
  flags: Record<string, boolean>
  /** Anomaly id -> ids of that anomaly's lines already used (bag). */
  usedLines: Record<string, string[]>
  /** Ids of every other used conversation (opening, closing, midpoint, chatter, story, common false report). */
  usedChatter: string[]
  settings?: SaveSettings
}

export const emptySave = (): SaveData => ({
  v: SAVE_VERSION,
  foundTotal: 0,
  foundIds: [],
  loops: 0,
  flags: {},
  usedLines: {},
  usedChatter: [],
})

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const isCount = (v: unknown): v is number =>
  typeof v === 'number' && Number.isInteger(v) && v >= 0

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every(s => typeof s === 'string')

const uniq = (a: readonly string[]): string[] => [...new Set(a)]

/**
 * Migrations from an older version to the next one, keyed by the version they upgrade from.
 * Empty while v1 is the only version.
 */
const MIGRATIONS: Record<
  number,
  (old: Record<string, unknown>) => Record<string, unknown>
> = {}

/** Validate untrusted data (and migrate it to the current version). Returns null if it is unusable. */
export const validateSave = (raw: unknown): SaveData | null => {
  if (!isRecord(raw)) return null
  let rec: Record<string, unknown> = raw
  let v = rec.v
  if (!isCount(v) || v < 1 || v > SAVE_VERSION) return null
  while (v < SAVE_VERSION) {
    const migrate = MIGRATIONS[v as number]
    if (!migrate) return null
    rec = migrate(rec)
    v = rec.v
    if (!isCount(v)) return null
  }
  const {
    foundTotal,
    foundIds,
    loops,
    flags,
    usedLines,
    usedChatter,
    settings,
  } = rec
  if (!isCount(foundTotal) || !isCount(loops)) return null
  if (!isStringArray(foundIds) || !isStringArray(usedChatter)) return null
  if (
    !isRecord(flags) ||
    !Object.values(flags).every(f => typeof f === 'boolean')
  )
    return null
  if (!isRecord(usedLines) || !Object.values(usedLines).every(isStringArray))
    return null
  const out: SaveData = {
    v: SAVE_VERSION,
    foundTotal,
    foundIds: uniq(foundIds),
    loops,
    flags: { ...(flags as Record<string, boolean>) },
    usedLines: Object.fromEntries(
      Object.entries(usedLines as Record<string, string[]>).map(([k, ids]) => [
        k,
        uniq(ids),
      ])
    ),
    usedChatter: uniq(usedChatter),
  }
  if (settings !== undefined) {
    if (
      !isRecord(settings) ||
      typeof settings.brightness !== 'number' ||
      typeof settings.contrast !== 'number'
    )
      return null
    out.settings = {
      brightness: settings.brightness,
      contrast: settings.contrast,
    }
  }
  return out
}

/**
 * Merge two saves of the same player (two tabs). Data only grows: counts take the larger value,
 * ids and flags are unions. `b` wins for settings.
 */
export const mergeSave = (a: SaveData, b: SaveData): SaveData => {
  const usedLines: Record<string, string[]> = {}
  for (const k of new Set([
    ...Object.keys(a.usedLines),
    ...Object.keys(b.usedLines),
  ])) {
    usedLines[k] = uniq([...(a.usedLines[k] ?? []), ...(b.usedLines[k] ?? [])])
  }
  const out: SaveData = {
    v: SAVE_VERSION,
    foundTotal: Math.max(a.foundTotal, b.foundTotal),
    foundIds: uniq([...a.foundIds, ...b.foundIds]),
    loops: Math.max(a.loops, b.loops),
    flags: { ...a.flags, ...b.flags },
    usedLines,
    usedChatter: uniq([...a.usedChatter, ...b.usedChatter]),
  }
  const settings = b.settings ?? a.settings
  if (settings) out.settings = settings
  return out
}

export interface SaveStoreOptions {
  /** Returns the storage, or null; may throw (private browsing, blocked site data). */
  getStorage: () => Storage | null
  /** Called once after the first successful write. */
  requestPersist?: () => void
  key?: string
  brokenKey?: string
}

export interface SaveStore {
  /** Current save (read from storage on first call, then memory merged with storage). */
  load: () => SaveData
  /** Apply `fn` to the latest save (storage merged into memory), keep and write the result. */
  update: (fn: (current: SaveData) => SaveData) => SaveData
  /** False once a read or write has failed: progress lives in memory only (show a notice). */
  canPersist: () => boolean
}

export const createSaveStore = (opts: SaveStoreOptions): SaveStore => {
  const key = opts.key ?? SAVE_KEY
  const brokenKey = opts.brokenKey ?? BROKEN_KEY
  let memory: SaveData | null = null
  let persistable = true
  let persistRequested = false

  const storage = (): Storage | null => {
    try {
      return opts.getStorage()
    } catch {
      return null
    }
  }

  /** Stored save: valid data, or null when absent or storage is unusable. Broken data is set aside. */
  const readStored = (): SaveData | null => {
    const s = storage()
    if (!s) {
      persistable = false
      return null
    }
    let text: string | null
    try {
      text = s.getItem(key)
    } catch {
      persistable = false
      return null
    }
    if (text === null) return null
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      parsed = undefined
    }
    const valid = validateSave(parsed)
    if (valid) return valid
    try {
      s.setItem(brokenKey, text)
      s.removeItem(key)
    } catch {
      persistable = false
    }
    return null
  }

  const write = (data: SaveData) => {
    const s = storage()
    if (!s) {
      persistable = false
      return
    }
    try {
      s.setItem(key, JSON.stringify(data))
    } catch {
      persistable = false
      return
    }
    if (!persistRequested) {
      persistRequested = true
      try {
        opts.requestPersist?.()
      } catch {
        // best effort only
      }
    }
  }

  const latest = (): SaveData => {
    const stored = readStored()
    if (memory && stored) return mergeSave(memory, stored)
    return memory ?? stored ?? emptySave()
  }

  return {
    load: () => {
      memory = latest()
      return memory
    },
    update: fn => {
      const next = fn(latest())
      memory = next
      write(next)
      return next
    },
    canPersist: () => persistable,
  }
}

const requestPersist = () => {
  void navigator.storage?.persist?.()?.catch(() => {})
}

const defaultStore = createSaveStore({
  getStorage: () => (typeof localStorage === 'undefined' ? null : localStorage),
  requestPersist,
})

export const load = defaultStore.load
export const update = defaultStore.update
export const canPersist = defaultStore.canPersist
