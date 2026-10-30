// @vitest-environment jsdom
import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NoiseCanvas } from './NoiseCanvas'

// Mirrors NoiseCanvas's FPS (12) -> interval of 1000/12 ms.
const INTERVAL_MS = 1000 / 12

let putImageData: ReturnType<typeof vi.fn>
let reduce: boolean
let changeListeners: Set<() => void>
let mqAdd: ReturnType<typeof vi.fn>
let mqRemove: ReturnType<typeof vi.fn>
let hidden: boolean
let originalGetContext: typeof HTMLCanvasElement.prototype.getContext
let originalMatchMedia: typeof window.matchMedia | undefined
let hiddenDescriptor: PropertyDescriptor | undefined

const makeContext = () => ({
  createImageData: (w: number, h: number) => ({
    data: new Uint8ClampedArray(w * h * 4),
  }),
  putImageData,
  fillRect: vi.fn(),
  fillStyle: '',
})

const stubContext = () => {
  HTMLCanvasElement.prototype.getContext = (() =>
    makeContext()) as unknown as typeof HTMLCanvasElement.prototype.getContext
}

const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms))
const setReduce = (v: boolean) => {
  reduce = v
  act(() => changeListeners.forEach(l => l()))
}
const setHidden = (v: boolean) => {
  hidden = v
  act(() => void document.dispatchEvent(new Event('visibilitychange')))
}

beforeEach(() => {
  vi.useFakeTimers()
  putImageData = vi.fn()
  reduce = false
  hidden = false
  changeListeners = new Set()
  mqAdd = vi.fn((_t: string, l: () => void) => changeListeners.add(l))
  mqRemove = vi.fn((_t: string, l: () => void) => changeListeners.delete(l))
  originalGetContext = HTMLCanvasElement.prototype.getContext
  originalMatchMedia = window.matchMedia
  hiddenDescriptor = Object.getOwnPropertyDescriptor(document, 'hidden')
  stubContext()
  window.matchMedia = (() => ({
    get matches() {
      return reduce
    },
    addEventListener: mqAdd,
    removeEventListener: mqRemove,
  })) as unknown as typeof window.matchMedia
  Object.defineProperty(document, 'hidden', {
    configurable: true,
    get: () => hidden,
  })
})

afterEach(() => {
  vi.useRealTimers()
  HTMLCanvasElement.prototype.getContext = originalGetContext
  if (originalMatchMedia) window.matchMedia = originalMatchMedia
  else delete (window as { matchMedia?: unknown }).matchMedia
  if (hiddenDescriptor)
    Object.defineProperty(document, 'hidden', hiddenDescriptor)
  else delete (document as { hidden?: unknown }).hidden
})

/** Frames drawn by the timer (excludes the immediate first frame on mount). */
const timerFrames = () => putImageData.mock.calls.length - 1

describe('NoiseCanvas timer', () => {
  it('draws one frame immediately on mount', () => {
    render(<NoiseCanvas />)
    expect(putImageData).toHaveBeenCalledTimes(1)
  })

  it('starts an interval on mount', () => {
    render(<NoiseCanvas />)
    expect(vi.getTimerCount()).toBe(1)
  })

  it('draws nothing more just before the interval (boundary - 1)', () => {
    render(<NoiseCanvas />)
    advance(Math.floor(INTERVAL_MS) - 1)
    expect(timerFrames()).toBe(0)
  })

  it('draws a frame at the interval boundary', () => {
    render(<NoiseCanvas />)
    advance(INTERVAL_MS)
    expect(timerFrames()).toBe(1)
  })

  it('draws two frames by two intervals (boundary + 1 period)', () => {
    render(<NoiseCanvas />)
    advance(INTERVAL_MS * 2 + 1)
    expect(timerFrames()).toBe(2)
  })
})

describe('NoiseCanvas reduced motion', () => {
  it('draws the first frame but starts no timer when reduce is already on', () => {
    reduce = true
    render(<NoiseCanvas />)
    expect(putImageData).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
    advance(INTERVAL_MS * 5)
    expect(timerFrames()).toBe(0)
  })

  it('stops when reduce turns on and resumes when it turns off', () => {
    render(<NoiseCanvas />)
    setReduce(true)
    expect(vi.getTimerCount()).toBe(0)
    advance(INTERVAL_MS * 5)
    expect(timerFrames()).toBe(0)
    setReduce(false)
    expect(vi.getTimerCount()).toBe(1)
    advance(INTERVAL_MS)
    expect(timerFrames()).toBe(1)
  })
})

describe('NoiseCanvas visibility', () => {
  it('starts no timer while the document is hidden', () => {
    hidden = true
    render(<NoiseCanvas />)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('stops when hidden and resumes when visible again', () => {
    render(<NoiseCanvas />)
    setHidden(true)
    expect(vi.getTimerCount()).toBe(0)
    advance(INTERVAL_MS * 5)
    expect(timerFrames()).toBe(0)
    setHidden(false)
    expect(vi.getTimerCount()).toBe(1)
    advance(INTERVAL_MS)
    expect(timerFrames()).toBe(1)
  })

  it('does not start a second timer on repeated visibilitychange', () => {
    render(<NoiseCanvas />)
    setHidden(false)
    setHidden(false)
    expect(vi.getTimerCount()).toBe(1)
  })
})

describe('NoiseCanvas unmount', () => {
  it('clears the interval', () => {
    const { unmount } = render(<NoiseCanvas />)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('removes the matchMedia change listener it added', () => {
    const { unmount } = render(<NoiseCanvas />)
    const added = mqAdd.mock.calls[0]
    unmount()
    expect(mqRemove).toHaveBeenCalledTimes(1)
    expect(mqRemove).toHaveBeenCalledWith(added[0], added[1])
  })

  it('removes the visibilitychange listener it added', () => {
    const add = vi.spyOn(document, 'addEventListener')
    const remove = vi.spyOn(document, 'removeEventListener')
    const { unmount } = render(<NoiseCanvas />)
    const added = add.mock.calls.find(c => c[0] === 'visibilitychange')!
    unmount()
    expect(remove).toHaveBeenCalledWith('visibilitychange', added[1])
  })

  it('ignores change / visibilitychange after unmount (no timer revives)', () => {
    const { unmount } = render(<NoiseCanvas />)
    unmount()
    setReduce(true)
    setReduce(false)
    setHidden(true)
    setHidden(false)
    expect(vi.getTimerCount()).toBe(0)
    advance(INTERVAL_MS * 5)
    expect(putImageData).toHaveBeenCalledTimes(1)
  })
})

describe('NoiseCanvas without a 2D context', () => {
  it('does not throw and starts nothing when getContext returns null', () => {
    HTMLCanvasElement.prototype.getContext = (() =>
      null) as unknown as typeof HTMLCanvasElement.prototype.getContext
    expect(() => render(<NoiseCanvas />)).not.toThrow()
    expect(vi.getTimerCount()).toBe(0)
    expect(mqAdd).not.toHaveBeenCalled()
  })
})
