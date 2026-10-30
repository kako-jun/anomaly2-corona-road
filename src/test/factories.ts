import { Anomaly, Camera, GameStats } from '../types/game'

export const makeStats = (over: Partial<GameStats> = {}): GameStats => ({
  currentTime: 0,
  correctReports: 0,
  misreports: 0,
  totalAnomalies: 0,
  detectedAnomalies: 0,
  ...over,
})

export const makeCameras = (count = 8, anomalyAt: number[] = []): Camera[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `CAM 0${i + 1}`,
    location: `Place ${i + 1}`,
    image: `/images/cam${i + 1}.webp`,
    hasAnomaly: anomalyAt.includes(i),
  }))

export const makeAnomaly = (over: Partial<Anomaly> = {}): Anomaly => ({
  id: 'a1',
  category: 'Object',
  cameraId: 1,
  description: 'something is off',
  phase: 'early',
  ...over,
})
