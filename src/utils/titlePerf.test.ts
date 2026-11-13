import { describe, expect, it } from 'vitest'
import {
  initialPerf,
  PAUSE_GAP_MS,
  SLOW_FRAME_MS,
  SLOW_WINDOW_MS,
  stepPerf,
} from './titlePerf'
import type { PerfState } from './titlePerf'

/** Feeds frames every `interval` ms from `from` for `ms` ms. */
const run = (s: PerfState, from: number, ms: number, interval: number) => {
  let t = from
  for (; t <= from + ms; t += interval) s = stepPerf(s, t)
  return { s, t }
}

describe('titlePerf: stepping down on a slow device', () => {
  it('stays full at 60 fps and at 30 fps', () => {
    expect(run(initialPerf, 0, 10_000, 16.7).s.level).toBe('full')
    expect(run(initialPerf, 0, 10_000, 33).s.level).toBe('full')
  })
  it('steps down to lite after a window of frames slower than the limit, then to off after another', () => {
    const a = run(initialPerf, 0, SLOW_WINDOW_MS + 200, SLOW_FRAME_MS + 10)
    expect(a.s.level).toBe('lite')
    const b = run(a.s, a.t, SLOW_WINDOW_MS + 200, SLOW_FRAME_MS + 10)
    expect(b.s.level).toBe('off')
  })
  it('never steps back up, and off stays off', () => {
    const a = run(initialPerf, 0, 2 * SLOW_WINDOW_MS + 500, 80)
    expect(a.s.level).toBe('off')
    expect(run(a.s, a.t, 10_000, 16.7).s.level).toBe('off')
  })
  it('does not step down on a short stall: the window restarts when the frames come back', () => {
    let s = run(initialPerf, 0, 1000, 16.7).s
    const t = 1010
    s = run(s, t, 800, 200).s // a short slow stretch
    expect(s.level).toBe('full')
    expect(run(s, t + 1000, 10_000, 16.7).s.level).toBe('full')
  })
  it('does not count a hidden tab (a long gap between frames) as slowness', () => {
    let s = run(initialPerf, 0, 500, 16.7).s
    s = stepPerf(s, 500 + PAUSE_GAP_MS * 20)
    expect(s.level).toBe('full')
    expect(run(s, 500 + PAUSE_GAP_MS * 20, 5000, 16.7).s.level).toBe('full')
  })
  it('is pure: the state it is given is not changed', () => {
    const s = Object.freeze({ ...initialPerf })
    expect(() => stepPerf(s, 0)).not.toThrow()
    expect(s).toEqual(initialPerf)
  })
})
