import { useEffect, useRef } from 'react'

const WIDTH = 120
const HEIGHT = 160
const FPS = 12

/** Low-res TV noise, fresh random every frame (~12 fps). Animates only while the tab is visible and motion is allowed. */
export const NoiseCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const img = ctx.createImageData(WIDTH, HEIGHT)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const frame = () => {
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0
        d[i] = d[i + 1] = d[i + 2] = v
        d[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
      // occasional faint horizontal tear band
      if (Math.random() < 0.08) {
        ctx.fillStyle = 'rgba(255,255,255,.35)'
        ctx.fillRect(
          0,
          (Math.random() * HEIGHT) | 0,
          WIDTH,
          1 + ((Math.random() * 3) | 0)
        )
      }
    }

    let timer = 0
    const update = () => {
      window.clearInterval(timer)
      timer = 0
      if (!motion.matches && !document.hidden)
        timer = window.setInterval(frame, 1000 / FPS)
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
  }, [])

  return (
    <canvas
      ref={ref}
      className="fx noise"
      width={WIDTH}
      height={HEIGHT}
      aria-hidden="true"
    />
  )
}
