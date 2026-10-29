#!/usr/bin/env node
// Generate visual camera maps from the canonical element inventory.
// Descriptions and coordinates are read from prompts/camera-element-inventory.md;
// generated SVGs under prompts/atlas/ are disposable derived output.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const inventoryPath = join(root, 'prompts', 'camera-element-inventory.md')
const outputDir = join(root, 'prompts', 'atlas')
const sourceDir = join(root, 'public', 'images')

function xml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function parseInventory(markdown) {
  const cameras = []
  let camera = null
  let inTable = false

  for (const line of markdown.split(/\r?\n/)) {
    const section = line.match(/^## CAM (\d{2}) — (.+?) \(`(cam\d+\.webp)`, (\d+)×(\d+)\)$/)
    if (section) {
      camera = {
        id: Number(section[1]),
        title: section[2],
        file: section[3],
        width: Number(section[4]),
        height: Number(section[5]),
        elements: [],
      }
      cameras.push(camera)
      inTable = false
      continue
    }

    const cells = line.split('|').map((cell) => cell.trim())
    if (cells.join('|') === '|順|要素ID|矩形|写っているもの|') {
      inTable = Boolean(camera)
      continue
    }

    if (!inTable || !camera || !line.startsWith('|')) continue
    if (cells.length !== 6 || !/^CAM\d{2}-E\d{2}$/.test(cells[2])) continue

    const bounds = cells[3].match(/\((\d+),(\d+)\)–\((\d+),(\d+)\)/)
    if (!bounds) continue
    camera.elements.push({
      sequence: Number(cells[1]),
      id: cells[2],
      box: bounds.slice(1).map(Number),
      description: cells[4],
    })
  }

  return cameras
}

function shortDescription(description, maxLength = 49) {
  const chars = [...description]
  if (chars.length <= maxLength) return description
  return `${chars.slice(0, maxLength - 1).join('')}…`
}

function makeSvg(camera, imageData) {
  const pageWidth = 1840
  const imageX = 55
  const imageY = 112
  const imageHeight = 900
  const imageWidth = imageHeight * camera.width / camera.height
  const panelX = 900
  const rowTop = 120
  const rowHeight = 42
  const pageHeight = Math.max(1060, rowTop + camera.elements.length * rowHeight + 45)
  const legendX = panelX + 45
  const textX = legendX + 45
  const legendLines = camera.elements.map((element, index) => {
    const rowY = rowTop + index * rowHeight
    const [x1, y1, x2, y2] = element.box
    const cx = imageX + ((x1 + x2) / 2_000) * imageWidth
    const cy = imageY + ((y1 + y2) / 2_000) * imageHeight
    const left = imageX + (x1 / 1_000) * imageWidth
    const top = imageY + (y1 / 1_000) * imageHeight
    const width = Math.max(2, ((x2 - x1) / 1_000) * imageWidth)
    const height = Math.max(2, ((y2 - y1) / 1_000) * imageHeight)
    const isWholeFrameNote = x1 === 0 && y1 === 0 && x2 === 1000 && y2 === 1000
    const isBroadArea = (x2 - x1) * (y2 - y1) >= 150_000
    const suppressBounds = isBroadArea || isWholeFrameNote
    const markerClass = suppressBounds ? 'marker marker-neutral' : 'marker'
    const noteClass = isWholeFrameNote ? 'note-entry' : ''
    return `
      <g class="element ${noteClass}" id="${xml(element.id)}">
        <title>${xml(`${element.id} — ${element.description}`)}</title>
        ${suppressBounds ? '' : `<rect x="${left.toFixed(1)}" y="${top.toFixed(1)}" width="${width.toFixed(1)}" height="${height.toFixed(1)}" rx="2" class="bounds" />`}
        <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${suppressBounds ? 7 : 10}" class="${markerClass}" />
        <text x="${cx.toFixed(1)}" y="${(cy + 3.5).toFixed(1)}" text-anchor="middle" class="${suppressBounds ? 'marker-number marker-number-neutral' : 'marker-number'}">${String(element.sequence).padStart(2, '0')}</text>
        <circle cx="${legendX}" cy="${rowY + 12}" r="10" class="legend-number" />
        <text x="${legendX}" y="${rowY + 15.5}" text-anchor="middle" class="legend-number-text">${String(element.sequence).padStart(2, '0')}</text>
        <text x="${textX}" y="${rowY + 9}" class="legend-id">${xml(element.id)}</text>
        <text x="${textX + 115}" y="${rowY + 9}" class="legend-description">${isWholeFrameNote ? 'Note — ' : ''}${xml(shortDescription(element.description))}</text>
      </g>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${pageWidth}" height="${pageHeight}" viewBox="0 0 ${pageWidth} ${pageHeight}" role="img" aria-labelledby="title desc">
  <title id="title">CAM ${String(camera.id).padStart(2, '0')} visual element map</title>
  <desc id="desc">Faint grayscale camera image with numbered element bounds, IDs, and descriptions read from the canonical inventory.</desc>
  <defs>
    <filter id="grayscale"><feColorMatrix type="saturate" values="0" /></filter>
    <style>
      text { font-family: "Noto Sans CJK JP", "Noto Sans JP", sans-serif; }
      .page { fill: #fff; }
      .heading { fill: #16212b; font-size: 25px; font-weight: 700; }
      .subheading { fill: #56636d; font-size: 14px; }
      .photo { filter: url(#grayscale); opacity: .38; }
      .photo-frame { fill: none; stroke: #c7cfd4; stroke-width: 1; }
      .panel { fill: #fff; }
      .bounds { fill: #b53a2f; fill-opacity: .015; stroke: #a5322a; stroke-width: 1; stroke-opacity: .5; }
      .marker { fill: #a5322a; fill-opacity: .9; stroke: #fff; stroke-width: 1.4; }
      .marker-neutral { fill: #fff; fill-opacity: .85; stroke: #53666c; stroke-width: 1; }
      .marker-number { fill: #fff; font-size: 8px; font-weight: 700; }
      .marker-number-neutral { fill: #34434a; font-size: 7px; }
      .legend-number { fill: #a5322a; }
      .legend-number-text { fill: #fff; font-size: 8px; font-weight: 700; }
      .legend-id { fill: #a5322a; font-size: 13px; font-weight: 700; }
      .legend-description { fill: #27343c; font-size: 14px; }
      .legend-rule { stroke: #e1e6e9; stroke-width: 1; }
    </style>
  </defs>
  <rect class="page" width="100%" height="100%" />
  <text x="55" y="43" class="heading">CAM ${String(camera.id).padStart(2, '0')} — ${xml(camera.title)}</text>
  <text x="55" y="69" class="subheading">${xml(camera.file)} · ${camera.width} × ${camera.height} · faint grayscale = processed baseline · red = element bounds</text>
  <text x="${panelX}" y="43" class="heading">要素IDマップ</text>
  <text x="${panelX}" y="69" class="subheading">座標・説明の正本: prompts/camera-element-inventory.md</text>
  <image x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" preserveAspectRatio="none" class="photo" xlink:href="data:image/webp;base64,${imageData}" />
  <rect x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" class="photo-frame" />
  <line x1="${panelX - 35}" y1="${rowTop - 12}" x2="${panelX - 35}" y2="${pageHeight - 28}" class="legend-rule" />
  ${legendLines}
</svg>
`
}

const inventory = await readFile(inventoryPath, 'utf8')
const cameras = parseInventory(inventory)
if (cameras.length !== 8 || cameras.some((camera) => camera.elements.length === 0)) {
  throw new Error(`Expected eight camera sections with elements; parsed ${cameras.length}`)
}

await mkdir(outputDir, { recursive: true })
for (const camera of cameras) {
  const image = await readFile(join(sourceDir, camera.file))
  const svg = makeSvg(camera, image.toString('base64'))
  const outputPath = join(outputDir, `cam${String(camera.id).padStart(2, '0')}.svg`)
  await writeFile(outputPath, svg)
  console.log(`wrote ${outputPath} (${camera.elements.length} elements)`)
}
