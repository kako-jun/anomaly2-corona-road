# 異変候補プール

まだ採用・生成した異変ではなく、写真の写り込みから発想を広げる写真固有案、昭和テーマ案、令和テーマ案（4人目の子供の記憶）、写真に紐づかない runtime 在庫をまとめた候補。

## 正本と昇格ルール

- 写っている物の説明・座標・カメラ写真の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。写真固有の候補ではここでは要素IDだけ参照し、物体説明や座標を複製しない。
- 制作済みの真実は台帳（`anomalies.yaml`）。制作仕様の節は制作・登録済みの案を撤去するため、「制作仕様（未制作）— CAM 03」には取り下げた案（将来の再挑戦用）が、「制作仕様（未制作）— CAM 08」には anomaly_type の偏りを直すための未制作案が残る。
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

取り下げた案 1 件のみ。30px 規則違反と視認性ぎりぎりで取り下げ（dark-tile と矩形が重なった）。将来の再挑戦用に仕様を残す。

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

anomaly_type の偏り（台帳は add_object・state_change が多く、remove_object・displace・text_change・multiply・add_person が薄い）を直すために起こした 10 案。画像は未制作で、台帳にも未登録。box は 2026-11-05 時点の台帳の CAM08 の既存 overlay 矩形と照合済み（約 30px 以上離れる。排他と明記したものを除く）。昇格する時はこの節から該当案を削除し、`anomalies.yaml` に一度だけ登録する。

### AR-08-pillar-conduit-gone — 柱の正面を這う縦の配管が丸ごと消える

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E11
- **型 / カテゴリ / フェーズ / 目立ち度**: remove_object / object / early / subtle
- **物と変化**: 中央の柱の左面の上部で、天井の際から横長の灰色器具（E12）へ真っ直ぐ下りている細い縦の配管（コンジット）が、天井側の取り付けから器具の上端近くまで丸ごと消える。柱の白灰色の滑らかな面がそのまま続いて自然に埋まり、器具は配管なしで柱に付いたままになる。配線がどこへも繋がらない違和感。ほかのカメラの『物が消える』（看板・シート・非常灯）と違い、細い線状の設備が消える変化。
- **box (x1,y1,x2,y2)**: (305,140,328,226)（23x86）
- **最寄り既存 overlay と実測距離**: AR-08-pillar-notice (31.0)、次点 AR-08-pillar-second (31.0)。
- **6倍クロップ範囲**: 6倍クロップ (188,97)–(444,268)（256x171）。box は窓内で (702,258)–(840,774)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: the thin vertical grey conduit pipe that runs down the pale left face of the square pillar, from the ceiling edge down to just above the small grey rectangular fixture below it, is completely gone: the pillar face there is a smooth continuous pale grey-white plaster with the same soft gradient and faint speckles, as if the pipe had never been installed. The small grey rectangular fixture below stays exactly as it is. The edit area is about x=702 to 840, y=258 to 774 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: erase the narrow vertical pipe on the upper part of the pillar face (the thin pale grey line about 9 px wide in the source, running from the ceiling down to the top of the grey rectangular fixture): fill the strip with the surrounding pillar plaster, same tone, same lighting falloff, same faint grain; no mount mark, no screw hole, no shadow line remains. The fixture and the pillar edges are untouched. The edit area is about x=702 to 840, y=258 to 774 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: the conduit pipe above the small grey rectangular fixture on the pillar vanishes without a trace: the pillar plaster continues smoothly where it was, matching the soft light gradient from the lit left side. The fixture itself is unchanged and now looks wired to nothing. Nothing else is added. The edit area is about x=702 to 840, y=258 to 774 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 細い淡色の線で、標準でも目を凝らせば見えるが、つまみ（明るさを上げる）で見やすくなる。消える線の面積は小さいので、check-visibility の「25 以上の画素 100 以上、または面積の 25%」を満たすか要確認。通らなければ配管を太く（柱の面に近い明るさで太い管）描いてから消す差分にする。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-pillar-conduit-gone'
    candidate_id: 'AR-08-pillar-conduit-gone'
    camera_id: 'CAM08'
    element_id: 'CAM08-E11'
    base_photo: 'public/images/cam8.webp'
    category: 'object'
    anomaly_type: 'remove_object'
    location: 'CAM08-E11 の左面上部、器具へ下りる配管、差分左上 (305,140) 付近（貼り込み後に再計測）'
    detail: '中央の柱の上部で、天井から横長の器具へ下りていた細い縦の配管が丸ごと消える。'
    overlay: 'assets/anomaly-overlays/cam08/pillar-conduit-gone.webp'
    # phase / 目立ち度: early / subtle
    note: '柱の滑らかな面が元から無地なので消した跡が自然に埋まる。配管の下端の 6px 程は器具の影に紛れて box の外に残る。最寄り既存 overlay は AR-08-pillar-notice（box 距離 31px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: CR-08-39（器具の下縁が曲線）・CR-08-05（器具の影）と同じ器具の近くだが、変わるのは別の物（配管）で器具は不変。AR-08-pillar-notice（柱の貼り紙）は柱の下の面で別。台帳に配管・配線の異変は無い。他カメラの remove_object（看板・シート・非常灯・腰壁の板）と対象が重ならない。
