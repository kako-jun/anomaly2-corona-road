"""#347: scripts/also-categories-input.tsv の行を台帳 prompts/anomalies.yaml の also_categories に反映する。

再実行できる（既にある要素は足さない）。入力の行頭 # の行は無効（適用しない）。
台帳は行単位で編集し、other fields は触らない。前提の主カテゴリが台帳と違う行は適用せず報告する。

  uv run python3 scripts/apply-also-categories.py [--check]   (--check: 書き込まず差分件数だけ表示)
"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
ledger = root / 'prompts' / 'anomalies.yaml'
rows = []
for line in (root / 'scripts' / 'also-categories-input.tsv').read_text(encoding='utf8').splitlines():
    if not line.strip() or line.startswith('#'):
        continue
    id_, strength, prim, also, *_ = line.split('\t')
    rows.append((id_, strength, prim, [a for a in also.split(',') if a]))

lines = ledger.read_text(encoding='utf8').split('\n')
starts = {}
for i, l in enumerate(lines):
    m = re.match(r"  - id: ['\"]([^'\"]+)['\"]", l)
    if m:
        starts[m.group(1)] = i

added = {'strong': 0, 'medium': 0, 'weak': 0}
problems = []
inserts = []  # (line index, new text) processed bottom-up
for id_, strength, prim, also in rows:
    if id_ not in starts:
        problems.append(f'{id_}: not in ledger')
        continue
    i = starts[id_] + 1
    cat_i = also_i = None
    while i < len(lines) and not lines[i].startswith('  - id:'):
        if lines[i].startswith('    category: '):
            cat_i = i
        if lines[i].startswith('    also_categories:'):
            also_i = i
        i += 1
    cm = re.match(r"    category: (['\"])([^'\"]*)\1", lines[cat_i]) if cat_i else None
    cat = cm.group(2) if cm else None
    q = cm.group(1) if cm else "'"
    if cat != prim:
        problems.append(f'{id_}: category is {cat!r}, input expects {prim!r} (skipped)')
        continue
    cur = re.findall(r"['\"]([^'\"]+)['\"]", lines[also_i]) if also_i is not None else []
    new = [a for a in also if a not in cur and a != cat]
    if not new:
        continue
    merged = cur + new
    text = '    also_categories: [' + ', '.join(f"{q}{a}{q}" for a in merged) + ']'
    inserts.append((also_i, text, True) if also_i is not None else (cat_i + 1, text, False))
    added[strength] += 1

for idx, text, replace in sorted(inserts, reverse=True):
    if replace:
        lines[idx] = text
    else:
        lines.insert(idx, text)
if '--check' not in sys.argv:
    ledger.write_text('\n'.join(lines), encoding='utf8')
print('applied (entries changed): ' + ', '.join(f'{k} {v}' for k, v in added.items()))
for p in problems:
    print('PROBLEM', p)
