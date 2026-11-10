/**
 * Decode the images already requested by the preload links (the cabinet parts and the investigation-note
 * sketches) and load the fonts before the screens that use them appear.
 */
export function preloadCabinet(): Promise<void> {
  const images = Array.from(
    document.querySelectorAll<HTMLLinkElement>(
      'link[data-cabinet-image], link[data-note-image]'
    )
  ).map(link => {
    const image = new Image()
    image.src = link.href
    return image.decode().catch(() => {})
  })
  const fonts = ['500 16px Caveat', '16px NoteZen', '16px NoteYomogi'].map(
    spec => document.fonts?.load(spec, '捜査メモ0').catch(() => {})
  )
  return Promise.all([...images, ...fonts]).then(() => {})
}
