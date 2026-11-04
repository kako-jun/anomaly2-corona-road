# 異変候補プール

まだ採用・生成した異変ではなく、写真の写り込みから発想を広げる写真固有案、昭和テーマ案、令和テーマ案（4人目の子供の記憶）、写真に紐づかない runtime 在庫、制作仕様まで確定した未制作の小物をまとめた候補。

## 正本と昇格ルール

- 写っている物の説明・座標・カメラ写真の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。写真固有の候補ではここでは要素IDだけ参照し、物体説明や座標を複製しない。
- 「制作仕様（確定済み・未制作の小物）」の節は、box・生成プロンプトまで確定した未制作案。制作して台帳へ移したら、その項を丸ごと削除する。
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

## 制作仕様（確定済み・未制作の小物）

小物の画像異変（CAM01〜08）の**制作仕様**。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。これは候補の正本の一部で、採用して制作に進む時は、その項を削除して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md) のままで、ここの box は作業用の最終値（ledger には最終 overlay の alpha bbox から出た `overlay_origin` / `dimensions` を入れる）。

- **配置の実測**（2026-11-04）: 各 box は、`anomalies.yaml` の同じ `camera_id` の全 overlay（`overlay_origin` と `dimensions`）、および本節の他の項の box から、**矩形間の距離が 30px 以上**あることを `uv run --with pyyaml python3` の実測で確認した（README「配置の基準」）。CAM01 だけは、PR #97 で台帳に登録する竹ぼうき・黄色い長靴（マージ前）の実際の alpha bbox も既存扱いにして測った。各項の「最寄り既存 overlay と実測距離」は box 基準なので、羽毛ぼかしで overlay が広がる分、制作後に alpha bbox で測り直す（36px 未満の項は特に必須）。
- **box の見直し**: 6倍クロップで物と影が収まるか全件を目視し、次の項は場所か形を直した。いずれも各項の「物と変化」に ※ で理由を書いてある。やり直し: CR-NEW-01-04 / CR-NEW-01-05 / CR-NEW-01-06 / AR-04-flypaper / AR-08-n1 / AR-08-n3。寸法補正: CR-NEW-02-04 / AR-04-tote-bag / CR06N-1。box の形に合わせて変化の描き方を変更: CR-NEW-02-02 / CR-NEW-02-04 / CR05N-5。
- **共通手順**（`.agents/skills/corona-road-anomaly/SKILL.md` の手順 5〜8 と同じ）:
  1. 各項の「6倍クロップ」の範囲を `public/images/camN.webp` から切り出し、1536x1024 へ拡大する（baseline の webp は PNG に変換してから渡す）。
  2. 明示的な `$imagegen` で、各項のプロンプトを3テイク生成し、目視で選ぶ。0バイトや数KBの壊れた PNG は撮り直す。文字やロゴらしき刻印が出たテイクは捨てる。
  3. 選んだ結果を元のクロップ寸法へ縮小して baseline の PNG の同じ位置へ貼り戻し、その貼り戻した全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。
  4. 最終 overlay の alpha bbox で既存との距離を測り直し、30px を割ったら動かす。台帳へ登録し、`check-visibility.py` を通す。通らなければ大きく・暗く・平らな場所へ強めて作り直すか、この節へ戻す。
  5. 登録・コミットしたら `experiments/` 配下の作業物を即削除する。
- 同種があるもの（吊り飾り・赤い丸い玩具・黄色い雨具・飲み物カップ・TV・三輪車など）は、各項の「相互参照」に既存 ID と差を書いた。制作前に見比べ、実質同じと判断したら取り下げる。

### CAM01 — North Entrance

#### CR-NEW-01-03 — 麦わら帽子

- **camera / element_id**: CAM01 / CAM01-E17
- **物と変化**: 床に無地の麦わら帽子が伏せて置かれている（夏の記憶）
- **最終 box**（baseline px）: `385,815,460,885`（75x70）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `294,729,550,900`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (91,86)-(166,156)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark foreground floor tiles, place one plain woven straw hat lying crown-up with its wide brim flat on the floor, natural pale straw color, completely plain with no ribbon, no band and no print. Make it about 1.3x larger than real scale. Give it a strong dark contact shadow around the brim. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the puddle-like light patch near it or the blue container at the right edge. Place the object, including its shadow, centered at about 50% from the left and 71% from the top of the image, occupying roughly 29% of the image width and 41% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地・近くの光だまり・右端の青い容器。
- **最寄り既存 overlay と実測距離**: AR-01-floor-puddle-light まで 33.0px（box 基準・矩形間のユークリッド距離、次点 AR-01-red-rubber-ball 34.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 淡い麦わら色は手前の暗いタイルと強く対比。つばの縁を明るく、影を濃く。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '床に無地の麦わら帽子が伏せて置かれる（夏の記憶）'` / `candidate_id: 'CR-NEW-01-03'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 同種の帽子: AR-03-white-cap（CAM03・奥の開口の床の小さな白い帽子）。別カメラ・別物（麦わら・手前の前景）。

#### CR-NEW-01-04 — 万国旗

- **camera / element_id**: CAM01 / CAM01-E01
- **物と変化**: 天井に無地の色褪せた三角旗の連が一本、たるんで垂れる（運動会の記憶。文字・図柄なし）。※設計やり直し: 旧box (280,215,370,265) は竹ぼうき・長靴の追加で余裕が無くなり、明るい天井上部へ移した
- **最終 box**（baseline px）: `335,15,425,65`（90x50）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `252,0,508,171`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (83,15)-(173,65)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the ceiling in the upper center, one single strand of plain faded triangular pennant flags (a bunting of about seven small triangular flags in muted red, yellow, blue and green, each completely plain with no letters, marks or patterns, strung on a thin dark string) sags in a shallow curve, seen from below. Make the flags about 1.4x larger than real scale and slightly more saturated than faded paper, so that they read clearly on the ceiling. Add a faint soft shadow of the string and flags on the ceiling surface. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the black speckles and panel seams of the ceiling, the round vent below, the ceiling lights or the fan area at the upper left. Place the object, including its shadow, centered at about 50% from the left and 23% from the top of the image, occupying roughly 35% of the image width and 29% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 天井の黒い斑点と板継ぎ目・下の丸い換気口・天井灯・左上のファン周辺。
- **最寄り既存 overlay と実測距離**: AR-01-ceiling-fan-showa まで 45.0px（box 基準・矩形間のユークリッド距離、次点 AR-01-vent-hole-triangle 83.0px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: environment / mid / medium
- **視認性の注意**: 天井面は青灰色で小さいので、旗は大きめ・高彩度（赤と黄を多め）にする。青・緑は天井に溶けやすいので少数に。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'environment'` / `anomaly_type: 'add_object'` / `detail: '天井に無地の色褪せた三角旗の連（万国旗）が一本垂れる（運動会の記憶）'` / `candidate_id: 'CR-NEW-01-04'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 吊り飾り系の兄弟: CR-NEW-02-04（七夕輪つなぎ）・CR05N-5（吹き流し）・CR06N-5（てるてる坊主）・AR-07-crane（折り鶴）。

#### CR-NEW-01-05 — 竹の手提げかご

