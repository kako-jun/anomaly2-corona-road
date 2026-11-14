// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { LedgerEntry } from '../utils/anomalyLedger'
import * as saveData from '../utils/saveData'
import { useGameState } from './useGameState'

// The child (#430): a story person whose arrival is announced by a foreshadowing conversation (trigger `childDue`) and
// who comes only after that conversation has ended. A small ledger and flags, like useGameState.test.tsx.
const child = vi.hoisted(() => ({
  id: 'person-child',
  cameraId: 4,
  category: 'Person' as const,
  anomalyType: 'add_person' as const,
  overlay: 'assets/person-child.webp',
  origin: { x: 1, y: 2 },
  size: { w: 3, h: 4 },
  storyFlag: 'child',
}))
const ledger = vi.hoisted(() => [] as LedgerEntry[])
vi.mock('virtual:non-image-anomalies', () => ({ default: [] }))
vi.mock('virtual:anomalies', () => ({ default: [child] }))
vi.mock('../data/anomalyLedger', () => ({
  ANOMALY_LEDGER: ledger,
  overlayUrlFor: (e: { id: string }) => `/overlay/${e.id}.webp`,
  preloadOverlays: vi.fn(),
}))
vi.mock('virtual:dialogue', () => ({
  default: {
    flags: [
      { name: 'child', when: { foundUnique: 3 } },
      { name: 'prelude', when: { trigger: 'childDue' } },
    ],
    entries: [
      ...['child', 'prelude'].map(f => ({
        kind: 'story',
        id: `story-${f}`,
        tone: 'serious',
        when: { flag: f },
        lines: [{ who: 'A', text: f }],
      })),
    ],
  },
}))
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

const advance = (ms: number) => {
  for (let left = ms; left > 0; left -= 250)
    act(() => void vi.advanceTimersByTime(Math.min(250, left)))
}
const ids = ['a', 'b', 'c']
beforeEach(() => {
  vi.useFakeTimers()
  localStorage.clear()
  ;(saveData as unknown as { resetStore: () => void }).resetStore()
  ledger.length = 0
  ledger.push({ ...child })
  saveData.update(cur => ({ ...cur, foundIds: ids }))
})
afterEach(() => vi.useRealTimers())

const start = () => {
  const hook = renderHook(() => useGameState())
  act(() => hook.result.current.startGame())
  return hook
}

describe('the child waits for its foreshadowing conversation (#430)', () => {
  it('raises the foreshadowing flag once its conditions hold, but does not appear until that conversation has ended', () => {
    const hook = start()
    advance(1000)
    expect(saveData.load().flags.prelude).toBe(true)
    expect(saveData.load().pendingStories).toContain('prelude')
    expect(hook.result.current.flagEvent?.flags).toEqual(['prelude'])
    expect(hook.result.current.activeAnomalies).toEqual([])
    act(() => hook.result.current.releasePerson('prelude')) // the subtitles report its end
    advance(500)
    expect(hook.result.current.activeAnomalies.map(a => a.id)).toEqual([
      'person-child',
    ])
  })

  it('does not write the save again and again while it waits', () => {
    const hook = start()
    advance(600)
    const spy = vi.spyOn(Storage.prototype, 'setItem')
    advance(5000)
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
    hook.unmount()
  })

  it('a foreshadowing already played in an earlier shift does not hold the child back', () => {
    saveData.update(cur => ({ ...cur, flags: { prelude: true } }))
    const hook = start()
    advance(600)
    expect(hook.result.current.activeAnomalies.map(a => a.id)).toEqual([
      'person-child',
    ])
  })

  it('pressing the category again while the conversation runs is ignored, not a false report', () => {
    saveData.update(cur => ({ ...cur, flags: { prelude: true } }))
    const hook = start()
    advance(600)
    const index = hook.result.current.cameras.findIndex(c => c.id === 4)
    act(() => hook.result.current.switchCamera(index))
    act(() => hook.result.current.reportAnomaly('Person'))
    expect(saveData.load().flags.child).toBe(true)
    act(() => hook.result.current.reportAnomaly('Person'))
    act(() => hook.result.current.reportAnomaly('Person'))
    expect(hook.result.current.stats.misreports).toBe(0)
    expect(hook.result.current.stats.correctReports).toBe(1)
    expect(hook.result.current.activeAnomalyHere?.id).toBe('person-child')
  })

  it('a person whose flag another tab already raised is not held (no conversation will end it)', () => {
    saveData.update(cur => ({ ...cur, flags: { prelude: true } }))
    const hook = start()
    advance(600)
    const index = hook.result.current.cameras.findIndex(c => c.id === 4)
    act(() => hook.result.current.switchCamera(index))
    // another tab raises the flag after this one drew the person
    saveData.update(cur => ({ ...cur, flags: { ...cur.flags, child: true } }))
    act(() => hook.result.current.reportAnomaly('Person'))
    expect(hook.result.current.activeAnomalyHere).toBeUndefined()
  })
})
