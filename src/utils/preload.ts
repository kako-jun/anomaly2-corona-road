/**
 * Warm the browser cache with the overlay images while the player is busy, so an anomaly does not
 * pop in late when its image is first requested. Idempotent per preloader (a re-mount or a new shift
 * does not load twice). Images are requested in small batches on idle time with low priority, so
 * the first frames of a shift are not slowed down. ~110 overlays are ~1.3 MB; ~300 is ~3.6 MB, so
 * preloading all of them is fine (re-measure with `du -sh assets/anomaly-overlays` if that grows a lot).
 */
export interface PreloadDeps {
  createImage: () => {
    src: string
    decoding?: string
    fetchPriority?: string
  }
  /** Run `fn` when the browser is idle. */
  schedule: (fn: () => void) => void
  batchSize?: number
}

export const createOverlayPreloader = (
  urls: readonly string[],
  deps: PreloadDeps
): (() => void) => {
  let started = false
  // Keep references so the requests are not cancelled by garbage collection.
  const held: unknown[] = []
  return () => {
    if (started) return
    started = true
    const queue = [...new Set(urls)]
    const size = deps.batchSize ?? 8
    const step = () => {
      for (const url of queue.splice(0, size)) {
        const img = deps.createImage()
        img.decoding = 'async'
        img.fetchPriority = 'low'
        img.src = url
        held.push(img)
      }
      if (queue.length > 0) deps.schedule(step)
    }
    deps.schedule(step)
  }
}

export const idleSchedule = (fn: () => void) => {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void) => number
  }
  if (w.requestIdleCallback) w.requestIdleCallback(fn)
  else window.setTimeout(fn, 200)
}
