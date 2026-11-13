#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["playwright", "pillow", "numpy"]
# ///
"""Title screen check in a real browser (#296). vitest/jsdom has no layout, so it cannot tell any of this.

At 360x640 ... 3440x1440, in Japanese and English, it checks
  1. the photo fills the viewport, and over the whole drift (each axis swept every 0.25 s, the other at its ends) its
     edge never shows (the margin must stay >= 0 on all four sides)
  2. the signboard stays in view: the share of its area that is on screen at the worst point of the drift (phones:
     nearly all; wide screens cut the top and bottom by the cover crop, which is accepted, so only a floor), and of
     the part that is on screen the note and the START key cover at most 15% (>= 85% clear)
  3. the visible note is wholly inside the viewport and overlaps the START key,
     on every page (1/3 ... 3/3); on a wide / landscape screen the note's right edge is the START key's (within 2px)
  4. the page turns by click, by keyboard (Enter, arrows), by touch-style drag and by mouse drag, wraps from the last to the first,
     the pager text follows, and the note area (>= 44px) is the tap target
  5. the picture files really have the size the table says, and the language follows the browser's locale (ja-JP / en-US) with no switch on screen
  6. with prefers-reduced-motion the photo does not move
  7. (once) a noise burst appears within 8 s (the longest gap is 3.5 s) and lasts under 1.4 s
  8. the START OVER confirmation (after the true ending): ERASE ALL on top and CANCEL below, the same width and height
     (within 1px), >= 44px high, >= 10px apart, inside the viewport, the note hidden, the signboard clear, and the
     right edge and bottom where the START OVER key was (within 2px: the eye does not have to move)
  9. nothing dark covers the photo: no element other than the notes, the keys and the pager has a solid background
  10. (#331) the drifting blur patch: it sits over the photo, under the noise, the notes and the key, takes no pointer, has a
     fixed-radius backdrop-filter (<= BLUR_PX_MAX) whose strength breathes by opacity only, and: (a) over the whole joint cycle
     (x 61 s, y 47 s, strength 37 s) the signboard's centre is under the strong part of the patch (mask x opacity > 0.5) for at
     most BLUR_STRONG_MAX of the time; (b) with the patch centred on the sign at full strength the sign's edges keep at least
     BLUR_EDGE_MIN of their contrast (it stays legible) and the patch really changes the picture (blur_visible_min mean pixel
     difference); with prefers-reduced-motion no patch animation runs and the patch is the faint fixed one
Not wired to CI (it needs a Chromium: --chrome or $CHROME, default ~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome).
Starts `npx vite` on a free port (and stops only that process) unless --url is given.

Run: `npm run check:title`   (or: uv run --script scripts/check-title.py [--url http://localhost:5173] [--chrome PATH])
"""
import argparse
import glob
import os
import signal
import socket
import subprocess
import sys
import time
import urllib.request

SIZES = [(360, 640), (390, 844), (430, 932), (768, 1024), (898, 1000), (900, 1000), (1280, 720), (1920, 1080),
         (2560, 1440), (3440, 1440), (844, 390), (667, 375)]
# the signboard in the photo (450x600), as fractions of the picture: x0, y0, x1, y1 (measured on the picture)
SIGN = (0.59, 0.09, 0.86, 0.66)
PHONE_SIGN_MIN = 0.55  # a phone keeps most of the board in view
WIDE_SIGN_MIN = 0.35  # a wide screen crops the tall board top and bottom by design (kako-jun agreed)
BLUR_PX_MAX = 10  # the radius never exceeds this (measured on swiftshader: sign still legible far above, but the look gets muddy)
BLUR_STRONG_MAX = 0.4  # the sign's centre under the strong part of the patch (mask x opacity > 0.5) at most this share of the time
BLUR_EDGE_MIN = 0.5  # with the patch centred on the sign at full strength, the sign keeps this much of its edge contrast
# ... and the middle of the patch (its central 40% x 40%) changes the picture by at least this mean grey level. The photo is plain
# wall on a big screen, so the floor falls with the width: set between the 4px patch kako-jun could not tell from none (5.7 / 2.1 /
# 1.5 / 0.8 at 360 / 1280 / 1920 / 3440 px wide) and the 8px one (9.4 / 3.6 / 2.5 / 1.5; 5.2 at 898, 1.9 at 2560): about 0.8x of the 8px value
BLUR_VISIBLE_MIN = ((500, 7.5), (700, 5.0), (1000, 4.5), (1600, 2.8), (2200, 2.0), (3000, 1.5), (99999, 1.1))  # (screen width below, floor)


