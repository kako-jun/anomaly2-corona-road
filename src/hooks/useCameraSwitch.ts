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
  /** True while something must not see the camera change under it (the REPORT picker): a due delayed switch waits. */
  hold?: boolean
  fx: ReadonlySet<string>
  currentIndex: number
  count: number
  onSwitch: (to: number) => void
}) => {
  const { enabled, hold = false, fx, currentIndex, count, onSwitch } = opts
  const [pending, setPending] = useState<number | null>(null)
  const timer = useRef(0)
  const latest = useRef({ fx, currentIndex, count, onSwitch, pending, hold })
  latest.current = { fx, currentIndex, count, onSwitch, pending, hold }
  // the target of a delayed switch whose time came while `hold` was on
  const due = useRef<number | null>(null)

  const cancel = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = 0
    due.current = null
    setPending(null)
  }, [])
  const run = useCallback((to: number) => {
    setPending(null)
    latest.current.onSwitch(to)
  }, [])
  useEffect(() => {
    if (!hold && due.current !== null) {
      const to = due.current
      due.current = null
      run(to)
    }
  }, [hold, run])
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
      due.current = null
      if (plan.delayMs <= 0) {
        run(to)
        return
      }
      setPending(to)
      latest.current.pending = to
      timer.current = window.setTimeout(() => {
        timer.current = 0
        // never lose the switch ("it always switches"), only hold it back while the picker is open
        if (latest.current.hold) due.current = to
        else run(to)
      }, plan.delayMs)
    },
    [enabled, run]
  )

  return { request, lampIndex: pending ?? currentIndex }
}
