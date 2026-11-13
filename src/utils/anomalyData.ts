import { Anomaly, GamePhase } from '../types/game'
import { LedgerEntry, NonImageEntry } from './anomalyLedger'
import {
  DRAW_WEIGHT_EXPONENT,
  NON_IMAGE_DRAW_SHARE,
  REIWA_DRAW_SHARE,
  checkedShare,
} from './gameConfig'
import {
  hasNonImageEffect,
  pickFeedGlitchKind,
  reportScopeOf,
} from './nonImageEffects'

/** Pick one element of a non-empty list uniformly. */
const pickOne = <T>(list: readonly T[], rng: () => number): T =>
  list[Math.floor(rng() * list.length)]

/**
 * Pick one group with weight (group size) ^ exponent, by cumulative sum. Consumes exactly one rng
 * call; the last group absorbs rounding so a value just below 1 never falls out of range.
 */
const pickWeighted = <T>(
  groups: readonly (readonly T[])[],
  exponent: number,
  rng: () => number
): readonly T[] => {
  const weights = groups.map(g => Math.pow(g.length, exponent))
  let r = rng() * weights.reduce((a, b) => a + b, 0)
  for (let i = 0; i < groups.length; i++) {
    r -= weights[i]
    if (r < 0) return groups[i]
  }
  return groups[groups.length - 1]
}

/** Group by key, keeping first-seen key order (so a seeded rng is deterministic). */
const groupBy = <T, K>(list: readonly T[], key: (t: T) => K): Map<K, T[]> => {
  const map = new Map<K, T[]>()
  for (const t of list) {
    const k = key(t)
    const g = map.get(k)
    if (g) g.push(t)
    else map.set(k, [t])
  }
  return map
}

/** The flag (dialogue/flags.yaml) after which Reiwa anomalies may appear: the third elder found (docs/story.md). */
export const REIWA_UNLOCK_FLAG = 'elder3'

/** What decides whether an entry may be drawn now, besides Reiwa (all optional: no gate = nothing blocked). */
export interface EntryGate {
  /** Saved flags (dialogue/flags.yaml): an entry with `unlockFlag` waits until its flag is true. */
  flags?: Readonly<Record<string, boolean>>
  /** False = nothing can be heard (volume 0 or muted): `sound` entries are left out. Default true. */
  audible?: boolean
  /** Exclusive groups with an unreported anomaly running now: entries of those groups are left out. */
  busyGroups?: ReadonlySet<string>
}

interface Gated {
  reiwa?: true
  anomalyType: string
  unlockFlag?: string
  exclusiveGroup?: string
}

/**
 * The entries that may appear now: Reiwa ones only once `reiwaUnlocked` (the elder3 flag is raised), ones with an
 * `unlock` flag only once it is saved, `sound` ones only while `gate.audible` is not false (kako-jun, #79), and none
 * whose exclusive group is busy (an unreported anomaly of that group is running, #77).
 */
export const spawnableEntries = <T extends Gated>(
  entries: readonly T[],
  reiwaUnlocked: boolean,
  gate: EntryGate = {}
): readonly T[] =>
  entries.filter(
    e =>
      (reiwaUnlocked || e.reiwa !== true) &&
      (e.unlockFlag === undefined || gate.flags?.[e.unlockFlag] === true) &&
      !(e.anomalyType === 'sound' && gate.audible === false) &&
      !(
        e.exclusiveGroup !== undefined && gate.busyGroups?.has(e.exclusiveGroup)
      )
  )

/**
 * Pick the next ledger entry to show: only on a camera that has no anomaly now, never one already
 * used this shift. Four steps so the ledger's skew (many `add_object`, few `displace`)
 * is damped instead of becoming the appearance rate: camera (uniform, among those with unused
 * entries), then category within it and `anomalyType` within that (each weighted by unused count
 * ^ `exponent`, see `DRAW_WEIGHT_EXPONENT`), then an entry (uniform). Empty categories / types never
 * appear as candidates. Reiwa entries are candidates only when `reiwaUnlocked`. Once unlocked they
 * form one group in front of those steps (#286): while both Reiwa and ordinary candidates exist,
 * one extra rng call sends `reiwaShare` of the draws to the Reiwa group and the rest to the
 * ordinary weighted draw; when only one side has candidates it is used with no extra call (so the
 * fallbacks - nothing left, camera full - are unchanged). Returns null only when nothing is left.
 * `rng` returns [0, 1) and is injectable for tests.
 */
