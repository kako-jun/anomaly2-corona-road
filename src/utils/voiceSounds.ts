import type { AudioEngine } from './audioEngine'
import type { SoundHandle } from './synthSounds'

export const VOICE_IDS = new Set([
  'RT-SND-06',
  'RT-SND-07',
  'RT-SND-12',
  'CR-SH-04',
  'CR-SH-06',
])
const cache = new Map<string, AudioBuffer>()
const pending = new Map<string, Promise<void>>()
const MIN_SECONDS = 60
const FADE = 1

/** A voice is a spawn candidate only after its file is fetched, decoded and validated. */
export const voiceReady = (id: string): boolean =>
  !VOICE_IDS.has(id) || cache.has(id)

export const preloadVoices = async (engine: AudioEngine): Promise<void> => {
  const ctx = engine.ctx()
  if (!ctx) return
  await Promise.all(
    [...VOICE_IDS].map(id => {
      if (cache.has(id)) return Promise.resolve()
      let request = pending.get(id)
      if (!request) {
        request = fetch(
          `${import.meta.env.BASE_URL}audio/${id.toLowerCase()}.ogg`
        )
          .then(response => {
            if (!response.ok) throw new Error('voice unavailable')
            return response.arrayBuffer()
          })
          .then(data => ctx.decodeAudioData(data))
          .then(buffer => {
            if (buffer.duration >= MIN_SECONDS) cache.set(id, buffer)
          })
          .catch(() => {
            /* unavailable files cannot spawn; retry on the next preload */
          })
          .finally(() => pending.delete(id))
        pending.set(id, request)
      }
      return request
    })
  )
}

/** Schedule a long buffer in overlapping copies; stopping also cancels all future copies. */
export const playVoice = (
  engine: AudioEngine,
  id: string
): SoundHandle | null => {
  const ctx = engine.ctx()
  const master = engine.master()
  const buffer = cache.get(id)
  if (!ctx || !master || !buffer || ctx.state !== 'running') return null
  let stopped = false
  let timer: ReturnType<typeof setTimeout> | undefined
  let nextStart = ctx.currentTime + 0.05
  const nodes = new Set<{ source: AudioBufferSourceNode; gain: GainNode }>()
  const schedule = () => {
    if (stopped) return
    try {
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const gain = ctx.createGain()
      source.connect(gain).connect(master)
      const startAt = nextStart
      nextStart += buffer.duration - FADE
      gain.gain.setValueAtTime(0, startAt)
      gain.gain.linearRampToValueAtTime(1, startAt + FADE)
      gain.gain.setValueAtTime(1, startAt + buffer.duration - FADE)
      gain.gain.linearRampToValueAtTime(0, startAt + buffer.duration)
      const node = { source, gain }
      nodes.add(node)
      source.onended = () => {
        nodes.delete(node)
        source.disconnect()
        gain.disconnect()
      }
      source.start(startAt)
    } catch {
      // If node creation or playback fails, stop future scheduling and leave the game responsive.
      stopped = true
    }
  }
  // Two copies are reserved on the audio clock before playback starts. Later copies are
  // scheduled more than a whole buffer ahead, so timer jitter does not create a gap.
  schedule()
  schedule()
  if (stopped) {
    nodes.forEach(({ source }) => {
      try {
        source.stop()
      } catch {
        /* already stopped */
      }
    })
    return null
  }
  const refill = () => {
    if (stopped) return
    schedule()
    timer = setTimeout(refill, (buffer.duration - FADE) * 1000)
  }
  timer = setTimeout(refill, (buffer.duration / 2) * 1000)
  return {
    stop: () => {
      if (stopped) return
      stopped = true
      if (timer) clearTimeout(timer)
      nodes.forEach(({ source, gain }) => {
        try {
          const now = ctx.currentTime
          gain.gain.cancelScheduledValues(now)
          gain.gain.setValueAtTime(gain.gain.value, now)
          gain.gain.linearRampToValueAtTime(0, now + 0.03)
          source.stop(now + 0.04)
        } catch {
          /* already stopped */
        }
      })
    },
  }
}
