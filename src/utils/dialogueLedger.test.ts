import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parse as parseYaml } from 'yaml'
import { parseLedger } from './anomalyLedger'
import {
  DIALOGUE_FILES,
  checkSubtitleText,
  parseDialogueFile,
  parseDialogueLedger,
  parseEntry,
  parseFlags,
} from './dialogueLedger'
import type { DialogueFile, ParseContext } from './dialogueLedger'

const ctx: ParseContext = {
  flagNames: new Set(['f1']),
  anomalyIds: new Set(['an1']),
}
const anomalyIds = new Set(['an1', 'an2'])

const lines = (n = 1) =>
  Array.from({ length: n }, () => ({ who: 'A', text: 'こんばんは' }))

const entry = (over: Record<string, unknown> = {}) => ({
  id: 'opening-1',
  tone: 'light',
  lines: lines(),
  ...over,
})

describe('checkSubtitleText', () => {
  it.each([
    ['、', 'ideographic comma'],
    ['。', 'ideographic full stop'],
    [',', 'ASCII comma'],
    ['.', 'ASCII period'],
    ['，', 'full-width comma'],
    ['．', 'full-width period'],
  ])('rejects the punctuation %s (%s)', p => {
    expect(() => checkSubtitleText(`あ${p}い`)).toThrow(/punctuation/)
  })

  it.each([
    ['half-width space', 'あ い'],
    ['tab', 'あ\tい'],
    ['line feed', 'あ\nい'],
    ['carriage return', 'あ\rい'],
  ])('rejects a %s', (_name, text) => {
    expect(() => checkSubtitleText(text)).toThrow(
      /half-width space or line break/
    )
  })

  it('allows the full-width space', () => {
    expect(() => checkSubtitleText('あ　い')).not.toThrow()
  })

  it.each(['?', '!', '…', '？', '！'])('allows %s', c => {
    expect(() => checkSubtitleText(`あ${c}`)).not.toThrow()
  })

  it.each(['', ' ', '   ', '　', '\t'])(
    'rejects the empty/blank text %j',
    t => {
      expect(() => checkSubtitleText(t)).toThrow(/empty/)
    }
  )
})

describe('parseEntry: valid entries of every kind', () => {
  it('parses an opening', () => {
    expect(parseEntry('opening', entry(), 0, ctx)).toEqual({
      id: 'opening-1',
      kind: 'opening',
      tone: 'light',
      lines: [{ who: 'A', text: 'こんばんは' }],
      when: {},
    })
  })
  it('parses a chatter', () => {
    const e = parseEntry('chatter', entry({ id: 'chatter-1' }), 0, ctx)
    expect(e.kind).toBe('chatter')
  })
  it('parses a false-report', () => {
    const e = parseEntry(
      'false-report',
      entry({ id: 'false-report-1', tone: 'serious' }),
      0,
      ctx
    )
    expect(e.kind).toBe('false-report')
    expect(e.tone).toBe('serious')
  })
  it('parses a closing with its result', () => {
    const e = parseEntry(
      'closing',
      entry({ id: 'closing-1', when: { result: 'dawn' } }),
      0,
      ctx
    )
    expect(e).toMatchObject({ kind: 'closing', when: { result: 'dawn' } })
  })
  it('parses a midpoint with its stage', () => {
    const e = parseEntry(
      'midpoint',
      entry({ id: 'midpoint-1', when: { stage: 'many' } }),
      0,
      ctx
    )
    expect(e).toMatchObject({ kind: 'midpoint', when: { stage: 'many' } })
  })
  it('parses a story with a defined flag', () => {
    const e = parseEntry(
      'story',
      entry({ id: 'story-1', when: { flag: 'f1' } }),
      0,
      ctx
    )
    expect(e).toMatchObject({ kind: 'story', when: { flag: 'f1' } })
  })
  it('parses an anomaly-line with a known anomaly', () => {
    const e = parseEntry(
      'anomaly-lines',
      entry({ id: 'an-an1-1', when: { anomaly: 'an1' } }),
      0,
      ctx
    )
    expect(e).toMatchObject({ kind: 'anomaly-line', when: { anomaly: 'an1' } })
  })
  it('keeps a leading and trailing full-width space in the text', () => {
    const e = parseEntry(
      'opening',
      entry({ lines: [{ who: 'M', text: '　はい　' }] }),
      0,
      ctx
    )
    expect(e.lines[0].text).toBe('　はい　')
  })
})

