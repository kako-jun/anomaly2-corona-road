// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_CONFIG } from '../utils/gameConfig'
import { StartScreen } from './StartScreen'

const setup = () => {
  const onStart = vi.fn()
  const view = render(<StartScreen onStart={onStart} />)
  const q = (sel: string) => [...view.container.querySelectorAll(sel)]
  return { onStart, q, ...view }
}

describe('StartScreen start button', () => {
  it('is a type="button" with the accessible name 勤務開始', () => {
    setup()
    const btn = screen.getByRole('button', { name: '勤務開始' })
    expect(btn).toHaveAttribute('type', 'button')
  })
  it('is the only button', () => {
    setup()
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })
  it('calls onStart once per click', async () => {
    const { onStart } = setup()
    await userEvent.click(screen.getByRole('button', { name: '勤務開始' }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })
  it('calls onStart for every click (no debounce here; the parent owns the state change)', async () => {
    const { onStart } = setup()
    const btn = screen.getByRole('button', { name: '勤務開始' })
    await userEvent.dblClick(btn)
    expect(onStart).toHaveBeenCalledTimes(2)
  })
  it('can be started from the keyboard (Enter and Space)', async () => {
    const { onStart } = setup()
    screen.getByRole('button', { name: '勤務開始' }).focus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')
    expect(onStart).toHaveBeenCalledTimes(2)
  })
  it('marks its lamp glyph as decorative', () => {
    setup()
    const icon = screen.getByRole('button').querySelector('i')!
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
    const img = q('.start-logo img')[0]
    expect(img.getAttribute('alt')).toBe('')
    expect(img).toHaveAttribute('src', '/images/logo.webp')
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})

describe('StartScreen misreport row', () => {
  it('shows as many lamps as maxMisreports', () => {
    const { q } = setup()
    expect(q('.start-lamps .start-lamp')).toHaveLength(
      DEFAULT_CONFIG.maxMisreports
    )
  })
  it('hides the lamps from assistive tech', () => {
    const { q } = setup()
    expect(q('.start-lamps')[0]).toHaveAttribute('aria-hidden', 'true')
  })
  it('states the limit as text derived from the config', () => {
    setup()
    expect(
      screen.getByText(`${DEFAULT_CONFIG.maxMisreports}回まで`)
    ).toBeInTheDocument()
  })
})

describe('StartScreen decoration and keyboard note', () => {
  it('hides the key caps, the knob picture and the lamps with aria-hidden', () => {
    const { q } = setup()
    for (const el of [
      ...q('.start-keys'),
      ...q('.start-knob'),
      ...q('.start-lamps'),
    ]) {
      expect(el).toHaveAttribute('aria-hidden', 'true')
    }
    expect(q('.start-keys')).toHaveLength(1)
    expect(q('.start-knob')).toHaveLength(1)
  })
  it('does not leave key-cap letters readable outside aria-hidden', () => {
    const { q } = setup()
    const visibleToAT = q('.start-key').filter(
      k => !k.closest('[aria-hidden="true"]')
    )
    expect(visibleToAT).toEqual([])
  })
  it('conveys the keyboard controls in an sr-only sentence', () => {
    const { q } = setup()
    const note = q('.start-sr-only').find(e => e.tagName !== 'H1')!
    expect(note).toBeDefined()
    expect(note.closest('[aria-hidden="true"]')).toBeNull()
    expect(note.textContent).toMatch(/矢印キー/)
    expect(note.textContent).toMatch(/A と D/)
    expect(note.textContent).toMatch(/1から8/)
  })
})

describe('StartScreen content', () => {
  it('has no emoji', () => {
    const { container } = setup()
    expect(container.textContent).not.toMatch(
      /\p{Extended_Pictographic}|\p{Emoji_Presentation}|️/u
    )
  })
  it.each([
    'MISSION',
    'CAMERA',
    'KNOB',
    'v1.1.0',
    'Anomaly Detection System',
    'UNDERGROUND SURVEILLANCE SYSTEM',
    '00:00',
  ])('no longer shows the removed text %j', text => {
    const { container } = setup()
    expect(container.textContent).not.toContain(text)
  })
  it('keeps REPORT only as the key graphic, not as an English row label', () => {
    const { container, q } = setup()
    const labels = q('.start-lab').map(e => e.textContent)
    expect(labels).toEqual(['目的', '切替', '調整', '報告', 'お手つき'])
    expect(q('.start-rep')).toHaveLength(1)
    expect(q('.start-rep')[0].textContent).toBe('REPORT')
    expect(container.textContent!.match(/REPORT/g)).toHaveLength(1)
  })
  it.each(['クリア', '勝利', '勝ち', '敗北', '6分', '制限時間', '分間', '秒'])(
    'does not mention time or win/lose conditions (%s)',
    word => {
      const { container } = setup()
      expect(container.textContent).not.toContain(word)
    }
  )
  it('states the camera count matching the game', () => {
    const { container } = setup()
    expect(container.textContent).toContain('8台')
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

describe('StartScreen follows a changed config', () => {
  afterEach(() => {
    vi.doUnmock('../utils/gameConfig')
    vi.resetModules()
  })
  it.each([1, 5])(
    'maxMisreports=%i changes the text and the lamp count',
    async n => {
      vi.resetModules()
      vi.doMock('../utils/gameConfig', async importOriginal => {
        const actual =
          await importOriginal<typeof import('../utils/gameConfig')>()
        return {
          ...actual,
          DEFAULT_CONFIG: { ...actual.DEFAULT_CONFIG, maxMisreports: n },
        }
      })
      const rtl = await import('@testing-library/react')
      const { StartScreen: Fresh } = await import('./StartScreen')
      const view = rtl.render(<Fresh onStart={() => {}} />)
      expect(view.container.querySelectorAll('.start-lamp')).toHaveLength(n)
      expect(view.getByText(`${n}回まで`)).toBeInTheDocument()
    }
  )
})

describe('StartScreen after the true ending (#294)', () => {
  it('offers only START OVER: no 勤務開始, and the closed notice is always shown', () => {
    render(
      <StartScreen onStart={vi.fn()} endingReached onStartOver={vi.fn()} />
    )
    expect(screen.queryByRole('button', { name: '勤務開始' })).toBeNull()
    expect(screen.getAllByRole('button')).toHaveLength(1)
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
    await userEvent.click(
      screen.getByRole('button', { name: 'ERASE ALL' })
    )
    expect(onStartOver).toHaveBeenCalledOnce()
    expect(onStart).not.toHaveBeenCalled()
  })
  it('keeps the ordinary 勤務開始 key when the ending was not reached', () => {
    render(<StartScreen onStart={vi.fn()} />)
    expect(screen.getByRole('button', { name: '勤務開始' })).toBeInTheDocument()
    expect(screen.queryByText(/START OVER/)).toBeNull()
  })
  it('moves keyboard focus: CANCEL on confirm, START OVER after cancel or Escape', async () => {
    render(<StartScreen onStart={vi.fn()} endingReached onStartOver={vi.fn()} />)
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
  it('moves focus to 勤務開始 after the erase has taken effect', async () => {
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
      screen.getByRole('button', { name: '勤務開始' })
    )
  })
})
