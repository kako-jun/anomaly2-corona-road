// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { currentLanguage, languageFromBrowser } from './language'

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

describe('currentLanguage (decided from the browser at every start, never saved)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    localStorage.clear()
  })
  it('uses the first of navigator.languages, ahead of navigator.language', () => {
    vi.stubGlobal('navigator', {
      languages: ['ja-JP', 'en'],
      language: 'en-US',
    })
    expect(currentLanguage()).toBe('ja')
    vi.stubGlobal('navigator', { languages: ['en-GB', 'ja'], language: 'ja' })
    expect(currentLanguage()).toBe('en')
  })
  it('falls back to navigator.language when there is no list', () => {
    vi.stubGlobal('navigator', { language: 'ja' })
    expect(currentLanguage()).toBe('ja')
    vi.stubGlobal('navigator', { languages: [], language: 'fr' })
    expect(currentLanguage()).toBe('en')
  })
  it('ignores an old save that has settings.language, and writes nothing', () => {
    vi.stubGlobal('navigator', { languages: ['en-US'], language: 'en-US' })
    const save = JSON.stringify({
      v: 1,
      foundTotal: 0,
      foundIds: [],
      loops: 0,
      flags: {},
      usedLines: {},
      usedChatter: [],
      pendingStories: [],
      endingReached: false,
      epoch: 0,
      settings: { language: 'ja' },
    })
    localStorage.setItem('corona-road:save', save)
    expect(currentLanguage()).toBe('en')
    expect(localStorage.getItem('corona-road:save')).toBe(save)
  })
})
