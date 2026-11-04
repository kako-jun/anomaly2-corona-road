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

## 制作仕様（未制作）— CAM 05

CAM05 (Emergency Stairwell, `cam5.webp`, 676x900) 向けの新規の画像異変 7 件（大面積 1 + 小物 6）の**制作仕様**（#47）。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。台帳の偏り（object / add_object 偏重、person 系の不足）の是正が目的で、7 件中 6 件は person / add_person / add_creature / surreal / reflection / state_change 側、`add_object` は 1 件、`color_shift` は 0 件。制作して台帳へ移したら、**この節の該当項を削除**し（`candidate_id` に見出しの ID を入れる）、昇格元の候補行（CR-05-05）も同じ PR で削除する（CR-05-25 は昇格しない。プールに残す）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。

| ID | 要素 | category / anomaly_type | 種別 | box（baseline px） | フェーズ / 目立ち度 |
| --- | --- | --- | --- | --- | --- |
| AR-05-morning-glory-wall | CAM05-E11 | surreal / surreal | **大面積** | `118,8,280,598`（162x590、95,580 px²。矩形） | late / obvious |
| AR-05-aisle-silhouette | CAM05-E06 | person / add_person | 小物 | `78,338,106,405`（28x67） | mid / medium |
| AR-05-aisle-light-streak | CAM05-E14 | environment / state_change | 小物 | `4,436,108,490`（104x54） | mid / medium |
| AR-05-aisle-goldfish | CAM05-E14 | object / add_creature | 小物 | `60,520,104,562`（44x42） | mid / medium |
| AR-05-door-fingers | CAM05-E09 | person / add_person | 小物（CR-05-05 の昇格） | `562,230,596,330`（34x100） | mid / medium |
| AR-05-ceiling-shirt | CAM05-E01 | object / add_object | 小物 | `243,8,303,50`（60x42） | mid / medium |
| AR-05-floor-child-shadow | CAM05-E13 | person / reflection | 小物 | `597,598,672,752`（75x154） | late / medium |

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

### AR-05-morning-glory-wall — 左の黒い側面一面に朝顔の蔓（大面積）

- **ID / camera / element_id**: AR-05-morning-glory-wall / CAM05 / CAM05-E11（黒い側面。柱の左半分と、根元の床の細い帯を含む）
- **面**: box `118,8,280,598`（162x590 = 95,580 px²、画像 676x900 = 608,400 px² の 15.7%。1/8 = 76,050 を約 19,500 上回る）。ポリゴンは矩形で、**ポリゴンの実面積 = alpha bbox = 95,580 px²（2026-11-05 に shoelace 式で実測）**。**貼り込み後の alpha bbox が約 90,000 を割ったら登録せず面を足す**。ポリゴン（baseline px）: `(118,8) (280,8) (280,598) (118,598)`。面の内訳は、黒い側面（x 135〜255、y 約 92〜540）・左の細い柱（x 118〜135）・角柱（x 255〜280）・根元の床の帯（y 540〜598）・天井の帯（y 8〜92。蔓が壁から天井へ這い上がり、垂れ下がる）。止め線は、右のガラス区画（x 280。大面積 cafe の x=282 まで 2px）と根元の床（y=598。大面積 cranes の y=600 まで 2px）。元の案は 70,798 px²（黒い側面だけ）で 1/8 を割ったため、左の柱・角柱・天井の帯を足した。
- **物と変化**: 左の黒い不透明な側面（上は黒、下は暗いカーテン越し）の全面に、細い蔓と無地の朝顔の花が這い上がる。蔓は根元の床の帯から立ち上がって壁の黒い面を覆い、柱の左半分にも絡む。花は淡い水色と白の素朴な朝顔（ラッパ形、無地）が数十輪、ハート形の葉は明るい黄緑にして黒に沈まないようにする。床の帯には蔓の根元と落ちた花が少しだけ散る。
- **不気味さの狙い**: 閉店して誰もいない地下街なのに、壁が一面だけ夏の庭になっている。小学校の観察日記のような懐かしさが、人のいない場所で静かに育つ。老人の記憶が作る優しい異変（story: 通路に現れていた像は老人 3 人の記憶）で、怖がらせる小道具は使わない。
- **保持するもの**: 柱の右端（x 280 より右）と金属の枠、右の正面ガラスとカーテン、黒い側面の上端の接線以外の天井（蔓が垂れる帯 y 8〜92 の外）、左の通路・店先・立てスタンド、床の目地、右上の蛍光灯。ガラス面（x>282）には蔓を出さない（大面積 cafe の領域）。
- **3:2 の窓**（cam5 は 676 幅。`composite-polygon.py crop --crop 0,y0,676,y0+450`。縮尺 1536/676 = 2.2722 倍。box 高さ 590 > 450 なので**上下 2 枚**、直列）:
  - 窓 A: `0,0,676,450`（box 上端 8 は A の内側）。
  - 窓 B: `0,300,676,750`（A と 150px 重なる。box 下端 598 は B の内側）。A を生成・採用して `restore` で貼り戻し、B の入力はその全画面から `crop` で切り出す。B の結果は A の貼り戻し済み全画面を `--base` にして `restore --blend-px 140 --blend-edges t` で貼る。
