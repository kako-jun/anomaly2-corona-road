import { afterEach, describe, expect, it, vi } from 'vitest'
import { createAudioEngine } from './audioEngine'
import { makeMockContext } from './audioMock'
import { playVoice, preloadVoices, voiceReady } from './voiceSounds'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('voice file playback', () => {
  it('decodes available long voices, excludes failures and loops with overlap until stopped', async () => {
    vi.useFakeTimers()
    const mock = makeMockContext()
    const ctx = mock.ctx as AudioContext & {
      decodeAudioData: (data: ArrayBuffer) => Promise<AudioBuffer>
    }
    ctx.decodeAudioData = vi
      .fn()
      .mockResolvedValue({ duration: 68 } as AudioBuffer)
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => ({
        ok: !url.endsWith('rt-snd-07.ogg'),
        arrayBuffer: async () => new ArrayBuffer(10),
      }))
    )
    const engine = createAudioEngine({ createContext: () => ctx })
    await engine.unlock()
    await preloadVoices(engine)
    expect(voiceReady('RT-SND-06')).toBe(true)
    expect(voiceReady('RT-SND-07')).toBe(false)
    const handle = playVoice(engine, 'RT-SND-06')
    expect(handle).not.toBeNull()
    expect(mock.nodes.filter(n => n.kind === 'buffersource')).toHaveLength(2)
    vi.advanceTimersByTime(34000)
    expect(mock.nodes.filter(n => n.kind === 'buffersource')).toHaveLength(3)
    handle?.stop()
    vi.advanceTimersByTime(200000)
    expect(mock.nodes.filter(n => n.kind === 'buffersource')).toHaveLength(3)
    expect(playVoice(engine, 'RT-SND-07')).toBeNull()
  })
})
