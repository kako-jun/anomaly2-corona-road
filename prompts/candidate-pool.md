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
| AR-07-floor-frost | E16 床の中段 | surreal / state_change | **大面積** `76,352,675,537`（599x185） | late / obvious |
| AR-07-reflection-cut | E17 床左の白い反射 | surreal / state_change | `125,580,190,670`（65x90） | mid / medium |
| AR-07-tile-mirror | E16 床の左下 | surreal / state_change | `96,770,206,842`（110x72） | early / medium |
| AR-07-mini-door | E16（扉 E13 の縮小コピー） | surreal / duplicate | `240,560,286,638`（46x78） | mid / medium |
| AR-07-glass-crack | E06 左のガラス | environment / state_change | `2,570,46,680`（44x110） | mid / medium |
| AR-07-exit-sign-gone | E14 緑の非常灯 | object / remove_object | `592,128,618,158`（26x30） | late / medium |
| AR-07-ceiling-tile-yellow | E01 天井板（昇格 CR-07-21） | environment / color_shift | `440,12,500,46`（60x34） | early / subtle |

### AR-07-floor-frost（大面積）

- **カメラ**: CAM07、対象 CAM07-E16（広い灰色タイル床の奥〜中段。目地が格子状に並ぶ）。
- **物と変化**: 床の中段一面を、同じ高さまで薄い霜（白い微細な結晶の面）が覆う（surreal / state_change）。閉店した地下で床だけが凍っている不穏さ。霜の上端と下端は床の横線に沿って水平に揃い、「同じ高さまで」という人工的な線が異変の核になる。目地と照明の反射は霜の下／上に残り、壁・階段・扉は触らない。白い面は暗い床との差が大きく、視認性は十分。
- **box**: `76,352,675,537`（599x185）。台形（床の左縁に沿う）は `96,352 675,352 675,536 76,536`。**実測**（2026-11-05、PIL でこの台形を rasterize）: polygon 実面積 **108,963 px²**、alpha bbox 76,352–675,537（bbox 面積 110,815 px²、画像 675x900 の 18.2%）。どちらも大面積の目安 約 90,000 px² 以上。登録時は貼り込み後の alpha で再計測し、90,000 を割ったら登録しない。
- **最寄り既存の大面積と実測距離**（大面積どうしは重ねない）: AR-07-floor-uphill（alpha bbox 84,548–675,900）まで 11px、AR-07-wall-clocks（104,128–571,343）まで 9px、AR-07-ceiling-white-sheets（20,0–675,125）まで 227px。いずれも bbox は重ならない。AR-07-stairs（84,235–271,344）まで 8px、AR-07-stair-figures（588,190–626,325）まで 27px（どちらも壁・階段側で重ならない）。
- **排他（同プレイで共存させない。台帳 note に書く）**: 同じ床面に載る小物 AR-07-mask-on-floor（bbox 重なり）・AR-07-n1（下駄）・AR-07-n4（スマホ）、床へ光が漏れる AR-07-reopened（bbox 重なり）。併存可: 床下側の AR-07-floor-uphill・AR-07-purple-floor-tile・AR-07-tile-mirror・AR-07-mini-door 等、AR-07-wall-clocks、扉・階段。**AR-07-reflection-cut とは反射の見え方が競合するので同プレイでは片方だけ**（box は重ならないが排他）。
- **6倍ではなく 3:2 窓**: 全面を一度に見せるため `composite-polygon.py crop --base public/images/cam7.webp --crop 0,290,675,740`（675x450。y 290〜740。box を上下に含む。倍率は約 2.276）を 1536x1024 へ拡大して渡す。窓内の box は `(173,141)–(1536,560)`、台形は `(218,141) (1536,141) (1536,560) (173,560)`。
- **生成プロンプト（3 テイク）**:
   - テイク1:
     ```text
     $imagegen In this surveillance frame, cover the whole middle band of the grey tile floor with a thin layer of white frost at about x 173-1536, y 141-560 (frame pixels): the frost is a dense carpet of fine white ice crystals and feathery frost patterns, brighter than the floor, with a clean, nearly horizontal upper edge near y 141 where the frost stops, and a lower edge near y 560 where it stops, both edges slightly ragged. The floor joint grid stays faintly visible under the frost and the lamp reflections stay as soft highlights on top of it. No snow drifts, no footprints, no objects. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク2:
     ```text
     $imagegen In this surveillance frame, make a thin rime of white frost cover the whole middle band of the grey tile floor at about x 173-1536, y 141-560 (frame pixels): fine granular white crystals like sugar frost, an even pale-white layer that lets the tile joints show through as thin dark lines, a level upper edge near y 141 and a level lower edge near y 560, as if the cold stopped at the same height everywhere. Reflections stay as soft highlights. No objects, no footprints. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク3:
     ```text
     $imagegen In this surveillance frame, cover the whole middle band of the grey tile floor with white frost at about x 173-1536, y 141-560 (frame pixels): large fern-like white ice crystals growing across the tiles, denser and whiter toward the middle of the band and thinner toward its upper and lower edges, the edges at about y 141 and y 560 clearly level. Tile joints remain faintly visible and the lamp reflections stay on top. No objects, no footprints. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
- **仕上げ**: 選んだ結果を窓寸法へ縮小して貼り戻し、`composite-polygon.py cutout --base public/images/cam7.webp --gen <全画面.png> --polygon <台形のjson> --feather 2 --out assets/anomaly-overlays/cam07/floor-frost.webp`（台形の外は alpha 0 のまま）。
- **台帳登録案**: `id: 'AR-07-floor-frost'` / `camera_id: 'CAM07'` / `element_id: 'CAM07-E16'` / `category: 'surreal'` / `anomaly_type: 'state_change'` / `location: 'CAM07-E16 の中段、差分左上 (76,352) px'` / `detail: '床の中段一面が、同じ高さまで薄い霜（白い結晶の面）で覆われる'` / `phase: late` / `subtlety: 'obvious'` / `candidate_id: 'AR-07-floor-frost'`。note に大面積である旨、実測した polygon 実面積と alpha bbox、排他の列挙（上記）、同カメラの box 重なり表（登録時に出し直し）を書く。
- **相互参照 / 重複精査**: 大面積の近縁は AR-07-floor-uphill（床下側が坂になる）・AR-05-floor-white-cranes（CAM05・床一面の折り鶴）・AR-02-floor-footprints（CAM02・床一面の足跡）・AR-03-floor-tatami（CAM03・床が畳）。霜（結晶の薄膜・床の質感の変化）は台帳に無い。床にビー玉が散らばる案は台帳に AR-05-marbles-scattered と AR-08-floor-ramune-marbles が既にあり 3 件目になるため、この霜に差し替えた。CAM07 内に床の質感・温度の変化は無い。
### AR-07-reflection-cut

- **カメラ**: CAM07、対象 CAM07-E17（床左側の長い白色蛍光灯反射。`(115,462)–(200,748)` 付近。元画像で x 135〜185 の細長い白い帯）。
- **物と変化**: 床左の白い反射の帯の一部が、辺の真っ直ぐな四角形に切り取られ、その中だけタイル色（灰色の床と暗い目地）に戻る（surreal / state_change）。反射は物理的には四角く切れないので、「画像を切り抜いたような」違和感になる。切り抜きの縁は鋭く、軸に平行にそろえる。
- **box**: `125,580,190,670`（65x90）。帯の幅 約 40〜50px に左右の余白を足した範囲で、帯の高さ 90px ぶんを切る。最寄り既存 overlay（最終 alpha bbox）は AR-07-purple-floor-tile（267,703–433,849）まで **83.8px**、次点 AR-07-mask-on-floor 116.0px、AR-07-n1 131.0px。大面積 AR-07-floor-uphill とは bbox が重なる（小物と大面積。併存可）。大面積 AR-07-floor-frost の下端 y537 から 43px 離れるが、反射の見え方が競合するので**同プレイでは排他**。この節の他の box とは AR-07-mini-door まで 50.0px、AR-07-glass-crack まで 79.0px。
- **6倍クロップ**: 原画像 `(60,500)–(318,672)`（258x172）。box は窓内で `(387,476)–(774,1011)`。
- **生成プロンプト（3 テイク）**:
   - テイク1:
     ```text
     $imagegen In this surveillance frame, cut one clean rectangular piece out of the long white fluorescent floor reflection on the left part of the floor at about x 387-774, y 476-1011 (frame pixels): inside a sharp-edged rectangle with perfectly straight horizontal and vertical edges, the bright reflection is gone and the plain grey floor tiles with their dark joints show instead, as if a rectangle of the reflection had been cropped away; above and below the rectangle the white reflection continues unchanged, and the rectangle's edges are hard, not blurred. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク2:
     ```text
     $imagegen In this surveillance frame, remove a rectangular window out of the long white fluorescent floor reflection on the left part of the floor at about x 387-774, y 476-1011 (frame pixels): the rectangle is slightly taller than wide, with razor-sharp straight edges, and shows the plain grey tiles and dark tile joints exactly as the floor looks away from the reflection; the reflection stays bright and continuous above and below the rectangle. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク3:
     ```text
     $imagegen In this surveillance frame, make the long white fluorescent floor reflection on the left part of the floor lose one rectangular section at about x 387-774, y 476-1011 (frame pixels): in that rectangle the glare is replaced by the plain grey floor with its tile joints, the rectangle has hard straight edges that are not parallel to the tile joints' perspective but perfectly axis-aligned in the frame, and the rest of the reflection stays bright. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
