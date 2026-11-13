/**
 * Save data (docs/save-data.md): one versioned JSON under one localStorage key. The game only uses
 * `load()` / `update(fn)`; swapping the backend later means changing this file only.
 */

export const SAVE_VERSION = 1
export const SAVE_KEY = 'corona-road:save'
export const BROKEN_KEY = 'corona-road:save:broken'
export const PROBE_KEY = 'corona-road:save:probe'

export type Language = 'ja' | 'en'

export interface SaveSettings {
  brightness?: number
  contrast?: number
  /** Sound (#79): master volume 0..100 (absent = the default); 0 is the mute. */
  volume?: number
  /** Legacy (#79): the old mute switch. Read as volume 0 when true, never written any more. */
  muted?: boolean
  /** Reserved for a future settings screen (#292). Read for compatibility with old saves, but neither written nor used: the language comes from the browser at every start. */
  language?: Language
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
  /** The hypothesis memo flag shown on this shift's result (#325); absent = none. Chosen once, when the shift ended. */
  memoFlag?: string
  /** The anomaly id whose one-line memo is shown on this shift's result (#325); absent = none. */
  memo?: string
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
  /** Hypothesis memo flags raised but not yet shown on a result, oldest first (#325). */
  pendingMemoFlags: string[]
  /** Hypothesis memo flags already shown on a result: never shown again (#325). */
  shownMemoFlags: string[]
  /** Ids of reported anomalies whose one-line memo has not been shown yet, in the order they were reported (#325). */
  pendingMemos: string[]
  /** Ids of anomalies whose one-line memo has been shown: never shown again (#325). */
  shownMemos: string[]
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
  pendingMemoFlags: [],
  shownMemoFlags: [],
  pendingMemos: [],
  shownMemos: [],
  endingReached: false,
  epoch: 0,
})

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

/**
 * Size limits for a save read from outside (storage, a transfer code). A real save is a few tens of KB at most
 * (a few hundred anomalies, a few thousand dialogue ids); these leave a wide margin but stop a crafted or
 * runaway value from filling localStorage (about 5 MB) or freezing the page. One place, on purpose.
 */
export const SAVE_LIMITS = {
  /** Largest counter (loops, foundTotal, durations): far beyond any play, still exactly representable. */
  count: 1_000_000_000,
  /** Largest generation number. Reset and import step it by one and stop here. */
  epoch: 1_000_000_000,
  /** Items in one id list (foundIds, usedChatter, one usedLines entry, the memo queues). */
  listLength: 20_000,
  /** Keys in `flags` and in `usedLines`. */
  keys: 2_000,
  /** Characters in one id, flag or key. */
  stringLength: 200,
} as const

const isCount = (v: unknown): v is number =>
  typeof v === 'number' &&
  Number.isSafeInteger(v) &&
  v >= 0 &&
  v <= SAVE_LIMITS.count

// The generation number is incremented on every reset, so it must stay exactly representable (and bounded).
const isEpoch = (v: unknown): v is number =>
  typeof v === 'number' &&
  Number.isSafeInteger(v) &&
  v >= 0 &&
  v <= SAVE_LIMITS.epoch

/** The generation after `n`, never past the limit (so the next read still accepts it). */
export const nextEpoch = (n: number): number =>
  Math.min(n + 1, SAVE_LIMITS.epoch)

const isShortString = (s: unknown): s is string =>
  typeof s === 'string' && s.length <= SAVE_LIMITS.stringLength

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) &&
  v.length <= SAVE_LIMITS.listLength &&
  v.every(isShortString)

const hasOwn = (o: object, k: string): boolean =>
  Object.prototype.hasOwnProperty.call(o, k)

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
    // Absent in saves written before the memos existed; a damaged one is dropped, not a reason to drop the shift.
    ...(isShortString(v.memoFlag) ? { memoFlag: v.memoFlag } : {}),
    ...(isShortString(v.memo) ? { memo: v.memo } : {}),
  }
}

const uniq = (a: readonly string[]): string[] => [...new Set(a)]

/** The four memo queues (#325), normalised: no duplicates, and nothing shown is still waiting. */
const memoQueues = (
  pendingFlags: readonly string[],
  shownFlags: readonly string[],
  pendingMemos: readonly string[],
  shownMemos: readonly string[]
): Pick<
  SaveData,
  'pendingMemoFlags' | 'shownMemoFlags' | 'pendingMemos' | 'shownMemos'
