// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SWITCH_LAG_MS } from '../utils/cameraSwitch'
import { useCameraSwitch } from './useCameraSwitch'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

const setup = (
  fx: string[] = [],
  enabled = true,
  current = 2,
  hold = false
) => {
  const onSwitch = vi.fn()
  const hook = renderHook(
    (p: { fx: string[]; enabled: boolean; current: number; hold?: boolean }) =>
      useCameraSwitch({
        enabled: p.enabled,
        hold: p.hold,
        fx: new Set(p.fx),
        currentIndex: p.current,
        count: 8,
        onSwitch,
      }),
    {
      initialProps: { fx, enabled, current, hold } as {
        fx: string[]
        enabled: boolean
        current: number
        hold?: boolean
      },
    }
  )
  return { onSwitch, ...hook }
}

describe('useCameraSwitch', () => {
  it('switches at once when nothing runs', () => {
    const { result, onSwitch } = setup()
    act(() => result.current.request({ source: 'edge', to: 'next' }))
    expect(onSwitch).toHaveBeenCalledWith(3)
  })

  it('RT-RULE-01: the edge tap goes the other way', () => {
    const { result, onSwitch } = setup(['RT-RULE-01'])
    act(() => result.current.request({ source: 'edge', to: 'next' }))
    expect(onSwitch).toHaveBeenCalledWith(1)
  })

  it('RT-RULE-05: forward from the last camera does nothing', () => {
    const { result, onSwitch } = setup(['RT-RULE-05'], true, 7)
    act(() => result.current.request({ source: 'arrow', to: 'next' }))
    expect(onSwitch).not.toHaveBeenCalled()
    act(() => result.current.request({ source: 'arrow', to: 'prev' }))
    expect(onSwitch).toHaveBeenCalledWith(6)
  })

  it('RT-RULE-06: the lamp moves first, the picture follows after the lag; a later press replaces the waiting one', () => {
    const { result, onSwitch } = setup(['RT-RULE-06'])
    expect(result.current.lampIndex).toBe(2)
    act(() => result.current.request({ source: 'strip', to: 5 }))
    expect(result.current.lampIndex).toBe(5)
    expect(onSwitch).not.toHaveBeenCalled()
    act(() => {
      vi.advanceTimersByTime(SWITCH_LAG_MS - 100)
    })
    expect(onSwitch).not.toHaveBeenCalled()
    // a step is counted from where the lamp is
    act(() => result.current.request({ source: 'arrow', to: 'next' }))
    expect(result.current.lampIndex).toBe(6)
    act(() => {
      vi.advanceTimersByTime(SWITCH_LAG_MS - 1)
    })
    expect(onSwitch).not.toHaveBeenCalled()
    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(onSwitch).toHaveBeenCalledTimes(1)
    expect(onSwitch).toHaveBeenCalledWith(6)
  })

  it('once the picture has changed, the lamp is the picture again', () => {
    const { result, rerender } = setup(['RT-RULE-06'])
    act(() => result.current.request({ source: 'digit', to: 4 }))
    act(() => {
      vi.advanceTimersByTime(SWITCH_LAG_MS)
    })
    rerender({ fx: ['RT-RULE-06'], enabled: true, current: 4 })
    expect(result.current.lampIndex).toBe(4)
  })

  it('disabled (the ending camera): requests are dropped and a waiting one is forgotten', () => {
    const { result, rerender, onSwitch } = setup(['RT-RULE-06'])
    act(() => result.current.request({ source: 'strip', to: 5 }))
    rerender({ fx: ['RT-RULE-06'], enabled: false, current: 2 })
    expect(result.current.lampIndex).toBe(2)
    act(() => {
      vi.advanceTimersByTime(SWITCH_LAG_MS * 2)
    })
    expect(onSwitch).not.toHaveBeenCalled()
    act(() => result.current.request({ source: 'strip', to: 1 }))
    expect(onSwitch).not.toHaveBeenCalled()
  })

  it('unmount cancels a waiting switch', () => {
    const { result, unmount, onSwitch } = setup(['RT-RULE-06'])
    act(() => result.current.request({ source: 'strip', to: 5 }))
    unmount()
    act(() => {
      vi.advanceTimersByTime(SWITCH_LAG_MS * 2)
    })
    expect(onSwitch).not.toHaveBeenCalled()
  })

  it('a delayed switch that comes due while held (the REPORT picker is open) waits and runs when the hold ends', () => {
    const { result, rerender, onSwitch } = setup(['RT-RULE-06'])
    act(() => result.current.request({ source: 'strip', to: 5 }))
    rerender({ fx: ['RT-RULE-06'], enabled: true, current: 2, hold: true })
    act(() => {
      vi.advanceTimersByTime(SWITCH_LAG_MS * 3)
    })
    expect(onSwitch).not.toHaveBeenCalled()
    expect(result.current.lampIndex).toBe(5)
    rerender({ fx: ['RT-RULE-06'], enabled: true, current: 2, hold: false })
    expect(onSwitch).toHaveBeenCalledTimes(1)
    expect(onSwitch).toHaveBeenCalledWith(5)
  })
})
