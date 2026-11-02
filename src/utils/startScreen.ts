import { DEFAULT_CONFIG } from './gameConfig'

/** 開始画面のお手つきランプの個数。許される誤報の回数と同数。 */
export const misreportLampCount = (
  maxMisreports: number = DEFAULT_CONFIG.maxMisreports
): number => Math.max(0, Math.floor(maxMisreports))

/** 開始画面の「お手つき」行に出す文言（例: 3回まで）。 */
export const misreportLimitText = (
  maxMisreports: number = DEFAULT_CONFIG.maxMisreports
): string => `${misreportLampCount(maxMisreports)}回まで`
