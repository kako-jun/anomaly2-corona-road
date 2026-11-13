import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import '../styles/start.css'
import { NEXT_HINT, NOTES_LABEL, titleNotes } from '../data/titleNotes'
import type { Language } from '../utils/saveData'
import { nextPage, prevPage, swipeDirection } from '../utils/titlePager'
import { initialPerf, stepPerf } from '../utils/titlePerf'
import type { PerfLevel } from '../utils/titlePerf'
import {
  fullscreenAvailable,
  isFullscreen,
  toggleFullscreen,
} from '../utils/fullscreen'
import { TitleNoise } from './TitleNoise'
import { TransferPanel } from './TransferPanel'

// The photo's drift starts at a different point of its loops (70 s and 53 s) on each load; CSS only after that.
const panOffsets = () =>
  ({
    '--start-pan-x-delay': `${-Math.floor(Math.random() * 70)}s`,
    '--start-pan-y-delay': `${-Math.floor(Math.random() * 53)}s`,
    // the blur patch (#331): loops of 61 s, 47 s and 37 s
    '--start-blur-x-delay': `${-Math.floor(Math.random() * 61)}s`,
    '--start-blur-y-delay': `${-Math.floor(Math.random() * 47)}s`,
    '--start-blur-power-delay': `${-Math.floor(Math.random() * 37)}s`,
  }) as CSSProperties

interface StartScreenProps {
  onStart: () => void
  loading?: boolean
  /** The true ending was reached: the only choice is to start over from scratch (#294). */
  endingReached?: boolean
  /** Wipe the progress (called after the confirmation). */
  onStartOver?: () => void
  /** The language of the notes' pictures (#292), decided from the browser by the app. */
  language?: Language
  /** Enables the save transfer key (#84); called after an imported code replaced the save. */
  onTransferred?: () => void
  /** An import could not be stored: the save state changed (the notice may need to appear or clear). */
  onTransferFailed?: () => void
}

const startKeyClass = 'key start-key'

/** The lamp beside the key: green when the key can be pressed, amber while the shift is loading. */
const KeyLamp = ({ amber = false }: { amber?: boolean }) => (
  <i
    className={`lamp on ${amber ? 'amber' : 'green'} start-lamp`}
    aria-hidden="true"
  />
)

