import './App.css'
import { useGameState } from './hooks/useGameState'
import { StartScreen } from './components/StartScreen'
import { GameHUD } from './components/GameHUD'
import { CameraView } from './components/CameraView'
import { CameraStrip } from './components/CameraStrip'
import { ReportPanel } from './components/ReportPanel'
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
    progress,
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
    <div className="App">
      {feedback && (
        <div className={`flash flash--${feedback.kind}`} key={feedback.id} />
      )}
      {feedback && (
        <div
          className={`toast toast--${feedback.kind}`}
          key={`t-${feedback.id}`}
        >
          {feedback.message}
        </div>
      )}
      <GameHUD gameTime={gameTime} stats={stats} progress={progress} />
      <CameraView
        camera={currentCamera}
        gameTime={gameTime}
        anomalyHere={activeAnomalyHere}
        onSwipe={switchCamera}
      />
      <CameraStrip
        cameras={cameras}
        currentIndex={currentCameraIndex}
        onSelect={i => switchCamera(i)}
      />
      <ReportPanel onReport={reportAnomaly} />
    </div>
  )
}

export default App
