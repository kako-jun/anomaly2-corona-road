import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { Feedback } from '../hooks/useGameState'
import { useCameraKeys } from '../hooks/useCameraKeys'
import { FlagEvent, useSubtitle } from '../hooks/useSubtitle'
import { Anomaly, AnomalyCategory, Camera, GameStats } from '../types/game'
import { CAMERAS, ENDING_BAR_CAMERA } from '../utils/gameConfig'
import { KNOB_DEFAULT, brightnessFilter, contrastFilter } from '../utils/knob'
import { gameAudio, DEFAULT_VOLUME } from '../utils/audioEngine'
import { readAudioVolume, saveVolume } from '../utils/audioSettings'
import { FeedGlitchKind, forcedFeedGlitch } from '../utils/feedGlitch'
import { parseWear } from '../utils/wear'
import { CameraStrip } from './CameraStrip'
import { CameraView } from './CameraView'
import { GameHUD } from './GameHUD'
import { Knob } from './Knob'
import { shouldAlert } from '../utils/reportAlert'
import { ReportButton, ReportDialog } from './ReportPanel'

// Fixed at module load: changing `?wear=` needs a page reload.
const WEAR = parseWear(window.location.search)

// Dev only (`?glitch=<kind>`, ignored by a production build): forces one camera feed glitch on every camera, to look at
// an effect on demand (#78). In play the glitch comes from the running feed_glitch anomaly on the watched camera (#77).
const FORCED_GLITCH = forcedFeedGlitch(
  window.location.search,
  import.meta.env.DEV
)

interface CabinetProps {
  stats: GameStats
  cameras: Camera[]
  currentCameraIndex: number
  currentCamera: Camera
  anomalyHere?: Anomaly
  /** The feed glitch of the running feed_glitch anomaly on the watched camera, if any (#77). */
  feedGlitchHere?: FeedGlitchKind
  /** Ids of the anomalies not reported yet (the spawn hint subtitle waits on them). */
  openAnomalyIds?: string[]
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
  feedGlitchHere,
  openAnomalyIds,
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
  // VOL (#79): 0 is the mute. The engine follows the knob at once; the save is written once the knob rests.
  const [volume, setVolume] = useState(readAudioVolume)
  const volumeDirty = useRef(false)
  const [reportOpen, setReportOpen] = useState(false)
  // Keep the last result so the OSD can fade out after the hook clears `feedback`.
  const [shownResult, setShownResult] = useState<Feedback | null>(null)
  const cabinetRef = useRef<HTMLElement>(null)
  const reportBtnRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)
  // where the magnifier loupe is drawn (#341); null until mounted
  const [loupeHost, setLoupeHost] = useState<HTMLDivElement | null>(null)

  const changeVolume = useCallback((v: number) => {
    gameAudio.setVolume(v)
    volumeDirty.current = true
    setVolume(v)
  }, [])
  useEffect(() => {
    if (!volumeDirty.current) return
    const t = window.setTimeout(() => {
      volumeDirty.current = false
      saveVolume(volume)
    }, 300)
    return () => window.clearTimeout(t)
  }, [volume])
  // leaving the screen inside the 300 ms still saves the last position
  useEffect(
    () => () => {
      if (volumeDirty.current) saveVolume(gameAudio.getVolume())
    },
    []
  )

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

  // The ending's virtual camera (CAM 09) takes no camera operation at all: keys and swipes are ignored (#273).
  const inEnding = ending === 'ending'
  useCameraKeys(!reportOpen && !inEnding, CAMERAS.length, onSwitch)
  const handleSwipe = useCallback(
    (d: 'next' | 'prev') => {
      if (!inEnding) onSwitch(d)
    },
    [inEnding, onSwitch]
  )

  const subtitle = useSubtitle({
    wrongFeedbackId: feedback?.kind === 'wrong' ? feedback.id : null,
    wrongAnomalyId:
      feedback?.kind === 'wrong' ? (feedback.anomalyId ?? null) : null,
    elapsedMs: stats.currentTime,
    foundThisPlay: stats.correctReports,
    openAnomalyIds,
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
          feedGlitch={
            ending === 'ending' ? undefined : (FORCED_GLITCH ?? feedGlitchHere)
          }
          feedGlitchForced={FORCED_GLITCH !== undefined}
          onSwipe={handleSwipe}
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
            <Knob
              label="Volume"
              text="VOL"
              value={volume}
              resetTo={DEFAULT_VOLUME}
              onChange={changeVolume}
            />
          </div>
          <CameraStrip
            cameras={cameras}
            currentIndex={currentCameraIndex}
            onSelect={onSwitch}
            disabled={inEnding}
          />
          <ReportButton
            open={reportOpen}
            alert={shouldAlert(unreportedCount)}
            lampsOff={inEnding}
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
