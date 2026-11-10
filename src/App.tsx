import './App.css'
import { useEffect, useRef, useState } from 'react'
import './styles/retro.css'
import { useGameState } from './hooks/useGameState'
import { StartScreen } from './components/StartScreen'
import { Cabinet } from './components/Cabinet'
import { GameOverScreen } from './components/GameOverScreen'
import { SaveNotice } from './components/SaveNotice'
import { preloadCabinet } from './utils/uiPreload'

function App() {
  const ready = useRef<Promise<void>>(Promise.resolve())
  const [loading, setLoading] = useState(false)
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
    startGame,
    switchCamera,
    reportAnomaly,
    gameTime,
  } = useGameState()

  const enterShift = async () => {
    setLoading(true)
    await Promise.race([
      ready.current,
      new Promise<void>(resolve => setTimeout(resolve, 5000)),
    ])
    setLoading(false)
    startGame()
  }

  if (gameState === 'idle') {
    return (
      <>
        <StartScreen onStart={enterShift} loading={loading} />
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
          stats={stats}
          onRestart={startGame}
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
