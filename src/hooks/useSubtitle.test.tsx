// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { StrictMode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as saveData from '../utils/saveData'
import { load } from '../utils/saveData'
import { DEFAULT_CONFIG, DIALOGUE_CONFIG } from '../utils/gameConfig'
import { SUBTITLE_GAP_MS, subtitleHoldMs } from '../utils/subtitle'
import { SubtitleInput, useSubtitle } from './useSubtitle'

// A small ledger instead of the real samples, so the tests do not depend on their wording or length.
// Every line has its own text, which is how the tests tell the conversations apart.
const H = vi.hoisted(() => {
  type Tone = 'light' | 'serious'
  const e = (
    kind: string,
    id: string,
    when: Record<string, string>,
    tone: Tone,
    ...texts: string[]
  ) => ({
    kind,
    id,
    when,
    tone,
    lines: texts.map((text, i) => ({ who: i % 2 === 0 ? 'A' : 'M', text })),
  })
  const all = [
    e('opening', 'opening-1', {}, 'light', 'op1a', 'op1b'),
    e('opening', 'opening-2', {}, 'light', 'op2a', 'op2b'),
    e('chatter', 'chatter-1', {}, 'light', 'ch1a', 'ch1b'),
    e('chatter', 'chatter-2', {}, 'light', 'ch2a', 'ch2b'),
    e('chatter', 'chatter-3', {}, 'light', 'ch3a', 'ch3b'),
    e('false-report', 'false-report-1', {}, 'serious', 'fr1a', 'fr1b'),
    e('anomaly-line', 'an-x-1', { anomaly: 'x' }, 'light', 'anx1a', 'anx1b'),
    e('anomaly-line', 'an-y-1', { anomaly: 'y' }, 'serious', 'any1a', 'any1b'),
    e('anomaly-line', 'an-y-2', { anomaly: 'y' }, 'serious', 'any2a', 'any2b'),
    e(
      'spawn-hint',
      'spawn-hint-y-1',
      { anomaly: 'y' },
      'serious',
      'shy1a',
      'shy1b'
    ),
    e(
      'spawn-hint',
      'spawn-hint-y-2',
      { anomaly: 'y' },
      'serious',
      'shy2a',
      'shy2b'
    ),
    e(
      'spawn-hint',
      'spawn-hint-z-1',
      { anomaly: 'z' },
      'serious',
      'shz1a',
      'shz1b'
    ),
    e('story', 'story-f1', { flag: 'f1' }, 'serious', 'st1a', 'st1b'),
    e('story', 'story-f2', { flag: 'f2' }, 'serious', 'st2a', 'st2b'),
    e('midpoint', 'midpoint-few-1', { stage: 'few' }, 'light', 'mfa', 'mfb'),
    e('midpoint', 'midpoint-mid-1', { stage: 'mid' }, 'light', 'mma', 'mmb'),
    e('midpoint', 'midpoint-many-1', { stage: 'many' }, 'light', 'mxa', 'mxb'),
    e('closing', 'closing-dawn-1', { result: 'dawn' }, 'light', 'cda', 'cdb'),
    e(
      'closing',
      'closing-withdraw-1',
      { result: 'withdraw' },
      'light',
      'cwa',
      'cwb'
    ),
  ]
  return { all, loads: { n: 0 }, ledger: { flags: [], entries: [...all] } }
})
vi.mock('virtual:dialogue', () => ({ default: H.ledger }))

// The real save store keeps the last save in memory, so a fresh one per test (and per simulated reload) is needed.
vi.mock('../utils/saveData', async importOriginal => {
  const actual = await importOriginal<typeof import('../utils/saveData')>()
  const make = () => actual.createSaveStore({ getStorage: () => localStorage })
  const holder = { store: make() }
  return {
    ...actual,
    load: () => {
      H.loads.n++
      return holder.store.load()
    },
    update: (fn: Parameters<typeof actual.update>[0]) =>
      holder.store.update(fn),
    canPersist: () => holder.store.canPersist(),
    resetStore: () => {
      holder.store = make()
    },
  }
})
const resetStore = () =>
  (saveData as unknown as { resetStore: () => void }).resetStore()

const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms))

const base: SubtitleInput = {
  wrongFeedbackId: null,
  wrongAnomalyId: null,
  elapsedMs: 0,
  foundThisPlay: 0,
  flagEvent: null,
  ending: null,
  onClosingDone: () => {},
}

