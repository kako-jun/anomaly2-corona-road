# 異変候補プール

まだ採用・生成した異変ではなく、写真の写り込みから発想を広げる写真固有案、昭和テーマ案、令和テーマ案（4人目の子供の記憶）、写真に紐づかない runtime 在庫をまとめた候補。

## 正本と昇格ルール

- 写っている物の説明・座標・カメラ写真の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。写真固有の候補ではここでは要素IDだけ参照し、物体説明や座標を複製しない。
- 制作仕様の節（小物・大面積）は全件制作済みのため撤去した。制作済みの真実は台帳（`anomalies.yaml`）。
- 末尾の「Runtime / 背景非依存の異変在庫」は写真に紐づかず、昇格しても `anomalies.yaml` には載せない（実装タスクとして別管理）。
- 候補の正本はこのファイル。採用候補を生成工程へ移す時は、この行を削除し、`anomalies.yaml` に一件だけ登録する。候補と制作データを二重に残さない。
- カテゴリは `camera` / `object` / `environment` / `person` / `surreal`、フェーズは `early` / `mid` / `late`。目立ち度は `subtle` / `medium` / `obvious`。
- 文字の改変案は、元の文字を原寸で読み直してから具体的な文言を決める。

## CAM 01 — North Entrance

| 候補ID   | 対象ID    | 変化案                                                             | 分類 / フェーズ / 目立ち度 |
| -------- | --------- | ------------------------------------------------------------------ | -------------------------- |
| CR-01-01 | CAM01-E16 | 奥の丸い吊り看板の図柄だけが消え、白い円面が空白になる。           | object / early / subtle    |
| CR-01-02 | CAM01-E16 | 大小の吊り看板のうち、小さい方だけが大きい方と同じ図柄になる。     | object / early / subtle    |
| CR-01-05 | CAM01-E03 | 丸型天井設備の内側の輪だけが、中心からわずかにずれている。         | environment / mid / medium |
| CR-01-06 | CAM01-E14 | 奥の暗い開口に、そこに立つと小さすぎる人影が一人見える。           | person / mid / medium      |
| CR-01-07 | CAM01-E12 | 右側の木格子戸の格子一本だけが、周囲より手前へ飛び出している。     | object / mid / medium      |
| CR-01-08 | CAM01-E19 | 右下の青い容器の輪郭だけが床に反射し、実物は消えている。           | surreal / mid / medium     |
| CR-01-09 | CAM01-E10 | 左手前の曇り窓に、廊下ではなくシャッターの裏側が映る。             | surreal / late / obvious   |
| CR-01-11 | CAM01-E15 | 左奥の案内板の矢印が、壁ではなく画面を見る方向を指している。       | object / late / obvious    |
| CR-01-12 | CAM01-E20 | 右下の切れた灰色の床端が、床ではなく壁面へ垂直に折れ曲がって続く。 | surreal / late / obvious   |

## CAM 02 — Main Corridor

| 候補ID   | 対象ID    | 変化案                                                           | 分類 / フェーズ / 目立ち度 |
| -------- | --------- | ---------------------------------------------------------------- | -------------------------- |
| CR-02-01 | CAM02-E14 | 「COFFEE」の一文字だけが消え、緑の点灯はそのまま続く。           | object / early / subtle    |
| CR-02-02 | CAM02-E19 | ピンクの鉢の受け皿だけが、台の反対端へ移動している。             | object / early / subtle    |
| CR-02-03 | CAM02-E16 | 木箱の格子穴が一つだけ塞がっている。                             | object / early / subtle    |
| CR-02-04 | CAM02-E07 | 左シャッターの一枚の横板だけが、数センチ浮いている。             | object / early / subtle    |
| CR-02-05 | CAM02-E15 | 看板の後ろの葉が、すべて看板の光源から遠ざかる向きに曲がる。     | environment / mid / medium |
| CR-02-06 | CAM02-E18 | 黒板の脚が床に接しているのに、影だけが壁へ伸びている。           | surreal / mid / medium     |
| CR-02-07 | CAM02-E17 | 白い壁飾りの一つだけが、他の模様と同じ向きに揃っていない。       | object / mid / medium      |
| CR-02-08 | CAM02-E21 | 床点検口の留め具が一つだけ内側から押し上げられている。           | object / mid / medium      |
| CR-02-09 | CAM02-E09 | 暗い奥に同じ柱がもう一つ続き、廊下が実際より深く見える。         | surreal / late / obvious   |
| CR-02-10 | CAM02-E22 | 床の白い反射に、人の足だけが二組映り、通路には誰もいない。       | person / late / obvious    |
| CR-02-12 | CAM02-E12 | 右奥のシャッターが壁面と同じ色になり、閉じた時の縦枠だけが残る。 | surreal / late / obvious   |

## CAM 03 — South Exit

| 候補ID   | 対象ID    | 変化案                                                                 | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ---------------------------------------------------------------------- | ---------------------------- |
| CR-03-01 | CAM03-E15 | 看板横の木箱の向きだけが、床目地に対して斜めになる。                   | object / early / subtle      |
| CR-03-03 | CAM03-E06 | 右シャッターの一枚だけ、横板の間隔が周囲の倍になる。                   | environment / early / subtle |
| CR-03-04 | CAM03-E05 | 天井灯の一つだけが消え、床上の白い反射は残る。                         | environment / early / subtle |
| CR-03-08 | CAM03-E11 | 奥の丸い吊り看板の裏面に、正面と同じ絵柄が見えている。                 | surreal / mid / medium       |
| CR-03-09 | CAM03-E19 | 手前床の斜めの線がタイル目地を無視して、壁面まで連続する。             | surreal / late / obvious     |
| CR-03-10 | CAM03-E13 | 階段状の暗い奥が通路の途中にも出現し、同じ階段が二か所に見える。       | surreal / late / obvious     |
| CR-03-11 | CAM03-E18 | 白い照明反射の中に、シャッターの横板だけが縦向きに映る。               | surreal / late / obvious     |
| CR-03-12 | CAM03-E06 | 右側の閉じたシャッターが中ほどまで上がり、隙間の奥だけが真っ暗になる。 | environment / mid / medium   |

## CAM 04 — Underground Junction

| 候補ID   | 対象ID    | 変化案                                                             | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------------------------------ | ---------------------------- |
| CR-04-01 | CAM04-E09 | 左窓内のポスターだけが裏返り、文字の裏面が透けて見える。           | object / early / subtle      |
| CR-04-02 | CAM04-E08 | 緑看板の末尾の数字だけが、一桁違う表示に変わる。                   | object / early / subtle      |
| CR-04-03 | CAM04-E06 | 天井の短い器具の一つだけが、通路の遠近と逆向きに傾く。             | environment / early / subtle |
| CR-04-04 | CAM04-E11 | 奥の鉢植えのうち一鉢だけ、床に接する影がない。                     | object / early / subtle      |
| CR-04-06 | CAM04-E14 | 「カラオケ」の文字がガラス面ではなく、ガラスの反射内だけに見える。 | surreal / mid / medium       |
| CR-04-07 | CAM04-E12 | 植物の花/鉢の一つが、手前の床ではなく奥の扉に接している。          | object / mid / medium        |
| CR-04-08 | CAM04-E16 | 床点検口の黒い留め具二つが、枠の外側に並ぶ。                       | object / mid / medium        |
| CR-04-11 | CAM04-E07 | 左側のガラス店先の反射にだけ、廊下を塞ぐ黒い人影が立つ。           | person / late / obvious      |
| CR-04-12 | CAM04-E10 | 奥の両開き扉が一枚の壁になり、取手だけが元の位置に残る。           | surreal / late / obvious     |

## CAM 05 — Emergency Stairwell

| 候補ID   | 対象ID    | 変化案                                                       | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------------------------ | ---------------------------- |
| CR-05-02 | CAM05-E08 | 正面カーテンの一枚だけ、裾が隣より少し高い。                 | object / early / subtle      |
| CR-05-03 | CAM05-E12 | レンガ帯の一つだけ目地が上下にずれている。                   | environment / early / subtle |
| CR-05-04 | CAM05-E02 | 左上の丸灯は点灯しているのに、店舗のガラス反射には映らない。 | environment / early / subtle |
| CR-05-06 | CAM05-E07 | 正面の金属枠の縦桟が一本だけガラスの手前に重なっている。     | surreal / mid / medium       |
| CR-05-09 | CAM05-E11 | 黒い側面に、正面カーテンの縦模様が透けて現れる。             | surreal / late / obvious     |
| CR-05-10 | CAM05-E08 | 中央のカーテン一枚だけが内側へ膨らみ、人の肩幅の形になる。   | person / late / obvious      |
| CR-05-11 | CAM05-E05 | 長い蛍光灯が店舗区画の角で直角に折れて続く。                 | surreal / late / obvious     |

## CAM 06 — Shop Front Row

| 候補ID   | 対象ID    | 変化案                                                           | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ---------------------------------------------------------------- | ---------------------------- |
| CR-06-01 | CAM06-E12 | メニュー板の紙一枚だけが裏返り、白紙になる。                     | object / early / subtle      |
| CR-06-04 | CAM06-E04 | 天井の丸灯一つだけが緑色になり、床反射は白のまま。               | environment / early / subtle |
| CR-06-05 | CAM06-E09 | 大きな葉の影が、葉の向きと逆側へ伸びる。                         | surreal / mid / medium       |
| CR-06-06 | CAM06-E07 | 看板中央の丸いロゴだけが、閉じた目の図柄に変わる。               | object / mid / medium        |
| CR-06-07 | CAM06-E12 | メニュー板の一枚の写真にだけ、通路奥の景色が写っている。         | surreal / mid / medium       |
| CR-06-08 | CAM06-E13 | 店先ガラスの縦枠一本が、奥の暗部で途切れている。                 | environment / mid / medium   |
| CR-06-09 | CAM06-E11 | 左下の紫桃色の布/飾りが、床目地に沿って通路中央まで伸びる。      | surreal / late / obvious     |
| CR-06-12 | CAM06-E09 | 大きな葉の陰に、小さな灰色の人形のような生物がうずくまっている。 | surreal / late / obvious     |

## CAM 07 — Maintenance Corridor

