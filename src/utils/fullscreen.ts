/**
 * Fullscreen toggle (#426): when the title may offer it, and the calls. Pure decision (`canFullscreen`) + thin
 * wrappers over the Fullscreen API. NOT offered where it does not work or is pointless: iPhone Safari has no page
 * Fullscreen API (`fullscreenEnabled` is false / `requestFullscreen` is missing), and an installed PWA (standalone,
 * #388) is already full screen.
 */
import { isStandalone } from './installPrompt'

interface FullscreenDoc {
  fullscreenEnabled?: boolean
  documentElement?: { requestFullscreen?: unknown }
}

export const canFullscreen = (
  doc: FullscreenDoc,
  standalone: boolean
): boolean =>
  !standalone &&
  doc.fullscreenEnabled === true &&
  typeof doc.documentElement?.requestFullscreen === 'function'

export const fullscreenAvailable = (): boolean =>
  typeof document !== 'undefined' && canFullscreen(document, isStandalone())

export const isFullscreen = (): boolean =>
  typeof document !== 'undefined' && document.fullscreenElement != null

/** Enter or leave. Must be called inside a user gesture. A refusal (the browser said no) is ignored: nothing to show. */
export const toggleFullscreen = async (): Promise<void> => {
  try {
    if (isFullscreen()) await document.exitFullscreen()
    else await document.documentElement.requestFullscreen()
  } catch {
    // refused by the browser: the state stays as it was
  }
}
