/**
 * The action at the bottom of the investigation note (#297): not a key but the detective's own handwriting in
 * blue ballpoint: the words circled by hand, and a hand-drawn arrow to the right of the circle. A real <button>
 * (so keyboard and screen readers work, with the words as its name); only what it looks like is paper. The
 * strokes are static SVGs with fixed numbers (no randomness) and aria-hidden. The circle is one tilted loop that
 * runs past its start (it never closes), drawn with an uneven pressure (a second, heavier pass over one stretch);
 * keyboard focus adds a second loop outside it.
 */
interface NoteActionProps {
  label: string
  onClick: () => void
  busy: boolean
}

const LOOP =
  'M17 8 C40 1 78 2 94 12 C101 20 92 33 62 37 C36 40 8 35 4 22 C1 12 14 7 30 5'

export const NoteAction = ({ label, onClick, busy }: NoteActionProps) => (
  <button
    type="button"
    className="note-btn note-hw"
    aria-label={label}
    onClick={onClick}
    disabled={busy}
  >
    <span className="note-act-text">
      {label}
      <svg
        className="note-act-ring"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        >
          <path d={LOOP} className="note-act-loop" />
          <path
            d="M94 12 C101 20 92 33 62 37 C44 39 30 39 18 36"
            className="note-act-loop note-act-heavy"
          />
        </g>
      </svg>
      <svg
        className="note-act-focus"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M10 2 C34 -1 82 -1 97 7 C103 17 99 31 90 36 C62 41 20 40 6 34 C-1 25 0 11 14 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
    <svg
      className="note-act-arrow"
      viewBox="0 0 40 20"
      width="38"
      height="19"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 11.5 C12 9.6 24 10.8 35 9.6" />
        <path d="M27 3.2 C31 6 34 8 36 9.6 C33 12 30 15 26 17.6" />
        <path d="M5 12.6 C14 11 24 12 31 11" strokeWidth="1" opacity="0.45" />
      </g>
    </svg>
  </button>
)
