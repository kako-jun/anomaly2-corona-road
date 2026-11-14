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
      const g = d.querySelector('.dg__g')
      expect(g).toHaveAttribute('aria-hidden', 'true')
      expect(g?.textContent).toMatch(/^\d$/)
      expect(g?.textContent).not.toBe(d.firstChild?.textContent)
    }
  })
})

describe('GameHUD colon (RT-UI-23)', () => {
  it.each(['fast', 'steady'] as const)(
    'puts the %s class on the colon only while the effect runs',
    v => {
      const on = render(
        <GameHUD
          gameTime="01:02"
          stats={makeStats()}
          fx={new Set(['RT-UI-23'])}
          colonVariant={v}
        />
      ).container
      expect(on.querySelector('.clock-colon')).toHaveClass(`clock-colon--${v}`)
      const off = render(
        <GameHUD gameTime="01:02" stats={makeStats()} colonVariant={v} />
      ).container
      expect(off.querySelector('.clock-colon')).not.toHaveClass(
        `clock-colon--${v}`
      )
    }
  )
})

describe('GameHUD RT-UI-04 (false strikes) and RT-UI-05 (time shown)', () => {
  const strikes = (misreports: number, fx: string[]) => {
    const { container } = render(
      <GameHUD
        gameTime="01:23"
        stats={makeStats({ misreports })}
        fx={new Set(fx)}
      />
    )
    return [...container.querySelectorAll('.lamps .lamp.on')].length
  }
  it('RT-UI-04 lights one more lamp than the real count (capped at the max), the accessible name keeps the real count', () => {
    expect(strikes(0, [])).toBe(0)
    expect(strikes(0, ['RT-UI-04'])).toBe(1)
    expect(strikes(1, ['RT-UI-04'])).toBe(2)
    expect(strikes(max, ['RT-UI-04'])).toBe(max)
    expect(
      screen.getByRole('img', { name: `Strikes ${max} of ${max}` })
    ).toBeInTheDocument()
  })
  it('shownTime replaces the digits only; the timer keeps the real time as its name', () => {
    const { container } = render(
      <GameHUD gameTime="01:23" shownTime="06:23" stats={makeStats()} />
    )
    expect(container.querySelector('.vfd')?.textContent).toBe('06:23')
    expect(screen.getByRole('timer', { name: '01:23' })).toBeInTheDocument()
  })
})
