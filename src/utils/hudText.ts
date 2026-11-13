/**
 * The text-changing monitor effects of the HUD (#416): the headings of the display windows (RT-UI-02 swapped,
 * RT-UI-06 corrupted, RT-UI-07 mixed with Japanese / symbols; one ledger group `hud-labels`, so never together) and
 * the spelling of the REPORT key (RT-UI-26). Pure functions of the running effect set; the numbers are never touched.
 */
export type HudLabel = 'TIME' | 'REPORTS' | 'STRIKES'

const CORRUPTED: Record<HudLabel, string> = {
  TIME: 'T▒ME',
  REPORTS: 'RE▓ORT█',
  STRIKES: 'ST░IKE▒',
}
const MIXED: Record<HudLabel, string> = {
  TIME: 'T時ME',
  REPORTS: 'REP報TS',
  STRIKES: 'STR誤KES∴',
}

/** The heading shown for a window now. */
export const hudLabel = (label: HudLabel, fx: ReadonlySet<string>): string => {
  if (fx.has('RT-UI-02')) {
    if (label === 'TIME') return 'REPORTS'
    if (label === 'REPORTS') return 'TIME'
    return label
  }
  if (fx.has('RT-UI-06')) return CORRUPTED[label]
  if (fx.has('RT-UI-07')) return MIXED[label]
  return label
}

/** Misspellings of REPORT for RT-UI-26 (the ledger's own examples). */
export const REPORT_MISSPELLINGS = ['REPROT', 'RAPORT', 'REPØRT'] as const

export const reportLabel = (
  misspelled: boolean,
  rng: () => number = Math.random
): string =>
  misspelled
    ? REPORT_MISSPELLINGS[Math.floor(rng() * REPORT_MISSPELLINGS.length)]
    : 'REPORT'

/** The digit used as the faint ghost behind a digit (RT-UI-18): always another digit. */
export const ghostDigit = (d: string): string => String((Number(d) + 3) % 10)

/** RT-UI-23: the colon either blinks fast or stays lit; one is picked each time the effect starts. */
export type ColonVariant = 'fast' | 'steady'
export const colonVariant = (
  active: boolean,
  rng: () => number = Math.random
): ColonVariant | undefined =>
  active ? (rng() < 0.5 ? 'fast' : 'steady') : undefined
