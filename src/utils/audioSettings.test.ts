// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createAudioEngine } from './audioEngine'
import { initGameAudio, readAudioVolume, saveVolume } from './audioSettings'
import { makeMockContext } from './audioMock'
import { load, update } from './saveData'
import { resetProgress } from './shiftProgress'

// `update` merges (and drops a legacy `muted`), so a legacy save is planted straight into storage.
const plantLegacy = (settings: Record<string, unknown>) => {
  localStorage.setItem(
    'corona-road:save',
    JSON.stringify({ ...load(), settings })
  )
}

beforeEach(() => {
  update(cur => ({ ...cur, settings: undefined }))
})

describe('audio settings', () => {
  it('default to volume 70', () => {
    expect(readAudioVolume()).toBe(70)
  })

  it('are saved in settings and survive START OVER', () => {
    const engine = createAudioEngine({
      createContext: () => makeMockContext().ctx,
    })
    expect(saveVolume(35, engine)).toBe(35)
    expect(load().settings).toMatchObject({ volume: 35 })
    resetProgress()
    expect(readAudioVolume()).toBe(35)
  })

  it('volume 0 is the mute: it is saved and reaches the master gain', async () => {
    const m = makeMockContext()
    const engine = createAudioEngine({ createContext: () => m.ctx })
    await engine.unlock()
    saveVolume(0, engine)
    expect(load().settings?.volume).toBe(0)
    expect(engine.effectiveGain()).toBe(0)
    expect(
      (engine.master() as unknown as { gain: { value: number } }).gain.value
    ).toBe(0)
  })

  it('clamps an out-of-range volume before saving', () => {
    const engine = createAudioEngine({
      createContext: () => makeMockContext().ctx,
    })
    expect(saveVolume(250, engine)).toBe(100)
    expect(load().settings?.volume).toBe(100)
  })

  it('initGameAudio applies the saved volume to the engine', () => {
    update(cur => ({ ...cur, settings: { volume: 20 } }))
    const engine = createAudioEngine({
      createContext: () => makeMockContext().ctx,
    })
    const remove = initGameAudio(engine)
    expect(engine.getVolume()).toBe(20)
    remove()
  })

  // A cold start: the page loads with an old save in storage and no memory yet (fresh modules).
  const coldStart = async (settings: Record<string, unknown>) => {
    plantLegacy(settings)
    vi.resetModules()
    const audio = await import('./audioSettings')
    const eng = await import('./audioEngine')
    const store = await import('./saveData')
    const engine = eng.createAudioEngine({
      createContext: () => makeMockContext().ctx,
    })
    return { audio, engine, store }
  }

  it('a cold start with a legacy muted:true save is silent and the save now holds volume 0 without muted', async () => {
    const { audio, engine, store } = await coldStart({
      volume: 80,
      muted: true,
    })
    audio.initGameAudio(engine)()
    expect(engine.getVolume()).toBe(0)
    expect(store.load().settings).toEqual({ volume: 0 })
    audio.saveVolume(40, engine)
    expect(store.load().settings).toEqual({ volume: 40 })
  })

  it('a legacy muted:false save keeps its volume', async () => {
    const { audio, engine } = await coldStart({ volume: 55, muted: false })
    audio.initGameAudio(engine)()
    expect(engine.getVolume()).toBe(55)
  })
})
