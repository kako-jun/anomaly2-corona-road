// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as saveData from '../utils/saveData'
import { SaveNotice } from './SaveNotice'

// The real save store keeps its state in memory, so a fresh one per test is needed.
vi.mock('../utils/saveData', async importOriginal => {
  const actual = await importOriginal<typeof import('../utils/saveData')>()
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

const PROBE_KEY = saveData.PROBE_KEY
const NOTICE = 'Progress cannot be saved'

beforeEach(() => {
  localStorage.clear()
  ;(saveData as unknown as { resetStore: () => void }).resetStore()
})
afterEach(() => {
  vi.restoreAllMocks()
})

describe('SaveNotice', () => {
  it('renders nothing when progress can be saved', () => {
    const { container } = render(<SaveNotice />)
    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('shows the notice as a status when storage cannot be read', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<SaveNotice />)
    expect(screen.getByRole('status')).toHaveTextContent(NOTICE)
  })

  it('shows the notice on a re-render after a write failed', () => {
    const { rerender } = render(<SaveNotice />)
    expect(screen.queryByRole('status')).toBeNull()
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota')
    })
    saveData.update(cur => ({ ...cur, loops: cur.loops + 1 }))
    rerender(<SaveNotice />)
    expect(screen.getByRole('status')).toHaveTextContent(NOTICE)
  })

  it('shows the notice when storage is not available at all', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError')
    })
    render(<SaveNotice />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('logs no console error when storage throws', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<SaveNotice />)
    expect(err).not.toHaveBeenCalled()
  })

  it('shows the notice from the first render when only setItem throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota')
    })
    render(<SaveNotice />)
    expect(screen.getByRole('status')).toHaveTextContent(NOTICE)
  })

  it('shows no notice and leaves no probe key when storage works', () => {
    render(<SaveNotice />)
    expect(screen.queryByRole('status')).toBeNull()
    expect(localStorage.getItem(PROBE_KEY)).toBeNull()
  })

  it('shows the notice when storage getters throw', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError')
    })
    render(<SaveNotice />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