const ORIGINAL_INTERVAL = DIALOGUE_CONFIG.chatterIntervalMs

beforeEach(() => {
  vi.useFakeTimers()
  localStorage.clear()
  resetStore()
  H.ledger.entries = [...H.all]
  // Draws take the first candidate, so the conversation that plays is predictable.
  vi.spyOn(Math, 'random').mockReturnValue(0)
})
afterEach(() => {
  DIALOGUE_CONFIG.chatterIntervalMs = ORIGINAL_INTERVAL
  vi.restoreAllMocks()
  vi.useRealTimers()
})

const setup = (over: Partial<SubtitleInput> = {}) =>
  renderHook((p: SubtitleInput) => useSubtitle(p), {
    initialProps: { ...base, ...over },
  })

describe('useSubtitle', () => {
  it('starts empty and waits for the opening delay', () => {
    const { result } = setup()
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS - 1)
    expect(result.current).toEqual({
      text: '',
      english: false,
      visible: false,
    })
  })

  it('shows an opening line after the delay', () => {
    const { result } = setup()
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS)
    expect(result.current.visible).toBe(true)
    expect(result.current.text).not.toBe('')
  })

  it('is silent after the conversation, then speaks again after the interval', () => {
    const { result } = setup()
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS)
    // opening samples have two lines
    for (let i = 0; i < 2; i++)
      advance(subtitleHoldMs(result.current.text) + SUBTITLE_GAP_MS)
    advance(DIALOGUE_CONFIG.chatterIntervalMs / 2)
    expect(result.current.visible).toBe(false)
    advance(DIALOGUE_CONFIG.chatterIntervalMs / 2)
    expect(result.current.visible).toBe(true)
  })

  it('plays the closing conversation, then calls onClosingDone', () => {
    const done = vi.fn()
    const { rerender } = setup({ onClosingDone: done })
    rerender({ ...base, onClosingDone: done, ending: 'dawn' })
    expect(done).not.toHaveBeenCalled()
    advance(60_000)
    expect(done).toHaveBeenCalledTimes(1)
  })

  it('leaves no timers behind after unmount', () => {
    const { unmount } = setup()
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS)
    // The first line shows (and is saved) at this instant; one more ms lets the zero-delay timer
    // that is still pending run out, so only the hook's own timer is left to be cleaned up.
    advance(1)
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('works under StrictMode', () => {
    const { result } = renderHook(() => useSubtitle(base), {
      wrapper: StrictMode,
    })
    advance(DIALOGUE_CONFIG.openingDelayMs + SUBTITLE_GAP_MS)
    expect(result.current.visible).toBe(true)
  })
})

// ---- timing helpers ------------------------------------------------------------------------

/** Midpoint of the shift in ms (the midpoint comment is due here). */
const MID_MS = DEFAULT_CONFIG.totalDurationMs / 2

const GAP = SUBTITLE_GAP_MS
const OPEN_AT = DIALOGUE_CONFIG.openingDelayMs + GAP
/** How long a conversation is on screen, from its first line showing to its last line hiding. */
const convMs = (texts: string[]) =>
  texts.reduce((sum, t, i) => sum + subtitleHoldMs(t) + (i > 0 ? GAP : 0), 0)
const OPENING_END = OPEN_AT + convMs(['op1a', 'op1b'])
const SILENCE = DIALOGUE_CONFIG.chatterIntervalMs

let done = vi.fn()
beforeEach(() => {
  done = vi.fn()
})
const props = (over: Partial<SubtitleInput> = {}): SubtitleInput => ({
  ...base,
  onClosingDone: done,
  ...over,
})

/** Mounts the hook; `set` re-renders with the changed props kept on top of the earlier ones. */
const driver = (over: Partial<SubtitleInput> = {}, strict = false) => {
  let cur = props(over)
  const hook = renderHook((i: SubtitleInput) => useSubtitle(i), {
    initialProps: cur,
    wrapper: strict ? StrictMode : undefined,
  })
  return {
    ...hook,
    set: (o: Partial<SubtitleInput>) => {
      cur = { ...cur, ...o }
      hook.rerender(cur)
    },
  }
}

/** Advances in 50 ms steps and records each new line that appears, in order. */
const watch = (result: { current: { text: string; visible: boolean } }) => {
  const seen: string[] = []
  const note = () => {
    const { text, visible } = result.current
    if (visible && seen[seen.length - 1] !== text) seen.push(text)
  }
  note()
  return {
    seen,
    step: (ms: number) => {
      for (let left = ms; left > 0; left -= 50) {
        advance(Math.min(50, left))
        note()
      }
    },
  }
}