| 候補ID   | 対象ID    | 変化案                                                       | 分類 / フェーズ / 目立ち度 |
| -------- | --------- | ------------------------------------------------------------ | -------------------------- |
| CR-07-02 | CAM07-E08 | 丸看板の中心ロゴが消え、周囲の小さな文字だけ残る。           | object / early / subtle    |
| CR-07-03 | CAM07-E13 | 中央右の扉の取手だけが反対側へ移る。                         | object / early / subtle    |
| CR-07-05 | CAM07-E09 | 左階段の段数が一段だけ多く、最上段が壁に突き当たる。         | surreal / mid / medium     |
| CR-07-07 | CAM07-E11 | 中央の黒い開口に、扉と同じ灰色扉が奥向きに立つ。             | surreal / mid / medium     |
| CR-07-08 | CAM07-E12 | 白い中央壁に、扉の取手と同じ形の影が浮かぶ。                 | surreal / mid / medium     |
| CR-07-10 | CAM07-E17 | 左の長い反射が、床から階段の壁面へ垂直に折れて上る。         | surreal / late / obvious   |
| CR-07-12 | CAM07-E13 | 扉の横帯が部屋の奥へ続く通路になり、その先に同じ扉が見える。 | surreal / late / obvious   |

## CAM 08 — Security Office

| 候補ID   | 対象ID    | 変化案                                                       | 分類 / フェーズ / 目立ち度 |
| -------- | --------- | ------------------------------------------------------------ | -------------------------- |
| CR-08-01 | CAM08-E13 | 柱の小さなコンセント/スイッチだけが上下逆さになる。          | object / early / subtle    |
| CR-08-04 | CAM08-E06 | 左のガラス棚の水平線が一本だけ、ガラス外へ突き出して見える。 | object / early / subtle    |
| CR-08-05 | CAM08-E12 | 柱の小さな横長器具の下に、同じ器具の影が床まで伸びる。       | surreal / mid / medium     |
| CR-08-06 | CAM08-E14 | 右壁の白い帯状パネルが、柱の裏側にも連続して見える。         | environment / mid / medium |
| CR-08-08 | CAM08-E08 | 左奥の明るい通路が途中で直角に折れ、見えない方向へ続く。     | surreal / mid / medium     |
| CR-08-11 | CAM08-E15 | 右端の黒い柱の上下パネルの間に、第三の発光パネルが現れる。   | object / late / obvious    |

## 追加候補 — CAM 01

未制作。候補IDは既存の CR-01-01〜12 に続く。各行は独立した一変更。

| 候補ID   | 対象ID    | 変化案                                   | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ---------------------------------------- | ---------------------------- |
| CR-01-14 | CAM01-E17 | 床タイルの一枚だけ淡い藍色になる。       | environment / early / subtle |
| CR-01-16 | CAM01-E09 | 壁の粒模様の一部だけ細い縦縞に変わる。   | environment / early / subtle |
| CR-01-19 | CAM01-E04 | 天井点検板の隣に同じ板がもう一枚増える。 | object / mid / medium        |
| CR-01-20 | CAM01-E07 | 蛍光灯の端から小さな紙片が吊り下がる。   | object / mid / medium        |
| CR-01-21 | CAM01-E09 | 左壁に小さな白い貼り紙が一枚増える。     | object / early / medium      |
| CR-01-22 | CAM01-E11 | シャッターの横板が一列だけ薄い緑になる。 | environment / early / subtle |
| CR-01-23 | CAM01-E12 | 木格子の一部だけ交差して菱形になる。     | environment / mid / medium   |
| CR-01-25 | CAM01-E14 | 暗い開口の手前に小さな猫が座る。         | object / mid / medium        |
| CR-01-26 | CAM01-E19 | 青い容器が二つ並ぶ。                     | object / early / medium      |
| CR-01-27 | CAM01-E19 | 青い容器の上縁が四角く変わる。           | object / mid / medium        |

## 制作仕様（未制作）— CAM 01

CAM01 の新規の画像異変 8 件（小物 6・大面積 2）の**制作仕様**（#47。台帳 240 件→目標約 300 件の偏り是正）。台帳は `object` / `add_object` に偏る（add_object 105・object 137）ため、今回は **add_object と color_shift を 0 件**にし、surreal / multiply / state_change / displace / add_person / add_creature で組んだ。画像はまだ生成していない。採用して制作に進む時は、この節の該当項を**削除**して `anomalies.yaml` へ一度だけ登録する（二重に残さない）。手順・座標・合成の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）と [`README.md`](./README.md) の「配置の基準」。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。画像は 675x900。

| ID | 種別 | category / anomaly_type | 面・位置 | 概要 |
| --- | --- | --- | --- | --- |

- **方針の充足**: (a) add_object / color_shift は 0 件。8 件は surreal・multiply・state_change×3・displace・add_person・add_creature のすべて指定の型（reflection は使わない）。(b) 大面積は床一面と右壁一面の 2 件。(d) 人・生き物は遠景のシルエット・小さな鳥だけで、顔・肌・指・服は描かない。(e) 文字・数字・ロゴ・実在名は出さない。
- **台帳の現況**（2026-11-05、`prompts/anomalies.yaml`）: CAM01 は 31 件で、うち大面積は `AR-01-wall-faces`（origin (0,216)・202x484 = 左壁）と `AR-01-ceiling-lanterns`（origin (217,0)・458x380 = 天井）の 2 件。残る広い面は**床**と**右の店先の壁**で、本節の大面積 2 件がそれ。
- **配置の実測**: 小物 6 件の box は、台帳の CAM01 の**小物 29 件**（大面積 2 件を除く）の alpha bbox と、本節の他の小物の box から、**矩形間距離 30px 以上**を `uv run --with pyyaml --with numpy --with pillow python3` で実測した（各項に最寄りと距離。台帳の各 overlay は `overlay_origin` + overlay の alpha>0 の bbox で測った。2026-11-05）。余裕が 36px 未満の項は、制作後の最終 alpha bbox で測り直す（羽毛ぼかしで広がる）。特に天井の小物 3 件（lamp-off・tile-drop・wet-stain）は、どれも既存の天井の物と 32.0px しか空いていない（互いは 37.7px 以上）ので、制作後の再測定を必須とする。30.0px ちょうどになったら数 px 動かす。大面積は小物と重なってよい（README の例外）。大面積 2 件どうし、および既存の大面積 2 件とは box が重ならない: 床 y705〜900／右壁 y225〜668／左壁 x0〜202（y216〜700）／天井 y0〜380。右壁（x422〜675, y225〜380）と天井の bbox は重なるが別の面で、下の「排他」に書いて同プレイで共存させない。
- **共通手順**（小物。スキル手順 5〜8）: ①各項の「6倍クロップ」を `public/images/cam1.webp` から切り出して 1536x1024 へ拡大（webp は PNG に変換）。②先頭に `$imagegen` を明示し、各項のプロンプトを 3 テイク生成して目視で選ぶ（0 バイト・数 KB の壊れた PNG は撮り直す。文字やロゴらしき刻印が出たら没）。テイク 1〜3 は、各項のプロンプトの `VARIANT` 行だけを差し替える（プロンプト全文は VARIANT を入れた形で使う）。③選んだ結果を元のクロップ寸法へ縮小して baseline の PNG の同じ位置へ貼り戻し、その全画面を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。④最終 overlay の alpha bbox で既存との距離を測り直し、`check-visibility.py` を通す。⑤登録・コミットしたら `experiments/` の作業物を即削除。
- **共通プロンプト冒頭（小物）**: `$imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged.` 末尾は `Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not add anything else. Output the same 3:2 1536x1024 image.`（以下の各プロンプトには、冒頭と末尾を含めて全文を書いてある）。

### 大面積


### 小物


- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  ```



- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  ```



- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  ```



- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  ```



- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  ```

- **分類 / フェーズ / 目立ち度**: person / mid / medium


- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  ```

- **分類 / フェーズ / 目立ち度**: object / mid / medium

## 追加候補 — CAM 02

| 候補ID   | 対象ID    | 変化案                                     | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------ | ---------------------------- |
| CR-02-13 | CAM02-E20 | 床タイル一枚の中央に小さな円模様が現れる。 | environment / early / subtle |
| CR-02-14 | CAM02-E20 | 床の一枚だけ市松模様になる。               | environment / mid / medium   |
| CR-02-15 | CAM02-E20 | 床の一枚だけ薄い桃色になる。               | environment / early / subtle |
| CR-02-16 | CAM02-E20 | 看板の手前に小さな水たまりが現れる。       | environment / mid / medium   |
| CR-02-19 | CAM02-E01 | 天井板の一枚だけ木目模様になる。           | environment / mid / medium   |
| CR-02-20 | CAM02-E03 | 丸い天井設備が四角い輪郭になる。           | environment / mid / medium   |
| CR-02-21 | CAM02-E05 | 吊り器具から小さな折り鶴が下がる。         | object / mid / medium        |
| CR-02-23 | CAM02-E14 | 下段のカタカナ一文字だけ左右反転する。     | object / early / subtle      |
| CR-02-24 | CAM02-E14 | 緑色の発光面が琥珀色になる。               | object / mid / medium        |
| CR-02-25 | CAM02-E16 | 木箱が左右に二つ並ぶ。                     | object / mid / medium        |
| CR-02-26 | CAM02-E19 | 鉢が消え、ガラス面にだけ鉢の姿が映る。     | surreal / mid / medium       |
| CR-02-27 | CAM02-E09 | 奥の開口に三毛猫が一匹座る。               | object / mid / medium        |

## 制作仕様（未制作）— CAM 02

CAM02（Main Corridor）の画像異変 8 件（小物 7 件・大面積 1 件）の**制作仕様**。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。台帳の物の偏り（object / add_object が大半）を是正するため、足す物ではなく**人・影・状態の変化・消失・増殖**を中心にした（add_object・add_person・color_shift は 0 件）。2026-11-05 作成（#47）。

