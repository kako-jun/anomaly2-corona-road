import { useEffect, useRef, useState } from 'react'
import { DIALOGUE } from '../data/dialogue'
import {
  SUBTITLE_GAP_MS,
  SubtitleCursor,
  hintGroups,
  nextSubtitle,
  normalLines,
  queueHint,
  subtitleHoldMs,
} from '../utils/subtitle'

const NORMAL = normalLines(DIALOGUE)
const HINTS = hintGroups(DIALOGUE)

/**
 * Movie-style subtitles: one line at a time, looping. A false report
 * (`wrongFeedbackId` changes) queues the next hint lines and shows them next.
 * The timers keep running in a hidden tab, same as the in-game clock (intended).
 */
export const useSubtitle = (wrongFeedbackId: number | null) => {
  const [text, setText] = useState('')
  const [visible, setVisible] = useState(false)
  const cursorRef = useRef<SubtitleCursor>({ index: 0, pending: [] })
  const hintIndexRef = useRef(0)
  const handledRef = useRef<number | null>(null)
  const showTimerRef = useRef(0)
  const nextTimerRef = useRef(0)
  const showNextRef = useRef<() => void>(() => {})

  useEffect(() => {
    const showNext = () => {
      window.clearTimeout(showTimerRef.current)
      window.clearTimeout(nextTimerRef.current)
      const next = nextSubtitle(NORMAL, cursorRef.current)
      cursorRef.current = next.cursor
      setVisible(false)
      showTimerRef.current = window.setTimeout(() => {
        setText(next.text)
        setVisible(true)
      }, SUBTITLE_GAP_MS)
      nextTimerRef.current = window.setTimeout(
        showNext,
        subtitleHoldMs(next.text) + SUBTITLE_GAP_MS
      )
    }
    showNextRef.current = showNext
    showNext()
    return () => {
      window.clearTimeout(showTimerRef.current)
      window.clearTimeout(nextTimerRef.current)
      // Idempotent under StrictMode's dev double-run: the first line is not skipped.
      cursorRef.current = { index: 0, pending: [] }
    }
  }, [])

  useEffect(() => {
    if (wrongFeedbackId === null || handledRef.current === wrongFeedbackId)
      return
    handledRef.current = wrongFeedbackId
    const queued = queueHint(HINTS, cursorRef.current, hintIndexRef.current)
    cursorRef.current = queued.cursor
    hintIndexRef.current = queued.hintIndex
    showNextRef.current()
  }, [wrongFeedbackId])

  return { text, visible }
}
