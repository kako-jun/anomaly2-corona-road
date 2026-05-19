import { GameStats } from '../types/game'

interface GameOverScreenProps {
  victory: boolean
  stats: GameStats
  onRestart: () => void
}

const fmtTime = (ms: number) => {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

export const GameOverScreen = ({
  victory,
  stats,
  onRestart,
}: GameOverScreenProps) => {
  return (
    <div className="screen">
      <div>
        <h1
          className={`end__title ${victory ? 'end__title--win' : 'end__title--lose'}`}
        >
          {victory ? 'SHIFT COMPLETE' : 'SHIFT TERMINATED'}
        </h1>
        <div className="end__subtitle">
          {victory
            ? 'You survived until dawn.'
            : stats.misreports >= 3
              ? 'Too many false reports.'
              : 'Insufficient anomaly detection.'}
        </div>
      </div>

      <div className="card">
        <div className="card__label">PERFORMANCE REPORT</div>
        <div className="card__row">
          <span className="card__row-label">Anomalies detected</span>
          <span className="card__row-value">
            {stats.detectedAnomalies} / {stats.totalAnomalies}
          </span>
        </div>
        <div className="card__row">
          <span className="card__row-label">Correct reports</span>
          <span className="card__row-value card__row-value--primary">
            {stats.correctReports}
          </span>
        </div>
        <div className="card__row">
          <span className="card__row-label">False reports</span>
          <span
            className={`card__row-value ${
              stats.misreports > 0
                ? 'card__row-value--danger'
                : 'card__row-value--muted'
            }`}
          >
            {stats.misreports}
          </span>
        </div>
        <div className="card__row">
          <span className="card__row-label">Shift duration</span>
          <span className="card__row-value">{fmtTime(stats.currentTime)}</span>
        </div>
      </div>

      <div className="end__message">
        {victory ? (
          <>
            Your vigilance has been noted. Corona Road remains restless.
            <br />
            <br />
            <span className="end__hint--warning">
              Or have you truly seen everything…?
            </span>
          </>
        ) : (
          <>
            The anomalies of Corona Road have overwhelmed your perception.
            <br />
            <br />
            <span className="end__hint--danger">Trust your eyes.</span>
          </>
        )}
      </div>

      <button
        type="button"
        className="btn btn--filled-secondary btn--block"
        onClick={onRestart}
      >
        RESTART SHIFT
      </button>
    </div>
  )
}
