/**
 * The wording of the detective's investigation note (Issue #297), the one place for it: the synopsis lines
 * per story stage, the stock lines for how a night went, the scribbles and the labels. Japanese is the main
 * language, English the second (a pair per entry). Every statement comes from docs/story.md; nothing here
 * may say what the story has not established. `src/utils/investigationNote.ts` chooses among these.
 */

import type { MemoFlag } from '../utils/anomalyLedger'
import { toFullWidthDigits } from '../utils/fullWidth'

/** Story flags (dialogue/flags.yaml) that fill the four missing-person frames, in order. */
export const STAGE_FLAGS = ['elder1', 'elder2', 'elder3', 'child'] as const
export type StageFlag = (typeof STAGE_FLAGS)[number]

/** How far the case has come. `start` is the very first night (the background of the case). */
export type Stage = 'start' | 'none' | StageFlag

/**
 * The stages in the order knowledge grows. A stage only ever shows what the detective (and so the player) can
 * know by then; `knownFrom` on every sentence names the earliest stage that may show it (see below).
 */
export const STAGE_ORDER: readonly Stage[] = [
  'start',
  'none',
  'elder1',
  'elder2',
  'elder3',
  'child',
]

export type NoteLang = 'ja' | 'en'
export interface Pair {
  ja: string
  en: string
}

/**
 * A sentence with the earliest stage that may show it. Pinned by vitest: no stage shows a sentence whose
 * `knownFrom` is later than itself, and a sentence naming a fact that is only learned by meeting a person (the
 * elders' traits, "kinder than reality") cannot be annotated earlier than that meeting. Every `knownFrom` must
 * rest on docs/story.md: what it states as known at the start of the case is `start`; what is learned by finding
 * a missing person is that person's stage. Where story.md says nothing, the sentence is not written.
 */
export interface KnownPair extends Pair {
  knownFrom: Stage
}

const k = (knownFrom: Stage, ja: string, en: string): KnownPair => ({
  ja,
  en,
  knownFrom,
})

export interface StageText {
  /**
   * Synopsis, one entry per handwritten line: every entry fits the paper in one line and is never wrapped by the
   * browser (a long sentence is split here, at a phrase boundary, in both languages alike; Issue #297 wrap rules).
   */
  lines: KnownPair[]
  /** How many of the last lines are kept (muted) under the stock lines of an end-of-night memo. */
  tail: number
  /** The detective's scribbles (blue). Empty where docs/story.md gives the detective nothing to jot yet. */
  scrib: KnownPair[]
}

export const STAGES: Record<Stage, StageText> = {
  // The very first night: only what docs/story.md says is known when the stakeout begins (the case, why she is
  // here, who watches). Nothing that is learned by seeing an oddity or meeting a missing person.
  start: {
    tail: 2,
    lines: [
      k(
        'start',
        'コロナロードで行方不明が４人。',
        '4 people missing in Corona Road.'
      ),
      k('start', '殺人とは、まだ断定できない。', 'Murder? Can’t say that yet.'),
      k(
        'start',
        '１人目は、警察も本気ではなかった。',
        'Police didn’t take #1 seriously.'
      ),
      k(
        'start',
        '４人目は子供。警察は急に本気になった。',
        '#4 is a child. Now they do.'
      ),
      k(
        'start',
        'コロナロードの異変が、手がかりでは。',
        'Corona Road’s oddities may be a lead.'
      ),
      k(
        'start',
        '夜は警備員室で張り込む。監視は樫原くん。',
        'Guard room stakeout. Kashihara watches.'
      ),
    ],
    scrib: [],
  },
  none: {
    tail: 2,
    lines: [
      k('start', '行方不明は４人。', '4 people missing.'),
      k(
        'start',
        'まだ、行方不明の誰も見つかっていない。',
        'No missing person found yet.'
      ),
      k(
        'start',
        'コロナロードの異変が、手がかりでは。',
        'Corona Road’s oddities may be a lead.'
      ),
    ],
    scrib: [],
  },
  elder1: {
    tail: 2,
    lines: [
      k('elder1', '老人１人目を見つけた。', 'Found the 1st old person.'),
      k('elder1', '帰りたくないという。', 'Doesn’t want to go home.'),
      k(
        'elder1',
        '老人１人目は実務的で、少し頑固。',
        'First elder: practical, a bit stubborn.'
      ),
      k(
        'elder1',
        '異変でも、現実よりマシだと。',
        'Even an oddity beats reality, they say.'
      ),
    ],
    scrib: [],
  },
  elder2: {
    tail: 2,
    lines: [
      k('elder2', '老人２人目を見つけたが、', 'Found the 2nd old person, but'),
      k('elder2', '帰りたくないという。', 'they don’t want to go home.'),
      k(
        'elder2',
        '２人目も、老人１人目と同じことを言う。',
        'Elder 2 says the same as elder 1.'
      ),
      k(
        'elder2',
        '人当たりがよく、こちらを気遣う。',
        'Warm, and worries about us.'
      ),
    ],
    scrib: [],
  },
  elder3: {
    tail: 2,
    lines: [
      k('elder3', '老人３人目を見つけた。', 'Found the 3rd old person.'),
      k(
        'elder3',
        'やはり帰りたくないという。',
        'Doesn’t want to go home either.'
      ),
      k('elder3', '乾いた冗談を言う。', 'Dry jokes.'),
      k(
        'elder3',
        '３人とも現実よりマシな優しい異変だと。',
        'All three: a kinder oddity than reality.'
      ),
      k('elder3', '残るは４人目。子供。', 'One left. The child.'),
    ],
    scrib: [
      k(
        'elder3',
        '子供も見つかったら同じことを…？',
        'The child will say the same, too…?'
      ),
    ],
  },
  child: {
    tail: 2,
    lines: [
      k('child', '４人目、子供を見つけた。', 'Found the 4th. A child.'),
      k(
        'child',
        '子供の家は、今どうなっているのか。',
        'What is the child’s home like now?'
      ),
    ],
    scrib: [k('child', '帰りたくないのは、なぜ？', 'Why not want to go home?')],
  },
}

