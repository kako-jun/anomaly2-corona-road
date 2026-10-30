// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { ComponentProps } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeAnomaly, makeCameras } from '../test/factories'
import { CameraView } from './CameraView'

vi.mock('./NoiseCanvas', () => ({ NoiseCanvas: () => null }))

const cams = makeCameras(8)

/** Fake image decode state, keyed by src: the base photos' natural sizes once "loaded". */
let sizes: Record<string, { w: number; h: number }>
let loaded: Set<string>
const protoDescriptors: Record<string, PropertyDescriptor | undefined> = {}

const srcOf = (img: HTMLImageElement) => img.getAttribute('src') ?? ''

beforeEach(() => {
  sizes = {
    '/images/cam1.webp': { w: 100, h: 200 },
    '/images/cam2.webp': { w: 400, h: 300 },
  }
  loaded = new Set()
  for (const key of ['complete', 'naturalWidth', 'naturalHeight']) {
    protoDescriptors[key] = Object.getOwnPropertyDescriptor(
      HTMLImageElement.prototype,
      key
    )
  }
  Object.defineProperty(HTMLImageElement.prototype, 'complete', {
    configurable: true,
    get(this: HTMLImageElement) {
      return loaded.has(srcOf(this))
    },
  })
  Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
    configurable: true,
    get(this: HTMLImageElement) {
      return loaded.has(srcOf(this)) ? (sizes[srcOf(this)]?.w ?? 0) : 0
    },
  })
  Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
    configurable: true,
    get(this: HTMLImageElement) {
      return loaded.has(srcOf(this)) ? (sizes[srcOf(this)]?.h ?? 0) : 0
    },
  })
})
afterEach(() => {
  for (const [key, d] of Object.entries(protoDescriptors)) {
    if (d) Object.defineProperty(HTMLImageElement.prototype, key, d)
    else
      delete (HTMLImageElement.prototype as unknown as Record<string, unknown>)[
        key
      ]
  }
})

type Props = ComponentProps<typeof CameraView>
const props = (over: Partial<Props> = {}): Props => ({
  camera: cams[0],
  anomalyHere: undefined,
  result: null,
  resultVisible: false,
  subtitle: { text: '', visible: false },
  brightness: 1,
  contrast: 1,
  onSwipe: vi.fn(),
  ...over,
})

const anomaly1 = makeAnomaly({
  id: 'x1',
  cameraId: 1,
  overlay: {
    url: '/overlay-x1.webp',
    origin: { x: 10, y: 20 },
    size: { w: 30, h: 40 },
  },
})

const overlayOf = (c: HTMLElement) =>
  c.querySelector('img.overlay') as HTMLImageElement | null
const baseOf = (cam: (typeof cams)[number]) =>
  screen.getByAltText(`${cam.name} — ${cam.location}`) as HTMLImageElement
const finishLoad = (img: HTMLImageElement) => {
  loaded.add(srcOf(img))
  fireEvent.load(img)
}
const frameOf = (c: HTMLElement) =>
  c.querySelector('.pic__frame') as HTMLElement

