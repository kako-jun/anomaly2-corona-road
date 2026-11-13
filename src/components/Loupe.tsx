import { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { LoupeView } from '../hooks/useLoupeGesture'
import { LOUPE } from '../utils/loupe'
import { FeedGlitchKind } from '../utils/feedGlitch'
import { GlitchCanvas } from './GlitchCanvas'
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
  /** The watched camera's feed glitch (#78): the magnified picture shows it too. */
  feedGlitch?: FeedGlitchKind
  /** Seeds the camera's fixed dead pixels (same as on the monitor). */
  glitchSeed?: number
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
  feedGlitch,
  glitchSeed = 0,
}: LoupeProps) => {
  const d = LOUPE.DIAMETER_PX
  // Upside down (RT-FEED-17): the monitor shows the photo's row 1 - v under the finger at v, so the held row is 1 - v.
  const v = feedGlitch === 'flip' ? 1 - view.v : view.v
  const frameStyle: CSSProperties = {
    width: view.frameW * LOUPE.ZOOM,
    height: view.frameH * LOUPE.ZOOM,
    left: d / 2 - view.u * view.frameW * LOUPE.ZOOM,
    top: d / 2 - v * view.frameH * LOUPE.ZOOM,
    // zoom / tilt / shake scale about the held spot, so it stays under the circle's centre
    transformOrigin: `${view.u * 100}% ${v * 100}%`,
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
      data-glitch={feedGlitch}
      data-testid="loupe"
      aria-hidden="true"
    >
      <div className="loupe__frame" style={frameStyle}>
        <img src={image} alt="" draggable={false} />
        <img className="glow" src={image} alt="" draggable={false} />
        {feedGlitch === 'ghost' && (
          <img className="ghost" src={image} alt="" draggable={false} />
        )}
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
      {(feedGlitch === 'letterbox' || feedGlitch === 'heavyvignette') && (
        // monitor-sized like the noise, but placed so the held spot of the glass is at the circle's centre
        // (the bars / the dark corners belong to the picture's position, not to the circle)
        <div
          className="loupe__held"
          style={{
            width: view.glassW,
            height: view.glassH,
            left: d / 2 - view.x,
            top: d / 2 - view.y,
          }}
        >
          <div
            className={`fx ${feedGlitch === 'letterbox' ? 'letterbox' : 'heavyvignette'}`}
            aria-hidden="true"
          />
        </div>
      )}
      <div
        className="loupe__fx"
        style={{ width: view.glassW, height: view.glassH }}
      >
        {feedGlitch === 'blocks' && <GlitchCanvas kind="blocks" />}
        {feedGlitch === 'deadpixels' && (
          <GlitchCanvas kind="deadpixels" seed={glitchSeed} />
        )}
        {feedGlitch === 'scanburn' && (
          <div className="fx scanburn" aria-hidden="true" />
        )}
        {feedGlitch === 'blink' && (
          <div className="fx blackframe" aria-hidden="true" />
        )}
        {feedGlitch === 'lost' && (
          <div className="fx lost" aria-hidden="true" />
        )}
        <NoiseCanvas />
        <div className="fx scan" />
      </div>
    </div>,
    host
  )
}
