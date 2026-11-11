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

/**
 * The guide length of an English subtitle in characters (#326). A longer `en` can need 3 lines or more on a small
 * screen and reach the camera label (150 characters make 6 lines at 360x640), so `npm run check:subtitle-en` warns about
 * lines over it; it is a guide, not a build error (check a long one by eye, or shorten it). The single source of the number:
 * `dialogue/README.md` refers to it by name and `scripts/check-subtitle-en.mjs` reads this line.
 */
export const EN_GUIDE_CHARS = 80

/** The English lines over `EN_GUIDE_CHARS` (entry id, 1-based line number, length), for the warning of `check:subtitle-en`. */
export const longEnglishLines = (
  entries: readonly { id: string; lines: readonly { en?: string }[] }[]
): { id: string; line: number; chars: number }[] =>
  entries.flatMap(e =>
    e.lines.flatMap((l, i) =>
      l.en !== undefined && l.en.length > EN_GUIDE_CHARS
        ? [{ id: e.id, line: i + 1, chars: l.en.length }]
        : []
    )
  )
