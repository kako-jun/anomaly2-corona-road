// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LedgerEntry } from '../utils/anomalyLedger'
import * as saveData from '../utils/saveData'
import { CHILD_FOUND_PACING, DEFAULT_CONFIG } from '../utils/gameConfig'
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

// Small flags instead of the provisional real ones (20/50/100 found): 'two' at 2 found, 'loopy' after 1 loop.
vi.mock('virtual:dialogue', () => ({
  default: {
    flags: [
      { name: 'two', when: { foundUnique: 2 } },
      { name: 'loopy', when: { loops: 1 } },
      // The child flag (Issue #86): tests seed foundTotal 49 so the next correct report raises it.
      { name: 'child', when: { foundTotal: 50 } },
    ],
    entries: [
      {
        kind: 'story',
        id: 'story-two',
        tone: 'serious',
        when: { flag: 'two' },
        lines: [{ who: 'A', text: 'two' }],
      },
      {
        kind: 'story',
        id: 'story-loopy',
        tone: 'serious',
        when: { flag: 'loopy' },
        lines: [{ who: 'A', text: 'loopy' }],
      },
    ],
  },
}))

// The real save store keeps the last save in memory, so a fresh one per test is needed.
vi.mock('../utils/saveData', async importOriginal => {
  const actual = await importOriginal<typeof import('../utils/saveData')>()
  const make = () => actual.createSaveStore({ getStorage: () => localStorage })
  const holder = { store: make() }
  return {
    ...actual,
    load: () => holder.store.load(),
    update: (fn: Parameters<typeof actual.update>[0]) =>
      holder.store.update(fn),
    canPersist: () => holder.store.canPersist(),
    resetStore: () => {
      holder.store = make()
    },
  }
})

