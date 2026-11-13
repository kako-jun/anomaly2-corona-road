import {
  LABELS,
  MEMO_FLAG_TEXT,
  LAST_NIGHT,
  OUTCOMES,
  STAGES,
  STAGE_FLAGS,
} from '../data/investigationNotes'
import type { NoteLang, Outcome, Pair, Stage } from '../data/investigationNotes'
import { DEFAULT_CONFIG, msToGameTime } from './gameConfig'
import { toFullWidthDigits } from './fullWidth'
import { MEMO_INDEX } from './memoIndex'
import { MEMO_FLAGS, MEMO_IMAGE_DIR } from './anomalyLedger'
import type { MemoFlag } from './anomalyLedger'
import type { LastShift, SaveData } from './saveData'

/** The story stage the saved flags have reached (the furthest one). */
export const stageOf = (
  save: Pick<SaveData, 'flags' | 'loops' | 'foundTotal'>
): Stage => {
  for (let i = STAGE_FLAGS.length - 1; i >= 0; i--) {
    if (save.flags[STAGE_FLAGS[i]] === true) return STAGE_FLAGS[i]
  }
  // Nothing played yet: the background of the case. Some play already: no frame filled yet.
  return save.loops === 0 && save.foundTotal === 0 ? 'start' : 'none'
}

/** What kind of night the last shift was, for the stock lines. Fresh finds = new kinds (a new lead; every night still moves the case forward). */
export const outcomeOf = (shift: LastShift): Outcome =>
  shift.closing === 'withdraw'
    ? 'withdraw'
    : shift.closing === 'ending'
      ? 'ending'
      : shift.fresh > 0
        ? 'newKinds'
        : 'noNewKinds'

/**
 * The Shift row: the in-game clock, not the real time (kako-jun, #297). A night that ran out (dawn, true ending)
 * "ran until 06:00"; a withdraw "withdrew at" the in-game time it happened (22:00 start, 1 real second = 1 game
 * minute, `msToGameTime`). The save keeps the real ms; this only converts for display.
 */
export const fmtShiftEnd = (
  durationMs: number,
  closing: LastShift['closing'],
  lang: NoteLang
): string =>
  (closing === 'withdraw'
    ? LABELS.shiftWithdrew(msToGameTime(durationMs))
    : LABELS.shiftUntil(msToGameTime(DEFAULT_CONFIG.totalDurationMs)))[lang]

/** The most a count on the note can show (3 digits, #429). */
export const NOTE_MAX_COUNT = 999

/** The widest count of the numbers box (1-3 digits): the box tightens its type by this (the shift's clock time is not a count). */
export const noteDigitLevel = (
  view: Pick<NoteView, 'left' | 'right'>
): number =>
  Math.max(
    1,
    ...[...view.left.rows, ...view.right.rows].map(r =>
      r.value === null ? 0 : r.value.length
    )
  )

export interface NoteRow {
  label: string
  /** null = a blank to be filled in (nothing to show yet). */
  value: string | null
  unit: string
}

export interface NoteView {
  lang: NoteLang
  mode: 'before' | 'after'
  night: string
  stamps: { text: string; big: boolean }[]
  slots: { label: string; found: boolean; isNew: boolean; alt: string }[]
  lines: { text: string }[]
  scrib: string[]
  /** The scribble (a path under `/note-sketches/`) that goes with the anomaly's one-liner, if it has one (#325). */
  sketch?: string
  left: { head: string; rows: NoteRow[] }
  right: { head: string; rows: NoteRow[] }
  /** The Shift row sits under both columns (its text is longer than a number). */
  shiftRow: NoteRow
  /** One-sentence summary for assistive technology. */
  summary: string
}

export type NoteInput =
  | { mode: 'before'; save: SaveData }
  | { mode: 'after'; save: SaveData; shift: LastShift }

