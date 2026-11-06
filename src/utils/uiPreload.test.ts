// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { preloadCabinet } from './uiPreload'

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
