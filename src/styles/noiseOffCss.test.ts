import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/styles/loupe.css', 'utf8')
const retro = readFileSync('src/styles/retro.css', 'utf8')

describe('noise off CSS (#342)', () => {
  it('fades the grain and the scanlines to 0 on the monitor and in the loupe, and nothing else', () => {
    const rule = css.match(/([^{}]*\.noise-off[^{}]*)\{\s*opacity:\s*0;\s*\}/)
    expect(rule).not.toBeNull()
    const sel = rule![1].split(',').map(x => x.trim())
    expect(sel.sort()).toEqual([
      '.glass.noise-off .noise',
      '.glass.noise-off .scan',
      '.loupe.noise-off .noise',
      '.loupe.noise-off .scan',
    ])
    expect(css).toMatch(/\.glass \.scan,[\s\S]*?transition: opacity 0\.5s/)
  })
  it('.scan is the monitor horizontal-line layer (0deg repeating gradient)', () => {
    expect(retro).toMatch(
      /\.scan\s*\{\s*background:\s*repeating-linear-gradient\(\s*0deg/
    )
  })
})

describe('loupe press CSS (#409)', () => {
  it('.glass takes no browser touch gesture: the loupe starts on press, so touch-action is none', () => {
    const rule = css.match(/\n\.glass\s*\{([^{}]*)\}/)
    expect(rule).not.toBeNull()
    expect(rule![1]).toMatch(/touch-action:\s*none/)
  })
})

describe('no text selection (#432)', () => {
  const index = readFileSync('src/index.css', 'utf8')
  const all = [
    'src/index.css',
    'src/styles/loupe.css',
    'src/styles/retro.css',
    'src/styles/start.css',
    'src/components/investigationNote.css',
  ].map(p => readFileSync(p, 'utf8'))

  it('body switches selection, the iOS callout off by default', () => {
    const rule = index.match(/\nbody\s*\{([^{}]*)\}/)
    expect(rule).not.toBeNull()
    expect(rule![1]).toMatch(/\n\s*user-select:\s*none/)
    expect(rule![1]).toMatch(/-webkit-user-select:\s*none/)
    expect(rule![1]).toMatch(/-webkit-touch-callout:\s*none/)
  })
  it('only input and textarea get selection back', () => {
    const re = /([^{}]+)\{([^{}]*user-select:\s*text[^{}]*)\}/g
    const rules = [...index.matchAll(re)]
    expect(rules).toHaveLength(1)
    expect(
      rules[0][1]
        .split(',')
        .map(x => x.trim())
        .sort()
    ).toEqual(['input', 'textarea'])
    expect(rules[0][2]).toMatch(/-webkit-user-select:\s*text/)
  })
  it('no other rule in the app re-enables or repeats user-select', () => {
    const rest = all.slice(1).join('\n')
    expect(rest).not.toMatch(/user-select/)
    expect(all[0].match(/user-select:\s*text/g)).toHaveLength(2)
  })
  it('images cannot be dragged out', () => {
    expect(index).toMatch(/\nimg\s*\{\s*-webkit-user-drag:\s*none/)
  })
})