export const buildNote = (input: NoteInput, lang: NoteLang): NoteView => {
  const t = (p: Pair) => p[lang]
  const { save } = input
  const stage = stageOf(save)
  const shift = input.mode === 'after' ? input.shift : save.lastShift
  const raised = shift?.raised ?? []

  const lines: NoteView['lines'] = []
  let scrib: Pair[] = STAGES[stage].scrib
  let sketch: string | undefined
  const stamps: NoteView['stamps'] = []

  if (input.mode === 'before') {
    stamps.push({
      text: t(stage === 'start' ? LABELS.stampStart : LABELS.stampBefore),
      big: false,
    })
    for (const l of STAGES[stage].lines) lines.push({ text: t(l) })
    if (stage !== 'start' && shift) {
      const o = outcomeOf(shift)
      if (o === 'noNewKinds' || o === 'withdraw')
        lines.push({ text: t(LAST_NIGHT[o]) })
    }
  } else {
    const outcome = outcomeOf(input.shift)
    stamps.push({ text: t(LABELS.stampAfter), big: false })
    stamps.push({
      text: t(outcome === 'withdraw' ? LABELS.stampWithdraw : LABELS.stampDawn),
      big: true,
    })
    const o = OUTCOMES[outcome]
    const firstNight = Math.max(1, save.loops) === 1 // no earlier night: "also" would be false
    for (const l of (firstNight && o.firstNight) || o.lines)
      lines.push({ text: t(l) })
    if (input.shift.found > 0)
      for (const l of o.ifFound ?? []) lines.push({ text: t(l) })
    for (const l of STAGES[stage].lines.slice(-STAGES[stage].tail))
      lines.push({ text: t(l) })
    // The memos this result earned (#325), chosen when the shift ended: the hypothesis first, then the one-liner.
    const { memoFlag, memo } = input.shift
    const flagText = MEMO_FLAGS.find((f: MemoFlag) => f === memoFlag)
    if (flagText) lines.push({ text: t(MEMO_FLAG_TEXT[flagText]) })
    const meta = memo ? MEMO_INDEX.get(memo) : undefined
    const lineText = meta?.memo
    if (lineText) {
      lines.push({ text: lineText[lang] })
      if (meta.image) sketch = `/${MEMO_IMAGE_DIR}/${meta.image}`
    }
    scrib = OUTCOMES[outcome].scrib ?? scrib
  }

  const slots = STAGE_FLAGS.map((flag, i) => {
    const found = save.flags[flag] === true
    return {
      label: t(LABELS.slot(i + 1)),
      found,
      isNew: found && raised.includes(flag),
      alt: t(found ? LABELS.sketchFound : LABELS.sketchUnknown),
    }
  })

  // Japanese counts are written in full-width digits (#352); English keeps ASCII.
  // A count is shown with 3 digits at most (#429): anything above NOTE_MAX_COUNT reads as NOTE_MAX_COUNT, so the numbers box
  // (investigationNote.css) is designed for exactly this worst case.
  const digits = (v: number): string => {
    const shown = Math.min(Math.max(0, Math.floor(v)), NOTE_MAX_COUNT)
    return lang === 'ja' ? toFullWidthDigits(shown) : String(shown)
  }
  const num = (v: number | undefined): string | null =>
    v === undefined ? null : digits(v)
  const row = (label: Pair, value: string | null, unit?: Pair): NoteRow => ({
    label: t(label),
    value,
    unit: unit ? t(unit) : '',
  })
  const left = {
    head: t(input.mode === 'before' ? LABELS.headLast : LABELS.headTonight),
    rows: [
      row(LABELS.rowFound, num(shift?.found), LABELS.unitCount),
      row(LABELS.rowFresh, num(shift?.fresh), LABELS.unitKinds),
      row(LABELS.rowFalse, num(shift?.misreports), LABELS.unitTimes),
    ],
  }
  const shiftRow = row(
    LABELS.rowShift,
    shift ? fmtShiftEnd(shift.durationMs, shift.closing, lang) : null
  )
  const right = {
    head: t(LABELS.headTotal),
    rows: [
      row(LABELS.rowTotal, digits(save.foundTotal), LABELS.unitCount),
      row(LABELS.rowKinds, digits(save.foundIds.length), LABELS.unitKinds),
    ],
  }

  // The night being written: the next one before a shift, the one that just ended after it.
  const nightNo =
    input.mode === 'before' ? save.loops + 1 : Math.max(1, save.loops)
  const night = t(LABELS.night(nightNo))
  return {
    lang,
    mode: input.mode,
    night,
    stamps,
    slots,
    lines,
    scrib: scrib.map(t).filter(s => s !== ''),
    ...(sketch ? { sketch } : {}),
    left,
    right,
    shiftRow,
    summary: [t(LABELS.title), night, ...stamps.map(s => s.text)].join(' '),
  }
}