const shown = (r: { current: { text: string; visible: boolean } }) =>
  r.current.visible ? r.current.text : null

describe('useSubtitle: start', () => {
  it('shows nothing at 4599 ms, the opening at 4600 ms, and still at 4601 ms', () => {
    expect(OPEN_AT).toBe(4600)
    const d = driver()
    advance(4599)
    expect(shown(d.result)).toBeNull()
    advance(1)
    expect(shown(d.result)).toBe('op1a')
    advance(1)
    expect(shown(d.result)).toBe('op1a')
  })

  it('stays silent for the whole chatter interval after the opening, then speaks', () => {
    const d = driver()
    advance(OPENING_END)
    expect(shown(d.result)).toBeNull()
    advance(SILENCE + GAP - 1)
    expect(shown(d.result)).toBeNull()
    advance(1)
    expect(shown(d.result)).toBe('ch1a')
  })
})

describe('useSubtitle: false report', () => {
  it('cuts the conversation on screen: its remaining lines never show', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1 })
    expect(shown(d.result)).toBeNull()
    const w = watch(d.result)
    w.step(20_000)
    expect(w.seen.slice(0, 2)).toEqual(['fr1a', 'fr1b'])
    expect(w.seen).not.toContain('op1b')
  })

  it('waits the silence gap, then the line gap, before the false-report conversation', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1 })
    advance(2 * GAP - 1)
    expect(shown(d.result)).toBeNull()
    advance(1)
    expect(shown(d.result)).toBe('fr1a')
  })

  it("prefers the reported anomaly's own conversation", () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1, wrongAnomalyId: 'x' })
    advance(2 * GAP)
    expect(shown(d.result)).toBe('anx1a')
  })

  it('falls back to the common conversation once the own one is used up', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1, wrongAnomalyId: 'x' })
    advance(2 * GAP) // anx1a shows: the own conversation is now used
    d.set({ wrongFeedbackId: 2, wrongAnomalyId: 'x' })
    advance(2 * GAP)
    expect(shown(d.result)).toBe('fr1a')
  })

  it('plays only the last one when reports come in quick succession', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1, wrongAnomalyId: 'x' })
    advance(100)
    d.set({ wrongFeedbackId: 2, wrongAnomalyId: null })
    const w = watch(d.result)
    w.step(10_000)
    expect(w.seen).toContain('fr1a')
    expect(w.seen).not.toContain('anx1a')
  })

  it('does not fire again when re-rendered with the same feedback id', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1 })
    advance(2 * GAP)
    expect(shown(d.result)).toBe('fr1a')
    d.set({ wrongFeedbackId: 1, elapsedMs: 5000 })
    advance(subtitleHoldMs('fr1a') + GAP)
    expect(shown(d.result)).toBe('fr1b')
  })

  it('a report during the wait before the opening comes right after the opening', () => {
    const d = driver()
    advance(1000)
    d.set({ wrongFeedbackId: 1 })
    const w = watch(d.result)
    w.step(OPENING_END + 2 * GAP - 1 - 1000)
    expect(w.seen).toEqual(['op1a', 'op1b'])
    expect(shown(d.result)).toBeNull()
    advance(1)
    expect(shown(d.result)).toBe('fr1a')
  })
})

