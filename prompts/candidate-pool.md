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

## 制作仕様（未制作）— CAM 01

CAM01 の新規の画像異変 8 件（小物 6・大面積 2）の**制作仕様**（#47。台帳 240 件→目標約 300 件の偏り是正）。台帳は `object` / `add_object` に偏る（add_object 105・object 137）ため、今回は **add_object と color_shift を 0 件**にし、surreal / multiply / state_change / displace / add_person / add_creature で組んだ。画像はまだ生成していない。採用して制作に進む時は、この節の該当項を**削除**して `anomalies.yaml` へ一度だけ登録する（二重に残さない）。手順・座標・合成の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）と [`README.md`](./README.md) の「配置の基準」。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。画像は 675x900。

| ID | 種別 | category / anomaly_type | 面・位置 | 概要 |
| --- | --- | --- | --- | --- |
| AR-01-floor-crosswalk | 大面積 | surreal / surreal | 手前の床一面 (0,705,675,900) | 床一面に横断歩道の白線が敷かれる |
| AR-01-right-wall-lattice-doors | 大面積 | surreal / multiply | 右の店先の壁一面 (422,225,675,668) | 同じ木格子戸が、奥へ向かって1枚ずつ大きくなりながら連なる |
| AR-01-ceiling-lamp-off | 小物 | environment / state_change | 左天井 (60,168,128,222) | 左の丸い埋め込み灯が消えて黒い円になる |
| AR-01-ceiling-tile-drop | 小物 | object / displace | 右上天井 (405,122,479,198) | 天井板が一枚、片側だけ外れて垂れ下がる |
| AR-01-ceiling-wet-stain | 小物 | environment / state_change | 中央天井 (290,212,370,248) | 天井に濡れた丸い染みが広がり水滴が垂れかける |
| AR-01-floor-light-orphan | 小物 | surreal / state_change | 手前左の床 (2,832,92,898) | 光源のない場所に、床の光だまりがもう一つ落ちる |
| AR-01-crouching-silhouette | 小物 | person / add_person | 奥の床 (385,484,440,538) | 奥の床にうずくまる黒い人影が一つ |
| AR-01-threshold-pigeon | 小物 | object / add_creature | 右の敷居 (575,598,675,655) | 右の店先の敷居に白い鳩が一羽とまる |

- **方針の充足**: (a) add_object / color_shift は 0 件。8 件は surreal・multiply・state_change×3・displace・add_person・add_creature のすべて指定の型（reflection は使わない）。(b) 大面積は床一面と右壁一面の 2 件。(d) 人・生き物は遠景のシルエット・小さな鳥だけで、顔・肌・指・服は描かない。(e) 文字・数字・ロゴ・実在名は出さない。
- **台帳の現況**（2026-11-05、`prompts/anomalies.yaml`）: CAM01 は 31 件で、うち大面積は `AR-01-wall-faces`（origin (0,216)・202x484 = 左壁）と `AR-01-ceiling-lanterns`（origin (217,0)・458x380 = 天井）の 2 件。残る広い面は**床**と**右の店先の壁**で、本節の大面積 2 件がそれ。
- **配置の実測**: 小物 6 件の box は、台帳の CAM01 の**小物 29 件**（大面積 2 件を除く）の alpha bbox と、本節の他の小物の box から、**矩形間距離 30px 以上**を `uv run --with pyyaml --with numpy --with pillow python3` で実測した（各項に最寄りと距離。台帳の各 overlay は `overlay_origin` + overlay の alpha>0 の bbox で測った。2026-11-05）。余裕が 36px 未満の項は、制作後の最終 alpha bbox で測り直す（羽毛ぼかしで広がる）。特に天井の小物 3 件（lamp-off・tile-drop・wet-stain）は、どれも既存の天井の物と 32.0px しか空いていない（互いは 37.7px 以上）ので、制作後の再測定を必須とする。30.0px ちょうどになったら数 px 動かす。大面積は小物と重なってよい（README の例外）。大面積 2 件どうし、および既存の大面積 2 件とは box が重ならない: 床 y705〜900／右壁 y225〜668／左壁 x0〜202（y216〜700）／天井 y0〜380。右壁（x422〜675, y225〜380）と天井の bbox は重なるが別の面で、下の「排他」に書いて同プレイで共存させない。
- **共通手順**（小物。スキル手順 5〜8）: ①各項の「6倍クロップ」を `public/images/cam1.webp` から切り出して 1536x1024 へ拡大（webp は PNG に変換）。②先頭に `$imagegen` を明示し、各項のプロンプトを 3 テイク生成して目視で選ぶ（0 バイト・数 KB の壊れた PNG は撮り直す。文字やロゴらしき刻印が出たら没）。テイク 1〜3 は、各項のプロンプトの `VARIANT` 行だけを差し替える（プロンプト全文は VARIANT を入れた形で使う）。③選んだ結果を元のクロップ寸法へ縮小して baseline の PNG の同じ位置へ貼り戻し、その全画面を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。④最終 overlay の alpha bbox で既存との距離を測り直し、`check-visibility.py` を通す。⑤登録・コミットしたら `experiments/` の作業物を即削除。
- **共通プロンプト冒頭（小物）**: `$imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged.` 末尾は `Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not add anything else. Output the same 3:2 1536x1024 image.`（以下の各プロンプトには、冒頭と末尾を含めて全文を書いてある）。

