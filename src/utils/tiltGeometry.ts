/**
 * Geometry for pointer maths when the cabinet is transformed (RT-UI-11 rotates and shrinks it, RT-UI-16 mirrors it, #408).
 *
 * `getBoundingClientRect` of a rotated / scaled element is the axis-aligned box around what is drawn, so its width /
 * height / edges are not the element's own layout ones. The loupe and the edge tap need the element's own size (layout
 * px, the unit its children are drawn in) and the pointer in its own axes. With the identity transform (`NO_TILT`) every
 * function here returns what the plain rect gave (no behaviour change).
 */

export interface RectLike {
  left: number
  top: number
  width: number
  height: number
}

/**
 * How an element is drawn, from its own and its ancestors' transforms: the layout is first mirrored left-right when
 * `mirror` (RT-UI-16, scaleX(-1)), then rotated by `theta` (radians) and scaled uniformly by `scale`.
 */
export interface Tilt {
  theta: number
  scale: number
  mirror?: boolean
}
export const NO_TILT: Tilt = { theta: 0, scale: 1 }

/** The element's own layout size from its bounding box `bw` x `bh`. */
export const unrotatedSize = (
  bw: number,
  bh: number,
  { theta, scale }: Tilt = NO_TILT
): { w: number; h: number } => {
  const c = Math.abs(Math.cos(theta))
  const s = Math.abs(Math.sin(theta))
  const det = c * c - s * s
  // near 45 degrees the box no longer tells width from height: keep the box (no cabinet tilts that far)
  if (Math.abs(det) < 1e-3) return { w: bw / scale, h: bh / scale }
  return {
    w: (bw * c - bh * s) / det / scale,
    h: (bh * c - bw * s) / det / scale,
  }
}

/** A screen point in the axes of a transformed element: origin at its top-left, x along its width, y along its height (layout px). */
export const toLocalPoint = (
  x: number,
  y: number,
  box: RectLike,
  tilt: Tilt = NO_TILT
): { x: number; y: number } => {
  const { w, h } = unrotatedSize(box.width, box.height, tilt)
  const dx = x - (box.left + box.width / 2)
  const dy = y - (box.top + box.height / 2)
  const c = Math.cos(tilt.theta)
  const s = Math.sin(tilt.theta)
  // inverse rotation, then undo the mirror and the scale (the centre of the bounding box is the element's centre)
  const flip = tilt.mirror ? -1 : 1
  return {
    x: (flip * (dx * c + dy * s)) / tilt.scale + w / 2,
    y: (-dx * s + dy * c) / tilt.scale + h / 2,
  }
}

/** A screen movement (dx, dy) along the element's own axes, still in screen px (the scale is not undone, so a drag keeps its feel): the knob drag reads its horizontal travel here. */
export const toLocalDelta = (
  dx: number,
  dy: number,
  tilt: Tilt = NO_TILT
): { x: number; y: number } => {
  const c = Math.cos(tilt.theta)
  const s = Math.sin(tilt.theta)
  const flip = tilt.mirror ? -1 : 1
  return { x: flip * (dx * c + dy * s), y: -dx * s + dy * c }
}

/** A child box's own size and its top-left in the axes of the element `within` (both transformed alike). */
export const localRect = (
  box: RectLike,
  within: RectLike,
  tilt: Tilt = NO_TILT
): RectLike => {
  const { w, h } = unrotatedSize(box.width, box.height, tilt)
  const centre = toLocalPoint(
    box.left + box.width / 2,
    box.top + box.height / 2,
    within,
    tilt
  )
  return { left: centre.x - w / 2, top: centre.y - h / 2, width: w, height: h }
}

/**
 * The rotation, uniform scale and mirror the element is drawn with (the product of its and its ancestors' CSS
 * transforms). One matrix reads as `rotate(theta) * mirror * scale`; a mirror turns the child's rotation round, so a
 * mirrored ancestor takes `theta` as `parent - child`.
 */
export const accumulatedTilt = (el: Element | null): Tilt => {
  if (typeof DOMMatrix === 'undefined') return NO_TILT
  let theta = 0
  let scale = 1
  let mirror = false
  for (let n: Element | null = el; n; n = n.parentElement) {
    const t = getComputedStyle(n).transform
    if (!t || t === 'none') continue
    try {
      const m = new DOMMatrix(t)
      const flipped = m.a * m.d - m.b * m.c < 0
      const own = flipped ? Math.atan2(-m.b, -m.a) : Math.atan2(m.b, m.a)
      theta = flipped ? own - theta : own + theta
      mirror = mirror !== flipped
      scale *= Math.hypot(m.a, m.b)
    } catch {
      /* an unparsable transform is ignored */
    }
  }
  return { theta, scale: scale > 0 ? scale : 1, mirror }
}
