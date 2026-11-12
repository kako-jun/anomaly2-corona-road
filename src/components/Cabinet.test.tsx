// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Feedback } from '../hooks/useGameState'
import { makeCameras, makeStats } from '../test/factories'
import { Cabinet } from './Cabinet'

// canvas-based child; jsdom has no canvas.
vi.mock('./NoiseCanvas', () => ({ NoiseCanvas: () => null }))

// Record what the cabinet hands to the subtitle hook (the hook itself has its own tests).
const subtitleInputs = vi.hoisted(
  () => [] as import('../hooks/useSubtitle').SubtitleInput[]
)
const subtitleCalls = vi.hoisted(() => [] as (number | null)[])
vi.mock('../hooks/useSubtitle', () => ({
  useSubtitle: (input: import('../hooks/useSubtitle').SubtitleInput) => {
    subtitleInputs.push(input)
    subtitleCalls.push(input.wrongFeedbackId)
    return { text: '', visible: false }
  },
}))

const cameras = makeCameras(8)

const makeProps = (
  over: Partial<ComponentProps<typeof Cabinet>> = {}
): ComponentProps<typeof Cabinet> => ({
  stats: makeStats(),
  cameras,
  currentCameraIndex: 0,
  currentCamera: cameras[0],
  unreportedCount: 0,
  feedback: null,
  gameTime: '00:00',
  flagEvent: null,
  ending: null,
  onEndingDone: vi.fn(),
  onSwitch: vi.fn(),
  onReport: vi.fn(),
  ...over,
})

const cabinetEl = (c: HTMLElement) =>
  c.querySelector('.cabinet') as HTMLElement & {
    inert: boolean
  }

beforeEach(() => {
  subtitleCalls.length = 0
  subtitleInputs.length = 0
  window.history.replaceState(null, '', '/')
})
afterEach(() => {
  window.history.replaceState(null, '', '/')
})

describe('Cabinet report dialog', () => {
  it('starts without inert and without a dialog', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    expect(cabinetEl(container).inert).toBeFalsy()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('does not steal focus on first mount', () => {
    render(<Cabinet {...makeProps()} />)
    expect(screen.getByRole('button', { name: 'REPORT' })).not.toHaveFocus()
    expect(document.body).toHaveFocus()
  })

  it('makes the cabinet inert and shows the dialog after REPORT is clicked', async () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(cabinetEl(container).inert).toBe(true)
  })

  it('places the dialog outside the inert cabinet', async () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    expect(cabinetEl(container).contains(screen.getByRole('dialog'))).toBe(
      false
    )
  })

  it('on close: removes inert and returns focus to REPORT', async () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    const report = screen.getByRole('button', { name: 'REPORT' })
    await userEvent.click(report)
    await userEvent.click(screen.getByRole('button', { name: 'CANCEL' }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(cabinetEl(container).inert).toBe(false)
    expect(report).toHaveFocus()
  })

  it('selecting a category reports it and closes the dialog', async () => {
    const props = makeProps()
    const { container } = render(<Cabinet {...props} />)
    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    await userEvent.click(screen.getByRole('button', { name: 'PERSON' }))
    expect(props.onReport).toHaveBeenCalledTimes(1)
    expect(props.onReport).toHaveBeenCalledWith('Person')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(cabinetEl(container).inert).toBe(false)
  })

  it('camera keys work while closed, are off while open, and work again after closing', async () => {
    const props = makeProps()
    render(<Cabinet {...props} />)
    await userEvent.keyboard('2')
    expect(props.onSwitch).toHaveBeenCalledTimes(1)
    expect(props.onSwitch).toHaveBeenLastCalledWith(1)

    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    await userEvent.keyboard('3')
    expect(props.onSwitch).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByRole('button', { name: 'CANCEL' }))
    await userEvent.keyboard('3')
    expect(props.onSwitch).toHaveBeenCalledTimes(2)
    expect(props.onSwitch).toHaveBeenLastCalledWith(2)
  })
})

