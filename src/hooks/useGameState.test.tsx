// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import {
  LedgerEntry,
  NonImageEntry,
  parseLedgerRecords,
  toLedgerEntry,
} from '../utils/anomalyLedger'
import * as saveData from '../utils/saveData'
import { CHILD_FOUND_PACING, DEFAULT_CONFIG } from '../utils/gameConfig'
import { resetProgress } from '../utils/shiftProgress'
import { useGameState } from './useGameState'

const personEntry = vi.hoisted(() => ({
  id: 'person-guest',
  cameraId: 6,
  category: 'Person' as const,
  anomalyType: 'add_person' as const,
  overlay: 'assets/person-guest.webp',
  origin: { x: 1, y: 2 },
  size: { w: 3, h: 4 },
  storyFlag: 'guest',
}))

// A small, controllable ledger instead of the real one (mutated in place per test).
const ledger = vi.hoisted(() => [] as LedgerEntry[])
// The non-image side (#77): empty unless a test pushes into it, so the image tests below are not disturbed.
const nonImage = vi.hoisted(() => [] as NonImageEntry[])
vi.mock('virtual:non-image-anomalies', () => ({ default: nonImage }))
// The real ledger plus one story person (#430): flag 'guest' (see the dialogue mock below).
vi.mock('virtual:anomalies', async importOriginal => {
  const actual = await importOriginal<{ default: LedgerEntry[] }>()
  return {
    default: [
      ...actual.default.filter(e => !e.storyFlag),
      { ...personEntry, id: 'person-guest', cameraId: 6 },
    ],
  }
})
// Voices count as drawable only after their file answered (#407): a test decides which ones have.
const readyVoices = vi.hoisted(() => new Set<string>())
vi.mock('../utils/voiceSounds', async importOriginal => {
  const actual = await importOriginal<typeof import('../utils/voiceSounds')>()
  return {
    ...actual,
    voiceReady: (id: string) =>
      !actual.VOICE_IDS.has(id) || readyVoices.has(id),
  }
})
const preload = vi.hoisted(() => vi.fn())
vi.mock('../data/anomalyLedger', () => ({
  ANOMALY_LEDGER: ledger,
  overlayUrlFor: (e: { id: string }) => {
    if (e.id.startsWith('broken')) throw new Error('Overlay image not bundled')
    return `/overlay/${e.id}.webp`
  },
  preloadOverlays: preload,
}))

