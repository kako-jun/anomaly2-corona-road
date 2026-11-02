import ledger from 'virtual:dialogue'
import { newlyRaisedFlags } from './dialogueEngine'
import { update } from './saveData'
import type { SaveData } from './saveData'

/**
 * Ids of Reiwa-themed anomalies. The anomaly ledger has no such marking yet (docs/story.md), so this
 * is empty; replace it with the marked ids once the ledger carries the marking.
 */
const REIWA_IDS: ReadonlySet<string> = new Set()

/** Raise every flag whose condition now holds; the new names go to `out` (definition order). */
const withRaisedFlags = (cur: SaveData, out: string[]): SaveData => {
  const raised = newlyRaisedFlags(ledger.flags, {
    foundIds: cur.foundIds,
    loops: cur.loops,
    flags: cur.flags,
    reiwaIds: REIWA_IDS,
  })
  if (raised.length === 0) return cur
  out.push(...raised)
  const flags = { ...cur.flags }
  for (const name of raised) flags[name] = true
  return { ...cur, flags }
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
