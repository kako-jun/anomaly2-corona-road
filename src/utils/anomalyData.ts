import { Anomaly, GamePhase } from '../types/game'
import { LedgerEntry } from './anomalyLedger'

/** Pick one element of a non-empty list uniformly. */
const pickOne = <T>(list: readonly T[], rng: () => number): T =>
  list[Math.floor(rng() * list.length)]

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
 * used this shift. Four uniform steps so the ledger's skew (many `add_object`, few `displace`)
 * does not become the appearance rate: camera (among those with unused entries), then category
 * within it, then `anomalyType` within that, then an entry. Empty categories / types never
 * appear as candidates. Returns null only when nothing is left. `rng` returns [0, 1) and is
 * injectable for tests.
 */
export const pickLedgerEntry = (
  entries: readonly LedgerEntry[],
  freeCameraIds: readonly number[],
  usedIds: ReadonlySet<string>,
  rng: () => number = Math.random
): LedgerEntry | null => {
  const candidates = entries.filter(
    e => !usedIds.has(e.id) && freeCameraIds.includes(e.cameraId)
  )
  if (candidates.length === 0) return null
  const byCamera = groupBy(candidates, e => e.cameraId)
  const inCamera = pickOne([...byCamera.values()], rng)
  const byCategory = groupBy(inCamera, e => e.category)
  const inCategory = pickOne([...byCategory.values()], rng)
  const byType = groupBy(inCategory, e => e.anomalyType)
  return pickOne(pickOne([...byType.values()], rng), rng)
}

/** The running anomaly for a ledger entry. `id` is the ledger id (unique per shift). */
export const createAnomaly = (
  entry: LedgerEntry,
  phase: GamePhase,
  overlayUrl: string
): Anomaly => ({
  id: entry.id,
  category: entry.category,
  cameraId: entry.cameraId,
  phase,
  overlay: {
    url: overlayUrl,
    origin: entry.origin,
    size: entry.size,
  },
})