- **camera / element_id**: CAM01 / CAM01-E17
- **物と変化**: 床に竹編みの買い物かごが一つ置かれる（昭和の買い物。無地）。※設計やり直し: 旧案は左壁の釘に掛けるものだったが、壁は異変が密集し竹ぼうきとも近接するため、左床の空きへ移して床置きに変更
- **最終 box**（baseline px）: `100,657,146,713`（46x56）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,600,256,771`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (100,57)-(146,113)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the floor tiles at the left side, next to the base of the left wall, place one plain woven bamboo shopping basket (a rounded rectangular basket of tightly woven pale tan bamboo strips with one arched bamboo handle folded upright), standing on the floor, completely plain with no tag and no print. Make it about 1.4x larger than real scale, because the free area is narrow. Give it a strong dark contact shadow on the floor tiles. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the dark baseboard and the rough wall at the upper left, the tile joints or the reflections. Place the object, including its shadow, centered at about 48% from the left and 50% from the top of the image, occupying roughly 18% of the image width and 33% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 左上の暗い巾木と粗い壁・タイル目地・反射。
- **最寄り既存 overlay と実測距離**: AR-01-power-bank まで 33.4px（box 基準・矩形間のユークリッド距離、次点 PR97-broom-alpha 34.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 箱の幅が46pxと狭い。縦長に見えるよう取っ手を立てる。淡い竹色は暗めの床に対比するが、壁際の暗い巾木に溶けないよう、巾木から離して床の中央側に置く。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左の壁際の床に竹編みの買い物かごが置かれる（昭和の買い物。無地）'` / `candidate_id: 'CR-NEW-01-05'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 同種の買い物かご: AR-04-basket（CAM04・赤い買い物かごがガラスに映る）。別カメラ・別物（竹・実物）。

#### CR-NEW-01-06 — タピオカドリンクのカップ

- **camera / element_id**: CAM01 / CAM01-E17
- **物と変化**: 床に半分飲みかけのミルクティー色のカップと太いストローが置かれている（令和の若者の持ち物。無地・ロゴなし）。※設計やり直し: 旧box (110,660,185,715) は竹ぼうきと重なるため、右前景の空きへ移した
- **最終 box**（baseline px）: `525,700,585,768`（60x68）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,648,675,819`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (106,52)-(166,120)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the floor tiles in the lower right of the frame, place one half-drunk bubble tea cup standing upright: a clear plastic cup filled to about the middle with opaque milk-tea beige drink and a layer of black tapioca pearls at the bottom, a thick wide black straw sticking out of a plain flat lid, completely plain with no logo, no text and no printed pattern on the cup or the lid. Make it about 1.5x larger than real scale. Give it a strong dark contact shadow and a small glossy highlight on the cup. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the metal threshold strip and the blue container at the right edge, the light pool or the tile joints. Place the object, including its shadow, centered at about 53% from the left and 50% from the top of the image, occupying roughly 23% of the image width and 40% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 右の金属の敷居帯と青い容器・光だまり・タイル目地。
- **最寄り既存 overlay と実測距離**: AR-01-red-rubber-ball まで 32.0px（box 基準・矩形間のユークリッド距離、次点 AR-01-floor-sign-reflection-inverted 34.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 透明カップは床に溶けるので、不透明寄りのミルクティー色と底の黒い粒、黒い太ストローで対比を作る。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '床にミルクティー色のカップと太いストローが置かれる（令和の若者の持ち物。無地・ロゴなし）'` / `candidate_id: 'CR-NEW-01-06'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 飲み物系: AR-02-coffee（CAM02・台のコーヒーカップ）・AR-04-paper-cup（CAM04）。別カメラ・令和の物。

### CAM02 — Main Corridor

#### CR-NEW-02-01 — 臙脂色の座布団