- **同カメラ内の排他と併存**: 同プレイで共存させない=CR-08-39 / CR-08-05（同じ器具を見るため、同時に出さない）。併存可=天井・床・右壁・左扉の異変。大面積（AR-08-ceiling-light-grid）とは box が重なっても併存可。

### AR-08-ceiling-dome-on-wall — 天井の小さな黒いドームが、壁の窓枠の上に移っている

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E05
- **型 / カテゴリ / フェーズ / 目立ち度**: displace / camera / mid / medium
- **物と変化**: 左奥の天井の下端に付いている小さな黒い半球ドーム（監視カメラ状、柱の左上、天井の灯の列の脇）が、元の位置から消え、同じ物が明るい通路の壁の縦格子の窓枠の上、床から2メートルほどの高さに取り付けられた位置にある。同じ形・同じ大きさのドームが、天井でなく壁面に付いている。物は増えず『同じ物が不自然な位置にある』変化。ほかの displace（看板が天井に貼り付く等）と違い、見張る側の機械が動く。
- **box (x1,y1,x2,y2)**: (226,134,262,226)（36x92）
- **最寄り既存 overlay と実測距離**: AR-08-pillar-notice (36.9)、次点 AR-08-barber-pole (38.0)。
- **6倍クロップ範囲**: 6倍クロップ (116,94)–(372,265)（256x171）。box は窓内で (660,240)–(876,792)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: the small black hemispherical dome (a surveillance-camera-like dome with a short mount) that hangs under the ceiling edge near the top of the marked area is gone from the ceiling: the ceiling underside there is plain, with the same dark band and light strip as its neighbours. The same black dome, the same size and the same glossy highlight, is now mounted on the pale vertical window frame on the bright wall lower in the marked area, about 70 px (about 420 px in this frame) below its old place, sticking out of the wall surface with a short mount and a faint soft shadow under it. The edit area is about x=660 to 876, y=240 to 792 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: move the black dome: remove it from the ceiling edge (restore a plain ceiling underside) and place an identical small black glossy hemispherical dome onto the bright wall, attached to the cream window frame in the lower half of the marked area, lit from the left like the wall. One dome only, same size as the original. No cable, no extra object. The edit area is about x=660 to 876, y=240 to 792 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: relocate the small black ceiling dome to the wall: the ceiling edge becomes plain dark band where it was; a same-sized black hemisphere with a small bracket now hangs on the bright white wall panel below, as if a ceiling camera had slid down onto the wall. The wall surface, window frames and light strips keep their exact shape and brightness. The edit area is about x=660 to 876, y=240 to 792 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 黒い小さな半球が明るい壁（白飛び気味）の上に現れるので、標準でも目に入る。元の位置の消失は subtle だが、新しい位置の黒が主役。つまみ（明るさを下げる）で壁の白が落ちるとさらに見やすい。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-ceiling-dome-on-wall'
    candidate_id: 'AR-08-ceiling-dome-on-wall'
    camera_id: 'CAM08'
    element_id: 'CAM08-E05'
    base_photo: 'public/images/cam8.webp'
    category: 'camera'
    anomaly_type: 'displace'
    location: 'CAM08-E05 の左奥の天井の黒い小突起（監視ドーム）と明るい壁、差分左上 (226,134) 付近（貼り込み後に再計測）'
    detail: '左奥の天井の小さな黒いドーム（監視カメラ状）が、天井から壁の窓枠の上へ移っている。'
    overlay: 'assets/anomaly-overlays/cam08/ceiling-dome-on-wall.webp'
    # phase / 目立ち度: mid / medium
    note: '天井の元位置と壁の新位置を一つの box で覆う。新位置は窓枠の縦桟の上。AR-08-barber-pole（左奥の床屋サイン）とは x 方向に離れる。最寄り既存 overlay は AR-08-pillar-notice（box 距離 37px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-vent-paper-plug（右奥の天井のドームが紙で塞がれる）とは別のドーム（E03、右奥）。CR-08-20（折り鶴）・CR-08-05 とは別物。台帳の displace は他カメラの看板移動のみで、機械が壁へ移る案は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-ceiling-domes-row（ドームの数が合わなくなる）。併存可=右奥のドーム（AR-08-vent-paper-plug）・柱・床・右壁の異変。大面積（AR-08-ceiling-light-grid・AR-08-stacked-crt-tvs）とは box が重なっても併存可。

