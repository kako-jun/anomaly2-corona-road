#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["playwright"]
# ///
"""Check, in a real browser, how every dialogue line wraps as a subtitle (Issue #323).

The script pours every line of the dialogue ledger (dialogue/*.yaml) into the real `.movie-sub div` of the running game,
at 360x640, 390x844, 768x1024 and 1280x720 plus five more sizes (the subtitle size is 4.9cqw of the picture, so the line count depends on the
layout), reads back with Range rects which characters sit on which line, and fails when

  (a) a line breaks inside a phrase (a phrase is the text between two full-width spaces) although the phrase is no
      longer than FIT characters, i.e. it would fit a line;
  (b) a subtitle that wraps ends with a last line of 2 characters or fewer (a lone orphan);
  (c) a wrapped line starts with a closing mark, a small kana, a long-vowel mark, ? ! or an ellipsis (kinsoku);
  (e) a subtitle needs more than 3 lines, or a line leaves the picture.

It only reports (does not fail on): last lines of 3-4 characters, and the phrases longer than a line that the browser
had to break anywhere (`overflow-wrap: anywhere`, the last resort) with their lines.

The wrapping depends on the machine's Japanese font (the subtitle uses the system font) and the script only drives Chromium,
so run it on the machine you ship from; Firefox and Safari are not verified.

Usage: start the dev server (`npm run dev`), then `npm run check:subtitle` (URL: SUB_URL, default
http://127.0.0.1:3000; Chromium: CHROME or the Playwright default). Add `--legacy` to measure the plain-text rendering
without phrase spans (the "before" numbers). Exit code 1 on any problem.
"""
import json
import os
import re
import sys

from playwright.sync_api import sync_playwright

URL = os.environ.get("SUB_URL", "http://127.0.0.1:3000")
CHROME = os.environ.get("CHROME")
LEGACY = "--legacy" in sys.argv
# the four sizes of the other checks, plus odd ones (fractional picture widths) where a phrase has the least margin
VIEWPORTS = ((360, 640), (390, 844), (768, 1024), (1280, 720), (320, 568), (414, 896), (1366, 768), (1440, 900), (1920, 1080))
SEP = "　"
# The longest phrase the script may have: one number, in src/utils/subtitle.ts (MAX_PHRASE_CHARS).
_m = re.search(r"MAX_PHRASE_CHARS\s*=\s*(\d+)", open(os.path.join(os.path.dirname(__file__), "..", "src", "utils", "subtitle.ts"), encoding="utf8").read())
if not _m:
    sys.exit("MAX_PHRASE_CHARS not found in src/utils/subtitle.ts")
FIT = int(_m.group(1))
MAX_LINES = 3
BAD_START = re.compile(r"^[、。，．,.!?？！」』）)ー…っゃゅょぁぃぅぇぉゎッャュョァィゥェォヮ]")

LEDGER = """
async () => {
  const ledger = (await import('/@id/__x00__virtual:dialogue')).default
  const out = []
  const walk = (o, path) => {
    if (Array.isArray(o)) o.forEach((v, i) => walk(v, path))
    else if (o && typeof o === 'object') {
      if (Array.isArray(o.lines) && o.id) o.lines.forEach((l, i) => out.push([o.id + '#' + (i + 1), l.text]))
      else for (const [k, v] of Object.entries(o)) walk(v, path + '/' + k)
    }
  }
  walk(ledger, '')
  return out
}
"""

# Mirrors CameraView.phraseSpans: <span>[SEP]<span class="seg">phrase</span></span> per phrase.
# The first real subtitle of the game is compared with this structure so the mirror cannot drift unseen.
BUILD = """
(text, legacy) => {
  const div = document.querySelector('#check-sub div')
  div.replaceChildren()
  div.style.textWrap = ''; div.style.lineBreak = ''
  if (legacy) { div.style.textWrap = 'wrap'; div.style.lineBreak = 'auto'; div.textContent = text; return }
  text.split('\\u3000').forEach((g, i) => {
    const w = document.createElement('span')
    if (i > 0) { w.appendChild(document.createTextNode('\\u3000')) }
    if (g) { const s = document.createElement('span'); s.className = 'seg'; s.textContent = g; w.appendChild(s) }
    div.appendChild(w)
  })
}
"""

MEASURE = """
async ([items, legacy]) => {
  const host = document.querySelector('#check-sub')
  const div = host.querySelector('div')
  const build = %s
  const glass = host.closest('.glass').getBoundingClientRect()
  const res = []
  for (const [id, text] of items) {
    build(text, legacy)
    const chars = []
    const walker = document.createTreeWalker(div, NodeFilter.SHOW_TEXT)
    let phrase = 0
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            const r = document.createRange()
      for (let i = 0; i < n.data.length; i++) {
        r.setStart(n, i); r.setEnd(n, i + 1)
        const rect = r.getBoundingClientRect()
        const sep = n.data[i] === '\\u3000'
        chars.push({ c: n.data[i], top: Math.round(rect.top), left: rect.left, right: rect.right, w: rect.width, seg: sep ? -1 : phrase })
        if (sep) phrase++
      }
    }
    // Lines = distinct tops (a skew keeps y), ignoring zero-width boxes.
    const tops = [...new Set(chars.filter(c => c.w > 0.5).map(c => c.top))].sort((a, b) => a - b)
    const lineOf = c => { let k = 0; for (let i = 0; i < tops.length; i++) if (Math.abs(c.top - tops[i]) <= 6) k = i; return k }
    const lines = tops.map(() => '')
    const segLines = {}
    let out = 0
    for (const c of chars) {
      if (c.w <= 0.5) continue
      const l = lineOf(c)
      if (c.c !== '\\u3000') lines[l] += c.c
      if (c.seg >= 0) (segLines[c.seg] = segLines[c.seg] || new Set()).add(l)
      // a full-width space hanging at the end of a line may stick out; it is not drawn
      if (c.c !== '\\u3000' && (c.left < glass.left - 1 || c.right > glass.right + 1)) out++
    }
    const broken = Object.entries(segLines).filter(([, s]) => s.size > 1).map(([i]) => text.split('\\u3000')[+i])
    res.push({ id, text, lines, broken, out })
  }
  return res
}
""" % BUILD.strip()