- **camera / element_id**: CAM02 / CAM02-E20
- **物と変化**: 床に無地の臙脂色の座布団が一枚（昭和の居間・喫茶店の記憶）
- **最終 box**（baseline px）: `20,625,120,720`（100x95）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,587,256,758`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (20,38)-(120,133)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the gray floor tiles at the left, place one plain square floor cushion (zabuton) in a saturated deep crimson-maroon cotton fabric, lying flat and slightly plump, with plain stitched corners and no pattern, no piping print and no tag. Keep it near real scale (the box is already large). Give it a soft but clearly visible dark contact shadow along its lower edges. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the white light reflection band on the floor, the tile joints or the shutter at the left edge. Place the object, including its shadow, centered at about 27% from the left and 50% from the top of the image, occupying roughly 39% of the image width and 56% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 床の白い反射帯・タイル目地・左端のシャッター。
- **最寄り既存 overlay と実測距離**: AR-02-receipt まで 35.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-cigarette 38.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 彩度の高い赤は灰色の床と強く対比。右隣の明るい反射帯を食わない位置で、座布団の右端が反射帯に触れないようにする。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '床に無地の臙脂色の座布団が一枚置かれる（昭和の居間・喫茶店の記憶）'` / `candidate_id: 'CR-NEW-02-01'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### CR-NEW-02-02 — 濃青のハンディファン

- **camera / element_id**: CAM02 / CAM02-E20
- **物と変化**: 床に濃い青の小型携帯扇風機が横倒しで置かれている（令和の夏の持ち物。無地・ロゴなし）。※設計補正: box が横長(110x47)なので「立てて」を「横に寝かせて」に変更
- **最終 box**（baseline px）: `190,618,300,665`（110x47）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `117,556,373,727`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (73,62)-(183,109)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the floor tiles, lay one small handheld portable fan on its side, with its round plain blade guard facing right and its short handle at the left, in dark navy blue plastic, completely plain with no logo, no text, no button labels and no printed marks. Make it about 1.5x larger than real scale. Give it a strong dark contact shadow and a small bright highlight along the plastic edge. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place it so that the handle end and the left part of the body overlap the white light reflection band on the floor, and the blade guard extends onto the gray floor to the right of the band; the dark navy body and its shadow must contrast clearly against the pale band. Do not touch the tile joints. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 43% of the image width and 27% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地（床の白い反射帯は保持対象でなく、扇風機を重ねる場所）。
- **最寄り既存 overlay と実測距離**: AR-02-tile-color まで 30.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-tile 31.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 暗い青は明るい反射帯の上では強く出るが、帯の外の灰色床では差が小さい。box の左約1/3（取っ手側）が反射帯に重なることを6倍クロップで実測確認済み（帯はクロップ内 x≈73〜110、box は x=73〜183）。本体は帯に重ね、暗色の本体と濃い影で対比させ、ガードの縁にハイライトを入れる。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '床に濃い青の小型携帯扇風機が横倒しで置かれる（令和の夏の持ち物。無地・ロゴなし）'` / `candidate_id: 'CR-NEW-02-02'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### CR-NEW-02-03 — 縄跳びの縄

- **camera / element_id**: CAM02 / CAM02-E20
- **物と変化**: 床に赤い木製グリップの縄跳びが輪になって置かれている（昭和の子供の遊び）
- **最終 box**（baseline px）: `250,800,370,885`（120x85）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `182,729,438,900`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (68,71)-(188,156)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark foreground floor tiles, lay one children's jump rope in a loose ring on the floor: a thin cream-colored rope forming a loop, with two plain red wooden handles lying beside the loop, no text and no print. Make it about 1.3x larger than real scale, with a slightly thicker rope so that it reads clearly. Give the rope and the handles a strong dark contact shadow. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the grain of the floor or the shadow areas around it. Place the object, including its shadow, centered at about 50% from the left and 66% from the top of the image, occupying roughly 47% of the image width and 50% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地・床の粒状感・周囲の影。
- **最寄り既存 overlay と実測距離**: AR-02-smartphone-facedown まで 36.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-leather-footprints 39.0px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 手前の暗い床に、赤いグリップとクリーム色の縄で対比。縄は細いので、1.3倍と太めで明部を作る。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '床に赤い木製グリップの縄跳びが輪になって置かれる（昭和の子供の遊び）'` / `candidate_id: 'CR-NEW-02-03'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### CR-NEW-02-04 — 七夕の輪つなぎ飾り

- **camera / element_id**: CAM02 / CAM02-E01
- **物と変化**: 天井の上端から色紙の輪つなぎ飾りが弧を描いて垂れる（昭和の行事の記憶。文字なし）。※設計補正: box が横長(95x40)なので「垂れる一本」を「弧を描くたるみ」に変更。右の看板から少し離すため box を10px左へ
- **最終 box**（baseline px）: `495,0,590,40`（95x40）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `414,0,670,171`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (81,0)-(176,40)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: at the very top of the frame on the dark ceiling, one chain of interlocking paper rings (a wa-tsunagi garland of about six plain rings in saturated red, yellow, blue and green colored paper) is draped in a shallow U-shaped swag, with both ends running off the top edge of the frame, completely plain with no writing and no pattern. Make it about 1.4x larger than real scale and highly saturated. Add a faint soft shadow on the ceiling behind it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the dark ceiling panel, the round light, the red sign on the right or the dark wall edge. Place the object, including its shadow, centered at about 50% from the left and 12% from the top of the image, occupying roughly 37% of the image width and 23% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 暗い天井パネル・丸い灯・右の赤い看板・暗い壁の縁。
- **最寄り既存 overlay と実測距離**: AR-02-smoke まで 34.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-rusty-vent 109.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: environment / mid / medium
- **視認性の注意**: 暗い天井では高彩度の赤と黄が効く。青・緑は暗さに沈むので少なめ。右の赤い看板に近いので、看板へ色を滲ませない。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'environment'` / `anomaly_type: 'add_object'` / `detail: '天井の上端から色紙の輪つなぎ飾りが弧を描いて垂れる（昭和の行事の記憶。文字なし）'` / `candidate_id: 'CR-NEW-02-04'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 吊り飾り系の兄弟: CR-NEW-01-04・CR05N-5・CR06N-5・AR-07-crane。

#### CR-NEW-02-05 — 白黒テレビ

- **camera / element_id**: CAM02 / CAM02-E09
- **物と変化**: 奥の暗い店内に小さな昭和の白黒テレビが点き、淡い砂嵐の光を放つ（失われた日常の気配）
- **最終 box**（baseline px）: `200,195,268,275`（68x80）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `106,150,362,321`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (94,45)-(162,125)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: inside the dark shop opening at the back of the corridor, place one small old black-and-white portable television set (a rounded boxy dark case with a small square screen, two plain round knobs and short antennas, no brand text) standing on the floor of the shop and turned on, its screen showing pale bluish-white static snow and spilling a faint cool glow onto the floor in front of it. Make it about 1.4x larger than real scale. Instead of a heavy shadow, add a soft pale glow spill on the dark floor in front of the set. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the surrounding dark shop interior, the door frames, the pillar on the right or the signs above. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 27% of the image width and 47% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 周囲の暗い店内・扉枠・右の柱・上の看板（黒潰れは黒のまま）。
- **最寄り既存 overlay と実測距離**: AR-02-shop-reopens まで 33.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-pillar-notice 56.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: environment / late / medium
- **視認性の注意**: 暗所で発光するので視認しやすいが小さい。画面の明るさを白く強め、周囲の暗部を落とさない（黒潰れの部分は黒のまま）。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'environment'` / `anomaly_type: 'add_object'` / `detail: '奥の暗い店内の床に小さな白黒テレビが点き、淡い砂嵐の光を放つ（失われた日常の気配）'` / `candidate_id: 'CR-NEW-02-05'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: **同種: AR-06-crt-tv-glow（CAM06・左端の暗い店先の窓の奥に青白く砂嵐を放つ小さなブラウン管テレビ）。** 意図的な反復シリーズ（別カメラ・別の置き場所）として扱い、制作前に見比べて重複と判断したら取り下げる。反復に価値がある理由: 「消えたはずの店のテレビが、別の場所でも点いている」という同じ気配が複数の画面で繰り返されると、プレイヤーは見つけた1件目を手がかりに2件目を探す楽しみが生まれる。差分は、AR-06-crt-tv-glow が窓の奥の店先・左端の暗所、こちらは通路奥の店内の床に置かれた小型の白黒機。

#### CR-NEW-02-06 — 小型スーツケース

- **camera / element_id**: CAM02 / CAM02-E20
- **物と変化**: 床にミントグリーンの小型スーツケースが倒れず立っている（令和の旅の持ち物。無地・ロゴなし）
- **最終 box**（baseline px）: `30,760,190,880`（160x120）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,729,256,900`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (30,31)-(190,151)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the floor tiles in the lower left foreground, place one small plain mint-green hard-shell cabin suitcase standing upright on its wheels with the telescopic handle retracted, glossy plain shell with faint ribbed lines only, completely plain with no logo, no tag, no sticker and no text. Keep it near real scale (the box is already large). Give it a strong dark contact shadow on the floor and a soft highlight on the shell. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the white light reflection band on the right of it, the tile joints or the shutter at the left edge. Place the object, including its shadow, centered at about 43% from the left and 53% from the top of the image, occupying roughly 62% of the image width and 70% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 右の白い反射帯・タイル目地・左端のシャッター。
- **最寄り既存 overlay と実測距離**: CR-NEW-02-01 まで 40.0px（box 基準・矩形間のユークリッド距離、次点 CR-NEW-02-03 60.0px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / mid / obvious
- **視認性の注意**: 大きな物体で見えやすい。明るい反射帯の中に入ると薄い緑が溶けるので、反射帯の左の暗い灰色床に置く。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '床にミントグリーンの小型スーツケースが倒れず立っている（令和の旅の持ち物。無地・ロゴなし）'` / `candidate_id: 'CR-NEW-02-06'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

### CAM03 — South Exit

#### AR-03-tricycle — 赤い三輪車(無地・文字なし)

