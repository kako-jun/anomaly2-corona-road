import { useCallback, useEffect, useState } from 'react'
import { load, update } from './saveData'
import type { Language } from './saveData'

export type { Language }
export const LANGUAGES: readonly Language[] = ['ja', 'en']

/** The browser's language as ja or en: Japanese when it says so (ja, ja-JP...), English for everything else. */
export const languageFromBrowser = (
  browser: string | readonly string[] | undefined
): Language => {
  const first = Array.isArray(browser) ? browser[0] : browser
  return typeof first === 'string' && /^ja(\b|-|_|$)/i.test(first.trim())
    ? 'ja'
    : 'en'
}

/** The language in use: the saved choice (settings.language), else the browser's. */
export const currentLanguage = (): Language =>
  load().settings?.language ??
  languageFromBrowser(
    typeof navigator === 'undefined' ? undefined : navigator.language
  )

/** Remember the choice in the save settings (the rest of the settings are kept). */
export const saveLanguage = (language: Language): void => {
  update(cur => ({ ...cur, settings: { ...cur.settings, language } }))
}

/**
 * The language and its setter. Choosing re-renders at once and is saved; another tab's change is
 * picked up on the next render of the caller (App re-reads the save on `storage`). The page's `lang`
 * follows so assistive technology reads the notes in the right language.
 */
export const useLanguage = (): [Language, (l: Language) => void] => {
  const [language, setState] = useState<Language>(currentLanguage)
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])
  const setLanguage = useCallback((l: Language) => {
    saveLanguage(l)
    setState(l)
  }, [])
  return [language, setLanguage]
}
