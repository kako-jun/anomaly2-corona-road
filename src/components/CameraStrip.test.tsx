// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { makeCameras } from '../test/factories'
import { CameraStrip } from './CameraStrip'

const setup = (current: number) => {
  const onSelect = vi.fn()
  const { container } = render(
    <CameraStrip
      cameras={makeCameras(4)}
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
    const tabs = screen.getAllByRole('button')
    expect(tabs.map(t => t.getAttribute('aria-pressed'))).toEqual([
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
    const tabs = screen.getAllByRole('button')
    expect(tabs[0]).toHaveClass('pressed')
    expect(tabs[1]).not.toHaveClass('pressed')
  })

  it('shows no anomaly indicator (the player must spot the difference)', () => {
    const { cells } = setup(0)
    expect(cells.some(c => c.querySelector('.lamp.alert'))).toBe(false)
    expect(screen.getByRole('button', { name: 'Camera 2' })).toBeInTheDocument()
  })

  it('lights no lamp, presses no key and ignores clicks while disabled (the ending camera, #273)', async () => {
    const onSelect = vi.fn()
    const { container } = render(
      <CameraStrip
        cameras={makeCameras(4)}
        currentIndex={0}
        onSelect={onSelect}
        disabled
      />
    )
    expect(container.querySelectorAll('.lamp.green.on')).toHaveLength(0)
    expect(container.querySelectorAll('.key.pressed')).toHaveLength(0)
    const keys = screen.getAllByRole('button')
    expect(keys.every(k => (k as HTMLButtonElement).disabled)).toBe(true)
    await userEvent.click(keys[2])
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('calls onSelect with the clicked index', async () => {
    const { onSelect } = setup(0)
    await userEvent.click(screen.getByRole('button', { name: 'Camera 3' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(2)
  })
})
