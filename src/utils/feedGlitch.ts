/**
 * Camera feed glitches (#78): the picture of the watched camera goes wrong (black, noise, shift, colour fringe ...).
 * Each kind is one rendering of a `feed_glitch` ledger entry (prompts/anomalies.yaml, RT-FEED-NN); the ledger is the
 * source of the list of anomalies and this file only says how each one is drawn. The rendering itself is CSS keyed by
 * `data-glitch` on the glass (src/styles/feedGlitch.css), the SVG filters in `FeedGlitchFilters`, and
 * `GlitchCanvas`. A glitch is switched on by an appearing `feed_glitch` anomaly (#77: the camera is drawn at random, the
 * kind is one of `feedGlitchKindsOf(id)`, see nonImageEffects.ts) and off when it is reported, or by the dev-only forced
 * path below.
 */

export const FEED_GLITCH_KINDS = [
  'zoom',
  'tilt',
  'blur',
  'bright',
  'dark',
  'blocks',
  'scanburn',
  'lost',
  'shake',
  'hardshake',
  'wave',
  'chroma',
  'static',
  'blink',
  'deadpixels',
  'ghost',
  'fade',
  'letterbox',
  'green',
  'flip',
  'heavyvignette',
  'mono',
  'nonoise',
  'norec',
] as const

export type FeedGlitchKind = (typeof FEED_GLITCH_KINDS)[number]

/** The ledger entry each kind draws (one entry may have several kinds: exposure is bright or dark, shake is small or hard). */
export const FEED_GLITCH_LEDGER_ID: Record<FeedGlitchKind, string> = {
  zoom: 'RT-FEED-01',
  tilt: 'RT-FEED-02',
  blur: 'RT-FEED-03',
  bright: 'RT-FEED-04',
  dark: 'RT-FEED-04',
  blocks: 'RT-FEED-05',
  scanburn: 'RT-FEED-06',
  lost: 'RT-FEED-11',
  shake: 'RT-FEED-19',
  hardshake: 'RT-FEED-19',
  wave: 'RT-FEED-20',
  chroma: 'RT-FEED-21',
  static: 'RT-FEED-22',
  blink: 'RT-FEED-23',
  deadpixels: 'RT-FEED-24',
  ghost: 'RT-FEED-25',
  fade: 'RT-FEED-26',
  letterbox: 'RT-FEED-12',
  green: 'RT-FEED-16',
  flip: 'RT-FEED-17',
  heavyvignette: 'RT-FEED-18',
  mono: 'RT-FEED-27',
  nonoise: 'RT-FEED-28',
  norec: 'RT-FEED-29',
}

/** The kinds that draw one ledger entry (exposure has two, shake has two); empty for an entry no kind draws. */
export const feedGlitchKindsOf = (ledgerId: string): FeedGlitchKind[] =>
  FEED_GLITCH_KINDS.filter(k => FEED_GLITCH_LEDGER_ID[k] === ledgerId)

export const isFeedGlitchKind = (v: unknown): v is FeedGlitchKind =>
  typeof v === 'string' && (FEED_GLITCH_KINDS as readonly string[]).includes(v)

/**
 * Dev-only forced glitch: `?glitch=<kind>` in the URL. `dev` is `import.meta.env.DEV`, so a production build never
 * reads the URL and the game is unchanged. An unknown kind is ignored.
 */
export const forcedFeedGlitch = (
  search: string,
  dev: boolean
): FeedGlitchKind | undefined => {
  if (!dev) return undefined
  const v = new URLSearchParams(search).get('glitch')
  return isFeedGlitchKind(v) ? v : undefined
}

/** Tiny seeded generator (mulberry32) so fixed things (dead pixels) sit in the same places every time. */
export const seededRandom = (seed: number) => {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
