// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createOverlayPreloader,
  IDLE_TIMEOUT_MS,
  idleSchedule,
} from './preload'

const setup = (urls: string[], batchSize?: number) => {
  const images: { src: string; decoding?: string; fetchPriority?: string }[] =
    []
  const queued: (() => void)[] = []
  const preload = createOverlayPreloader(urls, {
    createImage: () => {
      const img = { src: '' }
      images.push(img)
      return img
    },
    schedule: fn => queued.push(fn),
    batchSize,
  })
  const flush = () => {
    while (queued.length) queued.shift()!()
  }
  return { preload, images, queued, flush }
}

describe('createOverlayPreloader', () => {
  it('does nothing until called, and does not load synchronously (idle only)', () => {
    const { preload, images, queued } = setup(['/a.webp'])
    expect(images).toHaveLength(0)
    preload()
    expect(images).toHaveLength(0)
    expect(queued).toHaveLength(1)
  })

  it('loads every url with async decoding and low priority', () => {
    const { preload, images, flush } = setup(['/a.webp', '/b.webp'])
    preload()
    flush()
    expect(images.map(i => i.src)).toEqual(['/a.webp', '/b.webp'])
    expect(images.every(i => i.decoding === 'async')).toBe(true)
    expect(images.every(i => i.fetchPriority === 'low')).toBe(true)
  })

  it('works in batches, one idle slot per batch', () => {
    const urls = Array.from({ length: 10 }, (_, i) => `/${i}.webp`)
    const { preload, images, queued } = setup(urls, 4)
    preload()
    queued.shift()!()
    expect(images).toHaveLength(4)
    expect(queued).toHaveLength(1)
    queued.shift()!()
    expect(images).toHaveLength(8)
    queued.shift()!()
    expect(images).toHaveLength(10)
    expect(queued).toHaveLength(0)
  })

  it('loads each distinct url once', () => {
    const { preload, images, flush } = setup(['/a.webp', '/a.webp', '/b.webp'])
    preload()
    flush()
    expect(images).toHaveLength(2)
  })

  it('is idempotent: calling again (re-mount, new shift) does not load twice', () => {
    const { preload, images, queued, flush } = setup(['/a.webp'])
    preload()
    preload()
    expect(queued).toHaveLength(1)
    flush()
    preload()
    flush()
    expect(images).toHaveLength(1)
  })

  it('handles an empty list', () => {
    const { preload, images, flush } = setup([])
    preload()
    flush()
    expect(images).toHaveLength(0)
  })
})

describe('idleSchedule', () => {
  afterEach(() => {
    delete (window as { requestIdleCallback?: unknown }).requestIdleCallback
    vi.useRealTimers()
  })

  it('passes a timeout to requestIdleCallback so it still runs when the page is never idle', () => {
    const ric = vi.fn()
    ;(window as { requestIdleCallback?: unknown }).requestIdleCallback = ric
    const fn = vi.fn()
    idleSchedule(fn)
    expect(ric).toHaveBeenCalledWith(fn, { timeout: IDLE_TIMEOUT_MS })
    expect(IDLE_TIMEOUT_MS).toBe(2000)
  })

  it('falls back to a short timer where requestIdleCallback does not exist', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    idleSchedule(fn)
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(IDLE_TIMEOUT_MS)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('a preload driven by the timeout path still completes without any idle time', () => {
    vi.useFakeTimers()
    const imgs: { src: string }[] = []
    const preload = createOverlayPreloader(['/a', '/b', '/c'], {
      createImage: () => {
        const i = { src: '' }
        imgs.push(i)
        return i
      },
      schedule: idleSchedule,
      batchSize: 1,
    })
    preload()
    vi.advanceTimersByTime(IDLE_TIMEOUT_MS * 3)
    expect(imgs.map(i => i.src)).toEqual(['/a', '/b', '/c'])
  })
})
