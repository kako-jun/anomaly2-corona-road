declare module 'virtual:anomalies' {
  import type { LedgerEntry } from './utils/anomalyLedger'
  /** Trimmed entries of prompts/anomalies.yaml, built by the plugin in vite.config.ts. */
  const entries: LedgerEntry[]
  export default entries
}
