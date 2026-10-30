// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useCameraKeys } from './useCameraKeys'

const press = (key: string, init: KeyboardEventInit = {}) => {
  const e = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...init,
  })
  window.dispatchEvent(e)
  return e
}

const setup = (enabled = true, count = 8) => {
  const onSwitch = vi.fn()
  const utils = renderHook(
    (p: { enabled: boolean; cb: typeof onSwitch }) =>
      useCameraKeys(p.enabled, count, p.cb),
    { initialProps: { enabled, cb: onSwitch } }
  )
  return { onSwitch, ...utils }
}

describe('useCameraKeys', () => {
  it('ignores keys while disabled', () => {
    const { onSwitch } = setup(false)
    press('ArrowLeft')
    press('1')
    expect(onSwitch).not.toHaveBeenCalled()
  })

  it('detaches the listener when enabled goes true -> false', () => {
    const { onSwitch, rerender } = setup(true)
    press('a')
    expect(onSwitch).toHaveBeenCalledTimes(1)
    rerender({ enabled: false, cb: onSwitch })
    press('a')
    expect(onSwitch).toHaveBeenCalledTimes(1)
  })

  it('ignores an already defaultPrevented event', () => {
    const { onSwitch } = setup()
    const pre = (e: Event) => e.preventDefault()
    window.addEventListener('keydown', pre, { capture: true, once: true })
    press('a')
    expect(onSwitch).not.toHaveBeenCalled()
  })

  it('ignores auto-repeat', () => {
    const { onSwitch } = setup()
    press('a', { repeat: true })
    expect(onSwitch).not.toHaveBeenCalled()
  })

  it.each(['ctrlKey', 'metaKey', 'altKey'] as const)('ignores %s', mod => {
    const { onSwitch } = setup()
    press('a', { [mod]: true })
    expect(onSwitch).not.toHaveBeenCalled()
  })

  it.each(['ArrowLeft', 'a', 'A'])('%s -> prev', key => {
    const { onSwitch } = setup()
    press(key)
    expect(onSwitch).toHaveBeenCalledTimes(1)
    expect(onSwitch).toHaveBeenCalledWith('prev')
  })

  it.each(['ArrowRight', 'd', 'D'])('%s -> next', key => {
    const { onSwitch } = setup()
    press(key)
    expect(onSwitch).toHaveBeenCalledTimes(1)
    expect(onSwitch).toHaveBeenCalledWith('next')
  })

  it("'1' selects index 0", () => {
    const { onSwitch } = setup()
    press('1')
    expect(onSwitch).toHaveBeenCalledWith(0)
  })

  it('String(count) selects the last index', () => {
    const { onSwitch } = setup(true, 8)
    press('8')
    expect(onSwitch).toHaveBeenCalledWith(7)
  })

  it.each(['0', '9', 'x', 'Enter'])('ignores %j', key => {
    const { onSwitch } = setup(true, 8)
    press(key)
    expect(onSwitch).not.toHaveBeenCalled()
  })

  it('removes the listener on unmount', () => {
    const { onSwitch, unmount } = setup()
    unmount()
    press('a')
    expect(onSwitch).not.toHaveBeenCalled()
  })

  it('fires once per key even when the onSwitch reference changes', () => {
    const { onSwitch, rerender } = setup()
    const second = vi.fn()
    rerender({ enabled: true, cb: second })
    press('d')
    expect(onSwitch).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })
})