- **昇格**: 制作に採用した件は、この節の該当項を**削除**して `anomalies.yaml` へ一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md) のままで、ここの box は作業用の最終値。方針の正本は [`README.md`](./README.md) の「配置の基準」と大面積の例外、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。
- **座標**: すべて baseline px（676x900）。小物の box は 2026-11-05 時点の台帳（CAM02 は 35 件）の overlay_origin / dimensions と実測し、大面積を除く全 overlay から **30px 以上離れる**ことを確かめた。台帳は日々増えるので、登録時に必ず再測定する。この 7 件の box どうしも互いに 30px 以上離れる。
- **偏りの内訳**: state_change 4（点検口・蛍光灯・床の目地の光・天井の星空［大面積］）／remove_object 1／reflection 1（人の影）／multiply 1（壁の鳥）／surreal 1（床の波紋）。人は影だけで、顔・手・肌は描かない（story.md の人物の扱いと禁則に反しない）。服が床に落ちる型は CAM03・CAM08 の案と重なるため入れていない。
- **共通の禁止**: 文字・数字・ロゴ・実在店名の混入（出たテイクは没）。看板の文字は変えない。性的・不適切の独自判定はしない（生成物はそのまま報告）。
- **運用**: 1 件ずつ生成し、採否は人間が決める。生成物は作業物で `experiments/<件名>/` に置き、登録後に即削除する。

### 小物（6倍クロップ）


- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  ```

  テイク B:

  ```text
  ```

  テイク C:

  ```text
  ```



- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  ```

  テイク B:

  ```text
  ```

  テイク C:

  ```text
  ```



- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  ```

  テイク B:

  ```text
  ```

  テイク C:

  ```text
  ```



- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  ```

  テイク B:

  ```text
  ```

  テイク C:

  ```text
  ```



- **camera / element_id**: CAM02 / CAM02-E20

  テイク A:

  ```text
  ```

  テイク B:

  ```text
  ```

  テイク C:

  ```text
  ```



- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  ```

  テイク B:

  ```text
  ```

  テイク C:

  ```text
  ```



- **camera / element_id**: CAM02 / CAM02-E20
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  ```

  テイク B:

  ```text
  ```

  テイク C:

  ```text
  ```


### 大面積（3:2 の窓）



  テイク A:

  ```text
  ```

  テイク B:

  ```text
  ```

  テイク C:

  ```text
  ```


## 追加候補 — CAM 03

| 候補ID   | 対象ID    | 変化案                                   | 分類 / フェーズ / 目立ち度 |
| -------- | --------- | ---------------------------------------- | -------------------------- |
| CR-03-16 | CAM03-E08 | 白い壁飾り一つが円形になる。             | object / early / subtle    |
| CR-03-17 | CAM03-E08 | 白い壁飾り一つが薄い黄色になる。         | object / early / subtle    |
| CR-03-19 | CAM03-E05 | 天井点検板の形が長方形から丸に変わる。   | environment / mid / medium |
| CR-03-20 | CAM03-E09 | 天井の器具から細いリボンが一本下がる。   | object / mid / medium      |
| CR-03-21 | CAM03-E07 | 柱の白い表示面に紙が一枚貼られる。       | object / early / medium    |
| CR-03-22 | CAM03-E14 | 看板の下段の一文字だけ左右反転する。     | object / early / subtle    |
| CR-03-25 | CAM03-E08 | 実際の通路にない猫だけ店先ガラスに映る。 | surreal / mid / medium     |

## 制作仕様（未制作）— CAM 03

CAM03（South Exit）の新規画像異変 8 件の**制作仕様**（Issue #47。偏り是正＝person / add_person / surreal / state_change / remove_object を中心に。add_creature・add_object・color_shift は 0 件）。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。採用して制作に進む時は、その項を削除して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。box は `x1,y1,x2,y2`（`scripts/composite-anomaly.py` の `--box` と同じ。括弧内は幅x高さ）で書いた作業用の最終値（台帳には貼り込み後の alpha bbox から出した `overlay_origin` / `dimensions` を入れる）。

| ID | category | anomaly_type | 変化 | 大小 |
| --- | --- | --- | --- | --- |
| AR-03-floor-line-break | environment | state_change | 床のタイル目地の線が一本だけ途中で途切れる | 小物 |

- **配置の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3` で台帳の CAM03 全 30 件の `overlay_origin` と overlay の実際の alpha bbox を測定）: 小物 7 件の box は、大面積 2 件（AR-03-shutter-blank-papers (0,102,258,650)・AR-03-floor-tatami (29,457,676,900)）を除く既存 overlay の alpha bbox から**30px 以上**離れ、本節の他の小物 box どうしも 30px 以上離れている（最小は 30.0px で、AR-03-floor-line-break↔AR-03-shutter-raised と AR-03-tube-light-bent↔AR-03-ceiling-eye。最寄りは各項に記載）。羽毛ぼかしやにじみで overlay が広がる分、制作後に alpha bbox で測り直す（36px 未満の項は特に必須）。大面積 AR-03-floor-shadows と小物の box 重なりは項に px² で記載（README の大面積の例外。排他は項に明記）。
- **偏り是正の内訳**: add_person 2（影・シャッターの指）／surreal 1（天井の目）／state_change 4（床の目地・蛍光灯の向き・暗いタイル・シャッターの裾）／remove_object 1（銀白色の巻いた物）。台帳に CAM03 の add_person・remove_object は無く、person カテゴリも CAM03 にまだ無い。
- **大面積**: 1 件（AR-03-floor-shadows、box 91,540 px²）。同カメラの既存大面積は AR-03-shutter-blank-papers（左壁）と AR-03-floor-tatami（手前の床）で、本件は奥〜中央の床で box が重ならない（距離は項に記載）。
- **人・生き物の安全範囲**: 影・指だけ・目だけ。story.md の禁則（実在の企業・商品名、台詞や統計の捏造、勝ち負けの語）に触れない。文字・ロゴは入れない。
- **共通手順**（制作スキルの手順 5〜8 と同じ）: ① 各項の「6倍クロップ」（大面積は 3:2 の窓）を `public/images/cam3.webp`（676x900）から切り出して 1536x1024 へ拡大（webp は PNG にしてから渡す。大面積の窓は `composite-polygon.py crop --crop 0,225,676,675`）。② 明示的な `$imagegen` で各項のプロンプトを 3 テイク生成し、採否は人間が決める（0 バイト・数 KB の壊れた PNG は撮り直す。文字・ロゴらしき刻印が出たテイクは捨てる）。③ 小物は選んだ結果を元のクロップ寸法へ縮小して baseline の同じ位置へ貼り戻し、`scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold`/`--margin` を 8/12/16/18 で試す）。大面積は `composite-polygon.py restore` → 影のポリゴンを `cutout` する。④ 最終 overlay の alpha bbox で既存との距離を測り直し、台帳へ登録して `uv run scripts/check-visibility.py --id <id>` を通す（通らなければ強めて作り直すか、この節へ戻す）。⑤ 登録・コミットしたら `experiments/` の作業物を即削除する。

### AR-03-floor-line-break — 床のタイル目地の線が一本だけ途中で途切れる

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 通路の右寄りの床で、縦に走るタイルの目地の線が一本だけ途中でぷつんと終わり、その先の左右のタイルが継ぎ目のない一枚板のようにつながる。周りの目地はそのまま。ほかのカメラの床の異変（穴・足跡・畳・タイル色）と違い、『線が消える』変化。
- **box (x1,y1,x2,y2)**: (575,383,618,427)（43x44）
- **最寄り既存 overlay と実測距離**: AR-03-walking-cat (100.0)、次点 AR-03-shutter-faded-poster (131.6)。新規小物との最寄りは AR-03-shutter-raised (30.0)・AR-03-dark-tile (38.0)。
- **6倍クロップ範囲**: 6倍クロップ (420,321)–(676,492)（256x171）。box は窓内で (930,372)–(1188,636)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the vertical tile joint line that runs through the middle of the marked area (the thin dark seam between two floor tiles, at about x=1080 in the 1536x1024 frame, from y=300 to y=720) stops abruptly at about y=470: below that point the two neighbouring tiles continue as one seamless slab of the same grey speckled stone, with the same reflections and speckles, no seam at all, while above that point the seam is unchanged. The edit area is about x=930 to 1188, y=372 to 636. All other joints, speckles and reflections stay exactly as they are. Add nothing. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: one floor tile joint (the long thin vertical seam near x=1080, y=300 to 720 in the 1536x1024 frame) is erased in its lower half, from about y=480 downward over the area x=930 to 1188, y=372 to 636: the stone surface there is continuous across where the seam was, with the same speckle texture and the same soft white reflection. The upper half of the seam and every other joint remain. No new object. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the seam between two floor tiles near x=1080 simply ends mid-floor: from about y=450 down to y=720 in the 1536x1024 frame the seam vanishes and the surface is a smooth continuous stone (area x=930 to 1188, y=372 to 636), looking like a tile that is twice as long. The seam above y=450 is unchanged. Keep the speckles, the reflections and all other joints exactly the same. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-floor-line-break'
    candidate_id: 'AR-03-floor-line-break'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'environment'
    anomaly_type: 'state_change'
    location: 'CAM03-E16 の床右寄り、差分左上 (575,383) 付近（貼り込み後に再計測）'
    detail: '床の縦のタイル目地が一本だけ途中で途切れ、その先のタイルが継ぎ目のない一枚板につながる。'
    overlay: 'assets/anomaly-overlays/cam03/floor-line-break.webp'
    # phase / 目立ち度: late / subtle
    note: '最寄り既存 overlay は AR-03-walking-cat（box 距離 100px）。新規小物との最寄りは AR-03-shutter-raised（30px）。大面積 AR-03-floor-shadows と排他（同じ床の面。同プレイで共存させない）。消える線が薄いので、check-visibility を必ず通す（通らなければ消す区間を長くする）。'
  ```
- **相互参照 / 重複精査**: 床の穴・沈み（AR-03-sunken-opening-floor）やタイルの向き・色（AR-03-tile-diagonal / AR-03-blue-floor-tile）とは別で、物は増減せず『目地の線が消える』だけ。CR-03-30/04 系の灯の候補とは無関係。台帳に目地の連続性を崩す異変は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-floor-shadows（同じ床の面）/ AR-03-dark-tile（同じ床の面・近接）。併存可=壁・天井・シャッターの異変。

### 既存との重複精査（共通）

