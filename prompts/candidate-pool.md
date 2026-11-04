# 異変候補プール

まだ採用・生成した異変ではなく、写真の写り込みから発想を広げる写真固有案、昭和テーマ案、令和テーマ案（4人目の子供の記憶）、写真に紐づかない runtime 在庫をまとめた候補。

## 正本と昇格ルール

- 写っている物の説明・座標・カメラ写真の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。写真固有の候補ではここでは要素IDだけ参照し、物体説明や座標を複製しない。
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

時計の針は写真に時計が写っていないため候補にしない。

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

## 制作仕様（確定済み・未制作の大面積）

大面積（面積が画像 675x900 = 607,500 px² の 1/8 = 75,938 px² 以上）の画像異変 16 件（8 カメラ × 2）の制作仕様。**候補ではなく、制作に入る手順書**（kako-jun 指示 2026-11-04）。方針の正本は [`README.md`](./README.md) の「配置の基準」の大面積の例外、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）。ここには重ねて書かない。

- **昇格**: 制作に採用した件は、この節の該当項を**削除**して `anomalies.yaml` へ一度だけ登録する（二重に残さない）。ID は台帳の `candidate_id` 相当として note に残す。
- **座標**: すべて baseline px（675x900）。`box` は面の外接矩形で、台帳の `overlay_origin` / `dimensions` は**貼り込み後の alpha bbox で再計測**して書く（羽毛化で変わる）。bbox が 1/8 を割ったら登録しない（面を足して作り直す）。同カメラの 2 件は box が重ならないことを 2026-11-04 に再計測済み（下の表）。
- **大面積どうしの重なり**: 同カメラの大面積は重ねない。既存台帳の大面積（`AR-06-wall-puddle` 540x202 / `AR-07-floor-uphill` 591x352）との重なりは項ごとに書く。小物とは座標が重なってよい（大面積の例外）。ただし**同じ面を覆い隠す小物は排他**（項の「排他」に列挙。同プレイで共存させない運用を台帳 note に書く）。
- **生成の共通方針**: 入力は baseline を PNG 化した 3:2（1536x1024）切り出し（面+余白。縦長の面は上下 2 枚に分け別生成して合成、または余白つきで 3:2 に収める）。先頭に `$imagegen` を明示。**1 件ずつ生成し生成画像は見ずに合成まで進め、採否は人間が決める**運用（kako-jun 指示）。生成物は作業物で `experiments/<件名>/` に置き、登録後に即削除する。
- **繰り返し絵柄は 1 素材を別生成 → スクリプトで遠近ワープして敷き詰め**。1 回の生成で多数を描かせると文字風の模様・顔崩れ・指崩れが出る。割付図（消失点に向かう流線と格子）を**先に作る**（向きは文章でなく図）。
- **合成の共通方針**: `scripts/composite-anomaly.py` は並進位置合わせ前提で、大面積は低い `--threshold` だと床や壁の粒状まで拾って巨大化する。大面積は**手描きポリゴンマスク（面の台形）を主**にし、ツールは `--box` を面の外接矩形に絞り `--threshold` を高め（16〜24）で使うか、ポリゴン外を元画像で上書きした全画面を `--gen` に渡す。マスク外の alpha は厳密に 0、境界は 1〜2 px の羽毛化。接地線・巾木・枠・柱際はマスクを止める線として使う。壁・床の明暗は貼り込み素材へ multiply で乗せる。
- **共通の禁止**: 文字・数字・ロゴ・実在店名・家紋・紋様の混入（出たテイクは没）。人の顔は 01-02 以外では出さない。性的・不適切の独自判定はしない（生成物はそのまま報告）。
- **共通プロンプト末尾**（各項のプロンプトに全文を含めてある）: `Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`

### 面の再計測（2026-11-04、`uv run --with pyyaml python3`）

| ID | box (x1,y1,x2,y2) | 面積 px² | 画像比 | 1/8 |
| --- | --- | ---: | ---: | --- |
| CR-LG-01-01 | 212,0,675,340 | 157,420 | 25.9% | 可 |
| CR-LG-01-02 | 0,215,208,725 | 106,080 | 17.5% | 可 |
| CR-LG-02-01 | 176,340,675,900 | 279,440 | 46.0% | 可 |
| CR-LG-02-02 | 0,50,172,600 | 94,600 | 15.6% | 可 |
| CR-LG-03-01 | 0,100,268,670 | 152,760 | 25.1% | 可 |
| CR-LG-03-02 | 290,450,675,900 | 173,250 | 28.5% | 可 |
| CR-LG-04-01 | 450,120,675,750 | 141,750 | 23.3% | 可 |
| CR-LG-04-02 | 0,10,215,740 | 156,950 | 25.8% | 可 |
| CR-LG-05-01 | 280,108,555,538 | 118,250 | 19.5% | 可 |
| CR-LG-05-02 | 0,610,675,900 | 195,750 | 32.2% | 可 |
| CR-LG-06-01 | 500,40,675,860 | 143,500 | 23.6% | 可 |
| CR-LG-06-02 | 0,0,495,255 | 126,225 | 20.8% | 可 |
| CR-LG-07-01 | 88,126,585,352 | 112,322 | 18.5% | 可 |
| CR-LG-07-02 | 0,0,675,122 | 82,350 | 13.6% | 可（余裕小。裾を y118 以上に揃える） |
| CR-LG-08-01 | 0,430,675,900 | 317,250 | 52.2% | 可 |
| CR-LG-08-02 | 0,130,270,425 | 79,650 | 13.1% | 可（余裕小。下記の通り box を広げた） |

同カメラの 2 件の隙間（x または y の空き px）: 01=4(x) / 02=4(x) / 03=22(x) / 04=235(x) / 05=72(y) / 06=5(x) / 07=4(y) / 08=5(y)。いずれも重なり 0。

### 既存との重複精査（共通）

- 台帳の既存大面積は 2 件のみ。`AR-06-wall-puddle`（CAM06 (135,432) 540x202）は **CR-LG-06-01 の box と 35,350 px² 重なる**（puddle の bbox が右壁の中段にかかる）。→ 06-01 は puddle と**排他**にするか、06-01 のポリゴン alpha が puddle の alpha と画素で交わらないことを実測して初めて併存可（bbox 同士は重なるので、運用は排他を既定とし、kako-jun に併存の可否を確認する）。`AR-07-floor-uphill`（CAM07 (84,548) 591x352）は 07-01/02 と重ならない。
- 型の重複回避: 01-02（顔写真の格子・CAM01 のみ）／02-01（足跡・CAM02 のみ）／02-02（クレヨン画・CAM02 のみ）／04-01・04-02・05-01・08-01・01-01 も各 1 カメラのみ。他カメラで同じ型を作らない（kako-jun 指示）。他 8 件はこれらと型が被らないよう中身を差し替え済み（無地の白紙・畳・折り鶴・同じポスター・傘・時計・シーツ・テレビ）。
- 近い既存: 吊り物の天井（`AR-01-ceiling-fan-showa` / `AR-06-ceiling-balloons` / `AR-07-crane` / CR-02-21・CR-08-20 の折り鶴）、傘（`AR-06-umbrella` / `AR-06-reflected-umbrella` / CR-01-37 / CR-04-17）、折り鶴（`AR-07-crane`・`AR-01-container-origami`）。型が「面一面」で別物と整理し、各項の note に近傍を書く。
- 昭和テーマ節の「時計の針は写真に時計が写っていないため候補にしない」は、**既存の時計を改変する案**の話。07-01 は時計を**足す**ので抵触しないが、方針の例外に当たるため kako-jun 指示（2026-11-04）に基づく旨を台帳 note に書く。

---

### CR-LG-01-01 天井一面の提灯・紙飾り

