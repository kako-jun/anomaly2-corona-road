// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SAVE_KEY } from './utils/saveData'

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

const app = async () => {
  vi.resetModules()
  const { default: App } = await import('./App')
  return render(<App />)
}

describe('App: title -> investigation note (#297) and the language switch (#292)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('navigator', { ...navigator, language: 'en-US' })
  })

  it('START SHIFT opens the note for the first night; its key is what starts the shift', async () => {
    await app()
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(screen.getByText('CASE MEMO')).toBeInTheDocument()
    expect(screen.getByText('BACKGROUND')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'START SHIFT' })
    ).toBeInTheDocument()
  })

  it('follows the browser language at first, and the choice made on the title is kept and applied at once', async () => {
    await app()
    expect(screen.getByText('GOAL')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'JA' }))
    expect(screen.getByText('目的')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('ja')
    expect(JSON.parse(localStorage.getItem(SAVE_KEY)!).settings.language).toBe(
      'ja'
    )
    await userEvent.click(screen.getByRole('button', { name: 'START SHIFT' }))
    expect(screen.getByText('捜査メモ')).toBeInTheDocument()
  })

  it('a saved language is used after a reload', async () => {
    seed({ settings: { language: 'ja' } })
    await app()
    expect(screen.getByText('目的')).toBeInTheDocument()
  })

  it('after the true ending the title offers only START OVER (no note), and still has the language switch', async () => {
    seed({ loops: 9, endingReached: true, flags: { elder1: true } })
    await app()
    expect(screen.queryByRole('button', { name: 'START SHIFT' })).toBeNull()
    expect(
      screen.getByRole('button', { name: 'START OVER' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument()
  })
})
