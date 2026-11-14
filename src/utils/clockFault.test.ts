import { describe, expect, it } from 'vitest'
import {
  CLOCK_FAULT_KINDS,
  CLOCK_JUMP_HOLD_MIN,
  CLOCK_JUMP_PERIOD_MIN,
  faultedClock,
  pickClockFault,
  type ClockFault,
} from './clockFault'

const f = (kind: ClockFault['kind'], start = '23:10'): ClockFault => ({
  kind,
  start,
})

describe('RT-UI-05 clock fault', () => {
  it('shows the real time at the moment it starts, whatever the kind except jump', () => {
    expect(faultedClock('23:10', f('backwards'))).toBe('23:10')
    expect(faultedClock('23:10', f('frozen'))).toBe('23:10')
  })
  it('backwards: runs the other way as the real clock moves on (also across midnight)', () => {
    expect(faultedClock('23:25', f('backwards'))).toBe('22:55')
    expect(faultedClock('00:05', f('backwards'))).toBe('22:15')
    expect(faultedClock('23:10', f('backwards', '00:10'))).toBe('01:10')
  })
  it('frozen: stays on the start time while the real time moves', () => {
    expect(faultedClock('02:40', f('frozen'))).toBe('23:10')
  })
  it('jump: repeats - real time for a while, then the hour goes to 00 or 06 (the one that is not the real hour) with the minutes running, then back', () => {
    const start = '01:00'
    const at = (min: number) => {
      const t = 60 + min
      return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
    }
    const shown = (min: number) => faultedClock(at(min), f('jump', start))
    const real = CLOCK_JUMP_PERIOD_MIN - CLOCK_JUMP_HOLD_MIN
    expect(shown(0)).toBe(at(0))
    expect(shown(real - 1)).toBe(at(real - 1))
    expect(shown(real)).toBe(`00:${at(real).slice(3)}`)
    expect(shown(CLOCK_JUMP_PERIOD_MIN - 1)).toBe(
      `00:${at(CLOCK_JUMP_PERIOD_MIN - 1).slice(3)}`
    )
    // it comes back, and jumps again in the next period
    expect(shown(CLOCK_JUMP_PERIOD_MIN)).toBe(at(CLOCK_JUMP_PERIOD_MIN))
    expect(shown(CLOCK_JUMP_PERIOD_MIN + real)).not.toBe(
      at(CLOCK_JUMP_PERIOD_MIN + real)
    )
    // crossing midnight (start 23:55, real 00:01 = 6 minutes in, the first jump minute): 00 becomes 06
    expect(faultedClock('00:01', f('jump', '23:55'))).toBe('06:01')
    // the hour 00 jumps to 06
    expect(faultedClock('00:08', f('jump', '00:00'))).toBe('06:08')
  })
  it('picks every kind with the rng and keeps the start time', () => {
    const kinds = [0, 0.4, 0.9].map(r => pickClockFault('22:30', () => r))
    expect(kinds.map(k => k.kind)).toEqual([...CLOCK_FAULT_KINDS])
    expect(kinds.every(k => k.start === '22:30')).toBe(true)
  })
})
