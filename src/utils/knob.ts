/** Knob maths. Values are 0..100; the knob sweeps -135deg..+135deg. */
export const KNOB_MIN_DEG = -135
export const KNOB_MAX_DEG = 135
export const KNOB_DEFAULT = 50
/** Horizontal drag distance (px) that sweeps the full range. */
export const PX_FULL_RANGE = 180

const KEY_STEP = 4
const KEY_STEP_SHIFT = 10

export const clampKnob = (v: number): number => Math.max(0, Math.min(100, v))

export const knobAngle = (value: number): number =>
  KNOB_MIN_DEG + ((KNOB_MAX_DEG - KNOB_MIN_DEG) * value) / 100

/** Slider-style: right = increase. Where on the knob the drag starts does not matter. */
export const dragKnobValue = (
  startValue: number,
  startX: number,
  currentX: number
): number => clampKnob(startValue + ((currentX - startX) / PX_FULL_RANGE) * 100)

/** Value after a key press, or null if the key is not a knob key. */
export const keyKnobValue = (
  value: number,
  key: string,
  shift: boolean
): number | null => {
  const step = shift ? KEY_STEP_SHIFT : KEY_STEP
  if (key === 'ArrowRight' || key === 'ArrowUp') return clampKnob(value + step)
  if (key === 'ArrowLeft' || key === 'ArrowDown') return clampKnob(value - step)
  if (key === 'Home') return 0
  if (key === 'End') return 100
  return null
}

/** CSS brightness() multiplier for the picture, 0.55..1.45. */
export const brightnessFilter = (v: number): number =>
  Number((0.55 + (v / 100) * 0.9).toFixed(3))

/** CSS contrast() multiplier for the picture, 0.6..1.5. */
export const contrastFilter = (v: number): number =>
  Number((0.6 + (v / 100) * 0.9).toFixed(3))

/**
 * RT-UI-13 (the knobs turn by themselves): the range the drift sweeps (so the picture never goes black or washed out
 * to nothing), and one step of it. A value moves at `speed` units per second in `dir` (+1 / -1) and turns around at
 * the ends of the range.
 */
export const DRIFT_MIN = 25
export const DRIFT_MAX = 75

export const driftStep = (
  value: number,
  dir: 1 | -1,
  deltaUnits: number
): { value: number; dir: 1 | -1 } => {
  // a value the player left outside the range first walks back in, at the same speed (no jump)
  const d: 1 | -1 = value >= DRIFT_MAX ? -1 : value <= DRIFT_MIN ? 1 : dir
  const next = value + d * deltaUnits
  if (d === 1 && next >= DRIFT_MAX) return { value: DRIFT_MAX, dir: -1 }
  if (d === -1 && next <= DRIFT_MIN) return { value: DRIFT_MIN, dir: 1 }
  return { value: next, dir: d }
}
