import { describe, expect, it } from 'vitest'
import { execFile } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
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
