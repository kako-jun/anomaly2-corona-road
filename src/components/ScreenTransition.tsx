import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import '../styles/screenFade.css'
import {
  parseTransitionMode,
  totalMs,
  transitionTiming,
  prefersReducedMotion,
} from '../utils/screenTransition'

// React 18 knows no `inert` prop; the empty string sets the attribute.
const INERT = { inert: '' } as Record<string, string>

/** Slack after the veil's own half of the fade before the timer swaps the screens anyway. */
const FALLBACK_MS = 150

interface ScreenTransitionProps {
  /** Which screen `children` is. A change of it is a transition. */
  screenKey: string
  children: ReactNode
}

/**
 * Fades between screens (#336). The state behind `children` is already the new one when the key changes; this
 * only holds the old picture (frozen and inert) while the veil goes black, then shows the new one. Neither
 * picture can be pressed during the change, so nothing can be done twice.
 */
export const ScreenTransition = ({
  screenKey,
  children,
}: ScreenTransitionProps) => {
  const mode = parseTransitionMode(window.location.search, import.meta.env.DEV)
  const plain = mode === 'none' || prefersReducedMotion()
  const [shownKey, setShownKey] = useState(screenKey)
  const [ghost, setGhost] = useState<{ key: string; node: ReactNode } | null>(
    null
  )
  // The last picture of the screen that was shown (updated after each render of a settled screen).
  const lastNode = useRef<ReactNode>(children)
  const lastKey = useRef(screenKey)

  const dipping = !plain && mode === 'fade' && shownKey !== screenKey

  // The timing of the change in progress (kept after the screens are swapped: the rise from black still uses it).
  const timingRef = useRef(transitionTiming(shownKey, screenKey))
  if (shownKey !== screenKey)
    timingRef.current = transitionTiming(shownKey, screenKey)
  const timing = timingRef.current

  useEffect(() => {
    if (shownKey === screenKey) lastNode.current = children
  })

  // fade: show the new screen once the veil is black. The veil's own `transitionend` is the signal (so a heavy
  // frame cannot swap the screens before it is black); the timer is the fallback if that event never comes.
  const showNew = () => setShownKey(screenKey)
  useEffect(() => {
    if (!dipping) return
    const timer = setTimeout(
      () => setShownKey(screenKey),
      timing.outMs + FALLBACK_MS
    )
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dipping, screenKey])

  // While the old screen is held, nothing it listens to globally may act: it has old props, and its handlers
  // would drive the live game. A window capture listener runs before every bubbling listener on window/document.
  useLayoutEffect(() => {
    if (!dipping) return
    const stop = (e: Event) => {
      e.stopImmediatePropagation()
    }
    const types = ['keydown', 'keyup', 'keypress'] as const
    types.forEach(t => window.addEventListener(t, stop, true))
    return () => types.forEach(t => window.removeEventListener(t, stop, true))
  }, [dipping])

  // none / reduced motion: nothing to wait for.
  useEffect(() => {
    if (plain && shownKey !== screenKey) setShownKey(screenKey)
  }, [plain, shownKey, screenKey])

  // cross: the old picture stays on top for the length of the fade.
  useLayoutEffect(() => {
    if (plain || mode !== 'cross' || lastKey.current === screenKey) return
    const old = { key: lastKey.current, node: lastNode.current }
    lastKey.current = screenKey
    setGhost(old)
    setShownKey(screenKey)
    const timer = setTimeout(
      () => setGhost(null),
      totalMs(transitionTiming(old.key, screenKey))
    )
    return () => clearTimeout(timer)
  }, [plain, mode, screenKey])

  useEffect(() => {
    if (mode !== 'cross') lastKey.current = screenKey
  }, [mode, screenKey])

  return (
    <div
      className="screen-fade-root"
      style={
        {
          '--screen-fade-out-ms': `${timing.outMs}ms`,
          '--screen-fade-in-ms': `${timing.inMs}ms`,
          '--screen-fade-ms': `${totalMs(timing)}ms`,
        } as CSSProperties
      }
    >
      {/* The same wrapper at the same place whether dipping or not: the old screen is never remounted, it keeps its
          own state (camera, knobs, the pan of the title picture); only `inert` is switched on. */}
      <div className="screen-fade-root" {...(dipping ? INERT : {})}>
        {dipping ? lastNode.current : children}
      </div>
      {ghost && (
        <div className="screen-fade-ghost" key={ghost.key} {...INERT}>
          {ghost.node}
        </div>
      )}
      <div
        className="screen-fade-veil"
        data-dark={dipping ? 'true' : 'false'}
        aria-hidden="true"
        onTransitionEnd={e => {
          if (dipping && e.target === e.currentTarget) showNew()
        }}
      />
    </div>
  )
}
