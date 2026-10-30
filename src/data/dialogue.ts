/**
 * PLACEHOLDER DIALOGUE (sample only) -- to be replaced in Issue #29.
 *
 * Temporary samples for a look-and-feel check. NOT the final script.
 * This file is the single source of the sample lines; the real dialogue system
 * (random chatter / loop-progress story / per-anomaly lines) is designed in #29
 * and the setting itself lives in docs/story.md.
 *
 * Film subtitle convention: no punctuation marks (the Japanese comma and period);
 * separate phrases with a full-width space. ? ! and the ellipsis are fine.
 * The speaker is not shown on screen; tone tells them apart.
 *
 * who 'A' = the middle-aged woman (veteran detective staking out in the guard room)
 * who 'M' = the young man (the building's security guard)
 * hint: true = hint lines, shown in order (two at a time) after a false report.
 */
export interface DialogueLine {
  who: 'A' | 'M'
  text: string
  hint?: boolean
}

export const DIALOGUE: DialogueLine[] = [
  { who: 'A', text: '今夜もここ使わせてもらうわね' },
  { who: 'M', text: 'はい　三時に巡回に出ます' },
  { who: 'A', text: '換気効きすぎ?　首のうしろ寒いわ' },
  { who: 'M', text: 'すみません　空調　見ておきます' },
  { who: 'M', text: '3番の看板　いつもと違います' },
  { who: 'A', text: 'メモしといてもらえる?　例の件' },
  { who: 'M', text: 'あ　毛布……いえ　なんでも' },
  { who: 'A', text: 'なによ　言いかけてやめて' },
  { who: 'M', text: 'いま後ろ……いえ　なんでもないです' },
  { who: 'A', text: '今ドア閉まった?　気のせいね' },
  { who: 'A', text: '……あんた　顔赤くない?' },
  { who: 'M', text: 'い　いえ!　暖房のせいです' },
  { hint: true, who: 'A', text: 'さっきの違うみたい　日誌は?' },
  { hint: true, who: 'M', text: '3番に看板はない　はずです' },
  { hint: true, who: 'A', text: '映ってる物だけ見てない?' },
  { hint: true, who: 'M', text: 'カメラの向きも日誌にあります' },
]
