import { useMemo } from 'react'
import { canPersist, load } from '../utils/saveData'

/**
 * Always-on notice when progress cannot be stored (private browsing, blocked site data). Never
 * hidden (docs/save-data.md rule 6). `canPersist()` is read on every render; the parent re-renders
 * while the shift runs, so a write that fails mid-shift shows it too.
 */
export const SaveNotice = () => {
  // A first read decides whether storage works at all (a failed read flips canPersist()).
  useMemo(() => load(), [])
  if (canPersist()) return null
  return (
    <div className="save-notice" role="status">
      進行を保存できません
    </div>
  )
}
