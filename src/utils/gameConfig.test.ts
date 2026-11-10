import { describe, it, expect } from 'vitest'
import {
  DEFAULT_CONFIG,
  DIALOGUE_CONFIG,
  getGamePhase,
  msToGameTime,
} from './gameConfig'

describe('msToGameTime (22:00 -> 06:00 over 480 s)', () => {
  it('starts at 22:00', () => {
    expect(msToGameTime(0)).toBe('22:00')
  })
  it('advances one in-game minute per real second', () => {
    expect(msToGameTime(1_000)).toBe('22:01')
    expect(msToGameTime(10_000)).toBe('22:10')
    expect(msToGameTime(60_000)).toBe('23:00')
    expect(msToGameTime(59_999)).toBe('22:59')
  })
  it('crosses midnight', () => {
    expect(msToGameTime(119_000)).toBe('23:59')
    expect(msToGameTime(120_000)).toBe('00:00')
    expect(msToGameTime(121_000)).toBe('00:01')
  })
  it('clamps below 0 to 22:00 and beyond the end to 06:00', () => {
    expect(msToGameTime(-1_000)).toBe('22:00')
    expect(msToGameTime(480_001)).toBe('06:00')
    expect(msToGameTime(900_000)).toBe('06:00')
  })
  it('reaches 06:00 at the end of the shift', () => {
    expect(DEFAULT_CONFIG.totalDurationMs).toBe(480_000)
    expect(msToGameTime(DEFAULT_CONFIG.totalDurationMs - 1000)).toBe('05:59')
    expect(msToGameTime(DEFAULT_CONFIG.totalDurationMs)).toBe('06:00')
  })
})

describe('getGamePhase (thirds of the shift)', () => {
  it('switches at 160 s and 320 s', () => {
    expect(getGamePhase(0)).toBe('early')
    expect(getGamePhase(159_999)).toBe('early')
    expect(getGamePhase(160_000)).toBe('mid')
    expect(getGamePhase(319_999)).toBe('mid')
    expect(getGamePhase(320_000)).toBe('late')
    expect(getGamePhase(480_000)).toBe('late')
  })
})

describe('midpoint comment time', () => {
  it('is half of the shift', () => {
    expect(DIALOGUE_CONFIG.midpointAtSec * 1000).toBe(
      DEFAULT_CONFIG.totalDurationMs / 2,
    )
  })
})
