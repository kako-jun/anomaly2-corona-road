/**
 * How far each handwritten / stuck-on element of the investigation note is tilted, in degrees (#297).
 * The one place for it: fixed numbers (never random, so a reload looks the same), uneven on purpose, and no
 * two neighbours share an angle (a person never tilts two things alike). `InvestigationNote.tsx` hands these
 * to the CSS as custom properties; `noteTilt.test.ts` and `npm run check:note-wrap` hold the rules.
 */
export const TILT = {
  tape: -6.4, // tape: 3..8 degrees
  night: 1.4, // the night number written top right
  stamp: -3.4, // the small red stamp (SO FAR / TONIGHT)
  stampBig: 2.7, // the big red stamp (DAWN / WITHDRAWN)
  tag: -4.6, // the red "found" tag
  scrib: [-3.85, -2.95, -2.25], // the blue scribbles, one angle per line (each line is turned as a whole, glyphs and all). The first was -4.0: the longest line then ended 0.1px past the rule tolerance (check:note-wrap RULEFIT)
  action: -1.35, // the handwritten action at the bottom right ("Start the shift →")
  label: [-1.8, 0.7, -0.9, 1.9], // the "1st".."4th" frame labels, left to right
} as const

/** Pairs that sit next to each other on the paper: their angles must differ by at least MIN_NEIGHBOUR_GAP. */
export const NEIGHBOURS: readonly (readonly [string, string])[] = [
  ['tape', 'night'],
  ['stamp', 'stampBig'],
  ['stampBig', 'night'],
  ['stampBig', 'label0'],
  ['stamp', 'label0'],
  ['label0', 'label1'],
  ['label1', 'label2'],
  ['label2', 'label3'],
  ['tag', 'label2'],
  ['tag', 'label3'],
  ['tag', 'stampBig'],
]
export const MIN_NEIGHBOUR_GAP = 1 // degrees
export const MIN_ANY_GAP = 0.4 // degrees: no two elements tilt alike anywhere on the paper

/** Every angle by name (label0..label3 for the labels). */
export const TILT_BY_NAME: Readonly<Record<string, number>> = {
  tape: TILT.tape,
  night: TILT.night,
  stamp: TILT.stamp,
  stampBig: TILT.stampBig,
  tag: TILT.tag,
  scrib0: TILT.scrib[0],
  scrib1: TILT.scrib[1],
  scrib2: TILT.scrib[2],
  action: TILT.action,
  label0: TILT.label[0],
  label1: TILT.label[1],
  label2: TILT.label[2],
  label3: TILT.label[3],
}

/** The CSS custom properties that carry the angles to investigationNote.css. */
export const tiltVars = (): Record<string, string> => ({
  '--tilt-tape': `${TILT.tape}deg`,
  '--tilt-night': `${TILT.night}deg`,
  '--tilt-stamp': `${TILT.stamp}deg`,
  '--tilt-stamp-big': `${TILT.stampBig}deg`,
  '--tilt-tag': `${TILT.tag}deg`,
  '--tilt-scrib-0': `${TILT.scrib[0]}deg`,
  '--tilt-scrib-1': `${TILT.scrib[1]}deg`,
  '--tilt-scrib-2': `${TILT.scrib[2]}deg`,
  '--tilt-action': `${TILT.action}deg`,
  '--tilt-label-0': `${TILT.label[0]}deg`,
  '--tilt-label-1': `${TILT.label[1]}deg`,
  '--tilt-label-2': `${TILT.label[2]}deg`,
  '--tilt-label-3': `${TILT.label[3]}deg`,
})