describe('useSubtitle: flag stories', () => {
  it('lets the line on screen finish, then plays the story', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ flagEvent: { seq: 1, flags: ['f1'] } })
    expect(shown(d.result)).toBe('op1a')
    const w = watch(d.result)
    w.step(subtitleHoldMs('op1a') + 2 * GAP + 10)
    expect(w.seen).toEqual(['op1a', 'st1a'])
  })

  it('does not queue the same event twice when re-rendered with the same seq', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ flagEvent: { seq: 1, flags: ['f1'] } })
    const w = watch(d.result)
    w.step(15_000) // the story has played
    d.set({ flagEvent: { seq: 1, flags: ['f1'] } })
    w.step(SILENCE + 20_000)
    expect(w.seen.filter(t => t === 'st1a')).toHaveLength(1)
  })

  it('plays two flags raised together in definition order', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ flagEvent: { seq: 1, flags: ['f1', 'f2'] } })
    const w = watch(d.result)
    w.step(25_000)
    expect(w.seen.slice(0, 5)).toEqual(['op1a', 'st1a', 'st1b', 'st2a', 'st2b'])
  })

  it('ignores a flag that has no story', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ flagEvent: { seq: 1, flags: ['nostory'] } })
    const w = watch(d.result)
    w.step(10_000)
    expect(w.seen.slice(0, 2)).toEqual(['op1a', 'op1b'])
  })

  it('a false report does not cut a story: it waits until the story ends', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ flagEvent: { seq: 1, flags: ['f1'] } })
    const w = watch(d.result)
    w.step(subtitleHoldMs('op1a') + 2 * GAP + 10) // st1a is on screen
    d.set({ wrongFeedbackId: 1 })
    w.step(20_000)
    expect(w.seen).toEqual(['op1a', 'st1a', 'st1b', 'fr1a', 'fr1b'])
  })

  it('another flag does not cut a story either: it plays after it', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ flagEvent: { seq: 1, flags: ['f1'] } })
    const w = watch(d.result)
    w.step(subtitleHoldMs('op1a') + 2 * GAP + 10)
    d.set({ flagEvent: { seq: 2, flags: ['f2'] } })
    w.step(20_000)
    expect(w.seen.slice(0, 5)).toEqual(['op1a', 'st1a', 'st1b', 'st2a', 'st2b'])
  })

  it('a story that was pending at the end stays in the save, and plays at the next start', () => {
    const d = driver()
    advance(OPEN_AT)
    // What recording the correct report does in the game: the flag is raised and its story is pending.
    saveData.update(cur => ({
      ...cur,
      flags: { f1: true },
      pendingStories: ['f1'],
    }))
    d.set({ flagEvent: { seq: 1, flags: ['f1'] } })
    d.set({ ending: 'dawn' })
    const w = watch(d.result)
    w.step(30_000)
    expect(w.seen).not.toContain('st1a')
    expect(saveData.load().pendingStories).toEqual(['f1'])
    d.unmount()

    resetStore() // a reload: only localStorage survives
    const next = driver()
    const w2 = watch(next.result)
    w2.step(15_000)
    expect(w2.seen).toContain('st1a')
  })

  it('removes the story from the pending list once its first line shows', () => {
    saveData.update(cur => ({ ...cur, pendingStories: ['f1'] }))
    const d = driver()
    const w = watch(d.result)
    for (let i = 0; i < 300 && !w.seen.includes('st1a'); i++) w.step(50)
    expect(w.seen).toContain('st1a')
    expect(saveData.load().pendingStories).toEqual([])
  })

  it('a story carried over from the last shift plays after the opening, not instead of it', () => {
    saveData.update(cur => ({ ...cur, pendingStories: ['f1'] }))
    const d = driver()
    const w = watch(d.result)
    w.step(OPENING_END + 20_000)
    expect(w.seen.slice(0, 4)).toEqual(['op1a', 'op1b', 'st1a', 'st1b'])
  })
})

describe('useSubtitle: midpoint comment', () => {
  it('does not come at midpoint - 1 ms, comes at the midpoint', () => {
    const d = driver()
    advance(OPENING_END)
    d.set({ elapsedMs: MID_MS - 1 })
    advance(2000)
    expect(shown(d.result)).toBeNull()
    d.set({ elapsedMs: MID_MS })
    advance(2 * GAP - 1)
    expect(shown(d.result)).toBeNull()
    advance(1)
    expect(shown(d.result)).toBe('mfa')
  })

  it('comes only once however long the play goes on', () => {
    const d = driver({ elapsedMs: MID_MS })
    const w = watch(d.result)
    for (let i = 0; i < 120; i++) {
      d.set({ elapsedMs: MID_MS + i * 1000 })
      w.step(1000)
    }
    expect(w.seen.filter(t => t === 'mfa')).toHaveLength(1)
  })

  it.each([
    [0, 'mfa'],
    [1, 'mfa'],
    [2, 'mma'],
    [3, 'mma'],
    [4, 'mxa'],
    [5, 'mxa'],
  ])('with %i found it picks %s', (found, first) => {
    const d = driver({ elapsedMs: MID_MS, foundThisPlay: found })
    const w = watch(d.result)
    w.step(OPENING_END + SILENCE + GAP + 10)
    expect(w.seen[2]).toBe(first)
  })

  it('comes before chatter', () => {
    const d = driver({ elapsedMs: MID_MS })
    const w = watch(d.result)
    w.step(OPENING_END + SILENCE + GAP + 10)
    expect(w.seen.slice(0, 3)).toEqual(['op1a', 'op1b', 'mfa'])
  })

  it('comes after a false report', () => {
    const d = driver({ elapsedMs: MID_MS })
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1 })
    const w = watch(d.result)
    w.step(60_000)
    expect(w.seen.slice(0, 3)).toEqual(['fr1a', 'fr1b', 'mfa'])
  })

  it('comes after a flag story', () => {
    const d = driver({ elapsedMs: MID_MS })
    advance(OPEN_AT)
    d.set({ flagEvent: { seq: 1, flags: ['f1'] } })
    const w = watch(d.result)
    w.step(60_000)
    expect(w.seen.slice(0, 4)).toEqual(['op1a', 'st1a', 'st1b', 'mfa'])
  })

  it('is not used up when a false report cuts it before its first line: it plays later', () => {
    const d = driver({ elapsedMs: MID_MS })
    advance(OPENING_END + SILENCE) // the midpoint is drawn now, its first line not yet shown
    advance(100)
    d.set({ wrongFeedbackId: 1 })
    expect(saveData.load().usedChatter).not.toContain('midpoint-few-1')
    const w = watch(d.result)
    w.step(60_000)
    expect(w.seen.slice(0, 3)).toEqual(['fr1a', 'fr1b', 'mfa'])
  })
})

