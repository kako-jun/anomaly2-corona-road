import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import '../styles/screenFade.css'
import {
  SCREEN_FADE_MS,
  parseTransitionMode,
  prefersReducedMotion,
} from '../utils/screenTransition'

// React 18 knows no `inert` prop; the empty string sets the attribute.
const INERT = { inert: '' } as Record<string, string>

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

  useEffect(() => {
    if (shownKey === screenKey) lastNode.current = children
  })

  // fade: show the new screen when the veil is black.
  useEffect(() => {
    if (!dipping) return
    const timer = setTimeout(() => setShownKey(screenKey), SCREEN_FADE_MS / 2)
    return () => clearTimeout(timer)
  }, [dipping, screenKey])

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
    const timer = setTimeout(() => setGhost(null), SCREEN_FADE_MS)
    return () => clearTimeout(timer)
  }, [plain, mode, screenKey])

  useEffect(() => {
    if (mode !== 'cross') lastKey.current = screenKey
  }, [mode, screenKey])

  return (
    <div
      className="screen-fade-root"
      style={{ '--screen-fade-ms': `${SCREEN_FADE_MS}ms` } as CSSProperties}
    >
      {dipping ? (
        <div className="screen-fade-root" {...INERT}>
          {lastNode.current}
        </div>
      ) : (
        children
      )}
      {ghost && (
        <div className="screen-fade-ghost" key={ghost.key} {...INERT}>
          {ghost.node}
        </div>
      )}
      <div
        className="screen-fade-veil"
        data-dark={dipping ? 'true' : 'false'}
        aria-hidden="true"
      />
    </div>
  )
}
