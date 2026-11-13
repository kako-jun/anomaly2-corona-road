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
  storyFlag?: string
}

/**
 * The entries that may appear now: never a story person (#430: they appear on their own, `storyPersonFor`), Reiwa ones only once `reiwaUnlocked` (the elder3 flag is raised), ones with an
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
      e.storyFlag === undefined &&
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

/**
 * The story person (#430) of this flag, if it can be placed now: its camera is not the watched one (#418: nothing
 * pops in on the camera being watched) and holds no unreported anomaly or held person (the person waits until that is
 * resolved; no other anomaly is removed for it). `occupiedCameraIds` = cameras with an unreported anomaly or a person
 * still held; `runningIds` = ids of the running (unreported) anomalies, so a person is never drawn twice.
 */
export const storyPersonFor = (
  images: readonly LedgerEntry[],
  flag: string,
  watchedCameraId: number | undefined,
  occupiedCameraIds: ReadonlySet<number>,
  runningIds: ReadonlySet<string>
): LedgerEntry | null => {
  const entry = images.find(e => e.storyFlag === flag)
  if (!entry || runningIds.has(entry.id)) return null
  if (entry.cameraId === watchedCameraId) return null
  if (occupiedCameraIds.has(entry.cameraId)) return null
  return entry
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
  ...(entry.storyFlag ? { storyFlag: entry.storyFlag } : {}),
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
 * Two stages, so each share keeps its meaning:
 *  1. Reiwa (#286): while both a Reiwa and an ordinary candidate exist (image or non-image alike), one rng call sends
 *     `reiwaShare` of ALL draws to the Reiwa group (the decided ~6% of appearances) and the rest to the ordinary one.
 *  2. Inside the chosen group, while both an image and a non-image candidate exist, one more rng call sends
 *     `nonImageShare` of that group's draws to the non-image side (so it is the share of the ordinary draws), the rest
 *     to `pickLedgerEntry`.
 * A stage with only one side available uses it with no extra rng call, so the old fallbacks (nothing left, camera
 * full) are unchanged. Returns null only when nothing can appear now.
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
  const isReiwa = (e: { reiwa?: true }) => e.reiwa === true
  const canImage = (list: readonly LedgerEntry[]) =>
    spawnableEntries(list, true, gate).some(
      e => !usedIds.has(e.id) && freeCameraIds.includes(e.cameraId)
    )
  const canNon = (list: readonly NonImageEntry[]) =>
    freeCameraIds.length > 0 &&
    spawnableEntries(list, true, gate).some(
      e => !usedIds.has(e.id) && hasNonImageEffect(e)
    )
  // Within one group (all Reiwa or none), so the image draw below never splits on Reiwa again.
  const pickIn = (
    imgs: readonly LedgerEntry[],
    nons: readonly NonImageEntry[]
  ): Spawn | null => {
    const hasImage = canImage(imgs)
    const hasNon = canNon(nons)
    if (hasNon && (!hasImage || rng() < nonImageShare)) {
      const picked = pickNonImageEntry(
        nons,
        freeCameraIds,
        usedIds,
        rng,
        exponent,
        true,
        gate
      )
      return picked ? { kind: 'non_image', ...picked } : null
    }
    const entry = pickLedgerEntry(
      imgs,
      freeCameraIds,
      usedIds,
      rng,
      exponent,
      true,
      reiwaShare,
      gate
    )
    return entry ? { kind: 'image', entry } : null
  }
  const ordinary = [
    images.filter(e => !isReiwa(e)),
    nonImages.filter(e => !isReiwa(e)),
  ] as const
  const reiwa = [images.filter(isReiwa), nonImages.filter(isReiwa)] as const
  const haveOrdinary = canImage(ordinary[0]) || canNon(ordinary[1])
  const haveReiwa = reiwaUnlocked && (canImage(reiwa[0]) || canNon(reiwa[1]))
  const useReiwa = haveReiwa && (!haveOrdinary || rng() < reiwaShare)
  const group = useReiwa ? reiwa : ordinary
  return pickIn(group[0], group[1])
}

/** The group an entry is retired/refilled with (#427): one camera's images, or the camera-free non-image entries. */
const NON_IMAGE_GROUP = 'non-image'

/** The group key of a spawn (#427): `cam:N` for an image entry, `non-image` for any non-image one. */
export const groupKeyOfSpawn = (spawn: Spawn): string =>
  spawn.kind === 'image' ? `cam:${spawn.entry.cameraId}` : NON_IMAGE_GROUP

/**
 * Groups used up by retired ids (#427). A group is one camera's image entries (fixed `cameraId`) or all non-image
 * entries (their camera is drawn at appearance). It is used up when it has at least one candidate (the same gates
 * `pickSpawn` applies that do not change within a moment: the Reiwa lock, the `unlock` flag, a non-image effect) and
 * every candidate is retired. Returns, per used-up group, every id of the group (all of them become drawable again,
 * candidate or not), the group's key, and the group's last retired id in `retired` order (the one just found, to be
 * avoided on the next draw from that group). `nonImages` should already be filtered to the playable ones (`voiceReady`).
 */
export const exhaustedGroups = (
  images: readonly LedgerEntry[],
  nonImages: readonly NonImageEntry[],
  retired: readonly string[],
  reiwaUnlocked: boolean,
  flags: Readonly<Record<string, boolean>> = {}
): { key: string; ids: string[]; last: string }[] => {
  if (retired.length === 0) return []
  const retiredSet = new Set(retired)
  const groups = new Map<string, { all: string[]; candidates: string[] }>()
  const add = (
    key: string,
    e: { id: string; reiwa?: true; unlockFlag?: string },
    playable: boolean
  ) => {
    const g = groups.get(key) ?? { all: [], candidates: [] }
    g.all.push(e.id)
    if (
      playable &&
      (reiwaUnlocked || e.reiwa !== true) &&
      (e.unlockFlag === undefined || flags[e.unlockFlag] === true)
    )
      g.candidates.push(e.id)
    groups.set(key, g)
  }
  // A story person (#430) is not part of the draw, so it must not keep its camera's group from being used up.
  for (const e of images)
    if (e.storyFlag === undefined) add(`cam:${e.cameraId}`, e, true)
  for (const e of nonImages) add(NON_IMAGE_GROUP, e, hasNonImageEffect(e))
  const out: { key: string; ids: string[]; last: string }[] = []
  for (const [key, g] of groups) {
    if (
      g.candidates.length === 0 ||
      !g.candidates.every(id => retiredSet.has(id))
    )
      continue
    const last = [...retired].reverse().find(id => g.candidates.includes(id))
    if (last !== undefined) out.push({ key, ids: g.all, last })
  }
  return out
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
  images.some(
    e =>
      e.storyFlag === undefined &&
      !usedIds.has(e.id) &&
      (reiwaUnlocked || e.reiwa !== true)
  ) ||
  nonImages.some(
    e =>
      !usedIds.has(e.id) &&
      (reiwaUnlocked || e.reiwa !== true) &&
      hasNonImageEffect(e)
  )

/**
 * RT-FEED-28: 1 to 3 cameras in all, uniformly (the drawn one first; the others at random among the FREE cameras only,
 * so the one-anomaly-per-camera rule holds: a camera that already has an anomaly never becomes a second camera).
 * The ledger says only "1 to 3 at random"; the count is uniform over 1, 2, 3 (fewer when too few cameras are free).
 */
export const pickGlitchCameras = (
  cameraId: number,
  freeCameraIds: readonly number[],
  rng: () => number
): number[] => {
  const rest = freeCameraIds.filter(id => id !== cameraId)
  const extra = Math.min(Math.floor(rng() * 3), rest.length)
  const picked = [cameraId]
  for (let i = 0; i < extra; i++) {
    picked.push(rest.splice(Math.floor(rng() * rest.length), 1)[0])
  }
  return picked
}

/**
 * The running anomaly for a non-image entry on the camera drawn for it. A `feed_glitch` carries the kind drawn now
 * (it shows only while that camera is watched); `ui_corruption` / `rule_break` are `monitor` scope (reported from any
 * camera). The camera still holds the slot, so the image rules (one at a time per camera) stay as they are.
 */
export const createNonImageAnomaly = (
  entry: NonImageEntry,
  cameraId: number,
  phase: GamePhase,
  rng: () => number = Math.random,
  freeCameraIds: readonly number[] = []
): Anomaly => {
  const feedGlitch = pickFeedGlitchKind(entry, rng)
  const feedGlitchCameraIds =
    feedGlitch === 'nonoise'
      ? pickGlitchCameras(cameraId, freeCameraIds, rng)
      : undefined
  return {
    id: entry.id,
    category: entry.category,
    ...(entry.categories?.length ? { categories: entry.categories } : {}),
    cameraId,
    phase,
    scope: reportScopeOf(entry.anomalyType),
    ...(entry.exclusiveGroup ? { exclusiveGroup: entry.exclusiveGroup } : {}),
    ...(feedGlitch ? { feedGlitch } : {}),
    ...(feedGlitchCameraIds ? { feedGlitchCameraIds } : {}),
  }
}
