import '../styles/transfer.css'
import { useEffect, useRef, useState } from 'react'
import { load, type SaveData } from '../utils/saveData'
import {
  TRANSFER_ERROR_TEXT,
  applyImport,
  summarize,
  encodeSave,
  parseCode,
} from '../utils/transferCode'

interface TransferPanelProps {
  /** Close the panel (CLOSE, Escape). */
  onClose: () => void
  /** The save was replaced by an imported code. */
  onImported: () => void
}

/**
 * Save transfer (#84): EXPORT shows this device's code (with COPY), IMPORT reads a pasted one and replaces
 * this device's progress after a confirmation. The instructions are always on screen.
 */
export const TransferPanel = ({ onClose, onImported }: TransferPanelProps) => {
  const [code, setCode] = useState('')
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<'done' | 'failed' | null>(null)
  const [pending, setPending] = useState<SaveData | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const areaRef = useRef<HTMLTextAreaElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])
  useEffect(() => {
    if (pending) confirmRef.current?.focus()
  }, [pending])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (pending) setPending(null)
      else onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, pending])

  const doExport = () => {
    setCode(encodeSave(load()))
    setCopied(null)
    setError(null)
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied('done')
    } catch {
      areaRef.current?.select()
      setCopied('failed')
    }
  }
  const check = () => {
    const r = parseCode(text)
    if (r.ok) {
      setError(null)
      setPending(r.save)
    } else setError(TRANSFER_ERROR_TEXT[r.error])
  }

  return (
    <div
      className="transfer-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Save transfer"
    >
      <div className="transfer-box">
        <h2 className="transfer-title">TRANSFER SAVE</h2>
        <p className="transfer-help">
          Move your progress to another device, or restore it after the browser
          lost it. EXPORT makes a code from this device. On the other device,
          paste the code and press IMPORT. The code replaces that device's
          progress.
        </p>
        {pending ? (
          <div className="transfer-confirm">
            <p className="transfer-warn" role="alert">
              This code holds: {summarize(pending)}. Importing replaces this
              device's progress ({summarize(load())}). This cannot be undone.
            </p>
            <div className="transfer-keys">
              <button
                ref={confirmRef}
                type="button"
                className="transfer-key transfer-key--danger"
                onClick={() => {
                  applyImport(pending)
                  setPending(null)
                  setText('')
                  onImported()
                  onClose()
                }}
              >
                REPLACE
              </button>
              <button
                type="button"
                className="transfer-key"
                onClick={() => setPending(null)}
              >
                CANCEL
              </button>
            </div>
          </div>
        ) : (
          <>
            <section className="transfer-section">
              <h3>EXPORT</h3>
              <div className="transfer-keys">
                <button
                  type="button"
                  className="transfer-key"
                  onClick={doExport}
                >
                  EXPORT
                </button>
                <button
                  type="button"
                  className="transfer-key"
                  onClick={copy}
                  disabled={!code}
                >
                  COPY
                </button>
              </div>
              <textarea
                ref={areaRef}
                className="transfer-area"
                readOnly
                rows={3}
                value={code}
                placeholder="Your code appears here after EXPORT."
                aria-label="Your transfer code"
                onFocus={e => e.currentTarget.select()}
              />
              <p className="transfer-status" role="status">
                {copied === 'done' && 'Copied.'}
                {copied === 'failed' &&
                  'Could not copy automatically. The code is selected: copy it by hand.'}
              </p>
            </section>
            <section className="transfer-section">
              <h3>IMPORT</h3>
              <textarea
                className="transfer-area"
                rows={3}
                value={text}
                placeholder="Paste a transfer code here."
                aria-label="Paste a transfer code"
                aria-invalid={error ? true : undefined}
                onChange={e => {
                  setText(e.target.value)
                  setError(null)
                }}
              />
              <div className="transfer-keys">
                <button type="button" className="transfer-key" onClick={check}>
                  IMPORT
                </button>
              </div>
              <p className="transfer-error" role="alert">
                {error}
              </p>
            </section>
            <div className="transfer-keys">
              <button
                ref={closeRef}
                type="button"
                className="transfer-key"
                onClick={onClose}
              >
                CLOSE
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
