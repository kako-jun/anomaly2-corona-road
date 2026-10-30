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
import os
import sys
import tempfile

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ALIGN_MAX_PX = 12


class Fail(Exception):
    pass


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
    p.add_argument("--selftest", action="store_true", help="run the synthetic self-check (uses --base, default public/images/cam1.webp)")
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
    if not a.no_align:
        pad = 8
        excl = np.zeros((H, W), bool)
        excl[max(0, y1 - pad) : y2 + pad, max(0, x1 - pad) : x2 + pad] = True
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
    if not a.no_tone_match:
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
    out_dir = os.path.dirname(os.path.abspath(a.out))
    os.makedirs(out_dir, exist_ok=True)
    fd, tmp = tempfile.mkstemp(suffix=".webp", prefix=".composite-", dir=out_dir)
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
            os.replace(tmp, a.out)
            tmp = None
    finally:
        if tmp and os.path.exists(tmp):
            os.remove(tmp)
    return finish(status)


def run_cli(argv):
    p = build_parser()
    a = p.parse_args(argv)
    if a.selftest:
        return selftest(a.base or "public/images/cam1.webp")
    for k in ("base", "gen", "box", "out"):
        if getattr(a, k) is None:
            p.error(f"--{k} is required")
    try:
        res, code = process(a)
    except (OSError, Fail) as e:
        res, code = {"status": "fail", "warnings": [f"{type(e).__name__}: {e}"]}, 2
    print(json.dumps(res, ensure_ascii=False, indent=2))
    return code


def selftest(base_path):
    """Synthetic checks from a baseline photo: known shift, known change region, edge, aspect, no change, redraw."""
    base = Image.open(base_path).convert("RGB")
    W, H = base.size
    rng = np.random.default_rng(1)
    tmpd = tempfile.mkdtemp(prefix="composite-selftest-")

    def patch(img, box, shape="ellipse", color=(235, 50, 40)):
        from PIL import ImageDraw

        im = img.copy()
        d = ImageDraw.Draw(im)
        (d.ellipse if shape == "ellipse" else d.rectangle)(box, fill=color)
        return im

    def make(name, gen, size=None):
        path = os.path.join(tmpd, name + ".png")
        gen.save(path)
        return path

    def shifted(img, dx, dy):
        arr, _ = shift_zero(np.asarray(img), dx, dy)
        return Image.fromarray(arr)

    cases = []  # (name, gen_path, box, expect_status, check)
    bx = (W // 2 - 40, H // 2 - 50, W // 2 + 40, H // 2 + 50)
    cases.append(("ok_clean", make("a", patch(base, (bx[0] + 15, bx[1] + 20, bx[2] - 15, bx[3] - 20))), bx, {"ok"}, lambda r: r["align_shift"] == [0, 0]))
    cases.append(("ok_shift(+5,-3)+rescale", make("b", shifted(patch(base, (bx[0] + 15, bx[1] + 20, bx[2] - 15, bx[3] - 20)), 5, -3).resize((int(W * 1.6), int(H * 1.6)))), bx, {"ok"}, lambda r: r["align_shift"] == [-5, 3] and r["pixels_changed_outside_alpha"] == 0))
    eb = (0, 0, 70, 70)
    cases.append(("ok_edge_region+shift(4,3)", make("c", shifted(patch(base, (0, 0, 55, 55), "rect"), 4, 3)), eb, {"ok", "warn"}, lambda r: r["align_shift"] == [-4, -3] and r["overlay_origin"][0] >= 0))
    big = (W - 200, 150, W - 20, 450)
    cases.append(("large_change(85%)+shift(4,3)", make("d", shifted(patch(base, (big[0] + 10, big[1] + 10, big[2] - 10, big[3] - 10), "rect"), 4, 3)), big, {"ok", "warn"}, lambda r: r["align_shift"] == [-4, -3]))
    cases.append(("fail_aspect", make("e", patch(base, (bx[0] + 15, bx[1] + 20, bx[2] - 15, bx[3] - 20)).resize((W, W))), bx, {"fail"}, lambda r: True))
    cases.append(("fail_no_change", make("f", base), bx, {"fail"}, lambda r: True))
    noise = Image.fromarray(np.clip(np.asarray(base).astype(np.int16) + rng.normal(0, 40, (H, W, 3)), 0, 255).astype(np.uint8))
    cases.append(("fail_full_redraw", make("g", noise.transpose(Image.FLIP_LEFT_RIGHT)), bx, {"fail"}, lambda r: True))

    rows, ok_all = [], True
    for name, gp, box, expect, chk in cases:
        out = os.path.join(tmpd, name.replace("(", "_").replace(")", "_").replace("+", "_").replace("%", "") + ".webp")
        a = build_parser().parse_args(["--base", base_path, "--gen", gp, "--box", ",".join(map(str, box)), "--out", out])
        try:
            res, code = process(a)
        except Exception as e:  # selftest must report, not crash
            res, code = {"status": "error", "warnings": [repr(e)]}, 99
        exists = os.path.exists(out)
        good = res["status"] in expect and code == (2 if res["status"] == "fail" else 0) and (exists != (res["status"] == "fail")) and chk(res) if res["status"] != "error" else False
        ok_all &= bool(good)
        rows.append((name, res["status"], code, "yes" if exists else "no", res.get("align_shift"), "PASS" if good else "FAIL"))
    # bad --box formats exit 2
    for bad in ("1,2,3", "50,50,10,10", "a,b,c,d"):
        try:
            build_parser().parse_args(["--base", base_path, "--gen", base_path, "--box", bad, "--out", os.path.join(tmpd, "x.webp")])
            code = 0
        except SystemExit as e:
            code = e.code
        good = code == 2
        ok_all &= good
        rows.append((f"bad_box {bad}", "argparse error", code, "no", None, "PASS" if good else "FAIL"))
    print("%-34s %-14s %-5s %-6s %-10s %s" % ("case", "status", "exit", "--out", "align", "result"))
    for r in rows:
        print("%-34s %-14s %-5s %-6s %-10s %s" % tuple(str(x) for x in r))
    print("SELFTEST", "PASSED" if ok_all else "FAILED")
    for f in os.listdir(tmpd):
        os.remove(os.path.join(tmpd, f))
    os.rmdir(tmpd)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(run_cli(sys.argv[1:]))