### 大面積

#### AR-01-floor-crosswalk — 床一面の横断歩道

- **camera / element_id**: CAM01 / CAM01-E17（床タイル。E18 の反射帯も面に含まれる）
- **面**: box `0,705,675,900`（131,625 px²、画像の 21.7%）。手前の床の全幅の帯。地下街の廊下の床が、屋外の道路の横断歩道に変わる。
- **物と変化**: 手前の床に、白い塗装の太い縞（横断歩道）が 9〜10 本、**廊下の奥行き方向に走って消失点へ収束**するように並ぶ。縞は左右の壁際まで全幅に続き、各縞の間には元の床タイルと目地が見える。塗装はかすれ、タイルの粒と目地が縞を透かす。屋外の舗装の模様が屋内にあるだけで、他の物・人・文字はない。
- **不気味さの狙い**: 屋内の床なのに道路の印だけが敷かれ、「渡る」先が見えない。同じ縞が床一面に繰り返される、反復空間の違和感。story の「懐かしい昭和のまま帰りたくない老人」と、4 人目の子供が渡れなかった道（令和の通学路）の両方に読める（意味づけは台詞側で決める）。
- **保持するもの**: 壁・天井・店先・床の奥側（y705 より上）、床の白い反射帯の位置と明るさ（縞の上にも反射が乗る）、タイル目地、床上の既存の異変（排他にした物を除く）。
- **3:2 の窓**: 1 枚、`composite-polygon.py crop --base public/images/cam1.webp --crop 0,450,675,900 --out <PNG>`（縮尺 1536/675 ≈ 2.2756。box は窓内の y 580〜1024）。復元は `restore --crop 0,450,675,900`。差分抽出は床の台形ポリゴン（左は壁際の巾木の線、右は敷居の手前、上は y705 の水平線）を `cutout` に渡す。
- **生成プロンプト全文**（3 テイクとも `VARIANT` 行だけ差し替え）:

  ```text
  $imagegen Edit the attached surveillance camera photo of an underground shopping arcade corridor (cropped to a 3:2 window; the lower part of the frame is the glossy tiled floor).
  Make ONLY this change: on the floor of the lower part of the frame, from about 57% of the frame height down to the bottom edge and across the full width wall to wall, paint a pedestrian zebra crossing: nine or ten wide plain white road-paint bars that run along the direction of the corridor and converge toward the vanishing point (bars are long strips parallel to the side walls, with equal gaps between them), as on an outdoor road crossing. The paint is slightly worn and matte, the grain and joint lines of the tiles show faintly through it, and the existing long white light reflections on the floor still lie on top of the bars. VARIANT.
  Keep the walls, the ceiling, the shopfronts, the far end of the corridor, the upper part of the floor and every fixture exactly unchanged. Paint no arrows, no other markings, no text and no objects.
  Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```

  - VARIANT 1: `The bars are bright and crisp white, about the width of one floor tile each`
  - VARIANT 2: `The bars are slightly yellowish-white and heavily worn, with chipped edges`
  - VARIANT 3: `The bars are narrower, ten of them, with the tile joints clearly visible through the paint`
