#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["playwright"]
# ///
"""Check, in a real browser, that nothing on the investigation note wraps by itself (Issue #297).

Every synopsis / scribble line in src/data/investigationNotes.ts is one handwritten line and the CSS keeps it on one
line (white-space: nowrap). This script measures each of them with the real fonts and the real paper (the paper is a
fixed 340x620, so the result does not depend on the screen), in Japanese and English, and fails when

  - a line is wider than the ruled area (or, beside the corridor sketch, the scribble column),
  - a line starts with a closing mark / small kana (kinsoku),
  - a stamp collides with the night number, the title or the first sketch frame (WITHDRAWN at its longest).

Usage: start the dev server (`npm run dev`), then `npm run check:note-wrap` (URL: NOTE_URL, default
http://127.0.0.1:5173; Chromium: CHROME or the Playwright default). Exit code 1 on any problem.
"""
import json
import os
import re
import sys

from playwright.sync_api import sync_playwright

URL = os.environ.get("NOTE_URL", "http://127.0.0.1:5173")
CHROME = os.environ.get("CHROME")
BAD_START = re.compile(r"^[、。，．,.!?？」』）)ー…っゃゅょ]")


def seed(save):
    return f"localStorage.setItem('corona-road:save', {json.dumps(json.dumps(save))})"


def base(**over):
    s = {"v": 1, "foundTotal": 0, "foundIds": [], "loops": 0, "flags": {}, "usedLines": {},
         "usedChatter": [], "pendingStories": []}
    s.update(over)
    return s


def open_note(browser, save):
    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.add_init_script(seed(save))
    page.goto(URL, wait_until="domcontentloaded")
    page.click("button.start-go")
    page.wait_for_selector(".note-paper")
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(300)
    return page


MEASURE = """
async ([lang, kind]) => {
  const d = await import('/src/data/investigationNotes.ts')
  const screen = document.querySelector('.note-screen')
  screen.classList.remove('note-ja', 'note-en'); screen.classList.add('note-' + lang)
  await document.fonts.ready
  const host = document.querySelector(kind === 'syn' ? '.note-syn' : '.note-scrib')
  const avail = host.clientWidth
  const lines = []
  const take = (where, pairs) => pairs.forEach(p => { if (p[lang]) lines.push([where, p[lang]]) })
  if (kind === 'syn') {
    for (const [k, s] of Object.entries(d.STAGES)) take('stage ' + k, s.lines)
    for (const [k, o] of Object.entries(d.OUTCOMES)) take('outcome ' + k, o.lines)
    take('last night', Object.values(d.LAST_NIGHT))
  } else {
    for (const [k, s] of Object.entries(d.STAGES)) take('scrib stage ' + k, s.scrib)
    for (const [k, o] of Object.entries(d.OUTCOMES)) take('scrib outcome ' + k, o.scrib || [])
  }
  const out = []
  for (const [where, text] of lines) {
    const p = document.createElement('p'); const span = document.createElement('span')
    span.textContent = text; p.appendChild(span); host.appendChild(p)
    out.push({ where, text, width: span.offsetWidth, rows: Math.round(p.offsetHeight / parseFloat(getComputedStyle(p).lineHeight)), avail })
    p.remove()
  }
  return out
}
"""

STAMPS = """
async (lang) => {
  const d = await import('/src/data/investigationNotes.ts')
  const screen = document.querySelector('.note-screen')
  screen.classList.remove('note-ja', 'note-en'); screen.classList.add('note-' + lang)
  await document.fonts.ready
  const L = d.LABELS
  document.querySelector('.note-night').textContent = L.night(30)[lang]
  const res = []
  for (const big of [L.stampDawn, L.stampWithdraw]) {
    const box = document.querySelector('.note-stamps')
    box.innerHTML = ''
    for (const [txt, isBig] of [[L.stampAfter[lang], false], [big[lang], true]]) {
      const s = document.createElement('span'); s.className = 'note-stamp' + (isBig ? ' note-big' : ''); s.textContent = txt; box.appendChild(s)
    }
    const stamps = [...box.children].map(e => e.getBoundingClientRect())
    const others = { night: '.note-night', title: '.note-hdr h1', frame1: '.note-slot img' }
    for (const [n, sel] of Object.entries(others)) {
      const r = document.querySelector(sel).getBoundingClientRect()
      for (const [i, s] of stamps.entries()) {
        const w = Math.min(s.right, r.right) - Math.max(s.left, r.left)
        const h = Math.min(s.bottom, r.bottom) - Math.max(s.top, r.top)
        if (w > -3 && h > -3) res.push(`${big[lang]} stamp#${i} is closer than 3px to ${n} (${w.toFixed(1)}x${h.toFixed(1)} px)`)
      }
    }
    document.querySelector('.note-screen').classList.add('note-after')
    const gap = document.querySelector('.note-btn').getBoundingClientRect().top - document.querySelector('.note-form').getBoundingClientRect().bottom
    if (gap < 8) res.push(`after a night: the form is only ${gap.toFixed(1)}px above the key (need 8)`)
    document.querySelector('.note-screen').classList.remove('note-after')
    const paper = document.querySelector('.note-paper').getBoundingClientRect()
    for (const s of stamps) if (s.right > paper.right - 4) res.push(`${big[lang]} stamp leaves the paper`)
  }
  return res
}
"""


