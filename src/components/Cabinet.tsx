import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { Feedback } from '../hooks/useGameState'
import { useCameraKeys } from '../hooks/useCameraKeys'
import { FlagEvent, useSubtitle } from '../hooks/useSubtitle'
import { Anomaly, AnomalyCategory, Camera, GameStats } from '../types/game'
import { CAMERAS, ENDING_BAR_CAMERA } from '../utils/gameConfig'
import { KNOB_DEFAULT, brightnessFilter, contrastFilter } from '../utils/knob'
import { parseWear } from '../utils/wear'
import { CameraStrip } from './CameraStrip'
import { CameraView } from './CameraView'
import { GameHUD } from './GameHUD'
import { Knob } from './Knob'
import { shouldAlert } from '../utils/reportAlert'
import { ReportButton, ReportDialog } from './ReportPanel'

// Fixed at module load: changing `?wear=` needs a page reload.
const WEAR = parseWear(window.location.search)

interface CabinetProps {
  stats: GameStats
  cameras: Camera[]
  currentCameraIndex: number
  currentCamera: Camera
  anomalyHere?: Anomaly
  /** Anomalies out there that nobody has reported yet (drives the REPORT lamp, #344). */
  unreportedCount: number
  feedback: Feedback | null
  gameTime: string
  /** Flags that just rose (their story conversation cuts into the subtitles). */
  flagEvent: FlagEvent | null
  /** Set once the shift is over: the closing conversation plays, then `onEndingDone`. */
  ending: 'dawn' | 'withdraw' | 'ending' | null
  onEndingDone: () => void
  onSwitch: (to: 'prev' | 'next' | number) => void
  onReport: (category: AnomalyCategory) => void
}

/** The in-game screen: CRT monitor + control panel. Mounted only while playing, so its local state resets every shift. */
export const Cabinet = ({
  stats,
  cameras,
  currentCameraIndex,
  currentCamera,
  anomalyHere,
  unreportedCount,
  feedback,
  gameTime,
  flagEvent,
  ending,
  onEndingDone,
  onSwitch,
  onReport,
}: CabinetProps) => {
  const [brightness, setBrightness] = useState(KNOB_DEFAULT)
  const [contrast, setContrast] = useState(KNOB_DEFAULT)
  const [reportOpen, setReportOpen] = useState(false)
  // Keep the last result so the OSD can fade out after the hook clears `feedback`.
  const [shownResult, setShownResult] = useState<Feedback | null>(null)
  const cabinetRef = useRef<HTMLElement>(null)
  const reportBtnRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)
  // where the magnifier loupe is drawn (#341); null until mounted
  const [loupeHost, setLoupeHost] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (feedback) setShownResult(feedback)
  }, [feedback])

  // The background is inert while the dialog is open. Safari < 15.5 ignores `inert`, so there the
  // background stays operable and only ReportDialog's focus trap applies.
  // On close, focus returns to the REPORT key (after the cabinet stops being inert, so focus() works).
  useEffect(() => {
    if (cabinetRef.current) cabinetRef.current.inert = reportOpen
    if (wasOpenRef.current && !reportOpen) reportBtnRef.current?.focus()
    wasOpenRef.current = reportOpen
  }, [reportOpen])

  useCameraKeys(!reportOpen, CAMERAS.length, onSwitch)

  const subtitle = useSubtitle({
    wrongFeedbackId: feedback?.kind === 'wrong' ? feedback.id : null,
    wrongAnomalyId:
      feedback?.kind === 'wrong' ? (feedback.anomalyId ?? null) : null,
    elapsedMs: stats.currentTime,
    foundThisPlay: stats.correctReports,
    flagEvent,
    ending,
    onClosingDone: onEndingDone,
  })

  const closeReport = useCallback(() => setReportOpen(false), [])

  const handleSelect = (category: AnomalyCategory) => {
    closeReport()
    onReport(category)
  }

  return (
    <div
      className="retro"
      style={WEAR === null ? undefined : ({ '--wear': WEAR } as CSSProperties)}
    >
      <main className="cabinet" ref={cabinetRef}>
        <CameraView
          camera={ending === 'ending' ? ENDING_BAR_CAMERA : currentCamera}
          anomalyHere={ending === 'ending' ? undefined : anomalyHere}
          result={shownResult}
          resultVisible={feedback !== null}
          subtitle={subtitle}
          brightness={brightnessFilter(brightness)}
          contrast={contrastFilter(contrast)}
          onSwipe={onSwitch}
          loupeHost={loupeHost}
        />
        <section className="panel" aria-label="Control panel">
          <div className="loupe-host" ref={setLoupeHost} />
          <GameHUD gameTime={gameTime} stats={stats} />
          <div className="row knobs">
            <Knob
              label="Brightness"
              value={brightness}
              onChange={setBrightness}
            />
            <Knob label="Contrast" value={contrast} onChange={setContrast} />
          </div>
          <CameraStrip
            cameras={cameras}
            currentIndex={currentCameraIndex}
            onSelect={onSwitch}
          />
          <ReportButton
            open={reportOpen}
            alert={shouldAlert(unreportedCount)}
            buttonRef={reportBtnRef}
            onToggle={() => setReportOpen(o => !o)}
          />
        </section>
        {/* bottom strip (#304): speaker grille on the left, model plate fixed to the right, one row */}
        <div className="cabinet-foot">
          <div className="speaker" aria-hidden="true" />
          <img
            className="model-plate"
            src="/ui/model-plate.webp"
            alt="Video Monitor CR-42"
            width={155}
            height={40}
            draggable={false}
          />
        </div>
      </main>
      {reportOpen && (
        <ReportDialog onSelect={handleSelect} onClose={closeReport} />
      )}
    </div>
  )
}