- **作り方**: ①割付図: 消失点（奥の開口付近、おおよそ (355,480)）へ向かう流線に沿って、縞の左右の縁を `uv run --with pillow python3` で描いて確定（向きは文章でなく図）。②窓 1 枚を 3 テイク。③ポリゴン内の差分だけを `cutout`（閾値を使わない）。縞が y705 より上へ漏れたら没。④床の反射帯が縞の上に残っていることを原寸で確認（`blend --mode screen --layer <baseline>` で反射を戻す）。
- **難所と没基準**: 縞が床の奥行き方向でなく手前—奥の逆（横向き）になったら没。縞が 6 本未満・太さが不揃いなら没。矢印・文字・車線の白線などが出たら没。縞が壁・巾木に乗ったら没。
- **フェーズ / 目立ち度**: late / obvious。
- **台帳登録案**: id `AR-01-floor-crosswalk` / `element_id: CAM01-E17` / `category: surreal` / `anomaly_type: surreal` / `location`: 手前の床一面 / `detail`: 「手前の床一面に、屋外の道路のような白い横断歩道の縞が奥の消失点へ向かって並ぶ（文字・矢印なし）」 / phase late / obvious。note に「大面積。CAM01-E17」「box と既存 overlay の重なり表（機械出力）」「排他: 下記」を書く。
- **排他**: 床の手前の帯（y705〜900）に載る小物は縞に覆われる。**`AR-01-floor-puddle-light`・`AR-01-lattice-tile`・`AR-01-power-bank`・`AR-01-red-rubber-ball`・`AR-01-straw-hat`・`AR-01-bamboo-basket`・`AR-01-bubble-tea-cup`・`AR-01-floor-sign-reflection-inverted`・`AR-01-milk-bottle-crate`・`AR-01-container-origami`・本節の `AR-01-floor-light-orphan`** は同プレイで共存させない（台帳 note に「同プレイで共存させない」と書く。ゲームは 1 カメラ 1 件しか同時に出さないので運用上の保証）。
- **相互参照 / 重複精査**: 同カメラの大面積（左壁の顔写真・天井の提灯）とは別の面。他カメラの床の大面積（`AR-02-floor-footprints` 足跡、CAM03 の畳、CAM05 の折り鶴、CAM08 の水鏡）とは**型が別**（道路標示）。台帳の「横断歩道」は他になし（`candidate-pool.md` の 3 節にも該当なし）。

#### AR-01-right-wall-lattice-doors — 右の店先に同じ木格子戸が、奥へ向かって1枚ずつ大きくなりながら連なる

- **camera / element_id**: CAM01 / CAM01-E12（右側の店先。起点の木格子戸）
- **面**: quad `(422,345) (675,225) (675,668) (422,500)`（左上・右上・右下・左下。原寸の写真で壁の天井線・床線に合わせて確定）。polygon 実面積 **75,647 px²**（画像の 12.5%）、alpha bbox（box `422,225,675,668`）は 253x443 = **112,079 px²**（18.4%）。大面積の判定は台帳の既存大面積（`AR-01-wall-faces` の alpha bbox 97,768 px²）と同じく alpha bbox で行い、約 90,000 px² 以上を満たす（polygon 実面積は壁の遠近で細く、90,000 を下回る）。右壁の店先の面（金属シャッター・ガラス窓・白い太枠・木格子戸が重なる面）。壁と床の接線（腰板の下端）で止め、敷居は面の外。ただし鳩の box（575,598,675,655）が面の下端に掛かるので、下の排他に入れる。
- **物と変化**: 右の店先の壁全面が、**同じ形の木格子戸**（白い太枠の中に縦の木格子、下に濃い青灰の腰板）の連続に置き換わる。戸は 6 枚が壁に沿って並び、**奥の戸ほど画面上の幅が手前の戸と同じに近く（遠近で細くならず）、1 枚ずつ相対的に大きく見える**。どれも閉じて無人。元の窓・シャッター・暖簾の位置は戸に覆われる。吊り看板（E16）と蛍光灯（E07）は壁の手前にあるので面の外（`--hole`）。
- **不気味さの狙い**: 入口が全部同じで、どれが店なのかわからない。奥へ行くほど戸が遠ざからず、通路が終わらない違和感。昭和の店先が増殖する、優しい異変（story: 老人の記憶が作る像）の暗い側面。
- **保持するもの**: 天井・床・左壁・奥の柱・通路奥の開口、吊り看板（E16 の大小）、蛍光灯（E07）、壁と天井・床の接線。戸の隙間の細い縦枠だけが壁に残る。
- **素材の別生成（全景生成はしない）**: 参照に元写真の木格子戸（`public/images/cam1.webp` の約 (560,235)-(675,595)）を渡し、**正面から見た 1 枚の戸の立面**を 3:2（1536x1024）の中央に 1 枚だけ生成する。繰り返しの絵を 1 回で多数描かせると文字風の模様・格子の崩れが出るため。
- **生成プロンプト全文**（素材用。3 テイクとも `VARIANT` 行だけ差し替え）:

  ```text
  $imagegen Using the attached crop as a reference for the style of the door only, create a flat, straight-on front elevation of ONE closed traditional Japanese wooden sliding lattice door, centred in a 3:2 1536x1024 image on a plain mid-grey backdrop: a thick white-painted frame, inside it evenly spaced vertical wooden slats of warm brown wood behind a dark glass pane, and below it a plain dark blue-grey kick panel. The door is slightly weathered, with fine dust and subtle wood grain. VARIANT.
  The door has no handle plate, no sign, no sticker, no paper, no curtain, no shop name: completely plain and unmarked. Evenly lit flat scan, no perspective, no shadows on the backdrop. Match a low-light surveillance still: cold blue-grey colour grading, fine film grain, mild JPEG compression. No text, no letters, no numbers, no logos, no watermark.
  ```

  - VARIANT 1: `The slats are tightly spaced and the wood is mid-brown`
  - VARIANT 2: `The slats are slightly wider apart and the wood is darker`
  - VARIANT 3: `The frame paint is cream-white with light chipping at the corners`
