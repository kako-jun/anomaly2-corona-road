import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { Feedback } from '../hooks/useGameState'
import { useCameraKeys } from '../hooks/useCameraKeys'
import { useSubtitle } from '../hooks/useSubtitle'
import { Anomaly, AnomalyCategory, Camera, GameStats } from '../types/game'
import { CAMERAS } from '../utils/gameConfig'
import { KNOB_DEFAULT, brightnessFilter, contrastFilter } from '../utils/knob'
import { parseWear } from '../utils/wear'
import { CameraStrip } from './CameraStrip'
import { CameraView } from './CameraView'
import { GameHUD } from './GameHUD'
import { Knob } from './Knob'
import { ReportButton, ReportDialog } from './ReportPanel'

const WEAR = parseWear(window.location.search)

interface CabinetProps {
  stats: GameStats
  cameras: Camera[]
  currentCameraIndex: number
  currentCamera: Camera
  anomalyHere?: Anomaly
  feedback: Feedback | null
  gameTime: string
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
  feedback,
  gameTime,
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

  useEffect(() => {
    if (feedback) setShownResult(feedback)
  }, [feedback])

  // The background is inert while the dialog is open.
  // On close, focus returns to the REPORT key (after the cabinet stops being inert, so focus() works).
  useEffect(() => {
    if (cabinetRef.current) cabinetRef.current.inert = reportOpen
    if (wasOpenRef.current && !reportOpen) reportBtnRef.current?.focus()
    wasOpenRef.current = reportOpen
  }, [reportOpen])

  useCameraKeys(!reportOpen, CAMERAS.length, onSwitch)

  const subtitle = useSubtitle(feedback?.kind === 'wrong' ? feedback.id : null)

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
          camera={currentCamera}
          anomalyHere={anomalyHere}
          result={shownResult}
          resultVisible={feedback !== null}
          subtitle={subtitle}
          brightness={brightnessFilter(brightness)}
          contrast={contrastFilter(contrast)}
          onSwipe={onSwitch}
        />
        <section className="panel" aria-label="Control panel">
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
            buttonRef={reportBtnRef}
            onToggle={() => setReportOpen(o => !o)}
          />
          <div className="speaker" aria-hidden="true" />
        </section>
      </main>
      {reportOpen && (
        <ReportDialog onSelect={handleSelect} onClose={closeReport} />
      )}
    </div>
  )
}
