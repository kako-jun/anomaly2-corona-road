// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { titleNotes } from '../data/titleNotes'
import { StartScreen } from './StartScreen'

const setup = () => {
  const onStart = vi.fn()
  const view = render(<StartScreen onStart={onStart} />)
  const q = (sel: string) => [...view.container.querySelectorAll(sel)]
  return { onStart, q, ...view }
}

describe('StartScreen start button', () => {
  it('is a type="button" with the accessible name START SHIFT', () => {
    setup()
    const btn = screen.getByRole('button', { name: 'START SHIFT' })
    expect(btn).toHaveAttribute('type', 'button')
  })
  it('has the start key as its only button besides the language keys', () => {
    setup()
    expect(
      screen
        .getAllByRole('button')
        .filter(b => !b.classList.contains('start-page'))
    ).toHaveLength(1)
  })
  it('calls onStart once per click', async () => {
    const { onStart } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })
  it('calls onStart for every click (no debounce here; the parent owns the state change)', async () => {
    const { onStart } = setup()
    const btn = screen.getByRole('button', { name: 'START SHIFT' })
    await userEvent.dblClick(btn)
    expect(onStart).toHaveBeenCalledTimes(2)
  })
  it('can be started from the keyboard (Enter and Space)', async () => {
    const { onStart } = setup()
    screen.getByRole('button', { name: 'START SHIFT' }).focus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')
    expect(onStart).toHaveBeenCalledTimes(2)
  })
  it('marks its lamp glyph as decorative', () => {
    setup()
    const icon = document.querySelector('.start-lamp')!
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('StartScreen headings and logo', () => {
  it('has exactly one h1', () => {
    setup()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })
  it('keeps the h1 in the accessibility tree (visually hidden via class, not hidden)', () => {
    setup()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveClass('start-sr-only')
    expect(h1).toHaveTextContent('Corona Road')
  })
  it('treats the logo image as decorative (the h1 carries the name)', () => {
    const { q } = setup()
    const img = q('.start-photo img')[0]
    expect(img.getAttribute('alt')).toBe('')
    expect(img).toHaveAttribute('src', '/images/logo.webp')
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})

describe('StartScreen content', () => {
  it('has no emoji', () => {
    const { container } = setup()
    expect(container.textContent).not.toMatch(
      /\p{Extended_Pictographic}|\p{Emoji_Presentation}|\uFE0F/u
    )
  })
  it("shows the START key as the cabinet's own key part, with a lamp beside it, and no plate under it", () => {
    const { q } = setup()
    expect(
      screen.getByRole('button', { name: 'START SHIFT' }).className
    ).toContain('key')
    expect(q('.start-deck .lamp')).toHaveLength(1)
    expect(q('.start-speaker, .start-plate')).toHaveLength(0)
  })
  it('turns the lamp amber and disables the key while loading', () => {
    const { container } = render(<StartScreen onStart={vi.fn()} loading />)
    expect(container.querySelector('.lamp')).toHaveClass('amber')
    expect(screen.getByRole('button', { name: 'LOADING…' })).toBeDisabled()
  })
})

describe('StartScreen notes (#296)', () => {
  it('puts the three notes in a labelled bundle: every picture is there, the page shown carries the wording as alt', () => {
    render(<StartScreen onStart={vi.fn()} language="ja" />)
    const region = screen.getByRole('region', { name: '遊び方' })
    const imgs = region.querySelectorAll('img')
    expect(imgs).toHaveLength(3)
    for (const [i, n] of titleNotes('ja').entries())
      expect(imgs[i]).toHaveAttribute('src', n.src)
    expect(imgs[0]).toHaveAttribute('alt', titleNotes('ja')[0].alt)
  })
  it('swaps to the other language at once, and only that language is in the page', () => {
    const { rerender, container } = render(
      <StartScreen onStart={vi.fn()} language="ja" />
    )
    rerender(<StartScreen onStart={vi.fn()} language="en" />)
    expect(
      screen.getByRole('region', { name: 'How to play' })
    ).toBeInTheDocument()
    const srcs = [...container.querySelectorAll('.start-notes img')].map(i =>
      i.getAttribute('src')
    )
    expect(srcs).toEqual(titleNotes('en').map(n => n.src))
    expect(screen.getByAltText(titleNotes('en')[0].alt)).toBeInTheDocument()
  })
  it('keeps the photo decorative and the h1 as the name', () => {
    const { q } = setup()
    expect(q('.start-photo')[0]).toHaveAttribute('aria-hidden', 'true')
    expect(q('.start-photo img')[0]).toHaveAttribute('src', '/images/logo.webp')
  })

  describe('paging (the same on every screen width)', () => {
    const shown = () =>
      [...document.querySelectorAll('.start-stack img')].filter(
        i => !i.classList.contains('start-off')
      )
    it('shows one note with "1/3", moves on a tap, wraps from the last to the first', async () => {
      render(<StartScreen onStart={vi.fn()} language="ja" />)
      const notes = titleNotes('ja')
      expect(shown().map(i => i.getAttribute('alt'))).toEqual([notes[0].alt])
      expect(screen.getByRole('status')).toHaveTextContent('1/3')
      const page = document.querySelector('.start-page')!
      await userEvent.click(page)
      expect(screen.getByRole('status')).toHaveTextContent('2/3')
      expect(shown()[0]).toHaveAttribute('alt', notes[1].alt)
      await userEvent.click(page)
      await userEvent.click(page)
      expect(screen.getByRole('status')).toHaveTextContent('1/3')
    })
    it('hides the other pages from assistive technology (empty alt, aria-hidden)', () => {
      render(<StartScreen onStart={vi.fn()} language="en" />)
      const off = [...document.querySelectorAll('.start-off')]
      expect(off).toHaveLength(2)
      for (const i of off) {
        expect(i).toHaveAttribute('alt', '')
        expect(i).toHaveAttribute('aria-hidden', 'true')
      }
    })
    it('turns the page by swipe or mouse drag (left = next, right = previous) without a second click', () => {
      render(<StartScreen onStart={vi.fn()} language="ja" />)
      const page = document.querySelector('.start-page')!
      fireEvent.pointerDown(page, { clientX: 200 })
      fireEvent.pointerUp(page, { clientX: 100 })
      fireEvent.click(page) // the click that follows a drag is ignored
      expect(screen.getByRole('status')).toHaveTextContent('2/3')
      fireEvent.pointerDown(page, { clientX: 100 })
      fireEvent.pointerUp(page, { clientX: 200 })
      expect(screen.getByRole('status')).toHaveTextContent('1/3')
    })
    it('a swipe that sends no click does not swallow the next tap', () => {
      render(<StartScreen onStart={vi.fn()} language="ja" />)
      const page = document.querySelector('.start-page')!
      fireEvent.pointerDown(page, { clientX: 200 })
      fireEvent.pointerUp(page, { clientX: 100 })
      fireEvent.pointerDown(page, { clientX: 100 })
      fireEvent.pointerUp(page, { clientX: 100 })
      fireEvent.click(page)
      expect(screen.getByRole('status')).toHaveTextContent('3/3')
    })
    it('turns the page from the keyboard (Enter, Space, arrows) with no hint on screen', async () => {
      render(<StartScreen onStart={vi.fn()} language="ja" />)
      const page = document.querySelector<HTMLElement>('.start-page')!
      page.focus()
      await userEvent.keyboard('{Enter}')
      expect(screen.getByRole('status')).toHaveTextContent('2/3')
      await userEvent.keyboard(' ')
      expect(screen.getByRole('status')).toHaveTextContent('3/3')
      await userEvent.keyboard('{ArrowLeft}')
      expect(screen.getByRole('status')).toHaveTextContent('2/3')
      await userEvent.keyboard('{ArrowRight}')
      expect(screen.getByRole('status')).toHaveTextContent('3/3')
      // the only visible words are the picture and the pager: the hint is sr-only
      expect(page.querySelector('.start-sr-only')).not.toBeNull()
    })
    it('keeps START SHIFT and the language keys working', async () => {
      const onStart = vi.fn()
      render(<StartScreen onStart={onStart} language="ja" />)
      await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
      expect(onStart).toHaveBeenCalledOnce()
    })
  })
})

describe('StartScreen body class', () => {
  it('adds start-open to body while mounted and removes it on unmount', () => {
    const { unmount } = setup()
    expect(document.body).toHaveClass('start-open')
    unmount()
    expect(document.body).not.toHaveClass('start-open')
  })
})

describe('StartScreen after the true ending (#294)', () => {
  it('offers only START OVER: no START SHIFT, and the closed notice is always shown', () => {
    render(
      <StartScreen onStart={vi.fn()} endingReached onStartOver={vi.fn()} />
    )
    expect(screen.queryByRole('button', { name: 'START SHIFT' })).toBeNull()
    expect(
      screen
        .getAllByRole('button')
        .filter(b => !b.classList.contains('start-page'))
    ).toHaveLength(1)
    expect(
      screen.getByRole('button', { name: 'START OVER' })
    ).toBeInTheDocument()
    expect(screen.getByText(/The investigation is closed/)).toBeInTheDocument()
  })
  it('asks once before erasing; CANCEL backs out without erasing', async () => {
    const onStartOver = vi.fn()
    const onStart = vi.fn()
    render(
      <StartScreen onStart={onStart} endingReached onStartOver={onStartOver} />
    )
    await userEvent.click(screen.getByRole('button', { name: 'START OVER' }))
    expect(onStartOver).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('erased')
    await userEvent.click(screen.getByRole('button', { name: 'CANCEL' }))
    expect(onStartOver).not.toHaveBeenCalled()
    expect(
      screen.getByRole('button', { name: 'START OVER' })
    ).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'START OVER' }))
    await userEvent.click(screen.getByRole('button', { name: 'ERASE ALL' }))
    expect(onStartOver).toHaveBeenCalledOnce()
    expect(onStart).not.toHaveBeenCalled()
  })
  it('keeps the ordinary START SHIFT key when the ending was not reached', () => {
    render(<StartScreen onStart={vi.fn()} />)
    expect(
      screen.getByRole('button', { name: 'START SHIFT' })
    ).toBeInTheDocument()
    expect(screen.queryByText(/START OVER/)).toBeNull()
  })
  it('moves keyboard focus: CANCEL on confirm, START OVER after cancel or Escape', async () => {
    render(
      <StartScreen onStart={vi.fn()} endingReached onStartOver={vi.fn()} />
    )
    await userEvent.click(screen.getByRole('button', { name: 'START OVER' }))
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'CANCEL' })
    )
    await userEvent.keyboard('{Enter}')
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'START OVER' })
    )
    await userEvent.keyboard('{Enter}')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('alert')).toBeNull()
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'START OVER' })
    )
  })
  it('Escape cancels even after a click on the margin moved focus to body', async () => {
    render(
      <StartScreen onStart={vi.fn()} endingReached onStartOver={vi.fn()} />
    )
    await userEvent.click(screen.getByRole('button', { name: 'START OVER' }))
    await userEvent.click(document.body)
    expect(document.activeElement).toBe(document.body)
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('alert')).toBeNull()
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'START OVER' })
    )
  })
  it('stops listening for Escape once unmounted', async () => {
    const spy = vi.spyOn(document, 'removeEventListener')
    const { unmount } = render(
      <StartScreen onStart={vi.fn()} endingReached onStartOver={vi.fn()} />
    )
    await userEvent.click(screen.getByRole('button', { name: 'START OVER' }))
    unmount()
    expect(spy.mock.calls.some(c => c[0] === 'keydown')).toBe(true)
    spy.mockRestore()
  })
  it('moves focus to START SHIFT after the erase has taken effect', async () => {
    const Host = () => {
      const [ended, setEnded] = useState(true)
      return (
        <StartScreen
          onStart={vi.fn()}
          endingReached={ended}
          onStartOver={() => setEnded(false)}
        />
      )
    }
    render(<Host />)
    await userEvent.click(screen.getByRole('button', { name: 'START OVER' }))
    await userEvent.click(screen.getByRole('button', { name: 'ERASE ALL' }))
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'START SHIFT' })
    )
  })
})