### AR-08-sign-text-changed — 丸い吊り看板の文字が、違う文言に変わる

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E10
- **型 / カテゴリ / フェーズ / 目立ち度**: text_change / object / mid / medium
- **物と変化**: 奥の通路の入口に下がる丸い吊り看板（赤橙の枠に白い円、円の中に上段の細い小さな漢字の行と、下段の筆記体風の太めの行）。原寸では二行とも潰れて判読できないが、文字は二行である。この二行が、下段のひらがな四字「おかえり」と上段の短い「ようこそ」に差し替わる（二行とも別の文言、書体と色は元の暗灰色の筆致に揃える）。看板の枠・色・形・位置は不変。実在の店名・企業名ではない一般の挨拶語。
- **box (x1,y1,x2,y2)**: (392,158,430,175)（38x17）
- **最寄り既存 overlay と実測距離**: AR-08-old-man-back (30.0)、次点 AR-08-suit (53.1)。距離は排他にする AR-08-sign・AR-08-fixture-dark-red（overlay の矩形が看板の円面を含む。変わるのは天井器具だけだが矩形は重なるので同時に出さない）を除いて測った。
- **6倍クロップ範囲**: 6倍クロップ (283,81)–(539,252)（256x171）。box は窓内で (654,462)–(882,564)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: the two lines of small dark-grey lettering inside the white circle of the round hanging sign (red-orange frame, white disc) are replaced: the upper small line now reads ようこそ in tiny brush-pen hiragana, and the lower, larger handwritten line now reads the four hiragana おかえり in the same dark grey handwriting style, same size, same slight fade as the original lettering. The sign frame, colours, shape and position are unchanged. The edit area is about x=654 to 882, y=462 to 564 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark, no other text anywhere else.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: change only the writing on the white disc of the round hanging sign: erase the old two lines of tiny dark text and write the greeting おかえり on the lower line (larger, handwritten, four hiragana characters) and ようこそ on the upper line (smaller), in the same dark-grey ink, same faint blur and soft edges as the original text. The red frame and white disc stay untouched. The edit area is about x=654 to 882, y=462 to 564 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark, no other text anywhere else.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: the lettering on the round sign is different now: the upper line reads ようこそ and the lower line reads おかえり, both in dark grey handwritten ink matching the old lettering's weight and low contrast, slightly out of focus like the rest of the far corridor. No other change to the sign or the corridor behind. The edit area is about x=654 to 882, y=462 to 564 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark, no other text anywhere else.`
- **視認性の見立て**: 文字は小さく（高さ約 8〜12px）、標準では何か違う程度に見え、つまみ（コントラストを上げる）で読める。差分は円面の暗灰色の線の置き換えなので、check-visibility の面積比の条件を必ず確認する。通らなければ文字を太く大きくする（円面一杯に）。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-sign-text-changed'
    candidate_id: 'AR-08-sign-text-changed'
    camera_id: 'CAM08'
    element_id: 'CAM08-E10'
    base_photo: 'public/images/cam8.webp'
    category: 'object'
    anomaly_type: 'text_change'
    location: 'CAM08-E10 の奥の通路の丸い吊り看板の白い円面の二行の文字、差分左上 (392,158) 付近（貼り込み後に再計測）'
    detail: '奥の丸い吊り看板の二行の文字が、「ようこそ」「おかえり」に変わる。'
    overlay: 'assets/anomaly-overlays/cam08/sign-text-changed.webp'
    # phase / 目立ち度: mid / medium
    note: 'AR-08-sign（同じ看板の円面が黒になる）と同じ面を使い、AR-08-fixture-dark-red の overlay 矩形（366,110,433,205）が看板を含むので、どちらも同プレイで共存させない。元の文字は原寸で判読不能で、変更後の文言は新規なので「元の文字と違う文字」を満たす。最寄り既存 overlay は AR-08-old-man-back（box 距離 30px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: CR-08-26（文字一字の左右反転）・CR-08-37（円面に青い点）は同じ看板の別変化。CR-08-26 は一字の反転、こちらは二行の文言差し替えで見え方が別。AR-08-sign（円面が黒）とは排他。他カメラの text_change（AR-06-menu-price-old の価格、AR-05 の数字）とは文言・場所が違う。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-sign（同じ円面）/ AR-08-fixture-dark-red（overlay の矩形が重なる）/ CR-08-26 / CR-08-37（同じ看板）。併存可=柱・床・左右の壁・天井の異変。

