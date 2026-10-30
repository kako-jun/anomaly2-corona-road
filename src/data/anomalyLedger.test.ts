import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import ledger from 'virtual:anomalies'
import { describe, expect, it } from 'vitest'
import { AnomalyCategory } from '../types/game'
import { CAMERAS } from '../utils/gameConfig'
import { ANOMALY_LEDGER, overlayUrlFor } from './anomalyLedger'

// Integration check of the REAL ledger (prompts/anomalies.yaml) as the game sees it.
// No entry count is hard-coded: the ledger grows.

const ROOT = resolve(__dirname, '../..')
const CATEGORIES: AnomalyCategory[] = [
  'Camera',
  'Object',
  'Environment',
  'Person',
  'Surreal',
]

/** Pixel size from a WebP header (VP8 / VP8L / VP8X). */
const webpSize = (path: string): { w: number; h: number } => {
  const b = readFileSync(path)
  const kind = b.toString('ascii', 12, 16)
  if (kind === 'VP8 ')
    return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff }
  if (kind === 'VP8L') {
    const bits = b.readUInt32LE(21)
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 }
  }
  if (kind === 'VP8X')
    return { w: b.readUIntLE(24, 3) + 1, h: b.readUIntLE(27, 3) + 1 }
  throw new Error(`not a webp: ${path}`)
}

const baseSizeOf = (cameraId: number) => {
  const cam = CAMERAS.find(c => c.id === cameraId)!
  return webpSize(resolve(ROOT, 'public' + cam.image))
}

describe('real anomaly ledger', () => {
  it('is exposed to the game unchanged from the virtual module', () => {
    expect(ANOMALY_LEDGER).toBe(ledger)
  })

  it('has at least one entry (an empty ledger would make the game unwinnable)', () => {
    expect(ANOMALY_LEDGER.length).toBeGreaterThan(0)
  })

  it('has unique ids', () => {
    const ids = ANOMALY_LEDGER.map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(ANOMALY_LEDGER.map(e => [e.id, e] as const))(
    '%s: is consistent',
    (_id, e) => {
      // camera is one of the game's cameras (1..8)
      expect(CAMERAS.map(c => c.id)).toContain(e.cameraId)
      expect(e.cameraId).toBeGreaterThanOrEqual(1)
      expect(e.cameraId).toBeLessThanOrEqual(8)
      // category is the game's enum (capitalised)
      expect(CATEGORIES).toContain(e.category)
      // overlay file exists and resolves to a bundled URL
      expect(existsSync(resolve(ROOT, e.overlay))).toBe(true)
      expect(overlayUrlFor(e)).toEqual(expect.any(String))
      expect(overlayUrlFor(e)).not.toBe('')
      // inside the base photo
      const base = baseSizeOf(e.cameraId)
      expect(e.origin.x).toBeGreaterThanOrEqual(0)
      expect(e.origin.y).toBeGreaterThanOrEqual(0)
      expect(e.size.w).toBeGreaterThan(0)
      expect(e.size.h).toBeGreaterThan(0)
      expect(e.origin.x + e.size.w).toBeLessThanOrEqual(base.w)
      expect(e.origin.y + e.size.h).toBeLessThanOrEqual(base.h)
      // the declared size is the actual overlay file's size
      expect(webpSize(resolve(ROOT, e.overlay))).toEqual(e.size)
    }
  )

  it('base photos (size read from the real public/images WebP headers) are within the 676x900 that ledger coordinates assume', () => {
    for (const c of CAMERAS) {
      const s = baseSizeOf(c.id)
      expect(s.w).toBeLessThanOrEqual(676)
      expect(s.h).toBeLessThanOrEqual(900)
    }
  })

  it('overlayUrlFor throws for an overlay that is not bundled', () => {
    expect(() =>
      overlayUrlFor({ ...ANOMALY_LEDGER[0], overlay: 'assets/nope.webp' })
    ).toThrow(/not bundled/)
  })
})
