import { Camera } from '../types/game'
import { cx } from '../utils/cx'

interface CameraStripProps {
  cameras: Camera[]
  currentIndex: number
  onSelect: (index: number) => void
  /** The ending's virtual camera is on screen (#273): no lamp lit, no key pressed, the keys do nothing. */
  disabled?: boolean
}

/** Numbered push buttons. Green lamp = selected. (No anomaly indicator: spotting the difference is the game.) */
export const CameraStrip = ({
  cameras,
  currentIndex,
  onSelect,
  disabled = false,
}: CameraStripProps) => (
  <div className="row cams">
    <div className="label">CAMERA SELECT</div>
    <div className="cam-grid" role="group" aria-label="Camera selector">
      {cameras.map((cam, i) => {
        const selected = !disabled && i === currentIndex
        return (
          <div className="cam-cell" key={cam.id}>
            <div className="cam-lamps">
              <i className={cx('lamp green', selected && 'on')} />
            </div>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              aria-label={`Camera ${cam.id}`}
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
