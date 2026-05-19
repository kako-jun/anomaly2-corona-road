import { Camera } from '../types/game'

interface CameraStripProps {
  cameras: Camera[]
  currentIndex: number
  onSelect: (index: number) => void
}

export const CameraStrip = ({
  cameras,
  currentIndex,
  onSelect,
}: CameraStripProps) => (
  <div className="strip" role="tablist" aria-label="Camera selector">
    {cameras.map((cam, i) => (
      <button
        key={cam.id}
        type="button"
        role="tab"
        aria-selected={i === currentIndex}
        className={`strip__tile ${i === currentIndex ? 'strip__tile--active' : ''}`}
        onClick={() => onSelect(i)}
        title={`${cam.name} — ${cam.location}`}
      >
        <span>{cam.id.toString().padStart(2, '0')}</span>
        {cam.hasAnomaly && (
          <span className="strip__tile-dot" aria-label="Anomaly active" />
        )}
      </button>
    ))}
  </div>
)