describe('parseEntry: when', () => {
  it.each(['opening', 'chatter', 'false-report'] as const)(
    '%s rejects a non-empty when',
    file => {
      expect(() =>
        parseEntry(file, entry({ id: `${file}-1`, when: { x: 1 } }), 0, ctx)
      ).toThrow(/takes no "when"/)
    }
  )
  it('accepts an empty when', () => {
    expect(() =>
      parseEntry('opening', entry({ when: {} }), 0, ctx)
    ).not.toThrow()
  })
  it('accepts a missing when', () => {
    expect(() => parseEntry('opening', entry(), 0, ctx)).not.toThrow()
  })
  it('accepts a null when', () => {
    expect(() =>
      parseEntry('opening', entry({ when: null }), 0, ctx)
    ).not.toThrow()
  })
  it.each([
    ['closing', 'closing-1', 'result'],
    ['midpoint', 'midpoint-1', 'stage'],
    ['story', 'story-1', 'flag'],
    ['anomaly-lines', 'an-an1-1', 'anomaly'],
  ] as const)('%s requires when.%s', (file, id, key) => {
    expect(() => parseEntry(file, entry({ id }), 0, ctx)).toThrow(
      new RegExp(`needs "when: \\{ ${key} \\}"`)
    )
  })
  it.each([
    ['closing', 'closing-1', { result: 'dawn', extra: 1 }],
    ['midpoint', 'midpoint-1', { stage: 'few', extra: 1 }],
    ['story', 'story-1', { flag: 'f1', extra: 1 }],
    ['anomaly-lines', 'an-an1-1', { anomaly: 'an1', extra: 1 }],
  ] as const)('%s rejects an extra key in when', (file, id, when) => {
    expect(() => parseEntry(file, entry({ id, when }), 0, ctx)).toThrow(
      /unknown key "extra"/
    )
  })
  it('rejects a when.result outside the enum', () => {
    expect(() =>
      parseEntry(
        'closing',
        entry({ id: 'closing-1', when: { result: 'win' } }),
        0,
        ctx
      )
    ).toThrow(/when\.result "win" must be one of dawn\|withdraw\|ending/)
  })
  it('rejects a when.stage outside the enum', () => {
    expect(() =>
      parseEntry(
        'midpoint',
        entry({ id: 'midpoint-1', when: { stage: 'lots' } }),
        0,
        ctx
      )
    ).toThrow(/when\.stage "lots" must be one of few\|mid\|many/)
  })
  it('rejects a story whose flag is not in flags.yaml', () => {
    expect(() =>
      parseEntry(
        'story',
        entry({ id: 'story-1', when: { flag: 'nope' } }),
        0,
        ctx
      )
    ).toThrow(/when\.flag "nope" is not defined in flags\.yaml/)
  })
  it('rejects an anomaly-line whose anomaly is not in the ledger', () => {
    expect(() =>
      parseEntry(
        'anomaly-lines',
        entry({ id: 'an-zzz-1', when: { anomaly: 'zzz' } }),
        0,
        ctx
      )
    ).toThrow(/when\.anomaly "zzz" is not in prompts\/anomalies\.yaml/)
  })
})

