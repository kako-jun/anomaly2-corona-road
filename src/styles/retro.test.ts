import { readdirSync, readFileSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
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

  it('breaks subtitles only between phrases: balanced lines, strict line breaking, a phrase is one box (#323)', () => {
    expect(decls('.movie-sub div', 'text-wrap').at(-1)).toBe('balance')
    expect(decls('.movie-sub div', 'line-break').at(-1)).toBe('strict')
    expect(decls('.movie-sub .seg', 'display').at(-1)).toBe('inline-block')
    // a phrase wider than the picture is the last resort: it may break anywhere, instead of leaving the picture
    expect(decls('.movie-sub .seg', 'max-width').at(-1)).toBe('100%')
    expect(decls('.movie-sub .seg', 'overflow-wrap').at(-1)).toBe('anywhere')
  })

  it('sizes the OSD texts in cqw against the picture, with no fixed size or width @media (#316)', () => {
    for (const sel of ['.osd-cam', '.osd-rec', '.osd-result']) {
      // earlier declarations are fallbacks for browsers without cqw; the cqw one must come last so it wins
      expect(decls(sel, 'font-size').length, sel).toBeGreaterThan(1)
    }
    // The ratios are the 1280x720 desktop look (picture 441px wide: CAM 16px, REC 12.8px, dot 8px, result 20px),
    // chosen by kako-jun. The max() floor keeps the text readable on a 203px picture (360x640 phone); it only
    // binds below picture widths of about 278px (CAM) / 310px (REC) / 222px (result) / 278px (dot).
    const expected: [string, string, string][] = [
      ['.osd-cam', 'font-size', 'max(10px, 3.6cqw)'],
      ['.osd-cam', 'left', '8cqw'],
      ['.osd-cam', 'bottom', '9cqw'],
      ['.osd-rec', 'font-size', 'max(9px, 2.9cqw)'],
      ['.osd-rec', 'right', '7cqw'],
      ['.osd-rec', 'top', '7.7cqw'],
      ['.osd-rec', 'gap', '1.4cqw'],
      ['.rec-dot', 'width', 'max(5px, 1.8cqw)'],
      ['.rec-dot', 'height', 'max(5px, 1.8cqw)'],
      ['.osd-result', 'font-size', 'max(10px, 4.5cqw)'],
      ['.osd-result', 'top', '15.4cqw'],
      ['.osd-result', 'padding', '0 5cqw'],
    ]
    for (const [sel, prop, value] of expected)
      expect(decls(sel, prop).at(-1), `${sel} ${prop}`).toBe(value)
    // no @media rule may change an OSD size
    root_.walkAtRules('media', at =>
      at.walkRules(rule => {
        if (!/\.(osd|rec-dot)/.test(rule.selector)) return
        rule.walkDecls(d => {
          expect(d.prop, `${rule.selector} in @media`).not.toMatch(
            /font-size|width|height|left|right|top|bottom|gap|letter-spacing/
          )
        })
      })
    )
  })

  it('wraps the result text only between words, never inside one (#316)', () => {
    expect(decls('.osd-result .w', 'white-space').at(-1)).toBe('nowrap')
    expect(decls('.osd-result .w', 'display').at(-1)).toBe('inline-block')
    expect(decls('.osd-result', 'text-wrap').at(-1)).toBe('balance')
    // nothing may allow a break inside a word
    for (const prop of ['overflow-wrap', 'word-wrap', 'word-break'])
      for (const v of decls('.osd-result', prop))
        expect(v).not.toMatch(/break-word|anywhere|break-all/)
  })

  it('blinks the REPORT lamp only via .alert, and keeps it lit (no animation) under reduced motion (#344)', () => {
    expect(
      decls('.lamp-big.alert', 'animation').some(v => v.includes('lamp-alert'))
    ).toBe(true)
    let steady = false
    root_.walkAtRules('media', media => {
      if (!media.params.includes('prefers-reduced-motion: reduce')) return
      media.walkRules('.lamp-big.alert', rule => {
        let none = false
        let lit = false
        rule.walkDecls('animation', d => {
          if (d.value === 'none') none = true
        })
        rule.walkDecls('background-image', d => {
          if (d.value.includes('lamp-red-on')) lit = true
        })
        if (none && lit) steady = true
      })
    })
    expect(steady).toBe(true)
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

  it('pins the knob-to-label gap at 9px and keeps the portrait .tube constants = base (380/307) + each listed term (#300, #309, #313, #314)', () => {
    // 9px is the value kako-jun chose in #309 (18px in #300 was too wide, 3px too tight);
    // it is also >= 0.15 of the 48px portrait knob circle. Changing it is a design decision, so pin it.
    // The .tube width constants (100dvh - Npx) are the measured height of everything except
    // the picture and include this gap, so they must move by exactly the same amount.
    const PINNED_GAP = 9
    // The constants = BASE + sum of TERMS. Each PR that changes the height of something other than the
    // picture adds/changes ONE term here (and the same row in DESIGN.md §7); nothing else moves.
    const BASE = { narrow: 380, wide: 307 } // 44px HUD windows, knob gap 0, no other terms
    const HUD_WINDOW = { was: 44, now: 36 } // #314: the three windows (.vfd / .lamps) are 36px tall
    const hudWindowHeights = [
      ...px('.vfd', 'min-height'),
      ...px('.lamps', 'min-height'),
    ]
    const KNOB = { was: 60, now: 48 } // #313: portrait knob circle; the height goes to the picture
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
    expect(Math.min(...px('.knob', 'height'))).toBe(KNOB.now)
    expect(new Set(hudWindowHeights)).toEqual(new Set([HUD_WINDOW.now]))
    // One named term per thing that changes the non-picture height (px; + = taller, - = shorter).
    // Later PRs add their own line here and the same row in DESIGN.md §7.
    // plateH (#311) is the one VARIABLE term: it is written as `- var(--plate-h)` in the constants (the regex above
    // requires it), so it is not in this fixed sum; the constant N = BASE + sum(TERMS) - var(--plate-h).
    const TERMS = {
      knobGap: gaps[0], // knob circle to its label
      hudWindows: HUD_WINDOW.now - HUD_WINDOW.was, // TIME / REPORTS / STRIKES 44 -> 36px
      knobShrink: KNOB.now - KNOB.was, // portrait knob circle 60 -> 48px (#313)
    }
    const TERMS_SUM = Object.values(TERMS).reduce((a, b) => a + b, 0)
    expect(Math.min(...gaps)).toBeGreaterThanOrEqual(
      Math.min(...px('.knob', 'height')) * 0.15
    )
    expect(tubeConsts.filter(c => !c.min).map(c => c.n)).toEqual([
      BASE.narrow + TERMS_SUM,
    ])
    expect(tubeConsts.filter(c => c.min).map(c => c.n)).toEqual([
      BASE.wide + TERMS_SUM,
    ])
  })

  it('draws the knob label up toward the knob with one variable and a transform, not layout (#353)', () => {
    // A transform keeps the tap area, the 9px layout gap and the portrait .tube constants (which include
    // that gap) unchanged. One variable on .knob-wrap: 4px on screen in every band, so the panel zoom
    // (--pz, 1.3 from 1200px, 1.45 from 1400px; unset = 1) is divided out.
    expect(decls('.knob-wrap .label', 'transform')).toEqual([
      'translateY(calc(-1 * var(--knob-label-pull)))',
    ])
    expect(decls('.knob-wrap', '--knob-label-pull')).toEqual([
      'calc(4px / var(--pz, 1))',
    ])
    // .panel sets zoom and --pz to the same value; if they drift apart the 4px on screen drifts silently.
    const zooms = decls('.panel', 'zoom').map(Number)
    expect(decls('.panel', '--pz').map(Number)).toEqual(zooms)
    expect(zooms).toEqual([1.3, 1.45])
    // Evaluate the declared calc() in each band (unset --pz = 1, zoom 1): pull px / pz * zoom = on-screen px.
    const m =
      /^calc\(\s*(\d+(?:\.\d+)?)px\s*\/\s*var\(--pz,\s*(\d+(?:\.\d+)?)\)\s*\)$/.exec(
        decls('.knob-wrap', '--knob-label-pull')[0]
      )
    expect(m).not.toBeNull()
    const [num, fallback] = [Number(m![1]), Number(m![2])]
    for (const z of [undefined, ...zooms]) {
      const pz = z ?? fallback
      expect((num / pz) * (z ?? 1)).toBeCloseTo(4, 5)
    }
  })

  it('centres the window digits on the glyphs, not on the line box (#314)', () => {
    // A font's line box has more space under the digits than above, so centring the line box left the
    // digits ~2px high (measured: 12px above / 16px below in a 44px window). Trimming each digit box to
    // cap-height .. baseline lets the flex centring land on the glyphs; the padding fallback is for
    // browsers without text-box. The window stays a centring flex row so TIME and REPORTS share one centre.
    expect(decls('.vfd > *', 'text-box')).toEqual(['trim-both cap alphabetic'])
    expect(decls('.vfd', 'align-items')).toContain('center')
    // Fallback (browsers older than Chrome 133 / Safari 18.2 / Firefox 154): a normal line box (31.2px)
    // would make TIME and REPORTS 47px tall next to the 36px STRIKES, so the fallback must set a 1em line
    // box on the digit boxes (window stays at the 36px min-height) and may only nudge them with top.
    const fb: Record<string, string> = {}
    root_.walkAtRules('supports', at => {
      if (!/not\s*\(\s*text-box/.test(at.params)) return
      at.walkRules(rule => {
        if (rule.selectors.includes('.vfd > *'))
          rule.walkDecls(d => void (fb[d.prop] = d.value.trim()))
        expect(
          rule.selectors,
          'fallback must not pad the window'
        ).not.toContain('.vfd')
      })
    })
    expect(fb['line-height']).toBe('1')
    expect(fb.position).toBe('relative')
    expect(fb.top).toBe('1px')
    expect(fb).not.toHaveProperty('padding-top')
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

  it('gives .bezel exactly the picture pixel aspect, so 100% 100% is an unstretched fit', () => {
    const buf = readFileSync(join(uiDir, 'bezel_mon.webp'))
    const w = buf.readUIntLE(24, 3) + 1
    const h = buf.readUIntLE(27, 3) + 1
    const ratios = decls('.bezel', 'aspect-ratio').map(v => {
      const [n, d] = v.split('/').map(parseFloat)
      return n / d
    })
    expect(ratios.length).toBeGreaterThan(0)
    expect(ratios.at(-1)! / (w / h)).toBeCloseTo(1, 3)
    expect(decls('.bezel', 'background').at(-1)).toMatch(/\/ 100% 100%/)
    // no explicit height left on phones: a fixed height would bring the stretch back
    expect(
      root_.nodes.some(
        n =>
          n.type === 'atrule' &&
          /max-width: 899px/.test((n as postcss.AtRule).params) &&
          (n as postcss.AtRule).nodes?.some(
            r =>
              r.type === 'rule' &&
              (r as postcss.Rule).selector === '.bezel' &&
              (r as postcss.Rule).some(
                d =>
                  d.type === 'decl' && d.prop === 'height' && d.value !== 'auto'
              )
          )
      )
    ).toBe(false)
  })

  it('keeps the four rim bands of the picture equal (so the frame looks equally thick on all sides)', () => {
    const W = prop('--img-w')
    const H = prop('--img-h')
    const bands = [
      prop('--open-l'),
      prop('--open-t'),
      W - prop('--open-r'),
      H - prop('--open-b'),
    ]
    // the box has the picture aspect, so equal picture px bands are equal screen thickness
    for (const v of bands) expect(Math.abs(v - bands[0])).toBeLessThanOrEqual(2)
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

  // the numbers and the polygon must come from the picture's real alpha, not from copies: scripts/bezel-frame.py reads the
  // webp (opening bbox, area difference and max deviation of the polygon <= 1 picture px). CI runs the same command.
  const hasUv = spawnSync('uv', ['--version']).status === 0
  it.skipIf(!hasUv)(
    'binds the group and the clip-path polygon to the transparent opening of bezel_mon.webp (alpha)',
    () => {
      const r = spawnSync(
        'uv',
        ['run', '--script', join(root, 'scripts/bezel-frame.py'), 'check'],
        { encoding: 'utf8' }
      )
      expect(r.stdout + r.stderr).toMatch(/max deviation/)
      expect(r.status, r.stdout + r.stderr).toBe(0)
    },
    120_000
  )

  it('draws no CSS box outline around the frame picture (no double outline)', () => {
    for (const prop of ['border-radius', 'box-shadow'])
      for (const v of decls('.bezel', prop))
        expect(v.trim(), `.bezel ${prop}`).toMatch(/^(0|0px|none)$/)
    expect(decls('.bezel', 'filter').at(-1)).toMatch(/^drop-shadow\(/)
  })
})