- **視認性の想定**: 反射の白（輝度 200 超）をタイルの灰（90 前後）へ戻すので max 差は 100 以上、平均差も 3.0 を十分超える見込み。下限を割りそうなのは、切り抜きが小さすぎて「ただの反射の途切れ」に見える点（box の高さ 90px を縮めない）と、羽毛ぼかしで縁が甘くなり四角さが消える点（`--margin` は 8 から試し、縁が丸まるなら小さく）。登録後に `uv run scripts/check-visibility.py --id AR-07-reflection-cut` を通す。
- **台帳登録案**: `id: 'AR-07-reflection-cut'` / `camera_id: 'CAM07'` / `element_id: 'CAM07-E17'` / `category: 'surreal'` / `anomaly_type: 'state_change'` / `location: 'CAM07-E17 の周辺、差分左上 (125,580) px'` / `detail: '床左の白い反射の一部が四角く切り取られ、タイル色に戻る'` / `phase: mid` / `subtlety: 'medium'` / `candidate_id: 'AR-07-reflection-cut'`。note に最寄り既存 id と最終 alpha bbox 実測距離（制作後に再計測）、「人・動物は描かない。縁は鋭く軸に平行」を書く。
- **相互参照 / 重複精査**: 床の反射を扱う既存・候補は CR-07-10（左の長い反射が階段の壁面へ垂直に折れて上る。E17・surreal/late）。あちらは反射が壁へ**折れる**形の変化で、本件は反射が**四角く欠ける**形で、見る場所も発見の仕方も違う。同プレイで共存させない（排他。CR-07-10 を制作したら box が重ならないか再確認）。人の影の案（旧 AR-07-long-shadow）は他カメラの影の型と重なるため、この項に差し替えた。
### AR-07-tile-mirror

