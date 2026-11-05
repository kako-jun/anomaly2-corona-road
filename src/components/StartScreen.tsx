import { useEffect } from 'react'
import '../styles/start.css'
import { misreportLampCount, misreportLimitText } from '../utils/startScreen'

interface StartScreenProps {
  onStart: () => void
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
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

      <button type="button" className="start-go" onClick={onStart}>
        <i aria-hidden="true" />
        勤務開始
      </button>
    </main>
  )
}