describe('Cabinet result OSD', () => {
  const osd = (c: HTMLElement) => c.querySelector('.osd-result') as HTMLElement
  const correct: Feedback = {
    id: 1,
    kind: 'correct',
    message: 'ANOMALY LOGGED',
  }

  it('is empty and hidden when there was never a result', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    expect(osd(container)).toBeEmptyDOMElement()
    expect(osd(container)).not.toHaveClass('show')
    expect(osd(container)).toHaveAttribute('aria-hidden', 'true')
  })

  it('shows the message while feedback is set', () => {
    const { container } = render(
      <Cabinet {...makeProps({ feedback: correct })} />
    )
    expect(osd(container)).toHaveTextContent('ANOMALY LOGGED')
    expect(osd(container)).toHaveClass('show')
    expect(osd(container)).toHaveAttribute('aria-hidden', 'false')
  })

  it('keeps the message but drops "show" when feedback goes back to null', () => {
    const props = makeProps({ feedback: correct })
    const { container, rerender } = render(<Cabinet {...props} />)
    rerender(<Cabinet {...props} feedback={null} />)
    expect(osd(container)).toHaveTextContent('ANOMALY LOGGED')
    expect(osd(container)).not.toHaveClass('show')
    expect(osd(container)).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('Cabinet subtitle wiring', () => {
  it('passes the id for a wrong report', () => {
    render(
      <Cabinet
        {...makeProps({ feedback: { id: 7, kind: 'wrong', message: 'x' } })}
      />
    )
    expect(subtitleCalls[subtitleCalls.length - 1]).toBe(7)
  })
  it('passes null for a correct report', () => {
    render(
      <Cabinet
        {...makeProps({ feedback: { id: 8, kind: 'correct', message: 'x' } })}
      />
    )
    expect(subtitleCalls[subtitleCalls.length - 1]).toBeNull()
  })
  it('passes null when there is no feedback', () => {
    render(<Cabinet {...makeProps()} />)
    expect(subtitleCalls[subtitleCalls.length - 1]).toBeNull()
  })
})

describe('Cabinet subtitle wiring (dialogue ledger inputs)', () => {
  const last = () => subtitleInputs[subtitleInputs.length - 1]

  it('hands the wrong report id and the anomaly of that report to the hook', () => {
    render(
      <Cabinet
        {...makeProps({
          feedback: { id: 7, kind: 'wrong', message: 'x', anomalyId: 'an-1' },
        })}
      />
    )
    expect(last().wrongFeedbackId).toBe(7)
    expect(last().wrongAnomalyId).toBe('an-1')
  })

  it('hands a null anomaly id when the wrong report had none', () => {
    render(
      <Cabinet
        {...makeProps({
          feedback: { id: 7, kind: 'wrong', message: 'x', anomalyId: null },
        })}
      />
    )
    expect(last().wrongAnomalyId).toBeNull()
  })

  it('hands null ids for a correct report, even if it carried an anomaly id', () => {
    render(
      <Cabinet
        {...makeProps({
          feedback: { id: 8, kind: 'correct', message: 'x', anomalyId: 'an-1' },
        })}
      />
    )
    expect(last().wrongFeedbackId).toBeNull()
    expect(last().wrongAnomalyId).toBeNull()
  })

  it('hands the play time and the correct reports so far', () => {
    render(
      <Cabinet
        {...makeProps({
          stats: makeStats({ currentTime: 123_456, correctReports: 3 }),
        })}
      />
    )
    expect(last().elapsedMs).toBe(123_456)
    expect(last().foundThisPlay).toBe(3)
  })

  it('hands the flag event, the ending and the done callback through', () => {
    const flagEvent = { seq: 4, flags: ['elder1'] }
    const props = makeProps({ flagEvent, ending: 'withdraw' })
    render(<Cabinet {...props} />)
    expect(last().flagEvent).toBe(flagEvent)
    expect(last().ending).toBe('withdraw')
    expect(last().onClosingDone).toBe(props.onEndingDone)
  })

  it('hands null for the flag event and the ending while the shift is running', () => {
    render(<Cabinet {...makeProps()} />)
    expect(last().flagEvent).toBeNull()
    expect(last().ending).toBeNull()
  })
})

describe('Cabinet --wear (evaluated once at module load)', () => {
  const load = async (search: string) => {
    window.history.replaceState(null, '', `/${search}`)
    vi.resetModules()
    // Re-import React-bound modules together so they share one React instance.
    const rtl = await import('@testing-library/react')
    const { Cabinet: Fresh } = await import('./Cabinet')
    const view = rtl.render(<Fresh {...makeProps()} />)
    return view
  }

  it('sets --wear on the root when ?wear= is given', async () => {
    const view = await load('?wear=0.4')
    expect(
      (
        view.container.querySelector('.retro') as HTMLElement
      ).style.getPropertyValue('--wear')
    ).toBe('0.4')
    view.unmount()
  })

  it('leaves --wear unset without ?wear=', async () => {
    const view = await load('')
    expect(
      (
        view.container.querySelector('.retro') as HTMLElement
      ).style.getPropertyValue('--wear')
    ).toBe('')
    view.unmount()
  })
})

describe('Cabinet true ending screen (Issue #86)', () => {
  const baseSrc = (c: HTMLElement) =>
    c
      .querySelector('.pic__frame img:not(.glow):not(.overlay)')
      ?.getAttribute('src')

  it('shows the camera photo for dawn and the bar image for the ending', () => {
    const { container, rerender } = render(
      <Cabinet {...makeProps({ ending: 'dawn' })} />
    )
    expect(baseSrc(container)).toBe(cameras[0].image)
    rerender(<Cabinet {...makeProps({ ending: 'ending' })} />)
    expect(baseSrc(container)).toBe('/images/ending-bar.webp')
  })
})

describe('Cabinet model plate (#304)', () => {
  it('is an image child of .cabinet with an accessible name, and the old .maker text is gone', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    const plate = screen.getByAltText('Video Monitor CR-42')
    expect(plate.parentElement).toBe(container.querySelector('.cabinet-foot'))
    expect(plate).toHaveAttribute('src', '/ui/model-plate.webp')
    expect(container.querySelector('.maker')).toBeNull()
    expect(container.textContent).not.toContain('VIDEO MONITOR CR-42')
  })

  it('shares one strip with the speaker grille: speaker first (left), plate last (right), both direct children of the strip under .cabinet', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    const foot = container.querySelector('.cabinet-foot') as HTMLElement
    expect(foot.parentElement).toBe(cabinetEl(container))
    expect(Array.from(foot.children).map(c => c.className)).toEqual([
      'speaker',
      'model-plate',
    ])
    expect(container.querySelectorAll('.speaker')).toHaveLength(1)
  })

  it('has no leftover speaker margin workaround in the CSS', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/styles/retro.css'),
      'utf8'
    )
    expect(css).not.toMatch(/\.speaker\s*\{[^}]*margin-bottom/)
    expect(css).not.toMatch(/\.speaker\s*\{\s*display:\s*none/)
  })

  it('keeps the strip small on portrait (20px) and the speaker slots coarse (pitch >= 8px)', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/styles/retro.css'),
      'utf8'
    )
    const base = css.match(
      /\.cabinet\s*\{\s*(?:\/\*[^]*?\*\/\s*)?--plate-h:\s*(\d+)px;[^}]*--hole-p:\s*(\d+)px/
    )
    expect(base).not.toBeNull()
    expect(Number(base![1])).toBe(20)
    expect(Number(base![2])).toBeGreaterThanOrEqual(8)
    expect(css).not.toMatch(/--plate-h:\s*28px/)
    expect(css).toMatch(/background-size:\s*calc\(var\(--hole-p\) \* 9 \/ 7\)/)
  })

  it('keeps the grille at exactly 2 slot rows and fits a whole number of slots across (no clipped right-end slot)', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/styles/retro.css'),
      'utf8'
    )
    const rule = css.match(/\.cabinet-foot > \.speaker\s*\{([^}]*)\}/)
    expect(rule).not.toBeNull()
    // height = 2 rows of pitch, tile = 2 rows tall
    expect(rule![1]).toMatch(/height:\s*calc\(var\(--hole-p\) \* 2\)/)
    expect(rule![1]).toMatch(
      /background-size:\s*calc\(var\(--hole-p\) \* 9 \/ 7\)\s+calc\(var\(--hole-p\) \* 2\)/
    )
    // round horizontally: the tile is nudged so an integer count fills the width
    expect(rule![1]).toMatch(/background-repeat:\s*round\s+no-repeat/)
    // desktop pitch stays a 2-row grille inside the 40px plate strip
    expect(css).toMatch(/--plate-h:\s*40px;\s*--hole-p:\s*14px/)
  })

  it('pins the strip structure: bottom-aligned row, panel reserve = strip height / zoom, column guard, no old .speaker rules', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/styles/retro.css'),
      'utf8'
    )
    const foot = css.match(/\.cabinet > \.cabinet-foot\s*\{([^}]*)\}/)
    expect(foot).not.toBeNull()
    expect(foot![1]).toMatch(/align-items:\s*flex-end/)
    expect(foot![1]).toMatch(/max-width:\s*100%/)
    expect(foot![1]).toMatch(/height:\s*var\(--plate-h\)/)
    // the panel reserves the strip (undoing its own zoom) so the controls never sit under it
    expect(css).toMatch(
      /\.panel\s*\{\s*padding-bottom:\s*calc\(\(var\(--plate-h\) \+ 6px\) \/ var\(--pz, 1\)\);/
    )
    // desktop: the picture height is capped so the control column stays wider than the plate (tall screens)
    expect(css).toMatch(
      /--tube-h:\s*min\(var\(--vh\) - 16px, \(100vw - 30px - var\(--col-min\)\) \* 1679 \/ 1246\)/
    )
    expect(css).toMatch(/--col-min:\s*340px/)
    // the column minimum scales with the panel zoom (1.3 from 1200px, 1.45 from 1400px): 340 x 1.3 = 442, 340 x 1.45 = 493
    const cols = [...css.matchAll(/--col-min:\s*(\d+)px/g)].map(m =>
      Number(m[1])
    )
    expect(cols).toEqual([340, Math.round(340 * 1.3), Math.round(340 * 1.45)])
    // one place owns the grille: no other .speaker rule
    expect(css.match(/(^|\n)\.speaker\s*\{/g)).toBeNull()
    // the plate never leaves the strip
    const plate = css.match(/\.cabinet-foot > \.model-plate\s*\{([^}]*)\}/)
    expect(plate![1]).toMatch(/max-width:\s*100%/)
  })

  it('is in the cabinet preload list of index.html', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
    expect(html).toMatch(/data-cabinet-image\s+href="\/ui\/model-plate\.webp"/)
  })
})

