/** Join class names, skipping falsy entries. (Used instead of template literals: the Tailwind Prettier plugin collapses the leading space.) */
export const cx = (...names: (string | false | null | undefined)[]): string =>
  names.filter(Boolean).join(' ')