- **作り方**: ①割付図: 壁面の四隅（目安 左上 (422,345)・右上 (675,225)・右下 (675,668)・左下 (422,500)。**原寸で壁の天井線・床線・左右の縁に合わせて確定**）を描き、戸の継ぎ目は x=422・464・506・548・591・633・675 の等間隔（画面上の幅を遠近で縮めない。奥の戸ほど縦横比が横に広がるのが狙い）に置く。②素材を 3 テイク生成して 1 枚を選ぶ（採否は人間）。③`composite-polygon.py tile --base public/images/cam1.webp --material <door.png> --quad "<tl> <tr> <br> <bl>" --cols 1 --rows 1 --gap 0 --shade 0.6 --polygon-out poly.json --out <full.png>` を、継ぎ目の x で切った 6 つの quad（各戸）ごとに順に実行して重ねる。各戸の quad の上辺・下辺が壁の天井線・床線に沿い、継ぎ目が揃っているか原寸で確認。④`cutout --polygon poly.json --hole <吊り看板 E16 のポリゴン> --hole <蛍光灯 E07 のポリゴン> --feather 2`。壁面の明暗は `--shade` と `blend --mode multiply --layer <baseline> --layer-norm` で乗せる。
- **難所と没基準**: 戸の格子が崩れる・文字風の模様が出る・戸の高さ方向が壁の天井線・床線からはみ出すものは没（縦横比は quad 由来の変形のみ許す）。奥の戸が手前より細く縮む（元の遠近どおり）は没（本件の狙いが消える）。吊り看板・蛍光灯が戸に隠れたら没（hole の取り直し）。
- **フェーズ / 目立ち度**: late / obvious。
- **台帳登録案**: id `AR-01-right-wall-lattice-doors` / `element_id: CAM01-E12` / `category: surreal` / `anomaly_type: multiply` / `location`: 右の店先の壁一面 / `detail`: 「右の店先の壁一面が、同じ形の無人の木格子戸の連続に置き換わる（吊り看板と蛍光灯は元のまま。文字なし）」 / phase late / obvious。note に「大面積。CAM01-E12」「重なり表」「排他: 下記」を書く。
- **排他**: 同じ店先の物を使う **`AR-01-noren`・`AR-01-door-ajar`**（戸が連続に置き換わると暖簾・戸の開閉の前提が消える）、面の下端に掛かる **`AR-01-threshold-pigeon`**（鳩の box が面の下端と重なり、戸の腰板に覆われる）、天井と bbox が重なる **`AR-01-ceiling-lanterns`**（壁 x422〜675・y225〜380 が天井 box（217,0,458,380）と重なり、bbox の重なりは 253x155 = 39,215 px²。別の面だが、同じ画面の上半分に大面積が二つ重なると読めなくなるため同プレイ非共存）、壁の下端を使う **`AR-01-milk-bottle-crate`**（敷居・床。box が y700 付近で触れる）は同プレイで共存させない。吊り看板系（`AR-01-sign-rim`・`AR-01-sign-old-shop`）と `AR-01-tube-end` は面の手前の物なので併存可（hole で戸の手前に残す）。
- **相互参照 / 重複精査**: 同カメラの `AR-01-wall-faces`（左壁に顔写真を敷き詰め）は「同じ物を一面に敷き詰める」型。**本件は敷き詰めを避け、「戸が奥へ向かって 1 枚ずつ大きく見える（遠近が効かない）」型に振った**ので、素材（戸の立面 vs 顔写真）・面（反対側の壁）・型（敷き詰め vs 遠近の破れ）のどれも別。同プレイに出うる（排他の対ではない）。他カメラの面の敷き詰め（`AR-06-*` ポスター・CAM07 の時計・CAM03 の白紙）とは素材が別。

### 小物

#### AR-01-ceiling-lamp-off — 左の丸い埋め込み灯が消える