- **カメラ**: CAM07、対象 CAM07-E16（床の左下。反射の帯の左外にある暗いタイル）。
- **物と変化**: 床のタイル一枚だけが鏡になり、天井の照明を逆さに映す（surreal / state_change）。「目地の向きが他と逆になるタイルが 1 枚ある」案を検討したが、御影石の石目と目地の向きだけでは差が小さく視認性が下限を割る恐れが強いので、同じ型（床のタイル 1 枚の状態変化）でずっと大きく見える鏡のタイルに変えた。目地の格子と縁は周囲に揃えたまま、その 1 枚の中身だけが違う。
- **box**: `96,770,206,842`（110x72。手前寄りのタイル 1 枚。透視で平行四辺形になる）。最寄り既存 overlay（最終 alpha bbox）は AR-07-purple-floor-tile（267,703–433,849）まで **61.0px**、次点 AR-07-diamond-tile 155.3px、AR-07-floor-puddle 187.0px。大面積 AR-07-floor-uphill（bbox 重なり。小物と大面積。併存可）。この節の他の box とは 100px 以上離れる。**制作後に alpha bbox で再計測**。
- **6倍クロップ**: 原画像 `(60,700)–(318,872)`（258x172）。box は窓内で `(214,417)–(869,845)`。
- **生成プロンプト（3 テイク）**:
   - テイク1:
     ```text
     $imagegen In this surveillance frame, turn exactly one floor tile at about x 214-869, y 417-845 (frame pixels) into a mirror: the single tile surface becomes glossy black glass-like stone that reflects a bright inverted white fluorescent ceiling lamp (a bright white rectangle) and a little of the ceiling, while all the surrounding tiles stay the normal speckled grey. The tile's own edges and the dark joints around it stay exactly aligned with the grid, so only that one tile looks like a mirror. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク2:
     ```text
     $imagegen In this surveillance frame, make exactly one floor tile at about x 214-869, y 417-845 (frame pixels) mirror-like: it reflects a large soft white ceiling light as a clear bright shape and a dim blue-grey ceiling, much brighter and cleaner than the speckled grey tiles around it, its edges and the dark joints aligned with the normal tile grid. Nothing else on the floor changes. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク3:
     ```text
     $imagegen In this surveillance frame, change exactly one floor tile at about x 214-869, y 417-845 (frame pixels) so that it shows a clear upside-down reflection of the bright ceiling lamps as two bright white rectangles on a dark glossy surface, like a polished mirror inset into the floor, with its edges and the dark joints aligned to the normal tile grid. The neighbouring tiles stay speckled grey. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
- **視認性の想定**: 暗い床の上の白い映り込みなので max 差は 100 以上の見込み。平均差も、タイル 1 枚の面積全部が変わるので 3.0 を超える。下限を割りそうなのは、映り込みが暗くて「ただの黒いタイル」に見える場合（テイク 1 の黒御影寄り）で、そのときは映る照明を大きく・明るくして作り直す。登録後に `uv run scripts/check-visibility.py --id AR-07-tile-mirror` を通す。
- **台帳登録案**: `id: 'AR-07-tile-mirror'` / `camera_id: 'CAM07'` / `element_id: 'CAM07-E16'` / `category: 'surreal'` / `anomaly_type: 'state_change'` / `location: 'CAM07-E16 の左下、差分左上 (96,770) px'` / `detail: '床のタイル一枚だけが鏡になり、天井の照明を逆さに映す'` / `phase: early` / `subtlety: 'medium'` / `candidate_id: 'AR-07-tile-mirror'`。note に最寄り既存 id と最終 alpha bbox 実測距離（制作後に再計測）、「目地の向きが逆のタイル案は視認性が低く差し替えた」を書く。
- **相互参照 / 重複精査**: 床のタイル 1 枚を扱う既存は AR-07-purple-floor-tile（淡い紫に変色）・AR-07-diamond-tile（菱形になる）。色が変わるのでも形が変わるのでもなく、**質が鏡に変わる**点で別物。同じ床の下側にあるので、制作後に 3 枚が隣り合って見えないか確認する。他カメラに同型は無い。鳩の案（旧 AR-07-dove）は他カメラの生き物の型と重なるため、この項に差し替えた。
### AR-07-mini-door

- **カメラ**: CAM07、対象 CAM07-E16（床の左中段。複製元は中央右の灰色の金属扉 CAM07-E13）。
- **物と変化**: 奥の壁にある灰色の金属扉（灰色の扉板・暗い枠・横長の押し板・左の丸い取手・上部の細い小窓）と同じ扉が、4 分の 1 ほどの大きさで床に自立している。ドールハウスの扉のように、後ろに壁は無く、床に接地影が落ちる。「奥の扉へ行けない子供のための扉」という物語の裏読みが効く、サイズの違和感の surreal（duplicate）。
- **box**: `240,560,286,638`（46x78。扉の幅 約 32px・高さ 約 78px に影を含む）。最寄り既存 overlay（最終 alpha bbox）は AR-07-diamond-tile（348,617–486,707）まで **62.0px**、次点 AR-07-mask-on-floor 65.0px、AR-07-purple-floor-tile 65.0px。大面積 AR-07-floor-uphill とは bbox が重なる（小物と大面積。併存可）。この節の他の box とは AR-07-reflection-cut まで 50.0px。
- **6倍クロップ**: 原画像 `(134,513)–(392,685)`（258x172）。box は窓内で `(631,280)–(904,744)`。
- **生成プロンプト（3 テイク）**:
   - テイク1:
     ```text
     $imagegen In this surveillance frame, add one miniature copy of the grey metal door seen on the back wall (same grey panel, dark metal frame, one horizontal pale push-bar across the middle, a small round knob on the left side, a narrow horizontal window slit near the top) standing upright and free-standing on the grey floor tiles at about x 631-904, y 280-744 (frame pixels), with a visible thin dark frame depth and a soft dark contact shadow falling to the right on the floor. It is about a quarter of the size a real door would have at that distance, like a doll-house door, closed, with nothing leaning on it and no wall behind it. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク2:
     ```text
     $imagegen In this surveillance frame, add one miniature copy of the grey metal door seen on the back wall (same grey panel, dark metal frame, one horizontal pale push-bar across the middle, a small round knob on the left side, a narrow horizontal window slit near the top) standing upright and free-standing on the grey floor tiles at about x 631-904, y 280-744 (frame pixels), seen slightly from the left so a thin side edge of the frame is visible, a soft dark contact shadow falling to the right. It is about a quarter of the size a real door would have at that distance, closed, with no wall behind it, and it must look physically standing on the floor. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク3:
     ```text
     $imagegen In this surveillance frame, add one miniature copy of the grey metal door seen on the back wall (same grey panel, dark metal frame, one horizontal pale push-bar across the middle, a small round knob on the left side) standing upright and free-standing on the grey floor tiles at about x 631-904, y 280-744 (frame pixels), a soft dark contact shadow falling to the right, slightly brighter than its surroundings as if it caught the floor reflection. It is about a quarter of the size a real door would have at that distance, closed, no wall behind it. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
