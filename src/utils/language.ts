import { useEffect, useState } from 'react'
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

/**
 * The language in use, decided from the browser at every start and never saved (#292): the first of
 * `navigator.languages` (else `navigator.language`) says ja -> ja, anything else -> en. A language
 * saved in an old save's `settings.language` is read by the save code but not used here.
 */
export const currentLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'en'
  const list = navigator.languages
  return languageFromBrowser(
    list && list.length > 0 ? list : navigator.language
  )
}

/** The language, read once when the app starts. The page's `lang` follows so assistive technology reads the notes in the right language. */
export const useLanguage = (): Language => {
  const [language] = useState<Language>(currentLanguage)
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])
  return language
}
