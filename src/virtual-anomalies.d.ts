declare module 'virtual:anomalies' {
  import type { LedgerEntry } from './utils/anomalyLedger'
  /** Trimmed entries of prompts/anomalies.yaml, built by the plugin in vite.config.ts. */
  const entries: LedgerEntry[]
  export default entries
}

declare module 'virtual:non-image-anomalies' {
  import type { NonImageEntry } from './utils/anomalyLedger'
  /** Produced non_image entries of prompts/anomalies.yaml (#77), built by the plugin in vite.config.ts. */
  const entries: NonImageEntry[]
  export default entries
}
