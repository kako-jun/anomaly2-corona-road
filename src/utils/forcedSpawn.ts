/**
 * Dev-only forced spawn: `?force=RT-RULE-01` (or several ids, comma separated) in the URL makes the shift draw ONLY
 * those non-image anomalies (no image anomaly, no other effect), to look at an effect and report it on demand (#442).
 * `dev` is `import.meta.env.DEV`, so a production build never reads the URL. Unknown ids are ignored (the draw then
 * simply finds nothing, as with the ledger's own filters).
 */
export const forcedSpawnIds = (
  search: string,
  dev: boolean
): ReadonlySet<string> | null => {
  if (!dev) return null
  const raw = new URLSearchParams(search).get('force')
  if (raw === null) return null
  const ids = raw
    .split(',')
    .map(s => s.trim())
    .filter(s => /^[A-Z]{2}-[A-Z]{2,4}-\d{2}$/.test(s))
  return ids.length > 0 ? new Set(ids) : null
}
