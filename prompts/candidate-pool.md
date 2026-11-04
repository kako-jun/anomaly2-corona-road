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

## 制作仕様（未制作）— CAM 04

CAM 04（Underground Junction）の新規の画像異変 8 件（小物 7・大面積 1）の**制作仕様**。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない（Issue #47 の台帳拡充。台帳 240 件→目標約 300 件の偏り是正で、object / add_object / color_shift に偏る内訳を、person・add_person・add_creature・surreal・state_change・displace・multiply へ振る）。採用して制作に進む時は、その項を**削除**して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。

### 共通

- **座標**: すべて baseline px（cam4 は 676x900。`public/images/cam4.webp` を実際に見て、床・壁・天井・物の位置を確認した）。box は作業用の最終値で、台帳の `overlay_origin` / `dimensions` は貼り込み後の alpha bbox で再計測して書く。
- **配置の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3`。台帳の `overlay_origin` / `dimensions` から CAM04 の全 29 件の alpha bbox を出し、矩形間のユークリッド距離を測った）: 小物 7 件の box は、既存の**小物**の全 overlay から 30px 以上離れる（各項に最近傍と距離）。同カメラの既存の大面積（`AR-04-window-alley` 166,278px² = 右壁、`AR-04-glass-fog-handprints` 103,045px² = 左ガラス）は、小物なら重なってよい。羽毛ぼかしで overlay が広がる分、制作後に alpha bbox で測り直す（距離 32px 以下の項は必須）。台帳は日々増えるので、登録時に同じ測定を出し直し、結果を台帳 note に貼る。
- **内訳（台帳全体の偏り是正）**: 8 件の `anomaly_type` は multiply 1 / add_person 2 / add_creature 2 / state_change 1 / surreal 1 / displace 1。add_object と color_shift は 0 件。
- **共通手順**（小物。制作スキルの手順 5〜8 と同じ）: ① 各項の「6倍クロップ」を `public/images/cam4.webp` から切り出し 1536x1024 へ拡大（webp は PNG に変換してから渡す）。② 明示的な `$imagegen` で各項の 3 テイクを生成して目視で選ぶ（0 バイトや数 KB の壊れた PNG は撮り直し。文字・ロゴ風の刻印が出たテイクは捨てる）。③ 選んだ結果を元のクロップ寸法へ縮小して baseline PNG の同位置へ貼り戻し、その全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。④ 最終 overlay の alpha bbox で既存との距離を測り直す。台帳へ登録し `check-visibility.py` を通す。⑤ 登録・コミットしたら `experiments/` の作業物を即削除する。
- **人・生き物の安全範囲と禁則**: 人は影・後ろ姿・シルエットのみ（顔・肌・指・服の柄は描かない）、生き物は猫の後ろ姿と光る目だけ。`docs/story.md` に反しない（事件は殺人と断定されていないので、血・遺体・暴力を連想させる描写は避ける。実在の商品名・番組名・人物名は使わない。人の気配は「居なくなった」「通った」止まりで、説明しない）。文字・数字・ロゴ・実在の企業名・店名は全項で描かない（出たテイクは没）。
- **共通プロンプト末尾**（各項のプロンプトに全文を含めてある）: `Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **フェーズ配分**: early 2（wall-plaster-peel / wall-panel-fallen）・mid 3（cat-back-sitting / floor-tile-void / left-edge-eyes）・late 3（glass-silhouette / shadow-behind-camera / floor-shoes-rows）。

### 一覧