def blur_visible_min(w):
    return next(v for lim, v in BLUR_VISIBLE_MIN if w < lim)
CLEAR_MIN = 0.85  # of the part of the board that is on screen, the note and the key may cover at most 15% (worst point of the pan)


def free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


SWEEP = """([sign]) => {
  const img = document.querySelector('.start-photo img'), vw = innerWidth, vh = innerHeight
  const anims = document.getAnimations().filter(a => a.animationName && a.animationName.startsWith('start-pan'))
  const ax = anims.find(a => a.animationName === 'start-pan-x'), ay = anims.find(a => a.animationName === 'start-pan-y')
  if (!ax || !ay) return {noAnim: true}
  for (const a of [ax, ay]) { a.pause(); a.effect.updateTiming({delay: 0}) }
  const dx = ax.effect.getComputedTiming().duration, dy = ay.effect.getComputedTiming().duration
  const cs = getComputedStyle(img).objectPosition.split(' ').map(v => parseFloat(v) / 100)
  const s0 = Math.max(vw / 450, vh / 600), w = 450 * s0, h = 600 * s0
  const ox = (vw - w) * cs[0], oy = (vh - h) * cs[1]
  const noteImg = [...document.querySelectorAll('.start-stack > img')].find(i => !i.classList.contains('start-off'))
  const rr = e => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom] }
  // the note counts as covering the board unless the confirmation has hidden it (no height AND not visible)
  const sec = document.querySelector('.start-notes')
  const noteHidden = sec.getBoundingClientRect().height === 0 && getComputedStyle(sec).visibility === 'hidden'
  const noteVisible = noteImg && !noteHidden
  const cover = [noteVisible && rr(noteImg), rr(document.querySelector('.start-deck'))].filter(Boolean)
  const inter = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]))
  let minSlack = 1e9, minSign = 1, minClear = 1
  const at = (tx, ty) => {
    ax.currentTime = tx; ay.currentTime = ty
    const r = img.getBoundingClientRect()
    minSlack = Math.min(minSlack, -r.left, -r.top, r.right - vw, r.bottom - vh)
    const k = r.width / vw, l = r.height / vh
    const S = [r.left + (ox + sign[0] * w) * k, r.top + (oy + sign[1] * h) * l, r.left + (ox + sign[2] * w) * k, r.top + (oy + sign[3] * h) * l]
    const full = (S[2] - S[0]) * (S[3] - S[1])
    const V = inter(S, [0, 0, vw, vh])
    minSign = Math.min(minSign, V / full)
    const vis = [Math.max(S[0], 0), Math.max(S[1], 0), Math.min(S[2], vw), Math.min(S[3], vh)]
    const occ = cover.reduce((a, c) => a + inter(vis, c), 0)
    if (V > 0) minClear = Math.min(minClear, 1 - occ / V)
  }
  // each axis at its ends and along its whole way, the other axis at both of its ends
  for (const ty of [0, dy]) for (let t = 0; t <= dx; t += 250) at(t, ty)
  for (const tx of [0, dx]) for (let t = 0; t <= dy; t += 250) at(tx, t)
  return {minSlack, minSign, minClear}
}"""

