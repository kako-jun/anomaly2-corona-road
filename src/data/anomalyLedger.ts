import ledger from 'virtual:anomalies'
import { LedgerEntry } from '../utils/anomalyLedger'
import { createOverlayPreloader, idleSchedule } from '../utils/preload'

// Overlay binaries stay in assets/ (no copy into public/): Vite resolves each one to a hashed URL.
const overlayUrls = import.meta.glob('/assets/anomaly-overlays/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const ANOMALY_LEDGER: readonly LedgerEntry[] = ledger

/** Overlay URL for a ledger entry. The build plugin already checked the file exists. */
export const overlayUrlFor = (entry: LedgerEntry): string => {
  const url = overlayUrls[`/${entry.overlay}`]
  if (!url) throw new Error(`Overlay image not bundled: ${entry.overlay}`)
  return url
}

const resolvableUrls = (): string[] =>
  ANOMALY_LEDGER.flatMap(e => {
    try {
      return [overlayUrlFor(e)]
    } catch {
      return [] // reported when it is actually picked
    }
  })

/** Start loading every overlay image in the background. Safe to call repeatedly (runs once). */
export const preloadOverlays = createOverlayPreloader(resolvableUrls(), {
  createImage: () => new Image(),
  schedule: idleSchedule,
})
