import {
  PointerEvent as ReactPointerEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { LOUPE, clampLoupeCenter, followStep } from '../utils/loupe'

/** What the loupe needs to draw: the magnified spot as a fraction of the picture frame, and the sizes it is drawn against. */
export interface LoupeView {
  u: number
  v: number
  frameW: number
  frameH: number
  glassW: number
  glassH: number
}

interface Options {
  /** False: no loupe (holding does nothing); the gesture is then only the camera swipe. */
  enabled: boolean
  glassRef: RefObject<HTMLElement>
  frameRef: RefObject<HTMLElement>
  onSwipe: (direction: 'next' | 'prev') => void
}

interface Geometry {
  glassL: number
  glassT: number
  glassW: number
  glassH: number
  frameL: number
  frameT: number
  frameW: number
  frameH: number
}

/**
 * Press-and-hold loupe + camera swipe on one pointer (#341). Touch, mouse and pen all use pointer events.
 *  - pointer down starts a hold timer (HOLD_MS); moving more than HOLD_SLOP_PX first cancels the hold;
 *  - hold done: the loupe shows, the camera swipe is off, moving moves the magnified spot (smoothed);
 *  - release without a loupe: horizontal travel over SWIPE_PX switches the camera; release with a loupe: it disappears.
 * A second pointer (another finger) is ignored while one is down.
 */
export const useLoupeGesture = ({
  enabled,
  glassRef,
  frameRef,
  onSwipe,
}: Options) => {
  const [view, setView] = useState<LoupeView | null>(null)
  const s = useRef({
    id: null as number | null,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    mode: 'idle' as 'idle' | 'pending' | 'moved' | 'loupe',
    timer: 0,
    raf: 0,
    last: 0,
    cur: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    geo: null as Geometry | null,
  })

  const measure = (): Geometry | null => {
    const g = glassRef.current?.getBoundingClientRect()
    const f = frameRef.current?.getBoundingClientRect()
    if (!g || !f || g.width <= 0 || g.height <= 0) return null
    return {
      glassL: g.left,
      glassT: g.top,
      glassW: g.width,
      glassH: g.height,
      frameL: f.left,
      frameT: f.top,
      frameW: f.width,
      frameH: f.height,
    }
  }

  const publish = useCallback(() => {
    const { geo, cur } = s.current
    if (!geo) return
    setView({
      u: (cur.x + geo.glassL - geo.frameL) / geo.frameW,
      v: (cur.y + geo.glassT - geo.frameT) / geo.frameH,
      frameW: geo.frameW,
      frameH: geo.frameH,
      glassW: geo.glassW,
      glassH: geo.glassH,
    })
  }, [])

  const setTarget = () => {
    const { geo, x, y } = s.current
    if (!geo) return
    s.current.target = clampLoupeCenter(
      x - geo.glassL,
      y - geo.glassT,
      geo.glassW,
      geo.glassH
    )
  }

  const stopLoop = useCallback(() => {
    window.clearTimeout(s.current.timer)
    window.cancelAnimationFrame(s.current.raf)
    s.current.timer = 0
    s.current.raf = 0
  }, [])

  const loop = useCallback(
    (now: number) => {
      const st = s.current
      const dt = Math.min(now - st.last, 100)
      st.last = now
      st.cur = {
        x: followStep(st.cur.x, st.target.x, dt),
        y: followStep(st.cur.y, st.target.y, dt),
      }
      publish()
      st.raf =
        st.cur.x === st.target.x && st.cur.y === st.target.y
          ? 0
          : window.requestAnimationFrame(loop)
    },
    [publish]
  )

  const showLoupe = () => {
    const st = s.current
    st.timer = 0
    if (st.mode !== 'pending') return
    const geo = measure()
    if (!geo) return
    st.geo = geo
    st.mode = 'loupe'
    setTarget()
    st.cur = { ...st.target }
    publish()
  }

  const reset = useCallback(() => {
    stopLoop()
    const st = s.current
    st.id = null
    st.mode = 'idle'
    st.geo = null
    setView(null)
  }, [stopLoop])

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    const st = s.current
    if (st.id !== null) return // a second finger: ignored
    if (e.pointerType === 'mouse' && e.button !== 0) return
    st.id = e.pointerId
    st.startX = st.x = e.clientX
    st.startY = st.y = e.clientY
    st.mode = 'pending'
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId)
    } catch {
      /* capture is best effort */
    }
    if (enabled) st.timer = window.setTimeout(showLoupe, LOUPE.HOLD_MS)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const st = s.current
    if (e.pointerId !== st.id) return
    st.x = e.clientX
    st.y = e.clientY
    if (st.mode === 'pending') {
      if (Math.hypot(st.x - st.startX, st.y - st.startY) > LOUPE.HOLD_SLOP_PX) {
        window.clearTimeout(st.timer)
        st.timer = 0
        st.mode = 'moved'
      }
    } else if (st.mode === 'loupe') {
      setTarget()
      const reduced = window.matchMedia?.(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (reduced) {
        st.cur = { ...st.target }
        publish()
      } else if (!st.raf) {
        st.last = performance.now()
        st.raf = window.requestAnimationFrame(loop)
      }
    }
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLElement>) => {
    const st = s.current
    if (e.pointerId !== st.id) return
    const diff = st.startX - e.clientX
    const wasLoupe = st.mode === 'loupe'
    reset()
    if (!wasLoupe && Math.abs(diff) > LOUPE.SWIPE_PX) {
      onSwipe(diff > 0 ? 'next' : 'prev')
    }
  }

  const onPointerCancel = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerId === s.current.id) reset()
  }

  // While the loupe is up the page must not scroll (touch-action is pan-y so a vertical page scroll still works
  // before it); a hold has not moved, so the browser has not started scrolling yet and this can still cancel it.
  useEffect(() => {
    const el = glassRef.current
    if (!el) return
    const block = (e: TouchEvent) => {
      if (s.current.mode === 'loupe' && e.cancelable) e.preventDefault()
    }
    el.addEventListener('touchmove', block, { passive: false })
    return () => el.removeEventListener('touchmove', block)
  }, [glassRef])

  useEffect(() => stopLoop, [stopLoop])

  return {
    view,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onContextMenu: (e: { preventDefault: () => void }) => {
        if (s.current.id !== null) e.preventDefault()
      },
    },
  }
}
