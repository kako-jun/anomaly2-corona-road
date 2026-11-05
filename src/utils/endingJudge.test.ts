import { describe, expect, it } from 'vitest'
import { CHILD_FOUND_PACING, DEFAULT_CONFIG } from './gameConfig'
import { isChildFound, judgeTimeUp, pacingFor } from './endingJudge'

describe('isChildFound', () => {
  it('is true only when the child flag is raised', () => {
    expect(isChildFound({})).toBe(false)
    expect(isChildFound({ child: false })).toBe(false)
    expect(isChildFound({ elder3: true })).toBe(false)
    expect(isChildFound({ child: true })).toBe(true)
  })
})

describe('pacingFor', () => {
  it('keeps the ordinary pacing before the child is found', () => {
    expect(pacingFor(false)).toEqual({
      anomalyIntervalMs: DEFAULT_CONFIG.anomalyIntervalMs,
      maxConcurrentAnomalies: DEFAULT_CONFIG.maxConcurrentAnomalies,
    })
  })
  it('makes anomalies come more often and allows more at once after it', () => {
    const p = pacingFor(true)
    expect(p).toEqual(CHILD_FOUND_PACING)
    expect(p.anomalyIntervalMs).toBeLessThan(DEFAULT_CONFIG.anomalyIntervalMs)
    expect(p.maxConcurrentAnomalies).toBeGreaterThan(
      DEFAULT_CONFIG.maxConcurrentAnomalies
    )
  })
})

describe('judgeTimeUp', () => {
  it('is dawn when nothing appeared after the child was found (also before the child)', () => {
    expect(judgeTimeUp({ spawnedAfterChild: 0, reportedAfterChild: 0 })).toBe(
      'dawn'
    )
  })
  it('is the ending when some appeared and none was reported', () => {
    expect(judgeTimeUp({ spawnedAfterChild: 1, reportedAfterChild: 0 })).toBe(
      'ending'
    )
    expect(judgeTimeUp({ spawnedAfterChild: 9, reportedAfterChild: 0 })).toBe(
      'ending'
    )
  })
  it('is dawn when even one of them was reported', () => {
    expect(judgeTimeUp({ spawnedAfterChild: 2, reportedAfterChild: 1 })).toBe(
      'dawn'
    )
    expect(judgeTimeUp({ spawnedAfterChild: 1, reportedAfterChild: 1 })).toBe(
      'dawn'
    )
  })
})
