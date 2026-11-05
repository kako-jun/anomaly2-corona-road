# Anomaly Prompts

GPT Image 2 で「元の監視カメラ写真の同一性を保ったまま異変だけ追加する」ためのプロンプト管理。

## ファイル構成（このREADMEが根）

`prompts/` 配下の全ファイルはここから辿れる。台帳は多重管理しない。1つの事実の正本は1か所だけで、他は参照する。

```
prompts/
├── README.md                    根。全体の地図・enum・ワークフロー
├── camera-element-inventory.md  [正本] 写真8枚の写り込み要素・固定ID・座標
│   └── atlas/cam01〜08.svg      [派生物] 上の台帳から `npm run build:camera-atlas` で生成する視覚ガイド
├── candidate-pool.md            [正本] 未採用の異変案（写真固有・昭和・令和テーマ・runtime/音/UI/ルール在庫・配分目安）
├── anomalies.yaml               [正本] 全異変の台帳（画像・runtime、制作済み・未制作。書式は下の「台帳の書式」）
│   └── queue/index.html         [派生物] 上の台帳（のみ）から `npm run build:prompts` で生成するコピペUI
│       件数の要約は `npm run ledger:summary`（台帳が真実。docs に固定の進捗表を書かない）
├── base-template.md             [正本] 共通プロンプト（背景保持の定型文）
└── photos/cam01〜04_baseline.svg  旧試作のSVG仮ベース。加工済みカメラ写真の正本ではない
```

- `.agents/skills/corona-road-anomaly/SKILL.md` — 候補選定から差分合成・レビュー・登録までの反復手順（prompts/ の外にある制作スキル）。
- 異変の全件は `anomalies.yaml`（制作済み=`produced`、未制作=`planned`、画像=`image`、画面の乱れ・音・UI・ルール=`runtime`）。まだ台帳に載せていない発想の段階の案が `candidate-pool.md`。選ぶ時は該当案を候補から削除して台帳へ一度だけ登録する（昇格ルールは下の「台帳の書式」）。
- `queue/index.html` と `atlas/*.svg` は**生成物**。手で編集せず、元の正本を直して再生成する。
- 昭和テーマの方針は制作スキルの「昭和の時間が戻る異変」、未制作の昭和案は `candidate-pool.md` の「昭和テーマ候補」にある。
- 4人目（令和のZ世代の子供）の「令和の異変（どれでも3つ見つければ条件成立）」の候補は `candidate-pool.md` の「令和テーマ候補」にある（制作済みの令和の画像異変は `anomalies.yaml` の `candidate_id: CR-RZ-*` で探す（#83 の 1. で本物の台帳印が入るまでの仮の見つけ方）。昭和でない令和の物。方針は `docs/story.md` の「進行」節）。

## ワークフロー

1. `camera-element-inventory.md` から対象要素の固定ID・説明・座標を選ぶ
2. 加工済みの `public/images/cam*.webp` を基準画像として使う
3. `candidate-pool.md` から案を選ぶ。選んだ案は候補一覧から削除し、`anomalies.yaml` に生成待ちとして一度だけ登録する。カメラIDと要素IDを記録し、物体説明/座標はインベントリを参照する
4. `npm run build:prompts`（`node scripts/build-prompt-queue.mjs`）で `queue/index.html` を再生成する。元は `anomalies.yaml` のみ（`base-template.md` は読まない）
5. ブラウザでキューを開き、元画像とプロンプトをChatGPTに渡す
6. 生成出力を全面採用せず、元画像をベースに指定領域のみをマスク合成する。境界は半透明のぼかし/グラデーションでなじませる
7. 差分画像で変更が指定マスクの外に漏れていないことを確認する。レビュー済みの variant とマスクを登録する

繰り返し制作時は `.agents/skills/corona-road-anomaly/SKILL.md` の作業順と記録フィールドに従う。`camera-element-inventory.md` が写真要素と座標の唯一の正本。最終マスクは固定IDを参照しつつ、原寸で対象輪郭に合わせて確定する。