export const pickLedgerEntry = (
  entries: readonly LedgerEntry[],
  freeCameraIds: readonly number[],
  usedIds: ReadonlySet<string>,
  rng: () => number = Math.random,
  exponent: number = DRAW_WEIGHT_EXPONENT,
  reiwaUnlocked: boolean = false,
  reiwaShare: number = REIWA_DRAW_SHARE,
  gate: EntryGate = {}
): LedgerEntry | null => {
  const all = spawnableEntries(entries, reiwaUnlocked, gate).filter(
    e => !usedIds.has(e.id) && freeCameraIds.includes(e.cameraId)
  )
  if (all.length === 0) return null
  const reiwa = all.filter(e => e.reiwa === true)
  const ordinary = all.filter(e => e.reiwa !== true)
  const candidates =
    reiwa.length === 0
      ? ordinary
      : ordinary.length === 0
        ? reiwa
        : rng() < reiwaShare
          ? reiwa
          : ordinary
  const byCamera = groupBy(candidates, e => e.cameraId)
  const inCamera = pickOne([...byCamera.values()], rng)
  const byCategory = groupBy(inCamera, e => e.category)
  const inCategory = pickWeighted([...byCategory.values()], exponent, rng)
  const byType = groupBy(inCategory, e => e.anomalyType)
  return pickOne(pickWeighted([...byType.values()], exponent, rng), rng)
}

/** The running anomaly for a ledger entry. `id` is the ledger id (unique per shift). */
export const createAnomaly = (
  entry: LedgerEntry,
  phase: GamePhase,
  overlayUrl: string
): Anomaly => ({
  id: entry.id,
  category: entry.category,
  ...(entry.categories?.length ? { categories: entry.categories } : {}),
  cameraId: entry.cameraId,
  phase,
  ...(entry.exclusiveGroup ? { exclusiveGroup: entry.exclusiveGroup } : {}),
  overlay: {
    url: overlayUrl,
    origin: entry.origin,
    size: entry.size,
  },
})

/**
 * Pick the next non-image entry (#77): never one already used this shift, only one the game has an effect for, and
 * Reiwa ones only when `reiwaUnlocked`. The type is chosen first (weighted like the image draw), then an entry
 * uniformly. The camera is NOT part of the entry: it is drawn here, uniformly among the free cameras, every time
 * (kako-jun, #70). Returns null when no entry is left or no camera is free.
 */
export const pickNonImageEntry = (
  entries: readonly NonImageEntry[],
  freeCameraIds: readonly number[],
  usedIds: ReadonlySet<string>,
  rng: () => number = Math.random,
  exponent: number = DRAW_WEIGHT_EXPONENT,
  reiwaUnlocked: boolean = false,
  gate: EntryGate = {}
): { entry: NonImageEntry; cameraId: number } | null => {
  if (freeCameraIds.length === 0) return null
  const candidates = spawnableEntries(entries, reiwaUnlocked, gate).filter(
    e => !usedIds.has(e.id) && hasNonImageEffect(e)
  )
  if (candidates.length === 0) return null
  const byType = groupBy(candidates, e => e.anomalyType)
  const entry = pickOne(pickWeighted([...byType.values()], exponent, rng), rng)
  return { entry, cameraId: pickOne(freeCameraIds, rng) }
}

/** What the next appearance is: an image entry (its camera is the ledger's) or a non-image one on a camera drawn now. */
export type Spawn =
  | { kind: 'image'; entry: LedgerEntry }
  | { kind: 'non_image'; entry: NonImageEntry; cameraId: number }

export interface SpawnOptions extends EntryGate {
  rng?: () => number
  exponent?: number
  reiwaUnlocked?: boolean
  reiwaShare?: number
  /** Share of draws that are non-image while both sides have candidates (0-1, validated). */
  nonImageShare?: number
}

