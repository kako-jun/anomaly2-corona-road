import './App.css'
import { useEffect, useReducer, useRef, useState } from 'react'
import './styles/retro.css'
import { useGameState } from './hooks/useGameState'
import { StartScreen } from './components/StartScreen'
import { Cabinet } from './components/Cabinet'
import { GameOverScreen } from './components/GameOverScreen'
import { SaveNotice } from './components/SaveNotice'
import { preloadCabinet } from './utils/uiPreload'
import { SAVE_KEY, load } from './utils/saveData'
import { resetProgress } from './utils/shiftProgress'

function App() {
  const ready = useRef<Promise<void>>(Promise.resolve())
  const [loading, setLoading] = useState(false)
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
  const {
    gameState,
    stats,
    cameras,
    currentCameraIndex,
    currentCamera,
    activeAnomalyHere,
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
    startGame()
  }

  if (gameState === 'idle') {
    return (
      <>
        <StartScreen
          onStart={enterShift}
          loading={loading}
          endingReached={load().endingReached}
          onStartOver={() => {
            resetProgress()
            refresh()
          }}
        />
        <SaveNotice />
      </>
    )
  }

  if (gameState === 'win' || gameState === 'lose') {
    return (
      <>
        <GameOverScreen
          closing={
            ending?.closing ?? (gameState === 'win' ? 'dawn' : 'withdraw')
          }
          outcome={gameState}
          stats={stats}
          endingReached={load().endingReached}
          onRestart={startGame}
          onTitle={returnToTitle}
        />
        <SaveNotice />
      </>
    )
  }

  return (
    <>
      <Cabinet
        stats={stats}
        cameras={cameras}
        currentCameraIndex={currentCameraIndex}
        currentCamera={currentCamera}
        anomalyHere={activeAnomalyHere}
        feedback={feedback}
        gameTime={gameTime}
        flagEvent={flagEvent}
        ending={ending?.closing ?? null}
        onEndingDone={finishEnding}
        onSwitch={switchCamera}
        onReport={reportAnomaly}
      />
      <SaveNotice />
    </>
  )
}

export default App
