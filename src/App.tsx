import './App.css'
import {
  useEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
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
import { preloadCabinet, preloadTitleNotes } from './utils/uiPreload'
import { SAVE_KEY, load } from './utils/saveData'
import { resetProgress } from './utils/shiftProgress'
import { applyUpdate, subscribeUpdate, updateWaiting } from './utils/swUpdate'

function App() {
  const [screenKey, screen] = useScreen()
  return <ScreenTransition screenKey={screenKey}>{screen}</ScreenTransition>
}

function useScreen(): [string, ReactNode] {
  const ready = useRef<Promise<void>>(Promise.resolve())
  const [loading, setLoading] = useState(false)
  // The title's start key opens the investigation note; its key starts the shift (#297).
  const [memo, setMemo] = useState(false)
  const language = useLanguage()
  const updateReady = useSyncExternalStore(subscribeUpdate, updateWaiting)
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

  // A new version of the app waits until the player is on the title itself (not in a shift, a result, an ending
  // or the note before a shift), so a reload never costs progress (#388).
  useEffect(() => {
    if (updateReady && gameState === 'idle' && !memo && !loading) applyUpdate()
  }, [updateReady, gameState, memo, loading])

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

  return [
    'shift',
    <>
      <Cabinet
        stats={stats}
        cameras={cameras}
        currentCameraIndex={currentCameraIndex}
        currentCamera={currentCamera}
        anomalyHere={activeAnomalyHere}
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
