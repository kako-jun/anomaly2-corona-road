// @vitest-environment jsdom
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
const subtitleCalls = vi.hoisted(() => [] as (number | null)[])
vi.mock('../hooks/useSubtitle', () => ({
  useSubtitle: (id: number | null) => {
    subtitleCalls.push(id)
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
  feedback: null,
  gameTime: '00:00',
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
  })

  it('shows the message while feedback is set', () => {
    const { container } = render(
      <Cabinet {...makeProps({ feedback: correct })} />
    )
    expect(osd(container)).toHaveTextContent('ANOMALY LOGGED')
    expect(osd(container)).toHaveClass('show')
  })

  it('keeps the message but drops "show" when feedback goes back to null', () => {
    const props = makeProps({ feedback: correct })
    const { container, rerender } = render(<Cabinet {...props} />)
    rerender(<Cabinet {...props} feedback={null} />)
    expect(osd(container)).toHaveTextContent('ANOMALY LOGGED')
    expect(osd(container)).not.toHaveClass('show')
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
