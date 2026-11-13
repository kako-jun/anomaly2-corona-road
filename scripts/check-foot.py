#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["playwright"]
# ///
"""Bottom strip check in a real browser (#304): speaker grille + model plate.

vitest/jsdom has no layout, so it cannot tell whether the strip fits. This opens the game at several viewport sizes and checks
  1. the strip and the plate are inside the viewport (right <= innerWidth, bottom <= innerHeight)
  2. the strip does not overlap the REPORT key
  3. no page scroll
  4. the speaker grille shows a whole number of slots (right-end slot never clipped; tile aspect within 2.5% of the source)
  5. exactly two slot rows
  6. the control panel and the REPORT key are inside the viewport (the 3:4 picture must not squeeze the right column out of the screen)
Not wired to CI (it needs a Chromium; playwright's own download is not required: --chrome or $CHROME points at one,
default ~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome, else playwright's bundled one).
Starts `npx vite` on a free port (and stops only that process) unless --url is given.

Run: `npm run check:foot`   (or: uv run --script scripts/check-foot.py [--url http://localhost:5173] [--chrome PATH])
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

SIZES = [(360, 640), (390, 844), (768, 1024), (899, 1000), (900, 1000), (960, 1000), (1000, 1200),
         (1024, 1366), (1024, 768), (1280, 720), (1920, 1080), (2560, 1440)]


def free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


JS = """() => {
  const q = s => document.querySelector(s)
  const f = q('.cabinet-foot').getBoundingClientRect(), sp = q('.speaker'), s = sp.getBoundingClientRect()
  const pl = q('.model-plate').getBoundingClientRect(), rep = q('.key-report').getBoundingClientRect()
  const cs = getComputedStyle(sp), bs = cs.backgroundSize.split(' ').map(parseFloat)
  const de = document.documentElement
  const cols = s.width > 0 ? Math.max(1, Math.round(s.width / bs[0])) : 0
  return {foot: [f.left, f.right, f.top, f.bottom], plate: [pl.left, pl.right], spW: s.width, spH: s.height,
    rowH: bs[1] / 2, cols, distort: cols ? (s.width / cols) / bs[0] - 1 : 0,
    repOverlap: rep.right > f.left && rep.left < f.right && rep.bottom > f.top && rep.top < f.bottom,
    scroll: de.scrollWidth > innerWidth || de.scrollHeight > innerHeight, iw: innerWidth, ih: innerHeight,
    repeat: cs.backgroundRepeat, panelRight: q('.panel').getBoundingClientRect().right, repRight: rep.right, rows: Math.round(s.height / (bs[1] / 2))}
}"""


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
                p = b.new_page(viewport={"width": w, "height": h})
                p.goto(url)
                p.wait_for_selector(".start-screen")
                p.click(".start-deck button.start-key")  # the title key opens the investigation note (#297)
                p.wait_for_selector(".note-paper")
                p.click(".note-btn")  # its key starts the shift
                p.wait_for_selector(".knob")
                p.wait_for_timeout(500)
                r = p.evaluate(JS)
                p.close()
                errs = []
                if r["foot"][0] < -0.5 or r["foot"][1] > r["iw"] + 0.5 or r["foot"][3] > r["ih"] + 0.5:
                    errs.append("strip outside viewport")
                if r["plate"][1] > r["iw"] + 0.5:
                    errs.append("plate outside viewport")
                if r["repOverlap"]:
                    errs.append("strip overlaps REPORT")
                if r["panelRight"] > r["iw"] + 0.5 or r["repRight"] > r["iw"] + 0.5:
                    errs.append("panel / REPORT outside viewport")
                if r["scroll"]:
                    errs.append("page scrolls")
                if r["rows"] != 2:
                    errs.append(f"{r['rows']} slot rows")
                if "round" not in r["repeat"]:
                    errs.append("background-repeat is not round")
                if r["cols"] < 2 or abs(r["distort"]) > 0.025:
                    errs.append(f"grille cols={r['cols']} distort={r['distort']:.3%}")
                print(f"{w}x{h}: strip {r['foot'][0]:.0f}..{r['foot'][1]:.0f} plate right {r['plate'][1]:.0f} "
                      f"cols {r['cols']} distort {r['distort']:+.2%} -> {'; '.join(errs) or 'ok'}")
                bad += bool(errs)
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