export const StartScreen = ({
  onStart,
  loading = false,
  endingReached = false,
  onStartOver,
  language = 'ja',
  onTransferred,
  onTransferFailed,
}: StartScreenProps) => {
  const [transferring, setTransferring] = useState(false)
  // Fullscreen key (#426): only where the browser can (not iPhone Safari, not an installed PWA); the state follows the
  // browser (ESC leaves fullscreen too).
  const [canFull] = useState(fullscreenAvailable)
  const [full, setFull] = useState(isFullscreen)
  useEffect(() => {
    if (!canFull) return
    const sync = () => setFull(isFullscreen())
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [canFull])
  const [confirming, setConfirming] = useState(false)
  // Keyboard focus follows the confirmation: CANCEL (the safe side) when it opens, START OVER when
  // it is cancelled, and START SHIFT once the erase has taken effect.
  const transferKeyRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const startOverRef = useRef<HTMLButtonElement>(null)
  const goRef = useRef<HTMLButtonElement>(null)
  const focusAfter = useRef<'cancel' | 'erase' | null>(null)
  useEffect(() => {
    if (confirming) cancelRef.current?.focus()
    else if (focusAfter.current === 'cancel') {
      focusAfter.current = null
      startOverRef.current?.focus()
    }
  }, [confirming])
  // Escape cancels the confirmation wherever the focus is (a click on the margin moves it to body).
  useEffect(() => {
    if (!confirming) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      // The transfer panel is on top: its Escape closes only itself.
      if (transferring) return
      focusAfter.current = 'cancel'
      setConfirming(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [confirming, transferring])
  useEffect(() => {
    if (!endingReached && focusAfter.current === 'erase') {
      focusAfter.current = null
      goRef.current?.focus()
    }
  }, [endingReached])
  // Lock body scrolling only while this screen is mounted (no :has() dependency).
  useEffect(() => {
    document.body.classList.add('start-open')
    return () => document.body.classList.remove('start-open')
  }, [])

  // A slow device: the blur patch and the noise step down, once and for good (utils/titlePerf.ts, #331).
  const [perf, setPerf] = useState<PerfLevel>('full')
  useEffect(() => {
    if (typeof requestAnimationFrame !== 'function') return
    let state = initialPerf
    let id = 0
    const tick = (now: number) => {
      state = stepPerf(state, now)
      setPerf(state.level)
      if (state.level !== 'off') id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  const notes = useMemo(() => titleNotes(language), [language])
  const [page, setPage] = useState(0)
  const swipeStart = useRef<number | null>(null)
  const swiped = useRef(false)
  const [pan] = useState(panOffsets)
  const go = (dir: 'next' | 'prev') =>
    setPage(p =>
      dir === 'next' ? nextPage(p, notes.length) : prevPage(p, notes.length)
    )
  const current = Math.min(page, notes.length - 1)

  return (
    <main
      className={
        perf === 'full' ? 'start-screen' : `start-screen start-perf-${perf}`
      }
      style={pan}
    >
      <div className="start-photo" aria-hidden="true">
        {/* two nested slow drifts (x outside, y inside) with different periods: no corner where the speed jumps */}
        <div className="start-pan-x">
          <img src="/images/logo.webp" alt="" draggable={false} />
        </div>
        <div className="start-blur-x">
          <div className="start-blur-y">
            <div className="start-blur" />
          </div>
        </div>
        {perf !== 'off' && <TitleNoise />}
      </div>
      <h1 className="start-sr-only">ANOMALY² Corona Road</h1>
      {(canFull || onTransferred) && (
        <div className="start-topright">
          {canFull && (
            <button
              type="button"
              className="start-top-key start-fullscreen-key"
              aria-pressed={full}
              onClick={() => void toggleFullscreen()}
            >
              {full ? 'EXIT' : 'FULL'}
            </button>
          )}
          {onTransferred && (
            <button
              type="button"
              ref={transferKeyRef}
              className="start-top-key"
              onClick={() => setTransferring(true)}
            >
              TRANSFER SAVE
            </button>
          )}
        </div>
      )}
      {onTransferred && transferring && (
        <TransferPanel
          onClose={() => {
            setTransferring(false)
            // Back to the key that opened the panel.
            setTimeout(() => transferKeyRef.current?.focus(), 0)
          }}
          onImportFailed={onTransferFailed}
          onImported={() => {
            // A START OVER confirmation left open would offer to erase the progress just imported.
            setConfirming(false)
            onTransferred()
          }}
        />
      )}

      <div
        className={confirming ? 'start-foot start-foot--confirm' : 'start-foot'}
      >
        <section
          className="start-notes"
          aria-label={NOTES_LABEL[language]}
          lang={language}
        >
          <button
            type="button"
            className="start-page"
            onPointerDown={e => {
              swipeStart.current = e.clientX
              swiped.current = false
            }}
            onPointerUp={e => {
              if (swipeStart.current == null) return
              const dir = swipeDirection(e.clientX - swipeStart.current)
              swipeStart.current = null
              if (dir) {
                swiped.current = true
                go(dir)
              }
            }}
            onPointerCancel={() => {
              swipeStart.current = null
            }}
            onClick={() => {
              if (swiped.current) swiped.current = false
              else go('next')
            }}
            onKeyDown={e => {
              if (e.key === 'ArrowRight') go('next')
              else if (e.key === 'ArrowLeft') go('prev')
              else return
              e.preventDefault()
            }}
          >
            {/* every page sits in the same cell, so the block keeps the height of the tallest one and the photo above never jumps */}
            <span className="start-stack">
              {notes.map((n, i) => (
                <img
                  key={n.src}
                  className={i === current ? undefined : 'start-off'}
                  src={n.src}
                  width={n.width}
                  height={n.height}
                  style={{ '--ar': n.width / n.height } as CSSProperties}
                  alt={i === current ? n.alt : ''}
                  aria-hidden={i === current ? undefined : true}
                  draggable={false}
                />
              ))}
            </span>
            <span className="start-sr-only">{NEXT_HINT[language]}</span>
          </button>
        </section>
        <p className="start-pager" role="status">
          <span className="start-pager-num">
            {current + 1}/{notes.length}
          </span>
          {/* the new note's words are read out when the page turns */}
          <span className="start-sr-only">{notes[current].alt}</span>
          <span className="start-pager-dots" aria-hidden="true">
            {notes.map((n, i) => (
              <i key={n.id} className={i === current ? 'on' : undefined} />
            ))}
          </span>
        </p>

        <div className="start-deck">
          {endingReached ? (
            <div className="start-over">
              <p className="start-over-note">The investigation is closed.</p>
              {confirming ? (
                <div className="start-over-confirm">
                  <p className="start-over-warn" role="alert">
                    All progress will be erased. This cannot be undone.
                  </p>
                  {/* like the report dialog: the choice on top, CANCEL below it; the same part, same width and height, only colour and word differ */}
                  <div className="start-confirm-keys">
                    <button
                      type="button"
                      className="key key-report start-key"
                      onClick={() => {
                        focusAfter.current = 'erase'
                        setConfirming(false)
                        onStartOver?.()
                      }}
                    >
                      ERASE ALL
                    </button>
                    <button
                      ref={cancelRef}
                      type="button"
                      className="key start-key"
                      onClick={() => {
                        focusAfter.current = 'cancel'
                        setConfirming(false)
                      }}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="start-keyrow">
                  <KeyLamp />
                  <button
                    ref={startOverRef}
                    type="button"
                    className={startKeyClass}
                    onClick={() => setConfirming(true)}
                  >
                    START OVER
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="start-keyrow">
              <KeyLamp amber={loading} />
              <button
                ref={goRef}
                type="button"
                className={startKeyClass}
                onClick={onStart}
                disabled={loading}
              >
                {loading ? 'LOADING…' : 'START SHIFT'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
