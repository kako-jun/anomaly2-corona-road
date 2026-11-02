/** Delay between the previous line fading out and the next one fading in. */
export const SUBTITLE_GAP_MS = 600
const MIN_HOLD_MS = 2200
const BASE_HOLD_MS = 1600
const PER_CHAR_MS = 120

/** How long a subtitle stays on screen, by its length. */
export const subtitleHoldMs = (text: string): number =>
  Math.max(MIN_HOLD_MS, BASE_HOLD_MS + text.length * PER_CHAR_MS)
