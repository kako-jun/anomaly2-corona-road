// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GameOverScreen } from './GameOverScreen'

vi.mock('../utils/saveData', () => ({
  load: () => ({ foundTotal: 17, foundIds: ['a', 'b'] }),
}))
const stats = {
  currentTime: 0,
  correctReports: 3,
  misreports: 0,
  totalAnomalies: 4,
  detectedAnomalies: 3,
}

describe('case report', () => {
  it.each([
    [true, 'DAWN'],
    [false, 'WITHDRAWN'],
  ] as const)('shows the result and totals', (victory, label) => {
    const restart = vi.fn()
    render(
      <GameOverScreen victory={victory} stats={stats} onRestart={restart} />
    )
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByText('Tonight’s record: 3')).toBeInTheDocument()
    expect(
      screen.getByText('Total reports: 17 · Distinct anomalies: 2')
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'RESTART SHIFT' }))
    expect(restart).toHaveBeenCalledOnce()
  })
})
