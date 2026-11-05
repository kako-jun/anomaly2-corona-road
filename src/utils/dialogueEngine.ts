import type {
  ClosingResult,
  DialogueEntry,
  DialogueKind,
  DialogueLedger,
  FlagDef,
  MidpointStage,
  Tone,
} from './dialogueLedger'

/**
 * Pure selection logic for the dialogue system (no React, no storage). Callers pass the used-line
 * state in and get the new state back, so it can be saved with `saveData.update`. Randomness is
 * injected (`rng` returns [0, 1)) so tests can fix it.
 */

export type Rng = () => number

/** What gets remembered between conversations (a slice of SaveData). */
export interface UsedState {
  /** Anomaly id -> used ids of that anomaly's lines. */
  usedLines: Record<string, string[]>
  /** Used ids of every other kind. */
  usedChatter: string[]
}

/** The progress that flag conditions read (a slice of SaveData plus the Reiwa marking). */
export interface FlagProgress {
  foundIds: readonly string[]
  foundTotal?: number
  loops: number
  flags: Readonly<Record<string, boolean>>
  /** Ids of Reiwa-themed anomalies. The ledger has no marking yet (docs/story.md), so the caller supplies it. */
  reiwaIds: ReadonlySet<string>
}

/** Quiet time after a `serious` conversation before chatter may appear (setting; default 20 s). */
export const DEFAULT_SERIOUS_QUIET_MS = 20_000

/** Midpoint stage thresholds on the number of anomalies found this play (provisional setting). */
export const DEFAULT_MIDPOINT_THRESHOLDS = { mid: 2, many: 4 } as const

const pick = <T>(list: readonly T[], rng: Rng): T =>
  list[Math.min(list.length - 1, Math.floor(rng() * list.length))]

export interface BagDraw {
  entry: DialogueEntry
  /** The used ids after the draw (for this bag's own list). */
  used: string[]
}

/**
 * Bag draw: pick uniformly among candidates not yet used; when all are used, refill (forget this
 * bag's used ids) and draw again. A refilled bag avoids the entry drawn last when there is a choice.
 * `used` may contain ids of other bags; they are kept untouched. Returns null with no candidates.
 */
export const drawFromBag = (
  candidates: readonly DialogueEntry[],
  used: readonly string[],
  rng: Rng = Math.random
): BagDraw | null => {
  if (candidates.length === 0) return null
  const ids = new Set(candidates.map(c => c.id))
  const usedSet = new Set(used)
  let fresh = candidates.filter(c => !usedSet.has(c.id))
  let base = [...used]
  if (fresh.length === 0) {
    const lastUsed = [...used].reverse().find(id => ids.has(id))
    base = used.filter(id => !ids.has(id))
    fresh =
      candidates.length > 1
        ? candidates.filter(c => c.id !== lastUsed)
        : [...candidates]
  }
  const entry = pick(fresh, rng)
  return { entry, used: [...base, entry.id] }
}

/** Names of the flags that have a story conversation in the ledger. */
export const storyFlagNames = (ledger: DialogueLedger): Set<string> =>
  new Set(
    ledger.entries.flatMap(e => (e.kind === 'story' ? [e.when.flag] : []))
  )

/**
 * Save a drawn state on top of the stored one without losing other tabs' additions (docs/save-data.md
 * rule 7): the union of `cur` and `next`, minus only the ids this draw itself removed (`prev` -> `next`,
 * a bag refill).
 */
export const applyUsed = (
  cur: UsedState,
  prev: UsedState,
  next: UsedState
): UsedState => {
  const merge = (
    c: readonly string[],
    p: readonly string[],
    n: readonly string[]
  ) => {
    const removed = new Set(p.filter(id => !n.includes(id)))
    return [...new Set([...c, ...n])].filter(id => !removed.has(id))
  }
  const usedLines: Record<string, string[]> = {}
  for (const k of new Set([
    ...Object.keys(cur.usedLines),
    ...Object.keys(next.usedLines),
  ])) {
    usedLines[k] = merge(
      cur.usedLines[k] ?? [],
      prev.usedLines[k] ?? [],
      next.usedLines[k] ?? []
    )
  }
  return {
    usedLines,
    usedChatter: merge(cur.usedChatter, prev.usedChatter, next.usedChatter),
  }
}

const ofKind = (ledger: DialogueLedger, kind: DialogueKind): DialogueEntry[] =>
  ledger.entries.filter(e => e.kind === kind)