- **生成プロンプト 窓 A**（3 テイク作って目視で選ぶ。窓内の座標は元画像の px ×2.27）:

  ```text
  $imagegen Edit the attached image, a 3:2 crop (1536x1024) of a low-light surveillance camera photo of an empty underground shopping arcade. At the left-center there is a dark, opaque black side wall of a glass shop block (roughly x 307-580 px in this frame, its top edge near y 209 px, running down to the bottom of the frame), with a thick grey metal pillar at its right edge (x 580-640 px) and a thin pillar at its left edge (x 268-307 px).
  Make ONLY this change: the whole black side wall, from its top edge near the ceiling to the bottom of the frame, the thin pillar at its left, and the grey pillar at its right up to x 636 px are covered with climbing morning glory vines, and a few vines also climb past the top edge and hang down from the ceiling above the wall (x 268-636 px, y 18-209 px): thin dark green stems with pale yellow-green heart-shaped leaves, and about forty plain pale blue and white trumpet-shaped morning glory flowers (completely plain, no marks), scattered densely over the black surface like a summer garden grown in one night. Make the flowers about 1.5x larger than real scale and bright so that they stand out clearly against the black wall; leaves lighter than the wall. Give a faint soft shadow under the larger leaves.
  Do not touch the glass panels and curtains to the right of the pillar (right of x 640 px), the ceiling outside the x 268-636 px strip, the ceiling lights, the left aisle with its shop fronts and the thin-legged stand, the floor tiles and the long fluorescent tube. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```

- **生成プロンプト 窓 B**（A の貼り戻し済み全画面から切り出した窓を入力にする。窓 B は y0=300。側面の下端は窓の y 約 557 px、床の帯は y 557〜677 px）:

  ```text
  $imagegen Edit the attached image, a 3:2 crop (1536x1024) of a low-light surveillance camera photo of an empty underground shopping arcade. At the left-center, the lower part of a black side wall (x 307-580 px in this frame, ending at its base at about y 557 px) is already covered with morning glory vines, and a grey metal pillar stands at its right edge (x 580-640 px).
  Make ONLY this change: continue the same vines and plain pale blue and white morning glory flowers down to the base of the wall and the pillars at both sides, and let the roots and a few fallen flowers spread onto the grey floor tiles in front of the wall, as a narrow band (about x 268-636 px, y 557-677 px). Keep the same vine and flower style, size and brightness as the existing vines in the upper part; the upper 340 px of the frame already holds the vines and must blend continuously.
  Do not touch the glass panels and curtains to the right of the pillar, the right half of the pillar, the floor tiles elsewhere, the white floor reflections, the left aisle and the thin-legged stand, and the lit floor in front. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```

