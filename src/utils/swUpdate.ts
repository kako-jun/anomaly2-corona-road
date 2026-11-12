/**
 * Service worker registration (#388, vite-plugin-pwa, registerType 'prompt'). A new version waits; it is applied
 * (the page reloads) only when the player is at the title, never during a shift, a result or an ending, so no
 * progress or screen is lost. Production builds only: in dev there is no worker.
 */

let apply: (() => Promise<void>) | null = null
let waiting = false
const listeners = new Set<() => void>()
const emit = () => listeners.forEach(l => l())

export const subscribeUpdate = (l: () => void): (() => void) => {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
export const updateWaiting = (): boolean => waiting

/** Reload into the waiting version. Does nothing when there is none. */
export const applyUpdate = (): void => {
  if (waiting && apply) void apply()
}

export const registerServiceWorker = (): void => {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
  void import('virtual:pwa-register').then(({ registerSW }) => {
    const update = registerSW({
      onNeedRefresh() {
        waiting = true
        emit()
      },
    })
    apply = () => update(true)
  })
}