- 台帳 CAM03 の全 30 件（大面積 2 件を含む）と candidate-pool の CAM03 候補（CR-03-xx と要素の状態・関係の CR-03-28〜42）を、対象要素・変化・見え方で照合した。実質同じものは無い。近いもの（AR-03-tube-light-bent↔CR-03-30/CR-03-04・AR-07-lamp-off・AR-08-panel-off、AR-03-floor-line-break・AR-03-dark-tile↔AR-03-sunken-opening-floor / AR-03-tile-diagonal）は各項に差を書いた。制作前に見比べ、実質同じと判断したら取り下げる。
- 昇格元: AR-03-shutter-raised は CR-03-12（台帳の `candidate_id` は `CR-03-12`。採用時に candidate-pool の CR-03-12 の行を削除する。この節では他の行を編集していない）。それ以外の 7 件の `candidate_id` は見出しの ID。
- 他カメラ・台帳との型の重複を避けた経緯: 初稿の『床の鳩』（鳥は無いが生き物の追加）・『床の穴』・『蛍光灯が消える』・『床の脱ぎ捨てたコート』・『うずくまる人影』は、既存の穴・消灯・服・後ろ姿の型と近いため取り下げ、上の別案に差し替えた。看板の脚が床にめり込む案と木箱の蓋が持ち上がる案は、看板・木箱の周りに既存 overlay（AR-03-sign-glow-blue・AR-03-crate-duplicate・AR-03-slipper-single）が密集して 30px の余白が取れないため、同型（surreal / state_change）の別の場所の案に変えた。

## 追加候補 — CAM 04

| 候補ID   | 対象ID    | 変化案                                                         | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | -------------------------------------------------------------- | ---------------------------- |
| CR-04-14 | CAM04-E15 | 床タイル一枚に花の模様が現れる。                               | environment / early / subtle |
| CR-04-15 | CAM04-E17 | 点検口の脇に水たまりが現れ照明を映す。                         | environment / mid / medium   |
| CR-04-16 | CAM04-E14 | ガラス上部の文字の一字だけ左右反転する（架空化後に字を確定）。 | object / early / subtle      |
| CR-04-17 | CAM04-E14 | 店舗ガラスに、通路にはない傘だけが映る。                       | surreal / mid / medium       |
| CR-04-19 | CAM04-E09 | 窓のポスターだけ縦長から丸形になる。                           | object / mid / medium        |
| CR-04-21 | CAM04-E06 | 天井器具から小さな札が吊られる。                               | object / mid / medium        |
| CR-04-22 | CAM04-E10 | 扉の取手が左右逆側になる（原寸確認後に配置）。                 | object / mid / medium        |
| CR-04-23 | CAM04-E10 | 扉の前に小さな猫が一匹座る。                                   | object / mid / medium        |
| CR-04-27 | CAM04-E07 | 壁面に縦長の白い紙が一枚増える。                               | object / early / medium      |

## 制作仕様（未制作）— CAM 04

CAM 04（Underground Junction）の新規の画像異変 8 件（小物 7・大面積 1）の**制作仕様**。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない（Issue #47 の台帳拡充。台帳 240 件→目標約 300 件の偏り是正で、object / add_object / color_shift に偏る内訳を、person・add_person・add_creature・surreal・state_change・displace・multiply へ振る）。採用して制作に進む時は、その項を**削除**して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。

### 共通

- **座標**: すべて baseline px（cam4 は 676x900。`public/images/cam4.webp` を実際に見て、床・壁・天井・物の位置を確認した）。box は `x1,y1,x2,y2`（左上と右下の baseline px。`scripts/composite-anomaly.py --box` と同じ並び。各項の幅x高さは併記）で、作業用の最終値。台帳の `overlay_origin` / `dimensions` は貼り込み後の alpha bbox で再計測して書く。
- **配置の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3`。台帳の `overlay_origin` / `dimensions` から CAM04 の全 29 件の alpha bbox を出し、**各辺 +2px（羽毛ぼかし分）広げた矩形**と box の間のユークリッド距離を測った）: 小物 7 件の box は、既存の**小物**の全 overlay から 30px 以上離れる（各項に最近傍と距離。最小は wall-panel-fallen の 32.0px で、他は 34px 以上）。同カメラの既存の大面積（`AR-04-window-alley` 166,278px² = 右壁、`AR-04-glass-fog-handprints` 103,045px² = 左ガラス）は、小物なら重なってよい。距離は台帳の最終 overlay（alpha bbox）が基準で、制作後の自分の overlay も同じ方法で測り直す。羽毛ぼかしで overlay が広がる分、制作後に alpha bbox で測り直す（距離 32px 以下の項は必須）。台帳は日々増えるので、登録時に同じ測定を出し直し、結果を台帳 note に貼る。
- **内訳（台帳全体の偏り是正）**: 8 件の `anomaly_type` は multiply 1 / add_person 2 / add_creature 1 / state_change 2 / reflection 1 / displace 1。add_object と color_shift は 0 件。
- **共通手順**（小物。制作スキルの手順 5〜8 と同じ）: ① 各項の「6倍クロップ」を `public/images/cam4.webp` から切り出し 1536x1024 へ拡大（webp は PNG に変換してから渡す）。② 明示的な `$imagegen` で各項の 3 テイクを生成して目視で選ぶ（0 バイトや数 KB の壊れた PNG は撮り直し。文字・ロゴ風の刻印が出たテイクは捨てる）。③ 選んだ結果を元のクロップ寸法へ縮小して baseline PNG の同位置へ貼り戻し、その全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。④ 最終 overlay の alpha bbox で既存との距離を測り直す。台帳へ登録し `check-visibility.py` を通す。⑤ 登録・コミットしたら `experiments/` の作業物を即削除する。
- **人・生き物の安全範囲と禁則**: 人は影・後ろ姿・シルエットのみ（顔・肌・指・服の柄は描かない）、生き物は光る目だけ（猫の姿は描かない）。`docs/story.md` に反しない（事件は殺人と断定されていないので、血・遺体・暴力を連想させる描写は避ける。実在の商品名・番組名・人物名は使わない。人の気配は「居なくなった」「通った」止まりで、説明しない）。文字・数字・ロゴ・実在の企業名・店名は全項で描かない（出たテイクは没）。
- **共通プロンプト末尾**（各項のプロンプトに全文を含めてある）: `Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **フェーズ配分**: early 2（wall-plaster-peel / wall-panel-fallen）・mid 3（glass-umbrella-reflection / floor-reflection-gap / left-edge-eyes）・late 3（glass-silhouette / shadow-behind-camera / floor-shoes-rows）。

### 一覧

| 候補ID | 対象ID | 変化 | category / anomaly_type | box (x1,y1,x2,y2) | 最寄り既存と距離（alpha bbox +2px 基準） |
| --- | --- | --- | --- | --- | --- |

## 追加候補 — CAM 05

| 候補ID   | 対象ID    | 変化案                                           | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------------ | ---------------------------- |
| CR-05-13 | CAM05-E13 | 床タイル一枚だけ緑がかった色になる。             | environment / early / subtle |
| CR-05-14 | CAM05-E13 | 床タイル一枚だけ縞模様になる。                   | environment / early / subtle |
| CR-05-15 | CAM05-E13 | 店舗角の床に小さな水たまりが現れる。             | environment / mid / medium   |
| CR-05-18 | CAM05-E01 | 天井の一部だけ格子模様になる。                   | environment / early / subtle |
| CR-05-23 | CAM05-E08 | カーテンの縦縞一枚分だけ横縞に変わる。           | object / mid / medium        |
| CR-05-25 | CAM05-E06 | 奥の通路に黒猫が一匹現れる。                     | object / mid / medium        |
| CR-05-26 | CAM05-E10 | 架空化した看板のひらがな一文字だけ左右反転する。 | object / early / subtle      |
| CR-05-27 | CAM05-E09 | 暗い隙間の反射にだけ小さな傘が映る。             | surreal / mid / medium       |

## 制作仕様（未制作）— CAM 05

CAM05 (Emergency Stairwell, `cam5.webp`, 676x900) 向けの新規の画像異変 7 件（大面積 1 + 小物 6）の**制作仕様**（#47）。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。台帳の偏り（object / add_object 偏重、person 系の不足）の是正が目的で、7 件中 6 件は person / add_person / add_creature / surreal / reflection / state_change 側、`add_object` は 1 件、`color_shift` は 0 件。制作して台帳へ移したら、**この節の該当項を削除**し（`candidate_id` に見出しの ID を入れる）、昇格元の候補行（CR-05-05）も同じ PR で削除する（CR-05-25 は昇格しない。プールに残す）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。

| ID | 要素 | category / anomaly_type | 種別 | box（baseline px） | フェーズ / 目立ち度 |
| --- | --- | --- | --- | --- | --- |

- **配置の実測**（2026-11-05、`uv run --with pyyaml python3`。台帳 CAM05 の全 overlay の `overlay_origin` / `dimensions` を矩形化し、矩形間のユークリッド距離を測った）: 小物 6 件はすべて既存の全 overlay（大面積 2 件を除く）と**30px 以上**、かつ本節の他の項とも 30px 以上離れる（各項に最寄りを書く）。box 基準なので、羽毛ぼかしで広がる分、制作後に alpha bbox で測り直す。**37px 未満の項（silhouette 33.2px・light-streak 31.0px・goldfish 30.0px〜35.0px・shirt 31.0px・floor-child-shadow 35.0px）は、制作後の再測定が特に必須**（最終 overlay の alpha bbox で測る。台帳の最終 overlay を基準に、30px 割れなら各項の指示どおり動かす）。
- **既存の大面積との関係**: 台帳の CAM05 の大面積は `AR-05-curtains-open-cafe`（282,109,546,536、112,728 px²）と `AR-05-floor-white-cranes`（0,600,676,900、202,800 px²）の 2 件。大面積の本件 `AR-05-morning-glory-wall` は x を 280 までに止め（cafe まで 2px）、y を 598 までに止めて（cranes まで 2px）、**どちらとも box が重ならない**ことを実測した。余裕が 2px しか無いので、`cutout` の羽毛ぼかし（内向き）で外へ広がらないこと、最終 overlay の alpha bbox が cafe・cranes と重ならないことを登録時に必ず測り直す。`AR-05-floor-child-shadow`（小物）は cranes と座標が重なる（大面積の例外）が、同じ床面を覆う件どうしなので**排他**（同プレイで共存させない）。
- **共通手順**（制作スキルの手順 5〜8）: 小物は各項の 6 倍クロップ（256x171 → 1536x1024）を `$imagegen` で 3 テイク生成して目視で選び、縮小して baseline の同じ位置へ貼り戻して `scripts/composite-anomaly.py --gen`（`--box` は各項の box。FAIL は `--threshold` / `--margin` を 8/12/16/18 で試す）。大面積は `scripts/composite-polygon.py` の窓（crop → restore → cutout）。登録後に最終 overlay の alpha bbox で距離を測り直し、`uv run scripts/check-visibility.py --id <台帳 ID>` を通す。通らなければ大きく・明るく・暗い地に対して淡く作り直す。登録・コミットしたら `experiments/` 配下を即削除する。
- **共通の禁止**: 文字・数字・ロゴ・実在の企業名の混入（出たテイクは没）。人は後ろ姿・影・遠景のシルエット・服だけ・指の影のみで、**顔・肌・体型の細部は描かせない**（story.md の「人物は現代の人」「異変は優しい居場所」の範囲）。性的・不適切の独自判定はしない（生成物はそのまま報告）。