- **作り方**: ①窓 A を 3 テイク生成 → 目視で 1 枚選び `restore`。②窓 B を A の貼り戻し済み全画面から `crop` して生成 → `restore --blend-px 100 --blend-edges t`。③上のポリゴンで `cutout --polygon "118,8 280,8 280,598 118,598" --feather 2` し、alpha bbox を測る（約 90,000 を割ったら面を足す。cafe・cranes と重ならないことも測る）。④ガラス面（x>282）に蔓が出ていないこと、柱の右端（x>280）が元のままなことを原寸で確認。
- **難所と没基準**: 花に文字様の模様、蔓がガラス面へ漏れる、葉が黒に沈む（明るさ不足）、花が小さすぎて均一な緑の面になる、はいずれも没。ポリゴンの外へ蔓が出たら `cutout` が切るので再生成は不要。
- **フェーズ / 目立ち度**: late / obvious。
- **台帳案**: id `AR-05-morning-glory-wall` / element_id `CAM05-E11` / category `surreal` / anomaly_type `surreal` / location 「CAM05-E11 の左の黒い側面、差分左上 (x,y) px」/ detail 「左の黒い側面の全面・左右の柱・天井の帯に、無地の朝顔の蔓と花が一晩で這い上がる（夏の記憶）」/ `candidate_id: 'AR-05-morning-glory-wall'`。note に「大面積。柱の右端（x>280）・ガラス面は不変。同カメラの大面積と bbox が重ならない（cafe まで 2px、cranes まで 2px の実測）」と、登録時に出し直した重なり表を書く。
- **排他**: `AR-05-film-poster`（黒い側面の上部に貼る件）・`AR-05-brown-column`（同じ角柱を薄茶にする件）・`AR-05-joint-into-glass`（根元の床の帯が重なる）・`AR-05-paper-streamers`（天井の帯が重なる。bbox 重なり 4,104）・`AR-05-sign-in-glass`（bbox 重なり 16,472。ガラス内の看板で、壁の外に出る部分は蔓の下に残らない）・`AR-05-ceiling-shirt`（本節の小物。box が天井の帯に重なる）・候補の CR-05-09 / CR-05-38 は、同じ面を覆うので同プレイ非共存。
- **相互参照**: 植物の既存は鉢植えの葉の色・花の消失など小さな変化のみで、壁を覆う件は無い（台帳の `detail` を `grep` で確認、2026-11-05）。壁一面に同じ素材を敷き詰める件（CR-LG-01-02 顔写真・CR-LG-06-01 ポスター）は別カメラ・別素材。**型は「面一面」の大面積の例外に従う**。
- **生成枚数の最小見積り**: 窓 A 3 テイク + 窓 B 3 テイク（素材の別生成なし）。

---

### AR-05-aisle-silhouette — 左奥通路の遠景に、虫取り網を担いだ少年の逆光の影

