// @vitest-environment jsdom
import { createRef } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ReportButton, ReportDialog } from './ReportPanel'

const CATEGORIES = ['Camera', 'Object', 'Environment', 'Person', 'Surreal']

const setupDialog = () => {
  const onSelect = vi.fn()
  const onClose = vi.fn()
  const utils = render(<ReportDialog onSelect={onSelect} onClose={onClose} />)
  const dialog = screen.getByRole('dialog')
  const scrim = dialog.parentElement as HTMLElement
  const buttons = within(dialog).getAllByRole('button')
  return { onSelect, onClose, dialog, scrim, buttons, ...utils }
}

describe('ReportDialog', () => {
  it('focuses the first button on mount', () => {
    const { buttons } = setupDialog()
    expect(buttons[0]).toHaveFocus()
    expect(buttons[0]).toHaveTextContent('CAMERA')
  })

  it('closes once on Escape', () => {
    const { onClose } = setupDialog()
    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes with CANCEL', async () => {
    const { onClose } = setupDialog()
    await userEvent.click(screen.getByRole('button', { name: 'CANCEL' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it.each(CATEGORIES)(
    'selecting %s calls onSelect with it and does not close by itself',
    async category => {
      const { onSelect, onClose } = setupDialog()
      await userEvent.click(
        screen.getByRole('button', { name: category.toUpperCase() })
      )
      expect(onSelect).toHaveBeenCalledTimes(1)
      expect(onSelect).toHaveBeenCalledWith(category)
      expect(onClose).not.toHaveBeenCalled()
    }
  )

  it('closes when pressed and released on the scrim', async () => {
    const { onClose, scrim } = setupDialog()
    await userEvent.click(scrim)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when pressed inside the dialog and released on the scrim', () => {
    const { onClose, scrim, dialog } = setupDialog()
    fireEvent.pointerDown(dialog)
    fireEvent.click(scrim)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not close when pressed on the scrim and released inside the dialog', () => {
    const { onClose, scrim, dialog } = setupDialog()
    fireEvent.pointerDown(scrim)
    fireEvent.click(dialog)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not close on a click inside the dialog', async () => {
    const { onClose, dialog } = setupDialog()
    await userEvent.click(dialog)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not close on a bare click with no preceding press on the scrim', () => {
    const { onClose, scrim } = setupDialog()
    fireEvent.click(scrim)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('Tab on the last button wraps to the first', () => {
    const { buttons } = setupDialog()
    const last = buttons[buttons.length - 1]
    last.focus()
    const ev = fireEvent.keyDown(last, { key: 'Tab' })
    expect(ev).toBe(false) // default prevented
    expect(buttons[0]).toHaveFocus()
  })

  it('Shift+Tab on the first button wraps to the last', () => {
    const { buttons } = setupDialog()
    buttons[0].focus()
    fireEvent.keyDown(buttons[0], { key: 'Tab', shiftKey: true })
    expect(buttons[buttons.length - 1]).toHaveFocus()
  })

  it('Tab in the middle is left to the browser', () => {
    const { buttons } = setupDialog()
    buttons[1].focus()
    const ev = fireEvent.keyDown(buttons[1], { key: 'Tab' })
    expect(ev).toBe(true)
    expect(buttons[1]).toHaveFocus()
  })

  it('pulls focus to the first button when focus is outside the dialog', () => {
    const outside = document.createElement('button')
    document.body.appendChild(outside)
    const { buttons } = setupDialog()
    outside.focus()
    fireEvent.keyDown(document.activeElement as Element, { key: 'Tab' })
    expect(buttons[0]).toHaveFocus()
    outside.remove()
  })

  it('stops listening for keys after unmount', () => {
    const { onClose, unmount } = setupDialog()
    unmount()
    fireEvent.keyDown(document.body, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('is a modal dialog labelled by its title', () => {
    const { dialog } = setupDialog()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAccessibleName('SELECT TYPE')
    expect(dialog.getAttribute('aria-labelledby')).toBe('dlgTitle')
  })
})

describe('ReportButton', () => {
  const renderButton = (open: boolean) => {
    const ref = createRef<HTMLButtonElement>()
    const onToggle = vi.fn()
    const { container } = render(
      <ReportButton open={open} buttonRef={ref} onToggle={onToggle} />
    )
    return {
      onToggle,
      ref,
      btn: screen.getByRole('button', { name: 'REPORT' }),
      lamp: container.querySelector('.lamp-big') as HTMLElement,
    }
  }

  it('is collapsed, with an unlit lamp and unpressed key, when closed', () => {
    const { btn, lamp } = renderButton(false)
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(lamp).not.toHaveClass('lit')
    expect(btn).not.toHaveClass('pressed')
  })

  it('is expanded, with a lit lamp and pressed key, when open', () => {
    const { btn, lamp } = renderButton(true)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(lamp).toHaveClass('lamp-big', 'red', 'lit')
    expect(btn).toHaveClass('key', 'key-report', 'pressed')
  })

  it('has well-formed class strings (no stray "false"/"undefined")', () => {
    const { btn, lamp } = renderButton(false)
    expect(btn.className).toBe('key key-report')
    expect(lamp.className).toBe('lamp-big red')
  })

  it('exposes the button through the ref and calls onToggle on click', async () => {
    const { btn, ref, onToggle } = renderButton(false)
    expect(ref.current).toBe(btn)
    await userEvent.click(btn)
    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})
