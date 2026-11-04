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
| CR-05-05 | CAM05-E09 | 右端のカーテンの隙間に、細い指のような影が一本見える。       | person / mid / medium        |
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

## 制作仕様（未制作）— CAM 06

CAM06（Shop Front Row）の画像異変 7 件の**制作仕様**（#47。台帳の偏り是正が目的）。物・変化・配置（box／polygon）・生成プロンプトまで確定済みで、まだ生成していない。採用して制作に進む時は、その項を削除して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。ここの box は作業用の最終値で、台帳には最終 overlay の alpha bbox から出た `overlay_origin` / `dimensions` を入れる。

| ID | タイプ | カテゴリ | 規模 | 変化 |
| --- | --- | --- | --- | --- |
| AR-06-floor-kidshoes | multiply | surreal | 大面積（床一面） | 前景の床一面に無地の子供の靴が揃えて無数に並ぶ（つま先は通路の奥） |
| AR-06-door-gap-light | state_change | environment | 小物 | 右の扉の下の隙間から暖かい橙色の光が漏れる |
| AR-06-long-shadow | add_person | person | 小物 | 持ち主のいない人の形の長い影が床に伸びる |
| AR-06-wall-gecko | add_creature | object | 小物 | 右の粗い壁にヤモリが一匹張り付く |
| AR-06-tile-sky | surreal | surreal | 小物 | 床タイル1枚が抜けて青空が見える |
| AR-06-pigeon | add_creature | object | 小物 | 暗い前景の床に灰色の鳩が一羽立つ |
| AR-06-wall-height-marks | add_object | object | 小物 | 右壁に子供の背比べのような色鉛筆の横線が刻まれる |

- **配分**: 7件中 add_object は1件、color_shift は0件（台帳の偏り是正）。multiply / state_change / add_person / add_creature×2 / surreal が6件。
- **配置の実測**（2026-11-05）: 小物の box は、`anomalies.yaml` の CAM06 全 overlay の**実際の alpha bbox**（overlay 画像の alpha>0 の範囲）から**矩形間距離 30px 以上**あることを `uv run --with pyyaml --with numpy --with pillow python3` で実測した（README「配置の基準」）。本節の小物どうしも 30px 以上（AR-06-long-shadow と AR-06-tile-sky は 30.0px ちょうど。最終 alpha bbox で測り直し、割れたら動かす）。既存の大面積（AR-06-wall-puddle・AR-06-ceiling-umbrellas・AR-06-wall-same-poster）は小物の距離計算から除いた（大面積とは重なってよい）。
- **大面積の重なり**: 本節の大面積は AR-06-floor-kidshoes の1件のみ。既存の大面積とは面が違う（天井一面・右壁一面・床の中ほど y432-634 に対し、本案は前景の床 y≥664 で 30px 空ける）ため重ならない。小物（AR-06-wet-footprints・AR-06-red-bucket・AR-06-styrofoam-box と本節の AR-06-long-shadow・AR-06-tile-sky・AR-06-pigeon）とは重なるが、ゲームは1カメラにつき未検出の異変を同時に1件しか出さない（`spawnAnomaly`）ので、台帳 note に「大面積」「同プレイで共存させない」と書く。
- **共通手順**（小物。`.agents/skills/corona-road-anomaly/SKILL.md` の手順 5〜8 と同じ）:
  1. 各項の「6倍クロップ」を `public/images/cam6.webp`（675x900）から切り出し、1536x1024 へ拡大する（webp は PNG に変換してから渡す）。
  2. 明示的な `$imagegen` で各項のプロンプトを3テイク生成し、目視で選ぶ。0バイトや数KBの壊れた PNG は撮り直す。文字・ロゴらしき刻印が出たテイクは捨てる。
  3. 選んだ結果を元のクロップ寸法へ縮小して baseline PNG の同じ位置へ貼り戻し、その全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。
  4. 最終 overlay の alpha bbox で既存との距離を測り直す。台帳へ登録し `check-visibility.py` を通す。通らなければ強めて作り直すか、この節へ戻す。
  5. 登録・コミットしたら `experiments/` 配下の作業物を即削除する。
- **大面積の手順**: 後述の AR-06-floor-kidshoes を参照（`scripts/composite-polygon.py` の `crop` → imagegen → `restore` → `cutout`）。