### AR-08-ceiling-domes-row — 天井に、黒い半球ドームが等間隔にずらりと並ぶ

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E01
- **型 / カテゴリ / フェーズ / 目立ち度**: multiply / camera / mid / medium
- **物と変化**: 写真に写る監視カメラ状の黒い半球ドームは右奥に一つと左奥に一つだけ。その数が増えて、左端の天井面に、同じ形の小さな黒い半球が奥へ向かって遠近に沿い、等間隔に五個並ぶ。どれも同じ向きでレンズがこちらを向く。数が『一つ二つ』から『ずらり』になる。ほかのカメラの multiply（通行人・天井灯の格子）と違い、見張る機械が増える。
- **box (x1,y1,x2,y2)**: (0,50,54,125)（54x75）
- **最寄り既存 overlay と実測距離**: AR-08-light-blue-bleed (30.0)、次点 AR-08-bag (54.0)。
- **6倍クロップ範囲**: 6倍クロップ (0,2)–(256,173)（256x171）。box は窓内で (0,288)–(324,738)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: five identical small black glossy hemispherical domes (surveillance-camera-like, each with a tiny round lens) are fixed to the pale speckled ceiling in the marked area at the left edge of the frame, in a straight row that follows the ceiling's perspective, getting smaller toward the corridor depth, equally spaced, all facing the camera. The ceiling texture, joints and speckles around them stay exactly as they are. The edit area is about x=0 to 324, y=288 to 738 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: add black hemispherical ceiling domes so that a row of five identical small domes sits on the ceiling at the left edge of the marked area: same black glossy material as the dome cameras seen elsewhere in this photograph, same tiny highlight, same short mount, evenly spaced along the perspective line. Nothing else changes. The edit area is about x=0 to 324, y=288 to 738 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: the ceiling at the left edge of the marked area has become a row of five identical black dome cameras, evenly spaced and converging with the ceiling perspective, each casting a soft tiny shadow on the ceiling. The row occupies only the marked area; all other ceiling and wall parts remain untouched. The edit area is about x=0 to 324, y=288 to 738 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 明るい灰色の天井に黒い塊が並ぶのでコントラストが高く、標準でも気づきやすい。subtle ではなく medium。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-ceiling-domes-row'
    candidate_id: 'AR-08-ceiling-domes-row'
    camera_id: 'CAM08'
    element_id: 'CAM08-E01'
    base_photo: 'public/images/cam8.webp'
    category: 'camera'
    anomaly_type: 'multiply'
    location: 'CAM08-E01 の左端の天井面、差分左上 (0,50) 付近（貼り込み後に再計測）'
    detail: '左端の天井面に、同じ黒い半球ドームが等間隔に五つ並ぶ。'
    overlay: 'assets/anomaly-overlays/cam08/ceiling-domes-row.webp'
    # phase / 目立ち度: mid / medium
    note: 'box は 54x75 と細長いが、天井板の面なので並べる配置で足りる。AR-08-ceiling-light-grid（天井一面の灯の格子）は大面積で併存可だが、同じ面で見た目が乱れるので同プレイで共存させない。最寄り既存 overlay は AR-08-light-blue-bleed（box 距離 30px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-ceiling-light-grid（天井灯の multiply）は灯、こちらは黒いドーム。AR-08-vent-paper-plug（右奥のドームを塞ぐ）とは別。台帳の multiply は人・灯・引き出しで、ドームの増殖は無い。CR-08-28（天井の斑点の同心円）は斑点で別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-ceiling-light-grid（同じ天井面）/ AR-08-ceiling-dome-on-wall / AR-08-ceiling-hole-upside-corridor（天井の左上の面）。併存可=床・右壁・柱の異変。大面積（AR-08-ceiling-light-grid）とは box が重なっても併存可。

