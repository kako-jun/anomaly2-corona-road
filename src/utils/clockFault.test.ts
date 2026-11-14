import { describe, expect, it } from 'vitest'
import {
  CLOCK_FAULT_KINDS,
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
  it('jump: the hour goes to 00 or 06 (the one that is not the real hour), the minutes keep running', () => {
    expect(faultedClock('01:23', f('jump'))).toBe('00:23')
    expect(faultedClock('00:23', f('jump'))).toBe('06:23')
  })
  it('picks every kind with the rng and keeps the start time', () => {
    const kinds = [0, 0.4, 0.9].map(r => pickClockFault('22:30', () => r))
    expect(kinds.map(k => k.kind)).toEqual([...CLOCK_FAULT_KINDS])
    expect(kinds.every(k => k.start === '22:30')).toBe(true)
  })
})
