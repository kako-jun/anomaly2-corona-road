import { describe, expect, it } from 'vitest'
import { STAGES } from '../data/investigationNotes'
import { buildNote, fmtShiftEnd, outcomeOf, stageOf } from './investigationNote'
import { msToGameTime } from './gameConfig'
import { toFullWidthDigits } from './fullWidth'
import { emptySave } from './saveData'
import type { LastShift, SaveData } from './saveData'

const shift = (over: Partial<LastShift> = {}): LastShift => ({
  found: 9,
  fresh: 4,
  misreports: 1,
  durationMs: 480000,
  closing: 'dawn',
  raised: [],
  ...over,
})
const save = (over: Partial<SaveData> = {}): SaveData => ({
  ...emptySave(),
  ...over,
})
const texts = (v: ReturnType<typeof buildNote>) => v.lines.map(l => l.text)

describe('stageOf', () => {
  it('is the background on the very first night, then none until a flag rises', () => {
    expect(stageOf(save())).toBe('start')
    expect(stageOf(save({ loops: 1 }))).toBe('none')
    expect(stageOf(save({ foundTotal: 2 }))).toBe('none')
  })
  it.each([
    [{ elder1: true }, 'elder1'],
    [{ elder1: true, elder2: true }, 'elder2'],
    [{ elder1: true, elder2: true, elder3: true }, 'elder3'],
    [{ elder1: true, elder2: true, elder3: true, child: true }, 'child'],
  ])('takes the furthest flag (%j)', (flags, stage) => {
    expect(stageOf(save({ flags, loops: 3 }))).toBe(stage)
  })
})

describe('outcomeOf', () => {
  it('withdraw and ending win over the counts; fresh finds mean a new kind (new lead)', () => {
    expect(outcomeOf(shift({ closing: 'withdraw', fresh: 5 }))).toBe('withdraw')
    expect(outcomeOf(shift({ closing: 'ending' }))).toBe('ending')
    expect(outcomeOf(shift({ fresh: 1 }))).toBe('newKinds')
    expect(outcomeOf(shift({ fresh: 0, found: 7 }))).toBe('noNewKinds')
  })
})

const fw = toFullWidthDigits

describe('fmtShiftEnd (in-game clock, not real time)', () => {
  it.each([
    ['dawn', 480000, 'ja', '０６:００まで'],
    ['dawn', 479990, 'ja', '０６:００まで'],
    ['ending', 480000, 'ja', '０６:００まで'],
    ['dawn', 480000, 'en', 'Until 06:00'],
    ['ending', 480000, 'en', 'Until 06:00'],
  ] as const)('%s %i ms (%s) -> %s', (closing, ms, lang, out) =>
    expect(fmtShiftEnd(ms, closing, lang)).toBe(out)
  )
  it.each([
    [19000, '22:19'],
    [60000, '23:00'],
    [120000, '00:00'],
    [200000, '01:20'],
    [479000, '05:59'],
  ])('a withdraw after %i real ms is at %s (msToGameTime)', (ms, clock) => {
    expect(fmtShiftEnd(ms, 'withdraw', 'ja')).toBe(`${fw(clock)}で撤収`)
    expect(fmtShiftEnd(ms, 'withdraw', 'en')).toBe(`Withdrew at ${clock}`)
    expect(msToGameTime(ms)).toBe(clock)
  })
  it('does not touch the saved real milliseconds', () => {
    const s = shift({ closing: 'withdraw', durationMs: 200000 })
    buildNote(
      { mode: 'after', save: save({ loops: 1, lastShift: s }), shift: s },
      'ja'
    )
    expect(s.durationMs).toBe(200000)
  })
})