describe('parseEntry: tone, who, lines', () => {
  it('rejects a tone outside the enum', () => {
    expect(() => parseEntry('opening', entry({ tone: 'sad' }), 0, ctx)).toThrow(
      /tone "sad" must be one of light\|serious/
    )
  })
  it('rejects a missing tone', () => {
    expect(() =>
      parseEntry('opening', { id: 'opening-1', lines: lines() }, 0, ctx)
    ).toThrow(/"tone" is missing/)
  })
  it('rejects a who outside the enum', () => {
    expect(() =>
      parseEntry(
        'opening',
        entry({ lines: [{ who: 'X', text: 'あ' }] }),
        0,
        ctx
      )
    ).toThrow(/lines\[0\]\.who "X"/)
  })
  it('rejects a missing who', () => {
    expect(() =>
      parseEntry('opening', entry({ lines: [{ text: 'あ' }] }), 0, ctx)
    ).toThrow(/"who" is missing/)
  })
  it('rejects an empty lines list', () => {
    expect(() => parseEntry('opening', entry({ lines: [] }), 0, ctx)).toThrow(
      /"lines" must be a non-empty list/
    )
  })
  it('rejects lines that is not a list', () => {
    expect(() => parseEntry('opening', entry({ lines: 'あ' }), 0, ctx)).toThrow(
      /"lines" must be a non-empty list/
    )
  })
  it('rejects a missing lines', () => {
    expect(() =>
      parseEntry('opening', { id: 'opening-1', tone: 'light' }, 0, ctx)
    ).toThrow(/"lines" must be a non-empty list/)
  })
  it('rejects a line that is not a mapping', () => {
    expect(() =>
      parseEntry('opening', entry({ lines: ['あ'] }), 0, ctx)
    ).toThrow(/lines\[0\] is not a mapping/)
  })
  it('rejects an extra key in a line', () => {
    expect(() =>
      parseEntry(
        'opening',
        entry({ lines: [{ who: 'A', text: 'あ', mood: 'x' }] }),
        0,
        ctx
      )
    ).toThrow(/lines\[0\]: unknown key "mood"/)
  })
  it('rejects a non-string text', () => {
    expect(() =>
      parseEntry('opening', entry({ lines: [{ who: 'A', text: 5 }] }), 0, ctx)
    ).toThrow(/lines\[0\]\.text is not a string/)
  })
  it('applies the subtitle text check to every line', () => {
    expect(() =>
      parseEntry(
        'opening',
        entry({
          lines: [
            { who: 'A', text: 'あ' },
            { who: 'M', text: 'い。' },
          ],
        }),
        0,
        ctx
      )
    ).toThrow(/punctuation/)
  })
  it('rejects an extra key in the entry', () => {
    expect(() =>
      parseEntry('opening', entry({ note: 'memo' }), 0, ctx)
    ).toThrow(/entry: unknown key "note"/)
  })
  it('rejects an entry that is not a mapping', () => {
    expect(() => parseEntry('opening', 'x', 3, ctx)).toThrow(/not a mapping/)
  })
})

describe('parseEntry: chatter tone', () => {
  it('allows tone light', () => {
    expect(() =>
      parseEntry('chatter', entry({ id: 'chatter-1' }), 0, ctx)
    ).not.toThrow()
  })
  it('rejects tone serious and names the id', () => {
    expect(() =>
      parseEntry('chatter', entry({ id: 'chatter-9', tone: 'serious' }), 0, ctx)
    ).toThrow(/"chatter-9".*chatter takes only tone "light"/)
  })
})

describe('parseEntry: id prefix', () => {
  it.each([
    ['opening', {}],
    ['chatter', {}],
    ['false-report', {}],
    ['closing', { when: { result: 'dawn' } }],
    ['midpoint', { when: { stage: 'few' } }],
    ['story', { when: { flag: 'f1' } }],
  ] as [DialogueFile, Record<string, unknown>][])(
    '%s rejects an id without its prefix',
    (file, extra) => {
      expect(() =>
        parseEntry(file, entry({ id: 'wrong-1', ...extra }), 0, ctx)
      ).toThrow(new RegExp(`id must start with "${file}-"`))
    }
  )
  it('an anomaly-line needs the prefix an-<anomaly id>-', () => {
    expect(() =>
      parseEntry(
        'anomaly-lines',
        entry({ id: 'an-an2-1', when: { anomaly: 'an1' } }),
        0,
        { ...ctx, anomalyIds: new Set(['an1', 'an2']) }
      )
    ).toThrow(/id must start with "an-an1-"/)
  })
  it('an anomaly-line with a bare an- prefix is rejected', () => {
    expect(() =>
      parseEntry(
        'anomaly-lines',
        entry({ id: 'an-1', when: { anomaly: 'an1' } }),
        0,
        ctx
      )
    ).toThrow(/id must start with "an-an1-"/)
  })
})

describe('parseEntry: error messages', () => {
  it('names the file and the id', () => {
    expect(() =>
      parseEntry('opening', entry({ id: 'opening-7', tone: 'bad' }), 0, ctx)
    ).toThrow(/dialogue\/opening\.yaml entry "opening-7":/)
  })
  it('names the index when the entry has no id', () => {
    expect(() =>
      parseEntry('closing', { tone: 'light', lines: lines() }, 4, ctx)
    ).toThrow(/dialogue\/closing\.yaml entry at index 4 \(no id\):/)
  })
  it('names the index when the entry is not a mapping', () => {
    expect(() => parseEntry('opening', null, 2, ctx)).toThrow(
      /entry at index 2 \(no id\): not a mapping/
    )
  })
})

