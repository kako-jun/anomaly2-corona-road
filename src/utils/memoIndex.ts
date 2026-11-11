import anomalies from 'virtual:anomalies'
import { memoIndexOf } from './memoSelect'

/**
 * The memo facts of the anomaly ledger (the flags an anomaly raises, its one-liner), read from
 * `virtual:anomalies` once (#325). The ledger is the only source; no anomaly id is listed in code.
 */
export const MEMO_INDEX = memoIndexOf(anomalies)