- **ID / camera / element_id**: CR-LG-01-01 / CAM01 / CAM01-E01
- **面**: box 212,0,675,340（157,420 px²、25.9%）。天井の台形（丸灯・換気口・点検板・蛍光灯のある面）。
- **物と変化**: 通路天井の右〜中央一面に、赤白の**無地**の提灯と色褪せた紙の輪飾りが数十個、列をなして吊られる。奥ほど小さく密。既存照明は飾りの隙間から見え、蛍光灯は点いたまま。
- **不気味さの狙い**: 誰もいないのに祭りの準備だけがある。老人の記憶が「祭りの夜の商店街」を天井に再生する、優しい異変（story: 通路に現れていた像は老人 3 人の記憶）。
- **保持するもの**: 床・左右の壁・店先・奥の吊り看板（E16、y373 付近）、換気口・点検板・丸灯・蛍光灯の本体、天井の色味・粒状・板継ぎ目（飾りの隙間に残す）。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of an underground shopping arcade corridor (the ceiling occupies the upper part of the frame).
  Make ONLY this change: on the ceiling of the right and centre part of the corridor, hang several dozen completely blank paper lanterns (red and white, round, no characters, no crests, no logos, no stripes of writing) and faded paper chain garlands in neat rows receding toward the far end of the corridor. Lanterns get smaller and denser toward the vanishing point and follow the strong perspective of the ceiling. Each lantern hangs on a thin cord about 25-40 cm below the ceiling plane. Existing ceiling fixtures (round lamps, the large concentric vent, the square access panel, the long fluorescent tube) stay visible between the lanterns and the fluorescent tube stays lit. Lanterns glow faintly warm only at their own surface; the corridor floor and walls stay cold blue-grey.
  Do not touch the floor, walls, shopfronts, hanging signs or anything below the ceiling line. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①割付図: 消失点（奥の開口付近）へ向かう流線 3 本 × 提灯の位置と大きさ（手前 60px → 奥 8px）を `uv run --with pillow python3` で描いて確定。②全景を 3 テイク生成（天井以外は元画像で上書きする前提）。③天井の台形ポリゴンを手描きし、ポリゴン内のうち「提灯・飾りの実体＋吊り紐」だけを差分抽出（`--box 212,0,675,340 --threshold 20`）。吊り看板（y373）には届かない高さに収める。④原寸で蛍光灯が点いたまま・換気口が見えることを確認。
- **難所と没基準**: 提灯に文字・家紋が出たら没。遠近のスケール崩れ（奥が手前より大きい）は没。消失点付近が潰れるなら奥の提灯を間引く。天井が背景化しやすいので提灯は大きめ・白を強く。
- **フェーズ / 目立ち度**: mid〜late / obvious。
- **台帳案**: category `environment` / anomaly_type `add_object` / detail 「通路天井の右〜中央一面に、無地の赤白の提灯と紙の輪飾りが数十個吊られる（蛍光灯は点いたまま）」。note に「大面積。CAM01-E01。近傍: AR-01-ceiling-fan-showa（同じ天井の昭和小物）と bbox 重複するが大面積の例外」を書く。
- **排他**: `AR-01-ceiling-fan-showa`・`AR-01-ceiling-panel-round`・`AR-01-vent-hole-triangle`・`AR-01-ceiling-seam-circle`（天井の飾りで同じ面に重なる）は同プレイ非共存を推奨。
- **生成枚数の最小見積り**: 全景 3 テイク（素材の別生成なし）。

### CR-LG-01-02 左壁一面の同じ顔写真（行方不明の 4 人）

- **ID / camera / element_id**: CR-LG-01-02 / CAM01 / CAM01-E09
- **面**: box 0,215,208,725（106,080 px²、17.5%）。左壁の台形から窓（E10: x45-110, y265-600）を除いた面。
- **物と変化**: 左壁の粗い粒状壁に、額なしの白黒証明写真風の小さな顔写真が格子状に貼られる。顔は 4 種（老人男性 2・老婆 1・子供 1）の繰り返しで、監視カメラ映像のように粗く無表情、全員こちらを向く。文字・氏名・日付なし。窓の外側の壁にだけ貼る。
- **不気味さの狙い**: story の行方不明 4 人（老人 3 人うち 1 人は老婆、4 人目は子供）を、説明なしに顔だけで示す。誰もいないのに視線だけある。
- **保持するもの**: 窓（E10）・腰板・巾木・床、壁の粒状質感、上下の輪郭線、奥の柱との境。
- **生成プロンプト全文**（顔素材を 1 枚の正方グリッドで別生成。本体の全景生成はしない）:
  ```
  $imagegen Create a flat, front-facing 2x2 contact sheet of four small black-and-white ID-style photographs, each one a different completely fictional person: (1) an elderly man with short grey hair, (2) another elderly man wearing a plain flat cap, (3) an elderly woman with her hair tied back, (4) a young child with short hair. All four have neutral expressions and look straight into the lens. Style: very coarse, low-resolution black-and-white surveillance-camera still, heavy film grain, slight blur, high contrast, small passport-photo crop with plain mid-grey background. Each photo is a plain rectangle with a thin white border and nothing printed anywhere: no captions, no names, no dates, no numbers, no text, no logos. The faces must not resemble any real person. Evenly lit flat scan on a neutral grey backdrop, each photo occupying one quadrant with equal margin.
  Output 1536x1024 (3:2). No watermark.
  ```
- **作り方**: ①顔素材を 3 テイク生成し、4 種が破綻しないテイクを人間が選ぶ。②4 枚を切り出し、1 枚 22×28 px 前後（手前は 26px、奥は 18px）。③割付図: 壁の台形の 4 隅（天井境界・巾木・奥の柱際・手前端）から格子（縦 9 列×横 6〜8 行）を遠近ワープで作り、顔の並びは 4 種を巡回。窓ポリゴンは格子から抜く。④壁の粒状・明暗を multiply で乗せ、白黒写真の白は 85% に落とす。⑤`composite-anomaly.py` は使わず、ポリゴン alpha から overlay を切り出す（ポリゴン外は alpha 0）。
- **難所と没基準**: 顔の同一性が崩れる・実在人物に似る・文字風の模様が写真下端に出るテイクは没。顔は粗く小さく（20〜25px）して崩れを目立たせない。
- **フェーズ / 目立ち度**: late / obvious（4 人目が出た後）。
- **台帳案**: category `surreal` / anomaly_type `duplicate` / detail 「左壁一面に、4 種の無表情な白黒の顔写真（老人男性 2・老婆 1・子供 1）が格子状に隙間なく貼られる」。note に「大面積。CAM01-E09、窓 E10 は保持」を書く。
- **排他**: `AR-01-notice`・`AR-01-wall-repaint-patch`（左壁の紙・塗り直し跡で同じ面）。`AR-01-wiped-window`・`AR-01-cat-in-frosted-window` は窓内なので併存可。
- **生成枚数の最小見積り**: 素材 3 テイク（正方グリッド）。全景生成なし。

### CR-LG-02-01 床一面の足跡（奥の角へ向かう列）

