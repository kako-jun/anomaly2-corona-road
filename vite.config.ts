import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { parse as parseYaml } from 'yaml'
import { parseLedger } from './src/utils/anomalyLedger'

const LEDGER_PATH = resolve(__dirname, 'prompts/anomalies.yaml')
const VIRTUAL_ID = 'virtual:anomalies'
const RESOLVED_ID = '\0' + VIRTUAL_ID

/**
 * Exposes the anomaly ledger (prompts/anomalies.yaml, the single source of truth) to the game as
 * `virtual:anomalies`, trimmed to the fields the game needs. A broken entry fails the build and the
 * message names the entry.
 */
const anomalyLedgerPlugin = (): Plugin => ({
  name: 'anomaly-ledger',
  resolveId(id) {
    return id === VIRTUAL_ID ? RESOLVED_ID : undefined
  },
  load(id) {
    if (id !== RESOLVED_ID) return undefined
    this.addWatchFile(LEDGER_PATH)
    const entries = parseLedger(parseYaml(readFileSync(LEDGER_PATH, 'utf8')))
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), anomalyLedgerPlugin()],
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
