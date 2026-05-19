import { GameConfig, Camera } from '../types/game'

export const DEFAULT_CONFIG: GameConfig = {
  totalDurationMs: 360_000, // 6 minutes
  firstAnomalyDelayMs: 12_000, // first anomaly within 12 s — no dead opening
  anomalyIntervalMs: 30_000, // 30 s between spawns
  maxConcurrentAnomalies: 2,
  maxMisreports: 3,
  minCorrectReports: 4,
}

export const CAMERAS: Camera[] = [
  {
    id: 1,
    name: 'CAM 01',
    location: 'North Entrance',
    image: '/images/cam1.webp',
    hasAnomaly: false,
  },
  {
    id: 2,
    name: 'CAM 02',
    location: 'Main Corridor',
    image: '/images/cam2.webp',
    hasAnomaly: false,
  },
  {
    id: 3,
    name: 'CAM 03',
    location: 'South Exit',
    image: '/images/cam3.webp',
    hasAnomaly: false,
  },
  {
    id: 4,
    name: 'CAM 04',
    location: 'Underground Junction',
    image: '/images/cam4.webp',
    hasAnomaly: false,
  },
  {
    id: 5,
    name: 'CAM 05',
    location: 'Emergency Stairwell',
    image: '/images/cam5.webp',
    hasAnomaly: false,
  },
  {
    id: 6,
    name: 'CAM 06',
    location: 'Shop Front Row',
    image: '/images/cam6.webp',
    hasAnomaly: false,
  },
  {
    id: 7,
    name: 'CAM 07',
    location: 'Maintenance Corridor',
    image: '/images/cam7.webp',
    hasAnomaly: false,
  },
  {
    id: 8,
    name: 'CAM 08',
    location: 'Security Office',
    image: '/images/cam8.webp',
    hasAnomaly: false,
  },
]

// 1 real minute = 1 in-game hour. 6 real minutes -> 00:00 → 06:00.
export const msToGameTime = (ms: number): string => {
  const totalMinutes = Math.floor(ms / 60_000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

export const getGamePhase = (ms: number): 'early' | 'mid' | 'late' => {
  if (ms < 120_000) return 'early'
  if (ms < 240_000) return 'mid'
  return 'late'
}
