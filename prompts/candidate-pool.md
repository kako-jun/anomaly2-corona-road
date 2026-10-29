# 写真固有の異変候補プール

各カメラ27案、計216案。まだ採用・生成した異変ではなく、写真の写り込みから発想を広げるための候補。

## 正本と昇格ルール

- 写っている物の説明・座標・カメラ写真の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。ここでは要素IDだけ参照し、物体説明や座標を複製しない。
- 候補の正本はこのファイル。採用候補を生成工程へ移す時は、この行を削除し、`anomalies.yaml` に一件だけ登録する。候補と制作データを二重に残さない。
- カテゴリは `camera` / `object` / `environment` / `person` / `surreal`、フェーズは `early` / `mid` / `late`。目立ち度は `subtle` / `medium` / `obvious`。
- 文字の改変案は、元の文字を原寸で読み直してから具体的な文言を決める。

## CAM 01 — North Entrance

| 候補ID   | 対象ID    | 変化案                                                             | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------------------------------ | ---------------------------- |
| CR-01-01 | CAM01-E16 | 奥の丸い吊り看板の図柄だけが消え、白い円面が空白になる。           | object / early / subtle      |
| CR-01-02 | CAM01-E16 | 大小の吊り看板のうち、小さい方だけが大きい方と同じ図柄になる。     | object / early / subtle      |
| CR-01-03 | CAM01-E11 | 左中景の閉じたシャッター一枚だけ、横縞が途中で途切れて縦線に続く。 | environment / early / subtle |
| CR-01-04 | CAM01-E07 | 長い蛍光灯の片端だけが黒くなり、床の反射は元の長さのまま残る。     | environment / early / subtle |
| CR-01-05 | CAM01-E03 | 丸型天井設備の内側の輪だけが、中心からわずかにずれている。         | environment / mid / medium   |
| CR-01-06 | CAM01-E14 | 奥の暗い開口に、そこに立つと小さすぎる人影が一人見える。           | person / mid / medium        |
| CR-01-07 | CAM01-E12 | 右側の木格子戸の格子一本だけが、周囲より手前へ飛び出している。     | object / mid / medium        |
| CR-01-08 | CAM01-E19 | 右下の青い容器の輪郭だけが床に反射し、実物は消えている。           | surreal / mid / medium       |
| CR-01-09 | CAM01-E10 | 左手前の曇り窓に、廊下ではなくシャッターの裏側が映る。             | surreal / late / obvious     |
| CR-01-10 | CAM01-E18 | 床の照明反射の中に、吊り看板の反射だけが上下逆さに現れる。         | surreal / late / obvious     |
| CR-01-11 | CAM01-E15 | 左奥の案内板の矢印が、壁ではなく画面を見る方向を指している。       | object / late / obvious      |
| CR-01-12 | CAM01-E20 | 右下の切れた灰色の床端が、床ではなく壁面へ垂直に折れ曲がって続く。 | surreal / late / obvious     |

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
| CR-02-11 | CAM02-E14 | 緑色の自立看板が少し右にもう一つ現れ、二枚が同じ文字を表示する。 | object / early / medium    |
| CR-02-12 | CAM02-E12 | 右奥のシャッターが壁面と同じ色になり、閉じた時の縦枠だけが残る。 | surreal / late / obvious   |

## CAM 03 — South Exit

