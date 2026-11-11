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
  it('keeps the UI image budget (600KB, DESIGN.md) including the note fonts', () => {
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
    expect(size('public/ui') + size('public/note') + fonts).toBeLessThanOrEqual(
      600 * 1024
    )
  })
})
