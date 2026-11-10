/**
 * Save data (docs/save-data.md): one versioned JSON under one localStorage key. The game only uses
 * `load()` / `update(fn)`; swapping the backend later means changing this file only.
 */

export const SAVE_VERSION = 1
export const SAVE_KEY = 'corona-road:save'
export const BROKEN_KEY = 'corona-road:save:broken'
export const PROBE_KEY = 'corona-road:save:probe'

export interface SaveSettings {
  brightness: number
  contrast: number
}

/** How the last finished shift went (investigation note, #297). Kept in the save so the next start can show it. */
export interface LastShift {
  /** Correct reports in that shift (duplicates counted). */
  found: number
  /** Distinct anomalies found for the first time in that shift. */
  fresh: number
  misreports: number
  /** Real time the shift lasted, in ms. */
  durationMs: number
  closing: 'dawn' | 'withdraw' | 'ending'
  /** Story flags (elder1..3, child) that rose during that shift. */
  raised: string[]
}

export interface SaveData {
  v: typeof SAVE_VERSION
  /** Total correct finds across all plays, duplicates counted. May drive foundTotal flag thresholds. */
  foundTotal: number
  /** Distinct anomaly ids ever found. Its length drives foundUnique flag thresholds. */
  foundIds: string[]
  /** Completed plays (dawn or withdraw). */
  loops: number
  /** Raised story flags (names from dialogue/flags.yaml). */
  flags: Record<string, boolean>
  /** Anomaly id -> ids of that anomaly's lines already used (bag). */
  usedLines: Record<string, string[]>
  /** Ids of every other used conversation (opening, closing, midpoint, chatter, story, common false report). */
  usedChatter: string[]
  /** Story flags that are raised but whose story conversation has not been played yet (carried to the next start). */
  pendingStories: string[]
  /** The shift that ended last. Absent until one has ended (and in older saves). */
  lastShift?: LastShift
  /** The true ending has been reached: this save can no longer start a shift, only start over (#294). */
  endingReached: boolean
  /**
   * Generation number. START OVER raises it by one; a higher epoch wins a merge whole, so a reset
   * is not undone by an older tab that still holds the old progress. Absent = 0.
   */
  epoch: number
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
  pendingStories: [],
  endingReached: false,
  epoch: 0,
})

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const isCount = (v: unknown): v is number =>
  typeof v === 'number' && Number.isInteger(v) && v >= 0

// The generation number is incremented on every reset, so it must stay exactly representable.
const isEpoch = (v: unknown): v is number =>
  typeof v === 'number' && Number.isSafeInteger(v) && v >= 0

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every(s => typeof s === 'string')

const CLOSINGS: readonly string[] = ['dawn', 'withdraw', 'ending']

const validLastShift = (v: unknown): LastShift | null => {
  if (!isRecord(v)) return null
  const { found, fresh, misreports, durationMs, closing, raised } = v
  if (
    !isCount(found) ||
    !isCount(fresh) ||
    !isCount(misreports) ||
    !isCount(durationMs) ||
    typeof closing !== 'string' ||
    !CLOSINGS.includes(closing) ||
    !isStringArray(raised)
  )
    return null
  return {
    found,
    fresh,
    misreports,
    durationMs,
    closing: closing as LastShift['closing'],
    raised: [...new Set(raised)],
  }
}

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
  // Absent in saves written before the field existed (same version): treated as none.
  const pendingStories = rec.pendingStories ?? []
  if (!isStringArray(pendingStories)) return null
  // Absent in saves written before the ending mark existed (same version): not reached.
  const endingReached = rec.endingReached ?? false
  if (typeof endingReached !== 'boolean') return null
  // Absent in saves written before generations existed (same version): generation 0.
  const epoch = rec.epoch ?? 0
  if (!isEpoch(epoch)) return null
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
    pendingStories: uniq(pendingStories),
    endingReached,
    epoch,
  }
  // Absent in saves written before the field existed (same version): treated as none. A damaged one is dropped,
  // not a reason to throw the whole save away (it is only a memo of the last shift).
  const lastShift = validLastShift(rec.lastShift)
  if (lastShift) out.lastShift = lastShift
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
 * Merge two saves of the same player (two tabs). Within one epoch data only grows: counts take the larger value,
 * ids and flags are unions. `b` wins for settings.
 */
export const mergeSave = (a: SaveData, b: SaveData): SaveData => {
  // A higher epoch (a reset happened) wins whole: the older generation's progress is dropped.
  if (a.epoch !== b.epoch) {
    const [win, lose] = a.epoch > b.epoch ? [a, b] : [b, a]
    const settings = win.settings ?? lose.settings
    return settings ? { ...win, settings } : win
  }
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
    pendingStories: uniq([...a.pendingStories, ...b.pendingStories]),
    endingReached: a.endingReached || b.endingReached,
    epoch: a.epoch,
  }
  // The shift that ended later (more loops) is the last one; on a tie `b` (the fresher read) wins.
  const lastShift =
    a.loops > b.loops
      ? (a.lastShift ?? b.lastShift)
      : (b.lastShift ?? a.lastShift)
  if (lastShift) out.lastShift = lastShift
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
  /** Scratch key for `probe()`; never the save key. */
  probeKey?: string
}

export interface SaveStore {
  /** Current save (read from storage on first call, then memory merged with storage). */
  load: () => SaveData
  /** Apply `fn` to the latest save (storage merged into memory), keep and write the result. */
  update: (fn: (current: SaveData) => SaveData) => SaveData
  /** False once a read or write has failed: progress lives in memory only (show a notice). */
  canPersist: () => boolean
  /**
   * Try a write now (scratch key, then removed) so a storage that rejects writes (quota, some
   * private modes) is known before the first save. Failure flips `canPersist()` to false.
   */
  probe: () => void
}

export const createSaveStore = (opts: SaveStoreOptions): SaveStore => {
  const key = opts.key ?? SAVE_KEY
  const brokenKey = opts.brokenKey ?? BROKEN_KEY
  const probeKey = opts.probeKey ?? PROBE_KEY
  let memory: SaveData | null = null
  let persistable = true
  let persistRequested = false
  // Set when storage holds a save of a newer version than this build knows: never touched, never written.
  let newerSave = false

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
    if (isRecord(parsed) && isCount(parsed.v) && parsed.v > SAVE_VERSION) {
      // A newer build's save: not broken. Keep it as it is and run without saving this time.
      newerSave = true
      persistable = false
      return null
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
    if (newerSave) return
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
    probe: () => {
      const s = storage()
      if (!s) {
        persistable = false
        return
      }
      try {
        s.setItem(probeKey, '1')
        s.removeItem(probeKey)
      } catch {
        persistable = false
      }
    },
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
export const probe = defaultStore.probe