### 既存との重複精査（共通）

- 候補プールの CAM05 の既存案との関係: **CR-05-05（指の影）は昇格**として使う（上の表。制作時に候補行を削除）。CR-05-25（黒猫）は台帳に猫が 5 件あり 7 件目になるため昇格せず、候補プールに残す。CR-05-09（黒い側面に縦模様が透ける）・CR-05-38（黒い側面に傘立ての反射）は黒い側面を使うので、`AR-05-morning-glory-wall` と**同じ面で排他**（候補のまま残し、制作するなら同プレイ非共存）。CR-05-41（床反射に靴の跡）・CR-05-15（水たまり）・CR-05-42（レシート）とは物が別。
- 型の重複回避: 猫は他カメラに既存（`AR-02-cat` / `AR-08-cat` / `AR-07-stairs-cat` / `AR-03-walking-cat` ほか台帳に 5 件）で、これ以上は足さない（本節では猫の案を `AR-05-aisle-light-streak` に差し替えた）。**植物・蔓・花、金魚、ハンガーの服、床の子供の影だけ**は台帳・候補プールのどちらにも無いことを `grep` で確認した（2026-11-05）。ケンパ・ランドセル・水たまり・靴は既存と型が被るので使わない。
- **remove_object / displace / text_change / multiply を入れなかった理由**（2026-11-05 に左通路・天井・右上を原寸で見直した）: 候補にした左通路の天井の丸い通気口は `AR-05-white-ribbon`（box 重なり）、左店先の丸い看板は白いリボンまで 12px、右上の防犯ドームは `AR-05-duplicate-light` の box 内で、いずれも 30px の空きが取れない。左通路は小物 3 件（silhouette・light-streak・goldfish）で 30px 余白を使い切っており、これ以上は足せない。文字を含む看板の変更は、架空化済みの基準画像ができるまで具体化しない。この 4 種は別カメラ側で補う。
- **構造の偏り是正**: 7 件の分類は surreal 1・person 3（add_person 2 + reflection 1）・add_creature 1（金魚）・environment/state_change 1（光の帯）・add_object 1。台帳の偏り（object 137 / add_object 105）に足すのは add_object の 1 件だけ。

---

## 追加候補 — CAM 06

| 候補ID   | 対象ID    | 変化案                                   | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ---------------------------------------- | ---------------------------- |
| CR-06-13 | CAM06-E16 | 床タイル一枚に細かな水玉模様が現れる。   | environment / early / subtle |
| CR-06-14 | CAM06-E16 | 床タイル一枚だけ淡い緑色になる。         | environment / early / subtle |
| CR-06-17 | CAM06-E15 | 額入り掲示の横に小さな紙が一枚増える。   | object / early / medium      |
| CR-06-18 | CAM06-E15 | 扉の銀色取手が扉の反対側になる。         | object / mid / medium        |
| CR-06-21 | CAM06-E07 | 看板のひらがな一文字だけ左右反転する。   | object / early / subtle      |
| CR-06-23 | CAM06-E12 | メニュー板の小画像一つだけ円形になる。   | object / early / subtle      |
| CR-06-24 | CAM06-E10 | 植木鉢一鉢だけ同じ形のものが隣に増える。 | object / mid / medium        |
| CR-06-25 | CAM06-E13 | 実際の通路にない白猫だけガラスに映る。   | surreal / mid / medium       |
| CR-06-26 | CAM06-E09 | 植物の足元に茶トラ猫が一匹座る。         | object / mid / medium        |
| CR-06-27 | CAM06-E12 | メニュー板全体が横長の形になる。         | object / mid / medium        |

## 制作仕様（未制作）— CAM 06

CAM06（Shop Front Row）の画像異変 7 件の**制作仕様**（#47。台帳の偏り是正が目的）。物・変化・配置（box／polygon）・生成プロンプトまで確定済みで、まだ生成していない。採用して制作に進む時は、その項を削除して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。ここの box は作業用の最終値で、台帳には最終 overlay の alpha bbox から出た `overlay_origin` / `dimensions` を入れる。

| ID | タイプ | カテゴリ | 規模 | 変化 |
| --- | --- | --- | --- | --- |

- **配分**: 7件中 add_object は1件（AR-06-wall-height-marks）、add_person・multiply・color_shift・reflection は0件（台帳の偏り是正）。state_change が4件（AR-06-floor-tile-rotated・AR-06-door-gap-light・AR-06-floor-light-slant・AR-06-leaf-shadows-aligned）、surreal・add_creature・add_object が各1件。大面積は1件（AR-06-floor-tile-rotated）。
- **配置の実測**（2026-11-05）: 小物の box は、`anomalies.yaml` の CAM06 全 overlay の**実際の alpha bbox**（overlay 画像の alpha>0 の範囲）から**矩形間距離 30px 以上**あることを `uv run --with pyyaml --with numpy --with pillow python3` で実測した（README「配置の基準」）。本節の小物どうしも 30px 以上。実測は各 box を各辺 +2px した矩形（最終 overlay の alpha bbox の見込み）で行い、すべて 31.0px 以上の余裕を持たせた（最小は AR-06-floor-light-slant と AR-06-tile-sky の相互 31.0px、AR-06-tile-sky と AR-06-umbrella の 31.1px。ちょうど 30.0px の組は残していない）。台帳には最終 alpha bbox で測り直した値を書く。AR-06-tile-sky は距離を確保するため旧案の (300,515,366,580) から (294,524,360,589) へ動かした。既存の大面積（AR-06-wall-puddle・AR-06-ceiling-umbrellas・AR-06-wall-same-poster）は小物の距離計算から除いた（大面積とは重なってよい）。
- **大面積の重なり**: 本節の大面積は AR-06-floor-tile-rotated の1件のみ（polygon 面積 129,519 px²、bbox 149,640 px²）。既存の大面積とは面が違う（天井一面・右壁一面・床の中ほど y432-634 に対し、本案は前景の床 y≥668 で 34px 空ける）。ただし bbox は AR-06-wall-same-poster の bbox と 20,735 px² 重なる（本案 (0,668,645,900) と poster (500,40,672,811) の交差。床と壁で面は違うが大面積どうしなので排他と明記する）。小物（AR-06-wet-footprints・AR-06-red-bucket・AR-06-styrofoam-box と本節の AR-06-leaf-shadows-aligned）とは重なるが、ゲームは1カメラにつき未検出の異変を同時に1件しか出さない（`spawnAnomaly`）ので、台帳 note に「大面積」「同プレイで共存させない」と書く。
- **共通手順**（小物。`.agents/skills/corona-road-anomaly/SKILL.md` の手順 5〜8 と同じ）:
  1. 各項の「6倍クロップ」を `public/images/cam6.webp`（675x900）から切り出し、1536x1024 へ拡大する（webp は PNG に変換してから渡す）。
  2. 明示的な `$imagegen` で各項のプロンプトを3テイク生成し、目視で選ぶ。0バイトや数KBの壊れた PNG は撮り直す。文字・ロゴらしき刻印が出たテイクは捨てる。
  3. 選んだ結果を元のクロップ寸法へ縮小して baseline PNG の同じ位置へ貼り戻し、その全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。
  4. 最終 overlay の alpha bbox で既存との距離を測り直す。台帳へ登録し `check-visibility.py` を通す。通らなければ強めて作り直すか、この節へ戻す。
  5. 登録・コミットしたら `experiments/` 配下の作業物を即削除する。
- **大面積の手順**: 後述の AR-06-floor-tile-rotated を参照（`scripts/composite-polygon.py` の `crop` → imagegen → `restore` → `cutout`）。

## 追加候補 — CAM 07

| 候補ID   | 対象ID    | 変化案                                             | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | -------------------------------------------------- | ---------------------------- |
| CR-07-13 | CAM07-E09 | 左階段の段が一段だけ減り段差が均等に再配分される。 | environment / mid / medium   |
| CR-07-14 | CAM07-E14 | 右階段の段が一段増え、手すりはそのまま残る。       | environment / mid / medium   |
| CR-07-15 | CAM07-E14 | 右階段の段が一段減り、最上部の高さは変わらない。   | environment / mid / medium   |
| CR-07-20 | CAM07-E12 | 白壁に小さな掲示が一枚増える。                     | object / early / medium      |
| CR-07-22 | CAM07-E03 | 丸型設備の隣に同じ設備が増える。                   | environment / mid / medium   |
| CR-07-24 | CAM07-E13 | 丸い扉の取手が四角い取手になる。                   | object / early / subtle      |
| CR-07-25 | CAM07-E13 | 扉上部の小窓が二つに増える。                       | object / mid / medium        |
| CR-07-26 | CAM07-E06 | 現実の踊り場にはいない猫だけガラスに映る。         | surreal / mid / medium       |

## 制作仕様（未制作）— CAM 07

CAM 07（Maintenance Corridor、`cam7.webp` 675x900）に足す画像異変 7 件（大面積 1 件・小物 6 件）の**制作仕様**（Issue #47。台帳の偏り是正が目的）。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。採用して制作に進む時は、その項を削除して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md) のまま。

