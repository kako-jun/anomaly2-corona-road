import { CSSProperties, useCallback, useRef, useState } from 'react'
import { Anomaly, Camera } from '../types/game'
import { Feedback } from '../hooks/useGameState'
import { overlayPlacement } from '../utils/anomalyOverlay'
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

  // The overlay is placed in base-photo pixels, so it waits for the base photo's natural size.
  const [natural, setNatural] = useState<{
    src: string
    w: number
    h: number
  } | null>(null)
  const baseSize = natural?.src === camera.image ? natural : null
  const placement =
    anomalyHere && baseSize
      ? overlayPlacement(anomalyHere.overlay, baseSize.w, baseSize.h)
      : null
  const readSize = useCallback(
    (img: HTMLImageElement) => {
      // Ignore a stale element: only the image that is currently the camera's base photo counts.
      if (img.getAttribute('src') !== camera.image) return
      if (img.complete && img.naturalWidth > 0) {
        const next = {
          src: camera.image,
          w: img.naturalWidth,
          h: img.naturalHeight,
        }
        setNatural(prev =>
          prev &&
          prev.src === next.src &&
          prev.w === next.w &&
          prev.h === next.h
            ? prev
            : next
        )
      }
    },
    [camera.image]
  )
  // Stable, so React does not detach / re-attach the ref on every render.
  const baseRef = useCallback(
    (img: HTMLImageElement | null) => {
      if (img) readSize(img)
    },
    [readSize]
  )

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
          <div className="pic">
            <div
              className="pic__frame"
              style={
                baseSize
                  ? ({
                      '--ratio': `${baseSize.w} / ${baseSize.h}`,
                    } as CSSProperties)
                  : undefined
              }
            >
              <img
                key={camera.image}
                src={camera.image}
                alt={`${camera.name} — ${camera.location}`}
                draggable={false}
                // A cached / already-decoded image can finish before onLoad is attached, so also
                // read the size when the element mounts (the key remounts it per camera).
                ref={baseRef}
                onLoad={e => readSize(e.currentTarget)}
              />
              {/* glow sits right above the base photo and BELOW the overlay: its blur would otherwise
                  ghost the original object that the overlay replaces. */}
              <img
                className="glow"
                src={camera.image}
                alt=""
                aria-hidden="true"
                draggable={false}
              />
              {anomalyHere && placement && (
                <img
                  key={anomalyHere.id}
                  className="overlay"
                  src={anomalyHere.overlay.url}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  style={{
                    left: `${placement.left}%`,
                    top: `${placement.top}%`,
                    width: `${placement.width}%`,
                    height: `${placement.height}%`,
                  }}
                />
              )}
            </div>
          </div>
          <NoiseCanvas />
          <div className="fx scan" aria-hidden="true" />
          <div className="fx vignette" aria-hidden="true" />
          <div className="osd osd-cam">CAM {camera.id}</div>
          <div className="osd osd-rec">
            <i className="rec-dot" />
            REC
          </div>

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
