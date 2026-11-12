import { describe, expect, it } from 'vitest'
import { createAudioEngine } from './audioEngine'
import { makeMockContext } from './audioMock'
import { SynthName, playSynth } from './synthSounds'

const NAMES: SynthName[] = [
  'hum',
  'buzz',
  'knock',
  'footsteps',
  'chime',
  'shutter',
  'stinger',
]

describe('synth sounds', () => {
  it('play nothing before the engine is unlocked', () => {
    const m = makeMockContext()
    const engine = createAudioEngine({ createContext: () => m.ctx })
    expect(playSynth(engine, 'chime')).toBeNull()
    expect(m.nodes).toHaveLength(1) // only the destination
  })

  it.each(NAMES)(
    '%s builds a graph that ends in the master node',
    async name => {
      const m = makeMockContext()
      const engine = createAudioEngine({ createContext: () => m.ctx })
      await engine.unlock()
      const before = m.nodes.length
      const h = playSynth(engine, name)
      expect(h).not.toBeNull()
      expect(m.nodes.length).toBeGreaterThan(before)
      const master = engine.master()
      expect(
        m.nodes.some(n =>
          (n.connections as unknown[]).includes(master as unknown)
        )
      ).toBe(true)
      expect(() => h?.stop()).not.toThrow()
    }
  )

  it('returns null instead of throwing when a node fails', async () => {
    const m = makeMockContext()
    const engine = createAudioEngine({ createContext: () => m.ctx })
    await engine.unlock()
    m.raw.createOscillator = () => {
      throw new Error('boom')
    }
    expect(playSynth(engine, 'hum')).toBeNull()
  })

  it.each(NAMES)('%s stays within headroom at full volume', async name => {
    const m = makeMockContext()
    const engine = createAudioEngine({
      createContext: () => m.ctx,
      volume: 100,
    })
    await engine.unlock()
    playSynth(engine, name)
    const peaks = m.nodes
      .filter(n => n.kind === 'gain' && n !== (engine.master() as unknown))
      .map(n => (n.gain as { peak: number }).peak)
    // no single envelope may exceed 0.6; sustained sounds stack at most 2 unit oscillators behind one gain (<= 1)
    expect(Math.max(0, ...peaks)).toBeLessThanOrEqual(0.6)
    const oscs = m.nodes.filter(n => n.kind === 'oscillator').length
    if (name === 'hum') expect(peaks[0] * oscs).toBeLessThanOrEqual(1)
  })
})