/** A post-flag gate is a candidate filter; locked entries never reach bag accounting. */
const unlocked = (
  entries: readonly DialogueEntry[],
  flags: Readonly<Record<string, boolean>>
): DialogueEntry[] =>
  entries.filter(e => e.unlock === undefined || flags[e.unlock] === true)

export interface Picked {
  entry: DialogueEntry
  used: UsedState
}

const drawChatterBag = (
  candidates: readonly DialogueEntry[],
  used: UsedState,
  rng: Rng
): Picked | null => {
  const d = drawFromBag(candidates, used.usedChatter, rng)
  return d ? { entry: d.entry, used: { ...used, usedChatter: d.used } } : null
}

export const pickOpening = (
  ledger: DialogueLedger,
  used: UsedState,
  rng: Rng = Math.random,
  flags: Readonly<Record<string, boolean>> = {}
): Picked | null =>
  drawChatterBag(unlocked(ofKind(ledger, 'opening'), flags), used, rng)

export const pickClosing = (
  ledger: DialogueLedger,
  result: ClosingResult,
  used: UsedState,
  rng: Rng = Math.random,
  flags: Readonly<Record<string, boolean>> = {}
): Picked | null =>
  drawChatterBag(
    unlocked(
      ledger.entries.filter(
        e => e.kind === 'closing' && e.when.result === result
      ),
      flags
    ),
    used,
    rng
  )

export const pickMidpoint = (
  ledger: DialogueLedger,
  stage: MidpointStage,
  used: UsedState,
  rng: Rng = Math.random,
  flags: Readonly<Record<string, boolean>> = {}
): Picked | null =>
  drawChatterBag(
    unlocked(
      ledger.entries.filter(
        e => e.kind === 'midpoint' && e.when.stage === stage
      ),
      flags
    ),
    used,
    rng
  )

export const pickChatter = (
  ledger: DialogueLedger,
  used: UsedState,
  rng: Rng = Math.random,
  flags: Readonly<Record<string, boolean>> = {}
): Picked | null =>
  drawChatterBag(unlocked(ofKind(ledger, 'chatter'), flags), used, rng)

/** The conversation for a flag that was just raised (its entries form a bag, so a repeat flag does not repeat text). */
export const pickStory = (
  ledger: DialogueLedger,
  flag: string,
  used: UsedState,
  rng: Rng = Math.random,
  flags: Readonly<Record<string, boolean>> = {}
): Picked | null =>
  drawChatterBag(
    unlocked(
      ledger.entries.filter(e => e.kind === 'story' && e.when.flag === flag),
      flags
    ),
    used,
    rng
  )

/**
 * False report: that anomaly's own conversations first (each once); when they are used up, or there
 * are none, the common false-report conversations (bag).
 */
export const pickFalseReport = (
  ledger: DialogueLedger,
  anomalyId: string | null,
  used: UsedState,
  rng: Rng = Math.random,
  flags: Readonly<Record<string, boolean>> = {}
): Picked | null => {
  if (anomalyId !== null) {
    const own = ledger.entries.filter(
      e =>
        e.kind === 'anomaly-line' &&
        e.when.anomaly === anomalyId &&
        (e.unlock === undefined || flags[e.unlock] === true)
    )
    const usedOwn = used.usedLines[anomalyId] ?? []
    const usedSet = new Set(usedOwn)
    const fresh = own.filter(e => !usedSet.has(e.id))
    if (fresh.length > 0) {
      const entry = pick(fresh, rng)
      return {
        entry,
        used: {
          ...used,
          usedLines: { ...used.usedLines, [anomalyId]: [...usedOwn, entry.id] },
        },
      }
    }
  }
  return drawChatterBag(
    unlocked(ofKind(ledger, 'false-report'), flags),
    used,
    rng
  )
}

/** Midpoint stage from the number of anomalies found this play. */
export const midpointStage = (
  foundThisPlay: number,
  thresholds: { mid: number; many: number } = DEFAULT_MIDPOINT_THRESHOLDS
): MidpointStage =>
  foundThisPlay >= thresholds.many
    ? 'many'
    : foundThisPlay >= thresholds.mid
      ? 'mid'
      : 'few'

// ---- flags -------------------------------------------------------------------------------

