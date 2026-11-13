/**
 * Install suggestion (#388): when to offer "add to home screen", and the one place that holds the browser's
 * `beforeinstallprompt` event. Pure decision (`decideOffer`) + a tiny store. The dismissal time lives under its own
 * localStorage key, NOT in the save (docs/save-data.md): it is a fact about this browser, not about progress, so
 * ERASE ALL / START OVER keep it (erasing the game must not make the suggestion nag again), and a transfer code
 * neither carries it nor can break the save with it.
 */

export const DISMISS_KEY = 'corona-road:install-dismissed'
/** After "later", the suggestion stays away this long. */
export const DISMISS_DAYS = 7
export const DISMISS_MS = DISMISS_DAYS * 24 * 60 * 60 * 1000

/** What to show: the browser's own install prompt behind a button, or the manual iOS steps. */
export type Offer = 'native' | 'ios' | null

export interface OfferInput {
  /** At least one night has been played to its end (saved loops >= 1). */
  loops: number
  /** Already running as an installed app. */
  standalone: boolean
  /** Epoch ms of the last "later", or null. */
  dismissedAt: number | null
  now: number
  /** A `beforeinstallprompt` event is being held. */
  hasNativePrompt: boolean
  ios: boolean
}

export const decideOffer = (i: OfferInput): Offer => {
  if (i.loops < 1 || i.standalone) return null
  // A time in the future (clock changed, hand-edited) is not a dismissal: it would hide the suggestion for good.
  if (
    i.dismissedAt !== null &&
    i.dismissedAt <= i.now &&
    i.now - i.dismissedAt < DISMISS_MS
  )
    return null
  if (i.hasNativePrompt) return 'native'
  return i.ios ? 'ios' : null
}

/** iPhone / iPod / iPad (iPadOS 13+ says "Macintosh" but has a touch screen). They never fire `beforeinstallprompt`. */
export const isIos = (
  ua: string,
  platform: string,
  maxTouchPoints: number
): boolean =>
  /iPhone|iPod|iPad/.test(ua) || (platform === 'MacIntel' && maxTouchPoints > 1)

export const isStandalone = (): boolean => {
  if (typeof window === 'undefined') return false
  const nav = navigator as Navigator & { standalone?: boolean }
  return (
    nav.standalone === true ||
    (typeof window.matchMedia === 'function' &&
      window.matchMedia('(display-mode: standalone)').matches)
  )
}

export const readDismissedAt = (): number | null => {
  try {
    const raw = localStorage.getItem(DISMISS_KEY)
    const n = raw === null ? NaN : Number(raw)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

export const recordDismiss = (now: number = Date.now()): void => {
  try {
    localStorage.setItem(DISMISS_KEY, String(now))
  } catch {
    // Storage blocked: the suggestion may come back sooner. Nothing else depends on it.
  }
}

// --- the held event ---------------------------------------------------------------------------------------------

export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let held: BeforeInstallPromptEvent | null = null
const listeners = new Set<() => void>()
const emit = () => listeners.forEach(l => l())

export const subscribeInstall = (l: () => void): (() => void) => {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
export const hasNativePrompt = (): boolean => held !== null

/** Hold the browser's prompt (so it does not pop up by itself) until the right moment. Call once at start-up. */
export const initInstallPrompt = (): (() => void) => {
  const onBefore = (e: Event) => {
    e.preventDefault()
    held = e as BeforeInstallPromptEvent
    emit()
  }
  const onInstalled = () => {
    held = null
    emit()
  }
  window.addEventListener('beforeinstallprompt', onBefore)
  window.addEventListener('appinstalled', onInstalled)
  return () => {
    window.removeEventListener('beforeinstallprompt', onBefore)
    window.removeEventListener('appinstalled', onInstalled)
  }
}

/** Show the browser's install dialog. The event works once; a refusal there counts as "later". */
export const promptInstall = async (): Promise<void> => {
  const e = held
  if (!e) return
  held = null
  emit()
  try {
    await e.prompt()
    const { outcome } = await e.userChoice
    if (outcome === 'dismissed') recordDismiss()
  } catch {
    // The dialog could not open; nothing to record.
  }
}

/** Test helper. */
export const resetInstallPromptForTest = (): void => {
  held = null
  listeners.clear()
}