- **camera / element_id**: CAM01 / CAM01-E02
- **物と変化**: 左上寄りの小さな丸い埋め込み灯（白く発光し、周囲がピンク/紫ににじむ）が、**消えて黒っぽい丸い穴**になる。にじみも消え、天井の粒状だけが残る。他の灯は点いたまま。
- **最終 box**（baseline px）: `60,168,128,222`（68x54）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,109,256,280`（256x171）。box はクロップ内の (60,59)-(128,113)
- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: the small bright round recessed ceiling lamp in the left part of the ceiling is switched off: its glowing white face becomes a dull dark grey disc (the unlit lens, slightly glossy), and the soft pink-purple glow around it disappears completely so the rough speckled ceiling surface around it is plain. VARIANT. Do not touch the dark wall corner at the lower left, the ceiling fan area at the top right of this crop, the other lamps or anything else. Place the object centered at about 37% from the left and 54% from the top of the image, occupying roughly 27% of the image width and 32% of its height. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  - VARIANT 1: `The unlit disc is very dark, almost black`
  - VARIANT 2: `The unlit disc is mid-dark grey with a faint highlight on its rim`
  - VARIANT 3: `The unlit disc shows a faint reflection of the ceiling in its glossy lens`
- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 左下の暗い壁の角・天井の粒状・他の灯。
- **最寄り既存 overlay と実測距離**（台帳の最終 overlay の alpha bbox で 2026-11-05 に実測・矩形間のユークリッド距離）: AR-01-ceiling-seam-circle まで 32.0px、次点 AR-01-ceiling-fan-showa 53.0px、本節の AR-01-ceiling-wet-stain まで 162.0px。**余裕が小さい（36px 未満）ので、制作後の最終 overlay の alpha bbox で再測定必須**（30px 割れなら box の右端を左へ動かす）。
- **分類 / フェーズ / 目立ち度**: environment / early / medium（medium 以上。subtle にしない）
- **視認性の注意**: 白（約 240）から暗灰（約 60）へ落ちるので差分は大きいが、元の灯は 40x14px と小さい。にじみまで消すと overlay が約 70x54 に広がり面積比で通る。登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: id `AR-01-ceiling-lamp-off` / `category: environment` / `anomaly_type: state_change` / `detail: '左上寄りの小さな丸い埋め込み灯が消えて、黒っぽい丸い穴になる（周囲のにじみも消える）'` / `candidate_id` は付けない（本節が出典）。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。
- **相互参照 / 重複精査**: `candidate-pool.md` の CR-01-28（同じ灯の「にじみだけ消える」）は**灯が点いたままにじみだけ変わる別案**。本件を制作したら CR-01-28 は実質同じ物の変化になるので削除する。CR-01-30・31（別の丸灯 E05・E06）とは対象が別。他カメラの丸灯（CR-04-32・CR-06-04・CR-02-30）は別カメラ。

#### AR-01-ceiling-tile-drop — 天井板が一枚、片側だけ外れて垂れ下がる

- **camera / element_id**: CAM01 / CAM01-E01（天井面。隣の換気口 E03・点検板 E04 は動かさない）
- **物と変化**: 右上の天井の板（粒状の天井材の一枚）が、**片側の縁だけ外れて斜めに垂れ下がる**。外れた縁の奥に、真っ暗な四角い隙間と細い配線の端が見える。板は元の天井と同じ粒状の色で、無地。
- **最終 box**（baseline px）: `405,122,479,198`（74x76）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `314,74,570,245`（256x171）。box はクロップ内の (91,48)-(165,124)
- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: one ceiling tile in the plain speckled ceiling area to the right of the large round vent has come loose along one edge and hangs down at a slant like an open hatch, showing a pitch-black square gap above it with the cut end of one thin dark cable hanging from the gap. The tile is the same pale blue-grey speckled material as the rest of the ceiling, completely plain. Make it about 1.3x larger than real scale. VARIANT. Do not touch the large round vent at the left of this crop, the square access panel at the right edge, the lamp at the bottom right or anything else. Place the object centered at about 50% from the left and 50% from the top of the image, occupying roughly 29% of the image width and 44% of its height. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  - VARIANT 1: `The loose edge hangs down toward the left`
  - VARIANT 2: `The loose edge hangs down toward the right`
  - VARIANT 3: `The tile hangs by one corner only, with the gap wider`
- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 左の大きな同心円の換気口・右端の四角い点検板・右下の灯。
- **最寄り既存 overlay と実測距離**（台帳の最終 overlay の alpha bbox で 2026-11-05 に実測）: AR-01-ceiling-panel-round（右）まで 32.0px、AR-01-vent-hole-triangle（左）まで 32.0px、次点 AR-01-bunting-flags 48.0px、本節の AR-01-ceiling-wet-stain まで 37.7px。**左右の既存に挟まれ、余裕が小さい（36px 未満）ので、制作後の最終 overlay の alpha bbox で再測定必須**（垂れた縁を左右に広げない。30px 割れなら box を幅の中央側へ寄せる）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium（medium 以上。subtle にしない）
- **視認性の注意**: 黒い隙間と垂れた板の影で差分を作る。灰色の天井に溶けないよう隙間は真っ黒に。登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: id `AR-01-ceiling-tile-drop` / `category: object` / `anomaly_type: displace` / `detail: '右上の天井板が一枚、片側だけ外れて斜めに垂れ下がり、暗い天井裏の隙間が見える'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。
- **相互参照 / 重複精査**: 近い既存: `AR-04-ceiling-corner-fold`（台帳・CAM04・換気口の隣の天井板の角が折れて垂れる）。**別カメラで、本件は板が外れて暗い隙間と配線が見える（天井裏が覗く）点が違う**が、同じ「天井板が垂れる」型なので、制作前に見比べ、実質同じと感じたら取り下げる。「天井板が垂れる」型は、CAM08 側の同名の案が別担当で差し替えられるため、本件が CAM01 で残す唯一の案（他カメラとは重ねない）。CR-01-19（点検板の隣に同じ板が増える）は増やす案で別。

