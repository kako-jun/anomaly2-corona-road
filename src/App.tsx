import './App.css'
import { useEffect, useReducer, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './styles/retro.css'
import { useGameState } from './hooks/useGameState'
import { StartScreen } from './components/StartScreen'
import { Cabinet } from './components/Cabinet'
import { InvestigationNote } from './components/InvestigationNote'
import { GameOverScreen } from './components/GameOverScreen'
import { SaveNotice } from './components/SaveNotice'
import { InstallBanner } from './components/InstallBanner'
import { ScreenTransition } from './components/ScreenTransition'
import { buildNote } from './utils/investigationNote'
import { useLanguage } from './utils/language'
import {
  preloadCabinet,
  preloadCameraImages,
  preloadReportNotes,
  preloadTitleNotes,
} from './utils/uiPreload'
import { SAVE_KEY, load } from './utils/saveData'
import { resetProgress } from './utils/shiftProgress'
import { setUpdateSafe } from './utils/swUpdate'
import { gameAudio } from './utils/audioEngine'
import { playSynth } from './utils/synthSounds'
import { soundOnCamera, voiceToHold } from './utils/nonImageEffects'
import { runningMonitorEffects } from './utils/monitorEffects'

function App() {
  const [screenKey, screen] = useScreen()
  const previousScreen = useRef(screenKey)
  useEffect(() => {
    if (
      previousScreen.current !== screenKey &&
      (screenKey === 'memo-before' || screenKey === 'result')
    ) {
      playSynth(gameAudio, 'paper')
    }
    previousScreen.current = screenKey
  }, [screenKey])
  useEffect(() => {
    let last = 0
    const click = (event: MouseEvent) => {
      const target = event.target
      if (
        !(target instanceof Element) ||
        !target.closest('button:not(:disabled)')
      )
        return
      const now = performance.now()
      if (now - last < 90) return
      last = now
      void gameAudio.unlock().then(() => playSynth(gameAudio, 'button'))
    }
    document.addEventListener('click', click)
    return () => document.removeEventListener('click', click)
  }, [])
  return <ScreenTransition screenKey={screenKey}>{screen}</ScreenTransition>
}

function useScreen(): [string, ReactNode] {
  const ready = useRef<Promise<void>>(Promise.resolve())
  const heldVoice = useRef<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  // The title's start key opens the investigation note; its key starts the shift (#297).
  const [memo, setMemo] = useState(false)
  const language = useLanguage()
  // The ending reached in another tab closes the note (storage events re-render this): without this the note
  // would open by itself after START OVER, without START SHIFT being pressed.
  const endingReached = load().endingReached
  useEffect(() => {
    if (endingReached) setMemo(false)
  }, [endingReached])
  // Bumped to re-read the save: after "start over", and when another tab changes it.
  const [, refresh] = useReducer((n: number) => n + 1, 0)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== null && e.key !== SAVE_KEY) return
      load()
      refresh()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  useEffect(() => {
    ready.current = preloadCabinet()
    // The report dialog's notes (this language), then the cameras' photos, come after the UI parts and the
    // fonts, at low priority; START does not wait for them (#396).
    void ready.current
      .then(() => preloadReportNotes(language))
      .then(() => preloadCameraImages())
    // The language is decided once at start (#292).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // The title notes of the chosen language only (a switch fetches the other one).
  useEffect(() => {
    void preloadTitleNotes(language)
  }, [language])
  const {
    gameState,
    stats,
    cameras,
    currentCameraIndex,
    currentCamera,
    activeAnomalyHere,
    feedGlitchHere,
    activeAnomalies,
    unreportedCount,
    feedback,
    ending,
    flagEvent,
    finishEnding,
    returnToTitle,
    startGame,
    switchCamera,
    reportAnomaly,
    gameTime,
  } = useGameState()

  // A new version of the app is applied (reload) only while the player is on the title itself (not in a shift, a
  // result, an ending or the note before a shift), in every tab, so a reload never costs progress (#388).
  const onTitleItself = gameState === 'idle' && !memo && !loading
  useEffect(() => {
    setUpdateSafe(onTitleItself)
  }, [onTitleItself])

  const enterShift = async () => {
    setLoading(true)
    let timer: ReturnType<typeof setTimeout> | undefined
    await Promise.race([
      ready.current,
      new Promise<void>(resolve => {
        timer = setTimeout(resolve, 5000)
      }),
    ])
    clearTimeout(timer)
    setLoading(false)
    // If the save cannot start a shift any more (another tab reached the ending), startGame does nothing
    // and the player is back on the title.
    setMemo(false)
    startGame()
  }

  if (gameState === 'idle' && memo && !endingReached) {
    return [
      'memo-before',
      <>
        <InvestigationNote
          view={buildNote({ mode: 'before', save: load() }, language)}
          onAction={enterShift}
          busy={loading}
        />
        <SaveNotice />
      </>,
    ]
  }

  if (gameState === 'idle') {
    return [
      'title',
      <>
        <StartScreen
          onStart={() => setMemo(true)}
          language={language}
          endingReached={load().endingReached}
          onTransferred={() => {
            setMemo(false)
            refresh()
          }}
          onTransferFailed={refresh}
          onStartOver={() => {
            resetProgress()
            refresh()
          }}
        />
        <SaveNotice />
        <InstallBanner language={language} loops={load().loops} />
      </>,
    ]
  }

  if (gameState === 'win' || gameState === 'lose') {
    return [
      'result',
      <>
        <GameOverScreen
          closing={
            ending?.closing ?? (gameState === 'win' ? 'dawn' : 'withdraw')
          }
          outcome={gameState}
          stats={stats}
          language={language}
          endingReached={load().endingReached}
          onRestart={startGame}
          onTitle={returnToTitle}
        />
        <SaveNotice />
      </>,
    ]
  }

  heldVoice.current = voiceToHold(
    activeAnomalies,
    currentCamera.id,
    heldVoice.current
  )
  return [
    'shift',
    <>
      <Cabinet
        stats={stats}
        cameras={cameras}
        currentCameraIndex={currentCameraIndex}
        currentCamera={currentCamera}
        anomalyHere={activeAnomalyHere}
        soundAnomalyHere={soundOnCamera(activeAnomalies, currentCamera.id)}
        heldVoiceId={heldVoice.current}
        feedGlitchHere={feedGlitchHere}
        monitorEffects={runningMonitorEffects(activeAnomalies)}
        openAnomalyIds={activeAnomalies
          .filter(a => !a.detectedAt)
          .map(a => a.id)}
        unreportedCount={unreportedCount}
        feedback={feedback}
        gameTime={gameTime}
        flagEvent={flagEvent}
        ending={ending?.closing ?? null}
        onEndingDone={finishEnding}
        onSwitch={switchCamera}
        onReport={reportAnomaly}
      />
      <SaveNotice />
    </>,
  ]
}

export default App