- **camera / element_id**: CAM03 / CAM03-E16
- **物と変化**: 手前右寄りの広い床に、昭和の赤い金属フレームの三輪車が一台置かれる（黒い座面、黒いタイヤ、強い接地影）
- **最終 box**（baseline px）: `395,785,525,885`（130x100）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `332,729,588,900`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (63,56)-(193,156)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the wide floor tiles in the lower right foreground, place one vintage children's tricycle with a bright red metal frame, a black seat, black rubber tires and plain black handlebar grips, with no bell, no decal and no text, seen in the same perspective as the floor tiles. Keep it near real scale (the box is already large). Give it a strong dark contact shadow under the three wheels. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the dark patchy shadow of the floor or the edge of the shutter. Place the object, including its shadow, centered at about 50% from the left and 62% from the top of the image, occupying roughly 51% of the image width and 58% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地・床の暗い斑状の影・シャッターの縁。
- **最寄り既存 overlay と実測距離**: AR-03-silver-can まで 40.0px（box 基準・矩形間のユークリッド距離、次点 AR-03-kerosene-heater 42.7px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 赤いフレームと黒いタイヤで床に対比。暗い影の床に黒いタイヤが溶けやすいので、赤フレームの面積を大きく見せる角度にする。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '手前右寄りの床に、昭和の赤い三輪車が一台置かれる（無地・文字なし）'` / `candidate_id: 'AR-03-tricycle'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: **同モチーフ: AR-02-tricycle（CAM02・右手前の床の色褪せた赤い子供用三輪車）。** 子供の記憶の反復シリーズ（別カメラ。こちらは鮮やかな赤の金属フレーム）として扱い、制作前に見比べる。反復に価値がある理由: 同じ三輪車が別の場所にも現れると「子供が通った跡」が連続して読め、子供の記憶の筋が強まる。差分は、AR-02-tricycle が右手前の色褪せた赤、こちらは手前右寄りの広い床にある鮮やかな赤の金属フレームで、カメラと色の鮮やかさ・置き場所が違う。

#### AR-03-wash-tub — 黄色い無地の洗面桶(銭湯風、ロゴなし)

- **camera / element_id**: CAM03 / CAM03-E16
- **物と変化**: 左手前の暗い床に、昭和の黄色いプラスチック洗面桶が一つ伏せて置かれる
- **最終 box**（baseline px）: `30,795,140,875`（110x80）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,729,256,900`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (30,66)-(140,146)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark floor tiles in the lower left foreground, place one plain bright yellow plastic wash basin (a bathhouse-style round basin) lying upside down on the floor, completely plain with no logo, no embossed letters and no print. Make it about 1.3x larger than real scale. Give it a strong dark contact shadow and a soft highlight on the rounded plastic. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the floor grain or the light patches nearby. Place the object, including its shadow, centered at about 33% from the left and 62% from the top of the image, occupying roughly 43% of the image width and 47% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地・床の粒状感・近くの光の斑。
- **最寄り既存 overlay と実測距離**: AR-03-blue-floor-tile まで 48.8px（box 基準・矩形間のユークリッド距離、次点 AR-03-tile-diagonal 49.5px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 暗い床に鮮黄で強く対比。縁のハイライトで輪郭を出す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左手前の暗い床に、昭和の黄色いプラスチック洗面桶が一つ伏せて置かれる（無地）'` / `candidate_id: 'AR-03-wash-tub'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-03-insect-cage — 竹の虫かご(草と無地の紙片なし)

- **camera / element_id**: CAM03 / CAM03-E16
- **物と変化**: 左手前の影の床に、昭和の竹編みの丸い虫かごが一つ置かれる
- **最終 box**（baseline px）: `10,640,110,740`（100x100）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,604,256,775`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (10,36)-(110,136)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the shadowed floor tiles at the left foreground, place one round dome-shaped woven bamboo insect cage (pale bamboo strips woven into a dome with a small round plain bamboo base, a few blades of green grass visible inside), completely plain with no paper tag and no text. Make it about 1.4x larger than real scale. Give it a strong dark contact shadow beneath. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the shutter wall at the upper left, the tile joints or the floor grain. Place the object, including its shadow, centered at about 23% from the left and 50% from the top of the image, occupying roughly 39% of the image width and 58% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 左上のシャッター壁・タイル目地・床の粒状感。
- **最寄り既存 overlay と実測距離**: AR-03-paper-bag まで 32.0px（box 基準・矩形間のユークリッド距離、次点 AR-03-tile-diagonal 37.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 影の暗い床に淡い竹色で対比する。壁（シャッター）の下端に溶けないよう、シャッターから離して置く。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左手前の影の床に、昭和の竹編みの丸い虫かごが一つ置かれる（無地）'` / `candidate_id: 'AR-03-insect-cage'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-03-sake-bottle — 茶色い一升瓶(ラベルなし・無地)

- **camera / element_id**: CAM03 / CAM03-E16
- **物と変化**: 床中央の手前寄りに、ラベルの無い茶色い一升瓶が一本立つ
- **最終 box**（baseline px）: `410,578,480,655`（70x77）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `317,531,573,702`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (93,47)-(163,124)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the floor tiles in the center, stand one tall brown glass sake bottle (a Japanese isshobin of about 1.8 liters) upright, with a plain smooth body, a plain cap and no label at all, no text, no print. Make it about 1.3x larger than real scale. Give it a strong elongated dark shadow on the floor and a thin bright highlight along the glass. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the white light reflection patch behind it, the tile joints or the floor grain. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 27% of the image width and 45% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 背後の白い反射・タイル目地・床の粒状感。
- **最寄り既存 overlay と実測距離**: AR-03-silver-can まで 31.0px（box 基準・矩形間のユークリッド距離、次点 AR-03-round-puddle 36.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 明るい床に濃茶で対比。細長いので影を強く伸ばし、ガラスの縦ハイライトを入れる。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '床中央の手前寄りに、ラベルの無い茶色い一升瓶が一本立つ（無地）'` / `candidate_id: 'AR-03-sake-bottle'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

### CAM04 — Underground Junction

#### AR-04-thermos — 花柄の魔法瓶(柄のみ・文字なし)

