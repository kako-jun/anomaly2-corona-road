// @vitest-environment jsdom
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeCameras } from '../test/factories'
import { LOUPE } from '../utils/loupe'
import { CameraView } from './CameraView'

vi.mock('./NoiseCanvas', () => ({ NoiseCanvas: () => null }))

const cams = makeCameras(2)
// the glass sits inside a wider bezel: x 100..500 is the picture, 86..514 the frame
const GLASS = { left: 100, top: 50, width: 400, height: 600 }
const rect = (r: typeof GLASS) =>
  ({
    ...r,
    right: r.left + r.width,
    bottom: r.top + r.height,
    x: r.left,
    y: r.top,
    toJSON: () => ({}),
  }) as DOMRect

let host: HTMLDivElement
let onEdgeTap: ReturnType<typeof vi.fn>

const setup = (withHost = true) => {
  onEdgeTap = vi.fn()
  const view = render(
    <CameraView
      camera={cams[0]}
      result={null}
      resultVisible={false}
      subtitle={{ text: '', visible: false }}
      brightness={1}
      contrast={1}
      onEdgeTap={onEdgeTap}
      loupeHost={withHost ? host : undefined}
    />
  )
  const bezel = view.container.querySelector('.bezel') as HTMLElement
  const glass = view.container.querySelector('.glass') as HTMLElement
  const frame = view.container.querySelector('.pic__frame') as HTMLElement
  glass.getBoundingClientRect = () => rect(GLASS)
  frame.getBoundingClientRect = () => rect(GLASS)
  return { bezel, glass }
}
const pe = (
  type: 'pointerDown' | 'pointerMove' | 'pointerUp' | 'pointerCancel',
  el: HTMLElement,
  x: number,
  y = 300,
  pointerType = 'touch',
  id = 1
) =>
  fireEvent[type](el, {
    pointerId: id,
    clientX: x,
    clientY: y,
    pointerType,
    button: 0,
  })
const tap = (
  el: HTMLElement,
  x: number,
  y = 300,
  holdMs = 80,
  type = 'touch'
) => {
  pe('pointerDown', el, x, y, type)
  act(() => {
    vi.advanceTimersByTime(holdMs)
  })
  pe('pointerUp', el, x, y, type)
}
const loupe = () => host.querySelector('[data-testid="loupe"]')

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

