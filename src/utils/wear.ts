/** Grime strength from `?wear=0..1` (A/B check). Returns null when absent or invalid; default is the CSS value (1). */
export const parseWear = (search: string): number | null => {
  const raw = new URLSearchParams(search).get('wear')
  if (raw === null || raw.trim() === '') return null
  const w = parseFloat(raw)
  if (Number.isNaN(w)) return null
  return Math.max(0, Math.min(1, w))
}