- **camera / element_id**: CAM04 / CAM04-E15
- **物と変化**: 右手前の広い床に、昭和の赤い花柄の魔法瓶が一本立つ（柄のみ・文字なし）
- **最終 box**（baseline px）: `530,830,650,895`（120x65）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,729,675,900`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (111,101)-(231,166)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the floor tiles in the lower right foreground, stand one vintage vacuum flask (a Showa-era thermos) upright: a red body decorated with a simple stylized flower pattern, a metal screw cap and a small carrying loop, with the pattern consisting of flowers only and no text, no logo and no letters. Make it about 1.2x larger than real scale. Give it a strong dark contact shadow and a glossy highlight on the red body and the metal cap. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image; the only pattern allowed anywhere is the flower pattern on the thermos body. Do not touch the tile joints, the soft light patches on the floor or the wall base on the right. Place the object, including its shadow, centered at about 67% from the left and 78% from the top of the image, occupying roughly 47% of the image width and 38% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地・床の淡い光の斑・右の壁際。
- **最寄り既存 overlay と実測距離**: AR-04-puddle まで 43.0px（box 基準・矩形間のユークリッド距離、次点 AR-04-hatch-frame-round 93.9px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 赤と銀の対比は床に強い。銀の金属蓋は明るい反射に溶けやすいので、蓋の影と縁の黒を入れる。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '右手前の床に、昭和の赤い花柄の魔法瓶が一本立つ（柄のみ・文字なし）'` / `candidate_id: 'AR-04-thermos'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-04-flypaper — 蝿取りリボン(黄褐色のらせん)

- **camera / element_id**: CAM04 / CAM04-E01
- **物と変化**: 天井中央の上寄り（小さな黒い天井器具の右）から、昭和の蝿取りリボンが一本、らせん状に垂れ下がる。※設計やり直し: 旧box (585,15,650,110) は右の暗い柱の縁に掛かったため、明るい天井上部へ移した
- **最終 box**（baseline px）: `383,3,433,43`（50x40）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `280,0,536,171`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (103,3)-(153,43)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: from the bright gray ceiling in the upper center, to the right of the small black ceiling fixture, one sticky flypaper ribbon (a thin translucent tan-yellow strip coiled into a spiral, twisting down for roughly 23% of the image height from a tiny ceiling pin) hangs straight down, completely plain, with no insects, no text and no print. Make it about 1.5x wider than real scale so that it reads clearly. Add a faint soft shadow of the ribbon on the ceiling surface. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the small black ceiling fixture on its left, the round light below it on the right, the large round vent below, the ceiling seams and speckles. Place the object, including its shadow, centered at about 50% from the left and 13% from the top of the image, occupying roughly 20% of the image width and 23% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 左隣の小さな黒い天井器具・右下の丸い灯・下の大きな丸い換気口・天井の継ぎ目と点状汚れ。
- **最寄り既存 overlay と実測距離**: AR-04-ceiling-corner-fold まで 34.0px（box 基準・矩形間のユークリッド距離、次点 AR-04-ceiling-balloon 44.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: environment / early / medium
- **視認性の注意**: 明るい天井に黄褐色が出る。らせんは細いので幅を1.5倍に。下端の暗い錘（小さな黒い玉）は付けず、色だけで対比する。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'environment'` / `anomaly_type: 'add_object'` / `detail: '天井から昭和の蝿取りリボンが一本、らせん状に垂れ下がる'` / `candidate_id: 'AR-04-flypaper'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 天井の垂れ物の兄弟: AR-03-red-string（赤い紐）・AR-07-ceiling-string・AR-05-white-ribbon。別カメラ・別物。

#### AR-04-tote-bag — 無地の生成りトートバッグ(令和)

- **camera / element_id**: CAM04 / CAM04-E14（漆喰壁そのものは台帳に独立要素が無く、最寄りの CAM04-E14（右の黒い店舗ガラス）を起点IDとする。）
- **物と変化**: 右端の漆喰壁の小さなフックに、令和の無地の生成りトートバッグが一つ掛かる。※box は右端の画像幅(675)に合わせ x2 を 676→675 に補正
- **最終 box**（baseline px）: `621,400,675,500`（54x100）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,364,675,535`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (202,36)-(256,136)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the plaster wall at the right edge of the frame, hang one plain unbleached canvas tote bag from a small metal hook: natural off-white canvas with visible darker beige stitched seams, two plain shoulder straps hanging from the hook, slightly plump, completely plain with no print, no logo and no text. Make it about 1.2x larger than real scale. Add a clear soft drop shadow on the wall at the right side and bottom, and a small dark shadow under the hook. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the dark glass shop front on the left of it, the dark vertical pillar or the plaster texture around it. Place the object, including its shadow, centered at about 89% from the left and 50% from the top of the image, occupying roughly 21% of the image width and 58% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 左の黒い店舗ガラス・暗い縦の柱・周囲の漆喰の質感。
- **最寄り既存 overlay と実測距離**: AR-04-red-lantern まで 44.0px（box 基準・矩形間のユークリッド距離、次点 AR-04-puddle 157.9px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 壁と生成りの明度差が小さい。縫い目の濃い茶と、膨らみの影・フックの影で補強する（白に寄せない）。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '右端の漆喰壁のフックに、令和の無地の生成りトートバッグが一つ掛かる'` / `candidate_id: 'AR-04-tote-bag'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 袋系: AR-08-bag（CAM08・暗いガラスに映る古い紙袋）・AR-03-paper-bag。別カメラ・別物。

#### AR-04-tin-robot — ブリキのロボット(ロゴ・文字なし)

- **camera / element_id**: CAM04 / CAM04-E15
- **物と変化**: 床左寄りの広い面に、昭和のブリキのぜんまいロボットが一体立つ（ロゴ・文字なし）
- **最終 box**（baseline px）: `250,568,340,625`（90x57）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `167,511,423,682`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (83,57)-(173,114)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the bright floor tiles to the left of the center, stand one vintage wind-up tin toy robot upright: a boxy body in solid saturated blue and red tin with black outlines, a square head with a small antenna, two arms and two short legs, no silver or chrome parts, no printed text, no logo and no letters. Make it about 1.5x larger than real scale. Give it a strong dark contact shadow, and keep its tones darker than the glare around it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the white glare reflections on the floor, the tile joints or the small lights reflected in the floor. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 35% of the image width and 33% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 床の白い反射・タイル目地・床に映る小さな灯り。
- **最寄り既存 overlay と実測距離**: AR-04-orange-tile まで 32.8px（box 基準・矩形間のユークリッド距離、次点 AR-04-hatch-frame-round 35.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 床が白い反射で飛んでいる場所なので、銀・白・淡色のロボットは必ず溶ける。濃い青と赤で彩度と暗さを稼ぎ、1.5倍に誇張する。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '床左寄りの広い面に、昭和のブリキのぜんまいロボットが一体立つ（ロゴ・文字なし）'` / `candidate_id: 'AR-04-tin-robot'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

### CAM05 — Emergency Stairwell

#### CR05N-1 — 黄色と青のビーチボール

- **camera / element_id**: CAM05 / CAM05-E13
- **物と変化**: 右手前の広い床に、空気の入った無地のビーチボールが一つ転がっている（夏の記憶）
- **最終 box**（baseline px）: `445,600,550,690`（105x90）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `370,560,626,731`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (75,40)-(180,130)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark gray floor tiles in the lower right of the frame, place one inflated plain beach ball with alternating plain yellow and blue panels (six panels meeting at a small plain cap), no text, no logo, no pattern, resting on the floor. Make it about 1.2x larger than real scale. Give it a strong dark contact shadow and a soft glossy highlight on the vinyl. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the brick base and the glass shop front behind it, the tile joints or the light patches on the floor. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 41% of the image width and 53% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 背後のレンガ帯とガラス店舗・タイル目地・床の光の斑。
- **最寄り既存 overlay と実測距離**: CR05N-6 まで 40.0px（box 基準・矩形間のユークリッド距離、次点 AR-05-joint-into-glass 47.0px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 暗い灰床に黄と青の原色。色が暗さに沈まないよう、黄の面積を大きく見せる向きにする。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '右手前の広い床に、空気の入った無地のビーチボールが一つ転がっている（夏の記憶）'` / `candidate_id: 'CR05N-1'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 丸い玩具系: AR-01-red-rubber-ball（CAM01）・AR-08-n3（CAM08・赤いゴムまり）。別カメラ・別の物。

#### CR05N-3 — 緑のブリキのじょうろ

- **camera / element_id**: CAM05 / CAM05-E16
- **物と変化**: 手前中央の暗い床に、無地の緑色のブリキのじょうろが一つ横たわる
- **最終 box**（baseline px）: `280,815,400,885`（120x70）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `212,729,468,900`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (68,86)-(188,156)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark foreground floor tiles in the lower center, lay one plain green tin watering can on its side: a cylindrical body in mid green metal, a long spout with a plain rose, one arched handle, no label, no text and no print. Make it about 1.3x larger than real scale. Give it a strong dark contact shadow and a bright thin highlight along the metal. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the dark floor grain or the scattered small objects elsewhere. Place the object, including its shadow, centered at about 50% from the left and 71% from the top of the image, occupying roughly 47% of the image width and 41% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地・暗い床の粒状感・他の散らばる小物。
- **最寄り既存 overlay と実測距離**: AR-05-marbles-scattered まで 43.0px（box 基準・矩形間のユークリッド距離、次点 AR-05-pet-bottle 57.0px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 暗床に暗緑は沈む。明るめの黄緑寄りの緑で、金属のハイライトを強く入れる。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '手前中央の暗い床に、無地の緑色のブリキのじょうろが一つ横たわる'` / `candidate_id: 'CR05N-3'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### CR05N-5 — 白い紙の吹き流し

