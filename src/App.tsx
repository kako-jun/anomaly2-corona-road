import './App.css'
import './styles/retro.css'
import { useGameState } from './hooks/useGameState'
import { StartScreen } from './components/StartScreen'
import { Cabinet } from './components/Cabinet'
import { GameOverScreen } from './components/GameOverScreen'
import { SaveNotice } from './components/SaveNotice'

function App() {
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

  if (gameState === 'idle') {
    return (
      <>
        <StartScreen onStart={startGame} />
        <SaveNotice />
      </>
    )
  }

  if (gameState === 'win' || gameState === 'lose') {
    return (
      <>
        <GameOverScreen
          victory={gameState === 'win'}
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
