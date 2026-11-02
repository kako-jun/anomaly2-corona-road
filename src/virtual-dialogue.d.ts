declare module 'virtual:dialogue' {
  import type { DialogueLedger } from './utils/dialogueLedger'
  /** Parsed and validated dialogue/*.yaml, built by the plugin in vite.config.ts. */
  const ledger: DialogueLedger
  export default ledger
}
