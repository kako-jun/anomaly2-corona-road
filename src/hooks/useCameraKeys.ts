import { useEffect } from 'react'

/** Camera keys: ArrowLeft/ArrowRight and A/D switch, 1..count select. Disabled while `enabled` is false. */
export const useCameraKeys = (
  enabled: boolean,
  count: number,
  onSwitch: (to: 'prev' | 'next' | number) => void
) => {
  useEffect(() => {
    if (!enabled) return
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat) return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === 'ArrowLeft' || key === 'a') onSwitch('prev')
      else if (key === 'ArrowRight' || key === 'd') onSwitch('next')
      else if (key.length === 1 && key >= '1' && key <= String(count))
        onSwitch(Number(key) - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled, count, onSwitch])
}
