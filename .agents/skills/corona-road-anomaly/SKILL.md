---
name: corona-road-anomaly
description: 'Plan and produce a visual anomaly for Anomaly²: Corona Road by resolving stable camera-element IDs and compositing only the chosen change area into its processed baseline.'
---

# Corona Road anomaly creation

Use this skill when planning or producing an image-based anomaly for this game. The goal is a repeatable record from idea through review, with the existing camera photo remaining the authoritative background.

## References

- Read [`prompts/camera-element-inventory.md`](../../../prompts/camera-element-inventory.md) for the single source of truth for camera photos, visible elements, stable IDs, and approximate bounds.
- Open the matching `prompts/atlas/camNN.svg` for a visual index of those IDs; regenerate maps with `npm run build:camera-atlas` after changing the inventory.
- Read [`prompts/candidate-pool.md`](../../../prompts/candidate-pool.md) for photo-specific unselected ideas, the Showa-theme candidates, and the runtime/audio/UI anomaly stock with its phase-allocation guide; remove a selected row when promoting it into `anomalies.yaml`.
- Follow [`prompts/README.md`](../../../prompts/README.md) and [`prompts/base-template.md`](../../../prompts/base-template.md) for prompt conventions.
- The current game camera mapping is in `src/utils/gameConfig.ts`; the WebP exports are in `public/images/`.

## Workflow

1. **Resolve the referenced object.** When the user names a stable element ID, use that exact entry. When they describe an object naturally (for example, “the pink pot by the right wall”), match it against the inventory's camera, reading-order description, and coordinates. State the matched camera/element ID and bounds before production. If two entries still fit, ask which one rather than guessing. The inventory is the only source for element descriptions and coordinates; do not create duplicate descriptions elsewhere.
2. **Inspect the whole frame before ideation.** Sweep the image in reading order: top to bottom, and within each horizontal band left to right. Check the element inventory against the actual frame, including objects, surfaces, fixtures, sign/text, openings, lights, shadows, reflections, and notable empty/dark areas. Record uncertain readings as uncertain rather than guessing. The camera's game label may not match the photographed scene. Build ideas only from visible affordances. Mark unsupported ideas as runtime/hybrid instead of forcing them into the photo.
3. **Define one anomaly.** Record a stable anomaly ID, source baseline, camera ID, element ID, category, anomaly type, phase, intended subtlety, exact changed element, and short rationale. Do not combine unrelated changes in one generation.
4. **Specify location reproducibly.** Use the selected element's normalized coordinates `(x,y)` from 0 to 1000, origin at top left. Refine its box around the actual object at full resolution. Record the element ID and final mask/box in the anomaly entry; do not copy the element's description into a second inventory. A polygon or hand-painted mask is preferred for irregular objects.
5. **Generate a proposal.** Attach the baseline and ask for only the defined change. Tell the image model to preserve framing, perspective, lighting, texture, grain, compression, and every other object. Treat the result as a source layer, never as the finished full frame.
6. **Composite into the baseline.** Align the generated layer to the baseline without resizing or warping the baseline. Build a mask that covers the changed object and its immediate contact shadow/reflection when needed. Use a softly feathered, semi-transparent gradient transition around that mask so the insertion blends into the surveillance image. Keep mask alpha exactly zero outside the documented transition boundary. Do not apply global color correction to the baseline.
7. **Review the result.** Compare baseline and composite at the same dimensions. Inspect a blink/A-B view and a difference image. Confirm that every changed pixel lies inside the documented mask/transition envelope; confirm no unrelated object, sign, camera framing, or overlay changed. If the changed region is too large to blend without collateral edits, regenerate or edit the local region manually.
8. **Register only after review.** Save the cropped transparent overlay and its placement as the game asset, preserve the baseline and generated source separately, and update the anomaly record with the selected element ID, final mask/box, paths, dimensions, and review status. Keep runtime-only effects out of the image-variant queue.

## Record fields

For each candidate/variant, maintain:

`id`, `camera_id`, `element_id`, `base_photo`, `mask_box_1000`, `category`, `anomaly_type`, `phase`, `subtlety`, `description`, `generation_prompt`, `generated_source`, `mask`, `overlay`, `overlay_origin`, `dimensions`, `review_status`, `notes`.

Use `planned`, `generated`, `composited`, and `reviewed` as distinct states. Never mark an AI-generated full frame as reviewed merely because the requested object looks right.

## Constraints

