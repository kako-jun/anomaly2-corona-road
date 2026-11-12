import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { parse as parseYaml } from 'yaml'
import {
  isGameRecord,
  MEMO_IMAGE_DIR,
  parseLedgerRecords,
  toLedgerEntry,
} from './src/utils/anomalyLedger'
import { DIALOGUE_FILES, parseDialogueLedger } from './src/utils/dialogueLedger'

const LEDGER_PATH = resolve(__dirname, 'prompts/anomalies.yaml')
const VIRTUAL_ID = 'virtual:anomalies'
const RESOLVED_ID = '\0' + VIRTUAL_ID

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
    this.addWatchFile(LEDGER_PATH)
    const records = parseLedgerRecords(
      parseYaml(readFileSync(LEDGER_PATH, 'utf8'))
    )
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
    const anomalyIds = new Set(
      parseLedgerRecords(parseYaml(readFileSync(LEDGER_PATH, 'utf8'))).map(
        e => e.id
      )
    )
    const parsed = { flags: read('flags') } as Parameters<
      typeof parseDialogueLedger
    >[0]
    for (const file of DIALOGUE_FILES) parsed[file] = read(file)
    return `export default ${JSON.stringify(parseDialogueLedger(parsed, anomalyIds))}`
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), anomalyLedgerPlugin(), dialogueLedgerPlugin()],
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
