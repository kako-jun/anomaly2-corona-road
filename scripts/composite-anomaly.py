#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow", "numpy", "scipy"]
# ///
"""Cut a transparent WebP overlay out of a generated image, using the baseline photo as the ground truth.

Usage and the surrounding workflow: .agents/skills/corona-road-anomaly/SKILL.md (steps 6-8).
Self-check of this tool: `uv run scripts/composite-anomaly.py --selftest`.

The baseline is authoritative. Inside --box (baseline px) only the pixels that differ from the
generated image become the overlay, as an irregular mask with a feathered, semi-transparent edge.
Outside the mask the overlay alpha is exactly 0 (the baseline is untouched). The script prints a JSON
verification report; status "fail" exits with code 2 and writes nothing to --out.
"""
import argparse
import json
import math
import os
import re
import sys
import shutil
import tempfile

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ALIGN_MAX_PX = 12


MIN_OUTSIDE_FRAC = 0.05  # below this share of valid pixels outside the box, alignment/tone matching are unreliable
MIN_OUTSIDE_PX = 2000


def parse_box(s):
    try:
        v = [int(x) for x in s.split(",")]
    except ValueError:
        raise argparse.ArgumentTypeError(f"--box must be 'x1,y1,x2,y2' integers, got {s!r}")
    if len(v) != 4:
        raise argparse.ArgumentTypeError(f"--box needs exactly 4 values, got {len(v)}")
    if v[0] >= v[2] or v[1] >= v[3]:
        raise argparse.ArgumentTypeError(f"--box needs x1<x2 and y1<y2, got {s!r}")
    if min(v) < 0:
        raise argparse.ArgumentTypeError(f"--box must not be negative, got {s!r}")
    return tuple(v)


INVENTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "prompts", "camera-element-inventory.md")
DEFAULT_MARGIN = 8
_ID_RE = re.compile(r"^CAM(\d{2})-E(\d{2})$")
_HEAD_RE = re.compile(r"^##\s+CAM\s*(\d+)\b.*?\(`?(cam\d+\.webp)`?\s*,\s*(\d+)\s*[×x]\s*(\d+)\)")
_NUM = r"(\d+(?:\.\d+)?)"
_RECT_RE = re.compile(r"`?\(\s*" + _NUM + r"\s*,\s*" + _NUM + r"\s*\)\s*[–—~-]+\s*\(\s*" + _NUM + r"\s*,\s*" + _NUM + r"\s*\)`?")


def parse_inventory(path=INVENTORY):
    """Parse the element inventory. Returns {cam_no: {"file", "size", "elements": {id: {"rect": (x1,y1,x2,y2), "desc"}}}}.
    Raises ValueError for a row whose rectangle cannot be parsed or is degenerate."""
    cams, cur = {}, None
    with open(path, encoding="utf-8") as f:
        for ln, line in enumerate(f, 1):
            line = line.rstrip("\n")
            m = _HEAD_RE.match(line)
            if m:
                cur = int(m.group(1))
                cams[cur] = {"file": m.group(2), "size": (int(m.group(3)), int(m.group(4))), "elements": {}}
                continue
            if line.startswith("## "):
                cur = None
                continue
            cells = [c.strip() for c in line.strip().strip("|").split("|")] if line.lstrip().startswith("|") else []
            idc = next((c for c in cells[:3] if _ID_RE.match(c)), None)
            if idc is None:
                continue
            i = cells.index(idc)
            cam = int(_ID_RE.match(idc).group(1))
            if cur is None or cam != cur:
                raise ValueError(f"inventory line {ln}: {idc} is outside its CAM {cam:02d} section")
            rm = _RECT_RE.fullmatch(cells[i + 1]) if i + 1 < len(cells) else None
            if not rm:
                raise ValueError(f"inventory line {ln}: cannot parse the rectangle of {idc}: {cells[i + 1:i + 2]}")
            x1, y1, x2, y2 = (float(v) for v in rm.groups())
            if not (0 <= x1 < x2 <= 1000 and 0 <= y1 < y2 <= 1000):
                raise ValueError(f"inventory line {ln}: {idc} rectangle {rm.group(0)} is degenerate or outside 0-1000")
            if idc in cams[cur]["elements"]:
                raise ValueError(f"inventory line {ln}: duplicate id {idc}")
            cams[cur]["elements"][idc] = {"rect": (x1, y1, x2, y2), "desc": " ".join(cells[i + 2:]).strip()}
    return cams


