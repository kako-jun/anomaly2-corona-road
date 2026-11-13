import type { Anomaly } from '../types/game'

/**
 * The effects of the monitor-scope anomalies (ui_corruption, rule_break: reported from any camera, #404 batch 3).
 *
 * THE ONE TABLE: one line per ledger id. The ledger (prompts/anomalies.yaml) says the anomaly exists; this table says
 * the game can draw it (`hasNonImageEffect` reads it). The two must agree both ways, and monitorEffects.test.ts checks
 * it: a `produced` ledger entry without a line here fails (so does nonImageSpawn.test.ts), and so does a line here
 * whose entry is not `produced`.
 *
 * How an effect is drawn (the mechanism is the same for all, only the draw differs):
 *  - `runningMonitorEffects(anomalies)` is the set of ids running now. Whatever draws an effect asks only "is my id in
 *    the set?"; clearing on report is not done anywhere else: the reported anomaly gets `detectedAt` and drops out.
 *  - CSS-only effects: `Cabinet` writes the set on `.retro` as `data-fx="RT-UI-11 ..."`, so the style is
 *    `.retro[data-fx~='RT-UI-11'] .cabinet { ... }` in src/styles/monitorEffects.css. Nothing else to wire.
 *  - Effects that need JS (a knob that turns by itself, a lamp, a digit window): `Cabinet` passes the set down
 *    (`monitorEffects`), and the part checks `monitorEffects.has('RT-UI-xx')`.
 * Two effects that would contradict each other (a tilt and a mirror of the same cabinet) must share the ledger's
 * `exclusive` group, named after the part they touch (prompts/README.md); they then never run together.
 */
export const MONITOR_EFFECTS: Readonly<Record<string, { what: string }>> = {
  'RT-UI-03': { what: 'camera keys 2, 5, 8 stuck down' },
  'RT-UI-09': { what: 'REPORT lamp blinks irregularly' },
  'RT-UI-11': { what: 'cabinet tilted' },
  'RT-UI-12': { what: 'REC dot blinks irregularly' },
  'RT-UI-19': { what: 'all camera lamps lit' },
  'RT-UI-24': { what: 'selected camera lamp blue' },
  'RT-UI-25': { what: 'STRIKES and REPORT lamps white' },
}

export const hasMonitorEffect = (id: string): boolean =>
  Object.hasOwn(MONITOR_EFFECTS, id)

/** The ids of the monitor effects running now: unreported, monitor scope, in the table (a pure function of the anomalies). */
export const runningMonitorEffects = (
  anomalies: readonly Anomaly[]
): ReadonlySet<string> =>
  new Set(
    anomalies
      .filter(
        a => !a.detectedAt && a.scope === 'monitor' && hasMonitorEffect(a.id)
      )
      .map(a => a.id)
  )

/** The value of `data-fx` for a set of running effects (space-separated ids, for `[data-fx~='…']`), undefined when none. */
export const fxAttribute = (fx: ReadonlySet<string>): string | undefined =>
  fx.size === 0 ? undefined : [...fx].sort().join(' ')
