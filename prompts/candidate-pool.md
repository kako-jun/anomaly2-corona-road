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

時計の針は写真に時計が写っていないため候補にしない（例外あり: 大面積 `CR-LG-07-01` は時計を**足す**案で、kako-jun 指示 2026-11-04。「制作仕様（確定済み・未制作の大面積）」参照）。

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

## 制作仕様（確定済み・未制作の大面積）

大面積（面積が画像 675x900 = 607,500 px² の 1/8 = 75,938 px² 以上）の画像異変 16 件（8 カメラ × 2）の制作仕様。**候補ではなく、制作に入る手順書**（kako-jun 指示 2026-11-04）。方針の正本は [`README.md`](./README.md) の「配置の基準」の大面積の例外、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）。ここには重ねて書かない。

- **昇格**: 制作に採用した件は、この節の該当項を**削除**して `anomalies.yaml` へ一度だけ登録する（二重に残さない）。ID は台帳の `candidate_id` 相当として note に残す。**登録前に、同カメラの box 重なり表を機械出力して台帳 note に貼る**（下の「box と既存 overlay の重なり」のコマンド。台帳は日々増えるので、この節の表は 2026-11-04 時点の値で、登録時に必ず出し直す）。
- **座標**: すべて baseline px（675x900）。`box` は面の外接矩形で、台帳の `overlay_origin` / `dimensions` は**貼り込み後の alpha bbox で再計測**して書く（羽毛化で変わる）。bbox が 1/8 を割ったら登録しない（面を足して作り直す）。同カメラの 2 件は、**CAM08 の 2 件（排他。下の表の注）を除き box が重ならない**ことを 2026-11-04 に再計測済み（下の表）。
- **大面積どうしの重なり**: 同カメラの大面積は重ねない。ただしゲームは 1 カメラにつき未検出の異変を 1 件しか同時に出さない（`src/hooks/useGameState.ts` の `spawnAnomaly` は、未検出の異変があるカメラを候補から外す）ので、同じ面を使い物語上も両立しない対は**「排他」と明記すれば box が重なってよい**（例: CAM08 の 08-01 と 08-02。床と床へこぼれるテレビの山が重なる）。台帳 note の「同プレイで共存させない」は、この仕様上の保証として書いてよい。既存台帳の大面積（`AR-06-wall-puddle` 540x202 / `AR-07-floor-uphill` 591x352）との重なりは項ごとに書く。小物とは座標が重なってよい（大面積の例外）。ただし**同じ面を覆い隠す小物は排他**（項の「排他」に列挙。同プレイで共存させない運用を台帳 note に書く）。
- **生成の共通方針**: 入力は baseline を PNG 化した 3:2（1536x1024）の**窓**（下の「3:2 の窓と元画像への復元」）。先頭に `$imagegen` を明示。**1 件ずつ生成し生成画像は見ずに合成まで進め、採否は人間が決める**運用（kako-jun 指示）。生成物は作業物で `experiments/<件名>/` に置き、登録後に即削除する。
- **3:2 の窓と元画像への復元（共通手順）**: 台帳画像は 675x900 の縦長で、`composite-anomaly.py` は縦横比が ±0.02 を超えると fail する。3:2 の生成結果をそのまま `--gen` に渡さず、必ず元画像の寸法へ戻す。
  1. **窓**: `composite-polygon.py crop --base public/images/camN.webp --crop 0,y0,W,y0+450 --out <PNG>`（既定の出力は 1536x1024）で、baseline から**全幅 W × 高さ 450** の横長を切り出して生成に渡す。**W は画像幅に合わせる: cam1・cam6〜cam8 は 675、cam2〜cam5 は 676**（`--crop 0,y0,676,y0+450`。676x450 の縦横比 1.502 は `crop`・`restore` の許容 ±0.02 に収まる。675 のままだと最右 1 列が restore の対象外になる）。縮尺は 1536/W ≈ 2.27 倍。窓は幅を削らない（縮尺と位置を y0 の 1 値で決めるため）。box の高さが 450 以下なら窓 1 枚、**450 を超える件は上下 2 枚**（重なり 100px 以上）に分ける。窓は box を上下に含み、画像の上端・下端に接する場合以外は 5px 以上の余裕を取る。なお cam2〜cam5 の box の x2=675 は右端の 1 列手前だが、`cutout` のポリゴンは x=676 まで引いてよい（box の面積差は 0.2% 未満。1/8 の判定は登録時に alpha bbox で再測定する）。
  2. **復元**: `composite-polygon.py restore --base <baseline、または前回の restore 出力> --gen <生成結果 1536x1024> --crop 0,y0,W,y0+450 --out <全画面 PNG>` で、生成結果を W x450 へ縮小して `(0, y0)` へ貼り戻した全画面 PNG（cam2〜cam5 は 676x900、他は 675x900）を作る。**ツール `scripts/composite-polygon.py`（crop / restore / tile / cutout / blend / flip）は PR #100 で main にマージ済み**。引数名は `uv run scripts/composite-polygon.py <サブコマンド> --help` で確認した現行のものを書いている。
  3. **2 枚の窓**: 先に上の窓 A を生成・採用して `restore` で貼り戻し、窓 B の入力はその全画面から `crop` で切り出す（依存する絵は直列）。B の結果は A の貼り戻し済み全画面を `--base` にして `restore --blend-px 100 --blend-edges t` で貼る（B の上端 100px が A の既存内容の上へ線形に溶け込む）。
  4. **差分抽出**: 復元した全画面を `composite-anomaly.py --gen` へ渡す、または `composite-polygon.py cutout --base <baseline> --gen <restore 出力> --polygon <面のポリゴン（複数指定可。1 枚に併合される）> [--hole <抜く物のポリゴン>] --feather 2 --out <overlay.webp>` でポリゴン内を採用する（ポリゴン外の alpha は厳密に 0）。縦横比は画像と同じまま。明暗の乗せ・光の戻しは `blend --base <全画面> --layer <baseline> --mode multiply|screen|overlay|normal --opacity <0-1> [--polygon ...] [--hole ...] [--layer-blur <σ>] [--layer-norm] [--layer-brightness <倍率>]`（例: 反射帯の光を `--mode screen` で戻す、壁の粒状を `--layer-norm` の multiply で乗せる）。上下反転は `flip`（08-01 の鏡像。範囲の制約は 08-01 の項）。
  5. **素材だけを別生成する件**（顔・絵・紙・折り鶴・手形・ポスター・時計の文字盤・テレビ筐体・外景）の 3:2 は貼り込みスプライトの採取用で、復元は不要。割付図に沿う遠近の敷き詰めは `composite-polygon.py tile --base <baseline> --material <素材> --quad "tl tr br bl" --cols N --rows M --gap G --polygon-out <JSON>`（`--layout scatter` は散布、`--shade 0-1` は壁・床の明暗の乗せ、`--seed` で再現）で全画面 PNG を作り、`--polygon-out` の JSON をそのまま `cutout --polygon` へ渡す。複数の面は、`--polygon-append` で同じ JSON に面を足しながら `tile` を連鎖する（前の出力 PNG を次の `--base` にする）。
  6. **敷き詰めから扉・額・窓を抜く件**（01-02 の窓、06-01 の額と扉、07-01 の扉・開口・看板）: `tile` にセル除外の指定は無く、`cutout --hole` で抜くと境界のセルが**半分切れる**。そこで、除外領域を避けるように面を**複数の quad に分け**（除外物の上・下・左・右の隙間ごとに 1 quad。各 quad の格子は除外物の縁でちょうど終わるよう列・行数を合わせる）、`--polygon-append` で連鎖して 1 つの JSON にまとめてから `cutout` する。`--hole` は quad に含まれてしまう細かい物（取手など）だけに使う。
  各件の窓（y0〜y0+450）:

  | 件 | box 高さ | 窓 |
  | --- | ---: | --- |
  | 01-01 | 340 | 1 枚: y0〜450 |
  | 02-01 | 560 | **2 枚**: A y250〜700（奥の暗い角 E09 の下部を含める）／B y450〜900 |
  | 03-02 | 450 | 1 枚: y450〜900（箱が窓にちょうど収まる。画像下端なので余裕不要） |
  | 05-01 | 430 | 1 枚: y100〜550 |
  | 06-02 | 255 | 1 枚: y0〜450 |
  | 07-02 | 122 | 1 枚: y0〜450 |
  | 08-01 | 635 | **2 枚**: A y255〜705／B y450〜900（重なり 255。box 上端 265 に 10px の余裕） |
  | 04-01 ほか素材のみの件 | — | 全景生成なし（上の 5.） |

  プロンプト中の「frame」はこの 3:2 の窓を指す。位置や高さを「画面高さの何 %」で書かず、**元画像の実寸 px**（窓内では ×2.2756）で書く。
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
| CR-LG-07-02 | 0,0,675,122 | 82,350 | 13.6% | 可（余裕小。alpha bbox は幅 ≥640 かつ裾 ≥ y119 = 640×119=76,160 ≥ 75,938 を満たす） |
| CR-LG-08-01 | 0,265,675,900 | 428,625 | 70.6% | 可（床全面。旧 box 0,430,675,900 から上へ広げた） |
| CR-LG-08-02 | 0,130,248,470 | 84,320 | 13.9% | 可（柱の左縁 x≈250 の 2px 手前 x248 で止め、下へ床側 y470 まで広げた） |

