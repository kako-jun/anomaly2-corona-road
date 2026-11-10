import { readFileSync, readdirSync } from 'node:fs'
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
