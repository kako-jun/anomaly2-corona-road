// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TitleNoise } from './TitleNoise'

type Listener = () => void
/** A matchMedia whose "reduce motion" answer can be flipped while the page is open. */
const stubMotion = (initial: boolean) => {
  let reduce = initial
  const listeners = new Set<Listener>()
  vi.stubGlobal('matchMedia', (q: string) => ({
    get matches() {
      return reduce && q.includes('reduce')
    },
    addEventListener: (_: string, l: Listener) => listeners.add(l),
    removeEventListener: (_: string, l: Listener) => listeners.delete(l),
  }))
  return (v: boolean) => {
    reduce = v
    listeners.forEach(l => l())
  }
}
const advance = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms)
  })

describe('TitleNoise', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    // the longest gap (3.5 s) and the longest burst (1.1 s)
    vi.spyOn(Math, 'random').mockReturnValue(1)
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })
  it('shows nothing at first, a burst after a quiet gap, then nothing again', () => {
    stubMotion(false)
    render(<TitleNoise />)
    expect(screen.queryByTestId('title-noise')).toBeNull()
    advance(3501)
    expect(screen.getByTestId('title-noise')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
    advance(1101)
    expect(screen.queryByTestId('title-noise')).toBeNull()
  })
  it('never appears with prefers-reduced-motion (a burst would be there at this time without it)', () => {
    stubMotion(true)
    render(<TitleNoise />)
    advance(3501)
    expect(screen.queryByTestId('title-noise')).toBeNull()
    advance(60000)
    expect(screen.queryByTestId('title-noise')).toBeNull()
  })
  it('stops at once when reduce-motion is turned on during a burst, and starts again when it is turned off', () => {
    const set = stubMotion(false)
    render(<TitleNoise />)
    advance(3501)
    expect(screen.getByTestId('title-noise')).toBeInTheDocument()
    act(() => set(true))
    expect(screen.queryByTestId('title-noise')).toBeNull()
    advance(30000)
    expect(screen.queryByTestId('title-noise')).toBeNull()
    act(() => set(false))
    advance(3501)
    expect(screen.getByTestId('title-noise')).toBeInTheDocument()
  })
})
