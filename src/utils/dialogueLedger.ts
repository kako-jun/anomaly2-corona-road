/**
 * Pure helpers for the dialogue ledger (`dialogue/*.yaml`, the single source of truth; the format
 * is documented in `dialogue/README.md`). `vite.config.ts` uses them to turn the YAML files into
 * the `virtual:dialogue` module. Every violation throws an Error that names the file and the entry
 * id, so a broken entry fails the build.
 */

export type Who = 'A' | 'M'
export type Tone = 'light' | 'serious'
export type ClosingResult = 'dawn' | 'withdraw' | 'ending'
export type MidpointStage = 'few' | 'mid' | 'many'

/** One spoken line: `A` = the veteran detective, `M` = the young security guard. */
export interface DialogueLine {
  who: Who
  text: string
}

interface Base {
  id: string
  tone: Tone
  lines: DialogueLine[]
  /** Optional post-flag release condition; independent of story.when.flag. */
  unlock?: string
}

export type DialogueEntry = Base &
  (
    | { kind: 'opening'; when: Record<string, never> }
    | { kind: 'chatter'; when: Record<string, never> }
    | { kind: 'false-report'; when: Record<string, never> }
    | { kind: 'closing'; when: { result: ClosingResult } }
    | { kind: 'midpoint'; when: { stage: MidpointStage } }
    | { kind: 'story'; when: { flag: string } }
    | { kind: 'anomaly-line'; when: { anomaly: string } }
  )

export type DialogueKind = DialogueEntry['kind']

/**
 * Conditions of one flag; all that are present must hold (AND). Numbers are "at least".
 * `foundUnique`: number of distinct anomalies ever found (`foundIds.length`).
 * `foundTotal`: total correct reports, including repeats.
 * `reiwaFound`: number of distinct Reiwa-themed anomalies ever found.
 * `loops`: completed plays. `found`: ids that must all have been found.
 * `requires`: other flags that must already be raised.
 */
export interface FlagCondition {
  foundUnique?: number
  foundTotal?: number
  reiwaFound?: number
  loops?: number
  found?: string[]
  requires?: string[]
}

export interface FlagDef {
  name: string
  when: FlagCondition
}

export interface DialogueLedger {
  flags: FlagDef[]
  entries: DialogueEntry[]
}

/** Source file (without `.yaml`) -> the kind(s) it holds. */
export const DIALOGUE_FILES = [
  'opening',
  'closing',
  'midpoint',
  'chatter',
  'story',
  'false-report',
  'anomaly-lines',
] as const
export type DialogueFile = (typeof DIALOGUE_FILES)[number]

const KIND_OF_FILE: Record<DialogueFile, DialogueKind> = {
  opening: 'opening',
  closing: 'closing',
  midpoint: 'midpoint',
  chatter: 'chatter',
  story: 'story',
  'false-report': 'false-report',
  'anomaly-lines': 'anomaly-line',
}

/** Required id prefix per kind (anomaly lines add the anomaly id, see `idPrefix`). */
const ID_PREFIX: Record<DialogueKind, string> = {
  opening: 'opening-',
  closing: 'closing-',
  midpoint: 'midpoint-',
  chatter: 'chatter-',
  story: 'story-',
  'false-report': 'false-report-',
  'anomaly-line': 'an-',
}

const WHO: readonly string[] = ['A', 'M']
const TONES: readonly string[] = ['light', 'serious']
const RESULTS: readonly string[] = ['dawn', 'withdraw', 'ending']
const STAGES: readonly string[] = ['few', 'mid', 'many']

/** Japanese and full-width punctuation that film subtitles must not contain. */
const FORBIDDEN_PUNCTUATION = /[、。，．､｡,.]/
/** Separators must be the full-width space; an ASCII space, tab or line break is a violation. */
const FORBIDDEN_WHITESPACE = /[ \t\r\n]/