- The baseline is authoritative. Preserve all pixels outside the documented mask transition envelope.
- The feather is a local edge treatment, not permission for broad transparent overlays or global retouching.
- Check whether readable signage is fictional/public-safe before creating public variants. Keep sign sanitization as its own edit, separate from the anomaly.
- The eight processed `public/images/cam*.webp` files are the complete camera-photo set and the authoritative baselines for anomaly variants.
- Coordinate boxes are normalized so they survive resolution changes. Convert them to pixels only for the selected source dimensions and record those dimensions.

## 昭和の時間が戻る異変

この作品では、懐かしく寂しい日常が一瞬戻る方向を優先する。閉店した店が営業する、壊れていた物が直る等、写真で確認できる現状から一つだけ変える。怖がらせる小道具を前提にしない。核となる変化は「閉店した店が再び営業し、壊れたものが直り、失われた日常が一瞬戻る」で、広告などの小道具は補助でありテーマの中心にしない。修復は元写真で破損が確認できる箇所を選んでから制作し、破損を想像で決めない。『既に存在した物の変化』と『追加』を混同しない。小物は実ゲームの表示寸法で視認性を検証する。公開用 baseline の店名・マークは kako-jun の他作品のパロディにし、Corona Road の名前は維持する。最初の本命は「閉じたシャッターが少し開き暖かな店内光が漏れる」。候補は `prompts/candidate-pool.md` の「昭和テーマ候補」を参照（制作状態は `prompts/anomalies.yaml` が正本）。

生成結果が全体を描き直しても、元画像を下地とし、生成画像を元の寸法・構図に位置合わせして対象と必要な光・影だけをマスクで重ねる。境界は徐々に透過させ、マスク外は必ずゼロにする。床目地やシャッターの線を確認し、ずれが見える場合は位置合わせやマスクを調整する。PNGなどロスレスで保存し、マスク外差分ゼロを検証する。`experiments/showa-cam02/` は試行例であり、見た目の最終承認を意味しない。

## 差分アセット管理

ゲーム用の正本は共通 baseline と、変化領域を不定形の透過マスクで切り抜いた差分画像。差分を透過範囲に合わせて矩形にトリミングし、元画像内の左上座標と元画像・差分の寸法を記録する。全画面の合成画像は検証用であり量産配布しない。lossless WebP 等の透過形式を使い、元画像に記録座標で重ねた再構成が検証画像と一致することを確認する。生成元、マスク、差分・blink 等の制作資料はゲーム用アセットと分ける。詳細は `assets/anomaly-overlays/README.md`。

看板を架空化する時は、他作品の名前だけでなく実際のロゴやモチーフも参照し、旧店舗の意匠を残さない。同じ店が画面端に一部しか写っていない看板や別カメラにも現れる場合、断片まで同じ架空店に統一する。文字・絵だけが鮮明に浮かないよう、元写真の劣化、色、ぼけ、光、粒子に合わせて局所調整し、原寸で確認する。
元看板の図形レイアウト（例えば橙色の四角と内側の白い丸）は守り、文字と他作品由来の小さなロゴを元の表示面内に収める。ロゴを看板いっぱいに拡大しない。昭和の手描きらしさは細い不均一な筆致と適切なサイズで表し、機械的な書体や過度なぼかしを避ける。

## 追加前の類似チェック

新しい候補の記録や生成に着手する前に、`prompts/anomalies.yaml` の制作済み・試作と `prompts/candidate-pool.md` の未制作案の両方を検索する。対象要素ID、カメラ、物の名前、同義語、異変タイプを使い、同じ画面だけでなく別画面も確認する。完全一致だけでなく、以下の組み合わせが近く、プレイヤーから見た変化が実質同じ案も拾う。

- 対象（同じ物や似た店先・床など）と変化（出現・消失・移動・複製・色・形・反射など）
- 見た目・位置・大きさ・タイミング・報告カテゴリと、何に気付く異変か

候補から制作する場合、その候補自身は重複として数えず、既存の別IDと比較する。近い案を発見したらIDと共通点・差を記録し、単なる言い換えは追加しない。別カメラや別色だけでも、観察対象や発見の仕方に意味のある違いがあれば残してよい。意図的に似せたシリーズは、その意図と違いを記録する。似ているか不確実なときは断定せず候補として記録し、制作前に見比べる。

新しい案には安定ID、カメラ・対象要素ID、変化、報告カテゴリ、制作状態を記録する。制作したら同じ案を候補一覧から移して `anomalies.yaml` に登録し、透過差分画像のパスと配置・サイズ・検証状態を更新する。登録済み試作と候補を二重に数えない。候補IDや内容を変更する場合は既存素材との対応を壊さず、必要なら関連IDを残す。
