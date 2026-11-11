import {
  LABELS,
  LAST_NIGHT,
  OUTCOMES,
  STAGES,
  STAGE_FLAGS,
} from '../data/investigationNotes'
import type { NoteLang, Outcome, Pair, Stage } from '../data/investigationNotes'
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

/** Real time of a shift as m:ss (the shift is 8 real minutes). */
export const fmtShift = (ms: number): string => {
  const total = Math.floor(Math.max(0, ms) / 1000)
  return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, '0')}`
}

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
  lines: { text: string; muted: boolean }[]
  scrib: string[]
  /** The sketch of the corridor: only on the very first night. */
  doodle: boolean
  left: { head: string; rows: NoteRow[] }
  right: { head: string; rows: NoteRow[] }
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
  const stamps: NoteView['stamps'] = []

  if (input.mode === 'before') {
    stamps.push({
      text: t(stage === 'start' ? LABELS.stampStart : LABELS.stampBefore),
      big: false,
    })
    for (const l of STAGES[stage].lines)
      lines.push({ text: t(l), muted: false })
    if (stage !== 'start' && shift) {
      const o = outcomeOf(shift)
      if (o === 'noNewKinds' || o === 'withdraw')
        lines.push({ text: t(LAST_NIGHT[o]), muted: false })
    }
  } else {
    const outcome = outcomeOf(input.shift)
    stamps.push({ text: t(LABELS.stampAfter), big: false })
    stamps.push({
      text: t(outcome === 'withdraw' ? LABELS.stampWithdraw : LABELS.stampDawn),
      big: true,
    })
    for (const l of OUTCOMES[outcome].lines)
      lines.push({ text: t(l), muted: false })
    for (const l of STAGES[stage].lines.slice(-STAGES[stage].tail))
      lines.push({ text: t(l), muted: true })
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

  const num = (v: number | undefined): string | null =>
    v === undefined ? null : String(v)
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
      row(LABELS.rowShift, shift ? fmtShift(shift.durationMs) : null),
    ],
  }
  const right = {
    head: t(LABELS.headTotal),
    rows: [
      row(LABELS.rowTotal, String(save.foundTotal), LABELS.unitCount),
      row(LABELS.rowKinds, String(save.foundIds.length), LABELS.unitKinds),
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
    doodle: stage === 'start' && input.mode === 'before',
    left,
    right,
    summary: [t(LABELS.title), night, ...stamps.map(s => s.text)].join(' '),
  }
}
