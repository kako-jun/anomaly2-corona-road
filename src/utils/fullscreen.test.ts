// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  canFullscreen,
  fullscreenAvailable,
  isFullscreen,
  toggleFullscreen,
} from './fullscreen'

const ok = {
  fullscreenEnabled: true,
  documentElement: { requestFullscreen: () => {} },
}

describe('canFullscreen', () => {
  it('is offered where the Fullscreen API works', () => {
    expect(canFullscreen(ok, false)).toBe(true)
  })
  it('is not offered in a standalone PWA', () => {
    expect(canFullscreen(ok, true)).toBe(false)
  })
  it('is not offered when fullscreenEnabled is false or missing (iPhone Safari)', () => {
    expect(canFullscreen({ ...ok, fullscreenEnabled: false }, false)).toBe(
      false
    )
    expect(canFullscreen({ documentElement: ok.documentElement }, false)).toBe(
      false
    )
  })
  it('is not offered when requestFullscreen is missing', () => {
    expect(
      canFullscreen({ fullscreenEnabled: true, documentElement: {} }, false)
    ).toBe(false)
  })
})

describe('with the real document', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    delete (document as unknown as Record<string, unknown>).fullscreenEnabled
    delete (document as unknown as Record<string, unknown>).fullscreenElement
    delete (document as unknown as Record<string, unknown>).exitFullscreen
    delete (document.documentElement as unknown as Record<string, unknown>)
      .requestFullscreen
  })
  const stubMatch = (standalone: boolean) =>
    vi.stubGlobal('matchMedia', (q: string) => ({
      matches: standalone && q.includes('standalone'),
    }))
  it('fullscreenAvailable follows standalone via matchMedia', () => {
    Object.assign(document, { fullscreenEnabled: true })
    Object.assign(document.documentElement, { requestFullscreen: vi.fn() })
    stubMatch(false)
    expect(fullscreenAvailable()).toBe(true)
    stubMatch(true)
    expect(fullscreenAvailable()).toBe(false)
    vi.unstubAllGlobals()
  })
  it('toggle enters, then leaves, and swallows a refusal', async () => {
    const enter = vi.fn().mockResolvedValue(undefined)
    const exit = vi.fn().mockResolvedValue(undefined)
    Object.assign(document.documentElement, { requestFullscreen: enter })
    Object.assign(document, { exitFullscreen: exit, fullscreenElement: null })
    await toggleFullscreen()
    expect(enter).toHaveBeenCalledTimes(1)
    Object.assign(document, { fullscreenElement: document.documentElement })
    expect(isFullscreen()).toBe(true)
    await toggleFullscreen()
    expect(exit).toHaveBeenCalledTimes(1)
    Object.assign(document, { fullscreenElement: null })
    enter.mockRejectedValue(new Error('denied'))
    await expect(toggleFullscreen()).resolves.toBeUndefined()
  })
})