describe('CameraView anomaly overlay', () => {
  it('shows no overlay before the base photo has loaded', () => {
    const { container } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    expect(overlayOf(container)).toBeNull()
  })

  it('does not set the frame ratio before the base photo has loaded', () => {
    const { container } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    expect(frameOf(container).style.getPropertyValue('--ratio')).toBe('')
  })

  it('places the overlay at the ledger percentages once the base photo loads', () => {
    const { container } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    finishLoad(baseOf(cams[0]))
    const o = overlayOf(container)!
    expect(o).not.toBeNull()
    expect(o.style.left).toBe('10%') // 10 / 100
    expect(o.style.top).toBe('10%') // 20 / 200
    expect(o.style.width).toBe('30%') // 30 / 100
    expect(o.style.height).toBe('20%') // 40 / 200
    expect(o.getAttribute('src')).toBe('/overlay-x1.webp')
  })

  it('gives the frame the base photo ratio after loading', () => {
    const { container } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    finishLoad(baseOf(cams[0]))
    expect(frameOf(container).style.getPropertyValue('--ratio')).toBe(
      '100 / 200'
    )
  })

  it('shows the overlay immediately when the image is already complete (cached)', () => {
    loaded.add('/images/cam1.webp')
    const { container } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    expect(overlayOf(container)).not.toBeNull()
  })

  it('does not treat a complete image with naturalWidth 0 (broken) as loaded', () => {
    sizes['/images/cam1.webp'] = { w: 0, h: 0 }
    loaded.add('/images/cam1.webp')
    const { container } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    fireEvent.load(baseOf(cams[0]))
    expect(overlayOf(container)).toBeNull()
  })

  it('is a decorative, non-draggable image in the DOM order base < glow < overlay', () => {
    loaded.add('/images/cam1.webp')
    const { container } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    const o = overlayOf(container)!
    expect(o).toHaveAttribute('alt', '')
    expect(o).toHaveAttribute('aria-hidden', 'true')
    expect(o).toHaveAttribute('draggable', 'false')
    expect(o).toHaveClass('overlay')
    // base < glow < overlay: the glow must not ghost the object the overlay replaces
    const glow = o.previousElementSibling as HTMLElement
    expect(glow).toHaveClass('glow')
    expect(glow.previousElementSibling).toBe(baseOf(cams[0]))
    expect(o.nextElementSibling).toBeNull()
  })

  it('removes the overlay when the anomaly is resolved', () => {
    loaded.add('/images/cam1.webp')
    const { container, rerender } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    expect(overlayOf(container)).not.toBeNull()
    rerender(<CameraView {...props({ anomalyHere: undefined })} />)
    expect(overlayOf(container)).toBeNull()
  })

  it('shows no overlay when there is no anomaly', () => {
    loaded.add('/images/cam1.webp')
    const { container } = render(<CameraView {...props()} />)
    expect(overlayOf(container)).toBeNull()
  })

  it('does not carry the previous camera size over to the next camera', () => {
    const anomaly2 = makeAnomaly({
      id: 'x2',
      cameraId: 2,
      overlay: {
        url: '/overlay-x2.webp',
        origin: { x: 40, y: 30 },
        size: { w: 80, h: 60 },
      },
    })
    loaded.add('/images/cam1.webp')
    const { container, rerender } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    expect(overlayOf(container)).not.toBeNull()

    // Switch to camera 2 whose photo has not loaded yet: cam 1's size must not be reused.
    rerender(
      <CameraView {...props({ camera: cams[1], anomalyHere: anomaly2 })} />
    )
    expect(overlayOf(container)).toBeNull()
    expect(frameOf(container).style.getPropertyValue('--ratio')).toBe('')

    finishLoad(baseOf(cams[1]))
    const o = overlayOf(container)!
    expect(o.style.left).toBe('10%') // 40 / 400
    expect(o.style.top).toBe('10%') // 30 / 300
    expect(o.style.width).toBe('20%') // 80 / 400
    expect(o.style.height).toBe('20%') // 60 / 300
    expect(frameOf(container).style.getPropertyValue('--ratio')).toBe(
      '400 / 300'
    )
  })

  it('shows the overlay immediately when switching to a cached camera, and back again', () => {
    const anomaly2 = makeAnomaly({ id: 'x2', cameraId: 2 })
    loaded.add('/images/cam1.webp')
    loaded.add('/images/cam2.webp')
    const { container, rerender } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    rerender(
      <CameraView {...props({ camera: cams[1], anomalyHere: anomaly2 })} />
    )
    expect(overlayOf(container)?.getAttribute('src')).toBe(anomaly2.overlay.url)
    rerender(
      <CameraView {...props({ camera: cams[0], anomalyHere: anomaly1 })} />
    )
    expect(overlayOf(container)?.getAttribute('src')).toBe('/overlay-x1.webp')
    expect(overlayOf(container)?.style.width).toBe('30%')
  })
})

describe('CameraView gives no answer away', () => {
  it('has no anomaly OSD, alert lamp or highlight class while an anomaly is active', () => {
    loaded.add('/images/cam1.webp')
    const { container } = render(
      <CameraView {...props({ anomalyHere: anomaly1 })} />
    )
    expect(container.querySelector('.osd-anomaly')).toBeNull()
    expect(container.querySelector('.pic--anomaly')).toBeNull()
    expect(container.querySelector('.lamp.alert')).toBeNull()
    expect(screen.queryByText(/ANOMALY/)).toBeNull()
    expect(screen.queryByText(anomaly1.category.toUpperCase())).toBeNull()
  })

  it('renders the same text with and without an anomaly', () => {
    loaded.add('/images/cam1.webp')
    const a = render(<CameraView {...props()} />)
    const without = a.container.textContent
    a.unmount()
    const b = render(<CameraView {...props({ anomalyHere: anomaly1 })} />)
    expect(b.container.textContent).toBe(without)
  })
})