### AR-08-wall-gecko — 右の暗いガラス壁に、小さなヤモリが張り付く

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E14
- **型 / カテゴリ / フェーズ / 目立ち度**: add_creature / object / early / medium
- **物と変化**: 右の黒青灰色の艶のある壁の上部に、淡い黄緑色の小さなヤモリ（家守）が一匹、頭を下にして張り付く。体長は box の幅ほど（約 45px）。他カメラの小動物（猫・雀）と違い、壁面に貼り付く爬虫類。屋内の地下街にいるはずのない生き物という違和感。
- **box (x1,y1,x2,y2)**: (476,138,530,180)（54x42）
- **最寄り既存 overlay と実測距離**: AR-08-suit (31.0)、次点 AR-08-sign (36.0)。
- **6倍クロップ範囲**: 6倍クロップ (375,73)–(631,244)（256x171）。box は窓内で (606,390)–(930,642)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: a small pale yellow-green gecko is clinging head-down on the glossy dark blue-grey glass wall in the marked area, about 45 px long in the source (about 270 px in this frame), with a thin curved tail and tiny splayed toes, softly reflecting the ceiling light on its back. One gecko only. The wall and everything around it stay unchanged. The edit area is about x=606 to 930, y=390 to 642 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: add one small gecko (a pale greenish lizard with splayed toe pads) stuck to the dark glossy wall surface in the marked area, body slanted downward, tail curled, a faint soft reflection of it in the wall gloss. Natural size relative to the wall panel, no cast shadow beyond a soft dark halo. Nothing else is added. The edit area is about x=606 to 930, y=390 to 642 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: a single gecko sits motionless on the black-blue wall in the marked area, pale green with darker mottling, facing down and slightly toward the camera, lit by the same cool light as the wall. Keep the wall panel joints, gloss and the dark vertical edge next to it exactly as they are. The edit area is about x=606 to 930, y=390 to 642 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 暗い壁に淡い色の小さな体なので、コントラストは取れる。体は約 45x20px で、25 以上の画素 100 以上は満たす見込み。通らなければ体を大きく、薄い黄色を強める。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-wall-gecko'
    candidate_id: 'AR-08-wall-gecko'
    camera_id: 'CAM08'
    element_id: 'CAM08-E14'
    base_photo: 'public/images/cam8.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM08-E14 の右の暗いガラス壁の上部、差分左上 (476,138) 付近（貼り込み後に再計測）'
    detail: '右の暗いガラス壁の上部に、淡い黄緑色の小さなヤモリが一匹張り付く。'
    overlay: 'assets/anomaly-overlays/cam08/wall-gecko.webp'
    # phase / 目立ち度: early / medium
    note: '壁の上部（天井の際の下、x 476〜530）を使う。最寄り既存 overlay は AR-08-suit（box 距離 31px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-cat・AR-08-pillar-sparrow と同じ add_creature だが、種類・場所（壁）・見え方が別。台帳の add_creature は他カメラの猫・蜘蛛・雀等で、ヤモリは無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=なし。併存可=AR-08-wall-drawers（大面積）を含む他の異変。大面積（AR-08-ceiling-light-grid・AR-08-wall-drawers）とは box が重なっても併存可。