- **camera / element_id**: CAM05 / CAM05-E01
- **物と変化**: 暗い天井の左寄りに、七夕飾りの無地の白い紙の吹き流しが、張った紐から横に連なって垂れる。※box が横長(165x40)なので「一本」を「一本の紐から細い紙帯が連なる」に変更
- **最終 box**（baseline px）: `135,10,300,50`（165x40）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `90,0,346,171`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (45,10)-(210,50)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark ceiling at the upper left, from one taut thin string, plain white paper streamers hang down: about eight thin white paper strips of slightly different lengths (up to 40 pixels), a tanabata streamer decoration, completely plain with no writing, no tanzaku tag and no pattern. Make the strips about 1.4x wider than real scale and brightly white. Add a faint soft shadow on the ceiling behind the strips. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the dark ceiling panel seams, the round light at the top left corner, the camera dome or the glass shop front below. Place the object, including its shadow, centered at about 50% from the left and 18% from the top of the image, occupying roughly 64% of the image width and 23% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 暗い天井の継ぎ目・左上隅の丸灯・カメラドーム・下のガラス店舗。
- **最寄り既存 overlay と実測距離**: AR-05-brown-column まで 32.0px（box 基準・矩形間のユークリッド距離、次点 AR-05-duplicate-light 35.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / late / subtle
- **視認性の注意**: 天井は暗く帯が狭い（高さ40px）。純白で明度差を稼ぎ、紙帯を太めにする。暗い天井の黒潰れ部分には掛けない。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '暗い天井の左寄りに、七夕飾りの無地の白い紙の吹き流しが垂れる'` / `candidate_id: 'CR05N-5'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: **近い既存: AR-05-white-ribbon（CAM05・左端の蛍光灯から小さな白いリボンが下がる）。** 別位置（左上の暗い天井）・七夕モチーフの吊り飾りシリーズとして扱い、制作前に見比べる。兄弟: CR-NEW-01-04・CR-NEW-02-04・CR06N-5・AR-05-wind-chime（透明風鈴と短冊）。

#### CR05N-6 — 茶色い野球グローブ

- **camera / element_id**: CAM05 / CAM05-E13
- **物と変化**: 右手前の床に、使い込まれた茶色の革の野球グローブが一つ置かれている
- **最終 box**（baseline px）: `590,660,665,750`（75x90）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,620,675,791`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (171,40)-(246,130)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark gray floor tiles at the right, lay one worn brown leather baseball glove, palm side up with the fingers slightly curled, dark brown laces, scuffed leather, with no stamped text, no logo and no marks. Make it about 1.3x larger than real scale. Give it a strong dark contact shadow along its lower edge. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the soft white patch of reflection on the lower floor or the floor grain. Place the object, including its shadow, centered at about 81% from the left and 50% from the top of the image, occupying roughly 29% of the image width and 53% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地・下の白い反射・床の粒状感。
- **最寄り既存 overlay と実測距離**: AR-05-floor-glare-backside まで 37.0px（box 基準・矩形間のユークリッド距離、次点 CR05N-1 40.0px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 灰床に茶色は中程度の対比。革の明部（ハイライト）と濃い影、白っぽい紐の縫い目で輪郭を出す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '右手前の床に、使い込まれた茶色の革の野球グローブが一つ置かれる'` / `candidate_id: 'CR05N-6'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

### CAM06 — Shop Front Row

#### CR06N-1 — 赤いポリバケツ

- **camera / element_id**: CAM06 / CAM06-E16
- **物と変化**: 右手前の広い床に、無地の赤いポリバケツが一つ置かれている。※box 補正: 旧 (545,700,660,870) は右壁の巾木に掛かったため (545,722,630,862)
- **最終 box**（baseline px）: `545,722,630,862`（85x140）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,706,675,877`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (126,16)-(211,156)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark gray floor tiles in the lower right foreground, stand one plain bright red plastic bucket upright with its plastic handle folded down, completely plain with no label, no embossed letters and no print. Keep it near real scale (the box is already large). Give it a strong dark contact shadow and a soft vertical highlight on the plastic. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the dark wall base and the rough wall on the right, the tile joints or the white light reflection to the left. Place the object, including its shadow, centered at about 66% from the left and 50% from the top of the image, occupying roughly 33% of the image width and 82% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 右の暗い巾木と粗い壁・タイル目地・左の白い反射。
- **最寄り既存 overlay と実測距離**: AR-06-wet-footprints まで 39.0px（box 基準・矩形間のユークリッド距離、次点 AR-06-wall-puddle 88.0px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / mid / obvious
- **視認性の注意**: 暗い灰床に赤で強く出る。右壁の巾木（斜めの暗い帯）に重ねない。幅85pxなので、バケツを縦長に見せる。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '右手前の広い床に、無地の赤いポリバケツが一つ置かれる'` / `candidate_id: 'CR06N-1'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### CR06N-2 — 白い発泡スチロール箱

- **camera / element_id**: CAM06 / CAM06-E16
- **物と変化**: 左中央手前の床に、無地の白い発泡スチロールの箱が一つ置かれている
- **最終 box**（baseline px）: `190,700,340,800`（150x100）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `137,664,393,835`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (53,36)-(203,136)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark floor tiles in the left center foreground, place one plain white expanded polystyrene (styrofoam) fish box with its lid on, rectangular with slightly rounded edges and a faint rough beaded texture, completely plain with no printed text and no label. Keep it near real scale (the box is already large). Give it a strong dark contact shadow and keep its white slightly gray so that it does not blow out. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the bright light spot on the floor or the shadows of the plants. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 59% of the image width and 58% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地・床の明るい光点・植物の影。
- **最寄り既存 overlay と実測距離**: AR-06-tin-planter まで 34.0px（box 基準・矩形間のユークリッド距離、次点 AR-06-wet-footprints 56.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / early / obvious
- **視認性の注意**: 暗床に白で高コントラスト。白飛びさせず、側面に灰色の影と発泡の粒状感を残す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左中央手前の床に、無地の白い発泡スチロールの箱が一つ置かれる'` / `candidate_id: 'CR06N-2'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### CR06N-4 — 青い風車(かざぐるま)

