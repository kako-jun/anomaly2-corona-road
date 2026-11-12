#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow", "numpy", "scipy", "fonttools", "brotli"]
# ///
"""Make the sticky notes of the report dialog (Issue #346): public/report-notes/{ja,en}-<category>.webp.

The words live in ONE table, src/data/reportNotes.json (heading + bullet lines per category and language); this
script only draws them, so the picture can never disagree with the table (no typo from the picture maker).
The paper, the tape and the torn edge are the title screen's notes (public/title-notes, #296) with their writing
painted out, and a strip cut out of the middle so a note is only as tall as its lines. The red heading is Zen
Kurenaido and the black body Yomogi for Japanese, Caveat for English: the same hands as the title notes. The
bullets are small dots drawn here (not a font glyph).

  uv run --script scripts/report-notes.py <dir with ZenKurenaido-Regular.ttf and Yomogi-Regular.ttf>

The two Japanese fonts are the full SIL OFL 1.1 releases (github.com/google/fonts ofl/zenkurenaido, ofl/yomogi):
the subsets in public/fonts only hold the characters of the story notes. Caveat is read from the subset in
public/fonts (Latin only is enough). The fonts are used only to draw; no font is added to the app.
"""
import io
import json
import sys
from pathlib import Path

import numpy as np
from fontTools.ttLib import TTFont
from scipy.ndimage import gaussian_filter
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
TABLE = ROOT / "src/data/reportNotes.json"
OUT = ROOT / "public/report-notes"
TITLE = ROOT / "public/title-notes"

W = 600
TOP = 116  # rows kept above the first text line (the tape)
BOTTOM = 50  # rows kept at the bottom (the torn edge)
SRC_H = 450
PITCH = 52  # line pitch
INK = (48, 42, 40)
RED = (196, 52, 62)
SS = 2  # supersampling of the text


def paper_without_ink(name):
    """The title note `name` with the red and black writing painted out (normalised blur of the clean paper)."""
    im = Image.open(TITLE / f"{name}.webp").convert("RGBA")
    a = np.asarray(im).astype(np.float32)
    rgb, alpha = a[..., :3], a[..., 3]
    lum = rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    red = (rgb[..., 0] > 140) & (rgb[..., 1] < 120) & (rgb[..., 0] - rgb[..., 1] > 60)
    ink = ((lum < 125) | red) & (alpha > 200)
    mask = Image.fromarray((ink * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))
    ink = np.asarray(mask) > 0
    clean = (~ink).astype(np.float32)
    out = np.empty_like(rgb)
    for c in range(3):
        num = gaussian_filter(rgb[..., c] * clean, 9)
        den = gaussian_filter(clean, 9)
        est = num / np.maximum(den, 1e-3)
        out[..., c] = np.where(ink, est, rgb[..., c])
    # grain back on the painted-out places so they are not smooth
    rng = np.random.default_rng(7)
    grain = rng.normal(0, 2.2, size=lum.shape).astype(np.float32)
    for c in range(3):
        out[..., c] = np.where(ink, out[..., c] + grain, out[..., c])
    res = np.dstack([np.clip(out, 0, 255), alpha]).astype(np.uint8)
    return Image.fromarray(res, "RGBA")


def cut_to_height(paper, h):
    """Fit the paper to `h` rows: the tape (top) and the torn edge (bottom) stay whole, the middle is squeezed."""
    top = paper.crop((0, 0, W, TOP))
    mid = paper.crop((0, TOP, W, SRC_H - BOTTOM)).resize((W, h - TOP - BOTTOM), Image.LANCZOS)
    bottom = paper.crop((0, SRC_H - BOTTOM, W, SRC_H))
    out = Image.new("RGBA", (W, h))
    out.paste(top, (0, 0))
    out.paste(mid, (0, TOP))
    out.paste(bottom, (0, h - BOTTOM))
    return out


def load_font(path, size, index=None):
    return ImageFont.truetype(str(path), size * SS)


def woff2_to_ttf(src, dst):
    f = TTFont(str(src))
    f.flavor = None
    f.save(str(dst))


def draw_text(img, xy, text, font, fill):
    """Draw `text` at xy (css-size coordinates of the final image) with supersampling."""
    layer = Image.new("L", (img.width * SS, img.height * SS), 0)
    d = ImageDraw.Draw(layer)
    x = xy[0] * SS
    for i, word in enumerate(text.split(" ")):
        if i:
            x += space_advance(font)
        d.text((x, xy[1] * SS), word, font=font, fill=255, anchor="ls")
        x += font.getlength(word)
    layer = layer.resize(img.size, Image.LANCZOS)
    solid = Image.new("RGBA", img.size, fill + (255,))
    # only where there is paper
    a = np.minimum(np.asarray(layer), np.asarray(img.getchannel("A")))
    solid.putalpha(Image.fromarray(a))
    img.alpha_composite(solid)


def space_advance(font):
    """The Caveat subset has no space glyph (its advance would be wrong): a word space is 0.27 em."""
    return font.size * 0.27


def text_width(font, text):
    words = text.split(" ")
    return (sum(font.getlength(w) for w in words) + space_advance(font) * (len(words) - 1)) / SS


def main():
    fontdir = Path(sys.argv[1])
    tmp = fontdir / "caveat.ttf"
    if not tmp.exists():
        woff2_to_ttf(ROOT / "public/fonts/caveat-latin.woff2", tmp)
    doc = json.loads(TABLE.read_text(encoding="utf-8"))
    table = doc["notes"]
    OUT.mkdir(parents=True, exist_ok=True)
    spec = {
        "ja": dict(head=fontdir / "ZenKurenaido-Regular.ttf", body=fontdir / "Yomogi-Regular.ttf", size=44, head_size=48),
        "en": dict(head=tmp, body=tmp, size=50, head_size=54),
    }
    papers = {}
    for lang, sp in spec.items():
        avail = 520 - 36  # text width: paper inside the torn edges, minus the bullet column
        size = sp["size"]
        for n in table:
            for ln in n[lang]["lines"]:
                f = load_font(sp["body"], size)
                while text_width(f, ln) > avail:
                    size -= 1
                    f = load_font(sp["body"], size)
        for i, n in enumerate(table):
            d = n[lang]
            h = TOP + PITCH * (len(d["lines"]) + 1) + 26 + 18
            if n["paper"] not in papers:
                papers[n["paper"]] = paper_without_ink(n["paper"])
            img = cut_to_height(papers[n["paper"]], h)
            y = TOP + 40
            draw_text(img, (52, y), d["heading"], load_font(sp["head"], sp["head_size"]), RED)
            body = load_font(sp["body"], size)
            dr = ImageDraw.Draw(img)
            for ln in d["lines"]:
                y += PITCH
                cy = y - size * 0.32
                dr.ellipse((56 - 5, cy - 5, 56 + 5, cy + 5), fill=INK + (255,))
                draw_text(img, (80, y), ln, body, INK)
            path = OUT / d["file"]
            img.save(path, "WEBP", quality=82, method=6)
            d["width"], d["height"] = img.size
            print(lang, path.name, img.size, path.stat().st_size, "font", size)
    # the picture sizes go back into the table (then: npx prettier --write src/data/reportNotes.json)
    TABLE.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


main()