- **box の表記**: すべて baseline px（675x900）の **`x1,y1,x2,y2`**（左上と右下。`scripts/composite-anomaly.py --box` にそのまま渡せる形）。幅x高さは括弧で併記する。
- **台帳の偏りへの対応**: 台帳は object / add_object が多数なので、7 件のうち add_object は 0、color_shift は 1。残りは state_change（大面積の霜・反射の切り抜き・鏡のタイル・ガラスのひび）・duplicate（surreal）・remove_object で組む。add_person / add_creature は台帳の他カメラと型が重なるため、この節には入れない。
- **配置の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3`）: 小物の box は、`anomalies.yaml` の `camera_id: CAM07` の全 28 overlay の**最終 overlay の alpha bbox**（`overlay_origin` ＋ 透過 webp の alpha>0 の範囲）との矩形間距離を測り、**全件 32px 以上**であることを確認した（大面積 3 件 AR-07-floor-uphill・AR-07-wall-clocks・AR-07-ceiling-white-sheets は小物の距離判定から除外）。ただし box は生成前の値なので、羽毛ぼかしで overlay が広がる分、制作後に alpha bbox で測り直す。小物 6 件の box どうしは 50px 以上離れている（大面積の霜の下端からは AR-07-mini-door まで 23px、AR-07-reflection-cut まで 43px で、重ならない）。
- **共通手順**（制作スキル `.agents/skills/corona-road-anomaly/SKILL.md` の手順 5〜8）:
  1. 小物は各項の「6倍クロップ」を `public/images/cam7.webp` から切り出して 1536x1024 へ拡大する（258x172 の範囲を約 5.95 倍。baseline は PNG に変換してから渡す）。大面積は 3:2 の窓を切る。
  2. 明示的な `$imagegen` で 3 テイク生成して目視で選ぶ（0 バイトや数 KB の壊れた PNG は撮り直す。文字・ロゴらしき刻印が出たテイクは捨てる）。
  3. 選んだ結果を元のクロップ寸法へ縮小して baseline の PNG の同じ位置へ貼り戻し、その全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。
  4. 最終 overlay の alpha bbox で既存との距離を測り直し、30px を割ったら動かす。台帳へ登録して `uv run scripts/check-visibility.py --id <id>` を通す（下限は [`README.md`](./README.md) の「視認性の基準」。max 差 40 以上・平均差 3.0 以上・差 25 以上の画素が 100 以上または overlay の 25% 以上）。通らなければ大きく・明るく・平らな場所へ強めて作り直す。
  5. 登録・コミットしたら `experiments/` 配下の作業物を即削除する。
- **共通の禁止**: 文字・数字・ロゴ・実在店名の混入（出たテイクは没）。人・動物は描かない。性的・不適切の独自判定はしない（生成物はそのまま報告）。
- **共通プロンプト末尾**（各項のプロンプトに全文を含めてある）: `Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- 窓内の位置は元画像の px に約 5.95 を掛けた値（クロップ左上が原点）。大面積だけは窓が 675x450 なので約 2.276 倍。

| ID | 対象 | category / anomaly_type | box（x1,y1,x2,y2） | phase / 目立ち度 |
| --- | --- | --- | --- | --- |

### 既存との重複精査（共通）

- 7 件とも、`anomalies.yaml` の CAM07 全 28 件と `candidate-pool.md` の CAM07 候補（CR-07-02〜28）に、同じ対象と同じ変化（出現・消失・移動・複製・色・形・反射）の組が無いことを確認した。例外の昇格（CR-07-21）は AR-07-ceiling-tile-yellow の項に書いた。近縁の差は各項の「相互参照」に書いた。制作前に見比べ、実質同じと判断したら取り下げる。
- **床の状態変化が 3 件並ぶ**（AR-07-floor-frost・AR-07-reflection-cut・AR-07-tile-mirror）。大面積の霜は reflection-cut と同じ床に載るが、box は重ならない（霜の下端 y537 から、reflection-cut は 43px、mini-door は 23px、tile-mirror は 233px）。**霜と reflection-cut は反射の見え方が競合するので、同プレイでは片方だけにする**。扉の複製は CR-07-12 / CR-07-07 が近いので、採用前に床の自立物か壁の中の通路かの違いを見比べる。


## 追加候補 — CAM 08

| 候補ID   | 対象ID    | 変化案                                     | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------ | ---------------------------- |
| CR-08-13 | CAM08-E16 | 床タイル一枚だけ薄い茶色になる。           | environment / early / subtle |
| CR-08-15 | CAM08-E17 | 白い床反射の隣に小さな水たまりができる。   | environment / mid / medium   |
| CR-08-16 | CAM08-E11 | 柱正面の粒模様が一部分だけ縦縞になる。     | environment / early / subtle |
| CR-08-18 | CAM08-E01 | 天井の汚れが一部分だけ格子模様になる。     | environment / early / subtle |
| CR-08-20 | CAM08-E05 | 奥の天井器具から小さな折り鶴が下がる。     | object / mid / medium        |
| CR-08-22 | CAM08-E13 | コンセントの四角い外形が円形になる。       | object / early / subtle      |
| CR-08-26 | CAM08-E10 | 架空化した看板の文字一字だけ左右反転する。 | object / early / subtle      |

## 制作仕様（未制作）— CAM 08

CAM08（Security Office）向けの新規の画像異変 7 件（小物 5 件・大面積 2 件）の**制作仕様**。台帳の偏り（object / add_object が大半）を是正する狙いで、生き物・状態変化・増殖・質感の置換から選んだ（add_object は 1 件、color_shift は 0 件、person は 0 件）。物・変化・box・生成プロンプトまで確定済みで、まだ生成していない。制作に進む時は、その項を丸ごと削除して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）。ここには重ねて書かない。

- **7 件の一覧**（ID は台帳の id と同じ）:

  | ID | 要素 | category / anomaly_type | 規模 | 変化 |
  | --- | --- | --- | --- | --- |

- **配置の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3`。台帳の CAM08 全 overlay の alpha bbox を実測。台帳は日々増えるので、登録時に必ず測り直す）: 小物 5 件の box は、大面積 2 件（`AR-08-floor-water-mirror`・`AR-08-stacked-crt-tvs`）を除く既存の全 overlay の alpha bbox から**矩形間距離 30px 以上**（最小 32.0px。各項に最寄りを書く）。小物どうしも 30px 以上離れる（tile-groove・sparrow・ceiling-light-inverse・door・hanten の box は互いに 100px 以上）。**30px 前後の余裕の小物（tile-groove 32.0px・sparrow 32.0px・hanten 33.0px・ceiling-light-inverse 35.0px）は、台帳に載る最終 overlay（羽・布・暈・溝で box より広がる）の alpha bbox で測り直し、30px を割ったら動かす。** 各項にも書く。
- **大面積の実測**: 画像 675x900=607,500 px² の 1/8 は 75,938 px²。
  - 2 件の面は重ならない（ポリゴンの重なり 0 px²。x462〜600 では天井の下端 y131 と壁の上端 y134 で 2 行離れ、x600〜675 では y131〜135 と y140）。外接矩形は x462〜675・y134〜141 で重なるが、画素は 0 px²。既存の大面積との**画素（alpha）の重なりは 0 px²**: `AR-08-floor-water-mirror`（床）・`AR-08-stacked-crt-tvs`（左 x0〜248・y145〜518）のどちらとも 0。ただし水鏡の外接矩形（0,270,675,630）は壁の外接矩形と重なる（壁の下端が床の接地線 y≈420〜720 まで届くため。画素は重ならない）。壁の件は水鏡と**排他**にする（水面なら壁の引き出しも映り込むはずで、昭和の夕焼けだけを映す水鏡と矛盾するため。「同プレイで共存させない」を台帳 note に書く）。
- **共通手順**（小物。SKILL.md の手順 5〜8 と同じ）: ①各項の「6倍クロップ」を `public/images/cam8.webp` から切り出して 1536x1024 へ拡大する（webp は PNG に変換してから渡す）。②明示的な `$imagegen` で 3 テイクを生成し目視で選ぶ（0 バイトや数 KB の壊れた PNG は撮り直す。文字・ロゴらしき刻印が出たテイクは捨てる）。③選んだ結果を元のクロップ寸法へ縮小して baseline の PNG の同じ位置へ貼り戻し、その全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。④最終 overlay の alpha bbox で既存との距離を測り直し、30px を割ったら動かす。台帳へ登録し `uv run scripts/check-visibility.py --id <ledger id>` を通す。通らなければ大きく・暗く・平らな場所へ強めて作り直す。⑤登録・コミットしたら `experiments/` の作業物を即削除する。
- **共通手順**（大面積。この節の各項の窓）: 大面積は `scripts/composite-polygon.py` を使う（`crop` で全幅 675x450 の 3:2 窓を切り出し、生成結果を `restore` で元寸へ貼り戻し、面のポリゴンで `cutout --polygon … --feather 2`。複数窓は `restore --blend-px 100 --blend-edges t`）。窓は 1536/675≈2.2756 倍。生成は 1 件ずつ、生成画像は見ずに合成まで進め、採否は人間が決める運用。
- **共通プロンプト末尾**（各プロンプトに全文を含めてある。小物は「クロップ」、大面積は「窓」の意味）: `Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **共通の禁止**: 文字・数字・ロゴ・実在の店名・家紋の混入（出たテイクは没）。人の顔・体は描かない（人の気配は影・服・足元だけ）。性的・不適切の独自判定はしない（生成物はそのまま報告）。

## 追加候補 — 各要素の状態・関係（CR-XX-28〜42）

全件未制作。各行は単独の変化として扱う。反射や光の案は基準画像に実際に存在する光源・面を原寸で確認する。看板に関わる案は架空化済みの基準画像を作ってから具体的な文字や図柄を確定する。

