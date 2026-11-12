/**
 * Sound foundation (#79): one shared AudioContext behind a thin wrapper. Master gain -> destination, so a volume or
 * mute change reaches every sound at once. The browser keeps a context suspended until a user gesture, so
 * `unlock()` (called from the first pointer/key event) creates and resumes it. Anything that fails (no
 * AudioContext, resume refused, a node throwing) is swallowed: the game goes on in silence.
 */

/** Volume the master starts at when the save has none (0..100). Provisional; to tune by ear. */
export const DEFAULT_VOLUME = 70
/** Ramp time (s) for volume / mute changes, so they do not click. */
const RAMP_S = 0.03

export interface AudioEngine {
  /** Create (first call) and resume the shared context. Call from a user gesture. Never throws. */
  unlock: () => Promise<void>
  /** The shared context and master node once unlocked; null before, or when audio is unavailable. */
  ctx: () => AudioContext | null
  master: () => GainNode | null
  setVolume: (v: number) => void
  setMuted: (m: boolean) => void
  getVolume: () => number
  isMuted: () => boolean
  /** Linear gain the master is meant to have now (0 while muted). */
  effectiveGain: () => number
}

export interface AudioEngineOptions {
  /** Factory for the context; defaults to `new AudioContext()`. Tests inject a mock. */
  createContext?: () => AudioContext
  volume?: number
  muted?: boolean
}

const clampVolume = (v: number): number =>
  Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : DEFAULT_VOLUME

export const createAudioEngine = (
  opts: AudioEngineOptions = {}
): AudioEngine => {
  let volume = clampVolume(opts.volume ?? DEFAULT_VOLUME)
  let muted = opts.muted ?? false
  let context: AudioContext | null = null
  let masterNode: GainNode | null = null
  let failed = false

  const effectiveGain = () => (muted ? 0 : volume / 100)

  const applyGain = () => {
    if (!context || !masterNode) return
    try {
      const t = context.currentTime
      masterNode.gain.cancelScheduledValues(t)
      masterNode.gain.setValueAtTime(masterNode.gain.value, t)
      masterNode.gain.linearRampToValueAtTime(effectiveGain(), t + RAMP_S)
    } catch {
      /* silent */
    }
  }

  const build = () => {
    if (context || failed) return
    try {
      const make =
        opts.createContext ??
        (() => {
          const Ctor =
            window.AudioContext ??
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext
          if (!Ctor) throw new Error('no AudioContext')
          return new Ctor()
        })
      context = make()
      masterNode = context.createGain()
      masterNode.gain.value = effectiveGain()
      masterNode.connect(context.destination)
    } catch {
      failed = true
      context = null
      masterNode = null
    }
  }

  return {
    unlock: async () => {
      build()
      if (!context) return
      try {
        if (context.state === 'suspended') await context.resume()
      } catch {
        /* a refused resume stays silent; the next gesture tries again */
      }
    },
    ctx: () => context,
    master: () => masterNode,
    setVolume: v => {
      volume = clampVolume(v)
      applyGain()
    },
    setMuted: m => {
      muted = m
      applyGain()
    },
    getVolume: () => volume,
    isMuted: () => muted,
    effectiveGain,
  }
}

/**
 * Unlock the engine on the first user gesture (pointerdown / keydown / touchend), once the context is running the
 * listeners go away. Returns a remover. Browsers differ on which gesture counts, hence three events.
 */
export const installAudioUnlock = (
  engine: AudioEngine,
  target: Pick<Window, 'addEventListener' | 'removeEventListener'> = window
): (() => void) => {
  const events = ['pointerdown', 'keydown', 'touchend'] as const
  const remove = () =>
    events.forEach(e => target.removeEventListener(e, onGesture))
  const onGesture = () => {
    void engine.unlock().then(() => {
      if (engine.ctx()?.state === 'running') remove()
    })
  }
  events.forEach(e => target.addEventListener(e, onGesture))
  return remove
}

/** The one engine the game uses. */
export const gameAudio: AudioEngine = createAudioEngine()
