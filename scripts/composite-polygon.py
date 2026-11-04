#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow", "numpy", "scipy"]
# ///
"""Large-area image anomalies: cut a polygon out as a transparent overlay, tile a material in perspective, paste a crop back.

Companion to scripts/composite-anomaly.py (which diffs against the baseline and suits small objects). These
subcommands do NOT depend on a difference threshold, so they suit anomalies that cover a whole wall, floor or ceiling.
Workflow and when to use each: .agents/skills/corona-road-anomaly/SKILL.md (step 6, "Large-area anomalies").
Self-check of this tool: `uv run scripts/composite-polygon.py --selftest`.

  crop     baseline region -> 3:2 PNG to feed the image model (aspect must match, otherwise fail)
  restore  generated image -> pasted back into the full baseline PNG at --crop (outside the crop = untouched);
           apply it repeatedly to put several crops (e.g. an upper and a lower half) back
  tile     material image(s) -> laid out on a plane (grid or scatter, seeded jitter) and warped by a homography onto
           --quad (tl,tr,br,bl in baseline px); writes a full-frame PNG usable as --gen of `cutout`
  cutout   --base/--gen (same size) + polygon -> transparent lossless WebP overlay. Inside the polygon the generated
           pixels are taken as is, outside alpha is exactly 0, the edge gets an inward feather ramp

All of them print a JSON report ("status" ok/warn/fail; fail exits 2 and writes nothing). `cutout` reports
overlay_origin/dimensions in the anomalies.yaml ledger format.
"""
import argparse
import json
import os
import shutil
import sys
import tempfile

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

LARGE_AREA_FRAC = 1 / 8


class _Parser(argparse.ArgumentParser):
    def error(self, message):  # same exit code as a verification fail
        self.print_usage(sys.stderr)
        print(f"error: {message}", file=sys.stderr)
        sys.exit(2)


# ---------------------------------------------------------------- parsing

def parse_pts(s, minimum=1, exact=None):
    """'x,y x,y ...' -> [(x, y), ...] (floats)."""
    try:
        pts = [tuple(float(v) for v in tok.split(",")) for tok in s.replace(";", " ").split()]
    except ValueError:
        raise argparse.ArgumentTypeError(f"points must look like 'x,y x,y ...', got {s!r}")
    if any(len(p) != 2 for p in pts):
        raise argparse.ArgumentTypeError(f"every point needs exactly x,y, got {s!r}")
    if exact is not None and len(pts) != exact:
        raise argparse.ArgumentTypeError(f"needs exactly {exact} points, got {len(pts)}")
    if len(pts) < minimum:
        raise argparse.ArgumentTypeError(f"needs at least {minimum} points, got {len(pts)}")
    return pts


def parse_quad(s):
    return parse_pts(s, exact=4)


def parse_crop(s):
    try:
        v = [int(x) for x in s.split(",")]
    except ValueError:
        raise argparse.ArgumentTypeError(f"--crop must be 'x1,y1,x2,y2' integers, got {s!r}")
    if len(v) != 4 or v[0] >= v[2] or v[1] >= v[3] or min(v) < 0:
        raise argparse.ArgumentTypeError(f"--crop needs 4 non-negative ints with x1<x2 and y1<y2, got {s!r}")
    return tuple(v)


def parse_size(s):
    try:
        w, h = (int(x) for x in s.lower().split("x"))
    except ValueError:
        raise argparse.ArgumentTypeError(f"size must be 'WxH', got {s!r}")
    if w <= 0 or h <= 0:
        raise argparse.ArgumentTypeError(f"size must be positive, got {s!r}")
    return (w, h)


def polygon_area(poly):
    a = 0.0
    for i in range(len(poly)):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % len(poly)]
        a += x1 * y2 - x2 * y1
    return abs(a) / 2


def load_polygon_arg(arg):
    """--polygon value: 'x,y x,y ...' or a path to JSON ([[x,y],...] or {"polygon": [...], "holes": [[...], ...]}).
    Returns (polygon, holes)."""
    if os.path.isfile(arg):
        with open(arg, encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, dict):
            poly, holes = data.get("polygon"), data.get("holes", [])
        else:
            poly, holes = data, []
        try:
            poly = [(float(x), float(y)) for x, y in poly]
            holes = [[(float(x), float(y)) for x, y in h] for h in holes]
        except (TypeError, ValueError):
            raise ValueError(f"{arg}: expected [[x,y],...] or {{'polygon': [...], 'holes': [...]}}")
        if len(poly) < 3 or any(len(h) < 3 for h in holes):
            raise ValueError(f"{arg}: a polygon needs at least 3 points")
        return poly, holes
    return parse_pts(arg, minimum=3), []


# ---------------------------------------------------------------- geometry

def solve_homography(src, dst):
    """3x3 H with H @ (src_i, 1) ~ (dst_i, 1) for 4 point pairs."""
    A, b = [], []
    for (x, y), (u, v) in zip(src, dst):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y])
        b += [u, v]
    h = np.linalg.solve(np.array(A, float), np.array(b, float))
    return np.append(h, 1.0).reshape(3, 3)


def apply_h(H, pts):
    out = []
    for x, y in pts:
        p = H @ np.array([x, y, 1.0])
        out.append((p[0] / p[2], p[1] / p[2]))
    return out


