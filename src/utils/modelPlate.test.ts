import { beforeEach, describe, expect, it, vi } from 'vitest'

const fresh = async (foundUnique: number | undefined) => {
  vi.resetModules()
  vi.doMock('virtual:dialogue', () => ({
    default: {
      entries: [],
      flags: [
        { name: 'elder1', when: { foundUnique: 10 } },
        {
          name: 'child',
          when: foundUnique === undefined ? {} : { foundUnique },
        },
      ],
    },
  }))
  return import('./modelPlate')
}

beforeEach(() => vi.resetModules())

describe('model plate number (RT-UI-14 / RT-UI-28)', () => {
  it('RT-UI-14 swaps the printed 42 for 24; nothing running leaves the plate as printed', async () => {
    const m = await fresh(100)
    expect(m.plateNumber(new Set(['RT-UI-14']))).toBe('24')
    expect(m.plateNumber(new Set())).toBeUndefined()
    expect(m.plateNumber(new Set(['RT-UI-11']))).toBeUndefined()
  })
  it('RT-UI-28 reads the child milestone from the story flags (follows a changed milestone, not written in code)', async () => {
    expect((await fresh(100)).plateNumber(new Set(['RT-UI-28']))).toBe('100')
    expect((await fresh(80)).plateNumber(new Set(['RT-UI-28']))).toBe('80')
  })
})
