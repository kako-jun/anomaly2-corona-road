# 昭和の痕跡：差分試作

各 `*-source.png` は built-in image generation に元写真と一件の変更を指定した生成元。`*-mask.png` は不定形の透過境界、`*-preview.png` は元写真＋差分の検証用画像。実際の配布候補は `assets/anomaly-overlays/` の切り抜き透過WebPと位置台帳。前景や床の目地との境界、ゲームサイズでの視認性、blink、実在看板を除いたbaselineとの整合は未検証。

`poster-rejected-source.png` は元のポスターが確認できず、生成された文字も実在ブランド風のため不採用。煙と人物は静止案であり、揺れ・横切りは未実装。

2026-10-29 レビュー: `shoe-preview.png` / `cam07/shoe.webp` 初版は階段に対して大きく子供用に見えず不採用。再試作中。

靴 v2 は `shoe-v2-preview.png`。差分は `assets/anomaly-overlays/cam07/shoe-v2.webp`、位置 (114,246)、36×31。元画像に重ね直した結果とプレビューは全画素一致。物体自体は初版より小さいが、暗く小さいため子供靴と判別できるかゲーム画面で要確認。旧差分は `shoe-v1-rejected.webp` に退避。

靴 v2 はユーザーが「いい」と評価。ゲーム画面への接続・視認性確認は引き続き未実施。