- **視認性の想定**: 灰色の扉と暗い枠・押し板の白が暗いタイルの上に立つので max 差は 40 を超える見込み。**下限を割りそうな点**は、扉板の灰色が床の灰色に近く、縮小コピーが床に溶けて差が出ないこと。暗い枠の太さと接地影の濃さで輪郭を出す（テイク 3 は反射を拾って少し明るくする案）。割れたら扉を明るく・枠を濃くして作り直す。登録後に `uv run scripts/check-visibility.py --id AR-07-mini-door` を通す。
- **台帳登録案**: `id: 'AR-07-mini-door'` / `camera_id: 'CAM07'` / `element_id: 'CAM07-E16'` / `category: 'surreal'` / `anomaly_type: 'duplicate'` / `location: 'CAM07-E16 の左中段、差分左上 (240,560) px（複製元 CAM07-E13）'` / `detail: '床に、奥の扉と同じ灰色の扉が小さく自立している'` / `phase: mid` / `subtlety: 'medium'` / `candidate_id: 'AR-07-mini-door'`。note に最寄り既存 id と最終 alpha bbox 実測距離（制作後に再計測）、複製元は E13、排他は無し、を書く。
- **相互参照 / 重複精査**: 扉の近縁は CR-07-03（取手が反対側へ）・CR-07-12（横帯が通路になり奥に同じ扉）・CR-07-07（黒い開口に灰色扉が立つ）・CR-07-24/25（取手・小窓）・AR-07-reopened（扉が少し開く）・AR-07-blue-push-plate・CR-07-08（扉の取手の形の影）。いずれも**壁に付いた扉本体の変化**で、本件は「同じ扉が小さなコピーとして床に自立する」ため、観察対象も発見の仕方も違う。CR-07-12 は奥の通路の先の扉（壁の中）で、床の自立物ではない。採用前に見比べる。
### AR-07-glass-crack

