import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initGameAudio } from './utils/audioSettings'

// Sound foundation (#79): apply the saved volume/mute and arm the first-gesture unlock. Nothing plays yet.
initGameAudio()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
