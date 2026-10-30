import { CSSProperties, useRef } from 'react'
import { Anomaly, Camera } from '../types/game'
import { Feedback } from '../hooks/useGameState'
import { cx } from '../utils/cx'
import { NoiseCanvas } from './NoiseCanvas'

interface CameraViewProps {
  camera: Camera
  anomalyHere?: Anomaly
  /** Last report result, kept after it is cleared so it can fade out. */
  result: Feedback | null
  resultVisible: boolean
  subtitle: { text: string; visible: boolean }
  /** CSS filter multipliers from the knobs. */
  brightness: number
  contrast: number
  onSwipe: (direction: 'next' | 'prev') => void
}

const SWIPE_THRESHOLD = 50

export const CameraView = ({
  camera,
  anomalyHere,
  result,
  resultVisible,
  subtitle,
  brightness,
  contrast,
  onSwipe,
}: CameraViewProps) => {
  const dragStartXRef = useRef<number | null>(null)

  const startDrag = (x: number) => {
    dragStartXRef.current = x
  }
  const endDrag = (x: number) => {
    if (dragStartXRef.current == null) return
    const diff = dragStartXRef.current - x
    dragStartXRef.current = null
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      onSwipe(diff > 0 ? 'next' : 'prev')
    }
  }

  const style = {
    '--bri': brightness,
    '--con': contrast,
  } as CSSProperties

  return (
    <section className="tube" aria-label="Monitor">
      <div className="bezel">
        <div
          className="glass"
          style={style}
          onTouchStart={e => startDrag(e.touches[0].clientX)}
          onTouchEnd={e => endDrag(e.changedTouches[0].clientX)}
          onMouseDown={e => startDrag(e.clientX)}
          onMouseUp={e => endDrag(e.clientX)}
          onMouseLeave={() => {
            dragStartXRef.current = null
          }}
        >
          <div className={cx('pic', anomalyHere && 'pic--anomaly')}>
            <img
              src={camera.image}
              alt={`${camera.name} — ${camera.location}`}
              draggable={false}
            />
            <img
              className="glow"
              src={camera.image}
              alt=""
              aria-hidden="true"
              draggable={false}
            />
          </div>
          <NoiseCanvas />
          <div className="fx scan" aria-hidden="true" />
          <div className="fx vignette" aria-hidden="true" />
          <div className="osd osd-cam">CAM {camera.id}</div>
          <div className="osd osd-rec">
            <i className="rec-dot" />
            REC
          </div>

          {anomalyHere && (
            <div
              className="osd osd-anomaly"
              role="status"
              aria-label={`Anomaly: ${anomalyHere.category}. ${anomalyHere.description}`}
            >
              <div className="osd-anomaly-head">
                ANOMALY / {anomalyHere.category.toUpperCase()}
              </div>
              <div className="osd-anomaly-desc">{anomalyHere.description}</div>
            </div>
          )}

          <div className={cx('movie-sub', subtitle.visible && 'show')}>
            {subtitle.text && <div>{subtitle.text}</div>}
          </div>
          <div
            className={cx(
              'osd osd-result',
              result?.kind === 'wrong' && 'bad',
              resultVisible && 'show'
            )}
            role="status"
            aria-hidden={!resultVisible}
          >
            {result?.message}
          </div>
        </div>
      </div>
      <div className="maker" aria-hidden="true">
        <span className="model">VIDEO MONITOR CR-42</span>
      </div>
    </section>
  )
}
