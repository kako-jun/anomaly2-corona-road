import type { Anomaly, AnomalyCategory } from '../types/game'

/** True when the anomaly is drawn on this camera (its own, or one of the several a multi-camera glitch shows on). */
export const showsOnCamera = (a: Anomaly, cameraId: number): boolean =>
  a.cameraId === cameraId ||
  (a.feedGlitchCameraIds?.includes(cameraId) ?? false)

/**
 * Which running anomaly a report of `category` from `cameraId` is judged against (#77).
 *
 * An anomaly can be reported only if it is not reported yet and either its scope is `monitor` (the whole monitor is
 * wrong: any camera will do) or it sits on the watched camera (image, feed_glitch, sound). Among those, the one the
 * category is correct for is the `hit` (the watched camera's own first); no hit = a false report, and `shown` is the
 * anomaly the wrong feedback names (the watched camera's, else a monitor-wide one), or undefined when nothing could be
 * reported from here ("NO ANOMALY HERE"). The principle "a reported anomaly is cleared" is the caller's: it marks the
 * hit `detectedAt`, and everything drawn from the anomaly (overlay, glitch) goes away with it.
 */
export const reportTargetsFor = (
  anomalies: readonly Anomaly[],
  cameraId: number,
  category: AnomalyCategory
): { hit?: Anomaly; shown?: Anomaly } => {
  const open = anomalies.filter(a => !a.detectedAt)
  // The watched camera's own anomaly comes first, then monitor-wide ones.
  const candidates = [
    ...open.filter(a => a.scope !== 'monitor' && showsOnCamera(a, cameraId)),
    ...open.filter(a => a.scope === 'monitor'),
  ]
  const hit = candidates.find(a =>
    (a.categories ?? [a.category]).includes(category)
  )
  return { hit, shown: hit ?? candidates[0] }
}
