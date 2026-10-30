import './App.css'
import './styles/retro.css'
import { useGameState } from './hooks/useGameState'
import { StartScreen } from './components/StartScreen'
import { Cabinet } from './components/Cabinet'
import { GameOverScreen } from './components/GameOverScreen'

function App() {
  const {
    gameState,
    stats,
    cameras,
    currentCameraIndex,
    currentCamera,
    activeAnomalyHere,
    feedback,
    startGame,
    switchCamera,
    reportAnomaly,
    gameTime,
  } = useGameState()

  if (gameState === 'idle') {
    return <StartScreen onStart={startGame} />
  }

  if (gameState === 'win' || gameState === 'lose') {
    return (
      <GameOverScreen
        victory={gameState === 'win'}
        stats={stats}
        onRestart={startGame}
      />
    )
  }

  return (
    <Cabinet
      stats={stats}
      cameras={cameras}
      currentCameraIndex={currentCameraIndex}
      currentCamera={currentCamera}
      anomalyHere={activeAnomalyHere}
      feedback={feedback}
      gameTime={gameTime}
      onSwitch={switchCamera}
      onReport={reportAnomaly}
    />
  )
}

export default App
