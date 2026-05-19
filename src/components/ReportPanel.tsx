import { useState } from 'react'
import { AnomalyCategory } from '../types/game'

interface ReportPanelProps {
  onReport: (category: AnomalyCategory) => void
}

const CATEGORIES: { category: AnomalyCategory; icon: string }[] = [
  { category: 'Camera', icon: '📹' },
  { category: 'Object', icon: '📦' },
  { category: 'Environment', icon: '🌆' },
  { category: 'Person', icon: '🚶' },
  { category: 'Surreal', icon: '👁️' },
]

export const ReportPanel = ({ onReport }: ReportPanelProps) => {
  const [expanded, setExpanded] = useState(false)

  const handleReport = (category: AnomalyCategory) => {
    onReport(category)
    setExpanded(false)
  }

  if (!expanded) {
    return (
      <div className="report">
        <button
          type="button"
          className="btn btn--outlined-danger btn--block"
          onClick={() => setExpanded(true)}
        >
          ⚠ REPORT ANOMALY
        </button>
      </div>
    )
  }

  return (
    <div className="report">
      <div className="report__title">SELECT ANOMALY TYPE</div>
      <div className="report__grid">
        {CATEGORIES.map(({ category, icon }) => (
          <button
            key={category}
            type="button"
            className={`report__category report__category--${category}`}
            onClick={() => handleReport(category)}
          >
            <span className="report__category-icon">{icon}</span>
            <span>{category.toUpperCase()}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn--ghost btn--block mt-3"
        onClick={() => setExpanded(false)}
      >
        CANCEL
      </button>
    </div>
  )
}
