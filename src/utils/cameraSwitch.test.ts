import { describe, expect, it } from 'vitest'
import {
  SWITCH_LAG_MS,
  SWITCH_RULES,
  planSwitch,
  targetIndex,
  type SwitchRequest,
} from './cameraSwitch'

const plan = (req: SwitchRequest, fx: string[] = [], index = 3, count = 8) =>
  planSwitch(req, { fx: new Set(fx), index, count })
const edge = (to: 'prev' | 'next'): SwitchRequest => ({ source: 'edge', to })
const arrow = (to: 'prev' | 'next'): SwitchRequest => ({ source: 'arrow', to })

describe('planSwitch: the one entrance of camera switching (#442)', () => {
  it('passes every request through untouched when no rule runs', () => {
    for (const req of [
      edge('next'),
      arrow('prev'),
      { source: 'digit', to: 5 } as SwitchRequest,
      { source: 'strip', to: 0 } as SwitchRequest,
    ])
      expect(plan(req)).toEqual({ to: req.to, blocked: false, delayMs: 0 })
  })

  it('RT-RULE-01: edge taps and arrow keys go the other way; digits and strip keys do not', () => {
    expect(plan(edge('next'), ['RT-RULE-01']).to).toBe('prev')
    expect(plan(edge('prev'), ['RT-RULE-01']).to).toBe('next')
    expect(plan(arrow('next'), ['RT-RULE-01']).to).toBe('prev')
    expect(plan({ source: 'digit', to: 6 }, ['RT-RULE-01']).to).toBe(6)
    expect(plan({ source: 'strip', to: 0 }, ['RT-RULE-01']).to).toBe(0)
  })

  it('RT-RULE-05: forward from the last camera is blocked; backward, other cameras and selection are not', () => {
    expect(plan(edge('next'), ['RT-RULE-05'], 7).blocked).toBe(true)
    expect(plan(arrow('next'), ['RT-RULE-05'], 7).blocked).toBe(true)
    expect(plan(arrow('next'), ['RT-RULE-05'], 6).blocked).toBe(false)
    expect(plan(arrow('prev'), ['RT-RULE-05'], 0).blocked).toBe(false)
    expect(plan({ source: 'digit', to: 0 }, ['RT-RULE-05'], 7).blocked).toBe(
      false
    )
  })

  it('RT-RULE-01 + RT-RULE-05 together: the end that stops you is the one you are really heading for', () => {
    // reversed: a "next" tap heads backwards, so it is the first camera that is the wall for a "prev"... of the real direction
    expect(plan(edge('next'), ['RT-RULE-01', 'RT-RULE-05'], 7).blocked).toBe(
      false
    )
    expect(plan(edge('prev'), ['RT-RULE-01', 'RT-RULE-05'], 7).blocked).toBe(
      true
    )
  })

  it('RT-RULE-06: every source is delayed by SWITCH_LAG_MS (about a second)', () => {
    expect(SWITCH_LAG_MS).toBeGreaterThanOrEqual(800)
    expect(SWITCH_LAG_MS).toBeLessThanOrEqual(1500)
    for (const req of [
      edge('next'),
      arrow('prev'),
      { source: 'digit', to: 5 } as SwitchRequest,
      { source: 'strip', to: 2 } as SwitchRequest,
    ])
      expect(plan(req, ['RT-RULE-06']).delayMs).toBe(SWITCH_LAG_MS)
  })

  it('the rules are an ordered list a later batch can add to (direction is reversed before the wall is checked)', () => {
    expect(SWITCH_RULES.length).toBeGreaterThanOrEqual(3)
  })
})

describe('targetIndex', () => {
  it('steps wrap round and a selection is clamped', () => {
    expect(targetIndex('next', 7, 8)).toBe(0)
    expect(targetIndex('prev', 0, 8)).toBe(7)
    expect(targetIndex('next', 2, 8)).toBe(3)
    expect(targetIndex('prev', 2, 8)).toBe(1)
    expect(targetIndex(5, 0, 8)).toBe(5)
    expect(targetIndex(99, 0, 8)).toBe(7)
    expect(targetIndex(-1, 0, 8)).toBe(0)
  })
})
