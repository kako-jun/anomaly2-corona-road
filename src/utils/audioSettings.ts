/**
 * Sound settings (#79): the master volume (0..100) lives in the save's `settings.volume` (docs/save-data.md), so it
 * survives START OVER and stays on this device when a transfer code is imported. Volume 0 is the mute (the VOL knob;
 * there is no separate switch). An older save may still carry `settings.muted: true`: it is read as volume 0 so a
 * muted player stays silent, and it is dropped the next time the volume is saved. `initGameAudio` is called once at
 * start-up: it applies the saved volume to the shared engine and arms the first-gesture unlock.
 */
import {
  AudioEngine,
  DEFAULT_VOLUME,
  gameAudio,
  installAudioUnlock,
} from './audioEngine'
import { load, update } from './saveData'

export const readAudioVolume = (): number => {
  const s = load().settings
  if (s?.muted === true) return 0
  return s?.volume ?? DEFAULT_VOLUME
}

export const initGameAudio = (
  engine: AudioEngine = gameAudio
): (() => void) => {
  engine.setVolume(readAudioVolume())
  return installAudioUnlock(engine)
}

/** Apply a new volume to the engine and save it (also drops a legacy `muted`). Returns the clamped value. */
export const saveVolume = (
  volume: number,
  engine: AudioEngine = gameAudio
): number => {
  engine.setVolume(volume)
  const v = engine.getVolume()
  update(cur => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { muted: _legacyMuted, ...rest } = cur.settings ?? {}
    return { ...cur, settings: { ...rest, volume: v } }
  })
  return v
}
