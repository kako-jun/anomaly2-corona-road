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
