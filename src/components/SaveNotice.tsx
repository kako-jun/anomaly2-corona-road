import { useMemo } from 'react'
import { canPersist, load, probe } from '../utils/saveData'

/**
 * Always-on notice when progress cannot be stored (private browsing, blocked site data). Never
 * hidden (docs/save-data.md rule 6). `canPersist()` is read on every render; the parent re-renders
 * while the shift runs, so a write that fails mid-shift shows it too.
 */
export const SaveNotice = () => {
  // A first read and a probe write decide whether storage works at all (a failure flips
  // canPersist()), so the start screen already knows before anything is saved.
  useMemo(() => {
    load()
    probe()
  }, [])
  if (canPersist()) return null
  return (
    <div className="save-notice" role="status">
      Progress cannot be saved
    </div>
  )
}