def main():
    problems, notes = [], []
    table = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path=CHROME, args=["--no-sandbox"]) if CHROME else pw.chromium.launch(args=["--no-sandbox"])
        page = browser.new_page(viewport={"width": 390, "height": 844})
        page.goto(URL, wait_until="domcontentloaded")
        page.click("button.start-go")
        page.wait_for_selector(".note-btn")
        page.click(".note-btn")
        page.wait_for_selector(".movie-sub", state="attached")
        page.evaluate("document.fonts.ready")
        items = page.evaluate(LEDGER)
        # A private copy of .movie-sub (same CSS, inside the same .glass size container), so the game re-rendering the
        # real subtitle can never race with the measurement.
        page.evaluate("""() => { const real = document.querySelector('.movie-sub'); const h = real.cloneNode(false)
          h.id = 'check-sub'; h.classList.add('show'); h.appendChild(document.createElement('div')); real.parentElement.appendChild(h) }""")
        if not LEGACY:
            # the first real subtitle of the game must be exactly what the mirror (BUILD) makes of its text
            page.wait_for_selector(".movie-sub:not(#check-sub) div", state="attached", timeout=15000)
            mirror = page.evaluate("""() => { const d = document.querySelector('.movie-sub:not(#check-sub) div'); const real = d.innerHTML
              ;(%s)(d.textContent, false); const m = document.querySelector('#check-sub div').innerHTML
              return [real, m] }""" % BUILD.strip())
            if mirror[0] != mirror[1]:
                problems.append(f"the checker's phrase structure differs from the game's:\n  game:   {mirror[0]}\n  mirror: {mirror[1]}")
        print(f"{len(items)} subtitle lines{' (legacy plain text)' if LEGACY else ''}")
        for w, h in VIEWPORTS:
            page.set_viewport_size({"width": w, "height": h})
            page.wait_for_timeout(150)
            page.wait_for_selector("#check-sub div", state="attached")
            rows = page.evaluate(MEASURE, [items, LEGACY])
            st = dict(wrapped=0, orphan2=0, orphan4=0, broken=0, anywhere=0, kinsoku=0, over=0, many=0)
            anywhere_lines = set()
            for r in rows:
                lines = r["lines"]
                tag = f'[{w}x{h}] {r["id"]}: {"|".join(lines)}'
                if len(lines) > 1:
                    st["wrapped"] += 1
                    last = len(lines[-1])
                    if last <= 2:
                        st["orphan2"] += 1
                        problems.append("orphan last line " + tag)
                    elif last <= 4:
                        st["orphan4"] += 1
                        notes.append("short last line " + tag)
                    for ln in lines[1:]:
                        if BAD_START.match(ln):
                            st["kinsoku"] += 1
                            problems.append("line starts with a closing mark / small kana " + tag)
                if len(lines) > MAX_LINES:
                    st["many"] += 1
                    problems.append(f"{len(lines)} lines " + tag)
                if r["out"]:
                    st["over"] += 1
                    problems.append("leaves the picture " + tag)
                if r["broken"]:
                    st["broken"] += 1
                    for p in r["broken"]:
                        if len(p) <= FIT:
                            problems.append(f"broke inside the phrase 「{p}」 " + tag)
                        else:
                            anywhere_lines.add(r["id"])
                            notes.append(f"anywhere: 「{p}」({len(p)} chars) " + tag)
            st["anywhere"] = len(anywhere_lines)
            table.append(((w, h), st))
        browser.close()
    print("\nviewport     wrapped  orphan<=2  last 3-4  broke-in-phrase  anywhere-lines  kinsoku  >3 lines  off-picture")
    for (w, h), s in table:
        print(f"{w}x{h:<8} {s['wrapped']:>7} {s['orphan2']:>10} {s['orphan4']:>9} {s['broken']:>16} {s['anywhere']:>15} {s['kinsoku']:>8} {s['many']:>9} {s['over']:>12}")
    if notes:
        print(f"\nNOTES ({len(notes)}):", *notes[:200], sep="\n  ")
    if problems:
        print(f"\nPROBLEMS ({len(problems)}):", *problems[:200], sep="\n  ")
        sys.exit(1)
    print("\nsubtitle wrap check: no phrase broken, no orphan last line, no kinsoku start, at every viewport")


if __name__ == "__main__":
    main()
