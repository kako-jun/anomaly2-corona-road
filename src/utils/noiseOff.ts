/**
 * Shaking or knocking the monitor switches the noise grain off for a while (#342). Every number kako-jun tunes by
 * feel lives here, in this one place.
 */
/** How long the noise stays off (ms). A new shake / knock while it is off starts this over (it does not add up). */
export const NOISE_OFF_MS = 10_000
/** RT-RULE-03 (noise inverted): how long the raised noise lasts (ms). Its own number, so tuning one never moves the other. */
export const NOISE_RAISED_MS = 10_000
/** A shake peak: the acceleration (m/s^2, without gravity) over this counts as one hard movement. */
export const SHAKE_THRESHOLD = 15
/** A shake is this many peaks inside SHAKE_WINDOW_MS ... */
export const SHAKE_COUNT = 3
export const SHAKE_WINDOW_MS = 1000
/** ... and two peaks closer than this (ms) are one movement (a single jolt rings for a few events). */
export const SHAKE_MIN_GAP_MS = 80
/** A knock is a double tap on the picture: the second tap ends within this many ms of the first ... */
export const KNOCK_GAP_MS = 400
/** ... and within this many px of it. */
export const KNOCK_SLOP_PX = 40

/** The strength of one devicemotion sample: gravity-free acceleration if the device gives it, else the gravity-included one minus 1 g. */
export const motionMagnitude = (e: {
  acceleration?: { x: number | null; y: number | null; z: number | null } | null
  accelerationIncludingGravity?: {
    x: number | null
    y: number | null
    z: number | null
  } | null
}): number => {
  const len = (a: { x: number | null; y: number | null; z: number | null }) =>
    Math.hypot(a.x ?? 0, a.y ?? 0, a.z ?? 0)
  const a = e.acceleration
  if (a && (a.x !== null || a.y !== null || a.z !== null)) return len(a)
  const g = e.accelerationIncludingGravity
  return g ? Math.abs(len(g) - 9.81) : 0
}

/**
 * Shake detector (pure, fed one magnitude per devicemotion event). Returns true once SHAKE_COUNT separate peaks have
 * come inside SHAKE_WINDOW_MS; the peaks are then forgotten, so one shake fires once.
 */
export const createShakeDetector = (
  opts: {
    threshold?: number
    count?: number
    windowMs?: number
    minGapMs?: number
  } = {}
) => {
  const {
    threshold = SHAKE_THRESHOLD,
    count = SHAKE_COUNT,
    windowMs = SHAKE_WINDOW_MS,
    minGapMs = SHAKE_MIN_GAP_MS,
  } = opts
  let peaks: number[] = []
  // a peak counts only on the way up: the strength must have dropped to the threshold or below since the last one,
  // so one long hard movement (a fall, a hard brake, a bang on the desk) is one peak, not three
  let armed = true
  return {
    push(magnitude: number, now: number): boolean {
      peaks = peaks.filter(t => now - t <= windowMs)
      if (magnitude <= threshold) {
        armed = true
        return false
      }
      if (!armed) return false
      armed = false
      const last = peaks[peaks.length - 1]
      if (last !== undefined && now - last < minGapMs) return false
      peaks.push(now)
      if (peaks.length < count) return false
      peaks = []
      return true
    },
    reset() {
      peaks = []
      armed = true
    },
  }
}

/** A tap that ended at (x, y) at time `t` is the second of a knock when the previous tap was close in time and place. */
export const isKnock = (
  prev: { t: number; x: number; y: number } | null,
  cur: { t: number; x: number; y: number },
  gapMs: number = KNOCK_GAP_MS,
  slopPx: number = KNOCK_SLOP_PX
): boolean =>
  !!prev &&
  cur.t - prev.t <= gapMs &&
  Math.hypot(cur.x - prev.x, cur.y - prev.y) <= slopPx
