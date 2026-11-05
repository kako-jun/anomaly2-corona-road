#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow", "numpy", "pyyaml"]
# ///
"""Check that each ledger overlay is visible at the game's standard knob setting.

The rule (floor values and rationale) is the "Visibility floor" section of prompts/README.md; that file is the
single source of truth. The constants below must match it.

    uv run scripts/check-visibility.py                 # whole ledger, table; exit 1 when any entry is below the floor
    uv run scripts/check-visibility.py --id AR-01-foo  # only these ids (repeatable)
    uv run scripts/check-visibility.py --selftest
"""
import argparse
import sys
from pathlib import Path

import numpy as np
import yaml
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LEDGER = ROOT / "prompts" / "anomalies.yaml"

# Standard knob state: brightness 50 -> filter brightness(1.0), contrast 50 -> contrast(1.05) (src/utils/knob.ts).
BRIGHTNESS = 1.0
CONTRAST = 1.05
# Visibility floor (prompts/README.md, "Visibility floor"). Measured on pixels with alpha > 0.
MIN_MAX_DIFF = 40
MIN_MEAN_DIFF = 3.0
STRONG_DIFF = 25          # a pixel counts as clearly changed at or above this difference
MIN_STRONG_PIXELS = 100   # ... in absolute number,
MIN_STRONG_FRAC = 0.25    # ... or as a share of the overlay's alpha area (small objects pass on the share)


def knob_filter(rgb):
    """CSS brightness() then contrast() on 0-255 values, clamped like the browser does."""
    x = np.clip(rgb / 255.0 * BRIGHTNESS, 0, 1)
    x = np.clip((x - 0.5) * CONTRAST + 0.5, 0, 1)
    return x * 255.0


def metrics(base_rgb, ov_rgba, origin):
    """base_rgb: HxWx3 float array; ov_rgba: hxwx4 float array placed at origin (x, y)."""
    x, y = origin
    h, w = ov_rgba.shape[:2]
    reg = base_rgb[y:y + h, x:x + w]
    if reg.shape[:2] != (h, w):
        raise ValueError("overlay extends beyond the base photo")
    al = ov_rgba[..., 3:4] / 255.0
    comp = np.round(reg * (1 - al) + ov_rgba[..., :3] * al)
    d = np.abs(knob_filter(comp) - knob_filter(reg)).max(axis=2)
    m = ov_rgba[..., 3] > 0
    n = int(m.sum())
    if n == 0:
        return dict(max=0.0, mean=0.0, n25=0, area=0, frac=0.0)
    dm = d[m]
    n25 = int((dm >= STRONG_DIFF).sum())
    return dict(max=float(dm.max()), mean=float(dm.mean()), n25=n25, area=n, frac=n25 / n)


def verdict(m):
    why = []
    if m["max"] < MIN_MAX_DIFF:
        why.append("max")
    if m["mean"] < MIN_MEAN_DIFF:
        why.append("mean")
    if not (m["n25"] >= MIN_STRONG_PIXELS or m["frac"] >= MIN_STRONG_FRAC):
        why.append("n25")
    return why


def measure_entry(e):
    base = np.asarray(Image.open(ROOT / e["base_photo"]).convert("RGB")).astype(float)
    ov = np.asarray(Image.open(ROOT / e["overlay"]).convert("RGBA")).astype(float)
    x, y = (int(v) for v in e["overlay_origin"].strip("()").split(","))
    return metrics(base, ov, (x, y))


def selftest():
    rng = np.random.default_rng(0)
    base = rng.integers(60, 120, (80, 80, 3)).astype(float)
    def ov(color, size, alpha=255):
        a = np.zeros((size, size, 4)); a[..., :3] = color; a[..., 3] = alpha
        return a
    cases = [
        ("strong_large", ov(250, 30), (10, 10), []),
        ("strong_small_by_share", ov(250, 8), (10, 10), []),       # 64 px < 100 but share 100%
        ("weak_uniform", ov(base[10:40, 10:40].mean() + 6, 30), (10, 10), ["max"]),
        ("invisible_copy", np.concatenate([base[10:40, 10:40], np.full((30, 30, 1), 255.0)], axis=2), (10, 10), ["max", "mean", "n25"]),
    ]
    ok = True
    for name, o, org, want in cases:
        got = verdict(metrics(base, o, org))
        flag = "PASS" if set(want) <= set(got) and bool(got) == bool(want) else "FAIL"
        ok &= flag == "PASS"
        print(f"{name:24s} below={got} {flag}")
    # the filter at the standard state must be the identity on mid grey scaled by contrast only
    ok &= abs(float(knob_filter(np.array(128.0))) - ((128 / 255 - 0.5) * CONTRAST + 0.5) * 255) < 1e-6
    print("SELFTEST", "PASSED" if ok else "FAILED")
    return 0 if ok else 1


def is_measurable(e):
    """Only kind=image + status=produced entries have an overlay to measure (both default so)."""
    return e.get("kind", "image") == "image" and e.get("status", "produced") == "produced"


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--id", action="append", help="ledger id to check (repeatable); default: every entry")
    p.add_argument("--ledger", default=str(LEDGER))
    p.add_argument("--table", help="also write a markdown table to this path")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    entries = yaml.safe_load(open(a.ledger, encoding="utf-8"))["anomalies"]
    if a.id:
        by = {e["id"]: e for e in entries}
        missing = [i for i in a.id if i not in by]
        if missing:
            p.error(f"unknown id: {', '.join(missing)}")
        entries = [by[i] for i in a.id]
        unmeasurable = [e["id"] for e in entries if not is_measurable(e)]
        if unmeasurable:
            p.error(
                "no overlay to measure (kind=non_image or status=planned): "
                + ", ".join(unmeasurable)
            )
    else:
        entries = [e for e in entries if is_measurable(e)]
    rows, below = [], []
    for e in entries:
        m = measure_entry(e)
        why = verdict(m)
        rows.append((e["id"], m, why))
        if why:
            below.append((e["id"], m, why))
    hdr = f"{'id':34s} {'max':>5s} {'mean':>6s} {'n25':>6s} {'area':>6s} {'share':>6s}  verdict"
    print(hdr)
    for i, m, why in rows:
        print(f"{i:34s} {m['max']:5.0f} {m['mean']:6.1f} {m['n25']:6d} {m['area']:6d} {m['frac']:6.2f}  {'BELOW(' + ','.join(why) + ')' if why else 'ok'}")
    if a.table:
        with open(a.table, "w", encoding="utf-8") as f:
            f.write("| id | max | mean | n25 | area | share | verdict |\n|---|---:|---:|---:|---:|---:|---|\n")
            for i, m, why in rows:
                f.write(f"| {i} | {m['max']:.0f} | {m['mean']:.1f} | {m['n25']} | {m['area']} | {m['frac']:.2f} | {'BELOW(' + ','.join(why) + ')' if why else 'ok'} |\n")
    if below:
        print(f"\nBELOW THE FLOOR: {len(below)} of {len(rows)}")
        for i, m, why in below:
            print(f"  {i}: max {m['max']:.0f} mean {m['mean']:.1f} n25 {m['n25']} share {m['frac']:.2f} ({','.join(why)})")
        return 1
    print(f"\nall {len(rows)} entries meet the floor")
    return 0


if __name__ == "__main__":
    sys.exit(main())
