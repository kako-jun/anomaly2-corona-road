// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { createAudioEngine } from './audioEngine'
import {
  initGameAudio,
  readAudioSettings,
  saveMuted,
  saveVolume,
} from './audioSettings'
import { makeMockContext } from './audioMock'
import { load, update } from './saveData'
import { resetProgress } from './shiftProgress'

beforeEach(() => {
  update(cur => ({ ...cur, settings: undefined }))
})

describe('audio settings', () => {
  it('default to volume 70, not muted', () => {
    expect(readAudioSettings()).toEqual({ volume: 70, muted: false })
  })

  it('are saved in settings and survive START OVER', () => {
    const engine = createAudioEngine({
      createContext: () => makeMockContext().ctx,
    })
    saveVolume(35, engine)
    saveMuted(true, engine)
    expect(load().settings).toMatchObject({ volume: 35, muted: true })
    resetProgress()
    expect(readAudioSettings()).toEqual({ volume: 35, muted: true })
  })

  it('initGameAudio applies the saved values to the engine', () => {
    update(cur => ({ ...cur, settings: { volume: 20, muted: true } }))
    const engine = createAudioEngine({
      createContext: () => makeMockContext().ctx,
    })
    const remove = initGameAudio(engine)
    expect(engine.getVolume()).toBe(20)
    expect(engine.isMuted()).toBe(true)
    remove()
  })
})
