# 異変候補プール

まだ採用・生成した異変ではなく、写真の写り込みから発想を広げる写真固有案、昭和テーマ案、写真に紐づかない runtime 在庫をまとめた候補。

## 正本と昇格ルール

- 写っている物の説明・座標・カメラ写真の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。写真固有の候補ではここでは要素IDだけ参照し、物体説明や座標を複製しない。
- 異変の全件の真実は台帳（`anomalies.yaml`。制作済みも未制作 `planned` も載る。書式と昇格ルールは [`README.md`](./README.md) の「台帳の書式」）。「制作仕様（未制作）— CAM NN」の各節には、偏り是正のために起こした未制作の制作仕様と、CAM 03 の取り下げた案（AR-03-floor-line-break。将来の再挑戦用）を置く。制作して台帳へ登録した案は、その案の節（### 見出し単位）を削除し、`anomalies.yaml` に一度だけ登録する（他の案が残る限り節自体は残す）。
- 末尾の「Runtime / 背景非依存の異変在庫」は写真に紐づかない案。採用したら `kind: runtime` のエントリとして `anomalies.yaml` へ載せる（書式と昇格ルールは [`README.md`](./README.md) の「台帳の書式」。移行は #77 の PR2）。
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

薄い型（displace・text_change・multiply・add_creature・add_person）の偏り補正のための 5 件。書式は CAM 03 の見本に同じ。画像は未制作で、台帳（`anomalies.yaml`）には未登録。box は元写真の画素座標で、既存 overlay（大面積の例外を除く）から約 30px 以上離れていることを実測で確認した。型は README の enum どおり。

### AR-01-ceiling-slit-slide — 天井の黒いスリット通気口が、元の位置から左へずれている

- **カメラ**: CAM01（`cam1.webp`、675x900）／対象要素: CAM01-E08
- **型 / カテゴリ / フェーズ / 目立ち度**: `displace` / `environment` / mid / subtle
- **物と変化**: 通路奥の天井にある細長い黒いスリット状の通気口（器具の列の三段目の、横長の黒い長方形）が、元の位置から左へ一本分ほど（約 36px）ずれて別の位置に付いている。元の位置は周囲と同じ天井板で自然に埋まる。同じ物が、器具の列から外れた不自然な位置にある。
- **box (x1,y1,x2,y2)**: (300,318,374,330)（74x12）
- **最寄り既存 overlay と実測距離**: 最寄り既存 overlay は AR-01-tube-end (31.0)、次点 AR-01-shutter-stripe-break (44.4)。
- **6倍クロップ範囲**: 6倍クロップ (209,239)–(465,410)（256x171）。box は窓内で (546,474)–(990,546)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: the thin black horizontal slit-shaped ceiling vent in the centre column of the corridor ceiling (a long narrow black rectangle) is now shifted to the left by about 36 source pixels, so it no longer lines up with the row of black ceiling fixtures: its old place is filled with the same blue-grey speckled ceiling board and the vent itself, same size and darkness, sits further left in the marked area. The vent is not rotated or resized. The edit area is about x=546 to 990, y=474 to 546 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: move the black slit vent in the edit area to the left by about a third of its own length: erase it from the original place so that the ceiling board is seamless there, and draw the identical black slit (same length, thickness, edge softness) at the new position on the same ceiling plane, in the same perspective. Nothing else changes. The edit area is about x=546 to 990, y=474 to 546 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: the narrow black ceiling slit in the edit area is displaced sideways to the left, out of line with the fixtures above and below it. Exactly one slit exists; the original spot is smooth ceiling. Keep size, brightness and perspective of the slit identical. The edit area is about x=546 to 990, y=474 to 546 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
- **視認性の見立て**: 黒いスリット（細長い）の移動で、元の位置の黒が消え新位置に黒が現れる＝二箇所で差分が出る。細いが高コントラストなので最大差分は十分。check-visibility を必ず通し、通らなければ移動量を大きくする。
- **台帳登録案**:
  ```yaml
  - id: 'AR-01-ceiling-slit-slide'
    candidate_id: 'AR-01-ceiling-slit-slide'
    camera_id: 'CAM01'
    element_id: 'CAM01-E08'
    base_photo: 'public/images/cam1.webp'
    category: 'environment'
    anomaly_type: 'displace'
    location: 'CAM01-E08 の対象箇所、差分左上 (300,318) 付近（貼り込み後に再計測）'
    detail: '天井の黒いスリット通気口が、元の位置から左へずれている。'
    overlay: 'assets/anomaly-overlays/cam01/ceiling-slit-slide.webp'
    # phase / 目立ち度: mid / subtle
    note: 'ずれの量は「列から外れて見える」程度の約 36px。回転・拡大縮小はしない（displace は位置だけ）。天井全面の大面積 AR-01-ceiling-lanterns と box が重なる（大面積の例外。同プレイで共存させない=排他）。'
  ```
- **相互参照 / 重複精査**: ceiling-tile-drop は板が垂れる state 系、CR-01-32 は器具が天井から浮く surreal。本案はスリットが水平方向へずれるだけで、見え方が違う。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-01-ceiling-lanterns（天井一面の大面積）。併存可=床・壁・看板。

### AR-01-plaque-text-swap — 奥の白い小さな名札の文字が、別の文字に変わる

- **カメラ**: CAM01（`cam1.webp`、675x900）／対象要素: CAM01-E14
- **型 / カテゴリ / フェーズ / 目立ち度**: `text_change` / `object` / early / subtle
- **物と変化**: 奥の白い柱の、黄色い矢印案内板の下に付いた小さな白い名札（字数不明の小さな印字が入った横長の札。制作時に原寸で確認）の文字が、元の文字から『三番口』という別の文字に変わる。札の形・位置・色は元のまま。元の文字は原画像では読み切れないため、変更後の文字だけを指定し、元の字形は消して置き換える。
- **box (x1,y1,x2,y2)**: (377,401,398,415)（21x14）
- **最寄り既存 overlay と実測距離**: 最寄り既存 overlay は AR-01-sign-rim (31.8)、次点 AR-01-back-view-paper-bag / AR-01-crouching-silhouette (41.0)。矢印案内板（CAM01-E15）本体は AR-01-tube-end (20.0) に近すぎて対象にできない。
- **6倍クロップ範囲**: 6倍クロップ (259,323)–(515,494)（256x171）。box は窓内で (708,468)–(834,552)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: on the small white wall plaque just below the yellow arrow guide board at the far end of the corridor (a small horizontal white plate with a few tiny black characters, in the marked area), replace the existing characters with the three Japanese characters 三番口, in the same plain black printed gothic style, same size, spacing and print sharpness as the original characters. The plate, its frame, the yellow arrow board above and the white pillar all stay exactly as they are. The edit area is about x=708 to 834, y=468 to 552 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: re-letter the small white plaque in the edit area so that it reads 三番口 (three kanji, black, plain printed gothic type), centred on the plate in place of the old characters; the old strokes must be fully removed. Do not change the plate shape, colour, border or the surrounding wall. Keep the soft, slightly blurred look of small distant signage. The edit area is about x=708 to 834, y=468 to 552 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: change only the text on the tiny white name plate in the edit area: it now reads 三番口 in black plain gothic lettering of about the same height as the previous text. Everything else, including the yellow arrow sign above it, stays untouched. The edit area is about x=708 to 834, y=468 to 552 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
- **視認性の見立て**: 約 21x14 と非常に小さく、遠景の文字なので視認性は最も厳しい案。黒文字→黒文字で面積差が小さいため check-visibility を通らない恐れが大きい。通らなければ字を太く・札の下地を黄味にして差分を強める。要つまみ調整（明るさを上げると札の白が飛んで見えにくくなる。コントラストを上げる方向が効く）。
- **台帳登録案**:
  ```yaml
  - id: 'AR-01-plaque-text-swap'
    candidate_id: 'AR-01-plaque-text-swap'
    camera_id: 'CAM01'
    element_id: 'CAM01-E14'
    base_photo: 'public/images/cam1.webp'
    category: 'object'
    anomaly_type: 'text_change'
    location: 'CAM01-E14 の対象箇所、差分左上 (377,401) 付近（貼り込み後に再計測）'
    detail: '奥の白い小さな名札の文字が、別の文字に変わる。'
    overlay: 'assets/anomaly-overlays/cam01/plaque-text-swap.webp'
    # phase / 目立ち度: early / subtle
    note: '元の文字は原寸でも判読できない。「元の文字と違う文字」であることは、変更後の三文字が読めて元と字形が違えば成立する。矢印案内板の文字は近接 overlay で対象外。'
  ```
- **相互参照 / 重複精査**: CR-01-11/38（矢印の向き）・AR-01-sign-old-shop（吊り看板の図柄）とは別の物。台帳の text_change は吊り看板だけで、柱の名札の文字を変える案は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=なし。併存可=他の異変すべて（最寄りでも 31px 離れている）。

### AR-01-outlets-multiply — 右の壁の小さなコンセントが、縦に何個も増える

- **カメラ**: CAM01（`cam1.webp`、675x900）／対象要素: CAM01-E12
- **型 / カテゴリ / フェーズ / 目立ち度**: `multiply` / `object` / early / subtle
- **物と変化**: 右の店先の脇の白い壁にある小さなコンセントの差込口（元は一つ）が、同じ形・同じ大きさで縦に六個ほど等間隔に並ぶ。ほかの壁面・柱・店先はそのまま。数の増殖で、気づくと壁が穴だらけで不気味。
- **box (x1,y1,x2,y2)**: (468,480,490,540)（22x60）
- **最寄り既存 overlay と実測距離**: 最寄り既存 overlay は AR-01-crouching-silhouette (30.0)、次点 AR-01-yellow-boots (30.0)。右の格子壁一面の AR-01-right-wall-lattice-doors とは大面積の例外（排他）。
- **6倍クロップ範囲**: 6倍クロップ (351,425)–(607,596)（256x171）。box は窓内で (702,330)–(834,690)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: on the cream-coloured wall beside the closed right-hand shop front, in the marked area, the single small wall outlet plate (a tiny white plate with two dark slots) is multiplied: six identical outlet plates now sit in one evenly spaced vertical column on the wall, same size, same dark slots, same dim lighting and perspective as the original. The wall, the skirting and the floor stay exactly as they were. The edit area is about x=702 to 834, y=330 to 690 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: add five more copies of the small white wall outlet plate in the edit area, stacked vertically under and above the original with equal spacing, all in the same perspective and brightness, so that a column of six identical outlets appears. Nothing else is added. The edit area is about x=702 to 834, y=330 to 690 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: the lone electric outlet on the right wall is replaced by a neat vertical row of about six identical outlets of the same size and colour. The remaining wall texture and lighting are untouched. The edit area is about x=702 to 834, y=330 to 690 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
- **視認性の見立て**: 元のコンセントは約 6x10 と極小で、複製も小さい。差分の面積は 22x60 に散らばり、白い板と暗い穴は壁の淡色とコントラストがあるが弱め。check-visibility を通らなければ、板を大きめ（実寸比で）にして間隔を詰めない。要つまみ調整（明るさを下げる方向で壁の白と穴の差が出やすい）。
- **台帳登録案**:
  ```yaml
  - id: 'AR-01-outlets-multiply'
    candidate_id: 'AR-01-outlets-multiply'
    camera_id: 'CAM01'
    element_id: 'CAM01-E12'
    base_photo: 'public/images/cam1.webp'
    category: 'object'
    anomaly_type: 'multiply'
    location: 'CAM01-E12 の対象箇所、差分左上 (468,480) 付近（貼り込み後に再計測）'
    detail: '右の壁の小さなコンセントが、縦に何個も増える。'
    overlay: 'assets/anomaly-overlays/cam01/outlets-multiply.webp'
    # phase / 目立ち度: early / subtle
    note: '元の位置のコンセント一つを起点に縦に増殖。右の店先壁は大面積案と排他。'
  ```
- **相互参照 / 重複精査**: AR-01-power-bank（床の黒い物）・CR-01-21（左壁の貼り紙）は物も壁も別。台帳に壁の設備を増殖させる案は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-01-right-wall-lattice-doors（右の店先の壁一面）。併存可=床・天井・左壁。

### AR-01-ceiling-spider — 天井の継ぎ目に、手のひら大の大きな蜘蛛が張り付く

- **カメラ**: CAM01（`cam1.webp`、675x900）／対象要素: CAM01-E01
- **型 / カテゴリ / フェーズ / 目立ち度**: `add_creature` / `object` / mid / medium
- **物と変化**: 右寄りの天井の粒状の天井板の上に、脚を広げた大きな黒い蜘蛛が一匹とまっている（天井灯のそばの暗い面に濃い影を落とさず、天井に張り付く）。無地・文字なし。無人の地下街に何か生き物がいる異変。
- **box (x1,y1,x2,y2)**: (500,198,550,229)（50x31）
- **最寄り既存 overlay と実測距離**: 最寄り既存 overlay は AR-01-ceiling-tile-drop (30.0)、次点 AR-01-ceiling-panel-round (31.0)。
- **6倍クロップ範囲**: 6倍クロップ (397,128)–(653,299)（256x171）。box は窓内で (618,420)–(918,606)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: add one large black spider clinging to the ceiling board in the marked area of the right half of the corridor ceiling: a glossy dark body about 8 source pixels across with eight long thin angular legs spread to a total width of about 40 source pixels, seen from below, in the correct perspective of the ceiling, with a very soft contact shadow and the same cool blue-grey colour cast as the ceiling. Nothing else is added or changed. The edit area is about x=618 to 918, y=420 to 606 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: a big spider (body and eight jointed legs, black with slightly lighter leg joints) sits on the ceiling surface in the edit area, viewed from underneath. Make it clearly a spider, about a hand-span in real size, and keep the speckled ceiling board, the fluorescent light and all other fixtures exactly as they are. The edit area is about x=618 to 918, y=420 to 606 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: one huge dark spider rests motionless on the speckled ceiling in the edit area, legs spread, partly in the dim light of the ceiling; no web, no text. Keep ceiling texture and the neighbouring light tubes unchanged. The edit area is about x=618 to 918, y=420 to 606 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
- **視認性の見立て**: 黒い蜘蛛は明るい灰色の天井との対比が大きく、最大差分は十分。ただし約 50x31 の中で細い脚が多く、画素数条件は面積比（25%）で通す想定。check-visibility を通すこと。
- **台帳登録案**:
  ```yaml
  - id: 'AR-01-ceiling-spider'
    candidate_id: 'AR-01-ceiling-spider'
    camera_id: 'CAM01'
    element_id: 'CAM01-E01'
    base_photo: 'public/images/cam1.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM01-E01 の対象箇所、差分左上 (500,198) 付近（貼り込み後に再計測）'
    detail: '天井の継ぎ目に、手のひら大の大きな蜘蛛が張り付く。'
    overlay: 'assets/anomaly-overlays/cam01/ceiling-spider.webp'
    # phase / 目立ち度: mid / medium
    note: 'category は camera/object/environment/person/surreal の5分類で生き物は暫定 object（README の方針に従う）。台帳では add_creature。同じカメラの add_creature は AR-01-threshold-pigeon（右の店先の白い鳩）のみで、天井の蜘蛛とは場所も生き物も違う。天井一面の大面積 AR-01-ceiling-lanterns と右の店先の壁一面の大面積 AR-01-right-wall-lattice-doors の両方と box が重なる（大面積の例外。同プレイで共存させない=排他）。'
  ```
