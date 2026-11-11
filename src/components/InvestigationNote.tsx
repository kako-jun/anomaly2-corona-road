import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { LABELS } from '../data/investigationNotes'
import type { NoteLang } from '../data/investigationNotes'
import type { NoteRow, NoteView } from '../utils/investigationNote'
import { TILT, tiltVars } from '../data/noteTilt'
import './investigationNote.css'

/** The paper is drawn at this fixed size and scaled to fit the screen, so it never scrolls. */
const PAPER_W = 340
const PAPER_H = 620
const MARGIN = 12

/** The scale that fits the paper into the window (both width and height), recomputed on resize. */
const fitScale = (winW: number, winH: number): number =>
  Math.max(0.1, Math.min((winW - MARGIN) / PAPER_W, (winH - MARGIN) / PAPER_H))

const useFitScale = (): number => {
  const [scale, setScale] = useState(() =>
    fitScale(window.innerWidth, window.innerHeight)
  )
  useEffect(() => {
    const onResize = () =>
      setScale(fitScale(window.innerWidth, window.innerHeight))
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return scale
}

/** Sketches of the four missing people (the detective's poor drawings), in frame order. */
const FOUND_SKETCH = [
  '/note/elder1.svg',
  '/note/elder2.svg',
  '/note/elder3.svg',
  '/note/child.svg',
]
const unknownSketch = (i: number) =>
  i === 3 ? '/note/unknown-last.svg' : '/note/unknown.svg'

const Rows = ({ rows }: { rows: NoteRow[] }) => (
  <>
    {rows.map(r => (
      <div className="note-fr" key={r.label}>
        <span className="note-fl">{r.label}</span>
        {r.value === null ? <span className="note-blank" /> : <b>{r.value}</b>}
        <small>{r.unit}</small>
      </div>
    ))}
  </>
)

interface InvestigationNoteProps {
  view: NoteView
  onAction: () => void
  /** The key's label (default: START SHIFT before a night, ONE MORE SHIFT after it). */
  actionLabel?: string
  /** The key is waiting (assets loading): it shows the loading label and cannot be pressed. */
  busy?: boolean
}

/**
 * The detective's investigation note (#297). One paper for both the start of a night and its end: only the
 * stamps, the synopsis, the scribbles and the numbers change (see `buildNote`). The body text is real text in
 * a handwriting-style font; ruled lines, frames and the paper are CSS; only the sketches are images.
 */
export const InvestigationNote = ({
  view,
  onAction,
  actionLabel,
  busy = false,
}: InvestigationNoteProps) => {
  const scale = useFitScale()
  const lang: NoteLang = view.lang
  const label = busy
    ? LABELS.btnLoading[lang]
    : (actionLabel ??
      (view.mode === 'before' ? LABELS.btnStart[lang] : LABELS.btnAgain[lang]))
  return (
    <main
      className={[
        'note-screen',
        `note-${lang}`,
        `note-${view.mode}`,
        view.doodle ? 'note-first' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      lang={lang}
      style={tiltVars() as CSSProperties}
    >
      <div
        className="note-fit"
        style={{ width: PAPER_W * scale, height: PAPER_H * scale }}
      >
        <article
          className="note-paper"
          aria-label={view.summary}
          style={{ transform: `scale(${scale})` }}
        >
          <div className="note-hdr" aria-hidden="true">
            <h1>{LABELS.title[lang]}</h1>
            <div className="note-night note-hw">{view.night}</div>
          </div>
          <div className="note-stamps" aria-hidden="true">
            {view.stamps.map(s => (
              <span
                key={s.text}
                className={s.big ? 'note-stamp note-big' : 'note-stamp'}
              >
                {s.text}
              </span>
            ))}
          </div>
          <div className="note-board">
            {view.slots.map((s, i) => (
              <div className="note-slot" key={s.label}>
                <img
                  src={s.found ? FOUND_SKETCH[i] : unknownSketch(i)}
                  width={68}
                  height={68}
                  alt={s.alt}
                />
                <span
                  className="note-slot-l"
                  style={{ transform: `rotate(${TILT.label[i]}deg)` }}
                >
                  {s.label}
                </span>
                {s.isNew && (
                  <span className="note-slot-new">{LABELS.slotNew[lang]}</span>
                )}
              </div>
            ))}
          </div>
          <div className="note-notes">
            <div className="note-syn">
              {view.lines.map(l => (
                <p key={l.text}>{l.text}</p>
              ))}
            </div>
            <div className="note-scrib note-hw">
              {view.scrib.map(s => (
                <p key={s}>{s}</p>
              ))}
            </div>
            {view.doodle && (
              <img
                className="note-doodle"
                src="/note/corridor.svg"
                width={100}
                height={67}
                alt=""
              />
            )}
          </div>
          <div className="note-form note-hw">
            <div className="note-fcols">
              <div className="note-fcol">
                <div className="note-fh">{view.left.head}</div>
                <Rows rows={view.left.rows} />
              </div>
              <div className="note-fcol">
                <div className="note-fh">{view.right.head}</div>
                <Rows rows={view.right.rows} />
              </div>
            </div>
            <div className="note-fshift">
              <Rows rows={[view.shiftRow]} />
            </div>
          </div>
          <button
            type="button"
            className="note-btn"
            onClick={onAction}
            disabled={busy}
          >
            {label}
          </button>
        </article>
      </div>
    </main>
  )
}
