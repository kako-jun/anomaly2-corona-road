import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Feedback } from '../hooks/useGameState'
import { useCameraKeys } from '../hooks/useCameraKeys'
import { FlagEvent, useSubtitle } from '../hooks/useSubtitle'
import { Anomaly, AnomalyCategory, Camera, GameStats } from '../types/game'
import { CAMERAS, ENDING_BAR_CAMERA } from '../utils/gameConfig'
import {
  KNOB_DEFAULT,
  brightnessFilter,
  contrastFilter,
  driftStep,
} from '../utils/knob'
import { gameAudio, DEFAULT_VOLUME } from '../utils/audioEngine'
import { playSynth } from '../utils/synthSounds'
import {
  VOICE_IDS,
  VOICE_RETRY_LIMIT,
  voiceWasLoaded,
  holdVoice,
  playVoice,
  probeVoices,
  releaseVoice,
  voiceRetryDelay,
} from '../utils/voiceSounds'
import { HUM_MODES, SOUND_EFFECTS } from '../utils/nonImageEffects'
import { fxAttribute } from '../utils/monitorEffects'
import { colonVariant, reportLabel } from '../utils/hudText'
import { ClockFault, faultedClock, pickClockFault } from '../utils/clockFault'
import { PLATE_MODEL, plateNumber } from '../utils/modelPlate'
import '../styles/monitorEffects.css'
import { readAudioVolume, saveVolume } from '../utils/audioSettings'
import { FeedGlitchKind, forcedFeedGlitch } from '../utils/feedGlitch'
import { parseWear } from '../utils/wear'
import { CameraStrip } from './CameraStrip'
import { CameraView } from './CameraView'
import { GameHUD } from './GameHUD'
import { Knob } from './Knob'
import { shouldAlert } from '../utils/reportAlert'
import { ReportButton, ReportDialog } from './ReportPanel'

const NO_EFFECTS: ReadonlySet<string> = new Set()

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
  soundAnomalyHere?: Anomaly
  /** The voice anomaly whose decoded buffer should be kept (one at a time). */
  heldVoiceId?: string
  /** The feed glitch of the running feed_glitch anomaly on the watched camera, if any (#77). */
  feedGlitchHere?: FeedGlitchKind
  /** The monitor-scope effects running now (ui_corruption / rule_break, src/utils/monitorEffects.ts); absent = none. */
  monitorEffects?: ReadonlySet<string>
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
  /** A story conversation has ended (its flag): a story person's picture is taken away (#430). */
  onStoryDone?: (flag: string) => void
  onSwitch: (to: 'prev' | 'next' | number) => void
  onReport: (category: AnomalyCategory) => void
  /** A voice anomaly whose file could not be loaded after every retry: the game takes it back (#407). */
  onVoiceUnavailable?: (id: string) => void
}

