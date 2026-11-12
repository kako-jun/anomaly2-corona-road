import { useEffect, useState, useSyncExternalStore } from 'react'
import {
  decideOffer,
  hasNativePrompt,
  INSTALL_DELAY_MS,
  isIos,
  isStandalone,
  promptInstall,
  readDismissedAt,
  recordDismiss,
  subscribeInstall,
} from '../utils/installPrompt'
import type { Language } from '../utils/saveData'

const TEXT = {
  ja: {
    native: 'ホーム画面に追加すると、すぐ開けます',
    ios: '共有 → 「ホーム画面に追加」で、すぐ開けます',
    add: '追加',
    later: 'あとで',
  },
  en: {
    native: 'Add this to your home screen to open it faster',
    ios: 'Tap Share, then "Add to Home Screen", to open it faster',
    add: 'ADD',
    later: 'LATER',
  },
} as const

interface Props {
  language: Language
  /** Saved loops: a night must have been played to its end. */
  loops: number
}

/**
 * The install suggestion (#388): a small bar at the bottom of the title, LATER always visible. It lives on the
 * title only (never during a shift, a result or an ending, where this component is not mounted), appears
 * INSTALL_DELAY_MS after the title does, only once a night has been played to its end (loops >= 1), never when
 * already installed, and not for 7 days after LATER.
 */
export const InstallBanner = ({ language, loops }: Props) => {
  // The title is the only place it lives; it waits a few seconds after the title appears.
  const [titleSettled, setTitleSettled] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setTitleSettled(true), INSTALL_DELAY_MS)
    return () => clearTimeout(id)
  }, [])
  const native = useSyncExternalStore(subscribeInstall, hasNativePrompt)
  // Dismissal is read once and kept in state, so LATER hides the bar at once.
  const [dismissedAt, setDismissedAt] = useState<number | null>(readDismissedAt)
  const offer = decideOffer({
    loops,
    titleSettled,
    standalone: isStandalone(),
    dismissedAt,
    now: Date.now(),
    hasNativePrompt: native,
    ios: isIos(
      navigator.userAgent,
      navigator.platform,
      navigator.maxTouchPoints
    ),
  })
  if (!offer) return null
  const t = TEXT[language]
  const later = () => {
    const now = Date.now()
    recordDismiss(now)
    setDismissedAt(now)
  }
  return (
    <div className="install-banner" role="region" aria-label="Install">
      <p className="install-banner-text">
        {offer === 'native' ? t.native : t.ios}
      </p>
      <div className="install-banner-keys">
        {offer === 'native' && (
          <button
            type="button"
            className="install-banner-key"
            onClick={() => void promptInstall()}
          >
            {t.add}
          </button>
        )}
        <button type="button" className="install-banner-key" onClick={later}>
          {t.later}
        </button>
      </div>
    </div>
  )
}