| 候補ID   | 対象ID    | 変化案                                                                 | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ---------------------------------------------------------------------- | ---------------------------- |
| CR-03-01 | CAM03-E15 | 看板横の木箱の向きだけが、床目地に対して斜めになる。                   | object / early / subtle      |
| CR-03-02 | CAM03-E14 | 看板の緑の光は残るが、上段の「COFFEE」だけが消える。                   | object / early / subtle      |
| CR-03-03 | CAM03-E06 | 右シャッターの一枚だけ、横板の間隔が周囲の倍になる。                   | environment / early / subtle |
| CR-03-04 | CAM03-E05 | 天井灯の一つだけが消え、床上の白い反射は残る。                         | environment / early / subtle |
| CR-03-05 | CAM03-E08 | 黒い店壁の白い装飾模様の一つが、看板の方を向く顔の形になる。           | surreal / mid / medium       |
| CR-03-06 | CAM03-E07 | 空白看板箱の白い面に、周囲のシャッターと同じ横縞が浮かぶ。             | object / mid / medium        |
| CR-03-07 | CAM03-E13 | 通路奥の暗い開口の床だけが、手前の床より一段低く沈む。                 | environment / mid / medium   |
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
| CR-04-05 | CAM04-E10 | 奥の両開き扉の片側だけが指一本分開き、内部は真っ暗。               | environment / mid / medium   |
| CR-04-06 | CAM04-E14 | 「カラオケ」の文字がガラス面ではなく、ガラスの反射内だけに見える。 | surreal / mid / medium       |
| CR-04-07 | CAM04-E12 | 植物の花/鉢の一つが、手前の床ではなく奥の扉に接している。          | object / mid / medium        |
| CR-04-08 | CAM04-E16 | 床点検口の黒い留め具二つが、枠の外側に並ぶ。                       | object / mid / medium        |
| CR-04-09 | CAM04-E13 | 吊り看板の白い円面だけが空洞になり、背後の天井が見える。           | surreal / late / obvious     |
| CR-04-10 | CAM04-E17 | 床反射の点検口だけが、実物より奥にもう一つ映る。                   | surreal / late / obvious     |
| CR-04-11 | CAM04-E07 | 左側のガラス店先の反射にだけ、廊下を塞ぐ黒い人影が立つ。           | person / late / obvious      |
| CR-04-12 | CAM04-E10 | 奥の両開き扉が一枚の壁になり、取手だけが元の位置に残る。           | surreal / late / obvious     |

## CAM 05 — Emergency Stairwell

| 候補ID   | 対象ID    | 変化案                                                       | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------------------------ | ---------------------------- |
| CR-05-01 | CAM05-E10 | 緑看板の数字「300」の最後の一桁だけが欠ける。                | object / early / subtle      |
| CR-05-02 | CAM05-E08 | 正面カーテンの一枚だけ、裾が隣より少し高い。                 | object / early / subtle      |
| CR-05-03 | CAM05-E12 | レンガ帯の一つだけ目地が上下にずれている。                   | environment / early / subtle |
| CR-05-04 | CAM05-E02 | 左上の丸灯は点灯しているのに、店舗のガラス反射には映らない。 | environment / early / subtle |
| CR-05-05 | CAM05-E09 | 右端のカーテンの隙間に、細い指のような影が一本見える。       | person / mid / medium        |
| CR-05-06 | CAM05-E07 | 正面の金属枠の縦桟が一本だけガラスの手前に重なっている。     | surreal / mid / medium       |
| CR-05-07 | CAM05-E06 | 左奥通路の丸看板が、店舗区画のガラス内にも同じ大きさで映る。 | object / mid / medium        |
| CR-05-08 | CAM05-E13 | 前景床の目地だけがガラス区画の内部まで続いて見える。         | surreal / mid / medium       |
| CR-05-09 | CAM05-E11 | 黒い側面に、正面カーテンの縦模様が透けて現れる。             | surreal / late / obvious     |
| CR-05-10 | CAM05-E08 | 中央のカーテン一枚だけが内側へ膨らみ、人の肩幅の形になる。   | person / late / obvious      |
| CR-05-11 | CAM05-E05 | 長い蛍光灯が店舗区画の角で直角に折れて続く。                 | surreal / late / obvious     |
| CR-05-12 | CAM05-E15 | 右下の白い床反射の中にだけ、ガラス区画の裏側が映る。         | surreal / late / obvious     |

## CAM 06 — Shop Front Row

