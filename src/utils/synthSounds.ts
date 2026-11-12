/**
 * Minimal WebAudio synthesis for the sound anomalies (#79): oscillators, filtered noise, gain envelopes. Every
 * recipe returns a handle (`stop()` fades it out) or null when audio is not running. Which ledger sounds are made
 * this way and which need recorded/generated material is listed in docs/audio.md. Recipes are provisional sketches
 * to tune by ear (kako-jun's real-device check); the anomalies themselves arrive in later PRs.
 */
import type { AudioEngine } from './audioEngine'

export interface SoundHandle {
  stop: () => void
}

export type SynthName =
  | 'hum'
  | 'buzz'
  | 'knock'
  | 'footsteps'
  | 'chime'
  | 'shutter'
  | 'stinger'

const noiseBuffers = new WeakMap<BaseAudioContext, AudioBuffer>()

/** One second of white noise per context (cached). */
export const noiseBuffer = (ctx: BaseAudioContext): AudioBuffer => {
  let b = noiseBuffers.get(ctx)
  if (!b) {
    b = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
    const d = b.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    noiseBuffers.set(ctx, b)
  }
  return b
}

interface Ctx {
  ctx: AudioContext
  out: AudioNode
}

const env = (
  g: GainNode,
  t: number,
  peak: number,
  attack: number,
  dur: number
) => {
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(peak, t + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
}

const tone = (
  { ctx, out }: Ctx,
  type: OscillatorType,
  freq: number,
  t: number,
  peak: number,
  dur: number,
  attack = 0.005
) => {
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, t)
  env(g, t, peak, attack, dur)
  o.connect(g).connect(out)
  o.start(t)
  o.stop(t + dur + 0.05)
}

const noiseHit = (
  { ctx, out }: Ctx,
  t: number,
  peak: number,
  dur: number,
  filter: BiquadFilterType,
  freq: number,
  q = 1
) => {
  const s = ctx.createBufferSource()
  s.buffer = noiseBuffer(ctx)
  const f = ctx.createBiquadFilter()
  f.type = filter
  f.frequency.value = freq
  f.Q.value = q
  const g = ctx.createGain()
  env(g, t, peak, 0.002, dur)
  s.connect(f).connect(g).connect(out)
  s.start(t)
  s.stop(t + dur + 0.05)
}

/**
 * A sustained sound: `build` wires its sources into the given node and returns them; they start at once behind a
 * gain that fades in, and `stop()` fades them out and stops them.
 */
const sustained = (
  { ctx, out }: Ctx,
  level: number,
  build: (dest: AudioNode) => AudioScheduledSourceNode[]
): SoundHandle => {
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, ctx.currentTime)
  g.gain.linearRampToValueAtTime(level, ctx.currentTime + 0.4)
  g.connect(out)
  const sources = build(g)
  sources.forEach(src => src.start())
  return {
    stop: () => {
      try {
        const t = ctx.currentTime
        g.gain.cancelScheduledValues(t)
        g.gain.setValueAtTime(g.gain.value, t)
        g.gain.linearRampToValueAtTime(0.0001, t + 0.3)
        sources.forEach(src => src.stop(t + 0.35))
      } catch {
        /* already stopped */
      }
    },
  }
}

const RECIPES: Record<SynthName, (c: Ctx) => SoundHandle> = {
  /** Low mains hum: 50 Hz + 100 Hz sines. */
  hum: c =>
    sustained(c, 0.25, dest =>
      [50, 100].map(f => {
        const o = c.ctx.createOscillator()
        o.frequency.value = f
        o.connect(dest)
        return o
      })
    ),
  /** Fluorescent buzz: 100 Hz sawtooth through a band-pass, amplitude-flickered. */
  buzz: c =>
    sustained(c, 0.5, dest => {
      const o = c.ctx.createOscillator()
      o.type = 'sawtooth'
      o.frequency.value = 100
      const f = c.ctx.createBiquadFilter()
      f.type = 'bandpass'
      f.frequency.value = 1800
      f.Q.value = 4
      const am = c.ctx.createGain()
      am.gain.value = 0.7
      const lfo = c.ctx.createOscillator()
      lfo.frequency.value = 7
      const lfoGain = c.ctx.createGain()
      lfoGain.gain.value = 0.3
      lfo.connect(lfoGain).connect(am.gain)
      o.connect(f).connect(am).connect(dest)
      return [o, lfo]
    }),
  /** Three knocks on something hard: a low thump plus a noise tick. */
  knock: c => {
    const t0 = c.ctx.currentTime + 0.02
    ;[0, 0.28, 0.52].forEach(dt => {
      tone(c, 'sine', 110, t0 + dt, 0.6, 0.12, 0.002)
      noiseHit(c, t0 + dt, 0.3, 0.05, 'lowpass', 900)
    })
    return { stop: () => {} }
  },
  /** Distant footsteps: low-passed noise thuds, alternating pitch. */
  footsteps: c => {
    const t0 = c.ctx.currentTime + 0.02
    for (let i = 0; i < 6; i++)
      noiseHit(c, t0 + i * 0.55, 0.5, 0.12, 'lowpass', i % 2 ? 260 : 200, 2)
    return { stop: () => {} }
  },
  /** A generic two-note phone alert (no real product's tune). */
  chime: c => {
    const t0 = c.ctx.currentTime + 0.02
    tone(c, 'sine', 1318, t0, 0.35, 0.35)
    tone(c, 'sine', 1760, t0 + 0.12, 0.35, 0.5)
    return { stop: () => {} }
  },
  /** Camera shutter: two short noise clicks. */
  shutter: c => {
    const t0 = c.ctx.currentTime + 0.02
    noiseHit(c, t0, 0.5, 0.03, 'highpass', 2500)
    noiseHit(c, t0 + 0.07, 0.4, 0.05, 'bandpass', 1800, 2)
    return { stop: () => {} }
  },
  /** Short dissonant cluster (minor second + tritone). */
  stinger: c => {
    const t0 = c.ctx.currentTime + 0.02
    ;[220, 233, 311].forEach(f => tone(c, 'sawtooth', f, t0, 0.18, 0.7, 0.02))
    return { stop: () => {} }
  },
}

/**
 * Play a recipe on the engine. Returns null (and does nothing) when audio is not unlocked/available or the recipe
 * throws, so callers never need a try/catch.
 */
export const playSynth = (
  engine: AudioEngine,
  name: SynthName
): SoundHandle | null => {
  const ctx = engine.ctx()
  const out = engine.master()
  if (!ctx || !out || ctx.state !== 'running') return null
  try {
    return RECIPES[name]({ ctx, out })
  } catch {
    return null
  }
}
