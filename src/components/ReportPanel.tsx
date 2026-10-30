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

interface ReportButtonProps {
  open: boolean
  buttonRef: RefObject<HTMLButtonElement>
  onToggle: () => void
}

/** The red REPORT key with its lamp (lit while the type picker is open). */
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
 * Anomaly type picker. Rendered only while open, and placed outside `.cabinet`
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
          SELECT TYPE
        </div>
        <div className="cat-grid">
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              className="key"
              onClick={() => onSelect(category)}
            >
              {category.toUpperCase()}
            </button>
          ))}
          <button type="button" className="key cancel" onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}
