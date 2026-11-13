import { ReactNode } from 'react'
import { GameStats } from '../types/game'
import { cx } from '../utils/cx'
import { DEFAULT_CONFIG } from '../utils/gameConfig'
import { ghostDigit, hudLabel } from '../utils/hudText'

interface GameHUDProps {
  gameTime: string
  stats: GameStats
  /** The monitor effects running now (RT-UI-02/06/07 headings, RT-UI-17/18 digits; src/utils/monitorEffects.ts). */
  fx?: ReadonlySet<string>
}

const NO_FX: ReadonlySet<string> = new Set()

/**
 * The digits of a window. Normally plain text; while RT-UI-17 (drop-out) or RT-UI-18 (ghost) runs, each digit is its
 * own span so the CSS can cut away / smear some of them. The value shown is never changed. `offset` is the index of
 * the first digit of `text` within the whole window, so every window has a cut digit (every second one).
 */
const digits = (
  text: string,
  offset: number,
  fx: ReadonlySet<string>
): ReactNode => {
  const drop = fx.has('RT-UI-17')
  const ghost = fx.has('RT-UI-18')
  if (!drop && !ghost) return text
  return [...text].map((ch, i) => (
    <span
      key={i}
      className={cx(
        'dg',
        drop && (offset + i) % 2 === 1 && 'dg--cut',
        ghost && 'dg--ghost'
      )}
      data-ghost={ghost ? ghostDigit(ch) : undefined}
    >
      {ch}
    </span>
  ))
}

/** Display windows: TIME / REPORTS (VFD) and STRIKES (lamps). */
export const GameHUD = ({ gameTime, stats, fx = NO_FX }: GameHUDProps) => {
  const max = DEFAULT_CONFIG.maxMisreports
  const [hh, mm] = gameTime.split(':')
  const correct = String(stats.correctReports)
  const min = String(DEFAULT_CONFIG.minCorrectReports)
  return (
    <div className="row status">
      <div className="cell">
        <div className="label">{hudLabel('TIME', fx)}</div>
        <div className="vfd vfd--center" role="timer" aria-label={gameTime}>
          <span aria-hidden="true">
            {digits(hh, 0, fx)}
            <span className="clock-colon">:</span>
            {digits(mm, hh.length, fx)}
          </span>
        </div>
      </div>
      <div className="cell">
        <div className="label">{hudLabel('REPORTS', fx)}</div>
        <div className="vfd vfd--center vfd--reports">
          <span>{digits(correct, 0, fx)}</span>
          <span className="dim">/</span>
          <span className="dim">{digits(min, correct.length, fx)}</span>
        </div>
      </div>
      <div className="cell">
        <div className="label">{hudLabel('STRIKES', fx)}</div>
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
