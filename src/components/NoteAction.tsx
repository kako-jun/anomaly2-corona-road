/**
 * The action at the bottom of the investigation note (#297): not a key but the detective's own handwriting in
 * red ballpoint: the words, a hand-drawn underline and an arrow to the right. A real <button> (so keyboard and
 * screen readers work, with the words as its name); only what it looks like is paper. The strokes are static SVGs
 * with fixed numbers (no randomness) and aria-hidden. The underline is a thin quad that thickens to the right with
 * its ends sticking out, like the hand-ruled frames (noteFrames.ts); the focus ring is a hand-drawn loop.
 */
interface NoteActionProps {
  label: string
  onClick: () => void
  busy: boolean
}

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
        className="note-act-under"
        viewBox="0 0 100 7"
        preserveAspectRatio="none"
        height="7"
        aria-hidden="true"
      >
        <polygon
          points="0,3.4 35,2.9 100,1.6 101,4.6 62,4.3 0,4.5"
          fill="currentColor"
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
    <svg
      className="note-act-focus"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M8 6 C30 1 80 0 96 8 C102 18 99 30 90 35 C60 41 20 40 6 33 C-1 24 2 12 14 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </button>
)
