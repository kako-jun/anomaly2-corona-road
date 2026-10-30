import { LedgerEntry } from './anomalyLedger'

export interface OverlayPlacement {
  /** All values are percentages (0-100+) of the base photo's size. */
  left: number
  top: number
  width: number
  height: number
}

/**
 * Where to put an overlay inside a frame that has the base photo's aspect ratio, so it lands on the
 * same pixels as in the ledger regardless of display size. Returns null until the base photo's
 * natural size is known (or if it is invalid).
 */
export const overlayPlacement = (
  entry: Pick<LedgerEntry, 'origin' | 'size'>,
  baseWidth: number,
  baseHeight: number
): OverlayPlacement | null => {
  if (!(baseWidth > 0) || !(baseHeight > 0)) return null
  return {
    left: (entry.origin.x / baseWidth) * 100,
    top: (entry.origin.y / baseHeight) * 100,
    width: (entry.size.w / baseWidth) * 100,
    height: (entry.size.h / baseHeight) * 100,
  }
}