| 候補ID   | 対象ID    | 変化案                                                           | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ---------------------------------------------------------------- | ---------------------------- |
| CR-06-01 | CAM06-E12 | メニュー板の紙一枚だけが裏返り、白紙になる。                     | object / early / subtle      |
| CR-06-02 | CAM06-E15 | 右壁の額入り掲示だけが、周囲より数度傾く。                       | object / early / subtle      |
| CR-06-03 | CAM06-E10 | 鉢植えの小さな橙色の花が一輪だけ消える。                         | object / early / subtle      |
| CR-06-04 | CAM06-E04 | 天井の丸灯一つだけが緑色になり、床反射は白のまま。               | environment / early / subtle |
| CR-06-05 | CAM06-E09 | 大きな葉の影が、葉の向きと逆側へ伸びる。                         | surreal / mid / medium       |
| CR-06-06 | CAM06-E07 | 看板中央の丸いロゴだけが、閉じた目の図柄に変わる。               | object / mid / medium        |
| CR-06-07 | CAM06-E12 | メニュー板の一枚の写真にだけ、通路奥の景色が写っている。         | surreal / mid / medium       |
| CR-06-08 | CAM06-E13 | 店先ガラスの縦枠一本が、奥の暗部で途切れている。                 | environment / mid / medium   |
| CR-06-09 | CAM06-E11 | 左下の紫桃色の布/飾りが、床目地に沿って通路中央まで伸びる。      | surreal / late / obvious     |
| CR-06-10 | CAM06-E14 | 奥の丸看板が、手前の店名看板と同じ図柄に変わる。                 | object / late / obvious      |
| CR-06-11 | CAM06-E16 | 蛍光灯の床反射にだけ、こちらへ向かう濡れた足跡が続く。           | person / late / obvious      |
| CR-06-12 | CAM06-E09 | 大きな葉の陰に、小さな灰色の人形のような生物がうずくまっている。 | surreal / late / obvious     |

## CAM 07 — Maintenance Corridor

| 候補ID   | 対象ID    | 変化案                                                       | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------------------------ | ---------------------------- |
| CR-07-01 | CAM07-E07 | 扉の白黒ピクトグラムだけが上下逆さになる。                   | object / early / subtle      |
| CR-07-02 | CAM07-E08 | 丸看板の中心ロゴが消え、周囲の小さな文字だけ残る。           | object / early / subtle      |
| CR-07-03 | CAM07-E13 | 中央右の扉の取手だけが反対側へ移る。                         | object / early / subtle      |
| CR-07-04 | CAM07-E04 | 右上の丸灯一つだけが消え、右階段の床反射は残る。             | environment / early / subtle |
| CR-07-05 | CAM07-E09 | 左階段の段数が一段だけ多く、最上段が壁に突き当たる。         | surreal / mid / medium       |
| CR-07-06 | CAM07-E14 | 右階段上の緑表示が、階段の下側にも同時に現れる。             | object / mid / medium        |
| CR-07-07 | CAM07-E11 | 中央の黒い開口に、扉と同じ灰色扉が奥向きに立つ。             | surreal / mid / medium       |
| CR-07-08 | CAM07-E12 | 白い中央壁に、扉の取手と同じ形の影が浮かぶ。                 | surreal / mid / medium       |
| CR-07-09 | CAM07-E16 | 床タイルの目地が左右の階段へ向かって上り坂になる。           | surreal / late / obvious     |
| CR-07-10 | CAM07-E17 | 左の長い反射が、床から階段の壁面へ垂直に折れて上る。         | surreal / late / obvious     |
| CR-07-11 | CAM07-E14 | 右階段に、同じ段へ立つ人影が上下二段に重なって見える。       | person / late / obvious      |
| CR-07-12 | CAM07-E13 | 扉の横帯が部屋の奥へ続く通路になり、その先に同じ扉が見える。 | surreal / late / obvious     |

## CAM 08 — Security Office

