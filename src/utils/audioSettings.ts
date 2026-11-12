/**
 * Sound settings (#79): the master volume and the mute switch live in the save's `settings` (docs/save-data.md), so
 * they survive START OVER and stay on this device when a transfer code is imported. `initGameAudio` is called once at
 * start-up: it applies the saved values to the shared engine and arms the first-gesture unlock.
 */
import {
  AudioEngine,
  DEFAULT_VOLUME,
  gameAudio,
  installAudioUnlock,
} from './audioEngine'
import { load, update } from './saveData'

export const readAudioSettings = (): { volume: number; muted: boolean } => {
  const s = load().settings
  return { volume: s?.volume ?? DEFAULT_VOLUME, muted: s?.muted ?? false }
}

export const initGameAudio = (
  engine: AudioEngine = gameAudio
): (() => void) => {
  const { volume, muted } = readAudioSettings()
  engine.setVolume(volume)
  engine.setMuted(muted)
  return installAudioUnlock(engine)
}

export const saveVolume = (
  volume: number,
  engine: AudioEngine = gameAudio
): void => {
  engine.setVolume(volume)
  update(cur => ({
    ...cur,
    settings: { ...cur.settings, volume: engine.getVolume() },
  }))
}

export const saveMuted = (
  muted: boolean,
  engine: AudioEngine = gameAudio
): void => {
  engine.setMuted(muted)
  update(cur => ({ ...cur, settings: { ...cur.settings, muted } }))
}
