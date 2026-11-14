import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import type { AtRule, Declaration, Rule } from 'postcss'
import { describe, expect, it } from 'vitest'

/** The invariants of the title photo's drift and of the notes, held on the stylesheet itself (#296). */
const root = postcss.parse(readFileSync('src/styles/start.css', 'utf8'))
const decl = (selector: string, prop: string): string | undefined => {
  let found: string | undefined
  root.walkRules(selector, (r: Rule) => {
    if (r.parent?.type === 'atrule') return
    r.walkDecls(prop, (d: Declaration) => {
      found = d.value
    })
  })
  return found
}
/** Every declaration and selector of the sheet, without the comments (which may name what is forbidden). */
const code = (() => {
  const out: string[] = []
  root.walkRules(r => {
    out.push(r.selector)
  })
  root.walkDecls(d => {
    out.push(`${d.prop}: ${d.value}`)
  })
  root.walkAtRules(a => {
    out.push(`@${a.name} ${a.params}`)
  })
  return out.join('\n')
})()
const seconds = (v: string) => parseFloat(v.match(/([\d.]+)s/)![1])

/** A declaration value with its whitespace and line breaks normalised (the formatter may wrap a long value). */
const squash = (v: string | undefined): string =>
  (v ?? '').replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')')

describe('start.css: the photo drift', () => {
  const zoom = parseFloat(decl('.start-screen', '--start-zoom')!)
  const margin = parseFloat(decl('.start-screen', '--start-margin')!)
  it('zooms about 1.12x', () => {
    expect(zoom).toBeCloseTo(1.12, 5)
  })
  it('lets the photo travel exactly 90% of the margin the zoom leaves ((zoom - 1) / 2 x 0.9, in %)', () => {
    expect(margin).toBeCloseTo(((zoom - 1) / 2) * 0.9 * 100, 5)
    expect(margin).toBeLessThanOrEqual(((zoom - 1) / 2) * 100 * 0.9 + 1e-6)
  })
  it('moves only through the margin variable, in both keyframes, in both directions', () => {
    const frames: Record<string, string[]> = {}
    root.walkAtRules('keyframes', (r: AtRule) => {
      frames[r.params] = []
      r.walkDecls('transform', d => {
        frames[r.params].push(d.value)
      })
    })
    for (const name of ['start-pan-x', 'start-pan-y']) {
      expect(frames[name]).toHaveLength(2)
      expect(frames[name][0]).toContain('calc(var(--start-margin) * -1)')
      expect(frames[name][1]).toContain('var(--start-margin)')
    }
  })
  it('loops in about 70 s (x: 35 s each way, y a different period), slowly and without stops in the middle', () => {
    const x = decl('.start-pan-x', 'animation')!
    const y = decl('.start-photo img', 'animation')!
    expect(seconds(x) * 2).toBe(70)
    expect(seconds(y) * 2).not.toBe(seconds(x) * 2)
    expect(seconds(y) * 2).toBeGreaterThanOrEqual(40)
    expect(seconds(y) * 2).toBeLessThanOrEqual(90)
    for (const a of [x, y]) {
      expect(a).toContain('infinite alternate')
      expect(a).toContain('cubic-bezier(0.37, 0, 0.63, 1)')
    }
  })
  it('stands still with prefers-reduced-motion', () => {
    let still = false
    root.walkAtRules('media', (m: AtRule) => {
      if (m.params.includes('prefers-reduced-motion'))
        m.walkDecls('animation', d => {
          if (d.value === 'none') still = true
        })
    })
    expect(still).toBe(true)
  })
})

