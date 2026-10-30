// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { makeStats } from '../test/factories'
import { DEFAULT_CONFIG } from '../utils/gameConfig'
import { GameHUD } from './GameHUD'

const max = DEFAULT_CONFIG.maxMisreports

const lamps = (misreports: number) => {
  const { container } = render(
    <GameHUD gameTime="01:23" stats={makeStats({ misreports })} />
  )
  return [...container.querySelectorAll('.lamps .lamp')]
}

describe('GameHUD', () => {
  it('renders one lamp per allowed strike', () => {
    expect(lamps(0)).toHaveLength(max)
  })
  it.each([0, 1, max - 1, max, max + 1])(
    'lights min(misreports, max) lamps for misreports=%i',
    n => {
      const l = lamps(n)
      expect(l.filter(x => x.classList.contains('on'))).toHaveLength(
        Math.min(n, max)
      )
    }
  )
  it('lights the leftmost lamps first', () => {
    const l = lamps(1)
    expect(l[0]).toHaveClass('on')
    expect(l[1]).not.toHaveClass('on')
  })
  it('labels the lamps "Strikes n of max"', () => {
    render(<GameHUD gameTime="00:00" stats={makeStats({ misreports: 2 })} />)
    expect(
      screen.getByRole('img', { name: `Strikes 2 of ${max}` })
    ).toBeInTheDocument()
  })
  it('shows reports against minCorrectReports', () => {
    render(
      <GameHUD gameTime="00:00" stats={makeStats({ correctReports: 2 })} />
    )
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(
      screen.getByText(`/ ${DEFAULT_CONFIG.minCorrectReports}`)
    ).toBeInTheDocument()
  })
  it('shows the shift time', () => {
    render(<GameHUD gameTime="03:07" stats={makeStats()} />)
    expect(screen.getByText('03:07')).toBeInTheDocument()
  })
})
