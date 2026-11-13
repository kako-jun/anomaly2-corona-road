/**
 * RT-UI-05 (the TIME window lies): the clock runs backwards, jumps to the start / end of the night, or stops while the
 * picture keeps moving. Only the digits on screen are wrong; the real game time (and the `role="timer"` name) is not.
 * One of the three is picked when the effect starts and kept until the report clears it.
 */
export type ClockFaultKind = 'backwards' | 'jump' | 'frozen'

export const CLOCK_FAULT_KINDS: readonly ClockFaultKind[] = [
  'backwards',
  'jump',
  'frozen',
]

/** The state held while the effect runs: the kind, and the real time (HH:MM) at the moment it started. */
export interface ClockFault {
  kind: ClockFaultKind
  start: string
}

const DAY = 24 * 60
const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
const fromMinutes = (min: number): string => {
  const m = ((min % DAY) + DAY) % DAY
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export const pickClockFault = (
  start: string,
  rng: () => number = Math.random
): ClockFault => ({
  kind: CLOCK_FAULT_KINDS[Math.floor(rng() * CLOCK_FAULT_KINDS.length)],
  start,
})

/**
 * The time to show for the real time `real` (HH:MM). backwards: the elapsed minutes since the start are subtracted
 * from it (it mirrors around the start time); frozen: the start time stays; jump: the hour becomes 00 or 06 (the
 * one that differs from the real hour; the minutes keep running), as if the clock lost its place.
 */
export const faultedClock = (real: string, fault: ClockFault): string => {
  const now = toMinutes(real)
  const start = toMinutes(fault.start)
  if (fault.kind === 'frozen') return fault.start
  if (fault.kind === 'backwards') {
    const elapsed = (now - start + DAY) % DAY
    return fromMinutes(start - elapsed)
  }
  const [hh, mm] = real.split(':')
  const hour = hh === '00' ? '06' : '00'
  return `${hour}:${mm}`
}
