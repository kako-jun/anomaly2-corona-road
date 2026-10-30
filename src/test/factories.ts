import { Anomaly, Camera, GameStats } from '../types/game'

export const makeStats = (over: Partial<GameStats> = {}): GameStats => ({
  currentTime: 0,
  correctReports: 0,
  misreports: 0,
  totalAnomalies: 0,
  detectedAnomalies: 0,
  ...over,
})

export const makeCameras = (count = 8): Camera[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `CAM 0${i + 1}`,
    location: `Place ${i + 1}`,
    image: `/images/cam${i + 1}.webp`,
  }))

export const makeAnomaly = (over: Partial<Anomaly> = {}): Anomaly => ({
  id: 'a1',
  category: 'Object',
  cameraId: 1,
  phase: 'early',
  overlay: {
    url: '/overlay.webp',
    origin: { x: 10, y: 20 },
    size: { w: 30, h: 40 },
  },
  ...over,
})
