import './App.css'
import { useEffect, useRef, useState } from 'react'
import './styles/retro.css'
import { useGameState } from './hooks/useGameState'
import { StartScreen } from './components/StartScreen'
import { Cabinet } from './components/Cabinet'
import { GameOverScreen } from './components/GameOverScreen'
import { SaveNotice } from './components/SaveNotice'
import { preloadCabinet } from './utils/uiPreload'
import { load } from './utils/saveData'
import { resetProgress } from './utils/shiftProgress'

function App() {
  const ready = useRef<Promise<void>>(Promise.resolve())
  const [loading, setLoading] = useState(false)
  // Bumped after "start over" so the title re-reads the (now wiped) save.
  const [, setResetCount] = useState(0)
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
            setResetCount(n => n + 1)
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