| 候補ID   | 対象ID    | 変化案                                             | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | -------------------------------------------------- | ---------------------------- |
| CR-01-30 | CAM01-E05 | 画面端の丸灯が半分だけ点灯する。                   | environment / early / subtle |
| CR-01-31 | CAM01-E06 | 奥の丸灯が一回り小さくなる。                       | environment / early / subtle |
| CR-01-32 | CAM01-E08 | 奥へ並ぶ小型器具の一つだけ天井面から少し浮く。     | surreal / mid / medium       |
| CR-01-36 | CAM01-E12 | 格子戸の中ほどの一本だけ周囲と違う淡い色になる。   | object / early / subtle      |
| CR-01-37 | CAM01-E14 | 奥の暗い開口の中に畳まれた傘が立てかけられる。     | object / mid / medium        |
| CR-01-38 | CAM01-E15 | 小さい案内板の矢印だけ左右反転する。               | object / early / subtle      |
| CR-01-40 | CAM01-E17 | 一枚の床タイルが隣より少し沈む。                   | environment / mid / medium   |
| CR-01-41 | CAM01-E18 | 床反射の明るい筋が一か所だけ途切れる。             | environment / early / subtle |
| CR-02-28 | CAM02-E01 | 天井面の継ぎ目の交点一つに小さな丸い染みが現れる。 | environment / early / subtle |
| CR-02-30 | CAM02-E04 | 丸灯の中心だけ細い三日月形に暗くなる。             | environment / mid / medium   |
| CR-02-31 | CAM02-E05 | 吊り器具の一つに短い紐が結ばれて垂れる。           | object / mid / medium        |
| CR-02-33 | CAM02-E08 | 暗いガラスにだけ小さな赤い風船が映る。             | surreal / mid / medium       |
| CR-02-34 | CAM02-E10 | 柱の正面の白い表示面に細い額縁が現れる。           | object / early / medium      |
| CR-02-35 | CAM02-E11 | 柱の小さな掲示が一枚だけ横向きになる。             | object / early / subtle      |
| CR-02-36 | CAM02-E12 | 奥のシャッターの縦枠が一箇所だけ途中で途切れる。   | environment / mid / medium   |
| CR-02-37 | CAM02-E13 | 白い看板箱の側面だけ青灰色に変わる。               | object / early / subtle      |
| CR-02-38 | CAM02-E14 | 緑の看板の上下二段の明るさが入れ替わる。           | object / mid / medium        |
| CR-02-39 | CAM02-E15 | 鉢植えの葉の先端一枚だけ黄葉する。                 | object / early / subtle      |
| CR-02-40 | CAM02-E16 | 木箱の上に紙のコースターが一枚現れる。             | object / early / medium      |
| CR-02-41 | CAM02-E18 | 立て掛けた黒板の面が白いまっさらな面になる。       | object / mid / medium        |
| CR-02-42 | CAM02-E23 | 緑の床反射の片端だけ看板から離れて小さく残る。     | surreal / mid / medium       |
| CR-03-28 | CAM03-E01 | 天井板の継ぎ目が一箇所だけ波形になる。             | environment / early / subtle |
| CR-03-30 | CAM03-E04 | 長い蛍光灯の奥側だけ暗くなり短く見える。           | environment / early / subtle |
| CR-03-33 | CAM03-E07 | 柱の縦長表示窓に閉店時刻らしい紙が追加される。     | object / early / medium      |
| CR-03-35 | CAM03-E09 | 吊り器具の影だけ天井に二つ現れる。                 | surreal / mid / medium       |
| CR-03-36 | CAM03-E10 | 右シャッターの横板一枚だけ短くなる。               | environment / early / subtle |
| CR-03-38 | CAM03-E12 | 細いスタンドの脚が一本だけ反対に傾く。             | object / mid / medium        |
| CR-03-40 | CAM03-E14 | 緑色看板の光だけ消え、文字は読めるまま残る。       | object / mid / medium        |
| CR-03-42 | CAM03-E18 | 床の白い反射に小さな傘の影だけ映る。               | surreal / mid / medium       |
| CR-04-28 | CAM04-E01 | 天井面の汚れが一箇所だけ真新しい白い円になる。     | environment / early / subtle |
| CR-04-30 | CAM04-E03 | 換気口の中心に小さな白い紙片が一枚引っ掛かる。     | object / mid / medium        |
| CR-04-32 | CAM04-E05 | 奥の丸灯が一つだけ楕円形に変わる。                 | environment / early / subtle |
| CR-04-34 | CAM04-E08 | 緑看板の一文字の一部だけ小さな花模様になる。       | object / early / subtle      |
| CR-04-35 | CAM04-E09 | 左の掲示の四隅のうち一角だけ折れる。               | object / early / subtle      |
| CR-04-39 | CAM04-E13 | 丸看板が灯っているのに縁の影だけ二重になる。       | surreal / mid / medium       |
| CR-04-40 | CAM04-E14 | 右のガラス文字一文字だけ上下逆になる。             | object / mid / medium        |
| CR-04-41 | CAM04-E16 | 点検口の外枠の一辺だけ床と同色になる。             | object / early / subtle      |
| CR-04-42 | CAM04-E18 | 左端の暗い床際から紙片が一枚覗く。                 | object / early / medium      |
| CR-05-28 | CAM05-E01 | 天井板の点状汚れが一画だけ均等な格子に並ぶ。       | environment / early / subtle |
| CR-05-32 | CAM05-E05 | 長い蛍光灯の反射だけガラス面に二本映る。           | surreal / mid / medium       |
| CR-05-36 | CAM05-E09 | 暗い隙間に小さな白い紙袋の輪郭が見える。           | object / mid / medium        |
| CR-05-37 | CAM05-E10 | 緑看板の端に小さな丸い絵柄が一つ増える。           | object / early / subtle      |
| CR-05-38 | CAM05-E11 | 黒い側面にだけ人のいない傘立ての反射が現れる。     | surreal / mid / medium       |
| CR-05-39 | CAM05-E12 | レンガ調帯の一枚だけ角が丸くなる。                 | environment / early / subtle |
| CR-05-40 | CAM05-E13 | 床の一枚の目地が細い二重線になる。                 | environment / early / subtle |
| CR-05-41 | CAM05-E14 | 左奥の照明反射に小さな靴の跡が一つだけ現れる。     | surreal / mid / medium       |
| CR-05-42 | CAM05-E16 | 前景床の一箇所に古いレシートが一枚落ちる。         | object / early / medium      |
| CR-06-28 | CAM06-E01 | 天井の染み一つだけ消えてきれいな円形になる。       | environment / early / subtle |
| CR-06-32 | CAM06-E07 | 看板の小さな葉の図柄一枚だけ消える。               | object / early / subtle      |
| CR-06-33 | CAM06-E08 | 暗い店先にだけ温かい丸い照明の反射が現れる。       | surreal / mid / medium       |
| CR-06-34 | CAM06-E09 | 一枚の大きな葉の葉先が紙のように折れる。           | object / early / subtle      |
| CR-06-36 | CAM06-E11 | 左下の布状物の端に青いリボンが結ばれる。           | object / early / medium      |
| CR-06-37 | CAM06-E12 | メニュー板の一つの写真だけ丸枠になる。             | object / early / subtle      |
| CR-06-38 | CAM06-E13 | ガラスの縦枠一箇所に淡い手書きの矢印が現れる。     | object / early / medium      |
| CR-06-39 | CAM06-E14 | 奥の看板の外周が一箇所だけ欠ける。                 | object / early / subtle      |
| CR-06-40 | CAM06-E15 | 壁の額入り掲示が一回り小さくなる。                 | object / mid / medium        |
| CR-06-41 | CAM06-E16 | 床の目地の交点だけ小さく白く光る。                 | surreal / mid / medium       |
| CR-06-42 | CAM06-E17 | 長い床反射の端に紙袋の影だけ映る。                 | surreal / mid / medium       |
| CR-07-28 | CAM07-E01 | 天井の継ぎ目の一箇所だけ二股に分かれる。           | environment / early / subtle |
| CR-07-30 | CAM07-E03 | 換気口の輪の一つだけ幅が広くなる。                 | environment / early / subtle |
| CR-07-31 | CAM07-E04 | 丸灯の周りに小さな青い輪が現れる。                 | environment / early / subtle |
| CR-07-32 | CAM07-E05 | 奥の短い照明一つだけ別の角度を向く。               | environment / mid / medium   |
| CR-07-33 | CAM07-E06 | 左端ガラスに存在しない白い手袋が映る。             | surreal / mid / medium       |
| CR-07-34 | CAM07-E07 | 奥の扉に貼られた緑系の紙が淡い桃色になる。         | object / early / subtle      |
| CR-07-35 | CAM07-E08 | 看板の縁の一箇所だけ細い金色になる。               | object / early / subtle      |
| CR-07-39 | CAM07-E12 | 白い壁に日焼けしていない四角い跡が現れる。         | environment / early / medium |
| CR-07-41 | CAM07-E14 | 右階段の手すりの端だけ床側に曲がる。               | environment / mid / medium   |
| CR-07-42 | CAM07-E18 | 丸い床反射の一つが星形になる。                     | surreal / mid / medium       |
| CR-08-28 | CAM08-E01 | 天井の小さな斑点が一か所だけ同心円に並ぶ。         | environment / early / subtle |
| CR-08-31 | CAM08-E04 | 丸灯の下に小さな水滴が一つ吊り下がる。             | environment / mid / medium   |
| CR-08-35 | CAM08-E08 | 明るい通路の壁に小さな紙風船が一つ置かれる。       | object / mid / medium        |
| CR-08-36 | CAM08-E09 | 奥の緑表示の下に同じ形の小さな表示が増える。       | object / mid / medium        |
| CR-08-37 | CAM08-E10 | 丸看板の白い面に小さな青い点が一つ現れる。         | object / early / subtle      |
| CR-08-38 | CAM08-E11 | 中央柱の角に小さな木製の名札が付く。               | object / early / medium      |
| CR-08-39 | CAM08-E12 | 横長器具の下縁だけ緩やかな曲線になる。             | object / early / subtle      |
| CR-08-40 | CAM08-E13 | スイッチ状部品のすぐ横に同じ部品がもう一つ現れる。 | object / early / medium      |
| CR-08-41 | CAM08-E14 | 右壁の白い帯の一本だけ薄い桃色になる。             | environment / early / medium |
| CR-08-42 | CAM08-E16 | 床タイルの一枚の中央に小さな落ち葉が一枚現れる。   | object / early / medium      |

## 昭和テーマ候補（閉店後の地下街に日常が戻る）

未制作。旧・昭和案メモから、`anomalies.yaml` に同等の試作が無く、対象要素を特定できるものだけを移した。候補IDは `CR-SH-NN`。方針（核となる変化・小道具を主役にしない・修復は元写真で破損が確認できる箇所だけ）は制作スキルの「昭和の時間が戻る異変」を参照。着手前に通常どおり類似照合する（近縁: AR-01-shutter-light / AR-08-notice-residue / CR-08-17 / AR-02-duplicate-coffee-sign）。

時計の針は写真に時計が写っていないため候補にしない（例外あり: 大面積 `CR-LG-07-01` は時計を**足す**案で、kako-jun 指示 2026-11-04。制作済みで台帳が真実）。

2026-11-04: CR-SH-01（CAM02-E07）は CAM02-E07 に既存5件が集中している。左シャッターに重ねず、別のシャッター/壁面で作り直す（要再選定）。

