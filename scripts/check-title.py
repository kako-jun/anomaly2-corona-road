#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["playwright"]
# ///
"""Title screen check in a real browser (#296). vitest/jsdom has no layout, so it cannot tell any of this.

At 360x640 ... 3440x1440, in Japanese and English, it checks
  1. the photo fills the viewport, and over the whole 70 s pan (swept every 0.25 s) its edge never shows
     (the margin must stay >= 0 on all four sides)
  2. the signboard stays in view: the share of its area that is visible at the worst point of the pan
     (phones: nearly all of it; wide screens cut the top and bottom by the cover crop, which is accepted, so only a floor)
  3. the visible note is wholly inside the viewport and overlaps neither the START key nor the JA / EN keys,
     on every page (1/3 ... 3/3), and the START key and JA / EN keys do not overlap each other
  4. the page turns by click, by keyboard (Enter, arrows), by touch-style drag and by mouse drag, wraps from the last to the first,
     the pager text follows, and the note area (>= 44px) is the tap target
  5. the picture files really have the size the table says, and the language switch swaps the notes at once and is kept after a reload
  6. with prefers-reduced-motion the photo does not move
  7. (once) a noise burst appears within 14 s and is short
  8. nothing dark covers the photo: no element other than the notes, the keys and the pager has a solid background
Not wired to CI (it needs a Chromium: --chrome or $CHROME, default ~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome).
Starts `npx vite` on a free port (and stops only that process) unless --url is given.

Run: `npm run check:title`   (or: uv run --script scripts/check-title.py [--url http://localhost:5173] [--chrome PATH])
"""
import argparse
import glob
import os
import socket
import subprocess
import sys
import time
import urllib.request

SIZES = [(360, 640), (390, 844), (430, 932), (768, 1024), (898, 1000), (900, 1000), (1280, 720), (1920, 1080),
         (2560, 1440), (3440, 1440)]
# the signboard in the photo (450x600), as fractions of the picture: x0, y0, x1, y1 (measured on the picture)
SIGN = (0.59, 0.09, 0.86, 0.66)
PHONE_SIGN_MIN = 0.55  # a phone keeps most of the board in view (the note may cover its foot)
WIDE_SIGN_MIN = 0.35  # a wide screen crops the tall board top and bottom by design (kako-jun agreed)


def free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


SWEEP = """([sign]) => {
  const img = document.querySelector('.start-photo > img'), vw = innerWidth, vh = innerHeight
  const a = img.getAnimations()[0]
  if (!a) return {noAnim: true}
  a.pause(); a.effect.updateTiming({delay: 0})
  const cs = getComputedStyle(img).objectPosition.split(' ').map(v => parseFloat(v) / 100)
  const s0 = Math.max(vw / 450, vh / 600), w = 450 * s0, h = 600 * s0
  const ox = (vw - w) * cs[0], oy = (vh - h) * cs[1]
  let minSlack = 1e9, minSign = 1
  for (let t = 0; t <= 70000; t += 250) {
    a.currentTime = t
    const r = img.getBoundingClientRect()
    minSlack = Math.min(minSlack, -r.left, -r.top, r.right - vw, r.bottom - vh)
    const k = r.width / vw, l = r.height / vh
    const X0 = r.left + (ox + sign[0] * w) * k, X1 = r.left + (ox + sign[2] * w) * k
    const Y0 = r.top + (oy + sign[1] * h) * l, Y1 = r.top + (oy + sign[3] * h) * l
    const vis = Math.max(0, Math.min(X1, vw) - Math.max(X0, 0)) * Math.max(0, Math.min(Y1, vh) - Math.max(Y0, 0))
    minSign = Math.min(minSign, vis / ((X1 - X0) * (Y1 - Y0)))
  }
  return {minSlack, minSign}
}"""

RECTS = """() => {
  const q = s => document.querySelector(s)
  const r = e => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom] }
  const note = [...document.querySelectorAll('.start-stack > img')].find(i => !i.classList.contains('start-off'))
  return {note: r(note), key: r(q('.start-deck .key')), lang: r(q('.start-lang')), page: r(q('.start-page')),
    pager: r(q('.start-pager')), status: q('.start-pager-num').textContent, alt: note.alt,
    vw: innerWidth, vh: innerHeight, scrollX: document.documentElement.scrollWidth > innerWidth,
    scrollY: document.documentElement.scrollHeight > innerHeight}
}"""