- **相互参照 / 重複精査**: 鳩は床の敷居・白い鳥、本案は天井・黒い蜘蛛。CR-01-25（開口の手前の猫）は床の猫で、別。台帳に昆虫・節足動物の案は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-01-ceiling-lanterns（天井一面の大面積）・AR-01-right-wall-lattice-doors（右の店先の壁一面の大面積）。併存可=床・壁・右の店先の異変。

### AR-01-window-peeping-face — 左の窓の暗いガラスの上部から、白い顔がこちらを覗く

- **カメラ**: CAM01（`cam1.webp`、675x900）／対象要素: CAM01-E10
- **型 / カテゴリ / フェーズ / 目立ち度**: `add_person` / `person` / late / medium
- **物と変化**: 左手前の縦長の窓の、上部の暗いガラスの面に、色白の無表情な顔が一つ、窓の内側からこちらを覗くように浮かぶ。首から下は暗がりに溶けて見えない。化粧・服・文字なし。報告カテゴリは person になる。
- **box (x1,y1,x2,y2)**: (50,272,108,312)（58x40）
- **最寄り既存 overlay と実測距離**: 最寄り既存 overlay は AR-01-ceiling-lamp-off (56.0)、次点 AR-01-ceiling-seam-circle (56.5)、AR-01-notice (73.0)。同じ窓の AR-01-wiped-window・AR-01-cat-in-frosted-window は窓の下部の明るい曇り面で、box は 75px 以上離れている。
- **6倍クロップ範囲**: 6倍クロップ (0,207)–(256,378)（256x171）。box は窓内で (300,390)–(648,630)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: in the marked area at the top of the tall window on the left-hand wall, where the glass is dark, a pale, expressionless human face appears behind the glass as if someone were standing inside the closed shop and looking out: oval face, closed-lipped mouth, dark eye hollows, short dark hair, a faint cold reflection on the glass over it. The neck and body fade into darkness. Frame, glass tone and surroundings stay exactly the same. No text. The edit area is about x=300 to 648, y=390 to 630 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: add a person's face looking out of the dark upper pane of the left window in the edit area: a pale colourless face with calm unreadable eyes, slightly blurred as through dirty glass, merging into the shadowy room behind. Do not add a body, hands, or any extra object; keep the window frame, the frosted lower glass and the wall unchanged. The edit area is about x=300 to 648, y=390 to 630 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: behind the dark glass at the top of the left window, one white face stares toward the camera: small, flat, almost featureless, partly veiled by the glass reflection and the surveillance noise. Nothing else is changed. The edit area is about x=300 to 648, y=390 to 630 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
- **視認性の見立て**: 暗い窓ガラスに淡い顔が出るので差分は大きい（暗→明）。約 58x40 で面積も十分。check-visibility を通すこと。
- **台帳登録案**:
  ```yaml
  - id: 'AR-01-window-peeping-face'
    candidate_id: 'AR-01-window-peeping-face'
    camera_id: 'CAM01'
    element_id: 'CAM01-E10'
    base_photo: 'public/images/cam1.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM01-E10 の対象箇所、差分左上 (50,272) 付近（貼り込み後に再計測）'
    detail: '左の窓の暗いガラスの上部から、白い顔がこちらを覗く。'
    overlay: 'assets/anomaly-overlays/cam01/window-peeping-face.webp'
    # phase / 目立ち度: late / medium
    note: 'person カテゴリ。窓の上部の暗いガラス＝閉店した店の中に誰かがいる、という見え方で、廊下に人影が立つ AR-01-back-view-paper-bag・AR-01-crouching-silhouette とは位置・見え方が違う（窓の中の顔）。'
  ```
- **相互参照 / 重複精査**: AR-01-cat-in-frosted-window は同じ窓の下部に映る猫の影（reflection）で、場所・対象が違う。CR-01-06（開口の小さな人影）・CR-01-09（窓にシャッターの裏）とも別。同カメラには AR-01-wall-faces（左壁一面に無表情の顔写真が格子状に並ぶ duplicate）があり、顔という題材は近いが、見え方が違う（窓ガラスの奥に顔が一つだけ・生きた人が覗く／壁一面に写真の顔が多数）。同プレイでは共存させない。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-01-wall-faces（顔の題材が近い。box は重ならない）。併存可=床・天井・右の店先の異変。

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

CAM 02（`cam2.webp`、676x900）の型の偏りを直すために起こした制作仕様 3 件。型: remove_object 1 / text_change 1 / surreal 1。画像は作っていない。台帳（`anomalies.yaml`）へは、制作して overlay ができてから一件ずつ登録する。写真の写っているものは原寸の拡大で確認した（要素の座標は `camera-element-inventory.md` が正本）。

### AR-02-wall-bird-gone — 右壁の黒い店舗ガラスの白い鳥の装飾が一羽だけ消える

- **カメラ**: CAM02（`cam2.webp`、676x900）／対象要素: CAM02-E17
- **型 / カテゴリ / フェーズ / 目立ち度**: remove_object / object / mid / medium
- **物**: 右側の黒い店舗ガラスに散る白い飾りのうち、柱寄り（画面左）の大きな鳥（翼を広げた白い鳥、約 21x44 px。星形の飾りの下、右端の小さな鳥の上）。
- **変化**: この一羽だけが消え、黒いガラスと周りの星形・他の鳥はそのまま。消えた跡は一様に黒く、ガラスの反射と細かな粒状感だけが続く。星・鳥の数を数えた人だけが気づく『減る』変化（AR-02-wall-bird-triplet は同じ装飾が『増える』）。
- **box (x1,y1,x2,y2)**: (636,248,664,302)（28x54）
- **最寄り既存 overlay と実測距離**: AR-02-smoke (31.0)、次点 AR-02-duplicate-coffee-sign (64.0)。
- **6倍クロップ範囲**: 6倍クロップ (420,190)–(676,361)（256x171）。box は窓内で (1296,348)–(1464,672)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: In the lower-right of the frame, on the large dark glass storefront wall (right edge of the crop), there is a row of white decorative silhouettes (stars and flying birds). The tall white bird with spread wings located at about x=1296 to 1464, y=350 to 670 in the 1536x1024 frame is removed completely: that area becomes the same plain near-black glass with the same faint reflections and grain as the glass around it, as if the bird had never been there. The other stars and birds, including the small bird further down and the one at the right edge, stay exactly as they are. Add nothing. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: In the lower-right of the frame, on the dark glass storefront wall at the right edge, erase one white bird silhouette (the larger white bird with spread wings, inside the area x=1296 to 1464, y=348 to 672 in the 1536x1024 frame). Fill the gap with seamless dark glass, continuing the faint cold reflections and the film grain. Do not touch any star shape, any other bird, the wooden easel or the frame edges. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: On the dark glass wall at the right of the crop, one of the white wing-spread bird decorations is missing: inside x=1296 to 1464, y=348 to 672 (1536x1024 frame) the glass is simply empty and dark, with no outline, no ghost, no discolouration where the decoration used to be. Every other decoration keeps its exact position and brightness. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 白い飾り（輝度が高い）が黒いガラスに変わるので、消した面の差分は 100 を超える見込み。面積は鳥の実形で約 500〜700 画素。下限（最大差分 40、平均 3、差分25以上が 100 画素以上）は余裕で通る見立て。
- **台帳登録案**:
  ```yaml
  - id: 'AR-02-wall-bird-gone'
    candidate_id: 'AR-02-wall-bird-gone'
    camera_id: 'CAM02'
    element_id: 'CAM02-E17'
    base_photo: 'public/images/cam2.webp'
    category: 'object'
    anomaly_type: 'remove_object'
    location: 'CAM02-E17 の差分左上 (636,248) 付近（貼り込み後に再計測）'
    detail: '右壁の黒い店舗ガラスの白い鳥の装飾が一羽だけ消える。'
    overlay: 'assets/anomaly-overlays/cam02/wall-bird-gone.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-02-smoke（box 距離 31px）。壁面の煙が出ていると鳥の消失が隠れるため、同プレイでは避けたい。同じ装飾群の AR-02-wall-bird-triplet（鳥が三羽に増える）と、鳥の数が矛盾するので同プレイで共存させない。'
  ```
- **相互参照 / 重複精査**: AR-02-pillar-sign-gone は『看板が消えて日焼け跡が残る』で、対象（柱上の看板）も跡の見え方も別。ここは何も跡が残らない黒いガラス。CR-02-07（白い壁飾りの一つの向き）・AR-02-flower-ornament/red-star（星の形・色）とは対象の飾りも変化も別。candidate-pool に鳥の装飾を消す案は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-02-wall-bird-triplet / AR-02-smoke。併存可=床・天井・左シャッター・柱の異変。

### AR-02-signboard-text-peek — 右上の橙色の吊り看板の文字が「ノスタ」から別の文字に変わる

- **カメラ**: CAM02（`cam2.webp`、676x900）／対象要素: CAM02-E06
- **型 / カテゴリ / フェーズ / 目立ち度**: text_change / object / mid / medium
- **物**: 画面右上端で切れている橙赤地・白い円の看板（原寸で読み直した：円の中に緑の太い筆文字「ノスタ」が見え、「タ」は画面右端で切れる。文字の位置は約 x=622〜676, y=40〜82）。
- **変化**: 「ノスタ」の「ノ」はそのままで、続く二文字（「スタ」の位置）が「ゾク」に変わり、画面に見える範囲は「ノゾク」（覗く）と読める。書体・色・太さ・傾きは元の緑の太い筆文字のまま、円と橙の地は変えない。実在の店名・語ではなく、『元の文字と違う文字』になる文字だけの変化。
- **box (x1,y1,x2,y2)**: (636,34,676,92)（40x58）
- **最寄り既存 overlay と実測距離**: AR-02-smoke (31.0)、次点 AR-02-tanabata-paper-chain (35.0)。
- **6倍クロップ範囲**: 6倍クロップ (420,0)–(676,171)（256x171）。box は窓内で (1296,204)–(1536,552)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: On the orange-red hanging sign at the top-right corner of the crop (a white circle with green brush-style katakana letters), the green letters currently read ノスタ and the last letter is cut off by the right edge of the frame. Change only the letters that sit at about x=1296 to 1536, y=204 to 552 in the 1536x1024 frame: keep the first letter ノ exactly as it is and replace the two letters after it with the katakana ゾ and ク, so that the visible text reads ノゾク (the ク is partly cut by the right edge, just like the original last letter was). Use the same thick dark green brush stroke, the same slant, size, spacing, and the same slightly worn paint. The white circle, the orange-red background, the black frame and everything else stay unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Apart from the three katakana described above there is no other text change, no extra letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: Edit the sign at the top-right of the crop. Inside x=1296 to 1536, y=204 to 552 (1536x1024 frame) the two green katakana letters after the first letter ノ are repainted as ゾ and ク, in the identical hand-painted thick green style, on the same white circle. The visible word becomes ノゾク. Do not change the letter ノ, the circle, the orange-red board, or the frame; no other letters are added anywhere. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Apart from the three katakana described above there is no other text change, no extra letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: The orange-red sign at the upper right has the same layout and the same green brush lettering, but its wording is different: the letters after the first one are now ゾク instead of スタ, giving ノゾク, painted in the same style and cut off by the frame edge in the same way. Only the area x=1296 to 1536, y=204 to 552 (1536x1024 frame) changes. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Apart from the three katakana described above there is no other text change, no extra letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 緑の筆文字の字形が変わる面（約 44x58）で、白い円地に濃い緑の線が入れ替わるので差分は大きい（最大差分は 100 以上の見込み）。差分25以上の画素は字画の入れ替え分で 300 画素前後と見る。文字の読み分けは暗い画面端で難しいので、check-visibility を必ず通す。
- **台帳登録案**:
  ```yaml
  - id: 'AR-02-signboard-text-peek'
    candidate_id: 'AR-02-signboard-text-peek'
    camera_id: 'CAM02'
    element_id: 'CAM02-E06'
    base_photo: 'public/images/cam2.webp'
    category: 'object'
    anomaly_type: 'text_change'
    location: 'CAM02-E06 の差分左上 (636,34) 付近（貼り込み後に再計測）'
    detail: '右上の橙色の吊り看板の文字が「ノスタ」から別の文字に変わる。'
    overlay: 'assets/anomaly-overlays/cam02/signboard-text-peek.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-02-smoke（box 距離 31px。同じ右上の壁面だが煙は看板より下）。看板は大きな円と地色が元のままなので、AR-01-sign-old-shop（別カメラ）のような絵柄の変化とは見え方が別。'
  ```
- **相互参照 / 重複精査**: CR-02-23（COFFEE 看板の下段のカタカナ一文字の左右反転）・CR-SH-02（COFFEE 看板の文字が昔の喫茶店の名前に戻る）とは、対象の看板が別（こちらは右上の橙の看板 E06）。CR-02-01（COFFEE の一文字消し）とも別。台帳に E06 の異変は無い。
- **同カメラ内の排他と併存**: 併存可=ほぼすべて。AR-02-smoke とは box が離れているが、煙が出ているとき文字の変化は見えにくい（排他ではないが推奨しない）。

### AR-02-pillar-wax-melt — 柱の左の白い面の下半分が、蝋のように溶けて垂れ落ちる

- **カメラ**: CAM02（`cam2.webp`、676x900）／対象要素: CAM02-E10
- **型 / カテゴリ / フェーズ / 目立ち度**: surreal / surreal / late / medium
- **物**: 中央の白灰色の角柱の左の面の下半分から根元（約 x=272〜318, y=306〜346）。柱の足元には黒い幅木が走る。
- **変化**: 柱の白い面の下半分がとろけて、蝋のように下へ縦に垂れ落ち、根元の幅木の上に白い溜まりを作る（垂れの筋は 4〜5 本、長さ約 40 px）。溶けた跡の面は一段暗い灰色のコンクリートが露出する。壁・床の傷みでなく『物理が壊れる』変化（柱が液体のように流れる）。
- **box (x1,y1,x2,y2)**: (272,308,318,344)（46x36）
- **最寄り既存 overlay と実測距離**: AR-02-chalk-hopscotch (30.0)、次点 AR-02-bw-television (30.0)。
- **6倍クロップ範囲**: 6倍クロップ (167,241)–(423,412)（256x171）。box は窓内で (630,402)–(906,618)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: On the pale-grey square pillar at the centre of the crop, the lower part of its left face (about x=630 to 906, y=402 to 618 in the 1536x1024 frame, down to the black skirting board at its base) melts like candle wax: the white surface droops in four or five long vertical drips, each about 240 px long on screen, and a soft white puddle pools on top of the black base moulding. Where the surface has melted away a darker grey bare concrete layer shows through. Keep the pillar's right face, the pillar's top, the floor and all other objects unchanged. No text, no extra objects. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: Edit only the lower left face of the central pillar, inside x=630 to 906, y=402 to 618 (1536x1024 frame): the pale plaster sags and drips downward like melted wax, long drips ending in a rounded blob resting on the black skirting at the foot. The rest of the pillar, the floor and the corridor are untouched. The drips have the same cold grey-white colour as the pillar and a faint wet highlight. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: The base of the pale pillar at the centre is melting: in the area x=630 to 906, y=402 to 618 (1536x1024 frame) the white painted surface runs down in thick wax-like streaks over the dark baseboard, leaving a darker grey mark above. Everything else, including the right face of the pillar and the floor, remains exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 柱の白い面に暗い灰色の露出面と垂れが入るので、境の差分は 40 を超える見込み。平均差分は小さめで、差分25以上の画素は 400 画素規模。垂れの本数と暗い露出面を強めに指示し、check-visibility を必ず通す（通らなければ露出面を広く暗くする）。
- **台帳登録案**:
  ```yaml
  - id: 'AR-02-pillar-wax-melt'
    candidate_id: 'AR-02-pillar-wax-melt'
    camera_id: 'CAM02'
    element_id: 'CAM02-E10'
    base_photo: 'public/images/cam2.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM02-E10 の差分左上 (272,308) 付近（貼り込み後に再計測）'
    detail: '柱の左の白い面の下半分が、蝋のように溶けて垂れ落ちる。'
    overlay: 'assets/anomaly-overlays/cam02/pillar-wax-melt.webp'
    # phase / 目立ち度: late / medium
    note: '最寄り既存 overlay は AR-02-chalk-hopscotch（box 距離 30px）と AR-02-bw-television（30px）。AR-02-floor-footprints（床一面・大面積）と box は重ならないが、溜まりは幅木の上に収め、床の面に出さない。'
  ```
