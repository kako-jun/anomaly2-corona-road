import { useEffect, useRef, useState } from 'react'
import '../styles/start.css'
import { misreportLampCount, misreportLimitText } from '../utils/startScreen'

interface StartScreenProps {
  onStart: () => void
  loading?: boolean
  /** The true ending was reached: the only choice is to start over from scratch (#294). */
  endingReached?: boolean
  /** Wipe the progress (called after the confirmation). */
  onStartOver?: () => void
}

export const StartScreen = ({
  onStart,
  loading = false,
  endingReached = false,
  onStartOver,
}: StartScreenProps) => {
  const [confirming, setConfirming] = useState(false)
  // Keyboard focus follows the confirmation: CANCEL (the safe side) when it opens, START OVER when
  // it is cancelled, and 勤務開始 once the erase has taken effect.
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

  const lamps = Array.from({ length: misreportLampCount() }, (_, i) => i)

  return (
    <main className="start-screen">
      <div className="start-logo">
        <img src="/images/logo.webp" alt="" />
      </div>
      <h1 className="start-sr-only">ANOMALY² Corona Road</h1>

      <section className="start-panel">
        <div className="start-plate">取扱い・監視カメラ 8台</div>

        <div className="start-row">
          <div className="start-lab">目的</div>
          <div className="start-desc">
            地下街の監視カメラ8台を見て、おかしなところを見つけたら報告する。
          </div>
        </div>

        <div className="start-row">
          <div className="start-lab">切替</div>
          <div className="start-desc">
            番号ボタン / 画面を左右にスワイプ
            <div className="start-keys" aria-hidden="true">
              <span className="start-key start-key--tri" />
              <span className="start-key start-key--tri start-key--right" />
              <span className="start-key">A</span>
              <span className="start-key">D</span>
              <span className="start-key">1</span>
              <span className="start-key">…</span>
              <span className="start-key">8</span>
            </div>
            <span className="start-sr-only">
              キーボードは左右の矢印キー、A と D、数字の1から8
            </span>
          </div>
        </div>

        <div className="start-row">
          <div className="start-lab">調整</div>
          <div className="start-desc">
            <span className="start-knob" aria-hidden="true" />{' '}
            明るさ・コントラストは左右にドラッグ(矢印キーでも)
          </div>
        </div>

        <div className="start-row">
          <div className="start-lab">報告</div>
          <div className="start-desc">
            <span className="start-rep">REPORT</span> を押してカテゴリを選ぶ
          </div>
        </div>

        <div className="start-row">
          <div className="start-lab">お手つき</div>
          <div className="start-desc">
            <span className="start-lamps" aria-hidden="true">
              {lamps.map(i => (
                <i key={i} className="start-lamp" />
              ))}
            </span>
            <b>{misreportLimitText()}</b>
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
          {loading ? '準備中…' : '勤務開始'}
        </button>
      )}
    </main>
  )
}