describe('useSubtitle: ending', () => {
  const CLOSE_DAWN_DONE = 2 * GAP + convMs(['cda', 'cdb'])

  it.each([
    ['dawn', ['cda', 'cdb']],
    ['withdraw', ['cwa', 'cwb']],
  ] as const)(
    '%s plays only its own closing and calls onClosingDone once',
    (ending, texts) => {
      const d = driver()
      d.set({ ending })
      const w = watch(d.result)
      w.step(60_000)
      expect(w.seen).toEqual([...texts])
      expect(done).toHaveBeenCalledTimes(1)
    }
  )

  it('calls onClosingDone right after the last closing line has gone', () => {
    const d = driver()
    d.set({ ending: 'dawn' })
    advance(CLOSE_DAWN_DONE - 1)
    expect(done).not.toHaveBeenCalled()
    advance(1)
    expect(done).toHaveBeenCalledTimes(1)
  })

  it('without a closing candidate calls onClosingDone after 0 ms, not synchronously', () => {
    H.ledger.entries = H.all.filter(e => e.kind !== 'closing')
    const d = driver()
    d.set({ ending: 'dawn' })
    expect(done).not.toHaveBeenCalled()
    advance(0)
    expect(done).toHaveBeenCalledTimes(1)
  })

  it('ignores false reports, flags and the midpoint during the closing, and drops what was pending', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1, flagEvent: { seq: 1, flags: ['f1'] } })
    d.set({ elapsedMs: MID_MS })
    d.set({ ending: 'dawn' })
    const w = watch(d.result)
    w.step(10_000)
    d.set({ wrongFeedbackId: 2, flagEvent: { seq: 2, flags: ['f2'] } })
    w.step(120_000)
    expect(w.seen).toEqual(['cda', 'cdb'])
    expect(done).toHaveBeenCalledTimes(1)
  })

  it('does not play the closing twice when re-rendered, or when the ending changes', () => {
    const d = driver()
    d.set({ ending: 'dawn' })
    const w = watch(d.result)
    w.step(3000)
    d.set({ ending: 'dawn', elapsedMs: 1 })
    d.set({ ending: 'withdraw' })
    w.step(60_000)
    expect(w.seen).toEqual(['cda', 'cdb'])
    expect(done).toHaveBeenCalledTimes(1)
  })
})

describe('useSubtitle: used conversations (bag)', () => {
  it('records a conversation as used when its first line shows, not before', () => {
    driver()
    advance(OPEN_AT - 1)
    expect(saveData.load().usedChatter).toEqual([])
    advance(1)
    expect(saveData.load().usedChatter).toEqual(['opening-1'])
  })

  it('a conversation cut before its first line is not used', () => {
    const d = driver()
    advance(OPENING_END + SILENCE) // chatter-1 is drawn, not yet shown
    advance(100)
    d.set({ wrongFeedbackId: 1 })
    expect(saveData.load().usedChatter).not.toContain('chatter-1')
  })

  it('a conversation drawn but never shown before unmount is not used', () => {
    const d = driver()
    advance(OPEN_AT - 1)
    d.unmount()
    expect(saveData.load().usedChatter).toEqual([])
  })

  it('is saved, so the next start (after a reload) does not repeat the opening', () => {
    const first = driver()
    advance(OPEN_AT)
    expect(shown(first.result)).toBe('op1a')
    first.unmount()
    resetStore()
    const second = driver()
    advance(OPEN_AT)
    expect(shown(second.result)).toBe('op2a')
  })
})

