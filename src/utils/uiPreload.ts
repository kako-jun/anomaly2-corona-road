import { CAMERAS } from './gameConfig'
import {
  createCameraPreloader,
  idleSchedule,
  type CameraImage,
} from './preload'
import { titleNotes } from '../data/titleNotes'
import { reportNoteUrls } from '../data/reportNotes'
import type { Language } from './saveData'

/** The title notes' pictures of one language only (#296): the other language is fetched when the player switches. */
export const titleNoteUrls = (language: Language): string[] =>
  titleNotes(language).map(n => n.src)

export function preloadTitleNotes(language: Language): Promise<void> {
  return Promise.all(
    titleNoteUrls(language).map(src => {
      const image = new Image()
      image.src = src
      return Promise.resolve(image.decode?.()).catch(() => {})
    })
  ).then(() => {})
}

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

/** All eight cameras' base photos, loaded and decoded on idle time after the title's own preload (#396). Runs once. */
export const preloadCameraImages = createCameraPreloader(
  CAMERAS.map(c => c.image),
  { createImage: () => new Image(), schedule: idleSchedule }
)

/** Held so a decoded picture is not dropped before the dialog first opens (#396). */
export const reportNoteImageCache = new Map<string, CameraImage>()

const reportNoteLoaders = new Map<Language, () => Promise<void>>()

/**
 * The report dialog's sticky notes (the browser's language only, five pictures), loaded and decoded on idle
 * time with low priority, so the first opening of SELECT CATEGORY does not stall on them (#396). Each language
 * runs once; a failed picture is ignored (the dialog loads it as usual).
 */
export function preloadReportNotes(language: Language): Promise<void> {
  let load = reportNoteLoaders.get(language)
  if (!load) {
    load = createCameraPreloader(reportNoteUrls(language), {
      createImage: () => new Image(),
      schedule: idleSchedule,
      cache: reportNoteImageCache,
    })
    reportNoteLoaders.set(language, load)
  }
  return load()
}