- **ID / camera / element_id**: CR-LG-02-01 / CAM02 / CAM02-E20
- **面**: box 176,340,675,900（279,440 px²、46.0%）。通路の中央〜右〜手前の床。
- **物と変化**: 床タイル一面に、乾いた砂埃の足跡が無数に付き、全部が通路奥の暗い角（柱の左の開口）へ向かって列をなす。靴は昭和の革靴・草履・小さな子供のスニーカー（無地、ロゴなし）、大小混在、手前ほど大きい。人は居ない。足跡の上でも照明反射（E22）と緑の光（E23）を保つ。
- **不気味さの狙い**: 「シャッターの向こうへ行ったまま戻っていない」4 人（作業仮説）。行きの足跡だけで帰りが無い。子供の小さな足跡で 4 人目を示す。
- **保持するもの**: 看板・木箱・黒板・椅子・点検口（E21）・左のシャッター壁・天井、床の目地と反射。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of a tiled underground corridor floor.
  Make ONLY this change: add hundreds of dusty dry footprints on the floor tiles in the centre, right and foreground area. All footprints walk toward the same place, the dark opening at the far end of the corridor beside the pillar, forming many parallel trails. Mix four kinds of soles: old leather dress shoes, flat straw sandals (zori), small children's sneakers with a plain smooth sole, and bare-ish small feet. The soles are completely plain with no tread lettering, no logos, no marks. Sizes follow perspective: large near the camera, shrinking toward the vanishing point, and they follow the diagonal lines of the tile joints. Footprints are grey-brown dust, clearly darker than the floor so they are visible, and there is no person in the frame. Keep the existing white lamp reflections and the green glow on the floor visible on top of the footprints.
  Do not touch the signboard, wooden crate, easel blackboard, chair, floor hatch, left shutter wall or the ceiling. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①割付図: 床の消失点＝奥の開口へ向かう流線 5〜6 本を引き、4 種の靴を帯状に分けて密度を変える（全面均一は禁止＝コピペ感）。②全景を 3 テイク生成。③床の台形ポリゴンから木箱・黒板・椅子・点検口・看板の接地部を抜き、足跡の暗部だけを差分抽出（`--box 176,340,675,900 --threshold 18` ＋ `--dilate` で足跡群をまとめる）。④反射帯は screen 合成で元の光を戻す。
- **難所と没基準**: 遠近が目地と合わない・足跡が床を描き直して目地がずれる・靴底に文字風模様が出る・帯の向きが奥の角を向かないテイクは没。反射帯内は消えやすいので濃くする。砂埃は低コントラストになりがちなので、視認性 floor を `check-visibility.py` で先に確認する。
- **フェーズ / 目立ち度**: mid〜late / medium。
- **台帳案**: category `person` / anomaly_type `add_object` / detail 「床一面に、昭和の靴・草履・子供の靴の足跡が無数に付き、全て奥の暗い角へ向かう（帰りの足跡は無い）」。note に「大面積。CAM02-E20。AR-02-leather-footprints の拡大版ではなく、多人数・子供混在の別物。排他」を書く。
- **既存との関係（差分と排他）**: `AR-02-leather-footprints`（(409,732) 92x149、革靴 1 列）は本件の床の内側に完全に入る。差分: 本件は床一面・4 種の履物・奥の角へ収束・子供混在。**排他**（同プレイで共存させない。本件を採用するなら leather-footprints は台帳に残すが、台帳 note に互いを書く）。他の床小物（`AR-02-tricycle` `AR-02-smartphone-facedown` `AR-02-chalk-hopscotch` `AR-02-puddle` `AR-02-tile*`）は座標が重なるが大面積の例外で可。足跡が小物の上を通らないよう、小物の接地部はマスクで抜く。`AR-06-wet-footprints`（CAM06）は別カメラの別物で、この型は CAM02 だけに限る。
- **生成枚数の最小見積り**: 全景 3 テイク。

### CR-LG-02-02 左シャッター一面の子供のクレヨン画

- **ID / camera / element_id**: CR-LG-02-02 / CAM02 / CAM02-E07
- **面**: box 0,50,172,600（94,600 px²、15.6%）。左の横縞シャッター面（E07）とガラス店先（E08）の台形。
- **物と変化**: シャッターとガラスの全体に、子供のクレヨン画の画用紙がテープ止めで隙間なく貼られる。どの絵も同じ構図（大きな人型と小さな人型が手をつなぐ 4 人家族、赤い家、黄色い太陽）。画用紙は少し傾き、昭和風のセロハンテープ。文字・名前なし。
- **不気味さの狙い**: 4 人目の子供の記憶が作った像。令和の子供が昭和のシャッターに貼るという時代の混ざり（story の「現代人と昭和の建物」）。優しいが数が多くて怖い。
- **保持するもの**: シャッターの縦枠・上下の縁・床との接地・右のガラス枠の位置、横縞の線（絵の隙間と周囲に残す）。
- **生成プロンプト全文**（絵素材を 1 枚別生成）:
  ```
  $imagegen Create one flat, straight-on scan of a single sheet of off-white drawing paper (landscape, slightly wrinkled, with a small piece of old yellowed cellophane tape at each top corner) carrying a naive child's crayon and coloured-pencil drawing: two big stick-like human figures and two small stick-like human figures holding hands in a row (a family of four), a red house with a triangular roof on the left, and a big yellow sun in the top right corner. The drawing is clumsy, with thick waxy crayon strokes and visible paper texture. It contains absolutely no writing: no letters, no numbers, no names, no signature, no logo. The sheet is evenly lit and fills most of the frame on a plain neutral dark-grey background.
  Output 1536x1024 (3:2). No watermark.
  ```
- **作り方**: ①素材 3 テイクから 1 枚を人間が選ぶ。②割付図: シャッター台形（上辺 0,50 → 下辺 0,600 の遠近）に格子（4 列×9 行前後）、各枚を ±4 度回転・±6% 縮尺・明度ゆらぎ・テープ位置変化で敷き詰める（完全な複製感を避ける）。③横縞の凹凸は multiply で重ね、縦枠のライン上は貼らない（枠で止める）。④ポリゴン alpha から overlay を切り出す。
- **難所と没基準**: クレヨン画に文字風の筆致が混ざったら没。人型の本数が 4 でない素材は没。ガラス面と金属シャッターで反射が違うので、ガラス部は反射を元画像から screen で戻す。
- **フェーズ / 目立ち度**: late / obvious。
- **台帳案**: category `object` / anomaly_type `duplicate` / detail 「左のシャッターとガラス店先一面に、同じ家族のクレヨン画の画用紙が隙間なく貼られる」。note に「大面積。CAM02-E07」を書く。
- **排他**: `AR-02-shop-reopens`（(0,308) 199x250、同じ店先）・`AR-02-newspaper`・`AR-02-open-sign`・`AR-02-wrapping-paper`・`AR-02-cat`（同じ面を覆う）。変化の種類は別だが画面が潰し合うので同プレイ非共存。
- **生成枚数の最小見積り**: 素材 3 テイク。

### CR-LG-03-01 シャッター一面の無地の白い紙

- **ID / camera / element_id**: CR-LG-03-01 / CAM03 / CAM03-E06
- **面**: box 0,100,268,670（152,760 px²、25.1%）。左の大きな横縞シャッターの台形（手前左端〜中央左の柱まで）。
- **物と変化**: シャッター一面に、**文字のまったくない無地の白い紙**（A4 前後）が隙間なく貼られる。紙は 1 枚ずつ微妙に傾き、角が浮き、テープ止めの跡がある。横板の段差は紙の下に透ける。
- **不気味さの狙い**: 尋ね人の貼り紙の「書かれる前」。誰の貼り紙かは分からないが、貼られた量だけが行方不明の多さ（1 人増えるたびに異変が増えた）を語る。
- **保持するもの**: 横板の凹凸・影・汚れ・右の柱・床・天井。
- **生成プロンプト全文**（紙素材を 1 枚別生成）:
  ```
  $imagegen Create one flat, straight-on photo of a single plain sheet of white copier paper (portrait orientation, slightly curled corners, tiny creases, a faint grey dust cast) fixed to a wall with a short strip of clear tape at the top two corners. The paper is completely blank: no writing, no printing, no letters, no numbers, no lines, no logo, no photo. Soft even low-light surveillance-camera lighting, fine film grain, mild JPEG compression, plain dark grey shutter-metal background visible around the sheet.
  Output 1536x1024 (3:2). No watermark.
  ```
