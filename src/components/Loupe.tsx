import { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { LoupeView } from '../hooks/useLoupeGesture'
import { LOUPE } from '../utils/loupe'
import { NoiseCanvas } from './NoiseCanvas'

interface LoupeProps {
  host: HTMLElement
  view: LoupeView
  image: string
  overlay?: {
    url: string
    left: number
    top: number
    width: number
    height: number
  }
  brightness: number
  contrast: number
  /** The noise is switched off for a while (#342): the grain in the loupe goes with the monitor's. */
  noiseOff?: boolean
}

/**
 * The round loupe on the control panel (#341). Only the picture is magnified (LOUPE.ZOOM): the frame is drawn
 * ZOOM times bigger and shifted so the held spot sits at the circle's centre. The noise and scanlines are NOT inside
 * that scaled frame: they are drawn above it at the monitor's own size (the canvas is as big as the glass, so a
 * noise grain is exactly as big as on the monitor) and only cropped by the circle.
 */
export const Loupe = ({
  host,
  view,
  image,
  overlay,
  brightness,
  contrast,
  noiseOff,
}: LoupeProps) => {
  const d = LOUPE.DIAMETER_PX
  const frameStyle: CSSProperties = {
    width: view.frameW * LOUPE.ZOOM,
    height: view.frameH * LOUPE.ZOOM,
    left: d / 2 - view.u * view.frameW * LOUPE.ZOOM,
    top: d / 2 - view.v * view.frameH * LOUPE.ZOOM,
  }
  const style = {
    width: d,
    height: d,
    '--bri': brightness,
    '--con': contrast,
    '--zoom': LOUPE.ZOOM,
  } as CSSProperties
  return createPortal(
    <div
      className={noiseOff ? 'loupe noise-off' : 'loupe'}
      style={style}
      data-testid="loupe"
      aria-hidden="true"
    >
      <div className="loupe__frame" style={frameStyle}>
        <img src={image} alt="" draggable={false} />
        <img className="glow" src={image} alt="" draggable={false} />
        {overlay && (
          <img
            className="overlay"
            src={overlay.url}
            alt=""
            draggable={false}
            style={{
              left: `${overlay.left}%`,
              top: `${overlay.top}%`,
              width: `${overlay.width}%`,
              height: `${overlay.height}%`,
            }}
          />
        )}
      </div>
      <div
        className="loupe__fx"
        style={{ width: view.glassW, height: view.glassH }}
      >
        <NoiseCanvas />
        <div className="fx scan" />
      </div>
    </div>,
    host
  )
}