- **camera / element_id**: CAM05 / CAM05-E06
- **物と変化**: 左奥へ伸びる通路の明るい床に、麦わら帽子をかぶり虫取り網を肩に担いだ少年の**後ろ姿の黒いシルエット**が一つ立つ（夏休みの記憶）。顔・服の模様・肌は描かない（真っ黒に近い影）。通路の奥のほうを向いている
- **最終 box**（baseline px）: `78,338,106,405`（28x67）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,300,256,471`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (78,38)-(106,105)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the bright, glossy floor of the far aisle, stand one small boy seen from behind as a completely black backlit silhouette (no face, no skin, no clothing pattern visible), wearing a wide-brimmed straw hat and carrying a long thin insect net resting on his shoulder, facing away from the camera toward the end of the aisle. Make him about 1.3x larger than real scale so that the silhouette reads clearly against the bright floor. Add a long soft dark shadow stretching toward the camera on the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the shop fronts, the thin-legged stand at the far left, the tile joints, the white floor reflections or the glass shop block at the right. Place the object, including its shadow, centered at about 36% from the left and 42% from the top of the image, occupying roughly 11% of the image width and 39% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the bright, glossy floor of the far aisle, stand one small boy seen from behind as a completely black backlit silhouette (no face, no skin, no clothing pattern visible), wearing a wide-brimmed straw hat and holding a long thin insect net upright like a pole beside him, its round hoop raised high above the hat, facing away from the camera toward the end of the aisle. Make him about 1.3x larger than real scale so that the silhouette reads clearly against the bright floor. Add a long soft dark shadow stretching toward the camera on the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the shop fronts, the thin-legged stand at the far left, the tile joints, the white floor reflections or the glass shop block at the right. Place the object, including its shadow, centered at about 36% from the left and 42% from the top of the image, occupying roughly 11% of the image width and 39% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the bright, glossy floor of the far aisle, one small boy seen from behind as a completely black backlit silhouette (no face, no skin, no clothing pattern visible), wearing a wide-brimmed straw hat, crouching slightly with an insect net held low so that its round hoop rests near the floor, as if looking at something on the ground, facing away from the camera. Make him about 1.3x larger than real scale so that the silhouette reads clearly against the bright floor. Add a long soft dark shadow stretching toward the camera on the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the shop fronts, the thin-legged stand at the far left, the tile joints, the white floor reflections or the glass shop block at the right. Place the object, including its shadow, centered at about 36% from the left and 42% from the top of the image, occupying roughly 11% of the image width and 39% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 通路の店先・左端のスタンド・床の白い反射・右のガラス区画。
- **最寄り既存 overlay と実測距離**: AR-05-joint-into-glass まで 33.2px（box 基準・矩形間のユークリッド距離、次点 AR-05-stand-tag 40.0px）。本節の他の項では AR-05-aisle-light-streak まで 31.0px。 **余裕が小さい（37px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで広がる。30px 割れなら左へ動かす）。大面積 `AR-05-morning-glory-wall`（x 118〜）とは 12px で、大面積は距離規則の対象外だが同プレイでの共存は可（別の場所・別の物）。
- **分類 / フェーズ / 目立ち度**: person / mid / medium
- **視認性の注意**: 明るい床の光だまりに黒い影なので対比は強い。足元の影を長く濃くして接地させる。細い網の柄は消えやすいので、帽子の幅と網の先の丸い枠を大きめに。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'person'` / `anomaly_type: 'add_person'` / `detail: '左奥の通路の明るい床に、麦わら帽子と虫取り網の少年の後ろ姿の黒い影が一つ立つ（夏休みの記憶）'` / `candidate_id: 'AR-05-aisle-silhouette'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 後ろ姿の人物系の既存は他カメラの通路奥の店員・紙袋の小柄な人物・中折れ帽の老人と、`AR-05-old-woman-in-glass`（CAM05・割烹着の老婆、正面ガラス内）。別人物（少年の影）・別の場所（通路）。麦わら帽子は `CR-NEW-01-03`（CAM01・物）と別。

---

### AR-05-aisle-light-streak — 左奥通路の光だまりから、光源の無い左へ細長い光の帯が伸びる

- **camera / element_id**: CAM05 / CAM05-E14
- **物と変化**: 左奥通路の床の白い光だまりから、光源のない左（壁・店先の側）へ向かって、細長い光の帯が一本、床の上を走るように伸びる。光だまりの形が状況に合わず変わる異変で、新しい物は足さない（猫の案 `AR-05-aisle-cat` は台帳に猫が 5 件あり 7 件目になるため差し替えた。CR-05-25 は候補プールに残す）
- **最終 box**（baseline px）: `4,436,108,490`（104x54）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,380,256,551`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (4,56)-(108,110)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the glossy floor tiles at the far left, the bright white pool of light on the floor sends out one long narrow straight band of white light across the tiles toward the left edge of the frame, in a direction where there is no light source above, with soft edges and a brightness equal to the existing pool. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the thin-legged stand, the shop fronts above, the dark wall at the right or the existing light pool itself. Place the changed area, including any soft glow, centered at about 22% from the left and 49% from the top of the image, occupying roughly 41% of the image width and 32% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the glossy floor tiles at the far left, the bright white pool of light on the floor stretches out into one long tapered wedge of white light that narrows as it runs across the tiles toward the left edge of the frame, like light leaking through an open door although there is no door and no light source there, with soft edges and a brightness equal to the existing pool. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the thin-legged stand, the shop fronts above, the dark wall at the right or the existing light pool itself. Place the changed area, including any soft glow, centered at about 22% from the left and 49% from the top of the image, occupying roughly 41% of the image width and 32% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the glossy floor tiles at the far left, the bright white pool of light on the floor is followed by three separate elongated oval patches of white light lined up one after another across the tiles toward the left edge of the frame, each stretched in the same direction, in a place where there is no light source above, with soft edges and a brightness equal to the existing pool. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the thin-legged stand, the shop fronts above, the dark wall at the right or the existing light pool itself. Place the changed area, including any soft glow, centered at about 22% from the left and 49% from the top of the image, occupying roughly 41% of the image width and 32% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 元の光だまりの形・タイル目地・左端のスタンド・左上の店先。
- **最寄り既存 overlay と実測距離**: AR-05-joint-into-glass まで 31.0px（box 基準・矩形間のユークリッド距離、次点 AR-05-film-poster 78.2px、台帳 CAM05 の overlay_origin/dimensions から 2026-11-05 に実測。大面積 2 件は除く）。本節の他の項では AR-05-aisle-silhouette まで 31.0px（上）、AR-05-aisle-goldfish まで 30.0px（下）。 **余裕が小さい（37px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで広がる。30px 割れなら、帯の長さを縮めて box を左右から詰める）。
- **分類 / フェーズ / 目立ち度**: environment / mid / medium（anomaly_type: state_change）
- **視認性の注意**: 光だまりの白に対し、帯は暗いグレーの床の上に出るので、帯の縁をはっきり取り、光だまりと同じ明るさにする。薄いと床の反射に溶ける。視認性が下限を割りそうなら、帯を太く短く（box 全体を使う）して作り直す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'environment'` / `anomaly_type: 'state_change'` / `detail: '左奥の通路の床の光だまりから、光源のない左へ向かって細長い光の帯が伸びる'` / `candidate_id: 'AR-05-aisle-light-streak'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 光・反射の既存は `AR-05-floor-glare-backside`（E15・床反射にガラス裏側）・`AR-05-glass-light`（ガラス内の光）。通路の光だまり自体の形を変える件は台帳に無い（2026-11-05 の grep）。silhouette とは 31px 離れた別の場所（同じ光だまりの上下）だが、同プレイで同時に出すと「光だまりの異変」が二重になるので避ける（推奨）。

