// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { emptySave, load, update } from '../utils/saveData'
import { encodeSave } from '../utils/transferCode'
import { TransferPanel } from './TransferPanel'

const donor = () => ({
  ...emptySave(),
  foundIds: ['a', 'b', 'c'],
  foundTotal: 3,
  loops: 4,
})

beforeEach(() => {
  localStorage.clear()
  update(() => ({ ...emptySave(), foundIds: ['mine'], epoch: 2 }))
})

describe('TransferPanel', () => {
  it('always shows its instructions and exports this device code', async () => {
    render(<TransferPanel onClose={vi.fn()} onImported={vi.fn()} />)
    expect(screen.getByText(/EXPORT makes a code/)).toBeInTheDocument()
    await userEvent.click(screen.getAllByRole('button', { name: 'EXPORT' })[0])
    const box = screen.getByLabelText(
      'Your transfer code'
    ) as HTMLTextAreaElement
    expect(box.value).toBe(encodeSave(load()))
  })
  it('shows an error for a broken code and changes nothing', async () => {
    const onImported = vi.fn()
    render(<TransferPanel onClose={vi.fn()} onImported={onImported} />)
    await userEvent.type(
      screen.getByLabelText('Paste a transfer code'),
      'not a code!'
    )
    await userEvent.click(screen.getByRole('button', { name: 'IMPORT' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/not a transfer code/)
    expect(load().foundIds).toEqual(['mine'])
    expect(onImported).not.toHaveBeenCalled()
  })
  it('asks first; CANCEL keeps the save, REPLACE imports with epoch max+1', async () => {
    const onImported = vi.fn()
    const onClose = vi.fn()
    render(<TransferPanel onClose={onClose} onImported={onImported} />)
    const area = screen.getByLabelText('Paste a transfer code')
    await userEvent.click(area)
    await userEvent.paste(encodeSave(donor()))
    await userEvent.click(screen.getByRole('button', { name: 'IMPORT' }))
    expect(screen.getByRole('alert')).toHaveTextContent(
      /3 anomalies found, 4 shifts/
    )
    await userEvent.click(screen.getByRole('button', { name: 'CANCEL' }))
    expect(load().foundIds).toEqual(['mine'])
    await userEvent.click(screen.getByRole('button', { name: 'IMPORT' }))
    await userEvent.click(screen.getByRole('button', { name: 'REPLACE' }))
    expect(load().foundIds).toEqual(['a', 'b', 'c'])
    expect(load().epoch).toBe(3)
    expect(onImported).toHaveBeenCalledOnce()
    expect(onClose).toHaveBeenCalledOnce()
  })
  it('starts with the focus in the paste box and Tab never leaves the panel', async () => {
    render(
      <>
        <button>behind</button>
        <TransferPanel onClose={vi.fn()} onImported={vi.fn()} />
      </>
    )
    expect(screen.getByLabelText('Paste a transfer code')).toHaveFocus()
    const behind = screen.getByRole('button', { name: 'behind' })
    for (let i = 0; i < 12; i++) {
      await userEvent.tab()
      expect(behind).not.toHaveFocus()
    }
    for (let i = 0; i < 12; i++) {
      await userEvent.tab({ shift: true })
      expect(behind).not.toHaveFocus()
    }
  })
  it('refuses a huge paste with a reason', async () => {
    render(<TransferPanel onClose={vi.fn()} onImported={vi.fn()} />)
    fireEvent.change(screen.getByLabelText('Paste a transfer code'), {
      target: { value: 'A'.repeat(500_000) },
    })
    await userEvent.click(screen.getByRole('button', { name: 'IMPORT' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/too long/)
  })
  it('does not report success when the browser cannot store the import', async () => {
    const onImported = vi.fn()
    const onClose = vi.fn()
    render(<TransferPanel onClose={onClose} onImported={onImported} />)
    await userEvent.click(screen.getByLabelText('Paste a transfer code'))
    await userEvent.paste(encodeSave(donor()))
    await userEvent.click(screen.getByRole('button', { name: 'IMPORT' }))
    const spy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('quota')
      })
    await userEvent.click(screen.getByRole('button', { name: 'REPLACE' }))
    spy.mockRestore()
    expect(screen.getByRole('alert')).toHaveTextContent(/cannot store/)
    expect(onImported).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
    expect(load().foundIds).toEqual(['mine'])
  })
})