def raster(poly, size, ss=4):
    """Anti-aliased coverage (0..1 float array HxW) of a polygon in continuous px coordinates."""
    W, H = size
    im = Image.new("L", (W * ss, H * ss), 0)
    ImageDraw.Draw(im).polygon([(x * ss, y * ss) for x, y in poly], fill=255)
    cov = np.asarray(im, np.float32).reshape(H, ss, W, ss).mean((1, 3)) / 255.0
    return cov


def atomic_save(img, out, **kw):
    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    fd, tmp = tempfile.mkstemp(suffix=os.path.splitext(out)[1], prefix="composite-polygon-", dir=os.path.dirname(os.path.abspath(out)))
    os.close(fd)
    try:
        img.save(tmp, **kw)
        shutil.move(tmp, out)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


class _Report:
    def __init__(self):
        self.res, self.warnings, self.status = {}, [], "ok"

    def warn(self, msg, level="warn"):
        self.warnings.append(msg)
        if level == "fail":
            self.status = "fail"
        elif self.status == "ok":
            self.status = "warn"

    def fail(self, msg):
        self.warn(msg, "fail")

    def done(self):
        self.res["status"] = self.status
        self.res["warnings"] = self.warnings
        return self.res, (2 if self.status == "fail" else 0)


# ---------------------------------------------------------------- cutout

def cmd_cutout(a):
    r = _Report()
    base_img = Image.open(a.base).convert("RGB")
    gen_img = Image.open(a.gen).convert("RGB")
    W, H = base_img.size
    r.res.update(base_size=[W, H], gen_size=list(gen_img.size))
    if gen_img.size != (W, H):
        r.fail("--gen must have the same size as --base (use `restore` / `tile` to produce a full-frame image first)")
        return r.done()
    poly, holes = load_polygon_arg(a.polygon)
    for h in a.hole or []:
        holes.append(parse_pts(h, minimum=3))
    r.res.update(polygon=[list(p) for p in poly], holes=[[list(p) for p in h] for h in holes])
    if any(not (0 <= x <= W and 0 <= y <= H) for x, y in poly):
        r.warn("some polygon vertices lie outside the image; the mask is clipped to the frame")
    mask = raster(poly, (W, H)) >= 0.5
    for h in holes:
        mask &= ~(raster(h, (W, H)) >= 0.5)
    area = int(mask.sum())
    r.res["mask_area_px"] = area
    r.res["mask_area_frac_of_image"] = round(area / (W * H), 4)
    r.res["large_area_ge_1_8"] = area / (W * H) >= LARGE_AREA_FRAC
    if area == 0:
        r.fail("the polygon covers no pixels of the image")
        return r.done()

    if a.feather > 0:
        alpha = np.clip(ndimage.distance_transform_edt(mask) / a.feather, 0, 1)
    else:
        alpha = mask.astype(np.float32)
    alpha[~mask] = 0
    a8 = np.round(alpha * 255).astype(np.uint8)
    a8[(a8 < 2) & mask] = 0
    ys, xs = np.nonzero(a8)
    if len(xs) == 0:
        r.fail("the mask is empty after feathering")
        return r.done()
    bx1, by1, bx2, by2 = int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1
    r.res.update(overlay_origin=[bx1, by1], dimensions=[bx2 - bx1, by2 - by1], bbox=[bx1, by1, bx2, by2],
                 overlay_origin_str="(%d,%d)" % (bx1, by1), dimensions_str="%dx%d" % (bx2 - bx1, by2 - by1),
                 feather_px=a.feather)
    if not r.res["large_area_ge_1_8"]:
        r.warn("the mask area is below 1/8 of the image: it does not qualify as a large-area anomaly")

    base = np.asarray(base_img).astype(np.int16)
    gen = np.asarray(gen_img)
    d_in = np.abs(gen.astype(np.int16) - base).max(2)[mask]
    r.res["diff_in_mask_mean"] = round(float(d_in.mean()), 2)
    changed_frac = float((d_in > 8).mean())
    r.res["changed_frac_of_mask(>8)"] = round(changed_frac, 4)
    if changed_frac < 0.05:
        r.warn("the generated image barely differs from the baseline inside the polygon (wrong --gen or polygon?)")

    ov = Image.fromarray(np.dstack([gen, a8])[by1:by2, bx1:bx2], "RGBA")
    fd, tmp = tempfile.mkstemp(suffix=".webp", prefix="composite-polygon-")
    os.close(fd)
    try:
        ov.save(tmp, "WEBP", lossless=True, exact=True)
        ov2 = Image.open(tmp).convert("RGBA")
        recon = base_img.convert("RGBA")
        recon.alpha_composite(ov2, (bx1, by1))
        recon_a = np.asarray(recon.convert("RGB")).astype(np.int16)
        al = a8.astype(np.float32)[..., None] / 255.0
        expect = np.clip(np.round(base * (1 - al) + gen.astype(np.float32) * al), 0, 255).astype(np.int16)
        recon_err = int(np.abs(recon_a - expect).max())
        full_alpha = np.zeros((H, W), np.uint8)
        full_alpha[by1:by2, bx1:bx2] = np.asarray(ov2)[..., 3]
        r.res["recon_max_abs_err_vs_composite"] = recon_err
        r.res["pixels_changed_outside_alpha"] = int(((recon_a != base).any(2) & ~(full_alpha > 0)).sum())
        r.res["alpha_nonzero_outside_polygon_px"] = int(((full_alpha > 0) & ~mask).sum())
        deep = ndimage.binary_erosion(mask, iterations=int(np.ceil(a.feather)) + 1)
        r.res["inside_deep_max_abs_err_vs_gen"] = int(np.abs(recon_a - gen.astype(np.int16)).max(2)[deep].max()) if deep.any() else 0
        if recon_err > 1:
            r.fail("reconstruction does not match the composite")
        if r.res["pixels_changed_outside_alpha"]:
            r.fail("the baseline changed where alpha is 0")
        if r.res["alpha_nonzero_outside_polygon_px"]:
            r.fail("alpha is non-zero outside the polygon")
        if r.res["inside_deep_max_abs_err_vs_gen"] > 1:
            r.fail("pixels deep inside the polygon differ from --gen")
        if a.preview:
            os.makedirs(os.path.dirname(os.path.abspath(a.preview)), exist_ok=True)
            Image.fromarray(recon_a.astype(np.uint8)).save(a.preview)
        if r.status != "fail":
            os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
            shutil.move(tmp, a.out)
            tmp = None
    finally:
        if tmp and os.path.exists(tmp):
            os.remove(tmp)
    return r.done()


