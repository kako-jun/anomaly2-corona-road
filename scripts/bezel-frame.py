#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow", "numpy", "scipy", "scikit-image"]
# ///
"""Monitor frame picture (public/ui/bezel_mon.webp): measure its transparent opening, trace the clip-path, check CSS (#283).

The frame is ONE picture used as `.bezel` background at `background-size: 100% 100%`. Three things must agree, and this
tool is what ties them to the picture's real alpha instead of to hand-copied numbers:

  1. the picture's pixel aspect (W/H) == the `aspect-ratio` that `.bezel` declares (so 100% 100% is an exact, unstretched fit)
  2. the numeric group on `.glass` (--img-w/h, --open-l/t/r/b) == the opening measured from the alpha channel
  3. the `.glass` clip-path polygon == the opening outline (area difference and maximum deviation within 1 picture px)

  measure           print the opening group and its outer bands
  trace             print the polygon (percent of the glass box) traced from the alpha
  apply             rewrite the group and the polygon in src/styles/retro.css from the picture
  check             verify 1-3 against src/styles/retro.css (exit 1 on a mismatch); wired to `npm run check:bezel`, CI, and vitest
  stretch           resample a picture to --height with the same width (premultiplied Lanczos, rim and grain untouched) and save it
  smooth-corners    smooth the two lower corners of the picture (see cmd_smooth_corners); needs --ref (the original main picture)

Cautions: `apply` REWRITES the tracked src/styles/retro.css, and `stretch --out` / `smooth-corners --out` can overwrite
public/ui/bezel_mon.webp when pointed at it. Work on a copy first, then `apply` and `check`.

Run: `uv run --script scripts/bezel-frame.py check`
"""
import argparse
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
from skimage import measure

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "public/ui/bezel_mon.webp"
CSS = ROOT / "src/styles/retro.css"
ALPHA_EDGE = 128
MAX_DEV_PX = 1.0  # polygon vs opening, in picture px
TOLERANCE_PX = 0.6  # Douglas-Peucker simplification of the sub-pixel contour


def load_alpha(path: Path = IMG) -> np.ndarray:
    return np.asarray(Image.open(path).convert("RGBA"))[:, :, 3]


def opening_mask(a: np.ndarray) -> np.ndarray:
    """The transparent region connected to the picture centre (the outer rounded corners are transparent too)."""
    lab, _ = ndimage.label(a < ALPHA_EDGE)
    h, w = a.shape
    return lab == lab[h // 2, w // 2]


def opening_box(a: np.ndarray) -> dict:
    ys, xs = np.where(opening_mask(a))
    h, w = a.shape
    # r / b are exclusive edges, so the bands are l, t, w - r, h - b
    return dict(w=w, h=h, l=int(xs.min()), t=int(ys.min()), r=int(xs.max()) + 1, b=int(ys.max()) + 1)


def trace(a: np.ndarray, pad: int) -> list[tuple[float, float]]:
    """Sub-pixel outline of the opening (alpha == 128 level), simplified, in px relative to the glass box (box = opening + pad)."""
    box = opening_box(a)
    field = np.where(ndimage.binary_dilation(opening_mask(a), iterations=3), a, 255).astype(float)
    cs = measure.find_contours(field, ALPHA_EDGE)
    c = max(cs, key=len)
    c = measure.approximate_polygon(c, TOLERANCE_PX)[:-1]
    # contour rows/cols are pixel-centre coordinates: +0.5 gives picture px edges
    pts = [(x + 0.5 - (box["l"] - pad), y + 0.5 - (box["t"] - pad)) for y, x in c]
    # start at the bottom centre and walk the same way the CSS always did (to the left first)
    area = sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]))
    gw = box["r"] - box["l"] + 2 * pad
    gh = box["b"] - box["t"] + 2 * pad
    i0 = min(range(len(pts)), key=lambda i: (abs(pts[i][0] - gw / 2) + (gh - pts[i][1]) * 10))
    pts = pts[i0:] + pts[:i0]
    if area > 0:  # make it deterministic: bottom -> left side -> top -> right side (clockwise on screen is area > 0)
        pts = [pts[0]] + pts[1:][::-1]
    return pts


