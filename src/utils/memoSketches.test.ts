import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parse as parseYaml } from 'yaml'
import { MEMO_IMAGE_DIR, parseLedgerRecords } from './anomalyLedger'

const ROOT = resolve(__dirname, '../..')
const DIR = resolve(ROOT, 'public', MEMO_IMAGE_DIR)
const files = readdirSync(DIR).filter(n => n.endsWith('.webp'))
const records = parseLedgerRecords(
  parseYaml(readFileSync(resolve(ROOT, 'prompts/anomalies.yaml'), 'utf8'))
)

/**
 * The memo scribbles are fetched only when a result shows one (never preloaded), so they are NOT part of the UI image
 * budget (800KB, uiAssets.test.ts: what is preloaded + the fonts). They have a budget of their own, one place:
 *  - per file: 32KB. The largest of the 50 drawings is about 22KB (the same line-art style, 384px at most, margins
 *    trimmed); 32KB leaves about 1.4x for a busier drawing and still fails a stray photo or an untrimmed lossless file.
 *  - in all: 700KB. The 50 drawings planned in Issue #325 are all connected and measure about 546KB (about 11KB each);
 *    700KB is 1.28x of that: room for a few more or a little larger ones, not for a different kind of image.
 */
const MAX_SKETCH_BYTES = 32 * 1024
const MAX_SKETCHES_TOTAL_BYTES = 700 * 1024

describe('memo scribble budget (#325)', () => {
  it('keeps every file under the per-file limit', () => {
    for (const f of files)
      expect(statSync(resolve(DIR, f)).size, f).toBeLessThanOrEqual(
        MAX_SKETCH_BYTES
      )
  })
  it('keeps the whole folder under the total limit', () => {
    const total = files.reduce((n, f) => n + statSync(resolve(DIR, f)).size, 0)
    expect(total).toBeLessThanOrEqual(MAX_SKETCHES_TOTAL_BYTES)
  })
  it('is not counted in the UI image budget, and is never preloaded', () => {
    const html = readFileSync(resolve(ROOT, 'index.html'), 'utf8')
    expect(html).not.toContain(MEMO_IMAGE_DIR)
    expect(
      readFileSync(resolve(ROOT, 'src/utils/uiPreload.ts'), 'utf8')
    ).not.toContain(MEMO_IMAGE_DIR)
    // the UI budget sums public/ui + the note fonts + the title notes: none of them is this folder
    expect(DIR.startsWith(resolve(ROOT, 'public/ui') + '/')).toBe(false)
    expect(DIR.startsWith(resolve(ROOT, 'public/note') + '/')).toBe(false)
  })
})

describe('the real ledger and public/note-sketches (#325)', () => {
  const withImage = records.filter(r => r.memoImage)
  it('has a webp file for every memo_image, and only for an entry that has a one-liner', () => {
    for (const r of withImage) {
      expect(r.memo, `${r.id} has memo_image but no memo`).toBeDefined()
      expect(existsSync(resolve(DIR, r.memoImage as string)), r.id).toBe(true)
      expect(r.memoImage, r.id).toMatch(/\.webp$/)
    }
  })
  it('names each file after its anomaly (public/note-sketches/<id>.webp), one file per entry', () => {
    const seen = new Set<string>()
    for (const r of withImage) {
      expect(r.memoImage, r.id).toBe(`${r.id}.webp`)
      expect(seen.has(r.memoImage as string), r.id).toBe(false)
      seen.add(r.memoImage as string)
    }
  })
  it('has no file that no entry names (a drawing without a ledger line is never shown)', () => {
    const named = new Set(withImage.map(r => r.memoImage))
    expect(files.filter(f => !named.has(f))).toEqual([])
  })
  it('only holds webp files', () => {
    expect(readdirSync(DIR).filter(n => !n.endsWith('.webp'))).toEqual([])
  })
})
