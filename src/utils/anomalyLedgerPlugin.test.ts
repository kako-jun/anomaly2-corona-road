import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { IMAGE_ANOMALY_TYPES } from './anomalyLedger'

// The Vite plugin in vite.config.ts reads the YAML and checks overlay files. Its failure modes are
// build errors, so exercise load() directly with fs replaced for the ledger path only.
const fsMock = vi.hoisted(() => ({
  yaml: '' as string,
  existing: new Set<string>(),
}))
vi.mock('node:fs', async importOriginal => {
  const actual = await importOriginal<typeof import('node:fs')>()
  const isLedger = (p: unknown) => String(p).endsWith('prompts/anomalies.yaml')
  return {
    ...actual,
    readFileSync: ((p: never, ...rest: never[]) =>
      isLedger(p)
        ? fsMock.yaml
        : (actual.readFileSync as (...a: unknown[]) => unknown)(
            p,
            ...rest
          )) as typeof actual.readFileSync,
    existsSync: ((p: unknown) =>
      String(p).includes('assets/anomaly-overlays/')
        ? fsMock.existing.has(String(p).replace(/^.*?(assets\/)/, '$1'))
        : actual.existsSync(p as string)) as typeof actual.existsSync,
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
    p => p?.name === 'anomaly-ledger'
  )
  if (!plugin) throw new Error('anomaly-ledger plugin not found')
  return plugin as unknown as Hook
}

const entryYaml = (over: Record<string, string> = {}) => {
  const f = {
    id: 'a1',
    camera_id: 'CAM01',
    category: 'object',
    anomaly_type: 'add_object',
    overlay: 'assets/anomaly-overlays/cam01/a1.webp',
    overlay_origin: '(1,2)',
    dimensions: '3x4',
    ...over,
  }
  return Object.entries(f)
    .map(([k, v], i) => `${i === 0 ? '  - ' : '    '}${k}: '${v}'`)
    .join('\n')
}

const run = async (yaml: string) => {
  fsMock.yaml = yaml
  const p = await loadPlugin()
  const addWatchFile = vi.fn()
  const out = p.load.call({ addWatchFile }, '\0virtual:anomalies')
  return { out, addWatchFile }
}

beforeEach(() => {
  fsMock.existing = new Set(['assets/anomaly-overlays/cam01/a1.webp'])
})
afterEach(() => {
  fsMock.yaml = ''
})

describe('anomaly-ledger vite plugin', () => {
  it('resolves only the virtual id', async () => {
    const p = await loadPlugin()
    expect(p.resolveId('virtual:anomalies')).toBe('\0virtual:anomalies')
    expect(p.resolveId('react')).toBeUndefined()
  })

  it('ignores other module ids in load()', async () => {
    const p = await loadPlugin()
    expect(p.load.call({ addWatchFile: vi.fn() }, 'other')).toBeUndefined()
  })

  it('emits an ES module exporting the trimmed entries and watches the YAML', async () => {
    const { out, addWatchFile } = await run(`anomalies:\n${entryYaml()}\n`)
    expect(out).toMatch(/^export default /)
    const json = JSON.parse((out as string).replace('export default ', ''))
    expect(json).toEqual([
      {
        id: 'a1',
        cameraId: 1,
        category: 'Object',
        anomalyType: 'add_object',
        overlay: 'assets/anomaly-overlays/cam01/a1.webp',
        origin: { x: 1, y: 2 },
        size: { w: 3, h: 4 },
      },
    ])
    expect(addWatchFile).toHaveBeenCalledTimes(1)
  })

  it('fails the build when the overlay file is missing, naming the entry', async () => {
    fsMock.existing = new Set()
    await expect(run(`anomalies:\n${entryYaml()}\n`)).rejects.toThrow(
      /entry "a1": overlay file not found: assets\/anomaly-overlays\/cam01\/a1\.webp/
    )
  })

  it('fails the build on a malformed origin', async () => {
    await expect(
      run(`anomalies:\n${entryYaml({ overlay_origin: '1,2' })}\n`)
    ).rejects.toThrow(/entry "a1".*overlay_origin/)
  })

  it('fails the build on malformed dimensions', async () => {
    await expect(
      run(`anomalies:\n${entryYaml({ dimensions: '0x4' })}\n`)
    ).rejects.toThrow(/entry "a1".*dimensions/)
  })

  it('fails the build on an unknown category', async () => {
    await expect(
      run(`anomalies:\n${entryYaml({ category: 'ghost' })}\n`)
    ).rejects.toThrow(/entry "a1".*category/)
  })

  it('fails the build on an overlay path of the wrong shape, naming the entry', async () => {
    await expect(
      run(`anomalies:\n${entryYaml({ overlay: 'assets/other/a1.webp' })}\n`)
    ).rejects.toThrow(/entry "a1".*overlay/)
  })

  describe('anomaly_type', () => {
    it.each([
      ['single-quoted', `'displace'`],
      ['double-quoted', `"displace"`],
      ['unquoted', 'displace'],
    ])('accepts a %s value and emits it', async (_n, v) => {
      const yaml = `anomalies:\n${entryYaml().replace(
        `anomaly_type: 'add_object'`,
        `anomaly_type: ${v}`
      )}\n`
      const { out } = await run(yaml)
      const json = JSON.parse((out as string).replace('export default ', ''))
      expect(json[0].anomalyType).toBe('displace')
    })

    it('builds a ledger holding all 12 types', async () => {
      fsMock.existing = new Set(
        IMAGE_ANOMALY_TYPES.map(t => `assets/anomaly-overlays/cam01/${t}.webp`)
      )
      const body = IMAGE_ANOMALY_TYPES.map(t =>
        entryYaml({
          id: t,
          anomaly_type: t,
          overlay: `assets/anomaly-overlays/cam01/${t}.webp`,
        })
      ).join('\n')
      const { out } = await run(`anomalies:\n${body}\n`)
      const json = JSON.parse((out as string).replace('export default ', ''))
      expect(json.map((e: { anomalyType: string }) => e.anomalyType)).toEqual([
        ...IMAGE_ANOMALY_TYPES,
      ])
    })

    it('fails the build on an unknown type, naming the entry', async () => {
      await expect(
        run(`anomalies:\n${entryYaml({ anomaly_type: 'ghost' })}\n`)
      ).rejects.toThrow(/entry "a1".*anomaly_type "ghost"/)
    })

    it('fails the build when the anomaly_type line is missing', async () => {
      const yaml = entryYaml()
        .split('\n')
        .filter(l => !l.includes('anomaly_type'))
        .join('\n')
      await expect(run(`anomalies:\n${yaml}\n`)).rejects.toThrow(
        /entry "a1".*"anomaly_type" is missing/
      )
    })

    it('fails the build on an empty value', async () => {
      await expect(
        run(`anomalies:\n${entryYaml({ anomaly_type: '' })}\n`)
      ).rejects.toThrow(/entry "a1".*"anomaly_type" is missing/)
    })

    it('names the second entry when only it has an unknown type', async () => {
      fsMock.existing = new Set([
        'assets/anomaly-overlays/cam01/a1.webp',
        'assets/anomaly-overlays/cam01/a2.webp',
      ])
      const yaml = `anomalies:\n${entryYaml()}\n${entryYaml({
        id: 'a2',
        anomaly_type: 'ghost',
        overlay: 'assets/anomaly-overlays/cam01/a2.webp',
      })}\n`
      await expect(run(yaml)).rejects.toThrow(
        /entry "a2".*anomaly_type "ghost"/
      )
    })
  })

  it('fails the build on duplicate ids', async () => {
    await expect(
      run(`anomalies:\n${entryYaml()}\n${entryYaml()}\n`)
    ).rejects.toThrow(/duplicate id "a1"/)
  })

  it('fails the build when the anomalies list is missing', async () => {
    await expect(run('other: 1\n')).rejects.toThrow(
      /"anomalies" list is missing/
    )
  })

  describe('category as an array (#347)', () => {
    // entryYaml() writes `category: 'object'`; swap that one line for the given YAML.
    const withCat = (line: string, id = 'a1') =>
      entryYaml({
        id,
        overlay: `assets/anomaly-overlays/cam01/${id}.webp`,
      }).replace("category: 'object'", line)
    const doc = (...entries: string[]) => `anomalies:\n${entries.join('\n')}\n`
    const parse = (out: unknown) =>
      JSON.parse((out as string).replace('export default ', ''))

    it.each([
      ['single-quoted', "category: ['object', 'person']"],
      ['double-quoted', 'category: ["object", "person"]'],
      ['unquoted', 'category: [object, person]'],
      ['a block sequence', 'category:\n      - object\n      - person'],
    ])('emits categories from %s', async (_n, line) => {
      const { out } = await run(doc(withCat(line)))
      const json = parse(out)
      expect(json[0].categories).toEqual(['Object', 'Person'])
      expect(json[0].category).toBe('Object')
    })

    it('keeps the order and accepts three items', async () => {
      const { out } = await run(
        doc(withCat("category: [' surreal ', 'environment', 'person']"))
      )
      expect(parse(out)[0].categories).toEqual([
        'Surreal',
        'Environment',
        'Person',
      ])
    })

    it('accepts camera second or later', async () => {
      const { out } = await run(
        doc(withCat("category: ['environment', 'camera']"))
      )
      expect(parse(out)[0].categories).toEqual(['Environment', 'Camera'])
    })

    it.each([
      ['an unknown item', "category: ['object', 'ghost']", /category "ghost"/],
      ['a duplicate', "category: ['object', 'Object']", /duplicated/],
      ['camera first', "category: ['camera', 'object']", /cannot be first/],
      ['an empty array', 'category: []', /category/],
    ])('fails the build on %s, naming the entry', async (_n, line, re) => {
      await expect(run(doc(withCat(line)))).rejects.toThrow(re)
      await expect(run(doc(withCat(line)))).rejects.toThrow(/entry "a1"/)
    })

    it('names the second entry when only it is invalid', async () => {
      fsMock.existing = new Set([
        'assets/anomaly-overlays/cam01/a1.webp',
        'assets/anomaly-overlays/cam01/a2.webp',
      ])
      await expect(
        run(
          doc(
            withCat("category: ['object', 'person']"),
            withCat("category: ['object', 'ghost']", 'a2')
          )
        )
      ).rejects.toThrow(/entry "a2".*category/)
    })

    it('a string category leaves the entry without a categories key', async () => {
      const { out } = await run(doc(entryYaml()))
      expect('categories' in parse(out)[0]).toBe(false)
    })
  })
})

describe('anomaly-ledger vite plugin: kind / status (#77)', () => {
  const planned = (id = 'p1', over: Record<string, string> = {}) =>
    entryYaml({ id, ...over })
      .split('\n')
      .filter(l => !/overlay|dimensions/.test(l))
      .join('\n') + `\n    status: 'planned'\n    spec: 'pool#${id}'`
  const nonImage = (id: string, fields: Record<string, string>) =>
    Object.entries({
      id,
      kind: 'non_image',
      status: 'planned',
      detail: 'd',
      ...fields,
    })
      .map(([k, v], i) => `${i === 0 ? '  - ' : '    '}${k}: '${v}'`)
      .join('\n')
  const mixed = () =>
    `anomalies:\n${[
      entryYaml(),
      planned(),
      nonImage('r1', { anomaly_type: 'feed_glitch', category: 'camera' }),
      nonImage('r2', { anomaly_type: 'sound', category: 'environment' }),
      nonImage('r3', { anomaly_type: 'rule_break', status: 'produced' }),
    ].join('\n')}\n`
  const parse = (out: unknown) =>
    JSON.parse((out as string).replace('export default ', ''))

  it('emits only image+produced entries from a mixed ledger', async () => {
    const { out } = await run(mixed())
    expect(parse(out).map((e: { id: string }) => e.id)).toEqual(['a1'])
  })

  it('does not require overlay files for planned or non-image entries', async () => {
    // only a1's overlay exists (beforeEach); planned/non-image have none and none is checked
    await expect(run(mixed())).resolves.toBeDefined()
  })

  it('does not check the overlay file of a planned entry that declares one', async () => {
    const withOverlay = `${planned('p2')}\n    overlay: 'assets/anomaly-overlays/cam01/missing.webp'\n    overlay_origin: '(1,2)'\n    dimensions: '3x4'`
    const yaml = `anomalies:\n${entryYaml()}\n${withOverlay}\n`
    const { out } = await run(yaml)
    expect(parse(out)).toHaveLength(1)
  })

  it('still fails when an image+produced overlay file is missing in a mixed ledger', async () => {
    fsMock.existing = new Set()
    await expect(run(mixed())).rejects.toThrow(
      /entry "a1": overlay file not found/
    )
  })

  it('fails the build on an invalid planned entry, naming it', async () => {
    const yaml = `anomalies:\n${entryYaml()}\n${planned('p1', { category: 'ghost' })}\n`
    await expect(run(yaml)).rejects.toThrow(/entry "p1".*category "ghost"/)
  })

  it('fails the build on an invalid non-image entry, naming it', async () => {
    const yaml = `anomalies:\n${entryYaml()}\n${nonImage('r1', { anomaly_type: 'feed_glitch', category: 'object' })}\n`
    await expect(run(yaml)).rejects.toThrow(/entry "r1".*feed_glitch/)
  })

  it('fails the build on an unknown status', async () => {
    const yaml = `anomalies:\n${entryYaml()}\n    status: 'done'\n`
    await expect(run(yaml)).rejects.toThrow(/entry "a1".*status "done"/)
  })

  it('fails the build on duplicate ids across kinds', async () => {
    const yaml = `anomalies:\n${entryYaml()}\n${nonImage('a1', { anomaly_type: 'sound', category: 'environment' })}\n`
    await expect(run(yaml)).rejects.toThrow(/duplicate id "a1"/)
  })
})