| 候補ID | 対象ID | 変化 | category / anomaly_type | box (x,y,w,h) | 最寄り既存と距離 |
| --- | --- | --- | --- | --- | --- |
| AR-04-glass-silhouette | CAM04-E10 | 奥左のガラス越しの人影 | person / add_person | `(264,296,34,92)` | AR-04-door-gap 32.0px |
| AR-04-shadow-behind-camera | CAM04-E15 | カメラの背後の人の影 | person / add_person | `(170,818,100,82)` | AR-04-hatch-frame-round 30.0px |
| AR-04-cat-back-sitting | CAM04-E17 | 床の白い反射の中に座る猫 | object / add_creature | `(392,820,66,72)` | AR-04-hatch-frame-round 32.0px |
| AR-04-wall-plaster-peel | CAM04-E14 | 漆喰壁の剥落 | environment / state_change | `(625,120,51,100)` | AR-04-red-lantern 38.8px |
| AR-04-floor-tile-void | CAM04-E15 | 床タイル一枚の欠落 | surreal / surreal | `(250,565,100,62)` | AR-04-hatch-reflection-extra 32.0px |
| AR-04-wall-panel-fallen | CAM04-E14 | 腰壁の板が外れて倒れかかる | object / displace | `(500,520,60,85)` | AR-04-puddle 34.0px |
| AR-04-left-edge-eyes | CAM04-E18 | 左端の暗がりに光る目 | surreal / add_creature | `(0,630,55,68)` | AR-04-randoseru-red 30.0px |
| AR-04-floor-shoes-rows（大面積） | CAM04-E15 | 床の通路帯に整然と並ぶ無人の靴 | object / multiply | `(200,380,260,520)` = 135,200 px²（画像の約 1/4.5） | 大面積どうしの距離 2px（window-alley / glass-fog。重ならない） |

### AR-04-glass-silhouette — 奥左のガラス越しの人影

