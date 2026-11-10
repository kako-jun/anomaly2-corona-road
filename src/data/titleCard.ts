/**
 * The words on the title card (the nameplate with the rules), in the two languages (#292). The machine
 * parts themselves (START SHIFT, REPORT, the lamps) stay English in both; only the explaining sentences
 * change. #296 will redo this card as taped notes; until then this is the minimum that follows the language.
 */
import type { Language } from '../utils/saveData'

export interface CardText {
  plate: string
  purposeLabel: string
  purpose: string
  switchLabel: string
  switchText: string
  switchKeys: string
  adjustLabel: string
  adjust: string
  reportLabel: string
  /** Text before and after the REPORT key picture. */
  reportBefore: string
  reportAfter: string
  mistakeLabel: string
}

export const CARD: Record<Language, CardText> = {
  ja: {
    plate: '取扱い・監視カメラ 8台',
    purposeLabel: '目的',
    purpose:
      '地下街の監視カメラ8台を見て、おかしなところを見つけたら報告する。',
    switchLabel: '切替',
    switchText: '番号ボタン / 画面を左右にスワイプ',
    switchKeys: 'キーボードは左右の矢印キー、A と D、数字の1から8',
    adjustLabel: '調整',
    adjust: '明るさ・コントラストは左右にドラッグ(矢印キーでも)',
    reportLabel: '報告',
    reportBefore: '',
    reportAfter: ' を押してカテゴリを選ぶ',
    mistakeLabel: 'お手つき',
  },
  en: {
    plate: 'OPERATION · 8 CAMERAS',
    purposeLabel: 'GOAL',
    purpose:
      'Watch the 8 cameras of the underground mall. Report anything strange.',
    switchLabel: 'SWITCH',
    switchText: 'Number buttons / swipe the screen left or right',
    switchKeys: 'Keyboard: left and right arrow keys, A and D, numbers 1 to 8',
    adjustLabel: 'ADJUST',
    adjust: 'Drag brightness and contrast left or right (arrow keys too)',
    reportLabel: 'REPORT',
    reportBefore: 'Press ',
    reportAfter: ' and pick a category',
    mistakeLabel: 'FALSE',
  },
}
