/**
 * The wording of the detective's investigation note (Issue #297), the one place for it: the synopsis lines
 * per story stage, the stock lines for how a night went, the scribbles and the labels. Japanese is the main
 * language, English the second (a pair per entry). Every statement comes from docs/story.md; nothing here
 * may say what the story has not established. `src/utils/investigationNote.ts` chooses among these.
 */

/** Story flags (dialogue/flags.yaml) that fill the four missing-person frames, in order. */
export const STAGE_FLAGS = ['elder1', 'elder2', 'elder3', 'child'] as const
export type StageFlag = (typeof STAGE_FLAGS)[number]

/** How far the case has come. `start` is the very first night (the background of the case). */
export type Stage = 'start' | 'none' | StageFlag

export type NoteLang = 'ja' | 'en'
export interface Pair {
  ja: string
  en: string
}

export interface StageText {
  /**
   * Synopsis, one entry per handwritten line: every entry fits the paper in one line and is never wrapped by the
   * browser (a long sentence is split here, at a phrase boundary, in both languages alike; Issue #297 wrap rules).
   */
  lines: Pair[]
  /** How many of the last lines are kept (muted) under the stock lines of an end-of-night memo. */
  tail: number
  /** The detective's scribbles (blue). */
  scrib: Pair[]
}

export const STAGES: Record<Stage, StageText> = {
  start: {
    tail: 2,
    lines: [
      {
        ja: 'コロナロードで行方不明が4人。',
        en: '4 people missing in Corona Road.',
      },
      {
        ja: '殺人とは、まだ断定できない。',
        en: 'Murder? Can’t say that yet.',
      },
      {
        ja: '1人目は、警察も本気ではなかった。',
        en: 'Police didn’t take #1 seriously.',
      },
      {
        ja: '4人目は子供。警察は急に本気になった。',
        en: '#4 is a child. Now they do.',
      },
      {
        ja: '昭和の地下街。監視設備も昭和のまま。',
        en: 'Showa mall, Showa cameras.',
      },
      {
        ja: '通路の異変が、手がかりではないか。',
        en: 'The corridor oddities may be a lead.',
      },
      {
        ja: '夜は警備員室で張り込む。監視は樫原くん。',
        en: 'Guard room stakeout. Kashihara watches.',
      },
    ],
    scrib: [
      { ja: '昭和の異変のとき、', en: 'Went past the shutter' },
      { ja: 'シャッターの向こうへ', en: 'and never came back?' },
      { ja: '行ったまま?', en: '' },
    ],
  },
  none: {
    tail: 2,
    lines: [
      { ja: '行方不明は4人。', en: '4 people missing.' },
      { ja: 'まだ、誰も見つかっていない。', en: 'No one found yet.' },
      {
        ja: '通路の異変が、手がかりではないか。',
        en: 'The corridor oddities may be a lead.',
      },
    ],
    scrib: [
      { ja: '昭和の異変のとき、', en: 'Went past the shutter' },
      { ja: 'シャッターの向こうへ', en: 'and never came back?' },
      { ja: '行ったまま?', en: '' },
    ],
  },
  elder1: {
    tail: 2,
    lines: [
      { ja: '1人目の老人を見つけた。', en: 'Found the 1st old person.' },
      { ja: '帰りたくないという。', en: 'Doesn’t want to go home.' },
      {
        ja: '老人1人目は実務的で、少し頑固。',
        en: 'First elder: practical, a bit stubborn.',
      },
      {
        ja: '異変でも、現実よりマシだと。',
        en: 'Even an oddity beats reality, they say.',
      },
    ],
    scrib: [{ ja: 'どこへいったのか?', en: 'Where did they go?' }],
  },
  elder2: {
    tail: 2,
    lines: [
      { ja: '老人2人目を見つけたが、', en: 'Found the 2nd old person.' },
      { ja: '帰りたくないという。', en: 'Doesn’t want to go home.' },
      {
        ja: '老人2人目も、1人目と同じことを言う。',
        en: 'Elder 2 says the same as elder 1.',
      },
      {
        ja: '人当たりがよく、こちらを気遣う。',
        en: 'Warm, and worries about us.',
      },
    ],
    scrib: [{ ja: 'どこへいったのか?', en: 'Where did they go?' }],
  },
  elder3: {
    tail: 2,
    lines: [
      { ja: '老人3人目を見つけた。', en: 'Found the 3rd.' },
      {
        ja: 'やはり帰りたくないという。',
        en: 'Doesn’t want to go home either.',
      },
      { ja: '乾いた冗談を言う。', en: 'Dry jokes.' },
      {
        ja: '3人とも現実よりマシな優しい異変だと。',
        en: 'All three: a kinder oddity than reality.',
      },
      { ja: '残るは4人目。子供。', en: 'One left. The child.' },
    ],
    scrib: [
      {
        ja: '子供も見つかったら同じことを…?',
        en: 'The child will say the same, too…?',
      },
    ],
  },
  child: {
    tail: 2,
    lines: [
      { ja: '4人目、子供を見つけた。', en: 'Found the 4th. A child.' },
      {
        ja: '子供の家は、今どうなっているのか。',
        en: 'What is the child’s home like now?',
      },
    ],
    scrib: [
      {
        ja: '帰りたくないのは、なぜ?',
        en: 'Why not want to go home?',
      },
    ],
  },
}

