import {
  MEMO_FLAG_TEXT,
  MEMO_LINE_KNOWN_FROM,
  STAGE_ORDER,
} from '../data/investigationNotes'
import type { Stage } from '../data/investigationNotes'
import { MEMO_FLAGS } from './anomalyLedger'
import type { MemoFlag, MemoText } from './anomalyLedger'
import type { SaveData } from './saveData'

/**
 * Which memos the result of a shift shows (#325). Pure: the save and the ledger go in, the choice comes out.
 *
 * Two kinds, at most one of each per result: a hypothesis flag (shutter / food / reiwa; the oldest waiting one
 * whose stage has been reached) and an anomaly's one-line memo (one of the waiting ones, picked at random from a
 * seed made of the save, so the same save always picks the same one). Whatever is not picked stays waiting.
 */

/** What the ledger says about one anomaly for the memos. */
export interface MemoMeta {
  flags: MemoFlag[]
  memo?: MemoText
  /** The scribble that goes with the one-liner (file name in `public/note-sketches/`), if the ledger has one. */
  image?: string
}

/** The memo facts of every ledger entry that has any (`reiwa: true` also raises the `reiwa` flag). */
export const memoIndexOf = (
  entries: readonly {
    id: string
    reiwa?: true
    memoFlags?: MemoFlag[]
    memo?: MemoText
    memoImage?: string
  }[]
): ReadonlyMap<string, MemoMeta> => {
  const index = new Map<string, MemoMeta>()
  for (const e of entries) {
    const flags: MemoFlag[] = [...(e.memoFlags ?? [])]
    if (e.reiwa === true && !flags.includes('reiwa')) flags.push('reiwa')
    if (flags.length === 0 && !e.memo) continue
    index.set(e.id, {
      flags,
      ...(e.memo ? { memo: e.memo } : {}),
      ...(e.memo && e.memoImage ? { image: e.memoImage } : {}),
    })
  }
  return index
}

const reached = (need: Stage, stage: Stage): boolean =>
  STAGE_ORDER.indexOf(need) <= STAGE_ORDER.indexOf(stage)

const isMemoFlag = (name: string): name is MemoFlag =>
  (MEMO_FLAGS as readonly string[]).includes(name)

/**
 * A just-reported anomaly: its flags and its one-liner join the waiting ones, unless they are waiting already or
 * were shown before (a memo is shown once, ever).
 */
export const queueMemos = (
  save: SaveData,
  anomalyId: string,
  meta: MemoMeta | undefined
): SaveData => {
  if (!meta) return save
  const pendingMemoFlags = [...save.pendingMemoFlags]
  for (const f of meta.flags)
    if (!pendingMemoFlags.includes(f) && !save.shownMemoFlags.includes(f))
      pendingMemoFlags.push(f)
  const pendingMemos =
    meta.memo &&
    !save.pendingMemos.includes(anomalyId) &&
    !save.shownMemos.includes(anomalyId)
      ? [...save.pendingMemos, anomalyId]
      : save.pendingMemos
  return { ...save, pendingMemoFlags, pendingMemos }
}

/** FNV-1a over the text: a small, stable 32-bit hash (the same on every machine). */
const hash = (text: string): number => {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/**
 * The seed of the night's random pick, made of the save as it stands when the shift ends: the generation, the
 * number of finished shifts, what has been found and what is waiting. The same save gives the same number.
 */
export const memoSeed = (save: SaveData): number =>
  hash(
    [
      save.epoch,
      save.loops,
      save.foundTotal,
      save.foundIds.join(','),
      save.pendingMemos.join(','),
    ].join('|')
  )

/** A small seeded generator (mulberry32), values in [0, 1). */
const seeded = (seed: number): (() => number) => {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface MemoPick {
  /** The hypothesis flag to show, if any. */
  memoFlag?: MemoFlag
  /** The anomaly id whose one-liner to show, if any. */
  memo?: string
}

/**
 * Choose what this result shows, from the save and the stage the case has reached. A flag whose stage has not
 * been reached, a flag the build does not know, and an anomaly that is no longer in the ledger (or has no
 * one-liner) are skipped and stay waiting.
 */
export const pickMemos = (
  save: SaveData,
  stage: Stage,
  index: ReadonlyMap<string, MemoMeta>
): MemoPick => {
  const out: MemoPick = {}
  const flag = save.pendingMemoFlags.find(
    f => isMemoFlag(f) && reached(MEMO_FLAG_TEXT[f].knownFrom, stage)
  )
  if (flag && isMemoFlag(flag)) out.memoFlag = flag
  if (reached(MEMO_LINE_KNOWN_FROM, stage)) {
    const candidates = save.pendingMemos.filter(id => index.get(id)?.memo)
    if (candidates.length > 0) {
      const pick = Math.floor(seeded(memoSeed(save))() * candidates.length)
      out.memo = candidates[Math.min(pick, candidates.length - 1)]
    }
  }
  return out
}

/** Move what was picked from waiting to shown. */
export const markShown = (save: SaveData, pick: MemoPick): SaveData => ({
  ...save,
  pendingMemoFlags: pick.memoFlag
    ? save.pendingMemoFlags.filter(f => f !== pick.memoFlag)
    : save.pendingMemoFlags,
  shownMemoFlags: pick.memoFlag
    ? [...save.shownMemoFlags, pick.memoFlag]
    : save.shownMemoFlags,
  pendingMemos: pick.memo
    ? save.pendingMemos.filter(id => id !== pick.memo)
    : save.pendingMemos,
  shownMemos: pick.memo ? [...save.shownMemos, pick.memo] : save.shownMemos,
})
