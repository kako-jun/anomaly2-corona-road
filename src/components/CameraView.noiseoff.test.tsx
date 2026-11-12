// @vitest-environment jsdom
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeCameras } from '../test/factories'
import { LOUPE } from '../utils/loupe'
import {
  KNOCK_GAP_MS,
  NOISE_OFF_MS,
  SHAKE_COUNT,
  SHAKE_THRESHOLD,
} from '../utils/noiseOff'
import { CameraView } from './CameraView'

vi.mock('./NoiseCanvas', () => ({ NoiseCanvas: () => null }))

const cams = makeCameras(2)
const R = { left: 100, top: 50, width: 400, height: 600 }
const rect = () =>
  ({
    ...R,
    right: 500,
    bottom: 650,
    x: 100,
    y: 50,
    toJSON: () => ({}),
  }) as DOMRect

let host: HTMLDivElement
let onSwipe: ReturnType<typeof vi.fn>

const setup = (withHost = true) => {
  onSwipe = vi.fn()
  const view = render(
    <CameraView
      camera={cams[0]}
      result={null}
      resultVisible={false}
      subtitle={{ text: '', visible: false }}
      brightness={1}
      contrast={1}
      onSwipe={onSwipe}
      loupeHost={withHost ? host : undefined}
    />
  )
  const c = view.container
  const glass = c.querySelector('.glass') as HTMLElement
  glass.getBoundingClientRect = rect
  ;(c.querySelector('.pic__frame') as HTMLElement).getBoundingClientRect = rect
  return { glass, view, bezel: c.querySelector('.bezel') as HTMLElement }
}
const tap = (el: HTMLElement, x = 300, y = 300, id = 1) => {
  const ev = {
    pointerId: id,
    clientX: x,
    clientY: y,
    pointerType: 'touch',
    button: 0,
  }
  fireEvent.pointerDown(el, ev)
  fireEvent.pointerUp(el, ev)
}
const isOff = (glass: HTMLElement) => glass.classList.contains('noise-off')

const setReduced = (on: boolean) =>
  vi.stubGlobal(
    'matchMedia',
    (q: string) =>
      ({
        matches: on && q.includes('reduce'),
        media: q,
        addEventListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList
  )

beforeEach(() => {
  vi.useFakeTimers()
  setReduced(false)
  host = document.createElement('div')
  document.body.appendChild(host)
})
afterEach(() => {
  cleanup()
  host.remove()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('noise off by double tap (#342)', () => {
  it('a single tap does nothing, and no guidance text is drawn (kako-jun: no label)', () => {
    const { glass, view } = setup()
    tap(glass)
    act(() => void vi.advanceTimersByTime(1000))
    expect(isOff(glass)).toBe(false)
    expect(onSwipe).not.toHaveBeenCalled()
    expect(view.container.querySelector('.noise-hint')).toBeNull()
  })

  it('a double tap switches the noise off for NOISE_OFF_MS, counts down, then on again', () => {
    const { glass } = setup()
    tap(glass)
    act(() => void vi.advanceTimersByTime(KNOCK_GAP_MS / 2))
    tap(glass, 305, 302)
    expect(isOff(glass)).toBe(true)
    act(() => void vi.advanceTimersByTime(3000))
    act(() => void vi.advanceTimersByTime(NOISE_OFF_MS - 3000 - 1))
    expect(isOff(glass)).toBe(true)
    act(() => void vi.advanceTimersByTime(1000))
    expect(isOff(glass)).toBe(false)
  })

  it('knocking again resets the remaining time to the full length (not an extension)', () => {
    const { glass } = setup()
    tap(glass)
    tap(glass)
    act(() => void vi.advanceTimersByTime(6000))
    tap(glass)
    tap(glass)
    act(() => void vi.advanceTimersByTime(NOISE_OFF_MS - 500))
    expect(isOff(glass)).toBe(true)
    act(() => void vi.advanceTimersByTime(1000))
    expect(isOff(glass)).toBe(false)
  })

  it('two taps too far apart in time or place are not a knock', () => {
    const { glass } = setup()
    tap(glass)
    act(() => void vi.advanceTimersByTime(KNOCK_GAP_MS + 50))
    tap(glass)
    expect(isOff(glass)).toBe(false)
    tap(glass, 100, 100)
    tap(glass, 400, 500)
    expect(isOff(glass)).toBe(false)
  })

  it('a hold (loupe) is not a tap, and a tap after it is not half of a knock', () => {
    const { glass } = setup()
    const ev = {
      pointerId: 1,
      clientX: 300,
      clientY: 300,
      pointerType: 'touch',
      button: 0,
    }
    fireEvent.pointerDown(glass, ev)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 5))
    fireEvent.pointerUp(glass, ev)
    tap(glass)
    expect(isOff(glass)).toBe(false)
  })

  it('a swipe is not a tap and clears a pending first tap', () => {
    const { glass } = setup()
    tap(glass)
    fireEvent.pointerDown(glass, {
      pointerId: 1,
      clientX: 300,
      clientY: 300,
      pointerType: 'touch',
      button: 0,
    })
    fireEvent.pointerUp(glass, {
      pointerId: 1,
      clientX: 200,
      clientY: 300,
      pointerType: 'touch',
      button: 0,
    })
    expect(onSwipe).toHaveBeenCalledWith('next')
    tap(glass)
    expect(isOff(glass)).toBe(false)
  })

  it('a small drag, a loupe hold or a bezel tap between two taps breaks the knock', () => {
    const { glass, bezel } = setup()
    const ev = (x: number) => ({
      pointerId: 1,
      clientX: x,
      clientY: 300,
      pointerType: 'touch',
      button: 0,
    })
    // small drag (over the hold slop, under the swipe distance)
    tap(glass)
    fireEvent.pointerDown(glass, ev(300))
    fireEvent.pointerMove(glass, ev(300 + LOUPE.HOLD_SLOP_PX + 5))
    fireEvent.pointerUp(glass, ev(300 + LOUPE.HOLD_SLOP_PX + 5))
    tap(glass)
    expect(isOff(glass)).toBe(false)
    act(() => void vi.advanceTimersByTime(KNOCK_GAP_MS + 50))
    // loupe
    tap(glass)
    fireEvent.pointerDown(glass, ev(300))
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 5))
    fireEvent.pointerUp(glass, ev(300))
    tap(glass)
    expect(isOff(glass)).toBe(false)
    act(() => void vi.advanceTimersByTime(KNOCK_GAP_MS + 50))
    // bezel tap
    tap(glass)
    tap(bezel, 50, 300)
    tap(glass)
    expect(isOff(glass)).toBe(false)
  })

  it('a double tap on the bezel (outside the picture) is two camera switches, not a knock', () => {
    const { bezel, glass } = setup()
    tap(bezel, 50, 300)
    tap(bezel, 50, 300)
    expect(onSwipe).toHaveBeenCalledTimes(2)
    expect(isOff(glass)).toBe(false)
  })

  it('the loupe (open while the noise is off) carries the off state too', () => {
    const { glass } = setup()
    tap(glass)
    tap(glass)
    const ev = {
      pointerId: 1,
      clientX: 300,
      clientY: 300,
      pointerType: 'touch',
      button: 0,
    }
    fireEvent.pointerDown(glass, ev)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 5))
    expect(host.querySelector('.loupe')!.classList.contains('noise-off')).toBe(
      true
    )
  })

  it('unmount clears the timer', () => {
    const { glass, view } = setup()
    tap(glass)
    tap(glass)
    view.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('prefers-reduced-motion: nothing happens', () => {
    setReduced(true)
    const { glass } = setup()
    tap(glass)
    tap(glass)
    expect(isOff(glass)).toBe(false)
  })
})