describe('useSubtitle: spawn hint (#343)', () => {
  const HINT = DIALOGUE_CONFIG.hintDelayMs
  const OPP = DIALOGUE_CONFIG.hintMinGapMs
  const ORIGINAL = { ...DIALOGUE_CONFIG }
  afterEach(() => Object.assign(DIALOGUE_CONFIG, ORIGINAL))
  const isHint = (t: string) => /^sh[yz]\d[ab]$/.test(t)
  const firstLines = (seen: string[]) => seen.filter(t => /^sh[yz]\da$/.test(t))
  /** Mounted with the anomalies open from play time 0, the opening over and in the silence after it. */
  const inSilence = (ids: string[] = ['y']) => {
    const d = driver({ openAnomalyIds: ids, elapsedMs: 0 })
    advance(OPENING_END + 1000)
    return d
  }
  /** Plays on for `ms` of both clocks (play time moves with the wall clock here), noting what shows. */
  const run = (
    d: ReturnType<typeof driver>,
    from: number,
    ms: number,
    w: ReturnType<typeof watch>
  ) => {
    for (let t = 0; t < ms; t += 500) {
      d.set({ elapsedMs: from + t })
      w.step(500)
    }
  }

  it('does not speak for an anomaly before the delay', () => {
    const d = inSilence()
    d.set({ elapsedMs: HINT - 1 })
    advance(2 * GAP)
    expect(shown(d.result)).toBeNull()
  })

  it('speaks a spawn-hint conversation once it has been unreported for the delay (dice came up)', () => {
    const d = inSilence()
    d.set({ elapsedMs: HINT })
    advance(2 * GAP - 1)
    expect(shown(d.result)).toBeNull()
    advance(1)
    expect(shown(d.result)).toBe('shy1a')
  })

  it('chance boundaries: 0 never speaks, 1 always, 0.5 speaks below 0.5 only', () => {
    const attempt = (chance: number, dice: number) => {
      DIALOGUE_CONFIG.hintChance = chance
      vi.mocked(Math.random).mockReturnValue(dice)
      const d = inSilence()
      d.set({ elapsedMs: HINT })
      const w = watch(d.result)
      w.step(SILENCE - 2000)
      d.unmount()
      return w.seen.some(isHint)
    }
    expect(attempt(0, 0)).toBe(false)
    expect(attempt(1, 0.999999)).toBe(true)
    expect(attempt(0.5, 0.49)).toBe(true)
    expect(attempt(0.5, 0.5)).toBe(false)
    expect(DIALOGUE_CONFIG.hintChance).toBe(0.5)
  })

  it('is reproducible with a seeded random: the same dice give the same hints', () => {
    const play = () => {
      let x = 12345
      vi.mocked(Math.random).mockImplementation(() => {
        x = (x * 1103515245 + 12345) % 2147483648
        return x / 2147483648
      })
      localStorage.clear()
      resetStore()
      const d = inSilence()
      const w = watch(d.result)
      run(d, HINT, 6 * OPP, w)
      d.unmount()
      return w.seen.filter(isHint)
    }
    const a = play()
    expect(a.length).toBeGreaterThan(0)
    expect(play()).toEqual(a)
  })

  it('a miss waits for the next opportunity (one per hintMinGapMs of play time)', () => {
    const d = inSilence()
    vi.mocked(Math.random).mockReturnValue(0.9)
    d.set({ elapsedMs: HINT })
    const w = watch(d.result)
    w.step(SILENCE)
    d.set({ elapsedMs: HINT + OPP - 1 })
    w.step(SILENCE)
    expect(w.seen.filter(isHint)).toEqual([])
    vi.mocked(Math.random).mockReturnValue(0)
    d.set({ elapsedMs: HINT + OPP })
    w.step(2 * SILENCE)
    expect(firstLines(w.seen)).toEqual(['shy1a'])
  })

  it('repeats for the same anomaly while it is unreported, never the same conversation twice in a row', () => {
    DIALOGUE_CONFIG.hintChance = 1
    const d = inSilence()
    const w = watch(d.result)
    run(d, HINT, 10 * OPP, w)
    const firsts = firstLines(w.seen)
    expect(firsts.length).toBeGreaterThanOrEqual(3)
    firsts.slice(1).forEach((t, i) => expect(t).not.toBe(firsts[i]))
  })

  it('does not speak when the anomaly was reported before the hint', () => {
    const d = inSilence()
    d.set({ elapsedMs: HINT - 1000 })
    d.set({ openAnomalyIds: [], elapsedMs: HINT })
    advance(SILENCE - 2000)
    expect(shown(d.result)).toBeNull()
  })

  it('a hint already on screen is shown to the end when the anomaly is reported meanwhile; then no more', () => {
    DIALOGUE_CONFIG.hintChance = 1
    const d = inSilence()
    d.set({ elapsedMs: HINT })
    const w = watch(d.result)
    w.step(2 * GAP + 100)
    expect(shown(d.result)).toBe('shy1a')
    d.set({ openAnomalyIds: [], elapsedMs: HINT + 1000 })
    w.step(convMs(['shy1a', 'shy1b']))
    expect(w.seen).toContain('shy1b')
    run(d, HINT + 2000, 6 * OPP, w)
    expect(firstLines(w.seen)).toEqual(['shy1a'])
  })

  it('has its own pool: a false-report hint does not use it up, and the hint does not mark anything used', () => {
    DIALOGUE_CONFIG.hintChance = 1
    const d = driver({ openAnomalyIds: ['y'], elapsedMs: 0 })
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1, wrongAnomalyId: 'y' })
    advance(2 * GAP)
    expect(shown(d.result)).toBe('any1a')
    advance(convMs(['any1a', 'any1b']) + 1000)
    d.set({ elapsedMs: HINT })
    const w = watch(d.result)
    w.step(SILENCE)
    expect(firstLines(w.seen)).toEqual(['shy1a'])
    expect(load().usedLines.y).toEqual(['an-y-1'])
  })

  it('an anomaly without a spawn-hint gets none (no fallback to the false-report ones)', () => {
    DIALOGUE_CONFIG.hintChance = 1
    const d = inSilence(['nope'])
    d.set({ elapsedMs: HINT })
    const w = watch(d.result)
    w.step(SILENCE - 2000)
    expect(w.seen).toEqual([])
  })

  it('is off with hintEnabled false', () => {
    DIALOGUE_CONFIG.hintEnabled = false
    DIALOGUE_CONFIG.hintChance = 1
    const d = inSilence()
    d.set({ elapsedMs: HINT })
    const w = watch(d.result)
    w.step(SILENCE - 2000)
    expect(w.seen).toEqual([])
  })

  it('does not cut the conversation on screen: it waits for the next pick', () => {
    const d = driver({ openAnomalyIds: ['y'], elapsedMs: 0 })
    advance(OPEN_AT)
    d.set({ elapsedMs: HINT })
    expect(shown(d.result)).toBe('op1a')
    const w = watch(d.result)
    w.step(20_000)
    expect(w.seen).toContain('shy1a')
    expect(w.seen.indexOf('op1b')).toBeLessThan(w.seen.indexOf('shy1a'))
  })

  it('a false report goes before a due hint, the hint comes next', () => {
    const d = inSilence(['y'])
    d.set({ elapsedMs: HINT, wrongFeedbackId: 1, wrongAnomalyId: null })
    const w = watch(d.result)
    w.step(SILENCE)
    expect(w.seen.indexOf('fr1a')).toBeGreaterThanOrEqual(0)
    expect(w.seen.indexOf('fr1a')).toBeLessThan(w.seen.indexOf('shy1a'))
  })

  it('a due hint goes before the midpoint comment', () => {
    const d = inSilence(['y'])
    d.set({ elapsedMs: MID_MS })
    const w = watch(d.result)
    w.step(2 * SILENCE)
    expect(w.seen.indexOf('shy1a')).toBeGreaterThanOrEqual(0)
    expect(w.seen.indexOf('shy1a')).toBeLessThan(w.seen.indexOf('mfa'))
  })

  it('when play time jumps (tab back) and several anomalies are due at once, hintMinGapMs spaces them out', () => {
    DIALOGUE_CONFIG.chatterIntervalMs = 2000
    DIALOGUE_CONFIG.hintChance = 1
    const d = inSilence(['y', 'z'])
    d.set({ elapsedMs: 10 * 60_000 })
    const w = watch(d.result)
    w.step(DIALOGUE_CONFIG.hintMinGapMs - 3000)
    expect(firstLines(w.seen)).toHaveLength(1)
    w.step(2 * DIALOGUE_CONFIG.hintMinGapMs)
    expect(firstLines(w.seen).length).toBeGreaterThanOrEqual(2)
  })

  it('does not change the save shape (nothing is written for a hint)', () => {
    DIALOGUE_CONFIG.hintChance = 1
    const d = inSilence()
    const before = JSON.stringify(load())
    d.set({ elapsedMs: HINT })
    advance(2 * GAP + 100)
    expect(shown(d.result)).toBe('shy1a')
    expect(JSON.stringify(load())).toBe(before)
  })

  it('never reads the save on a per-frame tick (dice, delay and gap are checked first)', () => {
    const d = inSilence()
    const before = H.loads.n
    for (let i = 0; i < 200; i++) d.set({ elapsedMs: i * 16 })
    DIALOGUE_CONFIG.hintChance = 0
    for (let i = 0; i < 200; i++) d.set({ elapsedMs: HINT + i * 16 })
    expect(H.loads.n).toBe(before)
  })
})