def norm_to_px(rect, size, margin=0):
    """Normalized 0-1000 rect -> baseline px, outward-rounded, widened by margin and clamped to the image."""
    W, H = size
    x1, y1, x2, y2 = rect
    px = (math.floor(x1 * W / 1000) - margin, math.floor(y1 * H / 1000) - margin,
          math.ceil(x2 * W / 1000) + margin, math.ceil(y2 * H / 1000) + margin)
    return (max(0, px[0]), max(0, px[1]), min(W, px[2]), min(H, px[3]))


def lookup_element(eid, base_path, margin, inv_path=INVENTORY):
    """Resolve an element id against the inventory and the actual baseline. Returns (box_px, info). Raises ValueError."""
    m = _ID_RE.match(eid or "")
    if not m:
        raise ValueError(f"--element must look like CAM01-E12, got {eid!r}")
    cam = int(m.group(1))
    inv = parse_inventory(inv_path)
    if cam not in inv:
        raise ValueError(f"camera CAM{cam:02d} is not in the inventory")
    c = inv[cam]
    if eid not in c["elements"]:
        raise ValueError(f"unknown element {eid}; try --list-elements CAM{cam:02d}")
    if os.path.basename(base_path) != c["file"]:
        raise ValueError(f"{eid} belongs to {c['file']} but --base is {os.path.basename(base_path)}")
    size = Image.open(base_path).size
    if size != c["size"]:
        raise ValueError(f"baseline is {size[0]}x{size[1]} but the inventory says {c['size'][0]}x{c['size'][1]} for {c['file']}")
    e = c["elements"][eid]
    box = norm_to_px(e["rect"], size, margin)
    info = {"element_id": eid, "element_description": e["desc"], "element_rect_1000": list(e["rect"]),
            "margin_px": margin, "box_source": "element", "box_px_used": list(box)}
    return box, info


def list_elements(cam_arg, images_dir=None):
    m = re.fullmatch(r"(?i)(?:CAM)?\s*0*(\d{1,2})", cam_arg.strip())
    if not m:
        raise ValueError(f"--list-elements needs a camera like CAM01, got {cam_arg!r}")
    cam = int(m.group(1))
    inv = parse_inventory()
    if cam not in inv:
        raise ValueError(f"camera CAM{cam:02d} is not in the inventory")
    c = inv[cam]
    images_dir = images_dir or os.path.join(os.path.dirname(INVENTORY), "..", "public", "images")
    size = Image.open(os.path.join(images_dir, c["file"])).size
    print(f"CAM{cam:02d} {c['file']} {size[0]}x{size[1]} (px box without margin: x1,y1,x2,y2)")
    for eid, e in c["elements"].items():
        b = norm_to_px(e["rect"], size)
        d = e["desc"]
        print(f"{eid}  {b[0]},{b[1]},{b[2]},{b[3]}  {d[:60]}{'...' if len(d) > 60 else ''}")


def check_inventory(images_dir=None):
    """Every element of every camera must convert to a positive-size px box inside the baseline. Returns (n, problems)."""
    inv = parse_inventory()
    images_dir = images_dir or os.path.join(os.path.dirname(INVENTORY), "..", "public", "images")
    n, bad = 0, []
    for cam, c in sorted(inv.items()):
        size = Image.open(os.path.join(images_dir, c["file"])).size
        if size != c["size"]:
            bad.append(f"CAM{cam:02d}: baseline {size[0]}x{size[1]} != inventory {c['size'][0]}x{c['size'][1]}")
        for eid, e in c["elements"].items():
            n += 1
            b = norm_to_px(e["rect"], size)
            if not (0 <= b[0] < b[2] <= size[0] and 0 <= b[1] < b[3] <= size[1]):
                bad.append(f"{eid}: px box {b} not positive/inside {size}")
    missing = [k for k in range(1, 9) if k not in inv]
    bad += [f"CAM{k:02d}: no section in the inventory" for k in missing]
    return n, len(inv), bad


class _Parser(argparse.ArgumentParser):
    def error(self, message):  # same exit code as a verification fail
        self.print_usage(sys.stderr)
        print(f"error: {message}", file=sys.stderr)
        sys.exit(2)


