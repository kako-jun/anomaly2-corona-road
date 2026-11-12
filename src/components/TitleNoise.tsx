import { useEffect, useState } from 'react'
import { BURST_MS, GAP_MS, between, makeBands } from '../utils/titleFx'
import type { Band } from '../utils/titleFx'
import { NoiseCanvas } from './NoiseCanvas'

/**
 * Random bursts (0.4-1.1 s, every 0.8-3.5 s) of the monitor's horizontal-line noise over the title photo: the same canvas noise and
 * scanlines as the cabinet (`.fx.noise`, `.fx.scan`) plus white tear bands. Nothing at all with
 * prefers-reduced-motion.
 */
export const TitleNoise = () => {
  const [bands, setBands] = useState<Band[] | null>(null)
  // Follows the setting while the page is open: turning "reduce motion" on stops the bursts at once.
  const [reduced, setReduced] = useState(
    () =>
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  )
  useEffect(() => {
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!motion) return
    const on = () => setReduced(motion.matches)
    motion.addEventListener('change', on)
    on()
    return () => motion.removeEventListener('change', on)
  }, [])
  useEffect(() => {
    if (reduced) {
      setBands(null)
      return
    }
    let timer = 0
    let tick = 0
    const wait = () => {
      timer = window.setTimeout(burst, between(GAP_MS, Math.random()))
    }
    const burst = () => {
      setBands(makeBands(Math.random))
      tick = window.setInterval(
        () => setBands(makeBands(Math.random)),
        1000 / 12
      )
      timer = window.setTimeout(
        () => {
          window.clearInterval(tick)
          setBands(null)
          wait()
        },
        between(BURST_MS, Math.random())
      )
    }
    wait()
    return () => {
      window.clearTimeout(timer)
      window.clearInterval(tick)
    }
  }, [reduced])
  if (!bands || reduced) return null
  return (
    <div className="start-burst" aria-hidden="true" data-testid="title-noise">
      <NoiseCanvas />
      <div className="fx scan" />
      {bands.map((b, i) => (
        <div
          key={i}
          className="start-band"
          style={{ top: `${b.top}%`, height: `${b.height}%` }}
        />
      ))}
    </div>
  )
}
