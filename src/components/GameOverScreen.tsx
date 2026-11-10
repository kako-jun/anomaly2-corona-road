import { GameStats } from '../types/game'
import { load } from '../utils/saveData'
import './result.css'

interface GameOverScreenProps {
  closing: 'dawn' | 'withdraw' | 'ending'
  /** win/lose of the shift; a dawn that ends in a loss is a time-up, not a survival. */
  outcome: 'win' | 'lose'
  stats: GameStats
  onRestart: () => void
  /** The true ending has been reached: no more shifts on this save, the key goes back to the title (#294). */
  endingReached?: boolean
  onTitle?: () => void
}

const fmtTime = (ms: number) => {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

export const statusLabel = (
  closing: 'dawn' | 'withdraw' | 'ending',
  outcome: 'win' | 'lose'
) =>
  closing === 'withdraw'
    ? 'WITHDRAWN'
    : closing === 'ending'
      ? 'THE TRUTH AT DAWN'
      : outcome === 'win'
        ? 'DAWN'
        : 'TIME UP'

export const GameOverScreen = ({
  closing,
  outcome,
  stats,
  onRestart,
  endingReached = false,
  onTitle,
}: GameOverScreenProps) => {
  const save = load()
  return (
    <main className="result-screen">
      <img className="result-image" src="/images/logo.webp" alt="" />
      <section
        className="result-report cat-note"
        aria-labelledby="result-heading"
      >
        <h1 id="result-heading">INVESTIGATION NOTES</h1>
        <p className="result-status">{statusLabel(closing, outcome)}</p>
        <p className="result-line">Tonight’s record: {stats.correctReports}</p>
        <p className="result-total">
          False reports: {stats.misreports} ·{' '}
          <span className="result-nowrap">
            Shift duration: {fmtTime(stats.currentTime)}
          </span>
        </p>
        <p className="result-total">
          Total reports: {save.foundTotal} · Distinct anomalies:{' '}
          {save.foundIds.length}
        </p>
      </section>
      <button
        type="button"
        className="result-restart"
        onClick={endingReached ? onTitle : onRestart}
      >
        {endingReached ? 'BACK TO TITLE' : 'RESTART SHIFT'}
      </button>
    </main>
  )
}
