import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { parse as parseYaml } from 'yaml'
import {
  checkStoryPersons,
  checkUnlockFlags,
  isGameRecord,
  isNonImageGameRecord,
  MEMO_IMAGE_DIR,
  parseLedgerRecords,
  toLedgerEntry,
  toNonImageEntry,
} from './src/utils/anomalyLedger'
import {
  DIALOGUE_FILES,
  checkFlagStories,
  parseDialogueLedger,
} from './src/utils/dialogueLedger'

const LEDGER_PATH = resolve(__dirname, 'prompts/anomalies.yaml')
const FLAGS_PATH = resolve(__dirname, 'dialogue/flags.yaml')
const VIRTUAL_ID = 'virtual:anomalies'
const RESOLVED_ID = '\0' + VIRTUAL_ID

/** Parse the ledger and check that every `unlock.flag` is a flag defined in dialogue/flags.yaml (#77). */
const readLedgerRecords = (addWatchFile: (path: string) => void) => {
  addWatchFile(LEDGER_PATH)
  addWatchFile(FLAGS_PATH)
  const records = parseLedgerRecords(
    parseYaml(readFileSync(LEDGER_PATH, 'utf8'))
  )
  const flags = (
    parseYaml(readFileSync(FLAGS_PATH, 'utf8')) as {
      flags?: Record<string, unknown>
    } | null
  )?.flags
  checkUnlockFlags(records, new Set(Object.keys(flags ?? {})))
  checkStoryPersons(records, new Set(Object.keys(flags ?? {})))
  return records
}

/**
 * Exposes the anomaly ledger (prompts/anomalies.yaml, the single source of truth) to the game as
 * `virtual:anomalies`, trimmed to the fields the game needs and limited to kind=image, status=produced
 * entries (planned / non_image ones are validated but not handed to the game). A broken entry anywhere
 * in the ledger fails the build and the message names the entry.
 */
const anomalyLedgerPlugin = (): Plugin => ({
  name: 'anomaly-ledger',
  resolveId(id) {
    return id === VIRTUAL_ID ? RESOLVED_ID : undefined
  },
  load(id) {
    if (id !== RESOLVED_ID) return undefined
    const records = readLedgerRecords(p => this.addWatchFile(p))
    // A memo scribble (#325) must exist for every entry that names one, planned or not: it is added by a file + a ledger line.
    for (const r of records) {
      if (
        r.memoImage &&
        !existsSync(resolve(__dirname, 'public', MEMO_IMAGE_DIR, r.memoImage))
      ) {
        throw new Error(
          `anomalies.yaml entry "${r.id}": memo_image file not found: public/${MEMO_IMAGE_DIR}/${r.memoImage}`
        )
      }
    }
    const entries = records.filter(isGameRecord).map(toLedgerEntry)
    for (const e of entries) {
      if (!existsSync(resolve(__dirname, e.overlay))) {
        throw new Error(
          `anomalies.yaml entry "${e.id}": overlay file not found: ${e.overlay}`
        )
      }
    }
    return `export default ${JSON.stringify(entries)}`
  },
})

const NON_IMAGE_VIRTUAL_ID = 'virtual:non-image-anomalies'
const NON_IMAGE_RESOLVED_ID = '\0' + NON_IMAGE_VIRTUAL_ID

/**
 * The non-image side of the ledger for the game (#77): kind=non_image, status=produced entries only (planned ones are
 * validated but not handed over). Whether an effect exists for each id is checked by a test (src/utils/nonImageSpawn.test.ts),
 * so a produced entry without an effect cannot be merged.
 */
const nonImageLedgerPlugin = (): Plugin => ({
  name: 'non-image-ledger',
  resolveId(id) {
    return id === NON_IMAGE_VIRTUAL_ID ? NON_IMAGE_RESOLVED_ID : undefined
  },
  load(id) {
    if (id !== NON_IMAGE_RESOLVED_ID) return undefined
    const records = readLedgerRecords(p => this.addWatchFile(p))
    return `export default ${JSON.stringify(records.filter(isNonImageGameRecord).map(toNonImageEntry))}`
  },
})