def polygon_css(pts: list[tuple[float, float]], gw: float, gh: float) -> str:
    num = lambda v: f"{v:.3f}".rstrip("0").rstrip(".")  # same text prettier would keep
    rows = [f"{num(x / gw * 100)}% {num(y / gh * 100)}%" for x, y in pts]
    return "polygon(\n    " + ",\n    ".join(rows) + "\n  )"


def parse_css(text: str) -> dict:
    """The LAST `.glass` rule that declares --img-w carries the group and the clip-path; `.bezel` aspect-ratio too."""
    rules = [m for m in re.finditer(r"\.glass\s*\{([^{}]*?--img-w[^{}]*?)\}", text, re.S)]
    if not rules:
        raise SystemExit("no .glass rule with --img-w in retro.css")
    body = rules[-1].group(1)
    out = {}
    for k in ("img-w", "img-h", "open-l", "open-t", "open-r", "open-b", "open-pad"):
        m = re.search(rf"--{k}:\s*([\d.]+)\s*;", body)
        if not m:
            raise SystemExit(f"--{k} missing")
        out[k] = float(m.group(1))
    m = re.search(r"clip-path:\s*polygon\(([^)]*)\)", body)
    if not m:
        raise SystemExit("clip-path polygon missing")
    out["poly"] = [tuple(float(v.strip().rstrip("%")) for v in p.split()) for p in m.group(1).split(",")]
    ratios = re.findall(r"\.bezel\s*\{[^{}]*?aspect-ratio:\s*([\d.]+)\s*/\s*([\d.]+)\s*;", text, re.S)
    out["aspect"] = [(float(a), float(b)) for a, b in ratios]
    return out


def cmd_measure(_):
    a = load_alpha()
    b = opening_box(a)
    print(b)
    print(f"bands (picture px): left {b['l']}, top {b['t']}, right {b['w'] - b['r']}, bottom {b['h'] - b['b']}")
    print(f"picture aspect {b['w']}/{b['h']} = {b['w'] / b['h']:.5f}")


def cmd_trace(_):
    a = load_alpha()
    b = opening_box(a)
    pad = int(parse_css(CSS.read_text())["open-pad"])
    gw, gh = b["r"] - b["l"] + 2 * pad, b["b"] - b["t"] + 2 * pad
    pts = trace(a, pad)
    print(len(pts), "points")
    print(polygon_css(pts, gw, gh))


def cmd_apply(_):
    a = load_alpha()
    b = opening_box(a)
    text = CSS.read_text()
    pad = int(parse_css(text)["open-pad"])
    gw, gh = b["r"] - b["l"] + 2 * pad, b["b"] - b["t"] + 2 * pad
    poly = polygon_css(trace(a, pad), gw, gh)
    m = list(re.finditer(r"\.glass\s*\{([^{}]*?--img-w[^{}]*?)\}", text, re.S))[-1]
    body = m.group(1)
    for k, v in (("img-w", b["w"]), ("img-h", b["h"]), ("open-l", b["l"]), ("open-t", b["t"]), ("open-r", b["r"]), ("open-b", b["b"])):
        body = re.sub(rf"(--{k}:\s*)[\d.]+", rf"\g<1>{v}", body)
    body = re.sub(r"clip-path:\s*polygon\([^)]*\)", lambda _m: "clip-path: " + poly, body)
    CSS.write_text(text[: m.start(1)] + body + text[m.end(1):])
    print("retro.css updated", b)