同カメラの 2 件の隙間（x または y の空き px）: 01=4(x) / 02=4(x) / 03=22(x) / 04=235(x) / 05=72(y) / 06=5(x) / 07=4(y)。いずれも重なり 0。**08 だけは box が 248x205（50,840 px²）重なる**（08-01 の水面が床全面に広がり、08-02 のテレビの山が床へこぼれる部分と同じ床を使うため）。この 2 件は**同プレイ排他**にして、重なりを許す（水面に積まれたテレビには接地反射が要り、08-01 の「映るのは昭和の夕焼けだけ」と矛盾するため。併存させない運用を台帳 note に書く）。

### box と既存 overlay の重なり（2026-11-04、機械出力）

各 box と、台帳の既存 overlay の bbox（`overlay_origin` + `dimensions`）の重なり px² を機械で出し、全件を「排他」「併存可」に振った。**排他**は同プレイで共存させない（台帳 note に互いを書く）。**併存可**は、大面積のポリゴンが当該物の**接地部・枠・保持物の輪郭で止まる**（マスクで抜く）ことを条件にする。括弧内の数字は重なり px²。

```
# 台帳登録時の出し直し（pyyaml）。boxes は登録する件の box に書き換える
uv run --with pyyaml python3 - <<'EOF'
import re, yaml
d = yaml.safe_load(open('prompts/anomalies.yaml'))['anomalies']
boxes = {'CAM08': [('08-01', 0, 265, 675, 900), ('08-02', 0, 130, 248, 470)]}  # (名, x1, y1, x2, y2)
for cam, bl in boxes.items():
    for n, x1, y1, x2, y2 in bl:
        print(cam, n, 'area', (x2 - x1) * (y2 - y1))
    for e in d:
        if e['camera_id'] != cam: continue
        x, y = map(int, re.search(r'\((\d+),(\d+)\)', e['overlay_origin']).groups())
        w, h = map(int, e['dimensions'].split('x'))
        for n, x1, y1, x2, y2 in bl:
            ox, oy = min(x + w, x2) - max(x, x1), min(y + h, y2) - max(y, y1)
            if ox > 0 and oy > 0: print(' ', n, e['id'], ox * oy)
EOF
```