- **カメラ / 対象**: CAM04 / CAM04-E10（物の説明・座標はインベントリが正本）
- **物と変化**: 奥正面の扉の左隣にある淡い緑灰色のガラス面（E10 の左パネル）の向こうに、こちらへ背を向けて立つ大人の黒い影が一人現れる（顔・服の柄なし。ガラス越しなので輪郭はやや柔らかい）。影が足を乗せる床は写真のまま。人は影のみ。顔・肌・服の柄は描かない。扉や取手には触れない。
- **box (x,y,w,h)**: `(264,296,34,92)`（右下 `(298,388)`）。
- **最寄り既存 overlay と実測距離**: AR-04-door-gap 32.0px、次点 AR-04-handle 47.0px（box 基準・2026-11-05 実測）。
- **6倍クロップ**: `(153,256)–(409,427)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 666〜870 / y 240〜792（縦長の淡いパネルの中））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Inside the pale grey-green glass panel just left of the double door at the far end of the corridor (about x 666-870, y 240-792 of this frame), add one adult person seen from behind as a soft dark silhouette standing still and facing away from the camera, head and shoulders and long coat shape only, as if behind frosted glass. No face, no skin, no clothing pattern, no hands visible. The silhouette is dark navy-black with slightly blurred edges and fills the panel height about 90 percent. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Behind the pale glass panel to the left of the far double door (x 666-870, y 240-792 of this frame), add a single standing human silhouette, back turned, arms hanging, wearing a plain dark hat and long overcoat, rendered as a flat dark shape with softly blurred outline as seen through frosted glass. No facial features, no pattern. It stands still, centred in the panel. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). In the glass panel left of the far door (x 666-870, y 240-792 of this frame), add a tall thin dark human shape standing very still with its back to us, shoulders slightly rounded, outline softened by the glass; slightly stronger contrast than the surroundings so it reads clearly even in the dim light. No face, no details, no light of its own. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-glass-silhouette` / `element_id: CAM04-E10` / `category: person` / `anomaly_type: add_person` / `location: 奥の両開き扉の左隣のガラスパネル` / `detail: 奥の扉の左隣のガラス越しに、こちらに背を向けて立つ黒い人影が一人現れる(影のみ・顔なし)` / `phase: late` / `subtlety: medium` / `note: 最近傍の既存 AR-04-door-gap 32px。CR-04-11（左ガラス店先の「反射」に映る人影・pool 内）とは、映る物が反射か実体の向こうか・位置（左手前の店先と奥の扉脇）が違う。CR-01-06（CAM01 の小さすぎる人影）とは別カメラ。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: CR-04-11 は左の店先ガラスの反射内で、人影が「映っているだけ」。本案は奥の扉脇のガラスの向こうに立つ。差は位置・見え方（反射か透過か）で別異変として残す（ただし同プレイで両方は出さない運用が望ましい。台帳 note に併記）。AR-04-door-gap / AR-04-handle と距離 30px 以上で、扉本体には触れない。

### AR-04-shadow-behind-camera — カメラの背後の人の影

- **カメラ / 対象**: CAM04 / CAM04-E15（物の説明・座標はインベントリが正本）
- **物と変化**: 手前の床の下端に、カメラの真後ろに誰かが立っているかのような、頭と肩の長い影だけが画面の下から伸びて落ちる（人は写らない。影のみ）。影だけ。人体・顔・手足は描かない。床タイルの目地と反射は保つ。
- **box (x,y,w,h)**: `(170,818,100,82)`（右下 `(270,900)`）。
- **最寄り既存 overlay と実測距離**: AR-04-hatch-frame-round 30.0px、次点 AR-04-earbud-single 31.0px（box 基準・2026-11-05 実測）。
- **6倍クロップ**: `(92,729)–(348,900)`（256x171 を 1536x1024 へ拡大。影は crop 内 x 468〜1068 / y 534〜1024（画面下端から立ち上がる））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the floor at the very bottom of this frame (x 468-1068, y 534-1024), add a dark soft shadow of a person's head and shoulders, as if someone is standing right behind the camera and the shadow falls forward onto the floor tiles, running off the bottom edge of the frame. Only the shadow is visible; no person, no face, no limbs. The shadow is elongated along the floor perspective, soft-edged, about 60 percent darker than the tiles, and follows the tile joints naturally. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). At the bottom of the frame on the grey floor tiles (x 468-1068, y 534-1024), add the long soft shadow of a standing person cast forward from behind the camera: a rounded head shape on a broad shoulder shape, widening toward the bottom edge. Shadow only, no body, no face. Dark blue-black, soft penumbra, tile joints still visible through it. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Cast onto the floor at the lower middle of this frame (x 468-1068, y 534-1024) the shadow of a person with slightly bowed head standing just behind the viewpoint, extending upward from the bottom edge of the frame. Only a flat dark head-and-shoulders shadow; absolutely no person, no face, no details. Keep the white floor reflection to its right unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-shadow-behind-camera` / `element_id: CAM04-E15` / `category: person` / `anomaly_type: add_person` / `location: 手前左の床の下端` / `detail: 手前の床の下端に、カメラの背後に立つ人の頭と肩の影だけが落ちる(人は写らない)` / `phase: late` / `subtlety: medium` / `note: 最近傍の既存 AR-04-hatch-frame-round 30px / AR-04-earbud-single 31px。影のみで人は描かない。AR-04-floor-shoes-rows（大面積）の床と box が重なるため同プレイで共存させない。要つまみ調整ではなく標準でも見える暗さに作る。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: 既存の床の人影系（CAM02 床の足跡・CAM06 濡れた足跡）は「通った跡」で、本案は「今そこにいる者の影」。CR-04-11 とは見え方が違う（反射か床の影か）。stock 表の「shadow appears」の CAM04 具体化。

### AR-04-cat-back-sitting — 床の白い反射の中に座る猫

- **カメラ / 対象**: CAM04 / CAM04-E17（物の説明・座標はインベントリが正本）
- **物と変化**: 手前右の床の白い反射だまりの上に、こちらへ背を向けて座る黒い猫が一匹いる。昭和の地下街に迷い込んだように静かで、少し長く居座っている。猫は一匹のみ。目はこちらを向かない（後ろ姿）。首輪・鈴・文字なし。
- **box (x,y,w,h)**: `(392,820,66,72)`（右下 `(458,892)`）。
- **最寄り既存 overlay と実測距離**: AR-04-hatch-frame-round 32.0px、次点 AR-04-puddle 33.0px（box 基準・2026-11-05 実測）。
- **6倍クロップ**: `(297,729)–(553,900)`（256x171 を 1536x1024 へ拡大。猫は crop 内 x 570〜966 / y 546〜978（白い反射の真上））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the bright white light reflection on the floor tiles at the lower right (x 570-966, y 546-978), add one small black cat sitting upright seen from behind, tail wrapped round its feet, ears pointing up, quietly facing away from the camera toward the far end of the corridor. The cat is solid dark black-brown, clearly silhouetted against the white reflection, with a soft contact shadow. No collar, no bell, no markings, no eyes visible. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Add a single dark grey tabby cat sitting with its back to the camera on the white glare on the floor (x 570-966, y 546-978), head slightly turned to its left showing one ear and a bit of whisker, tail curled. Natural proportions, small relative to the tiles, contact shadow under it. No collar, no text. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Add one black cat sitting very still on the pale reflection of the floor (x 570-966, y 546-978), seen from behind and slightly from the side, hunched like a loaf, tail along the floor. Strong dark silhouette with a thin cool rim light matching the ceiling lamps. No collar, no markings. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-cat-back-sitting` / `element_id: CAM04-E17` / `category: object` / `anomaly_type: add_creature` / `location: 手前右の床の白い反射だまり` / `detail: 手前右の床の白い反射の上に、こちらに背を向けて座る黒い猫が一匹現れる` / `phase: mid` / `subtlety: medium` / `note: CR-04-23（扉の前に猫・pool）の昇格。扉前は AR-04-door-gap / AR-04-handle / AR-04-paper-cup と 30px を確保できないため、床手前の反射だまりへ移した（CR-04-23 は本案で置き換え、pool から削除）。最近傍 AR-04-hatch-frame-round 32px。猫の反復モチーフ（AR-02-cat / AR-08-cat / AR-07-stairs-cat）とは別画角・別姿勢。AR-04-floor-shoes-rows と同プレイで共存させない。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: CR-04-23 を昇格（置換）。AR-02-cat（シャッター際の座る猫）・AR-08-cat・AR-07-stairs-cat とは別カメラの反復モチーフで、後ろ姿・白い反射の上という見え方が違う。AR-04-ceiling-balloon 等の他の動物系は CAM04 にない。

### AR-04-wall-plaster-peel — 漆喰壁の剥落

- **カメラ / 対象**: CAM04 / CAM04-E14（物の説明・座標はインベントリが正本）
- **物と変化**: 右の漆喰壁（右端の黒い柱の右側）の一角が、手のひら大〜座布団大に剥がれ落ち、下から古い赤茶色のレンガ下地が四角く覗く。剥がれた漆喰の屑が壁際にわずかに落ちている。剥落面は不揃いな縁。レンガに文字・刻印なし。壁の他の部分と黒い柱は触らない。
- **box (x,y,w,h)**: `(625,120,51,100)`（右下 `(676,220)`）。
- **最寄り既存 overlay と実測距離**: AR-04-red-lantern 38.8px、次点 AR-04-ceiling-balloon 79.1px（box 基準・2026-11-05 実測）。
- **6倍クロップ**: `(420,84)–(676,255)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 1230〜1536 / y 216〜816（画面右端に接する））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the rough pale plaster wall at the right edge of the frame, to the right of the vertical black pillar (x 1230-1536, y 216-816), show one irregular patch of plaster fallen off, exposing an old reddish-brown brick underlayer in a rough rectangle with jagged cracked edges. A few plaster crumbs lie at the bottom of the patch. The brick shows plain mortar lines and no marks or letters. The rest of the wall and the black pillar are unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the textured plaster wall at the right side of the frame (x 1230-1536, y 216-816), the plaster has peeled away in a ragged oval about the size of a cushion, revealing dark grey concrete and a few old orange bricks beneath, with curled plaster flakes hanging at the edge. No marks, no writing. Do not alter anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). In the right-hand plaster wall (x 1230-1536, y 216-816) a rectangular chunk has broken away, revealing coarse old brick work in muted red-brown with grey mortar, edges chipped and uneven, fine white dust at the lower edge. No letters or stamps on the bricks. Everything else identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-wall-plaster-peel` / `element_id: CAM04-E14` / `category: environment` / `anomaly_type: state_change` / `location: 右端の漆喰壁の上部` / `detail: 右の漆喰壁の一角が剥がれ落ち、下から古いレンガ下地が四角く覗く` / `phase: early` / `subtlety: medium` / `note: 最近傍 AR-04-red-lantern 38.8px。右壁一面の大面積 AR-04-window-alley と box が重なる（大面積の例外。同プレイで共存させない＝壁面を覆うため排他）。AR-04-tote-bag（右端壁フック）とは 250px 以上離れる。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: AR-08-notice-residue（CAM08 の貼り紙の剥がし跡）は紙の跡で別カメラ・別物。本案は壁材そのものの剥落で下地が見える。AR-04-window-alley（右壁一面が窓）とは同じ壁面のため排他。

