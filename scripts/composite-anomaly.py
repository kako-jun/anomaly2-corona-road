#!/usr/bin/env python3
"""基準写真と生成画像の差分から、変化した領域だけを透過 WebP として切り出す。

使い方:
  uv run --with pillow --with numpy python3 scripts/composite-anomaly.py \
    --base public/images/cam1.webp --gen work/gen.png --box 380,640,470,720 \
    --out assets/anomaly-overlays/cam01/slug.webp [--preview work/composite.png]

--box は基準写真の px (x1,y1,x2,y2)。要素の座標は prompts/camera-element-inventory.md
(1000 正規化) から `px = norm * 寸法 / 1000` で換算し、実物の輪郭に合わせて少し広げる。
基準を下地とし、生成画像との差分がボックス内で閾値を超えた領域だけを不定形マスクにし、
境界は膨張後にガウスぼかしで徐々に透過させる。マスク外は alpha=0 (基準と画素一致)。

標準出力に JSON の検証結果を出す。status が fail なら終了コード 2、warn は 0。
"""
import argparse
import json
import sys

import numpy as np
from PIL import Image, ImageFilter


def load_rgb(path):
    return Image.open(path).convert("RGB")


def phase_shift(a, b):
    """グレースケール配列 a(基準) に対する b(生成) のずれ (dx, dy) を位相相関で推定する。"""
    win = np.outer(np.hanning(a.shape[0]), np.hanning(a.shape[1]))
    fa = np.fft.fft2((a - a.mean()) * win)
    fb = np.fft.fft2((b - b.mean()) * win)
    r = fa * np.conj(fb)
    r /= np.abs(r) + 1e-9
    c = np.fft.ifft2(r).real
    iy, ix = np.unravel_index(np.argmax(c), c.shape)
    h, w = a.shape
    dy = iy - h if iy > h // 2 else iy
    dx = ix - w if ix > w // 2 else ix
    return int(dx), int(dy)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--base", required=True)
    p.add_argument("--gen", required=True)
    p.add_argument("--box", required=True, help="x1,y1,x2,y2 (基準写真の px)")
    p.add_argument("--out", required=True, help="切り出す透過 WebP のパス")
    p.add_argument("--preview", help="検証用の全画面合成 PNG の書き出し先(作業物。コミットしない)")
    p.add_argument("--threshold", type=float, default=18.0, help="差分(0-255)の閾値")
    p.add_argument("--dilate", type=int, default=3, help="マスク膨張 px")
    p.add_argument("--feather", type=float, default=3.0, help="境界ぼかしの sigma px")
    p.add_argument("--min-region", type=int, default=12, help="これ未満の孤立点を除去(px数)")
    p.add_argument("--no-align", action="store_true", help="位相相関による平行移動補正を行わない")
    p.add_argument("--no-tone-match", action="store_true", help="ボックス外での色味合わせを行わない")
    p.add_argument("--min-frac", type=float, default=0.004, help="変化画素/ボックスの下限(未満は fail)")
    p.add_argument("--max-frac", type=float, default=0.65, help="変化画素/ボックスの上限(超は warn)")
    p.add_argument("--max-outside", type=float, default=0.03, help="ボックス外で閾値超の割合(超は fail)")
    a = p.parse_args()

    base_img = load_rgb(a.base)
    W, H = base_img.size
    gen_img = load_rgb(a.gen)
    warnings, status = [], "ok"
    res = {"base_size": [W, H], "gen_size": list(gen_img.size)}

    if abs(gen_img.width / gen_img.height - W / H) > 0.02:
        warnings.append("生成画像の縦横比が基準と異なる。リサイズで歪む")
    if gen_img.size != (W, H):
        gen_img = gen_img.resize((W, H), Image.LANCZOS)

    x1, y1, x2, y2 = [int(v) for v in a.box.split(",")]
    x1, y1, x2, y2 = max(0, x1), max(0, y1), min(W, x2), min(H, y2)
    box_mask = np.zeros((H, W), bool)
    box_mask[y1:y2, x1:x2] = True

    base = np.asarray(base_img).astype(np.float32)
    gen = np.asarray(gen_img).astype(np.float32)

    # 位置合わせ(ボックス外の構造で平行移動のみ推定)
    shift = (0, 0)
    if not a.no_align:
        gb = base.mean(2)
        gg = gen.mean(2)
        dx, dy = phase_shift(gb, gg)
        if (dx, dy) != (0, 0) and abs(dx) <= 12 and abs(dy) <= 12:
            gen = np.roll(gen, (dy, dx), axis=(0, 1))
            shift = (dx, dy)
            warnings.append(f"生成画像を ({dx},{dy}) px 平行移動して位置合わせした")
        elif abs(dx) > 12 or abs(dy) > 12:
            warnings.append(f"位相相関のずれ ({dx},{dy}) が大きすぎるため補正せず")
    res["align_shift"] = list(shift)

    # 色味合わせ: ボックス外で生成→基準へのチャンネル別 gain/offset を当てる
    out_idx = ~box_mask
    if not a.no_tone_match:
        for c in range(3):
            g = gen[..., c][out_idx][::7]
            b = base[..., c][out_idx][::7]
            gain = np.std(b) / max(np.std(g), 1e-3)
            gen[..., c] = np.clip((gen[..., c] - g.mean()) * gain + b.mean(), 0, 255)

    # 差分(軽くぼかしてセンサ粒状・圧縮ノイズを抑える)
    def blur(arr):
        return np.asarray(Image.fromarray(arr.astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32)

    diff = np.abs(blur(base) - blur(gen)).max(2)
    outside_frac = float((diff[out_idx] > a.threshold).mean())
    res["outside_box_changed_frac"] = round(outside_frac, 5)
    if outside_frac > a.max_outside:
        status = "fail"
        warnings.append(f"ボックス外で {outside_frac:.1%} が閾値超。生成が基準を描き直している可能性")

    m = (diff > a.threshold) & box_mask
    mi = Image.fromarray((m * 255).astype(np.uint8))
    # 孤立点の除去(開処理)後に膨張
    mi = mi.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    arr = np.asarray(mi) > 0
    # 小領域除去(簡易: 連結成分を走査)
    try:
        from scipy import ndimage  # 任意

        lab, n = ndimage.label(arr)
        if n:
            sizes = ndimage.sum(arr, lab, range(1, n + 1))
            keep = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s >= a.min_region])
            arr = keep
    except Exception:
        pass
    if a.dilate > 0:
        k = a.dilate * 2 + 1
        arr = np.asarray(Image.fromarray((arr * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(k))) > 0
    changed_px = int(arr.sum())
    box_area = (x2 - x1) * (y2 - y1)
    frac = changed_px / max(box_area, 1)
    res["changed_pixels"] = changed_px
    res["changed_frac_of_box"] = round(frac, 4)
    if frac < a.min_frac:
        status = "fail"
        warnings.append("変化がほぼ無い(生成が指示を反映していない可能性)")
    elif frac > a.max_frac:
        if status == "ok":
            status = "warn"
        warnings.append("変化がボックスいっぱいに広がっている。ボックスを広げるか対象を再確認")

    # 不定形マスク + ぼかし。境界は box を feather*3 だけ広げた範囲に制限
    alpha = Image.fromarray((arr * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(a.feather))
    al = np.asarray(alpha).astype(np.float32) / 255.0
    pad = int(a.feather * 3 + a.dilate + 1)
    env = np.zeros((H, W), bool)
    env[max(0, y1 - pad) : y2 + pad, max(0, x1 - pad) : x2 + pad] = True
    al[~env] = 0
    a8 = np.round(al * 255).astype(np.uint8)
    a8[a8 < 2] = 0
    ys, xs = np.nonzero(a8)
    if len(xs) == 0:
        print(json.dumps({"status": "fail", "warnings": warnings + ["マスクが空"], **res}, ensure_ascii=False, indent=2))
        sys.exit(2)
    bx1, by1, bx2, by2 = int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1
    res["overlay_origin"] = [bx1, by1]
    res["dimensions"] = [bx2 - bx1, by2 - by1]
    res["bbox"] = [bx1, by1, bx2, by2]
    if bx1 < x1 - pad or by1 < y1 - pad or bx2 > x2 + pad or by2 > y2 + pad:
        status = "fail"
        warnings.append("overlay がボックス+ぼかし余白の外に出ている")

    # 切り出し(RGB は生成、alpha はマスク)
    genu = np.clip(np.round(gen), 0, 255).astype(np.uint8)
    rgba = np.dstack([genu, a8])[by1:by2, bx1:bx2]
    ov = Image.fromarray(rgba, "RGBA")
    ov.save(a.out, "WEBP", lossless=True, exact=True)

    # 検証: 保存した webp を読み戻して基準に重ね、期待合成と比較
    ov2 = Image.open(a.out).convert("RGBA")
    recon = base_img.convert("RGBA")
    recon.alpha_composite(ov2, (bx1, by1))
    recon_a = np.asarray(recon.convert("RGB")).astype(np.int16)
    al_full = a8.astype(np.float32)[..., None] / 255.0
    expect = np.clip(np.round(base * (1 - al_full) + genu.astype(np.float32) * al_full), 0, 255).astype(np.int16)
    recon_err = int(np.abs(recon_a - expect).max())
    base_a = np.asarray(base_img).astype(np.int16)
    changed_mask = (recon_a != base_a).any(2)
    outside_overlay_changed = int(changed_mask[~(a8 > 0)].sum())
    res["recon_max_abs_err_vs_composite"] = recon_err
    res["pixels_changed_outside_alpha"] = outside_overlay_changed
    if recon_err > 1:
        status = "fail"
        warnings.append("再構成が合成結果と一致しない")
    if outside_overlay_changed:
        status = "fail"
        warnings.append("alpha=0 の画素で基準が変わっている")

    if a.preview:
        Image.fromarray(recon_a.astype(np.uint8)).save(a.preview)
    res["status"] = status
    res["warnings"] = warnings
    print(json.dumps(res, ensure_ascii=False, indent=2))
    sys.exit(2 if status == "fail" else 0)


if __name__ == "__main__":
    main()
