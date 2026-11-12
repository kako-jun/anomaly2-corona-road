import { ALERT_UNREPORTED_MIN } from './gameConfig'

/** Whether the REPORT lamp should blink: only the count says so, never which camera (#344). */
export const shouldAlert = (
  unreportedCount: number,
  min: number = ALERT_UNREPORTED_MIN
): boolean => unreportedCount >= min
