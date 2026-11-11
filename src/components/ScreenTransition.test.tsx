// @vitest-environment jsdom
import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ScreenTransition } from './ScreenTransition'
import { SCREEN_FADE_MS, parseTransitionMode } from '../utils/screenTransition'

const veil = (c: HTMLElement) =>
  c.querySelector('.screen-fade-veil') as HTMLElement

const setReduced = (reduced: boolean) => {
  window.matchMedia = ((q: string) => ({
    matches: reduced && q.includes('reduce'),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia
}

describe('parseTransitionMode', () => {
  it('reads ?transition= only while developing', () => {
    expect(parseTransitionMode('?transition=none', true)).toBe('none')
    expect(parseTransitionMode('?transition=cross', true)).toBe('cross')
    expect(parseTransitionMode('?transition=none', false)).toBe('fade')
    expect(parseTransitionMode('?transition=bogus', true)).toBe('fade')
    expect(parseTransitionMode('', true)).toBe('fade')
  })
})

describe('ScreenTransition (fade)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setReduced(false)
    window.history.pushState({}, '', '/')
  })
  afterEach(() => {
    vi.useRealTimers()
    window.history.pushState({}, '', '/')
  })

  it('shows the first screen at once, without the veil', () => {
    const { container } = render(
      <ScreenTransition screenKey="a">
        <button>A</button>
      </ScreenTransition>
    )
    expect(container.textContent).toBe('A')
    expect(veil(container).dataset.dark).toBe('false')
  })

  it('holds the old screen (inert) while it darkens, then shows the new one', () => {
    const { container, rerender } = render(
      <ScreenTransition screenKey="a">
        <button>A</button>
      </ScreenTransition>
    )
    rerender(
      <ScreenTransition screenKey="b">
        <button>B</button>
      </ScreenTransition>
    )
    expect(container.textContent).toBe('A')
    expect(container.querySelector('[inert]')).not.toBeNull()
    expect(veil(container).dataset.dark).toBe('true')
    act(() => {
      vi.advanceTimersByTime(SCREEN_FADE_MS / 2)
    })
    expect(container.textContent).toBe('B')
    expect(container.querySelector('[inert]')).toBeNull()
    expect(veil(container).dataset.dark).toBe('false')
  })

  it('does not mount the new screen early, so it cannot be pressed twice during the change', () => {
    const onB = vi.fn()
    const { container, rerender } = render(
      <ScreenTransition screenKey="a">
        <button>A</button>
      </ScreenTransition>
    )
    rerender(
      <ScreenTransition screenKey="b">
        <button onClick={onB}>B</button>
      </ScreenTransition>
    )
    expect(container.querySelector('button')?.textContent).toBe('A')
    act(() => {
      vi.advanceTimersByTime(SCREEN_FADE_MS / 2)
    })
    container.querySelector('button')?.click()
    expect(onB).toHaveBeenCalledTimes(1)
  })

  it('goes straight to the latest screen when the key changes again while dark', () => {
    const view = (k: string) => (
      <ScreenTransition screenKey={k}>
        <button>{k}</button>
      </ScreenTransition>
    )
    const { container, rerender } = render(view('a'))
    rerender(view('b'))
    act(() => {
      vi.advanceTimersByTime(SCREEN_FADE_MS / 4)
    })
    rerender(view('c'))
    act(() => {
      vi.advanceTimersByTime(SCREEN_FADE_MS / 2)
    })
    expect(container.textContent).toBe('c')
  })

  it('cancels back to the old screen when the key returns before the veil is black', () => {
    const view = (k: string) => (
      <ScreenTransition screenKey={k}>
        <button>{k}</button>
      </ScreenTransition>
    )
    const { container, rerender } = render(view('a'))
    rerender(view('b'))
    rerender(view('a'))
    expect(container.textContent).toBe('a')
    expect(veil(container).dataset.dark).toBe('false')
  })

  it('keeps the same screen live when only its content changes', () => {
    const { container, rerender } = render(
      <ScreenTransition screenKey="a">
        <button>1</button>
      </ScreenTransition>
    )
    rerender(
      <ScreenTransition screenKey="a">
        <button>2</button>
      </ScreenTransition>
    )
    expect(container.textContent).toBe('2')
    expect(veil(container).dataset.dark).toBe('false')
  })

  it('does not fade with prefers-reduced-motion', () => {
    setReduced(true)
    const { container, rerender } = render(
      <ScreenTransition screenKey="a">
        <button>A</button>
      </ScreenTransition>
    )
    rerender(
      <ScreenTransition screenKey="b">
        <button>B</button>
      </ScreenTransition>
    )
    expect(container.textContent).toBe('B')
    expect(veil(container).dataset.dark).toBe('false')
  })

  it('does not fade with ?transition=none', () => {
    window.history.pushState({}, '', '/?transition=none')
    const { container, rerender } = render(
      <ScreenTransition screenKey="a">
        <button>A</button>
      </ScreenTransition>
    )
    rerender(
      <ScreenTransition screenKey="b">
        <button>B</button>
      </ScreenTransition>
    )
    expect(container.textContent).toBe('B')
  })

  it('cross: the new screen is there at once and the old one lies over it until the fade ends', () => {
    window.history.pushState({}, '', '/?transition=cross')
    const { container, rerender } = render(
      <ScreenTransition screenKey="a">
        <button>A</button>
      </ScreenTransition>
    )
    rerender(
      <ScreenTransition screenKey="b">
        <button>B</button>
      </ScreenTransition>
    )
    expect(container.querySelector('.screen-fade-ghost')?.textContent).toBe('A')
    expect(container.textContent).toContain('B')
    act(() => {
      vi.advanceTimersByTime(SCREEN_FADE_MS)
    })
    expect(container.querySelector('.screen-fade-ghost')).toBeNull()
    expect(container.textContent).toBe('B')
  })
})