### AR-08-floor-tortoise — 右手前の床に、小さな亀が一匹いる

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E16
- **型 / カテゴリ / フェーズ / 目立ち度**: add_creature / object / mid / medium
- **物と変化**: 右手前の床タイルの上に、緑がかった茶色の甲羅の小さな亀（縁日で売るような、手のひら大）が一匹、こちらに頭を向けて止まっている。体は 45px 弱で、甲羅の艶に天井灯の小さな反射が一点入る。床に接地影を落とす実体として描く。
- **box (x1,y1,x2,y2)**: (630,735,675,785)（45x50）
- **最寄り既存 overlay と実測距離**: AR-08-n5 (30.0)、次点 AR-08-column-door-ajar (51.0)。
- **6倍クロップ範囲**: 6倍クロップ (419,674)–(675,845)（256x171）。box は窓内で (1266,366)–(1536,666)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: a small tortoise (a hand-sized pond turtle, olive-brown shell with a faint pattern, pale yellowish head and four short legs) sits on the grey floor tile in the marked area at the bottom right, head toward the camera, with a small bright reflection of the ceiling light on its shell and a soft dark contact shadow on the floor tile beneath it. One animal only; tile joints, speckles and surrounding reflections are unchanged. The edit area is about x=1266 to 1536, y=366 to 666 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: add one small turtle to the floor in the marked area (bottom right of the crop), seen from a high angle: dome shell about 45 px wide in the source (about 270 px in this frame), head slightly raised, tiny contact shadow. The floor's speckled grey granite texture continues around it exactly as before. The edit area is about x=1266 to 1536, y=366 to 666 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: a single small turtle rests on the floor tile in the marked area, olive-green shell with darker scute lines, one tiny highlight on the shell, soft grounded shadow. It looks like a real animal that wandered into the closed arcade. Nothing else is added or moved. The edit area is about x=1266 to 1536, y=366 to 666 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 灰色の床に緑茶色の生き物が乗るので、標準でも見える。右手前の端に寄るので、box は画面の縁（x 675）に接する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-floor-tortoise'
    candidate_id: 'AR-08-floor-tortoise'
    camera_id: 'CAM08'
    element_id: 'CAM08-E16'
    base_photo: 'public/images/cam8.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM08-E16 の右手前の床タイル、差分左上 (630,735) 付近（貼り込み後に再計測）'
    detail: '右手前の床タイルの上に、小さな亀が一匹いる。'
    overlay: 'assets/anomaly-overlays/cam08/floor-tortoise.webp'
    # phase / 目立ち度: mid / medium
    note: '右手前の床（x 630〜675 の細い帯）に置く。画面右端に接する。最寄り既存 overlay は AR-08-n5（box 距離 30px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-cat・AR-08-pillar-sparrow・AR-08-wall-gecko と同じ add_creature だが、種類・場所・見え方が別（亀は床で動かない）。台帳の他カメラの add_creature（猫・蜘蛛等）に亀は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=なし。併存可=他の床の異変（箱の AR-08-n5 とは約 30px 離れる）。大面積（AR-08-floor-water-mirror）とは box が重なっても併存可。

