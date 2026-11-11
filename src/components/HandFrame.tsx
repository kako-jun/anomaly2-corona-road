import { useEffect, useRef, useState } from 'react'
import { FRAMES } from '../data/noteFrames'
import type { FrameName } from '../data/noteFrames'
import { frameBaseWidth, frameEdges } from '../utils/handFrame'

/**
 * A hand-ruled box outline (#297): four separate straight edges drawn over the box that holds it, in the colour
 * of the surrounding text (`currentColor`). Decoration only (aria-hidden); it follows the box's size, so a frame
 * around a stamp fits whatever the language makes the stamp.
 */
export const HandFrame = ({ name }: { name: FrameName }) => {
  const ref = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  useEffect(() => {
    const box = ref.current?.parentElement
    if (!box) return
    const measure = () => setSize({ w: box.offsetWidth, h: box.offsetHeight })
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])
  const edges =
    size && size.w > 0 && size.h > 0
      ? frameEdges(size.w, size.h, FRAMES[name], frameBaseWidth(name))
      : []
  return (
    <svg
      ref={ref}
      className="note-hand-frame"
      width={size?.w ?? 0}
      height={size?.h ?? 0}
      aria-hidden="true"
    >
      {edges.map((e, i) => (
        <polygon
          key={i}
          points={e.points
            .map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`)
            .join(' ')}
          fill="currentColor"
          fillOpacity={e.alpha}
        />
      ))}
    </svg>
  )
}