# The mask in start.css: closest-side radial gradient, 1 at the centre, 0.7 at 40%, 0 at the edge (keep in step with it)
BLUR = """([sign]) => {
  const vw = innerWidth, vh = innerHeight
  const box = document.querySelector('.start-blur-x'), blur = document.querySelector('.start-blur'), img = document.querySelector('.start-photo img')
  if (!box || !blur) return {missing: true}
  const st = getComputedStyle(blur), bs = getComputedStyle(box)
  const own = {filter: st.backdropFilter || st.webkitBackdropFilter, events: bs.pointerEvents, mask: st.maskImage || st.webkitMaskImage}
  const an = document.getAnimations()
  const g = n => an.find(a => a.animationName === n)
  const A = ['start-blur-x', 'start-blur-y', 'start-blur-power'].map(g)
  if (A.some(a => !a)) return {...own, noAnim: true}
  for (const a of an) { a.pause(); a.effect.updateTiming({delay: 0}) }
  const D = A.map(a => a.effect.getComputedTiming().duration)
  for (const n of ['start-pan-x', 'start-pan-y']) g(n).currentTime = g(n).effect.getComputedTiming().duration / 2
  const r = img.getBoundingClientRect()
  const cs = getComputedStyle(img).objectPosition.split(' ').map(x => parseFloat(x) / 100)
  const s0 = Math.max(vw / 450, vh / 600), w = 450 * s0, h = 600 * s0
  const k = r.width / vw, l = r.height / vh
  const sx = r.left + ((vw - w) * cs[0] + (sign[0] + sign[2]) / 2 * w) * k, sy = r.top + ((vh - h) * cs[1] + (sign[1] + sign[3]) / 2 * h) * l
  const N = 3000
  let bad = 0
  for (let i = 0; i < N; i++) {
    A[0].currentTime = (i * 0.6180339 * D[0] * 7.31) % (2 * D[0])
    A[1].currentTime = (i * 0.7548776 * D[1] * 5.17) % (2 * D[1])
    A[2].currentTime = (i * 0.5698402 * D[2] * 3.91) % (2 * D[2])
    const b = box.getBoundingClientRect()
    const d = Math.hypot((sx - (b.left + b.width / 2)) / (b.width / 2), (sy - (b.top + b.height / 2)) / (b.height / 2))
    const a = d >= 1 ? 0 : d <= 0.4 ? 1 - 0.3 * d / 0.4 : 0.7 * (1 - (d - 0.4) / 0.6)
    if (a * parseFloat(getComputedStyle(blur).opacity) > 0.5) bad++
  }
  const z = e => { const s = document.querySelector(e); return s ? [...s.parentElement.children].indexOf(s) : -1 }
  return {...own, px: parseFloat((own.filter.match(/[\\d.]+/) || [0])[0]), bad: bad / N, over: z('.start-blur-x') > z('.start-pan-x')}
}"""

RECTS = """() => {
  const q = s => document.querySelector(s)
  const r = e => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom] }
  const note = [...document.querySelectorAll('.start-stack > img')].find(i => !i.classList.contains('start-off'))
  return {note: r(note), key: r(q('.start-deck .key')), page: r(q('.start-page')),
    pager: r(q('.start-pager')), status: q('.start-pager-num').textContent, alt: note.alt,
    vw: innerWidth, vh: innerHeight, scrollX: document.documentElement.scrollWidth > innerWidth,
    scrollY: document.documentElement.scrollHeight > innerHeight}
}"""

DARK = """() => {
  const bad = []
  for (const e of document.querySelectorAll('.start-screen *')) {
    if (e.closest('.start-page, .start-pager, .start-deck, .start-photo')) continue
    const c = getComputedStyle(e).backgroundColor, m = c.match(/[\\d.]+/g) || []
    if (m.length >= 3 && (m[3] === undefined || +m[3] > 0.2)) bad.push(e.className || e.tagName)
  }
  const dk = getComputedStyle(document.querySelector('.start-deck')).backgroundImage
  if (dk !== 'none') bad.push('.start-deck has a background image')
  const bg = getComputedStyle(document.querySelector('.start-deck')).backgroundColor
  if (!/rgba\\(0, 0, 0, 0\\)|transparent/.test(bg)) bad.push('.start-deck has a background colour')
  return bad
}"""


SEED = """localStorage.setItem('corona-road:save', JSON.stringify({v: 1, foundTotal: 5, foundIds: [], loops: 3, flags: {},
  usedLines: {}, usedChatter: [], pendingStories: [], endingReached: true, epoch: 1}))"""

CONFIRM = """() => {
  const r = e => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom] }
  const btn = n => [...document.querySelectorAll('.start-confirm-keys button')].find(b => b.textContent.trim() === n)
  const note = document.querySelector('.start-notes')
  return {erase: r(btn('ERASE ALL')), cancel: r(btn('CANCEL')), noteShown: !(note.getBoundingClientRect().height === 0 && getComputedStyle(note).visibility === 'hidden'),
    focus: document.activeElement.textContent.trim()}
}"""