視覚ガイドを更新する場合は `npm run build:camera-atlas` を実行する。ガイド画像内のID/輪郭を手で編集せず、写り込みや座標の変更は必ず `camera-element-inventory.md` に行ってから再生成する。

## 現行の画像制作方針

- 目標規模: 異変の在庫を約300件にする（kako-jun 指示 2026-10-30）。1プレイで出すのはその一部で、プレイ間で同じ異変が重複しにくくするため。異常に細かく難しいゲームにする狙いもある。進捗はこのファイルに書かず、台帳（`anomalies.yaml`）の件数が真実。
- **視認性の基準**（kako-jun 指示 2026-11-02。この節が本文の唯一の正本。DESIGN.md §11・制作スキルはここを参照する）:
  - 方針: つまみの標準状態でも少しは見えるバランスにする。つまみを調整しないと全く見えない異変は意地悪すぎるので作らない。つまみ（明るさ・コントラスト）は、標準でも少し見える異変をより見やすくする補助である。
  - 標準状態は明るさ50 = `brightness(1.0)`、コントラスト50 = `contrast(1.05)`（つまみの範囲は明るさ 0.55〜1.45、コントラスト 0.6〜1.5。`src/utils/knob.ts`）。この状態で overlay を基準写真に alpha 合成し、alpha>0 の画素（overlay 面積）で測る。
  - 下限（すべて満たす）: 最大差分 ≥ 40、平均差分 ≥ 3、かつ「差分25以上の画素が100以上、または overlay 面積の25%以上」。画素差は 0〜255 のチャンネル最大。小さな物は絶対数でなく面積比でも通す（overlay が小さければ 100 画素に届かなくても、面積の25%が強く変われば見える）。
  - 根拠: 100 画素は表示上およそ 10×10 px で、見落としにくい最小の塊として置いた。台帳に当てて確かめたところ、下限未満になるのは変化が細線・点・極薄の差のものに限られ、overlay 自体が小さい物（AR-04-leaf-hole 等）は面積比で通る。基準を緩めると細線・点の異変が通り、厳しくすると小さな実物の異変が落ちるため、この値にした。台帳の現況は検査スクリプトの出力が真実で、ここに件数は書かない。
  - 検査: `uv run scripts/check-visibility.py [--id AR-…]`（無指定は全件）。数値定数はこの節に合わせる。下限未満は登録しないか、強めて作り直す。
  - 台帳 note の「要つまみ調整。」は「標準でも少し見えて、つまみで見やすくなる」の意味。つまみの効く方向（明るさを上げる/下げる）を事実で併記する。専用フィールドはまだ作らない。

- **配置の基準**（kako-jun 指示 2026-11-02。この節が正本）: 異変は同じカメラの画面内で**座標をかぶらせず分散**させ、「ここばっかり」にしない。新しい異変を作る前に、`anomalies.yaml` から同じ `camera_id` の全 overlay の矩形（`overlay_origin` と `dimensions`）を一覧し、置く矩形が既存と**重ならず、約30px以上離れる**ことを実測で確かめる。木箱・扉など、既存の異変が集まっている物には重ねない（昭和の小物との意図的な対比でも、同じ物には重ねない）。重なる候補は別の場所・別の要素で作り直す。note に最近傍の既存 id と距離を書く。

  **大面積の異変は例外**（kako-jun 指示 2026-11-04）: 壁一面のポスター、床一面の染み、天井一面の飾りなど、写真上の広い面を使う大胆な異変は、小物の異変と座標が重なってよい（ゲームはプレイヤーに座標を指定させない）。同じカメラの大面積どうしは重ねない。ただしゲームは1カメラにつき未検出の異変を1件しか同時に出さない（`src/hooks/useGameState.ts` の `spawnAnomaly`）ので、同じ面を使い物語上も両立しない対は「排他」と明記すれば box が重なってよい（例: CR-LG-08-01 と 08-02。台帳 note に「同プレイで共存させない」と書く）。大面積とは `dimensions` の面積が画像の約1/8以上のもので、note に「大面積」と書く。

