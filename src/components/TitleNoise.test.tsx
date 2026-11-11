// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TitleNoise } from './TitleNoise'

const stubMotion = (reduce: boolean) =>
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: reduce && q.includes('reduce'),
    addEventListener: () => {},
    removeEventListener: () => {},
  }))

describe('TitleNoise', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })
  it('shows nothing at first, a short burst after a quiet gap, then nothing again', () => {
    stubMotion(false)
    vi.spyOn(Math, 'random').mockReturnValue(1) // the longest gap (7 s) and the longest burst (0.4 s)
    render(<TitleNoise />)
    expect(screen.queryByTestId('title-noise')).toBeNull()
    act(() => {
      vi.advanceTimersByTime(7001)
    })
    expect(screen.getByTestId('title-noise')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
    act(() => {
      vi.advanceTimersByTime(401)
    })
    expect(screen.queryByTestId('title-noise')).toBeNull()
  })
  it('never appears with prefers-reduced-motion', () => {
    stubMotion(true)
    render(<TitleNoise />)
    act(() => {
      vi.advanceTimersByTime(60000)
    })
    expect(screen.queryByTestId('title-noise')).toBeNull()
  })
})