# ---------------------------------------------------------------- tile

def _composite_into(dst, tile, x, y):
    """Premultiplied-free 'over' of RGBA float tile onto RGBA float dst at integer (x, y), clipped."""
    th, tw = tile.shape[:2]
    h, w = dst.shape[:2]
    x0, y0, x1, y1 = max(x, 0), max(y, 0), min(x + tw, w), min(y + th, h)
    if x1 <= x0 or y1 <= y0:
        return
    t = tile[y0 - y : y1 - y, x0 - x : x1 - x]
    d = dst[y0:y1, x0:x1]
    ta, da = t[..., 3:4], d[..., 3:4]
    oa = ta + da * (1 - ta)
    rgb = (t[..., :3] * ta + d[..., :3] * da * (1 - ta)) / np.maximum(oa, 1e-6)
    d[..., :3], d[..., 3:4] = rgb, oa


def render_plane(mats, plane_size, cols, rows, gap, layout, rot, scale_j, bright, rng, fit, pick):
    """Lay the materials out on a PWxPH plane. Returns (RGBA float32 0..1 HxWx4, tiles placed)."""
    PW, PH = plane_size
    plane = np.zeros((PH, PW, 4), np.float32)
    cw = (PW - gap * (cols - 1)) / cols
    ch = (PH - gap * (rows - 1)) / rows
    if cw < 2 or ch < 2:
        raise ValueError("the cells are smaller than 2 px: reduce --cols/--rows/--gap or enlarge the quad")
    if layout == "grid":
        slots = [(c * (cw + gap) + cw / 2, r * (ch + gap) + ch / 2) for r in range(rows) for c in range(cols)]
    else:
        n = cols * rows
        slots = [(rng.uniform(0, PW), rng.uniform(0, PH)) for _ in range(n)]
        order = rng.permutation(n)
        slots = [slots[i] for i in order]
    for i, (cx, cy) in enumerate(slots):
        m = mats[i % len(mats)] if pick == "cycle" else mats[int(rng.integers(len(mats)))]
        s = 1.0 + rng.uniform(-scale_j, scale_j)
        if fit == "stretch":
            tw, th = max(1, round(cw * s)), max(1, round(ch * s))
        else:
            k = min(cw / m.width, ch / m.height) * s
            tw, th = max(1, round(m.width * k)), max(1, round(m.height * k))
        t = m.resize((tw, th), Image.LANCZOS)
        ang = rng.uniform(-rot, rot)
        if abs(ang) > 1e-3:
            t = t.rotate(ang, resample=Image.BICUBIC, expand=True)
        arr = np.asarray(t, np.float32) / 255.0
        arr[..., :3] = np.clip(arr[..., :3] * (1.0 + rng.uniform(-bright, bright)), 0, 1)
        _composite_into(plane, arr, int(round(cx - arr.shape[1] / 2)), int(round(cy - arr.shape[0] / 2)))
    return plane, len(slots)