- 第一経路は ChatGPT Images2 + Photoshop。ゲームに使われている絵または元写真を reference として渡し、言葉で **1変更だけ** 指定する。
- ChatGPT Images2 の出力は指定箇所以外もバイナリが変わるため、そのまま採用しない。Photoshop で元画像を下、生成結果を上に置き、変えた部分以外をレイヤーマスク/削除して元画像へ合成する。
- 合成時は境界ぼかし、色味、明暗、粒状感、圧縮ノイズをなじませる。最終画像の同一性は生成プロンプトではなく、Photoshop 合成で担保する。
- 異変追加と同じ方法で、実在の店名・看板を架空名へ差し替える。公開用素材では、実名看板を残さない版を baseline / sanitized として先に作ってから、その画像に異変を足す。
- 1回の生成で「看板差し替え + 異変追加」を同時に頼まない。差し替え、異変、色調整は別バリアント/別レイヤーとして作る。
- 指示は常に「構図・照明・監視カメラ感・粒状感・既存の壁床天井を保持し、指定箇所だけ変更する」を核にする。ただし最終保証は Photoshop 側で行う。
- 異変在庫は画像差分だけで作らない。画面揺れ、音、カメラ喪失、ノイズ、UI破壊、タイマー異常など、画像生成が不要な runtime 異変も台帳に載せて（`kind: runtime`）から配分する。
- 背景依存の強い異変（看板、人影、通路奥、シャッター等）と、背景非依存の異変（画面揺れ、音、camera lost、UI corruption等）を分けて管理する。

## 台帳の書式（status / kind / runtime）

`anomalies.yaml` が**全異変の正本**（#77）。画像異変だけでなく runtime 異変（画面の乱れ・音・UI・ルール）と未制作（planned）も載せる。「載せておかないと漏れる」ため。

移行中の planned は末尾の `# ---- planned: ... ----` 区画に置く（#77 PR2。全部移し終えたらマーカーは削除する）。各担当は自分のマーカー行の直後（次のマーカー行の前）にエントリを挿入する。

| フィールド | 値                                               | 省略時     |
| ---------- | ------------------------------------------------ | ---------- |
| `status`   | `produced`（制作済み）/ `planned`（未制作）      | `produced` |
| `kind`     | `image`（overlay を描く）/ `runtime`（画像なし） | `image`    |

| kind / status                      | 必須                                                                                        | 省略可・禁止                                                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| image + produced                   | `camera_id` `category` `anomaly_type` `overlay` `overlay_origin` `dimensions`（従来どおり） |                                                                                                                            |
| image + planned                    | `camera_id` `category` `anomaly_type`                                                       | `overlay` `overlay_origin` `dimensions` は省略可（書くなら3つ全部）。`spec` は任意                                         |
| runtime（planned / produced とも） | `anomaly_type`（runtime 型）`detail`                                                        | `camera_id` は省略可（出現のたびに無作為）。overlay 系は書けない。`also_category` は image と同じ検証（camera 不可）で任意 |

- `spec`: 制作仕様への参照（任意の文字列。例: `candidate-pool.md の ### CR-RZ-07`）。
- runtime の `category`: `feed_glitch` は `camera` 必須、`sound` は必須（推奨値は `environment`（仮）。コードは値を強制しない）。`ui_corruption` / `rule_break` は報告窓口が未設計（#80）なので**空でよい**。image は従来どおり必須。
- 検証はビルド時に全エントリへかかる（`src/utils/anomalyLedger.ts`）。未知の `status` / `kind` / `anomaly_type`、id 重複、必須欠落、kind と `anomaly_type` の食い違い（image に runtime 型、runtime に画像型）、planned でない image の overlay 欠落は、エントリ id つきでビルドが失敗する。
- ゲーム（`virtual:anomalies`）に渡るのは `kind: image` かつ `status: produced` だけ。planned と runtime は検証されるが抽選には出ない（出現ロジックと効果は #78・#79・#80）。
- 件数の要約: `npm run ledger:summary`（kind / status / category / anomaly_type とそのクロス集計。ビルドと同じ検証を通る）。

