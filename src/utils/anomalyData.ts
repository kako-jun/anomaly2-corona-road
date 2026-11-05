import { Anomaly, GamePhase } from '../types/game'
import { LedgerEntry } from './anomalyLedger'
import { DRAW_WEIGHT_EXPONENT } from './gameConfig'

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

/**
 * Pick the next ledger entry to show: only on a camera that has no anomaly now, never one already
 * used this shift. Four steps so the ledger's skew (many `add_object`, few `displace`)
 * is damped instead of becoming the appearance rate: camera (uniform, among those with unused
 * entries), then category within it and `anomalyType` within that (each weighted by unused count
 * ^ `exponent`, see `DRAW_WEIGHT_EXPONENT`), then an entry (uniform). Empty categories / types never
 * appear as candidates. Returns null only when nothing is left. `rng` returns [0, 1) and is
 * injectable for tests.
 */
export const pickLedgerEntry = (
  entries: readonly LedgerEntry[],
  freeCameraIds: readonly number[],
  usedIds: ReadonlySet<string>,
  rng: () => number = Math.random,
  exponent: number = DRAW_WEIGHT_EXPONENT
): LedgerEntry | null => {
  const candidates = entries.filter(
    e => !usedIds.has(e.id) && freeCameraIds.includes(e.cameraId)
  )
  if (candidates.length === 0) return null
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
  ...(entry.alsoCategories?.length
    ? { alsoCategories: entry.alsoCategories }
    : {}),
  cameraId: entry.cameraId,
  phase,
  overlay: {
    url: overlayUrl,
    origin: entry.origin,
    size: entry.size,
  },
})