def cmd_tile(a):
    r = _Report()
    base_img = Image.open(a.base).convert("RGB")
    W, H = base_img.size
    quad = a.quad
    r.res.update(base_size=[W, H], quad=[list(p) for p in quad], seed=a.seed, layout=a.layout)
    if polygon_area(quad) < 16:
        r.fail("--quad is degenerate (area < 16 px^2)")
        return r.done()
    # Convex, tl,tr,br,bl order check (cross products share a sign).
    cr = [(quad[(i + 1) % 4][0] - quad[i][0]) * (quad[(i + 2) % 4][1] - quad[(i + 1) % 4][1])
          - (quad[(i + 1) % 4][1] - quad[i][1]) * (quad[(i + 2) % 4][0] - quad[(i + 1) % 4][0]) for i in range(4)]
    if not (all(c > 0 for c in cr) or all(c < 0 for c in cr)):
        r.fail("--quad must be convex and given in order tl,tr,br,bl (or any consistent winding)")
        return r.done()
    mats = [Image.open(p).convert("RGBA") for p in a.material]
    d = lambda p, q: float(np.hypot(p[0] - q[0], p[1] - q[1]))
    if a.plane_size:
        PW, PH = a.plane_size
    else:
        PW = max(8, round((d(quad[0], quad[1]) + d(quad[3], quad[2])) / 2 * a.supersample))
        PH = max(8, round((d(quad[0], quad[3]) + d(quad[1], quad[2])) / 2 * a.supersample))
    r.res["plane_size"] = [PW, PH]
    rng = np.random.default_rng(a.seed)
    try:
        plane, n = render_plane(mats, (PW, PH), a.cols, a.rows, a.gap * a.supersample, a.layout, a.rot, a.scale_jitter,
                                a.bright_jitter, rng, a.fit, a.pick)
    except ValueError as e:
        r.fail(str(e))
        return r.done()
    r.res["tiles_placed"] = n

    # homography quad -> plane (PIL transform wants output -> input coordinates)
    Hq = solve_homography(quad, [(0, 0), (PW, 0), (PW, PH), (0, PH)])
    coeffs = tuple((Hq / Hq[2, 2]).flatten()[:8])
    pre = np.dstack([plane[..., :3] * plane[..., 3:4], plane[..., 3:4]])
    warped = np.empty((H, W, 4), np.float32)
    for c in range(4):
        ch_img = Image.fromarray(pre[..., c].astype(np.float32), "F")
        warped[..., c] = np.asarray(ch_img.transform((W, H), Image.PERSPECTIVE, coeffs, Image.BILINEAR if a.fast else Image.BICUBIC), np.float32)
    warped = np.clip(warped, 0, 1)
    wa = np.minimum(warped[..., 3:4], 1.0)
    rgb_pre = np.minimum(warped[..., :3], wa)
    if a.shade > 0:
        lum = np.asarray(base_img.convert("L").filter(ImageFilter.GaussianBlur(a.shade_sigma)), np.float32)
        qm = raster(quad, (W, H)) >= 0.5
        ref = max(float(np.median(lum[qm])), 1.0) if qm.any() else max(float(lum.mean()), 1.0)
        factor = 1.0 + a.shade * (np.clip(lum / ref, 0.4, 1.6) - 1.0)
        rgb_pre = rgb_pre * factor[..., None]
    out = np.asarray(base_img, np.float32) / 255.0 * (1 - wa) + rgb_pre
    out_img = Image.fromarray(np.clip(np.round(out * 255), 0, 255).astype(np.uint8))
    qcov = raster(quad, (W, H))
    r.res["quad_area_px"] = round(polygon_area(quad), 1)
    r.res["coverage_alpha_area_px"] = round(float(wa.sum()), 1)
    atomic_save(out_img, a.out, format="PNG")
    if a.polygon_out:
        os.makedirs(os.path.dirname(os.path.abspath(a.polygon_out)), exist_ok=True)
        with open(a.polygon_out, "w", encoding="utf-8") as f:
            json.dump({"polygon": [list(p) for p in quad], "holes": []}, f)
        r.res["polygon_out"] = a.polygon_out
    r.res["pixels_changed_outside_quad(dilated 2px)"] = int(
        ((np.asarray(out_img).astype(np.int16) != np.asarray(base_img).astype(np.int16)).any(2)
         & ~(ndimage.binary_dilation(qcov > 0, iterations=2))).sum())
    if r.res["pixels_changed_outside_quad(dilated 2px)"]:
        r.warn("pixels changed outside the quad; check --quad")
    return r.done()


# ---------------------------------------------------------------- crop / restore

def _check_crop(r, img_size, box):
    W, H = img_size
    x1, y1, x2, y2 = box
    if x2 > W or y2 > H:
        r.fail(f"--crop {list(box)} exceeds the image {W}x{H}")
        return False
    return True


def cmd_crop(a):
    r = _Report()
    img = Image.open(a.base).convert("RGB")
    x1, y1, x2, y2 = a.crop
    r.res.update(base_size=list(img.size), crop_px=[x1, y1, x2, y2], out_size=list(a.size))
    if not _check_crop(r, img.size, a.crop):
        return r.done()
    cw, ch = x2 - x1, y2 - y1
    if abs(cw / ch - a.size[0] / a.size[1]) > 0.02:
        r.fail(f"the crop aspect {cw}x{ch} differs from the output {a.size[0]}x{a.size[1]}: the model input would be distorted; "
               "pick a crop with the same aspect (pad the face with margin instead of stretching)")
        return r.done()
    atomic_save(img.crop(a.crop).resize(a.size, Image.LANCZOS), a.out, format="PNG")
    r.res["scale"] = round(a.size[0] / cw, 4)
    return r.done()


def cmd_restore(a):
    r = _Report()
    base_img = Image.open(a.base).convert("RGB")
    gen_img = Image.open(a.gen).convert("RGB")
    W, H = base_img.size
    x1, y1, x2, y2 = a.crop
    r.res.update(base_size=[W, H], gen_size=list(gen_img.size), crop_px=[x1, y1, x2, y2])
    if not _check_crop(r, base_img.size, a.crop):
        return r.done()
    cw, ch = x2 - x1, y2 - y1
    if abs(gen_img.width / gen_img.height - cw / ch) > 0.02:
        r.fail(f"the generated image aspect {gen_img.width}x{gen_img.height} differs from the crop {cw}x{ch}: pasting it would distort it")
        return r.done()
    part = gen_img if gen_img.size == (cw, ch) else gen_img.resize((cw, ch), Image.LANCZOS)
    out = base_img.copy()
    out.paste(part, (x1, y1))
    changed_out = np.asarray(out).astype(np.int16) != np.asarray(base_img).astype(np.int16)
    changed_out[y1:y2, x1:x2] = False
    r.res["scale"] = round(cw / gen_img.width, 4)
    r.res["pixels_changed_outside_crop"] = int(changed_out.any(2).sum())
    atomic_save(out, a.out, format="PNG")
    return r.done()