### AR-08-corridor-apron-back — 奥の明るい通路の入口に、白い割烹着の後ろ姿の人が立つ

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E08
- **型 / カテゴリ / フェーズ / 目立ち度**: add_person / person / late / medium
- **物と変化**: 左奥の明るい通路の入口、白飛びした壁と窓枠の前の床に、白い割烹着に紺のもんぺ姿の小柄な女性の後ろ姿が一人立ち、奥の光のほうを向いている。顔は見えない（後ろ姿）。丈は 60px ほど。AR-08-old-man-back（中央奥の細い通路の老人の後ろ姿）と違う通路・服装・性別。
- **box (x1,y1,x2,y2)**: (222,265,250,330)（28x65）
- **最寄り既存 overlay と実測距離**: AR-08-pillar-notice (32.0)、次点 AR-08-barber-pole (34.0)。
- **6倍クロップ範囲**: 6倍クロップ (108,212)–(364,383)（256x171）。box は窓内で (684,318)–(852,708)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: a small woman seen from behind stands on the floor at the entrance of the bright corridor in the marked area, wearing a white cooking apron over navy work trousers (monpe) and a plain headscarf, her hands at her sides, facing the glare of the far corridor; about 60 px tall in the source (about 360 px in this frame). She is a dim silhouette against the white glare, with a soft thin shadow on the floor. No face visible. The wall and window frames behind her are unchanged. The edit area is about x=684 to 852, y=318 to 708 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: add one person, a short woman in a white apron and navy trousers viewed from behind, standing still on the floor just in front of the white wall and window frames in the marked area, as seen from far away: simple shapes, dark navy lower body and bright white upper body, soft edges from the glare. Add nothing else. The edit area is about x=684 to 852, y=318 to 708 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: a lone figure stands at the bright corridor's mouth in the marked area: an elderly woman from behind, small and straight, white apron, dark trousers, hair tied under a cloth, a thin soft shadow stretching toward the camera on the floor. The scene's lighting, glare and reflections remain exactly as in the source. The edit area is about x=684 to 852, y=318 to 708 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 白飛びした背景の前の暗い下半身が目立つ。上半身の白は背景に溶けやすい。check-visibility で上半身が背景と同化しすぎないか確認する（通らなければ割烹着を薄いクリーム色にして背景との差を取る）。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-corridor-apron-back'
    candidate_id: 'AR-08-corridor-apron-back'
    camera_id: 'CAM08'
    element_id: 'CAM08-E08'
    base_photo: 'public/images/cam8.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM08-E08 の左奥の明るい通路の床、差分左上 (222,265) 付近（貼り込み後に再計測）'
    detail: '左奥の明るい通路の入口の床に、白い割烹着の女性の後ろ姿が一人立つ。'
    overlay: 'assets/anomaly-overlays/cam08/corridor-apron-back.webp'
    # phase / 目立ち度: late / medium
    note: 'box の左（床屋サインの AR-08-barber-pole）と右（柱）に挟まれる狭い床。最寄り既存 overlay は AR-08-pillar-notice（box 距離 32px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-old-man-back（中央奥の老人）・AR-08-suit（壁に映る背広の反射）と同じ person だが、場所（左奥の通路）・服装・性別が別で、実体の立つ人。CR-08-08（通路が直角に折れる surreal）とは同じ通路でも変化が別。台帳の add_person に割烹着は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-old-man-back（同じ地下街に二人の後ろ姿が並ぶと物語上の意味が薄れる）。併存可=柱・床・右壁・天井の異変。大面積（AR-08-floor-water-mirror・AR-08-stacked-crt-tvs）とは box が重なっても併存可。

