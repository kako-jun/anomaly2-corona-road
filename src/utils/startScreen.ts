import { DEFAULT_CONFIG } from './gameConfig'
import type { Language } from './saveData'

/** 開始画面のお手つきランプの個数。許される誤報の回数と同数。 */
export const misreportLampCount = (
  maxMisreports: number = DEFAULT_CONFIG.maxMisreports
): number =>
  Number.isFinite(maxMisreports) ? Math.max(0, Math.floor(maxMisreports)) : 0

/** 開始画面の「お手つき」行に出す文言（例: 3回まで / Up to 3）。 */
export const misreportLimitText = (
  maxMisreports: number = DEFAULT_CONFIG.maxMisreports,
  language: Language = 'ja'
): string => {
  const n = misreportLampCount(maxMisreports)
  return language === 'en' ? `Up to ${n}` : `${n}回まで`
}
