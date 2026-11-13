import type { NonImageAnomalyType, NonImageEntry } from './anomalyLedger'
import { feedGlitchKindsOf } from './feedGlitch'
import type { FeedGlitchKind } from './feedGlitch'
import type { ReportScope } from '../types/game'

/**
 * Which non-image ledger entries have an effect the game can show (#77), and how each is reported.
 *
 * The ledger (prompts/anomalies.yaml) says which anomalies exist; this file only says how they are drawn. Only an
 * entry with an effect here may be `status: produced` (nonImageSpawn.test.ts reads the ledger and checks it), so the
 * player is never given an anomaly nobody can see. Sound, UI and rule effects join the same way as they are built.
 * Removing an effect on report is not done here: the anomaly just becomes `detectedAt`, and whatever draws the
 * effect stops (see `useGameState`), so an effect only has to be a pure function of "is this anomaly running".
 */

/** Where an anomaly of this type is reported from (prompts/README.md "報告できる範囲", kako-jun 2026-11-12). */
export const reportScopeOf = (type: NonImageAnomalyType): ReportScope =>
  type === 'ui_corruption' || type === 'rule_break' ? 'monitor' : 'camera'

/** The feed glitch kinds that draw this entry (one is picked at random when it appears). */
export const feedGlitchKindsFor = (entry: NonImageEntry): FeedGlitchKind[] =>
  entry.anomalyType === 'feed_glitch' ? feedGlitchKindsOf(entry.id) : []

/** True when the game has an effect for this entry (so it may be drawn). */
export const hasNonImageEffect = (entry: NonImageEntry): boolean =>
  feedGlitchKindsFor(entry).length > 0

/** The kind to draw this time (random among the kinds of the entry), or undefined when it has no feed glitch. */
export const pickFeedGlitchKind = (
  entry: NonImageEntry,
  rng: () => number = Math.random
): FeedGlitchKind | undefined => {
  const kinds = feedGlitchKindsFor(entry)
  return kinds.length === 0
    ? undefined
    : kinds[Math.floor(rng() * kinds.length)]
}
