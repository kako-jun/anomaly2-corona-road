import { CSSProperties, useCallback, useRef, useState } from 'react'
import '../styles/loupe.css'
import { useLoupeGesture } from '../hooks/useLoupeGesture'
import { useNoiseOff } from '../hooks/useNoiseOff'
import { Loupe } from './Loupe'
import { Anomaly, Camera } from '../types/game'
import { Feedback } from '../hooks/useGameState'
import { overlayPlacement } from '../utils/anomalyOverlay'
import { cx } from '../utils/cx'
import { FeedGlitchKind } from '../utils/feedGlitch'
import { FeedGlitchFilters } from './FeedGlitchFilters'
import { GlitchCanvas } from './GlitchCanvas'
import { NoiseCanvas } from './NoiseCanvas'
import '../styles/feedGlitch.css'

/**
 * Puts each part of a text in its own span (class `cls`) and keeps the separator as a text node before every part
 * but the first, so the parts are the only places a line may break and the text content (and what a screen reader
 * says) is exactly the original string. Shared by the result text (words) and the subtitles (phrases).
 */
function partSpans(parts: string[], separator: string, cls: string) {
  return parts.map((g, i) => (
    <span key={i}>
      {i > 0 && separator}
      {g && <span className={cls}>{g}</span>}
    </span>
  ))
}

/**
 * Splits a result message into per-word nowrap spans so a long message wraps only between words, never inside one (#316).
 * A dash stays with the word before it, so a line never starts with a lone dash.
 */
function wordSpans(message: string) {
  const groups: string[] = []
  for (const word of message.split(' ')) {
    if (word === '—' && groups.length > 0) groups[groups.length - 1] += ' —'
    else groups.push(word)
  }
  return partSpans(groups, ' ', 'w')
}

/** The phrase separator of the dialogue ledger (a full-width space, dialogue/README.md). */
const PHRASE_SEPARATOR = '\u3000'

/**
 * Splits a subtitle at the full-width spaces the script puts between phrases, so a line breaks only between phrases,
 * never inside one (#323). The separators stay as text, so the text content is the original string. A full-width space at
 * the end of a line is hung (not counted for centring) by Chromium; other browsers are not verified.
 */
function phraseSpans(text: string) {
  return partSpans(text.split(PHRASE_SEPARATOR), PHRASE_SEPARATOR, 'seg')
}

interface CameraViewProps {
  camera: Camera
  anomalyHere?: Anomaly
  /** Last report result, kept after it is cleared so it can fade out. */
  result: Feedback | null
  resultVisible: boolean
  /** `english`: the text is an English `en` line (#326): shown as plain text, wrapped by words (no phrase spans). */
  subtitle: { text: string; visible: boolean; english?: boolean }
  /** CSS filter multipliers from the knobs. */
  brightness: number
  contrast: number
  /** The feed glitch of this camera, if any (#78): the picture goes wrong while this camera is watched. */
  feedGlitch?: FeedGlitchKind
  /** Dev only: the glitch was forced from the URL, so the screen names it (never set in production). */
  feedGlitchForced?: boolean
  onSwipe: (direction: 'next' | 'prev') => void
  /** Where the magnifier loupe is drawn (the control panel, #341). Without it the loupe is off: only the swipe works. */
  loupeHost?: HTMLElement | null
}

export const CameraView = ({
  camera,
  anomalyHere,
  result,
  resultVisible,
  subtitle,
  brightness,
  contrast,
  feedGlitch,
  feedGlitchForced,
  onSwipe,
  loupeHost,
}: CameraViewProps) => {
  const glassRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const noise = useNoiseOff()
  const { view: loupeView, handlers } = useLoupeGesture({
    enabled: !!loupeHost,
    glassRef,
    frameRef,
    onSwipe,
    onKnock: noise.trigger,
    resetKey: camera.image,
  })

  // The overlay is placed in base-photo pixels, so it waits for the base photo's natural size.
  const [natural, setNatural] = useState<{
    src: string
    w: number
    h: number
  } | null>(null)
  const baseSize = natural?.src === camera.image ? natural : null
  // A non-image anomaly has no overlay (its effect is the feed glitch), so there is nothing to place.
  const overlay = anomalyHere?.overlay
  const placement =
    overlay && baseSize
      ? overlayPlacement(overlay, baseSize.w, baseSize.h)
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
      <div className="bezel" {...handlers} onClick={noise.askMotion}>
        <div
          className={cx('glass', noise.off && 'noise-off')}
          style={style}
          ref={glassRef}
          data-glitch={feedGlitch}
        >
          <div className="pic">
            <div
              className="pic__frame"
              ref={frameRef}
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
              {anomalyHere && overlay && placement && (
                <img
                  key={anomalyHere.id}
                  className="overlay"
                  src={overlay.url}
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
              {feedGlitch === 'ghost' && (
                <img
                  className="ghost"
                  src={camera.image}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                />
              )}
            </div>
          </div>
          {(feedGlitch === 'wave' || feedGlitch === 'chroma') && (
            <FeedGlitchFilters />
          )}
          {feedGlitch === 'blocks' && <GlitchCanvas kind="blocks" />}
          {feedGlitch === 'deadpixels' && (
            <GlitchCanvas kind="deadpixels" seed={camera.id * 7919} />
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
          {feedGlitch === 'letterbox' && (
            <div className="fx letterbox" aria-hidden="true" />
          )}
          {feedGlitch === 'heavyvignette' && (
            <div className="fx heavyvignette" aria-hidden="true" />
          )}
          <NoiseCanvas />
          <div className="fx scan" aria-hidden="true" />
          <div className="fx vignette" aria-hidden="true" />
          {feedGlitch === 'lost' && (
            <div className="osd osd-nosignal" role="status">
              NO SIGNAL
            </div>
          )}
          {feedGlitchForced && feedGlitch && (
            <div className="osd osd-dev">DEV GLITCH: {feedGlitch}</div>
          )}
          <div className="osd osd-cam">CAM {camera.osdNumber ?? camera.id}</div>
          <div className="osd osd-rec">
            <i className="rec-dot" />
            REC
          </div>

          <div className={cx('movie-sub', subtitle.visible && 'show')}>
            {subtitle.text &&
              (subtitle.english ? (
                <div className="en" lang="en">
                  {subtitle.text}
                </div>
              ) : (
                <div lang="ja">{phraseSpans(subtitle.text)}</div>
              ))}
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
            {result && wordSpans(result.message)}
          </div>
        </div>
      </div>
      {loupeHost && loupeView && (
        <Loupe
          host={loupeHost}
          view={loupeView}
          image={camera.image}
          overlay={
            overlay && placement
              ? { url: overlay.url, ...placement }
              : undefined
          }
          brightness={brightness}
          contrast={contrast}
          noiseOff={noise.off}
          feedGlitch={feedGlitch}
          glitchSeed={camera.id * 7919}
        />
      )}
    </section>
  )
}
