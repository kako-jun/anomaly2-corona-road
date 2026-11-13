import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import type { Anomaly } from '../types/game'
import type { NonImageEntry } from './anomalyLedger'
import { createNonImageAnomaly } from './anomalyData'
import {
  MONITOR_EFFECTS,
  fxAttribute,
  hasMonitorEffect,
  runningMonitorEffects,
} from './monitorEffects'
import { hasNonImageEffect } from './nonImageEffects'
import { reportTargetsFor } from './reportTarget'

const ui = (id: string, over: Partial<NonImageEntry> = {}): NonImageEntry => ({
  id,
  category: 'Surreal',
  anomalyType: 'ui_corruption',
  ...over,
})
const run = (id: string, cameraId: number, extra: Partial<Anomaly> = {}) => ({
  ...createNonImageAnomaly(ui(id), cameraId, 'early'),
  ...extra,
})

describe('the monitor effects table and the ledger agree', () => {
  const ledger = parse(
    readFileSync(join(process.cwd(), 'prompts/anomalies.yaml'), 'utf8')
  ) as {
    anomalies: {
      id: string
      kind?: string
      status?: string
      anomaly_type: string
      exclusive?: string
    }[]
  }
  const monitorEntries = ledger.anomalies.filter(
    e =>
      e.kind === 'non_image' &&
      (e.anomaly_type === 'ui_corruption' || e.anomaly_type === 'rule_break')
  )

  it('a produced ui_corruption / rule_break entry has a line in the table (a missing line fails here)', () => {
    for (const e of monitorEntries.filter(e => e.status === 'produced')) {
      expect(
        hasMonitorEffect(e.id),
        `${e.id} is produced but has no effect`
      ).toBe(true)
    }
  })
  it('a line in the table is a produced ledger entry of a monitor type (the two are promoted together)', () => {
    for (const id of Object.keys(MONITOR_EFFECTS)) {
      const e = monitorEntries.find(x => x.id === id)
      expect(e, `${id} is in the table but not a monitor entry`).toBeDefined()
      expect(e?.status, `${id} has an effect but is not produced`).toBe(
        'produced'
      )
    }
  })
  it('hasNonImageEffect sees the table, and only for the monitor types', () => {
    expect(hasNonImageEffect(ui('RT-UI-11'))).toBe(true)
    expect(
      hasNonImageEffect(ui('RT-UI-11', { anomalyType: 'rule_break' }))
    ).toBe(true)
    expect(hasNonImageEffect(ui('RT-UI-12'))).toBe(false)
    expect(
      hasNonImageEffect(ui('RT-UI-11', { anomalyType: 'feed_glitch' }))
    ).toBe(false)
  })
  it('RT-UI-11 shares the cabinet-transform exclusive group (a tilt never runs with a mirror)', () => {
    expect(monitorEntries.find(e => e.id === 'RT-UI-11')?.exclusive).toBe(
      'cabinet-transform'
    )
  })
})

describe('runningMonitorEffects: appear, draw, report from any camera, clear', () => {
  it('a spawned monitor anomaly runs, whatever camera it was given', () => {
    const a = run('RT-UI-11', 5)
    expect(a.scope).toBe('monitor')
    expect([...runningMonitorEffects([a])]).toEqual(['RT-UI-11'])
    expect(fxAttribute(runningMonitorEffects([a]))).toBe('RT-UI-11')
  })
  it('is reportable from any camera with the right category, and the report clears it', () => {
    const a = run('RT-UI-11', 5)
    for (const cam of [1, 5, 8]) {
      expect(reportTargetsFor([a], cam, 'Surreal').hit?.id).toBe('RT-UI-11')
    }
    // a wrong category is a false report that still names it
    expect(reportTargetsFor([a], 2, 'Object')).toMatchObject({
      hit: undefined,
      shown: { id: 'RT-UI-11' },
    })
    const reported = { ...a, detectedAt: 1234 }
    expect(runningMonitorEffects([reported]).size).toBe(0)
    expect(fxAttribute(runningMonitorEffects([reported]))).toBeUndefined()
  })
  it('ignores camera-scope anomalies, other types and ids that are not in the table', () => {
    expect(
      runningMonitorEffects([
        run('RT-UI-11', 1, { scope: 'camera' }),
        run('RT-UI-12', 2),
      ]).size
    ).toBe(0)
  })
})
