import { Anomaly, GamePhase } from '../types/game'
import { LedgerEntry } from './anomalyLedger'

/**
 * Pick the next ledger entry to show: only on a camera that has no anomaly now, never one already
 * used this shift. The camera is chosen uniformly among cameras that still have unused entries (so
 * a camera with many entries is not favoured), then an entry uniformly within it.
 * Returns null when nothing is left. `rng` returns [0, 1) and is injectable for tests.
 */
export const pickLedgerEntry = (
  entries: readonly LedgerEntry[],
  freeCameraIds: readonly number[],
  usedIds: ReadonlySet<string>,
  rng: () => number = Math.random
): LedgerEntry | null => {
  const byCamera = new Map<number, LedgerEntry[]>()
  for (const e of entries) {
    if (usedIds.has(e.id) || !freeCameraIds.includes(e.cameraId)) continue
    const list = byCamera.get(e.cameraId)
    if (list) list.push(e)
    else byCamera.set(e.cameraId, [e])
  }
  const cameras = [...byCamera.keys()]
  if (cameras.length === 0) return null
  const list = byCamera.get(cameras[Math.floor(rng() * cameras.length)])!
  return list[Math.floor(rng() * list.length)]
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
