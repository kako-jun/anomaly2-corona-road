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
