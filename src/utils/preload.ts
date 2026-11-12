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

/** Longest wait for an idle slot (ms). The game runs rAF + a noise canvas every frame, so on a weak device idle time may never come. */
export const IDLE_TIMEOUT_MS = 2000

export const idleSchedule = (fn: () => void) => {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  }
  if (w.requestIdleCallback) {
    w.requestIdleCallback(fn, { timeout: IDLE_TIMEOUT_MS })
  } else {
    window.setTimeout(fn, 200)
  }
}

/** The image kept for one camera photo (decoded when the browser allows it). */
export interface CameraImage {
  src: string
  decoding?: string
  fetchPriority?: string
  decode?: () => Promise<void>
}

/**
 * Download and decode the base photo of every camera, including the ones not on screen, so the first
 * switch to a camera does not show the picture late (#396). Not part of the 800KB UI budget
 * (`uiAssets.test.ts`): about 3MB, low priority, started on idle time after the title's own preload.
 * Each URL is requested once (a repeated call returns the same promise); a failed image is ignored
 * (the camera loads it as usual when it is switched to). The images are held in `cameraImageCache`,
 * since a decoded image nobody refers to can be dropped.
 */
export const cameraImageCache = new Map<string, CameraImage>()

export const createCameraPreloader = (
  urls: readonly string[],
  deps: {
    createImage: () => CameraImage
    schedule: (fn: () => void) => void
    cache?: Map<string, CameraImage>
  }
): (() => Promise<void>) => {
  let started: Promise<void> | undefined
  const cache = deps.cache ?? cameraImageCache
  return () => {
    if (started) return started
    started = new Promise<void>(resolve => {
      deps.schedule(() => {
        const jobs = [...new Set(urls)].map(url => {
          const img = deps.createImage()
          img.decoding = 'async'
          img.fetchPriority = 'low'
          img.src = url
          cache.set(url, img)
          return Promise.resolve(img.decode?.()).catch(() => {})
        })
        void Promise.all(jobs).then(() => resolve())
      })
    })
    return started
  }
}