### AR-04-floor-tile-void — 床タイル一枚の欠落

- **カメラ / 対象**: CAM04 / CAM04-E15（物の説明・座標はインベントリが正本）
- **物と変化**: 床中央の白い反射がかかるタイル一枚分が、そこだけ消えて黒い長方形の穴になる。穴の中は底の見えない完全な暗闇で、周囲のタイルと目地はそのまま、縁にわずかな厚み（断面）が見える。穴の中に物・光・顔を描かない。タイルの目地線は穴の縁で止める。
- **box (x,y,w,h)**: `(250,565,100,62)`（右下 `(350,627)`）。
- **最寄り既存 overlay と実測距離**: AR-04-hatch-reflection-extra 32.0px、次点 AR-04-orange-tile 32.4px（box 基準・2026-11-05 実測）。
- **6倍クロップ**: `(172,510)–(428,681)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 468〜1068 / y 330〜702）。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the floor in the middle of this frame, replace exactly one grey floor tile (the one under the white glare, x 468-1068, y 330-702) with a rectangular black hole of the same outline in perspective. The inside is pure bottomless darkness with no floor, no light, no objects. The slab edges around it show a thin lighter cross-section edge. Neighbouring tiles and joints stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). One floor tile near the centre (x 468-1068, y 330-702) is missing: show a clean rectangular opening the size of one tile, filled with deep black with a very faint cold-blue gradient far below, tiny chipped edges on the surrounding stone. Joints of neighbouring tiles run straight up to its edge. No objects inside. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). At the white glare patch on the floor (x 468-1068, y 330-702) cut out one tile-shaped hole into complete darkness; slight thickness of the tile visible on the near edge, soft glow of the floor reflection stops at the rim. Nothing visible in the dark. Do not change any other tile. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-floor-tile-void` / `element_id: CAM04-E15` / `category: surreal` / `anomaly_type: surreal` / `location: 床中央の白い反射がかかるタイル` / `detail: 床中央のタイル一枚が消え、底の見えない黒い穴になる` / `phase: mid` / `subtlety: medium` / `note: 最近傍 AR-04-hatch-reflection-extra 32.0px / AR-04-orange-tile 32.4px。床の大面積 AR-04-floor-shoes-rows と box が重なるため同プレイで共存させない。AR-04-hatch-frame-round とは 33px。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: CR-04-14（床タイルに花模様）は模様の追加で、本案は穴（欠落）。AR-04-orange-tile は色変化で別。AR-04-leaf-hole の「小さな丸い穴」とは対象（床/葉）と大きさが違う。

### AR-04-wall-panel-fallen — 腰壁の板が外れて倒れかかる

- **カメラ / 対象**: CAM04 / CAM04-E14（物の説明・座標はインベントリが正本）
- **物と変化**: 右の黒いガラス窓の下にあるクリーム色の腰壁の一枚が、上辺だけ外れて床へ斜めに倒れかかり、壁の下地の暗い隙間が覗く。板に文字・マークなし。壁の他の板と窓枠は触らない。
- **box (x,y,w,h)**: `(500,520,60,85)`（右下 `(560,605)`）。
- **最寄り既存 overlay と実測距離**: AR-04-puddle 34.0px、次点 AR-04-tote-bag 40.0px（box 基準・2026-11-05 実測）。
- **6倍クロップ**: `(402,477)–(658,648)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 588〜948 / y 258〜768（クリーム色の腰壁部分））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the lower cream-coloured wall panel beneath the dark glass window on the right (x 588-948, y 258-768), show one wall panel pulled away at its top edge and leaning diagonally outward onto the floor, exposing a dark gap behind it. The panel keeps the same cream colour and surface as its neighbours and casts a small contact shadow on the floor. No marks, no letters. Windows, frames and other panels unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). The cream wall skirting panel under the right-hand window (x 588-948, y 258-768) has come loose: its upper edge tilts away from the wall toward the camera, bottom edge still on the floor, a black gap and a few dust motes visible behind. Same colour and texture as neighbours. Nothing else changed. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). One cream wall-base panel under the dark window on the right (x 588-948, y 258-768) is displaced, tipping away from the wall about 30 degrees, wedged against the floor; a thin dark opening behind it. Matching material, small contact shadow. No text. Rest of the wall identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-wall-panel-fallen` / `element_id: CAM04-E14` / `category: object` / `anomaly_type: displace` / `location: 右の窓下のクリーム色の腰壁` / `detail: 右の窓の下のクリーム色の腰壁の板が一枚、上辺が外れて床へ斜めに倒れかかる` / `phase: early` / `subtlety: medium` / `note: 最近傍 AR-04-puddle 34px / AR-04-tote-bag 40px。右壁の大面積 AR-04-window-alley と box が重なる（大面積の例外・排他）。腰壁の位置は6倍クロップで確認して box を微調整（要原寸確認）。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: 既存に壁パネル・幅木の異変はない（grep で「巾木・腰壁・幅木」ゼロ）。AR-04-wall-plaster-peel は漆喰の剥落で、本案は板の位置のズレ。同じ右壁でも面が違う（上部と腰壁）が、AR-04-window-alley とは排他。