| 候補ID   | 対象ID    | 変化案                                                       | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------------------------ | ---------------------------- |
| CR-08-01 | CAM08-E13 | 柱の小さなコンセント/スイッチだけが上下逆さになる。          | object / early / subtle      |
| CR-08-02 | CAM08-E15 | 右端の上下の乳白パネルのうち、片方だけ消灯する。             | environment / early / subtle |
| CR-08-03 | CAM08-E10 | 奥の丸看板の白円だけが、周囲の色を反射しない黒になる。       | object / early / subtle      |
| CR-08-04 | CAM08-E06 | 左のガラス棚の水平線が一本だけ、ガラス外へ突き出して見える。 | object / early / subtle      |
| CR-08-05 | CAM08-E12 | 柱の小さな横長器具の下に、同じ器具の影が床まで伸びる。       | surreal / mid / medium       |
| CR-08-06 | CAM08-E14 | 右壁の白い帯状パネルが、柱の裏側にも連続して見える。         | environment / mid / medium   |
| CR-08-07 | CAM08-E09 | 中央奥の細い通路に、こちらを向いた人影が一人立つ。           | person / mid / medium        |
| CR-08-08 | CAM08-E08 | 左奥の明るい通路が途中で直角に折れ、見えない方向へ続く。     | surreal / mid / medium       |
| CR-08-09 | CAM08-E17 | 床の大きな白反射に、柱が存在しないように映る。               | surreal / late / obvious     |
| CR-08-10 | CAM08-E18 | 床の丸い反射が、右壁の光る長方形パネルと同じ二段形になる。   | surreal / late / obvious     |
| CR-08-11 | CAM08-E15 | 右端の黒い柱の上下パネルの間に、第三の発光パネルが現れる。   | object / late / obvious      |
| CR-08-12 | CAM08-E11 | 中央の柱の裏側に、同じ幅の柱がもう一つ連続して立つ。         | surreal / late / obvious     |

## 追加候補 — CAM 01

未制作。候補IDは既存の CR-01-01〜12 に続く。各行は独立した一変更。

| 候補ID   | 対象ID    | 変化案                                         | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ---------------------------------------------- | ---------------------------- |
| CR-01-13 | CAM01-E17 | 床タイルの一枚だけ斜め格子模様になる。         | environment / early / subtle |
| CR-01-14 | CAM01-E17 | 床タイルの一枚だけ淡い藍色になる。             | environment / early / subtle |
| CR-01-15 | CAM01-E17 | 床タイル一枚に小さな水たまりが現れ照明が映る。 | environment / mid / medium   |
| CR-01-16 | CAM01-E09 | 壁の粒模様の一部だけ細い縦縞に変わる。         | environment / early / subtle |
| CR-01-17 | CAM01-E01 | 天井の継ぎ目が一か所だけ円形に変わる。         | environment / mid / medium   |
| CR-01-18 | CAM01-E04 | 四角い天井点検板が丸くなる。                   | environment / mid / medium   |
| CR-01-19 | CAM01-E04 | 天井点検板の隣に同じ板がもう一枚増える。       | object / mid / medium        |
| CR-01-20 | CAM01-E07 | 蛍光灯の端から小さな紙片が吊り下がる。         | object / mid / medium        |
| CR-01-21 | CAM01-E09 | 左壁に小さな白い貼り紙が一枚増える。           | object / early / medium      |
| CR-01-22 | CAM01-E11 | シャッターの横板が一列だけ薄い緑になる。       | environment / early / subtle |
| CR-01-23 | CAM01-E12 | 木格子の一部だけ交差して菱形になる。           | environment / mid / medium   |
| CR-01-24 | CAM01-E10 | 実物がない猫の後ろ姿だけ曇り窓に映る。         | surreal / mid / medium       |
| CR-01-25 | CAM01-E14 | 暗い開口の手前に小さな猫が座る。               | object / mid / medium        |
| CR-01-26 | CAM01-E19 | 青い容器が二つ並ぶ。                           | object / early / medium      |
| CR-01-27 | CAM01-E19 | 青い容器の上縁が四角く変わる。                 | object / mid / medium        |

## 追加候補 — CAM 02