describe('edge tap (#354)', () => {
  it('a short tap on the left band of the bezel goes to the previous camera, the right band to the next', () => {
    const { bezel } = setup()
    tap(bezel, 90)
    expect(onEdgeTap).toHaveBeenLastCalledWith('prev')
    tap(bezel, 510)
    expect(onEdgeTap).toHaveBeenLastCalledWith('next')
    expect(onEdgeTap).toHaveBeenCalledTimes(2)
  })

  it('the corners extend the side bands; the top / bottom band counts only in the side columns', () => {
    const { bezel } = setup()
    tap(bezel, 90, 40) // top left corner
    expect(onEdgeTap).toHaveBeenLastCalledWith('prev')
    tap(bezel, 90, 680) // bottom left corner
    expect(onEdgeTap).toHaveBeenLastCalledWith('prev')
    tap(bezel, 510, 40) // top right corner
    expect(onEdgeTap).toHaveBeenLastCalledWith('next')
    tap(bezel, 510, 680) // bottom right corner
    expect(onEdgeTap).toHaveBeenLastCalledWith('next')
    expect(onEdgeTap).toHaveBeenCalledTimes(4)
    tap(bezel, 150, 40) // top band over the picture's columns
    tap(bezel, 300, 40)
    tap(bezel, 450, 680)
    expect(onEdgeTap).toHaveBeenCalledTimes(4)
  })

  it('the picture does nothing, at its left / right edge or in the middle', () => {
    const { glass } = setup()
    tap(glass, GLASS.left + 1)
    tap(glass, GLASS.left + 10)
    tap(glass, GLASS.left + GLASS.width - 1)
    tap(glass, GLASS.left + GLASS.width - 10)
    tap(glass, 300)
    expect(onEdgeTap).not.toHaveBeenCalled()
  })

  it('the bezel boundary is the picture box: 1px outside is a tap, 1px inside is not', () => {
    const { bezel } = setup()
    tap(bezel, GLASS.left - 1)
    expect(onEdgeTap).toHaveBeenCalledTimes(1)
    tap(bezel, GLASS.left + 1)
    expect(onEdgeTap).toHaveBeenCalledTimes(1)
  })

  it('a press that began on the picture never switches, even released out on the bezel within the slop', () => {
    const { glass } = setup()
    pe('pointerDown', glass, GLASS.left + 5)
    pe('pointerMove', glass, GLASS.left - 3)
    pe('pointerUp', glass, GLASS.left - 3)
    expect(onEdgeTap).not.toHaveBeenCalled()
  })

  it('a press that began on the bezel counts by where it began, even released on the picture within the slop', () => {
    const { bezel } = setup()
    pe('pointerDown', bezel, GLASS.left - 3)
    pe('pointerMove', bezel, GLASS.left + 5)
    pe('pointerUp', bezel, GLASS.left + 5)
    expect(onEdgeTap).toHaveBeenCalledTimes(1)
    expect(onEdgeTap).toHaveBeenCalledWith('prev')
  })

  it('a press of TAP_MAX_MS or more is not a tap: no camera change on release, and a press on the picture is the loupe at once', () => {
    const { bezel, glass } = setup()
    tap(bezel, 90, 300, LOUPE.TAP_MAX_MS - 1)
    expect(onEdgeTap).toHaveBeenCalledTimes(1)
    tap(bezel, 90, 300, LOUPE.TAP_MAX_MS)
    expect(onEdgeTap).toHaveBeenCalledTimes(1)
    pe('pointerDown', glass, GLASS.left + 10)
    expect(loupe()).not.toBeNull()
    pe('pointerUp', glass, GLASS.left + 10)
    expect(loupe()).toBeNull()
    expect(onEdgeTap).toHaveBeenCalledTimes(1)
  })

  it('a long press on the bezel makes no loupe and no tap', () => {
    const { bezel } = setup()
    pe('pointerDown', bezel, 90)
    act(() => {
      vi.advanceTimersByTime(LOUPE.TAP_MAX_MS + 100)
    })
    expect(loupe()).toBeNull()
    pe('pointerUp', bezel, 90)
    expect(onEdgeTap).not.toHaveBeenCalled()
  })

  it('a drag starting in an edge zone does nothing (no swipe, #409)', () => {
    const { bezel } = setup()
    pe('pointerDown', bezel, 90)
    pe('pointerMove', bezel, 160)
    pe('pointerUp', bezel, 160)
    expect(onEdgeTap).not.toHaveBeenCalled()
  })

  it('a drift past the tap slop is not a tap', () => {
    const { bezel } = setup()
    pe('pointerDown', bezel, 90, 300)
    pe('pointerMove', bezel, 90, 300 + LOUPE.TAP_SLOP_PX + 1)
    pe('pointerUp', bezel, 90, 300 + LOUPE.TAP_SLOP_PX + 1)
    expect(onEdgeTap).not.toHaveBeenCalled()
  })

  it('a drift within the tap slop is still a tap', () => {
    const { bezel } = setup()
    pe('pointerDown', bezel, 90, 300)
    pe('pointerMove', bezel, 90, 300 + LOUPE.TAP_SLOP_PX)
    pe('pointerUp', bezel, 90, 300 + LOUPE.TAP_SLOP_PX)
    expect(onEdgeTap).toHaveBeenCalledWith('prev')
  })

  it('a cancelled pointer switches nothing', () => {
    const { bezel } = setup()
    pe('pointerDown', bezel, 90)
    pe('pointerCancel', bezel, 90)
    expect(onEdgeTap).not.toHaveBeenCalled()
  })

  it('works the same for mouse and pen, and without a loupe host', () => {
    const { bezel } = setup(false)
    tap(bezel, 90, 300, 80, 'mouse')
    tap(bezel, 510, 300, 80, 'pen')
    expect(onEdgeTap.mock.calls).toEqual([['prev'], ['next']])
  })

  it('a second finger does not tap', () => {
    const { bezel } = setup()
    pe('pointerDown', bezel, 300, 300, 'touch', 1)
    pe('pointerDown', bezel, 90, 300, 'touch', 2)
    pe('pointerUp', bezel, 90, 300, 'touch', 2)
    expect(onEdgeTap).not.toHaveBeenCalled()
  })

  it('draws no mark on the frame (no guidance, by kako-jun 2026-11-12)', () => {
    const { bezel } = setup()
    expect(bezel.querySelectorAll('.edge-mark')).toHaveLength(0)
  })
})