### AR-04-left-edge-eyes — 左端の暗がりに光る目

- **カメラ / 対象**: CAM04 / CAM04-E18（物の説明・座標はインベントリが正本）
- **物と変化**: 左端の床際の黒い縦枠の影の中に、床すれすれの高さで、小さな二つの目が淡い白黄色に光って見える（正体は写らず、輪郭は闇に溶けている）。目の周りの体・顔は描かない。目だけ。瞳孔のみの無表情な光点。
- **box (x,y,w,h)**: `(0,630,55,68)`（右下 `(55,698)`）。
- **最寄り既存 overlay と実測距離**: AR-04-randoseru-red 30.0px、次点 AR-04-orange-tile 32.0px（box 基準・2026-11-05 実測）。
- **6倍クロップ**: `(0,578)–(256,749)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 0〜330 / y 312〜720（画面左端、暗い床際））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). In the darkest shadow at the left edge of the frame near the floor, under the black vertical storefront frame (x 0-330, y 312-720), add exactly two small round eyes glowing pale yellow-white, side by side, close to the floor level, with a faint soft halo. Nothing else of the creature is visible: no head, no body, no outline, only the two glowing points swallowed by darkness. The eyes are about 20 px wide in this enlarged frame with a 60 px halo. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). In the black shadow at the far left edge near the floor (x 0-330, y 312-720), add two pale white-yellow glowing eyes, slightly oval, horizontally paired with a gap between them, giving a faint glow on the nearby floor tile. Only the eyes; no creature, no face, no shape. Do not change the frame or the floor. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Add two dim cold white eyes glowing from the dark gap at the base of the left storefront frame (x 0-330, y 312-720), low to the ground, round and unblinking, with a very faint bloom. The rest of the shadow stays pure black with no creature shape. No text, no logo. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-left-edge-eyes` / `element_id: CAM04-E18` / `category: surreal` / `anomaly_type: add_creature` / `location: 左端の床際の黒い縦枠の影` / `detail: 左端の暗がりの床際に、正体の見えない小さな二つの目だけが光る` / `phase: mid` / `subtlety: subtle` / `note: 最近傍 AR-04-randoseru-red 30px / AR-04-orange-tile 32px。左ガラスの大面積 AR-04-glass-fog-handprints と box が重なる（大面積の例外）。目は面積が小さいのでプロンプトで光点とにじみを約2.5倍に誇張し、check-visibility.py を必ず通す（下回れば halo を広げる）。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: AR-04-cat-back-sitting は「猫が見える」案で、本案は正体が写らない目だけ（別の発見のしかた）。CR-04-23 は猫の昇格で本案とは見え方が違う。左下端の既存 AR-04-randoseru-red・AR-04-orange-tile とは30px以上離れる。

### AR-04-floor-shoes-rows — 床の通路帯に整然と並ぶ無人の靴（大面積）

- **カメラ / 対象**: CAM04 / CAM04-E15（灰白色の床タイル。物の説明・座標はインベントリが正本）
- **物と変化**: 手前〜中景の床の中央帯（x 200〜460）一面に、持ち主のいない靴が左右対で整然と並び、全てのつま先が奥の扉に向く。革靴・草履・下駄・子供の運動靴・白い室内履きが混じる（全て無地・無刻印）。行ごとに遠近で小さくなり、床タイルは靴の間に見える。不気味さの狙いは、持ち主だけが消えた「昭和の玄関」の気配。靴が履かれた形跡はなく、全員が同じ方向（奥の扉）へ向かって脱いだように見える（`docs/story.md` の行方不明・「帰らない」の記憶と整合。説明はしない）。
- **box (x,y,w,h)**: `(200,380,260,520)` = 135,200 px²（画像 676x900 = 608,400px² の約 22%。1/8 = 約 76,000px² を超える）。床の中央帯を左右 x=200 / x=460 で打ち切るのは、同カメラの大面積 AR-04-glass-fog-handprints（x13〜198）・AR-04-window-alley（x462〜676）と**重ねない**ため（距離 2px・2px を実測）。alpha bbox が 1/8 を割ったら登録しない（靴の列を奥側 y≈430 まで伸ばして作り直す）。
- **面のポリゴン（cutout 用）**: 床の台形を x=200〜460 で切る。遠端 `(272,382)(400,382)`、右は右の腰壁際の床縁に沿って `(460,455)`、下端 `(460,900)(200,900)`、左は左の店先の床縁に沿って `(200,480)`。接地線・巾木・枠・点検口の縁を止める線にする（点検口の上にも靴を置いてよい）。
- **最寄り既存 overlay と実測距離**: 大面積どうし = AR-04-window-alley 2px / AR-04-glass-fog-handprints 2px（重ならない）。小物は大面積の例外で重なってよいが、**床を覆い隠す小物は排他**（同プレイで共存させない）: AR-04-puddle / AR-04-tin-robot / AR-04-newspaper / AR-04-earbud-single / AR-04-hatch-frame-round / AR-04-hatch-reflection-extra / AR-04-paper-cup / AR-04-orange-tile、および本節の AR-04-floor-tile-void / AR-04-cat-back-sitting / AR-04-shadow-behind-camera。AR-04-door-gap（box 重なり 5px）・AR-04-pot-duplicate（y 450 まで）は面が違うので共存可。台帳 note に「同プレイで共存させない」と書く。
- **3:2 の窓**: cam4 は 676x900。全幅 676 × 高さ 450 の窓 2 枚。`composite-polygon.py crop --base public/images/cam4.webp --crop 0,370,676,820 --out <PNG>`（窓 A: y370〜820。box 上端 380 に 10px の余裕）→ 生成 → `restore --base public/images/cam4.webp --gen <A> --crop 0,370,676,820 --out <全画面>`。続いて `crop --crop 0,450,676,900`（窓 B。重なり 370px）→ 生成（B の入力は A を貼り戻した全画面から切る。依存する絵は直列）→ `restore --base <A 貼り戻し済み> --gen <B> --crop 0,450,676,900 --blend-px 100 --blend-edges t --out <全画面>`。縮尺は 1536/676 = 約 2.27 倍で、プロンプトの x 454〜1045 は box x 200〜460 に当たる。最後に `cutout --base public/images/cam4.webp --gen <全画面> --polygon <上の面のポリゴン> --feather 2 --out assets/anomaly-overlays/cam04/floor-shoes-rows.webp`。
- **生成プロンプト（3 テイク。窓 A・B とも同じプロンプトを使う）**: 窓 B では「すでに靴が並んでいる上半分と同じ列・同じ種類で、下へ自然に続ける」を 1 文足す。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, wide 3:2 window of the floor). Keep the corridor walls, glass storefronts, ceiling, lights, floor tile joints and the square floor hatch exactly unchanged. Add the shoes only on the floor inside the central lane between x 454 and x 1045 of this 1536-wide frame (a lane about 38 percent of the width), following the tile perspective so each row gets smaller toward the far glass door. Fill the lane with dense neat rows of empty unattended shoes, left and right of each pair aligned side by side, every toe pointing toward the far door at the end of the corridor: plain brown leather shoes, straw zori sandals, wooden geta, small children's canvas sneakers and plain white indoor slippers mixed together. About 4 cm of floor tile is visible between pairs. All shoes completely plain with no logos, no marks, no letters, no soles patterns. Each pair casts a small dark contact shadow and picks up the cool reflection of the ceiling lamps. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, wide 3:2 window of the floor). Keep the corridor walls, glass storefronts, ceiling, lights, floor tile joints and the square floor hatch exactly unchanged. Add the shoes only on the floor inside the central lane between x 454 and x 1045 of this 1536-wide frame (a lane about 38 percent of the width), following the tile perspective so each row gets smaller toward the far glass door. Arrange the shoes in two long straight columns of paired shoes running down the lane along the tile joints, with a one-tile-wide gap between the columns, toes all pointing toward the far door. Mix old leather shoes, straw zori, wooden geta and small children's sneakers; very neat and orderly, as if lined up at a school entrance. Everything plain: no logos, no markings, no text. Soft contact shadows and light reflections on the glossy tiles. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, wide 3:2 window of the floor). Keep the corridor walls, glass storefronts, ceiling, lights, floor tile joints and the square floor hatch exactly unchanged. Add the shoes only on the floor inside the central lane between x 454 and x 1045 of this 1536-wide frame (a lane about 38 percent of the width), following the tile perspective so each row gets smaller toward the far glass door. Cover the lane with several dozen empty pairs of shoes in staggered rows (like a shoe shelf laid on the floor), every pair facing the far door, sizes ranging from tiny children's shoes to large men's leather shoes and flat straw sandals; the nearest rows large and sharp, the farthest rows small and dim. Completely plain and unmarked, no text, no logos. Subtle contact shadows, no motion blur. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-floor-shoes-rows` / `element_id: CAM04-E15` / `category: object` / `anomaly_type: multiply` / `location: 床の中央帯 (x200〜460, y380〜900)` / `detail: 手前〜中景の床の中央帯一面に、持ち主のいない靴が左右対で整然と並び、全てのつま先が奥の扉に向く(革靴・草履・下駄・子供の運動靴・白い室内履き。無地)` / `phase: late` / `subtlety: obvious` / `note: 大面積。同カメラの大面積 AR-04-window-alley・AR-04-glass-fog-handprints と重ならない（距離 2px・2px）。排他（同プレイで共存させない）: 床を覆う小物 AR-04-puddle ほか（上記）と、AR-04-floor-tile-void / AR-04-cat-back-sitting / AR-04-shadow-behind-camera。登録時に box 重なり表を機械出力して貼る。`
- **相互参照・重複精査**: AR-02-floor-footprints（CAM02 床一面の足跡）は「靴の跡」で、本案は「靴そのもの」が整列する（物の数の異常と、居ないのに履き物だけある不在の表現）。AR-05-floor-white-cranes（CAM05 の床一面の折り鶴）・AR-03-floor-tatami は別カメラ・別物。AR-04-randoseru-red（床の赤いランドセル、box x0〜136 で本案の帯の外）とは同じ「持ち主不在の持ち物」の系統だが、別物で距離もあるため共存可。AR-06-wet-footprints（濡れた裸足の足跡）とも別。candidate-pool に靴の整列案はなし（CR-05-41 は小さな靴の跡）。


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
