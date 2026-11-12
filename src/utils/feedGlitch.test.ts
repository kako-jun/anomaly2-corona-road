import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import {
  FEED_GLITCH_KINDS,
  FEED_GLITCH_LEDGER_ID,
  forcedFeedGlitch,
  isFeedGlitchKind,
  seededRandom,
} from './feedGlitch'

const ledger = parse(
  readFileSync(join(process.cwd(), 'prompts/anomalies.yaml'), 'utf8')
) as { anomalies: { id: string; anomaly_type: string; note?: string }[] }
const feed = ledger.anomalies.filter(e => e.anomaly_type === 'feed_glitch')

describe('feed glitch kinds vs the ledger', () => {
  it('every kind draws an existing feed_glitch entry', () => {
    const ids = new Set(feed.map(e => e.id))
    for (const kind of FEED_GLITCH_KINDS) {
      expect(ids.has(FEED_GLITCH_LEDGER_ID[kind])).toBe(true)
    }
  })

  it('has a mapping for exactly the listed kinds', () => {
    expect(Object.keys(FEED_GLITCH_LEDGER_ID).sort()).toEqual(
      [...FEED_GLITCH_KINDS].sort()
    )
  })

  it('every feed_glitch entry is either drawn by a kind or says in its note why not', () => {
    const drawn = new Set(Object.values(FEED_GLITCH_LEDGER_ID))
    for (const e of feed) {
      if (drawn.has(e.id)) continue
      expect(e.note, `${e.id} is neither drawn nor explained`).toMatch(
        /^見送り/
      )
    }
  })
})

describe('forcedFeedGlitch', () => {
  it('reads ?glitch= in dev', () => {
    expect(forcedFeedGlitch('?glitch=blur', true)).toBe('blur')
    expect(forcedFeedGlitch('?a=1&glitch=lost', true)).toBe('lost')
  })

  it('never reads the URL outside dev (production is unchanged)', () => {
    for (const kind of FEED_GLITCH_KINDS) {
      expect(forcedFeedGlitch(`?glitch=${kind}`, false)).toBeUndefined()
    }
  })

  it('ignores a missing or unknown kind', () => {
    expect(forcedFeedGlitch('', true)).toBeUndefined()
    expect(forcedFeedGlitch('?glitch=nope', true)).toBeUndefined()
    expect(isFeedGlitchKind('static')).toBe(true)
    expect(isFeedGlitchKind(3)).toBe(false)
  })
})

describe('seededRandom', () => {
  it('repeats for the same seed and stays in [0, 1)', () => {
    const a = seededRandom(5)
    const b = seededRandom(5)
    for (let i = 0; i < 20; i++) {
      const v = a()
      expect(v).toBe(b())
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})
