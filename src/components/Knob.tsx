import { CSSProperties, useId, useRef } from 'react'
import {
  dragKnobValue,
  keyKnobValue,
  knobAngle,
  KNOB_DEFAULT,
} from '../utils/knob'

interface KnobProps {
  label: string
  /** What is printed under the knob when it differs from the accessible name (VOL for Volume). */
  text?: string
  value: number
  /** Where a tap, Enter or Space puts the knob back (centre by default; VOL rests at its default volume). */
  resetTo?: number
  onChange: (value: number) => void
}

/** Horizontal-drag knob (slider semantics). Keyboard: arrows, Shift for big steps, Home/End. */
export const Knob = ({
  label,
  text,
  value,
  resetTo = KNOB_DEFAULT,
  onChange,
}: KnobProps) => {
  const hintId = useId()
  const dragRef = useRef<{
    x: number
    y: number
    value: number
    moved: boolean
  } | null>(null)

  return (
    <div className="knob-wrap">
      <div
        className="knob"
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-describedby={hintId}
        aria-keyshortcuts="Enter Space"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        aria-valuetext={`${Math.round(value)}%`}
        style={{ '--a': `${knobAngle(value)}deg` } as CSSProperties}
        onPointerDown={e => {
          if (e.button !== 0) return // primary button / touch / pen only
          e.currentTarget.setPointerCapture(e.pointerId)
          dragRef.current = { x: e.clientX, y: e.clientY, value, moved: false }
          e.preventDefault()
        }}
        onPointerMove={e => {
          const d = dragRef.current
          if (d) {
            if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5) d.moved = true
            if (d.moved) onChange(dragKnobValue(d.value, d.x, e.clientX))
          }
        }}
        onPointerUp={e => {
          const d = dragRef.current
          if (d) {
            const moved =
              d.moved || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5
            onChange(moved ? dragKnobValue(d.value, d.x, e.clientX) : resetTo)
          }
          dragRef.current = null
        }}
        onPointerCancel={() => {
          dragRef.current = null
        }}
        onLostPointerCapture={() => {
          dragRef.current = null
        }}
        onKeyDown={e => {
          const next =
            e.key === 'Enter' || e.key === ' '
              ? resetTo
              : keyKnobValue(value, e.key, e.shiftKey)
          if (next === null) return
          e.preventDefault()
          e.stopPropagation()
          onChange(next)
        }}
      >
        <i className="mark" />
      </div>
      <div className="label">{text ?? label}</div>
      <span id={hintId} className="knob-sr-only">
        Use arrow keys to adjust. Press Enter or Space to reset to centre.
      </span>
    </div>
  )
}