/**
 * Hypothesis memos (#325): a flag that rises when a ledger anomaly marked with it (`memo_flag`, or `reiwa: true`
 * for `reiwa`) is reported, and the one line it adds to the end-of-night memo. The wording is confirmed
 * (decided by kako-jun 2026-11-12, #325/#344). `knownFrom` gates it exactly like every other sentence: below that stage the flag stays
 * waiting (not lost) and is shown at the first result at or after it. The stage is the earliest the existing net
 * (`LEARNED` in investigationNotes.test.ts) lets these words appear: story.md calls the shutter line a working
 * hypothesis and names Showa as the era of the oddities without saying at which point the detective knows either,
 * so both wait for `child`; the food line rests on what the elders' state shows (`elder1`).
 * Like the synopsis lines, each is one handwritten line (JA_MAX / EN_MAX, `npm run check:note-wrap`).
 */
export const MEMO_FLAG_TEXT: Record<MemoFlag, KnownPair> = {
  shutter: k(
    'child',
    'シャッターの向こうへ行ったまま、か。',
    'Went beyond the shutter, never back?'
  ),
  food: k(
    'elder1',
    '異変の食べ物は、口にして大丈夫らしい。',
    'Oddity food seems safe to eat.'
  ),
  reiwa: k(
    'child',
    '昭和の通路に、令和の物が混じっている。',
    'Reiwa things in the Showa passage.'
  ),
}

/** The stage from which an anomaly's own one-line memo (the ledger's `memo`) may be shown: it says only what was seen. */
export const MEMO_LINE_KNOWN_FROM: Stage = 'none'

/** How a night went (end-of-night memo). Placeholder wording where the issue says so: #297 未決・仮置き. */
export type Outcome = 'newKinds' | 'noNewKinds' | 'withdraw' | 'ending'

export interface OutcomeText {
  lines: KnownPair[]
  /** Replaces `lines` on the very first night (no earlier night to say "also" about). */
  firstNight?: KnownPair[]
  /** Added after `lines` only when the night found at least one anomaly (nothing found: the line would be false). */
  ifFound?: KnownPair[]
  /** Scribbles that replace the stage's own (absent: the stage's are used). */
  scrib?: KnownPair[]
}

export const OUTCOMES: Record<Outcome, OutcomeText> = {
  newKinds: {
    lines: [
      k('start', '今夜も異変を報告。', 'More oddities reported tonight.'),
      k('start', '捜査は一歩前へ。', 'One step forward.'),
    ],
    firstNight: [
      k('start', '今夜は異変を報告。', 'Oddities reported tonight.'),
      k('start', '捜査は一歩前へ。', 'One step forward.'),
    ],
  },
  noNewKinds: {
    lines: [k('start', '新しい手がかりはなかった。', 'No new leads tonight.')],
  },
  withdraw: {
    lines: [
      k(
        'start',
        'お手つきが重なり、席を立つ。',
        'Too many false reports. Left the post.'
      ),
    ],
    ifFound: [
      k(
        'start',
        '見つけた分は、捜査に加わった。',
        'What was found still counts.'
      ),
    ],
    // 仮置き（Issue #297）: the withdraw one-liner.
    scrib: [k('start', '今夜はここまで。', 'That’s it for tonight.')],
  },
  // Only reachable after the child is found (the true ending, docs/story.md).
  ending: {
    lines: [
      k('child', '異変を、すべて見送った。', 'Let every oddity pass.'),
      k(
        'child',
        '指摘ではなく、家族を調べる。',
        'Look into the family instead.'
      ),
    ],
    // A question after the decision (#273): what the family did stays open, it is only asked.
    scrib: [
      k(
        'child',
        '家族に、何をされたのか。',
        'What did their family do to them?'
      ),
    ],
  },
}

