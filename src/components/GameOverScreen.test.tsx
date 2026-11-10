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
      <GameOverScreen closing={closing} stats={stats} onRestart={restart} />
    )
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByText('Tonight’s record: 3')).toBeInTheDocument()
    expect(
      screen.getByText('Total reports: 17 · Distinct anomalies: 2')
    ).toBeInTheDocument()
    expect(
      screen.getByText('False reports: 2 · Shift duration: 2m 05s')
    ).toBeInTheDocument()
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
})
