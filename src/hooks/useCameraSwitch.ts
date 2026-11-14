import { useCallback, useEffect, useRef, useState } from 'react'
import {
  planSwitch,
  targetIndex,
  type SwitchRequest,
} from '../utils/cameraSwitch'

/**
 * The hook side of the one camera-switching entrance (src/utils/cameraSwitch.ts).
 *
 * `request` is what the screen-edge tap, the keys and the CAMERA SELECT keys all call. It plans the move
 * (`planSwitch`), then either drops it (blocked), does it now, or does it after the plan's delay. While a delayed move
 * is waiting, `lampIndex` is where it is going (the selection lamp moves at once) and `currentIndex` is still the
 * picture; a later request is counted from the lamp and replaces the waiting one. `enabled` false (the ending's
 * virtual camera) drops everything and forgets what was waiting.
 */
export const useCameraSwitch = (opts: {
  enabled: boolean
  fx: ReadonlySet<string>
  currentIndex: number
  count: number
  onSwitch: (to: number) => void
}) => {
  const { enabled, fx, currentIndex, count, onSwitch } = opts
  const [pending, setPending] = useState<number | null>(null)
  const timer = useRef(0)
  const latest = useRef({ fx, currentIndex, count, onSwitch, pending })
  latest.current = { fx, currentIndex, count, onSwitch, pending }

  const cancel = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = 0
    setPending(null)
  }, [])
  useEffect(() => cancel, [cancel])
  useEffect(() => {
    if (!enabled) cancel()
  }, [enabled, cancel])

  const request = useCallback(
    (req: SwitchRequest) => {
      if (!enabled) return
      const l = latest.current
      const from = l.pending ?? l.currentIndex
      const plan = planSwitch(req, { fx: l.fx, index: from, count: l.count })
      if (plan.blocked) return
      const to = targetIndex(plan.to, from, l.count)
      window.clearTimeout(timer.current)
      timer.current = 0
      if (plan.delayMs <= 0) {
        setPending(null)
        l.onSwitch(to)
        return
      }
      setPending(to)
      latest.current.pending = to
      timer.current = window.setTimeout(() => {
        timer.current = 0
        setPending(null)
        latest.current.onSwitch(to)
      }, plan.delayMs)
    },
    [enabled]
  )

  return { request, lampIndex: pending ?? currentIndex }
}