#### AR-01-ceiling-wet-stain — 天井に濡れた丸い染みが広がり水滴が垂れかける

- **camera / element_id**: CAM01 / CAM01-E01（天井面の中央、大きな換気口 E03 の下）
- **物と変化**: 通路中央の天井に、遠近で横に潰れた**丸い濡れ染み**（黒っぽい茶灰色の輪、縁は濃く中は薄い）が現れ、その中央下で**一滴の水が光って垂れかかる**（落ちる前）。染みは粒状の天井に沿い、無地。
- **最終 box**（baseline px）: `290,212,370,248`（80x36）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `202,144,458,315`（256x171）。box はクロップ内の (88,68)-(168,104)
- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the plain speckled ceiling in the middle of the frame, below the large round vent, a wet water stain appears: one roundish dark brown-grey ring, flattened sideways by the ceiling perspective, darker at its rim and paler inside, following the speckled texture of the ceiling, and a single drop of water hangs from the lowest point of the stain, glossy with a small bright highlight, about to fall. VARIANT. Do not touch the large round vent above, the dark ceiling fixtures further down, the lamps or anything else. Place the object, including the drop, centered at about 51% from the left and 52% from the top of the image, occupying roughly 31% of the image width and 21% of its height. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  - VARIANT 1: `The stain is a clean round ring with a soft edge`
  - VARIANT 2: `The stain is an irregular blotch with a darker lower edge`
  - VARIANT 3: `The stain has a faint second ring inside it, like a tide mark`
- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 上の大きな同心円の換気口・下の暗い天井の小型器具。
- **最寄り既存 overlay と実測距離**（台帳の最終 overlay の alpha bbox で 2026-11-05 に実測）: AR-01-vent-hole-triangle まで 32.0px、次点 AR-01-tube-end 47.4px、AR-01-ceiling-seam-circle 48.0px、本節の AR-01-ceiling-tile-drop まで 37.7px（右隣）。**余裕が小さい（36px 未満）ので、制作後の最終 overlay の alpha bbox で再測定必須**（染みと水滴を上へ広げない。30px 割れなら下端を下げる）。
- **分類 / フェーズ / 目立ち度**: environment / early / medium（medium 以上。登録時に subtle にしない。視認性の基準を通すため染みを濃く、輪を太く）
- **視認性の注意**: 明るい天井に対し暗い茶灰の輪で差分を作る。薄いと下限未満。水滴の白い光点を面積比の足しにする。登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: id `AR-01-ceiling-wet-stain` / `category: environment` / `anomaly_type: state_change` / `detail: '天井の中央に、濡れた丸い染みが広がり、その下に水滴が一つ垂れかかる'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。
- **相互参照 / 重複精査**: 近い既存・候補: `AR-01-ceiling-seam-circle`（同カメラ・板継ぎ目の輪。**輪の形は近いが、あちらは継ぎ目の線で、本件は濡れた色面と水滴**。距離は 80px 以上）、CR-02-28・CR-06-28（別カメラの天井の染みの候補）、CR-08-31（別カメラ・丸灯の下の水滴）、`AR-05-hatch-stain`（別カメラ・点検口の色）。型が重なるので制作前に見比べる。

#### AR-01-floor-light-orphan — 光源のない場所に、床の光だまりがもう一つ落ちる

- **camera / element_id**: CAM01 / CAM01-E17（床タイル。手前左の隅）
- **物と変化**: 手前左の暗い床に、**楕円の光だまりがもう一つ**現れる。通路の床には天井灯が落とす白い光だまりが縦に並んでいるが、その真上にも近くにも灯・窓・反射する物がなく、どこからの光かわからない。遠近で横に潰れた淡い青白の楕円で、縁はやわらかく、中心が明るい。タイル目地が光を透かす。物・人・影・文字はない。
- **最終 box**（baseline px）: `2,832,92,898`（90x66）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,729,256,900`（256x171）。box はクロップ内の (2,103)-(92,169)
- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the dark floor tiles in the lower left of the frame, add one soft elliptical pool of pale cold blue-white light lying on the floor, flattened sideways by perspective (about 1.4 times wider than tall), brightest at its centre and fading smoothly into the dark floor at its edge, like the existing pools of light under the ceiling lamps, but with no lamp, window or other light source anywhere near it and no object that casts or catches it. The grey tile joints show through the light. VARIANT. Do not touch the other white light reflections on the floor, the tile joints, the floor to the right or anything else. Place the pool centered at about 18% from the left and 80% from the top of the image, occupying roughly 35% of the image width and 39% of its height. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  - VARIANT 1: `The pool is a clean ellipse with a soft edge`
  - VARIANT 2: `The pool is brighter, nearly white at its centre`
  - VARIANT 3: `The pool has a fainter, smaller second ellipse of light inside it`
- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 床の白い反射・タイル目地。
- **最寄り既存 overlay と実測距離**（台帳の最終 overlay の alpha bbox で 2026-11-05 に実測）: AR-01-lattice-tile まで 34.0px、AR-01-power-bank まで 36.0px、次点 AR-01-bamboo-basket 116.0px。**余裕が小さい（36px 未満）ので、最終 overlay の alpha bbox で再測定必須**（30px 割れなら右端を左へ動かす）。
- **分類 / フェーズ / 目立ち度**: surreal / late / medium（medium 以上。subtle にしない）
- **視認性の注意**: 手前左の床は暗く、明るい楕円との差は大きい。ただし 90x66 と小さいので、中心を明るく縁をはっきり出す。登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通し、通らなければ明るさを上げる。それでも通らなければ本件は取り下げ、別案に差し替える（影を細い帯で出す案には戻さない）。
- **台帳登録時**: id `AR-01-floor-light-orphan` / `category: surreal` / `anomaly_type: state_change` / `detail: '手前左の暗い床に、光源のない場所から落ちた白い光だまりがもう一つ現れる'`。note に最寄り既存 id と最終 alpha bbox 実測距離、「床一面の AR-01-floor-crosswalk と排他」を書く。
- **相互参照 / 重複精査**: 台帳の `AR-01-floor-puddle-light`（床の水たまりが灯を映す。**水の物**）は水たまりと反射、本件は**光だけが物なしで落ちる**点が違う。同カメラの床の白い光だまり自体は元写真の既存要素（E18 の反射帯）で、それを増やす（`CR-01-*` の反射の複製案があれば）型とは、光源の説明がつかない位置に出る点で別。他カメラの床の光（CAM03・CAM06 の反射の候補）とは別の面・別の構図。意味づけは台詞側で決める。

#### AR-01-crouching-silhouette — 奥の床にうずくまる黒い人影

- **camera / element_id**: CAM01 / CAM01-E14（通路奥の柱の右隣の床。柱・開口は動かさない）
- **物と変化**: 通路の突き当たり右寄りの床に、**うずくまった（しゃがんだ）小さな黒い人影**が一つ現れる。遠景のシルエットで、背を丸め、床に近い低い姿勢。顔・服・手の描写はなく、輪郭の黒いかたまり。床に薄い接地の影がある。
- **最終 box**（baseline px）: `385,484,440,538`（55x54）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `284,425,540,596`（256x171）。box はクロップ内の (101,59)-(156,113)
- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the glossy floor tiles at the far end of the corridor, just to the right of the white pillar and below the dark doorway, place one distant crouching human silhouette: a small solid dark charcoal shape of a person squatting low on the floor with a rounded back and the head bowed, seen from the front-side in the distance, with no visible face, no clothes detail, no hands and no feet, only the outline mass. A soft dark contact shadow on the floor tiles under it. Make it about 1.4x larger than real scale because it is far away. VARIANT. Do not touch the white pillar, the dark doorway and its notice plates, the grey floor mat on the floor to the left, the metal shutters to the right or anything else. Place the object, including its shadow, centered at about 61% from the left and 51% from the top of the image, occupying roughly 21% of the image width and 33% of its height. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  - VARIANT 1: `The figure squats with the knees up and the arms wrapped around them`
  - VARIANT 2: `The figure is crouched low, leaning slightly forward with the head down`
  - VARIANT 3: `The figure squats upright on its heels with the head raised, looking down the corridor`
- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 白い柱・暗い開口とその掲示板・左の床のマット・右のシャッター。
- **最寄り既存 overlay と実測距離**（台帳の最終 overlay の alpha bbox で 2026-11-05 に実測）: AR-01-yellow-boots まで 32.2px、次点 AR-01-back-view-paper-bag 49.0px、AR-01-bamboo-broom 67.2px。**余裕が小さい（36px 未満）ので、制作後の最終 overlay の alpha bbox で再測定必須**（30px 割れなら下端を上げる）。
- **分類 / フェーズ / 目立ち度**: person / mid / medium
- **視認性の注意**: 奥の床は中間の灰青で、黒い塊との差は十分。ただし 55x54 と小さいので、縮小で潰れないよう大きめ（1.4 倍）・縁をはっきり。登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: id `AR-01-crouching-silhouette` / `category: person` / `anomaly_type: add_person` / `detail: '通路の突き当たり右寄りの床に、うずくまった小さな黒い人影が一つ現れる（顔・服の描写なし）'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。
- **相互参照 / 重複精査**: 同カメラ `AR-01-back-view-paper-bag`（左の暗い開口の手前に**立つ**後ろ姿・約 49px 左）、候補 CR-01-06（開口の人影が小さすぎる）・CR-01-25（開口の手前に猫）。**本件は床の上で姿勢が違う（うずくまる）、位置が柱の右の床**。他カメラの老人の後ろ姿（`AR-08-old-man-back`・`AR-05-old-woman-in-glass`）とは**姿勢（立つ/うずくまる）と持ち物がない**点が違う。story の「通路に現れていた像は老人 3 人の記憶」に合わせた像で、台詞側で「何かを探している」読みもできる。

#### AR-01-threshold-pigeon — 右の店先の敷居に白い鳩が一羽とまる

- **camera / element_id**: CAM01 / CAM01-E12（右側の店先。敷居の金属帯）
- **物と変化**: 右の店先の下にある**金属の敷居の上**に、**白い鳩が一羽**、通路側を向いてとまる（羽を畳み、首を少し傾ける）。無人の地下街に迷い込んだ鳥。足輪・札・文字はなし。
- **最終 box**（baseline px）: `575,598,675,655`（100x57）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `419,540,675,711`（256x171）。box はクロップ内の (156,58)-(256,115)
- **生成プロンプト**（3 テイク作って目視で選ぶ）:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the grey metal threshold strip at the lower right of the frame, below the dark shop panel, place one plain white pigeon perched, facing the corridor, with folded wings, a small rounded head slightly tilted, a short pale beak and pale grey-pink feet, no leg ring, no tag, no marking. Make it about 1.5x larger than real scale. Give it a soft dark contact shadow on the metal strip and a small bright highlight on its back. VARIANT. Do not touch the floor tiles at the left of this crop, the wall at the upper right, the dark shop panel above or anything else. Place the object, including its shadow, centered at about 81% from the left and 50% from the top of the image, occupying roughly 36% of the image width and 33% of its height. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  - VARIANT 1: `The pigeon looks toward the left, at the corridor`
  - VARIANT 2: `The pigeon faces the camera with its head raised`
  - VARIANT 3: `The pigeon has its head tucked low, puffed up as if sleeping`
- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 左の床タイル・右上の壁・敷居の金属帯の傾き・暗い腰板。
- **最寄り既存 overlay と実測距離**（台帳の最終 overlay の alpha bbox で 2026-11-05 に実測）: AR-01-milk-bottle-crate まで 35.0px、次点 AR-01-bubble-tea-cup・AR-01-door-ajar が 38.0px。**余裕が小さい（36px 未満）ので、制作後の最終 overlay の alpha bbox で再測定必須**。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 敷居は暗い灰色なので白い鳩は強く対比する（明るい面に白だと溶ける問題の逆。暗い面に置いた）。登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **台帳登録時**: id `AR-01-threshold-pigeon` / `category: object`（README のとおり小動物は暫定で `object`）/ `anomaly_type: add_creature` / `detail: '右の店先の金属の敷居に、白い鳩が一羽とまっている（無人の地下街に迷い込んだ鳥）'`。note に最寄り既存 id と最終 alpha bbox 実測距離、「右壁一面の AR-01-right-wall-lattice-doors と排他（鳩の box が戸の面の下端に掛かるため、同プレイで共存させない）」を書く。
- **相互参照 / 重複精査**: 台帳に鳩・鳥の異変は他になし（add_creature は台帳に 4 件。猫は `AR-01-cat-in-frosted-window` が影のみ）。候補 CR-01-25（開口の手前に猫）とは別の生き物・別の位置。同じ右店先の `AR-01-noren`・`AR-01-door-ajar`（戸・暖簾）とは 38px 以上離れ、物も別。

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