### AR-06-floor-kidshoes — 前景の床一面に揃えて並ぶ子供の靴（大面積）

- **camera / element_id**: CAM06 / CAM06-E16
- **物と変化**: 前景の床（タイル面）の一面に、無地の子供用の靴（運動靴・布靴・長靴。ロゴ・文字・柄なし）が、左右そろえた一足ずつ、つま先を通路の奥へ向けて、玄関のようにきちんと並ぶ。靴だけで人は写さない（行方不明の子供の気配。story.md の「4人目の子供」に沿う不気味さ。Exit 8 のような「同じものが面一面に並ぶ」型）。色は鈍い紺・赤・白・黄を混ぜる
- **面**（baseline px。polygon）: `165,664 585,664 645,900 0,900 0,750 156,750`（床の前景。左は観葉植物の鉢 AR-06-tin-planter の下端 y743 を避けて y750 から、右は壁の巾木の線、奥は y664）。面積 131,337 px²（画像 607,500 px² の 21.6%。大面積の目安 約76,000px² 以上を満たす）。`composite-polygon.py cutout --polygon` にこの値を渡す
- **3:2 窓**（baseline px）: `0,450,675,900`（675x450 ちょうど3:2。1536x1024 へ拡大して imagegen に渡し、`restore --crop 0,450,675,900` で貼り戻す。縦に割る必要はなく1窓で足りる）
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 3:2 (1536x1024) crop of a low-fi surveillance camera photo showing the lower half of a shop corridor. Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every wall, plant, shop front, shadow and the long white fluorescent reflection band exactly unchanged. Make ONLY this single change: cover the grey granite floor tiles in the near part of the frame (the floor in the lower 55% of the image, from the bottom edge up to roughly the middle) with dozens of pairs of plain small children's shoes (sneakers, canvas shoes and rubber boots in dull navy, red, white and yellow), each pair neatly lined up with the left and right shoe side by side and the toes pointing toward the far end of the corridor, arranged in tidy rows that follow the tile joints, large near the bottom edge and smaller toward the back, with a dark contact shadow under every shoe. Every shoe is completely plain: no logos, no stripes, no marks. Completely plain and unmarked: do not add any text, letters, numbers, logos or printed patterns anywhere in the image. Do not touch the left plant and its pot, the walls, the baseboard on the right, the door or the metal strips. No person or foot is visible. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 3:2 (1536x1024) crop of a low-fi surveillance camera photo showing the lower half of a shop corridor. Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every wall, plant, shop front, shadow and the long white fluorescent reflection band exactly unchanged. Make ONLY this single change: fill the foreground floor, from the bottom edge up to about the middle of the frame, with a dense field of small kids' shoes set down in pairs as if left at a house entrance, all toes pointing away from the camera toward the back of the corridor, in neat rows that follow the floor tiles. Mix plain dark blue canvas shoes, red sneakers, white sneakers and yellow rain boots, all without any pattern or logo. They shrink toward the back following the floor perspective, and each pair has a clear dark shadow so that it reads against the grey tiles. Completely plain and unmarked: do not add any text, letters, numbers, logos or printed patterns anywhere in the image. Do not touch the left plant and its pot, the walls, the baseboard on the right or the door. No person is visible. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 3:2 (1536x1024) crop of a low-fi surveillance camera photo showing the lower half of a shop corridor. Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every wall, plant, shop front, shadow and the long white fluorescent reflection band exactly unchanged. Make ONLY this single change: line up a huge number of pairs of plain children's shoes on the floor of the near half of the frame, in strictly aligned rows and columns following the tile grid, every pair facing the far end of the corridor, close together but not overlapping. Shoes are small, dull-colored (navy, red, white, mustard yellow), completely plain with no logos or stripes, each with a distinct dark contact shadow. Large in the foreground and small toward the back following the perspective. Completely plain and unmarked: do not add any text, letters, numbers, logos or printed patterns anywhere in the image. Do not touch the left plant and its pot, the walls, the baseboard on the right or the door. No person is visible. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・壁・植物・店先・蛍光灯の反射帯。polygon の外（奥の床・壁・植物の鉢）には靴を出させない（出たら polygon が切り落とす）。
- **合成**: `restore` で貼り戻した全体画像を `--gen` に、上の polygon を `cutout`（`--feather 2`）へ。生成が polygon の外へ延びても polygon が正。靴が画像の端で切れても構わない。生成が靴を並べきれない・不揃いな場合は、`tile` で別生成の靴1足の素材を polygon に敷く方法に切り替える（`--layout grid`）。
- **最寄り既存 overlay と実測距離**: 既存の大面積 AR-06-wall-puddle（(135,432)-(675,634)）とは 30px 空ける（polygon 上端 y664）。小物は重なってよい（AR-06-wet-footprints・AR-06-red-bucket・AR-06-styrofoam-box と本節の小物）。同じ面の複数の異変は同時に出ない。
- **分類 / フェーズ / 目立ち度**: surreal / late / obvious
- **視認性の注意**: 暗い靴の色は暗い床に沈みやすいので、白・赤・黄を多めにし、足元に濃い接地影を。標準状態の面積比で十分通る見込み。登録後に `uv run scripts/check-visibility.py --id AR-06-floor-kidshoes` を必ず通す。
- **台帳登録案**: `id: 'AR-06-floor-kidshoes'` / `candidate_id: 'AR-06-floor-kidshoes'` / `element_id: 'CAM06-E16'` / `category: 'surreal'` / `anomaly_type: 'multiply'` / `location: '前景の床一面（polygon 165,664 585,664 645,900 0,900 0,750 156,750）'` / `detail: '前景の床一面に、無地の子供の靴が揃えて無数に並ぶ（つま先は通路の奥）'` / `phase: late` / 目立ち度 obvious / note: 「大面積。同プレイで AR-06-wet-footprints・AR-06-red-bucket・AR-06-styrofoam-box とは共存させない（1カメラ1件）。最寄りの既存大面積 AR-06-wall-puddle と 30px 空ける。」
- **相互参照 / 重複精査**: AR-02-floor-footprints（CAM02 の床一面の靴・草履の足跡。『足跡』という痕跡）と AR-02-leather-footprints は痕跡で、本案は靴という物そのもの。CAM05 の床一面の白い折り鶴（`floor-white-cranes`、白い紙の群れ）とは物（靴 vs 紙）・色・意味が違い、床一面に敷くという型だけが共通する意図的な近縁。CAM01 の CR-NEW-01-02（床に黄色い長靴が一足）は1足の小物で、本案は面一面（CAM が違う）。CAM06 内では AR-06-wet-footprints（反射帯の濡れた裸足の足跡）と違い、靴の物体で面も広い。

