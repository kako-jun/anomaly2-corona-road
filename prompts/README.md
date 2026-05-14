# Anomaly Prompts

GPT Image 2 で「元の監視カメラ写真の同一性を保ったまま異変だけ追加する」ためのプロンプト管理。

## ファイル構成

- `anomalies.yaml` — 異変データ正本（1異変=1エントリ）
- `base-template.md` — 共通プロンプト（背景保持の定型文）
- `photos/` — 元写真の置き場（`photos/cam01_baseline.jpg` 等）
- `queue/index.html` — 生成済みプロンプトのコピペUI（ブラウザで開く）

## ワークフロー

1. 元写真を `prompts/photos/` に置く
2. `anomalies.yaml` に異変を追記する
3. `npm run build:prompts` で `queue/index.html` を再生成
4. ブラウザで `queue/index.html` を開く
5. 各行の Copy ボタンでプロンプトをコピー → ChatGPT に元写真と一緒に投げる
6. 出力画像を `src/assets/anomalies/{id}.webp` 等に保存

## 異変タイプ enum

`anomaly_type` に書ける値:

| type            | 説明           | 例                                           |
| --------------- | -------------- | -------------------------------------------- |
| `add_object`    | 物を足す       | 看板、人形、ゴミ袋                           |
| `remove_object` | 物を消す       | 看板が消える                                 |
| `add_person`    | 人物を足す     | 後ろ姿の人                                   |
| `add_creature`  | 非人類を足す   | 宇宙人、影、何か                             |
| `state_change`  | 状態を変える   | 扉が開く、ライトが消える、シャッターが上がる |
| `duplicate`     | 同じ物を複数化 | 看板が2枚に増える                            |
| `multiply`      | 数の増殖       | 通行人が異常に増える                         |
| `displace`      | 位置をずらす   | 看板が天井に貼り付く                         |
| `color_shift`   | 色だけ変える   | 床だけ赤く染まる                             |
| `text_change`   | 文字を変える   | 駅名表示が違う文字に                         |
| `surreal`       | 物理崩壊系     | 床が消える、空間が歪む                       |
| `reflection`    | 反射・影の異常 | 影が逆向き、鏡に映らない                     |

## カテゴリ（ゲーム内分類）

ゲームの report 選択肢に対応:

- `camera` — 技術的グリッチ、フィード異常
- `object` — 物の出現・消失・変化
- `environment` — 光、構造、雰囲気
- `person` — 人影、動き
- `surreal` — 現実崩壊

## フェーズ

ゲーム時間帯別の難易度:

- `early` (0:00-2:00) — 微細
- `mid` (2:00-4:00) — 明確
- `late` (4:00-6:00) — 物理崩壊・メタ

## エージェントへの依頼例

```
prompts/anomalies.yaml に以下の異変を5件追加してください:
- base_photo: photos/cam01_baseline.jpg
- カテゴリ: surreal、フェーズ: late
- 内容は宇宙人系で、自由に
```

Claude は enum から適切な `anomaly_type` を選び、`location` と `detail` を埋めて追記する。