| 候補ID   | 対象ID    | 変化案                                     | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------ | ---------------------------- |
| CR-02-13 | CAM02-E20 | 床タイル一枚の中央に小さな円模様が現れる。 | environment / early / subtle |
| CR-02-14 | CAM02-E20 | 床の一枚だけ市松模様になる。               | environment / mid / medium   |
| CR-02-15 | CAM02-E20 | 床の一枚だけ薄い桃色になる。               | environment / early / subtle |
| CR-02-16 | CAM02-E20 | 看板の手前に小さな水たまりが現れる。       | environment / mid / medium   |
| CR-02-17 | CAM02-E17 | 白い星形装飾が一つだけ花形になる。         | object / early / subtle      |
| CR-02-18 | CAM02-E17 | 壁の白い装飾が一つだけ淡い赤に変わる。     | object / early / subtle      |
| CR-02-19 | CAM02-E01 | 天井板の一枚だけ木目模様になる。           | environment / mid / medium   |
| CR-02-20 | CAM02-E03 | 丸い天井設備が四角い輪郭になる。           | environment / mid / medium   |
| CR-02-21 | CAM02-E05 | 吊り器具から小さな折り鶴が下がる。         | object / mid / medium        |
| CR-02-22 | CAM02-E10 | 柱に小さな紙の案内が一枚増える。           | object / early / medium      |
| CR-02-23 | CAM02-E14 | 下段のカタカナ一文字だけ左右反転する。     | object / early / subtle      |
| CR-02-24 | CAM02-E14 | 緑色の発光面が琥珀色になる。               | object / mid / medium        |
| CR-02-25 | CAM02-E16 | 木箱が左右に二つ並ぶ。                     | object / mid / medium        |
| CR-02-26 | CAM02-E19 | 鉢が消え、ガラス面にだけ鉢の姿が映る。     | surreal / mid / medium       |
| CR-02-27 | CAM02-E09 | 奥の開口に三毛猫が一匹座る。               | object / mid / medium        |

## 追加候補 — CAM 03

| 候補ID   | 対象ID    | 変化案                                   | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ---------------------------------------- | ---------------------------- |
| CR-03-13 | CAM03-E18 | 床の白い反射の中に丸い水たまりができる。 | environment / mid / medium   |
| CR-03-14 | CAM03-E19 | 床タイル一枚だけ三角形に分割される。     | environment / early / subtle |
| CR-03-15 | CAM03-E19 | 床タイル一枚だけ濃い青色になる。         | environment / early / subtle |
| CR-03-16 | CAM03-E08 | 白い壁飾り一つが円形になる。             | object / early / subtle      |
| CR-03-17 | CAM03-E08 | 白い壁飾り一つが薄い黄色になる。         | object / early / subtle      |
| CR-03-18 | CAM03-E01 | 天井の一部に小さな水玉模様が現れる。     | environment / mid / medium   |
| CR-03-19 | CAM03-E05 | 天井点検板の形が長方形から丸に変わる。   | environment / mid / medium   |
| CR-03-20 | CAM03-E09 | 天井の器具から細いリボンが一本下がる。   | object / mid / medium        |
| CR-03-21 | CAM03-E07 | 柱の白い表示面に紙が一枚貼られる。       | object / early / medium      |
| CR-03-22 | CAM03-E14 | 看板の下段の一文字だけ左右反転する。     | object / early / subtle      |
| CR-03-23 | CAM03-E14 | 看板の緑の面だけ青色に発光する。         | object / mid / medium        |
| CR-03-24 | CAM03-E15 | 木箱の隣に同じ木箱が増える。             | object / mid / medium        |
| CR-03-25 | CAM03-E08 | 実際の通路にない猫だけ店先ガラスに映る。 | surreal / mid / medium       |
| CR-03-26 | CAM03-E13 | 暗い開口の前を白猫が歩く。               | object / mid / medium        |
| CR-03-27 | CAM03-E06 | シャッターの横板一枚が波形に変わる。     | environment / mid / medium   |

## 追加候補 — CAM 04