describe('noise off by shaking (#342)', () => {
  const shake = (n = SHAKE_COUNT) => {
    for (let i = 0; i < n; i++) {
      const e = new Event('devicemotion') as Event & Record<string, unknown>
      e.acceleration = { x: SHAKE_THRESHOLD + 5, y: 0, z: 0 }
      act(() => void window.dispatchEvent(e))
      act(() => void vi.advanceTimersByTime(75))
      const low = new Event('devicemotion') as Event & Record<string, unknown>
      low.acceleration = { x: 0, y: 0, z: 0 }
      act(() => void window.dispatchEvent(low)) // the movement turns back: the next hard one is a new peak
      act(() => void vi.advanceTimersByTime(75))
    }
  }
  afterEach(() => {
    delete (globalThis as Record<string, unknown>).DeviceMotionEvent
  })

  it('without a permission API (Android, PC) a shake listens from the start', () => {
    ;(globalThis as Record<string, unknown>).DeviceMotionEvent = class {}
    const { glass } = setup()
    shake()
    expect(isOff(glass)).toBe(true)
  })

  it('a shake while the tab is hidden is ignored', () => {
    ;(globalThis as Record<string, unknown>).DeviceMotionEvent = class {}
    const { glass } = setup()
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true)
    shake()
    expect(isOff(glass)).toBe(false)
    hidden.mockRestore()
  })

  it('one jolt is not a shake', () => {
    ;(globalThis as Record<string, unknown>).DeviceMotionEvent = class {}
    const { glass } = setup()
    shake(1)
    expect(isOff(glass)).toBe(false)
  })

  it('no devicemotion support: no error, the knock still works', () => {
    const { glass } = setup()
    tap(glass)
    tap(glass)
    expect(isOff(glass)).toBe(true)
  })

  it('iOS: nothing listens before a tap; the permission is asked inside the tap; granted -> shake works', async () => {
    const requestPermission = vi.fn().mockResolvedValue('granted')
    ;(globalThis as Record<string, unknown>).DeviceMotionEvent = {
      requestPermission,
    }
    const { glass, bezel } = setup()
    shake()
    expect(isOff(glass)).toBe(false)
    expect(requestPermission).not.toHaveBeenCalled()
    fireEvent.click(bezel)
    expect(requestPermission).toHaveBeenCalledTimes(1)
    await act(async () => void (await Promise.resolve()))
    shake()
    expect(isOff(glass)).toBe(true)
  })

  it('iOS: refused or throwing -> shake stays off, no error, the knock works', async () => {
    const requestPermission = vi
      .fn()
      .mockResolvedValueOnce('denied')
      .mockRejectedValueOnce(new Error('no'))
    ;(globalThis as Record<string, unknown>).DeviceMotionEvent = {
      requestPermission,
    }
    const { glass, bezel } = setup()
    fireEvent.click(bezel)
    await act(async () => void (await Promise.resolve()))
    fireEvent.click(bezel)
    await act(async () => void (await Promise.resolve()))
    shake()
    expect(isOff(glass)).toBe(false)
    tap(glass)
    tap(glass)
    expect(isOff(glass)).toBe(true)
  })

  it('iOS: unmount before the answer comes does not start listening', async () => {
    let resolve: (v: string) => void = () => {}
    const requestPermission = vi.fn(
      () => new Promise<string>(r => (resolve = r))
    )
    ;(globalThis as Record<string, unknown>).DeviceMotionEvent = {
      requestPermission,
    }
    const add = vi.spyOn(window, 'addEventListener')
    const { bezel, view } = setup()
    fireEvent.click(bezel)
    view.unmount()
    resolve('granted')
    await act(async () => void (await Promise.resolve()))
    expect(add.mock.calls.some(c => c[0] === 'devicemotion')).toBe(false)
  })
})
