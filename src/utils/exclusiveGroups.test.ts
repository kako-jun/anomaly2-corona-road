import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'

const read = (f: string) => readFileSync(join(process.cwd(), f), 'utf8')
const ledger = parse(read('prompts/anomalies.yaml')) as {
  anomalies: { id: string; exclusive?: string }[]
}

/** The groups listed in prompts/README.md ("排他グループ一覧"): `- \`name\`: ID, ID`. */
const listed = [
  ...read('prompts/README.md').matchAll(
    /^- `([a-z0-9-]+)`: (RT-[A-Z0-9-]+(?:, RT-[A-Z0-9-]+)*)$/gm
  ),
].map(m => ({ group: m[1], ids: m[2].split(', ') }))

describe('exclusive groups: the README list and the ledger agree', () => {
  it('lists at least the cabinet-transform and model-plate groups', () => {
    expect(listed.map(l => l.group)).toEqual(
      expect.arrayContaining(['cabinet-transform', 'model-plate'])
    )
  })
  it('every id listed under a group carries that group in the ledger', () => {
    for (const { group, ids } of listed) {
      for (const id of ids) {
        const e = ledger.anomalies.find(x => x.id === id)
        expect(e, `${id} (group ${group}) is not in the ledger`).toBeDefined()
        expect(e?.exclusive, `${id} must have exclusive: '${group}'`).toBe(
          group
        )
      }
    }
  })
  it('every group used in the ledger is listed in the README (no group only the ledger knows)', () => {
    const used = new Set(
      ledger.anomalies.flatMap(e => (e.exclusive ? [e.exclusive] : []))
    )
    for (const g of used)
      expect(
        listed.map(l => l.group),
        `group ${g} is in the ledger but not in the README list`
      ).toContain(g)
  })
})
