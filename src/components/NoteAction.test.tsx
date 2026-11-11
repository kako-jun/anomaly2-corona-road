// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { NoteAction } from './NoteAction'

describe('NoteAction (the handwritten action on the note)', () => {
  it('is a real button named by its words; the strokes are hidden from assistive technology', async () => {
    const onClick = vi.fn()
    const { container } = render(
      <NoteAction label="Start the shift" onClick={onClick} busy={false} />
    )
    const btn = screen.getByRole('button', { name: 'Start the shift' })
    expect(btn).toHaveAttribute('type', 'button')
    for (const svg of container.querySelectorAll('svg'))
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    await userEvent.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('carries its hand-drawn focus loop (shown by CSS on keyboard focus) and the circle around the words', () => {
    const { container } = render(
      <NoteAction label="Once more" onClick={vi.fn()} busy={false} />
    )
    expect(container.querySelector('.note-act-focus path')).not.toBeNull()
    expect(container.querySelector('.note-act-ring path')).not.toBeNull()
    expect(container.querySelector('.note-act-arrow')).not.toBeNull()
  })

  it('cannot be pressed while it is waiting', async () => {
    const onClick = vi.fn()
    render(<NoteAction label="One moment…" onClick={onClick} busy />)
    const btn = screen.getByRole('button', { name: 'One moment…' })
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })
})
