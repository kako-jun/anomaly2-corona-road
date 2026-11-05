import { CHILD_FOUND_PACING, DEFAULT_CONFIG } from './gameConfig'

/** The progress flag (dialogue/flags.yaml) that means the child has been found. */
export const CHILD_FLAG = 'child'

export const isChildFound = (flags: Readonly<Record<string, boolean>>) =>
  flags[CHILD_FLAG] === true

/** Spawn cadence and concurrent cap: faster and higher once the child is found. */
export const pacingFor = (childFound: boolean) =>
  childFound
    ? CHILD_FOUND_PACING
    : {
        anomalyIntervalMs: DEFAULT_CONFIG.anomalyIntervalMs,
        maxConcurrentAnomalies: DEFAULT_CONFIG.maxConcurrentAnomalies,
      }

export interface TimeUpFacts {
  /** Anomalies that appeared in this shift after the child was found. */
  spawnedAfterChild: number
  /** Correct reports of those anomalies (older ones and false reports do not count). */
  reportedAfterChild: number
}

/**
 * Time ran out: the true ending when anomalies appeared after the child was found and not one of
 * them was reported. Otherwise the ordinary dawn. Withdraw (too many false reports) never reaches
 * here as an ending; the caller decides that first.
 */
export const judgeTimeUp = (f: TimeUpFacts): 'ending' | 'dawn' =>
  f.spawnedAfterChild >= 1 && f.reportedAfterChild === 0 ? 'ending' : 'dawn'
