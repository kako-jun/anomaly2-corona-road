// @vitest-environment jsdom
import { act, fireEvent, render } from '@testing-library/react'
import { useEffect, useState } from 'react'
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
    expect(parseTransitionMode('?transition=FADE', true)).toBe('fade')
    expect(parseTransitionMode('?transition=None', true)).toBe('fade')
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
    fireEvent.transitionEnd(veil(container))
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
    fireEvent.transitionEnd(veil(container))
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
    fireEvent.transitionEnd(veil(container))
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

  it('swaps by the timer when transitionend never comes', () => {
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
    act(() => {
      vi.advanceTimersByTime(SCREEN_FADE_MS / 2 + 200)
    })
    expect(container.textContent).toBe('B')
  })

  it('keeps the old screen own state while it is dark (no remount)', () => {
    const Counter = ({ label }: { label: string }) => {
      const [n, setN] = useState(0)
      return (
        <button onClick={() => setN(n + 1)}>
          {label}:{n}
        </button>
      )
    }
    const { container, rerender } = render(
      <ScreenTransition screenKey="a">
        <Counter label="A" />
      </ScreenTransition>
    )
    fireEvent.click(container.querySelector('button')!)
    expect(container.textContent).toBe('A:1')
    rerender(
      <ScreenTransition screenKey="b">
        <p>B</p>
      </ScreenTransition>
    )
    expect(container.textContent).toBe('A:1')
  })

  it('stops global key handlers of the old screen while it is dark', () => {
    const onKey = vi.fn()
    window.addEventListener('keydown', onKey)
    const { container, rerender } = render(
      <ScreenTransition screenKey="a">
        <button>A</button>
      </ScreenTransition>
    )
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(onKey).toHaveBeenCalledTimes(1)
    rerender(
      <ScreenTransition screenKey="b">
        <button>B</button>
      </ScreenTransition>
    )
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(onKey).toHaveBeenCalledTimes(1)
    fireEvent.transitionEnd(veil(container))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(onKey).toHaveBeenCalledTimes(2)
    window.removeEventListener('keydown', onKey)
  })

  it('stops key events aimed at the body (the real path) while dark, and lets them through again after', () => {
    const onKey = vi.fn()
    document.addEventListener('keydown', onKey)
    const press = () =>
      document.body.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'a', bubbles: true })
      )
    const { container, rerender } = render(
      <ScreenTransition screenKey="a">
        <button>A</button>
      </ScreenTransition>
    )
    press()
    expect(onKey).toHaveBeenCalledTimes(1)
    rerender(
      <ScreenTransition screenKey="b">
        <button>B</button>
      </ScreenTransition>
    )
    press()
    expect(onKey).toHaveBeenCalledTimes(1)
    fireEvent.transitionEnd(veil(container))
    press()
    expect(onKey).toHaveBeenCalledTimes(2)
    document.removeEventListener('keydown', onKey)
  })

  it('does not remount an old screen shaped like the App (a fragment with the screen and a notice)', () => {
    let mounts = 0
    const Screen = () => {
      const [n, setN] = useState(0)
      useEffect(() => {
        mounts++
      }, [])
      return <button onClick={() => setN(n + 1)}>S:{n}</button>
    }
    const Notice = () => <i>notice</i>
    const view = (k: string) => (
      <ScreenTransition screenKey={k}>
        {k === 'a' ? (
          <>
            <Screen />
            <Notice />
          </>
        ) : (
          <>
            <p>B</p>
            <Notice />
          </>
        )}
      </ScreenTransition>
    )
    const { container, rerender } = render(view('a'))
    fireEvent.click(container.querySelector('button')!)
    rerender(view('b'))
    expect(container.textContent).toBe('S:1notice')
    expect(mounts).toBe(1)
  })

  it('leaves no timer behind when it unmounts in the dark', () => {
    const { unmount, rerender } = render(
      <ScreenTransition screenKey="a">
        <button>A</button>
      </ScreenTransition>
    )
    rerender(
      <ScreenTransition screenKey="b">
        <button>B</button>
      </ScreenTransition>
    )
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('returns to the very same old picture when the key goes back (A to B to A)', () => {
    const Counter = () => {
      const [n, setN] = useState(0)
      return <button onClick={() => setN(n + 1)}>A:{n}</button>
    }
    const view = (k: string) => (
      <ScreenTransition screenKey={k}>
        {k === 'a' ? <Counter /> : <p>B</p>}
      </ScreenTransition>
    )
    const { container, rerender } = render(view('a'))
    fireEvent.click(container.querySelector('button')!)
    rerender(view('b'))
    rerender(view('a'))
    expect(container.textContent).toBe('A:1')
  })

  it('can be switched fade to cross to none between changes', () => {
    const view = (k: string) => (
      <ScreenTransition screenKey={k}>
        <button>{k}</button>
      </ScreenTransition>
    )
    const { container, rerender } = render(view('a'))
    rerender(view('b'))
    fireEvent.transitionEnd(veil(container))
    expect(container.textContent).toBe('b')
    window.history.pushState({}, '', '/?transition=cross')
    rerender(view('c'))
    expect(container.querySelector('.screen-fade-ghost')?.textContent).toBe('b')
    act(() => {
      vi.advanceTimersByTime(SCREEN_FADE_MS)
    })
    window.history.pushState({}, '', '/?transition=none')
    rerender(view('d'))
    expect(container.textContent).toBe('d')
  })
})