> => {
  const sf = uniq(shownFlags)
  const sm = uniq(shownMemos)
  return {
    pendingMemoFlags: uniq(pendingFlags).filter(f => !sf.includes(f)),
    shownMemoFlags: sf,
    pendingMemos: uniq(pendingMemos).filter(m => !sm.includes(m)),
    shownMemos: sm,
  }
}

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
  // Absent in saves written before the memo queues existed (same version): empty.
  const memoLists = {
    pendingMemoFlags: rec.pendingMemoFlags ?? [],
    shownMemoFlags: rec.shownMemoFlags ?? [],
    pendingMemos: rec.pendingMemos ?? [],
    shownMemos: rec.shownMemos ?? [],
  }
  for (const list of Object.values(memoLists))
    if (!isStringArray(list)) return null
  // Absent in saves written before the ending mark existed (same version): not reached.
  const endingReached = rec.endingReached ?? false
  if (typeof endingReached !== 'boolean') return null
  // Absent in saves written before generations existed (same version): generation 0.
  const epoch = rec.epoch ?? 0
  if (!isEpoch(epoch)) return null
  if (
    !isRecord(flags) ||
    Object.keys(flags).length > SAVE_LIMITS.keys ||
    !Object.keys(flags).every(isShortString) ||
    !Object.values(flags).every(f => typeof f === 'boolean')
  )
    return null
  if (
    !isRecord(usedLines) ||
    Object.keys(usedLines).length > SAVE_LIMITS.keys ||
    !Object.keys(usedLines).every(isShortString) ||
    !Object.values(usedLines).every(isStringArray)
  )
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
    ...memoQueues(
      memoLists.pendingMemoFlags as string[],
      memoLists.shownMemoFlags as string[],
      memoLists.pendingMemos as string[],
      memoLists.shownMemos as string[]
    ),
    endingReached,
    epoch,
  }
  // Absent in saves written before the field existed (same version): treated as none. A damaged one is dropped,
  // not a reason to throw the whole save away (it is only a memo of the last shift).
  const lastShift = validLastShift(rec.lastShift)
  if (lastShift) out.lastShift = lastShift
  if (settings !== undefined) {
    if (!isRecord(settings)) return null
    const { brightness, contrast, language, volume, muted } = settings
    if (brightness !== undefined && typeof brightness !== 'number') return null
    if (contrast !== undefined && typeof contrast !== 'number') return null
    if (language !== undefined && language !== 'ja' && language !== 'en')
      return null
    if (
      volume !== undefined &&
      (typeof volume !== 'number' || !(volume >= 0 && volume <= 100))
    )
      return null
    if (muted !== undefined && typeof muted !== 'boolean') return null
    out.settings = {
      ...(brightness !== undefined ? { brightness } : {}),
      ...(contrast !== undefined ? { contrast } : {}),
      ...(language !== undefined ? { language } : {}),
      ...(volume !== undefined ? { volume } : {}),
      ...(muted !== undefined ? { muted } : {}),
    }
  }
  return out
}

/** Field by field, `b` winning. The legacy `muted` (#79) is never carried over, so a stale tab cannot write it back. */
const mergeSettings = (
  a: SaveSettings | undefined,
  b: SaveSettings | undefined
): SaveSettings | undefined => {
  if (!a && !b) return undefined
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { muted: _m, ...merged } = { ...a, ...b }
  return merged
}

/**
 * Merge two saves of the same player (two tabs). Within one epoch data only grows: counts take the larger value,
 * ids and flags are unions. Settings merge field by field, `b` winning where both have a field.
 */
export const mergeSave = (a: SaveData, b: SaveData): SaveData => {
  // A higher epoch (a reset happened) wins whole: the older generation's progress is dropped.
  if (a.epoch !== b.epoch) {
    const [win, lose] = a.epoch > b.epoch ? [a, b] : [b, a]
    // Settings are not progress: they merge field by field like within one epoch (the winner's fields win).
    const settings = mergeSettings(lose.settings, win.settings)
    return settings ? { ...win, settings } : win
  }
  // Own keys only, and built with fromEntries: a key like "__proto__" must stay plain data.
  const own = (o: Record<string, string[]>, k: string): string[] =>
    hasOwn(o, k) ? o[k] : []
  const usedLines: Record<string, string[]> = Object.fromEntries(
    [
      ...new Set([...Object.keys(a.usedLines), ...Object.keys(b.usedLines)]),
    ].map(k => [k, uniq([...own(a.usedLines, k), ...own(b.usedLines, k)])])
  )
  const out: SaveData = {
    v: SAVE_VERSION,
    foundTotal: Math.max(a.foundTotal, b.foundTotal),
    foundIds: uniq([...a.foundIds, ...b.foundIds]),
    loops: Math.max(a.loops, b.loops),
    flags: { ...a.flags, ...b.flags },
    usedLines,
    usedChatter: uniq([...a.usedChatter, ...b.usedChatter]),
    pendingStories: uniq([...a.pendingStories, ...b.pendingStories]),
    // Shown wins over waiting: a memo one tab has shown must not be shown again by the other.
    ...memoQueues(
      [...a.pendingMemoFlags, ...b.pendingMemoFlags],
      [...a.shownMemoFlags, ...b.shownMemoFlags],
      [...a.pendingMemos, ...b.pendingMemos],
      [...a.shownMemos, ...b.shownMemos]
    ),
    endingReached: a.endingReached || b.endingReached,
    epoch: a.epoch,
  }
  // The shift that ended later (more loops) is the last one; on a tie `b` (the fresher read) wins.
  const lastShift =
    a.loops > b.loops
      ? (a.lastShift ?? b.lastShift)
      : (b.lastShift ?? a.lastShift)
  if (lastShift) out.lastShift = lastShift
  // Field by field: `b` wins where both have it, so a setting only one tab has is not lost.
  const settings = mergeSettings(a.settings, b.settings)
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
  /** Like `update`, and also says whether this write reached storage (not a flag left over from an earlier failure). */
  updateChecked: (fn: (current: SaveData) => SaveData) => {
    save: SaveData
    saved: boolean
  }
  /** False while the last read or write failed (progress lives in memory only: show a notice); a later successful write clears it. */
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

  /** Write the save. Returns whether it reached storage; a success also clears an earlier failure (the notice follows the truth). */
  const write = (data: SaveData): boolean => {
    if (newerSave) return false
    const s = storage()
    if (!s) {
      persistable = false
      return false
    }
    try {
      s.setItem(key, JSON.stringify(data))
    } catch {
      persistable = false
      return false
    }
    persistable = true
    if (!persistRequested) {
      persistRequested = true
      try {
        opts.requestPersist?.()
      } catch {
        // best effort only
      }
    }
    return true
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
    updateChecked: fn => {
      const next = fn(latest())
      memory = next
      return { save: next, saved: write(next) }
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
export const updateChecked = defaultStore.updateChecked
export const canPersist = defaultStore.canPersist
export const probe = defaultStore.probe