const entry = (
  id: string,
  cameraId: number,
  category: LedgerEntry['category'] = 'Object'
): LedgerEntry => ({
  id,
  cameraId,
  category,
  anomalyType: 'add_object',
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
const TOAST_MS = 1500

beforeEach(() => {
  vi.useFakeTimers()
  localStorage.clear()
  ;(saveData as unknown as { resetStore: () => void }).resetStore()
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

  describe('also_categories (#236)', () => {
    const withAlso = () => {
      ledger.push({ ...entry('a', 1, 'Object'), alsoCategories: ['Person'] })
      const hook = start()
      advance(FIRST + 100)
      return hook
    }

    it('the primary category is correct and the feedback names it', () => {
      const { result } = withAlso()
      act(() => result.current.reportAnomaly('Object'))
      expect(result.current.stats.correctReports).toBe(1)
      expect(result.current.feedback?.kind).toBe('correct')
      expect(result.current.feedback?.message).toBe('CONFIRMED — Object')
    })

    it('a category listed in also_categories is correct too, and the feedback still names the primary', () => {
      const { result } = withAlso()
      act(() => result.current.reportAnomaly('Person'))
      expect(result.current.stats.correctReports).toBe(1)
      expect(result.current.stats.misreports).toBe(0)
      expect(result.current.activeAnomalyHere).toBeUndefined()
      expect(result.current.feedback?.message).toBe('CONFIRMED — Object')
    })

    it('every extra category in the array is correct, feedback names the primary', () => {
      for (const c of ['Person', 'Surreal'] as const) {
        ledger.length = 0
        ledger.push({
          ...entry('a', 1, 'Object'),
          alsoCategories: ['Person', 'Surreal'],
        })
        const { result, unmount } = start()
        advance(FIRST + 100)
        act(() => result.current.reportAnomaly(c))
        expect(result.current.stats.correctReports).toBe(1)
        expect(result.current.stats.misreports).toBe(0)
        expect(result.current.feedback?.message).toBe('CONFIRMED — Object')
        unmount()
      }
    })

    it('a category outside the array is a false report', () => {
      ledger.length = 0
      ledger.push({
        ...entry('a', 1, 'Object'),
        alsoCategories: ['Person', 'Surreal'],
      })
      const { result } = start()
      advance(FIRST + 100)
      act(() => result.current.reportAnomaly('Environment'))
      expect(result.current.stats.misreports).toBe(1)
      expect(result.current.stats.correctReports).toBe(0)
      expect(result.current.activeAnomalyHere?.id).toBe('a')
    })

    it('a third category is a false report', () => {
      const { result } = withAlso()
      act(() => result.current.reportAnomaly('Camera'))
      expect(result.current.stats.misreports).toBe(1)
      expect(result.current.stats.correctReports).toBe(0)
      expect(result.current.activeAnomalyHere?.id).toBe('a')
    })

    it('an anomaly without also_categories accepts only its primary category', () => {
      const { result } = withAnomaly('Object')
      act(() => result.current.reportAnomaly('Person'))
      expect(result.current.stats.misreports).toBe(1)
      act(() => result.current.reportAnomaly('Object'))
      expect(result.current.stats.correctReports).toBe(1)
    })
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

// ---- ending, saving and flags (Issue #74) -----------------------------------------------------

const wrongReport = (result: { current: ReturnType<typeof useGameState> }) =>
  act(() => result.current.reportAnomaly('Person')) // no anomaly on camera 1 unless one is spawned

/** Goes on until `total` ms of the shift have passed, counting from the start. */
const advanceTo = (done: number, total: number) => advance(total - done)

describe('a correct report is recorded in the save', () => {
  it('remembers the anomaly id and counts it', () => {
    ledger.push(entry('a', 1))
    const { result } = start()
    advance(FIRST + 100)
    act(() => result.current.reportAnomaly('Object'))
    expect(saveData.load().foundIds).toEqual(['a'])
    expect(saveData.load().foundTotal).toBe(1)
  })

  it('does not raise a flag event before a milestone', () => {
    ledger.push(entry('a', 1))
    const { result } = start()
    const seqAtStart = result.current.flagEvent
    advance(FIRST + 100)
    act(() => result.current.reportAnomaly('Object'))
    expect(result.current.flagEvent).toEqual(seqAtStart)
    expect(result.current.flagEvent).toBeNull()
  })

  it('raises a flag event with a new seq when the report reaches a milestone', () => {
    ledger.push(entry('a', 1), entry('b', 1))
    const { result } = start()
    advance(FIRST + 100)
    act(() => result.current.reportAnomaly('Object'))
    advance(INTERVAL)
    act(() => result.current.reportAnomaly('Object'))
    expect(result.current.flagEvent).toEqual({
      seq: expect.any(Number),
      flags: ['two'],
    })
    expect(saveData.load().flags).toEqual({ two: true })
    expect(saveData.load().pendingStories).toEqual(['two'])
  })
})

describe('Feedback.anomalyId of a false report', () => {
  it('is the anomaly on the watched camera when the category was wrong', () => {
    ledger.push(entry('a', 1, 'Object'))
    const { result } = start()
    advance(FIRST + 100)
    wrongReport(result)
    expect(result.current.feedback).toMatchObject({
      kind: 'wrong',
      anomalyId: 'a',
    })
  })

  it('is null when there is no anomaly on the watched camera', () => {
    ledger.push(entry('a', 2))
    const { result } = start()
    advance(FIRST + 100)
    wrongReport(result)
    expect(result.current.feedback).toMatchObject({
      kind: 'wrong',
      anomalyId: null,
    })
  })
})

describe('withdraw ending (too many false reports)', () => {
  const threeWrong = (result: { current: ReturnType<typeof useGameState> }) => {
    for (let i = 0; i < DEFAULT_CONFIG.maxMisreports; i++) wrongReport(result)
  }

  it('waits 1500 ms after the third false report, then ends with withdraw / lose', () => {
    const { result } = start()
    threeWrong(result)
    advance(1499)
    expect(result.current.gameState).toBe('playing')
    advance(1)
    expect(result.current.gameState).toBe('ending')
    expect(result.current.ending).toEqual({
      closing: 'withdraw',
      outcome: 'lose',
    })
  })

  it('goes to the lose screen when the ending is finished', () => {
    const { result } = start()
    threeWrong(result)
    advance(1500)
    act(() => result.current.finishEnding())
    expect(result.current.gameState).toBe('lose')
  })

  it('does not end before the third false report', () => {
    const { result } = start()
    wrongReport(result)
    wrongReport(result)
    advance(5000)
    expect(result.current.gameState).toBe('playing')
  })

  it('accepts no further report once the limit is reached: a correct one does not count', () => {
    ledger.push(entry('a', 1, 'Object'))
    const { result } = start()
    advance(FIRST + 100)
    act(() => result.current.reportAnomaly('Person'))
    act(() => result.current.reportAnomaly('Person'))
    act(() => result.current.reportAnomaly('Person'))
    act(() => result.current.reportAnomaly('Object')) // right answer inside the 1.5 s window
    expect(result.current.stats.correctReports).toBe(0)
    expect(result.current.stats.misreports).toBe(3)
    expect(saveData.load().foundIds).toEqual([])
  })

  it('accepts no further false report either: the count stays at the limit', () => {
    const { result } = start()
    threeWrong(result)
    wrongReport(result)
    expect(result.current.stats.misreports).toBe(DEFAULT_CONFIG.maxMisreports)
  })
})

describe('dawn ending (time ran out)', () => {
  const total = DEFAULT_CONFIG.totalDurationMs

  /** Resolves `n` anomalies (one per interval on camera 1), then plays up to `total` ms. */
  const playWith = (n: number, end = total) => {
    for (let i = 0; i < 6; i++) ledger.push(entry(`a${i}`, 1))
    const hook = start()
    let at = 0
    for (let i = 0; i < n; i++) {
      const step = i === 0 ? FIRST + 100 : INTERVAL
      advance(step)
      at += step
      act(() => hook.result.current.reportAnomaly('Object'))
    }
    advanceTo(at, end)
    return hook
  }

  it.each([
    [3, 'lose'],
    [4, 'win'],
    [5, 'win'],
  ])('with %i correct reports the dawn ending is %s', (n, outcome) => {
    const { result } = playWith(n)
    expect(result.current.gameState).toBe('ending')
    expect(result.current.ending).toEqual({ closing: 'dawn', outcome })
  })

  it('uses the minCorrectReports rule from the config (4)', () => {
    expect(DEFAULT_CONFIG.minCorrectReports).toBe(4)
  })

  it('is still playing at 359999 ms', () => {
    const { result } = playWith(0, total - 1)
    expect(result.current.gameState).toBe('playing')
  })

  it('ends at 360000 ms', () => {
    const { result } = playWith(0, total)
    expect(result.current.gameState).toBe('ending')
  })

  it('ends at 360001 ms without ending twice', () => {
    const { result } = playWith(0, total + 1)
    advance(10_000)
    expect(result.current.gameState).toBe('ending')
    expect(saveData.load().loops).toBe(1)
  })
})

describe('the end is counted once', () => {
  it('time out and withdraw in the same shift add only one loop', () => {
    const { result } = start()
    advance(DEFAULT_CONFIG.totalDurationMs - TOAST_MS)
    for (let i = 0; i < DEFAULT_CONFIG.maxMisreports; i++) wrongReport(result)
    // The withdraw timer and the time-out now fall due together.
    advance(TOAST_MS + 5000)
    expect(result.current.gameState).toBe('ending')
    expect(saveData.load().loops).toBe(1)
  })

  it('the cap was reached first: time running out during the toast still ends as a withdraw', () => {
    const { result } = start()
    advance(DEFAULT_CONFIG.totalDurationMs - 500)
    for (let i = 0; i < DEFAULT_CONFIG.maxMisreports; i++) wrongReport(result)
    advance(5000)
    expect(result.current.ending?.closing).toBe('withdraw')
    expect(result.current.ending?.outcome).toBe('lose')
  })
})

describe('time running out around the false-report limit', () => {
  const total = DEFAULT_CONFIG.totalDurationMs
  const wrong = (
    result: { current: ReturnType<typeof useGameState> },
    n: number
  ) => {
    for (let i = 0; i < n; i++) wrongReport(result)
  }
  /** Resolves `n` anomalies, then returns the time (ms) already played. */
  const resolve = (hook: ReturnType<typeof start>, n: number) => {
    for (let i = 0; i < 6; i++) ledger.push(entry(`a${i}`, 1))
    let at = 0
    for (let i = 0; i < n; i++) {
      const step = i === 0 ? FIRST + 100 : INTERVAL
      advance(step)
      at += step
      act(() => hook.result.current.reportAnomaly('Object'))
    }
    return at
  }

  it('the limit reached just before time runs out ends as withdraw / lose, counted once', () => {
    const { result } = start()
    advance(total - 500)
    wrong(result, DEFAULT_CONFIG.maxMisreports)
    advance(TOAST_MS + 5000)
    expect(result.current.ending).toEqual({
      closing: 'withdraw',
      outcome: 'lose',
    })
    expect(saveData.load().loops).toBe(1)
  })

  it('stays a withdraw / lose even with enough correct reports to win', () => {
    const hook = start()
    const at = resolve(hook, DEFAULT_CONFIG.minCorrectReports)
    advance(total - 500 - at)
    wrong(hook.result, DEFAULT_CONFIG.maxMisreports)
    advance(TOAST_MS + 5000)
    expect(hook.result.current.ending).toEqual({
      closing: 'withdraw',
      outcome: 'lose',
    })
  })

  it('below the limit, time running out is still a dawn: lose under the minimum', () => {
    const { result } = start()
    wrong(result, DEFAULT_CONFIG.maxMisreports - 1)
    advance(total)
    expect(result.current.ending).toEqual({ closing: 'dawn', outcome: 'lose' })
  })

  it('below the limit, time running out is still a dawn: win at the minimum', () => {
    const hook = start()
    const at = resolve(hook, DEFAULT_CONFIG.minCorrectReports)
    wrong(hook.result, DEFAULT_CONFIG.maxMisreports - 1)
    advance(total - at)
    expect(hook.result.current.ending).toEqual({
      closing: 'dawn',
      outcome: 'win',
    })
  })

  it('the withdraw due after the toast does not run again once the shift has ended', () => {
    const { result } = start()
    wrong(result, DEFAULT_CONFIG.maxMisreports)
    advance(TOAST_MS)
    expect(result.current.ending?.closing).toBe('withdraw')
    expect(saveData.load().loops).toBe(1)
    advance(total + 5000)
    expect(result.current.ending?.closing).toBe('withdraw')
    expect(saveData.load().loops).toBe(1)
  })

  it('boundary below the limit: playing at 359999 ms, dawn at 360000 ms', () => {
    const { result } = start()
    wrong(result, DEFAULT_CONFIG.maxMisreports - 1)
    advance(total - 1)
    expect(result.current.gameState).toBe('playing')
    advance(1)
    expect(result.current.ending).toEqual({ closing: 'dawn', outcome: 'lose' })
  })

  it('boundary at the limit: playing at 359999 ms, withdraw at 360000 ms (toast still pending)', () => {
    const { result } = start()
    advance(total - 1000)
    wrong(result, DEFAULT_CONFIG.maxMisreports)
    advance(999)
    expect(result.current.gameState).toBe('playing')
    advance(1)
    expect(result.current.ending).toEqual({
      closing: 'withdraw',
      outcome: 'lose',
    })
  })
})

describe('startGame after a withdraw by the false-report limit', () => {
  const withdraw = (hook: ReturnType<typeof start>) => {
    for (let i = 0; i < DEFAULT_CONFIG.maxMisreports; i++)
      wrongReport(hook.result)
    advance(TOAST_MS)
    expect(hook.result.current.ending?.closing).toBe('withdraw')
    act(() => hook.result.current.finishEnding())
  }

  it('accepts reports again in the second shift (correct and false)', () => {
    ledger.push(entry('a', 1))
    const hook = start()
    withdraw(hook)
    act(() => hook.result.current.startGame())
    expect(hook.result.current.stats.misreports).toBe(0)

    advance(FIRST + 100)
    act(() => hook.result.current.reportAnomaly('Object'))
    expect(hook.result.current.stats.correctReports).toBe(1)

    wrongReport(hook.result)
    expect(hook.result.current.stats.misreports).toBe(1)
  })

  it('applies the false-report limit again in the second shift, counting loops cumulatively', () => {
    const hook = start()
    withdraw(hook)
    expect(saveData.load().loops).toBe(1)
    act(() => hook.result.current.startGame())

    for (let i = 0; i < DEFAULT_CONFIG.maxMisreports; i++)
      wrongReport(hook.result)
    expect(hook.result.current.stats.misreports).toBe(
      DEFAULT_CONFIG.maxMisreports
    )
    advance(TOAST_MS - 1)
    expect(hook.result.current.gameState).toBe('playing')
    advance(1)
    expect(hook.result.current.ending).toEqual({
      closing: 'withdraw',
      outcome: 'lose',
    })
    expect(saveData.load().loops).toBe(2)
  })
})

describe('reports during the ending', () => {
  it('change neither the stats nor the save', () => {
    ledger.push(entry('a', 1))
    const { result } = start()
    advance(FIRST + 100)
    advance(DEFAULT_CONFIG.totalDurationMs)
    expect(result.current.gameState).toBe('ending')
    const before = JSON.stringify(result.current.stats)
    const saved = JSON.stringify(saveData.load())
    act(() => result.current.reportAnomaly('Object'))
    act(() => result.current.reportAnomaly('Person'))
    expect(JSON.stringify(result.current.stats)).toBe(before)
    expect(JSON.stringify(saveData.load())).toBe(saved)
  })
})

describe('startGame resets the ending and the flag event', () => {
  it('a loops-based flag is put on flagEvent at the start', () => {
    saveData.update(cur => ({ ...cur, loops: 1 }))
    const { result } = start()
    expect(result.current.flagEvent).toEqual({
      seq: expect.any(Number),
      flags: ['loopy'],
    })
  })

  it('flagEvent is null at the start when no flag became true', () => {
    const { result } = start()
    expect(result.current.flagEvent).toBeNull()
  })

  it('a new shift forgets the previous ending and the previous flag event', () => {
    saveData.update(cur => ({ ...cur, loops: 1 }))
    const { result } = start()
    advance(DEFAULT_CONFIG.totalDurationMs)
    expect(result.current.ending).not.toBeNull()
    act(() => result.current.finishEnding())
    act(() => result.current.startGame())
    expect(result.current.ending).toBeNull()
    expect(result.current.gameState).toBe('playing')
    expect(result.current.flagEvent).toBeNull() // 'loopy' was raised once already
  })

  it('a second shift can end and be counted again', () => {
    const { result } = start()
    advance(DEFAULT_CONFIG.totalDurationMs)
    act(() => result.current.finishEnding())
    act(() => result.current.startGame())
    advance(DEFAULT_CONFIG.totalDurationMs)
    expect(result.current.gameState).toBe('ending')
    expect(saveData.load().loops).toBe(2)
  })
})

// ---- the true ending (Issue #86) --------------------------------------------------------------

describe('after the child is found', () => {
  const total = DEFAULT_CONFIG.totalDurationMs
  const seed = (patch: Partial<ReturnType<typeof saveData.load>>) =>
    saveData.update(cur => ({ ...cur, ...patch }))
  const fill = () => {
    for (let i = 0; i < 40; i++) ledger.push(entry(`a${i}`, (i % 8) + 1))
  }

  it('before the child is found, time running out stays a dawn', () => {
    fill()
    const { result } = start()
    advance(total)
    expect(result.current.ending?.closing).toBe('dawn')
  })

  it('in a shift that starts with the child already found, anomalies come faster and up to the higher cap', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = start()
    advance(FIRST + 100)
    expect(result.current.activeAnomalies).toHaveLength(1)
    advance(CHILD_FOUND_PACING.anomalyIntervalMs)
    expect(result.current.activeAnomalies).toHaveLength(2)
    advance(CHILD_FOUND_PACING.anomalyIntervalMs * 3)
    expect(result.current.activeAnomalies).toHaveLength(
      CHILD_FOUND_PACING.maxConcurrentAnomalies
    )
  })

  it('child found and nothing reported afterwards: the ending, a win, one loop', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = start()
    advance(total)
    expect(result.current.ending).toEqual({ closing: 'ending', outcome: 'win' })
    expect(result.current.gameState).toBe('ending')
    expect(saveData.load().loops).toBe(1)
    act(() => result.current.finishEnding())
    expect(result.current.gameState).toBe('win')
  })

  it('one report of an anomaly that appeared after the child makes it an ordinary dawn', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = start()
    advance(FIRST + 100)
    const here = result.current.activeAnomalies[0]
    act(() => result.current.switchCamera(here.cameraId - 1))
    act(() => result.current.reportAnomaly(here.category))
    expect(result.current.stats.correctReports).toBe(1)
    advanceTo(FIRST + 100, total)
    expect(result.current.ending?.closing).toBe('dawn')
  })

  it('the report that raises the child flag mid-shift does not count: ignoring the rest is the ending', () => {
    fill()
    seed({ foundTotal: 49 })
    const { result } = start()
    advance(FIRST + 100)
    const first = result.current.activeAnomalies[0]
    act(() => result.current.switchCamera(first.cameraId - 1))
    act(() => result.current.reportAnomaly(first.category))
    expect(saveData.load().flags.child).toBe(true)
    // Anomalies spawned from now on are post-child (faster cadence); none is reported.
    advanceTo(FIRST + 100, total)
    expect(result.current.activeAnomalies.length).toBeGreaterThan(1)
    expect(result.current.ending).toEqual({ closing: 'ending', outcome: 'win' })
  })

  it('reporting an older anomaly (shown before the child) after the child is found does not stop the ending', () => {
    fill()
    seed({ foundTotal: 49 })
    const { result } = start()
    advance(FIRST + 100)
    const old = result.current.activeAnomalies[0]
    advance(INTERVAL)
    const second = result.current.activeAnomalies[1]
    // Raise the child with the second one, then report the first (older) one.
    act(() => result.current.switchCamera(second.cameraId - 1))
    act(() => result.current.reportAnomaly(second.category))
    expect(saveData.load().flags.child).toBe(true)
    act(() => result.current.switchCamera(old.cameraId - 1))
    act(() => result.current.reportAnomaly(old.category))
    advanceTo(FIRST + 100 + INTERVAL, total)
    expect(result.current.ending?.closing).toBe('ending')
  })

  it('nothing appeared after the child (the last ledger entry raised it): dawn', () => {
    ledger.push(entry('only', 1))
    seed({ foundTotal: 49 })
    const { result } = start()
    advance(FIRST + 100)
    act(() => result.current.reportAnomaly('Object'))
    expect(saveData.load().flags.child).toBe(true)
    advanceTo(FIRST + 100, total)
    expect(result.current.ending?.closing).toBe('dawn')
  })

  it('a withdraw is never the ending, even with the child found and nothing reported', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = start()
    advance(FIRST + 100)
    for (let i = 0; i < DEFAULT_CONFIG.maxMisreports; i++) {
      act(() => result.current.switchCamera(7))
      act(() => result.current.reportAnomaly('Person'))
    }
    advance(TOAST_MS + 100)
    expect(result.current.ending).toEqual({
      closing: 'withdraw',
      outcome: 'lose',
    })
  })

  it('the next shift keeps the child found state (the flag is saved)', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = start()
    advance(total)
    act(() => result.current.finishEnding())
    act(() => result.current.startGame())
    advance(FIRST + 100)
    advance(CHILD_FOUND_PACING.anomalyIntervalMs)
    expect(result.current.activeAnomalies).toHaveLength(2)
  })
})
