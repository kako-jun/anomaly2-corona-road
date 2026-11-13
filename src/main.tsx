import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initGameAudio } from './utils/audioSettings'
import { initInstallPrompt } from './utils/installPrompt'
import { registerServiceWorker } from './utils/swUpdate'

// Sound foundation (#79): apply the saved volume/mute and arm the first-gesture unlock. Nothing plays yet.
initGameAudio()

// Install suggestion (#388): hold the browser's prompt until the title after the first night.
initInstallPrompt()
registerServiceWorker()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