describe('buildNote before a shift', () => {
  it('the first night (stage start) never shows a last-night line, even if a stale lastShift exists', () => {
    const v = buildNote(
      { mode: 'before', save: save({ lastShift: shift({ fresh: 0 }) }) },
      'ja'
    )
    expect(texts(v)).toEqual(STAGES.start.lines.map(l => l.ja))
  })
  it('first play: the background, empty frames, blank last-night column, night 1', () => {
    const v = buildNote({ mode: 'before', save: save() }, 'ja')
    expect(v.night).toBe('１夜目')
    expect(v.stamps).toEqual([{ text: '捜査の経緯', big: false }])
    expect(texts(v)).toEqual(STAGES.start.lines.map(l => l.ja))
    expect(v.slots.every(s => !s.found)).toBe(true)
    expect(v.scrib).toEqual([]) // nothing to jot before an oddity has been seen
    expect(v.slots.every(s => !s.found && s.alt === '未発見')).toBe(true) // no sketch on the first night
    expect(v.left.head).toBe('前回の夜')
    expect(v.left.rows.every(r => r.value === null)).toBe(true)
    expect(v.right.rows.map(r => r.value)).toEqual(['０', '０'])
  })
  it('later: the synopsis of the stage the save has reached, last-night numbers, night = loops + 1', () => {
    const v = buildNote(
      {
        mode: 'before',
        save: save({
          loops: 7,
          foundTotal: 143,
          foundIds: Array.from({ length: 63 }, (_, i) => `a${i}`),
          flags: { elder1: true, elder2: true },
          lastShift: shift(),
        }),
      },
      'ja'
    )
    expect(v.night).toBe('８夜目')
    expect(v.stamps[0].text).toBe('前回まで')
    expect(texts(v)).toEqual(STAGES.elder2.lines.map(l => l.ja))
    expect(v.slots.map(s => s.found)).toEqual([true, true, false, false])
    expect(v.left.rows.map(r => r.value)).toEqual(['９', '４', '１'])
    expect(v.shiftRow).toMatchObject({ label: '勤務', value: '０６:００まで' })
    expect(v.right.rows.map(r => r.value)).toEqual(['１４３', '６３'])
  })
  it('adds the last-night line after a night without new kinds or a withdraw', () => {
    const base = { loops: 5, flags: { elder1: true } }
    const none = buildNote(
      {
        mode: 'before',
        save: save({ ...base, lastShift: shift({ fresh: 0 }) }),
      },
      'ja'
    )
    expect(texts(none).at(-1)).toBe('前回は、新しい手がかりがなかった。')
    const wd = buildNote(
      {
        mode: 'before',
        save: save({ ...base, lastShift: shift({ closing: 'withdraw' }) }),
      },
      'ja'
    )
    expect(texts(wd).at(-1)).toBe('前回は、お手つきが重なり席を立った。')
    const ok = buildNote(
      { mode: 'before', save: save({ ...base, lastShift: shift() }) },
      'ja'
    )
    expect(texts(ok)).toEqual(STAGES.elder1.lines.map(l => l.ja))
  })
  it('marks a frame filled in the last shift as new', () => {
    const v = buildNote(
      {
        mode: 'before',
        save: save({
          loops: 12,
          flags: { elder1: true, elder2: true, elder3: true },
          lastShift: shift({ raised: ['elder3'] }),
        }),
      },
      'ja'
    )
    expect(v.slots.map(s => s.isNew)).toEqual([false, false, true, false])
  })
  it('does not write a stage the save has not reached (no child line before the child flag)', () => {
    const v = buildNote(
      { mode: 'before', save: save({ loops: 9, flags: { elder3: true } }) },
      'ja'
    )
    expect(texts(v).join('')).not.toContain('４人目、子供を見つけた')
  })
})

describe('buildNote after a shift', () => {
  const after = (s: LastShift, sv: Partial<SaveData> = {}) =>
    buildNote(
      {
        mode: 'after',
        save: save({
          loops: 8,
          flags: { elder1: true, elder2: true },
          ...sv,
          lastShift: s,
        }),
        shift: s,
      },
      'ja'
    )
  it('new kinds: stock lines, then the kept tail of the stage, two lines at most (all one colour); night = loops', () => {
    const v = after(shift())
    expect(v.night).toBe('８夜目')
    expect(v.stamps).toEqual([
      { text: '今夜の捜査', big: false },
      { text: '夜明け', big: true },
    ])
    expect(v.lines).toEqual([
      { text: '今夜も異変を報告。' },
      { text: '捜査は一歩前へ。' },
      { text: '２人目も、老人１人目と同じことを言う。' },
      { text: '人当たりがよく、こちらを気遣う。' },
    ])
    expect(v.scrib).toEqual(STAGES.elder2.scrib.map(s => s.ja))
    expect(v.left.head).toBe('今夜')
  })
  it('no progress and withdraw swap the stock lines and the scribble', () => {
    const np = after(shift({ fresh: 0 }))
    expect(texts(np)[0]).toBe('新しい手がかりはなかった。')
    expect(texts(np)).not.toContain('新しい異変は見つからず。')
    expect(np.scrib).toEqual([]) // no jotting without a basis in story.md (no leads: nothing to add)
    const wd = after(shift({ closing: 'withdraw', durationMs: 221000 }))
    expect(wd.stamps[1].text).toBe('撤収')
    expect(wd.scrib).toEqual(['今夜はここまで。'])
    expect(wd.shiftRow.value).toBe('０１:４１で撤収')
  })
  it('the first night says "tonight", not "also"; a withdraw that found nothing does not say the finds count', () => {
    const first = after(shift(), { loops: 1, flags: {} })
    expect(texts(first)[0]).toBe('今夜は異変を報告。')
    expect(texts(after(shift(), { loops: 2 }))[0]).toBe('今夜も異変を報告。')
    const none = after(shift({ closing: 'withdraw', found: 0, fresh: 0 }))
    expect(texts(none).join('')).not.toContain('見つけた分')
    const some = after(shift({ closing: 'withdraw', found: 2 }))
    expect(texts(some)).toContain('見つけた分は、捜査に加わった。')
  })
  it('the true ending has its own stock lines', () => {
    const v = after(shift({ closing: 'ending' }), {
      flags: { elder1: true, elder2: true, elder3: true, child: true },
    })
    expect(texts(v).slice(0, 2)).toEqual([
      '異変を、すべて見送った。',
      '指摘ではなく、家族を調べる。',
    ])
    expect(v.scrib).toEqual(['家族に、何をされたのか。'])
    const en = buildNote(
      {
        mode: 'after',
        save: save({ flags: { child: true } }),
        shift: shift({ closing: 'ending' }),
      },
      'en'
    )
    expect(en.scrib).toEqual(['What was done to them by their family?'])
  })
  it('English mirrors the structure', () => {
    const ja = after(shift())
    const en = buildNote(
      {
        mode: 'after',
        save: save({ loops: 8, flags: { elder1: true, elder2: true } }),
        shift: shift(),
      },
      'en'
    )
    expect(en.lines).toHaveLength(ja.lines.length)
    expect(en.night).toBe('Night 8')
    expect(en.stamps[1].text).toBe('DAWN')
  })
})