- **作り方**: ①素材 2 テイクから 1 枚選ぶ。②割付図: シャッター台形に紙格子（7 列×13 行前後。手前ほど大きい）、各枚 ±3 度回転・縮尺 ±5%・明度 ±8%・角の浮きを変える。紙の隙間はゼロ（隙間なく）。③横板の段差を multiply で紙に反映（紙の下に縞が透ける）。④ポリゴン alpha で切り出し、柱・床の境で止める。
- **難所と没基準**: 紙面に文字風の汚れ・線が出たら没。隙間なく貼ると単色の白面になり「何が違う」が分かりにくいので、紙の傾きと影で格子を見せる。
- **フェーズ / 目立ち度**: late / obvious。
- **台帳案**: category `object` / anomaly_type `duplicate` / detail 「左のシャッター一面に、無地の白い紙が隙間なく貼られる」。note に「大面積。CAM03-E06」を書く。
- **排他**: `AR-03-newspaper`・`AR-03-paper-bag`・`AR-03-shutter-wave`（同じシャッターの小物。面を覆うので同プレイ非共存）。CR-LG-02-02（CAM02 の画用紙）・06-01（ポスター）とは型が「無地の紙／絵柄」で別。
- **生成枚数の最小見積り**: 素材 2 テイク。

### CR-LG-03-02 床一面の畳

- **ID / camera / element_id**: CR-LG-03-02 / CAM03 / CAM03-E16
- **面**: box 290,450,675,900（173,250 px²、28.5%）。右手前の床。**左縁は縦線で切らず、タイル目地の消失点へ向かう斜線に沿わせる**（ポリゴン）。
- **物と変化**: 地下街の床が昭和の和室の畳に変わる。い草の淡い緑褐色の畳が 2:1 の割りで敷かれ、黒い布の縁（へり）と畳どうしの目地、手前ほど大きい遠近。既存の白い反射帯は畳の上にも残る。
- **不気味さの狙い**: 老人の記憶が作る昭和の像（優しい異変）。通路の途中から床だけが「家の中」になる。靴で歩いてはいけない床が突然現れる。
- **保持するもの**: 床の反射・光だまり、奥の階段状開口、シャッター、壁、天井、左の床タイル（ポリゴンの外）。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of a tiled underground corridor.
  Make ONLY this change: replace the floor tiles in the right and foreground part of the floor with a continuous area of old Japanese tatami mats. Mats are pale green-brown woven rush (igusa), laid in the traditional pattern with 2:1 mats, each mat bordered by a narrow black cloth edging (heri) and thin seams between mats. The mat grid follows the perspective of the floor and converges to the same vanishing point as the original tile joints; mats are large near the camera and smaller toward the far end. The existing white lamp reflections and light pools on the floor stay visible on top of the tatami as soft highlights. The left edge of the tatami area follows a tile-joint line running toward the vanishing point.
  Do not touch the walls, shutters, ceiling, the dark stepped opening at the far end, or the floor to the left of that line. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①割付図: 目地の消失点（奥の開口付近）と、畳の長辺・短辺の流線、へりの線を図に描く（向きは図で決める）。②全景 3 テイク生成。③ポリゴン（床の右半、左縁は目地斜線）を手描き。差分抽出でなくポリゴン内を生成で置換し、反射帯は元画像の高輝度を screen で戻す。④`--box 290,450,675,900` は外接のみ、`--threshold` は高め（20）か不使用。
- **難所と没基準**: 畳の目の向き・へりが目地と合わず遠近が破綻するテイクは没。畳にい草の文字風模様や家紋が出たら没。左縁が不自然な縦の直線になったら没（斜線に沿わせる）。反射帯が消えて「ただ畳を貼った」ように見えるのは没。
- **フェーズ / 目立ち度**: mid / obvious。
- **台帳案**: category `environment` / anomaly_type `surreal` / detail 「右手前の床一面が昭和の和室の畳に変わり、既存の白い反射は畳の上に残る」。note に「大面積。CAM03-E16」を書く。
- **排他**: 床の小物（`AR-03-round-puddle` `AR-03-silver-can` `AR-03-kerosene-heater` `AR-03-tile-diagonal` `AR-03-blue-floor-tile`）は畳の上に載る形になるので、水たまり・タイル色変えの 3 件は排他（畳の上に水たまり・タイルは成立しない）。石油ストーブ・缶は併存可。
- **生成枚数の最小見積り**: 全景 3 テイク。

### CR-LG-04-01 窓の外の昭和の路地（右壁）