LAYOUT = """
() => {
  const r = s => document.querySelector(s).getBoundingClientRect()
  const res = []
  const gap = r('.note-btn').top - r('.note-form').bottom
  if (gap < 8) res.push(`the form is only ${gap.toFixed(1)}px above the key (need 8)`)
  const rows = [...document.querySelectorAll('.note-form .note-fr')].map(e => e.offsetHeight)
  if (new Set(rows).size > 1) res.push(`form rows differ in height: ${rows}`)
  const tag = document.querySelector('.note-slot-new')
  if (tag) {
    const tr = tag.getBoundingClientRect()
    const slots = [...document.querySelectorAll('.note-slot')].map(e => e.getBoundingClientRect())
    const own = tag.parentElement.getBoundingClientRect()
    for (const s of slots) if (s !== own && s.left !== own.left && Math.min(tr.right, s.right) - Math.max(tr.left, s.left) > 0 && Math.min(tr.bottom, s.bottom) - Math.max(tr.top, s.top) > 0) res.push('the "found" tag overlaps the neighbouring frame')
  }
  const syn = document.querySelector('.note-syn')
  if (syn.scrollHeight > syn.clientHeight + 1) res.push('synopsis overflows its ruled area')
  return res
}
"""


def main():
    problems = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path=CHROME, args=["--no-sandbox"]) if CHROME else pw.chromium.launch(args=["--no-sandbox"])
        # A fresh save shows the corridor sketch (narrow scribble column); a played save does not.
        last = {"found": 12, "fresh": 3, "misreports": 0, "durationMs": 480000, "closing": "dawn", "raised": ["elder3"]}
        for label, save in (
            ("first night", base()),
            ("later night", base(loops=7, foundTotal=9, flags={"elder1": True, "elder2": True})),
            ("new frame", base(loops=12, foundTotal=40, foundIds=["a"] * 1, flags={"elder1": True, "elder2": True, "elder3": True}, lastShift=last)),
        ):
            page = open_note(browser, save)
            for lang in ("ja", "en"):
                page.evaluate("l => { const s = document.querySelector('.note-screen'); s.classList.remove('note-ja','note-en'); s.classList.add('note-' + l) }", lang)
                page.wait_for_timeout(100)
                for msg in page.evaluate(LAYOUT):
                    problems.append(f"[{lang}] {label}: {msg}")
                if label == "new frame":
                    continue
                kinds = ("syn", "scrib")
                for kind in kinds:
                    if kind == "syn" and label == "first night":
                        continue
                    for r in page.evaluate(MEASURE, [lang, kind]):
                        narrow = label == "first night"
                        if kind == "scrib" and r["where"] != "scrib stage start" and narrow:
                            continue  # only the first-night scribble sits beside the sketch
                        if kind == "scrib" and r["where"] == "scrib stage start" and not narrow:
                            continue
                        tag = f'[{lang}] {r["where"]}: "{r["text"]}" {r["width"]}/{r["avail"]}px'
                        if r["width"] > r["avail"]:
                            problems.append("too wide " + tag)
                        if r["rows"] != 1:
                            problems.append("wrapped " + tag)
                        if BAD_START.match(r["text"]):
                            problems.append("kinsoku " + tag)
                        print("ok " if r["width"] <= r["avail"] else "NG ", tag)
                if label == "later night":
                    for msg in page.evaluate(STAMPS, lang):
                        problems.append(f"[{lang}] {msg}")
            page.close()
        browser.close()
    if problems:
        print("\nPROBLEMS:", *problems, sep="\n  ")
        sys.exit(1)
    print("\nnote wrap check: all lines stay on one line, no stamp collisions")


if __name__ == "__main__":
    main()