**昇格ルール（planned → produced）**: 制作の詳細（box・生成プロンプト・overlay など）は**台帳のエントリへ移し**、`candidate-pool.md` の該当 `###` 節を**削除**する。台帳とプールに同じ案を二重に残さない。

## 異変タイプ enum

`anomaly_type` に書ける値:

下の表の末尾4行（`feed_glitch` / `sound` / `ui_corruption` / `rule_break`）は `kind: runtime` 専用で、先頭12行は `kind: image` 専用（食い違いはビルドが失敗する）。ゲームは image の値を異変の抽選の重み（カメラ内の型ごとの未使用件数）に使う。未知の値はビルドが落ちる。型を増やすときは `src/utils/anomalyLedger.ts` の `ANOMALY_TYPES` も更新する（この表と `ANOMALY_TYPES` の一致はテストで縛ってある）。

| type            | 説明                      | 例                                           |
| --------------- | ------------------------- | -------------------------------------------- |
| `add_object`    | 物を足す                  | 看板、人形、ゴミ袋                           |
| `remove_object` | 物を消す                  | 看板が消える                                 |
| `add_person`    | 人物を足す                | 後ろ姿の人                                   |
| `add_creature`  | 非人類を足す              | 宇宙人、影、何か                             |
| `state_change`  | 状態を変える              | 扉が開く、ライトが消える、シャッターが上がる |
| `duplicate`     | 同じ物を複数化            | 看板が2枚に増える                            |
| `multiply`      | 数の増殖                  | 通行人が異常に増える                         |
| `displace`      | 位置をずらす              | 看板が天井に貼り付く                         |
| `color_shift`   | 色だけ変える              | 床だけ赤く染まる                             |
| `text_change`   | 文字を変える              | 駅名表示が違う文字に                         |
| `surreal`       | 物理崩壊系                | 床が消える、空間が歪む                       |
| `reflection`    | 反射・影の異常            | 影が逆向き、鏡に映らない                     |
| `feed_glitch`   | 画面全体の乱れ（runtime） | 映像が一瞬褪色する、ノイズ、カメラ喪失       |
| `sound`         | 音（runtime）             | 誰もいない通路でシャッター音が鳴る           |
| `ui_corruption` | UI の崩れ（runtime）      | 画面表示が壊れる                             |
| `rule_break`    | ルール違反（runtime）     | タイマーの異常                               |

## カテゴリ（ゲーム内分類）

ゲームの report 選択肢に対応:

- `camera` — そのカメラの画面全体のおかしくなり方（映像の乱れ等）。画像差分(overlay)では作らず runtime 異変（`anomaly_type: feed_glitch`）で扱うため、`kind: image` の entry には付けない（付けると `also_category` では拒否される）。物の変化は `object`
- `object` — 物の出現・消失・変化
- `environment` — 光、構造、雰囲気
- `person` — 人影、動き
- `surreal` — 現実崩壊

判定の軸は「何がおかしいか（主語）」（#236）:

- 人・人影・体の一部・痕跡 → `person`
- 物 → `object`
- 光や、床・壁・天井の面 → `environment`
- あり得ない現象 → `surreal`

