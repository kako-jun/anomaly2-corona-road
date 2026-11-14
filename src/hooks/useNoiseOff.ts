import { useCallback, useEffect, useRef, useState } from 'react'
import {
  NOISE_OFF_MS,
  createShakeDetector,
  motionMagnitude,
} from '../utils/noiseOff'

const reducedMotion = () =>
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

type MotionEventCtor = {
  requestPermission?: () => Promise<'granted' | 'denied' | string>
}

/**
 * "The noise is off for NOISE_OFF_MS" (#342): `off` is true meanwhile, `trigger` starts it or restarts the 10 s (no adding up).
 * With prefers-reduced-motion the noise does not move to begin with, so trigger does nothing.
 * `askMotion` is for a tap handler: it (once) starts listening for a shake, asking iOS for permission inside that tap.
 * `inverted` (RT-RULE-03): the knock / shake raises the noise (`boost`) instead of switching it off (`off`).
 * Nothing is saved.
 */
export const useNoiseOff = (inverted = false) => {
  const [active, setActive] = useState(false)
  const timer = useRef(0)

  const trigger = useCallback(() => {
    if (reducedMotion()) return
    window.clearTimeout(timer.current)
    setActive(true)
    timer.current = window.setTimeout(() => {
      timer.current = 0
      setActive(false)
    }, NOISE_OFF_MS)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // shake: listen from the start where no permission is needed; on iOS only after a tap has been granted
  const listening = useRef<(() => void) | null>(null)
  const triggerRef = useRef(trigger)
  triggerRef.current = trigger
  const listen = useCallback(() => {
    if (listening.current || typeof window === 'undefined') return
    const detector = createShakeDetector()
    const onMotion = (e: DeviceMotionEvent) => {
      if (document.hidden) return // a tab in the background is not being shaken at
      if (detector.push(motionMagnitude(e), performance.now()))
        triggerRef.current()
    }
    window.addEventListener('devicemotion', onMotion)
    listening.current = () =>
      window.removeEventListener('devicemotion', onMotion)
  }, [])
  const asking = useRef(false)
  const needsPermission = () =>
    typeof DeviceMotionEvent !== 'undefined' &&
    typeof (DeviceMotionEvent as unknown as MotionEventCtor)
      .requestPermission === 'function'

  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  useEffect(() => {
    if (typeof DeviceMotionEvent === 'undefined') return // no motion sensor API: only the knock works
    if (!needsPermission()) listen()
    return () => {
      listening.current?.()
      listening.current = null
    }
  }, [listen])

  const askMotion = useCallback(() => {
    if (listening.current || asking.current || !needsPermission()) return
    asking.current = true
    const request = (DeviceMotionEvent as unknown as MotionEventCtor)
      .requestPermission
    let pending: Promise<string>
    try {
      pending = request?.call(DeviceMotionEvent) ?? Promise.resolve('denied') // called inside the tap, not after a wait
    } catch {
      asking.current = false
      return
    }
    pending
      .then(r => {
        if (r === 'granted' && mounted.current) listen()
        else asking.current = false // refused: try again at a later tap (iOS remembers a refusal, so this is silent)
      })
      .catch(() => {
        asking.current = false // never an error for the player
      })
  }, [listen])

  // RT-RULE-03 (inverted): the same knock / shake brings the noise UP for the same time instead of switching it off
  return {
    off: active && !inverted,
    boost: active && inverted,
    trigger,
    askMotion,
  }
}
