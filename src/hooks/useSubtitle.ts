import { useEffect, useRef, useState } from 'react'
import ledger from 'virtual:dialogue'
import type { MidpointStage, Tone } from '../utils/dialogueLedger'
import type { SelectedSource } from '../utils/dialogueEngine'
import {
  LastShown,
  UsedState,
  applyUsed,
  midpointStage,
  pickClosing,
  pickOpening,
  selectNext,
  storyFlagNames,
} from '../utils/dialogueEngine'
import { DIALOGUE_CONFIG } from '../utils/gameConfig'
import { load, update } from '../utils/saveData'
import { SUBTITLE_GAP_MS, subtitleHoldMs } from '../utils/subtitle'

/** A flag-raise event from the game state (`seq` is new for every event). */
export interface FlagEvent {
  seq: number
  flags: string[]
}

export interface SubtitleInput {
  /** Changes on every false report (null = none). */
  wrongFeedbackId: number | null
  /** Anomaly on the watched camera at the time of that false report (null = none). */
  wrongAnomalyId: string | null
  /** Play time in ms (the midpoint comment is due at `midpointAtSec`). */
  elapsedMs: number
  /** Correct reports so far this play (picks the midpoint stage). */
  foundThisPlay: number
  /** Flags that just rose; their story conversation cuts in after the line on screen. */
  flagEvent: FlagEvent | null
  /** Set when the shift is over: the closing conversation plays, then `onClosingDone` runs. */
  ending: 'dawn' | 'withdraw' | null
  onClosingDone: () => void
}

type Phase = 'pre' | 'talking' | 'silent'
/** Retry interval while the chatter gate holds chatter back. */
const GATE_RETRY_MS = 1000

interface Machine {
  falseReport: (anomalyId: string | null) => void
  flags: (names: string[]) => void
  checkMidpoint: (elapsedMs: number, found: number) => void
  end: (result: 'dawn' | 'withdraw') => void
}

const storyFlags = storyFlagNames(ledger)

/** Where a conversation came from (what to settle once its first line is on screen). */
interface PlayMeta {
  source?: SelectedSource
  flag?: string
}

/**
 * Movie-style subtitles driven by the dialogue ledger: one line at a time, a conversation of 2-4
 * lines, then a silence. Priority at each pick: flag story > false report > midpoint > chatter
 * (`selectNext`). A false report cuts in at once; a raised flag cuts in after the line on screen
 * (the rest of the interrupted conversation is dropped); the midpoint comment waits for the next
 * pick. A story conversation is not cut by a false report or a flag; what it displaces waits. A
 * conversation counts as used (and a story as played, a midpoint as done) when its first line is
 * on screen, not before. The timers keep running in a hidden tab, same as the in-game clock (intended).
 */
