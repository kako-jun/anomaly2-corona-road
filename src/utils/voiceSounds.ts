import type { AudioEngine } from './audioEngine'
import type { SoundHandle } from './synthSounds'

export const VOICE_IDS = new Set([
  'RT-SND-06',
  'RT-SND-07',
  'RT-SND-12',
  'CR-SH-04',
  'CR-SH-06',
])
const MIN_SECONDS = 60
const FADE = 1
const CURVE_POINTS = 64
/** A failed load is tried again this many times in all, 5 s then doubling (5, 10, 20, 40 s), and then left alone. */
export const VOICE_RETRY_LIMIT = 5
export const voiceRetryDelay = (attempt: number): number => 5000 * 2 ** attempt
/** How often the loop tops up copies, measured against the audio clock. */
const REFILL_MS = 1000

/** Voices whose file answered with a valid length (metadata only; nothing decoded is kept). */
const available = new Set<string>()
/** Voices decoded at least once in this page's life: the player may have heard them, so they are never taken back. */
const loaded = new Set<string>()

/** The single decoded voice kept in memory (a 70 s buffer is ~13 MB; five at once would be ~69 MB). */
let resident: { id: string; buffer: AudioBuffer } | null = null
const pending = new Map<string, Promise<boolean>>()
/** Voices some holder still needs; `acquireVoice` keeps a buffer only for one of them. */
const wanted = new Set<string>()

/** The file to fetch: Ogg Vorbis where the browser plays it for sure, otherwise AAC in m4a (older iOS Safari has no Vorbis). */
export const voiceUrl = (id: string): string => {
  let ogg = false
  try {
    ogg =
      typeof Audio !== 'undefined' &&
      new Audio().canPlayType('audio/ogg; codecs="vorbis"') === 'probably'
  } catch {
    ogg = false
  }
  return `${import.meta.env.BASE_URL}audio/${id.toLowerCase()}.${ogg ? 'ogg' : 'm4a'}`
}

/** A voice is a spawn candidate only after its file reported a long enough duration. */
export const voiceReady = (id: string): boolean =>
  !VOICE_IDS.has(id) || available.has(id)

/** True once this voice was decoded successfully (a later failed reload, e.g. offline, does not make it unplayable). */
export const voiceWasLoaded = (id: string): boolean => loaded.has(id)

/** Ask each file for its length through a metadata-only media element (no download of the whole file, no decoding). */
export const probeVoices = (): Promise<void> =>
  Promise.all(
    [...VOICE_IDS].map(
      id =>
        new Promise<void>(resolve => {
          if (available.has(id) || typeof Audio === 'undefined') {
            resolve()
            return
          }
          const el = new Audio()
          const done = () => {
            el.removeAttribute('src')
            el.load()
            resolve()
          }
          el.preload = 'metadata'
          el.onloadedmetadata = () => {
            if (el.duration >= MIN_SECONDS) available.add(id)
            done()
          }
          el.onerror = done
          el.src = voiceUrl(id)
        })
    )
  ).then(() => undefined)

/** Fetch and decode one voice and keep it as the only resident buffer. Resolves false when it cannot play. */
const acquireVoice = (engine: AudioEngine, id: string): Promise<boolean> => {
  const ctx = engine.ctx()
  if (!ctx || !VOICE_IDS.has(id)) return Promise.resolve(false)
  if (resident?.id === id) return Promise.resolve(true)
  let request = pending.get(id)
  if (!request) {
    request = fetch(voiceUrl(id))
      .then(response => {
        if (!response.ok) throw new Error('voice unavailable')
        return response.arrayBuffer()
      })
      .then(data => ctx.decodeAudioData(data))
      .then(buffer => {
        if (buffer.duration < MIN_SECONDS) {
          available.delete(id)
          return false
        }
        // Only the voice that is still wanted stays; a release during the load drops it.
        if (!wanted.has(id)) return false
        available.add(id)
        loaded.add(id)
        resident = { id, buffer }
        return true
      })
      .catch(() => {
        available.delete(id)
        return false
      })
      .finally(() => pending.delete(id))
    pending.set(id, request)
  }
  return request
}

export const holdVoice = (
  engine: AudioEngine,
  id: string
): Promise<boolean> => {
  wanted.clear()
  wanted.add(id)
  if (resident && resident.id !== id) resident = null
  return acquireVoice(engine, id)
}

/** Free the decoded buffer when nobody needs this voice any more. */
export const releaseVoice = (id: string): void => {
  wanted.delete(id)
  if (resident?.id === id) resident = null
}

const curve = (fadeIn: boolean): Float32Array => {
  const c = new Float32Array(CURVE_POINTS)
  for (let i = 0; i < CURVE_POINTS; i++) {
    const x = (i / (CURVE_POINTS - 1)) * (Math.PI / 2)
    c[i] = fadeIn ? Math.sin(x) : Math.cos(x)
  }
  return c
}

/** Schedule a long buffer in overlapping copies; stopping also cancels all future copies. */
export const playVoice = (
  engine: AudioEngine,
  id: string
): SoundHandle | null => {
  const ctx = engine.ctx()
  const master = engine.master()
  const buffer = resident?.id === id ? resident.buffer : undefined
  if (!ctx || !master || !buffer || ctx.state !== 'running') return null
  let stopped = false
  let timer: ReturnType<typeof setInterval> | undefined
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
      // Equal-power crossfade: the overlapping fade-out and fade-in keep the summed power steady.
      gain.gain.setValueAtTime(0, startAt)
      gain.gain.setValueCurveAtTime(curve(true), startAt, FADE)
      gain.gain.setValueAtTime(1, startAt + FADE)
      gain.gain.setValueAtTime(1, startAt + buffer.duration - FADE)
      gain.gain.setValueCurveAtTime(
        curve(false),
        startAt + buffer.duration - FADE,
        FADE
      )
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
  // Two copies are reserved on the audio clock before playback starts; later ones are added whenever
  // the next start is less than one whole buffer ahead, so timer jitter cannot open a gap.
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
  timer = setInterval(() => {
    while (!stopped && nextStart - ctx.currentTime < buffer.duration) schedule()
  }, REFILL_MS)
  return {
    stop: () => {
      if (stopped) return
      stopped = true
      if (timer) clearInterval(timer)
      timer = undefined
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