- **相互参照 / 重複精査**: AR-04-ceiling-corner-fold（別カメラ・天井板の角が垂れる）・AR-01-ceiling-wet-stain（別カメラ・天井の染み）とは対象も見え方も別。AR-02-pillar-sign-gone・AR-02-pillar-notice は柱の看板・紙で別。CR-02-06（黒板の影が壁に伸びる）・CR-02-09（柱がもう一つ続く）は別の物理崩壊。柱の壁面が溶ける案は他に無い。
- **同カメラ内の排他と併存**: 併存可=天井・右壁・左シャッター・床の小さな異変。

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

取り下げた案 AR-03-floor-line-break（30px 規則違反と視認性ぎりぎりで取り下げ。dark-tile と矩形が重なった。再挑戦用に残す）と、anomaly_type の偏りを直すために足した薄い型の案 4 件（add_person / displace 2 / multiply。2026-11-05）。4 件は台帳に1件も登録していない未制作。

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

### AR-03-crouching-figure — 右の床の白い反射のそばに、白い服の人がしゃがみ込んでいる

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16（床。隣の E17 は右床の白い反射）
- **型 / カテゴリ / フェーズ / 目立ち度**: add_person / person / late / obvious
- **物と変化**: 通路の右寄りの床、白い反射の左隣に、薄い灰白色の長い上着の人が、こちらに背を向けてしゃがみ込み、顔を膝に埋めている。顔は見えない（後頭部と背中だけ）。ほかの足元の異変と違い、監視カメラの画面の中に『動かない人』が一人いる。床の反射と目地は人の足元で自然につながる。
- **box (x1,y1,x2,y2)**: (535,445,645,585)（110x140）
- **最寄り既存 overlay と実測距離**: AR-03-kerosene-heater (35.0)、次点 AR-03-sake-bottle (40.0)。いずれも 30px 以上。
- **6倍クロップ範囲**: 6倍クロップ (420,430)–(676,601)（256x171）。box は窓内で (690,90)–(1350,930)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the area x=690 to 1350, y=90 to 930 on the right floor, left of the long white vertical reflection. Add one person crouching on the floor with their back to the camera, hugging their knees with the head bowed so no face is visible: a long pale grey-white coat, dark hair at the back of the head, about 660 px wide and 840 px tall in this frame, standing on the same floor with a soft contact shadow and the same cold light falling on the coat. The tile joints and the white reflection continue naturally around the person. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the open floor at about x=700 to 1340, y=100 to 920 (right of centre, beside the white light streak). One adult sits hunched on the floor facing away from the camera, knees up, head down, wearing a loose pale grey-white coat that touches the floor; only the back, the dark hair and the shoulders are seen. Natural scale for this position in the corridor. Floor speckles, joints and reflection stay as they are around the figure. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: a single lonely figure in the floor area x=690 to 1350, y=90 to 930: a person in a pale hooded long coat squatting with their back turned to the camera, forehead resting on their arms on their knees, completely motionless. No face, no hands visible, no second person. The floor reflection and tile joints stay exactly as they are except where the body hides them. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-crouching-figure'
    candidate_id: 'AR-03-crouching-figure'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: '右寄りの床、差分左上 (535,445) 付近（貼り込み後に再計測）'
    detail: '右寄りの床の白い反射の脇に、白っぽい長い上着の人が背を向けてしゃがみ込んでいる。'
    overlay: 'assets/anomaly-overlays/cam03/crouching-figure.webp'
    # phase / 目立ち度: late / obvious
    note: '最寄り既存 overlay は AR-03-kerosene-heater（box 距離 35px）。大面積 AR-03-floor-shadows（人の影の13本）・AR-03-floor-tatami と同じ右の床の面なので排他（同プレイで共存させない）。報告カテゴリ person。'
  ```
- **視認性の見立て**: 高さ約140px の人物が明るい床の反射の横に立つので、面積・コントラストとも下限を余裕で超える見立て（本制作時に check-visibility を通す）。
- **相互参照 / 重複精査**: AR-03-floor-shadows（人の影のみ・本人は写らない）、AR-03-shutter-fingers（シャッターの指）とは、『本人が写る』点・位置・見え方が別。CR-02-10（別カメラの床の反射に足だけ）、CR-01-06（別カメラの開口の小さな人影）とも別。台帳に床の人物の実体を足す異変は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-floor-shadows / AR-03-floor-tatami（同じ床の面）。併存可=壁・天井・シャッター・看板の異変。

### AR-03-tile-shifted — 床のタイル一枚だけが横にずれ、継ぎ目に黒い隙間ができる

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16（床）
- **型 / カテゴリ / フェーズ / 目立ち度**: displace / environment / mid / medium
- **物と変化**: 手前左寄りの床の大きなタイル一枚（目地に囲まれた約150px四方）が、右へ数センチずれて、元の位置との間に細い黒い隙間（約8px）が開き、反対側の目地は重なってタイルの端が少し隣へ乗り上げる。タイルの色・斑点は同じ。『同じ物が少し違う位置にある』変化で、色や柄は変わらない（タイルの色・斜め目地の異変とは別）。
- **box (x1,y1,x2,y2)**: (200,790,350,890)（150x100）
- **最寄り既存 overlay と実測距離**: AR-03-tricycle (41.0)、次点 AR-03-blue-floor-tile (43.0)。
- **6倍クロップ範囲**: 6倍クロップ (147,729)–(403,900)（256x171）。box は窓内で (318,366)–(1218,966)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the large floor tile in the lower-left of the frame that fills about x=318 to 1218, y=366 to 966. The whole tile has slid sideways to the right by about 50 px: along its left edge a thin black gap about 48 px wide has opened between it and the neighbouring tile, and its right edge slightly overlaps onto the next tile. The tile keeps exactly the same colour, speckles and reflection. Nothing else changes. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: one floor tile in the area x=318 to 1218, y=366 to 966 is misaligned: it has been pushed to the right, leaving a dark narrow crack on its left side and riding up over the joint on its right side. Same grey speckled stone, same light. All other tiles, joints and reflections stay exactly the same. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the single big floor tile at x=318 to 1218, y=366 to 966 is shifted out of line with its neighbours by about one hand width, so that the joint lines no longer match up along the edge, with a visible black gap on one side. No colour change, no pattern change, no hole, no new object. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-tile-shifted'
    candidate_id: 'AR-03-tile-shifted'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'environment'
    anomaly_type: 'displace'
    location: '手前左寄りの床、差分左上 (200,790) 付近（貼り込み後に再計測）'
    detail: '床のタイル一枚が右へずれ、継ぎ目に黒い隙間ができる。'
    overlay: 'assets/anomaly-overlays/cam03/tile-shifted.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-03-tricycle（box 距離 41px）。大面積 AR-03-floor-tatami とは同じ床の面なので排他。'
  ```
- **視認性の見立て**: 隙間の黒い線が太さ約8px・長さ約100px で面積は小さめ。check-visibility を必ず通す（通らなければ隙間を広げ、乗り上げる側の影を濃くする）。
- **相互参照 / 重複精査**: 床の穴・沈み（AR-03-sunken-opening-floor）、斜め目地（AR-03-tile-diagonal）、タイルの色（AR-03-blue-floor-tile / AR-03-dark-tile）、取り下げ案 AR-03-floor-line-break（目地が消える）とは別で、『タイルが位置ごとずれる』だけ。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-floor-tatami（床の面を使う大面積）。併存可=壁・天井・シャッター・看板の異変。

### AR-03-slat-pulled-out — 左シャッターの横板一枚だけが、手前へ引き出されて浮いている

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E06（左のシャッター）
- **型 / カテゴリ / フェーズ / 目立ち度**: displace / environment / early / medium
- **物と変化**: 左の大きなシャッターの上のほうで、横板の一枚だけが、周りの板より手前へ約3cm引き出されて見える（上縁に明るい光の縁、下に濃い影の線が出る）。板の位置が奥行方向へずれた『同じ板の不自然な位置』。波形のシャッター異変（AR-03-shutter-wave）と違い、板は平らなまま段差だけがつく。
- **box (x1,y1,x2,y2)**: (20,150,230,200)（210x50）
- **最寄り既存 overlay と実測距離**: AR-03-shutter-wave (34.0)、次点 AR-03-striped-sign (45.0)。
- **6倍クロップ範囲**: 6倍クロップ (0,90)–(256,261)（256x171）。box は窓内で (120,360)–(1380,660)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the closed grey roll-up shutter in the upper-left: exactly one horizontal slat in the area x=120 to 1380, y=360 to 660 is pulled out toward the camera by a few centimetres, so that it sits proud of its neighbours: a bright thin highlight along its upper edge and a dark shadow line beneath it, along the whole length of that slat. The slat stays perfectly straight and the same grey colour. All other slats are unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: one single slat of the shutter, in the area x=130 to 1370, y=370 to 650, is displaced forward out of the shutter plane, casting a distinct dark shadow line on the slat below and catching a light edge on top. It is flat and straight, not wavy. Every other slat, dent and stain stays exactly as is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the left roll-up shutter has one slat (the one running across x=120 to 1380, y=360 to 660 in this crop) sticking out from the wall of slats, like a drawer pulled out a few centimetres, with a clear shadow underneath. No colour change, no wave, no hole. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-slat-pulled-out'
    candidate_id: 'AR-03-slat-pulled-out'
    camera_id: 'CAM03'
    element_id: 'CAM03-E06'
    base_photo: 'public/images/cam3.webp'
    category: 'environment'
    anomaly_type: 'displace'
    location: '左のシャッターの上寄り、差分左上 (20,150) 付近（貼り込み後に再計測）'
    detail: '左のシャッターの横板一枚だけが手前へ引き出されて浮き、影の線がつく。'
    overlay: 'assets/anomaly-overlays/cam03/slat-pulled-out.webp'
    # phase / 目立ち度: early / medium
    note: '最寄り既存 overlay は AR-03-shutter-wave（box 距離 34px）。大面積 AR-03-shutter-blank-papers とはシャッターの同じ面なので排他。'
  ```
- **視認性の見立て**: 約210x50px の帯状で、明るい縁と暗い影線が出れば最大差分は足りる見立て。check-visibility を必ず通す。
- **相互参照 / 重複精査**: AR-03-shutter-wave（板が波形）、CR-03-36（板が短くなる）、CR-03-03（板の間隔が倍）とは、『奥行方向に引き出される』点が別。CR-02-04（別カメラ・別シャッターの板が浮く）とは別カメラ。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-shutter-blank-papers（同じシャッター面）。併存可=床・天井・看板の異変。

### AR-03-shutter-dents-many — 左シャッターの下のほうの小さな凹みが、数個から十数個に増える

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E06（左のシャッター）
- **型 / カテゴリ / フェーズ / 目立ち度**: multiply / object / mid / medium
- **物と変化**: 左シャッターの下のほう（床に近い側）に、握りこぶし大の細長い凹みが、もとは数か所しか無いのに、十数個、不揃いに散らばる。凹みはすべて同じ形・同じ向き（横板に沿った細い楕円）で、増えた数だけが不気味。新しい物を足す add_object や同じ物の複製 duplicate とは違い、『もとの傷の数』が増える multiply。
- **box (x1,y1,x2,y2)**: (0,440,62,590)（62x150）
- **最寄り既存 overlay と実測距離**: AR-03-shutter-fingers (33.0)、次点 AR-03-paper-bag (41.0)。
- **6倍クロップ範囲**: 6倍クロップ (0,430)–(256,601)（256x171）。box は窓内で (0,60)–(372,960)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the lower-left part of the closed grey roll-up shutter at x=0 to 372, y=60 to 960. Add about fourteen small horizontal oval dents, each about 40 px long and 18 px tall, scattered irregularly across the slats there, each with a light edge on top and a dark shadow beneath, all with the same shape and the same orientation along the slats. The shutter colour, slats and existing scratches stay as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: many small identical dents appear on the shutter slats in the area x=0 to 372, y=60 to 960: around twelve to sixteen of them, like knuckle-sized bumps pressed from inside, all oval, all aligned with the slat direction, evenly dark in the centre. No other change to the shutter. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the shutter in the area x=0 to 372, y=60 to 960 is dotted with a crowd of identical small oval dents (about fifteen), as if something has been pushing from the inside over and over. Same grey metal, same lighting, no colour change, no hole, no text. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-shutter-dents-many'
    candidate_id: 'AR-03-shutter-dents-many'
    camera_id: 'CAM03'
    element_id: 'CAM03-E06'
    base_photo: 'public/images/cam3.webp'
    category: 'object'
    anomaly_type: 'multiply'
    location: '左シャッターの下寄り、差分左上 (0,440) 付近（貼り込み後に再計測）'
    detail: '左シャッターの下のほうに、同じ形の小さな凹みが十数個に増える。'
    overlay: 'assets/anomaly-overlays/cam03/shutter-dents-many.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-03-shutter-fingers（box 距離 33px）。大面積 AR-03-shutter-blank-papers（シャッターの同じ面）・AR-03-floor-tatami（box が畳の上端と重なる）とは排他。'
  ```
- **視認性の見立て**: 凹み1個は小さいが、十数個の合計面積と影の差で下限を満たす見立て。check-visibility を必ず通す（通らなければ凹みを大きく・数を増やす）。
- **相互参照 / 重複精査**: AR-03-shutter-fingers（隙間から覗く白い指）・AR-03-shutter-wave（板が波形）とは別で、『傷・凹みの数が増える』だけ。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-shutter-blank-papers（同じシャッター面）/ AR-03-floor-tatami（box が床の畳の上端と重なる。大面積）。併存可=天井・看板の異変。

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

台帳で薄い型（remove_object・add_creature・surreal・add_person）を補うための制作仕様。画像は未制作。制作・登録済みにした案はこの節から撤去する。

### AR-04-ceiling-dome-gone — 天井の黒い小型ドーム器具が一つ消える