- **ID / camera / element_id**: CR-LG-04-01 / CAM04 / CAM04-E14
- **面**: box 450,120,675,750（141,750 px²、23.3%）。右壁（ガラス窓と漆喰壁）の遠近台形。
- **物と変化**: 右の黒い店舗ガラスの壁が、白い窓枠が連続する壁に変わり、窓の外に夕焼けの昭和の路地（木造の軒、電柱、瓦屋根、細い路地）が広がる。地下街に窓はない。
- **不気味さの狙い**: 地下にないはずの夕焼けが窓の外にある。説明がつかないが優しい。「外へ帰りたい」気持ちの象徴（老人の記憶）。
- **保持するもの**: 床・天井・柱縁・奥の扉と鉢植え・左壁。窓枠は元の縦枠位置を踏襲し、ガラスの反射は一部残す。
- **生成プロンプト全文**（外景を別生成し、壁へ遠近ワープ）:
  ```
  $imagegen Create a flat, straight-on view of what is seen through a window: a narrow Showa-era Japanese back alley at sunset, warm orange and pink evening sky, wooden eaves of old houses with plain cloth awnings (noren) that are completely blank, tiled roofs, a utility pole with wires, a narrow lane receding into the distance, long soft shadows. No signs, no shop names, no lettering, no logos, no people. Slightly hazy, faded film look, fine grain.
  Output 1536x1024 (3:2). No watermark.
  ```
  壁全景の置換テイクは、次を使う:
  ```
  $imagegen Edit the attached surveillance camera photo of an underground corridor.
  Make ONLY this change: the right-hand wall (black glass shopfront and plaster wall) becomes a wall of continuous white-framed windows whose vertical mullions stay at the original mullion positions. Through the windows we see a warm orange sunset over a Showa-era Japanese alley: wooden eaves with blank cloth awnings, tiled roofs, a utility pole, a narrow lane. Some cold blue reflections of the corridor lamps remain on the glass. The corridor floor, ceiling, far door with the potted plant and the left wall stay cold blue-grey and untouched; do not add any warm light on the floor.
  Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading outside the windows, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①外景素材 3 テイク（人間が選ぶ）。②割付図: 右壁の消失点に合わせた窓の遠近台形 5〜6 枠（縦枠の位置は元写真から取る）。③外景を各枠へ遠近ワープ。④白い窓枠・反射ハイライトは元画像から戻す（桟は必ず元から）。⑤ポリゴン alpha で切り出す。
- **難所と没基準**: 遠近が右壁の消失点と合わない・看板や電柱に文字が出る・暖色が床へ漏れる（別異変になる）のは没。壁の粒状感を維持。
- **フェーズ / 目立ち度**: late / obvious。
- **台帳案**: category `surreal` / anomaly_type `surreal` / detail 「右の壁一面が窓になり、窓の外に夕焼けの昭和の路地が見える」。note に「大面積。CAM04-E14」を書く。
- **排他**: `AR-04-red-lantern`（(506,242) 87x124、同じ右ガラス内）は窓の外景に隠れるため排他。`AR-04-puddle` は床で併存可。
- **生成枚数の最小見積り**: 外景素材 3 テイク ＋ 全景 2 テイク。

### CR-LG-04-02 左ガラス店先の曇りと手形

- **ID / camera / element_id**: CR-LG-04-02 / CAM04 / CAM04-E07
- **面**: box 0,10,215,740（156,950 px²、25.8%）。左ガラス店先の全面（枠内のガラスのみ）。
- **物と変化**: ガラスが内側から結露で曇り、子供と大人の手形が大小無数に付き、指で描いた絵（傘・太陽・猫・家）が数か所だけ現れる。文字・数字なし。
- **不気味さの狙い**: 外側でなく内側から付いた手形。店の中に人がいた痕跡だけが残る。4 人目の子供の手形が混ざり、シャッターの向こう側へ行った人々が内側にいる気配（story）。
- **保持するもの**: 白い金属枠・床・天井・上部の緑看板・奥の通路。曇りは枠線で止める。
- **生成プロンプト全文**（手形素材を別生成）:
  ```
  $imagegen Create a flat, straight-on photo of a pane of cold glass fogged with condensation, seen from the outside, with many handprints and palm prints pressed on the inside surface: some large adult hands, some small child hands, in varied sizes, all with exactly five fingers and natural proportions, smeared where the hand slid. In three places a finger has drawn a very simple child-like doodle in the fog (a small umbrella, a sun, a cat face, a house) as clear lines. No writing, no numbers, no letters, no logos. The fog is milky white-grey and translucent over a dark blue-black interior, with fine droplets and a faint warm glow far behind.
  Output 1536x1024 (3:2). No watermark.
  ```
  全景置換の方は、共通方針の末尾を付けて「Make ONLY this change: the glass panes of the left shopfront become fogged from inside with many handprints…」とする（枠・床・看板は不変と明記）。
- **作り方**: ①素材 3 テイクから 2 枚（大人手・子供手が主）を選び、手形を切り出す。②各ガラスパネルのポリゴンを枠内側で作り、曇りは screen、手形は不透明度を変えて 40〜60 個配置（回転・縮尺・不透明度を変える）。③指の数は全数目視（6 本・4 本は没）。④枠は別マスクで元画像を戻す。
- **難所と没基準**: 指の本数崩れ・絵が文字風記号になる・曇りが枠をまたぐ・暗いガラスが白一色になって情報量が消えるのは没。
- **フェーズ / 目立ち度**: mid / obvious。
- **台帳案**: category `environment` / anomaly_type `add_object` / detail 「左のガラス店先が内側から曇り、大小の手形と指で描いた絵が付く」。note に「大面積。CAM04-E07」を書く。
- **排他**: `AR-04-red-telephone`・`AR-04-basket`・`AR-04-poster`・`AR-04-poster-colour-restore`（ガラス内の小物。曇りで隠れるので排他）。`AR-04-fluorescent-frame-grey` `AR-04-sign-colour-blue` は枠・看板で併存可。
- **生成枚数の最小見積り**: 素材 3 テイク。

### CR-LG-05-01 カーテンが開き無人の喫茶店

- **ID / camera / element_id**: CR-LG-05-01 / CAM05 / CAM05-E08
- **面**: box 280,108,555,538（118,250 px²、19.5%）。正面ガラス区画のカーテン面全体（扉ガラス 555 以降は含めない）。
- **物と変化**: 灰色のカーテンが全て開き、ガラスの向こうに昭和の喫茶店の店内（暖色灯、木のカウンター、赤いビニール張りの丸椅子、クリームソーダの並ぶ棚、誰もいない）が見える。店内だけ暖かく明るく、手前の通路は冷たい青灰色のまま。
- **不気味さの狙い**: 閉店した区画に、ついさっきまで人がいた温かい店内。人はいないのに椅子が引かれている。老人たちが戻れないと主張する昭和そのもの、「シャッターの向こう側」の窓（story）。
- **保持するもの**: 金属枠の縦横桟、ガラス反射の筋、手前の床、天井、緑看板、左の黒い側面、レンガ帯。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of an underground shop front with a large glass facade covered by grey curtains.
  Make ONLY this change: all grey curtains behind the glass are drawn open, and through the glass we see the warm interior of an old Showa-era Japanese coffee shop with nobody in it: warm amber lamps, a wooden counter, round stools upholstered in red vinyl (one stool pulled slightly out), a shelf lined with plain unlabeled cream-soda glasses. The interior is clearly warmer and brighter than the corridor. The metal window mullions and transoms stay exactly where they are, and the existing faint reflections on the glass stay visible. The corridor floor, ceiling, green sign, black side panel and brick band remain cold blue-grey and untouched; the warm light must not spill onto the floor.
  There must be no menus, no signs, no shop names, no lettering and no logos anywhere. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①割付図: ガラス各枠の多角形（桟位置は `--list-elements CAM05` と原寸拡大で確定）。②全景 3 テイク。③元画像を下・生成を上に置き、ガラス各枠の内側ポリゴンだけを採用、桟と反射ハイライトは screen で元から戻す。境界ぼかし 1〜2 px。④床に暖色が漏れていないことを差分で確認。
- **難所と没基準**: 文字（メニュー・看板）の混入、桟の遠近が崩れる（桟は元から戻す）、暖色が床へ漏れる（別異変になる）は没。
- **フェーズ / 目立ち度**: mid〜late / obvious。
- **台帳案**: category `surreal` / anomaly_type `state_change` / detail 「正面ガラスのカーテンが全て開き、無人の昭和の喫茶店の暖かい店内が見える」。note に「大面積。CAM05-E08。AR-05-glass-light 等と排他」を書く。
- **既存との関係（差分と排他）**: `AR-05-glass-light`（(324,194) 187x336、古い店の灯りが映る）と役割が被り、`AR-05-curtain-open`（カーテン 1 枚が少し開く）・`AR-05-amber-pane`（ガラス 1 枚が琥珀色）・`AR-05-chair-reflection`・`AR-05-old-woman-in-glass`・`AR-05-sign-in-glass`・`AR-05-wind-chime` はいずれも同じガラス面で、本件の「全面開放＋店内」の部分集合か上書きに当たる。**これらは全て排他**（同プレイ非共存）。差分: 本件は店内の実像（カウンター・椅子・棚）が見え、反射像でも部分変化でもない。`AR-06-reopened`（CAM06）は別カメラで、この型は CAM05 に限る。
- **生成枚数の最小見積り**: 全景 3 テイク。

### CR-LG-05-02 床一面の白い折り鶴

- **ID / camera / element_id**: CR-LG-05-02 / CAM05 / CAM05-E13
- **面**: box 0,610,675,900（195,750 px²、32.2%）。前景の床一面。
- **物と変化**: 床一面に、無地の白い折り鶴が敷き詰められる。大きさは遠近で手前が約 60px、奥（y610 付近）が約 25px。向きは様々で互いに少し重なり、隙間から床が少しだけ覗く程度に密。
- **不気味さの狙い**: 千羽鶴＝無事を祈る品。行方不明 4 人の「帰ってきますように」が誰も居ない通路に積もっている。白い鶴の海。
- **保持するもの**: 天井・正面ガラス区画・手前以外の面。床の照明反射は折り鶴の上でも薄く残す（screen）。
- **生成プロンプト全文**（折り鶴素材を別生成）:
  ```
  $imagegen Create a flat top-down photo of about twelve plain white origami paper cranes of varied orientation (some seen from above, some from the side, wings spread) lying close together on a dark grey stone tile floor, casting short soft dark shadows. The paper is completely blank, matte white with subtle fold creases, no printing, no writing, no patterns, no colours, no logos. Each crane is distinct and well formed with a clear head, tail and two wings. Even low-light surveillance-style lighting, fine film grain, slight blur.
  Output 1536x1024 (3:2). No watermark.
  ```
- **作り方**: ①素材 3 テイクから最良を選び、鶴を 1 羽ずつ切り出して 8〜12 種のスプライトにする。②割付図: 床の消失点へ向かう流線に沿った散布（スケール s = f(y)、手前 60px → 奥 25px）、位置はポアソン円板で重なり少なめ。③各羽に接地影（multiply）、床の反射は screen で戻す。④全面均一を避け、密度は帯ごとに変える。⑤ポリゴンは床の全面（柱・正面ガラスの接地線で止める）。
- **難所と没基準**: 折り鶴が不格好（頭・羽が判別不能）なスプライトは使わない。紙に文字が出たら没。コピペ感（同じ羽の反復）が見えたら回転・反転・縮尺を増やす。
- **フェーズ / 目立ち度**: early〜mid / obvious（白が暗い床で強く、視認性 floor は余裕）。
- **台帳案**: category `object` / anomaly_type `multiply` / detail 「床一面に、無地の白い折り鶴が敷き詰められる」。note に「大面積。CAM05-E13」を書く。
- **排他**: `AR-05-pet-bottle`・`AR-05-marbles-scattered`・`AR-05-floor-glare-backside`・`AR-05-joint-into-glass`（床の小物で、鶴に覆われる）。折り鶴系の近縁 `AR-07-crane`（CAM07 の天井 1 羽）・`AR-01-container-origami`・CR-02-21・CR-08-20 は別カメラ・別規模で併存可（型は「床一面」でここだけ）。
- **生成枚数の最小見積り**: 素材 3 テイク。

### CR-LG-06-01 右壁一面の同じポスター（手を振る子供の後ろ姿）

- **ID / camera / element_id**: CR-LG-06-01 / CAM06 / CAM06-E15
- **面**: box 500,40,675,860（143,500 px²、23.6%）。右側の粗い壁の遠近台形。
- **物と変化**: 右の壁一面に、**完全に同じ絵柄**（手を振る子供の後ろ姿の無地の絵、文字なし）のポスターが隙間なく縦横に並ぶ。既存の額入り掲示と扉は残す。
- **不気味さの狙い**: 同じ絵が数百枚並ぶ説明のつかなさ。手を振って遠ざかる後ろ姿は、シャッターの向こうへ行ったまま戻らない 4 人目の子供そのもの（story）。後ろ姿なので顔は無く、誰の子かも分からない。
- **保持するもの**: 壁の粗い質感、扉、取手、額入り掲示、天井・床との境、手前の影。
- **生成プロンプト全文**（ポスター素材を 1 枚別生成）:
  ```
  $imagegen Create one flat, straight-on photo of a single plain poster printed on cream paper (portrait orientation, slightly faded, one small piece of tape at each top corner), showing a simple gentle illustration of a small child seen from behind, standing in a quiet empty corridor and waving one hand, wearing a plain T-shirt and shorts, with soft muted watercolour colours and a lot of empty space around the figure. The child's face is not visible. The poster has no title, no caption, no writing, no numbers, no letters, no logos anywhere, and no border text. Even low-light surveillance-style lighting, fine film grain, a plain dark grey wall visible around the poster.
  Output 1536x1024 (3:2). No watermark.
  ```
- **作り方**: ①素材 3 テイクから 1 枚を選ぶ（指は 5 本、腕は 1 本だけ上げているか目視）。②割付図: 右壁の消失点へ向かう台形に格子（手前 5 列→奥ほど細く、縦 10〜12 行）。扉・額・取手は格子から抜く。③遠近ワープ＋壁の粗面を multiply／displace で反映。④ポリゴン alpha で切り出す。
- **難所と没基準**: 絵に文字が出る・子供が複数／顔が見える・腕が崩れるテイクは没。完全同一の複製なので 1 枚の品質がすべて。壁の粗面にマスクが追従しにくいので境は巾木・天井線で止める。
- **フェーズ / 目立ち度**: mid〜late / obvious。
- **台帳案**: category `object` / anomaly_type `duplicate` / detail 「右の壁一面に、手を振る子供の後ろ姿の同じポスターが隙間なく並ぶ」。note に「大面積。CAM06-E15。AR-06-wall-puddle と排他」を書く。
- **排他**: **`AR-06-wall-puddle`（bbox が 35,350 px² 重なる大面積。既定は排他）**、`AR-06-tilted-notice`・`AR-06-wall-stripes`（壁の小物で覆われる）、`AR-06-ceiling-panel-white` は天井側で併存可。`AR-06-wet-footprints` は床で併存可。CR-LG-01-02（顔写真の格子）・03-01（無地の白紙）とは型が別で、顔は出さない。
- **生成枚数の最小見積り**: 素材 3 テイク。

### CR-LG-06-02 天井一面の傘（逆さに吊られる）

- **ID / camera / element_id**: CR-LG-06-02 / CAM06 / CAM06-E01
- **面**: box 0,0,495,255（126,225 px²、20.8%）。天井一面。
- **物と変化**: 天井から、無数の無地の傘が**逆さ**（曲がり柄を上、開いた傘面の頂点を下、お椀を伏せた形）に吊られる。色は黒・透明（ビニール）・赤の 3 種。奥へ遠近で小さく密に連なる。
- **不気味さの狙い**: 地下街は雨宿りの場所。持ち主が消えて傘だけが戻ってきて、天井に吊られている。傘が全部「逆さ」なので静かに気味が悪い。
- **保持するもの**: 天井の板継ぎ目・点状汚れ、蛍光灯（E03）、丸灯、吊り看板「まちがいサラダ」（x約145-235, y約140-215）、左壁との境、壁面以下の全て。傘は看板の高さまで下がらず、看板の上端（y≈135）より上、または看板の外側に収める。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of an underground shopping arcade corridor (the ceiling occupies the upper part of the frame).
  Make ONLY this change: hang many dozens of plain, open umbrellas upside down from the ceiling on thin cords: each umbrella is hung by its curved handle clipped to the cord, the open canopy hangs below like an inverted bowl with its tip pointing down. Umbrellas are completely plain in three kinds only: solid black, clear transparent vinyl with visible metal ribs, and solid red; no prints, no tags, no brand marks, no lettering. They recede toward the far end of the corridor with correct perspective, big near the camera and small and dense far away, hanging at slightly different heights but all above the hanging sign that stays visible. The existing ceiling fluorescent tubes, round lamps and the hanging sign stay visible between the umbrellas and the fluorescent light stays on.
  Do not touch the floor, walls, plants, shopfronts or anything below the ceiling line. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①割付図: 消失点（奥の通路）への流線に傘の位置・サイズ（手前 55px → 奥 10px）・色（黒・透明・赤の比 5:3:2）を割り付け、吊り看板と蛍光灯の矩形を避ける。②全景 3 テイク（天井以外は元画像で上書き）。③ポリゴン（天井の台形）内で傘＋吊り紐だけを差分抽出（`--box 0,0,495,255 --threshold 20`）。bbox が 126,225 → 1/8 を割らないよう右端・奥側まで傘を配置する。
- **難所と没基準**: 傘が正立（柄が下）になるテイクは没。透明傘は背景が透けて破綻しやすい。傘に柄・文字が出たら没。看板と交差・重なりは没。
- **フェーズ / 目立ち度**: mid / obvious。
- **台帳案**: category `environment` / anomaly_type `add_object` / detail 「天井一面に、無地の黒・透明・赤の傘が逆さに無数に吊られる」。note に「大面積。CAM06-E01。近傍: AR-06-ceiling-balloons（(0,1) 108x87、同じ天井）」を書く。
- **排他**: `AR-06-ceiling-balloons`・`AR-06-ceiling-checker`・`AR-06-lamp-squared`・`AR-06-fluorescent-tag`（天井の小物で同じ面）。傘の近縁 `AR-06-umbrella`（店先の畳んだ傘）・`AR-06-reflected-umbrella`（ガラスの赤い傘）は同カメラで傘が重なるので併存させない運用を推奨（同じ「傘」と数えられる）。CR-01-37・CR-04-17 は別カメラの小物。
- **生成枚数の最小見積り**: 全景 3 テイク。

### CR-LG-07-01 後壁一面の針だけの時計（全部が違う時刻）

- **ID / camera / element_id**: CR-LG-07-01 / CAM07 / CAM07-E12 ほか（後壁一面: E07/E08/E11/E12）
- **面**: box 88,126,585,352（112,322 px²、18.5%）。後壁の面（階段奥の壁・中央白壁・右壁面）。
- **物と変化**: 後ろの壁一面に、**数字も目盛りも文字もない無地の丸い時計**（白い文字盤に細い黒縁、針だけ）が 24〜36 個、隙間少なく並び、全部が違う時刻を指す。大きさは 2〜3 種。
- **不気味さの狙い**: 閉店した地下街の時間が、ばらばらに止まっている。老人 3 人と子供の「戻りたい時間」が別々だという暗示（story: 異変の数は行方不明の数で増える）。針だけで目印がないため、何時かも読めない。
- **保持するもの**: 灰色扉（E13）と取手・押し板、黒い縦開口、丸看板（E08）・扉の貼り紙（E07）・ピクトグラム、緑の非常灯、天井・床・階段、柱と壁の境の影と陰影。時計は扉枠・開口枠の手前で止まる。
- **生成プロンプト全文**（文字盤素材を別生成。針はスクリプトで描く）:
  ```
  $imagegen Create a flat, straight-on photo of a single plain round wall clock face: a smooth matte white dial with a thin black round bezel and NO hands, NO numerals, NO tick marks, NO dots, NO brand, NO lettering of any kind; only a small black centre cap in the middle. Slightly aged, with a faint grey dust cast and a very soft shadow on a plain pale-grey wall around it. Even low-light surveillance-style lighting, fine film grain.
  Output 1536x1024 (3:2). No watermark.
  ```
- **作り方**: ①素材 2 テイクから文字盤を 1 枚選び、切り出して円形スプライト化。②**針は `uv run --with pillow python3` のスクリプトで時・分針を個別に描く**（太さ・長さの比を固定、角度は乱数で全件異なる時刻、針の影を薄く）。モデルに針を描かせない（時刻が揃う・数字が混ざるため）。③割付図: 壁の正面度が高い中央〜右は正面グリッド（大 22px・中 16px）、左の階段壁は遠近ワープ。扉・開口・看板・ピクトグラムは格子から抜く。④壁の明暗を multiply で乗せる。⑤ポリゴン alpha で切り出す。
- **難所と没基準**: 針の角度が全て異なること（同時刻の重複は没）、文字盤に数字・目盛りが出たら没、扉枠にはみ出したら没。小さな円（約 20px）が潰れないよう、大面積でも時計は大きめにする。
- **フェーズ / 目立ち度**: late / obvious。
- **台帳案**: category `surreal` / anomaly_type `multiply` / detail 「後ろの壁一面に、針だけの無地の時計が無数に並び、全部が違う時刻を指す」。note に「大面積。CAM07-E12 ほか。昭和テーマ節の『時計は候補にしない』は既存時計の改変の話で、本件は足す案（kako-jun 指示 2026-11-04）」を書く。
- **排他**: `AR-07-notice`・`AR-07-reopened`・`AR-07-wall-grid`・`AR-07-pictogram-flip` などの壁の小物（覆われるもの）。`AR-07-crane`・`AR-07-stairs-cat`・`AR-07-shoe-v2` 等の床・階段・天井物は併存可。同カメラの 07-02（シーツ）とは box が 4px 離れていて併存可。
- **生成枚数の最小見積り**: 素材 2 テイク（針はスクリプト）。

### CR-LG-07-02 天井から垂れる白いシーツ

- **ID / camera / element_id**: CR-LG-07-02 / CAM07 / CAM07-E01
- **面**: box 0,0,675,122（82,350 px²、13.6%）。天井一面。**シーツの裾は y118〜120 を下限とし、後壁の 07-01 の box（y126〜）に入らない**。bbox を 1/8（高さ 113px 以上）に保つため、幅の端から端まで、少なくとも数枚は裾が y118 に届くようにする。
- **物と変化**: 天井から、無地の白いシーツが 8〜12 枚、間隔を変えて垂れ下がる。長さは不揃いでゆるくたわむ。蛍光灯・換気口・丸灯は本物のまま、シーツの間から見える。
- **不気味さの狙い**: 病室か洗濯場のように、誰も寝ていない清潔な白が天井から並ぶ。人の形は作らない（幽霊の見立てにしない）。老人の記憶の「干してあるシーツ」。
- **保持するもの**: 蛍光灯・換気口・丸灯・黒い小器具と非常灯、壁・階段・床、天井の黒斑点の質感（シーツの隙間に残す）。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of a corridor ceiling (the ceiling occupies the top strip of the frame).
  Make ONLY this change: hang eight to twelve plain white bed sheets from the ceiling, each draping straight down as a loose rectangular curtain of fabric with soft vertical folds and a hem at the bottom, in uneven spacing and slightly different lengths, a few swaying slightly. The sheets are completely plain white linen, no print, no stripes, no stains forming shapes, no holes, no eyes, not shaped like a person or a ghost, no text or logos. They hang no lower than the top edge of the wall (the lowest hem is about 8 percent of the frame height from the top). The existing fluorescent lights, the vent and the round lamps stay visible between the sheets and the fluorescent lights stay on.
  Do not touch the wall, stairs, doors, signs, floor or anything below the ceiling line. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①割付図: シーツの吊り位置（天井の板継ぎ目沿い）・幅（40〜90px）・裾の高さ（80〜120px）を決め、蛍光灯・換気口・丸灯の矩形を避ける。②全景 3 テイク。③天井ポリゴン（y0〜122）内で、シーツ本体だけを差分抽出（`--box 0,0,675,122 --threshold 20`）。④裾が y122 を越えたテイクは切らず没（07-01 と重なる）。
- **難所と没基準**: 人型・幽霊型に見える（目の穴・頭部の盛り上がり）は没。裾が y122 を超える、または蛍光灯を隠すものは没。白が暗い天井で飽和して形が潰れないよう陰影を残す。
- **フェーズ / 目立ち度**: mid / medium。
- **台帳案**: category `environment` / anomaly_type `add_object` / detail 「天井から無地の白いシーツが何枚も垂れ下がる（蛍光灯と換気口は残る）」。note に「大面積。CAM07-E01。bbox 面積が余裕小なので貼り込み後に必ず再計測」を書く。
- **排他**: `AR-07-crane`（(325,0) 79x240、天井から吊る折り鶴。本件と同じ面）・`AR-07-ceiling-string`・`AR-07-paper-tag-lamp`・`AR-07-paper-airplane-ceiling`・`AR-07-lamp-off`（天井の小物）。
- **生成枚数の最小見積り**: 全景 3 テイク。

### CR-LG-08-01 床一面の水鏡（映るのは昭和の夕焼けの商店街）

- **ID / camera / element_id**: CR-LG-08-01 / CAM08 / CAM08-E16（E17/E18 を含む床一面）
- **面**: box 0,430,675,900（317,250 px²、52.2%）。手前の床全面。
- **物と変化**: 床全面が薄く水を張ったような鏡面になる。水面に映るのは本来の天井でなく、夕焼けの空・電線・昭和の商店街の屋根と無地の吊り看板（逆さ）。柱の根元の影と柱そのものの反射は正しく映り、床の目地は水の下に薄く透ける。夕焼けの方向は右奥。さざ波は弱く。
- **不気味さの狙い**: 現実の天井は変わらないのに、床だけが「上に昭和の空がある」ように見える。老人の記憶が作る像（story）。
- **保持するもの**: 柱 E11 と根元、右の壁／パネル E14/E15 の足元、奥の通路、既存の床反射の白い光点（上からかぶせる）。床の目地格子は multiply 30% で透けさせる。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of a large tiled underground hall.
  Make ONLY this change: the entire floor in the lower half of the frame becomes a thin, perfectly calm sheet of water acting as a mirror. In the water we see, mirrored, not the real ceiling but a warm orange-pink sunset sky with thin clouds, overhead wires, tiled roofs of a Showa-era Japanese shopping street and hanging signboards that are completely blank white (reflected upside-down), the sun low in the far right. The pillar and the bottom of the right-hand wall are reflected correctly in the water, with their contact lines continuing seamlessly into their mirror images; faint tile joints remain visible beneath the water. The existing white lamp reflections on the floor remain as bright spots. The ripples are very weak.
  Do not touch the ceiling, pillar, walls, far corridor or the left shopfront. There must be no letters on the reflected signboards, no logos, no shop names. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①割付図: 反射の幾何（画面を水平な鏡面で垂直反転した像の位置）を先に決め、柱の接地線を軸にした鏡像と、夕焼けの方向（右奥）を図示。②全景 3 テイク。③床のポリゴン（柱の根元の輪郭と壁の巾木で止める）内を採用し、元の床の明暗階調を multiply で一部乗せる。④`--box 0,430,675,900 --threshold 24` と高めにし、広範囲の粒状ノイズを拾わない。
- **難所と没基準**: 面積が最大で作り物感が出やすい。柱の接地線が鏡像と連続しない・看板に文字・夕焼けの色相が弱く「何が違う」か不明は没。既存の足元反射の光点を消さない。
- **フェーズ / 目立ち度**: mid〜late / obvious。
- **台帳案**: category `surreal` / anomaly_type `reflection` / detail 「床全面が水鏡になり、映るのは天井でなく昭和の夕焼けの商店街」。note に「大面積。CAM08-E16」を書く。
- **排他**: 床の小物 `AR-08-floor-reflection-two-tier`・`AR-08-floor-reflection-no-pillar`・`AR-08-tile-concentric`・`AR-08-floor-ramune-marbles`・`AR-08-panel` は水鏡と矛盾・重複するので排他。
- **生成枚数の最小見積り**: 全景 3 テイク。

### CR-LG-08-02 左のショーウィンドウに積まれた白黒テレビ

- **ID / camera / element_id**: CR-LG-08-02 / CAM08 / CAM08-E06・E07（左の店先ガラス戸一面）
- **面**: box **0,130,270,425**（79,650 px²、13.1%）。**元の案の box 0,135,280,420（79,800）から微調整**。実際のガラス戸は x0〜約 132（E06）・約 183（E07）で、ガラス単独では約 183×230=42,000 px²（6.9%）しかなく、1/8 に足りない。そこで**積んだテレビの山がガラスの外へ崩れて広がり、隣の暗い壁と明るい通路の入口（E08、x約 170〜256）まで、柱の左面（x約 258）の手前まで占める**構成にして、alpha bbox を 1/8 以上にする。下端は 08-01 の box（y430〜）に 5px の隙間を残して y425。**この拡張は仕様の判断点**（通路入口を TV の山が塞ぐ）で、kako-jun の確認が要る。
- **物と変化**: ショーウィンドウ一面に白黒のブラウン管テレビが積まれ、**全画面が同じ無人の通路**（通路の奥へ続く床と壁だけ、人も文字もなし）を映す。山は窓の底から床へこぼれ、柱の手前まで続く。
- **不気味さの狙い**: テレビの中の通路は、いま画面にある通路と同じ（監視カメラの映像そのもの）。見られているのは自分たち。シャッターの向こうへ行った人々が見ているのか、という含み（メタ構造: 報告すべきか悩ませる）。
- **保持するもの**: ガラス戸の木枠・金属縦枠・取手、柱 E11 とその根元、床の反射と接地、左上の天井灯の列、右の床・壁。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of an underground hall (the left part shows a dark shop window with a wooden frame and a bright narrow aisle beside it).
  Make ONLY this change: a tall pile of old black-and-white CRT television sets (rounded plastic cases in grey and cream, bulging glass screens, small knobs without any lettering) fills the left shop window completely and spills out from its base to the floor in front, stacked unevenly, stretching right up to just before the pillar. Every screen is switched on and shows exactly the same picture: a plain empty underground corridor with a tiled floor and walls, receding to a dark far end, in grainy grey monochrome with faint scanlines, no people, no text, no logos. The screens glow a cold white-grey and cast soft light on the floor in front of the pile. Keep the wooden window frame and metal mullions visible where they are.
  Do not touch the pillar, the right wall and panels, the ceiling, or the floor outside the pile. No letters, no numbers, no brand names anywhere on the sets. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①素材: 画面に映す無人通路は `public/images/cam8.webp` 自身の縮小（通路の奥を切り出し、グレースケール化＋走査線）で用意する（**生成不要**・「同じ通路」を厳密に満たす）。②テレビ筐体の素材（空の画面の白黒テレビ 1 台）を別生成し、スクリプトで画面ポリゴンに①を埋める。③割付図: 山の積み方（段ごとの大きさ・傾き）を決め、スプライトを積む。④ガラス戸の枠・柱は元画像から戻す。⑤ポリゴン alpha で切り出し、alpha bbox が 257×295 以上（面積 75,938 以上）か `check` する。
- **難所と没基準**: 画面の映像が全台同じでない・テレビに文字・ロゴが出る・山が柱にかかる（柱は保持）・bbox が 1/8 を割るのは没。画面内の通路が小さすぎて読めないときは台数を減らして大きくする。
- **フェーズ / 目立ち度**: mid〜late / obvious。
- **台帳案**: category `camera` / anomaly_type `duplicate` / detail 「左のショーウィンドウに白黒テレビが積まれ、全画面が同じ無人の通路を映す」。note に「大面積。CAM08-E06/E07。box は通路入口まで拡張」を書く。
- **排他**: `AR-08-bag`・`AR-08-notice-residue`・`AR-08-cat`・`AR-08-barber-pole`（左ガラス・通路入口の小物で山に覆われる）。`AR-06-crt-tv-glow`（CAM06 の窓の奥の 1 台。別カメラ・別規模で併存可）。この型（テレビ）は CAM08 だけに限る。
- **生成枚数の最小見積り**: 素材 2 テイク（筐体のみ）。映像は baseline の再利用。

---

### 生成枚数の総見積り（枠が限られるため最小）

| 件 | 素材テイク | 全景テイク |
| --- | ---: | ---: |
| 01-01 | 0 | 3 |
| 01-02 | 3 | 0 |
| 02-01 | 0 | 3 |
| 02-02 | 3 | 0 |
| 03-01 | 2 | 0 |
| 03-02 | 0 | 3 |
| 04-01 | 3 | 2 |
| 04-02 | 3 | 0 |
| 05-01 | 0 | 3 |
| 05-02 | 3 | 0 |
| 06-01 | 3 | 0 |
| 06-02 | 0 | 3 |
| 07-01 | 2 | 0 |
| 07-02 | 0 | 3 |
| 08-01 | 0 | 3 |
| 08-02 | 2 | 0 |
| **計** | **24** | **23** |

合計 47 生成。全景を使う件は、1 テイクだけ試して採用可能なら残りを省く運用もできる（下限 16〜24 生成）。生成は**1 件ずつ**、依存する絵は直列。
