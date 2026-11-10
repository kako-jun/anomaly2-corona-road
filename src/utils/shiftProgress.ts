import ledger from 'virtual:dialogue'
import anomalies from 'virtual:anomalies'
import { reiwaIdsOf } from './anomalyLedger'
import { newlyRaisedFlags, storyFlagNames } from './dialogueEngine'
import { emptySave, update } from './saveData'
import type { SaveData } from './saveData'

/**
 * Ids of the Reiwa anomalies: ledger entries (image + produced) marked `reiwa: true`, passed in through
 * `virtual:anomalies` (#83). The anomaly ledger is the only source; nothing is listed here.
 */
const REIWA_IDS: ReadonlySet<string> = new Set(reiwaIdsOf(anomalies))

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

/** A correct report: count it, remember the id, save, and return the flags that just rose. */
export const recordFound = (anomalyId: string): string[] => {
  const out: string[] = []
  update(cur =>
    withRaisedFlags(
      {
        ...cur,
        foundTotal: cur.foundTotal + 1,
        foundIds: cur.foundIds.includes(anomalyId)
          ? cur.foundIds
          : [...cur.foundIds, anomalyId],
      },
      out
    )
  )
  return out
}

/** A shift ended (dawn or withdraw): one more loop. Flags that depend on loops rise at the next shift start. */
export const recordShiftEnd = (): void => {
  update(cur => ({ ...cur, loops: cur.loops + 1 }))
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
    epoch: cur.epoch + 1,
    ...(cur.settings ? { settings: cur.settings } : {}),
  }))
}
