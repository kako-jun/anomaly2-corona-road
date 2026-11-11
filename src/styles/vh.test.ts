import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import { describe, expect, it } from 'vitest'

// #333: a phone's 100vh is the large viewport, taller than the visible screen, so a full-screen height must go through
// --vh (100vh fallback, 100dvh under @supports).
const index = postcss.parse(readFileSync('src/index.css', 'utf8'))
const retro = readFileSync('src/styles/retro.css', 'utf8')

const decls = (
  css: postcss.Root,
  sel: string,
  prop: string,
  inSupports: boolean
) => {
  const out: string[] = []
  css.walkRules(sel, r => {
    const sup =
      r.parent?.type === 'atrule' &&
      (r.parent as postcss.AtRule).name === 'supports'
    if (sup !== inSupports) return
    r.walkDecls(prop, d => void out.push(d.value))
  })
  return out
}

describe('--vh (#333)', () => {
  it('is 100vh with 100dvh under @supports', () => {
    expect(decls(index, ':root', '--vh', false)).toEqual(['100vh'])
    expect(decls(index, ':root', '--vh', true)).toEqual(['100dvh'])
  })
  it('sizes body and #root', () => {
    expect(decls(index, 'body', 'min-height', false)).toEqual(['var(--vh)'])
    expect(decls(index, '#root', 'min-height', false)).toEqual(['var(--vh)'])
  })
  it('sizes .retro, .cabinet and --tube-h, with no bare 100vh left in retro.css', () => {
    expect(retro).toMatch(/\.retro\s*\{[^}]*min-height:\s*var\(--vh\)/)
    expect(retro).toMatch(/--tube-h:\s*min\(var\(--vh\) - 16px/)
    expect(retro).toMatch(/\.cabinet\s*\{[^}]*min-height:\s*var\(--vh\)/)
    expect(retro).not.toMatch(/\d+vh/)
  })
})
