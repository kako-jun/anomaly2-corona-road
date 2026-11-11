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
    expect(code).not.toMatch(/vignette|scrim|radial-gradient|surface\.webp/)
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
