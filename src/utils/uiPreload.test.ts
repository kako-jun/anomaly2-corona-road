// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { preloadCabinet, titleNoteUrls } from './uiPreload'

describe('preloadCabinet', () => {
  afterEach(() => {
    document.head.innerHTML = ''
    vi.unstubAllGlobals()
  })

  it('waits for the images listed by cabinet preload links', async () => {
    document.head.innerHTML =
      '<link data-cabinet-image href="/ui/surface.webp">'
    let finish!: () => void
    const decoded = new Promise<void>(resolve => {
      finish = resolve
    })
    const decode = vi.fn(() => decoded)
    vi.stubGlobal(
      'Image',
      class {
        src = ''
        decode = decode
      }
    )
    const ready = vi.fn()
    const pending = preloadCabinet().then(ready)
    await Promise.resolve()
    expect(decode).toHaveBeenCalledOnce()
    expect(ready).not.toHaveBeenCalled()
    finish()
    await pending
    expect(ready).toHaveBeenCalledOnce()
  })
})

describe('titleNoteUrls (#296)', () => {
  it('lists the chosen language only', () => {
    const ja = titleNoteUrls('ja')
    const en = titleNoteUrls('en')
    expect(ja).toHaveLength(3)
    expect(en).toHaveLength(3)
    expect(ja.every(u => u.includes('/ja-'))).toBe(true)
    expect(en.every(u => u.includes('/en-'))).toBe(true)
  })
})

import { createCameraPreloader, type CameraImage } from './preload'
import { CAMERAS } from './gameConfig'

describe('camera image preload (#396)', () => {
  const setup = (decode: (url: string) => Promise<void>) => {
    const requested: string[] = []
    const cache = new Map<string, CameraImage>()
    const load = createCameraPreloader(
      CAMERAS.map(c => c.image),
      {
        createImage: () => {
          const img: CameraImage = {
            src: '',
            decode: () => decode(img.src),
          }
          Object.defineProperty(img, 'src', {
            set: (v: string) => requested.push(v),
            get: () => requested[requested.length - 1] ?? '',
          })
          return img
        },
        schedule: fn => fn(),
        cache,
      }
    )
    return { requested, cache, load }
  }

  it('requests all eight cameras once, low priority, and holds them', async () => {
    const { requested, cache, load } = setup(() => Promise.resolve())
    await load()
    await load()
    expect(requested).toHaveLength(8)
    expect(new Set(requested).size).toBe(8)
    expect(requested).toEqual(CAMERAS.map(c => c.image))
    expect([...cache.keys()]).toEqual(requested)
  })

  it('continues when an image fails to decode', async () => {
    const { requested, load } = setup(url =>
      url.endsWith('cam3.webp')
        ? Promise.reject(new Error('x'))
        : Promise.resolve()
    )
    await expect(load()).resolves.toBeUndefined()
    expect(requested).toHaveLength(8)
  })
})

import { reportNoteUrls } from '../data/reportNotes'

describe('report note preload (#396)', () => {
  it('lists the five pictures of one language only', () => {
    const ja = reportNoteUrls('ja')
    const en = reportNoteUrls('en')
    expect(ja).toHaveLength(5)
    expect(en).toHaveLength(5)
    expect(ja.every(u => u.startsWith('/report-notes/ja-'))).toBe(true)
    expect(en.every(u => u.startsWith('/report-notes/en-'))).toBe(true)
  })

  it('requests each picture once, low priority, and ignores a failed one', async () => {
    const requested: string[] = []
    const cache = new Map<string, CameraImage>()
    const load = createCameraPreloader(reportNoteUrls('en'), {
      createImage: () => {
        const img: CameraImage = {
          src: '',
          decode: () =>
            img.src.endsWith('en-object.webp')
              ? Promise.reject(new Error('x'))
              : Promise.resolve(),
        }
        let src = ''
        Object.defineProperty(img, 'src', {
          set: (v: string) => {
            src = v
            requested.push(v)
          },
          get: () => src,
        })
        return img
      },
      schedule: fn => fn(),
      cache,
    })
    await expect(load()).resolves.toBeUndefined()
    await load()
    expect(requested).toEqual(reportNoteUrls('en'))
    expect([...cache.keys()]).toEqual(requested)
  })
})

describe('preloadReportNotes itself (#396)', () => {
  it('fetches each picture of the language once across calls, continues after a failure', async () => {
    const { preloadReportNotes, reportNoteImageCache } = await import(
      './uiPreload'
    )
    const requested: string[] = []
    class FakeImage {
      decoding = ''
      fetchPriority = ''
      private _src = ''
      get src() {
        return this._src
      }
      set src(v: string) {
        this._src = v
        requested.push(v)
      }
      decode() {
        return this._src.endsWith('ja-object.webp')
          ? Promise.reject(new Error('x'))
          : Promise.resolve()
      }
    }
    const origImage = globalThis.Image
    const w = window as unknown as { requestIdleCallback?: unknown }
    const origIdle = w.requestIdleCallback
    globalThis.Image = FakeImage as unknown as typeof Image
    w.requestIdleCallback = (fn: () => void) => fn()
    try {
      await expect(preloadReportNotes('ja')).resolves.toBeUndefined()
      await preloadReportNotes('ja')
      expect(requested).toEqual(reportNoteUrls('ja'))
      expect(requested).toHaveLength(5)
      expect(requested.every(u => u.includes('/ja-'))).toBe(true)
      expect([...reportNoteImageCache.keys()]).toEqual(requested)
    } finally {
      globalThis.Image = origImage
      w.requestIdleCallback = origIdle
    }
  })
})