- **カメラ**: CAM07、対象 CAM07-E06（左端のガラス/店先境界。縦金属枠と暗いガラス面）。
- **物と変化**: 左の暗いガラス 1 枚に、細いひび割れが走る（ガラスは外れず、破片も落ちない）。薄い白灰色の細線なので暗いガラスの上で映える。ひびは金属枠を越えない。割れ目が一点から放射する形（着弾を連想させる表現）は避け、3 テイクはひびの形違い（枝分かれの網目／対角の長い 1 本／縦に長い数本）にする。
- **box**: `2,570,46,680`（44x110。ガラス面）。最寄り既存 overlay（最終 alpha bbox）は AR-07-n1（97,381–199,449）まで **131.3px**、次点 AR-07-purple-floor-tile 222.2px。他の overlay との接近は無し。大面積とは重ならない。この節の他の box とは AR-07-reflection-cut まで 79.0px。
- **6倍クロップ**: 原画像 `(0,539)–(258,711)`（258x172。左端に接する）。box は窓内で `(12,184)–(274,839)`。
- **生成プロンプト（3 テイク）**:
   - テイク1:
     ```text
     $imagegen In this surveillance frame, add one network of hairline cracks to the dark glass pane of the shop-front window on the left edge, at about x 12-274, y 184-839 (frame pixels): thin, jagged, bright white-grey cracks that branch irregularly in several directions across the pane like crazed glass, some long, some short, with no common centre; the cracks stop at the pane edges and never cross the metal frame. The glass stays in place, no hole, no shards on the floor. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク2:
     ```text
     $imagegen In this surveillance frame, add one long diagonal crack to the dark glass pane of the shop-front window on the left edge, at about x 12-274, y 184-839 (frame pixels): one main thin bright white-grey hairline crack running from the upper corner to the lower corner with three or four short side branches, the crack stops at the pane edges and never crosses the metal frame. The glass stays in place, no hole, no shards on the floor. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク3:
     ```text
     $imagegen In this surveillance frame, add several long, roughly vertical hairline cracks to the dark glass pane of the shop-front window on the left edge, at about x 12-274, y 184-839 (frame pixels): four or five thin bright white-grey jagged cracks running down the pane from its upper part, forking once or twice, like a pane that has settled under stress; the cracks stop at the pane edges and never cross the metal frame. The glass stays in place, no hole, no shards on the floor. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
- **視認性の想定**: 暗いガラス（輝度 20〜40）に白灰色の線が乗るので max 差は 40 を超える見込み。**下限を割りそうな点**は、線が細く、縮小して貼り戻すと線が溶けて alpha が薄くなり、強い差の画素が 100 に届かないこと（その場合は overlay の 25% 以上という比率条件に頼ることになる）。割れたらひびを太く・長く・本数を増やして作り直す。登録後に `uv run scripts/check-visibility.py --id AR-07-glass-crack` を通す。
- **台帳登録案**: `id: 'AR-07-glass-crack'` / `camera_id: 'CAM07'` / `element_id: 'CAM07-E06'` / `category: 'environment'` / `anomaly_type: 'state_change'` / `location: 'CAM07-E06、差分左上 (2,570) px'` / `detail: '左端の暗いガラス1枚に、細いひび割れが走る'` / `phase: mid` / `subtlety: 'medium'` / `candidate_id: 'AR-07-glass-crack'`。note に最寄り既存 id と最終 alpha bbox 実測距離（制作後に再計測）、視認性は check-visibility.py で実測した値を書く。
- **相互参照 / 重複精査**: ガラスの既存・候補は CR-07-26（現実にいない猫がガラスに映る）のみ。ひびは物の状態変化で、映り込みではなく、別の発見の仕方。AR-04-glass-fog-handprints（CAM04・ガラスが曇って手形）とは別カメラ・別の変化（曇り＋手形 ≠ ひび）。
### AR-07-exit-sign-gone

- **カメラ**: CAM07、対象 CAM07-E14（右奥の上り階段。右壁の上部の小さな緑色発光表示＝非常灯）。
- **物と変化**: 緑の非常灯が消えて取り付け跡だけが残る（object / remove_object）。緑の発光が暗い壁に戻り、「出口の表示が無い」ことが報告される。3 テイクは痕跡の濃さ違い（薄い長方形の跡＋ビス穴／空の窪みと垂れた配線／何の跡も無い）。物語では「出口が無くなる」ことが、帰りたくない老人たちの優しい異変の裏返しになる。
- **box**: `592,128,618,158`（26x30。非常灯は約 x595〜615・y135〜157 なので、box の上端を 2px 上げて下端を 158 で止め、全体を階段の人影から遠ざけた）。最寄り既存 overlay（最終 alpha bbox）は AR-07-stair-figures（588,190–626,325）まで **32.0px**（旧 box は 30.0px ちょうどだった）、次点 AR-07-lamp-off（536,51–581,83）46.3px、AR-07-paper-airplane-ceiling 58.0px。**制作後に alpha bbox で再測定**（非常灯の画素だけなら実 bbox は box より小さく、距離はさらに伸びる。羽毛ぼかしで広がって 30px を割ったら `--margin` を小さくする）。
- **6倍クロップ**: 原画像 `(417,60)–(675,232)`（258x172。右端に接する）。box は窓内で `(1041,405)–(1196,583)`。
- **生成プロンプト（3 テイク）**:
   - テイク1:
     ```text
     $imagegen In this surveillance frame, remove the small green emergency exit sign light at about x 1041-1196, y 405-583 (frame pixels), next to the dark staircase on the right, and fill the place with the plain dark wall surface that would be behind it, leaving only a faint slightly paler rectangular outline where the sign used to hang and two tiny dark screw holes. No green glow anywhere. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク2:
     ```text
     $imagegen In this surveillance frame, remove the small green emergency exit sign light at about x 1041-1196, y 405-583 (frame pixels), next to the dark staircase on the right, leaving an empty dark rectangular recess in the wall where the sign was mounted, with two short loose dark wires hanging from its top edge. No green glow anywhere. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク3:
     ```text
     $imagegen In this surveillance frame, remove the small green emergency exit sign light at about x 1041-1196, y 405-583 (frame pixels), next to the dark staircase on the right, and make the wall look as if nothing had ever been mounted there: plain dark wall surface, no outline, no marks. No green glow anywhere. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