describe('useSubtitle: chatter after a serious conversation', () => {
  const FR_END = OPEN_AT + 2 * GAP + convMs(['fr1a', 'fr1b'])

  it('does not follow a serious conversation until the quiet time has passed (short silence)', () => {
    DIALOGUE_CONFIG.chatterIntervalMs = 5000
    const d = driver()
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1 }) // serious
    advance(FR_END - OPEN_AT)
    // 20 s of quiet time (seriousQuietMs) run from here; the chatter is drawn at 20 s and shows 600 ms later
    advance(10_000)
    expect(shown(d.result)).toBeNull()
    advance(DIALOGUE_CONFIG.seriousQuietMs - 10_000 + GAP - 1)
    expect(shown(d.result)).toBeNull()
    advance(1)
    expect(shown(d.result)).toBe('ch1a')
  })

  it('follows a light conversation after the silence alone (short silence)', () => {
    DIALOGUE_CONFIG.chatterIntervalMs = 5000
    const d = driver()
    advance(OPENING_END + 5000 + GAP - 1)
    expect(shown(d.result)).toBeNull()
    advance(1)
    expect(shown(d.result)).toBe('ch1a')
  })

  it('with the default silence (30 s > 20 s quiet) the gate is already open: chatter follows a serious one after the silence (B-4)', () => {
    const d = driver()
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1 })
    advance(FR_END - OPEN_AT + SILENCE + GAP - 1)
    expect(shown(d.result)).toBeNull()
    advance(1)
    expect(shown(d.result)).toBe('ch1a')
  })
})