export const useSubtitle = (input: SubtitleInput) => {
  const [view, setView] = useState({ text: '', visible: false })
  const inputRef = useRef(input)
  const machineRef = useRef<Machine | null>(null)
  const handledWrongRef = useRef<number | null>(null)
  const handledFlagRef = useRef<number | null>(null)

  useEffect(() => {
    inputRef.current = input
  })

  useEffect(() => {
    const cfg = DIALOGUE_CONFIG
    let timer = 0
    let phase: Phase = 'pre'
    let lines: string[] = []
    let tone: Tone = 'light'
    let closing = false
    let last: LastShown | null = null
    const saved = load()
    let used: UsedState = {
      usedLines: saved.usedLines,
      usedChatter: saved.usedChatter,
    }
    // Raised flags whose story has not played yet, including those carried over from an earlier shift.
    const pendingFlags: string[] = saved.pendingStories.filter(f =>
      storyFlags.has(f)
    )
    let playingStory = false
    // Flags already waiting when the opening starts: the opening is not cut for them; their story follows it.
    let heldFlags: string[] = []
    // The drawn conversation's used state, saved when its first line shows.
    let candidate: { prev: UsedState; next: UsedState; meta: PlayMeta } | null =
      null
    let pendingFalse: { anomalyId: string | null } | null = null
    let pendingMidpoint: MidpointStage | null = null
    let midpointDone = false

    const later = (fn: () => void, ms: number) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(fn, ms)
    }
    const hide = () => setView(v => ({ ...v, visible: false }))

    const endConversation = () => {
      hide()
      last = { tone, endedAtMs: Date.now() }
      if (closing) {
        later(() => inputRef.current.onClosingDone(), SUBTITLE_GAP_MS)
        return
      }
      phase = 'silent'
      playingStory = false
      heldFlags = []
      // A raised flag or a false report that waited does not wait out the silence.
      later(
        selectAndPlay,
        pendingFlags.length > 0 || pendingFalse
          ? SUBTITLE_GAP_MS
          : cfg.chatterIntervalMs
      )
    }

    const showLine = () => {
      // Line boundary: a raised flag cuts in here.
      if (
        !closing &&
        !playingStory &&
        pendingFlags.some(f => !heldFlags.includes(f))
      )
        lines = []
      const text = lines.shift()
      if (text === undefined) {
        endConversation()
        return
      }
      hide()
      later(() => {
        commit()
        setView({ text, visible: true })
        later(showLine, subtitleHoldMs(text))
      }, SUBTITLE_GAP_MS)
    }

    /** The first line is on screen: now the conversation is used up (saved), a story played, a midpoint done. */
    const commit = () => {
      if (!candidate) return
      const { prev, next, meta } = candidate
      candidate = null
      const saved = update(cur => {
        const merged = applyUsed(cur, prev, next)
        return {
          ...cur,
          ...merged,
          pendingStories:
            meta.flag === undefined
              ? cur.pendingStories
              : cur.pendingStories.filter(f => f !== meta.flag),
        }
      })
      used = { usedLines: saved.usedLines, usedChatter: saved.usedChatter }
      if (meta.flag !== undefined) {
        const i = pendingFlags.indexOf(meta.flag)
        if (i >= 0) pendingFlags.splice(i, 1)
      }
      if (meta.source === 'midpoint') {
        midpointDone = true
        pendingMidpoint = null
      }
    }

    const play = (
      entry: { tone: Tone; lines: { text: string }[] },
      u: UsedState,
      meta: PlayMeta = {}
    ) => {
      candidate = { prev: used, next: u, meta }
      playingStory = meta.source === 'flag'
      phase = 'talking'
      tone = entry.tone
      lines = entry.lines.map(l => l.text)
      showLine()
    }

    function selectAndPlay() {
      const sel = selectNext({
        ledger,
        used,
        flags: load().flags,
        pendingFlags,
        pendingFalseReport: pendingFalse,
        pendingMidpoint,
        last,
        nowMs: Date.now(),
        quietMs: cfg.seriousQuietMs,
      })
      if (!sel) {
        phase = 'silent'
        later(selectAndPlay, GATE_RETRY_MS)
        return
      }
      // A flag and the midpoint stay pending until their first line shows (`commit`).
      if (sel.source === 'false-report') pendingFalse = null
      play(sel.entry, sel.used, { source: sel.source, flag: sel.flag })
    }

    /** Something urgent arrived during the silence: speak soon instead of waiting it out. */
    const wake = () => {
      if (phase === 'silent') later(selectAndPlay, SUBTITLE_GAP_MS)
    }

    machineRef.current = {
      falseReport: anomalyId => {
        if (closing) return
        pendingFalse = { anomalyId }
        // Before the opening, or inside a story: it waits (the story is not cut).
        if (phase === 'pre' || playingStory) return
        // Cut in at once: drop what is left of the conversation.
        lines = []
        hide()
        phase = 'silent'
        later(selectAndPlay, SUBTITLE_GAP_MS)
      },
      flags: names => {
        if (closing) return
        for (const n of names) {
          if (storyFlags.has(n) && !pendingFlags.includes(n))
            pendingFlags.push(n)
        }
        wake()
      },
      checkMidpoint: (elapsedMs, found) => {
        if (closing || midpointDone) return
        if (elapsedMs < cfg.midpointAtSec * 1000) return
        // Re-armed on every tick until it has actually played (`commit` sets midpointDone).
        const fresh = pendingMidpoint === null
        pendingMidpoint = midpointStage(found)
        if (fresh) wake()
      },
      end: result => {
        if (closing) return
        closing = true
        // Unplayed stories stay in the save (pendingStories) for the next start.
        pendingFlags.length = 0
        pendingFalse = null
        pendingMidpoint = null
        lines = []
        const picked = pickClosing(
          ledger,
          result,
          used,
          Math.random,
          load().flags
        )
        if (!picked) {
          hide()
          later(() => inputRef.current.onClosingDone(), 0)
          return
        }
        play(picked.entry, picked.used)
      },
    }

    // Opening after a short wait, then chatter (via the silence after it).
    later(() => {
      const opening = pickOpening(ledger, used, Math.random, load().flags)
      if (opening) {
        heldFlags = [...pendingFlags]
        play(opening.entry, opening.used)
      } else selectAndPlay()
    }, cfg.openingDelayMs)

    return () => {
      window.clearTimeout(timer)
      machineRef.current = null
      // Idempotent under StrictMode's dev double-run: events are replayed on the second mount.
      handledWrongRef.current = null
      handledFlagRef.current = null
    }
  }, [])

  const { wrongFeedbackId, wrongAnomalyId, flagEvent, ending } = input

  useEffect(() => {
    if (wrongFeedbackId === null || handledWrongRef.current === wrongFeedbackId)
      return
    handledWrongRef.current = wrongFeedbackId
    machineRef.current?.falseReport(wrongAnomalyId)
  }, [wrongFeedbackId, wrongAnomalyId])

  useEffect(() => {
    if (!flagEvent || handledFlagRef.current === flagEvent.seq) return
    handledFlagRef.current = flagEvent.seq
    machineRef.current?.flags(flagEvent.flags)
  }, [flagEvent])

  useEffect(() => {
    machineRef.current?.checkMidpoint(input.elapsedMs, input.foundThisPlay)
  }, [input.elapsedMs, input.foundThisPlay])

  useEffect(() => {
    if (ending) machineRef.current?.end(ending)
  }, [ending])

  return view
}
