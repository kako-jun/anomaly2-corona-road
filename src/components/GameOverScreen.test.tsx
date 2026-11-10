// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GameOverScreen } from './GameOverScreen'
import { emptySave } from '../utils/saveData'
import type { SaveData } from '../utils/saveData'

let current: SaveData
vi.mock('../utils/saveData', async importOriginal => ({
  ...(await importOriginal<typeof import('../utils/saveData')>()),
  load: () => current,
}))

const stats = {
  currentTime: 125000,
  correctReports: 3,
  misreports: 2,
  totalAnomalies: 4,
  detectedAnomalies: 3,
}
const shift = (over = {}) => ({
  found: 3,
  fresh: 1,
  misreports: 2,
  durationMs: 125000,
  closing: 'dawn' as const,
  raised: [] as string[],
  ...over,
})
const saved = (over: Partial<SaveData> = {}) => {
  current = {
    ...emptySave(),
    loops: 4,
    foundTotal: 17,
    foundIds: ['a', 'b'],
    flags: { elder1: true },
    lastShift: shift(),
    ...over,
  }
}

beforeEach(() => saved())
afterEach(() => {
  document.documentElement.lang = 'ja'
})

describe('result = investigation note (#297)', () => {
  it('shows the night, the tonight column and the totals from the save', () => {
    render(
      <GameOverScreen
        closing="dawn"
        outcome="win"
        stats={stats}
        onRestart={vi.fn()}
      />
    )
    expect(screen.getByRole('article')).toHaveAccessibleName(
      '捜査メモ 4夜目 今夜の捜査 夜明け'
    )
    expect(screen.getByText('今夜も異変を報告。')).toBeInTheDocument()
    expect(screen.getByText('今夜')).toBeInTheDocument()
    expect(screen.getByText('2:05')).toBeInTheDocument()
    expect(screen.getByText('17')).toBeInTheDocument()
  })

  it.each([
    ['withdraw', 'lose', '撤収', 'お手つきが重なり、席を立つ。'],
    ['ending', 'win', '夜明け', '異変を、すべて見送った。'],
  ] as const)(
    '%s uses its stamp and stock line',
    (closing, outcome, stamp, line) => {
      saved({
        lastShift: shift({ closing }),
        flags: { elder1: true, child: true },
      })
      render(
        <GameOverScreen
          closing={closing}
          outcome={outcome}
          stats={stats}
          onRestart={vi.fn()}
        />
      )
      expect(screen.getByText(stamp)).toBeInTheDocument()
      expect(screen.getByText(line)).toBeInTheDocument()
    }
  )

  it('says there was no progress when no new kind was found', () => {
    saved({ lastShift: shift({ fresh: 0 }) })
    render(
      <GameOverScreen
        closing="dawn"
        outcome="lose"
        stats={stats}
        onRestart={vi.fn()}
      />
    )
    expect(screen.getByText('今夜の捜査は進捗がなかった。')).toBeInTheDocument()
    expect(screen.queryByText('今夜も異変を報告。')).toBeNull()
  })

  it('shows the English note when the page language is English', () => {
    document.documentElement.lang = 'en'
    render(
      <GameOverScreen
        closing="dawn"
        outcome="win"
        stats={stats}
        onRestart={vi.fn()}
      />
    )
    expect(screen.getByText('CASE MEMO')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'ONE MORE SHIFT' })
    ).toBeInTheDocument()
  })

  it('falls back to the shift stats when the save has no lastShift', () => {
    saved({ lastShift: undefined })
    render(
      <GameOverScreen
        closing="withdraw"
        outcome="lose"
        stats={stats}
        onRestart={vi.fn()}
      />
    )
    expect(screen.getByText('撤収')).toBeInTheDocument()
  })

  it.each([
    ['dawn', 'win'],
    ['withdraw', 'lose'],
  ] as const)(
    'keeps the restart key after %s when the ending was not reached (#294)',
    (closing, outcome) => {
      const restart = vi.fn()
      render(
        <GameOverScreen
          closing={closing}
          outcome={outcome}
          stats={stats}
          onRestart={restart}
          endingReached={false}
          onTitle={vi.fn()}
        />
      )
      expect(
        screen.queryByRole('button', { name: 'タイトルへ戻る' })
      ).toBeNull()
      fireEvent.click(screen.getByRole('button', { name: 'もう一度、勤務' }))
      expect(restart).toHaveBeenCalledOnce()
    }
  )

  it('after the true ending the key returns to the title instead of restarting (#294)', () => {
    const restart = vi.fn()
    const title = vi.fn()
    render(
      <GameOverScreen
        closing="ending"
        outcome="win"
        stats={stats}
        onRestart={restart}
        endingReached
        onTitle={title}
      />
    )
    expect(screen.queryByRole('button', { name: 'もう一度、勤務' })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'タイトルへ戻る' }))
    expect(title).toHaveBeenCalledOnce()
    expect(restart).not.toHaveBeenCalled()
  })
})
