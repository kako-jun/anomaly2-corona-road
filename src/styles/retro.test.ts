import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import postcss from 'postcss'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const uiDir = join(root, 'public/ui')
const cssPath = join(root, 'src/styles/retro.css')
const css = readFileSync(cssPath, 'utf8')
const uiFiles = readdirSync(uiDir)

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap(name => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

const sources = [
  ...walk(join(root, 'src')).filter(
    p => /\.(css|tsx?)$/.test(p) && !/\.test\.tsx?$/.test(p)
  ),
  join(root, 'index.html'),
]
const referenced = new Set<string>()
for (const p of sources) {
  for (const m of readFileSync(p, 'utf8').matchAll(/\/ui\/([\w.-]+\.webp)/g))
    referenced.add(m[1])
}

const root_ = postcss.parse(css)
const px = (selector: string, prop: string): number[] => {
  const out: number[] = []
  root_.walkRules(rule => {
    if (!rule.selectors.includes(selector)) return
    rule.walkDecls(prop, d => {
      const m = /^(\d+(?:\.\d+)?)px$/.exec(d.value.trim())
      if (m) out.push(Number(m[1]))
    })
  })
  return out
}
const decls = (selector: string, prop: string): string[] => {
  const out: string[] = []
  root_.walkRules(rule => {
    if (!rule.selectors.includes(selector)) return
    rule.walkDecls(prop, d => void out.push(d.value))
  })
  return out
}

describe('retro part images (public/ui)', () => {
  it('every referenced /ui/*.webp exists', () => {
    expect(referenced.size).toBeGreaterThan(0)
    for (const name of referenced) expect(uiFiles, name).toContain(name)
  })

  it('has no orphan images that nothing references', () => {
    const orphans = uiFiles.filter(f => !referenced.has(f))
    expect(orphans).toEqual([])
  })

  it('stays within the size budget', () => {
    const sizes = uiFiles.map(f => statSync(join(uiDir, f)).size)
    expect(sizes.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(600 * 1024)
    for (const [i, s] of sizes.entries())
      expect(s, uiFiles[i]).toBeLessThanOrEqual(150 * 1024)
  })

  it('every file is a real webp, not empty or tiny', () => {
    for (const f of uiFiles) {
      const buf = readFileSync(join(uiDir, f))
      expect(buf.length, f).toBeGreaterThan(200)
      expect(buf.subarray(0, 4).toString('ascii'), f).toBe('RIFF')
      expect(buf.subarray(8, 12).toString('ascii'), f).toBe('WEBP')
    }
  })
})

describe('retro.css', () => {
  it('shares the cabinet surface with the report dialog', () => {
    expect(
      decls('.dialog', 'background').some(v => v.includes('/ui/surface.webp'))
    ).toBe(true)
  })

  it('stops the clock animation when reduced motion is requested', () => {
    expect(
      decls('.clock-colon', 'animation').some(
        v =>
          v.includes('clock-blink') &&
          v.includes('ease-in-out') &&
          !v.includes('steps(')
      )
    ).toBe(true)
    let reduced = false
    root_.walkAtRules('media', media => {
      if (!media.params.includes('prefers-reduced-motion: reduce')) return
      media.walkRules('.clock-colon', rule => {
        rule.walkDecls('animation', d => {
          if (d.value === 'none') reduced = true
        })
      })
    })
    expect(reduced).toBe(true)
  })
  it('has no external URLs', () => {
    expect(css).not.toMatch(/url\(\s*['"]?https?:/i)
    expect(css).not.toMatch(/@import\s+(url\()?\s*['"]?https?:/i)
  })

  it('keeps key and knob tap targets at 44px or more', () => {
    for (const sel of ['.key', '.cam-cell .key', '.cat-grid .key']) {
      const h = px(sel, 'min-height')
      expect(h.length, sel).toBeGreaterThan(0)
      expect(Math.min(...h), sel).toBeGreaterThanOrEqual(44)
    }
    for (const prop of ['width', 'height']) {
      const v = px('.knob', prop)
      expect(v.length, prop).toBeGreaterThan(0)
      expect(Math.min(...v), prop).toBeGreaterThanOrEqual(44)
    }
  })

  it('keeps the --wear A/B hook on the cabinet dirt layer', () => {
    expect(
      decls('.cabinet::before', 'opacity').some(v => v.includes('var(--wear)'))
    ).toBe(true)
  })

  it('sets a positive px padding-top on all cabinet keys', () => {
    const tops = decls('.key', 'padding-top')
    expect(tops.length).toBeGreaterThan(0)
    for (const v of tops) {
      const m = /^(\d+(?:\.\d+)?)px(?:\s*!important)?$/.exec(v.trim())
      expect(m, v).not.toBeNull()
      expect(Number(m![1]), v).toBeGreaterThan(0)
    }
  })

  it('positions category labels slightly above the cabinet key labels', () => {
    const cabinet = decls('.key', 'padding-top').map(parseFloat)
    const category = decls('.cat-grid .key', 'padding-top').map(parseFloat)
    expect(cabinet.length).toBeGreaterThan(0)
    expect(category.length).toBeGreaterThan(0)
    expect(category.at(-1)!).toBeLessThan(cabinet.at(-1)!)
  })
})

describe('monitor frame opening (#283)', () => {
  // the last .glass rule that declares clip-path carries the opening group and the outline
  const glass = (() => {
    let found: postcss.Rule | undefined
    root_.walkRules(rule => {
      if (
        rule.selectors.includes('.glass') &&
        rule.some(n => n.type === 'decl' && n.prop === '--img-w')
      )
        found = rule
    })
    return found!
  })()
  const prop = (name: string) =>
    Number(
      glass.nodes
        .find(n => n.type === 'decl' && n.prop === name)!
        .toString()
        .split(':')[1]
    )
  const val = (name: string) =>
    (
      glass.nodes.find(
        n => n.type === 'decl' && n.prop === name
      ) as postcss.Declaration
    ).value

  it('holds the opening as one numeric group that the glass box derives from', () => {
    expect(glass).toBeDefined()
    for (const k of [
      '--img-w',
      '--img-h',
      '--open-l',
      '--open-t',
      '--open-r',
      '--open-b',
      '--open-pad',
    ])
      expect(Number.isFinite(prop(k)), k).toBe(true)
    for (const side of ['left', 'top', 'width', 'height']) {
      expect(val(side), side).toMatch(/var\(--open-/)
      expect(val(side), side).not.toMatch(/^\d/)
    }
  })

  it('matches the real pixel size of bezel_mon.webp', () => {
    const buf = readFileSync(join(uiDir, 'bezel_mon.webp'))
    expect(buf.subarray(12, 16).toString('ascii')).toBe('VP8X')
    const w = buf.readUIntLE(24, 3) + 1
    const h = buf.readUIntLE(27, 3) + 1
    expect(w).toBe(prop('--img-w'))
    expect(h).toBe(prop('--img-h'))
  })

  it('keeps the visible frame equally thick on all four sides', () => {
    const W = prop('--img-w')
    const H = prop('--img-h')
    const l = prop('--open-l')
    const t = prop('--open-t')
    const r = W - prop('--open-r')
    const b = H - prop('--open-b')
    // the box ratio is the picture ratio (+-2%), so equal picture thickness after the aspect stretch means:
    // horizontal margin * (picture h / w) ~ vertical margin
    const stretch = W / H / 0.741
    for (const v of [t * stretch, b * stretch, r])
      expect(Math.abs(v - l) / l).toBeLessThan(0.04)
  })

  it('traces the clip-path from the same opening (outline spans the glass box minus the pad)', () => {
    const W = prop('--img-w')
    const H = prop('--img-h')
    const pad = prop('--open-pad')
    const gw = prop('--open-r') - prop('--open-l') + 2 * pad
    const gh = prop('--open-b') - prop('--open-t') + 2 * pad
    const m = /polygon\(([^)]*)\)/.exec(val('clip-path'))!
    const pts = m[1].split(',').map(p => p.trim().split(/\s+/).map(parseFloat))
    const xs = pts.map(p => p[0])
    const ys = pts.map(p => p[1])
    expect(pts.length).toBeGreaterThan(60)
    expect(Math.min(...xs)).toBeCloseTo((pad / gw) * 100, 0)
    expect(Math.max(...xs)).toBeCloseTo(100 - (pad / gw) * 100, 0)
    expect(Math.min(...ys)).toBeCloseTo((pad / gh) * 100, 0)
    expect(Math.max(...ys)).toBeCloseTo(100 - (pad / gh) * 100, 0)
    expect(W).toBeGreaterThan(0)
    expect(H).toBeGreaterThan(0)
  })

  it('draws no CSS box outline around the frame picture (no double outline)', () => {
    for (const prop of ['border-radius', 'box-shadow'])
      for (const v of decls('.bezel', prop))
        expect(v.trim(), `.bezel ${prop}`).toMatch(/^(0|0px|none)$/)
    expect(decls('.bezel', 'filter').at(-1)).toMatch(/^drop-shadow\(/)
  })
})