| 件 | 排他（同プレイ非共存） | 併存可（接地部・枠で止める） |
| --- | --- | --- |
| 01-01 | ceiling-fan-showa (8,892) / ceiling-panel-round (9,017) / vent-hole-triangle (1,376) / ceiling-seam-circle (2,310) / **tube-end (5,040。蛍光灯は点いたままの前提と矛盾)** | noren (4,180) / door-ajar (4,360)（提灯は y≤300 に収める）/ sign-rim (840) / sign-old-shop (47)（吊り看板は保持物） |
| 01-02 | notice (4,462) / wall-repaint-patch (2,790) | wiped-window (441) / cat-in-frosted-window (3,384)（窓 E10 は保持）/ ceiling-seam-circle (1,680)（天井側。壁ポリゴンの外）/ bamboo-broom (3,052。床。壁の接地線で止める） |
| 02-01 | stool (**37,590**) / leather-footprints (13,708) / chalk-hopscotch (5,890) / tile-color (6,536) / tile (4,672) / puddle (8,866) | tricycle (18,209) / smartphone-facedown (5,016) / bag (10,922) / pot-duplicate (7,007) / blue-pot (3,843) / square-pot (4,347) / ashtray (3,055) / coffee (2,650)（足跡は各物の接地部を避ける）/ duplicate-coffee-sign (11,676。看板は保持）/ shop-reopens (5,014。左シャッター側。x176〜199 だけ） |
| 02-02 | shop-reopens (**43,000**) / open-sign (8,064) / newspaper (6,298) / cat (6,305) / wrapping-paper (1,026) | puddle (**17,875**。床。画用紙はシャッター下端の接地線で止め、水たまりは覆わない）/ cigarette (2,294) / receipt (2,420) / tile (1,344) / tile-color (1,720) |
| 03-01 | shutter-wave (15,450) / newspaper (7,884) / paper-bag (2,964) | tile-diagonal (1,210) / blue-floor-tile (1,666)（床。シャッターの接地線で止める）/ pendant-lamp (164) |
| 03-02 | round-puddle (2,736) / tile-diagonal (2,236) / blue-floor-tile (2,184) | kerosene-heater (15,750) / silver-can (5,251)（畳の上に載る形。接地部を抜く） |
| 04-01 | red-lantern (10,788) | puddle (10,656。床。窓ポリゴンは右壁だけ） |
| 04-02 | red-telephone (**61,491**) / basket (8,832) / poster-colour-restore (6,240) / poster (3,185) | fluorescent-frame-grey (24,120) / sign-colour-blue (3,360)（枠・看板は保持）/ orange-tile (5,760) / hatch-frame-round (3,520) / hatch-reflection-extra (2,328) / randoseru-red (1,632)（床。ガラス下端で止める） |
| 05-01 | glass-light (62,832) / old-woman-in-glass (29,952) / curtain-open (29,216) / sign-in-glass (29,000) / amber-pane (27,740) / **joint-into-glass (26,832)** / chair-reflection (7,980) / curtain-mend (2,108) / wind-chime (1,975) | duplicate-light (2,200。天井）/ brick-round (1,892) / blue-brick (208)（レンガ帯は保持）/ brown-column (860。角柱は保持） |
| 05-02 | floor-glare-backside (12,769) / marbles-scattered (11,312) / pet-bottle (6,318) | なし（重なるのはこの 3 件だけ。joint-into-glass は y409〜553 で 05-02 の box と重ならない） |
| 06-01 | wall-puddle (**35,350**。排他。1 カメラ 1 件制で同時には出ない）/ wall-stripes (3,685) | tilted-notice (3,034。額入り掲示そのものが保持物で、格子から抜く）/ ceiling-panel-white (6,132。天井側）/ wet-footprints (2,760。床） |
| 06-02 | ceiling-balloons (9,396) / ceiling-checker (4,371) / lamp-squared (1,876) / fluorescent-tag (3,200) | sign-orange-blue (11,232。看板 x142〜250・y134〜238 は保持。傘は看板の矩形を避ける）/ reopened (6,867。傘の下端は x253〜362 で y≤190）/ far-sign-same (117) / crt-tv-glow (2,948。店先の窓の奥。傘の下端は y≤225） |
| 07-01 | reopened (23,086) / wall-grid (3,060) / notice (2,891) | stairs (19,947) / white-step (1,974) / stairs-cat (1,908) / ticket (1,568) / shoe-v2 (1,116)（階段は保持。時計は階段壁の手前で止める）/ crane (9,006。吊り鶴は時計の手前）/ pictogram-flip (1,224) / blue-push-plate (1,196) / duplicate-green-sign (1,015) / warm-light (900) / opening-paper (432)（扉・開口・非常灯は保持）/ ceiling-string (24) |
| 07-02 | crane (9,638) / paper-airplane-ceiling (3,286) / paper-tag-lamp (2,208) / lamp-off (1,440) / ceiling-string (456) | なし |
| 08-01 | floor-reflection-two-tier (19,306) / floor-reflection-no-pillar (20,648) / tile-concentric (7,392) / floor-ramune-marbles (13,209) / **pillar-second (12,744。柱の鏡像が合わない）** / panel (12,768) / panel-off (5,429) / blue-panel (5,429)（パネルの光の状態が水面の鏡像と食い違う）/ cat (1,785) / barber-pole (4,940)（床の物は接地反射が要る）/ **08-02（box 248x205）** | wall-band-wave (21,870) / suit (11,020) / pillar-notice (4,662) / bag (4,418) / fixture-duplicate (98)（壁・柱・ガラス戸の面。水面は壁と柱の接地線より下だけで、鏡像は元の壁・柱を映す）/ old-man-back (5,490。奥の通路はポリゴンの外） |
| 08-02 | bag (12,502) / barber-pole (6,422) / cat (1,785) / notice-residue (950) / **08-01** | light-blue-bleed (2,656。天井の灯列は保持。山の頂点は y≥145） |

CAM02 の 02-01 は stool (37,590) と排他。stool が動いた台に載る鉢・袋・灰皿・コーヒー・看板などの小物は台の元の位置のまま併存でき、足跡はそれらの接地部を避ける。CAM08 の 08-01 の旧 box（y430〜）で 3,834 だった `pillar-second` は、box を床全面（y265〜）に広げたため 12,744 になり、排他に加えた。

### 既存との重複精査（共通）

- 台帳の既存大面積は 2 件のみ。`AR-06-wall-puddle`（CAM06 (135,432) 540x202）は **CR-LG-06-01 の box と 35,350 px² 重なる**（puddle の bbox が右壁の中段にかかる）。→ 06-01 は puddle と**排他**と明記する（ゲームは 1 カメラにつき未検出の異変を 1 件しか同時に出さないので、同時には出ない。bbox が重なってよく、kako-jun への確認は不要。台帳 note に「排他」を書く）。`AR-07-floor-uphill`（CAM07 (84,548) 591x352）は 07-01/02 と重ならない。
- 型の重複回避: 01-02（顔写真の格子・CAM01 のみ）／02-01（足跡・CAM02 のみ）／02-02（クレヨン画・CAM02 のみ）／04-01・04-02・05-01・08-01・01-01 も各 1 カメラのみ。他カメラで同じ型を作らない（kako-jun 指示）。他 8 件はこれらと型が被らないよう中身を差し替え済み（無地の白紙・畳・折り鶴・同じポスター・傘・時計・シーツ・テレビの山）。テレビは小物の `CR-NEW-02-05`（CAM02）・`AR-06-crt-tv-glow`（CAM06）が既にあるため、08-02 は「積まれた山」に限定した。紙の輪つなぎは `CR-NEW-02-04`（CAM02）にあるため、01-01 は提灯だけにした。
- **構造の反復**（レビュー指摘 N2）: 面に同じ素材を敷き詰める件が 5（01-02 顔・02-02 クレヨン画・03-01 白紙・06-01 ポスター・07-01 時計）、天井から吊る件が 3（01-01 提灯・06-02 傘・07-02 シーツ）ある。一方で床の件は 4（02-01 足跡・03-02 畳・05-02 折り鶴・08-01 水鏡）、積む・ガラス越しの件は 4（08-02 テレビの山・04-01 窓・04-02 曇り・05-01 店内）で、すべて別カメラ・別の面・別の物語（老人の昭和／子供／行方不明）に割れている。「面を覆う」大面積は必然的に反復の見た目になる（kako-jun 指示の型）ため、**型は変えない**。予備案として、03-01 を「シャッターの前に無地の白い段ボール箱が積み上がる」立体物に振る手はあるが、全景 2 窓・排他増・box 再設計を伴うので採らなかった。
- 近い既存: 吊り物の天井（`AR-01-ceiling-fan-showa` / `AR-06-ceiling-balloons` / `AR-07-crane` / CR-02-21・CR-08-20 の折り鶴）、傘（`AR-06-umbrella` / `AR-06-reflected-umbrella` / CR-01-37 / CR-04-17）、折り鶴（`AR-07-crane`・`AR-01-container-origami`）。型が「面一面」で別物と整理し、各項の note に近傍を書く。
- 昭和テーマ節の「時計の針は写真に時計が写っていないため候補にしない」は、**既存の時計を改変する案**の話。07-01 は時計を**足す**ので抵触しないが、方針の例外に当たるため kako-jun 指示（2026-11-04）に基づく旨を台帳 note に書く。

---

### CR-LG-01-01 天井一面の提灯・紙飾り

- **ID / camera / element_id**: CR-LG-01-01 / CAM01 / CAM01-E01
- **面**: box 212,0,675,340（157,420 px²、25.9%）。天井の台形（丸灯・換気口・点検板・蛍光灯のある面）。
- **物と変化**: 通路天井の右〜中央一面に、赤白の**無地**の提灯が数十個、提灯どうしをつなぐ細い飾り紐とともに列をなして吊られる（紙の輪つなぎは CAM02 の `CR-NEW-02-04` と近いので使わない）。奥ほど小さく密。既存照明は飾りの隙間から見え、蛍光灯は点いたまま。
- **不気味さの狙い**: 誰もいないのに祭りの準備だけがある。老人の記憶が「祭りの夜の商店街」を天井に再生する、優しい異変（story: 通路に現れていた像は老人 3 人の記憶）。
- **保持するもの**: 床・左右の壁・店先・奥の吊り看板（E16、y373 付近）、換気口・点検板・丸灯・蛍光灯の本体、天井の色味・粒状・板継ぎ目（飾りの隙間に残す）。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of an underground shopping arcade corridor (the ceiling occupies the upper part of the frame).
  Make ONLY this change: on the ceiling of the right and centre part of the corridor, hang several dozen completely blank paper lanterns (red and white, round, no characters, no crests, no logos, no stripes of writing), linked by thin plain cords, in neat rows (no paper-chain garlands, no streamers) receding toward the far end of the corridor. Lanterns get smaller and denser toward the vanishing point and follow the strong perspective of the ceiling. Each lantern hangs on a thin cord about 25-40 cm below the ceiling plane. Existing ceiling fixtures (round lamps, the large concentric vent, the square access panel, the long fluorescent tube) stay visible between the lanterns and the fluorescent tube stays lit. Lanterns glow faintly warm only at their own surface; the corridor floor and walls stay cold blue-grey.
  Do not touch the floor, walls, shopfronts, hanging signs or anything below the ceiling line. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①割付図: 消失点（奥の開口付近）へ向かう流線 3 本 × 提灯の位置と大きさ（手前 60px → 奥 8px）を `uv run --with pillow python3` で描いて確定。②全景を 3 テイク生成（窓 y0〜450 の 1 枚。天井以外は元画像で上書きする前提）。③天井の台形ポリゴンを手描きし、ポリゴン内のうち「提灯の実体＋吊り紐・飾り紐」だけを差分抽出（`--box 212,0,675,340 --threshold 20`）。吊り看板（y373）には届かない高さに収める。④原寸で蛍光灯が点いたまま・換気口が見えることを確認。
- **難所と没基準**: 提灯に文字・家紋が出たら没。遠近のスケール崩れ（奥が手前より大きい）は没。消失点付近が潰れるなら奥の提灯を間引く。天井が背景化しやすいので提灯は大きめ・白を強く。
- **フェーズ / 目立ち度**: mid〜late / obvious。
- **台帳案**: category `environment` / anomaly_type `add_object` / detail 「通路天井の右〜中央一面に、無地の赤白の提灯が飾り紐とともに数十個吊られる（蛍光灯は点いたまま）」。note に「大面積。CAM01-E01。近傍: AR-01-ceiling-fan-showa（同じ天井の昭和小物）と bbox 重複するが大面積の例外」を書く。
- **排他**: `AR-01-ceiling-fan-showa`・`AR-01-ceiling-panel-round`・`AR-01-vent-hole-triangle`・`AR-01-ceiling-seam-circle`（天井の飾りで同じ面に重なる）は同プレイ非共存を推奨。**`AR-01-tube-end`（蛍光灯の片端が切れる。5,040）も排他**（本件は蛍光灯が点いたままの前提）。`CR-NEW-02-04`（CAM02 の七夕の輪つなぎ飾り）とは紙の輪つなぎを使わないことで型を分けた。
- **生成枚数の最小見積り**: 全景 3 テイク（素材の別生成なし）。

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
- **作り方**: ①割付図: 床の消失点＝奥の開口へ向かう流線 5〜6 本を引き、4 種の靴を帯状に分けて密度を変える（全面均一は禁止＝コピペ感）。②窓 A（y250〜700。奥の暗い角 E09 の下部を含む）を 3 テイク生成して 1 枚採用 → A を貼り戻した全画面から窓 B（y450〜900）を切り出して 3 テイク（B のプロンプトは「the dark opening at the far end of the corridor beside the pillar」を「the same trails keep running toward the upper part of the frame」に差し替える）。box の高さ 560 は 3:2 の窓（高さ 450）に収まらないため 2 枚に分け、重なり帯（y450〜700）は線形ブレンドで継ぐ。③床の台形ポリゴンから木箱・黒板・椅子・点検口・看板の接地部を抜き、足跡の暗部だけを差分抽出（`--box 176,340,675,900 --threshold 18` ＋ `--dilate` で足跡群をまとめる）。④反射帯は screen 合成で元の光を戻す。
- **難所と没基準**: 遠近が目地と合わない・足跡が床を描き直して目地がずれる・靴底に文字風模様が出る・帯の向きが奥の角を向かないテイクは没。反射帯内は消えやすいので濃くする。砂埃は低コントラストになりがちなので、視認性 floor を `check-visibility.py` で先に確認する。
- **フェーズ / 目立ち度**: late / medium（子供の小さな足跡で 4 人目を示すため、4 人目のフラグ後に限る。story の「4 人目の子供の記憶」は未決で、フラグ後の読みの一つとして添える）。
- **台帳案**: category `person` / anomaly_type `add_object` / detail 「床一面に、昭和の靴・草履・子供の靴の足跡が無数に付き、全て奥の暗い角へ向かう（帰りの足跡は無い）」。note に「大面積。CAM02-E20。AR-02-leather-footprints の拡大版ではなく、多人数・子供混在の別物。排他」を書く。
- **既存との関係（差分と排他）**: `AR-02-leather-footprints`（(409,732) 92x149、革靴 1 列）は本件の床の内側に完全に入る。差分: 本件は床一面・4 種の履物・奥の角へ収束・子供混在。**排他**（同プレイで共存させない。本件を採用するなら leather-footprints は台帳に残すが、台帳 note に互いを書く）。同じ床面を使う `AR-02-stool`（**37,590**。台が通路側へ動く）・`AR-02-chalk-hopscotch`・`AR-02-puddle`・`AR-02-tile`・`AR-02-tile-color` も**排他**。床に立つ小物（`AR-02-tricycle` `AR-02-smartphone-facedown` ほか。全件は「box と既存 overlay の重なり」の表）は併存可で、足跡が小物の上を通らないよう接地部はマスクで抜く。`AR-06-wet-footprints`（CAM06）は別カメラの別物で、この型は CAM02 だけに限る。
- **生成枚数の最小見積り**: 全景 6 テイク（窓 A 3＋窓 B 3）。

### CR-LG-02-02 左シャッター一面の子供のクレヨン画

- **ID / camera / element_id**: CR-LG-02-02 / CAM02 / CAM02-E07
- **面**: box 0,50,172,600（94,600 px²、15.6%）。左の横縞シャッター面（E07）とガラス店先（E08）の台形。
- **物と変化**: シャッターとガラスの全体に、子供のクレヨン画の画用紙がテープ止めで隙間なく貼られる。どの絵も同じ構図（大きな人型と小さな人型が手をつなぐ 4 人家族、赤い家、黄色い太陽）。画用紙は少し傾き、昭和風のセロハンテープ。文字・名前なし。
- **不気味さの狙い**: 老人たちの記憶が作る像と読める。**4 人目のフラグ後（late）に限り**、子供の記憶が作った像とも読める（story の未決: 4 人目の子供の記憶が異変を作るか。確定ではなく、フラグ後の読みの一つ）。令和の子供が昭和のシャッターに貼るという時代の混ざり（story の「現代人と昭和の建物」）。優しいが数が多くて怖い。
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

### CR-LG-04-02 左ガラス店先の曇りと手形

- **ID / camera / element_id**: CR-LG-04-02 / CAM04 / CAM04-E07
- **面**: box 0,10,215,740（156,950 px²、25.8%）。左ガラス店先の全面（枠内のガラスのみ）。
- **物と変化**: ガラスが内側から結露で曇り、子供と大人の手形が大小無数に付き、指で描いた絵（傘・太陽・猫・家）が数か所だけ現れる。文字・数字なし。
- **不気味さの狙い**: 外側でなく内側から付いた手形。店の中に人がいた痕跡だけが残る。店の中にいた人々（老人たち）の気配。**4 人目のフラグ後（late）に限り**、小さな子供の手形が混ざって 4 人目の気配とも読める（story の未決: 4 人目の子供の記憶が異変を作るか。確定ではなく読みの一つ）。
- **保持するもの**: 白い金属枠・床・天井・上部の緑看板・奥の通路。曇りは枠線で止める。
- **生成プロンプト全文**（手形素材を別生成）:
  ```
  $imagegen Create a flat, straight-on photo of a pane of cold glass fogged with condensation, seen from the outside, with many handprints and palm prints pressed on the inside surface: some large adult hands, some small child hands, in varied sizes, all with exactly five fingers and natural proportions, smeared where the hand slid. In three places a finger has drawn a very simple child-like doodle in the fog (a small umbrella, a sun, a cat face, a house) as clear lines. No writing, no numbers, no letters, no logos. The fog is milky white-grey and translucent over a dark blue-black interior, with fine droplets and a faint warm glow far behind.
  Output 1536x1024 (3:2). No watermark.
  ```
- **作り方**: ①素材 3 テイクから 2 枚（大人手・子供手が主）を選び、手形を切り出す。②各ガラスパネルのポリゴンを枠内側で作り、曇りは screen、手形は不透明度を変えて 40〜60 個配置（回転・縮尺・不透明度を変える）。③指の数は全数目視（6 本・4 本は没）。④枠は別マスクで元画像を戻す。
- **難所と没基準**: 指の本数崩れ・絵が文字風記号になる・曇りが枠をまたぐ・暗いガラスが白一色になって情報量が消えるのは没。
- **フェーズ / 目立ち度**: late / obvious（子供の手形が混ざるため、4 人目のフラグ後に限る）。
- **台帳案**: category `environment` / anomaly_type `add_object` / detail 「左のガラス店先が内側から曇り、大小の手形と指で描いた絵が付く」。note に「大面積。CAM04-E07」を書く。
- **排他**: `AR-04-red-telephone`・`AR-04-basket`・`AR-04-poster`・`AR-04-poster-colour-restore`（ガラス内の小物。曇りで隠れるので排他）。`AR-04-fluorescent-frame-grey` `AR-04-sign-colour-blue` は枠・看板で併存可。
- **生成枚数の最小見積り**: 素材 3 テイク。

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
- **排他**: `AR-05-pet-bottle`・`AR-05-marbles-scattered`・`AR-05-floor-glare-backside`（床の小物で、鶴に覆われる。`AR-05-joint-into-glass` は y409〜553 で 05-02 の box と重ならず、05-01 側の排他）。折り鶴系の近縁 `AR-07-crane`（CAM07 の天井 1 羽）・`AR-01-container-origami`・CR-02-21・CR-08-20 は別カメラ・別規模で併存可（型は「床一面」でここだけ）。
- **生成枚数の最小見積り**: 素材 3 テイク。

### CR-LG-06-01 右壁一面の同じポスター（手を振る子供の後ろ姿）

- **ID / camera / element_id**: CR-LG-06-01 / CAM06 / CAM06-E15
- **面**: box 500,40,675,860（143,500 px²、23.6%）。右側の粗い壁の遠近台形。
- **物と変化**: 右の壁一面に、**完全に同じ絵柄**（手を振る子供の後ろ姿の無地の絵、文字なし）のポスターが隙間なく縦横に並ぶ。既存の額入り掲示と扉は残す。
- **不気味さの狙い**: 同じ絵が数百枚並ぶ説明のつかなさ。手を振って遠ざかる後ろ姿は、**4 人目のフラグ後（late）に限り**、シャッターの向こうへ行ったまま戻らない 4 人目の子供とも読める（story の未決: 4 人目の子供の記憶が異変を作るか。確定ではなく読みの一つ）。後ろ姿なので顔は無く、誰の子かも分からない。
- **保持するもの**: 壁の粗い質感、扉、取手、額入り掲示、天井・床との境、手前の影。
- **生成プロンプト全文**（ポスター素材を 1 枚別生成）:
  ```
  $imagegen Create one flat, straight-on photo of a single plain poster printed on cream paper (portrait orientation, slightly faded, one small piece of tape at each top corner), showing a simple gentle illustration of a small child seen from behind, standing in a quiet empty corridor and waving one hand, wearing a plain T-shirt and shorts, with soft muted watercolour colours and a lot of empty space around the figure. The child's face is not visible. The poster has no title, no caption, no writing, no numbers, no letters, no logos anywhere, and no border text. Even low-light surveillance-style lighting, fine film grain, a plain dark grey wall visible around the poster.
  Output 1536x1024 (3:2). No watermark.
  ```
- **作り方**: ①素材 3 テイクから 1 枚を選ぶ（指は 5 本、腕は 1 本だけ上げているか目視）。②割付図: 右壁の消失点へ向かう台形に格子（手前 5 列→奥ほど細く、縦 10〜12 行）。扉・額・取手は格子から抜く（共通手順 6: quad を分けて抜く）。③遠近ワープ＋壁の粗面を multiply／displace で反映。④ポリゴン alpha で切り出す。
- **難所と没基準**: 絵に文字が出る・子供が複数／顔が見える・腕が崩れるテイクは没。完全同一の複製なので 1 枚の品質がすべて。壁の粗面にマスクが追従しにくいので境は巾木・天井線で止める。
- **フェーズ / 目立ち度**: late / obvious（4 人目のフラグ後）。
- **台帳案**: category `object` / anomaly_type `duplicate` / detail 「右の壁一面に、手を振る子供の後ろ姿の同じポスターが隙間なく並ぶ」。note に「大面積。CAM06-E15。AR-06-wall-puddle と排他」を書く。
- **排他**: **`AR-06-wall-puddle`（bbox が 35,350 px² 重なる大面積。排他。1 カメラ 1 件制で同時には出ない）**、`AR-06-wall-stripes`（壁面の模様で、ポスターに覆われる）。`AR-06-tilted-notice`（額入り掲示。**保持物**なので格子から抜き、併存可）、`AR-06-ceiling-panel-white` は天井側で併存可。`AR-06-wet-footprints` は床で併存可。CR-LG-01-02（顔写真の格子）・03-01（無地の白紙）とは型が別で、顔は出さない。
- **生成枚数の最小見積り**: 素材 3 テイク。

### CR-LG-07-02 天井から垂れる白いシーツ

- **ID / camera / element_id**: CR-LG-07-02 / CAM07 / CAM07-E01
- **面**: box 0,0,675,122（82,350 px²、13.6%）。天井一面。**シーツの裾は y118〜120 を下限とし、後壁の 07-01 の box（y126〜）に入らない**。貼り込み後の alpha bbox は**幅 ≥640 かつ 裾 ≥ y119**（640×119=76,160 ≥ 75,938）を満たす。幅の端から端まで（x≲17 〜 x≳657）シーツを配置し、少なくとも数枚は裾が y119〜120 に届くようにする。
- **物と変化**: 天井から、無地の白いシーツが 8〜12 枚、間隔を変えて垂れ下がる。長さは不揃いでゆるくたわむ。蛍光灯・換気口・丸灯は本物のまま、シーツの間から見える。
- **不気味さの狙い**: 病室か洗濯場のように、誰も寝ていない清潔な白が天井から並ぶ。人の形は作らない（幽霊の見立てにしない）。老人の記憶の「干してあるシーツ」。
- **保持するもの**: 蛍光灯・換気口・丸灯・黒い小器具と非常灯、壁・階段・床、天井の黒斑点の質感（シーツの隙間に残す）。
- **生成プロンプト全文**:
  ```
  $imagegen Edit the attached surveillance camera photo of a corridor ceiling (the ceiling occupies the top strip of the frame).
  Make ONLY this change: hang eight to twelve plain white bed sheets from the ceiling, each draping straight down as a loose rectangular curtain of fabric with soft vertical folds and a hem at the bottom, in uneven spacing and slightly different lengths, a few swaying slightly. The sheets are completely plain white linen, no print, no stripes, no stains forming shapes, no holes, no eyes, not shaped like a person or a ghost, no text or logos. They hang no lower than the top edge of the back wall: the lowest hems end about 269 px below the top edge of the 1536x1024 frame (26 percent of its height, which is 118 px of the 675x900 original photo). The existing fluorescent lights, the vent and the round lamps stay visible between the sheets and the fluorescent lights stay on.
  Do not touch the wall, stairs, doors, signs, floor or anything below the ceiling line. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```
- **作り方**: ①割付図: シーツの吊り位置（天井の板継ぎ目沿い）・幅（40〜90px）・裾の高さ（元画像の実寸で 80〜120px。窓内 ×2.2756）を決め、蛍光灯・換気口・丸灯の矩形を避ける。②全景 3 テイク（窓 y0〜450 の 1 枚）。③天井ポリゴン（y0〜122）内で、シーツ本体だけを差分抽出（`--box 0,0,675,122 --threshold 20`）。④裾が y122 を越えたテイクは切らず没（07-01 と重なる）。
- **難所と没基準**: 人型・幽霊型に見える（目の穴・頭部の盛り上がり）は没。裾が y122 を超える、または蛍光灯を隠すものは没。白が暗い天井で飽和して形が潰れないよう陰影を残す。
- **フェーズ / 目立ち度**: mid / medium。
- **台帳案**: category `environment` / anomaly_type `add_object` / detail 「天井から無地の白いシーツが何枚も垂れ下がる（蛍光灯と換気口は残る）」。note に「大面積。CAM07-E01。bbox 面積が余裕小なので貼り込み後に必ず再計測」を書く。
- **排他**: `AR-07-crane`（(325,0) 79x240、天井から吊る折り鶴。本件と同じ面）・`AR-07-ceiling-string`・`AR-07-paper-tag-lamp`・`AR-07-paper-airplane-ceiling`・`AR-07-lamp-off`（天井の小物）。
- **生成枚数の最小見積り**: 全景 3 テイク。

### CR-LG-08-02 左のショーウィンドウに積まれた白黒テレビ

- **ID / camera / element_id**: CR-LG-08-02 / CAM08 / CAM08-E06・E07（左の店先ガラス戸一面）
- **面**: box **0,130,248,470**（84,320 px²、13.9%）。**実測**（`public/images/cam8.webp`）: 中央の柱の**左縁は x≈250〜252**（inventory CAM08-E11 の最小 x=249.75）。右を柱の手前 x=248 で止めると、旧 box の高さ（y130〜425 = 295）では 248×295=73,160 で 1/8（75,938）を割る。そこで**積んだテレビの山が床側（y>425）へこぼれる**構成にし、下端を y470 まで広げた。実際のガラス戸は x0〜約 132（E06）・約 183（E07）で、ガラス単独では約 183×230=42,000 px²（6.9%）しかないので、山は**ガラス戸の外へ崩れて、隣の暗い壁と明るい通路の入口（E08、x約 170〜255）まで、さらに床の手前（y≈335〜470）まで**占める。旧 box の右端 270 は柱に約 20px 食い込み「柱は保持」と矛盾していたため、x250 に直した。**この拡張は仕様の判断点**（通路入口を TV の山が塞ぐ）で、kako-jun の確認が要る。
- **面積の条件**: alpha bbox は**幅 248（x0〜248）× 高さ 307 以上**で 75,938 以上。山の頂点は y≥145（天井灯の列の下）なので、**下端は y≥452** が要る（box 下端 y470 まで崩してよい）。幅は柱で頭打ちなので高さで稼ぐ。
- **物と変化**: ショーウィンドウ一面に白黒のブラウン管テレビが積まれ、**全画面が同じ無人の通路**（通路の奥へ続く床と壁だけ、人も文字もなし）を映す。山は窓の底から床へこぼれ、柱の手前（x≈248）まで続く。
- **不気味さの狙い**: テレビの中の通路は、いま画面にある通路と同じ（監視カメラの映像そのもの）。見られているのは自分たち。シャッターの向こうへ行った人々が見ているのか、という含み（メタ構造: 報告すべきか悩ませる）。
- **保持するもの**: ガラス戸の木枠・金属縦枠・取手（山の隙間から見える位置に残す）、柱 E11 とその根元、床の反射と接地、左上の天井灯の列（山の頂点は y≥145 から）、右の床・壁。
- **生成プロンプト全文**（筐体素材のみ生成。全景は生成しない。山の絵は筐体スプライトの合成で作る）:
  ```
  $imagegen Create a flat, straight-on photo of a single old black-and-white CRT television set with its screen switched off (dark glass), rounded plastic case in grey and cream, bulging glass screen, two small plain knobs without any lettering, slightly aged with a faint grey dust cast, on a plain neutral dark-grey background. No brand, no text, no numbers, no logos, no labels anywhere on the set. Even low-light surveillance-style lighting, fine film grain.
  Output 1536x1024 (3:2). No watermark.
  ```
- **作り方**: ①素材: 画面に映す無人通路は `public/images/cam8.webp` 自身の縮小（通路の奥を切り出し、グレースケール化＋走査線）で用意する（**生成不要**・「同じ通路」を厳密に満たす）。②テレビ筐体の素材（空の画面の白黒テレビ 1 台）を上のプロンプトで 2 テイク別生成し、スクリプトで画面ポリゴンに①を埋める。③割付図: 山の積み方（段ごとの大きさ・傾き）を決め、スプライトを積む。山は窓の底から床へ崩れ、床側（y335〜470）にも数台が転がる。④ガラス戸の枠・柱は元画像から戻す。⑤ポリゴン alpha で切り出し、alpha bbox が上の「面積の条件」（248×307 以上）か `check` する。
- **難所と没基準**: 画面の映像が全台同じでない・テレビに文字・ロゴが出る・山が柱にかかる（x>248 に出る。柱は保持）・bbox が 1/8 を割るのは没。画面内の通路が小さすぎて読めないときは台数を減らして大きくする。
- **フェーズ / 目立ち度**: mid〜late / obvious。
- **台帳案**: category `camera` / anomaly_type `duplicate` / detail 「左のショーウィンドウに白黒テレビが積まれ、全画面が同じ無人の通路を映す」。note に「大面積。CAM08-E06/E07。box は通路入口と床の手前まで拡張。08-01 とは排他。近縁（別規模）: CR-NEW-02-05（CAM02 の小物 1 台）・AR-06-crt-tv-glow（CAM06 の小物 1 台）」を書く。
- **既存との関係（差分と排他）**: テレビの小物は既に `CR-NEW-02-05`（CAM02・奥の暗い店内の床に白黒テレビ 1 台が点く）と `AR-06-crt-tv-glow`（CAM06・窓の奥の 1 台）がある。本件は**積まれた山＋全画面が同じ無人通路を映す**構成で別物とし、**「積まれたテレビの山」は CAM08 だけに限る**（旧案の「テレビ型は CAM08 のみ」を、型を限定して直した）。この 2 件とは別カメラ・別規模で併存可。
- **排他**: **`CR-LG-08-01`（水鏡）**、`AR-08-bag`・`AR-08-notice-residue`・`AR-08-cat`・`AR-08-barber-pole`（左ガラス・通路入口の小物で山に覆われる）。
- **生成枚数の最小見積り**: 素材 2 テイク（筐体のみ）。映像は baseline の再利用。

---

### 生成枚数の総見積り（枠が限られるため最小）

窓の数は共通手順の表（02-01 と 08-01 は 2 枚、他の全景件は 1 枚）。窓 B は窓 A の採用後に直列で生成する。**04-01 は全景を生成しない**（外景素材を窓ポリゴンへ遠近ワープする主ルート 1 つ）。

| 件 | 素材テイク | 全景テイク |
| --- | ---: | ---: |
| 01-01 | 0 | 3 |
| 01-02 | 3 | 0 |
| 02-01 | 0 | 6（窓 A 3＋窓 B 3） |
| 02-02 | 3 | 0 |
| 03-01 | 2 | 0 |
| 03-02 | 0 | 3 |
| 04-01 | 3 | 0 |
| 04-02 | 3 | 0 |
| 05-01 | 0 | 3 |
| 05-02 | 3 | 0 |
| 06-01 | 3 | 0 |
| 06-02 | 0 | 3 |
| 07-01 | 2 | 0 |
| 07-02 | 0 | 3 |
| 08-01 | 0 | 6（窓 A 3＋窓 B 3） |
| 08-02 | 2 | 0 |
| **計** | **24** | **27** |

合計 51 生成。全景を使う件は、1 テイクだけ試して採用可能なら残りを省く運用もできる（下限は素材 24 ＋ 全景の窓数 9 = 33 生成）。生成は**1 件ずつ**、依存する絵は直列。