/**
 * Pick the next appearance across both kinds, in the same slot rules (a free camera, nothing used twice in a shift).
 * While both an image and a non-image candidate exist, one extra rng call sends `nonImageShare` of the draws to the
 * non-image side and the rest to `pickLedgerEntry` (unchanged, Reiwa share included); when only one side has a
 * candidate it is used with no extra call, so the old fallbacks (nothing left, camera full) are unchanged.
 * Returns null only when nothing can appear now.
 */
export const pickSpawn = (
  images: readonly LedgerEntry[],
  nonImages: readonly NonImageEntry[],
  freeCameraIds: readonly number[],
  usedIds: ReadonlySet<string>,
  opts: SpawnOptions = {}
): Spawn | null => {
  const {
    rng = Math.random,
    exponent = DRAW_WEIGHT_EXPONENT,
    reiwaUnlocked = false,
    reiwaShare = REIWA_DRAW_SHARE,
    nonImageShare = NON_IMAGE_DRAW_SHARE,
    flags,
    audible,
    busyGroups,
  } = opts
  const gate: EntryGate = { flags, audible, busyGroups }
  checkedShare('nonImageShare', nonImageShare)
  const imageFirst = () =>
    pickLedgerEntry(
      images,
      freeCameraIds,
      usedIds,
      rng,
      exponent,
      reiwaUnlocked,
      reiwaShare,
      gate
    )
  const nonImageFirst = () =>
    pickNonImageEntry(
      nonImages,
      freeCameraIds,
      usedIds,
      rng,
      exponent,
      reiwaUnlocked,
      gate
    )
  const hasImage = spawnableEntries(images, reiwaUnlocked, gate).some(
    e => !usedIds.has(e.id) && freeCameraIds.includes(e.cameraId)
  )
  const hasNon =
    freeCameraIds.length > 0 &&
    spawnableEntries(nonImages, reiwaUnlocked, gate).some(
      e => !usedIds.has(e.id) && hasNonImageEffect(e)
    )
  const nonImageNow = hasNon && (!hasImage || rng() < nonImageShare)
  if (nonImageNow) {
    const picked = nonImageFirst()
    return picked ? { kind: 'non_image', ...picked } : null
  }
  const entry = imageFirst()
  return entry ? { kind: 'image', entry } : null
}

/**
 * True while an unused entry (of either kind) that could appear when a camera frees up still exists. Only the Reiwa
 * lock counts as "never" (as before): an entry waiting for a flag, for sound, or for its exclusive group is still
 * unused, because any of those can change during the shift, so the spawner keeps retrying instead of giving up.
 */
export const hasUnusedEntry = (
  images: readonly LedgerEntry[],
  nonImages: readonly NonImageEntry[],
  usedIds: ReadonlySet<string>,
  reiwaUnlocked: boolean
): boolean =>
  images.some(e => !usedIds.has(e.id) && (reiwaUnlocked || e.reiwa !== true)) ||
  nonImages.some(
    e =>
      !usedIds.has(e.id) &&
      (reiwaUnlocked || e.reiwa !== true) &&
      hasNonImageEffect(e)
  )

/**
 * The running anomaly for a non-image entry on the camera drawn for it. A `feed_glitch` carries the kind drawn now
 * (it shows only while that camera is watched); `ui_corruption` / `rule_break` are `monitor` scope (reported from any
 * camera). The camera still holds the slot, so the image rules (one at a time per camera) stay as they are.
 */
export const createNonImageAnomaly = (
  entry: NonImageEntry,
  cameraId: number,
  phase: GamePhase,
  rng: () => number = Math.random
): Anomaly => {
  const feedGlitch = pickFeedGlitchKind(entry, rng)
  return {
    id: entry.id,
    category: entry.category,
    ...(entry.categories?.length ? { categories: entry.categories } : {}),
    cameraId,
    phase,
    scope: reportScopeOf(entry.anomalyType),
    ...(entry.exclusiveGroup ? { exclusiveGroup: entry.exclusiveGroup } : {}),
    ...(feedGlitch ? { feedGlitch } : {}),
  }
}
