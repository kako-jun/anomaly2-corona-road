import { useEffect, useState } from 'react'
import { BURST_MS, GAP_MS, between, makeBands } from '../utils/titleFx'
import type { Band } from '../utils/titleFx'
import { NoiseCanvas } from './NoiseCanvas'

/**
 * Random short bursts of the monitor's horizontal-line noise over the title photo: the same canvas noise and
 * scanlines as the cabinet (`.fx.noise`, `.fx.scan`) plus white tear bands. Nothing at all with
 * prefers-reduced-motion.
 */
export const TitleNoise = () => {
  const [bands, setBands] = useState<Band[] | null>(null)
  useEffect(() => {
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (motion?.matches) return
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
  }, [])
  if (!bands) return null
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