def cmd_check(_):
    a = load_alpha()
    b = opening_box(a)
    css = parse_css(CSS.read_text())
    errs = []
    for k in ("w", "h", "l", "t", "r", "b"):
        key = {"w": "img-w", "h": "img-h", "l": "open-l", "t": "open-t", "r": "open-r", "b": "open-b"}[k]
        if css[key] != b[k]:
            errs.append(f"--{key} is {css[key]:g} but the picture's alpha gives {b[k]}")
    if not css["aspect"]:
        errs.append(".bezel declares no aspect-ratio")
    for n, d in css["aspect"]:
        if abs(n / d - b["w"] / b["h"]) > 0.001 * (b["w"] / b["h"]):
            errs.append(f".bezel aspect-ratio {n:g}/{d:g} != picture {b['w']}x{b['h']} ({b['w'] / b['h']:.4f})")
    pad = css["open-pad"]
    gw, gh = b["r"] - b["l"] + 2 * pad, b["b"] - b["t"] + 2 * pad
    # rasterise the CSS polygon in picture px (8x supersampled) and compare with the opening
    ss = 8
    img = Image.new("L", (b["w"] * ss, b["h"] * ss), 0)
    ox, oy = b["l"] - pad, b["t"] - pad
    ImageDraw.Draw(img).polygon([((ox + x / 100 * gw) * ss, (oy + y / 100 * gh) * ss) for x, y in css["poly"]], fill=255)
    poly = np.asarray(img.resize((b["w"], b["h"]), Image.BOX)).astype(float) / 255
    op = opening_mask(a).astype(float)
    area_diff = float(np.abs(poly - op).sum())
    edge_len = float((np.hypot(*np.gradient(op))).sum())  # perimeter estimate
    mean_dev = area_diff / max(edge_len, 1)
    # max deviation: distance of any clearly differing pixel to the opening's own edge
    dist_in = ndimage.distance_transform_edt(op > 0.5)
    dist_out = ndimage.distance_transform_edt(op <= 0.5)
    edge_dist = np.where(op > 0.5, dist_in, dist_out)  # px to the nearest pixel of the other side
    wrong = np.abs(poly - op) > 0.5
    max_dev = float(edge_dist[wrong].max()) if wrong.any() else 0.0
    print(f"polygon points {len(css['poly'])}; area diff {area_diff:.0f}px ({area_diff / op.sum() * 100:.4f}% of the opening); "
          f"mean deviation {mean_dev:.3f}px; max deviation {max_dev:.2f}px")
    if max_dev > MAX_DEV_PX:
        errs.append(f"max deviation {max_dev:.2f}px > {MAX_DEV_PX}px")
    if mean_dev > 0.5:
        errs.append(f"mean deviation {mean_dev:.3f}px > 0.5px")
    if errs:
        print("FAIL")
        for e in errs:
            print(" -", e)
        sys.exit(1)
    print("ok")


def cmd_stretch(args):
    im = Image.open(args.src).convert("RGBA")
    a = np.asarray(im).astype(np.float32)
    a[..., :3] *= a[..., 3:4] / 255  # premultiply: no dark/bright fringes at the transparent edges
    w = im.width
    chans = [np.asarray(Image.fromarray(a[..., i], "F").resize((w, args.height), Image.LANCZOS)) for i in range(4)]
    o = np.stack(chans, -1)
    al = np.clip(o[..., 3], 0, 255)
    rgb = np.where(al[..., None] > 0.5, o[..., :3] / np.maximum(al[..., None], 1) * 255, 0)
    out = np.dstack([np.clip(rgb, 0, 255), al]).round().astype(np.uint8)
    Image.fromarray(out, "RGBA").save(args.out, quality=90, alpha_quality=100, method=6)
    print("saved", args.out, w, "x", args.height)


def _ramp(v, a, b):
    return np.clip((v - a) / (b - a), 0, 1)


