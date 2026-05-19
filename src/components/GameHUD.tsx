import { GameStats } from '../types/game'
import { DEFAULT_CONFIG } from '../utils/gameConfig'

interface GameHUDProps {
  gameTime: string
  stats: GameStats
  progress: number
}

export const GameHUD = ({ gameTime, stats, progress }: GameHUDProps) => {
  const strikeModifier =
    stats.misreports >= DEFAULT_CONFIG.maxMisreports - 1
      ? ' hud__stat-value--danger'
      : stats.misreports > 0
        ? ' hud__stat-value--warning'
        : ''

  return (
    <div className="hud">
      <div className="hud__row">
        <div>
          <div className="hud__time-label">SHIFT TIME</div>
          <div className="hud__time">{gameTime}</div>
        </div>
        <div className="hud__stats">
          <div className="hud__stat">
            <span className="hud__stat-label">REPORTS</span>
            <span className="hud__stat-value">
              {stats.correctReports}
              <span className="hud__stat-divisor">
                {' '}
                / {DEFAULT_CONFIG.minCorrectReports}
              </span>
            </span>
          </div>
          <div className="hud__stat">
            <span className="hud__stat-label">STRIKES</span>
            <span className={`hud__stat-value${strikeModifier}`}>
              {stats.misreports}
              <span className="hud__stat-divisor">
                {' '}
                / {DEFAULT_CONFIG.maxMisreports}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div
        className="hud__progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className="hud__progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}
