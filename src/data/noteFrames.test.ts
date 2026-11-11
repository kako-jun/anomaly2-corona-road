import { readFileSync, readdirSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  EDGE_NAMES,
  FRAMES,
  MAX_THICKNESS_RATIO,
  MIN_OPPOSITE_TILT_GAP,
  MIN_TILT_GAP_BETWEEN_FRAMES,
  OVERSHOOT_RANGE,
  TILT_RANGE,
} from './noteFrames'
import type { FrameSpec } from './noteFrames'
import { frameEdges } from '../utils/handFrame'

const abs = Math.abs
const edgesOf = (s: FrameSpec) => EDGE_NAMES.map(n => s[n])

describe('hand-ruled frames of the CSS boxes (table)', () => {
  for (const [name, spec] of Object.entries(FRAMES)) {
    it(`${name}: tilt, overshoot, thickness and ink vary edge by edge`, () => {
      const es = edgesOf(spec)
      for (const e of es) {
        expect(abs(e.tilt)).toBeGreaterThanOrEqual(TILT_RANGE[0])
        expect(abs(e.tilt)).toBeLessThanOrEqual(TILT_RANGE[1])
        for (const o of [e.start, e.end]) {
          expect(abs(o)).toBeGreaterThanOrEqual(OVERSHOOT_RANGE[0])
          expect(abs(o)).toBeLessThanOrEqual(OVERSHOOT_RANGE[1])
        }
        for (const [a, b] of [[e.w0, e.w1]]) {
          expect(Math.max(a, b) / Math.min(a, b)).toBeLessThanOrEqual(
            MAX_THICKNESS_RATIO
          )
        }
      }
      // some corners stick out, some stop short (not all the same kind)
      const overs = es.flatMap(e => [e.start, e.end])
      expect(overs.some(o => o > 0) && overs.some(o => o < 0)).toBe(true)
      // opposite edges are not parallel
      expect(abs(spec.top.tilt - spec.bottom.tilt)).toBeGreaterThanOrEqual(
        MIN_OPPOSITE_TILT_GAP
      )
      expect(abs(spec.left.tilt - spec.right.tilt)).toBeGreaterThanOrEqual(
        MIN_OPPOSITE_TILT_GAP
      )
      // the ink is not the same on every edge, and at least one edge varies in thickness
      expect(new Set(es.map(e => e.alpha)).size).toBeGreaterThanOrEqual(3)
      expect(
        es.some(e => Math.max(e.w0, e.w1) / Math.min(e.w0, e.w1) >= 1.1)
      ).toBe(true)
    })
  }
  it('no two boxes share an edge angle', () => {
    const all = Object.values(FRAMES).flatMap(s => edgesOf(s).map(e => e.tilt))
    for (let i = 0; i < all.length; i++)
      for (let j = i + 1; j < all.length; j++)
        expect(abs(all[i] - all[j])).toBeGreaterThanOrEqual(
          MIN_TILT_GAP_BETWEEN_FRAMES
        )
  })
})

describe('frameEdges (geometry)', () => {
  const edges = frameEdges(80, 28, FRAMES.stamp, 2)
  it('gives four separate quads that are not joined into a closed outline', () => {
    expect(edges).toHaveLength(4)
    const key = (p: number[]) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`
    const seen = new Set(edges.flatMap(e => e.points.map(key)))
    expect(seen.size).toBe(16) // no corner is shared between two edges
  })
  it('is deterministic (no randomness)', () => {
    expect(frameEdges(80, 28, FRAMES.stamp, 2)).toEqual(edges)
  })
  it('the top edge is nearly horizontal but not exactly', () => {
    const [a, b] = [edges[0].points[0], edges[0].points[1]]
    const deg = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
    expect(abs(deg)).toBeGreaterThan(0.1)
    expect(abs(deg)).toBeLessThan(2)
  })
})

describe('hand-ruled frames of the sketches (public/note/*.svg)', () => {
  const files = readdirSync('public/note').filter(f => f.endsWith('.svg'))
  const frameOf = (f: string) => {
    const svg = readFileSync(`public/note/${f}`, 'utf8')
    const g = svg.match(/<g id="frame">(.*?)<\/g>/s)
    expect(g, f).not.toBeNull()
    return g![1]
  }
  const edgeAngles = (f: string): number[] => {
    const parts = [...frameOf(f).matchAll(/<path d="([^"]+)" class="fr"/g)].map(
      m => m[1]
    )
    expect(parts, f).toHaveLength(4)
    return parts.map(d => {
      const nums = d.match(/-?\d+(?:\.\d+)?/g)!.map(Number)
      let a: number[], b: number[]
      if (d.endsWith('Z')) {
        // tapered quad: centre line = mid of (p0,p3) and (p1,p2)
        a = [(nums[0] + nums[6]) / 2, (nums[1] + nums[7]) / 2]
        b = [(nums[2] + nums[4]) / 2, (nums[3] + nums[5]) / 2]
      } else {
        a = [nums[0], nums[1]]
        b = [nums[2], nums[3]]
      }
      return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
    })
  }
  it('has the six sketch frames', () => expect(files).toHaveLength(6))
  it('has no paper-coloured or white fill behind a face: the frame group is only the four edges', () => {
    for (const f of files) {
      const fr = frameOf(f)
      expect(fr.match(/<path /g), f).toHaveLength(4)
      expect(fr, f).not.toMatch(/#f7f0dc|#fff|white/i)
    }
  })
  for (const f of files) {
    it(`${f}: four separate straight edges, opposite edges not parallel, nothing curved`, () => {
      const fr = frameOf(f)
      expect(fr.match(/class="fr"/g)).toHaveLength(4)
      for (const m of fr.matchAll(/ d="([^"]+)"/g))
        expect(m[1]).not.toMatch(/[CcQqSsAa]/) // straight segments only
      const a = edgeAngles(f)
      // top / bottom both run left to right; right / left both run top to bottom
      expect(abs(a[0] - a[2])).toBeGreaterThanOrEqual(0.2)
      expect(abs(a[1] - a[3])).toBeGreaterThanOrEqual(0.2)
    })
  }
  it('no two sketch frames share an edge angle (each is drawn on its own; compared edge position by edge position)', () => {
    const per = files.map(edgeAngles)
    for (let k = 0; k < 4; k++)
      for (let i = 0; i < per.length; i++)
        for (let j = i + 1; j < per.length; j++)
          expect(
            abs(per[i][k] - per[j][k]),
            `${files[i]} / ${files[j]} edge ${k}`
          ).toBeGreaterThanOrEqual(0.1)
  })
  it('keeps the drawings inside untouched in size (a few KB each)', () => {
    for (const f of files)
      expect(readFileSync(`public/note/${f}`).length).toBeLessThan(6000)
  })
})
