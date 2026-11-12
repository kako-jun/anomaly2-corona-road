// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  DISMISS_KEY,
  DISMISS_MS,
  decideOffer,
  hasNativePrompt,
  initInstallPrompt,
  isIos,
  isStandalone,
  promptInstall,
  readDismissedAt,
  recordDismiss,
  resetInstallPromptForTest,
} from './installPrompt'
import type { OfferInput } from './installPrompt'

const NOW = 1_800_000_000_000
const base: OfferInput = {
  loops: 1,
  titleSettled: true,
  standalone: false,
  dismissedAt: null,
  now: NOW,
  hasNativePrompt: true,
  ios: false,
}

describe('decideOffer (#388)', () => {
  it('offers the native prompt after the first night, once the title has settled', () => {
    expect(decideOffer(base)).toBe('native')
  })
  it('never before a night has ended (loops 0)', () => {
    expect(decideOffer({ ...base, loops: 0 })).toBeNull()
  })
  it('never the instant the title appears: it waits until the title has settled', () => {
    expect(decideOffer({ ...base, titleSettled: false })).toBeNull()
    expect(
      decideOffer({
        ...base,
        titleSettled: false,
        hasNativePrompt: false,
        ios: true,
      })
    ).toBeNull()
  })
  it('never when already installed (standalone)', () => {
    expect(decideOffer({ ...base, standalone: true })).toBeNull()
    expect(
      decideOffer({
        ...base,
        standalone: true,
        hasNativePrompt: false,
        ios: true,
      })
    ).toBeNull()
  })
  it('stays away for 7 days after LATER, and comes back on day 7', () => {
    expect(decideOffer({ ...base, dismissedAt: NOW - 1000 })).toBeNull()
    expect(
      decideOffer({ ...base, dismissedAt: NOW - DISMISS_MS + 1 })
    ).toBeNull()
    expect(decideOffer({ ...base, dismissedAt: NOW - DISMISS_MS })).toBe(
      'native'
    )
    expect(DISMISS_MS).toBe(7 * 24 * 60 * 60 * 1000)
  })
  it('a dismissal time in the future does not hide it for good', () => {
    expect(decideOffer({ ...base, dismissedAt: NOW + DISMISS_MS })).toBe(
      'native'
    )
  })
  it('iOS (no beforeinstallprompt) gets the manual steps, at the same moment', () => {
    const ios = { ...base, hasNativePrompt: false, ios: true }
    expect(decideOffer(ios)).toBe('ios')
    expect(decideOffer({ ...ios, loops: 0 })).toBeNull()
    expect(decideOffer({ ...ios, dismissedAt: NOW - 1000 })).toBeNull()
  })
  it('nothing to offer on a browser with neither (desktop Safari, Firefox)', () => {
    expect(decideOffer({ ...base, hasNativePrompt: false })).toBeNull()
  })
})

describe('isIos', () => {
  it('knows iPhone, iPad and iPadOS posing as a Mac, not a Mac or Android', () => {
    expect(
      isIos(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
        'iPhone',
        5
      )
    ).toBe(true)
    expect(
      isIos('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'MacIntel', 5)
    ).toBe(true)
    expect(
      isIos('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'MacIntel', 0)
    ).toBe(false)
    expect(isIos('Mozilla/5.0 (Linux; Android 14)', 'Linux armv8l', 5)).toBe(
      false
    )
  })
})

describe('isStandalone', () => {
  afterEach(() => vi.unstubAllGlobals())
  it('reads display-mode: standalone and navigator.standalone', () => {
    const mm = (matches: boolean) =>
      vi.stubGlobal('matchMedia', (q: string) => ({
        matches: matches && q === '(display-mode: standalone)',
      }))
    mm(false)
    expect(isStandalone()).toBe(false)
    mm(true)
    expect(isStandalone()).toBe(true)
    mm(false)
    Object.defineProperty(navigator, 'standalone', {
      value: true,
      configurable: true,
    })
    expect(isStandalone()).toBe(true)
    Reflect.deleteProperty(navigator, 'standalone')
  })
})

describe('the dismissal time', () => {
  beforeEach(() => localStorage.clear())
  it('lives under its own key, not in the save', () => {
    expect(DISMISS_KEY).not.toBe('corona-road:save')
    expect(readDismissedAt()).toBeNull()
    recordDismiss(123)
    expect(localStorage.getItem(DISMISS_KEY)).toBe('123')
    expect(readDismissedAt()).toBe(123)
  })
  it('ignores garbage and survives blocked storage', () => {
    localStorage.setItem(DISMISS_KEY, 'soon')
    expect(readDismissedAt()).toBeNull()
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(readDismissedAt()).toBeNull()
    expect(() => recordDismiss(1)).not.toThrow()
  })
})

describe('the held beforeinstallprompt event', () => {
  let stop: () => void
  beforeEach(() => {
    localStorage.clear()
    resetInstallPromptForTest()
    stop = initInstallPrompt()
  })
  afterEach(() => stop())

  const fire = (outcome: 'accepted' | 'dismissed') => {
    const e = Object.assign(
      new Event('beforeinstallprompt', { cancelable: true }),
      {
        prompt: vi.fn(async () => {}),
        userChoice: Promise.resolve({ outcome }),
      }
    )
    window.dispatchEvent(e)
    return e
  }

  it('holds it and stops the browser from showing its own', () => {
    expect(hasNativePrompt()).toBe(false)
    const e = fire('accepted')
    expect(e.defaultPrevented).toBe(true)
    expect(hasNativePrompt()).toBe(true)
    expect(e.prompt).not.toHaveBeenCalled()
  })
  it('ADD shows the dialog once; accepting records nothing', async () => {
    const e = fire('accepted')
    await promptInstall()
    expect(e.prompt).toHaveBeenCalledTimes(1)
    expect(hasNativePrompt()).toBe(false)
    expect(readDismissedAt()).toBeNull()
  })
  it('refusing the browser dialog counts as LATER', async () => {
    fire('dismissed')
    await promptInstall()
    expect(readDismissedAt()).not.toBeNull()
  })
  it('appinstalled drops it', () => {
    fire('accepted')
    window.dispatchEvent(new Event('appinstalled'))
    expect(hasNativePrompt()).toBe(false)
  })
})