export const checkSubtitleText = (text: string): void => {
  if (text.trim() === '') throw new Error('line text is empty')
  const p = FORBIDDEN_PUNCTUATION.exec(text)
  if (p) {
    throw new Error(
      `line "${text}" contains punctuation "${p[0]}" (subtitles use no 、 or 。)`
    )
  }
  if (FORBIDDEN_WHITESPACE.test(text)) {
    throw new Error(
      `line "${text}" contains a half-width space or line break (separate with a full-width space)`
    )
  }
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const str = (raw: Record<string, unknown>, key: string): string => {
  const v = raw[key]
  if (typeof v !== 'string' || v.trim() === '') {
    throw new Error(`"${key}" is missing or not a string`)
  }
  return v.trim()
}

const oneOf = <T extends string>(
  value: string,
  allowed: readonly string[],
  what: string
): T => {
  if (!allowed.includes(value)) {
    throw new Error(`${what} "${value}" must be one of ${allowed.join('|')}`)
  }
  return value as T
}

const onlyKeys = (
  rec: Record<string, unknown>,
  keys: string[],
  what: string
) => {
  for (const k of Object.keys(rec)) {
    if (!keys.includes(k)) throw new Error(`${what}: unknown key "${k}"`)
  }
}

const parseLines = (raw: unknown): DialogueLine[] => {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error('"lines" must be a non-empty list')
  }
  return raw.map((l, i) => {
    if (!isRecord(l)) throw new Error(`lines[${i}] is not a mapping`)
    onlyKeys(l, ['who', 'text'], `lines[${i}]`)
    const who = oneOf<Who>(str(l, 'who'), WHO, `lines[${i}].who`)
    // Not trimmed: a leading or trailing full-width space is kept as written.
    const text = l.text
    if (typeof text !== 'string')
      throw new Error(`lines[${i}].text is not a string`)
    checkSubtitleText(text)
    return { who, text }
  })
}

const noWhen = (when: unknown, kind: string): Record<string, never> => {
  if (when === undefined || when === null) return {}
  if (isRecord(when) && Object.keys(when).length === 0) return {}
  throw new Error(`kind "${kind}" takes no "when"`)
}

const whenKey = (when: unknown, key: string, kind: string): string => {
  if (!isRecord(when))
    throw new Error(`kind "${kind}" needs "when: { ${key} }"`)
  onlyKeys(when, [key], `kind "${kind}" when`)
  return str(when, key)
}

export interface ParseContext {
  /** Flag names defined in flags.yaml. */
  flagNames: ReadonlySet<string>
  /** Anomaly ids in prompts/anomalies.yaml. */
  anomalyIds: ReadonlySet<string>
}

/** Parse and validate one entry of a given kind. Throws naming the file and the entry. */
export const parseEntry = (
  file: DialogueFile,
  raw: unknown,
  index: number,
  ctx: ParseContext
): DialogueEntry => {
  const rec = isRecord(raw) ? raw : {}
  const label =
    typeof rec.id === 'string' ? `"${rec.id}"` : `at index ${index} (no id)`
  const kind = KIND_OF_FILE[file]
  try {
    if (!isRecord(raw)) throw new Error('not a mapping')
    onlyKeys(raw, ['id', 'when', 'tone', 'lines', 'unlock'], 'entry')
    const id = str(raw, 'id')
    const tone = oneOf<Tone>(str(raw, 'tone'), TONES, 'tone')
    if (kind === 'chatter' && tone !== 'light') {
      throw new Error('chatter takes only tone "light"')
    }
    const lines = parseLines(raw.lines)
    const unlock = raw.unlock === undefined ? undefined : str(raw, 'unlock')
    if (unlock !== undefined && !ctx.flagNames.has(unlock)) {
      throw new Error(`unlock "${unlock}" is not defined in flags.yaml`)
    }
    const base = {
      id,
      tone,
      lines,
      ...(unlock === undefined ? {} : { unlock }),
    }
    let entry: DialogueEntry
    switch (kind) {
      case 'closing':
        entry = {
          ...base,
          kind,
          when: {
            result: oneOf<ClosingResult>(
              whenKey(raw.when, 'result', kind),
              RESULTS,
              'when.result'
            ),
          },
        }
        break
      case 'midpoint':
        entry = {
          ...base,
          kind,
          when: {
            stage: oneOf<MidpointStage>(
              whenKey(raw.when, 'stage', kind),
              STAGES,
              'when.stage'
            ),
          },
        }
        break
      case 'story': {
        const flag = whenKey(raw.when, 'flag', kind)
        if (!ctx.flagNames.has(flag)) {
          throw new Error(`when.flag "${flag}" is not defined in flags.yaml`)
        }
        entry = { ...base, kind, when: { flag } }
        break
      }
      case 'anomaly-line': {
        const anomaly = whenKey(raw.when, 'anomaly', kind)
        if (!ctx.anomalyIds.has(anomaly)) {
          throw new Error(
            `when.anomaly "${anomaly}" is not in prompts/anomalies.yaml`
          )
        }
        entry = { ...base, kind, when: { anomaly } }
        break
      }
      default:
        entry = { ...base, kind, when: noWhen(raw.when, kind) }
    }
    const prefix =
      entry.kind === 'anomaly-line'
        ? `${ID_PREFIX[kind]}${entry.when.anomaly}-`
        : ID_PREFIX[kind]
    if (!id.startsWith(prefix)) {
      throw new Error(`id must start with "${prefix}" for kind "${kind}"`)
    }
    return entry
  } catch (e) {
    throw new Error(
      `dialogue/${file}.yaml entry ${label}: ${(e as Error).message}`
    )
  }
}