describe('Cabinet REPORT lamp (#344)', () => {
  const lamp = (c: HTMLElement) => c.querySelector('.lamp-big') as HTMLElement

  it.each([
    [0, false],
    [2, false],
    [3, true],
    [4, true],
  ])('with %i unreported, blinking is %s', (n, blinking) => {
    const { container } = render(
      <Cabinet {...makeProps({ unreportedCount: n })} />
    )
    expect(lamp(container).classList.contains('alert')).toBe(blinking)
    expect(lamp(container)).not.toHaveClass('lit')
  })

  it('goes back to not blinking when a report brings the count down', () => {
    const { container, rerender } = render(
      <Cabinet {...makeProps({ unreportedCount: 3 })} />
    )
    expect(lamp(container)).toHaveClass('alert')
    rerender(<Cabinet {...makeProps({ unreportedCount: 2 })} />)
    expect(lamp(container)).not.toHaveClass('alert')
  })

  it('stops blinking and lights steadily while the dialog is open', async () => {
    const { container } = render(
      <Cabinet {...makeProps({ unreportedCount: 5 })} />
    )
    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    expect(lamp(container)).toHaveClass('lit')
    expect(lamp(container)).not.toHaveClass('alert')
  })

  it('shows the always-visible English label and keeps the lamp decorative', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    expect(screen.getByText('Blinks: many unreported')).toBeInTheDocument()
    expect(lamp(container)).toHaveAttribute('aria-hidden', 'true')
  })
})
