/**
 * THE ONE ENTRANCE of camera switching (#442, parent #404).
 *
 * Every way to change the watched camera goes through `planSwitch`: a tap on the screen edge, the arrow keys / A / D,
 * the number keys 1..8 and the CAMERA SELECT keys. `Cabinet` turns each of them into a `SwitchRequest`
 * (`useCameraSwitch`), and the plan that comes back says where to go, whether to go, and how late.
 *
 * The rule-break anomalies are `SwitchRule`s: small pure functions `(plan, context) => plan`, applied in the order of
 * `SWITCH_RULES`. A rule that does not apply returns the plan unchanged.
 *  - It may change the direction (`to`), forbid the move (`blocked`) or hold it back (`delayMs`).
 *  - The order matters where two rules touch the same thing: a direction is reversed BEFORE the end of the line is
 *    checked, so the end that stops the player is the end they are really heading for.
 *
 * What the next batch (RT-FEED-07, 08, 13, 14, 15) can and cannot do with it, honestly:
 *  - RT-FEED-07 / 08 / 13 are about what is DRAWN after a switch (the picture, TIME), not about the switch: they need
 *    changes on the drawing side and use this entrance only for "a switch happened".
 *  - RT-FEED-14 (a switch that does not happen) is a `blocked` rule, but it needs `ctx.now` (when the press came, below)
 *    and, if it is triggered by the game rather than a key, a new `SwitchSource` such as 'auto'.
 *  - RT-FEED-15 needs the same extension (`SwitchSource`, and `SwitchContext` for what it looks at: add the field
 *    when it is built; the camera ids that hold an anomaly are not in the context yet on purpose).
 * So: a rule is one function in the list, but a rule that needs new information also widens `SwitchContext` /
 * `SwitchSource` (one place, here, filled in by `useCameraSwitch`).
 */

/** Where a request came from (a rule may care: RT-RULE-01 only turns the steps, which have a direction). */
export type SwitchSource = 'edge' | 'arrow' | 'digit' | 'strip'
// 'auto' (a switch the game makes by itself) joins when the first rule needs it (RT-FEED-14 / 15)

/** `prev` / `next` = a step in a direction; a number = a direct selection of that camera index. */
export type SwitchTo = 'prev' | 'next' | number

export interface SwitchRequest {
  source: SwitchSource
  to: SwitchTo
}

export interface SwitchPlan {
  to: SwitchTo
  /** True: the move does not happen at all. */
  blocked: boolean
  /** The picture changes this long after the press (the selection lamp moves at once). */
  delayMs: number
}

export interface SwitchContext {
  /** Monitor effects running now (`runningMonitorEffects`). */
  fx: ReadonlySet<string>
  /** The camera the player is on, or heading to: a step is counted from here. */
  index: number
  count: number
  source: SwitchSource
  /** When the request arrived (ms, `performance.now()`): for rules that depend on timing (e.g. a switch refused for a while). */
  now: number
}

export type SwitchRule = (plan: SwitchPlan, ctx: SwitchContext) => SwitchPlan

/** RT-RULE-06: the picture lags this long behind the key (kako-jun to tune; the ledger says about one second). */
export const SWITCH_LAG_MS = 1000

/** RT-RULE-01: the steps (screen edge, arrows) go the other way. A direct selection has no direction and is left alone. */
const reverseDirection: SwitchRule = (plan, ctx) =>
  ctx.fx.has('RT-RULE-01') && (plan.to === 'prev' || plan.to === 'next')
    ? { ...plan, to: plan.to === 'next' ? 'prev' : 'next' }
    : plan

/** RT-RULE-05: stepping forward from the last camera does not come round to the first. Backwards and direct selection still do. */
const noWrap: SwitchRule = (plan, ctx) =>
  ctx.fx.has('RT-RULE-05') && plan.to === 'next' && ctx.index >= ctx.count - 1
    ? { ...plan, blocked: true }
    : plan

/** RT-RULE-06: every kind of switching answers late (the lamp moves first). */
const lag: SwitchRule = (plan, ctx) =>
  ctx.fx.has('RT-RULE-06') ? { ...plan, delayMs: SWITCH_LAG_MS } : plan

export const SWITCH_RULES: readonly SwitchRule[] = [
  reverseDirection,
  noWrap,
  lag,
]

/** The plan for one request: the request itself, passed through every rule in order. */
export const planSwitch = (
  request: SwitchRequest,
  ctx: Omit<SwitchContext, 'source' | 'now'> & { now?: number }
): SwitchPlan =>
  SWITCH_RULES.reduce<SwitchPlan>(
    (plan, rule) =>
      rule(plan, {
        ...ctx,
        source: request.source,
        now: ctx.now ?? performance.now(),
      }),
    { to: request.to, blocked: false, delayMs: 0 }
  )

/** The camera index a plan leads to, counted from `from` (steps wrap round; a selection is clamped to the cameras). */
export const targetIndex = (
  to: SwitchTo,
  from: number,
  count: number
): number => {
  if (typeof to === 'number') return Math.max(0, Math.min(count - 1, to))
  return to === 'next' ? (from + 1) % count : from === 0 ? count - 1 : from - 1
}