### AR-08-column-face — 右端の黒い柱の暗がりに、白い顔だけが浮かぶ

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E15
- **型 / カテゴリ / フェーズ / 目立ち度**: add_person / person / late / obvious
- **物と変化**: 右端の黒い四角柱の上部、光る乳白パネルの上の暗がりに、色白の女性の顔だけが、首から下を持たずに浮かんでいる。目を閉じた無表情で、肩も腕もない。顔は 40px ほど。AR-08-suit（人の後ろ姿の反射）と違い、正面を向く顔の直接の姿。
- **box (x1,y1,x2,y2)**: (590,176,640,212)（50x36）
- **最寄り既存 overlay と実測距離**: AR-08-panel-off (30.0)、次点 AR-08-wall-band-wave (33.0)。
- **6倍クロップ範囲**: 6倍クロップ (419,108)–(675,279)（256x171）。box は窓内で (1026,408)–(1326,624)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: a pale expressionless woman's face, eyes closed, no neck and no body, floats in the dark black upper part of the right pillar above the glowing cream panel, in the marked area: about 40 px wide in the source (about 240 px in this frame), lit dimly from below by the cream panel's glow, soft edges fading into the black. One face only. The pillar and the panel below stay exactly as they are. The edit area is about x=1026 to 1326, y=408 to 624 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: add a single pale human face (a woman, closed eyes, calm blank expression, dark hair fading into the black) that emerges from the dark of the black pillar just above the upper glowing panel, in the marked area; the lower edge of the face fades into darkness with no neck. Nothing else changes. The edit area is about x=1026 to 1326, y=408 to 624 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: in the marked area at the top of the black right pillar, a pale face is faintly visible, eyes closed, as if reflected in a black glass pane, but with no body anywhere: soft cool light on the cheeks, hair merging with the dark. The glowing panels and pillar edges remain the same. The edit area is about x=1026 to 1326, y=408 to 624 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 真っ黒の柱に白い顔が浮かぶので、標準でも見える。box は 50x36 と小さいが、面積比の基準（面積の 25% が強く変わる）で通る見込み。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-column-face'
    candidate_id: 'AR-08-column-face'
    camera_id: 'CAM08'
    element_id: 'CAM08-E15'
    base_photo: 'public/images/cam8.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM08-E15 の黒い柱の上部、光る上段パネルの上、差分左上 (590,176) 付近（貼り込み後に再計測）'
    detail: '右端の黒い柱の上部の暗がりに、白い女性の顔だけが浮かぶ。'
    overlay: 'assets/anomaly-overlays/cam08/column-face.webp'
    # phase / 目立ち度: late / obvious
    note: 'box は光る上段パネル（AR-08-panel-off の box、y 242〜）の上の暗がりに収める。最寄り既存 overlay は AR-08-panel-off（box 距離 30px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-suit・AR-08-old-man-back と同じ person だが、顔だけが暗がりに浮かぶ別の見え方。CR-08-11（第三の発光パネル）・AR-08-panel / panel-off は光るパネルの変化で別。台帳に顔だけが現れる person は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-panel-off / AR-08-panel（同じ柱の光る面。顔の見え方が変わる）。併存可=天井・床・左の異変。大面積（AR-08-wall-drawers）とは box が重なっても併存可。

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
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-ceiling-light-grid / AR-08-ceiling-domes-row（天井の左上の面）。併存可=柱・床・右壁の異変。大面積（AR-08-ceiling-light-grid）とは box が重なっても併存可。

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
