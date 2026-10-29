# CAM02 試作（未採用）

基準: `public/images/cam2.webp` (676×900)、対象: CAM02-E07 の左シャッター。

- `shop-reopens-generated.png`: 閉店した店が戻る案。シャッター下に暖かな店内光。生成時の指示: 左シャッターを少し上げて暖色の細い隙間を作り、他は維持する。人物・文字なし、懐かしく寂しい雰囲気。
- `advertisement-generated.png`: 昭和風ホーロー広告の試作。内容の方向転換前の比較用。
- `advertisement-compositing-attempt.png`: 元画像と広告生成画像を渡し、広告のみ移植するよう画像生成へ指示した結果。背景も再生成されるため部分合成として不合格。
- `ofuda-generated.png`: 和風怪談案。現在の方向とは異なる比較用。

いずれも built-in image generation で生成。全画面が再描画されており、基準画像と寸法・背景が一致しない。マスク、原寸合成、差分確認およびライブ A/B は未実施。ゲーム素材として登録しない。次は生成部分の位置合わせとマスク合成を実施し、周囲画素の一致と自然さを確認する。公開前には実在看板を処理した baseline が必要。

## 部分合成の試行

`shop-reopens-composite.png` は基準画像を下地に、生成画像を 676×900 に合わせ、`shop-reopens-mask.png` で左下の開口と床の光を合成したもの。マスクは境界をぼかし、範囲外をゼロにした。`shop-reopens-difference.png` は差分を強調した画像、`shop-reopens-blink.gif` は切替確認用。マスク外の画素差は ImageMagick でゼロを確認。開口と反射は原寸で目視したが、ライブ blink の最終確認とゲーム画面での見え方の確認は未実施。公開用素材として未採用。

量産用差分の試作は `assets/anomaly-overlays/cam02/shop-reopens.webp`。原画像内の左上座標 `(0, 308)`・サイズ `199×250`。この WebP を元画像に重ねた再構成と上記合成画像の全画素一致を確認した。全画面画像はゲーム配布物ではなく、ここでは実験・比較用。