/**
 * One more line on the result of a dawn that met the quota (#428; kako-jun: a little happy, no numbers or stamps).
 * Which one is picked by the night number (`quotaMetLine`), so the same night always reads the same and the nights differ.
 */
export interface QuotaMetLine extends KnownPair {
  /**
   * The line says the night found things well (a hit, a good catch). A night with no new kinds already reads "no new
   * leads", so these are not drawn for it (they would contradict the line just above).
   */
  claimsFind?: true
}

const kq = (ja: string, en: string, claimsFind?: true): QuotaMetLine => ({
  ...k('start', ja, en),
  ...(claimsFind ? { claimsFind } : {}),
})

export const QUOTA_MET_LINES: QuotaMetLine[] = [
  kq('今夜は、手応えがあった。', 'Felt a solid hit tonight.', true),
  kq('見ていてよかった夜だった。', 'A night that made the watching worth it.'),
  kq('朝まで、いい夜だった。', 'A good night, all the way to morning.'),
  kq(
    '少しうれしい、気分のいい夜だった。',
    'A good-feeling night. A little happy.'
  ),
  kq('目がよく見えた夜だった。', 'My eyes were sharp tonight.', true),
  kq(
    'うまく見つけられて、少しうれしかった。',
    'Found things well, and a little happy.',
    true
  ),
]

/** Added to the synopsis of a start-of-night memo when the last night gave nothing, or ended in a withdraw. */
export const LAST_NIGHT: Record<'noNewKinds' | 'withdraw', KnownPair> = {
  noNewKinds: k(
    'start',
    '前回は、新しい手がかりがなかった。',
    'Last time: no new leads.'
  ),
  withdraw: k(
    'start',
    '前回は、お手つきが重なり席を立った。',
    'Last time: left after false reports.'
  ),
}

export const LABELS = {
  title: { ja: '捜査メモ', en: 'CASE MEMO' },
  night: (n: number): Pair => ({
    ja: `${toFullWidthDigits(n)}夜目`,
    en: `Night ${n}`,
  }),
  stampStart: { ja: '捜査の経緯', en: 'BACKGROUND' },
  stampBefore: { ja: '前回まで', en: 'SO FAR' },
  stampAfter: { ja: '今夜の捜査', en: 'TONIGHT' },
  stampDawn: { ja: '夜明け', en: 'DAWN' },
  stampWithdraw: { ja: '撤収', en: 'WITHDRAWN' },
  slot: (n: number): Pair => ({
    ja: `${toFullWidthDigits(n)}人目`,
    en: `#${n}`,
  }),
  slotNew: { ja: '見つけた', en: 'found' },
  sketchFound: { ja: '似顔', en: 'sketch' },
  sketchUnknown: { ja: '未発見', en: 'not found yet' },
  headLast: { ja: '前回の夜', en: 'Last night' },
  headTonight: { ja: '今夜', en: 'Tonight' },
  headTotal: { ja: '累計', en: 'All nights' },
  rowFound: { ja: '見つけた', en: 'Reported' },
  rowFresh: { ja: 'うち新しい', en: 'new kinds' },
  rowFalse: { ja: 'お手つき', en: 'False reports' },
  rowShift: { ja: '勤務', en: 'Shift' },
  /** The Shift row shows in-game clock time: the shift ran until dawn, or the detective withdrew at that time. */
  shiftUntil: (clock: string): Pair => ({
    ja: `${toFullWidthDigits(clock)}まで`,
    en: `Until ${clock}`,
  }),
  shiftWithdrew: (clock: string): Pair => ({
    ja: `${toFullWidthDigits(clock)}で撤収`,
    en: `Withdrew at ${clock}`,
  }),
  rowTotal: { ja: '延べ', en: 'Total' },
  rowKinds: { ja: '見つけた種類', en: 'Kinds' },
  unitCount: { ja: '件', en: '' },
  unitKinds: { ja: '種', en: '' },
  unitTimes: { ja: '回', en: '' },
  /**
   * The handwritten action at the bottom of the note (the arrow after it is drawn, not typed). These are the
   * detective's own words on paper, so they follow the note's language (not machine keys like the title's).
   */
  btnStart: { ja: '勤務を始める', en: 'Start the shift' },
  btnAgain: { ja: 'もう一度', en: 'Once more' },
  /** After the true ending the action returns to the title (#294). */
  btnTitle: { ja: 'タイトルへ', en: 'Back to title' },
  btnLoading: { ja: '準備中…', en: 'One moment…' },
} as const
