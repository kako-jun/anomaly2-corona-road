import { Camera } from '../types/game'
import { cx } from '../utils/cx'

interface CameraStripProps {
  cameras: Camera[]
  currentIndex: number
  onSelect: (index: number) => void
  /** The ending's virtual camera is on screen (#273): no lamp lit, no key pressed, the keys do nothing. */
  disabled?: boolean
  /** RT-UI-20: the index of the key whose face has vanished (the empty frame stays; the other ways to that camera work). */
  goneIndex?: number
}

/** Numbered push buttons. Green lamp = selected. (No anomaly indicator: spotting the difference is the game.) */
export const CameraStrip = ({
  cameras,
  currentIndex,
  onSelect,
  disabled = false,
  goneIndex,
}: CameraStripProps) => (
  <div className="row cams">
    <div className="label">CAMERA SELECT</div>
    <div className="cam-grid" role="group" aria-label="Camera selector">
      {cameras.map((cam, i) => {
        const selected = !disabled && i === currentIndex
        const gone = i === goneIndex
        return (
          <div className="cam-cell" key={cam.id}>
            <div className="cam-lamps">
              <i className={cx('lamp green', selected && 'on')} />
            </div>
            <button
              type="button"
              disabled={disabled || gone}
              aria-pressed={selected}
              aria-label={`Camera ${cam.id}`}
              aria-hidden={gone || undefined}
              tabIndex={gone ? -1 : undefined}
              className={cx('key', selected && 'pressed', gone && 'key--gone')}
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
