import { RefObject, useEffect, useRef, useState } from 'react'
import { AnomalyCategory } from '../types/game'
import { cx } from '../utils/cx'
import { currentLanguage, type Language } from '../utils/language'
import { reportNote } from '../data/reportNotes'

const CATEGORIES: AnomalyCategory[] = [
  'Camera',
  'Object',
  'Environment',
  'Person',
  'Surreal',
]

interface ReportButtonProps {
  open: boolean
  /** Many anomalies are unreported: the lamp blinks (never while the picker is open). */
  alert?: boolean
  /** The ending's virtual camera is on screen (#273): every lamp is off, never lit and never blinking. */
  lampsOff?: boolean
  /** The key caption: REPORT, or a misspelling while RT-UI-26 runs (the accessible name stays REPORT). */
  label?: string
  /** RT-RULE-02: the lamp is lit for a moment because a first press was taken in (the picker did not open). */
  flash?: boolean
  buttonRef: RefObject<HTMLButtonElement>
  onToggle: () => void
}

/**
 * The red REPORT key with its lamp: lit while the category picker is open, blinking while many
 * anomalies are unreported (#344). The lamp is decoration (`aria-hidden`); no caption explains it
 * (kako-jun: no guidance text).
 */
export const ReportButton = ({
  open,
  alert = false,
  lampsOff = false,
  label = 'REPORT',
  flash = false,
  buttonRef,
  onToggle,
}: ReportButtonProps) => (
  <div className="row report">
    <div className="report-main">
      <div
        className={cx(
          'lamp-big red',
          !lampsOff && (open || flash) && 'lit',
          !lampsOff && alert && !open && !flash && 'alert'
        )}
        aria-hidden="true"
      />
      <button
        ref={buttonRef}
        type="button"
        className={cx('key key-report', open && 'pressed')}
        aria-label="REPORT"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={onToggle}
      >
        {label}
      </button>
    </div>
  </div>
)

/**
 * The sticky note: a picture (#346). If the picture cannot be read (offline, 404) the same words are shown as plain
 * visible text on a paper-coloured box, never a broken-image icon. The words for assistive technology are the sr-only
 * span either way.
 */
const NoteImage = ({
  note,
  category,
}: {
  note: ReturnType<typeof reportNote>
  category: AnomalyCategory
}) => {
  const [failed, setFailed] = useState(false)
  return (
    <span className="cat-note">
      {failed ? (
        <span className="cat-note-text" aria-hidden="true">
          {note.lines.map(line => (
            <span key={line}>{line}</span>
          ))}
        </span>
      ) : (
        <img
          src={note.src}
          width={note.width}
          height={note.height}
          alt=""
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
      <span className="cat-sr-only" id={`catHint-${category}`}>
        {note.text}
      </span>
    </span>
  )
}

interface ReportDialogProps {
  /** The language of the notes (default: the browser's, decided once at start; the keys are always English). */
  language?: Language
  onSelect: (category: AnomalyCategory) => void
  onClose: () => void
}

/**
 * Anomaly category picker. Rendered only while open, and placed outside `.cabinet`
 * (the caller makes `.cabinet` inert meanwhile). Esc / backdrop / CANCEL close it.
 */
export const ReportDialog = ({
  language = currentLanguage(),
  onSelect,
  onClose,
}: ReportDialogProps) => {
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
          {CATEGORIES.map(category => {
            const note = reportNote(category, language)
            return (
              <div key={category} className="cat-item">
                <button
                  type="button"
                  className="key"
                  aria-describedby={`catHint-${category}`}
                  onClick={() => onSelect(category)}
                >
                  {category.toUpperCase()}
                </button>
                {/* The sticky note is a picture (#346); its words are read from the sr-only text. */}
                <NoteImage note={note} category={category} />
              </div>
            )
          })}
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
