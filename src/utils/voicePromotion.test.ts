import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import type { Anomaly } from '../types/game'
import type { NonImageEntry } from './anomalyLedger'
import { pickSpawn } from './anomalyData'
import {
  hasNonImageEffect,
  soundOnCamera,
  voiceToHold,
} from './nonImageEffects'
import { VOICE_IDS } from './voiceSounds'

const entry = (id: string): NonImageEntry => ({
  id,
  category: 'Environment',
  anomalyType: 'sound',
})
const voices = [...VOICE_IDS].map(entry)
const running = (id: string, cameraId: number): Anomaly =>
  ({ id, cameraId }) as unknown as Anomaly

describe('the five voices are promoted (#407)', () => {
  const ledger = parse(
    readFileSync(join(process.cwd(), 'prompts/anomalies.yaml'), 'utf8')
  ) as { anomalies: { id: string; status?: string }[] }

  it('are produced in the ledger and have an effect', () => {
    expect(VOICE_IDS.size).toBe(5)
    for (const id of VOICE_IDS) {
      expect(ledger.anomalies.find(e => e.id === id)?.status, id).toBe(
        'produced'
      )
      expect(hasNonImageEffect(entry(id)), id).toBe(true)
    }
  })

  it('can be drawn on any camera, one anomaly per camera', () => {
    const seen = new Set<number>()
    for (let c = 1; c <= 4; c++) {
      const s = pickSpawn([], voices, [c], new Set(), { nonImageShare: 1 })
      expect(s?.kind).toBe('non_image')
      if (s?.kind === 'non_image') seen.add(s.cameraId)
    }
    expect(seen.size).toBe(4)
    // No free camera: nothing is drawn, so a camera never holds two anomalies.
    expect(
      pickSpawn([], voices, [], new Set(), { nonImageShare: 1 })
    ).toBeNull()
  })

  it('are not drawn while the volume is 0', () => {
    expect(
      pickSpawn([], voices, [1, 2], new Set(), {
        nonImageShare: 1,
        audible: false,
      })
    ).toBeNull()
  })

  it('keep one voice decoded when two run, and hold nothing once reported', () => {
    const list = [running('RT-SND-06', 1), running('CR-SH-04', 2)]
    expect(voiceToHold(list, 1)).toBe('RT-SND-06')
    expect(voiceToHold(list, 2)).toBe('CR-SH-04')
    expect(voiceToHold(list, 3, 'CR-SH-04')).toBe('CR-SH-04')
    const reported = list.map(a => ({ ...a, detectedAt: 5 }) as Anomaly)
    expect(voiceToHold(reported, 1)).toBeUndefined()
    expect(soundOnCamera(reported, 1)).toBeUndefined()
    expect(soundOnCamera(list, 1)?.id).toBe('RT-SND-06')
  })
})
