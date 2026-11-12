// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { createAudioEngine } from './audioEngine'
import { initGameAudio, readAudioVolume, saveVolume } from './audioSettings'
import { makeMockContext } from './audioMock'
import { load, update } from './saveData'
import { resetProgress } from './shiftProgress'

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

  it('reads a legacy muted:true save as volume 0 and drops it on the next save', () => {
    update(cur => ({ ...cur, settings: { volume: 80, muted: true } }))
    expect(readAudioVolume()).toBe(0)
    const engine = createAudioEngine({
      createContext: () => makeMockContext().ctx,
    })
    initGameAudio(engine)()
    expect(engine.getVolume()).toBe(0)
    saveVolume(40, engine)
    expect(load().settings).toEqual({ volume: 40 })
  })

  it('a legacy muted:false save keeps its volume', () => {
    update(cur => ({ ...cur, settings: { volume: 55, muted: false } }))
    expect(readAudioVolume()).toBe(55)
  })
})
