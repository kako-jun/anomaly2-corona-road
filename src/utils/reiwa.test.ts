// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import {
  parseLedger,
  parseLedgerRecords,
  reiwaIdsOf,
  type LedgerEntry,
} from './anomalyLedger'
import {
  REIWA_UNLOCK_FLAG,
  pickLedgerEntry,
  spawnableEntries,
} from './anomalyData'

const raw = (id: string, over: Record<string, unknown> = {}) => ({
  id,
  camera_id: 'CAM01',
  category: 'object',
  anomaly_type: 'add_object',
  overlay: `assets/anomaly-overlays/cam01/${id}.webp`,
  overlay_origin: '(1,2)',
  dimensions: '3x4',
  ...over,
})
const ledgerOf = (...anomalies: unknown[]) => ({ anomalies })

describe('Reiwa ids from the ledger (#83)', () => {
  it('marks only entries with reiwa: true', () => {
    const entries = parseLedger(
      ledgerOf(
        raw('a', { reiwa: true }),
        raw('b', { candidate_id: 'CR-RZ-01' }),
        raw('c'),
        raw('e', { reiwa: true })
      )
    )
    expect(reiwaIdsOf(entries)).toEqual(['a', 'e'])
  })
  it('does not include planned or non-image entries', () => {
    const entries = parseLedger(
      ledgerOf(
        raw('a', { reiwa: true }),
        raw('p', { reiwa: true, status: 'planned' }),
        {
          id: 'n',
          reiwa: true,
          status: 'planned',
          kind: 'non_image',
          category: 'environment',
          anomaly_type: 'sound',
          detail: 'x',
        }
      )
    )
    expect(reiwaIdsOf(entries)).toEqual(['a'])
  })
  it('the parser accepts reiwa on any kind and rejects false / non-boolean', () => {
    const nonImage = {
      id: 'n',
      status: 'planned',
      kind: 'non_image',
      category: 'environment',
      anomaly_type: 'sound',
      detail: 'x',
    }
    expect(
      parseLedgerRecords(ledgerOf({ ...nonImage, reiwa: true }))[0].reiwa
    ).toBe(true)
    expect(parseLedgerRecords(ledgerOf(raw('a')))[0].reiwa).toBeUndefined()
    for (const bad of [false, 'true', 1, 'yes'])
      expect(() =>
        parseLedgerRecords(ledgerOf(raw('a', { reiwa: bad })))
      ).toThrow(/"a".*reiwa/)
  })
  it('has no duplicate ids', () => {
    const e = parseLedger(ledgerOf(raw('a', { reiwa: true })))
    expect(reiwaIdsOf([...e, ...e])).toEqual(['a'])
  })
  it('real ledger: exactly the six reiwa: true entries, all image + produced', () => {
    const yaml = parseYaml(
      readFileSync(resolve(__dirname, '../../prompts/anomalies.yaml'), 'utf8')
    )
    const marked = parseLedgerRecords(yaml).filter(r => r.reiwa)
    expect(marked).toHaveLength(6)
    expect(
      marked.every(r => r.kind === 'image' && r.status === 'produced')
    ).toBe(true)
    const ids = reiwaIdsOf(parseLedger(yaml))
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.sort()).toEqual([
      'AR-01-power-bank',
      'AR-02-smartphone-facedown',
      'AR-03-silver-can',
      'AR-04-earbud-single',
      'AR-05-pet-bottle',
      'AR-07-mask-on-floor',
    ])
  })
})

const mk = (id: string, cameraId: number, reiwa = false): LedgerEntry => ({
  id,
  cameraId,
  category: 'Object',
  anomalyType: 'add_object',
  overlay: `assets/anomaly-overlays/cam01/${id}.webp`,
  origin: { x: 1, y: 2 },
  size: { w: 3, h: 4 },
  ...(reiwa ? { reiwa: true as const } : {}),
})

/** Deterministic rng whose successive calls differ (a constant one would pin every stage to one value). */
const lcg = (seed: number) => {
  let x = (seed + 1) * 104729
  return () => {
    x = (x * 48271) % 2147483647
    return x / 2147483647
  }
}

describe('Reiwa gate on the draw (#83)', () => {
  const entries = [mk('old', 1), mk('rz', 1, true), mk('rz2', 2, true)]
  const sweep = (unlocked: boolean) => {
    const got = new Set<string>()
    for (let i = 0; i < 200; i++) {
      const r = pickLedgerEntry(
        entries,
        [1, 2],
        new Set(),
        lcg(i),
        0.75,
        unlocked
      )
      if (r) got.add(r.id)
    }
    return got
  }
  it('uses elder3 as the unlock flag', () => {
    expect(REIWA_UNLOCK_FLAG).toBe('elder3')
  })
  it('never returns a Reiwa entry before elder3', () => {
    expect([...sweep(false)]).toEqual(['old'])
  })
  it('returns Reiwa entries after elder3', () => {
    const got = sweep(true)
    expect(got.has('rz')).toBe(true)
    expect(got.has('rz2')).toBe(true)
  })
  it('defaults to locked', () => {
    expect(pickLedgerEntry([mk('rz', 1, true)], [1], new Set())).toBeNull()
  })
  it('spawnableEntries filters only while locked', () => {
    expect(spawnableEntries(entries, false).map(e => e.id)).toEqual(['old'])
    expect(spawnableEntries(entries, true)).toHaveLength(3)
  })
})

describe('child through three Reiwa reports (#83)', () => {
  const fresh = async () => {
    localStorage.clear()
    vi.resetModules()
    vi.doMock('virtual:anomalies', () => ({
      default: [
        mk('x', 1),
        mk('r1', 1, true),
        mk('r2', 2, true),
        mk('r3', 3, true),
      ],
    }))
    vi.doMock('virtual:dialogue', () => ({
      default: {
        flags: [
          { name: 'elder3', when: { foundUnique: 2 } },
          {
            name: 'child',
            when: { foundUnique: 4, reiwaFound: 3, requires: ['elder3'] },
          },
        ],
        entries: [],
      },
    }))
    const progress = await import('./shiftProgress')
    const saveData = await import('./saveData')
    return { ...progress, load: saveData.load }
  }
  it('raises child on the third distinct Reiwa report', async () => {
    const { recordFound, load } = await fresh()
    expect(recordFound('x')).toEqual([])
    expect(recordFound('r1')).toEqual(['elder3'])
    expect(recordFound('r2')).toEqual([])
    expect(recordFound('r2')).toEqual([])
    expect(load().flags.child).toBeUndefined()
    expect(recordFound('r3')).toEqual(['child'])
  })
  it('does not raise child when the three are not all Reiwa', async () => {
    const { recordFound, load } = await fresh()
    recordFound('x')
    recordFound('r1')
    recordFound('r2')
    recordFound('x')
    expect(load().flags.child).toBeUndefined()
  })
})