---

### AR-05-aisle-goldfish — 床に置かれた金魚の袋（縁日）

- **camera / element_id**: CAM05 / CAM05-E14
- **物と変化**: 左奥通路の床に、水を入れた透明なビニール袋が一つ置かれ、赤い金魚が一匹泳いでいる（縁日の金魚すくいの記憶。袋の口は輪ゴムで縛られ、模様・文字はない）
- **最終 box**（baseline px）: `60,520,104,562`（44x42）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,450,256,621`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (60,70)-(104,112)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the glossy floor tiles, place one small transparent plastic bag filled with water, its mouth tied with a plain rubber band, sitting upright on the floor, with a single small bright orange-red goldfish swimming inside, completely plain, with no print and no label on the bag. Make it about 1.5x larger than real scale and give the goldfish a strongly saturated orange-red color so that it reads clearly. Add a soft bright highlight on the water bag and a soft dark contact shadow on the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the white floor reflections, the black wall at the right or anything else. Place the object, including its shadow, centered at about 32% from the left and 53% from the top of the image, occupying roughly 17% of the image width and 25% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the glossy floor tiles, place one small transparent plastic bag filled with water, its mouth tied with a plain rubber band, leaning slightly to one side on the floor, with a single small bright orange-red goldfish near the top of the water seen from the side, completely plain, with no print and no label on the bag. Make it about 1.5x larger than real scale and give the goldfish a strongly saturated orange-red color. Add a bright long highlight along the lower edge of the water bag and a soft dark contact shadow on the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the white floor reflections, the black wall at the right or anything else. Place the object, including its shadow, centered at about 32% from the left and 53% from the top of the image, occupying roughly 17% of the image width and 25% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the glossy floor tiles, place one small transparent plastic bag filled with water, its mouth tied with a plain rubber band that makes a large visible knot, sitting upright on the floor, with a single small bright orange-red goldfish swimming near the bottom of the bag facing the camera, completely plain, with no print and no label on the bag. Make it about 1.5x larger than real scale and give the goldfish a strongly saturated orange-red color. Add a bright ring-shaped reflection on the water surface and a soft dark contact shadow on the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the tile joints, the white floor reflections, the black wall at the right or anything else. Place the object, including its shadow, centered at about 32% from the left and 53% from the top of the image, occupying roughly 17% of the image width and 25% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 床の白い反射・タイル目地・右の黒い側面。
- **最寄り既存 overlay と実測距離**: AR-05-joint-into-glass まで 35.0px（box 基準、次点 AR-05-brown-column 151.0px）。本節の他の項では AR-05-aisle-light-streak まで 30.0px。 余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 明るい光だまりに赤橙の小さな魚なので、色の彩度を上げて袋の縁を明るく。透明な袋は背景に溶けやすいので、水面の反射と縛り口を大きめに。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_creature'` / `detail: '左奥の通路の床に、金魚が一匹入った水の袋が置かれている（縁日の記憶。無地）'` / `candidate_id: 'AR-05-aisle-goldfish'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 金魚は台帳・候補プールのどちらにも無い（2026-11-05 の grep）。生き物の既存は猫系のみ（本節では猫を足さない）。

---

### AR-05-door-fingers — 扉の内側のカーテンの合わせ目に子供の指の影（CR-05-05 の昇格）

- **camera / element_id**: CAM05 / CAM05-E09
- **物と変化**: 右側ガラス扉の左の戸の暗い隙間（細長く立てかけた物の右側）で、カーテンの端が内側から小さくつままれたように寄り、そのまわりに**指の形をした暗いぼんやりした影**が落ちる。体の部位そのものは描かず、つまみ寄せた折り目と淡い影だけで人の気配を示す（手・腕・顔・肌・爪は無い）。※昇格元: CR-05-05（右端のカーテンの隙間に細い指のような影。制作時に候補行を削除）
- **最終 box**（baseline px）: `562,230,596,330`（34x100）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `420,190,676,361`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (142,40)-(176,140)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: inside the dark glass of the left leaf of the glass door (the dark vertical gap with the curtain), the edge of the curtain is gathered and pinched in one narrow fold and drawn slightly aside, as if something small behind it were pulling it, with a few narrow soft dark finger-shaped shadows on the fabric around the pinched fold. Only the pinched fold and the vague soft dark shadows, no hand, no arm, no face, no skin detail. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Make the shadows slightly lighter than the dark gap so that they read clearly, with the curtain fold catching a thin pale highlight. Do not touch the metal door frame, the handle, the green sign above, the other glass panels, the curtains elsewhere or the leaning object in the gap. Place the object, including its shadow, centered at about 62% from the left and 53% from the top of the image, occupying roughly 13% of the image width and 58% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: inside the dark glass of the left leaf of the glass door (the dark vertical gap with the curtain), the edge of the curtain is pinched into a small tight pleat near its middle, with the cloth pulled slightly toward the inside, and a soft dark elongated shadow in the shape of narrow tips lies right behind the pleat, as if the curtain were being held by something small. Only the pleat and the vague soft dark shadow, no hand, no arm, no face, no skin detail. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Make the shadows slightly lighter than the dark gap so that they read clearly, with the curtain fold catching a thin pale highlight. Do not touch the metal door frame, the handle, the green sign above, the other glass panels, the curtains elsewhere or the leaning object in the gap. Place the object, including its shadow, centered at about 62% from the left and 53% from the top of the image, occupying roughly 13% of the image width and 58% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: inside the dark glass of the left leaf of the glass door (the dark vertical gap with the curtain), the edge of the curtain is lifted and pinched at its upper part, hanging in a slight diagonal fold, with a thin pale highlight along the fold and soft dark finger-shaped smudges of shadow just behind it. Only the lifted fold and the vague soft dark shadows, no hand, no arm, no face, no skin detail. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Make the shadows slightly lighter than the dark gap so that they read clearly, with the curtain fold catching a thin pale highlight. Do not touch the metal door frame, the handle, the green sign above, the other glass panels, the curtains elsewhere or the leaning object in the gap. Place the object, including its shadow, centered at about 62% from the left and 53% from the top of the image, occupying roughly 13% of the image width and 58% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 扉の金属枠・取手・上の緑看板・他のガラス面。
- **最寄り既存 overlay と実測距離**: AR-05-glass-light まで 51.0px（box 基準、次点 AR-05-sign-digit-missing 59.5px）。本節の他の項では AR-05-floor-child-shadow まで 268.0px。 余裕あり。それでも最終 overlay の alpha bbox で再測定する。
- **分類 / フェーズ / 目立ち度**: person / mid / medium
- **視認性の注意**: 暗い隙間に黒い影は沈みやすい。影をやや灰色に、つまんだカーテンの折り目に細い白い明部を付けて、**影の本体より折り目の明暗で見せる**。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す（通らなければ折り目を大きく、明部を強く）。
- **台帳登録時**: `category: 'person'` / `anomaly_type: 'add_person'` / `detail: '右の扉の暗い隙間で、カーテンの端が内側からつままれたように寄り、指の形の暗い影が落ちている'` / `candidate_id: 'AR-05-door-fingers'`（昇格元 CR-05-05 を note に）。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 同じ要素の `AR-05-old-woman-in-glass`（E08・正面ガラスの内側の老婆の後ろ姿）とは別のガラス・別の人物の気配（子供・体の一部だけ）。story の 4 人目（子供）の気配に寄る（令和の異変の印付けは story.md 未決）。

---

### AR-05-ceiling-shirt — 天井から吊るされた子供用の白いシャツ（服だけ）

- **camera / element_id**: CAM05 / CAM05-E01
- **物と変化**: 天井から細い針金のハンガーで、小さな無地の白い半袖シャツが一枚、袖を垂らして吊るされている（洗濯物。中に人はいない。服だけ。模様・文字・ボタンの刻印なし）
- **最終 box**（baseline px）: `243,8,303,50`（60x42）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `190,0,446,171`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (53,8)-(113,50)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark ceiling in the upper left of this frame, hang one small plain white short-sleeved child's shirt on a thin wire clothes hanger from a short thin cord attached to the ceiling, the shirt empty and limp with its sleeves hanging down, completely plain with no print, no buttons marked, no label and no pattern. Make it about 1.4x larger than real scale and a clean pale white so that it reads clearly against the dark ceiling. Add a faint soft shadow of the shirt on the ceiling surface behind it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the ceiling speckles and panel seams, the ceiling lights, the black top frame of the glass shop block below or the grey pillar. Place the object, including its shadow, centered at about 32% from the left and 17% from the top of the image, occupying roughly 23% of the image width and 25% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark ceiling in the upper left of this frame, hang one small plain white short-sleeved child's shirt by its collar from a tiny hook fixed directly on the ceiling, with no hanger, the shirt empty and limp with the shoulders drooping and the sleeves hanging straight down, completely plain with no print, no buttons marked, no label and no pattern. Make it about 1.4x larger than real scale and a clean pale white so that it reads clearly against the dark ceiling. Add a faint soft shadow of the shirt on the ceiling surface behind it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the ceiling speckles and panel seams, the ceiling lights, the black top frame of the glass shop block below or the grey pillar. Place the object, including its shadow, centered at about 32% from the left and 17% from the top of the image, occupying roughly 23% of the image width and 25% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark ceiling in the upper left of this frame, hang one small plain white short-sleeved child's shirt on a thin wire clothes hanger from a short thin cord, the hanger slightly tilted as if swinging, the empty shirt hanging crooked with one sleeve lifted outward and the other hanging down, completely plain with no print, no buttons marked, no label and no pattern. Make it about 1.4x larger than real scale and a clean pale white so that it reads clearly against the dark ceiling. Add a faint soft shadow of the shirt on the ceiling surface behind it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the ceiling speckles and panel seams, the ceiling lights, the black top frame of the glass shop block below or the grey pillar. Place the object, including its shadow, centered at about 32% from the left and 17% from the top of the image, occupying roughly 23% of the image width and 25% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 天井の点状汚れと板継ぎ目・天井灯・下の黒い枠と灰色の柱。
- **最寄り既存 overlay と実測距離**: AR-05-paper-streamers まで 31.0px（box 基準、次点 AR-05-brown-column 32.0px）。 **余裕が小さい（37px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで広がる。30px 割れたら右へ動かす。右の AR-05-duplicate-light までは 32px で、動かせる余裕は 2px しか無い。割れたら box の幅を縮めて作り直す）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 暗い天井に白い小さなシャツなので対比は強い。box が 60x42 と小さいので、袖を広げた T 字の形を大きく取る。ハンガーの針金は細くて消えやすいので、シャツ本体を大きく。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '暗い天井から、小さな無地の白いシャツがハンガーで吊るされている（洗濯物。服だけ）'` / `candidate_id: 'AR-05-ceiling-shirt'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 天井から吊る既存 `AR-05-paper-streamers`（CAM05・同じ天井左寄りの白い紙の吹き流し。31px 隣で型が近い。**制作前に見比べ、実質同じ（白い紙の垂れ物）と見えたら取り下げ、シャツの袖と肩の形を強調する。距離 31px は box 基準なので、制作後に台帳の最終 overlay の alpha bbox で再測定し、30px 割れなら右へ動かす**）。なお本件の box は大面積 `AR-05-morning-glory-wall` の天井の帯に重なるので、同プレイ非共存・`AR-05-wind-chime`（CAM05・風鈴）・`AR-06-ceiling-balloons`・てるてる坊主（CAM06）。服だけの吊り物は他に無い。

---

### AR-05-floor-child-shadow — 手前の床に、立つ子供の影だけ

- **camera / element_id**: CAM05 / CAM05-E13
- **物と変化**: 右手前の床のタイルに、**小さな子供が立っているような影だけ**が長く落ちている（本体はない。頭の丸みと肩、細い足の影。服・顔・手の細部は無い）。床の光が右から差している向きで、影は画面の手前左へ伸びる
- **最終 box**（baseline px）: `597,598,672,752`（75x154）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `420,590,676,761`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (177,8)-(252,162)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark grey floor tiles at the right side of this frame, cast the long dark shadow of one small child standing upright, a simple flat shadow shape on the floor only (a rounded head, narrow shoulders and two thin legs), stretching toward the lower left of the frame across several tile joints, with NO child, NO body, NO clothing and NO other object present, only the shadow. Make the shadow about 1.3x larger than real scale and clearly darker than the surrounding floor, with a soft edge and the tile joints continuing through it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the other floor tiles, the light patches, the reflections or the objects on the floor at the upper left. Place the object, including its shadow, centered at about 84% from the left and 50% from the top of the image, occupying roughly 29% of the image width and 90% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark grey floor tiles at the right side of this frame, cast the long dark shadow of one small child standing upright with the head tilted slightly to one side and the arms hanging a little away from the body, a simple flat shadow shape on the floor only, stretching toward the lower left of the frame across several tile joints, with NO child, NO body, NO clothing and NO other object present, only the shadow. Make the shadow about 1.3x larger than real scale and clearly darker than the surrounding floor, with a soft edge and the tile joints continuing through it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the other floor tiles, the light patches, the reflections or the objects on the floor at the upper left. Place the object, including its shadow, centered at about 84% from the left and 50% from the top of the image, occupying roughly 29% of the image width and 90% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark grey floor tiles at the right side of this frame, cast the dark shadow of one small child standing with the legs a little apart, a simple flat shadow shape on the floor only (a rounded head with a bobbed outline, narrow shoulders and two thin legs), shorter and denser than a sunset shadow but still stretching toward the lower left across a few tile joints, with NO child, NO body, NO clothing and NO other object present, only the shadow. Make the shadow about 1.3x larger than real scale and clearly darker than the surrounding floor, with a soft edge and the tile joints continuing through it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not touch the other floor tiles, the light patches, the reflections or the objects on the floor at the upper left. Place the object, including its shadow, centered at about 84% from the left and 50% from the top of the image, occupying roughly 29% of the image width and 90% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地（影の中も目地が続く）・床の光の斑・左上の既存の物。
- **最寄り既存 overlay と実測距離**: AR-05-floor-glare-backside まで 35.0px（box 基準、次点 AR-05-beach-ball 37.0px）。本節の他の項では AR-05-door-fingers まで 268.0px。 **余裕が小さい（37px 未満）ので、最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで広がる。30px 割れたら上へ動かす）。
- **分類 / フェーズ / 目立ち度**: person / late / medium
- **視認性の注意**: 中間グレーの床に黒い影。影を十分に暗く（床より 2 段階暗く）、頭と肩の丸みを大きく取って人の形と分かるようにする。影が薄いと床の汚れに見えるので強める。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: `category: 'person'` / `anomaly_type: 'reflection'` / `detail: '右手前の床に、立っている小さな子供の影だけが長く落ちている（本体はいない）'` / `candidate_id: 'AR-05-floor-child-shadow'`。note に「大面積 `AR-05-floor-white-cranes`（床一面）と同じ床面を覆う件どうしなので排他（同プレイで共存させない）」・最寄り既存 id と最終 alpha bbox 実測距離を書く。 相互参照: 影・反射の既存は `AR-05-chair-reflection`（E08・椅子がガラスに映る）・`AR-05-floor-glare-backside`（E15・床反射にガラス裏側）。床に落ちる影だけ、は台帳に無い（2026-11-05 の grep）。story の 4 人目（子供）の気配に寄る（令和の異変の印付けは story.md 未決）。


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