def cmd_smooth_corners(args):
    """Smooth the two LOWER corners (the opening, the outer silhouette and the visible band widths are not touched; only RGB).

    Two seams were there (#283): (1) the lower inner corners of the recess ("dent") are sharp, because adding the side rims
    overwrote the original rounded corner; the original corner is transplanted from the ORIGINAL main picture (--ref),
    shifted by the rim that was added on each side and by the recess bottom ridge position, blended with a soft mask;
    (2) where the lighter outer side band meets the rounded outer corner there is a hard horizontal step (it is in the
    original picture too); the band is cross-faded into the corner colour over ~18 rows, grain kept.
    """
    cur = np.asarray(Image.open(args.src).convert("RGBA")).astype(np.float32)
    ref = np.asarray(Image.open(args.ref).convert("RGBA")).astype(np.float32)
    H, W = cur.shape[:2]
    Hm, Wm = ref.shape[:2]
    dx = (W - Wm) // 2  # rim added on each side
    ridge_cur, ridge_ref = 82, 78  # px from the bottom edge to the bright ridge line at the recess bottom (cur / ref)
    dy = H - Hm - (ridge_cur - ridge_ref)  # cur y = ref y + dy (bottoms aligned, then the ridge difference)
    yy, xx = np.mgrid[0:H, 0:W]
    sh = ref[np.clip(yy - dy, 0, Hm - 1), np.clip(xx - dx, 0, Wm - 1)]
    ridge = H - ridge_cur
    out = cur.copy()
    for side in "LR":
        d = xx if side == "L" else W - 1 - xx  # distance from this side's outer edge
        m = _ramp(d, 62, 70) * (1 - _ramp(d, 100, 140)) * (1 - _ramp(yy, ridge - 6, ridge + 6)) * _ramp(yy, ridge - 62, ridge - 30)
        m = m * (sh[..., 3] > 200) * (cur[..., 3] > 200)
        # the original recess wall is a little brighter than the re-built one: correct dark recess pixels only
        win = (slice(H - 200, H - 150), slice(90, 130) if side == "L" else slice(W - 130, W - 90))
        off = cur[..., :3][win].mean((0, 1)) - sh[..., :3][win].mean((0, 1))
        lum = ndimage.gaussian_filter(sh[..., :3].mean(2), 3)
        k = np.clip((165 - lum) / 30, 0, 1)[..., None]
        out[..., :3] = out[..., :3] * (1 - m[..., None]) + (sh[..., :3] + off * k) * m[..., None]
    y0 = H - 42  # last row of the straight outer band (the step)
    for side in "LR":
        xs = slice(0, 38) if side == "L" else slice(W - 38, W)
        blk = out[:, xs, :3]
        top, bot = blk[y0 - 6 : y0 - 3].mean(0), blk[y0 + 2 : y0 + 4].mean(0)
        for i, y in enumerate(range(y0 - 3, y0 + 2)):  # drop the bright step line itself
            blk[y] = (1 - (i + 1) / 6) * top + (i + 1) / 6 * bot
        target = blk[y0 + 1 : y0 + 5].mean(0)
        rows = slice(y0 - 30, y0 + 1)
        hf = blk[rows] - ndimage.gaussian_filter(blk[rows], (0, 1.5, 0))
        w = _ramp(np.arange(y0 - 30, y0 + 1), y0 - 18, y0 + 1)
        w = (w * w * (3 - 2 * w))[:, None, None]
        new = (1 - w) * blk[rows] + w * (target[None] + hf)
        vis = out[rows, xs, 3][..., None] > 0
        out[rows, xs, :3] = np.where(vis, new, blk[rows])
    out[..., 3] = cur[..., 3]
    Image.fromarray(np.clip(out, 0, 255).round().astype(np.uint8), "RGBA").save(args.out, quality=90, alpha_quality=100, method=6)
    print("saved", args.out)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    for n, f in (("measure", cmd_measure), ("trace", cmd_trace), ("apply", cmd_apply), ("check", cmd_check)):
        sub.add_parser(n).set_defaults(fn=f)
    s = sub.add_parser("stretch")
    s.add_argument("--src", required=True)
    s.add_argument("--out", required=True)
    s.add_argument("--height", type=int, required=True)
    s.set_defaults(fn=cmd_stretch)
    c = sub.add_parser("smooth-corners")
    c.add_argument("--src", required=True)
    c.add_argument("--ref", required=True, help="the ORIGINAL main picture (git show origin/main:public/ui/bezel_mon.webp)")
    c.add_argument("--out", required=True)
    c.set_defaults(fn=cmd_smooth_corners)
    args = p.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
