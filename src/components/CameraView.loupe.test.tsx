// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeCameras } from '../test/factories'
import { LOUPE } from '../utils/loupe'
import { CameraView } from './CameraView'

vi.mock('./NoiseCanvas', () => ({ NoiseCanvas: () => null }))

const cams = makeCameras(2)
const GLASS = { left: 100, top: 50, width: 400, height: 600 }
const rect = (r: {
  left: number
  top: number
  width: number
  height: number
}) =>
  ({
    ...r,
    right: r.left + r.width,
    bottom: r.top + r.height,
    x: r.left,
    y: r.top,
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
  const glass = view.container.querySelector('.glass') as HTMLElement
  const frame = view.container.querySelector('.pic__frame') as HTMLElement
  glass.getBoundingClientRect = () => rect(GLASS)
  // the frame covers the glass exactly here
  frame.getBoundingClientRect = () => rect(GLASS)
  return { glass }
}
const pe = (
  type: 'pointerDown' | 'pointerMove' | 'pointerUp' | 'pointerCancel',
  el: HTMLElement,
  x: number,
  y = 300,
  id = 1
) =>
  fireEvent[type](el, {
    pointerId: id,
    clientX: x,
    clientY: y,
    pointerType: 'touch',
    button: 0,
  })
const loupe = () =>
  host.querySelector('[data-testid="loupe"]') as HTMLElement | null

beforeEach(() => {
  vi.useFakeTimers()
  host = document.createElement('div')
  document.body.appendChild(host)
})
afterEach(() => {
  cleanup()
  host.remove()
  vi.useRealTimers()
})

describe('loupe gesture (#341)', () => {
  it('shows the loupe after the hold time, and removes it when released (no camera switch)', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS - 10))
    expect(loupe()).toBeNull()
    act(() => void vi.advanceTimersByTime(20))
    expect(loupe()).not.toBeNull()
    pe('pointerUp', glass, 300)
    expect(loupe()).toBeNull()
    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('a quick horizontal swipe switches the camera and never shows the loupe', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300)
    pe('pointerMove', glass, 200)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS * 2))
    expect(loupe()).toBeNull()
    pe('pointerUp', glass, 200)
    expect(onSwipe).toHaveBeenCalledWith('next')
    pe('pointerDown', glass, 200)
    pe('pointerUp', glass, 300)
    expect(onSwipe).toHaveBeenLastCalledWith('prev')
  })

  it('a short move under the swipe distance is nothing', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300)
    pe('pointerUp', glass, 280)
    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('moving after the loupe shows moves the loupe, and releasing far away does not switch the camera', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 1))
    const left = () => loupe()!.querySelector('.loupe__frame') as HTMLElement
    const before = left().style.left
    pe('pointerMove', glass, 150)
    act(() => void vi.advanceTimersByTime(1000))
    expect(left().style.left).not.toBe(before)
    pe('pointerUp', glass, 150)
    expect(onSwipe).not.toHaveBeenCalled()
    expect(loupe()).toBeNull()
  })

  it('follows smoothly: the first frame after a jump has not reached the target yet', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 1))
    const px = () =>
      parseFloat(
        (loupe()!.querySelector('.loupe__frame') as HTMLElement).style.left
      )
    const start = px()
    pe('pointerMove', glass, 200)
    act(() => void vi.advanceTimersByTime(17))
    const mid = px()
    act(() => void vi.advanceTimersByTime(2000))
    const end = px()
    expect(mid).not.toBe(start)
    expect(Math.abs(mid - start)).toBeLessThan(Math.abs(end - start))
  })

  it('rounds the magnified spot at the edge: dragging out of the glass shows no more than the edge position', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 1))
    pe('pointerMove', glass, 5000, 5000)
    act(() => void vi.advanceTimersByTime(3000))
    const f = loupe()!.querySelector('.loupe__frame') as HTMLElement
    const half = LOUPE.DIAMETER_PX / LOUPE.ZOOM / 2
    // frame is 400 wide: the centre is at (400 - half) / 400 of it
    const expectLeft =
      LOUPE.DIAMETER_PX / 2 - ((400 - half) / 400) * 400 * LOUPE.ZOOM
    expect(parseFloat(f.style.left)).toBeCloseTo(expectLeft, 0)
  })

  it('ignores a second finger, and releasing it does not end the first', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300, 300, 1)
    pe('pointerDown', glass, 100, 300, 2)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 1))
    expect(loupe()).not.toBeNull()
    pe('pointerUp', glass, 100, 300, 2)
    expect(loupe()).not.toBeNull()
    pe('pointerCancel', glass, 100, 300, 2)
    expect(loupe()).not.toBeNull()
    pe('pointerUp', glass, 300, 300, 1)
    expect(loupe()).toBeNull()
  })

  it('a cancelled pointer (e.g. the browser took it for a scroll) removes the loupe and switches nothing', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 1))
    pe('pointerCancel', glass, 300)
    expect(loupe()).toBeNull()
    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('without a host the loupe is off but the swipe still works', () => {
    const { glass } = setup(false)
    pe('pointerDown', glass, 300)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS * 2))
    expect(loupe()).toBeNull()
    pe('pointerUp', glass, 100)
    expect(onSwipe).toHaveBeenCalledWith('next')
  })

  it('ignores a non-primary mouse button', () => {
    const { glass } = setup()
    fireEvent.pointerDown(glass, {
      pointerId: 1,
      clientX: 300,
      clientY: 300,
      pointerType: 'mouse',
      button: 2,
    })
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS * 2))
    expect(loupe()).toBeNull()
  })

  it('cancels the page scroll (touchmove) only while the loupe shows', () => {
    const { glass } = setup()
    const move = () => {
      const ev = new Event('touchmove', { bubbles: true, cancelable: true })
      glass.dispatchEvent(ev)
      return ev.defaultPrevented
    }
    pe('pointerDown', glass, 300)
    expect(move()).toBe(false)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 1))
    expect(move()).toBe(true)
    pe('pointerUp', glass, 300)
    expect(move()).toBe(false)
  })

  it('draws the zoomed picture, and no noise canvas inside the scaled frame', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300)
    act(() => void vi.advanceTimersByTime(LOUPE.HOLD_MS + 1))
    const f = loupe()!.querySelector('.loupe__frame') as HTMLElement
    expect(parseFloat(f.style.width)).toBeCloseTo(400 * LOUPE.ZOOM)
    expect(f.querySelector('canvas, .noise')).toBeNull()
    expect(loupe()!.querySelector('.loupe__fx')).not.toBeNull()
  })
})

describe('loupe hint', () => {
  it('is always on screen, in English by default', () => {
    setup()
    expect(document.querySelector('.loupe-hint')?.textContent).toBe(
      'Hold to magnify'
    )
    expect(screen.queryByTestId('loupe')).toBeNull()
  })
  it('is Japanese when the browser says so', () => {
    const spy = vi
      .spyOn(navigator, 'languages', 'get')
      .mockReturnValue(['ja-JP'])
    setup()
    expect(document.querySelector('.loupe-hint')?.textContent).toBe(
      '押し続けるとルーペ'
    )
    spy.mockRestore()
  })
})
