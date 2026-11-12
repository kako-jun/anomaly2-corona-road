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

describe('PWA (#388)', () => {
  const config = readFileSync('vite.config.ts', 'utf8')
  it('the page declares the theme colour of the icon rim, equal to the manifest colours', () => {
    expect(readFileSync('index.html', 'utf8')).toContain(
      '<meta name="theme-color" content="#030a04" />'
    )
    expect(config.match(/(theme|background)_color: '#030a04'/g)).toHaveLength(2)
  })
  it('the manifest icons exist in public (any purpose only: no maskable, no SVG)', () => {
    for (const f of ['icon-192.webp', 'icon-512.webp'])
      expect(statSync(`public/${f}`).size).toBeGreaterThan(0)
    expect(config).toContain("src: '/icon-192.webp'")
    expect(config).toContain("src: '/icon-512.webp'")
    expect(config).not.toMatch(/maskable|src: '[^']*\.svg'/)
  })
  it('the camera pictures are not precached (runtime cache only); the shell is', () => {
    expect(config).toContain("handler: 'CacheFirst'")
    expect(config).not.toMatch(/globPatterns[\s\S]*'images\/\*/)
    expect(config).toContain("navigateFallback: '/index.html'")
  })
})