### AR-06-door-gap-light — 右の扉の下の隙間から漏れる暖かい光

- **camera / element_id**: CAM06 / CAM06-E15
- **物と変化**: 右壁の黒枠の扉の下の隙間から、暖かい橙色の光が細く漏れて、扉の足元の床に光の筋が広がる（扉の向こうに灯りの点いた部屋がある。人は写さない）
- **最終 box**（baseline px）: `548,596,620,672`（72x76）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,548,675,719`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (129,48)-(201,124)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the right side of the frame, at the bottom of the dark brown door set in the right rough wall, a thin strip of warm orange incandescent light leaks out from the gap under the door and spreads as a soft glowing wedge onto the floor right in front of the door and along the skirting board. The door itself, its frame and handle stay closed and unchanged. The light should clearly read as warm orange against the cold blue-grey scene, about 1.5x stronger than natural. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the long white fluorescent reflection band on the floor, the tile joints, the rough wall texture or the door handles. Place the object, including its shadow, centered at about 64% from the left and 50% from the top of the image, occupying roughly 28% of the image width and 44% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: at the foot of the closed dark brown door on the right wall, make a bright warm amber glow seep through the narrow gap between the door and the floor, casting a long soft orange light trail across the floor tiles and the skirting board. No one is visible, no shadow of a person, the door stays shut. Make the glow vivid so it is clearly visible at CCTV quality. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the long white fluorescent reflection band on the floor, the tile joints, the rough wall texture or the door handles. Place the object, including its shadow, centered at about 64% from the left and 50% from the top of the image, occupying roughly 28% of the image width and 44% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: the closed dark door on the right wall now has a warm yellow-orange light shining from beneath it, as if a lit room lay behind the door: a bright thin line under the door and a fan-shaped orange light pool on the floor and skirting board in front of it. Keep the door closed. Give the light pool a soft gradient that fades into the cold grey tiles, strong enough to be seen at a glance. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the long white fluorescent reflection band on the floor, the tile joints, the rough wall texture or the door handles. Place the object, including its shadow, centered at about 64% from the left and 50% from the top of the image, occupying roughly 28% of the image width and 44% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特にthe long white fluorescent reflection band on the floor, the tile joints, the rough wall texture or the door handles（英語プロンプトの Do not touch に同じ）。
- **最寄り既存 overlay と実測距離**: AR-06-wet-footprints まで 42.0px（box 基準・矩形間のユークリッド距離。次点: AR-06-red-bucket 47.0px）。最終 overlay の alpha bbox で再測定する（30px を割れば動かす）。
- **分類 / フェーズ / 目立ち度**: environment / mid / medium
- **視認性の注意**: 暖色の橙は青灰色の床と強く対比する。光だまりを淡くしすぎない（標準状態で差分25以上の画素が100以上になる程度の濃さ）。つまみは明るさを下げると光の筋が際立つ。 登録後に `uv run scripts/check-visibility.py --id AR-06-door-gap-light` を必ず通す。
- **台帳登録案**: `id: 'AR-06-door-gap-light'` / `candidate_id: 'AR-06-door-gap-light'` / `element_id: 'CAM06-E15'` / `category: 'environment'` / `anomaly_type: 'state_change'` / `location: '右の扉の下の隙間から漏れる暖かい光（box 548,596,620,672）'` / `detail: '右の黒枠の扉の下の隙間から暖かい橙色の光が漏れ、足元の床に光の筋が広がる（扉は閉じたまま）'` / `phase: mid` / 目立ち度 medium / note: state_change（扉の向こうの灯り）。昭和の「閉店後も誰かが残っている」気配。最寄り既存 id と最終 alpha bbox の実測距離も note に書く。
- **相互参照 / 重複精査**: AR-06-reopened（CAM06 左の店先ガラスの向こうに喫茶店の灯りが戻る）は同じ「暖かい灯り」だが、場所（左のガラス vs 右の扉の足元）・見え方（ガラス奥の灯り vs 床に漏れる光の筋）・タイプが違う。CAM03 の CR-03-12（シャッターの隙間が真っ暗）は暗部で逆の方向。CR-06-18（扉の取手の左右）とは別。同一カメラで AR-06-wet-footprints の反射帯と見間違えないよう、扉の足元の局所の光にとどめる。

### AR-06-long-shadow — 持ち主のいない長い人影

- **camera / element_id**: CAM06 / CAM06-E16
- **物と変化**: 床のタイルの上に、人の形をした長い影だけが、通路の奥へ向かって伸びる（頭・肩・腕・脚の輪郭。本体は写らない。カメラの後ろに誰かが立っている想定）
- **最終 box**（baseline px）: `205,610,366,676`（161x66）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `158,558,414,729`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (47,52)-(208,118)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the floor tiles in the center of the frame, cast the long soft-edged dark shadow of a standing person (visible head, shoulders, hanging arms and two legs, strongly foreshortened and stretched along the floor away from the camera toward the back of the corridor, as if a person is standing just behind the camera). Only the shadow exists: no person, no body, no object that could cast it. The shadow is dark charcoal, about 1.3x longer than natural, and it lies across the tile joints following their perspective. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the A-frame menu board, the box and the white reflection band to the right, the plant at the far left or the wall base. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 63% of the image width and 39% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: add a large human-shaped shadow lying across the floor tiles of the corridor, with a round head, sloping shoulders, thin arms and long legs, stretched toward the far end of the corridor and following the perspective of the floor. No person is visible anywhere. Make the shadow a solid dark tone with a slightly blurred edge, strong enough to be clearly visible against the bright floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the A-frame menu board, the box and the white reflection band to the right, the plant at the far left or the wall base. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 63% of the image width and 39% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: paint a single elongated shadow of a man standing with arms down, laid flat on the floor tiles pointing away from the camera, ending near the middle of the corridor. The silhouette shows head, neck, shoulders, arms and legs. Nobody and nothing is there to cast it. Keep the shadow dark and clearly readable, with the tile joints faintly continuing across it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the A-frame menu board, the box and the white reflection band to the right, the plant at the far left or the wall base. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 63% of the image width and 39% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特にthe A-frame menu board, the box and the white reflection band to the right, the plant at the far left or the wall base（英語プロンプトの Do not touch に同じ）。
- **最寄り既存 overlay と実測距離**: AR-06-styrofoam-box まで 30.0px（box 基準・矩形間のユークリッド距離。次点: AR-06-wet-footprints 30.0px / AR-06-tile-sky（本節）30.0px）。最終 overlay の alpha bbox で再測定する（30px を割れば動かす）。
- **分類 / フェーズ / 目立ち度**: person / mid / medium
- **視認性の注意**: 影は暗い灰色〜炭色で濃く。明るい床タイルの上なので差分は出やすい。足元がタイル目地に沿うように。つまみはコントラストを上げると輪郭が出る。 登録後に `uv run scripts/check-visibility.py --id AR-06-long-shadow` を必ず通す。
- **台帳登録案**: `id: 'AR-06-long-shadow'` / `candidate_id: 'AR-06-long-shadow'` / `element_id: 'CAM06-E16'` / `category: 'person'` / `anomaly_type: 'add_person'` / `location: '持ち主のいない長い人影（box 205,610,366,676）'` / `detail: '床のタイルに、人の形をした長い影だけが通路の奥へ向かって伸びる（持ち主は写らない）'` / `phase: mid` / 目立ち度 medium / note: add_person（影のみ）。カメラの後ろに誰かが立っている気配。フェーズは mid。最寄り既存 id と最終 alpha bbox の実測距離も note に書く。
- **相互参照 / 重複精査**: AR-06-reflection（ガラスに映る買い物客の後ろ姿）・AR-06-worker（通路奥の店員の後ろ姿）は『人の姿そのもの』、本案は『影だけ』。CR-06-42（反射帯の端に紙袋の影だけ）は物の影、本案は人の影で位置も違う。CAM04 の CR-04-11（ガラス反射の黒い人影）とは別カメラ・別の面。CAM02 の CR-02-06（黒板の脚と影のずれ）とも別。

### AR-06-wall-gecko — 右壁に張り付くヤモリ

- **camera / element_id**: CAM06 / CAM06-E15
- **物と変化**: 右の粗い壁に、淡い灰茶色のヤモリが一匹、壁を這うように張り付く（小さな爬虫類。無地の模様）
- **最終 box**（baseline px）: `622,290,672,345`（50x55）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,232,675,403`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (203,58)-(253,113)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the rough gray wall at the right edge of the frame, place one pale grey-brown house gecko clinging flat to the wall, head pointing diagonally up, all four splayed toes and the tail visible. Make it about 2x larger than real scale so that it reads clearly, with a short soft dark contact shadow under its body on the textured wall. Plain skin, no pattern or markings. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the dark door and its frame, the framed notice on the wall, the pinwheel or the rough wall texture elsewhere. Place the object, including its shadow, centered at about 89% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 32% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: a single Japanese house gecko (yamori) with a beige-grey body and splayed fingers is crawling horizontally across the rough wall at the right edge of the frame, tail curling slightly. About 2x the natural size, with a clear dark outline against the lighter wall texture and a thin cast shadow below it. No pattern, no markings. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the dark door and its frame, the framed notice on the wall, the pinwheel or the rough wall texture elsewhere. Place the object, including its shadow, centered at about 89% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 32% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: one gecko with a light brownish-grey body rests on the coarse wall surface at the right edge, body slightly twisted, head turned toward the camera, toes spread. About 2x bigger than real life, strong contrast against the wall and a defined dark shadow beneath it. Plain, unmarked skin. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the dark door and its frame, the framed notice on the wall, the pinwheel or the rough wall texture elsewhere. Place the object, including its shadow, centered at about 89% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 32% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特にthe dark door and its frame, the framed notice on the wall, the pinwheel or the rough wall texture elsewhere（英語プロンプトの Do not touch に同じ）。
- **最寄り既存 overlay と実測距離**: AR-06-tilted-notice まで 51.0px（box 基準・矩形間のユークリッド距離。次点: AR-06-blue-pinwheel 53.0px）。最終 overlay の alpha bbox で再測定する（30px を割れば動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 壁の粗いテクスチャに紛れやすいので、実寸の2倍大・暗い輪郭・短く濃い影で。色は壁より少し暗い灰茶。 登録後に `uv run scripts/check-visibility.py --id AR-06-wall-gecko` を必ず通す。
- **台帳登録案**: `id: 'AR-06-wall-gecko'` / `candidate_id: 'AR-06-wall-gecko'` / `element_id: 'CAM06-E15'` / `category: 'object'` / `anomaly_type: 'add_creature'` / `location: '右壁に張り付くヤモリ（box 622,290,672,345）'` / `detail: '右の粗い壁に、灰茶色のヤモリが一匹張り付く'` / `phase: mid` / 目立ち度 medium / note: add_creature。壁面の小動物（物の置き物と区別）。最寄り既存 id と最終 alpha bbox の実測距離も note に書く。
- **相互参照 / 重複精査**: CAM06 の AR-06-blue-pinwheel（壁に貼る小物）とは別物。生き物の案は既存の猫・鳥系（CR-06-25/26 は猫）と種が違う。他カメラの生き物（猫・鳥など）と見比べ、ヤモリは台帳に未登録（2026-11 時点で grep 済み）。

