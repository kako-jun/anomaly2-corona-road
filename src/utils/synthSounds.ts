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
  | 'button'
  | 'knob'
  | 'paper'
  | 'static'
  | 'wobble'
  | 'beat'
  | 'dishes'
  | 'radio'
  | 'humGrow'

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
  build: (dest: AudioNode) => AudioScheduledSourceNode[],
  fade = 0.4,
  initial = 0.0001
): SoundHandle => {
  const g = ctx.createGain()
  g.gain.setValueAtTime(initial, ctx.currentTime)
  g.gain.linearRampToValueAtTime(level, ctx.currentTime + fade)
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
  beat: c => {
    const t = c.ctx.currentTime + 0.02
    const interval = 0.24 + Math.random() * 0.08
    for (let i = 0; i < 8; i++) {
      noiseHit(c, t + i * interval, 0.18, 0.05, 'highpass', 4500)
      if (i % 2 === 0) tone(c, 'sine', 190, t + i * interval, 0.16, 0.09)
    }
    return { stop: () => {} }
  },
  dishes: c => {
    const t = c.ctx.currentTime + 0.02
    const pitch = (Math.random() - 0.5) * 100
    ;[0, 0.17, 0.49].forEach((d, i) => {
      ;[1170, 1683, 2330].forEach((f, j) =>
        tone(c, 'sine', f + pitch + i * 37, t + d, 0.14 / (j + 1), 0.22)
      )
    })
    return { stop: () => {} }
  },
  radio: c => {
    const t = c.ctx.currentTime + 0.02
    const interval = 0.27 + Math.random() * 0.07
    ;[392, 440, 523, 440, 349, 392].forEach((f, i) => {
      if (i !== 3) tone(c, 'triangle', f, t + i * interval, 0.18, 0.22)
      noiseHit(c, t + i * interval, 0.1, 0.19, 'bandpass', 1400)
    })
    return { stop: () => {} }
  },
  wobble: c =>
    sustained(c, 0.02, dest => {
      const tones = [50, 100, 300].map(freq => {
        const tone = c.ctx.createOscillator()
        tone.frequency.value = freq
        tone.connect(dest)
        return tone
      })
      const lfo = c.ctx.createOscillator()
      lfo.frequency.value = 0.4
      const depth = c.ctx.createGain()
      depth.gain.value = 35
      lfo.connect(depth).connect(tones[2].frequency)
      return [...tones, lfo]
    }),
  humGrow: c =>
    sustained(
      c,
      0.14,
      dest =>
        [50, 100, 300].map(f => {
          const o = c.ctx.createOscillator()
          o.frequency.value = f
          o.connect(dest)
          return o
        }),
      5,
      0.02
    ),
  button: c => {
    const t = c.ctx.currentTime + 0.01
    noiseHit(c, t, 0.24, 0.045, 'bandpass', 2100, 0.7)
    noiseHit(c, t + 0.012, 0.09, 0.035, 'lowpass', 700)
    return { stop: () => {} }
  },
  knob: c => {
    noiseHit(c, c.ctx.currentTime + 0.01, 0.25, 0.055, 'bandpass', 1800, 2)
    return { stop: () => {} }
  },
  paper: c => {
    const t = c.ctx.currentTime + 0.01
    ;[0, 0.08, 0.16].forEach((d, i) =>
      noiseHit(c, t + d, 0.18, 0.16, 'bandpass', 900 + i * 500)
    )
    return { stop: () => {} }
  },
  static: c => {
    noiseHit(c, c.ctx.currentTime + 0.01, 0.2, 0.09, 'bandpass', 2600)
    return { stop: () => {} }
  },
  /** Low mains hum: 50 Hz + 100 Hz + 300 Hz sines. */
  hum: c =>
    sustained(c, 0.02, dest =>
      [50, 100, 300].map(f => {
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
    const spacing = 0.85 + Math.random() * 0.3
    ;[0, 0.28, 0.52].forEach(dt => {
      tone(c, 'sine', 110, t0 + dt * spacing, 0.6, 0.12, 0.002)
      noiseHit(c, t0 + dt * spacing, 0.3, 0.05, 'lowpass', 900)
    })
    return { stop: () => {} }
  },
  /** Distant footsteps: low-passed noise thuds, alternating pitch. */
  footsteps: c => {
    const t0 = c.ctx.currentTime + 0.02
    const pace = 0.85 + Math.random() * 0.3
    ;[0, 0.8, 1.48, 2.04, 2.49, 2.85].forEach((dt, i) =>
      noiseHit(
        c,
        t0 + dt * pace,
        0.25 + i * 0.11,
        0.12,
        'lowpass',
        450 + i * 90,
        2
      )
    )
    return { stop: () => {} }
  },
  /** A generic two-note phone alert (no real product's tune). */
  chime: c => {
    const t0 = c.ctx.currentTime + 0.02
    const pitch = 0.96 + Math.random() * 0.08
    tone(c, 'sine', 1318 * pitch, t0, 0.35, 0.35)
    tone(c, 'sine', 1760 * pitch, t0 + 0.12, 0.35, 0.5)
    return { stop: () => {} }
  },
  /** Camera shutter: two short noise clicks. */
  shutter: c => {
    const t0 = c.ctx.currentTime + 0.02
    const gap = 0.06 + Math.random() * 0.03
    noiseHit(c, t0, 0.5, 0.03, 'highpass', 2500)
    noiseHit(c, t0 + gap, 0.4, 0.05, 'bandpass', 1800, 2)
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
    const gate = ctx.createGain()
    gate.connect(out)
    const sound = RECIPES[name]({ ctx, out: gate })
    if (
      name !== 'hum' &&
      name !== 'humGrow' &&
      name !== 'buzz' &&
      name !== 'wobble'
    )
      setTimeout(() => gate.disconnect(), 4000)
    return {
      stop: () => {
        sound.stop()
        const t = ctx.currentTime
        gate.gain.cancelScheduledValues(t)
        gate.gain.setValueAtTime(gate.gain.value, t)
        gate.gain.linearRampToValueAtTime(0, t + 0.03)
        setTimeout(() => gate.disconnect(), 100)
      },
    }
  } catch {
    return null
  }
}
