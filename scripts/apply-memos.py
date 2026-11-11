#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Move the one-line memo drafts into the ledger (#325, second stage).

  uv run --script scripts/apply-memos.py            # drafts/anomaly-memos-review.md -> prompts/anomalies.yaml
  uv run --script scripts/apply-memos.py --check    # fail if the ledger differs from what a run would write

Input: the table in drafts/anomaly-memos-review.md (| id | Japanese | English |). Fix a wording THERE and rerun; do
not hand-edit the ledger's `memo`. For every ledger entry the script (re)writes

    memo:
      ja: '...'
      en: '...'

right after the entry's `detail:` line (an existing `memo:` block and its `# sample` comment are replaced), so a rerun is
idempotent. It fails if an id is missing on either side, a wording is empty or multi-line, Japanese is over 20
characters or English over 40, or a wording is used twice. Everything else in the ledger text is left as it is.
Before approval the draft is the input and the ledger is generated from it; once the wording is approved the draft file
and this script are deleted and the ledger is the only master.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DRAFT = ROOT / "drafts/anomaly-memos-review.md"
LEDGER = ROOT / "prompts/anomalies.yaml"
MAX_JA, MAX_EN = 20, 40


def read_draft() -> dict[str, tuple[str, str]]:
    rows: dict[str, tuple[str, str]] = {}
    for line in DRAFT.read_text(encoding="utf-8").splitlines():
        m = re.match(r"\| (\S+) \| (.*?) \| (.*?) \|$", line)
        if not m or m[1] in ("異変", "---"):
            continue
        rid, ja, en = m[1], m[2].strip(), m[3].strip()
        if rid in rows:
            sys.exit(f"{rid}: listed twice in the draft")
        if not ja or not en:
            sys.exit(f"{rid}: empty wording")
        if len(ja) > MAX_JA:
            sys.exit(f"{rid}: Japanese is {len(ja)} characters (max {MAX_JA}): {ja}")
        if len(en) > MAX_EN:
            sys.exit(f"{rid}: English is {len(en)} characters (max {MAX_EN}): {en}")
        rows[rid] = (ja, en)
    for idx, name in ((0, "Japanese"), (1, "English")):
        seen: dict[str, str] = {}
        for rid, pair in rows.items():
            if pair[idx] in seen:
                sys.exit(f"{rid} and {seen[pair[idx]]}: the same {name} wording")
            seen[pair[idx]] = rid
    return rows


def quote(s: str) -> str:
    return "'" + s.replace("'", "''") + "'"


def apply(text: str, rows: dict[str, tuple[str, str]]) -> str:
    lines = text.split("\n")
    out: list[str] = []
    used: set[str] = set()
    i = 0
    cur: str | None = None
    while i < len(lines):
        line = lines[i]
        m = re.match(r"  - id: ['\"]?([^'\"\s]+)['\"]?\s*$", line)
        if m:
            cur = m[1]
        # drop an existing memo block (and the sample comment right above it)
        if re.match(r"    memo:\s*$", line):
            if out and out[-1].lstrip().startswith("# sample"):
                out.pop()
            i += 1
            while i < len(lines) and re.match(r"      (ja|en):", lines[i]):
                i += 1
            continue
        out.append(line)
        if cur is not None and re.match(r"    detail:", line):
            if cur not in rows:
                sys.exit(f"{cur}: in the ledger but not in the draft")
            ja, en = rows[cur]
            out += ["    memo:", f"      ja: {quote(ja)}", f"      en: {quote(en)}"]
            used.add(cur)
        i += 1
    extra = set(rows) - used
    if extra:
        sys.exit(f"in the draft but not in the ledger (or with no detail line): {sorted(extra)[:5]}")
    return "\n".join(out)


def main() -> None:
    rows = read_draft()
    old = LEDGER.read_text(encoding="utf-8")
    new = apply(old, rows)
    if "--check" in sys.argv:
        if new != old:
            sys.exit("prompts/anomalies.yaml memo differs from the draft: run scripts/apply-memos.py")
        print(f"ok: {len(rows)} memos match the draft")
        return
    LEDGER.write_text(new, encoding="utf-8")
    print(f"wrote {len(rows)} memos to {LEDGER.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
