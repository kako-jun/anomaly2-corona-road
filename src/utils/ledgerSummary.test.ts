import { describe, expect, it } from 'vitest'
import { execFile } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { parse as parseYaml } from 'yaml'
import { isGameRecord, parseLedgerRecords } from './anomalyLedger'

const root = resolve(__dirname, '../..')

// scripts/ledger-summary.mjs always reads the real prompts/anomalies.yaml (no path argument),
// so check it against the same ledger parsed in-process.
describe('scripts/ledger-summary.mjs (#77)', () => {
  it('prints counts that match the real ledger', async () => {
    const { stdout } = await promisify(execFile)(
      process.execPath,
      ['scripts/ledger-summary.mjs'],
      { cwd: root }
    )
    const records = parseLedgerRecords(
      parseYaml(readFileSync(resolve(root, 'prompts/anomalies.yaml'), 'utf8'))
    )
    expect(stdout).toContain(`anomalies.yaml: ${records.length} entries`)

    const section = (title: string) =>
      stdout.split(`\n${title}\n`)[1]?.split('\n\n')[0] ?? ''
    const count = (title: string, key: string) => {
      const m = new RegExp(`^\\s+${key}\\s+(\\d+)$`, 'm').exec(section(title))
      return m ? Number(m[1]) : 0
    }
    const game = records.filter(isGameRecord).length
    const image = records.filter(r => r.kind === 'image').length
    const produced = records.filter(r => r.status === 'produced').length
    expect(count('kind', 'image')).toBe(image)
    expect(count('status', 'produced')).toBe(produced)
    expect(stdout).toMatch(/kind x status/)
    expect(stdout).toMatch(/category x kind\/status/)
    expect(stdout).toContain('image/produced')
    expect(game).toBeGreaterThan(0)
    expect(game).toBeLessThanOrEqual(records.length)
  })
})

describe('scripts/ledger-summary.mjs with a ledger path argument (#77)', () => {
  const ledger = `anomalies:
  - id: i1
    camera_id: CAM01
    category: object
    anomaly_type: add_object
    overlay: assets/anomaly-overlays/cam01/i1.webp
    overlay_origin: '(1,2)'
    dimensions: 3x4
  - id: i2
    camera_id: CAM02
    category: object
    anomaly_type: add_object
    overlay: assets/anomaly-overlays/cam02/i2.webp
    overlay_origin: '(1,2)'
    dimensions: 3x4
  - id: i3
    kind: image
    status: produced
    camera_id: CAM02
    category: person
    anomaly_type: add_person
    overlay: assets/anomaly-overlays/cam02/i3.webp
    overlay_origin: '(1,2)'
    dimensions: 3x4
  - id: p1
    status: planned
    camera_id: CAM03
    category: object
    anomaly_type: add_object
  - id: p2
    status: planned
    camera_id: CAM03
    category: environment
    anomaly_type: color_shift
  - id: r1
    kind: non_image
    status: planned
    anomaly_type: feed_glitch
    category: camera
    detail: d
  - id: r2
    kind: non_image
    status: produced
    anomaly_type: sound
    category: environment
    detail: d
  - id: r3
    kind: non_image
    status: planned
    anomaly_type: rule_break
    detail: d
`

  // Turn one printed cross table into { row: { column: n } } ('-' means 0).
  const table = (stdout: string, title: string) => {
    const lines = (stdout.split(`\n${title}\n`)[1] ?? '')
      .split('\n\n')[0]
      .split('\n')
    const cols = lines[0].trim().split(/\s+/)
    const out: Record<string, Record<string, number>> = {}
    for (const line of lines.slice(1)) {
      const cells = line.trim().split(/\s+/)
      const row = cells[0]
      out[row] = {}
      cols.forEach((c, i) => {
        out[row][c] = cells[i + 1] === '-' ? 0 : Number(cells[i + 1])
      })
    }
    return out
  }

  it('prints totals and cross tabs for a mixed ledger', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'ledger-summary-'))
    try {
      const path = join(dir, 'ledger.yaml')
      writeFileSync(path, ledger)
      const { stdout } = await promisify(execFile)(
        process.execPath,
        ['scripts/ledger-summary.mjs', path],
        { cwd: root }
      )
      expect(stdout).toContain('anomalies.yaml: 8 entries')
      expect(table(stdout, 'kind x status')).toEqual({
        image: { planned: 2, produced: 3 },
        non_image: { planned: 2, produced: 1 },
      })
      expect(table(stdout, 'category x status')).toEqual({
        '(none)': { planned: 1, produced: 0 },
        Camera: { planned: 1, produced: 0 },
        Environment: { planned: 1, produced: 1 },
        Object: { planned: 1, produced: 2 },
        Person: { planned: 0, produced: 1 },
      })
      expect(table(stdout, 'anomaly_type x status')).toEqual({
        add_object: { planned: 1, produced: 2 },
        add_person: { planned: 0, produced: 1 },
        color_shift: { planned: 1, produced: 0 },
        feed_glitch: { planned: 1, produced: 0 },
        rule_break: { planned: 1, produced: 0 },
        sound: { planned: 0, produced: 1 },
      })
      expect(table(stdout, 'category x kind/status')['Object']).toEqual({
        'image/planned': 1,
        'image/produced': 2,
        'non_image/planned': 0,
        'non_image/produced': 0,
      })
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('fails on an invalid ledger passed by path', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'ledger-summary-'))
    try {
      const path = join(dir, 'bad.yaml')
      writeFileSync(path, 'anomalies:\n  - id: x\n    kind: non_image\n')
      await expect(
        promisify(execFile)(
          process.execPath,
          ['scripts/ledger-summary.mjs', path],
          {
            cwd: root,
          }
        )
      ).rejects.toThrow(/entry "x"/)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
