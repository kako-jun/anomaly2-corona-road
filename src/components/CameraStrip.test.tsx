// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { makeCameras } from '../test/factories'
import { CameraStrip } from './CameraStrip'

const setup = (current: number, anomalyAt: number[] = []) => {
  const onSelect = vi.fn()
  const { container } = render(
    <CameraStrip
      cameras={makeCameras(4, anomalyAt)}
      currentIndex={current}
      onSelect={onSelect}
    />
  )
  const cells = [...container.querySelectorAll('.cam-cell')]
  return { onSelect, cells }
}

describe('CameraStrip', () => {
  it('marks only the current camera as selected', () => {
    setup(2)
    const tabs = screen.getAllByRole('tab')
    expect(tabs.map(t => t.getAttribute('aria-selected'))).toEqual([
      'false',
      'false',
      'true',
      'false',
    ])
  })

  it('lights the green lamp only on the selected camera', () => {
    const { cells } = setup(1)
    const on = cells.map(c =>
      c.querySelector('.lamp.green')!.classList.contains('on')
    )
    expect(on).toEqual([false, true, false, false])
  })

  it('presses only the selected key', () => {
    setup(0)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveClass('pressed')
    expect(tabs[1]).not.toHaveClass('pressed')
  })

  it('lights the amber lamp only where hasAnomaly is set', () => {
    const { cells } = setup(0, [3])
    const on = cells.map(c =>
      c.querySelector('.lamp.alert')!.classList.contains('on')
    )
    expect(on).toEqual([false, false, false, true])
  })

  it('adds ", anomaly active" to the label only for anomalous cameras', () => {
    setup(0, [1])
    expect(
      screen.getByRole('tab', { name: 'Camera 2, anomaly active' })
    ).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Camera 1' })).toBeInTheDocument()
  })

  it('calls onSelect with the clicked index', async () => {
    const { onSelect } = setup(0)
    await userEvent.click(screen.getByRole('tab', { name: 'Camera 3' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(2)
  })
})
