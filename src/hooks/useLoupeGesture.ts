import {
  PointerEvent as ReactPointerEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { isKnock } from '../utils/noiseOff'
import {
  LOUPE,
  clampLoupeCenter,
  edgeTapDirection,
  followStep,
} from '../utils/loupe'
import {
  accumulatedTilt,
  localRect,
  toLocalPoint,
  unrotatedSize,
  type Tilt,
} from '../utils/tiltGeometry'

/** What the loupe needs to draw: the magnified spot as a fraction of the picture frame, and the sizes it is drawn against. */
export interface LoupeView {
  u: number
  v: number
  frameW: number
  frameH: number
  glassW: number
  glassH: number
  /** The held spot in glass pixels (the circle's centre shows this point of the monitor). */
  x: number
  y: number
}

interface Options {
  /** False: no loupe (pressing the picture shows nothing). */
  enabled: boolean
  glassRef: RefObject<HTMLElement>
  frameRef: RefObject<HTMLElement>
  /** Camera change from a short tap on the left / right of the monitor's frame (#354). There is no swipe (#409). */
  onEdgeTap: (direction: 'next' | 'prev') => void
  /** A double tap on the picture (a short tap twice, KNOCK_GAP_MS / KNOCK_SLOP_PX, #342). A single short tap still does nothing. */
  onKnock?: () => void
  /** Changes when the camera changes: a loupe held through a camera switch is closed. */
  resetKey?: unknown
}

/**
 * Sizes and positions in the glass's own axes (origin at its top-left): the cabinet may be rotated (RT-UI-11), and the
 * bounding rects below are then not the elements' own. `box` / `theta` turn a pointer into those axes (tiltGeometry.ts).
 */
interface Geometry {
  box: DOMRect
  tilt: Tilt
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
 * Instant loupe on one pointer (#341, #409: no hold wait, no camera swipe). Touch, mouse and pen all use pointer events.
 *  - pointer down on the picture (.glass) shows the loupe at once; moving moves the magnified spot (smoothed); release removes it;
 *  - knock (#342): a press on the picture released within TAP_MAX_MS and moved at most TAP_SLOP_PX is a short tap, even though the
 *    loupe flashed for it; the second one of a double tap is the knock;
 *  - edge tap (#354): the handlers sit on the whole bezel. A short press (under TAP_MAX_MS, within TAP_SLOP_PX) that began on the bezel,
 *    by the x where it began, in the left / right zone (edgeTapDirection) switches the camera; the loupe only starts for a press that began on the glass.
 * A second pointer (another finger) is ignored while one is down.
 */
export const useLoupeGesture = ({
  enabled,
  glassRef,
  frameRef,
  onEdgeTap,
  onKnock,
  resetKey,
}: Options) => {
  const [view, setView] = useState<LoupeView | null>(null)
  const s = useRef({
    id: null as number | null,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    downAt: 0,
    startOnGlass: false,
    /** the press's x in the glass's own axes and the glass's own width (the edge tap, RT-UI-11) */
    startLocal: null as { x: number; w: number } | null,
    drifted: false,
    mode: 'idle' as 'idle' | 'pending' | 'moved' | 'loupe',
    raf: 0,
    last: 0,
    cur: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    geo: null as Geometry | null,
    lastTap: null as { t: number; x: number; y: number } | null,
  })

  const measure = (): Geometry | null => {
    const g = glassRef.current?.getBoundingClientRect()
    const f = frameRef.current?.getBoundingClientRect()
    if (!g || !f || g.width <= 0 || g.height <= 0) return null
    const tilt = accumulatedTilt(glassRef.current)
    const glass = unrotatedSize(g.width, g.height, tilt)
    const frame = localRect(f, g, tilt)
    return {
      box: g,
      tilt,
      glassL: 0,
      glassT: 0,
      glassW: glass.w,
      glassH: glass.h,
      frameL: frame.left,
      frameT: frame.top,
      frameW: frame.width,
      frameH: frame.height,
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
      x: cur.x,
      y: cur.y,
    })
  }, [])

  const setTarget = () => {
    const { geo, x, y } = s.current
    if (!geo) return
    const p = toLocalPoint(x, y, geo.box, geo.tilt)
    s.current.target = clampLoupeCenter(
      p.x - geo.glassL,
      p.y - geo.glassT,
      geo.glassW,
      geo.glassH
    )
  }

  const stopLoop = useCallback(() => {
    window.cancelAnimationFrame(s.current.raf)
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
    st.drifted = false
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId)
    } catch {
      /* capture is best effort */
    }
    st.downAt = performance.now()
    const g = glassRef.current?.getBoundingClientRect()
    const tilt = accumulatedTilt(glassRef.current)
    const size = g && unrotatedSize(g.width, g.height, tilt)
    const p = g && toLocalPoint(e.clientX, e.clientY, g, tilt)
    const onGlass =
      !!g &&
      !!size &&
      !!p &&
      p.x >= 0 &&
      p.x <= size.w &&
      p.y >= 0 &&
      p.y <= size.h
    st.startOnGlass = onGlass
    st.startLocal = p && size ? { x: p.x, w: size.w } : null
    if (enabled && onGlass) showLoupe()
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const st = s.current
    if (e.pointerId !== st.id) return
    st.x = e.clientX
    st.y = e.clientY
    if (Math.hypot(st.x - st.startX, st.y - st.startY) > LOUPE.TAP_SLOP_PX)
      st.drifted = true
    if (st.mode === 'pending') {
      if (st.drifted) st.mode = 'moved'
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
    const wasLoupe = st.mode === 'loupe'
    const wasPending = st.mode === 'pending'
    const heldMs = performance.now() - st.downAt
    const short = !st.drifted && heldMs < LOUPE.TAP_MAX_MS
    const startOnGlass = st.startOnGlass
    const startLocal = st.startLocal
    reset()
    // every way out except a short tap on the picture forgets a pending first tap (a long press, a drag, a bezel tap)
    const prevTap = st.lastTap
    st.lastTap = null
    if (startOnGlass && short && (wasLoupe || wasPending)) {
      // a short tap on the picture (the loupe may have flashed): nothing by itself, the second one of a double tap is a knock (#342)
      const tap = { t: performance.now(), x: e.clientX, y: e.clientY }
      if (isKnock(prevTap, tap)) {
        onKnock?.()
      } else st.lastTap = tap
    } else if (wasPending && !startOnGlass && short) {
      // the direction is by where the press began (a press that began on the picture is never an edge tap)
      const dir = startLocal
        ? edgeTapDirection(startLocal.x, 0, startLocal.w)
        : null
      if (dir) onEdgeTap(dir)
    }
  }

  const onPointerCancel = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerId === s.current.id) reset()
  }

  // While the loupe is up the page must not scroll (.glass is touch-action: none; this is the backstop).
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

  // The press is over (or the picture under it changed) without a pointerup we can use: close the loupe. The geometry
  // is measured once when the loupe shows, so a resize / rotation closes it too.
  useEffect(() => {
    s.current.lastTap = null
    if (s.current.id !== null) reset()
  }, [resetKey, reset])
  useEffect(() => {
    const end = () => {
      if (s.current.id !== null) reset()
    }
    window.addEventListener('blur', end)
    window.addEventListener('resize', end)
    document.addEventListener('visibilitychange', end)
    return () => {
      window.removeEventListener('blur', end)
      window.removeEventListener('resize', end)
      document.removeEventListener('visibilitychange', end)
    }
  }, [reset])

  return {
    view,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onLostPointerCapture: onPointerCancel,
      onContextMenu: (e: { preventDefault: () => void }) => {
        if (s.current.id !== null) e.preventDefault()
      },
    },
  }
}
