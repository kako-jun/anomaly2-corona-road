#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["playwright"]
# ///
"""No scroll past the bottom (#333): the page must never be taller than the visible viewport on any screen.

On a phone, `100vh` is the LARGE viewport (the address bar hidden) while `innerHeight` / `100dvh` is the visible one, so a
`min-height: 100vh` on html / body / #root / the cabinet makes the document taller than what is on screen and the player can
scroll down into a black strip. A headless Chromium has no address bar (vh == dvh), so the real thing cannot be reproduced;
this check therefore does two measurements on each screen (title, investigation note before a shift at three story stages,
the monitor, and the SELECT CATEGORY dialog), at phone / tablet / desktop sizes with touch emulation and deviceScaleFactor 2:
  1. the scrollable amount (scrollHeight - innerHeight) is at most TOLERANCE px
  2. the same measurement again after every `100vh` in the page's own CSS has been rewritten to `100vh + LARGE_EXTRA`
     (a stand-in for the large viewport being taller than the visible one). Whatever still sizes the document by `vh`
     grows by LARGE_EXTRA and fails; whatever uses `dvh` does not.
Only the exact spelling `100vh` is rewritten; another spelling such as `60vh` is not caught.
The final check on a real phone (address bar sliding) is by hand.
Not wired to CI (it needs a Chromium: --chrome or $CHROME, default ~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome).
Starts `npx vite` on a free port (and stops only that process) unless --url is given.

Run: `npm run check:scroll`   (or: uv run --script scripts/check-scroll.py [--url http://localhost:5173] [--chrome PATH])
"""
import argparse
import glob
import json
import os
import signal
import socket
import subprocess
import sys
import time
import urllib.request

SIZES = [(390, 844), (360, 640), (412, 915), (768, 1024), (1024, 768), (1280, 720)]
TOLERANCE = 1  # px of scroll allowed (sub-pixel rounding)
LARGE_EXTRA = 80  # px the large viewport is taller than the visible one in the simulation
TOUCH_MAX_W = 700  # narrower than this: emulate a phone (touch, mobile)


def free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


def save(flags):
    return ("localStorage.setItem('corona-road:save', JSON.stringify({v: 1, foundTotal: 5, foundIds: [], loops: 1, flags: "
            + json.dumps(flags) + ", usedLines: {}, usedChatter: [], pendingStories: [], endingReached: false, epoch: 1}))")


STAGES = {"fresh": {}, "elder3": {"elder1": True, "elder2": True, "elder3": True},
          "child": {"elder1": True, "elder2": True, "elder3": True, "child": True}}

SCROLL = "() => document.scrollingElement.scrollHeight - innerHeight"

# the page's own CSS: every `100vh` becomes `100vh + extra` (rules, @media / @supports nested, custom properties)
LARGE = """(extra) => {
  const fix = (v) => v.replace(/100vh/g, `calc(100vh + ${extra}px)`)
  const walk = (rules) => { for (const r of rules) {
    if (r.cssRules && !r.style) walk(r.cssRules)
    if (r.style) for (let i = 0; i < r.style.length; i++) {
      const n = r.style[i], v = r.style.getPropertyValue(n)
      if (v.includes('100vh')) r.style.setProperty(n, fix(v), r.style.getPropertyPriority(n))
    }
  } }
  for (const s of document.styleSheets) { try { walk(s.cssRules) } catch (e) {} }
}"""


def measure(p, label, errs, size):
    n = p.evaluate(SCROLL)
    if n > TOLERANCE:
        errs.append(f"{label}: scrolls {n}px past the bottom")
    p.evaluate(LARGE, LARGE_EXTRA)
    p.wait_for_timeout(100)
    m = p.evaluate(SCROLL)
    if m > TOLERANCE:
        errs.append(f"{label}: with a large viewport {LARGE_EXTRA}px taller, scrolls {m}px (something is sized by vh)")


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
            for w, h in SIZES:
                phone = w < TOUCH_MAX_W
                for stage, flags in STAGES.items():
                    ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=2, is_mobile=phone, has_touch=phone)
                    ctx.add_init_script(save(flags))
                    errs = []
                    # each measurement edits the stylesheets, so every screen gets a fresh page
                    def fresh(to):
                        p = ctx.new_page()
                        p.goto(url)
                        p.wait_for_selector(".start-screen")
                        p.wait_for_timeout(300)
                        if to == "title":
                            return p
                        p.click(".start-deck button.start-key")
                        p.wait_for_selector(".note-paper")
                        p.wait_for_timeout(300)
                        if to == "note":
                            return p
                        p.click(".note-btn")
                        p.wait_for_selector(".knob")
                        p.wait_for_timeout(500)
                        if to == "game":
                            return p
                        p.click(".key-report")
                        p.wait_for_selector(".dialog")
                        p.wait_for_timeout(300)
                        return p
                    screens = ["title", "note", "game", "dialog"] if stage == "fresh" else ["note", "game"]
                    for to in screens:
                        p = fresh(to)
                        measure(p, to, errs, (w, h))
                        p.close()
                    ctx.close()
                    print(f"{w}x{h} {stage}: {'; '.join(errs) or 'ok'}")
                    bad += bool(errs)
            b.close()
    finally:
        if proc:
            os.killpg(proc.pid, signal.SIGTERM)  # npx and the vite it started, nothing else
    sys.exit(1 if bad else 0)


main()
