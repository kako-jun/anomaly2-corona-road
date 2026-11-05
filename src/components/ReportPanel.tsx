import { RefObject, useEffect, useRef } from 'react'
import { AnomalyCategory } from '../types/game'
import { cx } from '../utils/cx'

const CATEGORIES: AnomalyCategory[] = [
  'Camera',
  'Object',
  'Environment',
  'Person',
  'Surreal',
]

/** One-line hint written on a note stuck under each category key (always visible). */
const CATEGORY_HINTS: Record<AnomalyCategory, string> = {
  Camera: 'the whole picture glitches',
  Object: 'a thing appears, vanishes or changes',
  Environment: 'light, or the floor, wall or ceiling surface',
  Person: 'a figure, shadow, hand or trace of someone',
  Surreal: 'something impossible',
}

interface ReportButtonProps {
  open: boolean
  buttonRef: RefObject<HTMLButtonElement>
  onToggle: () => void
}

/** The red REPORT key with its lamp (lit while the category picker is open). */
export const ReportButton = ({
  open,
  buttonRef,
  onToggle,
}: ReportButtonProps) => (
  <div className="row report">
    <div className="report-main">
      <div className={cx('lamp-big red', open && 'lit')} />
      <button
        ref={buttonRef}
        type="button"
        className={cx('key key-report', open && 'pressed')}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={onToggle}
      >
        REPORT
      </button>
    </div>
  </div>
)

interface ReportDialogProps {
  onSelect: (category: AnomalyCategory) => void
  onClose: () => void
}

/**
 * Anomaly category picker. Rendered only while open, and placed outside `.cabinet`
 * (the caller makes `.cabinet` inert meanwhile). Esc / backdrop / CANCEL close it.
 */
export const ReportDialog = ({ onSelect, onClose }: ReportDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const downOnScrimRef = useRef(false)

  useEffect(() => {
    dialogRef.current?.querySelector('button')?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const f = [...dialogRef.current.querySelectorAll('button')]
      const first = f[0]
      const last = f[f.length - 1]
      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="scrim"
      // Close only when both the press and the release happened on the backdrop itself.
      onPointerDown={e => {
        downOnScrimRef.current = e.target === e.currentTarget
      }}
      onClick={e => {
        if (e.target === e.currentTarget && downOnScrimRef.current) onClose()
        downOnScrimRef.current = false
      }}
    >
      <div
        className="dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dlgTitle"
      >
        <div className="label dlg-title" id="dlgTitle">
          SELECT CATEGORY
        </div>
        <div className="cat-grid">
          {CATEGORIES.map(category => (
            <div key={category} className="cat-item">
              <button
                type="button"
                className="key"
                aria-describedby={`catHint-${category}`}
                onClick={() => onSelect(category)}
              >
                {category.toUpperCase()}
              </button>
              <span className="cat-note" id={`catHint-${category}`}>
                {CATEGORY_HINTS[category]}
              </span>
            </div>
          ))}
          <div className="cat-item">
            <button type="button" className="key cancel" onClick={onClose}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
