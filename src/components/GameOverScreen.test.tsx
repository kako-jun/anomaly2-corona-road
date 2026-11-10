// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GameOverScreen } from './GameOverScreen'

vi.mock('../utils/saveData', () => ({
  load: () => ({ foundTotal: 17, foundIds: ['a', 'b'] }),
}))
const stats = {
  currentTime: 125000,
  correctReports: 3,
  misreports: 2,
  totalAnomalies: 4,
  detectedAnomalies: 3,
}

describe('case report', () => {
  it.each([
    ['dawn', 'DAWN'],
    ['withdraw', 'WITHDRAWN'],
    ['ending', 'THE TRUTH AT DAWN'],
  ] as const)('shows the result and totals', (closing, label) => {
    const restart = vi.fn()
    render(
      <GameOverScreen
        closing={closing}
        outcome={closing === 'withdraw' ? 'lose' : 'win'}
        stats={stats}
        onRestart={restart}
      />
    )
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByText('Tonight’s record: 3')).toBeInTheDocument()
    expect(
      screen.getByText('Total reports: 17 · Distinct anomalies: 2')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        (_, el) =>
          el?.tagName === 'P' &&
          el.textContent === 'False reports: 2 · Shift duration: 2m 05s'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Shift duration: 2m 05s')).toHaveClass(
      'result-nowrap'
    )
    fireEvent.click(screen.getByRole('button', { name: 'RESTART SHIFT' }))
    expect(restart).toHaveBeenCalledOnce()
  })

  it('does not say the player survived when dawn came with too few reports', () => {
    render(
      <GameOverScreen
        closing="dawn"
        outcome="lose"
        stats={stats}
        onRestart={vi.fn()}
      />
    )
    expect(screen.getByText('TIME UP')).toBeInTheDocument()
    expect(screen.queryByText('DAWN')).toBeNull()
  })

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
    expect(screen.queryByRole('button', { name: 'RESTART SHIFT' })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'BACK TO TITLE' }))
    expect(title).toHaveBeenCalledOnce()
    expect(restart).not.toHaveBeenCalled()
  })
})
