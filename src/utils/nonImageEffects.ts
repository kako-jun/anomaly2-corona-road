import type { NonImageAnomalyType, NonImageEntry } from './anomalyLedger'
import { feedGlitchKindsOf } from './feedGlitch'
import type { FeedGlitchKind } from './feedGlitch'
import type { ReportScope } from '../types/game'
import type { Anomaly } from '../types/game'
import type { SynthName } from './synthSounds'
import { VOICE_IDS } from './voiceSounds'

export const SOUND_EFFECTS: Record<string, SynthName> = {
  'RT-SND-03': 'buzz',
  'RT-SND-04': 'footsteps',
  'RT-SND-05': 'knock',
  'RT-SND-09': 'stinger',
  'RT-SND-10': 'wobble',
  'RT-SND-11': 'dishes',
  'CR-RZ-07': 'chime',
  'CR-RZ-08': 'beat',
  'CR-RZ-09': 'shutter',
  'CR-SH-05': 'radio',
}
export const hasSoundEffect = (id: string): boolean =>
  Object.hasOwn(SOUND_EFFECTS, id) ||
  VOICE_IDS.has(id) ||
  id === 'RT-SND-01' ||
  id === 'RT-SND-02'
export const soundOnCamera = (
  anomalies: Anomaly[],
  cameraId: number
): Anomaly | undefined =>
  anomalies.find(
    a => a.cameraId === cameraId && !a.detectedAt && hasSoundEffect(a.id)
  )

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
  feedGlitchKindsFor(entry).length > 0 ||
  // Voice materials are wired for playback but stay out of the draw until their ledger entries are promoted
  // (listening / adoption pending, #79); the ledger and the effects are promoted together.
  (entry.anomalyType === 'sound' &&
    hasSoundEffect(entry.id) &&
    !VOICE_IDS.has(entry.id))

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