- **視認性の想定**: 緑の発光（周囲の暗い壁との差が大きい）が消えるので max 差は 40 を超える見込み。**下限を割りそうな点**は、非常灯が約 20x22px と小さく、overlay の面積が小さいので強い差の画素が 100 に届かないこと（その場合は 25% 以上の比率条件で通るかを見る）。消した後の壁が周囲より明るく浮くと別の差が出るので、壁は周囲の暗さに合わせる。登録後に `uv run scripts/check-visibility.py --id AR-07-exit-sign-gone` を通す。
- **台帳登録案**: `id: 'AR-07-exit-sign-gone'` / `camera_id: 'CAM07'` / `element_id: 'CAM07-E14'` / `category: 'object'` / `anomaly_type: 'remove_object'` / `location: 'CAM07-E14、差分左上 (592,128) px'` / `detail: '右奥の階段の上の緑の非常灯が消え、取り付け跡だけが残る'` / `phase: late` / `subtlety: 'medium'` / `candidate_id: 'AR-07-exit-sign-gone'`。note に最寄り AR-07-stair-figures と最終 alpha bbox 実測距離、「overlay は非常灯の画素（と取り付け跡）だけで、消した後の壁は周囲の暗さに合わせる」を書く。
- **相互参照 / 重複精査**: 近縁は AR-07-duplicate-green-sign（同じ緑の表示が階段の下側にも現れる）。あちらは増える複製、本件は消える remove_object。非常灯の消失は台帳にも候補にも無い。AR-07-lamp-off（右上の丸灯が消える）は別の灯具・別の位置（物は丸い白色灯で、緑の非常灯ではない）。
### AR-07-ceiling-tile-yellow（昇格: CR-07-21）