### AR-06-tile-sky — 床タイルが抜けて青空が見える

- **camera / element_id**: CAM06 / CAM06-E16
- **物と変化**: 床のタイルが一枚だけ四角く抜け落ち、穴の底に昼の青空と白い雲が見える（空間が反転したような不自然さ）
- **最終 box**（baseline px）: `300,515,366,580`（66x65）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `205,462,461,633`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (95,53)-(161,118)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the floor of the corridor in the center of the frame, replace exactly one square floor tile with a square hole whose bottom shows a bright daytime blue sky with a few soft white clouds, as if the tile were a window onto the sky. The hole follows the same perspective as the tile and the neighbouring joint lines, with a thin dark edge of depth on the far side. The sky is clearly brighter and bluer than anything else in the scene. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the other tiles, the neighbouring joint lines, the A-frame menu board, the white reflection band to the right or the left-hand shopfront. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 26% of the image width and 38% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: turn one single grey floor tile at the center of the frame into an opening showing a vivid blue summer sky with a small white cumulus cloud, seen as if looking straight down into the sky. Keep the exact tile outline and perspective, with the neighbouring tiles and joints intact, and a thin dark rim at the inner edge. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the other tiles, the neighbouring joint lines, the A-frame menu board, the white reflection band to the right or the left-hand shopfront. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 26% of the image width and 38% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: one floor tile in the middle of the corridor disappears and a square patch of clear blue sky with a streak of white cloud is visible instead, bordered by the original tile joints. Make the sky saturated so that it stands out clearly against the cold grey floor, and give the near edge a thin dark depth shadow. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the other tiles, the neighbouring joint lines, the A-frame menu board, the white reflection band to the right or the left-hand shopfront. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 26% of the image width and 38% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特にthe other tiles, the neighbouring joint lines, the A-frame menu board, the white reflection band to the right or the left-hand shopfront（英語プロンプトの Do not touch に同じ）。
- **最寄り既存 overlay と実測距離**: AR-06-wet-footprints まで 30.0px（box 基準・矩形間のユークリッド距離。次点: AR-06-reopened 32.0px）。最終 overlay の alpha bbox で再測定する（30px を割れば動かす）。
- **分類 / フェーズ / 目立ち度**: surreal / late / obvious
- **視認性の注意**: 青空の彩度と明度で差分は十分に出る見込み。タイル1枚分に収める（隣のタイルに広げない）。 登録後に `uv run scripts/check-visibility.py --id AR-06-tile-sky` を必ず通す。
- **台帳登録案**: `id: 'AR-06-tile-sky'` / `candidate_id: 'AR-06-tile-sky'` / `element_id: 'CAM06-E16'` / `category: 'surreal'` / `anomaly_type: 'surreal'` / `location: '床タイルが抜けて青空が見える（box 300,515,366,580）'` / `detail: '床のタイルが一枚だけ四角く抜け、穴の底に青空と白い雲が見える'` / `phase: late` / 目立ち度 obvious / note: surreal。昭和の「空の記憶」。1タイル限定。最寄り既存 id と最終 alpha bbox の実測距離も note に書く。
- **相互参照 / 重複精査**: CAM06 の AR-06-wall-puddle（水たまりが蛍光灯と壁を映す、大面積）は床の映り込み、本案は床が『抜ける』。CR-06-13/14（床タイルの水玉・淡い緑）は模様・色の変化で、空が見える穴ではない。他カメラの床の穴・空の案を検索したが、青空の穴は未登録。