- **カメラ**: CAM04（`cam4.webp`、676x900）／対象要素: CAM04-E06
- **物と変化**: 中央左の天井にある小さな黒いドーム状の器具（x≈337,y≈162。半球で、黒く光る）。中央左の天井に付いている小さな黒いドーム状の器具が一つ、跡形もなく消え、天井板は元から何も付いていなかったように続く。取り付け跡・ビス穴・影も残さない（跡が自然に埋まる）。すぐ下の小さな煙感知器状の器具と奥の黒い器具は元のまま。
- **box (x1,y1,x2,y2)**: (324,150,350,174)（26x24）
- **最寄り既存 overlay と実測距離**: AR-04-ceiling-corner-fold (39.6)、次点 AR-04-sign-hollow (45.6)。
- **6倍クロップ範囲**: 6倍クロップ (209,77)–(465,248)（256x171）。box は窓内で (690,438)–(846,582)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: the small black dome-shaped fixture hanging from the ceiling at about x=768, y=510 (a dark glossy half-sphere about 80 px wide) is gone. In its place the pale speckled ceiling board continues with the same fine speckle texture and the same soft grey shading, with no hole, no screw marks, no outline and no shadow. The edit area is about x=690 to 846, y=438 to 582. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: remove the small black dome fixture on the ceiling at about x=768, y=510 and fill the area by continuing the surrounding ceiling surface: same off-white speckled board, same gentle gradient, as if nothing had ever been mounted there. Do not leave a ghost, ring or stain. The two other small fixtures further down stay. The edit area is about x=690 to 846, y=438 to 582. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: erase the glossy black dome (a half-sphere ceiling camera-like fixture) at about x=768, y=510. The ceiling there is plain continuous speckled board, same brightness as its surroundings. Nothing replaces it. The edit area is about x=690 to 846, y=438 to 582. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 黒い半球（約14x12 px）が明るい天井に溶けるので差分は大きい（最大差分は40を大きく超える見込み）。面積は約100〜170画素で、25%条項もあり通る見込み。check-visibility で確認し、通らなければ box を周囲の天井へ少し広げて天井の陰影を揃える。
- **台帳登録案**:
  ```yaml
  - id: 'AR-04-ceiling-dome-gone'
    candidate_id: 'AR-04-ceiling-dome-gone'
    camera_id: 'CAM04'
    element_id: 'CAM04-E06'
    base_photo: 'public/images/cam4.webp'
    category: 'object'
    anomaly_type: 'remove_object'
    location: 'CAM04-E06、差分左上 (324,150) 付近（貼り込み後に再計測）'
    detail: '中央左の天井の小さな黒いドーム状の器具が一つ消え、天井板が何事もなかったように続く。'
    overlay: 'assets/anomaly-overlays/cam04/ceiling-dome-gone.webp'
    # phase / 目立ち度: early / subtle
    note: '小物。最近傍 AR-04-ceiling-corner-fold（39.6px）。小さな煙感知器状の器具（x≈343,y≈197）と別の黒い器具は元のまま残す（消すのはドームだけ）。差分の縁は天井の粒状感になじませる。'
  ```
- **相互参照 / 重複精査**: AR-08-vent-paper-plug（ドームを紙で塞ぐ・add_object・CAM08）は『足す』、AR-07-exit-sign-gone は『跡が残る』で別。本案は物が跡なく消えるだけ。CR-04-03（天井の短い器具が傾く）・AR-04-ceiling-corner-fold（天井板の角が垂れる）とは対象も見え方も別。
- **同カメラ内の排他と併存**: 併存可=床・壁・扉・看板の異変。同じ天井面の AR-04-ceiling-corner-fold とは近いので連続して出さない運用が望ましい（box は重ならない）。

### AR-04-rat-left-floor — 左の床際を、黒っぽいネズミが一匹横切る

- **カメラ**: CAM04（`cam4.webp`、676x900）／対象要素: CAM04-E15
- **物と変化**: 左手前の明るい床タイル（x≈125–195, y≈566–600）。左手前の明るい床の上を、灰黒色の大きなネズミが一匹、壁際へ向かって小走りに横切る（横向き、尾は弧を描く）。足元に薄い接地影。
- **box (x1,y1,x2,y2)**: (125,566,195,600)（70x34）
- **最寄り既存 overlay と実測距離**: AR-04-hatch-reflection-extra (33.0)、AR-04-orange-tile (32.0)。
- **6倍クロップ範囲**: 6倍クロップ (32,495)–(288,666)（256x171）。box は窓内で (558,426)–(978,630)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: on the pale grey polished floor tiles at about x=558 to 978, y=426 to 630, one dark grey-black rat is scurrying across the floor in side view, body about 320 px long in this frame, nose pointing left towards the glass wall, tail curled in an S, tiny pink feet, a soft thin contact shadow and a faint blur of motion. Lit by the same cool ceiling light. No other change. The edit area is about x=558 to 978, y=426 to 630. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: add a single large grey-brown rat on the left-front floor tiles (x=558 to 978, y=426 to 630), seen from the side, mid-stride, body about 300 px long, whiskers visible, glossy dark fur reflecting a little of the ceiling lights, natural contact shadow. Nothing else is added or altered. The edit area is about x=558 to 978, y=426 to 630. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: one dark rat stands on the floor near the left glass wall at x=558 to 978, y=426 to 630, its body slightly raised, head turned toward the camera, tail extended behind it along a floor tile joint, with a short shadow. Colour grading and grain match the surrounding tiles. The edit area is about x=558 to 978, y=426 to 630. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 明るい床に濃い灰黒のネズミは差分が大きい（体長約50x25 px）。通る見込み。毛の暗さで下限を満たす。
- **台帳登録案**:
  ```yaml
  - id: 'AR-04-rat-left-floor'
    candidate_id: 'AR-04-rat-left-floor'
    camera_id: 'CAM04'
    element_id: 'CAM04-E15'
    base_photo: 'public/images/cam4.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM04-E15、差分左上 (125,566) 付近（貼り込み後に再計測）'
    detail: '左手前の明るい床の上を、黒っぽいネズミが一匹横切っている。'
    overlay: 'assets/anomaly-overlays/cam04/rat-left-floor.webp'
    # phase / 目立ち度: mid / medium
    note: '小物。最近傍 AR-04-orange-tile（32.0px）・AR-04-hatch-reflection-extra（33.0px）。左の大面積 AR-04-glass-fog-handprints と box が重なる（大面積の例外・排他）。小動物の分類は猫と同じく object に仮分類（README）。'
  ```
- **相互参照 / 重複精査**: AR-04-left-edge-eyes（暗がりの目だけ・surreal）は『正体を見せない』、本案は『はっきり見える小動物』で別。AR-01-threshold-pigeon（鳩・CAM01）・AR-02-leather-footprints とは種も場所も別。CR-04-23（扉の前に猫）・AR-04-puddle とは位置・種が別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-04-glass-fog-handprints（大面積）。併存可=右・天井・奥の異変。

### AR-04-wall-moth — 右の漆喰の壁に、大きな蛾が一匹とまる

- **カメラ**: CAM04（`cam4.webp`、676x900）／対象要素: CAM04-E14
- **物と変化**: 右端の淡いクリーム色の漆喰の壁面（x≈623–674, y≈265–330）。右の漆喰の壁の上部に、翅を平らに広げた大きな暗褐色の蛾が一匹とまる（翅幅は約40 px、翅に淡い目玉模様）。足元に薄い影。
- **box (x1,y1,x2,y2)**: (623,265,674,330)（51x65）
- **最寄り既存 overlay と実測距離**: AR-04-red-lantern (30.0)、AR-04-wall-plaster-peel (34.0)。
- **6倍クロップ範囲**: 6倍クロップ (420,212)–(676,383)（256x171）。box は窓内で (1218,318)–(1524,708)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: on the pale cream speckled plaster wall at the right edge (the area at about x=1218 to 1524, y=318 to 708), one large dark-brown moth is resting with its wings spread flat, wingspan about 250 px in this frame, with pale eye-spot patterns on the wings, a hairy body and feathery antennae, a soft shadow on the plaster. Same cool light as the wall. Nothing else is added. The edit area is about x=1218 to 1524, y=318 to 708. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: add a single big dusky moth with wings spread, perched on the right plaster wall at x=1218 to 1524, y=318 to 708, wing patterning in brown, grey and cream with two faint eye-spots, soft hairy edges, a faint cast shadow. It sits flat against the wall, perspective following the wall. The edit area is about x=1218 to 1524, y=318 to 708. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: a large dark moth clings to the right plaster wall (x=1218 to 1524, y=318 to 708), wings half-open in a V, wingspan about 250 px here, body and antennae clearly visible, matching the low-light grain of the wall. The edit area is about x=1218 to 1524, y=318 to 708. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 淡いクリーム色の壁に暗褐色の大きな蛾（翅幅約40 px）は差分が大きい。通る見込み。
- **台帳登録案**:
  ```yaml
  - id: 'AR-04-wall-moth'
    candidate_id: 'AR-04-wall-moth'
    camera_id: 'CAM04'
    element_id: 'CAM04-E14'
    base_photo: 'public/images/cam4.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM04-E14、差分左上 (623,265) 付近（貼り込み後に再計測）'
    detail: '右の漆喰の壁に、翅を広げた大きな暗褐色の蛾が一匹とまっている。'
    overlay: 'assets/anomaly-overlays/cam04/wall-moth.webp'
    # phase / 目立ち度: early / medium
    note: '小物。最近傍 AR-04-red-lantern（30.0px）・AR-04-wall-plaster-peel（34.0px）。右壁の大面積 AR-04-window-alley と box が重なる（大面積の例外・排他）。小動物は object に仮分類（README）。'
  ```
- **相互参照 / 重複精査**: AR-04-left-edge-eyes・AR-01-threshold-pigeon とは種も場所も別。AR-04-wall-plaster-peel（壁の剥落・state_change）・AR-04-tote-bag（壁のフック）とは別の物。台帳に虫の異変は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-04-window-alley（大面積）。併存可=左・床・天井の異変。

### AR-04-wall-small-door — 右の漆喰の壁に、子供ほどの背丈の小さな扉が現れる

