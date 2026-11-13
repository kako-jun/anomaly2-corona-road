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
    expect(screen.getByText('/')).toBeInTheDocument()
    expect(
      screen.getByText(String(DEFAULT_CONFIG.minCorrectReports))
    ).toBeInTheDocument()
  })
  it('shows the in-game time under the TIME label', () => {
    render(<GameHUD gameTime="03:07" stats={makeStats()} />)
    expect(screen.getByText('TIME')).toBeInTheDocument()
    expect(screen.queryByText(/SHIFT/)).toBeNull()
    const clock = screen.getByLabelText('03:07')
    expect(clock).toHaveTextContent('03:07')
    expect(clock.querySelector('.clock-colon')).toHaveTextContent(':')
  })
})

describe('GameHUD monitor effects (#416)', () => {
  const hud = (...ids: string[]) =>
    render(
      <GameHUD
        gameTime="12:34"
        stats={makeStats({ correctReports: 7 })}
        fx={new Set(ids)}
      />
    ).container
  const labels = (c: HTMLElement) =>
    [...c.querySelectorAll('.label')].map(l => l.textContent)

  it('swaps the TIME / REPORTS headings and leaves the numbers (RT-UI-02)', () => {
    const c = hud('RT-UI-02')
    expect(labels(c)).toEqual(['REPORTS', 'TIME', 'STRIKES'])
    expect(c.querySelector('[role=timer]')).toHaveAttribute(
      'aria-label',
      '12:34'
    )
    expect(c.querySelector('.vfd--reports')?.textContent).toBe(
      `7/${DEFAULT_CONFIG.minCorrectReports}`
    )
  })
  it('corrupts / mixes the headings (RT-UI-06 / 07)', () => {
    expect(labels(hud('RT-UI-06'))).not.toContain('TIME')
    expect(labels(hud('RT-UI-07')).join('')).toMatch(/時/)
  })
  it('plain text and no digit spans without a digit effect', () => {
    const c = hud()
    expect(c.querySelector('.dg')).toBeNull()
    expect(labels(c)).toEqual(['TIME', 'REPORTS', 'STRIKES'])
  })
  it('RT-UI-17 cuts every second digit of each window, the value unchanged', () => {
    const c = hud('RT-UI-17')
    expect(c.querySelectorAll('[role=timer] .dg--cut')).toHaveLength(2)
    expect(c.querySelectorAll('.vfd--reports .dg--cut').length).toBeGreaterThan(
      0
    )
    expect(c.querySelector('[role=timer] span')?.textContent).toBe('12:34')
  })
  it('RT-UI-18 gives every digit a ghost that is another digit', () => {
    const c = hud('RT-UI-18')
    const dgs = [...c.querySelectorAll('.dg')]
    expect(dgs.length).toBeGreaterThan(4)
    for (const d of dgs) {
      expect(d.getAttribute('data-ghost')).toMatch(/^\d$/)
      expect(d.getAttribute('data-ghost')).not.toBe(d.textContent)
    }
  })
})
