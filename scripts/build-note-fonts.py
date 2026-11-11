#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["fonttools", "brotli"]
# ///
"""Subset the investigation-note fonts (Issue #297) and check that they cover every character the wording uses.

  uv run --script scripts/build-note-fonts.py build ZenKurenaido-Regular.ttf Yomogi-Regular.ttf 'Caveat[wght].ttf'
  npm run check:note-fonts        # = ... check

Sources are the SIL OFL 1.1 releases from https://github.com/google/fonts (ofl/zenkurenaido, ofl/yomogi, ofl/caveat).
build -> public/fonts/note-zen-kurenaido.woff2, note-yomogi.woff2 (characters of note-chars.txt) and
caveat-latin.woff2 (characters of note-chars-en.txt: ASCII plus the apostrophe U+2019 and the ellipsis U+2026,
which the English wording uses). The licence texts stay in public/fonts/OFL-*.txt.
check -> fails if a woff2 has no glyph for a character in its list. src/data/investigationNotes.test.ts fails
until the lists cover every character of the wording, so wording -> list -> font is tied end to end. When the
wording gains a new character, add it to the list and run build again.
"""
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "public/fonts"
JA = (FONTS / "note-chars.txt").read_text(encoding="utf-8").replace("\n", "")
EN = (FONTS / "note-chars-en.txt").read_text(encoding="utf-8").replace("\n", "")
# source file name (before any [axis] suffix) -> (output, characters)
TARGETS = {
    "ZenKurenaido-Regular": ("note-zen-kurenaido.woff2", JA),
    "Yomogi-Regular": ("note-yomogi.woff2", JA),
    "Caveat": ("caveat-latin.woff2", EN),
}


def build(sources):
    for src in sources:
        key = Path(src).name.split("[")[0].removesuffix(".ttf")
        out, chars = TARGETS[key]
        opts = subset.Options()
        opts.flavor = "woff2"
        opts.layout_features = ["kern", "palt", "vert"]
        opts.hinting = False
        opts.name_IDs = ["*"]  # keep the copyright and licence notices
        font = subset.load_font(src, opts)
        sub = subset.Subsetter(opts)
        sub.populate(text=chars)
        sub.subset(font)
        missing = [c for c in chars if ord(c) not in font.getBestCmap()]
        if missing:
            sys.exit(f"{key} has no glyph for: {missing}")
        dest = FONTS / out
        subset.save_font(font, str(dest), opts)
        print(dest, dest.stat().st_size)


def check():
    bad = []
    for _, (out, chars) in TARGETS.items():
        cmap = TTFont(FONTS / out).getBestCmap()
        missing = [c for c in chars if ord(c) not in cmap]
        print(f"{out}: {len(chars)} characters, missing {missing or 'none'}")
        if missing:
            bad.append(out)
    if bad:
        sys.exit(f"no glyph for some characters in: {bad}")


if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "check":
        check()
    elif len(sys.argv) >= 3 and sys.argv[1] == "build":
        build(sys.argv[2:])
    else:
        sys.exit(__doc__)
