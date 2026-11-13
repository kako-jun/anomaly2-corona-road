import { describe, expect, it, vi } from 'vitest'
import { createUpdater } from './swUpdate'

const make = () => {
  const io = { skipWaiting: vi.fn(), reload: vi.fn() }
  return { io, u: createUpdater(io) }
}

describe('service worker update timing (#388)', () => {
  it('a waiting version is not applied while the player is in a shift, result or ending', () => {
    const { io, u } = make()
    u.setSafe(false)
    u.onNeedRefresh()
    expect(io.skipWaiting).not.toHaveBeenCalled()
    expect(io.reload).not.toHaveBeenCalled()
  })
  it('it is applied when the title is reached (and only once)', () => {
    const { io, u } = make()
    u.onNeedRefresh()
    u.setSafe(true)
    expect(io.skipWaiting).toHaveBeenCalledTimes(1)
    u.setSafe(false)
    u.setSafe(true)
    expect(io.skipWaiting).toHaveBeenCalledTimes(1)
  })
  it('on the title the waiting version is applied at once', () => {
    const { io, u } = make()
    u.setSafe(true)
    u.onNeedRefresh()
    expect(io.skipWaiting).toHaveBeenCalledTimes(1)
  })
  it('another tab took over while this tab is mid-shift: no reload now, reload at the title', () => {
    const { io, u } = make()
    u.setSafe(false)
    u.onNeedRefresh()
    u.onNeedReload()
    expect(io.reload).not.toHaveBeenCalled()
    u.setSafe(true)
    expect(io.reload).toHaveBeenCalledTimes(1)
    // This tab never has to ask the worker itself: it was already activated.
    expect(io.skipWaiting).not.toHaveBeenCalled()
  })
  it('a tab on the title reloads when the worker takes over', () => {
    const { io, u } = make()
    u.setSafe(true)
    u.onNeedReload()
    expect(io.reload).toHaveBeenCalledTimes(1)
  })
})