- **camera / element_id**: CAM06 / CAM06-E15
- **物と変化**: 右壁上部の粗い灰白の壁に、無地の青いかざぐるまが一つ貼り付いている
- **最終 box**（baseline px）: `622,150,672,215`（50x65）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,97,675,268`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (203,53)-(253,118)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the rough gray-white plaster wall at the upper right, stick one plain pinwheel (kazaguruma) with four deep blue paper vanes on a thin pale stick pinned to the wall, completely plain with no text and no print. Make it about 1.5x larger than real scale and deep saturated blue. Add a clear soft drop shadow on the rough wall to the lower right. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the dark door frame below, the fluorescent light at the upper left or the wall texture around it. Place the object, including its shadow, centered at about 89% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 38% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 下の暗い扉枠・左上の蛍光灯・周囲の壁の質感。
- **最寄り既存 overlay と実測距離**: AR-06-ceiling-panel-white まで 33.1px（box 基準・矩形間のユークリッド距離、次点 AR-06-tilted-notice 54.4px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / late / medium
- **視認性の注意**: 約50x65pxと小さい。明るい壁に濃青で対比し、1.5倍に誇張。羽根の縁に暗い輪郭線と壁への影を入れる。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '右壁上部の粗い壁に、無地の青いかざぐるまが一つ貼り付く'` / `candidate_id: 'CR06N-4'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### CR06N-5 — てるてる坊主

- **camera / element_id**: CAM06 / CAM06-E01
- **物と変化**: 天井中央左寄りから、無地(顔なし)の白いてるてる坊主が一つ吊られている
- **最終 box**（baseline px）: `300,8,410,65`（110x57）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `227,0,483,171`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (73,8)-(183,65)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: from the gray-blue ceiling at the upper center-left, hang one plain white cloth teru-teru-bozu (a round head with a smooth cloth skirt, tied at the neck with a thin string, hanging from a short thin string), with no face drawn, no text and no pattern. Make it about 1.3x larger than real scale. Add soft gray shading on the folds of the cloth and a faint soft shadow on the ceiling behind it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the long fluorescent light at the right edge of the ceiling, the dark ceiling vent or the ceiling seams. Place the object, including its shadow, centered at about 50% from the left and 21% from the top of the image, occupying roughly 43% of the image width and 33% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 天井右端の長い蛍光灯・暗い天井換気口・天井の継ぎ目。
- **最寄り既存 overlay と実測距離**: AR-06-fluorescent-tag まで 30.0px（box 基準・矩形間のユークリッド距離、次点 AR-06-ceiling-checker 33.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / late / subtle
- **視認性の注意**: 天井は暗めの灰青で白が出る。蛍光灯の光に近い右端は白飛びに溶けるので避け、布のひだに灰色の陰影を入れて輪郭を出す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '天井中央左寄りから、無地（顔なし）の白いてるてる坊主が一つ吊られる'` / `candidate_id: 'CR06N-5'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 吊り飾り系の兄弟: CR-NEW-01-04・CR-NEW-02-04・CR05N-5。

#### CR06N-6 — 黄色い雨合羽

- **camera / element_id**: CAM06 / CAM06-E08
- **物と変化**: 左壁の暗い面に、子供用の黄色い雨合羽がフックに掛かっている
- **最終 box**（baseline px）: `5,120,110,200`（105x80）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,74,256,245`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (5,46)-(110,126)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the very dark wall at the upper left, hang one child's bright yellow raincoat from a small metal hook: a saturated yellow vinyl coat with a hood and short sleeves hanging down, completely plain with no pattern, no reflective stripes, no text and no logo. Make it about 1.2x larger than real scale. Add a soft dark shadow of the coat on the wall and a faint glossy highlight on the vinyl. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the hanging sign at the upper right, the ceiling edge above, the large plant below or the rough wall texture. Place the object, including its shadow, centered at about 22% from the left and 50% from the top of the image, occupying roughly 41% of the image width and 47% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 右上の吊り看板・上の天井縁・下の大きな植物・粗い壁の質感。
- **最寄り既存 overlay と実測距離**: AR-06-ceiling-balloons まで 32.0px（box 基準・矩形間のユークリッド距離、次点 AR-06-sign-orange-blue 32.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 暗い壁に鮮黄は強く出る。壁の黒潰れ部分が広いので、雨合羽の下端が粗い壁にかかる位置まで垂らして接地感（影）を出す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左壁の暗い面に、子供用の黄色い雨合羽がフックに掛かる'` / `candidate_id: 'CR06N-6'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 同系の黄色い雨具: 台帳の黄色い長靴（CAM01。PR #97 で登録）。

### CAM07 — Maintenance Corridor

#### AR-07-n1 — 下駄一足

- **camera / element_id**: CAM07 / CAM07-E16
- **物と変化**: 左手前の床に、無地の木の下駄が一足そろえて置かれる
- **最終 box**（baseline px）: `100,378,200,440`（100x62）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `22,324,278,495`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (78,54)-(178,116)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the wide gray floor tiles at the left foreground, place one pair of plain wooden geta sandals neatly side by side: flat pale wood boards with two wooden teeth under each and plain black thong straps, no text and no print. Make them about 1.4x larger than real scale. Give them a strong dark contact shadow under the teeth and along the boards. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the white fluorescent reflections on the floor, the tile joints or the stair area above. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 39% of the image width and 36% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 床の白い蛍光灯反射・タイル目地・上の階段。
- **最寄り既存 overlay と実測距離**: AR-07-stairs まで 34.0px（box 基準・矩形間のユークリッド距離、次点 AR-07-mask-on-floor 69.4px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 明るい床反射に白木が溶けやすい。反射の縁の暗い部分に置き、鼻緒の黒と影で輪郭を出す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左手前の床に、無地の木の下駄が一足そろえて置かれる'` / `candidate_id: 'AR-07-n1'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 履物系: AR-07-shoe-v2（CAM07・左階段の片方の子供靴）・台帳の黄色い長靴（CAM01。PR #97 で登録）。別物・別の置き場所（床の広い面）。

#### AR-07-n4 — 点灯スマホ

- **camera / element_id**: CAM07 / CAM07-E16
- **物と変化**: 右手前の床に、画面を点灯させた無地のスマートフォンが一台置かれる（アプリ・文字なし）
- **最終 box**（baseline px）: `580,462,670,515`（90x53）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,403,675,574`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (161,59)-(251,112)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the gray floor tiles at the right, place one plain modern smartphone lying flat with its screen lit in a uniform pale white-blue glow, showing no icons, no text, no clock and no app, with a soft glow spilling onto the floor around it. Make it about 2.0x larger than real scale so that it reads clearly. Give it a thin dark shadow along the lower edge and a soft cool glow on the floor around it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the white floor reflection next to it, the tile joints or the right wall base. Place the object, including its shadow, centered at about 80% from the left and 50% from the top of the image, occupying roughly 35% of the image width and 31% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 隣の白い床反射・タイル目地・右の壁際。
- **最寄り既存 overlay と実測距離**: AR-07-floor-uphill まで 33.0px（box 基準・矩形間のユークリッド距離、次点 AR-07-reopened 56.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / late / obvious
- **視認性の注意**: 発光で目立つが小さい。既存の白い床反射と混同しないよう、画面の青白さを強め、本体の黒い縁を出す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '右手前の床に、画面を点灯させた無地のスマートフォンが一台置かれる（アプリ・文字なし）'` / `candidate_id: 'AR-07-n4'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 同種: AR-02-smartphone-facedown（CAM02・画面を伏せたスマホ）。別カメラ・点灯という別の変化。

### CAM08 — Security Office

#### AR-08-n1 — 木の洗濯板

- **camera / element_id**: CAM08 / CAM08-E16
- **物と変化**: 左手前の暗い床に、無地の木製洗濯板が一枚寝かせて置かれる。※設計やり直し: 旧box (220,375,328,446) は白飛びの床と柱の巾木にかかり、淡い木が溶けるため、左下の暗い床へ移した
- **最終 box**（baseline px）: `60,725,168,796`（108x71）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,675,256,846`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (60,50)-(168,121)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark gray floor tiles at the lower left, lay one plain traditional wooden washboard flat on the floor: a rectangular pale wooden frame with a ribbed corrugated rubbing surface, completely plain with no printed text and no label. Make it about 1.3x larger than real scale. Give it a strong dark contact shadow around its edges. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the bright glare blobs on the left and right edge of this area, the tile joints or the floor grain. Place the object, including its shadow, centered at about 45% from the left and 50% from the top of the image, occupying roughly 42% of the image width and 42% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 左右の白飛びの光の塊・タイル目地・床の粒状感。
- **最寄り既存 overlay と実測距離**: AR-08-n3 まで 40.0px（box 基準・矩形間のユークリッド距離、次点 AR-08-floor-reflection-two-tier 84.0px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 淡い木色は暗い床に対比する（旧位置は白飛びで不可）。波形の凹凸に陰影を入れ、細長い形を保つ。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左手前の暗い床に、無地の木製洗濯板が一枚寝かせて置かれる'` / `candidate_id: 'AR-08-n1'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-08-n2 — 透明ビニール傘