// Small flags instead of the real ones (10/30/60, child 100): 'two' at 2 found, 'loopy' after 1 loop.
vi.mock('virtual:dialogue', () => ({
  default: {
    flags: [
      { name: 'two', when: { foundUnique: 2 } },
      { name: 'loopy', when: { loops: 1 } },
      // The child flag (Issue #86): tests seed foundTotal 49 so the next correct report raises it.
      { name: 'child', when: { foundTotal: 50 } },
      // A story person (#430): may appear after 100 found and the flag 'two'; the flag rises when it is reported.
      { name: 'guest', when: { foundUnique: 100, requires: ['two'] } },
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
        id: 'story-guest',
        tone: 'serious',
        when: { flag: 'guest' },
        lines: [{ who: 'A', text: 'guest' }],
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
  nonImage.length = 0
  readyVoices.clear()
})
afterEach(() => {
  vi.useRealTimers()
})

const start = () => {
  const hook = renderHook(() => useGameState())
  act(() => hook.result.current.startGame())
  return hook
}

/** `start()`, then the player looks at the last camera: nothing is drawn there (#418: never on the watched one). */
const startAway = () => {
  const hook = start()
  act(() =>
    hook.result.current.switchCamera(hook.result.current.cameras.length - 1)
  )
  return hook
}

/** Reports from the camera the first open anomaly is on (the report must be made there). */
const reportAt = (
  result: { current: ReturnType<typeof useGameState> },
  category: Parameters<ReturnType<typeof useGameState>['reportAnomaly']>[0]
) => {
  const open = result.current.activeAnomalies.find(a => !a.detectedAt)
  if (open) {
    const index = result.current.cameras.findIndex(c => c.id === open.cameraId)
    act(() => result.current.switchCamera(index))
  }
  act(() => result.current.reportAnomaly(category))
  // A cleared one: look away again, so the next anomaly may be drawn on the camera just cleared (#418).
  if (
    open &&
    !result.current.activeAnomalies.some(a => a.id === open.id && !a.detectedAt)
  )
    act(() => result.current.switchCamera(result.current.cameras.length - 1))
}

describe('rule constants are unchanged by the ledger connection', () => {
  it('keeps the shift rules', () => {
    expect(DEFAULT_CONFIG).toEqual({
      totalDurationMs: 480_000,
      firstAnomalyDelayMs: 12_000,
      anomalyIntervalMs: 30_000,
      maxConcurrentAnomalies: 4,
      maxMisreports: 3,
      minCorrectReports: 4,
    })
  })
})

describe('spawning from the ledger', () => {
  it('spawns nothing before the first delay and one anomaly right after', () => {
    ledger.push(entry('a', 1))
    const { result } = startAway()
    advance(FIRST - 100)
    expect(result.current.stats.totalAnomalies).toBe(0)
    expect(result.current.activeAnomalies).toEqual([])
    advance(200)
    expect(result.current.stats.totalAnomalies).toBe(1)
    expect(result.current.activeAnomalies).toHaveLength(1)
  })

  it('builds the anomaly from the ledger entry with the resolved overlay URL', () => {
    ledger.push(entry('a', 1, 'Person'))
    const { result } = startAway()
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
    const { result } = startAway()
    advance(FIRST + 100)
    reportAt(result, 'Object') // resolve it: camera 1 is free again
    advance(INTERVAL * 2)
    expect(result.current.stats.totalAnomalies).toBe(1)
    expect(result.current.activeAnomalies.map(a => a.id)).toEqual(['a'])
  })

  it('does not spawn on a camera that already has an unresolved anomaly (one per camera)', () => {
    ledger.push(entry('a1', 1), entry('a2', 1))
    const { result } = startAway()
    advance(FIRST + 100)
    advance(INTERVAL)
    expect(result.current.stats.totalAnomalies).toBe(1)
  })

  it('spawns on a camera again once its anomaly is resolved', () => {
    ledger.push(entry('a1', 1), entry('a2', 1))
    const { result } = startAway()
    advance(FIRST + 100)
    reportAt(result, 'Object')
    advance(INTERVAL)
    expect(result.current.stats.totalAnomalies).toBe(2)
    expect(result.current.activeAnomalies.map(a => a.id).sort()).toEqual([
      'a1',
      'a2',
    ])
  })

  it('respects the concurrent cap (and counts only real spawns)', () => {
    // cameras 1-4 each have one entry; camera 5 gets one later (held back so camera 1 is surely taken first)
    for (let i = 1; i <= 4; i++) ledger.push(entry(`c${i}`, i))
    const { result } = startAway()
    advance(FIRST + 100 + INTERVAL * 6)
    expect(result.current.stats.totalAnomalies).toBe(
      DEFAULT_CONFIG.maxConcurrentAnomalies
    )
    expect(DEFAULT_CONFIG.maxConcurrentAnomalies).toBe(4)
    // one per camera at most
    const cams = result.current.activeAnomalies.map(a => a.cameraId)
    expect(new Set(cams).size).toBe(cams.length)
    // at the cap a further entry waits; reporting one (camera 1 is on screen) frees a slot
    ledger.push(entry('c5', 5), entry('c6', 6))
    advance(INTERVAL)
    expect(result.current.stats.totalAnomalies).toBe(4)
    reportAt(result, 'Object')
    advance(INTERVAL + 500)
    expect(result.current.stats.totalAnomalies).toBe(5)
  })

  it('an empty ledger stops spawning for the shift (no retries)', () => {
    const { result } = startAway()
    advance(FIRST + 100)
    expect(result.current.stats.totalAnomalies).toBe(0)
    ledger.push(entry('late', 1))
    advance(FIRST + INTERVAL * 2)
    expect(result.current.stats.totalAnomalies).toBe(0)
  })

  it('a failed spawn for lack of a free camera does not use up the interval: retry after ~1 s', () => {
    // Both entries sit on camera 1: after 'a' spawns, 'b' has no free camera.
    ledger.push(entry('a', 1), entry('b', 1))
    const { result } = startAway()
    advance(FIRST + 100)
    expect(result.current.stats.totalAnomalies).toBe(1)
    advance(INTERVAL + 2000) // the interval elapses; the attempt fails (camera 1 busy)
    expect(result.current.stats.totalAnomalies).toBe(1)
    reportAt(result, 'Object') // frees camera 1
    // Retries on a ~1 s cadence, so 'b' comes right away instead of one more 30 s interval later.
    advance(1500)
    expect(result.current.stats.totalAnomalies).toBe(2)
  })

  it('keeps Reiwa entries out until elder3 is saved (#83), and stops spawning when only they remain', () => {
    ledger.push({ ...entry('rz', 1), reiwa: true })
    const { result } = startAway()
    advance(FIRST + INTERVAL * 2)
    expect(result.current.stats.totalAnomalies).toBe(0)
  })

  it('draws Reiwa entries once elder3 is saved (#83)', () => {
    saveData.update(cur => ({ ...cur, flags: { ...cur.flags, elder3: true } }))
    ledger.push({ ...entry('rz', 1), reiwa: true })
    const { result } = startAway()
    advance(FIRST + 100)
    expect(result.current.activeAnomalies.map(a => a.id)).toEqual(['rz'])
  })

  it('does not retry every frame while no camera is free', () => {
    ledger.push(entry('a', 1), entry('b', 1))
    const { result } = startAway()
    advance(FIRST + 100)
    // One attempt reads the image ledger through `filter` a few times (#77: the draw checks both kinds).
    const filter = vi.spyOn(ledger, 'filter')
    advance(INTERVAL + 10_000) // first attempt ~30 s after the spawn, then once a second
    expect(result.current.stats.totalAnomalies).toBe(1)
    expect(filter.mock.calls.length).toBeGreaterThanOrEqual(5)
    expect(filter.mock.calls.length).toBeLessThanOrEqual(60) // a frame loop would be ~1800
  })

  it('skips an entry whose overlay cannot be resolved and spawns another, without stopping the loop', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // rng = 0 picks the first entry, so the broken one is tried first (deterministic).
    vi.spyOn(Math, 'random').mockReturnValue(0)
    ledger.push(entry('broken1', 1), entry('ok', 1))
    const { result } = startAway()
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
    const { result } = startAway()
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
    const { result } = startAway()
    advance(FIRST + 100)
    advance(INTERVAL - 1000)
    expect(result.current.stats.totalAnomalies).toBe(1)
    advance(1500)
    expect(result.current.stats.totalAnomalies).toBe(2)
  })

  it('startGame resets the used ids, so entries can appear again in the next shift', () => {
    ledger.push(entry('a', 1))
    const { result } = startAway()
    advance(FIRST + 100)
    expect(result.current.stats.totalAnomalies).toBe(1)
    act(() => result.current.startGame())
    act(() => result.current.switchCamera(7)) // a new shift starts on camera 1
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
    const hook = startAway()
    advance(FIRST + 100)
    return hook
  }

  it('right camera + right category resolves it and counts a correct report', () => {
    const { result } = withAnomaly()
    reportAt(result, 'Object')
    expect(result.current.stats.correctReports).toBe(1)
    expect(result.current.stats.detectedAnomalies).toBe(1)
    expect(result.current.stats.misreports).toBe(0)
    expect(result.current.activeAnomalyHere).toBeUndefined()
    expect(result.current.feedback?.kind).toBe('correct')
  })

  it('right camera + wrong category is a false report and leaves it unresolved', () => {
    const { result } = withAnomaly('Object')
    reportAt(result, 'Person')
    expect(result.current.stats.misreports).toBe(1)
    expect(result.current.stats.correctReports).toBe(0)
    expect(result.current.activeAnomalyHere?.id).toBe('a')
    expect(result.current.feedback?.message).toMatch(/WRONG CATEGORY/)
  })

  describe('category as an array (#347)', () => {
    const withAlso = () => {
      ledger.push({
        ...entry('a', 1, 'Object'),
        categories: ['Object', 'Person'],
      })
      const hook = startAway()
      advance(FIRST + 100)
      return hook
    }

    it('the primary category is correct and the feedback names it', () => {
      const { result } = withAlso()
      reportAt(result, 'Object')
      expect(result.current.stats.correctReports).toBe(1)
      expect(result.current.feedback?.kind).toBe('correct')
      expect(result.current.feedback?.message).toBe('CONFIRMED — Object')
    })

    it('a category listed after the first is correct too, and the feedback names the one the player chose (#423)', () => {
      const { result } = withAlso()
      reportAt(result, 'Person')
      expect(result.current.stats.correctReports).toBe(1)
      expect(result.current.stats.misreports).toBe(0)
      expect(result.current.activeAnomalyHere).toBeUndefined()
      expect(result.current.feedback?.message).toBe('CONFIRMED — Person')
    })

    it('every category in the array is correct, feedback names the chosen one', () => {
      for (const c of ['Person', 'Surreal'] as const) {
        ledger.length = 0
        ledger.push({
          ...entry('a', 1, 'Object'),
          categories: ['Object', 'Person', 'Surreal'],
        })
        const { result, unmount } = startAway()
        advance(FIRST + 100)
        reportAt(result, c)
        expect(result.current.stats.correctReports).toBe(1)
        expect(result.current.stats.misreports).toBe(0)
        expect(result.current.feedback?.message).toBe(`CONFIRMED — ${c}`)
        unmount()
      }
    })

    it('the real ledger: AR-03-face-ornament is correct as Person, Object or Surreal (#347)', () => {
      const rec = parseLedgerRecords(
        parseYaml(
          readFileSync(
            resolve(__dirname, '../../prompts/anomalies.yaml'),
            'utf8'
          )
        )
      ).find(r => r.id === 'AR-03-face-ornament')
      expect(rec).toBeDefined()
      for (const c of ['Person', 'Object', 'Surreal'] as const) {
        ledger.length = 0
        ledger.push({ ...toLedgerEntry(rec!), cameraId: 1 })
        const { result, unmount } = startAway()
        advance(FIRST + 100)
        reportAt(result, c)
        expect(result.current.stats.correctReports, c).toBe(1)
        expect(result.current.stats.misreports, c).toBe(0)
        unmount()
      }
    })

    it('the real ledger: every sound accepts Surreal, the human-made ones Person too, RT-UI-22 Camera (#423)', () => {
      const recs = parseLedgerRecords(
        parseYaml(
          readFileSync(
            resolve(__dirname, '../../prompts/anomalies.yaml'),
            'utf8'
          )
        )
      )
      const accepted = (r: (typeof recs)[number]) =>
        r.categories ?? (r.category ? [r.category] : [])
      const sounds = recs.filter(r => r.anomalyType === 'sound')
      expect(sounds).toHaveLength(18)
      const person = new Set([
        'RT-SND-04',
        'RT-SND-05',
        'RT-SND-06',
        'RT-SND-07',
        'RT-SND-12',
        'CR-SH-04',
        'CR-SH-06',
      ])
      for (const r of sounds) {
        expect(accepted(r)[0], r.id).toBe('Environment') // the primary stays
        expect(accepted(r), r.id).toContain('Surreal')
        expect(accepted(r).includes('Person'), r.id).toBe(person.has(r.id))
      }
      expect(accepted(recs.find(r => r.id === 'RT-UI-22')!)).toEqual([
        'Surreal',
        'Camera',
      ])
    })

    it('a sound reported as Surreal is confirmed as Surreal, never as its primary Environment (#423)', () => {
      nonImage.push({
        id: 'RT-SND-01',
        category: 'Environment',
        categories: ['Environment', 'Surreal'],
        anomalyType: 'sound',
      })
      const hook = startAway()
      advance(FIRST + 100)
      reportAt(hook.result, 'Surreal')
      expect(hook.result.current.feedback?.message).toBe('CONFIRMED — Surreal')
    })

    it('the real ledger: AR-07-floor-frost is correct as Camera or Environment, a false report as Object (#347)', () => {
      const rec = parseLedgerRecords(
        parseYaml(
          readFileSync(
            resolve(__dirname, '../../prompts/anomalies.yaml'),
            'utf8'
          )
        )
      ).find(r => r.id === 'AR-07-floor-frost')
      expect(rec).toBeDefined()
      for (const [c, ok] of [
        ['Environment', true],
        ['Camera', true],
        ['Surreal', true],
        ['Object', false],
        ['Person', false],
      ] as const) {
        ledger.length = 0
        ledger.push({ ...toLedgerEntry(rec!), cameraId: 1 })
        const { result, unmount } = startAway()
        advance(FIRST + 100)
        reportAt(result, c)
        expect(result.current.stats.correctReports, c).toBe(ok ? 1 : 0)
        expect(result.current.stats.misreports, c).toBe(ok ? 0 : 1)
        unmount()
      }
    })

    it('a category outside the array is a false report', () => {
      ledger.length = 0
      ledger.push({
        ...entry('a', 1, 'Object'),
        categories: ['Object', 'Person', 'Surreal'],
      })
      const { result } = startAway()
      advance(FIRST + 100)
      reportAt(result, 'Environment')
      expect(result.current.stats.misreports).toBe(1)
      expect(result.current.stats.correctReports).toBe(0)
      expect(result.current.activeAnomalyHere?.id).toBe('a')
    })

    it('a third category is a false report', () => {
      const { result } = withAlso()
      reportAt(result, 'Camera')
      expect(result.current.stats.misreports).toBe(1)
      expect(result.current.stats.correctReports).toBe(0)
      expect(result.current.activeAnomalyHere?.id).toBe('a')
    })

    it('an anomaly with a single category accepts only its primary category', () => {
      const { result } = withAnomaly('Object')
      reportAt(result, 'Person')
      expect(result.current.stats.misreports).toBe(1)
      reportAt(result, 'Object')
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
    const { result } = startAway()
    reportAt(result, 'Object')
    expect(result.current.stats.misreports).toBe(1)
  })

  it('a resolved anomaly cannot be reported twice', () => {
    const { result } = withAnomaly()
    reportAt(result, 'Object')
    reportAt(result, 'Object')
    expect(result.current.stats.correctReports).toBe(1)
    expect(result.current.stats.misreports).toBe(1)
  })

  it('activeAnomalyHere follows the current camera', () => {
    const { result } = withAnomaly()
    act(() => result.current.switchCamera(0))
    expect(result.current.activeAnomalyHere?.cameraId).toBe(1)
    act(() => result.current.switchCamera('next'))
    expect(result.current.activeAnomalyHere).toBeUndefined()
  })
})

describe('non-image anomalies (#77)', () => {
  const glitch = (id = 'RT-FEED-22'): NonImageEntry => ({
    id,
    category: 'Camera',
    anomalyType: 'feed_glitch',
  })
  /** One shift where only a non-image entry exists; it appears on a camera drawn at random. */
  const withGlitch = () => {
    nonImage.push(glitch())
    const hook = startAway()
    advance(FIRST + 100)
    return hook
  }
  const watch = (
    hook: ReturnType<typeof withGlitch>,
    cameraId: number
  ): void => {
    const index = hook.result.current.cameras.findIndex(c => c.id === cameraId)
    act(() => hook.result.current.switchCamera(index))
  }

  it('appears without a fixed camera, in the same slot (one per camera), with no overlay', () => {
    const { result } = withGlitch()
    const [a] = result.current.activeAnomalies
    expect(a.id).toBe('RT-FEED-22')
    expect(a.overlay).toBeUndefined()
    expect(a.feedGlitch).toBe('static')
    expect(result.current.stats.totalAnomalies).toBe(1)
  })

  it('draws the camera at random each time (not always the same one)', () => {
    const seen = new Set<number>()
    for (let i = 0; i < 12; i++) {
      nonImage.length = 0
      nonImage.push(glitch())
      const hook = startAway()
      advance(FIRST + 100)
      seen.add(hook.result.current.activeAnomalies[0].cameraId)
      hook.unmount()
    }
    expect(seen.size).toBeGreaterThan(1)
  })

  it('shows the glitch only while its camera is watched', () => {
    const hook = withGlitch()
    const cam = hook.result.current.activeAnomalies[0].cameraId
    watch(hook, cam)
    expect(hook.result.current.feedGlitchHere).toBe('static')
    const other = hook.result.current.cameras.find(c => c.id !== cam)!
    watch(hook, other.id)
    expect(hook.result.current.feedGlitchHere).toBeUndefined()
    expect(hook.result.current.activeAnomalyHere).toBeUndefined()
  })

  it('a correct Camera report on its camera clears it, counts, and is remembered in the save', () => {
    const hook = withGlitch()
    const cam = hook.result.current.activeAnomalies[0].cameraId
    watch(hook, cam)
    reportAt(hook.result, 'Camera')
    expect(hook.result.current.stats.correctReports).toBe(1)
    expect(hook.result.current.stats.misreports).toBe(0)
    expect(hook.result.current.feedGlitchHere).toBeUndefined()
    expect(hook.result.current.feedback?.kind).toBe('correct')
    expect(saveData.load().foundIds).toEqual(['RT-FEED-22'])
  })

  it('a wrong category is a false report and the glitch stays', () => {
    const hook = withGlitch()
    const cam = hook.result.current.activeAnomalies[0].cameraId
    watch(hook, cam)
    reportAt(hook.result, 'Object')
    expect(hook.result.current.stats.misreports).toBe(1)
    expect(hook.result.current.feedGlitchHere).toBe('static')
    expect(hook.result.current.feedback?.message).toMatch(/WRONG CATEGORY/)
    expect(hook.result.current.feedback?.anomalyId).toBe('RT-FEED-22')
  })

  it('the right category from another camera is a false report (a camera glitch is reported on its camera)', () => {
    const hook = withGlitch()
    const cam = hook.result.current.activeAnomalies[0].cameraId
    watch(hook, hook.result.current.cameras.find(c => c.id !== cam)!.id)
    act(() => hook.result.current.reportAnomaly('Camera'))
    expect(hook.result.current.stats.misreports).toBe(1)
    expect(hook.result.current.stats.correctReports).toBe(0)
    expect(hook.result.current.activeAnomalies[0].detectedAt).toBeUndefined()
  })

  it('noise gone (RT-FEED-28) shows on every camera it was given, and a report on any of them clears it', () => {
    nonImage.push(glitch('RT-FEED-28'))
    const hook = startAway()
    advance(FIRST + 100)
    const [a] = hook.result.current.activeAnomalies
    expect(a.feedGlitch).toBe('nonoise')
    const ids = a.feedGlitchCameraIds!
    expect(ids[0]).toBe(a.cameraId)
    expect(ids.length).toBeGreaterThanOrEqual(1)
    expect(ids.length).toBeLessThanOrEqual(3)
    const last = ids[ids.length - 1]
    for (const c of hook.result.current.cameras) {
      watch(hook, c.id)
      expect(hook.result.current.feedGlitchHere).toBe(
        ids.includes(c.id) ? 'nonoise' : undefined
      )
    }
    watch(hook, last)
    reportAt(hook.result, 'Camera')
    expect(hook.result.current.stats.correctReports).toBe(1)
    expect(hook.result.current.feedGlitchHere).toBeUndefined()
  })

  it('noise gone never takes a camera that already has an anomaly, and its extra cameras take no other anomaly', () => {
    for (let c = 1; c <= 8; c++) ledger.push(entry(`img${c}`, c))
    nonImage.push(glitch('RT-FEED-28'))
    nonImage.push(glitch('RT-FEED-22'))
    const { result } = startAway()
    advance(FIRST + INTERVAL * 20)
    const open = result.current.activeAnomalies.filter(a => !a.detectedAt)
    const shown = open.flatMap(a => a.feedGlitchCameraIds ?? [a.cameraId])
    expect(new Set(shown).size).toBe(shown.length)
  })

  it('shares the cap and the camera slots with image anomalies, and is used once per shift', () => {
    nonImage.push(glitch())
    for (let c = 1; c <= 8; c++) ledger.push(entry(`img${c}`, c))
    const { result } = startAway()
    advance(FIRST + INTERVAL * 20)
    const ids = result.current.activeAnomalies.map(a => a.id)
    expect(ids.filter(id => id === 'RT-FEED-22').length).toBeLessThanOrEqual(1)
    expect(
      result.current.activeAnomalies.filter(a => !a.detectedAt).length
    ).toBeLessThanOrEqual(DEFAULT_CONFIG.maxConcurrentAnomalies)
    const cams = result.current.activeAnomalies.map(a => a.cameraId)
    expect(new Set(cams).size).toBe(cams.length)
  })

  it('an entry without a registered effect never appears', () => {
    nonImage.push({ ...glitch('RT-FEED-07') }) // no effect yet: it is still planned in the real ledger
    const { result } = startAway()
    advance(FIRST + INTERVAL * 2)
    expect(result.current.stats.totalAnomalies).toBe(0)
  })
})

describe('voice anomalies (#407)', () => {
  const voice = (id = 'RT-SND-06'): NonImageEntry => ({
    id,
    category: 'Environment',
    anomalyType: 'sound',
  })

  it('does not appear while its file has not answered, and does once it has', () => {
    nonImage.push(voice())
    const { result } = startAway()
    advance(FIRST + INTERVAL * 3)
    expect(result.current.stats.totalAnomalies).toBe(0)
    readyVoices.add('RT-SND-06')
    advance(INTERVAL)
    expect(result.current.activeAnomalies.map(a => a.id)).toEqual(['RT-SND-06'])
  })

  it('a voice still waiting for its file does not end the draw for the shift (not exhausted)', () => {
    nonImage.push(voice())
    const { result } = startAway()
    advance(FIRST + INTERVAL * 8)
    expect(result.current.stats.totalAnomalies).toBe(0)
    readyVoices.add('RT-SND-06')
    advance(INTERVAL)
    expect(result.current.stats.totalAnomalies).toBe(1)
  })

  describe('withdrawAnomaly', () => {
    const running = () => {
      readyVoices.add('RT-SND-06')
      nonImage.push(voice())
      const hook = startAway()
      advance(FIRST + 100)
      return hook
    }

    it('takes a running voice back as if it never appeared, and it is not drawn again', () => {
      const { result } = running()
      expect(result.current.unreportedCount).toBe(1)
      act(() => result.current.withdrawAnomaly('RT-SND-06'))
      expect(result.current.activeAnomalies).toEqual([])
      expect(result.current.unreportedCount).toBe(0)
      expect(result.current.stats.totalAnomalies).toBe(0)
      advance(INTERVAL * 5)
      expect(result.current.stats.totalAnomalies).toBe(0)
    })

    it('a report after the withdrawal is an ordinary false report on an empty camera (nothing to confirm)', () => {
      const hook = running()
      const cam = hook.result.current.activeAnomalies[0].cameraId
      act(() => hook.result.current.withdrawAnomaly('RT-SND-06'))
      const index = hook.result.current.cameras.findIndex(c => c.id === cam)
      act(() => hook.result.current.switchCamera(index))
      reportAt(hook.result, 'Environment')
      expect(hook.result.current.stats.correctReports).toBe(0)
      expect(hook.result.current.stats.misreports).toBe(1)
      expect(hook.result.current.feedback?.message).toMatch(/NO ANOMALY HERE/)
    })

    it('starting a shift forgets which voices were decoded (so a voice from an earlier shift can be taken back)', async () => {
      const voiceSounds = await import('../utils/voiceSounds')
      const ctx = {
        state: 'running',
        decodeAudioData: vi.fn().mockResolvedValue({ duration: 68 }),
      }
      vi.stubGlobal(
        'fetch',
        vi.fn(async () => ({
          ok: true,
          arrayBuffer: async () => new ArrayBuffer(8),
        }))
      )
      vi.useRealTimers()
      expect(
        await voiceSounds.holdVoice(
          { ctx: () => ctx, master: () => null } as never,
          'CR-SH-04'
        )
      ).toBe(true)
      voiceSounds.releaseVoice('CR-SH-04')
      vi.useFakeTimers()
      expect(voiceSounds.voiceWasLoaded('CR-SH-04')).toBe(true)
      startAway()
      expect(voiceSounds.voiceWasLoaded('CR-SH-04')).toBe(false)
      vi.unstubAllGlobals()
    })

    it('two spawns in one batch land on different cameras (the free cameras are not read from a stale list)', () => {
      // Non-image entries draw their camera at random, so a stale free list shows up as a shared camera.
      for (let trial = 0; trial < 40; trial++) {
        nonImage.length = 0
        nonImage.push(
          { id: 'RT-FEED-22', category: 'Camera', anomalyType: 'feed_glitch' },
          { id: 'RT-FEED-23', category: 'Camera', anomalyType: 'feed_glitch' }
        )
        const hook = startAway()
        // A catch-up frame (a long pause) can run several spawns before React re-renders.
        act(() => {
          vi.advanceTimersByTime(FIRST + 100)
          vi.advanceTimersByTime(INTERVAL + 100)
        })
        const cams = hook.result.current.activeAnomalies.map(a => a.cameraId)
        expect(cams).toHaveLength(2)
        expect(new Set(cams).size).toBe(2)
        hook.unmount()
      }
    })

    it('a report in the same batch as a new spawn does not overwrite the spawned anomaly', () => {
      ledger.push(entry('a', 1), entry('b', 2))
      const { result } = startAway()
      advance(FIRST + 100)
      const first = result.current.activeAnomalies[0]
      act(() =>
        result.current.switchCamera(
          result.current.cameras.findIndex(c => c.id === first.cameraId)
        )
      )
      act(() => {
        vi.advanceTimersByTime(INTERVAL + 600)
        result.current.reportAnomaly(first.category)
      })
      expect(result.current.activeAnomalies).toHaveLength(2)
      expect(result.current.stats.totalAnomalies).toBe(2)
      expect(
        result.current.activeAnomalies.filter(a => a.detectedAt)
      ).toHaveLength(1)
    })

    it('a report and a withdrawal in the same tick count the anomaly once (reported, not taken back)', () => {
      const hook = running()
      const cam = hook.result.current.activeAnomalies[0].cameraId
      act(() =>
        hook.result.current.switchCamera(
          hook.result.current.cameras.findIndex(c => c.id === cam)
        )
      )
      act(() => {
        hook.result.current.reportAnomaly('Environment')
        hook.result.current.withdrawAnomaly('RT-SND-06')
      })
      expect(hook.result.current.stats.totalAnomalies).toBe(1)
      expect(hook.result.current.stats.correctReports).toBe(1)
      expect(hook.result.current.activeAnomalies).toHaveLength(1)
    })

    it('a voice taken back after the child was found is not counted as one that appeared after it (no false ending)', () => {
      readyVoices.add('RT-SND-06')
      nonImage.push(voice())
      saveData.update(cur => ({ ...cur, flags: { ...cur.flags, child: true } }))
      const { result } = startAway()
      advance(FIRST + 100)
      expect(result.current.activeAnomalies).toHaveLength(1)
      act(() => result.current.withdrawAnomaly('RT-SND-06'))
      advance(DEFAULT_CONFIG.totalDurationMs)
      expect(result.current.ending?.closing).toBe('dawn')
    })

    it('leaves a reported voice and an unknown id alone', () => {
      const hook = running()
      const cam = hook.result.current.activeAnomalies[0].cameraId
      const index = hook.result.current.cameras.findIndex(c => c.id === cam)
      act(() => hook.result.current.switchCamera(index))
      reportAt(hook.result, 'Environment')
      act(() => hook.result.current.withdrawAnomaly('RT-SND-06'))
      act(() => hook.result.current.withdrawAnomaly('nope'))
      expect(hook.result.current.activeAnomalies).toHaveLength(1)
      expect(hook.result.current.stats.totalAnomalies).toBe(1)
      expect(hook.result.current.stats.correctReports).toBe(1)
    })
  })
})

// ---- ending, saving and flags (Issue #74) -----------------------------------------------------

const wrongReport = (result: { current: ReturnType<typeof useGameState> }) =>
  act(() => result.current.reportAnomaly('Person')) // from wherever the player is looking

/** Goes on until `total` ms of the shift have passed, counting from the start. */
const advanceTo = (done: number, total: number) => advance(total - done)

describe('a correct report is recorded in the save', () => {
  it('remembers the anomaly id and counts it', () => {
    ledger.push(entry('a', 1))
    const { result } = startAway()
    advance(FIRST + 100)
    reportAt(result, 'Object')
    expect(saveData.load().foundIds).toEqual(['a'])
    expect(saveData.load().foundTotal).toBe(1)
  })

  it('does not raise a flag event before a milestone', () => {
    ledger.push(entry('a', 1))
    const { result } = startAway()
    const seqAtStart = result.current.flagEvent
    advance(FIRST + 100)
    reportAt(result, 'Object')
    expect(result.current.flagEvent).toEqual(seqAtStart)
    expect(result.current.flagEvent).toBeNull()
  })

  it('raises a flag event with a new seq when the report reaches a milestone', () => {
    ledger.push(entry('a', 1), entry('b', 1))
    const { result } = startAway()
    advance(FIRST + 100)
    reportAt(result, 'Object')
    advance(INTERVAL)
    reportAt(result, 'Object')
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
    const { result } = startAway()
    advance(FIRST + 100)
    act(() => result.current.switchCamera(0))
    wrongReport(result)
    expect(result.current.feedback).toMatchObject({
      kind: 'wrong',
      anomalyId: 'a',
    })
  })

  it('is null when there is no anomaly on the watched camera', () => {
    ledger.push(entry('a', 2))
    const { result } = startAway()
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
    const { result } = startAway()
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
    const { result } = startAway()
    threeWrong(result)
    advance(1500)
    act(() => result.current.finishEnding())
    expect(result.current.gameState).toBe('lose')
  })

  it('does not end before the third false report', () => {
    const { result } = startAway()
    wrongReport(result)
    wrongReport(result)
    advance(5000)
    expect(result.current.gameState).toBe('playing')
  })

  it('accepts no further report once the limit is reached: a correct one does not count', () => {
    ledger.push(entry('a', 1, 'Object'))
    const { result } = startAway()
    advance(FIRST + 100)
    reportAt(result, 'Person')
    reportAt(result, 'Person')
    reportAt(result, 'Person')
    reportAt(result, 'Object') // right answer inside the 1.5 s window
    expect(result.current.stats.correctReports).toBe(0)
    expect(result.current.stats.misreports).toBe(3)
    expect(saveData.load().foundIds).toEqual([])
  })

  it('accepts no further false report either: the count stays at the limit', () => {
    const { result } = startAway()
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
    const hook = startAway()
    let at = 0
    for (let i = 0; i < n; i++) {
      const step = i === 0 ? FIRST + 100 : INTERVAL
      advance(step)
      at += step
      reportAt(hook.result, 'Object')
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

  it('ends at 480000 ms', () => {
    const { result } = playWith(0, total)
    expect(result.current.gameState).toBe('ending')
  })

  it('ends at 480001 ms without ending twice', () => {
    const { result } = playWith(0, total + 1)
    advance(10_000)
    expect(result.current.gameState).toBe('ending')
    expect(saveData.load().loops).toBe(1)
  })
})

describe('the end is counted once', () => {
  it('time out and withdraw in the same shift add only one loop', () => {
    const { result } = startAway()
    advance(DEFAULT_CONFIG.totalDurationMs - TOAST_MS)
    for (let i = 0; i < DEFAULT_CONFIG.maxMisreports; i++) wrongReport(result)
    // The withdraw timer and the time-out now fall due together.
    advance(TOAST_MS + 5000)
    expect(result.current.gameState).toBe('ending')
    expect(saveData.load().loops).toBe(1)
  })

  it('the cap was reached first: time running out during the toast still ends as a withdraw', () => {
    const { result } = startAway()
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
      reportAt(hook.result, 'Object')
    }
    return at
  }

  it('the limit reached just before time runs out ends as withdraw / lose, counted once', () => {
    const { result } = startAway()
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
    const hook = startAway()
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
    const { result } = startAway()
    wrong(result, DEFAULT_CONFIG.maxMisreports - 1)
    advance(total)
    expect(result.current.ending).toEqual({ closing: 'dawn', outcome: 'lose' })
  })

  it('below the limit, time running out is still a dawn: win at the minimum', () => {
    const hook = startAway()
    const at = resolve(hook, DEFAULT_CONFIG.minCorrectReports)
    wrong(hook.result, DEFAULT_CONFIG.maxMisreports - 1)
    advance(total - at)
    expect(hook.result.current.ending).toEqual({
      closing: 'dawn',
      outcome: 'win',
    })
  })

  it('the withdraw due after the toast does not run again once the shift has ended', () => {
    const { result } = startAway()
    wrong(result, DEFAULT_CONFIG.maxMisreports)
    advance(TOAST_MS)
    expect(result.current.ending?.closing).toBe('withdraw')
    expect(saveData.load().loops).toBe(1)
    advance(total + 5000)
    expect(result.current.ending?.closing).toBe('withdraw')
    expect(saveData.load().loops).toBe(1)
  })

  it('boundary below the limit: playing at 479999 ms, dawn at 480000 ms', () => {
    const { result } = startAway()
    wrong(result, DEFAULT_CONFIG.maxMisreports - 1)
    advance(total - 1)
    expect(result.current.gameState).toBe('playing')
    advance(1)
    expect(result.current.ending).toEqual({ closing: 'dawn', outcome: 'lose' })
  })

  it('records a dawn as the whole shift (8:00) even though a tick lands a little late or early', () => {
    const { result } = startAway()
    advance(total + 7)
    expect(result.current.ending?.closing).toBe('dawn')
    expect(saveData.load().lastShift).toMatchObject({
      closing: 'dawn',
      durationMs: total,
    })
  })

  it('boundary at the limit: playing at 479999 ms, withdraw at 480000 ms (toast still pending)', () => {
    const { result } = startAway()
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
    const hook = startAway()
    withdraw(hook)
    act(() => hook.result.current.startGame())
    act(() => hook.result.current.switchCamera(7)) // a new shift starts on camera 1
    expect(hook.result.current.stats.misreports).toBe(0)

    advance(FIRST + 100)
    reportAt(hook.result, 'Object')
    expect(hook.result.current.stats.correctReports).toBe(1)

    wrongReport(hook.result)
    expect(hook.result.current.stats.misreports).toBe(1)
  })

  it('applies the false-report limit again in the second shift, counting loops cumulatively', () => {
    const hook = startAway()
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
    const { result } = startAway()
    advance(FIRST + 100)
    advance(DEFAULT_CONFIG.totalDurationMs)
    expect(result.current.gameState).toBe('ending')
    const before = JSON.stringify(result.current.stats)
    const saved = JSON.stringify(saveData.load())
    reportAt(result, 'Object')
    reportAt(result, 'Person')
    expect(JSON.stringify(result.current.stats)).toBe(before)
    expect(JSON.stringify(saveData.load())).toBe(saved)
  })
})

describe('startGame resets the ending and the flag event', () => {
  it('a loops-based flag is put on flagEvent at the start', () => {
    saveData.update(cur => ({ ...cur, loops: 1 }))
    const { result } = startAway()
    expect(result.current.flagEvent).toEqual({
      seq: expect.any(Number),
      flags: ['loopy'],
    })
  })

  it('flagEvent is null at the start when no flag became true', () => {
    const { result } = startAway()
    expect(result.current.flagEvent).toBeNull()
  })

  it('a new shift forgets the previous ending and the previous flag event', () => {
    saveData.update(cur => ({ ...cur, loops: 1 }))
    const { result } = startAway()
    advance(DEFAULT_CONFIG.totalDurationMs)
    expect(result.current.ending).not.toBeNull()
    act(() => result.current.finishEnding())
    act(() => result.current.startGame())
    expect(result.current.ending).toBeNull()
    expect(result.current.gameState).toBe('playing')
    expect(result.current.flagEvent).toBeNull() // 'loopy' was raised once already
  })

  it('a second shift can end and be counted again', () => {
    const { result } = startAway()
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
    const { result } = startAway()
    advance(total)
    expect(result.current.ending?.closing).toBe('dawn')
  })

  it('in a shift that starts with the child already found, anomalies come faster and up to the higher cap', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = startAway()
    advance(FIRST + 100)
    expect(result.current.activeAnomalies).toHaveLength(1)
    advance(CHILD_FOUND_PACING.anomalyIntervalMs)
    expect(result.current.activeAnomalies).toHaveLength(2)
    advance(CHILD_FOUND_PACING.anomalyIntervalMs * 10)
    expect(CHILD_FOUND_PACING.maxConcurrentAnomalies).toBe(8)
    // The cap is 8, but the watched camera never gets one (#418): 8 cameras leave 7 for the anomalies.
    expect(result.current.cameras).toHaveLength(8)
    expect(result.current.activeAnomalies).toHaveLength(7)
    expect(
      new Set(result.current.activeAnomalies.map(a => a.cameraId)).size
    ).toBe(7)
  })

  it('child found and nothing reported afterwards: the ending, a win, one loop', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = startAway()
    advance(total)
    expect(result.current.ending).toEqual({ closing: 'ending', outcome: 'win' })
    expect(result.current.gameState).toBe('ending')
    expect(saveData.load().loops).toBe(1)
    act(() => result.current.finishEnding())
    expect(result.current.gameState).toBe('win')
  })

  it('reaching the ending is saved, and a later startGame does not start a shift (#294)', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = startAway()
    advance(total)
    expect(saveData.load().endingReached).toBe(true)
    act(() => result.current.finishEnding())
    act(() => result.current.startGame())
    expect(result.current.gameState).toBe('win')
    act(() => result.current.returnToTitle())
    expect(result.current.gameState).toBe('idle')
    act(() => result.current.startGame())
    expect(result.current.gameState).toBe('idle')
  })

  it('an ordinary dawn does not mark the ending', () => {
    fill()
    const { result } = startAway()
    advance(total)
    expect(result.current.ending?.closing).toBe('dawn')
    expect(saveData.load().endingReached).toBe(false)
    act(() => result.current.finishEnding())
    act(() => result.current.returnToTitle())
    act(() => result.current.startGame())
    expect(result.current.gameState).toBe('playing')
  })

  it('one report of an anomaly that appeared after the child makes it an ordinary dawn', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = startAway()
    advance(FIRST + 100)
    const here = result.current.activeAnomalies[0]
    act(() => result.current.switchCamera(here.cameraId - 1))
    reportAt(result, here.category)
    expect(result.current.stats.correctReports).toBe(1)
    advanceTo(FIRST + 100, total)
    expect(result.current.ending?.closing).toBe('dawn')
  })

  it('the report that raises the child flag mid-shift does not count: ignoring the rest is the ending', () => {
    fill()
    seed({ foundTotal: 49 })
    const { result } = startAway()
    advance(FIRST + 100)
    const first = result.current.activeAnomalies[0]
    act(() => result.current.switchCamera(first.cameraId - 1))
    reportAt(result, first.category)
    expect(saveData.load().flags.child).toBe(true)
    // Anomalies spawned from now on are post-child (faster cadence); none is reported.
    advanceTo(FIRST + 100, total)
    expect(result.current.activeAnomalies.length).toBeGreaterThan(1)
    expect(result.current.ending).toEqual({ closing: 'ending', outcome: 'win' })
  })

  it('reporting an older anomaly (shown before the child) after the child is found does not stop the ending', () => {
    fill()
    seed({ foundTotal: 49 })
    const { result } = startAway()
    advance(FIRST + 100)
    const old = result.current.activeAnomalies[0]
    advance(INTERVAL)
    const second = result.current.activeAnomalies[1]
    // Raise the child with the second one, then report the first (older) one.
    act(() => result.current.switchCamera(second.cameraId - 1))
    reportAt(result, second.category)
    expect(saveData.load().flags.child).toBe(true)
    act(() => result.current.switchCamera(old.cameraId - 1))
    reportAt(result, old.category)
    advanceTo(FIRST + 100 + INTERVAL, total)
    expect(result.current.ending?.closing).toBe('ending')
  })

  it('nothing appeared after the child (the last ledger entry raised it): dawn', () => {
    ledger.push(entry('only', 1))
    seed({ foundTotal: 49 })
    const { result } = startAway()
    advance(FIRST + 100)
    reportAt(result, 'Object')
    expect(saveData.load().flags.child).toBe(true)
    advanceTo(FIRST + 100, total)
    expect(result.current.ending?.closing).toBe('dawn')
  })

  it('a withdraw is never the ending, even with the child found and nothing reported', () => {
    fill()
    seed({ flags: { child: true } })
    const { result } = startAway()
    advance(FIRST + 100)
    for (let i = 0; i < DEFAULT_CONFIG.maxMisreports; i++) {
      act(() => result.current.switchCamera(7))
      reportAt(result, 'Person')
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
    const { result } = startAway()
    advance(FIRST + 100)
    // End the first shift by a withdraw: after the true ending itself no shift can start (#294).
    for (let i = 0; i < DEFAULT_CONFIG.maxMisreports; i++) {
      act(() => result.current.switchCamera(7))
      reportAt(result, 'Person')
    }
    advance(TOAST_MS + 100)
    act(() => result.current.finishEnding())
    act(() => result.current.startGame())
    advance(FIRST + 100)
    advance(CHILD_FOUND_PACING.anomalyIntervalMs)
    expect(result.current.activeAnomalies).toHaveLength(2)
  })
})

describe('spawn rules (#418, #427)', () => {
  const switchTo = (hook: ReturnType<typeof start>, cameraId: number) => {
    const index = hook.result.current.cameras.findIndex(c => c.id === cameraId)
    act(() => hook.result.current.switchCamera(index))
  }

  describe('never on the watched camera (#418)', () => {
    it('an entry fixed to the watched camera waits, and appears once the player looks elsewhere', () => {
      ledger.push(entry('a', 1)) // the shift starts on camera 1
      const { result } = start()
      advance(FIRST + INTERVAL)
      expect(result.current.stats.totalAnomalies).toBe(0)
      switchTo({ result } as ReturnType<typeof start>, 2)
      advance(1500) // retried on the short cadence, no interval spent
      expect(result.current.activeAnomalies.map(a => a.id)).toEqual(['a'])
      // switching back shows it already there
      switchTo({ result } as ReturnType<typeof start>, 1)
      expect(result.current.activeAnomalyHere?.id).toBe('a')
    })

    it('draws another camera instead when the watched one is a candidate too', () => {
      ledger.push(entry('a', 1), entry('b', 2))
      const { result } = start()
      advance(FIRST + 100)
      expect(result.current.activeAnomalies.map(a => a.id)).toEqual(['b'])
    })

    it('a non-image anomaly is never drawn on the watched camera', () => {
      for (let i = 0; i < 12; i++) {
        nonImage.length = 0
        nonImage.push({
          id: 'RT-FEED-22',
          category: 'Camera',
          anomalyType: 'feed_glitch',
        })
        const hook = start()
        advance(FIRST + 100)
        expect(hook.result.current.activeAnomalies[0].cameraId).not.toBe(1)
        hook.unmount()
      }
    })

    it('RT-FEED-28 takes its extra cameras only among the free ones: not the watched camera, not a busy one', () => {
      // rng 0.5 everywhere: one extra camera is asked for, and it is the middle of whatever list it is drawn from.
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      ledger.push(entry('i3', 3), entry('i4', 4), entry('i5', 5))
      const hook = start() // watching camera 1
      advance(FIRST + INTERVAL * 2 + 300)
      expect(
        hook.result.current.activeAnomalies.map(x => x.cameraId).sort()
      ).toEqual([3, 4, 5])
      nonImage.push({
        id: 'RT-FEED-28',
        category: 'Camera',
        anomalyType: 'feed_glitch',
      })
      advance(INTERVAL + 300)
      const g = hook.result.current.activeAnomalies.find(
        x => x.id === 'RT-FEED-28'
      )
      expect(g?.feedGlitch).toBe('nonoise')
      const free = [2, 6, 7, 8] // not 1 (watched), not 3, 4, 5 (busy)
      expect(free).toContain(g!.cameraId)
      expect(g!.feedGlitchCameraIds).toHaveLength(2)
      for (const id of g!.feedGlitchCameraIds!) expect(free).toContain(id)
    })

    it('a spawn lands out of sight; looking at it right after shows it, and it never lands on the camera now watched', () => {
      ledger.push(entry('a', 2), entry('b', 3))
      const hook = start()
      switchTo(hook, 2) // before the first spawn
      advance(FIRST + 100)
      expect(hook.result.current.activeAnomalies.map(x => x.id)).toEqual(['b'])
      switchTo(hook, 3) // right after it appeared
      expect(hook.result.current.activeAnomalyHere?.id).toBe('b')
      // now camera 3 is watched and holds 'b'; 'a' (camera 2) is free and not watched
      advance(INTERVAL)
      expect(hook.result.current.activeAnomalies.map(x => x.id).sort()).toEqual(
        ['a', 'b']
      )
    })
  })

  describe('a found anomaly is not drawn again until START OVER (#427)', () => {
    const findA = () => {
      ledger.push(entry('a', 2), entry('b', 2))
      const hook = start()
      switchTo(hook, 3) // so camera 2 is out of sight when it appears
      advance(FIRST + 100)
      switchTo(hook, 2)
      const id = hook.result.current.activeAnomalies[0].id
      act(() => hook.result.current.reportAnomaly('Object'))
      return { hook, id }
    }

    it('retires the found id (and foundIds keeps it); a missed one is drawn again next shift', () => {
      const { hook, id } = findA()
      expect(saveData.load().retiredIds).toEqual([id])
      expect(saveData.load().foundIds).toEqual([id])
      // next shift: only the other entry on camera 2 is a candidate
      act(() => hook.result.current.startGame())
      switchTo(hook, 3)
      advance(FIRST + 100)
      const other = id === 'a' ? 'b' : 'a'
      expect(hook.result.current.activeAnomalies.map(a => a.id)).toEqual([
        other,
      ])
      // not reported -> not retired
      expect(saveData.load().retiredIds).toEqual([id])
    })

    it('a camera whose images are all found is refilled alone, avoiding the one found last', () => {
      ledger.push(entry('a', 2), entry('z', 3))
      saveData.update(cur => ({ ...cur, retiredIds: ['z', 'a'] }))
      const hook = start()
      advance(FIRST + 100)
      // camera 2 and camera 3 are both used up -> both refilled; only 'a'/'z' exist, and each is "last" of its own
      // camera, but a draw avoids them only while another choice exists
      expect(hook.result.current.stats.totalAnomalies).toBe(1)
      expect(saveData.load().retiredIds).toEqual([])
      expect(saveData.load().foundIds).toEqual([])
    })

    it('refills one group without touching another', () => {
      ledger.push(entry('a', 2), entry('c', 3), entry('d', 3))
      saveData.update(cur => ({ ...cur, retiredIds: ['c', 'a'] }))
      const hook = start()
      advance(FIRST + 100)
      // camera 2 (just 'a') is used up and released; camera 3 still has 'd', so 'c' stays retired
      expect(saveData.load().retiredIds).toEqual(['c'])
      expect(hook.result.current.activeAnomalies).toHaveLength(1)
      expect(hook.result.current.activeAnomalies[0].id).not.toBe('c')
    })

    it('the non-image group is refilled on its own', () => {
      nonImage.push({
        id: 'RT-FEED-22',
        category: 'Camera',
        anomalyType: 'feed_glitch',
      })
      ledger.push(entry('a', 2))
      saveData.update(cur => ({ ...cur, retiredIds: ['a', 'RT-FEED-22'] }))
      start()
      advance(FIRST + 100)
      expect(saveData.load().retiredIds).toEqual([])
    })

    it('never leaves the shift without anything to draw (no dead end)', () => {
      ledger.push(entry('a', 2))
      saveData.update(cur => ({ ...cur, retiredIds: ['a'] }))
      const { result } = start()
      advance(FIRST + 100)
      expect(result.current.activeAnomalies.map(a => a.id)).toEqual(['a'])
    })

    it('a group refilled while its camera is watched still avoids the one found last on its next draw', () => {
      for (const v of [0, 0.99]) {
        const spy = vi.spyOn(Math, 'random').mockReturnValue(v)
        ledger.length = 0
        ledger.push(entry('a', 2), entry('b', 2))
        saveData.update(cur => ({ ...cur, retiredIds: ['a', 'b'] }))
        const hook = start()
        switchTo(hook, 2) // the group's camera is the watched one: refilled now, cannot be drawn yet
        advance(FIRST + 100)
        expect(hook.result.current.activeAnomalies).toEqual([])
        expect(saveData.load().retiredIds).toEqual([])
        switchTo(hook, 3)
        advance(1500)
        // 'b' was found last, so 'a' comes, whichever way the rng leans
        expect(hook.result.current.activeAnomalies.map(x => x.id)).toEqual([
          'a',
        ])
        hook.unmount()
        spy.mockRestore()
        saveData.update(cur => ({ ...cur, retiredIds: [] }))
      }
    })

    it('the avoided id stays avoided across a spawn from another group, until its own group is drawn from (#427)', () => {
      for (const v of [0, 0.99]) {
        const spy = vi.spyOn(Math, 'random').mockReturnValue(v)
        ledger.length = 0
        ledger.push(entry('a', 2), entry('b', 2), entry('c', 4))
        saveData.update(cur => ({ ...cur, retiredIds: ['a', 'b'] }))
        const hook = start()
        switchTo(hook, 2)
        advance(FIRST + 100)
        expect(hook.result.current.activeAnomalies.map(x => x.id)).toEqual([
          'c',
        ])
        switchTo(hook, 3)
        advance(INTERVAL + 100)
        expect(hook.result.current.activeAnomalies.map(x => x.id)).toEqual([
          'c',
          'a',
        ])
        hook.unmount()
        spy.mockRestore()
        saveData.update(cur => ({ ...cur, retiredIds: [] }))
      }
    })

    it('found-but-not-released ids do not stop the shift: the report that exhausts a group is followed by a refill', () => {
      ledger.push(entry('a', 2), entry('c', 2))
      saveData.update(cur => ({ ...cur, retiredIds: ['a'] }))
      const hook = start()
      advance(FIRST + 100)
      expect(hook.result.current.activeAnomalies.map(x => x.id)).toEqual(['c'])
      advance(INTERVAL * 2) // failed attempts while 'a' is retired and 'c' is up: must not end the spawning
      switchTo(hook, 2)
      act(() => hook.result.current.reportAnomaly('Object'))
      switchTo(hook, 3)
      advance(3000)
      // both found now -> the group is refilled; 'c' was shown this shift, so 'a' is what can come
      expect(hook.result.current.activeAnomalies.some(x => x.id === 'a')).toBe(
        true
      )
    })

    it('only the non-image group is refilled when only it is used up', () => {
      nonImage.push({
        id: 'RT-FEED-22',
        category: 'Camera',
        anomalyType: 'feed_glitch',
      })
      ledger.push(entry('c', 3), entry('d', 3))
      saveData.update(cur => ({ ...cur, retiredIds: ['c', 'RT-FEED-22'] }))
      start()
      advance(FIRST + 100)
      expect(saveData.load().retiredIds).toEqual(['c'])
    })

    it('START OVER clears the retired ids', () => {
      saveData.update(cur => ({ ...cur, retiredIds: ['a'], foundIds: ['a'] }))
      act(() => resetProgress())
      expect(saveData.load().retiredIds).toEqual([])
    })
  })
})

describe('a story person (#430)', () => {
  const ids = Array.from({ length: 100 }, (_, i) => `seen-${i}`)
  const seed = (extra: Partial<saveData.SaveData> = {}) =>
    saveData.update(cur => ({
      ...cur,
      foundIds: ids,
      flags: { two: true },
      ...extra,
    }))
  const person = () => ({ ...personEntry })
  const switchTo = (hook: ReturnType<typeof start>, cameraId: number) => {
    const index = hook.result.current.cameras.findIndex(c => c.id === cameraId)
    act(() => hook.result.current.switchCamera(index))
  }

  it('appears at once when its conditions hold, on its own fixed camera, even with a full cap and an empty ordinary ledger', () => {
    seed()
    ledger.push(person())
    const hook = start()
    advance(600)
    expect(hook.result.current.activeAnomalies.map(a => a.id)).toEqual([
      'person-guest',
    ])
    expect(hook.result.current.activeAnomalies[0].cameraId).toBe(6)
    expect(hook.result.current.activeAnomalies[0].storyFlag).toBe('guest')
  })

  it('does not appear before its conditions hold', () => {
    seed({ foundIds: ids.slice(0, 99) })
    ledger.push(person())
    const hook = start()
    advance(2000)
    expect(hook.result.current.activeAnomalies).toEqual([])
    // the hundredth find lets it appear (the condition is a permission, the flag rises only on a report)
    saveData.update(cur => ({ ...cur, foundIds: ids }))
    advance(600)
    expect(hook.result.current.activeAnomalies.map(a => a.id)).toEqual([
      'person-guest',
    ])
    expect(saveData.load().flags.guest).toBeUndefined()
  })

  it('is never drawn by the ordinary draw', () => {
    ledger.push(person())
    const hook = startAway()
    advance(FIRST + INTERVAL * 3)
    expect(hook.result.current.activeAnomalies).toEqual([])
  })

  it('waits while its camera is the watched one (#418), then appears when the player looks away', () => {
    seed()
    ledger.push(person())
    const hook = start()
    switchTo(hook, 6)
    advance(2000)
    expect(hook.result.current.activeAnomalies).toEqual([])
    switchTo(hook, 1)
    advance(600)
    expect(hook.result.current.activeAnomalies.map(a => a.id)).toEqual([
      'person-guest',
    ])
  })

  it('waits while another anomaly holds its camera, and removes nothing for it', () => {
    ledger.push(entry('busy', 6), person())
    const hook = startAway()
    advance(FIRST + 100)
    expect(hook.result.current.activeAnomalies.map(a => a.id)).toEqual(['busy'])
    seed()
    advance(3000)
    expect(hook.result.current.activeAnomalies.map(a => a.id)).toEqual(['busy'])
    reportAt(hook.result, 'Object')
    advance(600)
    expect(
      hook.result.current.activeAnomalies.some(a => a.id === 'person-guest')
    ).toBe(true)
  })

  it('stays across shifts until it is reported (not by time)', () => {
    seed()
    ledger.push(person())
    const first = startAway()
    advance(DEFAULT_CONFIG.totalDurationMs - 2000)
    expect(
      first.result.current.activeAnomalies.some(a => a.id === 'person-guest')
    ).toBe(true)
    first.unmount()
    const second = startAway()
    advance(600)
    expect(
      second.result.current.activeAnomalies.some(a => a.id === 'person-guest')
    ).toBe(true)
    expect(saveData.load().flags.guest).toBeUndefined()
  })

  it('a report raises its flag (not the condition), keeps the picture until releasePerson, and is drawn once only', () => {
    seed()
    ledger.push(person())
    const hook = start()
    advance(600)
    switchTo(hook, 6)
    expect(hook.result.current.activeAnomalyHere?.id).toBe('person-guest')
    // a wrong category is an ordinary false report: the person stays
    act(() => hook.result.current.reportAnomaly('Object'))
    expect(hook.result.current.stats.misreports).toBe(1)
    expect(hook.result.current.activeAnomalyHere?.id).toBe('person-guest')
    act(() => hook.result.current.reportAnomaly('Person'))
    expect(saveData.load().flags.guest).toBe(true)
    expect(saveData.load().pendingStories).toContain('guest')
    expect(hook.result.current.flagEvent?.flags).toContain('guest')
    // still shown while its conversation runs, but no longer counted as unreported
    expect(hook.result.current.activeAnomalyHere?.id).toBe('person-guest')
    expect(hook.result.current.unreportedCount).toBe(0)
    // a camera switch does not take it away
    switchTo(hook, 1)
    switchTo(hook, 6)
    expect(hook.result.current.activeAnomalyHere?.id).toBe('person-guest')
    advance(3000)
    expect(
      hook.result.current.activeAnomalies.filter(a => a.id === 'person-guest')
    ).toHaveLength(1)
    act(() => hook.result.current.releasePerson('guest'))
    expect(hook.result.current.activeAnomalyHere).toBeUndefined()
    advance(3000)
    expect(
      hook.result.current.activeAnomalies.some(a => a.id === 'person-guest')
    ).toBe(false)
  })

  it('a held person keeps its camera: no other anomaly is drawn there meanwhile', () => {
    seed()
    ledger.push(person(), entry('later', 6))
    const hook = start()
    advance(600)
    switchTo(hook, 6)
    act(() => hook.result.current.reportAnomaly('Person'))
    switchTo(hook, 1)
    advance(FIRST + INTERVAL)
    expect(hook.result.current.activeAnomalies.map(a => a.id)).toEqual([
      'person-guest',
    ])
    act(() => hook.result.current.releasePerson('guest'))
    advance(INTERVAL)
    expect(
      hook.result.current.activeAnomalies.some(a => a.id === 'later')
    ).toBe(true)
  })
})
