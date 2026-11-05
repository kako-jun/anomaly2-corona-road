# 異変候補プール

異変の台帳は `anomalies.yaml`（全異変の正本）。ここは、台帳に planned で載せた画像案の**制作仕様の詳細**（box・生成プロンプトなど）と、案出しの方針の説明だけを置く。

## 正本と運用

- 全異変（制作済み `produced`・未制作 `planned`・画像以外の異変）の正本は台帳（`anomalies.yaml`。書式と昇格ルールは [`README.md`](./README.md) の「台帳の書式」）。採用/不採用の状態はプールに持たない。不要な案は台帳から削除する。
- プールに残るのは「残す案の制作仕様の詳細」（下の「制作仕様（未制作）」各節。制作して昇格したら、その案の `###` 節を削除する）と、「画像以外の異変（背景非依存）の在庫の方針」節の方針の説明だけ。
- 写っている物の説明・座標・カメラ写真の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。ここでは要素IDだけ参照し、物体説明や座標を複製しない。
- 画像異変の目標は約300件（総数は `npm run ledger:summary` が真実）。案を足す前に、既存の台帳と重複しないか（対象・変化・見え方・報告カテゴリの類似）を確認する。
- カテゴリは `camera` / `object` / `environment` / `person` / `surreal`、フェーズは `early` / `mid` / `late`。目立ち度は `subtle` / `medium` / `obvious`。
- 文字の改変案は、元の文字を原寸で読み直してから具体的な文言を決める。

## 制作仕様（未制作）— CAM 01

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 02

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 03

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 04

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 05

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 06

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 07

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 08

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 画像以外の異変（背景非依存）の在庫の方針

画像以外の異変（画面の乱れ・音・UI・ルール。用語は [`README.md`](./README.md) の「用語集」）の在庫は台帳（`anomalies.yaml` の `kind: non_image`）が正本。ここには配分と視点の方針だけを置く。画像差分を作らず、CSS / Canvas / Web Audio / 状態管理で出す。写真要素に紐づかないため要素IDは持たない（効果の実装は別タスク）。

**報告できない系統の扱い**: 報告は「見ているカメラの異変のカテゴリを選ぶ」だけなので、カメラに結びつかない異変（UI・メタ、ゲームルール系）は現状の報告方式では受け付けられず、採用の前提に窓口の設計が要る（#80）（別議論。報告ボタンを消す案も、報告手段を失うため同様）。カメラに結びつく系統（カメラ画像そのもの、音）は現方式のまま扱える。これらは画像系と違い特定のカメラに固定せず、**出現のたびにカメラを無作為に選ぶ**（kako-jun 決定。設計は Issue #70）。

分類軸: `image`（画像差分が必要）/ `non_image`（画像生成不要）/ `hybrid`（両方）。`background-bound`（看板・シャッター・通路奥など背景依存）/ `background-free`（画面揺れ・音・camera lost など）。

### 配分の目安（初期案。MVP 40 件想定・現状の台帳件数とは別）

本文の件数は現状の pool 件数・台帳件数とは無関係。

- 内訳: sanitized baseline は全カメラ、画像異変 24、画像以外のカメラ異変 6、音 4、UI/メタ 6。
- フェーズ: early 12（小さな物体・看板・照明・音の違和感）/ mid 16（扉・通路奥・人影・camera lost・画面揺れ）/ late 12（物理崩壊・人物異常・UI 破壊・タイマー異常）。
- 背景別: 看板が強い背景は signage/text/poster 系、通路奥は intruder/corridor/door/fog 系、シャッター・店先は door/shutter/peek/knock 系、蛍光灯・天井は light/flicker/ceiling/shadow 系、余白・暗部は creature/surreal/reflection 系。camera lost・shake・static・audio・UI/meta はどの背景にも置ける。
- 方針: 序盤は小さく、中盤は確信でき、終盤はルール自体が壊れる構成にする（反復空間の間違い探し系ゲームの差分を参考）。

### 汎用タイプの視点（取りこぼし防止）

画像異変の汎用タイプは `anomaly_type` enum（README）と台帳の画像案で足りる。enum の名前だけでは見落としやすい視点を、案出しのチェックとして残す。

| 視点                | 内容                                           | 近い `anomaly_type`          |
| ------------------- | ---------------------------------------------- | ---------------------------- |
| scale               | 看板やゴミ箱が不自然に大きい/小さい            | `surreal` / `state_change`   |
| rotate              | 貼り紙や看板だけ上下逆・横向き                 | `state_change` / `displace`  |
| float / phase       | 物が少し浮く／壁に半分埋まる                   | `displace` / `surreal`       |
| language drift      | 日本語看板が英語・記号・読めない文字へ         | `text_change`                |
| impossible geometry | 通路が伸びる・ループする・角が増える           | `surreal`                    |
| wrong shadow        | 影だけ光源と逆を向く                           | `reflection`                 |
| flood / wet         | 床が濡れる、黒い水が流れる                     | `add_object` / `color_shift` |
| twins               | 同じ姿が左右対称に立つ（`duplicate` の人物版） | `duplicate`                  |
| crawling figure     | 床や壁際に低い姿勢の人影                       | `add_person`                 |
| shadow appears      | 物体なしの影が床や壁に出る                     | `reflection`                 |
| human disappears    | もともといた人や影が消える                     | `remove_object`              |
| faceless person     | 人物の顔の情報だけが消える                     | `state_change`               |
| giant / tiny human  | 通路奥の人影のサイズが不自然                   | `surreal`                    |
| intruder seated     | ベンチや床に座る人影                           | `add_person`                 |
| fast figure         | 画像では残像、ゲーム中の演出で一瞬横切る       | `add_person`                 |
| forbidden object    | 屋内に場違いな物（濡れた道路標識など）         | `add_object`                 |