| 候補ID   | 対象ID    | 変化案                                                         | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | -------------------------------------------------------------- | ---------------------------- |
| CR-04-13 | CAM04-E15 | 床タイル一枚が淡い橙色になる。                                 | environment / early / subtle |
| CR-04-14 | CAM04-E15 | 床タイル一枚に花の模様が現れる。                               | environment / early / subtle |
| CR-04-15 | CAM04-E17 | 点検口の脇に水たまりが現れ照明を映す。                         | environment / mid / medium   |
| CR-04-16 | CAM04-E14 | ガラス上部の文字の一字だけ左右反転する（架空化後に字を確定）。 | object / early / subtle      |
| CR-04-17 | CAM04-E14 | 店舗ガラスに、通路にはない傘だけが映る。                       | surreal / mid / medium       |
| CR-04-18 | CAM04-E09 | 窓のポスターの隣に同じポスターが増える。                       | object / mid / medium        |
| CR-04-19 | CAM04-E09 | 窓のポスターだけ縦長から丸形になる。                           | object / mid / medium        |
| CR-04-20 | CAM04-E08 | 看板の一部分だけ赤から青へ変わる。                             | object / early / subtle      |
| CR-04-21 | CAM04-E06 | 天井器具から小さな札が吊られる。                               | object / mid / medium        |
| CR-04-22 | CAM04-E10 | 扉の取手が左右逆側になる（原寸確認後に配置）。                 | object / mid / medium        |
| CR-04-23 | CAM04-E10 | 扉の前に小さな猫が一匹座る。                                   | object / mid / medium        |
| CR-04-24 | CAM04-E11 | 鉢植え一鉢の葉だけ淡い赤紫になる。                             | object / early / subtle      |
| CR-04-25 | CAM04-E11 | 鉢植え一鉢が同じ形でもう一鉢増える。                           | object / mid / medium        |
| CR-04-26 | CAM04-E16 | 床点検口の四角い外枠が円形になる。                             | environment / mid / medium   |
| CR-04-27 | CAM04-E07 | 壁面に縦長の白い紙が一枚増える。                               | object / early / medium      |

## 追加候補 — CAM 05

| 候補ID   | 対象ID    | 変化案                                           | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------------ | ---------------------------- |
| CR-05-13 | CAM05-E13 | 床タイル一枚だけ緑がかった色になる。             | environment / early / subtle |
| CR-05-14 | CAM05-E13 | 床タイル一枚だけ縞模様になる。                   | environment / early / subtle |
| CR-05-15 | CAM05-E13 | 店舗角の床に小さな水たまりが現れる。             | environment / mid / medium   |
| CR-05-16 | CAM05-E12 | レンガ帯の一枚だけ青いタイルになる。             | environment / early / subtle |
| CR-05-17 | CAM05-E12 | レンガ帯の一枚だけ円形になる。                   | environment / mid / medium   |
| CR-05-18 | CAM05-E01 | 天井の一部だけ格子模様になる。                   | environment / early / subtle |
| CR-05-19 | CAM05-E05 | 蛍光灯の隣に同じ長さの照明がもう一本増える。     | environment / mid / medium   |
| CR-05-20 | CAM05-E05 | 照明の下から小さな風鈴が一つ下がる。             | object / mid / medium        |
| CR-05-21 | CAM05-E11 | 黒い側面の上部に白い紙が一枚貼られる。           | object / early / medium      |
| CR-05-22 | CAM05-E08 | 実際の通路にはない椅子だけ正面ガラスに映る。     | surreal / mid / medium       |
| CR-05-23 | CAM05-E08 | カーテンの縦縞一枚分だけ横縞に変わる。           | object / mid / medium        |
| CR-05-24 | CAM05-E08 | 正面ガラスの一枚だけ淡い琥珀色になる。           | environment / mid / medium   |
| CR-05-25 | CAM05-E06 | 奥の通路に黒猫が一匹現れる。                     | object / mid / medium        |
| CR-05-26 | CAM05-E10 | 架空化した看板のひらがな一文字だけ左右反転する。 | object / early / subtle      |
| CR-05-27 | CAM05-E09 | 暗い隙間の反射にだけ小さな傘が映る。             | surreal / mid / medium       |

## 追加候補 — CAM 06