describe('start.css: the notes', () => {
  it('never rotates anything (the tilt is in the pictures)', () => {
    expect(code).not.toMatch(/(?<!hue-)rotate/)
  })
  it('casts the same light shadow, down and to the right, along the picture outline', () => {
    expect(decl('.start-stack > img', 'filter')).toBe(
      'drop-shadow(3px 4px 3px rgba(0, 0, 0, 0.4))'
    )
  })
  it('puts no dark surface behind anything: no vignette, scrim or plate', () => {
    expect(code).not.toMatch(/vignette|scrim|surface\.webp/)
    // the soft round mask of the blur patch (#331) is the only gradient, and it is a mask, never a background
    root.walkDecls(d => {
      if (/radial-gradient/.test(d.value))
        expect(d.prop).toMatch(/^(-webkit-)?mask-image$/)
    })
    // the only backgrounds are the tear bands and the pager's filled dot
    root.walkRules(r => {
      if (/start-band|start-pager-dots i\.on/.test(r.selector)) return
      r.walkDecls(/^background/, d => {
        expect(d.value, r.selector).toMatch(/^(transparent|none|#0a0a0a)/)
      })
    })
  })
  it('gives the two confirmation keys the same width and no size of their own', () => {
    expect(decl('.start-confirm-keys .start-key', 'width')).toBe('100%')
    expect(code).not.toMatch(/start-key--small/)
  })
  it('keeps the confirmation where the START key is: the pager only hidden (column width kept), text right-aligned', () => {
    expect(decl('.start-foot--confirm .start-pager', 'visibility')).toBe(
      'hidden'
    )
    expect(decl('.start-over-note,\n.start-over-warn', 'text-align')).toBe(
      'right'
    )
  })
  it('builds the foot as pager + key column and lets nothing but the note size it, so the note and the START key share a right edge', () => {
    expect(decl('.start-foot', 'grid-template-columns')).toBe('auto 1fr')
    // the key column is at most 240px, and the deck (START key / confirmation) fills it from the right
    expect(decl('.start-deck', 'width')).toBe('min(100%, 240px)')
    expect(decl('.start-deck', 'justify-self')).toBe('end')
    // the words of the closing note and the warning must not widen the foot
    expect(decl('.start-over-note,\n.start-over-warn', 'width')).toBe('0')
    expect(decl('.start-over-note,\n.start-over-warn', 'min-width')).toBe(
      '100%'
    )
    // in the confirmation the note keeps its width (so nothing moves) but has no height
    expect(decl('.start-foot--confirm .start-notes', 'height')).toBe('0')
    expect(decl('.start-foot--confirm .start-notes', 'visibility')).toBe(
      'hidden'
    )
    expect(decl('.start-notes', 'width')).toBeUndefined()
  })
  it('has no language switch (the language comes from the browser only)', () => {
    expect(code).not.toMatch(/start-lang/)
  })
})

describe('start.css: the drifting blur patch (#331)', () => {
  const pct = (v: string) => parseFloat(v)
  const screen = (p: string) => decl('.start-screen', p)!
  it('is a big patch (radius 40-55% of the photo) with a fixed radius of 6-10 px that breathes by opacity only', () => {
    expect(pct(screen('--blur-w'))).toBeGreaterThanOrEqual(80)
    expect(pct(screen('--blur-w'))).toBeLessThanOrEqual(110)
    expect(pct(screen('--blur-h'))).toBeGreaterThanOrEqual(80)
    expect(pct(screen('--blur-h'))).toBeLessThanOrEqual(110)
    expect(pct(screen('--blur-px'))).toBeGreaterThanOrEqual(6)
    expect(pct(screen('--blur-px'))).toBeLessThanOrEqual(10)
    expect(pct(screen('--blur-fade-min'))).toBeGreaterThan(0)
    expect(pct(screen('--blur-fade-min'))).toBeLessThan(0.5)
    // the radius is never animated (it repaints every frame): the keyframes touch opacity only
    root.walkAtRules('keyframes', (r: AtRule) => {
      if (r.params === 'start-blur-power')
        r.walkDecls(d => expect(d.prop).toBe('opacity'))
    })
  })
  it('loops x, y and the strength in coprime periods that also avoid the photo drift (70 s, 53 s)', () => {
    const loops = [
      decl('.start-blur-x', 'animation')!,
      decl('.start-blur-y', 'animation')!,
      decl('.start-blur', 'animation')!,
    ].map(a => seconds(a) * 2)
    expect(loops).toEqual([61, 47, 37])
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
    for (const a of [...loops, 70, 53])
      for (const b of [...loops, 70, 53]) if (a !== b) expect(gcd(a, b)).toBe(1)
    for (const sel of ['.start-blur-x', '.start-blur-y', '.start-blur'])
      expect(squash(decl(sel, 'animation'))).toContain('infinite alternate')
  })
  it('is a masked backdrop blur that takes no pointer', () => {
    expect(decl('.start-blur', 'backdrop-filter')).toContain('blur(')
    expect(squash(decl('.start-blur', 'mask-image'))).toContain(
      'radial-gradient(closest-side'
    )
    expect(decl('.start-blur-x', 'pointer-events')).toBe('none')
  })
  it('stays within the margin the travel leaves: the patch never moves more than 40% of its size', () => {
    expect(pct(screen('--blur-travel'))).toBeLessThanOrEqual(40)
  })
  it('in the lite step-down also stops the photo drift (a drifting photo under the patch is blurred again every frame)', () => {
    const stopped: string[] = []
    root.walkRules(/start-perf-lite/, (r: Rule) => {
      r.walkDecls('animation', d => {
        if (d.value === 'none') stopped.push(r.selector)
      })
    })
    const all = stopped.join(',')
    for (const sel of ['.start-pan-x', '.start-photo img', '.start-blur'])
      expect(all).toContain(sel)
  })
  it('has a way out: no patch without backdrop-filter, still with prefers-reduced-motion', () => {
    let supports = false
    let still = false
    root.walkAtRules('supports', (a: AtRule) => {
      if (a.params.includes('not'))
        a.walkDecls('display', d => {
          if (d.value === 'none') supports = true
        })
    })
    root.walkAtRules('media', (m: AtRule) => {
      if (m.params.includes('prefers-reduced-motion'))
        m.walkRules(/start-blur/, r => {
          r.walkDecls('animation', d => {
            if (d.value === 'none') still = true
          })
        })
    })
    expect(supports).toBe(true)
    expect(still).toBe(true)
  })
})