- **カメラ**: CAM04（`cam4.webp`、676x900）／対象要素: CAM04-E14
- **物と変化**: 右端の下部の漆喰の壁面（x≈622–674, y≈598–738。壁と床の境の巾木の線の上）。右の壁の下部に、周りの壁と同じクリーム色に塗られた小さな木の扉（高さ約100 px、通常の扉の半分ほど）が、壁に埋め込まれて現れる。細い暗い枠、丸い真鍮のノブ。下辺は巾木の線に沿う。空間の寸法が崩れた異変。
- **box (x1,y1,x2,y2)**: (622,598,674,738)（52x140）
- **最寄り既存 overlay と実測距離**: AR-04-thermos (47.0)、AR-04-tote-bag (49.0)。
- **6倍クロップ範囲**: 6倍クロップ (420,583)–(676,754)（256x171）。box は窓内で (1212,90)–(1524,930)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: in the lower right plaster wall (the area at about x=1212 to 1524, y=90 to 930), a small closed wooden door appears set flush into the wall: about 270 px wide and 800 px tall in this frame, painted the same cream colour as the wall, with a thin dark frame, a small round brass knob on the left side and its bottom edge following the skirting line (slanted by the corridor's perspective). The wall's plaster texture, the dark pillar to its left and the floor stay. The edit area is about x=1212 to 1524, y=90 to 930. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: add a half-height door to the right wall at x=1212 to 1524, y=90 to 930: cream-painted wood, narrow dark frame, a small round brass doorknob, flat panels, closed, perspective-matched to the receding wall, with a thin shadow line around the frame. Nothing else changes. The edit area is about x=1212 to 1524, y=90 to 930. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: a small child-sized door has appeared in the lower part of the right plaster wall (x=1212 to 1524, y=90 to 930): cream wooden door in a dark thin frame with a round brass knob, standing closed on the skirting line. The plaster around it is unchanged. The edit area is about x=1212 to 1524, y=90 to 930. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: クリーム色の壁に暗い枠と真鍮ノブの輪郭で差が出る。大きさは約50x140 px と十分。通る見込み。check-visibility で確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-04-wall-small-door'
    candidate_id: 'AR-04-wall-small-door'
    camera_id: 'CAM04'
    element_id: 'CAM04-E14'
    base_photo: 'public/images/cam4.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM04-E14、差分左上 (622,598) 付近（貼り込み後に再計測）'
    detail: '右の漆喰の壁の下部に、周りと同じ色の小さな木の扉（真鍮のノブ付き）が現れる。'
    overlay: 'assets/anomaly-overlays/cam04/wall-small-door.webp'
    # phase / 目立ち度: late / obvious
    note: '中型。最近傍 AR-04-thermos（47.0px）・AR-04-tote-bag（49.0px）。右壁の大面積 AR-04-window-alley と box が重なる（大面積の例外・排他）。扉に文字・マークなし。'
  ```
- **相互参照 / 重複精査**: AR-07-mini-door（奥の金属扉の4分の1の複製が床に自立・duplicate・CAM07）とは別カメラ・別の見え方（壁に埋まる実用サイズの小扉 vs 床に立つ複製）。CR-04-12（奥の両開き扉が壁になる）・AR-04-door-gap とは別の扉。AR-04-window-alley（壁が窓になる）とは同じ壁で排他。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-04-window-alley（大面積）。併存可=左・天井・奥の異変。

### AR-04-floor-reaching-hand — 手前の床の下端から、白い手が一本伸びる

- **カメラ**: CAM04（`cam4.webp`、676x900）／対象要素: CAM04-E15
- **物と変化**: 前景の暗い灰色の床タイル（x≈400–525, y≈820–898。画面の下端）。画面の下端の床に、カメラの下から伸びてきたような青白い手と前腕が一本、掌を下に床へついて現れる。指は奥の通路へ向かって少し開き、手首から先は画面の外へ消える。持ち主の体は写らない。
- **box (x1,y1,x2,y2)**: (400,820,525,898)（125x78）
- **最寄り既存 overlay と実測距離**: AR-04-hatch-frame-round (32.0)、AR-04-puddle (33.0)。
- **6倍クロップ範囲**: 6倍クロップ (334,729)–(590,900)（256x171）。box は窓内で (396,546)–(1146,1014)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: at the bottom edge of the dark grey polished floor (the area at about x=396 to 1146, y=546 to 1014), a pale bluish-white human hand and forearm reach in from the bottom edge of the frame, palm pressed flat on the floor tile, the fingers slightly spread and pointing up the corridor, the forearm about 450 px long in this frame disappearing off the bottom of the frame, with a soft contact shadow and a faint reflection on the polished tile. No other part of the person is visible. The edit area is about x=396 to 1146, y=546 to 1014. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: add a single pale human hand and bare forearm at the very bottom of the frame, reaching along the floor away from the camera (x=396 to 1146, y=546 to 1014): skin cold bluish white in the cool light, fingers curled a little, a slender wrist, slightly translucent glow from the ceiling lights, mirrored faintly in the polished floor. Cut off by the bottom frame edge. The edit area is about x=396 to 1146, y=546 to 1014. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: a bare arm crawls into the bottom of the frame from below the camera: the hand is flat on the floor at about x=700 to 1000, y=700 to 900, fingers pointing toward the far end of the corridor, the forearm trailing off the lower edge, with a faint reflection on the tiles. The skin is pale with a blue-grey cast to match the grading. The edit area is about x=396 to 1146, y=546 to 1014. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 暗い床に青白い手と前腕は差分が大きい（約60x40 px）。通る見込み。肌色の暗さで下限を満たす。
- **台帳登録案**:
  ```yaml
  - id: 'AR-04-floor-reaching-hand'
    candidate_id: 'AR-04-floor-reaching-hand'
    camera_id: 'CAM04'
    element_id: 'CAM04-E15'
    base_photo: 'public/images/cam4.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM04-E15、差分左上 (400,820) 付近（貼り込み後に再計測）'
    detail: '手前の床の下端から、青白い手と前腕が一本伸びて床についている。'
    overlay: 'assets/anomaly-overlays/cam04/floor-reaching-hand.webp'
    # phase / 目立ち度: late / obvious
    note: '中型。最近傍 AR-04-hatch-frame-round（32.0px）・AR-04-puddle（33.0px）。手前〜中景の大面積 AR-04-floor-shoes-rows と box が重なる（大面積の例外・排他）。持ち主の体・顔は写さない。'
  ```
- **相互参照 / 重複精査**: AR-04-shadow-behind-camera（カメラの背後の人の影）・AR-04-glass-silhouette（ガラス越しの黒い人影）は『影・人影』、本案は『実体のある手』で別。AR-02-leather-footprints・AR-06-wet-footprints（足跡）とは別。AR-05-door-fingers（扉の隙間の指の影）とは別カメラ・別の見え方。CR-02-10（床反射に足）とは見え方が別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-04-floor-shoes-rows（大面積）/ AR-04-shadow-behind-camera（同じ床の下端）。併存可=左・右・天井の異変。

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

型の偏り（台帳の remove_object・add_creature が少ない）を直すための案 2 件。画像は未制作。台帳には未登録。書式は CAM 03 の見本に揃える。

### AR-05-shelf-items-gone — 左奥通路の店先のガラス棚から、白い小物が全部消える

- **カメラ**: CAM05（`cam5.webp`、676x900）／対象要素: CAM05-E06
- **型 / カテゴリ / フェーズ / 目立ち度**: `remove_object` / object / early / subtle
- **物と変化**: 左奥通路の店先に縦長のガラス棚があり、三段それぞれの棚板に白っぽい小物（陶器の置物のような塊が数個ずつ。何かは判別できない）が並んでいる。三段とも小物がすべて消え、棚板と奥の暗い背板だけが残る。消えた跡は背板と棚板の自然な続きで埋まり、白抜けや跡は残らない。
- **box (x1,y1,x2,y2)**: (58,234,80,300)（22x66）
- **最寄り既存 overlay と実測距離**: AR-05-stand-tag (30.5)、AR-05-aisle-silhouette (36.0)、AR-05-morning-glory-wall (38.0・大面積)。30px 規則すれすれなので、確定時に alpha bbox で再計測する。
- **6倍クロップ範囲**: 6倍クロップ (0,184)–(256,355)（256x171）。box は窓内で (348,300)–(480,696)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed underground shopping arcade corner (a closed glass-fronted shop block wrapped in grey vertical curtains with a red-brown brick base, large grey square floor tiles, a narrow side aisle on the left with small closed shops, white recessed ceiling lights and a long fluorescent tube). Edit only this: the narrow tall glass display cabinet in the middle of the frame (marked area about x=348 to 480, y=300 to 696) has three shelves, and on each shelf a few small whitish ornaments stand. Remove every one of these ornaments: all three shelves become empty, showing only the shelf boards and the dark back panel, filled in naturally with the same dark tone and the same soft reflection on the glass. The cabinet frame, the glass, the beige panels beside it and everything else stay exactly as they are. Add nothing. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text other than what is specified, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed underground shopping arcade corner (a closed glass-fronted shop block wrapped in grey vertical curtains with a red-brown brick base, large grey square floor tiles, a narrow side aisle on the left with small closed shops, white recessed ceiling lights and a long fluorescent tube). Edit only this: in the marked area (about x=348 to 480, y=300 to 696) the glass cabinet shows three shelves with small white ornaments. Erase all the ornaments from the top, middle and lower shelves so the shelves are bare: continue the dark back panel and the thin shelf boards through where the ornaments were, with the same grain, reflection and noise. No new object, no gap, no bright patch left behind. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text other than what is specified, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed underground shopping arcade corner (a closed glass-fronted shop block wrapped in grey vertical curtains with a red-brown brick base, large grey square floor tiles, a narrow side aisle on the left with small closed shops, white recessed ceiling lights and a long fluorescent tube). Edit only this: the small white objects standing on the three shelves of the glass cabinet in the marked area (about x=348 to 480, y=300 to 696) vanish completely, leaving clean empty shelves: the shelf boards and the dark wall behind them continue seamlessly. Keep the cabinet, the glass reflections and all neighbouring objects unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text other than what is specified, no logos, no watermark.`
- **視認性の見立て**: 白い小物は暗い背板の上で明暗差が大きく、各数画素角が三段分で面積比は通る見込み。ただし小物が全体で数十画素と小さいので、消した跡が背板と同じ暗さで埋まっていること（差分が白→暗で最大差分40以上）を check-visibility で確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-05-shelf-items-gone'
    candidate_id: 'AR-05-shelf-items-gone'
    camera_id: 'CAM05'
    element_id: 'CAM05-E06'
    base_photo: 'public/images/cam5.webp'
    category: 'object'
    anomaly_type: 'remove_object'
    location: 'CAM05-E06 の左奥通路のガラス棚（差分左上 (58,234) 付近）（貼り込み後に再計測）'
    detail: '左奥の店先のガラス棚の三段に並んでいた白い小物が全部消え、空の棚になる。'
    overlay: 'assets/anomaly-overlays/cam05/shelf-items-gone.webp'
    # phase / 目立ち度: early / subtle
    note: '最寄り既存 overlay は AR-05-stand-tag（box 距離 30.5）。『消す』型は消した面が自然に埋まるか目視を必ず行う。'
  ```
- **相互参照 / 重複精査**: 消える『小物』の異変は台帳に無い（remove_object は AR-05 に未登録）。AR-05-stand-tag（同じ通路のスタンドに札が増える）・赤電話（別カメラ・棚に物が増える）とは対象も方向も逆。
- **同カメラ内の排他と併存**: 併存可=床・天井・ガラス区画の異変。AR-05-stand-tag とは別の物（距離 30.5）。

### AR-05-floor-turtle — 手前の床に、大きな亀が一匹いる

- **カメラ**: CAM05（`cam5.webp`、676x900）／対象要素: CAM05-E13
- **型 / カテゴリ / フェーズ / 目立ち度**: `add_creature` / object / mid / medium
- **物と変化**: 手前中央寄りの暗い床に、甲羅が30〜40cmほどのくすんだオリーブ色の亀が一匹、首をわずかに伸ばして立っている（四肢が短く、顔は左前方を向く）。無人の地下街に迷い込んだ生き物。亀に模様や文字は無く、足元に濃い接地影が落ちる。台帳の生き物（猫・金魚・鳩・ヤモリ・雀）とは種も見え方も別。
- **box (x1,y1,x2,y2)**: (205,670,290,740)（85x70）
- **最寄り既存 overlay と実測距離**: AR-05-pet-bottle (31.0)、AR-05-marbles-scattered (51.0)。大面積の AR-05-floor-white-cranes の範囲内（排他）。
- **6倍クロップ範囲**: 6倍クロップ (119,620)–(375,791)（256x171）。box は窓内で (516,300)–(1026,720)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed underground shopping arcade corner (a closed glass-fronted shop block wrapped in grey vertical curtains with a red-brown brick base, large grey square floor tiles, a narrow side aisle on the left with small closed shops, white recessed ceiling lights and a long fluorescent tube). Edit only this: add one large tortoise on the grey tiled floor inside the marked area (about x=516 to 1026, y=300 to 720 in the 1536x1024 frame): a dull olive-brown domed shell with lighter growth rings, a small head stretched a little forward toward the left, four short stubby legs planted on the floor, shell about 450 pixels wide in this frame. A strong dark contact shadow under it and a faint pale highlight along the top of the shell so it stands out from the floor. It has no pattern, no letters, no marks. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text other than what is specified, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed underground shopping arcade corner (a closed glass-fronted shop block wrapped in grey vertical curtains with a red-brown brick base, large grey square floor tiles, a narrow side aisle on the left with small closed shops, white recessed ceiling lights and a long fluorescent tube). Edit only this: in the marked area (about x=516 to 1026, y=300 to 720) a single plain tortoise stands on the floor tiles, seen from slightly above, shell dark olive with a paler edge, head pointing to the left, short legs, a soft dark shadow around its feet. It straddles no tile joint cleanly: the joints run through under its shell naturally. Add nothing else, keep all other floor, light and reflections unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text other than what is specified, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed underground shopping arcade corner (a closed glass-fronted shop block wrapped in grey vertical curtains with a red-brown brick base, large grey square floor tiles, a narrow side aisle on the left with small closed shops, white recessed ceiling lights and a long fluorescent tube). Edit only this: add a single big tortoise (plain, unmarked, olive-green and brown shell, wrinkled legs, calm) on the floor in the marked area (about x=516 to 1026, y=300 to 720), its body about 500 pixels long in this frame, with a dark contact shadow. Do not add any other animal or object. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text other than what is specified, no logos, no watermark.`
- **視認性の見立て**: 灰色の暗い床に、オリーブ色の甲羅と暗い接地影。大きさ約85x70pxで面積は十分。床の明暗に溶けないよう、甲羅のハイライトと接地影を強める。
- **台帳登録案**:
  ```yaml
  - id: 'AR-05-floor-turtle'
    candidate_id: 'AR-05-floor-turtle'
    camera_id: 'CAM05'
    element_id: 'CAM05-E13'
    base_photo: 'public/images/cam5.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM05-E13 の手前中央寄りの床、差分左上 (205,670) 付近（貼り込み後に再計測）'
    detail: '手前中央寄りの床に、大きな亀が一匹立っている（無地・文字なし）。'
    overlay: 'assets/anomaly-overlays/cam05/floor-turtle.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-05-pet-bottle（box 距離 31.0）。亀の足元が色の濃い接地影を持つこと。報告カテゴリは object（猫・小動物の仮分類に従う）。'
  ```
- **相互参照 / 重複精査**: 生き物の異変は CAM05 に猫（CR-05-25・候補）・金魚（AR-05-aisle-goldfish）。亀は台帳・候補のどのカメラにも無い。床の人影（AR-05-floor-child-shadow）とも別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-05-floor-white-cranes。併存可=壁・天井・ガラス・通路の異変。

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

台帳の型の偏り（add_object・state_change に対し remove_object・multiply・add_creature・add_person が薄い）を直すための未制作の制作仕様 4 件（#47）。画像は未生成で、台帳（`anomalies.yaml`）には未登録。CAM06 は既に 34 件の異変が画面の大半を占め、「約30px以上離す」規則（`prompts/README.md` の「配置の基準」）を満たす空きに収まる範囲で書いた。displace・text_change は、動かせる物・読める文字（看板・メニュー板・掲示・取手・植木鉢）がどれも既存 overlay の box から30px以内のため作れない。登録・制作したら、この節から該当案を撤去する。

### AR-06-door-knob-gone — 右の扉の取手（レバーと小さな掛け金）が消え、扉の面だけが残る

- **カメラ**: CAM06（`cam6.webp`、675x900）／対象要素: CAM06-E15
- **型 / カテゴリ / フェーズ / 目立ち度**: `remove_object` / `object` / `early` / `subtle`
- **物と変化**: 通路右側の暗い茶色の扉の下半分（床から約1/3の高さ）にある、銀色の細い横レバー型の取手とその下の小さな掛け金が、跡も穴もなく消える。扉の面は周りと同じ暗い茶色の木目だけがつながり、取手があった痕跡（ビス穴・色の違い）を残さない。ほかのカメラの「物が消える」異変（看板・花・巻いたシート）と違い、扉に付く金具が消える変化。
- **box (x1,y1,x2,y2)**: (578,468,602,498)（24x30）
- **最寄り既存 overlay と実測距離**: AR-06-wall-height-marks (31.0)、次点 AR-06-wall-stripes (60.9)。大面積の AR-06-wall-puddle と AR-06-wall-same-poster の bbox 内（小物との重なりは基準で許容）。（台帳の `overlay_origin`＋`dimensions` の矩形距離の実測。制作後は最終 overlay の alpha bbox で再測定する）
- **6倍クロップ範囲**: 6倍クロップ (419,400)–(675,571)（256x171）。box は窓内で (954,408)–(1098,588)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (a dark brown door in the centre with a thin silver lever handle and a small latch block below it, rough grey stucco wall on both sides, bright grey floor tiles at the lower left). Edit only this: the small silver horizontal lever handle and the small latch block directly below it, both on the dark brown door in the middle of the marked area (area about x=954 to 1098, y=408 to 588 in the 1536x1024 frame), are gone. The door surface there is plain dark brown wood with the same grain, the same dim reflections and no screw holes, no marks, no colour difference where the fittings were. The door frame, the wall and the floor are unchanged. Add nothing. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (a dark brown door in the centre with a thin silver lever handle and a small latch block below it, rough grey stucco wall on both sides, bright grey floor tiles at the lower left). Edit only this: the metal fittings on the door (the thin silver lever about x=960 to 1090, y=408 to 440 and the small latch block below it at about y=520 to 580) are erased as if the door never had a handle: smooth dark brown door surface continues across the whole marked area (x=954 to 1098, y=408 to 588), keeping the original wood texture and noise. No new object. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (a dark brown door in the centre with a thin silver lever handle and a small latch block below it, rough grey stucco wall on both sides, bright grey floor tiles at the lower left). Edit only this: in the marked area x=954 to 1098, y=408 to 588 the door has no handle and no lock: the lever and the latch under it vanish and the door panel is seamless dark brown, with the same faint highlights along its edge. Do not alter the door frame, the stucco wall, the floor or anything outside the marked area. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 取手は小さく、暗い扉に対する銀色の細い物なので、overlay 面積に対する強変化画素の比が低い。レバー（約18x3）と掛け金（約10x5）で強変化は 100 画素前後と見込む。下限の瀬戸際なので、check-visibility を必ず通す（通らなければ box を取手の周りに絞って面積比を上げるか、取手の影・反射まで含めて消す）。
- **台帳登録案**:
  ```yaml
  - id: 'AR-06-door-knob-gone'
    candidate_id: 'AR-06-door-knob-gone'
    camera_id: 'CAM06'
    element_id: 'CAM06-E15'
    base_photo: 'public/images/cam6.webp'
    category: 'object'
    anomaly_type: 'remove_object'
    location: 'CAM06-E15 の右の扉の下寄り、差分左上 (578,468) 付近（貼り込み後に再計測）'
    detail: '右の扉の取手（銀色のレバーと小さな掛け金）が消え、扉の面だけが残る。'
    overlay: 'assets/anomaly-overlays/cam06/door-knob-gone.webp'
    # phase / 目立ち度: early / subtle
    note: '最寄り既存 overlay は AR-06-wall-height-marks（box 距離 31px）。大面積 AR-06-wall-same-poster・AR-06-wall-puddle と排他。取手が小さいため check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: 同カメラの CR-06-18（取手が扉の反対側へ移る: 候補）とは別で、こちらは物が消える。他カメラ候補（CR-04-22・CR-07-03 の取手移動）とは対象も型も違う。台帳に取手そのものの異変は無い。AR-06-menu-price-old（文字）・AR-06-tilted-notice（掲示の傾き）とは別の物。他カメラの remove_object（AR-02-pillar-sign-gone・AR-03-roll-vanish・AR-07-exit-sign-gone）は看板・巻物で、金具の消失は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-06-wall-same-poster（右壁一面。扉ごと別物に置き換わる）・AR-06-wall-puddle（大面積。box が重なる）。併存可=AR-06-door-gap-light（扉の下の光。取手と別の位置）・AR-06-wall-height-marks・AR-06-wall-gecko。

### AR-06-ceiling-vent-triple — 天井の黒い長方形の換気口と同じ物が、左上の天井にも三つ並ぶ

- **カメラ**: CAM06（`cam6.webp`、675x900）／対象要素: CAM06-E05
- **型 / カテゴリ / フェーズ / 目立ち度**: `multiply` / `environment` / `mid` / `medium`
- **物と変化**: 天井中央の黒い長方形の換気口（元の物はそのまま）と同じ形・同じ黒の格子状の小さな換気口が、左上の何もない天井にも三つ、右上がりの斜めの列で並ぶ（手前ほど大きく、奥ほど小さく、遠近に沿わせる）。元と合わせて4つになる。数が増えるだけで光らず、色も変えない。
- **box (x1,y1,x2,y2)**: (150,4,258,44)（108x40）
- **最寄り既存 overlay と実測距離**: AR-06-lamp-squared (31.0)、次点 AR-06-teru-teru-bozu (32.0)・AR-06-ceiling-balloons (42.0)。大面積 AR-06-ceiling-umbrellas の bbox 内。（台帳の `overlay_origin`＋`dimensions` の矩形距離の実測。制作後は最終 overlay の alpha bbox で再測定する）
- **6倍クロップ範囲**: 6倍クロップ (100,0)–(356,171)（256x171）。box は窓内で (300,24)–(948,264)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (a dark grey rough-concrete ceiling, a round white recessed light at the lower left, the top of a red-orange hanging sign at the bottom edge, and a black skewed rectangular ceiling vent at the far right edge). Edit only this: three more black rectangular ceiling vents appear in the empty ceiling at the upper left of the marked area (area about x=300 to 948, y=24 to 264 in the 1536x1024 frame), each the same flat black skewed rectangle with faint slats as the original vent at the right edge of the image, arranged in a diagonal row that gets a little smaller toward the upper left, following the perspective of the ceiling. The original vent is unchanged. The round light, the sign and the rest of the ceiling stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (a dark grey rough-concrete ceiling, a round white recessed light at the lower left, the top of a red-orange hanging sign at the bottom edge, and a black skewed rectangular ceiling vent at the far right edge). Edit only this: the ceiling has a row of identical black rectangular vents: besides the one at the right edge, three copies of the same black skewed vent sit evenly spaced along a line from about (330,230) to (900,50) in the 1536x1024 frame, each about 190 px wide at the nearest and 120 px wide at the farthest, with the same dark slat texture. Nothing else is added or moved. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (a dark grey rough-concrete ceiling, a round white recessed light at the lower left, the top of a red-orange hanging sign at the bottom edge, and a black skewed rectangular ceiling vent at the far right edge). Edit only this: in the empty rough ceiling at the upper left (area x=300 to 948, y=24 to 264) three small black rectangular ceiling vents of the same kind as the one at the right edge are lined up, each slightly smaller than the one before, parallel to the ceiling edge. Their edges are crisp black with a faint lighter rim, like the original. Keep the round recessed light, the hanging sign, the concrete speckles and everything outside the marked area unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 黒い換気口が灰色の天井に増えるので、黒対灰の差分は大きい（最大差分は 100 を超える見込み）。三つで面積比も十分。標準状態で見える。
- **台帳登録案**:
  ```yaml
  - id: 'AR-06-ceiling-vent-triple'
    candidate_id: 'AR-06-ceiling-vent-triple'
    camera_id: 'CAM06'
    element_id: 'CAM06-E05'
    base_photo: 'public/images/cam6.webp'
    category: 'environment'
    anomaly_type: 'multiply'
    location: 'CAM06-E05 の元の換気口の左上の天井、差分左上 (150,4) 付近（貼り込み後に再計測）'
    detail: '天井の黒い長方形の換気口と同じ物が、左上の天井にも三つ斜めに並び、計4つになる。'
    overlay: 'assets/anomaly-overlays/cam06/ceiling-vent-triple.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-06-lamp-squared（box 距離 31px）。大面積 AR-06-ceiling-umbrellas と排他。AR-06-ceiling-checker は元の換気口の面を使うが、こちらは別の天井位置なので併存可。'
  ```
- **相互参照 / 重複精査**: AR-08-ceiling-light-grid（CAM08、丸い天井灯が天井一面に格子状）とは物（黒い換気口と光る丸灯）も数（3つ増と一面の格子）も違う。AR-07-wall-clocks（時計が無数）・AR-01-right-wall-lattice-doors（戸の連続）は壁の面。CAM06 の天井では AR-06-ceiling-checker（換気口の面の模様変化）が同じ換気口を使うが、あちらは元の換気口の面が市松に変わるだけで、増えない。同カメラの CR-06-04・CR-06-41（光）とも別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-06-ceiling-umbrellas（天井一面。換気口が傘に隠れる）。併存可=AR-06-ceiling-balloons（距離 42px。天井が賑やかになるので同プレイは避けるのが望ましい）・壁・床・看板・右の蛍光灯の異変。

### AR-06-floor-crab — 床のタイルの上に、小さな赤い蟹が一匹歩いている

- **カメラ**: CAM06（`cam6.webp`、675x900）／対象要素: CAM06-E16
- **型 / カテゴリ / フェーズ / 目立ち度**: `add_creature` / `object` / `mid` / `medium`
- **物と変化**: 左の鉢の手前の床の灰色のタイル上に、手のひらに乗る大きさ（画像上で約45x30px）の小さな赤橙色の蟹が一匹いる。甲羅と二本のはさみが見え、通路の奥のほうを向いている。地下街に水気はなく、なぜいるのか分からない、という違和感。
- **box (x1,y1,x2,y2)**: (208,548,258,584)（50x36）
- **最寄り既存 overlay と実測距離**: AR-06-pot-tag (35.0)、次点 AR-06-tile-sky (36.0)・AR-06-floor-light-slant (39.0)。大面積 AR-06-wall-puddle の bbox 内（水たまりの実画素と重なるなら排他）。（台帳の `overlay_origin`＋`dimensions` の矩形距離の実測。制作後は最終 overlay の alpha bbox で再測定する）
- **6倍クロップ範囲**: 6倍クロップ (140,500)–(396,671)（256x171）。box は窓内で (408,288)–(708,504)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled square floor tiles with thin joints, a black round plant pot with a white saucer and pink cloth at the upper left, soft white light reflections on the tiles). Edit only this: one small red-orange crab stands on a grey floor tile in the marked area (area about x=408 to 708, y=288 to 504 in the 1536x1024 frame): a round shell about 200 px wide, two small raised claws, thin legs spread to both sides, facing away from the camera toward the far end of the corridor, with a short soft shadow on the tile. It is the only addition. Tiles, joints, pot and reflections stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled square floor tiles with thin joints, a black round plant pot with a white saucer and pink cloth at the upper left, soft white light reflections on the tiles). Edit only this: a small red crab, hand-sized, is walking on the speckled floor tile inside the area x=408 to 708, y=288 to 504 of the 1536x1024 frame, seen from behind and above, orange-red shell with slightly darker legs, both claws held up, with a faint damp sheen under it. Keep every other pixel region as in the source: pot, saucer, pink cloth, tile joints and reflections unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled square floor tiles with thin joints, a black round plant pot with a white saucer and pink cloth at the upper left, soft white light reflections on the tiles). Edit only this: add exactly one small orange-red crab on the floor tiles in the area x=408 to 708, y=288 to 504 (1536x1024 frame). It sits with its claws slightly raised, the shell lit by the cold corridor light with a small highlight, and its legs casting thin shadows. No water, no puddle, no other creature. Everything else in the image stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 灰色の床に赤橙の蟹は色差が大きく、最大差分は 100 超、面積も 45x30 で下限を超える見込み。標準状態で見える。
- **台帳登録案**:
  ```yaml
  - id: 'AR-06-floor-crab'
    candidate_id: 'AR-06-floor-crab'
    camera_id: 'CAM06'
    element_id: 'CAM06-E16'
    base_photo: 'public/images/cam6.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM06-E16 の左中央の床、鉢の手前、差分左上 (208,548) 付近（貼り込み後に再計測）'
    detail: '左の鉢の手前の床のタイルに、小さな赤橙色の蟹が一匹歩いている。'
    overlay: 'assets/anomaly-overlays/cam06/floor-crab.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-06-pot-tag（box 距離 35px）。大面積 AR-06-wall-puddle と排他（box が重なる）。'
  ```
- **相互参照 / 重複精査**: CAM06 の既存の生き物は壁のヤモリ（AR-06-wall-gecko）のみ。CR-06-26（植物の足元の茶トラ猫）・CR-06-12（葉陰の人形のような生物）とは種も場所も違う。他カメラの猫・鳩・雀・金魚・目（AR-02-cat・AR-03-walking-cat・AR-01-threshold-pigeon・AR-08-pillar-sparrow・AR-05-aisle-goldfish・AR-04-left-edge-eyes）とは種が違う。台帳に蟹は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-06-wall-puddle（大面積。box が重なる）。併存可=AR-06-tile-sky・AR-06-floor-light-slant・AR-06-pot-tag（別の位置）。

### AR-06-feet-at-edge — 画面の下端に、こちらに向かって立つ人の足先が見切れている

- **カメラ**: CAM06（`cam6.webp`、675x900）／対象要素: CAM06-E18
- **型 / カテゴリ / フェーズ / 目立ち度**: `add_person` / `person` / `mid` / `medium`
- **物と変化**: 手前の床の下端（画面の最下部）に、通路の奥を向いて立つ人の足先が見切れている。暗い灰色の裾と、飾りのない黒い革靴のつま先が二つ並んで写り、足首から上は画面の外。人は通路にいなかったはずなのに、カメラの真下に誰かが立っている、という違和感。
- **box (x1,y1,x2,y2)**: (200,845,310,900)（110x55）
- **最寄り既存 overlay と実測距離**: AR-06-styrofoam-box (33.0)、次点 AR-06-leaf-shadows-aligned (84.0)。大面積 AR-06-floor-tile-rotated の bbox 内。（台帳の `overlay_origin`＋`dimensions` の矩形距離の実測。制作後は最終 overlay の alpha bbox で再測定する）
- **6倍クロップ範囲**: 6倍クロップ (150,729)–(406,900)（256x171）。box は窓内で (300,696)–(960,1024)（窓の縦 171px は 6 倍で 1026 になるため、1536x1024 へ拡大する際に縦だけ約 0.998 倍に縮め、box の下端は 1024 とする）。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled square floor tiles with thin dark joints seen from above at the very bottom of the frame, a soft white light patch on the tiles, cold blue-grey light). Edit only this: the toes of a pair of plain black leather shoes enter from the bottom edge of the frame in the marked area (area about x=300 to 960, y=696 to 1024 in the 1536x1024 frame), side by side, pointing up toward the far end of the corridor, with the dark grey trouser hems just above them; the legs are cut off by the frame bottom so no more than the shoes and hems show. Soft cold light on the toe caps and a faint shadow on the tile. Nothing else is added or changed. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled square floor tiles with thin dark joints seen from above at the very bottom of the frame, a soft white light patch on the tiles, cold blue-grey light). Edit only this: at the bottom edge of the image, in the area x=300 to 960, y=696 to 1024 of the 1536x1024 frame, two black shoes and the lower hems of dark grey trousers stand on the floor tiles, as if a person were standing just below the camera facing the corridor. The shoes are ordinary plain shoes with glossy toe caps; the person is cut off at the ankle by the bottom of the frame. The tiles, joints and light patch stay as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled square floor tiles with thin dark joints seen from above at the very bottom of the frame, a soft white light patch on the tiles, cold blue-grey light). Edit only this: add the lower part of one person standing at the bottom of the frame: two dark plain shoes close together and the hems of dark trousers, entering from the bottom edge inside x=300 to 960, y=696 to 1024 (1536x1024 frame), the toes pointing up the corridor, slightly turned outward, with a short soft shadow. Nothing above the ankle is visible. No other change to the floor. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 灰色の明るい床に黒い靴と暗い裾なので、最大差分は 100 超。面積も 110x55 で下限を超える見込み。標準状態で見える。
- **台帳登録案**:
  ```yaml
  - id: 'AR-06-feet-at-edge'
    candidate_id: 'AR-06-feet-at-edge'
    camera_id: 'CAM06'
    element_id: 'CAM06-E18'
    base_photo: 'public/images/cam6.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM06-E18 の画面下端の床、差分左上 (200,845) 付近（貼り込み後に再計測）'
    detail: '画面の下端に、人の足先（黒い靴と暗い灰色の裾）が見切れていて、誰かがカメラの真下に立っている。'
    overlay: 'assets/anomaly-overlays/cam06/feet-at-edge.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-06-styrofoam-box（box 距離 33px）。大面積 AR-06-floor-tile-rotated と排他（前景の床一面）。'
  ```
- **相互参照 / 重複精査**: AR-04-shadow-behind-camera（カメラの背後の人の頭と肩の影だけ）は影、こちらは実物の靴と裾。AR-04-floor-shoes-rows（持ち主のいない靴が床一面に並ぶ）・AR-07-shoe-v2（CAM07、片方だけの子供靴）は持ち主のいない靴で、足首から上の「立っている人」を示さない。AR-06-wet-footprints（足跡のみ）とも別。CAM06 では AR-06-worker（奥の後ろ姿）と違い、手前でカメラの真下。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-06-floor-tile-rotated（前景の床一面がひし形になる。靴の足元の床と合わない）。併存可=その他の小物。

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

CAM 07（`cam7.webp`、675x900）の型の偏りを直すための制作前の仕様 6 件。画像は未制作で、台帳（`anomalies.yaml`）にも未登録。制作・登録に進んだ案は、この節から撤去して台帳へ移す。この節の box は `cam7.webp` の画素座標。同カメラの既存 overlay（台帳 CAM07 の全件）との最寄り距離を実測済み（30px 規則）。型の内訳は remove_object 1 / text_change 1 / multiply 1 / add_creature 1 / add_person 1 / surreal 1。

### AR-07-sign-text-change — 吊り看板の下段の文字が別の文字に変わる

- **カメラ**: CAM07（`cam7.webp`、675x900）／対象要素: CAM07-E08
- **型 / カテゴリ / フェーズ / 目立ち度**: text_change / object / mid / subtle
- **物と変化**: 左奥の壁に吊られた白円・赤橙枠の丸看板。円内の上に小さな絵柄、その下に細かい文字が二行ほど並ぶ（6倍で見ても判読不能な小さな印字）。円内の下側の文字列だけが、はっきり読める別の文字列「営業中」（赤橙系の細い印字）に置き換わる。看板の枠・円・上の絵柄・位置は変えない。元は読めない細かな印字が、読める文字列「営業中」に変わる。丸看板の「ロゴが消える」案（CR-07-02）や看板の色・縁の案（CR-07-35）とは別で、文字の中身だけが変わる。
- **box (x1,y1,x2,y2)**: (209,147,238,168)（29x21）
- **最寄り既存 overlay と実測距離**: AR-07-pictogram-flip (31.0)。距離は台帳 CAM07 の全 overlay 矩形との実測（大面積の overlay は 30px 規則の例外で除く）。
- **6倍クロップ範囲**: 6倍クロップ (95,72)–(351,243)（256x171）。box は窓内で (684,450)–(858,576)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: the small printed text lines inside the white circle of the orange-framed round hanging sign (the lower text lines, in the marked area x=684 to 858, y=450 to 576 in the 1536x1024 frame) are replaced by one clean, legible printed Japanese line that reads "営業中", in the same thin dark red-orange print, at about the same size and baseline as the old small print. The orange frame, the white circle, the small emblem above the text and the sign's position are unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No other text, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: inside the orange-framed round sign (marked area x=684 to 858, y=450 to 576), the lines of unreadable fine print under the emblem are re-set as one legible Japanese line "営業中" (thin dark red-orange print, about the same height as the old print). Nothing else on the sign changes: the emblem, the orange border, the white disc and the black bracket above it stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No other text, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: only the text of the round hanging sign changes (marked area x=684 to 858, y=450 to 576): below the small emblem in the white circle the fine print now reads "営業中" in thin red-orange characters, centred, same print size. All shape, colour and framing of the sign, the wall and the door beside it are unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No other text, no logos, no watermark.`
- **視認性の見立て**: subtle。標準状態（明るさ50・コントラスト50）でも少し見える強さを目標にし、通らなければ強めて作り直す。 登録前に `uv run scripts/check-visibility.py --id` で下限（最大差分 ≥ 40 / 平均差分 ≥ 3 / 差分25以上が100画素以上か面積の25%以上）を確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-07-sign-text-change'
    candidate_id: 'AR-07-sign-text-change'
    camera_id: 'CAM07'
    element_id: 'CAM07-E08'
    base_photo: 'public/images/cam7.webp'
    category: 'object'
    anomaly_type: 'text_change'
    location: 'CAM07-E08 の周辺、差分左上 (209,147) 付近（貼り込み後に再計測）'
    detail: '左奥の丸い吊り看板の下側の細かい文字が「営業中」に変わる。'
    overlay: 'assets/anomaly-overlays/cam07/sign-text-change.webp'
    # phase / 目立ち度: mid / subtle
    note: '最寄り既存 overlay は AR-07-pictogram-flip（距離 31px）。丸看板は元が判読不能（6倍でも読めない細かい印字）で字数も不明なので、登録前に原寸で読み直し、読めない→読める文字列になっていることを確認する。文字の変化は面積が小さいので check-visibility を必ず通す（通らなければ文字を太く大きくする）。'
  ```
- **相互参照 / 重複精査**: CR-07-02（ロゴが消える）・CR-07-35（縁が金色）は台帳に無く、変化の中身が違う（消失・色）。台帳に text_change は CAM07 に無く、文字の中身が変わる異変は他カメラの text_change と対象が別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-07-wall-clocks（大面積・重なる）/ AR-07-ceiling-white-sheets（大面積・距離 22px で近い）。大面積の AR-07-floor-frost・AR-07-floor-uphill は遠く（床の中段以下）、併存可。併存可=床・階段・右壁・左ガラスの異変。

### AR-07-window-sill-gone — 左のガラス窓の下の木の棚板が消える

- **カメラ**: CAM07（`cam7.webp`、675x900）／対象要素: CAM07-E06
- **型 / カテゴリ / フェーズ / 目立ち度**: remove_object / object / early / subtle
- **物と変化**: 左端の暗いガラス窓（店先）の手前下、画面左の縁に見える明るい木色（ベージュ）の細い棚板（窓の下枠）。ガラス窓に沿って段々に並ぶ棚板の一番手前。ベージュの棚板が消え、そこは暗いガラス面と白い縦枠だけの自然なつながりに埋まる。ほかの棚板、ガラスのひび（AR-07-glass-crack）、白い縦の金属枠は変えない。
- **box (x1,y1,x2,y2)**: (0,418,40,478)（40x60）
- **最寄り既存 overlay と実測距離**: AR-07-n1 (57.0)。距離は台帳 CAM07 の全 overlay 矩形との実測（大面積の overlay は 30px 規則の例外で除く）。
- **6倍クロップ範囲**: 6倍クロップ (0,363)–(256,534)（256x171）。box は窓内で (0,330)–(240,690)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: the light beige wooden window-sill ledge at the very left edge of the frame, at the bottom of the dark glass shop window (the bright wooden slab at the lower-left corner of the marked area, x=0 to 240, y=330 to 690 in the 1536x1024 frame), is removed: the area becomes the same dark window glass and the white vertical metal frame continuing without the ledge, with natural dark reflections. The other, higher ledges, the white frame and the floor stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: erase the pale wood-coloured ledge slab at the bottom left of the dark shop window glass (marked area x=0 to 240, y=330 to 690): where it was, continue the dark glass surface and the pale vertical frame so that it looks as if the ledge never existed. Add nothing. All other ledges, frames and the floor stay. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: the beige wooden sill board at the left window is gone; only dark glass and the white metal frame remain in its place (area x=0 to 240, y=330 to 690), with the same dim reflections as the rest of the window. Nothing new appears. Keep the other ledges and everything else unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: subtle。標準状態（明るさ50・コントラスト50）でも少し見える強さを目標にし、通らなければ強めて作り直す。 登録前に `uv run scripts/check-visibility.py --id` で下限（最大差分 ≥ 40 / 平均差分 ≥ 3 / 差分25以上が100画素以上か面積の25%以上）を確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-07-window-sill-gone'
    candidate_id: 'AR-07-window-sill-gone'
    camera_id: 'CAM07'
    element_id: 'CAM07-E06'
    base_photo: 'public/images/cam7.webp'
    category: 'object'
    anomaly_type: 'remove_object'
    location: 'CAM07-E06 の周辺、差分左上 (0,418) 付近（貼り込み後に再計測）'
    detail: '左ガラス窓の下の明るい木の棚板が一枚消える。'
    overlay: 'assets/anomaly-overlays/cam07/window-sill-gone.webp'
    # phase / 目立ち度: early / subtle
    note: '最寄り既存 overlay は AR-07-n1（距離 57px）、AR-07-glass-crack（距離 57px 超）。画面端の小さな差分なので check-visibility を必ず通す（通らなければ消す範囲を棚板の上の段まで広げる）。左ガラスの AR-07-glass-crack とは同プレイ共存可（距離がある）。'
  ```
- **相互参照 / 重複精査**: 台帳に左ガラスの棚板の異変は無い。CR-07-33（ガラスに手袋が映る）・CR-07-26（猫が映る）は映り込みの案で、こちらは実物の消失。
- **同カメラ内の排他と併存**: 同プレイで共存させない=なし。大面積の AR-07-wall-clocks（距離 64px）・AR-07-floor-frost（36px）・AR-07-floor-uphill・AR-07-ceiling-white-sheets とは 30px 以上離れ、全部併存可。小物の異変とも 30px 以上離れる。

### AR-07-opening-white-figure — 中央の黒い開口の奥に白い服の人が立つ

- **カメラ**: CAM07（`cam7.webp`、675x900）／対象要素: CAM07-E11
- **型 / カテゴリ / フェーズ / 目立ち度**: add_person / person / late / medium
- **物と変化**: 中央の壁にある深い黒色の縦長開口（E11）。下の方は真っ黒で何も見えない。開口の暗がりの下の方に、白い上着と暗いズボンの人が、こちらに背を向けて直立している（高さ約 45px の小さな人影、顔は見えない）。ほとんど動きのない廊下に人が一人いるのが異変。開口の暗さと対照的な白い上着で見える。
- **box (x1,y1,x2,y2)**: (302,293,350,343)（48x50）
- **最寄り既存 overlay と実測距離**: AR-07-warm-light (30.0)。距離は台帳 CAM07 の全 overlay 矩形との実測（大面積の overlay は 30px 規則の例外で除く）。
- **6倍クロップ範囲**: 6倍クロップ (198,233)–(454,404)（256x171）。box は窓内で (624,360)–(912,660)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: add one person: inside the deep black rectangular opening, in its lower part (marked area x=624 to 912, y=360 to 660 in the 1536x1024 frame), a person stands upright seen from behind, wearing a pale off-white jacket and dark trousers, about 45 px tall at original scale (270 px in this frame), standing still with arms down. No face visible. The person is in the dark opening and slightly dimmer than the white wall; do not add any light source. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: add a single small human figure standing deep inside the black doorway opening, facing away from the camera: pale grey-white jacket, dark trousers, short dark hair, about 270 px tall in this 1536x1024 frame, feet on the dark floor at the bottom of the opening (area x=624 to 912, y=360 to 660). They stand perfectly still. No face, no light, no other change. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: inside the pitch-black tall opening in the centre wall, near its bottom, one person stands upright with their back to us: a light cream jacket that catches a little of the corridor light, dark legs, arms hanging down, about 270 px tall in this frame (area x=624 to 912, y=360 to 660). Realistic, low-light, slightly noisy like the rest of the image. Nothing else is added or changed. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: medium。標準状態で見つけられる強さ。つまみで見やすくなる。 登録前に `uv run scripts/check-visibility.py --id` で下限（最大差分 ≥ 40 / 平均差分 ≥ 3 / 差分25以上が100画素以上か面積の25%以上）を確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-07-opening-white-figure'
    candidate_id: 'AR-07-opening-white-figure'
    camera_id: 'CAM07'
    element_id: 'CAM07-E11'
    base_photo: 'public/images/cam7.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM07-E11 の周辺、差分左上 (302,293) 付近（貼り込み後に再計測）'
    detail: '中央の黒い開口の奥の下の方に、白い上着の人が背を向けて立つ。'
    overlay: 'assets/anomaly-overlays/cam07/opening-white-figure.webp'
    # phase / 目立ち度: late / medium
    note: '最寄り既存 overlay は AR-07-warm-light（距離 30px、黒い開口の奥の灯）。AR-07-warm-light・AR-07-crane は同じ開口で、人影と灯りが同時に出ると主従が曖昧になるので同プレイで共存させない。AR-07-wall-clocks（大面積・同じ壁面）と排他。人物は暗がりでコントラストが落ちるので、上着の白を強めて check-visibility を通す。'
  ```
- **相互参照 / 重複精査**: 台帳の person は AR-07-stair-figures（右階段の重なる人影）のみ。場所（中央の黒い開口）・見え方（一人が立つ）が別。CR-07-07（開口に灰色扉が立つ）は物で、人ではない。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-07-warm-light / AR-07-wall-clocks（大面積・重なる）/ AR-07-floor-frost（大面積・距離 9px で近い）。大面積の AR-07-ceiling-white-sheets・AR-07-floor-uphill は遠く、併存可。併存可=階段・右壁・左ガラス・天井・床下側の異変。

### AR-07-floor-white-rabbit — 右手前の暗い床に白いウサギが座っている

- **カメラ**: CAM07（`cam7.webp`、675x900）／対象要素: CAM07-E16
- **型 / カテゴリ / フェーズ / 目立ち度**: add_creature / object / mid / medium
- **物と変化**: 右の階段の下あたり、暗い床と階段の根元が溶け合う右奥の暗がり（画面右端付近、扉より手前）。暗い床の上に、真っ白な小さなウサギが一羽、こちらを向いて座っている（体長約 30px）。地下の通路には本来いない動物。左階段の猫（AR-07-stairs-cat）とは種類も場所も別。
- **box (x1,y1,x2,y2)**: (600,358,655,413)（55x55）
- **最寄り既存 overlay と実測距離**: AR-07-n4 (32.0)。距離は台帳 CAM07 の全 overlay 矩形との実測（大面積の overlay は 30px 規則の例外で除く）。
- **6倍クロップ範囲**: 6倍クロップ (419,300)–(675,471)（256x171）。box は窓内で (1086,348)–(1416,678)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: add one small white rabbit sitting on the dark floor in the lower-right part of the marked area (area x=1086 to 1416, y=348 to 678 in the 1536x1024 frame): pure white fur, upright ears, sitting side-on with its head turned towards the camera, about 180 px long in this frame. A soft shadow under it and a faint reflection on the glossy dark floor. Nothing else is added. The surrounding dark floor, stairs and wall stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: add a single white domestic rabbit sitting still on the glossy dark floor near the foot of the dark right staircase (area x=1086 to 1416, y=348 to 678): bright white body, long upright ears, small dark eyes looking at the camera, about 180 px long in this frame, with a small dim reflection below it. Nothing else changes. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: a white rabbit crouches on the dark tiled floor at the bottom-right area of the crop (area x=1086 to 1416, y=348 to 678): fluffy white fur, ears raised, facing the camera, the size of a small cat (about 180 px long in this frame), lit faintly by the corridor light so it stands out against the dark floor. No other object or change. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: medium。標準状態で見つけられる強さ。つまみで見やすくなる。 登録前に `uv run scripts/check-visibility.py --id` で下限（最大差分 ≥ 40 / 平均差分 ≥ 3 / 差分25以上が100画素以上か面積の25%以上）を確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-07-floor-white-rabbit'
    candidate_id: 'AR-07-floor-white-rabbit'
    camera_id: 'CAM07'
    element_id: 'CAM07-E16'
    base_photo: 'public/images/cam7.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM07-E16 の周辺、差分左上 (600,358) 付近（貼り込み後に再計測）'
    detail: '右奥の暗い床に、白いウサギが一羽座っている。'
    overlay: 'assets/anomaly-overlays/cam07/floor-white-rabbit.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-07-n4（距離 32px）。暗い場所なのでウサギの白で check-visibility を通す。AR-07-floor-frost（大面積・床の中段）と同じ面で排他。AR-07-n4 は同プレイ共存可（30px 以上離れる）。'
  ```
- **相互参照 / 重複精査**: 台帳の動物は AR-07-stairs-cat（左階段の猫）のみ。種類（ウサギ）・場所（右奥の床）が別。CR-07-26（猫が映る）とも別。小動物は台帳の運用に合わせ object に分類。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-07-floor-frost（大面積・重なる）。大面積の AR-07-wall-clocks（距離 32.6px）・AR-07-floor-uphill・AR-07-ceiling-white-sheets は 30px 以上離れ、併存可。併存可=ほか全部。

### AR-07-floor-black-hole — 手前右の床のタイル一枚が抜けて黒い四角い穴になる

- **カメラ**: CAM07（`cam7.webp`、675x900）／対象要素: CAM07-E16
- **型 / カテゴリ / フェーズ / 目立ち度**: surreal / surreal / late / obvious
- **物と変化**: 右手前の広い灰色タイル床（E16）。タイルは斜めの格子で、丸い白い反射が点在する。床のタイル一枚分が四角く抜け、真っ黒な穴になる（縁は床のタイルの切り口、奥に淡く下へ続く段の線がかすかに見える）。穴の縁はタイルの目地に沿う。AR-07-tile-mirror（鏡のタイル）・AR-07-purple-floor-tile（色）・AR-07-floor-puddle（水たまり）とは別で、床に落ちる穴。
- **box (x1,y1,x2,y2)**: (530,812,665,893)（135x81）
- **最寄り既存 overlay と実測距離**: AR-07-floor-puddle (38.0)。距離は台帳 CAM07 の全 overlay 矩形との実測（大面積の overlay は 30px 規則の例外で除く）。
- **6倍クロップ範囲**: 6倍クロップ (419,729)–(675,900)（256x171）。box は窓内で (666,498)–(1476,984)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: replace one floor tile in the marked area (area x=666 to 1476, y=498 to 984 in the 1536x1024 frame) with a square black hole, following the perspective of the floor grid exactly: its edges run along the tile joints, the cut edge of the grey speckled tile is visible as a thin lighter rim, and inside the hole it is almost pure black with faint horizontal lines of steps going down, barely visible. No reflection of the ceiling light inside the hole. All neighbouring tiles and reflections stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: one floor tile has fallen away and left a hole shaped exactly like the tile (a skewed square following the floor grid in the marked area x=666 to 1476, y=498 to 984): deep black inside, a thin bright cut edge of the stone on the near side, and a very faint set of stair lines dropping into the darkness. The surrounding tiles and the white round reflections remain unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: turn one grey tile of the glossy floor at the lower right into an open square pit in the marked area (x=666 to 1476, y=498 to 984): black void with a faint downward staircase glimpsed inside, the stone edge thickness visible on the near and left sides, joints continuing around it. No light inside. Do not touch any other tile or reflection. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: obvious。標準状態ではっきり見える。 登録前に `uv run scripts/check-visibility.py --id` で下限（最大差分 ≥ 40 / 平均差分 ≥ 3 / 差分25以上が100画素以上か面積の25%以上）を確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-07-floor-black-hole'
    candidate_id: 'AR-07-floor-black-hole'
    camera_id: 'CAM07'
    element_id: 'CAM07-E16'
    base_photo: 'public/images/cam7.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM07-E16 の周辺、差分左上 (530,812) 付近（貼り込み後に再計測）'
    detail: '右手前の床のタイル一枚が、真っ黒な四角い穴になる。'
    overlay: 'assets/anomaly-overlays/cam07/floor-black-hole.webp'
    # phase / 目立ち度: late / obvious
    note: '最寄り既存 overlay は AR-07-floor-puddle（距離 38px）。AR-07-floor-uphill（大面積・床一面）と同じ面で排他。穴は大きく黒いので check-visibility は通る見込み。穴の縁は床の格子の向き（斜め）に合わせる。'
  ```
- **相互参照 / 重複精査**: 台帳の床の異変は鏡のタイル（tile-mirror）・ひし形（diamond-tile）・紫（purple-floor-tile）・水たまり・霜・上り坂・足跡系で、タイルが抜けて穴になる異変は無い。cam3 の AR-03-sunken-opening-floor とはカメラ・床の質が別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-07-floor-uphill（大面積・床一面・重なる。台帳 note に大面積の注記は無いが面積は画像の1/8以上）。小物の AR-07-floor-puddle は距離 38px で併存可。大面積の AR-07-floor-frost・AR-07-wall-clocks・AR-07-ceiling-white-sheets は遠く、併存可。併存可=壁・天井・階段・左ガラスの異変。

### AR-07-ceiling-lights-row — 奥の天井に小さな丸い灯が横一列に増える

- **カメラ**: CAM07（`cam7.webp`、675x900）／対象要素: CAM07-E05
- **型 / カテゴリ / フェーズ / 目立ち度**: multiply / environment / mid / medium
- **物と変化**: 奥の天井（E05）。小さな黒い器具と、小さな白い丸い埋込灯が数個だけある。丸い換気口の下の天井に、同じ大きさの小さな白い丸い埋込灯が横一列に 6 つ並ぶ（もとは 1〜2 個）。数が増えるだけで、どれも同じ明るさ・大きさ。
- **box (x1,y1,x2,y2)**: (236,52,293,100)（57x48）
- **最寄り既存 overlay と実測距離**: AR-07-crane (32.0)。距離は台帳 CAM07 の全 overlay 矩形との実測（大面積の overlay は 30px 規則の例外で除く）。
- **6倍クロップ範囲**: 6倍クロップ (136,0)–(392,171)（256x171）。box は窓内で (600,312)–(942,600)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: add several identical small round white recessed ceiling lights: in the marked area (x=600 to 942, y=312 to 600 in the 1536x1024 frame) draw a neat horizontal row of six small flat round white lights, each about 40 px wide in this frame and evenly spaced, on the blue-grey ceiling just below the large round vent, each with a small soft glow. They look like the one existing small white recessed light elsewhere on the ceiling. Nothing else changes. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: multiply the small round ceiling lights: in the marked area (x=600 to 942, y=312 to 600) there are now six identical small round recessed white lights in one straight row, same size, same brightness, even spacing, matching the single recessed light that already exists on this ceiling. The big round vent above and everything else stay as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: on the ceiling area under the circular vent (x=600 to 942, y=312 to 600 in the 1536x1024 frame) place a straight row of six identical small round white recessed lights (about 40 px diameter each in this frame, even gaps, soft glow). No other lights, no other changes. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: medium。標準状態で見つけられる強さ。つまみで見やすくなる。 登録前に `uv run scripts/check-visibility.py --id` で下限（最大差分 ≥ 40 / 平均差分 ≥ 3 / 差分25以上が100画素以上か面積の25%以上）を確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-07-ceiling-lights-row'
    candidate_id: 'AR-07-ceiling-lights-row'
    camera_id: 'CAM07'
    element_id: 'CAM07-E05'
    base_photo: 'public/images/cam7.webp'
    category: 'environment'
    anomaly_type: 'multiply'
    location: 'CAM07-E05 の周辺、差分左上 (236,52) 付近（貼り込み後に再計測）'
    detail: '奥の天井の丸い換気口の下に、小さな丸い埋込灯が横一列に6つ増える。'
    overlay: 'assets/anomaly-overlays/cam07/ceiling-lights-row.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-07-crane（距離 32px）。AR-07-ceiling-white-sheets（大面積・天井一面）と同じ面で排他。AR-07-lamp-off（丸灯が消える）とは別で、増えるのが異変。灯が小さいので check-visibility を必ず通す（通らなければ灯を大きく・数を減らさず明るく）。'
  ```
- **相互参照 / 重複精査**: 台帳の天井の異変は折り鶴・紐・紙飛行機・白いシーツ・天井板の黄色・丸灯の消灯・紙札。灯の数が増える異変は無い。CR-07-22（丸型設備の隣に同じ設備が増える）は換気口の複製（duplicate）で、こちらは埋込灯の数の増殖（multiply）で見え方が別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-07-ceiling-white-sheets（大面積・重なる）/ AR-07-wall-clocks（大面積・距離 28px で近い）。大面積の AR-07-floor-frost・AR-07-floor-uphill は遠く、併存可。併存可=床・階段・壁・左ガラスの異変。

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

anomaly_type の偏り（台帳は add_object・state_change が多く surreal は薄い）を直すために起こした 2 案。画像は未制作で、台帳にも未登録。box は台帳（origin/main）の CAM08 の既存 overlay 矩形と実測で照合済み（小物の overlay とは 30px 以上離れる）。昇格する時はこの節から該当案を削除し、`anomalies.yaml` に一度だけ登録する。

### AR-08-ceiling-hole-upside-corridor — 左の天井に丸い穴が開き、上下逆さの同じ通路が見える

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E01
- **型 / カテゴリ / フェーズ / 目立ち度**: surreal / surreal / late / medium
- **物と変化**: 左上の天井の薄灰色の面に、扁平な楕円（遠近で潰れた丸）の穴が一つ開き、その中に、この写真と同じ通路が上下逆さに見える（床のタイルと照明の反射が上、天井が下）。穴の縁はなめらかな金属の縁取りで、穴の周りの天井の斑点は縁で切れる。物理的にありえない空間の裏返し。AR-08-vent-square（四角い換気口）と違い、穴の向こうが別の空間。
- **box (x1,y1,x2,y2)**: (95,2,185,48)（90x46）
- **最寄り既存 overlay と実測距離**: AR-08-light-blue-bleed (30.0)、次点 AR-08-vent-square (73.0)。
- **6倍クロップ範囲**: 6倍クロップ (12,0)–(268,171)（256x171）。box は窓内で (498,12)–(1038,288)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: a flat oval opening (a circular hole squashed by perspective) appears in the pale speckled ceiling in the marked area at the top left: through it we see the same corridor upside down, with the grey granite floor and its white lamp reflections at the top of the hole and a ceiling with small lights at the bottom, in the same cold blue-grey tones. The hole has a thin smooth metal rim, and the ceiling speckles end sharply at the rim. Everything else is unchanged. The edit area is about x=498 to 1038, y=12 to 288 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: cut one elliptical hole into the ceiling in the marked area; inside it, an upside-down view of this same arcade corridor (floor on top, ceiling below), dimmer than the ceiling around it, with a thin brushed-metal rim and no light spill onto the ceiling. Nothing else changes. The edit area is about x=498 to 1038, y=12 to 288 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: in the marked area of the ceiling, a round hole viewed at a steep angle shows a mirrored-upside-down copy of the corridor: the floor tiles and the lamp reflections are overhead inside the hole. A thin pale rim edges it. The surrounding ceiling's grain and speckles continue right up to the rim. The edit area is about x=498 to 1038, y=12 to 288 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 天井の明るい灰色の面に暗い楕円が開くので、標準でも見える。つまみ（明るさを上げる）で穴の中の逆さの通路が見えやすくなる。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-ceiling-hole-upside-corridor'
    candidate_id: 'AR-08-ceiling-hole-upside-corridor'
    camera_id: 'CAM08'
    element_id: 'CAM08-E01'
    base_photo: 'public/images/cam8.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM08-E01 の左上の天井面、差分左上 (95,2) 付近（貼り込み後に再計測）'
    detail: '左上の天井に楕円の穴が開き、上下逆さの同じ通路が見える。'
    overlay: 'assets/anomaly-overlays/cam08/ceiling-hole-upside-corridor.webp'
    # phase / 目立ち度: late / medium
    note: 'box は左上の天井（x 95〜185、y 2〜48）に収める。AR-08-ceiling-light-grid（大面積）と同じ面なので同プレイで共存させない。最寄り既存 overlay は AR-08-light-blue-bleed（box 距離 30px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-vent-square（四角い換気口）は黒い口で向こう側が見えない。AR-08-floor-water-mirror・AR-08-pillar-second・AR-08-floor-reflection-two-tier は別の surreal。台帳に穴の向こうの空間を描く異変は無い。CR-08-08（通路が直角に折れる）は壁面の通路で別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-ceiling-light-grid / AR-08-vent-square（天井の左上の面）。併存可=柱・床・右壁の異変。大面積（AR-08-ceiling-light-grid）とは box が重なっても併存可。

### AR-08-floor-tile-upright — 床タイルが一枚だけ、板のように垂直に立つ

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E16
- **型 / カテゴリ / フェーズ / 目立ち度**: surreal / surreal / mid / medium
- **物と変化**: 左手前の床の灰色の大判タイルのうち一枚が、その場でぱたりと起き上がり、墓石のように床に垂直に立つ。立った面は元の斑点模様のまま、足元は黒い四角の穴になり、そこから薄い灰色の埃が一筋たなびく。床のほかのタイルは並んだまま。AR-08-floor-tile-groove（タイルが沈む）・AR-08-tile-concentric（模様が変わる）と違い、タイルが物として動く。
- **box (x1,y1,x2,y2)**: (122,627,172,688)（50x61）
- **最寄り既存 overlay と実測距離**: AR-08-tile-concentric (31.0)、次点 AR-08-n1 (32.0)。
- **6倍クロップ範囲**: 6倍クロップ (19,572)–(275,743)（256x171）。box は窓内で (618,330)–(918,696)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: one grey granite floor tile in the marked area (left foreground) has flipped up and stands upright like a thin slab, about 55 px tall in the source (about 330 px in this frame), its face showing the same fine speckles, with a soft pale highlight on its top edge. Where it was, a dark square hole shows the black underside, with a faint thin trail of pale dust. The neighbouring tiles and joints stay as they are. The edit area is about x=618 to 918, y=330 to 696 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: make a single floor tile stand on its edge, perpendicular to the floor, like a gravestone: its surface keeps the original grey speckled texture and the cool light from the ceiling; its base is a black square opening in the floor with a thin ragged edge. Keep the camera angle, tile joints and nearby reflections exactly the same. The edit area is about x=618 to 918, y=330 to 696 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: in the marked area of the left foreground floor, one tile is raised straight up, a grey speckled slab with a clean edge catching the light, and its former place is an empty dark rectangular pit. A small wisp of grey dust drifts above the pit. Everything else on the floor remains unchanged. The edit area is about x=618 to 918, y=330 to 696 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 灰色の床に黒い四角の穴と立ち上がった板が出るので、標準でも見える。つまみ（コントラストを上げる）でさらに。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-floor-tile-upright'
    candidate_id: 'AR-08-floor-tile-upright'
    camera_id: 'CAM08'
    element_id: 'CAM08-E16'
    base_photo: 'public/images/cam8.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM08-E16 の左手前の床タイル、差分左上 (122,627) 付近（貼り込み後に再計測）'
    detail: '左手前の床タイルが一枚だけ垂直に立ち上がり、足元が黒い穴になる。'
    overlay: 'assets/anomaly-overlays/cam08/floor-tile-upright.webp'
    # phase / 目立ち度: mid / medium
    note: '左手前の床の空き（約 55x65）に収める。最寄り既存 overlay は AR-08-tile-concentric（box 距離 31px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-floor-tile-groove（タイル一枚が沈んで縁が溝になる）は『沈む』、こちらは『起き上がる』で見え方が逆。AR-08-tile-concentric は模様、CR-08-13・CR-08-42 は色・落ち葉で別。台帳に床タイルが立つ異変は無い（他カメラの床の穴・沈みとも違う）。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-floor-water-mirror（大面積。同じ床面）/ AR-08-tile-concentric・AR-08-floor-tile-groove（床タイルの変化同士）。併存可=柱・壁・天井の異変。大面積（AR-08-floor-water-mirror）とは box が重なっても併存可。

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

音系（CR-SH-04〜06）は台帳の令和の音（CR-RZ-07〜09）と同じく、画像差分を持たない runtime 案で、音の種類とカメラを出現のたびに無作為に選び、選ばれたカメラを見ている間だけ鳴らす。報告はそのカメラでカテゴリ（`environment` 仮）を選ぶ。どれも楽しげ・懐かしげなのに不気味に聞こえる、が狙い（kako-jun 指示）。実在の楽曲・番組・人物は使わない。採用には音素材と再生機構が必要（Issue #70）。映像が一瞬褪色する案や食器の音などは下の runtime 在庫を参照。

## Runtime / 背景非依存の異変在庫

画像差分を作らず、CSS / Canvas / Web Audio / 状態管理で出す異変の在庫（旧・異変在庫メモから移設）。写真要素に紐づかないため要素IDは持たない。採用したら `anomalies.yaml` に `kind: runtime` で載せる（効果の実装は別タスク）。

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
- 令和系: 令和系の音は台帳 `anomalies.yaml` の CR-RZ-07〜09（planned、kind: runtime）を参照。
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
