// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LedgerEntry } from '../utils/anomalyLedger'
import { DEFAULT_CONFIG } from '../utils/gameConfig'
import { useGameState } from './useGameState'

// A small, controllable ledger instead of the real one (mutated in place per test).
const ledger = vi.hoisted(() => [] as LedgerEntry[])
const preload = vi.hoisted(() => vi.fn())
vi.mock('../data/anomalyLedger', () => ({
  ANOMALY_LEDGER: ledger,
  overlayUrlFor: (e: { id: string }) => {
    if (e.id.startsWith('broken')) throw new Error('Overlay image not bundled')
    return `/overlay/${e.id}.webp`
  },
  preloadOverlays: preload,
}))

const entry = (
  id: string,
  cameraId: number,
  category: LedgerEntry['category'] = 'Object'
): LedgerEntry => ({
  id,
  cameraId,
  category,
  overlay: `assets/${id}.webp`,
  origin: { x: 1, y: 2 },
  size: { w: 3, h: 4 },
})

/** Advance in small chunks so effects (ref sync) run between game-loop ticks. */
const advance = (ms: number) => {
  for (let left = ms; left > 0; left -= 500) {
    act(() => void vi.advanceTimersByTime(Math.min(500, left)))
  }
}
const FIRST = DEFAULT_CONFIG.firstAnomalyDelayMs
const INTERVAL = DEFAULT_CONFIG.anomalyIntervalMs

beforeEach(() => {
  vi.useFakeTimers()
  ledger.length = 0
})
afterEach(() => {
  vi.useRealTimers()
})

const start = () => {
  const hook = renderHook(() => useGameState())
  act(() => hook.result.current.startGame())
  return hook
}

describe('rule constants are unchanged by the ledger connection', () => {
  it('keeps the shift rules', () => {
    expect(DEFAULT_CONFIG).toEqual({
      totalDurationMs: 360_000,
      firstAnomalyDelayMs: 12_000,
      anomalyIntervalMs: 30_000,
      maxConcurrentAnomalies: 2,
      maxMisreports: 3,
      minCorrectReports: 4,
    })
  })
})

describe('spawning from the ledger', () => {
  it('spawns nothing before the first delay and one anomaly right after', () => {
    ledger.push(entry('a', 1))
    const { result } = start()
    advance(FIRST - 100)
    expect(result.current.stats.totalAnomalies).toBe(0)
    expect(result.current.activeAnomalies).toEqual([])
    advance(200)
    expect(result.current.stats.totalAnomalies).toBe(1)
    expect(result.current.activeAnomalies).toHaveLength(1)
  })

  it('builds the anomaly from the ledger entry with the resolved overlay URL', () => {
    ledger.push(entry('a', 1, 'Person'))
    const { result } = start()
    advance(FIRST + 100)
    expect(result.current.activeAnomalies[0]).toMatchObject({
      id: 'a',
      cameraId: 1,
      category: 'Person',
      phase: 'early',
      overlay: { url: '/overlay/a.webp' },
    })
  })

  it('never shows the same ledger entry twice in a shift, then stops when used up', () => {
    ledger.push(entry('a', 1))
    const { result } = start()
    advance(FIRST + 100)
    act(() => result.current.reportAnomaly('Object')) // resolve it: camera 1 is free again
    advance(INTERVAL * 2)
    expect(result.current.stats.totalAnomalies).toBe(1)
    expect(result.current.activeAnomalies.map(a => a.id)).toEqual(['a'])
  })

  it('does not spawn on a camera that already has an unresolved anomaly (one per camera)', () => {
    ledger.push(entry('a1', 1), entry('a2', 1))
    const { result } = start()
    advance(FIRST + 100)
    advance(INTERVAL)
    expect(result.current.stats.totalAnomalies).toBe(1)
  })

  it('spawns on a camera again once its anomaly is resolved', () => {
    ledger.push(entry('a1', 1), entry('a2', 1))
    const { result } = start()
    advance(FIRST + 100)
    act(() => result.current.reportAnomaly('Object'))
    advance(INTERVAL)
    expect(result.current.stats.totalAnomalies).toBe(2)
    expect(result.current.activeAnomalies.map(a => a.id).sort()).toEqual([
      'a1',
      'a2',
    ])
  })

  it('respects the concurrent cap (and counts only real spawns)', () => {
    ledger.push(entry('a', 1), entry('b', 2), entry('c', 3))
    const { result } = start()
    advance(FIRST + 100 + INTERVAL * 2)
    expect(result.current.stats.totalAnomalies).toBe(
      DEFAULT_CONFIG.maxConcurrentAnomalies
    )
  })

  it('an empty ledger stops spawning for the shift (no retries)', () => {
    const { result } = start()
    advance(FIRST + 100)
    expect(result.current.stats.totalAnomalies).toBe(0)
    ledger.push(entry('late', 1))
    advance(FIRST + INTERVAL * 2)
    expect(result.current.stats.totalAnomalies).toBe(0)
  })

  it('a failed spawn for lack of a free camera does not use up the interval: retry after ~1 s', () => {
    // Both entries sit on camera 1: after 'a' spawns, 'b' has no free camera.
    ledger.push(entry('a', 1), entry('b', 1))
    const { result } = start()
    advance(FIRST + 100)
    expect(result.current.stats.totalAnomalies).toBe(1)
    advance(INTERVAL + 2000) // the interval elapses; the attempt fails (camera 1 busy)
    expect(result.current.stats.totalAnomalies).toBe(1)
    act(() => result.current.reportAnomaly('Object')) // frees camera 1
    // Retries on a ~1 s cadence, so 'b' comes right away instead of one more 30 s interval later.
    advance(1500)
    expect(result.current.stats.totalAnomalies).toBe(2)
  })

  it('does not retry every frame while no camera is free', () => {
    ledger.push(entry('a', 1), entry('b', 1))
    const { result } = start()
    advance(FIRST + 100)
    const some = vi.spyOn(ledger, 'some')
    advance(INTERVAL + 10_000) // first attempt ~30 s after the spawn, then once a second
    expect(result.current.stats.totalAnomalies).toBe(1)
    expect(some.mock.calls.length).toBeGreaterThanOrEqual(5)
    expect(some.mock.calls.length).toBeLessThanOrEqual(15) // a frame loop would be ~600
  })

  it('skips an entry whose overlay cannot be resolved and spawns another, without stopping the loop', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // rng = 0 picks the first entry, so the broken one is tried first (deterministic).
    vi.spyOn(Math, 'random').mockReturnValue(0)
    ledger.push(entry('broken1', 1), entry('ok', 1))
    const { result } = start()
    advance(FIRST + 100)
    expect(result.current.activeAnomalies.map(a => a.id)).toEqual(['ok'])
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('broken1'),
      expect.anything()
    )
    // the loop keeps running: time still advances
    advance(1000)
    expect(result.current.stats.currentTime).toBeGreaterThan(FIRST)
  })

  it('stops spawning when only unresolvable entries are left', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    ledger.push(entry('broken1', 1), entry('broken2', 2))
    const { result } = start()
    advance(FIRST + INTERVAL * 2)
    expect(result.current.stats.totalAnomalies).toBe(0)
    expect(result.current.gameState).toBe('playing')
  })

  it('starts the overlay preload when play begins (and not before)', () => {
    preload.mockClear()
    const hook = renderHook(() => useGameState())
    expect(preload).not.toHaveBeenCalled()
    act(() => hook.result.current.startGame())
    expect(preload).toHaveBeenCalled()
  })

  it('after a successful first spawn the longer interval applies', () => {
    ledger.push(entry('a', 1), entry('b', 2))
    const { result } = start()
    advance(FIRST + 100)
    advance(INTERVAL - 1000)
    expect(result.current.stats.totalAnomalies).toBe(1)
    advance(1500)
    expect(result.current.stats.totalAnomalies).toBe(2)
  })

  it('startGame resets the used ids, so entries can appear again in the next shift', () => {
    ledger.push(entry('a', 1))
    const { result } = start()
    advance(FIRST + 100)
    expect(result.current.stats.totalAnomalies).toBe(1)
    act(() => result.current.startGame())
    expect(result.current.activeAnomalies).toEqual([])
    expect(result.current.stats.totalAnomalies).toBe(0)
    advance(FIRST + 100)
    expect(result.current.stats.totalAnomalies).toBe(1)
    expect(result.current.activeAnomalies[0].id).toBe('a')
  })
})

