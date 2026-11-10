import { LABELS } from '../data/investigationNotes'
import { buildNote } from '../utils/investigationNote'
import { load } from '../utils/saveData'
import type { LastShift, Language } from '../utils/saveData'
import type { GameStats } from '../types/game'
import { InvestigationNote } from './InvestigationNote'

interface GameOverScreenProps {
  closing: 'dawn' | 'withdraw' | 'ending'
  /** win/lose of the shift; a dawn that ends in a loss is a time-up, not a survival. */
  outcome: 'win' | 'lose'
  stats: GameStats
  /** The note's language (#292). */
  language?: Language
  onRestart: () => void
  /** The true ending has been reached: no more shifts on this save, the key goes back to the title (#294). */
  endingReached?: boolean
  onTitle?: () => void
}

/**
 * The result of a shift: the investigation note (#297), the same paper as the one before a shift. What it shows
 * comes from the save (`lastShift`, written when the shift ended); `stats` only stands in when it is missing.
 */
export const GameOverScreen = ({
  closing,
  stats,
  language = 'ja',
  onRestart,
  endingReached = false,
  onTitle,
}: GameOverScreenProps) => {
  const save = load()
  const shift: LastShift = save.lastShift ?? {
    found: stats.correctReports,
    fresh: 0,
    misreports: stats.misreports,
    durationMs: stats.currentTime,
    closing,
    raised: [],
  }
  const lang = language
  return (
    <InvestigationNote
      view={buildNote({ mode: 'after', save, shift }, lang)}
      actionLabel={endingReached ? LABELS.btnTitle[lang] : undefined}
      onAction={endingReached ? (onTitle ?? onRestart) : onRestart}
    />
  )
}