- **カメラ**: CAM07、対象 CAM07-E01（青灰色の天井。細かな斑点/汚れ、天井板の線）。
- **物と変化**: 天井板の 1 枚だけが淡く黄ばんだ色（古い煙草の染みのような淡黄色）になる。天井板の継ぎ目と細かな斑点は黄色の下から見える。3 テイクは色の質違い（均一な黄／隅から濃くなる水染み風／すっきりしたレモン色）。
- **box**: `440,12,500,46`（60x34。旧 box より 5px 右へ寄せて天井の吊り物から離した。天井板の継ぎ目に合わせて数 px 動かしてよい）。最寄り既存 overlay（最終 alpha bbox）は AR-07-crane（325,0–404,240）まで **36.0px**、次点 AR-07-lamp-off（536,51–581,83）36.3px、AR-07-ceiling-string 103.2px。天井の大面積 AR-07-ceiling-white-sheets とは bbox が重なる。**同じ天井面を覆う物は排他**: AR-07-ceiling-white-sheets・AR-07-crane・AR-07-paper-airplane-ceiling・AR-07-ceiling-string とは同プレイで共存させない（台帳 note に書く）。**制作後に alpha bbox で再計測**。
- **6倍クロップ**: 原画像 `(336,0)–(594,172)`（258x172。上端に接する）。box は窓内で `(619,71)–(976,274)`。
- **生成プロンプト（3 テイク）**:
   - テイク1:
     ```text
     $imagegen In this surveillance frame, tint exactly one rectangular ceiling panel at about x 619-976, y 71-274 (frame pixels) to an even, pale, slightly dingy warm yellow, like an old nicotine-stained ceiling board, following the panel's own seams and perspective so the panel edges stay sharp and the seam lines of its neighbours stay visible. The fine speckle texture of the ceiling stays visible through the yellow. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク2:
     ```text
     $imagegen In this surveillance frame, tint exactly one rectangular ceiling panel at about x 619-976, y 71-274 (frame pixels) to a pale warm yellow that is slightly deeper toward one corner, like a faint water stain, following the panel's own seams and perspective so the panel edges stay sharp and the seam lines of its neighbours stay visible. The fine speckle texture of the ceiling stays visible through the yellow. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
   - テイク3:
     ```text
     $imagegen In this surveillance frame, tint exactly one rectangular ceiling panel at about x 619-976, y 71-274 (frame pixels) to a soft clean lemon yellow, slightly brighter than the panels around it, following the panel's own seams and perspective so the panel edges stay sharp and the seam lines of its neighbours stay visible. The fine speckle texture of the ceiling stays visible through the yellow. Change nothing else: the floor tiles, joints, reflections, walls, stairs, doors, lights and every other object stay exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
     ```