SETUP = """([sign]) => {
  const an = document.getAnimations(), g = n => an.find(a => a.animationName === n)
  for (const a of an) { a.pause(); a.effect.updateTiming({delay: 0}) }
  const d = n => g(n).effect.getComputedTiming().duration
  for (const n of ['start-pan-x', 'start-pan-y']) g(n).currentTime = d(n) / 2
  g('start-blur-power').currentTime = d('start-blur-power')
  const img = document.querySelector('.start-photo img'), vw = innerWidth, vh = innerHeight
  const rr = img.getBoundingClientRect(), cs = getComputedStyle(img).objectPosition.split(' ').map(x => parseFloat(x) / 100)
  const s0 = Math.max(vw / 450, vh / 600), w = 450 * s0, h = 600 * s0, k = rr.width / vw, l = rr.height / vh
  const X = f => rr.left + ((vw - w) * cs[0] + f * w) * k, Y = f => rr.top + ((vh - h) * cs[1] + f * h) * l
  const sx = X((sign[0] + sign[2]) / 2), sy = Y((sign[1] + sign[3]) / 2)
  const box = document.querySelector('.start-blur-x'), bx = g('start-blur-x'), by = g('start-blur-y')
  let best = 1e9, tx = 0.5, ty = 0.5
  for (let i = 0; i <= 20; i++) for (let j = 0; j <= 20; j++) {
    bx.currentTime = d('start-blur-x') * i / 20; by.currentTime = d('start-blur-y') * j / 20
    const b = box.getBoundingClientRect(), e = Math.hypot(b.left + b.width / 2 - sx, b.top + b.height / 2 - sy)
    if (e < best) { best = e; tx = i / 20; ty = j / 20 }
  }
  bx.currentTime = d('start-blur-x') * tx; by.currentTime = d('start-blur-y') * ty
  const c = v => Math.round(Math.max(0, v))
  return [c(X(sign[0])), c(Y(sign[1])), Math.min(vw, c(X(sign[2]))), Math.min(vh, c(Y(sign[3])))]
}"""


def blur_legibility(p):
    """(share of the sign's edge contrast kept, mean grey-level change of the whole picture) with the patch centred on the
    sign at full strength, against the same moment with the patch hidden. The noise burst is hidden for the measurement."""
    import io
    import numpy as np
    from PIL import Image

    p.add_style_tag(content=".start-burst{display:none!important}")
    box = p.evaluate(SETUP, [list(SIGN)])
    r = p.evaluate("() => { const b = document.querySelector('.start-blur-x').getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom] }")
    pw_, ph_ = p.evaluate("() => [innerWidth, innerHeight]")
    # the middle of the patch (its central 40% x 40%): where the blur is at its full strength
    cx, cy, hw, hh = (r[0] + r[2]) / 2, (r[1] + r[3]) / 2, (r[2] - r[0]) * 0.2, (r[3] - r[1]) * 0.2
    area = [max(0, int(cx - hw)), max(0, int(cy - hh)), min(pw_, int(cx + hw)), min(ph_, int(cy + hh))]
    p.wait_for_timeout(250)
    grey = lambda: np.asarray(Image.open(io.BytesIO(p.screenshot())).convert("L"), dtype=float)
    on = grey()
    p.evaluate("() => { document.querySelector('.start-blur-x').style.visibility = 'hidden' }")
    p.wait_for_timeout(250)
    off = grey()
    p.evaluate("() => { document.querySelector('.start-blur-x').style.visibility = '' }")

    def edges(a):
        c = a[box[1]:box[3], box[0]:box[2]]
        return np.abs(np.diff(c, axis=1)).mean() + np.abs(np.diff(c, axis=0)).mean()

    d = np.abs(on - off)[area[1]:area[3], area[0]:area[2]]
    return edges(on) / edges(off), float(d.mean())


