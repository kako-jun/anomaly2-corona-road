#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# ///
"""Draw the hand-ruled frames of the investigation-note sketches (Issue #297).

Each frame is FOUR separate straight edges, never a closed rectangle: every edge has its own small tilt, a corner
overshoot or gap, an uneven thickness and a slightly different ink. Only the frame is rewritten; the drawings
inside (faces, question marks) are never touched. The numbers below are fixed (no randomness), one set per picture
so no two frames look alike. `src/data/noteFrames.test.ts` reads the written SVGs back and checks the rules.

  uv run --script scripts/note-frames.py       # rewrite public/note/*.svg frames in place (idempotent)
"""
import math
import re
from pathlib import Path

NOTE = Path(__file__).resolve().parent.parent / "public/note"
# corners of the frame, clockwise from top-left (viewBox 68x68)
CORNERS = [(4, 5), (63, 3), (65, 62), (5, 64)]
EDGES = ["top", "right", "bottom", "left"]
# per picture and edge: tilt (deg), start/end overshoot (+ sticks out / - falls short, viewBox units),
# thickness at start/end (multiples of the base), ink (pencil greys)
SPECS = {
    "elder1": {
        "top": (0.7, 1.4, -0.9, 1.0, 1.3, "#3b3a38"),
        "right": (-0.5, -0.8, 2.1, 1.25, 1.0, "#454340"),
        "bottom": (-0.4, 0.9, 1.7, 1.0, 1.15, "#34332f"),
        "left": (1.1, 1.6, -1.2, 1.0, 1.4, "#403e3b"),
    },
    "elder2": {
        "top": (-0.6, -1.2, 2.4, 1.1, 1.0, "#403e3b"),
        "right": (0.9, 1.8, -0.7, 1.0, 1.35, "#3b3a38"),
        "bottom": (0.3, -0.6, 1.1, 1.4, 1.05, "#454340"),
        "left": (-1.0, 2.2, 0.6, 1.15, 1.0, "#34332f"),
    },
    "elder3": {
        "top": (0.2, 2.4, -1.3, 1.0, 1.2, "#34332f"),
        "right": (-0.8, -0.9, 1.6, 1.3, 1.0, "#3b3a38"),
        "bottom": (-0.7, 1.1, 2.7, 1.0, 1.45, "#403e3b"),
        "left": (0.6, -1.7, 0.8, 1.1, 1.25, "#454340"),
    },
    "child": {
        "top": (-1.1, 0.8, 2.0, 1.2, 1.0, "#454340"),
        "right": (0.4, -1.5, 1.2, 1.0, 1.3, "#34332f"),
        "bottom": (1.2, 2.6, -0.8, 1.35, 1.0, "#3b3a38"),
        "left": (-0.3, 0.7, -2.0, 1.0, 1.15, "#403e3b"),
    },
    "unknown": {
        "top": (0.45, -1.0, 1.9, 1.0, 1.25, "#6b665c"),
        "right": (-1.15, 1.3, -0.6, 1.2, 1.0, "#756f64"),
        "bottom": (0.95, 0.6, 2.3, 1.0, 1.3, "#625d54"),
        "left": (0.25, -1.9, 1.0, 1.25, 1.0, "#6e685e"),
    },
    "unknown-last": {
        "top": (-0.85, 1.7, -1.1, 1.15, 1.0, "#6b665c"),
        "right": (0.55, -0.7, 2.5, 1.0, 1.4, "#625d54"),
        "bottom": (0.55, 2.0, 0.9, 1.3, 1.0, "#756f64"),
        "left": (0.75, 0.5, -1.4, 1.0, 1.2, "#6e685e"),
    },
}
BASE = 1.7  # base line thickness (viewBox units): same as the old .ln stroke
DASHED = {"unknown", "unknown-last"}


def f(v):
    return ("%.2f" % v).rstrip("0").rstrip(".")


def edge(a, b, spec, dashed):
    tilt, s, e, w0, w1, ink = spec
    mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
    ang = math.atan2(b[1] - a[1], b[0] - a[0]) + math.radians(tilt)
    half = math.hypot(b[0] - a[0], b[1] - a[1]) / 2
    dx, dy = math.cos(ang), math.sin(ang)
    p0 = (mx - dx * (half + s), my - dy * (half + s))
    p1 = (mx + dx * (half + e), my + dy * (half + e))
    if dashed:
        # a dashed edge keeps one stroke width per edge (the dashes carry the unevenness)
        w = BASE * (w0 + w1) / 2
        return (f'<path d="M{f(p0[0])} {f(p0[1])}L{f(p1[0])} {f(p1[1])}" class="fr" fill="none" stroke="{ink}" '
                f'stroke-width="{f(w)}" stroke-linecap="round" stroke-dasharray="3 4"/>')
    nx, ny = -dy, dx
    h0, h1 = BASE * w0 / 2, BASE * w1 / 2
    pts = [(p0[0] + nx * h0, p0[1] + ny * h0), (p1[0] + nx * h1, p1[1] + ny * h1),
           (p1[0] - nx * h1, p1[1] - ny * h1), (p0[0] - nx * h0, p0[1] - ny * h0)]
    d = "M" + "L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"
    return f'<path d="{d}" class="fr" fill="{ink}"/>'


def frame(name):
    dashed = name in DASHED
    out = ['<g id="frame">']
    if not dashed:  # the paper behind the face: fill only, no outline
        out.append('<path d="M4 5L63 3L65 62L5 64Z" fill="#f7f0dc"/>')
    for i, nm in enumerate(EDGES):
        out.append(edge(CORNERS[i], CORNERS[(i + 1) % 4], SPECS[name][nm], dashed))
    out.append("</g>")
    return "".join(out)


OLD = [
    re.compile(r'<g id="frame">.*?</g>', re.S),
    re.compile(r'<path d="M4 5L63 3L65 62L5 64Z" class="ln" fill="#f7f0dc"/>'),
    re.compile(r'<path d="M4 5L63 3L65 62L5 64Z" class="ln dash"/>'),
]

if __name__ == "__main__":
    for name in SPECS:
        p = NOTE / f"{name}.svg"
        t = p.read_text()
        for pat in OLD:
            if pat.search(t):
                t = pat.sub(lambda _m: frame(name), t, count=1)
                break
        else:
            raise SystemExit(f"{p}: no frame found")
        p.write_text(t)
        print("frame", p.name)