`also_category`（任意の列）: 本当に割れる異変だけに付ける、もう1つの正解カテゴリ。プレイヤーが `category` と `also_category` のどちらを選んでも正解になる（フィードバックの `CONFIRMED — …` は主カテゴリ `category` を出す）。`category` と異なる有効なカテゴリ（小文字: `camera` / `object` / `environment` / `person` / `surreal`）でなければビルドが失敗し、エントリ id が表示される。`camera` は runtime 異変であって画像差分ではないので指定できない（拒否される）。無い異変が通常で、既存の entry には付けなくてよい。

線引き（#47, #236）: 物の出現（提灯・傘・旗・シーツ・蝿取りリボン・電球・テレビなど。天井から吊るものを含む）は `object`。床・壁・天井そのものの色・向き・霜などの面の状態の変化は `environment`（床タイル1枚が鏡になる、も `environment`）。反射そのものがおかしい（映るはずのものが映らない・反射の形が変わる・水鏡など）は `surreal`。映ったものが物・人なら、その物・人が主カテゴリで `also_category: 'surreal'`。

`also_category` の使い方の例: 映り込み = 主カテゴリ（物・人）+ `surreal`、扉の開閉 = `environment` と `object`、面の全面置換 = `environment` + `surreal`。
割れない・付けないもの: 影だけの `person`（ボタンの説明に影が明記されている）、数が多いだけの物の並置（ポスター・提灯・シーツ・靴・テレビ）は `object` のみ。物理的にあり得ない並び（全部違う時刻の時計など）は `object` + `also_category: 'surreal'`。光が漏れる扉・シャッターも付けない。床・壁・天井の面に変化が出る異変は、あり得ない景色なら `surreal` 主 + `also_category: 'environment'`、反射・光の形がおかしいなら `environment` 主 + `also_category: 'surreal'`。

## フェーズ

ゲーム時間帯別の難易度:

- `early` (0:00-2:00) — 微細
- `mid` (2:00-4:00) — 明確
- `late` (4:00-6:00) — 物理崩壊・メタ

## エージェントへの依頼例

```
prompts/anomalies.yaml に以下の異変を5件追加してください:
- base_photo: photos/cam01_baseline.svg
- カテゴリ: surreal、フェーズ: late
- 内容は宇宙人系で、自由に
```

Claude は enum から適切な `anomaly_type` を選び、`location` と `detail` を埋めて追記する。

ゲームが読む画像異変の書式: `overlay` は `assets/anomaly-overlays/camNN/<name>.webp`、`overlay_origin` は `'(x,y)'`、`dimensions` は小文字 x の `'幅x高さ'`（`46x97`）、`camera_id` は `CAMnn`。形が違うとビルドが失敗し、エントリ id が表示される。`element_id` は変化の起点となる要素で、複製・反射・はみ出しの異変でも起点の要素を指す（overlay が要素の枠からはみ出していてもよい）。

異変の多様性を確保するため、写真要素ごとの未採用案は `candidate-pool.md` に集約する。猫、物の増減、反射、床壁天井の模様、文字反転、色形、段数、ノブ左右、吊り物、紙、水たまりを含む。候補数は完成素材数ではない。

`anomalies.yaml` は全異変の台帳（以下は画像異変の運用）。`queue/index.html` は `kind: image` の全件（`produced` と `planned`）を表示し、status 列で区別する（`planned` は「未作成」として強調）。`kind: runtime` は画像を作らないので載せない。`produced` の行は制作済みなので、表示された項目が生成待ちとは限らない。`review_status: composited` は静止差分の試作で、完成・採用・ゲームへの実装を意味しない。`category` はゲームの報告用5分類に合わせた値で、猫などの小動物も現在は `object` に仮分類している（ゲーム側の報告分類確定時に見直す）。`camera` は画面全体の乱れ専用で、runtime の `feed_glitch` が使う（積まれた物なども `object`）。

異変を追加する前に、制作済み台帳と候補一覧の両方で、対象・変化・見え方・報告カテゴリの類似を照合する。制作に選んだ候補は台帳へ移し、二重に数えない。詳細な判断基準は制作スキルの「追加前の類似チェック」を参照。
