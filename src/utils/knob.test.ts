import { describe, expect, it } from 'vitest'
import {
  KNOB_DEFAULT,
  PX_FULL_RANGE,
  brightnessFilter,
  clampKnob,
  contrastFilter,
  dragKnobValue,
  keyKnobValue,
  knobAngle,
} from './knob'

describe('knobAngle', () => {
  it('maps 0 to -135deg', () => expect(knobAngle(0)).toBe(-135))
  it('maps 50 to 0deg', () => expect(knobAngle(50)).toBe(0))
  it('maps 100 to 135deg', () => expect(knobAngle(100)).toBe(135))
  it('is linear in between', () => {
    expect(knobAngle(25)).toBeCloseTo(-67.5)
    expect(knobAngle(75)).toBeCloseTo(67.5)
  })
})

describe('clampKnob', () => {
  it('raises -1 to 0', () => expect(clampKnob(-1)).toBe(0))
  it('keeps 0', () => expect(clampKnob(0)).toBe(0))
  it('keeps 1', () => expect(clampKnob(1)).toBe(1))
  it('keeps 99', () => expect(clampKnob(99)).toBe(99))
  it('keeps 100', () => expect(clampKnob(100)).toBe(100))
  it('lowers 101 to 100', () => expect(clampKnob(101)).toBe(100))
})

describe('dragKnobValue', () => {
  it('leaves the value unchanged when dx is 0', () => {
    expect(dragKnobValue(37, 100, 100)).toBe(37)
  })
  it('increases when dragging right', () => {
    expect(dragKnobValue(50, 100, 120)).toBeGreaterThan(50)
  })
  it('decreases when dragging left', () => {
    expect(dragKnobValue(50, 100, 80)).toBeLessThan(50)
  })
  it('sweeps the full range over PX_FULL_RANGE px', () => {
    expect(dragKnobValue(0, 0, PX_FULL_RANGE)).toBe(100)
    expect(dragKnobValue(100, PX_FULL_RANGE, 0)).toBe(0)
  })
  it('clamps at the upper limit', () => {
    expect(dragKnobValue(100, 0, 50)).toBe(100)
  })
  it('clamps at the lower limit', () => {
    expect(dragKnobValue(0, 50, 0)).toBe(0)
  })
  it('is just under the max at dx = 179', () => {
    expect(dragKnobValue(0, 0, 179)).toBeCloseTo((179 / 180) * 100)
  })
  it('hits the max exactly at dx = 180', () => {
    expect(dragKnobValue(0, 0, 180)).toBe(100)
  })
  it('stays clamped at dx = 181', () => {
    expect(dragKnobValue(0, 0, 181)).toBe(100)
  })
  it('depends only on dx, not on where the drag started', () => {
    expect(dragKnobValue(40, 0, 18)).toBeCloseTo(dragKnobValue(40, 500, 518))
  })
})

describe('keyKnobValue', () => {
  it.each([
    ['ArrowRight', 54],
    ['ArrowUp', 54],
    ['ArrowLeft', 46],
    ['ArrowDown', 46],
  ])('%s moves by 4', (key, expected) => {
    expect(keyKnobValue(50, key, false)).toBe(expected)
  })
  it.each([
    ['ArrowRight', 60],
    ['ArrowUp', 60],
    ['ArrowLeft', 40],
    ['ArrowDown', 40],
  ])('Shift+%s moves by 10', (key, expected) => {
    expect(keyKnobValue(50, key, true)).toBe(expected)
  })
  it('clamps at 100 from 96 (exactly reaches) and 97 (overshoots)', () => {
    expect(keyKnobValue(96, 'ArrowRight', false)).toBe(100)
    expect(keyKnobValue(97, 'ArrowRight', false)).toBe(100)
  })
  it('clamps at 0 from 4 (exactly reaches) and 3 (overshoots)', () => {
    expect(keyKnobValue(4, 'ArrowLeft', false)).toBe(0)
    expect(keyKnobValue(3, 'ArrowLeft', false)).toBe(0)
  })
  it('Home goes to 0 with or without Shift', () => {
    expect(keyKnobValue(50, 'Home', false)).toBe(0)
    expect(keyKnobValue(50, 'Home', true)).toBe(0)
  })
  it('End goes to 100 with or without Shift', () => {
    expect(keyKnobValue(50, 'End', false)).toBe(100)
    expect(keyKnobValue(50, 'End', true)).toBe(100)
  })
  it.each(['a', 'Tab', ''])('returns null for unrelated key %j', key => {
    expect(keyKnobValue(50, key, false)).toBeNull()
  })
})

describe('brightnessFilter', () => {
  it('maps 0 to 0.55', () => expect(brightnessFilter(0)).toBe(0.55))
  it('maps 50 to 1.0', () => expect(brightnessFilter(50)).toBe(1))
  it('maps 100 to 1.45', () => expect(brightnessFilter(100)).toBe(1.45))
  it('is rounded to 3 decimals (no float noise)', () => {
    expect(brightnessFilter(33.333333)).toBe(0.85)
    expect(brightnessFilter(7)).toBe(0.613)
  })
})

describe('contrastFilter', () => {
  it('maps 0 to 0.6', () => expect(contrastFilter(0)).toBe(0.6))
  it('maps 50 to 1.05', () => expect(contrastFilter(50)).toBe(1.05))
  it('maps 100 to 1.5', () => expect(contrastFilter(100)).toBe(1.5))
  it('is rounded to 3 decimals (no float noise)', () => {
    expect(contrastFilter(7)).toBe(0.663)
  })
})

describe('constants', () => {
  it('PX_FULL_RANGE is 180', () => expect(PX_FULL_RANGE).toBe(180))
  it('KNOB_DEFAULT is within 0..100', () => {
    expect(KNOB_DEFAULT).toBeGreaterThanOrEqual(0)
    expect(KNOB_DEFAULT).toBeLessThanOrEqual(100)
  })
})
