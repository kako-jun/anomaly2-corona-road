import { useRef } from 'react'
import { Anomaly, Camera } from '../types/game'

interface CameraViewProps {
  camera: Camera
  gameTime: string
  anomalyHere?: Anomaly
  onSwipe: (direction: 'next' | 'prev') => void
}

const SWIPE_THRESHOLD = 50

export const CameraView = ({
  camera,
  gameTime,
  anomalyHere,
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

  const handleTouchStart = (e: React.TouchEvent) =>
    startDrag(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) =>
    endDrag(e.changedTouches[0].clientX)
  const handleMouseDown = (e: React.MouseEvent) => startDrag(e.clientX)
  const handleMouseUp = (e: React.MouseEvent) => endDrag(e.clientX)
  const handleMouseLeave = () => {
    dragStartXRef.current = null
  }

  // Nav buttons must not feed the parent's drag detection: a press on `‹` followed
  // by mouseup outside the button would otherwise register as both a click and a swipe.
  const navClick = (dir: 'prev' | 'next') => (e: React.MouseEvent) => {
    e.stopPropagation()
    onSwipe(dir)
  }
  const stopMouseDown = (e: React.MouseEvent) => e.stopPropagation()

  const imageClass = anomalyHere
    ? 'camera__image camera__image--anomaly'
    : 'camera__image'

  return (
    <div
      className="camera"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className={imageClass}
        src={camera.image}
        alt={`${camera.name} — ${camera.location}`}
        draggable={false}
      />

      <div className="camera__scanlines" />
      <div className="camera__vignette" />

      <div className="camera__rec">
        <span className="camera__rec-dot" />
        REC
      </div>
      <div className="camera__timestamp">{gameTime}</div>

      <button
        type="button"
        className="camera__nav camera__nav--prev"
        aria-label="Previous camera"
        onMouseDown={stopMouseDown}
        onClick={navClick('prev')}
      >
        ‹
      </button>
      <button
        type="button"
        className="camera__nav camera__nav--next"
        aria-label="Next camera"
        onMouseDown={stopMouseDown}
        onClick={navClick('next')}
      >
        ›
      </button>

      {anomalyHere && (
        <>
          <div className="camera__alert">⚠ ANOMALY DETECTED</div>
          <div className="camera__alert-text">{anomalyHere.description}</div>
        </>
      )}

      <div className="camera__info">
        <div className="camera__info-name">{camera.name}</div>
        <div className="camera__info-location">{camera.location}</div>
      </div>
    </div>
  )
}