describe('parseFlags', () => {
  it('parses a valid flags mapping in definition order', () => {
    expect(
      parseFlags(
        {
          flags: {
            a: { foundUnique: 3 },
            b: { reiwaFound: 1, requires: ['a'] },
            c: { loops: 2, found: ['an1'] },
          },
        },
        anomalyIds
      )
    ).toEqual([
      { name: 'a', when: { foundUnique: 3 } },
      { name: 'b', when: { reiwaFound: 1, requires: ['a'] } },
      { name: 'c', when: { loops: 2, found: ['an1'] } },
    ])
  })
  it.each([
    ['missing flags', {}],
    ['empty flags', { flags: {} }],
    ['null flags', { flags: null }],
    ['null document', null],
    ['list flags', { flags: [] }],
  ])('rejects %s', (_n, doc) => {
    expect(() => parseFlags(doc, anomalyIds)).toThrow(
      /top-level "flags" mapping is missing/
    )
  })
  it.each([
    [0, false],
    [1, true],
    [1.5, false],
    ['3', false],
    [-1, false],
  ])('foundUnique %j accepted=%s', (v, ok) => {
    const run = () =>
      parseFlags({ flags: { a: { foundUnique: v } } }, anomalyIds)
    if (ok) expect(run).not.toThrow()
    else expect(run).toThrow(/"foundUnique" must be a positive integer/)
  })
  it('applies the same number check to reiwaFound and loops', () => {
    expect(() =>
      parseFlags({ flags: { a: { reiwaFound: 0 } } }, anomalyIds)
    ).toThrow(/"reiwaFound"/)
    expect(() =>
      parseFlags({ flags: { a: { loops: 1.5 } } }, anomalyIds)
    ).toThrow(/"loops"/)
  })
  it('rejects a found id that is not in the anomaly ledger', () => {
    expect(() =>
      parseFlags({ flags: { a: { found: ['ghost'] } } }, anomalyIds)
    ).toThrow(
      /flag "a".*found: anomaly "ghost" is not in prompts\/anomalies\.yaml/
    )
  })
  it('rejects an empty found list', () => {
    expect(() =>
      parseFlags({ flags: { a: { found: [] } } }, anomalyIds)
    ).toThrow(/"found" must be a non-empty list of strings/)
  })
  it('rejects a requires of an undefined flag', () => {
    expect(() =>
      parseFlags({ flags: { a: { requires: ['nope'] } } }, anomalyIds)
    ).toThrow(/requires: flag "nope" is not defined/)
  })
  it('rejects a flag that requires itself', () => {
    expect(() =>
      parseFlags({ flags: { a: { requires: ['a'] } } }, anomalyIds)
    ).toThrow(/requires itself/)
  })
  it('rejects a cycle of two flags', () => {
    expect(() =>
      parseFlags(
        { flags: { a: { requires: ['b'] }, b: { requires: ['a'] } } },
        anomalyIds
      )
    ).toThrow(/requires forms a cycle/)
  })
  it('rejects a cycle of three flags', () => {
    expect(() =>
      parseFlags(
        {
          flags: {
            a: { requires: ['b'] },
            b: { requires: ['c'] },
            c: { requires: ['a'] },
          },
        },
        anomalyIds
      )
    ).toThrow(/requires forms a cycle \(.*->.*->.*->.*\)/)
  })
  it('accepts a chain that is not a cycle', () => {
    expect(() =>
      parseFlags(
        {
          flags: {
            a: { loops: 1 },
            b: { requires: ['a'] },
            c: { requires: ['a', 'b'] },
          },
        },
        anomalyIds
      )
    ).not.toThrow()
  })
  it('rejects an empty condition', () => {
    expect(() => parseFlags({ flags: { a: {} } }, anomalyIds)).toThrow(
      /condition must be a non-empty mapping/
    )
  })
  it('rejects an unknown condition key and names the flag', () => {
    expect(() =>
      parseFlags({ flags: { a: { loops: 1, mood: 2 } } }, anomalyIds)
    ).toThrow(/flag "a": condition: unknown key "mood"/)
  })
})