| 候補ID   | 対象ID       | 変化案                                                                                                                       | 分類 / フェーズ / 目立ち度  |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| CR-SH-01 | CAM02-E07    | シャッターに色褪せたホーロー広告が一枚現れる。                                                                               | object / early / subtle     |
| CR-SH-02 | CAM02-E14    | 自立看板の文字が昔の喫茶店の名前に戻る（架空名）。                                                                           | object / mid / medium       |
| CR-SH-04 | 無作為（音） | 誰もいないのに、楽しそうなどんちゃん騒ぎの声と笑い声が遠くから聞こえる（宴会・祭りの賑わい。言葉は聞き取れない）。           | environment / mid / medium  |
| CR-SH-05 | 無作為（音） | 古いラジオから流れるような、音質の悪い歌謡曲調の無名の旋律が、雑音まじりに途切れ途切れに鳴る（実在曲は使わない）。           | environment / mid / subtle  |
| CR-SH-06 | 無作為（音） | 昭和の記録映画のような、抑揚の硬いアナウンサー調のナレーションが聞こえる（内容は聞き取れない・実在の番組や人物は使わない）。 | environment / late / medium |

音系（CR-SH-04〜06）は令和の音と同じく、画像差分を持たない runtime 案で、音の種類とカメラを出現のたびに無作為に選び、選ばれたカメラを見ている間だけ鳴らす。報告はそのカメラでカテゴリ（`environment` 仮）を選ぶ。どれも楽しげ・懐かしげなのに不気味に聞こえる、が狙い（kako-jun 指示）。実在の楽曲・番組・人物は使わない。採用には音素材と再生機構が必要（Issue #70）。映像が一瞬褪色する案や食器の音などは下の runtime 在庫を参照。

## 令和テーマ候補（4人目の子供の記憶）

画像系（01〜06）は制作して台帳 `anomalies.yaml` へ移した。ここに残るのは音系（07〜09）のみ。用途は、4人目（令和のZ世代の子供）の「令和の異変（どれでも3つ見つければ条件成立）」の候補（[`docs/story.md`](../docs/story.md) の「進行」節）。老人3人の異変が昭和の物なのに対し、子供の記憶が作る異変は令和（2020年代）の若者の持ち物や気配とする。昭和の小道具は流用せず、実在の会社名・商標・ロゴ・楽曲は使わない（無地か架空名、無名の一般的な音）。候補IDは `CR-RZ-NN`。静かで少し寂しい「帰らない子供」の気配を出し、目立たせすぎない。着手前に通常どおり類似照合する（近縁: AR-02-bag / CR-05-36 / CR-06-42（紙袋）、CR-01-37（傘の立てかけ）、CR-07-33（手袋の映り込み）、AR-07-notice、音は下の runtime 在庫「音」）。

音系（07〜09）は画像差分を持たない runtime 案で、**音の種類と、それが起きるカメラは出現のたびに無作為に選ぶ**（kako-jun 決定。カメラは固定しない）。選ばれたカメラを見ている間だけ鳴らし、報告は画像系と同じくそのカメラでカテゴリを選ぶ（報告は画面位置を指さない）。カテゴリは `environment` とする（仮）。採用（`anomalies.yaml` への昇格）には、音素材と再生機構に加え、台帳の書式（`overlay` 必須）に `sound` を許す変更が要る。音は現状ゲームに未実装（無音）。変化案はこの節に一本化し、runtime 在庫側は参照のみ。

| 候補ID   | 対象ID       | 変化案                                                     | 分類 / フェーズ / 目立ち度  |
| -------- | ------------ | ---------------------------------------------------------- | --------------------------- |
| CR-RZ-07 | 無作為（音） | 遠くから、無名の一般的なスマホ通知音が一度だけ鳴る。       | environment / mid / subtle  |
| CR-RZ-08 | 無作為（音） | ワイヤレスイヤホンから漏れるような、小さな無名のビート音。 | environment / mid / subtle  |
| CR-RZ-09 | 無作為（音） | 誰もいない通路で、自撮りのシャッター音が一度だけ鳴る。     | environment / late / medium |

## Runtime / 背景非依存の異変在庫

画像差分を作らず、CSS / Canvas / Web Audio / 状態管理で出す異変の在庫（旧・異変在庫メモから移設）。写真要素に紐づかないため要素IDは持たない。採用時は画像異変と別の実装タスクにし、`anomalies.yaml`（画像差分台帳）には載せない。

**報告できない系統の扱い**: 報告は「見ているカメラの異変のカテゴリを選ぶ」だけなので、カメラに結びつかない異変（UI・メタ、ゲームルール系）は現状の報告方式では受け付けられず、採用の前提に窓口の設計が要る（別議論。報告ボタンを消す案も、報告手段を失うため同様）。カメラに結びつく系統（カメラ画像そのもの、音）は現方式のまま扱える。これらは画像系と違い特定のカメラに固定せず、**出現のたびにカメラを無作為に選ぶ**（kako-jun 決定。設計は Issue #70）。

分類軸: `asset`（画像差分が必要）/ `runtime`（画像生成不要）/ `hybrid`（両方）。`background-bound`（看板・シャッター・通路奥など背景依存）/ `background-free`（画面揺れ・音・camera lost など）。

### カメラ画像そのもの（asset または hybrid）

- frame crop: 同じカメラなのに少しズームされている。
- angle shifted: カメラ角度が数度ずれる。
- focus blur: 一部/全体のピントが外れる。
- exposure shift: 白飛び、黒潰れ。
- compression artifact: ブロックノイズが異常に増える。
- scanline burn: 走査線や焼き付きが増える。
- freeze frame marker: 時刻だけ進むが映像が止まったように見える。
- duplicate feed image: 別カメラと同じ映像になる。
- fast figure: 画像では残像、runtime で一瞬横切る。
- flicker source: 画像差分では明滅対象を作り、runtime で点滅させる。

### カメラ・映像

- camera lost: カメラ一覧から1台消える、または黒画面になる。
- camera feed swapped: ラベルと映像が入れ替わる。
- camera label shuffle: CAM番号や場所名がランダムに変わる。
- camera locked: 一時的に特定カメラへ切替不能。
- camera auto switch: 勝手に別カメラへ切り替わる。
- camera delayed: 数秒前の映像のように時刻だけ遅れる。
- camera rewind: 短く巻き戻る。
- camera loop: 同じ数秒をループする。
- shake / hard shake: 画面が小刻みに揺れる / 報告を急がせる大きい揺れ。
- distortion: 魚眼、波打ち、引き伸ばし。
- chromatic aberration: 色ズレ。
- static noise: ノイズが画面を覆う。
- black frame blink: 一瞬黒フレームを挟む。
- dead pixels: 固定点のノイズや欠けが増える。
- overlay ghosting: 前フレームが薄く残る。

### 音

- ambience missing: 環境音が急に消える。
- hum grows: 低いハム音が大きくなる。
- fluorescent buzz: 蛍光灯のジリジリ音。
- distant footsteps / running footsteps: 奥から足音 / 近づく速い足音。
- knock: シャッター/壁/ガラスを叩く音。
- whisper: 聞き取れない囁き。
- reversed announcement: 逆再生の館内放送。
- 令和系: 令和系の音は「令和テーマ候補」節（CR-RZ-07〜09）を参照。
- wrong location sound: 見ていないカメラの音が鳴る。
- report stinger: 異変中だけ短い不協和音。
- silence after report: 正報後に一瞬無音。
- 昭和系: 食器の音、古い館内放送がかすかに混ざる（音素材と再生機構が必要）。映像が一瞬だけ褪色する。どんちゃん騒ぎの声・古いラジオ／歌謡曲・記録映画のアナウンサー調は「昭和テーマ候補」節（CR-SH-04〜06）が正本。

### UI・メタ

- report button disappears / moves: 報告ボタンが短時間消える / 位置がずれる。
- wrong category labels: カテゴリ名だけ入れ替わる。
- disabled category: 正しいカテゴリが一時的に押せない。
- false strike display: strike 表示が増えたように見える。
- timer backwards / jumps / frozen: 時刻が逆走する / 0:00・6:00付近へ飛ぶ / 映像は動くが時刻が止まる。
- text corruption: UI 文字が壊れる。
- language drift: 英語 UI に日本語/記号が混ざる。
- notification lies: toast が嘘を言う。
- badge appears without anomaly / badge missing: 異変が無いのに警告バッジ / 異変中なのにバッジが出ない。
- cursor/hover glitch: desktop 時のみカーソルや hover が乱れる。

### ゲームルール

- extra active anomaly: 同時発生上限を一時的に超える。
- anomaly refuses report: 正しく報告しても一度だけ直らない。
- wrong camera accepted: 別カメラの報告が通る。
- category inversion: 特定時間だけカテゴリ判定が逆になる。
- safe camera unsafe: 何もないはずのカメラで strike 誘導が起きる。
- tutorial rule break: 画面上のルール文が変わる。

### 配分の目安（初期案。MVP 40 件想定・現状の台帳件数とは別）

本文の件数は現状の pool 件数・台帳件数とは無関係。

- 内訳: sanitized baseline は全カメラ、画像異変 24、runtime カメラ 6、音 4、UI/メタ 6。
- フェーズ: early 12（小さな物体・看板・照明・音の違和感）/ mid 16（扉・通路奥・人影・camera lost・画面揺れ）/ late 12（物理崩壊・人物異常・UI 破壊・タイマー異常）。
- 背景別: 看板が強い背景は signage/text/poster 系、通路奥は intruder/corridor/door/fog 系、シャッター・店先は door/shutter/peek/knock 系、蛍光灯・天井は light/flicker/ceiling/shadow 系、余白・暗部は creature/surreal/reflection 系。camera lost・shake・static・audio・UI/meta はどの背景にも置ける。
- 方針: 序盤は小さく、中盤は確信でき、終盤はルール自体が壊れる構成にする（反復空間の間違い探し系ゲームの差分を参考）。

### 汎用タイプの視点（取りこぼし防止）

画像異変の汎用タイプは `anomaly_type` enum（README）と上の写真固有案で足りる。enum の名前だけでは見落としやすい視点を、案出しのチェックとして残す。

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
| fast figure         | 画像では残像、runtime で一瞬横切る             | `add_person`                 |
| forbidden object    | 屋内に場違いな物（濡れた道路標識など）         | `add_object`                 |