### AR-06-pigeon — 床に降りた灰色の鳩

- **camera / element_id**: CAM06 / CAM06-E16
- **物と変化**: 前景の床に、灰色の鳩が一羽、タイルの上に立つ（屋内の通路にいるはずのない鳥。無地）
- **最終 box**（baseline px）: `20,775,150,885`（130x110）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,729,256,900`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (20,46)-(150,156)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark foreground floor tiles at the lower left of the frame, place one plain grey city pigeon standing on the floor, facing right, with a slightly puffed chest and a dark contact shadow under its feet. Make it about 1.5x larger than real scale so that it reads clearly against the dark floor. Natural feathers, no markings. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the left plant pot and its base, the box to the right, the tile joints or the blue bag at the left edge. Place the object, including its shadow, centered at about 33% from the left and 59% from the top of the image, occupying roughly 51% of the image width and 64% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: add one grey rock pigeon walking across the dark floor tiles in the lower left of the frame, head forward, one foot raised, neck feathers faintly iridescent. About 1.5x natural size, with a clearly lit body against the dark tiles and a dark contact shadow below it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the left plant pot and its base, the box to the right, the tile joints or the blue bag at the left edge. Place the object, including its shadow, centered at about 33% from the left and 59% from the top of the image, occupying roughly 51% of the image width and 64% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: a single pigeon stands still on the dark floor tiles in the lower left, body turned slightly toward the camera, with light grey feathers and a darker wing. About 1.5x larger than real life, strong highlights on its back for contrast, and a clear contact shadow beneath. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the left plant pot and its base, the box to the right, the tile joints or the blue bag at the left edge. Place the object, including its shadow, centered at about 33% from the left and 59% from the top of the image, occupying roughly 51% of the image width and 64% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特にthe left plant pot and its base, the box to the right, the tile joints or the blue bag at the left edge（英語プロンプトの Do not touch に同じ）。
- **最寄り既存 overlay と実測距離**: AR-06-tin-planter まで 32.0px（box 基準・矩形間のユークリッド距離。次点: AR-06-styrofoam-box 43.0px）。最終 overlay の alpha bbox で再測定する（30px を割れば動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 暗い床と灰色の羽の対比を確保するため、羽は明るめ（淡い灰）に。小さすぎると読めないので1.5倍。 登録後に `uv run scripts/check-visibility.py --id AR-06-pigeon` を必ず通す。
- **台帳登録案**: `id: 'AR-06-pigeon'` / `candidate_id: 'AR-06-pigeon'` / `element_id: 'CAM06-E16'` / `category: 'object'` / `anomaly_type: 'add_creature'` / `location: '床に降りた灰色の鳩（box 20,775,150,885）'` / `detail: '前景の床に、灰色の鳩が一羽立つ'` / `phase: mid` / 目立ち度 medium / note: add_creature。暗い前景の床（小物は広い面に置く方針に合致）。最寄り既存 id と最終 alpha bbox の実測距離も note に書く。
- **相互参照 / 重複精査**: CAM06 の CR-06-26（茶トラ猫が植物の足元に座る）は猫・別の場所、CR-06-12（葉の陰の人形のような生物）とも別。CAM03 の AR-03-white-cap のような床の小物とは物が違う。鳥の案は台帳に未登録（grep 済み）。

### AR-06-wall-height-marks — 右壁に刻まれた背比べの線

- **camera / element_id**: CAM06 / CAM06-E15
- **物と変化**: 右の粗い壁に、子供の背比べの印のような短い横線が何本か、下から上へ間隔をあけて刻まれる（赤鉛筆・青鉛筆の横線のみ。数字・文字なし）
- **最終 box**（baseline px）: `622,410,672,560`（50x150）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,400,675,571`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (203,10)-(253,160)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the rough gray wall at the right edge of the frame, draw a column of six short horizontal pencil marks, like a child's height chart, evenly spaced from bottom to top, each about 30 percent of the wall strip's width, alternating red colored pencil and dark graphite. The lines should be about 2x thicker than a real pencil line so that they read clearly, following the slightly slanted perspective of the wall. Only plain tick marks: no numbers, no letters, no writing. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the dark door and its frame, the gecko position above, the framed notice or the wall texture outside the marked strip. Place the object, including its shadow, centered at about 89% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 88% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: add a vertical set of seven short hand-drawn horizontal tick marks on the coarse wall at the right edge of the frame, like the growth marks of a child measured against a wall, in red and blue colored pencil, spaced about 20 px apart in the original photo scale and following the wall perspective. The lines are bold and clearly visible. No digits, no letters. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the dark door and its frame, the gecko position above, the framed notice or the wall texture outside the marked strip. Place the object, including its shadow, centered at about 89% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 88% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the rough wall strip at the right edge, scratch several short horizontal colored pencil lines (red, blue and graphite) stacked upward at slightly uneven spacing, like a record of a child growing taller. Make the lines thick and high contrast so they stand out from the wall texture. No numbers or characters, only the bare tick lines. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the dark door and its frame, the gecko position above, the framed notice or the wall texture outside the marked strip. Place the object, including its shadow, centered at about 89% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 88% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特にthe dark door and its frame, the gecko position above, the framed notice or the wall texture outside the marked strip（英語プロンプトの Do not touch に同じ）。
- **最寄り既存 overlay と実測距離**: AR-06-wall-stripes まで 59.0px（box 基準・矩形間のユークリッド距離。次点: AR-06-tilted-notice 106.9px）。最終 overlay の alpha bbox で再測定する（30px を割れば動かす）。
- **分類 / フェーズ / 目立ち度**: object / late / medium
- **視認性の注意**: 粗い壁の凹凸に紛れやすい細線は下限未満になりやすい。赤・青の鉛筆を2倍太に、明度差を付ける。下限未満なら本数を減らして太くする。 登録後に `uv run scripts/check-visibility.py --id AR-06-wall-height-marks` を必ず通す。
- **台帳登録案**: `id: 'AR-06-wall-height-marks'` / `candidate_id: 'AR-06-wall-height-marks'` / `element_id: 'CAM06-E15'` / `category: 'object'` / `anomaly_type: 'add_object'` / `location: '右壁に刻まれた背比べの線（box 622,410,672,560）'` / `detail: '右の粗い壁に、子供の背比べのような色鉛筆の横線が何本か刻まれる（数字・文字なし）'` / `phase: late` / 目立ち度 medium / note: add_object（印）。子供の気配。add_object 枠は本節でこの1件のみ。最寄り既存 id と最終 alpha bbox の実測距離も note に書く。
- **相互参照 / 重複精査**: CR-06-17（額入り掲示の横に紙が増える）は紙。CAM05 以降の壁の貼り紙・落書き系（制作済みの『古い貼り紙の剥がし跡』等）とは違い、本案は子供の背比べの線。4人目（子供）の気配として物語に沿う（story.md「4人目の子供」）が、令和テーマの印は付けない。

