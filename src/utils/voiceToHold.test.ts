import { describe, expect, it } from 'vitest'
import type { Anomaly } from '../types/game'
import { voiceToHold } from './nonImageEffects'

const a = (id: string, cameraId: number, detectedAt?: number): Anomaly =>
  ({ id, cameraId, detectedAt }) as unknown as Anomaly

describe('voiceToHold', () => {
  it('prefers the voice on the watched camera', () => {
    const list = [a('RT-SND-06', 1), a('CR-SH-04', 2)]
    expect(voiceToHold(list, 2, 'RT-SND-06')).toBe('CR-SH-04')
  })
  it('keeps the current voice on a camera without a voice', () => {
    const list = [a('RT-SND-06', 1), a('CR-SH-04', 2)]
    expect(voiceToHold(list, 3, 'CR-SH-04')).toBe('CR-SH-04')
  })
  it('moves to another open voice once the current one is reported', () => {
    const list = [a('RT-SND-06', 1), a('CR-SH-04', 2, 100)]
    expect(voiceToHold(list, 3, 'CR-SH-04')).toBe('RT-SND-06')
  })
  it('holds nothing when no voice is open', () => {
    expect(voiceToHold([a('CR-SH-04', 2, 100), a('RT-SND-03', 1)], 1)).toBe(
      undefined
    )
  })
})