describe('parseDialogueFile', () => {
  it('parses every entry of the list', () => {
    const out = parseDialogueFile(
      'opening',
      { dialogues: [entry(), entry({ id: 'opening-2' })] },
      ctx
    )
    expect(out.map(e => e.id)).toEqual(['opening-1', 'opening-2'])
  })
  it('rejects a missing dialogues key', () => {
    expect(() => parseDialogueFile('opening', {}, ctx)).toThrow(
      /dialogue\/opening\.yaml: top-level "dialogues" list is missing/
    )
  })
  it('rejects a null document (empty YAML)', () => {
    expect(() => parseDialogueFile('chatter', null, ctx)).toThrow(
      /dialogue\/chatter\.yaml: top-level "dialogues" list is missing/
    )
  })
  it('rejects a null dialogues value', () => {
    expect(() =>
      parseDialogueFile('chatter', { dialogues: null }, ctx)
    ).toThrow(/"dialogues" list is missing/)
  })
  it('accepts an empty list', () => {
    expect(parseDialogueFile('chatter', { dialogues: [] }, ctx)).toEqual([])
  })
})

describe('parseDialogueLedger', () => {
  const emptyParsed = () =>
    ({
      flags: { flags: { f1: { loops: 1 } } },
      ...Object.fromEntries(DIALOGUE_FILES.map(f => [f, { dialogues: [] }])),
    }) as Parameters<typeof parseDialogueLedger>[0]

  it('merges flags and the entries of every file', () => {
    const parsed = emptyParsed()
    parsed.opening = { dialogues: [entry()] }
    parsed.story = {
      dialogues: [entry({ id: 'story-1', when: { flag: 'f1' } })],
    }
    const out = parseDialogueLedger(parsed, anomalyIds)
    expect(out.flags.map(f => f.name)).toEqual(['f1'])
    expect(out.entries.map(e => e.id).sort()).toEqual(['opening-1', 'story-1'])
  })
  it('rejects a duplicate id', () => {
    const parsed = emptyParsed()
    parsed.opening = { dialogues: [entry(), entry()] }
    expect(() => parseDialogueLedger(parsed, anomalyIds)).toThrow(
      /dialogue\/opening\.yaml: duplicate id "opening-1"/
    )
  })
  it('a story may only point at a flag defined in the same ledger', () => {
    const parsed = emptyParsed()
    parsed.story = {
      dialogues: [entry({ id: 'story-1', when: { flag: 'other' } })],
    }
    expect(() => parseDialogueLedger(parsed, anomalyIds)).toThrow(
      /when\.flag "other"/
    )
  })
})

describe('the real ledger in the repository', () => {
  const root = resolve(__dirname, '../..')
  const read = (p: string) => parseYaml(readFileSync(resolve(root, p), 'utf8'))
  const realIds = new Set(
    parseLedger(read('prompts/anomalies.yaml')).map(e => e.id)
  )
  const parsed = { flags: read('dialogue/flags.yaml') } as Parameters<
    typeof parseDialogueLedger
  >[0]
  for (const f of DIALOGUE_FILES) parsed[f] = read(`dialogue/${f}.yaml`)

  it('passes validation', () => {
    expect(() => parseDialogueLedger(parsed, realIds)).not.toThrow()
  })

  const ledger = parseDialogueLedger(parsed, realIds)
  const count = (pred: (e: (typeof ledger.entries)[number]) => boolean) =>
    ledger.entries.filter(pred).length

  it.each(['dawn', 'withdraw'] as const)(
    'has at least one closing for %s',
    result => {
      expect(
        count(e => e.kind === 'closing' && e.when.result === result)
      ).toBeGreaterThanOrEqual(1)
    }
  )
  it.each(['few', 'mid', 'many'] as const)(
    'has at least one midpoint for stage %s',
    stage => {
      expect(
        count(e => e.kind === 'midpoint' && e.when.stage === stage)
      ).toBeGreaterThanOrEqual(1)
    }
  )
  it.each(['opening', 'chatter', 'false-report'] as const)(
    'has at least one %s',
    kind => {
      expect(count(e => e.kind === kind)).toBeGreaterThanOrEqual(1)
    }
  )
})