DARK = """() => {
  const bad = []
  for (const e of document.querySelectorAll('.start-screen *')) {
    if (e.closest('.start-page, .start-pager, .start-lang, .start-deck, .start-photo')) continue
    const c = getComputedStyle(e).backgroundColor, m = c.match(/[\\d.]+/g) || []
    if (m.length >= 3 && (m[3] === undefined || +m[3] > 0.2)) bad.push(e.className || e.tagName)
  }
  const dk = getComputedStyle(document.querySelector('.start-deck')).backgroundImage
  if (dk !== 'none') bad.push('.start-deck has a background image')
  const bg = getComputedStyle(document.querySelector('.start-deck')).backgroundColor
  if (!/rgba\\(0, 0, 0, 0\\)|transparent/.test(bg)) bad.push('.start-deck has a background colour')
  return bad
}"""


def overlap(a, b):
    return a[0] < b[2] and b[0] < a[2] and a[1] < b[3] and b[1] < a[3]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url")
    ap.add_argument("--chrome")
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright

    proc = None
    url = a.url
    if not url:
        port = free_port()
        root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        proc = subprocess.Popen(["npx", "vite", "--port", str(port), "--strictPort"], cwd=root,
                                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
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
                    ctx = b.new_context(viewport={"width": w, "height": h}, locale="ja-JP" if lang == "ja" else "en-US")
                    p = ctx.new_page()
                    p.goto(url)
                    p.wait_for_selector(".start-screen")
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
                    for page in range(3):
                        r = p.evaluate(RECTS)
                        if r["status"] != f"{page + 1}/3":
                            errs.append(f"page {page + 1}: pager says {r['status']}")
                        n = r["note"]
                        if n[0] < -1 or n[1] < 0 or n[2] > w + 1 or n[3] > h + 1:
                            errs.append(f"page {page + 1}: note outside viewport {[round(v) for v in n]}")
                        for name in ("key", "lang"):
                            if overlap(n, r[name]):
                                errs.append(f"page {page + 1}: note overlaps {name}")
                        if overlap(r["pager"], r["key"]):
                            errs.append(f"page {page + 1}: pager overlaps the key")
                        if overlap(r["key"], r["lang"]):
                            errs.append("START key overlaps JA/EN")
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
                    # language switch: at once, and kept
                    other = "EN" if lang == "ja" else "JA"
                    before = p.evaluate(RECTS)["alt"]
                    p.click(f"button.start-lang-key:text-is('{other}')")
                    after = p.evaluate(RECTS)["alt"]
                    if before == after or not after:
                        errs.append("language switch did not change the note")
                    p.reload()
                    p.wait_for_selector(".start-screen")
                    if p.evaluate("() => document.querySelector('.start-notes').lang") != other.lower():
                        errs.append("language choice not kept after reload")
                    p.close()
                    ctx.close()
                    print(f"{lang} {w}x{h}: photo margin {sw.get('minSlack', 0):.1f}px, sign visible {sw.get('minSign', 0):.0%} -> {'; '.join(errs) or 'ok'}")
                    bad += bool(errs)
            # reduced motion: no pan
            ctx = b.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
            p = ctx.new_page()
            p.goto(url)
            p.wait_for_selector(".start-screen")
            still = p.evaluate("() => document.querySelector('.start-photo > img').getAnimations().length === 0")
            print(f"reduced motion: photo still -> {'ok' if still else 'MOVES'}")
            bad += not still
            ctx.close()
            # noise burst: appears within 14 s and is short
            ctx = b.new_context(viewport={"width": 390, "height": 844})
            p = ctx.new_page()
            p.goto(url)
            p.wait_for_selector(".start-screen")
            t0 = time.time()
            try:
                p.wait_for_selector(".start-burst", state="attached", timeout=14000)
                t1 = time.time()
                p.wait_for_selector(".start-burst", state="detached", timeout=3000)
                dur = time.time() - t1
                ok = dur < 0.7
                print(f"noise burst: after {t1 - t0:.1f}s, lasted ~{dur:.2f}s -> {'ok' if ok else 'TOO LONG'}")
                bad += not ok
            except Exception as e:  # noqa: BLE001
                print(f"noise burst: not seen ({type(e).__name__})")
                bad += 1
            ctx.close()
            b.close()
    finally:
        if proc:
            proc.terminate()
    sys.exit(1 if bad else 0)


main()