/** How a night went (end-of-night memo). Placeholder wording where the issue says so: #297 未決・仮置き. */
export type Outcome = 'newKinds' | 'noNewKinds' | 'withdraw' | 'ending'

export interface OutcomeText {
  lines: Pair[]
  /** Scribbles that replace the stage's own (absent: the stage's are used). */
  scrib?: Pair[]
}

export const OUTCOMES: Record<Outcome, OutcomeText> = {
  newKinds: {
    lines: [
      { ja: '今夜も異変を報告。', en: 'More oddities reported tonight.' },
      { ja: '捜査は一歩前へ。', en: 'One step forward.' },
    ],
  },
  noNewKinds: {
    lines: [{ ja: '新しい手がかりはなかった。', en: 'No new leads tonight.' }],
    scrib: [{ ja: '見落としはないか?', en: 'Did we miss something?' }],
  },
  withdraw: {
    lines: [
      {
        ja: 'お手つきが重なり、席を立つ。',
        en: 'Too many false reports. Left the post.',
      },
      {
        ja: '見つけた分は、捜査に加わった。',
        en: 'What was found still counts.',
      },
    ],
    // 仮置き（Issue #297）: the withdraw one-liner.
    scrib: [{ ja: '今夜はここまで。', en: 'That’s it for tonight.' }],
  },
  ending: {
    lines: [
      { ja: '異変を、すべて見送った。', en: 'Let every oddity pass.' },
      {
        ja: '指摘ではなく、家族を調べる。',
        en: 'Look into the family instead.',
      },
    ],
  },
}

/** Added to the synopsis of a start-of-night memo when the last night gave nothing, or ended in a withdraw. */
export const LAST_NIGHT: Record<'noNewKinds' | 'withdraw', Pair> = {
  noNewKinds: {
    ja: '前回は、新しい手がかりがなかった。',
    en: 'Last time: no new leads.',
  },
  withdraw: {
    ja: '前回は、お手つきが重なり席を立った。',
    en: 'Last time: left after false reports.',
  },
}

export const LABELS = {
  title: { ja: '捜査メモ', en: 'CASE MEMO' },
  night: (n: number): Pair => ({ ja: `${n}夜目`, en: `Night ${n}` }),
  stampStart: { ja: '捜査の経緯', en: 'BACKGROUND' },
  stampBefore: { ja: '前回まで', en: 'SO FAR' },
  stampAfter: { ja: '今夜の捜査', en: 'TONIGHT' },
  stampDawn: { ja: '夜明け', en: 'DAWN' },
  stampWithdraw: { ja: '撤収', en: 'WITHDRAWN' },
  slot: (n: number): Pair => ({ ja: `${n}人目`, en: `#${n}` }),
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
    ja: `${clock}まで`,
    en: `Until ${clock}`,
  }),
  shiftWithdrew: (clock: string): Pair => ({
    ja: `${clock}で撤収`,
    en: `Withdrew at ${clock}`,
  }),
  rowTotal: { ja: '延べ', en: 'Total' },
  rowKinds: { ja: '見つけた種類', en: 'Kinds' },
  unitCount: { ja: '件', en: '' },
  unitKinds: { ja: '種', en: '' },
  unitTimes: { ja: '回', en: '' },
  btnStart: { ja: '勤務を始める', en: 'START SHIFT' },
  btnAgain: { ja: 'もう一度、勤務', en: 'ONE MORE SHIFT' },
  /** After the true ending the key returns to the title (#294). */
  btnTitle: { ja: 'タイトルへ戻る', en: 'BACK TO TITLE' },
  btnLoading: { ja: '準備中…', en: 'LOADING…' },
} as const
