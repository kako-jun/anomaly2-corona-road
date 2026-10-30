import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
})
