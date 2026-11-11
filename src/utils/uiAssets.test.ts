import { readFileSync, readdirSync, statSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('cabinet image preloads', () => {
  it('covers every UI image and does not refer to missing files', () => {
    const html = readFileSync('index.html', 'utf8')
    const preloaded = [
      ...html.matchAll(
        /<link\s[^>]*data-cabinet-image[^>]*href="\/ui\/([^"]+)"/gs
      ),
    ]
      .map(match => match[1])
      .sort()
    const files = readdirSync('public/ui')
      .filter(name => name.endsWith('.webp'))
      .sort()
    expect(preloaded).toEqual(files)
  })
})

describe('title photo (#296)', () => {
  it('is preloaded by index.html', () => {
    expect(readFileSync('index.html', 'utf8')).toMatch(
      /<link\s[^>]*rel="preload"[^>]*href="\/images\/logo\.webp"/s
    )
  })
})

describe('investigation note assets (#297)', () => {
  it('every sketch under public/note is preloaded by a data-note-image link, and none is missing', () => {
    const html = readFileSync('index.html', 'utf8')
    const preloaded = [
      ...html.matchAll(
        /<link\s[^>]*data-note-image[^>]*href="\/note\/([^"]+)"/gs
      ),
    ]
      .map(match => match[1])
      .sort()
    expect(preloaded).toEqual(readdirSync('public/note').sort())
  })
  it('preloads both note fonts', () => {
    const html = readFileSync('index.html', 'utf8')
    for (const f of ['note-zen-kurenaido', 'note-yomogi'])
      expect(html).toContain(`href="/fonts/${f}.woff2"`)
  })
  it('keeps the UI image budget (800KB, DESIGN.md) including the note fonts, the title photo and the title notes (both languages)', () => {
    const size = (dir: string): number =>
      readdirSync(dir, { withFileTypes: true }).reduce(
        (n, e) =>
          n +
          (e.isDirectory()
            ? size(`${dir}/${e.name}`)
            : statSync(`${dir}/${e.name}`).size),
        0
      )
    const fonts = readdirSync('public/fonts')
      .filter(n => n.startsWith('note-') && n.endsWith('.woff2'))
      .reduce((n, f) => n + statSync(`public/fonts/${f}`).size, 0)
    expect(
      size('public/ui') +
        size('public/note') +
        size('public/title-notes') +
        statSync('public/images/logo.webp').size +
        fonts
    ).toBeLessThanOrEqual(800 * 1024)
  })
})