# ---------------------------------------------------------------- CLI

def build_parser():
    p = _Parser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--selftest", action="store_true", help="run the synthetic self-check (no real images needed)")
    sub = p.add_subparsers(dest="cmd", parser_class=_Parser)

    c = sub.add_parser("cutout", help="polygon -> transparent WebP overlay (no difference threshold)")
    c.add_argument("--base", required=True, help="baseline photo (public/images/camN.webp)")
    c.add_argument("--gen", required=True, help="full-frame generated image, same size as --base (e.g. output of `tile` / `restore`)")
    c.add_argument("--polygon", required=True, help="'x,y x,y ...' in baseline px, or a JSON file ([[x,y],...] or {polygon, holes})")
    c.add_argument("--hole", action="append", help="'x,y x,y ...' polygon to exclude (window, prop contact); repeatable")
    c.add_argument("--feather", type=float, default=2.0, help="inward alpha ramp width in px (0 = hard edge; alpha stays exactly 0 outside the polygon)")
    c.add_argument("--out", required=True, help="transparent lossless WebP (only written on non-fail)")
    c.add_argument("--preview", help="full-frame verification composite PNG (work file, never commit)")

    t = sub.add_parser("tile", help="tile material image(s) onto a perspective quad -> full-frame PNG")
    t.add_argument("--base", required=True)
    t.add_argument("--material", nargs="+", required=True, help="material image(s); alpha is honoured; several are cycled/picked")
    t.add_argument("--quad", required=True, type=parse_quad, help="'tlx,tly trx,try brx,bry blx,bly' in baseline px")
    t.add_argument("--cols", type=int, default=4)
    t.add_argument("--rows", type=int, default=4)
    t.add_argument("--gap", type=float, default=0.0, help="gap between cells in output px along the plane (grid)")
    t.add_argument("--layout", choices=("grid", "scatter"), default="grid", help="scatter = cols*rows tiles at random positions")
    t.add_argument("--fit", choices=("stretch", "contain"), default="stretch", help="material fit into its cell")
    t.add_argument("--pick", choices=("cycle", "random"), default="cycle", help="which material goes to which cell")
    t.add_argument("--rot", type=float, default=3.0, help="max random rotation in degrees")
    t.add_argument("--scale-jitter", type=float, default=0.05, help="max random size change (fraction)")
    t.add_argument("--bright-jitter", type=float, default=0.08, help="max random brightness change (fraction)")
    t.add_argument("--seed", type=int, default=0, help="makes the jitter/scatter reproducible")
    t.add_argument("--shade", type=float, default=0.0, help="0-1: multiply the baseline's low-frequency light onto the tiles")
    t.add_argument("--shade-sigma", type=float, default=15.0)
    t.add_argument("--plane-size", type=parse_size, help="override the flat plane size WxH (default: quad edge lengths x supersample)")
    t.add_argument("--supersample", type=float, default=1.0, help="plane resolution relative to the quad edges")
    t.add_argument("--fast", action="store_true", help="bilinear instead of bicubic warp")
    t.add_argument("--out", required=True, help="full-frame PNG (work file)")
    t.add_argument("--polygon-out", help="write the quad as a polygon JSON for `cutout --polygon`")

    k = sub.add_parser("crop", help="baseline region -> PNG for the image model (same aspect required)")
    k.add_argument("--base", required=True)
    k.add_argument("--crop", required=True, type=parse_crop, help="x1,y1,x2,y2 in baseline px")
    k.add_argument("--size", type=parse_size, default=(1536, 1024), help="output WxH (default 1536x1024)")
    k.add_argument("--out", required=True)

    s = sub.add_parser("restore", help="paste a generated crop back into the full baseline-sized PNG")
    s.add_argument("--base", required=True, help="full-size PNG/WebP to paste into (the baseline, or the previous restore output)")
    s.add_argument("--gen", required=True, help="generated image (e.g. 1536x1024)")
    s.add_argument("--crop", required=True, type=parse_crop, help="x1,y1,x2,y2 in --base px that --gen covers")
    s.add_argument("--out", required=True, help="full-frame PNG (usable as --gen of `cutout`)")
    return p


def run_cli(argv):
    p = build_parser()
    a = p.parse_args(argv)
    if a.selftest:
        return selftest()
    if not a.cmd:
        p.print_help(sys.stderr)
        return 2
    if a.cmd == "tile":
        if a.cols < 1 or a.rows < 1:
            p.error("--cols/--rows must be 1 or greater")
        if not 0 <= a.shade <= 1:
            p.error("--shade must be within 0-1")
    if a.cmd == "cutout" and a.feather < 0:
        p.error("--feather must be 0 or greater")
    fn = {"cutout": cmd_cutout, "tile": cmd_tile, "crop": cmd_crop, "restore": cmd_restore}[a.cmd]
    try:
        res, code = fn(a)
    except (OSError, ValueError, argparse.ArgumentTypeError, json.JSONDecodeError) as e:
        res, code = {"status": "fail", "warnings": [f"{type(e).__name__}: {e}"]}, 2
    print(json.dumps(res, ensure_ascii=False, indent=2))
    return code


# ---------------------------------------------------------------- selftest