def overlap(a, b):
    return a[0] < b[2] and b[0] < a[2] and a[1] < b[3] and b[1] < a[3]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url")
    ap.add_argument("--chrome")
    ap.add_argument("--only", help="WxH: check this size only")
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright

    proc = None
    url = a.url
    if not url:
        port = free_port()
        root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        proc = subprocess.Popen(["npx", "vite", "--port", str(port), "--strictPort"], cwd=root,
                                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
        url = f"http://localhost:{port}/"
        for _ in range(60):
            try:
                urllib.request.urlopen(url, timeout=1)
                break
            except Exception:
                time.sleep(0.5)
    chrome = a.chrome or os.environ.get("CHROME")
    if not chrome:
        c = sorted(glob.glob(os.path.expanduser("~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome")))
        chrome = c[-1] if c else None
    bad = 0
    try:
        with sync_playwright() as pw:
            b = pw.chromium.launch(executable_path=chrome, args=["--no-sandbox", "--use-gl=swiftshader"])
            for lang in ("ja", "en"):
                for w, h in SIZES:
                    if a.only and a.only != f"{w}x{h}":
                        continue
                    ctx = b.new_context(viewport={"width": w, "height": h}, locale="ja-JP" if lang == "ja" else "en-US")
                    p = ctx.new_page()
                    p.goto(url)
                    p.wait_for_selector(".start-screen")
                    p.wait_for_function("[...document.querySelectorAll('.start-stack > img')].every(i => i.complete && i.naturalWidth > 0)")
                    p.wait_for_timeout(300)
                    errs = []
                    sw = p.evaluate(SWEEP, [list(SIGN)])
                    if sw.get("noAnim"):
                        errs.append("photo is not animated")
                    else:
                        if sw["minSlack"] < -0.01:
                            errs.append(f"photo edge shows (margin {sw['minSlack']:.2f}px)")
                        floor = PHONE_SIGN_MIN if w < h else WIDE_SIGN_MIN
                        if sw["minSign"] < floor:
                            errs.append(f"signboard visible only {sw['minSign']:.0%} at worst (< {floor:.0%})")
                        if sw["minClear"] < CLEAR_MIN:
                            errs.append(f"note / key cover the signboard: only {sw['minClear']:.0%} of it is clear (< {CLEAR_MIN:.0%})")
                    bl = p.evaluate(BLUR, [list(SIGN)])
                    if bl.get("missing") or bl.get("noAnim"):
                        errs.append("the blur patch is missing or not animated")
                    else:
                        if "blur" not in (bl["filter"] or ""):
                            errs.append(f"the blur patch has no backdrop-filter ({bl['filter']})")
                        if "radial-gradient" not in (bl["mask"] or ""):
                            errs.append("the blur patch has no soft mask")
                        if bl["events"] != "none":
                            errs.append("the blur patch takes pointer events")
                        if not bl["over"]:
                            errs.append("the blur patch is not over the photo")
                        if not 0 < bl["px"] <= BLUR_PX_MAX:
                            errs.append(f"the blur radius is {bl['px']}px (must be 0 < r <= {BLUR_PX_MAX})")
                        if bl["bad"] > BLUR_STRONG_MAX:
                            errs.append(f"the signboard is under the strong blur for {bl['bad']:.0%} of the time (> {BLUR_STRONG_MAX:.0%})")
                        keep, vis = blur_legibility(p)
                        if keep < BLUR_EDGE_MIN:
                            errs.append(f"the signboard keeps only {keep:.0%} of its edges under the blur (< {BLUR_EDGE_MIN:.0%})")
                        if vis < blur_visible_min(w):
                            errs.append(f"the blur patch changes the picture by only {vis:.1f} grey levels (< {blur_visible_min(w)})")
                    for page in range(3):
                        r = p.evaluate(RECTS)
                        if r["status"] != f"{page + 1}/3":
                            errs.append(f"page {page + 1}: pager says {r['status']}")
                        n = r["note"]
                        if n[0] < -1 or n[1] < 0 or n[2] > w + 1 or n[3] > h + 1:
                            errs.append(f"page {page + 1}: note outside viewport {[round(v) for v in n]}")
                        if overlap(n, r["key"]):
                            errs.append(f"page {page + 1}: note overlaps the key")
                        # wide / landscape only (the same test as the CSS `min-aspect-ratio: 1/1`, so a square counts as
                        # landscape); a portrait screen is left out on purpose: there the key is at the right end of the
                        # screen and the note is 70vw wide, so their right edges are not meant to meet
                        if w >= h and abs(n[2] - r["key"][2]) > 2:
                            errs.append(f"page {page + 1}: the note's right edge ({n[2]:.0f}) is not the START key's ({r['key'][2]:.0f})")
                        if overlap(r["pager"], r["key"]):
                            errs.append(f"page {page + 1}: pager overlaps the key")
                        if r["scrollX"] or r["scrollY"]:
                            errs.append("page scrolls")
                        if r["page"][2] - r["page"][0] < 44 or r["page"][3] - r["page"][1] < 44:
                            errs.append("note tap area under 44px")
                        kh = r["key"][3] - r["key"][1]
                        if kh < 44:
                            errs.append(f"START key {kh:.0f}px high")
                        p.click(".start-page", position={"x": 20, "y": 20})
                    if p.evaluate(RECTS)["status"] != "1/3":
                        errs.append("last page does not wrap to the first")
                    # keyboard
                    p.focus(".start-page")
                    p.keyboard.press("ArrowRight")
                    s1 = p.evaluate(RECTS)["status"]
                    p.keyboard.press("ArrowLeft")
                    s2 = p.evaluate(RECTS)["status"]
                    p.keyboard.press("Enter")
                    s3 = p.evaluate(RECTS)["status"]
                    if (s1, s2, s3) != ("2/3", "1/3", "2/3"):
                        errs.append(f"keyboard paging gave {s1},{s2},{s3}")
                    # mouse drag (left = next, right = previous), and no extra turn from the click that ends it
                    box = p.locator(".start-page").bounding_box()
                    cx, cy = box["x"] + box["width"] / 2, box["y"] + box["height"] / 2
                    p.mouse.move(cx + 60, cy)
                    p.mouse.down()
                    p.mouse.move(cx - 60, cy, steps=6)
                    p.mouse.up()
                    s4 = p.evaluate(RECTS)["status"]
                    p.mouse.move(cx - 60, cy)
                    p.mouse.down()
                    p.mouse.move(cx + 60, cy, steps=6)
                    p.mouse.up()
                    s5 = p.evaluate(RECTS)["status"]
                    if (s4, s5) != ("3/3", "2/3"):
                        errs.append(f"mouse drag paging gave {s4},{s5}")
                    # picture sizes
                    sizes = p.evaluate("() => [...document.querySelectorAll('.start-stack > img')].map(i => [i.naturalWidth, i.naturalHeight, i.width, i.height])")
                    for nw, nh, aw, ah in sizes:
                        if nw == 0:
                            errs.append("a note picture did not load")
                        elif (nw, nh) != (600, 450):
                            errs.append(f"note picture is {nw}x{nh}")
                    if p.evaluate(DARK):
                        errs.append(f"dark / solid surface: {p.evaluate(DARK)}")
                    # the language comes from the browser's locale; there is no switch
                    if p.evaluate("() => document.querySelector('.start-notes').lang") != lang:
                        errs.append("notes are not in the browser's language")
                    if p.locator(".start-lang, .start-lang-key").count():
                        errs.append("a language switch is on screen")
                    p.close()
                    ctx.close()
                    print(f"{lang} {w}x{h}: sign under strong blur {bl.get('bad', 0):.0%} of the time, edges kept {keep:.0%}, picture changed {vis:.1f}; photo margin {sw.get('minSlack', 0):.1f}px, sign on screen {sw.get('minSign', 0):.0%}, clear of note/key {sw.get('minClear', 0):.0%} -> {'; '.join(errs) or 'ok'}")
                    # the START OVER confirmation (a save that reached the true ending)
                    ctx = b.new_context(viewport={"width": w, "height": h}, locale="ja-JP" if lang == "ja" else "en-US")
                    ctx.add_init_script(SEED)
                    p = ctx.new_page()
                    p.goto(url)
                    p.wait_for_selector(".start-screen")
                    so = p.evaluate("() => { const b = document.querySelector('.start-deck .key').getBoundingClientRect(); return [b.right, b.bottom] }")
                    p.get_by_role("button", name="START OVER").click()
                    p.wait_for_selector(".start-confirm-keys")
                    p.wait_for_timeout(200)
                    cerrs = []
                    ck = p.evaluate(CONFIRM)
                    er, ca = ck["erase"], ck["cancel"]
                    if abs((er[2] - er[0]) - (ca[2] - ca[0])) > 1 or abs((er[3] - er[1]) - (ca[3] - ca[1])) > 1:
                        cerrs.append("ERASE ALL and CANCEL differ in size")
                    if er[1] >= ca[1]:
                        cerrs.append("CANCEL is not below ERASE ALL")
                    if ca[1] - er[3] < 10:
                        cerrs.append(f"keys only {ca[1] - er[3]:.0f}px apart")
                    for nm, r in (("ERASE ALL", er), ("CANCEL", ca)):
                        if r[3] - r[1] < 44 or r[2] - r[0] < 44:
                            cerrs.append(f"{nm} under 44px")
                        if r[0] < 0 or r[2] > w or r[1] < 0 or r[3] > h:
                            cerrs.append(f"{nm} outside the viewport")
                    if abs(er[2] - so[0]) > 2 or abs(ca[2] - so[0]) > 2:
                        cerrs.append(f"the confirmation's right edge ({ca[2]:.0f}) is not the START OVER key's ({so[0]:.0f})")
                    if abs(ca[3] - so[1]) > 2:
                        cerrs.append(f"the confirmation's bottom ({ca[3]:.0f}) is not the START OVER key's ({so[1]:.0f})")
                    if ck["noteShown"]:
                        cerrs.append("the note is still shown during the confirmation")
                    if ck["focus"] != "CANCEL":
                        cerrs.append(f"focus starts on {ck['focus']}, not CANCEL")
                    sw2 = p.evaluate(SWEEP, [list(SIGN)])
                    if sw2["minClear"] < CLEAR_MIN:
                        cerrs.append(f"the confirmation covers the signboard: {sw2['minClear']:.0%} clear")
                    p.close()
                    ctx.close()
                    print(f"{lang} {w}x{h} confirm: keys {er[2] - er[0]:.0f}x{er[3] - er[1]:.0f} / {ca[2] - ca[0]:.0f}x{ca[3] - ca[1]:.0f}, clear {sw2['minClear']:.0%} -> {'; '.join(cerrs) or 'ok'}")
                    bad += bool(cerrs)
                    bad += bool(errs)
            # reduced motion: no pan
            ctx = b.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
            p = ctx.new_page()
            p.goto(url)
            p.wait_for_selector(".start-screen")
            still = p.evaluate("() => document.getAnimations().filter(a => a.animationName && (a.animationName.startsWith('start-pan') || a.animationName.startsWith('start-blur'))).length === 0")
            faint = p.evaluate("() => { const b = getComputedStyle(document.querySelector('.start-blur')); return parseFloat(b.opacity) > 0 && parseFloat(b.opacity) < 1 && /blur/.test(b.backdropFilter) }")
            print(f"reduced motion: photo and blur patch still, patch faint and fixed -> {'ok' if still and faint else 'MOVES / not faint'}")
            bad += not (still and faint)
            ctx.close()
            # noise burst: appears within 8 s (the longest gap is 3.5 s) and lasts under 1.4 s
            ctx = b.new_context(viewport={"width": 390, "height": 844})
            p = ctx.new_page()
            p.goto(url)
            p.wait_for_selector(".start-screen")
            try:
                # timed inside the page (the clock of the test driver is too coarse under load)
                r = p.evaluate("""() => new Promise((res, rej) => {
                  const t0 = performance.now(); let t1 = null
                  const to = setTimeout(() => rej(new Error('no burst')), 8000)
                  new MutationObserver(() => {
                    const on = !!document.querySelector('.start-burst')
                    if (on && t1 === null) t1 = performance.now()
                    if (!on && t1 !== null) { clearTimeout(to); res([(t1 - t0) / 1000, (performance.now() - t1) / 1000]) }
                  }).observe(document.body, {childList: true, subtree: true})
                })""")
                ok = r[1] < 1.4
                print(f"noise burst: after {r[0]:.1f}s, lasted {r[1]:.2f}s -> {'ok' if ok else 'TOO LONG'}")
                bad += not ok
            except Exception as e:  # noqa: BLE001
                print(f"noise burst: not seen ({type(e).__name__})")
                bad += 1
            ctx.close()
            b.close()
    finally:
        if proc:
            # npx and the vite it started (its own process group), nothing else; SIGKILL if it does not leave in 5 s
            try:
                os.killpg(proc.pid, signal.SIGTERM)
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                os.killpg(proc.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
    sys.exit(1 if bad else 0)


main()
