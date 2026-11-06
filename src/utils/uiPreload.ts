/** Decode the images already requested by the preload links before showing the cabinet. */
export function preloadCabinet(): Promise<void> {
  const images = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[data-cabinet-image]')
  ).map(link => {
    const image = new Image()
    image.src = link.href
    return image.decode().catch(() => {})
  })
  const font = document.fonts?.load('500 16px Caveat').catch(() => {})
  return Promise.all([...images, font]).then(() => {})
}
