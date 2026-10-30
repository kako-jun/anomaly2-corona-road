import { Camera } from '../types/game'
import { cx } from '../utils/cx'

interface CameraStripProps {
  cameras: Camera[]
  currentIndex: number
  onSelect: (index: number) => void
}

/** Numbered push buttons. Green lamp = selected; small amber lamp = anomaly active on that camera. */
export const CameraStrip = ({
  cameras,
  currentIndex,
  onSelect,
}: CameraStripProps) => (
  <div className="row cams">
    <div className="label">CAMERA SELECT</div>
    <div className="cam-grid" role="group" aria-label="Camera selector">
      {cameras.map((cam, i) => {
        const selected = i === currentIndex
        return (
          <div className="cam-cell" key={cam.id}>
            <div className="cam-lamps">
              <i className={cx('lamp green', selected && 'on')} />
              <i className={cx('lamp alert', cam.hasAnomaly && 'on')} />
            </div>
            <button
              type="button"
              aria-pressed={selected}
              aria-label={`Camera ${cam.id}${cam.hasAnomaly ? ', anomaly active' : ''}`}
              className={cx('key', selected && 'pressed')}
              onClick={() => onSelect(i)}
              title={`${cam.name} — ${cam.location}`}
            >
              {cam.id}
            </button>
          </div>
        )
      })}
    </div>
  </div>
)
