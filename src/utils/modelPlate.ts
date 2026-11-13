import ledger from 'virtual:dialogue'
import type { FlagDef } from './dialogueLedger'

/** The model number as printed on the plate image (`/ui/model-plate.webp`, "Video Monitor CR-42"). */
export const PLATE_MODEL = '42'

/** RT-UI-14: the printed digits swapped. */
export const SWAPPED_MODEL = '24'

/**
 * RT-UI-28: the number of anomalies needed to find the fourth person (the child): read from the story flags
 * (`flags.child.foundUnique` in dialogue/flags.yaml), never written in code, so changing the milestone follows.
 */
export const childMilestone = (): string => {
  const n = ledger.flags.find((f: FlagDef) => f.name === 'child')?.when
    .foundUnique
  return String(n ?? 100)
}

/** The digits drawn over the plate now (undefined = the plate as printed). RT-UI-14 and 28 never run together. */
export const plateNumber = (fx: ReadonlySet<string>): string | undefined =>
  fx.has('RT-UI-28')
    ? childMilestone()
    : fx.has('RT-UI-14')
      ? SWAPPED_MODEL
      : undefined
