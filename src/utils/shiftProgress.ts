import ledger from 'virtual:dialogue'
import anomalies from 'virtual:anomalies'
import nonImage from 'virtual:non-image-anomalies'
import { reiwaIdsOf } from './anomalyLedger'
import { newlyRaisedFlags, storyFlagNames } from './dialogueEngine'
import { DEFAULT_CONFIG } from './gameConfig'
import { stageOf } from './investigationNote'
import { MEMO_INDEX } from './memoIndex'
import { markShown, pickMemos, queueMemos } from './memoSelect'
import { emptySave, nextEpoch, update } from './saveData'
import type { LastShift, SaveData } from './saveData'

/**
 * Ids of the Reiwa anomalies: ledger entries (image + produced, and non_image + produced) marked `reiwa: true`, passed in through
 * `virtual:anomalies` (#83). The anomaly ledger is the only source; nothing is listed here.
 */
const REIWA_IDS: ReadonlySet<string> = new Set(
  reiwaIdsOf([...anomalies, ...nonImage])
)

const STORY_FLAGS = storyFlagNames(ledger)

/** Raise every flag whose condition now holds; the new names go to `out` (definition order). */
const withRaisedFlags = (cur: SaveData, out: string[]): SaveData => {
  const raised = newlyRaisedFlags(ledger.flags, {
    foundIds: cur.foundIds,
    foundTotal: cur.foundTotal,
    loops: cur.loops,
    flags: cur.flags,
    reiwaIds: REIWA_IDS,
  })
  if (raised.length === 0) return cur
  out.push(...raised)
  const flags = { ...cur.flags }
  for (const name of raised) flags[name] = true
  // The flag is saved as raised; its story waits (also across a reload) until it has been played.
  const pendingStories = [
    ...cur.pendingStories,
    ...raised.filter(
      n => STORY_FLAGS.has(n) && !cur.pendingStories.includes(n)
    ),
  ]
  return { ...cur, flags, pendingStories }
}

/** A correct report: count it, remember the id (and retire it from the draw, #427), save, and return the flags that just rose. */
export const recordFound = (anomalyId: string): string[] => {
  const out: string[] = []
  update(cur =>
    withRaisedFlags(
      queueMemos(
        {
          ...cur,
          foundTotal: cur.foundTotal + 1,
          foundIds: cur.foundIds.includes(anomalyId)
            ? cur.foundIds
            : [...cur.foundIds, anomalyId],
          retiredIds: cur.retiredIds.includes(anomalyId)
            ? cur.retiredIds
            : [...cur.retiredIds, anomalyId],
        },
        anomalyId,
        MEMO_INDEX.get(anomalyId)
      ),
      out
    )
  )
  return out
}

/**
 * A shift ended (dawn, withdraw or the true ending): one more loop, and how it went is kept for the
 * investigation note (#297). Flags that depend on loops rise at the next shift start.
 *
 * The result's memos are chosen here, once (#325): what is picked moves from waiting to shown and is written into
 * `lastShift`, so opening the result again shows the same memos. What is not picked stays waiting for a later shift.
 */
export const recordShiftEnd = (shift: LastShift): void => {
  update(cur => {
    const pick = pickMemos(cur, stageOf(cur), MEMO_INDEX)
    return {
      ...markShown(cur, pick),
      loops: cur.loops + 1,
      lastShift: {
        ...shift,
        ...(pick.memoFlag ? { memoFlag: pick.memoFlag } : {}),
        ...(pick.memo ? { memo: pick.memo } : {}),
      },
    }
  })
}

/** Shift start: raise flags that became true between shifts (loop-based ones) and return them. */
export const raiseFlagsAtStart = (): string[] => {
  const out: string[] = []
  update(cur => withRaisedFlags(cur, out))
  return out
}

/** The true ending was reached: from now on this save only offers "start over" (#294). */
export const recordEndingReached = (): void => {
  update(cur => ({ ...cur, endingReached: true }))
}

/** Start over (#294): wipe all progress. Only the display settings survive; they are not progress. */
export const resetProgress = (): void => {
  update(cur => ({
    ...emptySave(),
    epoch: nextEpoch(cur.epoch),
    ...(cur.settings ? { settings: cur.settings } : {}),
  }))
}

/**
 * The shift length for the investigation note. Time ran out (dawn, true ending) = the whole shift, whatever the
 * last animation frame happened to read (a tick can land a few ms before the end and show 7:59). A withdraw is
 * cut short, so it keeps the real time.
 */
export const shiftDurationMs = (
  closing: LastShift['closing'],
  elapsedMs: number
): number =>
  closing === 'withdraw'
    ? Math.min(Math.max(0, elapsedMs), DEFAULT_CONFIG.totalDurationMs)
    : DEFAULT_CONFIG.totalDurationMs

/**
 * Un-retire ids (#427): a group of anomalies was used up, so all of its ids may be drawn again. `foundIds` is not
 * touched (statistics, milestones and the Reiwa/child conditions keep counting what was ever found).
 */
export const unretire = (ids: readonly string[]): void => {
  if (ids.length === 0) return
  const drop = new Set(ids)
  update(cur => ({
    ...cur,
    retiredIds: cur.retiredIds.filter(id => !drop.has(id)),
  }))
}