def build_parser():
    p = _Parser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--base", help="baseline photo (public/images/camN.webp)")
    p.add_argument("--gen", help="generated image (png)")
    p.add_argument("--box", type=parse_box, help="x1,y1,x2,y2 in baseline px")
    p.add_argument("--element", help="camera element id (e.g. CAM01-E12) from prompts/camera-element-inventory.md; its box is converted to baseline px and used instead of --box")
    p.add_argument("--margin", type=int, help=f"with --element: widen the converted box by this many px, clamped to the image (default {DEFAULT_MARGIN})")
    p.add_argument("--list-elements", metavar="CAMNN", help="print the elements of a camera (id, px box, description) and exit")
    p.add_argument("--check-inventory", action="store_true", help="check that every inventory element converts to a valid px box inside its baseline, and exit")
    p.add_argument("--out", help="transparent WebP to write (only on non-fail)")
    p.add_argument("--preview", help="full-frame verification composite PNG (work file, never commit)")
    p.add_argument("--threshold", type=float, default=18.0, help="difference threshold (0-255)")
    p.add_argument("--dilate", type=int, default=3, help="mask dilation px")
    p.add_argument("--feather", type=float, default=3.0, help="edge blur sigma px")
    p.add_argument("--min-region", type=int, default=12, help="drop isolated specks smaller than this (px)")
    p.add_argument("--no-align", action="store_true", help="skip phase-correlation translation alignment")
    p.add_argument("--no-tone-match", action="store_true", help="skip per-channel tone matching outside the box")
    p.add_argument("--min-frac", type=float, default=0.004, help="changed/box below this is fail")
    p.add_argument("--max-frac", type=float, default=0.65, help="changed/box above this is warn")
    p.add_argument("--max-outside", type=float, default=0.03, help="fraction over threshold outside the box above this is fail")
    p.add_argument("--selftest", action="store_true", help="run the synthetic self-check (uses --base, default cam1.webp; --threshold/--dilate/--feather are passed through)")
    return p


def shift_zero(arr, dx, dy):
    """Shift an HxWxC array by (dx, dy) without wrap-around; uncovered pixels are 0. Returns (out, valid)."""
    h, w = arr.shape[:2]
    out = np.zeros_like(arr)
    valid = np.zeros((h, w), bool)
    sx0, sx1 = max(0, -dx), min(w, w - dx)
    sy0, sy1 = max(0, -dy), min(h, h - dy)
    if sx1 > sx0 and sy1 > sy0:
        out[sy0 + dy : sy1 + dy, sx0 + dx : sx1 + dx] = arr[sy0:sy1, sx0:sx1]
        valid[sy0 + dy : sy1 + dy, sx0 + dx : sx1 + dx] = True
    return out, valid


def phase_shift(a, b, exclude):
    """Estimate the integer shift that moves b onto a, using only pixels outside `exclude`."""
    h, w = a.shape
    keep = ~exclude
    win = np.outer(np.hanning(h), np.hanning(w)) * keep
    ma = a[keep].mean()
    mb = b[keep].mean()
    fa = np.fft.fft2((a - ma) * win)
    fb = np.fft.fft2((b - mb) * win)
    r = fa * np.conj(fb)
    r /= np.abs(r) + 1e-9
    c = np.fft.ifft2(r).real
    iy, ix = np.unravel_index(np.argmax(c), c.shape)
    dy = iy - h if iy > h // 2 else iy
    dx = ix - w if ix > w // 2 else ix
    return int(dx), int(dy)