| 候補ID   | 対象ID    | 変化案                                   | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ---------------------------------------- | ---------------------------- |
| CR-06-13 | CAM06-E16 | 床タイル一枚に細かな水玉模様が現れる。   | environment / early / subtle |
| CR-06-14 | CAM06-E16 | 床タイル一枚だけ淡い緑色になる。         | environment / early / subtle |
| CR-06-15 | CAM06-E16 | 右壁沿いの床に水たまりが一つ現れる。     | environment / mid / medium   |
| CR-06-16 | CAM06-E15 | 粗い壁の一部分だけ横縞の模様になる。     | environment / early / subtle |
| CR-06-17 | CAM06-E15 | 額入り掲示の横に小さな紙が一枚増える。   | object / early / medium      |
| CR-06-18 | CAM06-E15 | 扉の銀色取手が扉の反対側になる。         | object / mid / medium        |
| CR-06-19 | CAM06-E01 | 天井の板一枚だけ小さな市松模様になる。   | environment / mid / medium   |
| CR-06-20 | CAM06-E03 | 蛍光灯の端に小さな紙札がぶら下がる。     | object / mid / medium        |
| CR-06-21 | CAM06-E07 | 看板のひらがな一文字だけ左右反転する。   | object / early / subtle      |
| CR-06-22 | CAM06-E07 | 看板の橙色の四角だけ青色になる。         | object / mid / medium        |
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
| CR-07-16 | CAM07-E16 | 床タイル一枚だけ淡い紫色になる。                   | environment / early / subtle |
| CR-07-17 | CAM07-E16 | 床タイル一枚だけひし形模様になる。                 | environment / early / subtle |
| CR-07-18 | CAM07-E18 | 丸い照明反射の間に水たまりが一つ現れる。           | environment / mid / medium   |
| CR-07-19 | CAM07-E12 | 白壁に薄い格子模様が局所的に現れる。               | environment / early / subtle |
| CR-07-20 | CAM07-E12 | 白壁に小さな掲示が一枚増える。                     | object / early / medium      |
| CR-07-21 | CAM07-E01 | 天井板の一枚だけ淡い黄色になる。                   | environment / early / subtle |
| CR-07-22 | CAM07-E03 | 丸型設備の隣に同じ設備が増える。                   | environment / mid / medium   |
| CR-07-23 | CAM07-E05 | 奥の天井器具から短い紐が一本下がる。               | object / mid / medium        |
| CR-07-24 | CAM07-E13 | 丸い扉の取手が四角い取手になる。                   | object / early / subtle      |
| CR-07-25 | CAM07-E13 | 扉上部の小窓が二つに増える。                       | object / mid / medium        |
| CR-07-26 | CAM07-E06 | 現実の踊り場にはいない猫だけガラスに映る。         | surreal / mid / medium       |
| CR-07-27 | CAM07-E09 | 左階段の一段に小さな猫が横たわる。                 | object / mid / medium        |

## 追加候補 — CAM 08

| 候補ID   | 対象ID    | 変化案                                     | 分類 / フェーズ / 目立ち度   |
| -------- | --------- | ------------------------------------------ | ---------------------------- |
| CR-08-13 | CAM08-E16 | 床タイル一枚だけ薄い茶色になる。           | environment / early / subtle |
| CR-08-14 | CAM08-E16 | 床タイル一枚だけ同心円模様になる。         | environment / early / subtle |
| CR-08-15 | CAM08-E17 | 白い床反射の隣に小さな水たまりができる。   | environment / mid / medium   |
| CR-08-16 | CAM08-E11 | 柱正面の粒模様が一部分だけ縦縞になる。     | environment / early / subtle |
| CR-08-17 | CAM08-E11 | 柱に小さな紙の案内が一枚現れる。           | object / early / medium      |
| CR-08-18 | CAM08-E01 | 天井の汚れが一部分だけ格子模様になる。     | environment / early / subtle |
| CR-08-19 | CAM08-E03 | 同心円設備の外形だけ四角くなる。           | environment / mid / medium   |
| CR-08-20 | CAM08-E05 | 奥の天井器具から小さな折り鶴が下がる。     | object / mid / medium        |
| CR-08-21 | CAM08-E12 | 柱の横長器具が二つ並ぶ。                   | object / mid / medium        |
| CR-08-22 | CAM08-E13 | コンセントの四角い外形が円形になる。       | object / early / subtle      |
| CR-08-23 | CAM08-E15 | 発光パネルの一枚だけ淡い青色になる。       | environment / early / subtle |
| CR-08-24 | CAM08-E06 | ガラス内にだけ、実物のない買い物袋が映る。 | surreal / mid / medium       |
| CR-08-25 | CAM08-E07 | 左の暗い店先に一匹の猫が現れる。           | object / mid / medium        |
| CR-08-26 | CAM08-E10 | 架空化した看板の文字一字だけ左右反転する。 | object / early / subtle      |
| CR-08-27 | CAM08-E14 | 白い帯状パネルの一部分だけ波形に曲がる。   | environment / mid / medium   |
