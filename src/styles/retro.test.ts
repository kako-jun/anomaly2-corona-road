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

  it('sizes subtitles in cqw against the picture, with no fixed size or width @media (#295)', () => {
    const sizes = decls('.movie-sub', 'font-size')
    // the cqw declaration must come last so it wins; earlier ones are fallbacks for browsers without cqw
    expect(sizes.at(-1)).toBe('4.9cqw')
    // the picture (.glass) must be the size container the cqw resolves against
    expect(
      decls('.glass', 'container-type').some(v => /inline-size|size/.test(v))
    ).toBe(true)
  })

  it('tilts subtitles with skewX(-9deg), not font-style italic, keeping the cqw size (#306)', () => {
    expect(decls('.movie-sub', 'transform').at(-1)).toBe('skewX(-9deg)')
    expect(decls('.movie-sub', 'font-style').at(-1)).toBe('normal')
    expect(decls('.movie-sub', 'font-size').at(-1)).toBe('4.9cqw')
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

  it('pins the knob-to-label gap at 9px and keeps the portrait .tube constants = base (407/334) + that gap (#300, #309)', () => {
    // 9px is the value kako-jun chose in #309 (18px in #300 was too wide, 3px too tight);
    // it is also >= 0.15 of the 60px knob circle. Changing it is a design decision, so pin it.
    // The .tube width constants (100dvh - Npx) are the measured height of everything except
    // the picture and include this gap, so they must move by exactly the same amount.
    const PINNED_GAP = 9
    const BASE = { narrow: 407, wide: 334 } // constants when the gap was 0
    const gaps: number[] = []
    const tubeConsts: { min: boolean; n: number }[] = []
    root_.walkAtRules('media', at => {
      if (!/max-width:\s*899px/.test(at.params)) return
      const min = /min-width/.test(at.params)
      at.walkRules(rule => {
        if (rule.selectors.includes('.knob'))
          rule.walkDecls('margin-bottom', d => {
            const m = /^(\d+(?:\.\d+)?)px$/.exec(d.value.trim())
            if (m) gaps.push(Number(m[1]))
          })
        if (rule.selectors.includes('.tube'))
          rule.walkDecls('width', d => {
            const m =
              /100dvh\s*-\s*(\d+(?:\.\d+)?)px\s*-\s*var\(--plate-h\)/.exec(
                d.value
              )
            // tube width constant = base + gap, then minus the bottom strip height (#304)
            if (m) tubeConsts.push({ min, n: Number(m[1]) })
          })
      })
    })
    expect(gaps).toEqual([PINNED_GAP])
    expect(Math.min(...gaps)).toBeGreaterThanOrEqual(
      Math.min(...px('.knob', 'height')) * 0.15
    )
    expect(tubeConsts.filter(c => !c.min).map(c => c.n)).toEqual([
      BASE.narrow + gaps[0],
    ])
    expect(tubeConsts.filter(c => c.min).map(c => c.n)).toEqual([
      BASE.wide + gaps[0],
    ])
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