def process(a):
    """Run one cut. Returns (report dict, exit code). Writes a.out only when the result is not fail."""
    res, warnings, status = {}, [], "ok"

    def finish(st, extra=None):
        res["status"] = st
        res["warnings"] = warnings
        if extra:
            res.update(extra)
        return res, (2 if st == "fail" else 0)

    base_img = Image.open(a.base).convert("RGB")
    W, H = base_img.size
    gen_img = Image.open(a.gen).convert("RGB")
    res.update(base_size=[W, H], gen_size=list(gen_img.size))
    res.update(getattr(a, "element_info", None) or {"box_source": "box"})

    if abs(gen_img.width / gen_img.height - W / H) > 0.02:
        warnings.append("aspect ratio of the generated image differs from the baseline; resizing would distort it")
        return finish("fail")
    if gen_img.size != (W, H):
        gen_img = gen_img.resize((W, H), Image.LANCZOS)

    x1, y1, x2, y2 = a.box
    x1, y1, x2, y2 = max(0, x1), max(0, y1), min(W, x2), min(H, y2)
    if x1 >= x2 or y1 >= y2:
        warnings.append("--box lies outside the baseline")
        return finish("fail")
    box_mask = np.zeros((H, W), bool)
    box_mask[y1:y2, x1:x2] = True
    res["box_px"] = [x1, y1, x2, y2]
    res["mask_box_1000"] = "(%d,%d)–(%d,%d)" % (round(x1 * 1000 / W), round(y1 * 1000 / H), round(x2 * 1000 / W), round(y2 * 1000 / H))

    base = np.asarray(base_img).astype(np.float32)
    gen = np.asarray(gen_img).astype(np.float32)
    valid = np.ones((H, W), bool)

    # Translation alignment, estimated only from pixels outside the (dilated) change box.
    shift = (0, 0)
    pad = 8
    excl = np.zeros((H, W), bool)
    excl[max(0, y1 - pad) : y2 + pad, max(0, x1 - pad) : x2 + pad] = True
    min_out = max(MIN_OUTSIDE_PX, int(MIN_OUTSIDE_FRAC * W * H))
    few_outside = int((~excl).sum()) < min_out
    if few_outside:
        warnings.append(f"the box covers nearly the whole frame (fewer than {min_out} reference pixels outside it): alignment and tone matching were skipped, and the redraw check is unreliable")
    if not a.no_align and not few_outside:
        dx, dy = phase_shift(base.mean(2), gen.mean(2), excl)
        if (dx, dy) != (0, 0):
            if abs(dx) <= ALIGN_MAX_PX and abs(dy) <= ALIGN_MAX_PX:
                gen, valid = shift_zero(gen, dx, dy)
                shift = (dx, dy)
                warnings.append(f"shifted the generated image by ({dx},{dy}) px to align it (no wrap-around; the uncovered edge band is excluded)")
            else:
                warnings.append(f"estimated offset ({dx},{dy}) px is too large; not corrected")
    res["align_shift"] = list(shift)

    out_idx = (~box_mask) & valid
    if not a.no_tone_match and not few_outside and int(out_idx.sum()) >= min_out:
        for c in range(3):
            g = gen[..., c][out_idx][::7]
            b = base[..., c][out_idx][::7]
            gain = np.std(b) / max(np.std(g), 1e-3)
            gen[..., c] = np.clip((gen[..., c] - g.mean()) * gain + b.mean(), 0, 255)

    def blur(arr):
        return np.asarray(Image.fromarray(arr.astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32)

    diff = np.abs(blur(base) - blur(gen)).max(2)
    diff[~valid] = 0
    outside_frac = float((diff[out_idx] > a.threshold).mean()) if out_idx.any() else 0.0
    res["outside_box_changed_frac"] = round(outside_frac, 5)
    if outside_frac > a.max_outside:
        status = "fail"
        warnings.append(f"{outside_frac:.1%} of the pixels outside the box exceed the threshold: the generation likely redrew the frame")

    m = (diff > a.threshold) & box_mask & valid
    mi = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    arr = np.asarray(mi) > 0
    lab, n = ndimage.label(arr)
    if n:
        sizes = ndimage.sum(arr, lab, range(1, n + 1))
        arr = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s >= a.min_region])
    if a.dilate > 0:
        arr = np.asarray(Image.fromarray((arr * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(a.dilate * 2 + 1))) > 0
    changed_px = int(arr.sum())
    frac = changed_px / max((x2 - x1) * (y2 - y1), 1)
    res["changed_pixels"] = changed_px
    res["changed_frac_of_box"] = round(frac, 4)
    if frac < a.min_frac:
        status = "fail"
        warnings.append("almost no change: the generation probably ignored the instruction")
    elif frac > a.max_frac and status == "ok":
        status = "warn"
        warnings.append("the change fills the box; widen the box or recheck the target")

    if status == "fail" and changed_px == 0:
        return finish("fail")

    alpha = Image.fromarray((arr * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(a.feather))
    al = np.asarray(alpha).astype(np.float32) / 255.0
    pad = int(a.feather * 3 + a.dilate + 1)
    env = np.zeros((H, W), bool)
    env[max(0, y1 - pad) : y2 + pad, max(0, x1 - pad) : x2 + pad] = True
    al[~env | ~valid] = 0
    a8 = np.round(al * 255).astype(np.uint8)
    a8[a8 < 2] = 0
    ys, xs = np.nonzero(a8)
    if len(xs) == 0:
        warnings.append("mask is empty")
        return finish("fail")
    bx1, by1, bx2, by2 = int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1
    res.update(
        overlay_origin=[bx1, by1],
        dimensions=[bx2 - bx1, by2 - by1],
        bbox=[bx1, by1, bx2, by2],
        overlay_origin_str="(%d,%d)" % (bx1, by1),
        dimensions_str="%dx%d" % (bx2 - bx1, by2 - by1),
    )
    if bx1 < x1 - pad or by1 < y1 - pad or bx2 > x2 + pad or by2 > y2 + pad:
        status = "fail"
        warnings.append("overlay extends beyond the box plus feather margin")

    genu = np.clip(np.round(gen), 0, 255).astype(np.uint8)
    ov = Image.fromarray(np.dstack([genu, a8])[by1:by2, bx1:bx2], "RGBA")
    fd, tmp = tempfile.mkstemp(suffix=".webp", prefix="composite-")
    os.close(fd)
    try:
        ov.save(tmp, "WEBP", lossless=True, exact=True)
        # Verify the saved file: baseline + overlay must equal the intended composite, and nothing outside alpha changes.
        ov2 = Image.open(tmp).convert("RGBA")
        recon = base_img.convert("RGBA")
        recon.alpha_composite(ov2, (bx1, by1))
        recon_a = np.asarray(recon.convert("RGB")).astype(np.int16)
        al_full = a8.astype(np.float32)[..., None] / 255.0
        expect = np.clip(np.round(base * (1 - al_full) + genu.astype(np.float32) * al_full), 0, 255).astype(np.int16)
        recon_err = int(np.abs(recon_a - expect).max())
        base_a = np.asarray(base_img).astype(np.int16)
        changed_outside = int(((recon_a != base_a).any(2) & ~(a8 > 0)).sum())
        res["recon_max_abs_err_vs_composite"] = recon_err
        res["pixels_changed_outside_alpha"] = changed_outside
        inside = a8 > 0
        d = np.abs(recon_a - base_a).max(2)[inside]
        res["diff_in_alpha_max"] = int(d.max())
        res["diff_in_alpha_mean"] = round(float(d.mean()), 1)
        if recon_err > 1:
            status = "fail"
            warnings.append("reconstruction does not match the composite")
        if changed_outside:
            status = "fail"
            warnings.append("the baseline changed where alpha is 0")
        if a.preview:
            Image.fromarray(recon_a.astype(np.uint8)).save(a.preview)
        if status != "fail":
            os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
            shutil.move(tmp, a.out)
            tmp = None
    finally:
        if tmp and os.path.exists(tmp):
            os.remove(tmp)
    return finish(status)


def run_cli(argv):
    p = build_parser()
    a = p.parse_args(argv)
    if a.selftest:
        default = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images", "cam1.webp")
        return selftest(a.base or default, a)
    if a.list_elements or a.check_inventory:
        try:
            if a.list_elements:
                list_elements(a.list_elements)
                return 0
            n, ncam, bad = check_inventory()
        except (OSError, ValueError) as e:
            print(f"error: {e}", file=sys.stderr)
            return 2
        print(f"inventory: {ncam} cameras, {n} elements, {len(bad)} problems")
        for b in bad:
            print("  PROBLEM", b)
        return 2 if bad else 0
    if a.element and a.box:
        p.error("--element and --box are mutually exclusive")
    if a.margin is not None and a.margin < 0:
        p.error("--margin must be 0 or greater")
    if a.margin is not None and not a.element:
        p.error("--margin only applies with --element")
    if a.element:
        if a.base is None:
            p.error("--base is required")
        try:
            a.box, a.element_info = lookup_element(a.element, a.base, DEFAULT_MARGIN if a.margin is None else a.margin)
        except (OSError, ValueError) as e:
            print(json.dumps({"status": "fail", "warnings": [str(e)]}, ensure_ascii=False, indent=2))
            return 2
    for k in ("base", "gen", "box", "out"):
        if getattr(a, k) is None:
            p.error(f"--{k} is required" + (" (or --element)" if k == "box" else ""))
    try:
        res, code = process(a)
    except (OSError, ValueError) as e:
        res, code = {"status": "fail", "warnings": [f"{type(e).__name__}: {e}"]}, 2
    print(json.dumps(res, ensure_ascii=False, indent=2))
    return code


def selftest(base_path, opts):
    """Synthetic checks from a baseline photo with planted changes: known shift, known region (its bbox must be
    covered by the detected bbox and not exceeded by more than the feather margin), edge contact, near-full box,
    aspect mismatch, no change, full redraw, bad --box. opts supplies --threshold/--dilate/--feather."""
    from PIL import ImageDraw

    print("note: stderr lines such as '--box needs exactly 4 values' come from the intentional bad-input cases\n"
          "(bad_box / fail_*); only the PASS/FAIL table below counts.", file=sys.stderr)
    base = Image.open(base_path).convert("RGB")
    W, H = base.size
    rng = np.random.default_rng(1)
    tmpd = tempfile.mkdtemp(prefix="composite-selftest-")
    try:
        margin = int(opts.feather * 3 + opts.dilate + 1) + 3  # allowed overshoot of the detected bbox
        tol = 3  # allowed shortfall (threshold erodes the faint rim)

        def patch(box, shape="ellipse", color=(235, 50, 40)):
            im = base.copy()
            d = ImageDraw.Draw(im)
            (d.ellipse if shape == "ellipse" else d.rectangle)(box, fill=color)
            return im

        def make(name, gen):
            path = os.path.join(tmpd, name + ".png")
            gen.save(path)
            return path

        def shifted(img, dx, dy):
            arr, _ = shift_zero(np.asarray(img), dx, dy)
            return Image.fromarray(arr)

        def bb(b):  # drawn inclusive box -> exclusive bbox
            return (b[0], b[1], b[2] + 1, b[3] + 1)

        cases = []  # (name, gen_path, box, expect_statuses, planted_bbox|None, expected_shift|None, need_warning_text)
        bx = (W // 2 - 40, H // 2 - 50, W // 2 + 40, H // 2 + 50)
        pl = (bx[0] + 15, bx[1] + 20, bx[2] - 15, bx[3] - 20)
        cases.append(("ok_clean", make("a", patch(pl)), bx, {"ok"}, bb(pl), [0, 0], None))
        cases.append(("ok_shift(+5,-3)+rescale", make("b", shifted(patch(pl), 5, -3).resize((int(W * 1.6), int(H * 1.6)))), bx, {"ok"}, bb(pl), [-5, 3], None))
        eb = (0, 0, 70, 70)
        cases.append(("ok_edge_region+shift(4,3)", make("c", shifted(patch((0, 0, 55, 55), "rect"), 4, 3)), eb, {"ok", "warn"}, (0, 0, 56, 56), [-4, -3], None))
        big = (W - 200, 150, W - 20, 450)
        plb = (big[0] + 10, big[1] + 10, big[2] - 10, big[3] - 10)
        cases.append(("large_change(85%)+shift(4,3)", make("d", shifted(patch(plb, "rect"), 4, 3)), big, {"ok", "warn"}, bb(plb), [-4, -3], None))
        full = (3, 3, W - 3, H - 3)
        plf = (W // 2 - 60, H // 2 - 60, W // 2 + 60, H // 2 + 60)
        cases.append(("near_full_box(skip align)", make("h", patch(plf)), full, {"ok", "warn"}, bb(plf), [0, 0], "nearly the whole frame"))
        cases.append(("fail_aspect", make("e", patch(pl).resize((W, W))), bx, {"fail"}, None, None, None))
        cases.append(("fail_no_change", make("f", base), bx, {"fail"}, None, None, None))
        noise = Image.fromarray(np.clip(np.asarray(base).astype(np.int16) + rng.normal(0, 40, (H, W, 3)), 0, 255).astype(np.uint8))
        cases.append(("fail_full_redraw", make("g", noise.transpose(Image.FLIP_LEFT_RIGHT)), bx, {"fail"}, None, None, None))

        rows, ok_all = [], True
        for name, gp, box, expect, planted, want_shift, want_warn in cases:
            out = os.path.join(tmpd, "".join(ch if ch.isalnum() else "_" for ch in name) + ".webp")
            a = build_parser().parse_args(["--base", base_path, "--gen", gp, "--box", ",".join(map(str, box)), "--out", out,
                                           "--threshold", str(opts.threshold), "--dilate", str(opts.dilate), "--feather", str(opts.feather)])
            notes = []
            try:
                res, code = process(a)
            except Exception as e:  # selftest must report, not crash
                res, code = {"status": "error", "warnings": [repr(e)]}, 99
            st = res["status"]
            exists = os.path.exists(out)
            good = st in expect and code == (2 if st == "fail" else 0) and exists == (st != "fail")
            if good and st != "fail":
                if want_shift is not None and res.get("align_shift") != want_shift:
                    good = False
                    notes.append(f"shift {res.get('align_shift')}")
                if res.get("pixels_changed_outside_alpha") != 0:
                    good = False
                    notes.append("changed outside alpha")
                if want_warn and not any(want_warn in w for w in res["warnings"]):
                    good = False
                    notes.append("expected warning missing")
                if planted is not None and res.get("bbox"):
                    dx1, dy1, dx2, dy2 = res["bbox"]
                    px1, py1, px2, py2 = planted
                    if dx1 > px1 + tol or dy1 > py1 + tol or dx2 < px2 - tol or dy2 < py2 - tol:
                        good = False
                        notes.append(f"bbox {res['bbox']} does not cover planted {list(planted)}")
                    if dx1 < px1 - margin or dy1 < py1 - margin or dx2 > px2 + margin or dy2 > py2 + margin:
                        good = False
                        notes.append(f"bbox {res['bbox']} overshoots planted {list(planted)}")
            elif st == "error":
                good = False
                notes.append(res["warnings"][0])
            ok_all &= bool(good)
            rows.append((name, st, code, "yes" if exists else "no", res.get("align_shift"), res.get("bbox"), "PASS" if good else "FAIL " + "; ".join(notes)))
        for bad in ("1,2,3", "50,50,10,10", "a,b,c,d"):
            try:
                build_parser().parse_args(["--base", base_path, "--gen", base_path, "--box", bad, "--out", os.path.join(tmpd, "x.webp")])
                code = 0
            except SystemExit as e:
                code = e.code
            good = code == 2
            ok_all &= good
            rows.append((f"bad_box {bad}", "argparse error", code, "no", None, None, "PASS" if good else "FAIL"))
        def elem_case(name, ok, note=""):
            nonlocal ok_all
            ok_all &= bool(ok)
            rows.append((name, "-", "-", "-", None, None, "PASS" if ok else "FAIL " + note))

        # parser known-answer case: a tiny hand-written inventory with literal expected values, independent of the real file,
        # so a parser bug (offset, x/y swap, wrong size) cannot cancel itself out the way a real-inventory-derived `want` would
        fx = os.path.join(tmpd, "fixture-inventory.md")
        with open(fx, "w", encoding="utf-8") as f:
            f.write("## CAM 07 \u2014 Fixture (`cam7.webp`, 675\u00d7900)\n\n"
                    "| \u9806 | \u8981\u7d20ID | \u77e9\u5f62 | \u5199\u3063\u3066\u3044\u308b\u3082\u306e |\n| --: | --- | --: | --- |\n"
                    "| 1 | CAM07-E01 | `(3,4)\u2013(100,200)` | alpha |\n"
                    "| 2 | CAM07-E02 | `(12.5,20)\u2013(999.5,1000)` | beta |\n"
                    "| 3 | CAM07-E03 | `(10,20)\u2014(500,600)` | gamma |\n"
                    "| 4 | CAM07-E04 | `(1,2)~(3,4)` | delta |\n")
        try:
            pf = parse_inventory(fx)
            c7 = pf.get(7, {})
            e1 = c7.get("elements", {}).get("CAM07-E01", {})
            e2 = c7.get("elements", {}).get("CAM07-E02", {})
            e3 = c7.get("elements", {}).get("CAM07-E03", {})
            e4 = c7.get("elements", {}).get("CAM07-E04", {})
            elem_case("parser_known_answer",
                      c7.get("file") == "cam7.webp" and c7.get("size") == (675, 900) and list(c7["elements"]) == ["CAM07-E01", "CAM07-E02", "CAM07-E03", "CAM07-E04"]
                      and e1.get("rect") == (3.0, 4.0, 100.0, 200.0) and e1.get("desc") == "alpha"
                      and e2.get("rect") == (12.5, 20.0, 999.5, 1000.0) and e2.get("desc") == "beta"
                      and norm_to_px(e1["rect"], c7["size"]) == (2, 3, 68, 180)
                      # em dash / tilde separators; x1=10,y1=20 give different floors for W=675 vs H=900 (6,18 / swapped 9,13)
                      and e3.get("rect") == (10.0, 20.0, 500.0, 600.0) and e4.get("rect") == (1.0, 2.0, 3.0, 4.0)
                      and norm_to_px(e3["rect"], c7["size"]) == (6, 18, 338, 540),
                      repr(pf))
        except Exception as e:
            elem_case("parser_known_answer", False, repr(e))

        img1 = os.path.join(os.path.dirname(os.path.abspath(INVENTORY)), "..", "public", "images")
        img1 = os.path.normpath(img1)
        b1 = os.path.join(img1, "cam1.webp")
        if os.path.exists(b1):
            W1, H1 = Image.open(b1).size
            try:
                box, info = lookup_element("CAM01-E12", b1, 0)
                # expected px derived from the inventory rect so inventory corrections cannot make this stale; parser correctness
                # itself is pinned by parser_known_answer above. parse_inventory() is called afresh because lookup_element
                # returns only the resolved box, not the parsed inventory.
                r1 = parse_inventory()[1]["elements"]["CAM01-E12"]["rect"]
                want = (math.floor(r1[0] * W1 / 1000), math.floor(r1[1] * H1 / 1000), math.ceil(r1[2] * W1 / 1000), math.ceil(r1[3] * H1 / 1000))
                elem_case("element_px_conversion", tuple(box) == want and info["element_id"] == "CAM01-E12" and "店先" in info["element_description"], f"{box} vs {want}")
                box8, _ = lookup_element("CAM01-E12", b1, 8)
                elem_case("element_margin(+8,clamped)", box8 == (want[0] - 8, want[1] - 8, min(W1, want[2] + 8), want[3] + 8), str(box8))
                boxc, _ = lookup_element("CAM01-E01", b1, 50)
                elem_case("element_clamp_to_image", boxc[0] == 0 and boxc[1] == 0 and boxc[2] == W1, str(boxc))
            except Exception as e:
                elem_case("element_px_conversion", False, repr(e))
            for nm, eid, bp in (("fail_unknown_element", "CAM01-E99", b1), ("fail_bad_element_syntax", "CAM1-12", b1),
                                ("fail_camera_mismatch", "CAM02-E01", b1)):
                try:
                    lookup_element(eid, bp, 0)
                    elem_case(nm, False, "did not raise")
                except ValueError:
                    elem_case(nm, True)
            for nm, extra in (("fail_element_with_box", ["--box", "1,1,5,5"]), ("fail_margin_without_element", ["--margin", "3"])):
                argv = ["--base", b1, "--gen", b1, "--out", os.path.join(tmpd, "x.webp")] + (["--element", "CAM01-E12"] if "box" in nm else []) + extra
                try:
                    code = run_cli(argv)
                except SystemExit as e:
                    code = e.code
                elem_case(nm, code == 2, f"exit {code}")
            n, ncam, bad = check_inventory()
            elem_case(f"inventory_all_valid({ncam}cams,{n}el)", not bad and ncam == 8, "; ".join(bad[:3]))
        else:
            elem_case("element_cases", False, f"{b1} missing")
        print("%-30s %-14s %-5s %-6s %-9s %-22s %s" % ("case", "status", "exit", "--out", "align", "bbox", "result"))
        for r in rows:
            print("%-30s %-14s %-5s %-6s %-9s %-22s %s" % tuple(str(x) for x in r))
        print("SELFTEST", "PASSED" if ok_all else "FAILED")
    finally:
        shutil.rmtree(tmpd, ignore_errors=True)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(run_cli(sys.argv[1:]))