describe('useSubtitle: robustness', () => {
  it('under StrictMode a false report and a flag are each handled once', () => {
    const d = driver(
      { wrongFeedbackId: 1, flagEvent: { seq: 1, flags: ['f1'] } },
      true
    )
    const w = watch(d.result)
    w.step(120_000)
    for (const t of ['st1a', 'st1b', 'fr1a', 'fr1b'])
      expect(w.seen.filter(s => s === t)).toHaveLength(1)
  })

  it('leaves no timers after unmount: mid-conversation', () => {
    const d = driver()
    advance(OPEN_AT)
    expect(shown(d.result)).toBe('op1a')
    advance(1) // lets React's own zero-delay timer run out, as the older unmount test does
    d.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('leaves no timers after unmount: mid-closing', () => {
    const d = driver()
    d.set({ ending: 'dawn' })
    advance(GAP + 10)
    expect(shown(d.result)).toBe('cda')
    d.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('leaves no timers after unmount: with a conversation pending', () => {
    const d = driver()
    advance(OPENING_END)
    d.set({ flagEvent: { seq: 1, flags: ['f1'] } })
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    d.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('logs no console errors (act warnings) over a whole play', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    const d = driver({}, true)
    advance(OPEN_AT)
    d.set({ wrongFeedbackId: 1, wrongAnomalyId: 'x' })
    advance(5000)
    d.set({ flagEvent: { seq: 1, flags: ['f1'] }, elapsedMs: MID_MS })
    advance(60_000)
    d.set({ ending: 'withdraw' })
    advance(60_000)
    d.unmount()
    expect(err).not.toHaveBeenCalled()
  })
})
