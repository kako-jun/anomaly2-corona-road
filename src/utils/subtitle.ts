/** Delay between the previous line fading out and the next one fading in. */
export const SUBTITLE_GAP_MS = 600
const MIN_HOLD_MS = 2200
const BASE_HOLD_MS = 1600
const PER_CHAR_MS = 120

/** How long a subtitle stays on screen, by its length. */
export const subtitleHoldMs = (text: string): number =>
  Math.max(MIN_HOLD_MS, BASE_HOLD_MS + text.length * PER_CHAR_MS)

/**
 * The longest phrase (the text between two full-width spaces, dialogue/README.md) a line of the script may have. A
 * subtitle breaks only between phrases (#323), and a line holds about 16-18 characters, so this leaves a margin
 * for the picture sizes and fonts that fit a little less. The single source of this number: the vitest
 * `dialoguePhrases.test.ts` and `npm run check:subtitle` (it reads this line) both use it.
 */
export const MAX_PHRASE_CHARS = 15

/** What one subtitle shows: the text and whether it is the English (no phrase spans, plain word wrapping). */
export interface SubtitleShown {
  text: string
  english: boolean
}

/**
 * Chooses the text of a line (#326): the English `en` when the language is English, the switch is on and the line has
 * one; else the Japanese `text`. Pure; the caller passes the language (`currentLanguage()`) and the switch
 * (`SUBTITLE_EN_ENABLED`, `gameConfig.ts`).
 */
export const pickSubtitle = (
  line: { text: string; en?: string },
  language: 'ja' | 'en',
  enabled: boolean
): SubtitleShown =>
  enabled && language === 'en' && line.en !== undefined
    ? { text: line.en, english: true }
    : { text: line.text, english: false }