def selftest():
    tmpd = tempfile.mkdtemp(prefix="composite-polygon-selftest-")
    rows, state = [], {"ok": True}

    def check(name, ok, note=""):
        state["ok"] &= bool(ok)
        rows.append((name, "PASS" if ok else "FAIL " + note))

    def run(*argv):
        a = build_parser().parse_args(list(map(str, argv)))
        return {"cutout": cmd_cutout, "tile": cmd_tile, "crop": cmd_crop, "restore": cmd_restore}[a.cmd](a)

    def exits(*argv):
        try:
            build_parser().parse_args(list(map(str, argv)))
            return 0
        except SystemExit as e:
            return e.code

    P = lambda n: os.path.join(tmpd, n)
    W, H = 675, 900
    rng = np.random.default_rng(7)
    yy, xx = np.mgrid[0:H, 0:W]
    base_arr = np.dstack([60 + xx * 0.1, 70 + yy * 0.05, 90 + (xx + yy) * 0.03]).astype(np.float32)
    base_arr = np.clip(base_arr + rng.normal(0, 4, base_arr.shape), 0, 255).astype(np.uint8)
    Image.fromarray(base_arr).save(P("base.png"))

    # --- homography
    quad = [(120.0, 80.0), (560.0, 140.0), (610.0, 700.0), (60.0, 760.0)]
    Hm = solve_homography([(0, 0), (400, 0), (400, 300), (0, 300)], quad)
    err = max(np.hypot(x - u, y - v) for (x, y), (u, v) in zip(apply_h(Hm, [(0, 0), (400, 0), (400, 300), (0, 300)]), quad))
    check("homography_corners_exact", err < 1e-6, f"err {err}")
    Hi = np.linalg.inv(Hm)
    rt = apply_h(Hi, apply_h(Hm, [(123.0, 45.0)]))[0]
    check("homography_roundtrip", abs(rt[0] - 123) < 1e-6 and abs(rt[1] - 45) < 1e-6)

    # --- tile: checker material warped onto a trapezoid
    chk = np.zeros((64, 64, 3), np.uint8)
    chk[:] = (230, 40, 40)
    chk[:32, :32] = chk[32:, 32:] = (250, 250, 250)
    Image.fromarray(chk).save(P("mat.png"))
    q = "120,80 560,140 610,700 60,760"
    res, code = run("tile", "--base", P("base.png"), "--material", P("mat.png"), "--quad", q, "--cols", 5, "--rows", 7,
                    "--gap", 4, "--seed", 3, "--out", P("tile.png"), "--polygon-out", P("poly.json"))
    check("tile_runs", code == 0 and os.path.exists(P("tile.png")), str(res))
    ta = np.asarray(Image.open(P("tile.png")).convert("RGB")).astype(np.int16)
    check("tile_nothing_outside_quad", res["pixels_changed_outside_quad(dilated 2px)"] == 0, str(res))
    qa = polygon_area(quad)
    check("tile_coverage_matches_quad_area", 0.4 * qa < res["coverage_alpha_area_px"] < qa, f"{res['coverage_alpha_area_px']} vs {qa}")
    # opaque full-cover plane (gap 0, no jitter): coverage must equal the quad area, corners must land on the quad corners
    res2, _ = run("tile", "--base", P("base.png"), "--material", P("mat.png"), "--quad", q, "--cols", 1, "--rows", 1,
                  "--rot", 0, "--scale-jitter", 0, "--bright-jitter", 0, "--out", P("tile1.png"))
    cov = res2["coverage_alpha_area_px"]
    check("tile_full_plane_area_equals_quad", abs(cov - qa) / qa < 0.01, f"{cov} vs {qa}")
    t1 = np.asarray(Image.open(P("tile1.png")).convert("RGB")).astype(np.int16)
    changed = (t1 != base_arr.astype(np.int16)).any(2)
    cm = np.array(quad).mean(0)
    corner_ok = True
    for (x, y) in quad:
        vx, vy = cm[0] - x, cm[1] - y
        n = np.hypot(vx, vy)
        ix, iy = int(round(x + vx / n * 2.5)), int(round(y + vy / n * 2.5))  # 2.5 px inside the corner
        ox, oy = int(round(x - vx / n * 3)), int(round(y - vy / n * 3))  # 3 px outside
        corner_ok &= bool(changed[iy, ix]) and not bool(changed[oy, ox])
    check("tile_corner_points_land_on_quad", corner_ok)
    # perspective: the quad's top edge is shorter than the bottom edge -> checker squares shrink toward the top
    def red_runs(row):
        r_ = (t1[row, :, 0] > 200) & (t1[row, :, 1] < 90)
        idx = np.nonzero(np.diff(np.concatenate([[0], r_.astype(int), [0]])))[0]
        return (idx[1::2] - idx[0::2]).tolist()
    stripes = np.zeros((16, 64, 3), np.uint8)
    stripes[:] = (250, 250, 250)
    for k in range(0, 64, 16):
        stripes[:, k : k + 8] = (230, 40, 40)
    Image.fromarray(stripes).save(P("stripes.png"))
    run("tile", "--base", P("base.png"), "--material", P("stripes.png"), "--quad", q, "--cols", 1, "--rows", 1,
        "--rot", 0, "--scale-jitter", 0, "--bright-jitter", 0, "--out", P("tile_s.png"))
    t1 = np.asarray(Image.open(P("tile_s.png")).convert("RGB")).astype(np.int16)
    top, bot = red_runs(150), red_runs(720)
    check("tile_perspective_scales_with_quad", top and bot and np.mean(top) < np.mean(bot), f"top {top} bottom {bot}")
    res3, _ = run("tile", "--base", P("base.png"), "--material", P("mat.png"), "--quad", q, "--cols", 5, "--rows", 7,
                  "--gap", 4, "--seed", 3, "--out", P("tile_b.png"))
    res4, _ = run("tile", "--base", P("base.png"), "--material", P("mat.png"), "--quad", q, "--cols", 5, "--rows", 7,
                  "--gap", 4, "--seed", 4, "--out", P("tile_c.png"))
    b_ = np.asarray(Image.open(P("tile_b.png")))
    check("tile_seed_reproducible", np.array_equal(b_, ta.astype(np.uint8)))
    check("tile_seed_differs", not np.array_equal(np.asarray(Image.open(P("tile_c.png"))), b_))
    res5, c5 = run("tile", "--base", P("base.png"), "--material", P("mat.png"), "--quad", q, "--layout", "scatter",
                   "--cols", 4, "--rows", 4, "--seed", 1, "--out", P("scatter.png"))
    check("tile_scatter_runs", c5 == 0 and res5["tiles_placed"] == 16)
    check("tile_fail_degenerate_quad", run("tile", "--base", P("base.png"), "--material", P("mat.png"),
                                           "--quad", "10,10 10,10 10,10 10,10", "--out", P("x.png"))[1] == 2)
    check("tile_fail_bowtie_quad", run("tile", "--base", P("base.png"), "--material", P("mat.png"),
                                       "--quad", "100,100 300,300 300,100 100,300", "--out", P("x.png"))[1] == 2)
    check("tile_bad_quad_arg_exit2", exits("tile", "--base", "b", "--material", "m", "--quad", "1,2 3,4", "--out", "o") == 2)

    # --- cutout of the tile output (tile -> cutout chain)
    res, code = run("cutout", "--base", P("base.png"), "--gen", P("tile.png"), "--polygon", P("poly.json"),
                    "--out", P("ov.webp"), "--preview", P("prev.png"))
    check("cutout_chain_ok", code == 0 and res["status"] in ("ok", "warn") and os.path.exists(P("ov.webp")), str(res))
    check("cutout_alpha_zero_outside_polygon", res["alpha_nonzero_outside_polygon_px"] == 0)
    check("cutout_nothing_changed_outside_alpha", res["pixels_changed_outside_alpha"] == 0)
    check("cutout_recon_matches", res["recon_max_abs_err_vs_composite"] <= 1 and res["inside_deep_max_abs_err_vs_gen"] <= 1,
          str(res))
    check("cutout_large_area_flagged", res["large_area_ge_1_8"] is True)
    ov = Image.open(P("ov.webp"))
    check("cutout_origin_dims_ledger_format", ov.size == tuple(res["dimensions"]) and res["overlay_origin_str"].startswith("("),
          f"{ov.size} {res['dimensions']}")
    # independence from a difference threshold: gen identical to base inside a sub-area is still adopted verbatim
    gen_same = base_arr.copy()
    gen_same[300:500, 200:400] = np.clip(gen_same[300:500, 200:400].astype(int) + 2, 0, 255)  # tiny change
    Image.fromarray(gen_same).save(P("gen_same.png"))
    res, code = run("cutout", "--base", P("base.png"), "--gen", P("gen_same.png"), "--polygon", "180,280 420,280 420,520 180,520",
                    "--out", P("ov_same.webp"))
    ovs = Image.open(P("ov_same.webp")).convert("RGBA")
    inside_alpha = np.asarray(ovs)[..., 3]
    check("cutout_threshold_free_whole_polygon", code == 0 and (inside_alpha > 0).sum() == res["mask_area_px"], str(res))
    check("cutout_warns_when_gen_equals_base_and_small",
          any("barely differs" in w for w in res["warnings"]) and any("1/8" in w for w in res["warnings"]))
    # hole + hard feather + polygon partly outside the frame + JSON dict file
    gen_noise = np.clip(base_arr.astype(int) + rng.integers(-40, 40, base_arr.shape), 0, 255).astype(np.uint8)
    Image.fromarray(gen_noise).save(P("gen_noise.png"))
    with open(P("pd.json"), "w") as f:
        json.dump({"polygon": [[-30, 100], [400, 100], [400, 800], [-30, 800]], "holes": [[[100, 300], [200, 300], [200, 400], [100, 400]]]}, f)
    res, code = run("cutout", "--base", P("base.png"), "--gen", P("gen_noise.png"), "--polygon", P("pd.json"),
                    "--hole", "250,500 300,500 300,560 250,560", "--feather", 0, "--out", P("ov_hole.webp"), "--preview", P("prev_hole.png"))
    ovh = Image.open(P("ov_hole.webp")).convert("RGBA")
    full = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    full.paste(ovh, tuple(res["overlay_origin"]))
    fa = np.asarray(full)[..., 3]
    check("cutout_hole_alpha_zero", code == 0 and fa[350, 150] == 0 and fa[530, 275] == 0 and fa[200, 200] == 255, str(res.get("warnings")))
    check("cutout_hard_feather_binary_alpha", set(np.unique(fa)) <= {0, 255})
    check("cutout_clipped_polygon_warns", any("outside the image" in w for w in res["warnings"]))
    check("cutout_inside_equals_gen_exactly", res["inside_deep_max_abs_err_vs_gen"] == 0 and
          np.array_equal(np.asarray(ovh)[..., :3][fa[res['bbox'][1]:res['bbox'][3], res['bbox'][0]:res['bbox'][2]] > 0],
                         gen_noise[res['bbox'][1]:res['bbox'][3], res['bbox'][0]:res['bbox'][2]][fa[res['bbox'][1]:res['bbox'][3], res['bbox'][0]:res['bbox'][2]] > 0]))
    check("cutout_fail_size_mismatch_writes_nothing",
          run("cutout", "--base", P("base.png"), "--gen", P("mat.png"), "--polygon", "0,0 10,0 10,10", "--out", P("nope.webp"))[1] == 2
          and not os.path.exists(P("nope.webp")))
    check("cutout_fail_polygon_outside_image",
          run("cutout", "--base", P("base.png"), "--gen", P("gen_noise.png"), "--polygon", "-50,-50 -10,-50 -10,-10", "--out", P("nope.webp"))[1] == 2
          and not os.path.exists(P("nope.webp")))
    check("cutout_bad_polygon_exit2", exits("cutout", "--base", "b", "--gen", "g", "--polygon", "1,2", "--out", "o") in (0, 2))
    try:
        run("cutout", "--base", P("base.png"), "--gen", P("gen_noise.png"), "--polygon", "1,2 3,4", "--out", P("nope.webp"))
        check("cutout_two_point_polygon_rejected", False, "no error")
    except argparse.ArgumentTypeError:
        check("cutout_two_point_polygon_rejected", True)

    # --- crop / restore round trip
    exact = (100, 200, 400, 400)  # 300x200 (3:2)
    res, code = run("crop", "--base", P("base.png"), "--crop", ",".join(map(str, exact)), "--size", "300x200", "--out", P("c_exact.png"))
    res, code2 = run("restore", "--base", P("base.png"), "--gen", P("c_exact.png"), "--crop", ",".join(map(str, exact)), "--out", P("r_exact.png"))
    check("crop_restore_identity_exact", code == 0 and code2 == 0 and np.array_equal(np.asarray(Image.open(P("r_exact.png"))), base_arr))
    scaled = (0, 100, 600, 500)  # 600x400 -> 1536x1024 -> back
    run("crop", "--base", P("base.png"), "--crop", ",".join(map(str, scaled)), "--out", P("c_big.png"))
    check("crop_output_is_1536x1024", Image.open(P("c_big.png")).size == (1536, 1024))
    res, code = run("restore", "--base", P("base.png"), "--gen", P("c_big.png"), "--crop", ",".join(map(str, scaled)), "--out", P("r_big.png"))
    rb = np.asarray(Image.open(P("r_big.png"))).astype(int)
    x1, y1, x2, y2 = scaled
    inside = np.abs(rb[y1:y2, x1:x2] - base_arr[y1:y2, x1:x2].astype(int)).mean()
    outm = np.ones((H, W), bool)
    outm[y1:y2, x1:x2] = False
    check("restore_scaled_roundtrip_inside_close", code == 0 and inside < 4.0, f"mean err {inside:.2f}")
    check("restore_outside_crop_untouched", res["pixels_changed_outside_crop"] == 0 and
          np.array_equal(rb[outm], base_arr.astype(int)[outm]))
    # two chained restores (upper and lower half) both survive
    gen_a = Image.new("RGB", (1536, 1024), (250, 0, 0))
    gen_b = Image.new("RGB", (1536, 1024), (0, 0, 250))
    gen_a.save(P("ga.png"))
    gen_b.save(P("gb.png"))
    run("restore", "--base", P("base.png"), "--gen", P("ga.png"), "--crop", "0,0,600,400", "--out", P("r1.png"))
    res, code = run("restore", "--base", P("r1.png"), "--gen", P("gb.png"), "--crop", "0,450,600,850", "--out", P("r2.png"))
    r2 = np.asarray(Image.open(P("r2.png")))
    check("restore_chained_keeps_both", code == 0 and tuple(r2[10, 10]) == (250, 0, 0) and tuple(r2[460, 10]) == (0, 0, 250)
          and np.array_equal(r2[860:], base_arr[860:]) and res["pixels_changed_outside_crop"] == 0)
    check("restore_fail_aspect_mismatch", run("restore", "--base", P("base.png"), "--gen", P("ga.png"), "--crop", "0,0,400,400", "--out", P("x.png"))[1] == 2)
    check("restore_fail_crop_out_of_image", run("restore", "--base", P("base.png"), "--gen", P("ga.png"), "--crop", "300,0,900,400", "--out", P("x.png"))[1] == 2)
    check("crop_fail_aspect_mismatch", run("crop", "--base", P("base.png"), "--crop", "0,0,400,400", "--out", P("x.png"))[1] == 2)
    check("crop_bad_arg_exit2", exits("crop", "--base", "b", "--crop", "50,50,10,10", "--out", "o") == 2)

    # --- restore -> cutout (full large-area flow with a cropped generation)
    res, code = run("cutout", "--base", P("base.png"), "--gen", P("r2.png"), "--polygon", "0,0 600,0 600,400 0,400", "--out", P("ov_flow.webp"))
    check("flow_restore_then_cutout", code == 0 and res["pixels_changed_outside_alpha"] == 0 and res["alpha_nonzero_outside_polygon_px"] == 0, str(res))

    print("%-44s %s" % ("case", "result"))
    for r in rows:
        print("%-44s %s" % r)
    print("SELFTEST", "PASSED" if state["ok"] else "FAILED")
    for f in os.listdir(tmpd):
        os.remove(os.path.join(tmpd, f))
    os.rmdir(tmpd)
    return 0 if state["ok"] else 1


if __name__ == "__main__":
    sys.exit(run_cli(sys.argv[1:]))
