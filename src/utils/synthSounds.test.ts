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

  it.each(NAMES)(
    '%s: summed peaks stay within headroom at full volume',
    async name => {
      const m = makeMockContext()
      const engine = createAudioEngine({
        createContext: () => m.ctx,
        volume: 100,
      })
      await engine.unlock()
      playSynth(engine, name)
      // Worst case: at any moment, every source that is sounding is at its envelope peak. Each oscillator / noise
      // source is unit amplitude behind its own gain, so the sum of the gain peaks active at that moment bounds the
      // output. Gains with no schedule (LFO depth, buzz) modulate rather than sound and are skipped.
      const ev = m.nodes
        .filter(n => n.kind === 'gain' && n !== (engine.master() as unknown))
        .map(n => n.gain as { peak: number; start: number; end: number })
        .filter(g => Number.isFinite(g.start) && g.peak > 0)
      const at = (t: number) =>
        ev
          .filter(g => g.start <= t && t <= g.end)
          .reduce((a, g) => a + g.peak, 0)
      const sum = Math.max(0, ...ev.map(g => at(g.start + 0.0001)))
      const oscMul = name === 'hum' ? 2 : 1 // hum: two unit sines share one gain
      expect(sum * oscMul).toBeLessThanOrEqual(1)
    }
  )
})
