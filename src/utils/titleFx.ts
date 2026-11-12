/** The title photo's random bursts of monitor noise (#296, #332): about a second long and frequent, noise on roughly 30% of the time. */
export const BURST_MS = [400, 1100] as const
export const GAP_MS = [800, 3500] as const

/** A random value in [lo, hi] from a 0..1 source. */
export const between = (
  [lo, hi]: readonly [number, number] | readonly number[],
  rand: number
): number => lo + (hi - lo) * rand

export interface Band {
  top: number // %
  height: number // %
}

/** The white horizontal tear bands of one noise frame (3 to 6 of them). */
export const makeBands = (rand: () => number): Band[] => {
  const n = 3 + Math.floor(rand() * 4)
  return Array.from({ length: n }, () => ({
    top: rand() * 100,
    height: 0.4 + rand() * 2.2,
  }))
}
