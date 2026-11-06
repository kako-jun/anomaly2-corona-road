import { GameStats } from '../types/game'
import { load } from '../utils/saveData'
import './result.css'

interface GameOverScreenProps {
  victory: boolean
  stats: GameStats
  onRestart: () => void
}

export const GameOverScreen = ({
  victory,
  stats,
  onRestart,
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
        <p className="result-status">{victory ? 'DAWN' : 'WITHDRAWN'}</p>
        <p className="result-line">Tonight’s record: {stats.correctReports}</p>
        <p className="result-total">
          Total reports: {save.foundTotal} · Distinct anomalies:{' '}
          {save.foundIds.length}
        </p>
      </section>
      <button type="button" className="result-restart" onClick={onRestart}>
        RESTART SHIFT
      </button>
    </main>
  )
}
