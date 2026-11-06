import { readdirSync, readFileSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
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
      decls('.clock-colon', 'animation').some(v => v.includes('clock-blink'))
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
  it('shows the complete measured frame and uses its opening as the picture edge', () => {
    // Opening measured at x=58..1104 and y=98..1443. Remeasure if the image changes.
    const imageHash = createHash('sha256')
      .update(readFileSync(join(uiDir, 'bezel_mon.webp')))
      .digest('hex')
    expect(imageHash).toBe(
      '176482f0ee57e1898744f3f2efa3a66f3f6a39164329a5d395ca2f970fdaa441'
    )
    expect(
      decls('.bezel::after', 'background').some(v =>
        v.includes('0 0 / 100% 100%')
      )
    ).toBe(true)
    expect(decls('.bezel::after', 'pointer-events')).toContain('none')
    expect(decls('.bezel::after', 'z-index')).toContain('7')
    expect(decls('.glass', 'left')).toContain('4.811%')
    expect(decls('.glass', 'top')).toContain('6.111%')
    expect(decls('.glass', 'width')).toContain('90.292%')
    expect(decls('.glass', 'height')).toContain('85.933%')
    expect(decls('.glass', 'clip-path')).toHaveLength(0)
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
})
