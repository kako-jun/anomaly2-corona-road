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
  // Beside the corridor sketch (first night) a scribble line may only use what is left of the sheet.
  const avail = document.querySelector('.note-notes').clientWidth - (kind === 'scrib' && document.querySelector('.note-doodle') ? 100 + 8 : 0) - (kind === 'scrib' ? 4 : 0)
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
    document.querySelector('.note-screen').classList.add('note-after')
    document.querySelector('.note-screen').classList.remove('note-before')
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
    const gap = document.querySelector('.note-btn').getBoundingClientRect().top - document.querySelector('.note-form').getBoundingClientRect().bottom
    if (gap < 8) res.push(`after a night: the form is only ${gap.toFixed(1)}px above the key (need 8)`)
    document.querySelector('.note-screen').classList.remove('note-after')
    document.querySelector('.note-screen').classList.add('note-before')
    const paper = document.querySelector('.note-paper').getBoundingClientRect()
    for (const s of stamps) if (s.right > paper.right - 4) res.push(`${big[lang]} stamp leaves the paper`)
  }
  return res
}
"""


ROT = """
async () => {
  const d = await import('/src/data/noteTilt.ts')
  const box = document.querySelector('.note-stamps')
  if (!box.querySelector('.note-big')) { const s = document.createElement('span'); s.className = 'note-stamp note-big'; s.textContent = 'X'; box.appendChild(s) }
  const ang = el => { const m = new DOMMatrix(getComputedStyle(el).transform); return Math.atan2(m.b, m.a) * 180 / Math.PI }
  const tapeM = new DOMMatrix(getComputedStyle(document.querySelector('.note-paper'), '::before').transform)
  const labels = [...document.querySelectorAll('.note-slot-l')]
  const el = { tape: null, night: document.querySelector('.note-night'), stamp: box.querySelector('.note-stamp:not(.note-big)'), stampBig: box.querySelector('.note-big'),
    tag: document.querySelector('.note-slot-new'), scrib: document.querySelector('.note-scrib'), action: document.querySelector('.note-btn'), label0: labels[0], label1: labels[1], label2: labels[2], label3: labels[3] }
  const got = {}
  for (const [k, e] of Object.entries(el)) got[k] = k === 'tape' ? Math.atan2(tapeM.b, tapeM.a) * 180 / Math.PI : (e ? ang(e) : null)
  const res = []
  for (const [k, v] of Object.entries(got)) {
    if (v === null) { res.push('no element for tilt ' + k); continue }
    if (Math.abs(v - d.TILT_BY_NAME[k]) > 0.05) res.push(`${k} is tilted ${v.toFixed(2)} deg on the page, the table says ${d.TILT_BY_NAME[k]}`)
  }
  for (const [a, b] of d.NEIGHBOURS) if (got[a] !== null && got[b] !== null && Math.abs(got[a] - got[b]) < d.MIN_NEIGHBOUR_GAP) res.push(`neighbours ${a} and ${b} tilt alike (${got[a].toFixed(2)} / ${got[b].toFixed(2)})`)
  const names = Object.keys(got)
  for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) if (Math.abs(got[names[i]] - got[names[j]]) < d.MIN_ANY_GAP) res.push(`${names[i]} and ${names[j]} tilt alike`)
  return res
}
"""

FRAMEPX = """
async () => {
  // A found person's frame must show the same paper as an unfound one: no fill behind the drawing. Sample the empty
  // corners inside each sketch frame (transparent = paper shows through).
  const res = []
  for (const n of ['elder1', 'elder2', 'elder3', 'child', 'unknown', 'unknown-last']) {
    const img = new Image(); img.src = `/note/${n}.svg`; await img.decode()
    const c = document.createElement('canvas'); c.width = c.height = 136
    const g = c.getContext('2d'); g.drawImage(img, 0, 0, 136, 136)
    for (const [x, y] of [[12, 14], [120, 12], [122, 120], [14, 120]]) {
      const [r, gr, b, a] = g.getImageData(x, y, 1, 1).data
      if (a > 8) res.push(`${n}: the frame has a ${a > 250 ? 'solid' : 'partial'} fill at (${x},${y}) rgb(${r},${gr},${b}) a=${a}; it must be transparent paper`)
    }
  }
  // The red "found" tag keeps 3px or more from every frame (the sketches) and every stamp, as on an after-night page.
  const screen = document.querySelector('.note-screen')
  screen.classList.add('note-after'); screen.classList.remove('note-before')
  const tag = document.querySelector('.note-slot-new')
  if (tag) {
    const tr = tag.getBoundingClientRect()
    const gapTo = r => Math.max(r.left - tr.right, tr.left - r.right, r.top - tr.bottom, tr.top - r.bottom)
    for (const img of document.querySelectorAll('.note-slot img')) if (gapTo(img.getBoundingClientRect()) < 3) res.push('the "found" tag is closer than 3px to a sketch frame')
    for (const st of document.querySelectorAll('.note-stamp')) if (gapTo(st.getBoundingClientRect()) < 3) res.push('the "found" tag is closer than 3px to a stamp')
  }
  screen.classList.remove('note-after'); screen.classList.add('note-before')
  return res
}
"""

LAYOUT = """
() => {
  const r = s => document.querySelector(s).getBoundingClientRect()
  const res = []
  const gap = r('.note-btn').top - r('.note-form').bottom
  if (gap < 8) res.push(`the form is only ${gap.toFixed(1)}px above the key (need 8)`)
  // The handwritten action at the bottom: its underline and arrow stay on the paper and 3px or more from the form and
  // from each other's neighbours (the tap area is the whole button, 44px or more in both directions).
  const paper = document.querySelector('.note-paper').getBoundingClientRect()
  const act = document.querySelector('.note-btn')
  const ar = act.getBoundingClientRect(), form = r('.note-form')
  const scale = paper.width / 340
  if (ar.height / scale < 43.5 || ar.width / scale < 43.5) res.push(`the action's tap area is only ${(ar.width / scale).toFixed(1)}x${(ar.height / scale).toFixed(1)} (need 44x44)`)
  if (act.tagName !== 'BUTTON' || act.getAttribute('aria-label') !== act.textContent) res.push('the action is not a <button> named by its words')
  const parts = [...act.querySelectorAll('.note-act-under, .note-act-arrow, .note-act-text')]
  if (parts.length !== 3) res.push('the action lacks words, underline or arrow')
  for (const el of act.querySelectorAll('svg')) if (el.getAttribute('aria-hidden') !== 'true') res.push('an action stroke is not aria-hidden')
  for (const el of parts) {
    const b = el.getBoundingClientRect()
    if (b.left < paper.left + 2 || b.right > paper.right - 2 || b.bottom > paper.bottom - 2) res.push(`the action's ${el.getAttribute('class')} leaves the paper`)
    const gap = (b.top - form.bottom) / scale
    if (gap < 3) res.push(`the action's ${el.getAttribute('class')} is only ${gap.toFixed(1)}px below the number box (need 3)`)
    const sc = document.querySelector('.note-scrib').getBoundingClientRect()
    if ((b.top - sc.bottom) / scale < 3) res.push(`the action's ${el.getAttribute('class')} is closer than 3px to the scribble`)
  }
  const rows = [...document.querySelectorAll('.note-form .note-fr')].map(e => e.offsetHeight)
  if (new Set(rows).size > 1) res.push(`form rows differ in height: ${rows}`)
  const tag = document.querySelector('.note-slot-new')
  if (tag) {
    const tr = tag.getBoundingClientRect()
    const slots = [...document.querySelectorAll('.note-slot')].map(e => e.getBoundingClientRect())
    const own = tag.parentElement.getBoundingClientRect()
    for (const s of slots) if (s !== own && s.left !== own.left && Math.min(tr.right, s.right) - Math.max(tr.left, s.left) > 0 && Math.min(tr.bottom, s.bottom) - Math.max(tr.top, s.top) > 0) res.push('the "found" tag overlaps the neighbouring frame')
  }
  // Every hand-ruled frame is four separate edges, sized to its box, and hidden from assistive technology.
  for (const fr of document.querySelectorAll('.note-hand-frame')) {
    const box = fr.parentElement
    if (fr.querySelectorAll('polygon').length !== 4) res.push('a hand-ruled frame does not have four edges')
    if (Math.abs(fr.getAttribute('width') - box.offsetWidth) > 1 || Math.abs(fr.getAttribute('height') - box.offsetHeight) > 1) res.push('a hand-ruled frame does not fit its box')
    if (fr.getAttribute('aria-hidden') !== 'true') res.push('a hand-ruled frame is not aria-hidden')
  }
  // Scribbles continue right under the last synopsis line (on the next rule) and stay inside the ruled sheet.
  const notes = document.querySelector('.note-notes'), syn = document.querySelector('.note-syn'), sc = document.querySelector('.note-scrib')
  const synBottom = syn.offsetTop + syn.offsetHeight
  const gapAbove = sc.offsetTop - synBottom
  // A scribble is a separate jotting: about one ruled line below the synopsis (normally 14-18px; never under 10px).
  const minGap = document.querySelector('.note-first') ? 10 : 14 // the fullest page may shrink the gap to 10px, never less
  if (gapAbove < minGap || gapAbove > 20) res.push(`the scribble starts ${gapAbove}px below the last synopsis line (want ${minGap}-20px)`)
  const lastSyn = syn.querySelector('p:last-child').getBoundingClientRect()
  const clear = sc.getBoundingClientRect().top - lastSyn.bottom
  if (clear < 8) res.push(`the tilted scribble is only ${clear.toFixed(1)}px below the last synopsis line (need 8)`)
  for (const fl of document.querySelectorAll('.note-fl')) if (fl.scrollWidth > fl.clientWidth + 1) res.push(`form label "${fl.textContent}" does not fit its column`)
  const nr = notes.getBoundingClientRect(), sr = sc.getBoundingClientRect(), fr = r('.note-form')
  if (sr.bottom > nr.bottom || sr.top < nr.top) res.push('the tilted scribble leaves the ruled sheet')
  if (fr.top - sr.bottom < 10) res.push(`the scribble is only ${(fr.top - sr.bottom).toFixed(1)}px above the number box (need 10)`)
  const dd = document.querySelector('.note-doodle')
  if (dd) {
    const dr = dd.getBoundingClientRect(), lines = [...syn.querySelectorAll('p')].map(p => { const s = document.createRange(); s.selectNodeContents(p); return s.getBoundingClientRect() })
    for (const l of lines) if (Math.min(dr.right, l.right) - Math.max(dr.left, l.left) > 0 && Math.min(dr.bottom, l.bottom) - Math.max(dr.top, l.top) > 0) res.push('the corridor sketch overlaps a synopsis line')
    const sw = [...sc.querySelectorAll('p')].map(p => { const s = document.createRange(); s.selectNodeContents(p); return s.getBoundingClientRect() })
    for (const l of sw) if (Math.min(dr.right, l.right) - Math.max(dr.left, l.left) > 0 && Math.min(dr.bottom, l.bottom) - Math.max(dr.top, l.top) > 0) res.push('the corridor sketch overlaps a scribble')
  }
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
                if label == "later night" and lang == "ja":
                    for msg in page.evaluate(FRAMEPX):
                        problems.append(msg)
                if label == "new frame":
                    for msg in page.evaluate(ROT):
                        problems.append(f"[{lang}] {msg}")
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