/** The in-game screen: CRT monitor + control panel. Mounted only while playing, so its local state resets every shift. */
export const Cabinet = ({
  stats,
  cameras,
  currentCameraIndex,
  currentCamera,
  anomalyHere,
  soundAnomalyHere,
  heldVoiceId,
  feedGlitchHere,
  monitorEffects = NO_EFFECTS,
  openAnomalyIds,
  unreportedCount,
  feedback,
  gameTime,
  flagEvent,
  ending,
  onEndingDone,
  onStoryDone,
  onSwitch,
  onReport,
  onVoiceUnavailable,
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
  const speakerRef = useRef<HTMLDivElement>(null)
  // where the magnifier loupe is drawn (#341); null until mounted
  const [loupeHost, setLoupeHost] = useState<HTMLDivElement | null>(null)

  const [audioGeneration, setAudioGeneration] = useState(0)
  useEffect(() => {
    let cancelled = false
    let watched: AudioContext | null = null
    const onState = () => {
      if (watched?.state === 'running') setAudioGeneration(n => n + 1)
    }
    const alreadyRunning = gameAudio.ctx()?.state === 'running'
    void gameAudio.unlock().then(() => {
      if (cancelled) return
      watched = gameAudio.ctx()
      void probeVoices()
      watched?.addEventListener('statechange', onState)
      if (!alreadyRunning) onState()
    })
    return () => {
      cancelled = true
      watched?.removeEventListener('statechange', onState)
    }
  }, [])

  const humMode = HUM_MODES[soundAnomalyHere?.id ?? ''] ?? 'normal'
  useEffect(() => {
    if (ending || humMode === 'off') return
    let cancelled = false
    let stop = () => {}
    void gameAudio.unlock().then(() => {
      if (!cancelled) {
        const sound = playSynth(
          gameAudio,
          humMode === 'loud'
            ? 'humGrow'
            : humMode === 'wobble'
              ? 'wobble'
              : 'hum'
        )
        stop = () => sound?.stop()
      }
    })
    return () => {
      cancelled = true
      stop()
    }
  }, [ending, humMode, audioGeneration])

  const anomalySoundId = soundAnomalyHere?.id
  const anomalySound = anomalySoundId
    ? SOUND_EFFECTS[anomalySoundId]
    : undefined
  const audible = volume > 0
  // Keep one decoded voice while its anomaly is unreported; free it on report, shift end, silence or unmount.
  // A failed load retries with exponential backoff and gives up after a few tries (a missing or short file is permanent).
  const [voiceLoads, setVoiceLoads] = useState(0)
  useEffect(() => {
    if (!heldVoiceId || ending || !audible) return
    let cancelled = false
    let timer: number | undefined
    const load = (attempt: number) => {
      void gameAudio
        .unlock()
        .then(() => !cancelled && holdVoice(gameAudio, heldVoiceId))
        .then(ok => {
          if (cancelled) return
          if (ok) setVoiceLoads(n => n + 1)
          else if (attempt + 1 < VOICE_RETRY_LIMIT)
            timer = window.setTimeout(
              () => load(attempt + 1),
              voiceRetryDelay(attempt)
            )
          // A voice decoded once in this shift may have been heard: a failed re-read later does not take it back.
          else if (!voiceWasLoaded(heldVoiceId))
            onVoiceUnavailable?.(heldVoiceId)
        })
    }
    load(0)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      releaseVoice(heldVoiceId)
    }
  }, [heldVoiceId, ending, audible, onVoiceUnavailable])
  useEffect(() => {
    if (!anomalySoundId || !VOICE_IDS.has(anomalySoundId) || ending || !audible)
      return
    const playing = playVoice(gameAudio, anomalySoundId)
    return () => playing?.stop()
  }, [
    anomalySoundId,
    currentCameraIndex,
    ending,
    audioGeneration,
    audible,
    voiceLoads,
  ])
  useEffect(() => {
    const sound = anomalySound
    if (!sound || ending || !audible) return
    let playing: ReturnType<typeof playSynth> = null
    let timer: number
    let cancelled = false
    const play = () => {
      if (cancelled) return
      playing = playSynth(gameAudio, sound)
      if (sound !== 'buzz') {
        // A fresh interval and a fresh sound variation each time: no fixed loop.
        timer = window.setTimeout(play, 9000 + Math.random() * 16000)
      }
    }
    // Deferral avoids consuming a sound during React StrictMode's setup/cleanup probe.
    timer = window.setTimeout(play, 0)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      playing?.stop()
    }
  }, [
    anomalySound,
    anomalySoundId,
    currentCameraIndex,
    ending,
    audioGeneration,
    audible,
  ])

  const previousCamera = useRef(currentCameraIndex)
  useEffect(() => {
    if (previousCamera.current !== currentCameraIndex && !ending)
      playSynth(gameAudio, 'static')
    previousCamera.current = currentCameraIndex
  }, [currentCameraIndex, ending])

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

  // RT-UI-27 (speaker holes checkered): the CSS mask must line up with the hole tile, so the number of holes in a row is
  // written on the grille (the tile is 9/7 of the row pitch --hole-p wide; the browser fits a whole number of them).
  // Boolean dependency: any other anomaly changing makes a new set (see src/utils/monitorEffects.ts).
  const speakerChecker = monitorEffects.has('RT-UI-27') && ending !== 'ending'
  useEffect(() => {
    const el = speakerRef.current
    if (!speakerChecker || !el) return
    const fit = () => {
      const pitch = parseFloat(
        getComputedStyle(el).getPropertyValue('--hole-p')
      )
      const cols = Math.max(1, Math.round(el.clientWidth / ((pitch * 9) / 7)))
      if (Number.isFinite(cols) && el.clientWidth > 0)
        el.style.setProperty('--speaker-cols', String(cols))
    }
    fit()
    const ro =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(fit)
    ro?.observe(el)
    return () => {
      ro?.disconnect()
      el.style.removeProperty('--speaker-cols')
    }
  }, [speakerChecker])

  // The ending's virtual camera (CAM 09) takes no camera operation at all: keys and edge taps are ignored (#273).
  const inEnding = ending === 'ending'
  // the effects drawn now: none on the ending CAM 09
  const fx = inEnding ? NO_EFFECTS : monitorEffects
  // RT-UI-26: one misspelling per run of the effect (a boolean dependency, not the set)
  const misspelled = fx.has('RT-UI-26')
  const colonActive = fx.has('RT-UI-23')
  // RT-UI-21: only the press that would show the loupe is taken away; taps, the knock and reporting are untouched
  const loupeBroken = fx.has('RT-UI-21')
  const colonKind = useMemo(() => colonVariant(colonActive), [colonActive])
  const reportKeyLabel = useMemo(() => reportLabel(misspelled), [misspelled])
  // RT-UI-05: one kind per run of the effect, and the real time it began at; the digits on screen are the faulted ones
  const clockOn = fx.has('RT-UI-05')
  const [clockFault, setClockFault] = useState<ClockFault | null>(null)
  if (clockOn && !clockFault) setClockFault(pickClockFault(gameTime))
  else if (!clockOn && clockFault) setClockFault(null)
  const shownTime =
    clockOn && clockFault ? faultedClock(gameTime, clockFault) : gameTime
  // RT-UI-20: one camera key loses its face per run of the effect
  const keyGone = fx.has('RT-UI-20')
  const goneKey = useMemo(
    () => (keyGone ? Math.floor(Math.random() * cameras.length) : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the camera count is fixed for a shift
    [keyGone]
  )
  // RT-UI-14 / 28: digits drawn over the model plate
  const plateDigits = plateNumber(fx)

  // RT-UI-13 (knob drift): brightness and contrast turn by themselves; a touch (held, or a change within the last
  // 1.5 s) pauses the drift. Reduced motion: a step every 3 s instead of a smooth turn. Boolean dependency (see above).
  const knobDrift = fx.has('RT-UI-13')
  const knobValues = useRef({ b: brightness, c: contrast })
  knobValues.current = { b: brightness, c: contrast }
  const knobTouch = useRef({ held: false, last: 0 })
  // what the player last set (the value before the drift began, until they touch a knob): restored when the effect clears
  const userKnobs = useRef({ b: brightness, c: contrast })
  useEffect(() => {
    if (!knobDrift) return
    const user = userKnobs.current // one object for the whole run (only its fields change)
    const reduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const tick = reduced ? 3000 : 100
    let dirB: 1 | -1 = Math.random() < 0.5 ? 1 : -1
    let dirC: 1 | -1 = dirB === 1 ? -1 : 1
    const timer = window.setInterval(() => {
      const t = knobTouch.current
      if (t.held || performance.now() - t.last < 1500) return
      const b = driftStep(knobValues.current.b, dirB, reduced ? 12 : 0.7)
      const c = driftStep(knobValues.current.c, dirC, reduced ? 9 : 0.5)
      knobValues.current = { b: b.value, c: c.value }
      dirB = b.dir
      dirC = c.dir
      setBrightness(b.value)
      setContrast(c.value)
    }, tick)
    const down = (e: Event) => {
      if ((e.target as Element | null)?.closest?.('.knob'))
        knobTouch.current.held = true
    }
    const up = () => {
      if (knobTouch.current.held) knobTouch.current.last = performance.now()
      knobTouch.current.held = false
    }
    document.addEventListener('pointerdown', down)
    document.addEventListener('pointerup', up)
    document.addEventListener('pointercancel', up)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerup', up)
      document.removeEventListener('pointercancel', up)
      knobTouch.current = { held: false, last: 0 }
      setBrightness(user.b)
      setContrast(user.c)
    }
  }, [knobDrift])
  const changeBrightness = useCallback((v: number) => {
    knobTouch.current.last = performance.now()
    userKnobs.current.b = v
    setBrightness(v)
  }, [])
  const changeContrast = useCallback((v: number) => {
    knobTouch.current.last = performance.now()
    userKnobs.current.c = v
    setContrast(v)
  }, [])
  useCameraKeys(!reportOpen && !inEnding, CAMERAS.length, onSwitch)
  const handleEdgeTap = useCallback(
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
    misreports: stats.misreports,
    openAnomalyIds,
    flagEvent,
    ending,
    onClosingDone: onEndingDone,
    onStoryDone,
  })

  const closeReport = useCallback(() => setReportOpen(false), [])

  const handleSelect = (category: AnomalyCategory) => {
    closeReport()
    onReport(category)
  }

  return (
    <div
      className="retro"
      data-fx={fxAttribute(fx)}
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
          onEdgeTap={handleEdgeTap}
          loupeHost={loupeHost}
          loupeBroken={loupeBroken}
        />
        <section className="panel" aria-label="Control panel">
          <div className="loupe-host" ref={setLoupeHost} />
          <GameHUD
            gameTime={gameTime}
            shownTime={shownTime}
            stats={stats}
            fx={fx}
            colonVariant={colonKind}
          />
          <div className="row knobs">
            <Knob
              label="Brightness"
              value={brightness}
              onChange={changeBrightness}
            />
            <Knob label="Contrast" value={contrast} onChange={changeContrast} />
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
            goneIndex={goneKey}
          />
          <ReportButton
            open={reportOpen}
            alert={shouldAlert(unreportedCount)}
            lampsOff={inEnding}
            label={reportKeyLabel}
            buttonRef={reportBtnRef}
            onToggle={() => setReportOpen(o => !o)}
          />
        </section>
        {/* bottom strip (#304): speaker grille on the left, model plate fixed to the right, one row */}
        <div className="cabinet-foot">
          <div className="speaker" aria-hidden="true" ref={speakerRef} />
          <img
            className="model-plate"
            src="/ui/model-plate.webp"
            alt={`Video Monitor CR-${plateDigits ?? PLATE_MODEL}`}
            width={155}
            height={40}
            draggable={false}
          />
          {plateDigits && (
            <svg
              className="plate-num"
              viewBox="0 0 82 80"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <text
                x="79"
                y="77"
                textAnchor="end"
                textLength={plateDigits.length > 2 ? 74 : 70}
                lengthAdjust="spacingAndGlyphs"
              >
                {plateDigits}
              </text>
            </svg>
          )}
        </div>
      </main>
      {reportOpen && (
        <ReportDialog onSelect={handleSelect} onClose={closeReport} />
      )}
    </div>
  )
}
