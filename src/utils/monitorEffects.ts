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
  'RT-UI-01': { what: 'REPORT button drifts out of place' },
  'RT-UI-02': { what: 'TIME / REPORTS headings swapped' },
  'RT-UI-03': { what: 'camera keys 2, 5, 8 stuck down' },
  'RT-UI-04': { what: 'one more STRIKES lamp lit than the real count' },
  'RT-UI-05': { what: 'TIME runs backwards / jumps / freezes' },
  'RT-UI-06': { what: 'HUD heading text corrupted' },
  'RT-UI-07': { what: 'Japanese / symbols mixed into the HUD headings' },
  'RT-UI-08': { what: 'digit windows glow orange-red' },
  'RT-UI-09': { what: 'REPORT lamp blinks irregularly' },
  'RT-UI-11': { what: 'cabinet tilted' },
  'RT-UI-12': { what: 'REC dot blinks irregularly' },
  'RT-UI-13': { what: 'brightness / contrast knobs turn by themselves' },
  'RT-UI-14': { what: 'model plate digits swapped (CR-24)' },
  'RT-UI-15': { what: 'speaker grille pulses in silence' },
  'RT-UI-16': { what: 'cabinet mirrored left-right' },
  'RT-UI-17': { what: 'digit glow drops out (cut-away digits)' },
  'RT-UI-18': { what: 'faint other digit smeared over the digits' },
  'RT-UI-19': { what: 'all camera lamps lit' },
  'RT-UI-20': { what: 'one camera key loses its face' },
  'RT-UI-22': { what: 'noise and scanlines gone for good' },
  'RT-UI-23': { what: 'TIME colon blinks fast or stays lit' },
  'RT-UI-24': { what: 'selected camera lamp blue' },
  'RT-UI-25': { what: 'selected camera lamp white' },
  'RT-UI-26': { what: 'REPORT label misspelled' },
  'RT-UI-27': { what: 'speaker holes checkered' },
  'RT-UI-28': { what: 'model number becomes the child milestone (CR-100)' },
  'RT-UI-29': { what: 'cabinet body tinted blue-green' },
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