## 追加候補 — CAM 07

| 候補ID   | 対象ID    | 変化案                                             | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | -------------------------------------------------- | ---------------------------- |
| CR-07-13 | CAM07-E09 | 左階段の段が一段だけ減り段差が均等に再配分される。 | environment / mid / medium   |
| CR-07-14 | CAM07-E14 | 右階段の段が一段増え、手すりはそのまま残る。       | environment / mid / medium   |
| CR-07-15 | CAM07-E14 | 右階段の段が一段減り、最上部の高さは変わらない。   | environment / mid / medium   |
| CR-07-20 | CAM07-E12 | 白壁に小さな掲示が一枚増える。                     | object / early / medium      |
| CR-07-21 | CAM07-E01 | 天井板の一枚だけ淡い黄色になる。                   | environment / early / subtle |
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

## 追加候補 — 各要素の状態・関係（CR-XX-28〜42）

全件未制作。各行は単独の変化として扱う。反射や光の案は基準画像に実際に存在する光源・面を原寸で確認する。看板に関わる案は架空化済みの基準画像を作ってから具体的な文字や図柄を確定する。

| 候補ID   | 対象ID    | 変化案                                             | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | -------------------------------------------------- | ---------------------------- |
| CR-01-28 | CAM01-E02 | 小さな丸灯の周囲の色にじみだけ消える。             | environment / early / subtle |
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
- 方針: 序盤は小さく、中盤は確信でき、終盤はルール自体が壊れる構成にする（Observation Duty / Exit 8 系の反復空間の差分を参考）。

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
