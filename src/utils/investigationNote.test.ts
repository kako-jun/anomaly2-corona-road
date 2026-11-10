import { describe, expect, it } from 'vitest'
import { STAGES } from '../data/investigationNotes'
import { buildNote, fmtShift, outcomeOf, stageOf } from './investigationNote'
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
  it('withdraw and ending win over the counts; fresh finds mean progress', () => {
    expect(outcomeOf(shift({ closing: 'withdraw', fresh: 5 }))).toBe('withdraw')
    expect(outcomeOf(shift({ closing: 'ending' }))).toBe('ending')
    expect(outcomeOf(shift({ fresh: 1 }))).toBe('progress')
    expect(outcomeOf(shift({ fresh: 0, found: 7 }))).toBe('noProgress')
  })
})

describe('fmtShift', () => {
  it.each([
    [480000, '8:00'],
    [221000, '3:41'],
    [65999, '1:05'],
    [-5, '0:00'],
  ])('%i ms -> %s', (ms, s) => expect(fmtShift(ms)).toBe(s))
})

describe('buildNote before a shift', () => {
  it('first play: the background, empty frames, blank last-night column, night 1', () => {
    const v = buildNote({ mode: 'before', save: save() }, 'ja')
    expect(v.night).toBe('1夜目')
    expect(v.stamps).toEqual([{ text: '捜査の経緯', big: false }])
    expect(texts(v)).toEqual(STAGES.start.lines.map(l => l.ja))
    expect(v.slots.every(s => !s.found)).toBe(true)
    expect(v.doodle).toBe(true)
    expect(v.left.head).toBe('前回の夜')
    expect(v.left.rows.every(r => r.value === null)).toBe(true)
    expect(v.right.rows.map(r => r.value)).toEqual(['0', '0'])
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
    expect(v.night).toBe('8夜目')
    expect(v.stamps[0].text).toBe('前回まで')
    expect(texts(v)).toEqual(STAGES.elder2.lines.map(l => l.ja))
    expect(v.slots.map(s => s.found)).toEqual([true, true, false, false])
    expect(v.doodle).toBe(false)
    expect(v.left.rows.map(r => r.value)).toEqual(['9', '4', '1', '8:00'])
    expect(v.right.rows.map(r => r.value)).toEqual(['143', '63'])
  })
  it('adds the last-night line after a night without progress or a withdraw', () => {
    const base = { loops: 5, flags: { elder1: true } }
    const none = buildNote(
      {
        mode: 'before',
        save: save({ ...base, lastShift: shift({ fresh: 0 }) }),
      },
      'ja'
    )
    expect(texts(none).at(-1)).toBe('前回の捜査は進捗がなかった。')
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
    expect(texts(v).join('')).not.toContain('4人目、子供を見つけた')
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
  it('progress: stock lines, then the last two stage lines muted; night = loops', () => {
    const v = after(shift())
    expect(v.night).toBe('8夜目')
    expect(v.stamps).toEqual([
      { text: '今夜の捜査', big: false },
      { text: '夜明け', big: true },
    ])
    expect(v.lines).toEqual([
      { text: '今夜も異変を報告。', muted: false },
      { text: '捜査は一歩前へ。', muted: false },
      { text: '1人目と同じことを言う。', muted: true },
      { text: '人当たりがよく、こちらを気遣う。', muted: true },
    ])
    expect(v.scrib).toEqual(STAGES.elder2.scrib.map(s => s.ja))
    expect(v.left.head).toBe('今夜')
  })
  it('no progress and withdraw swap the stock lines and the scribble', () => {
    const np = after(shift({ fresh: 0 }))
    expect(texts(np).slice(0, 2)).toEqual([
      '今夜の捜査は進捗がなかった。',
      '新しい異変は見つからず。',
    ])
    expect(np.scrib).toEqual(['見落としはないか?'])
    const wd = after(shift({ closing: 'withdraw', durationMs: 221000 }))
    expect(wd.stamps[1].text).toBe('撤収')
    expect(wd.scrib).toEqual(['今夜はここまで。'])
    expect(wd.left.rows.at(-1)?.value).toBe('3:41')
  })
  it('the true ending has its own stock lines', () => {
    const v = after(shift({ closing: 'ending' }), {
      flags: { elder1: true, elder2: true, elder3: true, child: true },
    })
    expect(texts(v).slice(0, 2)).toEqual([
      '異変を、すべて見送った。',
      '指摘ではなく、子供の家を調べる。',
    ])
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
