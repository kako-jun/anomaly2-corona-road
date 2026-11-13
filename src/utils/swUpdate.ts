/**
 * Service worker registration (#388, vite-plugin-pwa, registerType 'prompt'). A new version waits; the page
 * reloads into it only while this tab is "safe" (the title itself: not a shift, a result, an ending or the note
 * before a shift), so no progress or screen is lost. Production builds only: in dev there is no worker.
 *
 * Several tabs: when one tab (at its title) activates the waiting worker, `clientsClaim` makes it control every
 * tab and the plugin tells each one to reload (`onNeedReload`). A tab in the middle of a shift must not: it
 * remembers the reload and does it when it is safe again (back at the title). Until then it keeps running the
 * version it loaded (the game loads no script lazily; its pictures come from the cache or the network by their own names).
 */

export interface Updater {
  /** A new worker is waiting. */
  onNeedRefresh(): void
  /** The new worker now controls this page (this tab or another one activated it). */
  onNeedReload(): void
  /** Tell whether this tab may reload now. Acts at once when a pending update can be applied. */
  setSafe(safe: boolean): void
}

export const createUpdater = (io: {
  /** Ask the waiting worker to take over (it then fires onNeedReload in every tab). */
  skipWaiting: () => void
  reload: () => void
}): Updater => {
  let safe = false
  let waiting = false
  let reloadPending = false
  const act = () => {
    if (!safe) return
    if (reloadPending) {
      reloadPending = false
      io.reload()
    } else if (waiting) {
      waiting = false
      io.skipWaiting()
    }
  }
  return {
    onNeedRefresh() {
      waiting = true
      act()
    },
    onNeedReload() {
      waiting = false
      reloadPending = true
      act()
    },
    setSafe(s) {
      safe = s
      act()
    },
  }
}

let updater: Updater | null = null
let safeNow = false

/** Called by the app whenever the player is (not) on the title itself. */
export const setUpdateSafe = (safe: boolean): void => {
  safeNow = safe
  updater?.setSafe(safe)
}

export const registerServiceWorker = (): void => {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
  void import('virtual:pwa-register').then(({ registerSW }) => {
    let update: (reload?: boolean) => Promise<void> = async () => {}
    updater = createUpdater({
      skipWaiting: () => void update(true),
      reload: () => window.location.reload(),
    })
    update = registerSW({
      onNeedRefresh: () => updater?.onNeedRefresh(),
      onNeedReload: () => updater?.onNeedReload(),
    })
    updater.setSafe(safeNow)
  })
}
