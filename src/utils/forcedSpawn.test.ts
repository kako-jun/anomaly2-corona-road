import { describe, expect, it } from 'vitest'
import { forcedSpawnIds } from './forcedSpawn'

describe('forcedSpawnIds (dev only)', () => {
  it('reads ?force= in dev, one or several ids', () => {
    expect([...forcedSpawnIds('?force=RT-RULE-01', true)!]).toEqual([
      'RT-RULE-01',
    ])
    expect([...forcedSpawnIds('?force=RT-RULE-01,RT-UI-11', true)!]).toEqual([
      'RT-RULE-01',
      'RT-UI-11',
    ])
  })
  it('never reads the URL in a production build', () => {
    expect(forcedSpawnIds('?force=RT-RULE-01', false)).toBeNull()
  })
  it('ignores nothing-ish and malformed values', () => {
    expect(forcedSpawnIds('', true)).toBeNull()
    expect(forcedSpawnIds('?force=', true)).toBeNull()
    expect(forcedSpawnIds('?force=junk,<script>', true)).toBeNull()
  })
})
