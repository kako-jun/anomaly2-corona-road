import { useEffect, useRef, useState } from 'react'
import '../styles/start.css'
import { CARD } from '../data/titleCard'
import type { Language } from '../utils/saveData'
import { misreportLampCount, misreportLimitText } from '../utils/startScreen'

interface StartScreenProps {
  onStart: () => void
  loading?: boolean
  /** The true ending was reached: the only choice is to start over from scratch (#294). */
  endingReached?: boolean
  /** Wipe the progress (called after the confirmation). */
  onStartOver?: () => void
  /** The language of the card's sentences, and the switch that changes it (#292). */
  language?: Language
  onLanguage?: (l: Language) => void
}

export const StartScreen = ({
  onStart,
  loading = false,
  endingReached = false,
  onStartOver,
  language = 'ja',
  onLanguage,
}: StartScreenProps) => {
  const [confirming, setConfirming] = useState(false)
  // Keyboard focus follows the confirmation: CANCEL (the safe side) when it opens, START OVER when
  // it is cancelled, and START SHIFT once the erase has taken effect.
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
      focusAfter.current = 'cancel'
      setConfirming(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [confirming])
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

  const card = CARD[language]
  const lamps = Array.from({ length: misreportLampCount() }, (_, i) => i)

  return (
    <main className="start-screen">
      <div className="start-lang" role="group" aria-label="Language">
        {(['ja', 'en'] as const).map(l => (
          <button
            key={l}
            type="button"
            lang={l}
            className="start-lang-key"
            aria-pressed={language === l}
            onClick={() => onLanguage?.(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="start-logo">
        <img src="/images/logo.webp" alt="" />
      </div>
      <h1 className="start-sr-only">ANOMALY² Corona Road</h1>

      <section className="start-panel">
        <div className="start-plate">{card.plate}</div>

        <div className="start-row">
          <div className="start-lab">{card.purposeLabel}</div>
          <div className="start-desc">{card.purpose}</div>
        </div>

        <div className="start-row">
          <div className="start-lab">{card.switchLabel}</div>
          <div className="start-desc">
            {card.switchText}
            <div className="start-keys" aria-hidden="true">
              <span className="start-key start-key--tri" />
              <span className="start-key start-key--tri start-key--right" />
              <span className="start-key">A</span>
              <span className="start-key">D</span>
              <span className="start-key">1</span>
              <span className="start-key">…</span>
              <span className="start-key">8</span>
            </div>
            <span className="start-sr-only">{card.switchKeys}</span>
          </div>
        </div>

        <div className="start-row">
          <div className="start-lab">{card.adjustLabel}</div>
          <div className="start-desc">
            <span className="start-knob" aria-hidden="true" /> {card.adjust}
          </div>
        </div>

        <div className="start-row">
          <div className="start-lab">{card.reportLabel}</div>
          <div className="start-desc">
            {card.reportBefore}
            <span className="start-rep">REPORT</span>
            {card.reportAfter}
          </div>
        </div>

        <div className="start-row">
          <div className="start-lab">{card.mistakeLabel}</div>
          <div className="start-desc">
            <span className="start-lamps" aria-hidden="true">
              {lamps.map(i => (
                <i key={i} className="start-lamp" />
              ))}
            </span>
            <b>{misreportLimitText(undefined, language)}</b>
          </div>
        </div>
      </section>

      {endingReached ? (
        <div className="start-over">
          <p className="start-over-note">
            The investigation is closed. Start over to play again.
          </p>
          {confirming ? (
            <div className="start-over-confirm">
              <p className="start-over-warn" role="alert">
                All progress will be erased. This cannot be undone.
              </p>
              <button
                type="button"
                className="start-go"
                onClick={() => {
                  focusAfter.current = 'erase'
                  setConfirming(false)
                  onStartOver?.()
                }}
              >
                <i aria-hidden="true" />
                ERASE ALL
              </button>
              <button
                ref={cancelRef}
                type="button"
                className="start-over-cancel"
                onClick={() => {
                  focusAfter.current = 'cancel'
                  setConfirming(false)
                }}
              >
                CANCEL
              </button>
            </div>
          ) : (
            <button
              ref={startOverRef}
              type="button"
              className="start-go"
              onClick={() => setConfirming(true)}
            >
              <i aria-hidden="true" />
              START OVER
            </button>
          )}
        </div>
      ) : (
        <button
          ref={goRef}
          type="button"
          className="start-go"
          onClick={onStart}
          disabled={loading}
        >
          <i aria-hidden="true" />
          {loading ? 'LOADING…' : 'START SHIFT'}
        </button>
      )}
    </main>
  )
}
