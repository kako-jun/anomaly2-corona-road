import { afterEach, describe, expect, it, vi } from 'vitest'
import { createAudioEngine } from './audioEngine'
import { makeMockContext, type MockNode } from './audioMock'
import {
  holdVoice,
  playVoice,
  probeVoices,
  releaseVoice,
  voiceReady,
  voiceUrl,
} from './voiceSounds'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

const D = 68
const FADE = 1

const setup = async (opts: { oggOk?: boolean } = {}) => {
  vi.useFakeTimers()
  const mock = makeMockContext()
  const ctx = mock.ctx as AudioContext & {
    decodeAudioData: (data: ArrayBuffer) => Promise<AudioBuffer>
  }
  ctx.decodeAudioData = vi
    .fn()
    .mockResolvedValue({ duration: D } as AudioBuffer)
  const fetched: string[] = []
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      fetched.push(url)
      return { ok: true, arrayBuffer: async () => new ArrayBuffer(10) }
    })
  )
  class FakeAudio {
    preload = ''
    onloadedmetadata: (() => void) | null = null
    onerror: (() => void) | null = null
    duration = 0
    canPlayType = () => (opts.oggOk === false ? '' : 'probably')
    removeAttribute = () => {}
    load = () => {}
    set src(url: string) {
      if (url.includes('rt-snd-07')) this.onerror?.()
      else {
        this.duration = url.includes('rt-snd-12') ? 30 : D
        this.onloadedmetadata?.()
      }
    }
  }
  vi.stubGlobal('Audio', FakeAudio)
  const engine = createAudioEngine({ createContext: () => ctx })
  await engine.unlock()
  return { mock, engine, fetched }
}

const sources = (mock: ReturnType<typeof makeMockContext>) =>
  mock.nodes.filter(n => n.kind === 'buffersource')
const gainOf = (src: MockNode, mock: ReturnType<typeof makeMockContext>) =>
  mock.nodes.find(n => n.kind === 'gain' && src.connections.includes(n))!

describe('voice file selection and probing', () => {
  it('picks m4a where Ogg Vorbis is not certain, and only voices of 60 s or more are ready', async () => {
    await setup({ oggOk: false })
    expect(voiceUrl('RT-SND-06')).toMatch(/audio\/rt-snd-06\.m4a$/)
    vi.stubGlobal(
      'Audio',
      class {
        canPlayType = () => 'probably'
      }
    )
    expect(voiceUrl('RT-SND-06')).toMatch(/audio\/rt-snd-06\.ogg$/)
    await setup()
    await probeVoices()
    expect(voiceReady('RT-SND-06')).toBe(true)
    expect(voiceReady('RT-SND-07')).toBe(false) // metadata error
    expect(voiceReady('RT-SND-12')).toBe(false) // too short
    expect(voiceReady('RT-SND-03')).toBe(true) // not a voice
  })
})

describe('resident voice buffer', () => {
  it('removes an unavailable voice from future draws and restores it after a successful retry', async () => {
    const { engine } = await setup()
    await probeVoices()
    expect(voiceReady('RT-SND-06')).toBe(true)
    vi.mocked(fetch).mockRejectedValueOnce(new Error('network'))
    expect(await holdVoice(engine, 'RT-SND-06')).toBe(false)
    expect(voiceReady('RT-SND-06')).toBe(false)
    expect(await holdVoice(engine, 'RT-SND-06')).toBe(true)
    expect(voiceReady('RT-SND-06')).toBe(true)
    releaseVoice('RT-SND-06')
  })
  it('keeps one decoded voice at a time and frees it on release', async () => {
    const { engine, fetched } = await setup()
    expect(await holdVoice(engine, 'RT-SND-06')).toBe(true)
    expect(playVoice(engine, 'RT-SND-06')).not.toBeNull()
    expect(await holdVoice(engine, 'CR-SH-06')).toBe(true)
    expect(playVoice(engine, 'RT-SND-06')).toBeNull() // the first was dropped
    expect(fetched).toHaveLength(2)
    releaseVoice('CR-SH-06')
    expect(playVoice(engine, 'CR-SH-06')).toBeNull()
  })

  it('drops a voice released while it was still loading', async () => {
    const { engine } = await setup()
    const loading = holdVoice(engine, 'CR-SH-04')
    releaseVoice('CR-SH-04')
    expect(await loading).toBe(false)
    expect(playVoice(engine, 'CR-SH-04')).toBeNull()
  })
})

describe('voice loop timing', () => {
  it('starts each copy one length minus the fade apart, crossfades over the fade, and stops all future copies', async () => {
    const { mock, engine } = await setup()
    await holdVoice(engine, 'RT-SND-06')
    const handle = playVoice(engine, 'RT-SND-06')
    expect(handle).not.toBeNull()
    const t0 = 0.05
    let list = sources(mock)
    expect(list).toHaveLength(2)
    expect(list.map(s => (s.starts as number[])[0])).toEqual([
      t0,
      t0 + (D - FADE),
    ])
    // equal-power fade-in at the start and fade-out ending at the end of each copy
    for (const [k, src] of list.entries()) {
      const start = t0 + k * (D - FADE)
      const curves = (
        gainOf(src, mock).gain as {
          events: { type: string; time?: number; duration?: number }[]
        }
      ).events.filter(e => e.type === 'curve')
      expect(curves).toEqual([
        expect.objectContaining({ time: start, duration: FADE, value: 1 }),
        expect.objectContaining({
          time: start + D - FADE,
          duration: FADE,
          value: expect.closeTo(0, 6),
        }),
      ])
    }
    // the clock has not come close to the next start: nothing is added
    ;(mock.raw as { currentTime: number }).currentTime = 10
    vi.advanceTimersByTime(5000)
    expect(sources(mock)).toHaveLength(2)
    // when the next start is less than one length ahead, one more copy follows on the grid
    ;(mock.raw as { currentTime: number }).currentTime = 67
    vi.advanceTimersByTime(1000)
    list = sources(mock)
    expect(list).toHaveLength(3)
    expect((list[2].starts as number[])[0]).toBeCloseTo(t0 + 2 * (D - FADE), 6)
    handle?.stop()
    ;(mock.raw as { currentTime: number }).currentTime = 200
    vi.advanceTimersByTime(300000)
    expect(sources(mock)).toHaveLength(3)
    for (const s of list)
      expect((s.stops as number[]).length).toBeGreaterThan(0)
  })
})
