// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PX_FULL_RANGE, knobAngle } from '../utils/knob'
import { Knob } from './Knob'

beforeEach(() => {
  // jsdom does not implement pointer capture.
  Element.prototype.setPointerCapture = vi.fn()
  Element.prototype.releasePointerCapture = vi.fn()
})

const setup = (value = 50) => {
  const onChange = vi.fn()
  render(<Knob label="Brightness" value={value} onChange={onChange} />)
  return { onChange, knob: screen.getByRole('slider', { name: 'Brightness' }) }
}

const ptr = (
  fn: typeof fireEvent.pointerDown,
  el: Element,
  init: PointerEventInit = {}
) => fn(el, { pointerId: 1, button: 0, ...init })

describe('Knob a11y', () => {
  it('exposes slider semantics with rounded value', () => {
    const { knob } = setup(33.6)
    expect(knob).toHaveAttribute('aria-valuenow', '34')
    expect(knob).toHaveAttribute('aria-valuetext', '34%')
    expect(knob).toHaveAttribute('aria-valuemin', '0')
    expect(knob).toHaveAttribute('aria-valuemax', '100')
  })
  it('sets the angle CSS variable from the value', () => {
    const { knob } = setup(100)
    expect(knob.style.getPropertyValue('--a')).toBe(`${knobAngle(100)}deg`)
  })
})

describe('Knob keyboard', () => {
  it('ArrowRight increases by 4 and prevents default', () => {
    const { knob, onChange } = setup(50)
    const notPrevented = fireEvent.keyDown(knob, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith(54)
    expect(notPrevented).toBe(false)
  })
  it('Shift+ArrowLeft decreases by 10', () => {
    const { knob, onChange } = setup(50)
    fireEvent.keyDown(knob, { key: 'ArrowLeft', shiftKey: true })
    expect(onChange).toHaveBeenCalledWith(40)
  })
  it('does not let a handled key bubble to outer listeners', () => {
    const { knob } = setup()
    const outer = vi.fn()
    document.addEventListener('keydown', outer)
    fireEvent.keyDown(knob, { key: 'ArrowRight' })
    document.removeEventListener('keydown', outer)
    expect(outer).not.toHaveBeenCalled()
  })
  it('ignores unrelated keys: no onChange, no preventDefault', () => {
    const { knob, onChange } = setup()
    const notPrevented = fireEvent.keyDown(knob, { key: 'a' })
    expect(onChange).not.toHaveBeenCalled()
    expect(notPrevented).toBe(true)
  })
})

describe('Knob pointer drag', () => {
  it('drags: down -> move changes value by dx, up ends the drag', () => {
    const { knob, onChange } = setup(50)
    ptr(fireEvent.pointerDown, knob, { clientX: 100 })
    expect(Element.prototype.setPointerCapture).toHaveBeenCalled()
    ptr(fireEvent.pointerMove, knob, { clientX: 100 + PX_FULL_RANGE / 2 })
    expect(onChange).toHaveBeenLastCalledWith(100)
    ptr(fireEvent.pointerUp, knob, { clientX: 150 })
    onChange.mockClear()
    ptr(fireEvent.pointerMove, knob, { clientX: 10 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does nothing on move without a prior down', () => {
    const { knob, onChange } = setup()
    ptr(fireEvent.pointerMove, knob, { clientX: 10 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not start a drag with the right button', () => {
    const { knob, onChange } = setup()
    ptr(fireEvent.pointerDown, knob, { clientX: 100, button: 2 })
    ptr(fireEvent.pointerMove, knob, { clientX: 150 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('ends the drag on pointercancel', () => {
    const { knob, onChange } = setup()
    ptr(fireEvent.pointerDown, knob, { clientX: 100 })
    ptr(fireEvent.pointerCancel, knob)
    ptr(fireEvent.pointerMove, knob, { clientX: 150 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('ends the drag on lostpointercapture', () => {
    const { knob, onChange } = setup()
    ptr(fireEvent.pointerDown, knob, { clientX: 100 })
    ptr(fireEvent.lostPointerCapture, knob)
    ptr(fireEvent.pointerMove, knob, { clientX: 150 })
    expect(onChange).not.toHaveBeenCalled()
  })
})
