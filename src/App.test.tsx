// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { SAVE_KEY } from './utils/saveData'

// A fresh save store per test (the real one keeps the last save in memory); the App itself is imported once.
vi.mock('./utils/saveData', async importOriginal => {
  const actual = await importOriginal<typeof import('./utils/saveData')>()
  const make = () => actual.createSaveStore({ getStorage: () => localStorage })
  const holder = { store: make() }
  return {
    ...actual,
    load: () => holder.store.load(),
    update: (fn: Parameters<typeof actual.update>[0]) =>
      holder.store.update(fn),
    canPersist: () => holder.store.canPersist(),
    probe: () => holder.store.probe(),
    resetStore: () => {
      holder.store = make()
    },
  }
})

// The game itself is not under test here: a stand-in whose phase the test sets (idle = title, win = result).
const game = vi.hoisted(() => ({ initial: 'idle' as 'idle' | 'win' }))
vi.mock('./hooks/useGameState', async () => {
  const { useState } = await import('react')
  const stats = {
    currentTime: 0,
    correctReports: 0,
    misreports: 0,
    totalAnomalies: 0,
    detectedAnomalies: 0,
  }
  return {
    useGameState: () => {
      const [gameState, set] = useState<string>(game.initial)
      return {
        gameState,
        stats,
        cameras: [],
        currentCameraIndex: 0,
        currentCamera: {},
        activeAnomalyHere: undefined,
        feedback: null,
        ending:
          gameState === 'win' ? { closing: 'ending', outcome: 'win' } : null,
        flagEvent: null,
        finishEnding: () => {},
        returnToTitle: () => set('idle'),
        startGame: () => set('playing'),
        switchCamera: () => {},
        reportAnomaly: () => {},
        gameTime: '22:00',
      }
    },
  }
})

const saveData = await import('./utils/saveData')
const resetStore = (saveData as unknown as { resetStore: () => void })
  .resetStore

const seed = (over: Record<string, unknown> = {}) =>
  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      v: 1,
      foundTotal: 0,
      foundIds: [],
      loops: 0,
      flags: {},
      usedLines: {},
      usedChatter: [],
      pendingStories: [],
      ...over,
    })
  )

describe('App: title -> investigation note (#297) and the language from the browser (#292)', () => {
  beforeEach(() => {
    localStorage.clear()
    resetStore()
    game.initial = 'idle'
    // The screen fade (#336) is tested in ScreenTransition.test.tsx; here the screens change at once.
    window.history.pushState({}, '', '/?transition=none')
    vi.stubGlobal('navigator', { language: 'en-US', languages: ['en-US'] })
  })
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('START SHIFT opens the note for the first night; its handwritten action is what starts the shift', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(screen.getByText('CASE MEMO')).toBeInTheDocument()
    expect(screen.getByText('BACKGROUND')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Start the shift' })
    ).toBeInTheDocument()
  })

  it('follows the browser language: English here, and the note is English', async () => {
    render(<App />)
    expect(
      screen.getByRole('region', { name: 'How to play' })
    ).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(screen.getByText('CASE MEMO')).toBeInTheDocument()
  })

  it('a Japanese browser gets the Japanese title and note (navigator.languages first)', async () => {
    vi.stubGlobal('navigator', {
      ...navigator,
      languages: ['ja-JP', 'en-US'],
      language: 'en-US',
    })
    render(<App />)
    expect(screen.getByRole('region', { name: '遊び方' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('ja')
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(screen.getByText('捜査メモ')).toBeInTheDocument()
  })

  it('there is no language key, and nothing is saved about the language', async () => {
    render(<App />)
    expect(screen.queryByRole('button', { name: 'JA' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'EN' })).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(
      localStorage.getItem(SAVE_KEY)?.includes('"language"') ?? false
    ).toBe(false)
  })

  it('a language left in an old save is ignored (the browser decides every time)', () => {
    seed({ settings: { language: 'ja' } })
    render(<App />)
    expect(
      screen.getByRole('region', { name: 'How to play' })
    ).toBeInTheDocument()
  })

  it('after the true ending the title offers only START OVER (no note), and no language key', () => {
    seed({ loops: 9, endingReached: true, flags: { elder1: true } })
    render(<App />)
    expect(screen.queryByRole('button', { name: 'START SHIFT' })).toBeNull()
    expect(
      screen.getByRole('button', { name: 'START OVER' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'EN' })).toBeNull()
  })

  it('true ending: BACK TO TITLE -> START OVER -> ERASE ALL wipes the progress and offers START SHIFT again', async () => {
    seed({
      loops: 9,
      foundTotal: 40,
      endingReached: true,
      flags: { elder1: true },
      lastShift: {
        found: 6,
        fresh: 0,
        misreports: 0,
        durationMs: 480000,
        closing: 'ending',
        raised: [],
      },
    })
    game.initial = 'win'
    render(<App />)
    // The result is the note, and its action goes back to the title (no restart after the ending).
    expect(screen.getByText('CASE MEMO')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Once more' })).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: 'Back to title' }))
    expect(screen.queryByText('CASE MEMO')).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: 'START OVER' }))
    await userEvent.click(screen.getByRole('button', { name: 'ERASE ALL' }))
    expect(
      screen.getByRole('button', { name: 'START SHIFT' })
    ).toBeInTheDocument()
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY)!)
    expect(saved).toMatchObject({
      loops: 0,
      foundTotal: 0,
      endingReached: false,
      flags: {},
    })
    // ...and a new start shows the first-night note again, not the old story.
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(screen.getByText('BACKGROUND')).toBeInTheDocument()
  })

  it('the note does not reopen by itself after START OVER when the ending was reached in another tab', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(screen.getByText('CASE MEMO')).toBeInTheDocument()
    // Another tab reaches the ending: the save changes and a storage event arrives.
    seed({ loops: 3, endingReached: true })
    await act(async () => {
      window.dispatchEvent(new StorageEvent('storage', { key: SAVE_KEY }))
    })
    expect(screen.queryByText('CASE MEMO')).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: 'START OVER' }))
    await userEvent.click(screen.getByRole('button', { name: 'ERASE ALL' }))
    expect(screen.queryByText('CASE MEMO')).toBeNull()
    expect(
      screen.getByRole('button', { name: 'START SHIFT' })
    ).toBeInTheDocument()
  })

  it('with the fade on, the title stays (inert) until the veil is black; the note is not mounted early', async () => {
    window.history.pushState({}, '', '/?transition=fade')
    const { container } = render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(screen.queryByText('CASE MEMO')).toBeNull()
    expect(container.querySelector('[inert]')).not.toBeNull()
    fireEvent.transitionEnd(container.querySelector('.screen-fade-veil')!)
    expect(screen.getByText('CASE MEMO')).toBeInTheDocument()
    expect(container.querySelector('[inert]')).toBeNull()
  })

  it('a production build ignores ?transition= (fade stays on)', async () => {
    vi.stubEnv('DEV', false)
    window.history.pushState({}, '', '/?transition=none')
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(screen.queryByText('CASE MEMO')).toBeNull()
  })
})
