import { describe, expect, it } from 'vitest'
import {
  REPORT_MISSPELLINGS,
  ghostDigit,
  hudLabel,
  reportLabel,
} from './hudText'

const fx = (...ids: string[]) => new Set(ids)

describe('hudLabel', () => {
  it('is the plain heading with no effect', () => {
    expect(hudLabel('TIME', fx())).toBe('TIME')
    expect(hudLabel('REPORTS', fx())).toBe('REPORTS')
    expect(hudLabel('STRIKES', fx())).toBe('STRIKES')
  })
  it('RT-UI-02 swaps TIME and REPORTS only', () => {
    const f = fx('RT-UI-02')
    expect(hudLabel('TIME', f)).toBe('REPORTS')
    expect(hudLabel('REPORTS', f)).toBe('TIME')
    expect(hudLabel('STRIKES', f)).toBe('STRIKES')
  })
  it('RT-UI-06 corrupts every heading (differs, same length class)', () => {
    for (const l of ['TIME', 'REPORTS', 'STRIKES'] as const) {
      const t = hudLabel(l, fx('RT-UI-06'))
      expect(t).not.toBe(l)
      expect(t).toMatch(/[▒▓█░]/)
    }
  })
  it('RT-UI-07 mixes Japanese into every heading', () => {
    for (const l of ['TIME', 'REPORTS', 'STRIKES'] as const)
      expect(hudLabel(l, fx('RT-UI-07'))).toMatch(/[ぁ-んァ-ン一-龠]/)
  })
})

describe('reportLabel / ghostDigit', () => {
  it('REPORT unless RT-UI-26 runs; then one of the misspellings, never REPORT', () => {
    expect(reportLabel(false)).toBe('REPORT')
    for (let i = 0; i < REPORT_MISSPELLINGS.length; i++)
      expect(reportLabel(true, () => i / REPORT_MISSPELLINGS.length)).toBe(
        REPORT_MISSPELLINGS[i]
      )
    for (const m of REPORT_MISSPELLINGS) expect(m).not.toBe('REPORT')
  })
  it('the ghost is always another digit', () => {
    for (let d = 0; d < 10; d++)
      expect(ghostDigit(String(d))).not.toBe(String(d))
  })
})

describe('colonVariant (RT-UI-23)', () => {
  it('is undefined when off; fast or steady (both reachable) when on', async () => {
    const { colonVariant } = await import('./hudText')
    expect(colonVariant(false)).toBeUndefined()
    expect(colonVariant(true, () => 0.1)).toBe('fast')
    expect(colonVariant(true, () => 0.9)).toBe('steady')
  })
})