describe('reporting', () => {
  const withAnomaly = (category: LedgerEntry['category'] = 'Object') => {
    ledger.push(entry('a', 1, category))
    const hook = start()
    advance(FIRST + 100)
    return hook
  }

  it('right camera + right category resolves it and counts a correct report', () => {
    const { result } = withAnomaly()
    act(() => result.current.reportAnomaly('Object'))
    expect(result.current.stats.correctReports).toBe(1)
    expect(result.current.stats.detectedAnomalies).toBe(1)
    expect(result.current.stats.misreports).toBe(0)
    expect(result.current.activeAnomalyHere).toBeUndefined()
    expect(result.current.feedback?.kind).toBe('correct')
  })

  it('right camera + wrong category is a false report and leaves it unresolved', () => {
    const { result } = withAnomaly('Object')
    act(() => result.current.reportAnomaly('Person'))
    expect(result.current.stats.misreports).toBe(1)
    expect(result.current.stats.correctReports).toBe(0)
    expect(result.current.activeAnomalyHere?.id).toBe('a')
    expect(result.current.feedback?.message).toMatch(/WRONG CATEGORY/)
  })

  it('wrong camera + right category is a false report and leaves it unresolved', () => {
    const { result } = withAnomaly()
    act(() => result.current.switchCamera(1))
    act(() => result.current.reportAnomaly('Object'))
    expect(result.current.stats.misreports).toBe(1)
    expect(result.current.feedback?.message).toMatch(/NO ANOMALY HERE/)
    act(() => result.current.switchCamera(0))
    expect(result.current.activeAnomalyHere?.id).toBe('a')
  })

  it('reporting on a camera with no anomaly is a false report', () => {
    ledger.push(entry('a', 2))
    const { result } = start()
    act(() => result.current.reportAnomaly('Object'))
    expect(result.current.stats.misreports).toBe(1)
  })

  it('a resolved anomaly cannot be reported twice', () => {
    const { result } = withAnomaly()
    act(() => result.current.reportAnomaly('Object'))
    act(() => result.current.reportAnomaly('Object'))
    expect(result.current.stats.correctReports).toBe(1)
    expect(result.current.stats.misreports).toBe(1)
  })

  it('activeAnomalyHere follows the current camera', () => {
    const { result } = withAnomaly()
    expect(result.current.activeAnomalyHere?.cameraId).toBe(1)
    act(() => result.current.switchCamera('next'))
    expect(result.current.activeAnomalyHere).toBeUndefined()
  })
})
