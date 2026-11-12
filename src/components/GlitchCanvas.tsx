import { useEffect, useRef } from 'react'
import { seededRandom } from '../utils/feedGlitch'

const WIDTH = 120
const HEIGHT = 160

interface GlitchCanvasProps {
  /** `blocks`: coarse compression blocks that change ~8 times a second. `deadpixels`: fixed dots, drawn once. */
  kind: 'blocks' | 'deadpixels'
  /** Seeds the fixed dots so each camera keeps its own. */
  seed: number
}

/** Low-res canvas for the two glitches that are drawn rather than filtered (#78). Like NoiseCanvas it animates only while the tab is visible and motion is allowed. */
export const GlitchCanvas = ({ kind, seed }: GlitchCanvasProps) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    if (kind === 'deadpixels') {
      const rnd = seededRandom(seed)
      ctx.clearRect(0, 0, WIDTH, HEIGHT)
      for (let i = 0; i < 70; i++) {
        const x = (rnd() * WIDTH) | 0
        const y = (rnd() * HEIGHT) | 0
        const r = rnd()
        ctx.fillStyle =
          r < 0.4 ? '#000' : r < 0.7 ? '#fff' : r < 0.85 ? '#f22' : '#2f4'
        ctx.fillRect(x, y, 1 + ((rnd() * 2) | 0), 1 + ((rnd() * 2) | 0))
      }
      return
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const frame = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT)
      // a grid of 8x8 blocks; a random part of them turns flat grey / tinted, like a broken video decode
      for (let by = 0; by < HEIGHT; by += 8) {
        for (let bx = 0; bx < WIDTH; bx += 8) {
          if (Math.random() > 0.5) continue
          const v = 60 + ((Math.random() * 150) | 0)
          const tint = (Math.random() * 40) | 0
          ctx.fillStyle = `rgba(${v + tint},${v},${v + 40 - tint},0.6)`
          ctx.fillRect(bx, by, 8, 8)
        }
      }
    }
    let timer = 0
    const update = () => {
      window.clearInterval(timer)
      timer = 0
      if (!motion.matches && !document.hidden)
        timer = window.setInterval(frame, 125)
    }
    frame()
    motion.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    update()
    return () => {
      window.clearInterval(timer)
      motion.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [kind, seed])

  return (
    <canvas
      ref={ref}
      className={`fx glitch-canvas glitch-${kind}`}
      width={WIDTH}
      height={HEIGHT}
      aria-hidden="true"
    />
  )
}
