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
  monitorEffectPlayable,
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
    expect(hasNonImageEffect(ui('RT-UI-13'))).toBe(false)
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
        run('RT-UI-13', 2),
      ]).size
    ).toBe(0)
  })
})

describe('lamp effects (#415): RT-UI-03 / 09 / 12 / 19 / 24 / 25', () => {
  const LAMPS = [
    'RT-UI-03',
    'RT-UI-09',
    'RT-UI-12',
    'RT-UI-19',
    'RT-UI-24',
    'RT-UI-25',
  ]
  const css = readFileSync(
    join(process.cwd(), 'src/styles/monitorEffects.css'),
    'utf8'
  )
  const ledger = parse(
    readFileSync(join(process.cwd(), 'prompts/anomalies.yaml'), 'utf8')
  ) as { anomalies: { id: string; status?: string; exclusive?: string }[] }

  it.each(LAMPS)(
    '%s: appears, is drawn via data-fx, is reportable from any camera, and the report clears it',
    id => {
      const a = run(id, 3)
      expect(a.scope).toBe('monitor')
      expect(fxAttribute(runningMonitorEffects([a]))).toBe(id)
      expect(css).toContain(`[data-fx~='${id}']`)
      for (const cam of [1, 4, 8])
        expect(reportTargetsFor([a], cam, 'Surreal').hit?.id).toBe(id)
      expect(
        fxAttribute(runningMonitorEffects([{ ...a, detectedAt: 9 }]))
      ).toBeUndefined()
    }
  )
  it('all six are produced in the ledger', () => {
    for (const id of LAMPS)
      expect(ledger.anomalies.find(e => e.id === id)?.status).toBe('produced')
  })
  it('the lamp effects that would contradict share an exclusive group named after the lamp they touch', () => {
    const g = (id: string) => ledger.anomalies.find(e => e.id === id)?.exclusive
    expect(g('RT-UI-19')).toBe('camera-lamp')
    expect(g('RT-UI-24')).toBe('camera-lamp')
    expect(g('RT-UI-25')).toBe('camera-lamp')
  })
  it('RT-UI-03 sinks some keys (not all) with the pressed picture, RT-UI-19 lights the green lamps, RT-UI-24 turns the selected one, RT-UI-25 makes it white', () => {
    expect(css).toMatch(
      /RT-UI-03'\] \.cam-cell:nth-child\(3n \+ 2\) \.key \{[^}]*cam-key-pressed\.webp[^}]*translateY\(3px\)/
    )
    expect(css).toMatch(
      /RT-UI-19'\] \.cam-cell \.lamp\.green \{[^}]*lamp-green-on\.webp/
    )
    expect(css).toMatch(
      /RT-UI-24'\] \.cam-cell \.lamp\.on\.green \{\s*filter: hue-rotate\(/
    )
    expect(css).toMatch(
      /RT-UI-25'\] \.cam-cell \.lamp\.on\.green \{\s*filter: grayscale\(1\) brightness\(/
    )
    // the STRIKES / REPORT lamps are not touched any more (they are dark early on, so nothing would show)
    expect(css).not.toMatch(/RT-UI-25'\][^{]*lamp-big/)
    expect(css).not.toMatch(/RT-UI-25'\][^{]*amber/)
  })
  it.each([
    ['RT-UI-09', 'lamp-lie'],
    ['RT-UI-12', 'rec-erratic'],
  ])(
    '%s blinks irregularly but never faster than 3 a second (every lit or dark stretch of %s is 1/6 s or more) and has a reduced-motion block',
    (id, name) => {
      const use = css.match(
        new RegExp(
          `\\[data-fx~='${id}'\\][^{]*\\{\\s*animation: ${name} ([\\d.]+)s`
        )
      )
      expect(use).not.toBeNull()
      const total = Number(use![1])
      const body = css.match(
        new RegExp(`@keyframes ${name} \\{([\\s\\S]*?)\\n\\}`)
      )![1]
      const stops = [...body.matchAll(/([\d.]+)% \{/g)].map(m => Number(m[1]))
      expect(stops.length).toBeGreaterThanOrEqual(8)
      const edges = [...stops, 100]
      const stretches = edges
        .slice(1)
        .map((e, i) => ((e - edges[i]) / 100) * total)
      // Every lit or dark stretch, the last one too (it is a dark one, and the first one that follows it is a lit one:
      // they are separate stretches), lasts 1/6 s or more, so a lit + dark pair is 1/3 s or more: 3 blinks a second at most.
      for (const s of stretches) expect(s).toBeGreaterThanOrEqual(1 / 6)
      // irregular: not all the same length
      expect(new Set(stretches.map(s => s.toFixed(2))).size).toBeGreaterThan(3)
      expect(css).toMatch(
        new RegExp(
          `@media \\(prefers-reduced-motion: reduce\\) \\{\\s*\\.retro\\[data-fx~='${id}'\\][^{]*\\{\\s*animation: none;`
        )
      )
    }
  )
  it('RT-UI-09 leaves the lamp alone while the picker is open (lit as always)', () => {
    expect(css).toMatch(/RT-UI-09'\] \.lamp-big:not\(\.lit\)/)
  })
})

describe('digit window / text batch (#416)', () => {
  const ids = [
    'RT-UI-02',
    'RT-UI-06',
    'RT-UI-07',
    'RT-UI-08',
    'RT-UI-17',
    'RT-UI-18',
    'RT-UI-23',
    'RT-UI-26',
  ]
  it.each(ids)(
    '%s runs, is reportable from any camera, and clears on the report',
    id => {
      const a = run(id, 3)
      expect(runningMonitorEffects([a]).has(id)).toBe(true)
      for (const cam of [1, 4, 8])
        expect(reportTargetsFor([a], cam, 'Surreal').hit?.id).toBe(id)
      expect(runningMonitorEffects([{ ...a, detectedAt: 9 }]).size).toBe(0)
    }
  )
  it('the headings and the digits are guarded by exclusive groups in the ledger', () => {
    const ledger = parse(
      readFileSync(join(process.cwd(), 'prompts/anomalies.yaml'), 'utf8')
    ) as { anomalies: { id: string; exclusive?: string }[] }
    const g = (id: string) => ledger.anomalies.find(e => e.id === id)?.exclusive
    expect(['RT-UI-02', 'RT-UI-06', 'RT-UI-07'].map(g)).toEqual(
      Array(3).fill('hud-labels')
    )
    expect(['RT-UI-08', 'RT-UI-17', 'RT-UI-18'].map(g)).toEqual(
      Array(3).fill('digit-window')
    )
  })
})

describe('input-side effects (#437): RT-UI-10 / 21 / 30', () => {
  const css = readFileSync(
    join(process.cwd(), 'src/styles/monitorEffects.css'),
    'utf8'
  )
  const ledger = parse(
    readFileSync(join(process.cwd(), 'prompts/anomalies.yaml'), 'utf8')
  ) as { anomalies: { id: string; status?: string; exclusive?: string }[] }
  const IDS = ['RT-UI-10', 'RT-UI-21', 'RT-UI-30']

  it.each(IDS)(
    '%s is produced, runs on a monitor-scope spawn, is reportable from any camera and the report clears it',
    id => {
      expect(ledger.anomalies.find(e => e.id === id)?.status).toBe('produced')
      const a = run(id, 3)
      expect(a.scope).toBe('monitor')
      expect(fxAttribute(runningMonitorEffects([a]))).toBe(id)
      for (const cam of [1, 4, 8])
        expect(reportTargetsFor([a], cam, 'Surreal').hit?.id).toBe(id)
      expect(
        fxAttribute(runningMonitorEffects([{ ...a, detectedAt: 9 }]))
      ).toBeUndefined()
    }
  )
  it('the cursor effect is only drawn for a hover-capable fine pointer; the draw leaves it out on touch', () => {
    expect(monitorEffectPlayable('RT-UI-10', false)).toBe(false)
    expect(monitorEffectPlayable('RT-UI-10', true)).toBe(true)
    expect(monitorEffectPlayable('RT-UI-30', false)).toBe(true)
    expect(monitorEffectPlayable('RT-UI-21', false)).toBe(true)
    expect(css).toMatch(
      /@media \(hover: hover\) and \(pointer: fine\) \{\s*\.retro\[data-fx~='RT-UI-10'\] \{\s*animation: cursor-glitch/
    )
  })
  it('the cursor keeps changing (several different shapes) and never stops the click (no pointer-events change)', () => {
    const body = css.match(/@keyframes cursor-glitch \{([\s\S]*?)\n\}/)![1]
    const shapes = [...body.matchAll(/cursor: ([a-z-]+);/g)].map(m => m[1])
    expect(new Set(shapes).size).toBeGreaterThanOrEqual(3)
    expect(css).not.toMatch(/RT-UI-10'\][^{]*\{[^}]*pointer-events: none/)
  })
  it('the whole-screen flash is a fixed veil over the viewport that takes no pointer events, pulses at most 3 a second with a faint peak, then rests', () => {
    expect(css).toMatch(
      /RT-UI-30'\]::after \{[^}]*position: fixed;\s*inset: 0;[^}]*pointer-events: none;[^}]*animation: screen-flash ([\d.]+)s linear infinite/
    )
    const total = Number(css.match(/animation: screen-flash ([\d.]+)s/)![1])
    const body = css.match(/@keyframes screen-flash \{([\s\S]*?)\n\}/)![1]
    // peaks are the stops with a non-zero opacity; each pulse (rise + fall) lasts 1/3 s or more
    const blocks = [...body.matchAll(/([\d.%,\s]+)\{\s*opacity: ([\d.]+);/g)]
    const peaks = blocks
      .filter(b => Number(b[2]) > 0)
      .flatMap(b => b[1].match(/[\d.]+(?=%)/g)!.map(Number))
      .sort((x, y) => x - y)
    const valleys = blocks
      .filter(b => Number(b[2]) === 0)
      .flatMap(b => b[1].match(/[\d.]+(?=%)/g)!.map(Number))
      .sort((x, y) => x - y)
    expect(peaks.length).toBeGreaterThanOrEqual(2)
    expect(peaks.length).toBeLessThanOrEqual(5) // a few times, not a strobe
    const gaps = peaks.slice(1).map((p, i) => ((p - peaks[i]) / 100) * total)
    for (const g of gaps) expect(g).toBeGreaterThanOrEqual(1 / 3)
    // it rests: the last pulse ends well before the cycle does
    expect(Math.max(...valleys.filter(v => v < 100))).toBeLessThan(40)
    const peak = Math.max(...blocks.map(b => Number(b[2])))
    expect(peak).toBeLessThanOrEqual(0.2) // never a full white flash
    expect(css).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\.retro\[data-fx~='RT-UI-30'\]::after \{\s*animation: none;\s*opacity: 0\.05;/
    )
  })
})