- **視認性の想定**: 色相の変化（青灰→黄）が主で、輝度差は小さい。**下限を割りそうな点**は、max 差 40 と平均差 3.0 の両方。天井が暗く、淡い黄色だと輝度の差が足りない恐れがある（候補の `subtle` どおり最も難しい 1 件）。割れたら黄色を濃く・明るくして作り直す（テイク 3 のレモン色が最も通りやすい）。登録後に `uv run scripts/check-visibility.py --id AR-07-ceiling-tile-yellow` を通す。
- **台帳登録案**: `id: 'AR-07-ceiling-tile-yellow'` / `camera_id: 'CAM07'` / `element_id: 'CAM07-E01'` / `category: 'environment'` / `anomaly_type: 'color_shift'` / `location: 'CAM07-E01、差分左上 (440,12) px'` / `detail: '天井板の1枚だけが淡い黄色になる'` / `phase: early` / `subtlety: 'subtle'` / `candidate_id: 'AR-07-ceiling-tile-yellow'`（CR-07-21 の昇格）。note に最寄り既存 id と最終 alpha bbox 実測距離、天井面の排他の列挙、視認性は check-visibility.py で実測した値で書く。登録時に **CR-07-21 の行（「追加候補 — CAM 07」節）を削除**する。
- **相互参照 / 重複精査**: 本件は CR-07-21 の昇格で、既存の別 ID は無い。近縁は AR-07-purple-floor-tile（床タイル 1 枚が淡い紫。床と天井の別の面・別の色）、AR-04-ceiling-corner-fold・AR-07-ceiling-string など天井の他の異変（物の増減で、色の変化ではない）。
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