const DIALOGUE_DIR = resolve(__dirname, 'dialogue')
const DIALOGUE_VIRTUAL_ID = 'virtual:dialogue'
const DIALOGUE_RESOLVED_ID = '\0' + DIALOGUE_VIRTUAL_ID

/**
 * Exposes the dialogue ledger (dialogue/*.yaml, the single source of truth) to the game as
 * `virtual:dialogue`. A broken entry fails the build and the message names the file and the id.
 * Anomaly ids come from the anomaly ledger, so a line cannot point at a missing anomaly.
 */
const dialogueLedgerPlugin = (): Plugin => ({
  name: 'dialogue-ledger',
  resolveId(id) {
    return id === DIALOGUE_VIRTUAL_ID ? DIALOGUE_RESOLVED_ID : undefined
  },
  load(id) {
    if (id !== DIALOGUE_RESOLVED_ID) return undefined
    this.addWatchFile(LEDGER_PATH)
    const read = (name: string) => {
      const path = resolve(DIALOGUE_DIR, `${name}.yaml`)
      this.addWatchFile(path)
      return parseYaml(readFileSync(path, 'utf8'))
    }
    const records = parseLedgerRecords(
      parseYaml(readFileSync(LEDGER_PATH, 'utf8'))
    )
    const anomalyIds = new Set(records.map(e => e.id))
    const parsed = { flags: read('flags') } as Parameters<
      typeof parseDialogueLedger
    >[0]
    for (const file of DIALOGUE_FILES) parsed[file] = read(file)
    const dialogue = parseDialogueLedger(parsed, anomalyIds)
    // A story person's picture stays until its conversation ends (#430): that conversation must exist and be playable.
    checkFlagStories(
      records.flatMap(r => (r.storyFlag ? [r.storyFlag] : [])),
      dialogue,
      'a story person flag'
    )
    return `export default ${JSON.stringify(dialogue)}`
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    anomalyLedgerPlugin(),
    nonImageLedgerPlugin(),
    dialogueLedgerPlugin(),
    VitePWA({
      // The new version waits; src/utils/swUpdate.ts applies it at the title (#388).
      registerType: 'prompt',
      injectRegister: false,
      // The plugin injects the manifest link into index.html at build; the icons are already in public.
      includeManifestIcons: false,
      manifest: {
        name: 'Anomaly²: Corona Road',
        short_name: 'Corona Road',
        id: '/',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#030a04',
        background_color: '#030a04',
        icons: [
          {
            src: '/icon-192.webp',
            sizes: '192x192',
            type: 'image/webp',
            purpose: 'any',
          },
          {
            src: '/icon-512.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        // Offline = the app shell only: HTML, JS, CSS, fonts and the UI parts (cabinet, notes, title). The camera
        // and overlay pictures (public/images and the bundled overlays, several MB) are not precached; they are
        // cached as they are played (below).
        globPatterns: [
          '**/*.{html,js,css}',
          'fonts/*.woff2',
          'ui/*.webp',
          'note/*.svg',
          'title-notes/*',
          'images/logo.webp',
          'icon-*.webp',
          'apple-touch-icon.png',
          'favicon-*.png',
        ],
        globIgnores: ['**/*.map'],
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
        // The host rewrites every path to /index.html (public/_redirects); the worker does the same offline.
        navigateFallback: '/index.html',
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) =>
              request.destination === 'image' &&
              url.origin === self.location.origin,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'game-images',
              cacheableResponse: { statuses: [200] },
              // A picture replaced under the same name is refreshed in the background; ~13MB of pictures fit well inside 700 entries / 30 days.
              expiration: { maxEntries: 700, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test/setup.ts'],
    restoreMocks: true,
    css: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
