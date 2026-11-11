import { describe, expect, it, vi } from 'vitest'
import { languageFromBrowser } from './language'

describe('languageFromBrowser', () => {
  it.each([
    ['ja', 'ja'],
    ['ja-JP', 'ja'],
    ['JA-jp', 'ja'],
    ['en-US', 'en'],
    ['de', 'en'],
    ['jaa', 'en'],
    ['zh-CN', 'en'],
    ['', 'en'],
    [undefined, 'en'],
  ])('%s -> %s', (nav, lang) => expect(languageFromBrowser(nav)).toBe(lang))
  it('uses the first of a list', () => {
    expect(languageFromBrowser(['ja-JP', 'en'])).toBe('ja')
    expect(languageFromBrowser(['en', 'ja'])).toBe('en')
  })
})

describe('saved language', () => {
  const fresh = async (browser: string) => {
    vi.resetModules()
    const store = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    })
    vi.stubGlobal('navigator', { language: browser })
    return import('./language')
  }
  it('follows the browser until a choice is saved, then the choice', async () => {
    const m = await fresh('ja-JP')
    expect(m.currentLanguage()).toBe('ja')
    m.saveLanguage('en')
    expect(m.currentLanguage()).toBe('en')
  })
  it('a saved choice beats the browser, and survives a reload (a new module over the same storage)', async () => {
    const m = await fresh('en-US')
    m.saveLanguage('ja')
    const raw = localStorage.getItem('corona-road:save')
    vi.resetModules()
    vi.stubGlobal('localStorage', {
      getItem: () => raw,
      setItem: () => {},
      removeItem: () => {},
    })
    const again = await import('./language')
    expect(again.currentLanguage()).toBe('ja')
  })
  it('keeps the other settings when the language is saved', async () => {
    const m = await fresh('en')
    const { update, load } = await import('./saveData')
    update(c => ({ ...c, settings: { brightness: 7 } }))
    m.saveLanguage('ja')
    expect(load().settings).toEqual({ brightness: 7, language: 'ja' })
  })
})