describe('StartScreen confirmation keys (#322)', () => {
  it('puts ERASE ALL above CANCEL, like the report dialog, as the same key part (red vs cream), and Tab goes ERASE ALL -> CANCEL', async () => {
    render(
      <StartScreen onStart={vi.fn()} endingReached onStartOver={vi.fn()} />
    )
    await userEvent.click(screen.getByRole('button', { name: 'START OVER' }))
    const keys = [
      ...document.querySelectorAll<HTMLElement>('.start-confirm-keys button'),
    ]
    expect(keys.map(k => k.textContent)).toEqual(['ERASE ALL', 'CANCEL'])
    for (const k of keys) {
      expect(k).toHaveClass('key', 'start-key')
      expect(k.className).not.toContain('small')
    }
    expect(keys[0]).toHaveClass('key-report')
    expect(keys[1]).not.toHaveClass('key-report')
    // the safe side holds the focus; shift+Tab reaches ERASE ALL, which comes first in the Tab order
    expect(document.activeElement).toBe(keys[1])
    await userEvent.tab({ shift: true })
    expect(document.activeElement).toBe(keys[0])
    await userEvent.tab()
    expect(document.activeElement).toBe(keys[1])
  })
})

describe('StartScreen language (#292)', () => {
  it('has no language keys: the language comes from the browser', () => {
    render(<StartScreen onStart={vi.fn()} language="en" />)
    expect(screen.queryByRole('button', { name: 'JA' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'EN' })).toBeNull()
    expect(screen.queryByRole('group', { name: 'Language' })).toBeNull()
  })
  it('has none after the true ending either', () => {
    render(<StartScreen onStart={vi.fn()} endingReached language="ja" />)
    expect(screen.queryByRole('button', { name: 'JA' })).toBeNull()
    expect(
      screen.getByRole('button', { name: 'START OVER' })
    ).toBeInTheDocument()
  })
  it('keeps the machine key English in both languages', () => {
    const { rerender } = render(<StartScreen onStart={vi.fn()} language="ja" />)
    expect(
      screen.getByRole('button', { name: 'START SHIFT' })
    ).toBeInTheDocument()
    rerender(<StartScreen onStart={vi.fn()} language="en" />)
    expect(
      screen.getByRole('button', { name: 'START SHIFT' })
    ).toBeInTheDocument()
  })
})
