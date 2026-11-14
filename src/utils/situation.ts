import type { Situation } from './dialogueLedger'

/**
 * Situation lines (#428): conversations that react to the state of the shift (`hot` finds in quick succession or a clean
 * run, `cold` nothing found for a long time, `brink` two false reports, `tenth` the tenth find). They never touch the
 * rules, and they must not make the subtitles busier: an opportunity speaks only with probability `chance` (a miss is
 * forgotten, not carried over), a spoken situation takes the place of the next chatter (it is not an extra
 * conversation), a situation is kept apart from its own repeat by `minGapMs`, and each speaks at most `maxPerShift` times.
 *
 * This is the pure part (no React, no timers, no storage): the caller reports what happened and asks what to say.
 * Randomness is injected so tests can fix it.
 */

export interface SituationRule {
  /** Chance (0-1) that an opportunity speaks. */
  chance: number
  /** Least wall-clock gap between two lines of this situation. */
  minGapMs: number
  /** Most lines of this situation in one shift. */
  maxPerShift: number
}

export interface SituationConfig {
  rules: Record<Situation, SituationRule>
  /** `hot`: this many finds within `hotWindowMs` of play time ... */
  hotCount: number
  hotWindowMs: number
  /** ... or this many finds in the shift with no false report. */
  hotCleanCount: number
  /** `cold`: an opportunity for every `coldAfterMs` of play time without a find (counted from the shift start or the last find). */
  coldAfterMs: number
  /** `brink`: the false-report count that is one short of a withdraw. */
  brinkMisreports: number
  /** `tenth`: the find number of the shift. */
  tenthCount: number
  /** A situation that was rolled in but did not get to speak within this wall-clock time is dropped. */
  expireMs: number
}

/**
 * Which situation wins the one waiting place when two are due before either has spoken: the more pressing first
 * (brink > cold > hot > tenth). A lower one that arrives while a higher one waits is dropped; a higher one replaces
 * a lower one that waits.
 */
export const SITUATION_PRIORITY: readonly Situation[] = [
  'brink',
  'cold',
  'hot',
  'tenth',
]

export interface SituationTracker {
  /**
   * A correct report was made (`found` = correct reports so far this shift, `misreports` = false reports so far).
   * `quotaJustReached`: this find is the one that reached the quota, which has its own conversation, so `hot` is not
   * offered on the same find (two cheerful lines back to back).
   */
  found: (
    playMs: number,
    wallMs: number,
    found: number,
    misreports: number,
    quotaJustReached?: boolean
  ) => void
  /** A false report was made (`misreports` = false reports so far). */
  misreport: (wallMs: number, misreports: number) => void
  /** Play time moved on (the `cold` check). */
  tick: (playMs: number, wallMs: number) => void
  /** The situation waiting to be said, if it has not expired. */
  take: (wallMs: number) => Situation | null
  /** Its first line is on screen: it is spent (counts toward the limits, the gap restarts). */
  settle: (situation: Situation, wallMs: number) => void
}

export const createSituationTracker = (
  cfg: SituationConfig,
  rng: () => number = Math.random
): SituationTracker => {
  const times: number[] = []
  const shown: Record<Situation, number> = {
    hot: 0,
    cold: 0,
    brink: 0,
    tenth: 0,
  }
  const lastAt: Record<Situation, number> = {
    hot: -Infinity,
    cold: -Infinity,
    brink: -Infinity,
    tenth: -Infinity,
  }
  let lastFindAt = 0
  let coldSpent = 0
  let pending: { situation: Situation; at: number } | null = null

  /**
   * One opportunity: dropped when the limits say no, otherwise rolled once; it takes the waiting place when it is
   * free or held by a less pressing situation (`SITUATION_PRIORITY`).
   */
  const offer = (s: Situation, wallMs: number) => {
    const rule = cfg.rules[s]
    if (shown[s] >= rule.maxPerShift) return
    if (wallMs - lastAt[s] < rule.minGapMs) return
    if (!(rng() < rule.chance)) return
    if (
      pending !== null &&
      SITUATION_PRIORITY.indexOf(pending.situation) <=
        SITUATION_PRIORITY.indexOf(s)
    )
      return
    pending = { situation: s, at: wallMs }
  }

  return {
    found: (playMs, wallMs, found, misreports, quotaJustReached = false) => {
      times.push(playMs)
      // The quota conversation speaks now: a cheerful hot that already waits would follow it too closely.
      if (quotaJustReached && pending?.situation === 'hot') pending = null
      // A find ends the long quiet: a waiting "nothing found for a long time" line would now be false.
      if (pending?.situation === 'cold') pending = null
      lastFindAt = playMs
      coldSpent = 0
      if (found === cfg.tenthCount) {
        offer('tenth', wallMs)
        return
      }
      const recent = times.filter(t => playMs - t <= cfg.hotWindowMs).length
      if (
        !quotaJustReached &&
        (recent === cfg.hotCount ||
          (misreports === 0 && found === cfg.hotCleanCount))
      )
        offer('hot', wallMs)
    },
    misreport: (wallMs, misreports) => {
      if (misreports === cfg.brinkMisreports) offer('brink', wallMs)
    },
    tick: (playMs, wallMs) => {
      const n = Math.floor((playMs - lastFindAt) / cfg.coldAfterMs)
      if (n > coldSpent) {
        coldSpent = n
        offer('cold', wallMs)
      }
    },
    take: wallMs => {
      if (pending && wallMs - pending.at > cfg.expireMs) pending = null
      return pending?.situation ?? null
    },
    settle: (situation, wallMs) => {
      shown[situation]++
      lastAt[situation] = wallMs
      if (pending?.situation === situation) pending = null
    },
  }
}