const positiveInt = (v: unknown, key: string): number => {
  if (typeof v !== 'number' || !Number.isInteger(v) || v <= 0) {
    throw new Error(`"${key}" must be a positive integer`)
  }
  return v
}

const stringList = (v: unknown, key: string): string[] => {
  if (
    !Array.isArray(v) ||
    v.length === 0 ||
    v.some(s => typeof s !== 'string' || s.trim() === '')
  ) {
    throw new Error(`"${key}" must be a non-empty list of strings`)
  }
  return v as string[]
}

/** Parse flags.yaml (`flags:` mapping name -> condition). */
export const parseFlags = (
  parsedYaml: unknown,
  anomalyIds: ReadonlySet<string>
): FlagDef[] => {
  const map = (parsedYaml as { flags?: unknown } | null)?.flags
  if (!isRecord(map) || Object.keys(map).length === 0) {
    throw new Error('dialogue/flags.yaml: top-level "flags" mapping is missing')
  }
  const names = new Set(Object.keys(map))
  const defs: FlagDef[] = Object.entries(map).map(([name, raw]) => {
    try {
      if (!isRecord(raw) || Object.keys(raw).length === 0) {
        throw new Error('condition must be a non-empty mapping')
      }
      onlyKeys(
        raw,
        [
          'foundUnique',
          'foundTotal',
          'reiwaFound',
          'loops',
          'found',
          'requires',
        ],
        'condition'
      )
      const when: FlagCondition = {}
      if ('foundUnique' in raw)
        when.foundUnique = positiveInt(raw.foundUnique, 'foundUnique')
      if ('foundTotal' in raw)
        when.foundTotal = positiveInt(raw.foundTotal, 'foundTotal')
      if ('reiwaFound' in raw)
        when.reiwaFound = positiveInt(raw.reiwaFound, 'reiwaFound')
      if ('loops' in raw) when.loops = positiveInt(raw.loops, 'loops')
      if ('found' in raw) {
        when.found = stringList(raw.found, 'found')
        for (const a of when.found) {
          if (!anomalyIds.has(a)) {
            throw new Error(
              `found: anomaly "${a}" is not in prompts/anomalies.yaml`
            )
          }
        }
      }
      if ('requires' in raw) {
        when.requires = stringList(raw.requires, 'requires')
        for (const r of when.requires) {
          if (!names.has(r))
            throw new Error(`requires: flag "${r}" is not defined`)
          if (r === name) throw new Error('requires itself')
        }
      }
      return { name, when }
    } catch (e) {
      throw new Error(
        `dialogue/flags.yaml flag "${name}": ${(e as Error).message}`
      )
    }
  })
  // requires must not form a cycle (a flag could never be raised).
  const byName = new Map(defs.map(d => [d.name, d]))
  const visit = (name: string, path: string[]) => {
    if (path.includes(name)) {
      throw new Error(
        `dialogue/flags.yaml flag "${name}": requires forms a cycle (${[...path, name].join(' -> ')})`
      )
    }
    for (const r of byName.get(name)?.when.requires ?? [])
      visit(r, [...path, name])
  }
  for (const d of defs) visit(d.name, [])
  return defs
}

/** Parse one kind file (`dialogues:` list). */
export const parseDialogueFile = (
  file: DialogueFile,
  parsedYaml: unknown,
  ctx: ParseContext
): DialogueEntry[] => {
  const list = (parsedYaml as { dialogues?: unknown } | null)?.dialogues
  if (!Array.isArray(list)) {
    throw new Error(
      `dialogue/${file}.yaml: top-level "dialogues" list is missing`
    )
  }
  return list.map((raw, i) => parseEntry(file, raw, i, ctx))
}

/** Parse every file and check ids are unique across the whole ledger. */
export const parseDialogueLedger = (
  parsed: { flags: unknown } & Record<DialogueFile, unknown>,
  anomalyIds: ReadonlySet<string>
): DialogueLedger => {
  const flags = parseFlags(parsed.flags, anomalyIds)
  const ctx: ParseContext = {
    flagNames: new Set(flags.map(f => f.name)),
    anomalyIds,
  }
  const entries: DialogueEntry[] = []
  const seen = new Set<string>()
  for (const file of DIALOGUE_FILES) {
    for (const e of parseDialogueFile(file, parsed[file], ctx)) {
      if (seen.has(e.id)) {
        throw new Error(`dialogue/${file}.yaml: duplicate id "${e.id}"`)
      }
      seen.add(e.id)
      entries.push(e)
    }
  }
  return { flags, entries }
}
