// @vitest-environment jsdom
import { createRef } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ReportButton, ReportDialog } from './ReportPanel'

const CATEGORIES = ['Camera', 'Object', 'Environment', 'Person', 'Surreal']

const setupDialog = (language?: 'ja' | 'en') => {
  const onSelect = vi.fn()
  const onClose = vi.fn()
  const utils = render(
    <ReportDialog language={language} onSelect={onSelect} onClose={onClose} />
  )
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
    expect(dialog).toHaveAccessibleName('SELECT CATEGORY')
    expect(dialog.getAttribute('aria-labelledby')).toBe('dlgTitle')
  })

  describe('category notes (#236, pictures and Japanese in #346)', () => {
    const EN: Record<string, string> = {
      Camera:
        'The whole picture glitches. Noise, black screen, drift. A surface across the view changes.',
      Object: 'Things appear, vanish, change. Floor, wall, ceiling things too.',
      Environment:
        "Changes in light. The floor, wall, ceiling surface. Doors, the building's structure.",
      Person:
        'A person, a shadow, a body part. Traces of someone. Human shapes: dolls, art, shadows. Not animals.',
      Surreal: "Something impossible. What should show up doesn't.",
    }
    const JA: Record<string, string> = {
      Camera:
        '映像そのものが乱れる。ノイズ、真っ暗、ずれ。画面を横切る面の変化。',
      Object: '物が出る、消える。物が変わる。床や壁、天井の物も。',
      Environment: '光の変化。床、壁、天井の面。扉や建物のつくり。',
      Person:
        '人、人影、体の一部。人の痕跡。人の形(人形、絵、影)。動物は含まない。',
      Surreal: 'ありえないこと。映るはずのものが映らない。',
    }
    const CASES = [
      ['en', EN],
      ['ja', JA],
    ] as const

    describe.each(CASES)('language %s', (language, words) => {
      it.each(CATEGORIES)(
        'shows the picture for %s, with its words linked by aria-describedby',
        category => {
          const { dialog } = setupDialog(language)
          const button = within(dialog).getByRole('button', {
            name: category.toUpperCase(),
          })
          const id = button.getAttribute('aria-describedby')
          expect(id).toBeTruthy()
          const text = document.getElementById(id as string)
          expect(text).not.toBeNull()
          expect(dialog).toContainElement(text)
          expect(text?.textContent).toBe(words[category])
          // the picture itself is decoration (alt=""), named files of this language only
          const img = text?.parentElement?.querySelector('img')
          expect(img).toHaveAttribute('alt', '')
          expect(img?.getAttribute('src')).toMatch(
            new RegExp(
              `^/report-notes/${language}-${category.toLowerCase()}\\.webp$`
            )
          )
          expect(Number(img?.getAttribute('width'))).toBeGreaterThan(0)
          expect(Number(img?.getAttribute('height'))).toBeGreaterThan(0)
        }
      )
    })

    it.each(['ja', 'en'] as const)(
      'when the picture cannot be read (%s) the same words show as visible text, no broken image',
      language => {
        const { dialog } = setupDialog(language)
        const img = dialog.querySelector('img') as HTMLImageElement
        const box = img.closest('.cat-note') as HTMLElement
        fireEvent.error(img)
        expect(box.querySelector('img')).toBeNull()
        const text = box.querySelector('.cat-note-text') as HTMLElement
        expect(text).not.toBeNull()
        expect(text.textContent).toContain(
          language === 'ja'
            ? '映像そのものが乱れる'
            : 'The whole picture glitches'
        )
        // the sr-only words stay, and the key still points at them
        expect(
          document.getElementById('catHint-Camera')?.textContent
        ).toBeTruthy()
      }
    )

    it('follows the browser language by default and keeps the keys in English', () => {
      const lang = vi.spyOn(window.navigator, 'languages', 'get')
      lang.mockReturnValue(['ja-JP'])
      const { dialog } = setupDialog()
      expect(
        dialog.querySelector('img[src^="/report-notes/ja-"]')
      ).not.toBeNull()
      expect(dialog.querySelector('img[src^="/report-notes/en-"]')).toBeNull()
      expect(
        within(dialog).getByRole('button', { name: 'CAMERA' })
      ).toBeInTheDocument()
      lang.mockRestore()
    })

    it('renders one hint element per category', () => {
      const { dialog } = setupDialog()
      expect(dialog.querySelectorAll('.cat-note')).toHaveLength(
        CATEGORIES.length
      )
    })

    it('gives CANCEL no hint', () => {
      setupDialog()
      const cancel = screen.getByRole('button', { name: 'CANCEL' })
      expect(cancel).not.toHaveAttribute('aria-describedby')
      expect(cancel.parentElement?.querySelector('.cat-note')).toBeNull()
    })
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

  it('keeps the lamp off, lit or blinking, when lampsOff (the ending camera, #273)', () => {
    const { container } = render(
      <ReportButton
        open
        alert
        lampsOff
        buttonRef={createRef<HTMLButtonElement>()}
        onToggle={vi.fn()}
      />
    )
    const lamp = container.querySelector('.lamp-big') as HTMLElement
    expect(lamp).not.toHaveClass('lit')
    expect(lamp).not.toHaveClass('alert')
  })

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