/** Whether one flag's conditions hold, given the progress and the flags already raised. */
export const isFlagMet = (
  def: FlagDef,
  progress: FlagProgress,
  raised: Readonly<Record<string, boolean>> = progress.flags
): boolean => {
  const w = def.when
  const found = new Set(progress.foundIds)
  if (w.foundUnique !== undefined && found.size < w.foundUnique) return false
  if (w.foundTotal !== undefined && (progress.foundTotal ?? 0) < w.foundTotal)
    return false
  if (w.reiwaFound !== undefined) {
    let n = 0
    for (const id of found) if (progress.reiwaIds.has(id)) n++
    if (n < w.reiwaFound) return false
  }
  if (w.loops !== undefined && progress.loops < w.loops) return false
  if (w.found && !w.found.every(id => found.has(id))) return false
  if (w.requires && !w.requires.every(r => raised[r])) return false
  return true
}

/**
 * Flags that became true now and are not raised yet, in definition order. A flag that requires
 * another one raised in the same pass is included too (after it). The caller stores them in
 * `flags` and queues their story conversations; detecting the moment is calling this after each
 * progress change.
 */
export const newlyRaisedFlags = (
  defs: readonly FlagDef[],
  progress: FlagProgress
): string[] => {
  const raised: Record<string, boolean> = { ...progress.flags }
  const out: string[] = []
  let changed = true
  while (changed) {
    changed = false
    for (const def of defs) {
      if (raised[def.name] || !isFlagMet(def, progress, raised)) continue
      raised[def.name] = true
      out.push(def.name)
      changed = true
    }
  }
  return out
}

// ---- priority ----------------------------------------------------------------------------

/** What happened last on screen, for the chatter gate. */
export interface LastShown {
  tone: Tone
  /** When it finished showing, ms on the caller's clock. */
  endedAtMs: number
}

/**
 * Chatter is held back while the last conversation was `serious` and the quiet time has not passed.
 * Note: with the current settings (silence 30 s > quiet 20 s) this gate never holds chatter back in
 * practice, because chatter only comes after the silence. It starts to bite if the silence
 * (`chatterIntervalMs`) is shortened below `seriousQuietMs`.
 */
export const chatterAllowed = (
  last: LastShown | null,
  nowMs: number,
  quietMs: number = DEFAULT_SERIOUS_QUIET_MS
): boolean =>
  !(last && last.tone === 'serious' && nowMs - last.endedAtMs < quietMs)

export interface SelectInput {
  ledger: DialogueLedger
  used: UsedState
  /** Current raised flags, used only for per-entry post-flag release gates. */
  flags?: Readonly<Record<string, boolean>>
  rng?: Rng
  /** Flags that just rose and wait for their conversation (oldest first). Highest priority. */
  pendingFlags?: readonly string[]
  /** A false report waits; the anomaly id the report was about (null = none known). */
  pendingFalseReport?: { anomalyId: string | null } | null
  /** A midpoint comment is due, with its stage. */
  pendingMidpoint?: MidpointStage | null
  /** Chatter gate input. */
  last?: LastShown | null
  nowMs?: number
  quietMs?: number
}

export type SelectedSource = 'flag' | 'false-report' | 'midpoint' | 'chatter'

export interface Selected extends Picked {
  source: SelectedSource
  /** The pending flag this conversation consumed (source 'flag'). */
  flag?: string
}

/**
 * The next conversation by priority: flag > false report > midpoint > chatter. A pending item
 * with no conversation available is skipped. Chatter is returned only when the gate allows it;
 * null means "stay silent for now". The caller removes the consumed pending item.
 */
export const selectNext = (input: SelectInput): Selected | null => {
  const rng = input.rng ?? Math.random
  const used = input.used
  const flags = input.flags ?? {}
  for (const flag of input.pendingFlags ?? []) {
    const p = pickStory(input.ledger, flag, used, rng, flags)
    if (p) return { ...p, source: 'flag', flag }
  }
  if (input.pendingFalseReport) {
    const p = pickFalseReport(
      input.ledger,
      input.pendingFalseReport.anomalyId,
      used,
      rng,
      flags
    )
    if (p) return { ...p, source: 'false-report' }
  }
  if (input.pendingMidpoint) {
    const p = pickMidpoint(
      input.ledger,
      input.pendingMidpoint,
      used,
      rng,
      flags
    )
    if (p) return { ...p, source: 'midpoint' }
  }
  if (chatterAllowed(input.last ?? null, input.nowMs ?? 0, input.quietMs)) {
    const p = pickChatter(input.ledger, used, rng, flags)
    if (p) return { ...p, source: 'chatter' }
  }
  return null
}