- **camera / element_id**: CAM08 / CAM08-E16
- **物と変化**: 左手前の床に、閉じた透明ビニール傘が一本斜めに置かれる
- **最終 box**（baseline px）: `5,380,90,458`（85x78）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,334,256,505`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (5,46)-(90,124)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the gray floor tiles at the left, lay one closed transparent plastic umbrella diagonally on the floor: clear vinyl canopy folded tightly, a dark brown curved handle, thin dark metal ribs visible through the vinyl and a metal tip, completely plain with no text and no print. Make it about 1.3x larger than real scale, with the ribs and fold edges drawn darker than the real object. Give it a strong dark contact shadow and clear bright specular highlights on the vinyl. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the bright white glare area to the right of it, the tile joints or the dark door at the upper left. Place the object, including its shadow, centered at about 19% from the left and 50% from the top of the image, occupying roughly 33% of the image width and 46% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 右の白飛びの明部・タイル目地・左上の暗い扉。
- **最寄り既存 overlay と実測距離**: AR-08-cat まで 36.0px（box 基準・矩形間のユークリッド距離、次点 AR-08-floor-reflection-no-pillar 37.6px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 透明は床に溶ける。濃い茶の持ち手、細い骨の黒線、強いハイライトと影でコントラストを誇張する。明るい白飛びの縁には置かない。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左手前の床に、閉じた透明ビニール傘が一本斜めに置かれる'` / `candidate_id: 'AR-08-n2'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 傘系: AR-06-umbrella（CAM06・店先にたたんだ傘）・AR-06-reflected-umbrella（CAM06・赤い傘がガラスに映る）。別カメラ・透明ビニールという別の物。

#### AR-08-n3 — 赤いゴムまり

- **camera / element_id**: CAM08 / CAM08-E16
- **物と変化**: 左手前の暗い床に、無地の赤いゴムまりが一つ置かれる。※設計やり直し: 旧box (445,465,515,545) は右の壁の巾木の斜線にかかるため、左の暗い床へ移した
- **最終 box**（baseline px）: `25,625,85,685`（60x60）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,570,256,741`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (25,55)-(85,115)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark gray floor tiles at the left, place one plain glossy bright red rubber ball (a Showa-era bouncing ball) resting on the floor, completely plain with no print, no stripe and no text. Make it about 1.2x larger than real scale. Give it a strong dark contact shadow and a bright small highlight on the glossy surface. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the glare blob at the lower left, the tile joints or the floor grain. Place the object, including its shadow, centered at about 21% from the left and 50% from the top of the image, occupying roughly 23% of the image width and 35% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 左下の光の塊・タイル目地・床の粒状感。
- **最寄り既存 overlay と実測距離**: AR-08-n1 まで 40.0px（box 基準・矩形間のユークリッド距離、次点 AR-08-floor-reflection-no-pillar 50.3px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / early / medium
- **視認性の注意**: 暗い床に赤で強く出る。箱が60x60と小さいので1.2倍にし、ハイライトと影を強める。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左手前の暗い床に、無地の赤いゴムまりが一つ置かれる'` / `candidate_id: 'AR-08-n3'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: **同モチーフ: AR-01-red-rubber-ball（CAM01・最前景右寄りの赤いゴムまり）。** 反復シリーズ（別カメラ）として扱い、制作前に見比べる。丸い玩具系: CR05N-1（ビーチボール）。

#### AR-08-n5 — 段ボール箱

- **camera / element_id**: CAM08 / CAM08-E16
- **物と変化**: 右手前の床に、無地の小さな段ボール箱が一つ置かれる（伝票・ロゴなし）
- **最終 box**（baseline px）: `400,735,560,885`（160x150）。`composite-anomaly.py --box` にはこの値を渡す
- **5倍クロップ**（baseline px）: `326,695,633,900`（307x205。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (74,40)-(234,190)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 5x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the gray floor tiles at the lower right foreground, place one small plain brown corrugated cardboard box, closed and sealed with plain brown tape, completely plain with no shipping label, no printed text, no logo and no arrows. Keep it near real scale (the box is already large). Give it a strong large dark contact shadow on the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the dark wall base and the glowing panel on the right, the tile joints or the floor grain. Place the object, including its shadow, centered at about 50% from the left and 56% from the top of the image, occupying roughly 52% of the image width and 73% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 右の暗い壁際と光るパネル・タイル目地・床の粒状感。
- **最寄り既存 overlay と実測距離**: AR-08-floor-ramune-marbles まで 41.0px（box 基準・矩形間のユークリッド距離、次点 AR-08-floor-reflection-two-tier 50.0px）。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: object / late / obvious
- **視認性の注意**: 大きく暗い影が出る。茶色い箱は灰色の床に中程度の対比、上面を明るく、側面を暗くして立体感を出す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '右手前の床に、無地の小さな段ボール箱が一つ置かれる（伝票・ロゴなし）'` / `candidate_id: 'AR-08-n5'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-08-n6 — 紙の角凧

- **camera / element_id**: CAM08 / CAM08-E01
- **物と変化**: 天井に、無地の赤い紙の角凧が一枚引っかかり、糸が垂れる
- **最終 box**（baseline px）: `440,12,580,78`（140x66）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `382,0,638,171`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (58,12)-(198,78)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the bright gray ceiling at the top, one plain red paper rectangular kite (a flat diamond-shaped kite of plain red paper on a thin bamboo frame) is caught against the ceiling, with a thin string dangling down from one corner, completely plain with no drawing, no text and no pattern. Make it about 1.3x larger than real scale. Add a faint soft shadow of the kite and the string on the ceiling. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the black speckles and seams of the ceiling, the round dark fixture near it or the pillar below. Place the object, including its shadow, centered at about 50% from the left and 26% from the top of the image, occupying roughly 55% of the image width and 39% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 天井の黒い斑点と継ぎ目・近くの丸い暗い器具・下の柱。
- **最寄り既存 overlay と実測距離**: AR-08-fixture-dark-red まで 32.8px（box 基準・矩形間のユークリッド距離、次点 AR-08-vent-paper-plug 43.0px）。 **余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 天井は明るい灰色で、赤が強く出る。糸は細いので暗く太めに。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '天井に、無地の赤い紙の角凧が一枚引っかかり糸が垂れる'` / `candidate_id: 'AR-08-n6'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 天井に引っかかる紙物: AR-07-paper-airplane-ceiling（CAM07・白い紙飛行機）。別カメラ・赤い角凧。

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
