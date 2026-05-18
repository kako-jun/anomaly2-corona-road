import { Camera } from '../types/game'

interface CameraViewProps {
  camera: Camera
  onSwipe: (direction: 'next' | 'prev') => void
}

export const CameraView = ({ camera, onSwipe }: CameraViewProps) => {
  let touchStartX = 0

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        onSwipe('next')
      } else {
        onSwipe('prev')
      }
    }
  }

  return (
    <div
      className="camera-view relative h-[60vh] w-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Camera feed image */}
      <div
        className="h-full w-full bg-black bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${camera.image})`,
          filter: 'saturate(0.6) contrast(0.95) brightness(0.85)',
        }}
      />

      {/* Bottom info bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-3 font-mono text-xs text-green-400">
        <div>
          <div className="text-green-500">[{camera.name}]</div>
          <div className="opacity-80">{camera.location}</div>
        </div>
        <div className="opacity-60">SWIPE ⇄</div>
      </div>

      {camera.hasAnomaly && (
        <div className="pointer-events-none absolute top-3 right-3 animate-pulse font-mono text-xs text-red-500">
          ⚠ ANOMALY
        </div>
      )}

      {/* Scanlines effect for retro feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.3) 2px, rgba(0,255,0,0.3) 4px)',
        }}
      />

      {/* Vignette */}
      <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-transparent via-transparent to-black opacity-40" />

      {/* Camera info overlay */}
      <div className="absolute top-4 left-4 font-mono text-xs text-green-500 opacity-80">
        <div>REC ●</div>
      </div>
    </div>
  )
}
