// @vitest-environment jsdom
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeCameras } from '../test/factories'
import { EDGE_TAP, LOUPE } from '../utils/loupe'
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
const edgeW = GLASS.width * EDGE_TAP.EDGE_TAP_RATIO

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
  it('a short tap on the left zone goes to the previous camera, the right zone to the next', () => {
    const { glass } = setup()
    tap(glass, GLASS.left + 10)
    expect(onSwipe).toHaveBeenLastCalledWith('prev')
    tap(glass, GLASS.left + GLASS.width - 10)
    expect(onSwipe).toHaveBeenLastCalledWith('next')
    expect(onSwipe).toHaveBeenCalledTimes(2)
  })

  it('the bezel counts: beside the picture, and above / below at the left / right', () => {
    const { bezel } = setup()
    tap(bezel, 90)
    expect(onSwipe).toHaveBeenLastCalledWith('prev')
    tap(bezel, 510)
    expect(onSwipe).toHaveBeenLastCalledWith('next')
    tap(bezel, 150, 40) // top band, left side
    expect(onSwipe).toHaveBeenLastCalledWith('prev')
    tap(bezel, 450, 680) // bottom band, right side
    expect(onSwipe).toHaveBeenLastCalledWith('next')
    tap(bezel, 300, 40) // top band, middle
    expect(onSwipe).toHaveBeenCalledTimes(4)
  })

  it('the zone width is EDGE_TAP_RATIO of the picture: just inside is a tap, just past is the middle', () => {
    const { glass } = setup()
    tap(glass, GLASS.left + edgeW - 1)
    expect(onSwipe).toHaveBeenCalledTimes(1)
    tap(glass, GLASS.left + edgeW + 1)
    tap(glass, GLASS.left + GLASS.width - edgeW - 1)
    expect(onSwipe).toHaveBeenCalledTimes(1)
    tap(glass, GLASS.left + GLASS.width - edgeW + 1)
    expect(onSwipe).toHaveBeenCalledTimes(2)
  })

  it('a tap in the middle does nothing', () => {
    const { glass } = setup()
    tap(glass, 300)
    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('a hold of HOLD_MS or more is the loupe, not a tap: no camera change on release', () => {
    const { glass } = setup()
    tap(glass, GLASS.left + 10, 300, LOUPE.HOLD_MS - 1)
    expect(onSwipe).toHaveBeenCalledTimes(1)
    pe('pointerDown', glass, GLASS.left + 10)
    act(() => {
      vi.advanceTimersByTime(LOUPE.HOLD_MS)
    })
    expect(loupe()).not.toBeNull()
    pe('pointerUp', glass, GLASS.left + 10)
    expect(loupe()).toBeNull()
    expect(onSwipe).toHaveBeenCalledTimes(1)
  })

  it('a long press on the bezel makes no loupe and no tap', () => {
    const { bezel } = setup()
    pe('pointerDown', bezel, 90)
    act(() => {
      vi.advanceTimersByTime(LOUPE.HOLD_MS + 100)
    })
    expect(loupe()).toBeNull()
    pe('pointerUp', bezel, 90)
    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('a swipe starting in an edge zone is the swipe, once', () => {
    const { glass } = setup()
    pe('pointerDown', glass, GLASS.left + 10)
    pe('pointerMove', glass, GLASS.left + 80)
    pe('pointerUp', glass, GLASS.left + 80)
    expect(onSwipe).toHaveBeenCalledTimes(1)
    expect(onSwipe).toHaveBeenCalledWith('prev') // dragged right = the existing swipe direction
  })

  it('a short drift past the hold slop is not a tap', () => {
    const { glass } = setup()
    pe('pointerDown', glass, GLASS.left + 10)
    pe('pointerMove', glass, GLASS.left + 10 + LOUPE.HOLD_SLOP_PX + 1)
    pe('pointerUp', glass, GLASS.left + 10 + LOUPE.HOLD_SLOP_PX + 1)
    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('a drift within the hold slop is still a tap', () => {
    const { glass } = setup()
    pe('pointerDown', glass, GLASS.left + 10)
    pe('pointerMove', glass, GLASS.left + 10 + LOUPE.HOLD_SLOP_PX)
    pe('pointerUp', glass, GLASS.left + 10 + LOUPE.HOLD_SLOP_PX)
    expect(onSwipe).toHaveBeenCalledWith('prev')
  })

  it('a cancelled pointer switches nothing', () => {
    const { glass } = setup()
    pe('pointerDown', glass, GLASS.left + 10)
    pe('pointerCancel', glass, GLASS.left + 10)
    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('works the same for mouse and pen, and without a loupe host', () => {
    const { glass } = setup(false)
    tap(glass, GLASS.left + 10, 300, 80, 'mouse')
    tap(glass, GLASS.left + GLASS.width - 10, 300, 80, 'pen')
    expect(onSwipe.mock.calls).toEqual([['prev'], ['next']])
  })

  it('a second finger does not tap', () => {
    const { glass } = setup()
    pe('pointerDown', glass, 300, 300, 'touch', 1)
    pe('pointerDown', glass, GLASS.left + 10, 300, 'touch', 2)
    pe('pointerUp', glass, GLASS.left + 10, 300, 'touch', 2)
    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('shows two aria-hidden arrowheads on the frame', () => {
    const { bezel } = setup()
    const marks = bezel.querySelectorAll('.edge-mark')
    expect(marks).toHaveLength(2)
    marks.forEach(m => expect(m.getAttribute('aria-hidden')).toBe('true'))
  })
})
