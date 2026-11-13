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
