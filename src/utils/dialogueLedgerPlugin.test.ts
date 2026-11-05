import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The dialogue-ledger plugin in vite.config.ts reads dialogue/*.yaml and prompts/anomalies.yaml.
// Its failure modes are build errors, so exercise load() directly with fs replaced for those files.
const fsMock = vi.hoisted(() => ({
  files: {} as Record<string, string>,
}))
vi.mock('node:fs', async importOriginal => {
  const actual = await importOriginal<typeof import('node:fs')>()
  const key = (p: unknown): string | undefined => {
    const s = String(p)
    if (s.endsWith('prompts/anomalies.yaml')) return 'anomalies'
    const m = /dialogue\/([^/]+)\.yaml$/.exec(s)
    return m ? m[1] : undefined
  }
  return {
    ...actual,
    readFileSync: ((p: never, ...rest: never[]) => {
      const k = key(p)
      return k !== undefined && k in fsMock.files
        ? fsMock.files[k]
        : (actual.readFileSync as (...a: unknown[]) => unknown)(p, ...rest)
    }) as typeof actual.readFileSync,
  }
})

type Hook = {
  resolveId: (id: string) => string | undefined
  load: (this: { addWatchFile: (p: string) => void }, id: string) => unknown
}

const loadPlugin = async (): Promise<Hook> => {
  const config = (await import('../../vite.config')).default as {
    plugins: unknown[]
  }
  const plugin = (config.plugins.flat(Infinity) as { name?: string }[]).find(
    p => p?.name === 'dialogue-ledger'
  )
  if (!plugin) throw new Error('dialogue-ledger plugin not found')
  return plugin as unknown as Hook
}

const anomalies = `anomalies:
  - id: 'a1'
    camera_id: 'CAM01'
    category: 'object'
    anomaly_type: 'add_object'
    overlay: 'assets/anomaly-overlays/cam01/a1.webp'
    overlay_origin: '(1,2)'
    dimensions: '3x4'
`

const entry = (id: string, extra = '') =>
  `  - id: ${id}\n    tone: light\n${extra}    lines:\n      - { who: A, text: 'あ' }\n`

const good = (): Record<string, string> => ({
  anomalies,
  flags: 'flags:\n  f1:\n    loops: 1\n',
  opening: `dialogues:\n${entry('opening-1')}`,
  closing: `dialogues:\n${entry('closing-1', '    when: { result: dawn }\n')}`,
  midpoint: 'dialogues: []\n',
  chatter: 'dialogues: []\n',
  story: `dialogues:\n${entry('story-1', '    when: { flag: f1 }\n')}`,
  'false-report': 'dialogues: []\n',
  'anomaly-lines': `dialogues:\n${entry('an-a1-1', '    when: { anomaly: a1 }\n')}`,
})

const run = async (files: Record<string, string>) => {
  fsMock.files = files
  const p = await loadPlugin()
  const addWatchFile = vi.fn()
  const out = p.load.call({ addWatchFile }, '\0virtual:dialogue')
  return { out, addWatchFile }
}

beforeEach(() => {
  fsMock.files = {}
})
afterEach(() => {
  fsMock.files = {}
})

describe('dialogue-ledger vite plugin', () => {
  it('resolves only the virtual id', async () => {
    const p = await loadPlugin()
    expect(p.resolveId('virtual:dialogue')).toBe('\0virtual:dialogue')
    expect(p.resolveId('virtual:anomalies')).toBeUndefined()
  })

  it('ignores other module ids in load()', async () => {
    const p = await loadPlugin()
    expect(p.load.call({ addWatchFile: vi.fn() }, 'other')).toBeUndefined()
  })

  it('emits an ES module whose default export is the parsed ledger JSON', async () => {
    const { out } = await run(good())
    expect(out).toMatch(/^export default /)
    const json = JSON.parse((out as string).replace('export default ', ''))
    expect(json.flags).toEqual([{ name: 'f1', when: { loops: 1 } }])
    expect(json.entries.map((e: { id: string }) => e.id).sort()).toEqual([
      'an-a1-1',
      'closing-1',
      'opening-1',
      'story-1',
    ])
  })

  it('watches the anomaly ledger and every dialogue file', async () => {
    const { addWatchFile } = await run(good())
    const paths = addWatchFile.mock.calls.map(c => String(c[0]))
    expect(paths.some(p => p.endsWith('prompts/anomalies.yaml'))).toBe(true)
    expect(paths.some(p => p.endsWith('dialogue/flags.yaml'))).toBe(true)
    for (const f of [
      'opening',
      'closing',
      'midpoint',
      'chatter',
      'story',
      'false-report',
      'anomaly-lines',
    ]) {
      expect(paths.some(p => p.endsWith(`dialogue/${f}.yaml`))).toBe(true)
    }
  })

  it('fails the build on a broken entry, naming the file and the id', async () => {
    const files = good()
    files.opening = `dialogues:\n${entry('opening-1').replace('light', 'sad')}`
    await expect(run(files)).rejects.toThrow(
      /dialogue\/opening\.yaml entry "opening-1"/
    )
  })

  it('fails the build on subtitle punctuation, naming the file and the id', async () => {
    const files = good()
    files.chatter = `dialogues:\n${entry('chatter-1').replace("'あ'", "'あ。'")}`
    await expect(run(files)).rejects.toThrow(
      /dialogue\/chatter\.yaml entry "chatter-1".*punctuation/
    )
  })

  it('fails the build when a line points at an anomaly not in the ledger', async () => {
    const files = good()
    files['anomaly-lines'] =
      `dialogues:\n${entry('an-zzz-1', '    when: { anomaly: zzz }\n')}`
    await expect(run(files)).rejects.toThrow(
      /dialogue\/anomaly-lines\.yaml entry "an-zzz-1".*anomaly "zzz"/
    )
  })

  it('fails the build when a flag finds an anomaly not in the ledger', async () => {
    const files = good()
    files.flags = 'flags:\n  f1:\n    found: [ghost]\n'
    await expect(run(files)).rejects.toThrow(
      /dialogue\/flags\.yaml flag "f1".*ghost/
    )
  })

  it('fails the build on a story with an undefined flag', async () => {
    const files = good()
    files.story = `dialogues:\n${entry('story-1', '    when: { flag: nope }\n')}`
    await expect(run(files)).rejects.toThrow(/entry "story-1".*"nope"/)
  })

  it('fails the build when a dialogue file is empty YAML', async () => {
    const files = good()
    files.midpoint = ''
    await expect(run(files)).rejects.toThrow(
      /dialogue\/midpoint\.yaml: top-level "dialogues" list is missing/
    )
  })
})

describe('dialogue-ledger vite plugin: planned / runtime anomalies (#77)', () => {
  const withExtraAnomalies = `${anomalies}  - id: 'p1'
    status: 'planned'
    camera_id: 'CAM01'
    category: 'object'
    anomaly_type: 'add_object'
  - id: 'r1'
    kind: 'runtime'
    status: 'planned'
    anomaly_type: 'sound'
    category: 'environment'
    detail: 'd'
`

  it('accepts lines pointing at planned and runtime anomaly ids', async () => {
    const files = good()
    files.anomalies = withExtraAnomalies
    files['anomaly-lines'] =
      `dialogues:\n${entry('an-a1-1', '    when: { anomaly: a1 }\n')}${entry('an-p1-1', '    when: { anomaly: p1 }\n')}${entry('an-r1-1', '    when: { anomaly: r1 }\n')}`
    const { out } = await run(files)
    const json = JSON.parse((out as string).replace('export default ', ''))
    expect(json.entries.map((e: { id: string }) => e.id)).toEqual(
      expect.arrayContaining(['an-p1-1', 'an-r1-1'])
    )
  })

  it('accepts a flag that finds a planned / runtime id', async () => {
    const files = good()
    files.anomalies = withExtraAnomalies
    files.flags = 'flags:\n  f1:\n    found: [p1, r1]\n'
    await expect(run(files)).resolves.toBeDefined()
  })

  it('still rejects an id that is in no part of the ledger', async () => {
    const files = good()
    files.anomalies = withExtraAnomalies
    files['anomaly-lines'] =
      `dialogues:\n${entry('an-zzz-1', '    when: { anomaly: zzz }\n')}`
    await expect(run(files)).rejects.toThrow(/anomaly "zzz"/)
  })
})
