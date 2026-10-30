import { GameStats } from '../types/game'
import { cx } from '../utils/cx'
import { DEFAULT_CONFIG } from '../utils/gameConfig'

interface GameHUDProps {
  gameTime: string
  stats: GameStats
}

/** Display windows: SHIFT TIME / REPORTS (VFD) and STRIKES (lamps). */
export const GameHUD = ({ gameTime, stats }: GameHUDProps) => {
  const max = DEFAULT_CONFIG.maxMisreports
  return (
    <div className="row status">
      <div className="cell">
        <div className="label">SHIFT TIME</div>
        <div className="vfd vfd--center">{gameTime}</div>
      </div>
      <div className="cell">
        <div className="label">REPORTS</div>
        <div className="vfd vfd--center">
          <span>{stats.correctReports}</span>
          <span className="dim"> / {DEFAULT_CONFIG.minCorrectReports}</span>
        </div>
      </div>
      <div className="cell">
        <div className="label">STRIKES</div>
        <div
          className="lamps"
          role="img"
          aria-label={`Strikes ${stats.misreports} of ${max}`}
        >
          {Array.from({ length: max }, (_, i) => (
            <i
              key={i}
              className={cx('lamp amber', i < stats.misreports && 'on')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
