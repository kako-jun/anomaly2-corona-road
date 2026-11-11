#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Report near-duplicate one-liners (#325): pairs of ledger `memo` wording that read alike.

  uv run --script scripts/memo-overlap-report.py [--ja 0.75] [--en 0.8]

Exact duplicates are a vitest failure; this lists the close ones (difflib ratio) for a human to judge. A report
tool, not a gate: colour or position swaps of the same kind of change ("one tile turned X") score high on purpose.
Reads prompts/anomalies.yaml directly (the machine-written memo blocks).
"""
import difflib
import re
import sys
from pathlib import Path

LEDGER = Path(__file__).resolve().parent.parent / "prompts/anomalies.yaml"


def arg(name, default):
    return float(sys.argv[sys.argv.index(name) + 1]) if name in sys.argv else default


def memos():
    out, cur = {}, None
    pat = re.compile(r"^  - id: ['\"]?([^'\"\s]+)['\"]?\s*$|^      (ja|en): '((?:[^']|'')*)'\s*$", re.M)
    for m in pat.finditer(LEDGER.read_text(encoding="utf-8")):
        if m[1]:
            cur = out.setdefault(m[1], {})
        else:
            cur[m[2]] = m[3].replace("''", "'")
    return out


def main():
    data = memos()
    ids = list(data)
    for lang, th in (("ja", arg("--ja", 0.75)), ("en", arg("--en", 0.8))):
        pairs = []
        for i, a in enumerate(ids):
            for b in ids[i + 1:]:
                r = difflib.SequenceMatcher(None, data[a][lang], data[b][lang]).ratio()
                if r >= th:
                    pairs.append((r, a, b))
        print(f"[{lang}] ratio >= {th}: {len(pairs)} pairs")
        for r, a, b in sorted(pairs, reverse=True):
            print(f"  {r:.2f}  {a}: {data[a][lang]}  |  {b}: {data[b][lang]}")


if __name__ == "__main__":
    main()
