/**
 * Japanese wording writes numbers in full-width digits (０-９; Issue #352, kako-jun). The static wording is
 * converted by `scripts/fullwidth-ja.mjs`; a number inserted at run time (the night, the Nth person, a clock time, a
 * count) goes through this, the one place for it. English keeps ASCII digits.
 */
export const toFullWidthDigits = (s: string | number): string =>
  String(s).replace(/[0-9]/g, d =>
    String.fromCharCode(d.charCodeAt(0) + 0xfee0)
  )
