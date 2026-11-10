#!/usr/bin/env python3
"""Subset the investigation-note fonts (Issue #297) to the characters in public/fonts/note-chars.txt.

Usage (no repo dependency is added; fonttools and brotli come from uv):
  uv run --with fonttools --with brotli python3 scripts/build-note-fonts.py ZenKurenaido-Regular.ttf Yomogi-Regular.ttf

The source TTFs are the SIL OFL 1.1 releases from https://github.com/google/fonts (ofl/zenkurenaido, ofl/yomogi).
Output: public/fonts/note-zen-kurenaido.woff2 and note-yomogi.woff2. When wording in
src/data/investigationNotes.ts gains a new character, add it to note-chars.txt and run this again
(src/data/investigationNotes.test.ts fails until the character list covers the data).
"""
import sys
from pathlib import Path

from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
CHARS = (ROOT / "public/fonts/note-chars.txt").read_text(encoding="utf-8").replace("\n", "")
OUT = {"ZenKurenaido-Regular.ttf": "note-zen-kurenaido.woff2", "Yomogi-Regular.ttf": "note-yomogi.woff2"}

for src in sys.argv[1:]:
    name = Path(src).name
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "palt", "vert"]
    opts.hinting = False
    opts.name_IDs = ["*"]  # keep the copyright and licence notices
    font = subset.load_font(src, opts)
    sub = subset.Subsetter(opts)
    sub.populate(text=CHARS)
    sub.subset(font)
    missing = [c for c in CHARS if ord(c) not in font.getBestCmap()]
    if missing:
        sys.exit(f"{name} has no glyph for: {missing}")
    dest = ROOT / "public/fonts" / OUT[name]
    subset.save_font(font, str(dest), opts)
    print(dest, dest.stat().st_size)
