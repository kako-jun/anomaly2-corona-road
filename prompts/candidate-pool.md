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

## 制作仕様（未制作）— CAM 02

CAM02（Main Corridor）の画像異変 8 件（小物 7 件・大面積 1 件）の**制作仕様**。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。台帳の物の偏り（object / add_object が大半）を是正するため、足す物ではなく**人・影・状態の変化・消失・増殖**を中心にした（add_object・add_person・color_shift は 0 件）。2026-11-05 作成（#47）。

- **昇格**: 制作に採用した件は、この節の該当項を**削除**して `anomalies.yaml` へ一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md) のままで、ここの box は作業用の最終値。方針の正本は [`README.md`](./README.md) の「配置の基準」と大面積の例外、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。
- **座標**: すべて baseline px（676x900）。小物の box は 2026-11-05 時点の台帳（CAM02 は 35 件）の overlay_origin / dimensions と実測し、大面積を除く全 overlay から **30px 以上離れる**ことを確かめた。台帳は日々増えるので、登録時に必ず再測定する。この 7 件の box どうしも互いに 30px 以上離れる。
- **偏りの内訳**: state_change 4（点検口・蛍光灯・床の目地の光・天井の星空［大面積］）／remove_object 1／reflection 1（人の影）／multiply 1（壁の鳥）／surreal 1（床の波紋）。人は影だけで、顔・手・肌は描かない（story.md の人物の扱いと禁則に反しない）。服が床に落ちる型は CAM03・CAM08 の案と重なるため入れていない。
- **共通の禁止**: 文字・数字・ロゴ・実在店名の混入（出たテイクは没）。看板の文字は変えない。性的・不適切の独自判定はしない（生成物はそのまま報告）。
- **運用**: 1 件ずつ生成し、採否は人間が決める。生成物は作業物で `experiments/<件名>/` に置き、登録後に即削除する。

### 小物（6倍クロップ）

#### AR-02-hatch-ajar — 床中央寄りの金属製点検口の蓋の右側が横へずれて開き、中に真っ暗な四角い口が覗く

- **camera / element_id**: CAM02 / CAM02-E21
- **物と変化**: 床中央寄りの金属製点検口の蓋の右側が横へずれて開き、中に真っ暗な四角い口が覗く。
- **最終 box**（baseline px、x0,y0,x1,y1）: `292,508,404,586`（112x78）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `220,462,476,633`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (72,46)-(184,124)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the rectangular metal floor access hatch in the middle of the floor, the right two thirds of the hatch cover plate has slid sideways to the left by about one third of its width, uncovering a pitch-black rectangular opening with a thin bright metal rim. The black opening must be clearly darker than the surrounding gray tiles. The left third of the hatch, its frame and the tile joints around it stay as they are. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 44% of the image width and 46% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the rectangular metal floor access hatch in the middle of the floor, the right part of the cover plate is lifted at its far edge and propped open like a lid at a shallow angle, showing a pitch-black rectangular opening underneath and a thin dark shadow on the tiles beside it. The black opening must be clearly darker than the surrounding gray tiles. The left third of the hatch and its frame stay as they are. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 44% of the image width and 46% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the rectangular metal floor access hatch in the middle of the floor, the right part of the cover plate has been removed completely and is not visible anywhere, leaving a clean pitch-black rectangular pit with a thin bright metal frame edge. The black opening must be clearly darker than the surrounding gray tiles. The left third of the hatch and its frame stay as they are. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 44% of the image width and 46% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 点検口の左側の枠・タイル目地・床の反射。蓋を横にずらす案では、元の留め具は動かさず蓋と一緒に移るものとして扱う。
- **最寄り既存 overlay と実測距離**: AR-02-navy-handy-fan まで 33.8px（box 基準・矩形間のユークリッド距離、次点 AR-02-chalk-hopscotch 39.0px。台帳の overlay_origin/dimensions と 2026-11-05 に実測、大面積の AR-02-floor-footprints / AR-02-shutter-crayon-drawings は除く）。**最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium（anomaly_type: state_change）
- **視認性の注意**: box は点検口の右約2/3。点検口の左端は既存の AR-02-tile / AR-02-tile-color の box と接するため入れない。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: CR-02-08（点検口の留め具が一つだけ押し上げられる。CAM02-E21・object/mid）と同じ要素。こちらは蓋そのものが開き中が見える大きな変化で、留め具の微細な変化とは別物。同プレイで共存させない（排他）。CR-02-08 を制作したら、この件の box と重ならないか再確認する。AR-02-tile・AR-02-tile-color は左隣の別タイル。
- **台帳登録案**: `id: 'AR-02-hatch-ajar'` / `element_id: 'CAM02-E21'` / `category: 'object'` / `anomaly_type: 'state_change'` / `location: 'CAM02-E21 の周辺、差分左上 (292,508) px'` / `detail: '床の金属点検口の蓋の右側が横へずれて開き、真っ暗な口が覗く'` / `phase: mid`/ `subtlety: 'medium'` / `candidate_id: 'AR-02-hatch-ajar'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-02-shutter-shadow — 右奥のシャッター面に、立つ人の暗い影だけが映る

- **camera / element_id**: CAM02 / CAM02-E12
- **物と変化**: 右奥のシャッター面に、立つ人の暗い影だけが映る。通路には誰もいない。
- **最終 box**（baseline px、x0,y0,x1,y1）: `410,205,452,290`（42x85）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `303,162,559,333`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (107,43)-(149,128)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the closed roll-down shutter slats at the far right of the corridor, a soft dark silhouette shadow of one standing person is cast on the slats, seen from behind, arms hanging down, shoulders slightly rounded. It is only a shadow: completely featureless, no face, no clothing detail, no light source visible, and no person standing in the corridor. The slat lines remain visible through the shadow and bend very slightly over the silhouette. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 16% of the image width and 50% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the closed roll-down shutter slats at the far right of the corridor, a soft dark silhouette shadow of one standing person is cast on the slats, head slightly tilted to one side and one arm raised toward the head. It is only a shadow: completely featureless, no face, no clothing detail, no light source visible, and no person standing in the corridor. The slat lines remain visible through the shadow. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 16% of the image width and 50% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the closed roll-down shutter slats at the far right of the corridor, a soft dark silhouette shadow of one tall, thin standing person is cast on the slats, facing sideways to the left, hands in front. It is only a shadow: completely featureless, no face, no clothing detail, no light source visible, and no person standing in the corridor. The slat lines remain visible through the shadow. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 16% of the image width and 50% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に シャッターの横縞・縁・隣の暗い開口・柱・床。影は人の形の暗い面だけ。
- **最寄り既存 overlay と実測距離**: AR-02-duplicate-coffee-sign まで 36.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-smoke 37.0px。台帳の overlay_origin/dimensions と 2026-11-05 に実測、大面積の AR-02-floor-footprints / AR-02-shutter-crayon-drawings は除く）。**最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: person / late / medium（anomaly_type: reflection）
- **視認性の注意**: 影の濃さは周囲の暗さに沈まないよう、シャッターの明るい面の上に出す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: CR-02-12（右奥シャッターが壁と同じ色になる。CAM02-E12・surreal/late）と同じ面。同プレイで共存させない（排他）。CR-02-10（床の反射に足だけ二組。person/late）・AR-02-leather-footprints（足跡）は人の痕跡の系統だが、面が違い見え方も別（シャッターの影）。CR-04-11（CAM04 の反射）とは別カメラ。
- **台帳登録案**: `id: 'AR-02-shutter-shadow'` / `element_id: 'CAM02-E12'` / `category: 'person'` / `anomaly_type: 'reflection'` / `location: 'CAM02-E12 の周辺、差分左上 (410,205) px'` / `detail: '右奥のシャッター面に、立つ人の影だけが映り、通路には誰もいない'` / `phase: late`/ `subtlety: 'medium'` / `candidate_id: 'AR-02-shutter-shadow'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-02-fluorescent-half-off — 左上から斜めに入る白い蛍光灯の手前側の一区画だけが消えて暗くなる

- **camera / element_id**: CAM02 / CAM02-E02
- **物と変化**: 左上から斜めに入る白い蛍光灯の手前側の一区画だけが消えて暗くなる。
- **最終 box**（baseline px、x0,y0,x1,y1）: `50,0,168,105`（118x105）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,0,256,171`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (50,0)-(168,105)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the wide slanted white fluorescent light at the top left, the near section (the part at the upper left of the frame, about 60% of the visible length) is switched off: it becomes an unlit dull gray diffuser with a faint outline of the tube housing, no glow at all. The far section of the light (toward the lower right) stays brightly lit exactly as it is. The ceiling around the light and the shutter below are not changed. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 43% from the left and 31% from the top of the image, occupying roughly 46% of the image width and 61% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the wide slanted white fluorescent light at the top left, the near section (the part at the upper left of the frame, about 60% of the visible length) is switched off: it becomes an unlit dull gray diffuser with two thin dark tube lines visible inside, and a very faint orange glow only at the end next to the lit section. The far section stays brightly lit exactly as it is. The ceiling and the shutter below are not changed. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 43% from the left and 31% from the top of the image, occupying roughly 46% of the image width and 61% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the wide slanted white fluorescent light at the top left, the near section (the part at the upper left of the frame, about 60% of the visible length) is switched off: it becomes an unlit dark gray diffuser with black end caps visible at the edges of the unlit section. The far section stays brightly lit exactly as it is. The ceiling and the shutter below are not changed. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 43% from the left and 31% from the top of the image, occupying roughly 46% of the image width and 61% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 蛍光灯の奥側の点灯部分・天井・左のシャッター・床の白い反射帯（帯は現状のまま）。
- **最寄り既存 overlay と実測距離**: AR-02-open-sign まで 85.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-rusty-vent 88.0px。台帳の overlay_origin/dimensions と 2026-11-05 に実測、大面積の AR-02-floor-footprints / AR-02-shutter-crayon-drawings は除く）。**最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: environment / early / medium（anomaly_type: state_change）
- **視認性の注意**: 明るい面が暗くなるので差分は大きい。点灯部との境は斜めの管に沿って自然に切る。標準状態で強く見えるため、フェーズは early に置く。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: 既存・候補に蛍光灯そのものの変化は無い（AR-02-rusty-vent は CAM02-E03 の丸型設備、AR-02-tanabata-paper-chain は天井の吊り飾り）。他カメラの蛍光灯系は別カメラ。同じ天井面の小物（AR-02-rusty-vent は 88.0px、AR-02-tanabata-paper-chain は box が重ならず離れる）とは共存できる。AR-02-shutter-crayon-drawings（左シャッター面の大面積）は box の下端 y57〜105 で重なるが、面が別（天井の蛍光灯とシャッターの表面）なので共存できる。AR-02-ceiling-starry-sky（天井一面を星空にする大面積）は蛍光灯の灯りの状態が食い違うので同プレイで共存させない（排他）。CR-02-19・CR-02-28（天井板の木目・継ぎ目の染み。E01）は、選ぶ板や継ぎ目が box と重なるときだけ同プレイで共存させない（排他）。
- **台帳登録案**: `id: 'AR-02-fluorescent-half-off'` / `element_id: 'CAM02-E02'` / `category: 'environment'` / `anomaly_type: 'state_change'` / `location: 'CAM02-E02 の周辺、差分左上 (50,0) px'` / `detail: '左上の斜めの蛍光灯の手前の一区画だけが消灯し、暗い管の形だけが残る'` / `phase: early`/ `subtlety: 'medium'` / `candidate_id: 'AR-02-fluorescent-half-off'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-02-pillar-sign-gone — 柱の上方に並ぶ小看板のうち、矢印の入った黒枠の看板が消え、壁に四角い日焼け跡だけが残る

- **camera / element_id**: CAM02 / CAM02-E11
- **物と変化**: 柱の上方に並ぶ小看板のうち、矢印の入った黒枠の看板が消え、壁に四角い日焼け跡だけが残る。
- **最終 box**（baseline px、x0,y0,x1,y1）: `330,153,380,188`（50x35）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `227,85,483,256`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (103,68)-(153,103)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the upper part of the white-gray pillar in the center, among the cluster of small signs, remove the small black-framed sign with an arrow. In its place show the bare pillar wall with a clean, slightly paler rectangular patch where the sign used to hang (the wall around it is slightly more yellowed). The other small signs and white small boxes stay exactly as they are. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 20% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the upper part of the white-gray pillar in the center, among the cluster of small signs, remove the small black-framed sign with an arrow. In its place show the bare pillar wall with a paler rectangular patch and two tiny dark screw holes at its upper corners. The other small signs and white small boxes stay exactly as they are. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 20% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the upper part of the white-gray pillar in the center, among the cluster of small signs, remove the small black-framed sign with an arrow. In its place show the bare pillar wall with a faintly paler rectangular patch and four small dull marks at its corners where tape used to be. The other small signs and white small boxes stay exactly as they are. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 20% of the image width and 20% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 柱の他の小看板・白い小箱・柱の角・天井の吊り器具・奥の暗い通路。
- **最寄り既存 overlay と実測距離**: AR-02-pillar-notice まで 36.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-bw-television 61.4px。台帳の overlay_origin/dimensions と 2026-11-05 に実測、大面積の AR-02-floor-footprints / AR-02-shutter-crayon-drawings は除く）。**最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / subtle（anomaly_type: remove_object）
- **視認性の注意**: box が小さい（50x35）ので 6 倍クロップで作る。消した跡（日焼け跡）をはっきり出さないと見落とされる。要つまみ調整の可能性あり（明るさを上げる方向）。登録後に check-visibility を通す。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: CR-02-35（柱の小さな掲示が一枚だけ横向き。CAM02-E11・object/early）と同じ小看板群。同プレイで共存させない（排他）。AR-02-pillar-notice（柱の別の高さに紙を足す。E10）は足す異変で、これは消す異変。
- **台帳登録案**: `id: 'AR-02-pillar-sign-gone'` / `element_id: 'CAM02-E11'` / `category: 'object'` / `anomaly_type: 'remove_object'` / `location: 'CAM02-E11 の周辺、差分左上 (330,153) px'` / `detail: '柱上方の黒枠の矢印看板が消え、壁に四角い日焼け跡だけが残る'` / `phase: mid`/ `subtlety: 'subtle'` / `candidate_id: 'AR-02-pillar-sign-gone'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-02-floor-seam-glow — 柱と看板の間の床で、奥へ伸びるタイル目地の一本が、細い光の線になる

- **camera / element_id**: CAM02 / CAM02-E20
- **物と変化**: 柱と看板の間の床で、奥へ伸びるタイル目地の一本が、床の下から光が漏れているように細く白く光る。物も人も足さない（既存の目地が光るだけ）。
- **最終 box**（baseline px、x0,y0,x1,y1）: `368,352,408,426`（40x74）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `257,304,513,475`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (111,48)-(151,122)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに光の色と強弱の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the gray floor between the pillar and the green standing sign, exactly one of the tile joint lines running from the near side toward the far end of the corridor glows as a thin, steady cool-white line of light, as if light were leaking up through the crack. The line follows the existing joint exactly, does not bend or branch, and has a faint soft halo on the two neighboring tiles. No light source, no object and no person is visible. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any glow, centered at about 51% from the left and 50% from the top of the image, occupying roughly 16% of the image width and 43% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the gray floor between the pillar and the green standing sign, exactly one of the tile joint lines running from the near side toward the far end of the corridor glows as a thin pale warm-yellow line of light, brightest at the near end and fading out toward the far end, as if light were leaking up through the crack. The line follows the existing joint exactly and does not bend or branch. The neighboring tiles stay as they are apart from a very faint warm tint right beside the line. No light source, no object and no person is visible. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any glow, centered at about 51% from the left and 50% from the top of the image, occupying roughly 16% of the image width and 43% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the gray floor between the pillar and the green standing sign, exactly one of the tile joint lines running from the near side toward the far end of the corridor glows as a thin pale blue-white line of light that widens slightly into two soft beads of brighter light along its length, and the line continues thinly between them. The line follows the existing joint exactly and does not bend or branch, with a faint soft halo on the neighboring tiles. No light source, no object and no person is visible. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any glow, centered at about 51% from the left and 50% from the top of the image, occupying roughly 16% of the image width and 43% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 柱・自立看板（箱と干渉しない）・看板の台座・石蹴り跡（左隣）・床の他の目地とタイルの斑点・遠景。光るのは目地 1 本だけで、目地の位置・向きは動かさない。
- **最寄り既存 overlay と実測距離**: AR-02-chalk-hopscotch まで 37.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-duplicate-coffee-sign 80.0px。台帳の overlay_origin/dimensions と 2026-11-05 に実測し、overlay webp の alpha>0 の外接矩形とも一致を確認。大面積の AR-02-floor-footprints / AR-02-shutter-crayon-drawings は除く）。**最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: surreal / mid / medium（anomaly_type: state_change）
- **視認性の注意**: box は縦長（40x74）で、奥行き方向に走る目地 1 本を中心に収める。線が細く見落とされやすいので、目地の両脇のタイルに薄い光のにじみ（幅 6〜8px 程度）を出して差分を確保する。ただし光の面を床全体へ広げない。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: 同カメラの床の異変（AR-02-tile・AR-02-tile-color は点検口左のタイル 1 枚の模様・色、AR-02-puddle は水たまり、AR-02-floor-ripple は波紋）は別の場所・別の見え方で、目地そのものが光る異変は無い。CR-02-13・14・15・16（床タイル 1 枚・水たまり。E20）は床の同じ面を使うが小さな変化なので、同プレイで共存させない（排他）。AR-02-floor-footprints（床一面の足跡・大面積）は box が重なるので同プレイで共存させない（排他）。AR-02-chalk-hopscotch（左隣の石蹴り跡）・AR-02-floor-ripple・AR-02-hatch-ajar とは box が 30px 以上離れ、共存できる。他カメラの CR-06-41（床の目地の交点が光る）は別カメラ。
- **台帳登録案**: `id: 'AR-02-floor-seam-glow'` / `element_id: 'CAM02-E20'` / `category: 'surreal'` / `anomaly_type: 'state_change'` / `location: 'CAM02-E20 の周辺、差分左上 (368,352) px'` / `detail: '柱と看板の間の床で、奥へ伸びるタイル目地の一本が細い光の線になる'` / `phase: mid`/ `subtlety: 'medium'` / `candidate_id: 'AR-02-floor-seam-glow'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-02-wall-bird-triplet — 右壁の黒い店舗ガラスにある白い鳥の装飾の一羽が、同じ向き・同じ大きさで三羽に増える

- **camera / element_id**: CAM02 / CAM02-E17
- **物と変化**: 右壁の黒い店舗ガラスにある白い鳥の装飾の一羽が、同じ向き・同じ大きさで三羽に増える。
- **最終 box**（baseline px、x0,y0,x1,y1）: `604,356,676,446`（72x90）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `420,316,676,487`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (184,40)-(256,130)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the nearly black shop glass wall at the right edge, the white decorative bird-shaped decal in this area is multiplied: three identical white bird decals, same direction, same size, evenly spaced along the wall's perspective one below the other, each as bright as the original. The other stars and decals on the glass and the wooden easel in front stay unchanged. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 86% from the left and 50% from the top of the image, occupying roughly 28% of the image width and 53% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the nearly black shop glass wall at the right edge, the white decorative bird-shaped decal in this area is multiplied: three identical white bird decals in a diagonal row, all facing the same direction, same size, each as bright as the original. The other stars and decals on the glass and the wooden easel in front stay unchanged. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 86% from the left and 50% from the top of the image, occupying roughly 28% of the image width and 53% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the nearly black shop glass wall at the right edge, the white decorative bird-shaped decal in this area is multiplied: three identical white bird decals in a tight row, all facing the same direction, same size, nearly touching one another, each as bright as the original. The other stars and decals on the glass and the wooden easel in front stay unchanged. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 86% from the left and 50% from the top of the image, occupying roughly 28% of the image width and 53% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 右壁の他の星形装飾・黒板の木枠・床・看板。
- **最寄り既存 overlay と実測距離**: AR-02-duplicate-coffee-sign まで 32.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-smoke 35.0px。台帳の overlay_origin/dimensions と 2026-11-05 に実測、大面積の AR-02-floor-footprints / AR-02-shutter-crayon-drawings は除く）。**最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: surreal / mid / medium（anomaly_type: multiply）
- **視認性の注意**: box の右端は画像の右端（676）。元の鳥の輪郭は暗くて判然としないため、6倍クロップで元の鳥の位置を確認してから三羽の位置を決める。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: AR-02-flower-ornament・AR-02-red-star（同じ壁の別の装飾を変える）・CR-02-07（装飾の向き）・AR-02-smoke（右壁の煙）と同じ壁面。座標は離れているが、同じ装飾を使う件どうしは同プレイで共存させない（排他）。
- **台帳登録案**: `id: 'AR-02-wall-bird-triplet'` / `element_id: 'CAM02-E17'` / `category: 'surreal'` / `anomaly_type: 'multiply'` / `location: 'CAM02-E17 の周辺、差分左上 (604,356) px'` / `detail: '右壁の黒い店舗ガラスの白い鳥の装飾が、同じ向き・大きさで三羽に増える'` / `phase: mid`/ `subtlety: 'medium'` / `candidate_id: 'AR-02-wall-bird-triplet'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

#### AR-02-floor-ripple — 乾いたままの床のタイル数枚に、水面のような同心円の波紋が一つだけ広がる

- **camera / element_id**: CAM02 / CAM02-E20
- **物と変化**: 乾いたままの床のタイル数枚に、水面のような同心円の波紋が一つだけ広がる。
- **最終 box**（baseline px、x0,y0,x1,y1）: `366,618,424,668`（58x50）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `267,558,523,729`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (99,60)-(157,110)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the dry gray floor tiles, a single set of three concentric ripple rings spreads across a few tiles as if the stone floor were a water surface: thin bright rings with a slightly distorted reflection of the ceiling inside them, the tile joints bending smoothly through the rings. The floor around stays dry and unchanged. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 23% of the image width and 29% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the dry gray floor tiles, a single set of four concentric ripple rings spreads across a few tiles as if the stone floor were a water surface, the center slightly darker and the rings thin and bright, the tile joints bending smoothly through the rings. The floor around stays dry and unchanged. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 23% of the image width and 29% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the dry gray floor tiles, a single set of two wide concentric ripple rings spreads across a few tiles as if the stone floor were a water surface, with a small bright highlight on the nearest ring and the tile joints bending smoothly through the rings. The floor around stays dry and unchanged. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 23% of the image width and 29% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に タイル目地の位置（波紋の内側で曲がるのみ）・周囲の床・点検口・スツール。
- **最寄り既存 overlay と実測距離**: AR-02-stool まで 32.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-smartphone-facedown 41.7px。台帳の overlay_origin/dimensions と 2026-11-05 に実測、大面積の AR-02-floor-footprints / AR-02-shutter-crayon-drawings は除く）。**最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: surreal / mid / medium（anomaly_type: surreal）
- **視認性の注意**: 水たまり（AR-02-puddle）と違い、水が溜まっていない床に波紋だけが出る点が核心。波紋の外は一切濡れた表現にしない。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: AR-02-puddle（左の床に水たまり。state_change）・CR-02-16（看板の手前の水たまり）とは別物（水たまり vs 波紋のみ）。水が出る系なので、同プレイで AR-02-puddle と共存させない（排他）。
- **台帳登録案**: `id: 'AR-02-floor-ripple'` / `element_id: 'CAM02-E20'` / `category: 'surreal'` / `anomaly_type: 'surreal'` / `location: 'CAM02-E20 の周辺、差分左上 (366,618) px'` / `detail: '乾いた床のタイルに、水面のような同心円の波紋が一つだけ広がる'` / `phase: mid`/ `subtlety: 'medium'` / `candidate_id: 'AR-02-floor-ripple'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

### 大面積（3:2 の窓）

#### AR-02-ceiling-starry-sky — 天井一面の暗い青灰が、一面の星空に変わる（大面積）

- **camera / element_id**: CAM02 / CAM02-E01（天井面）
- **物と変化**: 天井一面の暗い青灰の天井板が、細かな星が散る夜空に変わる。蛍光灯・丸型設備・小さな丸灯・カメラ・吊り器具はそのまま残り、天井と壁・シャッター・看板の境も動かさない（昭和の子供の記憶。文字なし・星座線なし）。
- **面（box と実面積）**: box `0,0,600,162`（600x162 = 97,200 px²。画像 676x900 = 608,400 px² の 1/8 = 76,050 px² 以上、約16.0%）。天井は台形で box より実面積が小さいため、ポリゴン `(0,0) (600,0) (600,25) (575,50) (500,100) (415,122) (410,135) (340,162) (275,162) (220,155) (170,140) (0,45)` を cam2.webp に重ねて天井の縁（左はシャッター上端・右は暗い壁と赤い看板・下は吊り器具の下端）に沿うことを目視し、**ポリゴンの実面積 69,865 px²（画像の約11.5%）、外接矩形 x0〜600・y0〜162（= 97,200 px²）**を実測した。登録時は貼り込み後の alpha bbox を再計測し、**bbox が約 90,000 px² を割ったら登録せず、面を作り直す**（実面積は台形なので 90,000 を割ってもこの値より小さくはならない）。
- **大面積どうしの重なり**（2026-11-05 実測）: AR-02-floor-footprints（0,338,676x562）とは y 方向に 176px 離れる。AR-02-shutter-crayon-drawings（0,57,165x541）とは外接矩形が x0〜164・y57〜162 で重なるが、面が別（シャッター面と天井）で、台帳 webp の alpha 画素とこのポリゴンの重なりは **0 px**（左下の縁をシャッター上端に沿った `(0,45)-(170,140)` に置いた場合）。矩形さえ重ねたくない場合は面を x165 以降に絞るしかなく、それでは約 70,000 px² で足りないため、面の別と画素の重なり 0 を根拠にこの形で置く。
- **排他**: 天井面そのものを変えるので、同じ面の異変とは同プレイで共存させない。AR-02-fluorescent-half-off（蛍光灯の一区画が消灯。星空の下で灯の状態が食い違う）・AR-02-tanabata-paper-chain・AR-02-rusty-vent（天井の吊り飾りと丸型設備）・AR-02-smoke（右上へ重なる）・AR-02-pillar-sign-gone（柱上方の box が天井の下端と重なる）・CR-02-19・CR-02-28（天井板の変化。E01）・CR-02-20（丸い設備の形。E03）・CR-02-21・CR-02-31（吊り器具の変化。E05）。
- **3:2 の窓**（共通手順の正本は過去の制作仕様節 = git 履歴 253db1d の「3:2 の窓と元画像への復元」）: `composite-polygon.py crop --base public/images/cam2.webp --crop 0,0,676,450 --out <PNG>`（box の高さ 162 は 450 以下なので窓 1 枚。box は窓の上端に接するが、画像の上端なので余裕は不要）。復元は `restore --crop 0,0,676,450`。
- **作り方**: 窓を 1 回編集して天井だけを星空にし、**`cutout --polygon` で上のポリゴンの内側だけを貼り込む**（ポリゴン外の alpha は厳密に 0。器具の位置が窓の編集でずれたテイクは没）。星は小さな点の集まりなので、顔崩れ・文字風の模様の心配は小さい。素材の別生成と `tile` は使わない。
- **生成プロンプト（窓の 3 テイク。テイクごとに星の密度と描き方だけを変えてある）**:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 3:2 window (1536x1024) cut from a low-fi surveillance camera photo. Keep exactly the same framing, zoom, perspective and aspect ratio: do not recompose, re-crop, rotate or zoom. Keep the low-fi CCTV look, film grain, compression artifacts, lighting, color grade and every wall, pillar, shutter, sign and floor exactly unchanged. Make ONLY this single change: the whole dark blue-grey ceiling surface of the corridor, from the near edge to the far end, turns into a clear night sky full of small white stars, as if the ceiling panels had opened to the sky. Dense fine stars of varied brightness, a faint pale band of the Milky Way running along the length of the corridor in the ceiling's perspective, deep navy-black sky tone. No ceiling panel seams remain on the sky. The fluorescent tube, the round vent, the small round ceiling lights, the camera and the hanging fixtures stay exactly as they are, in the same places and still lit, and the edges where the ceiling meets the walls, shutters and signs stay exactly where they are. Do not touch the floor, the shutters, the pillar, the standing sign, the walls or anything below the ceiling line. Completely plain and unmarked: no text, letters, numbers, logos or constellation lines anywhere. Do not add anything else. Output 3:2 1536x1024. Keep the camera angle exactly as the source. Match the original look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 3:2 window (1536x1024) cut from a low-fi surveillance camera photo. Keep exactly the same framing, zoom, perspective and aspect ratio: do not recompose, re-crop, rotate or zoom. Keep the low-fi CCTV look, film grain, compression artifacts, lighting, color grade and every wall, pillar, shutter, sign and floor exactly unchanged. Make ONLY this single change: the whole dark blue-grey ceiling surface of the corridor, from the near edge to the far end, turns into a calm clear night sky with fewer, larger stars: about forty soft white stars of clearly different sizes scattered evenly over a flat deep midnight-blue sky, each with a small gentle glint. No Milky Way, no moon, no clouds. No ceiling panel seams remain on the sky. The fluorescent tube, the round vent, the small round ceiling lights, the camera and the hanging fixtures stay exactly as they are, in the same places and still lit, and the edges where the ceiling meets the walls, shutters and signs stay exactly where they are. Do not touch the floor, the shutters, the pillar, the standing sign, the walls or anything below the ceiling line. Completely plain and unmarked: no text, letters, numbers, logos or constellation lines anywhere. Do not add anything else. Output 3:2 1536x1024. Keep the camera angle exactly as the source. Match the original look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 3:2 window (1536x1024) cut from a low-fi surveillance camera photo. Keep exactly the same framing, zoom, perspective and aspect ratio: do not recompose, re-crop, rotate or zoom. Keep the low-fi CCTV look, film grain, compression artifacts, lighting, color grade and every wall, pillar, shutter, sign and floor exactly unchanged. Make ONLY this single change: the whole dark blue-grey ceiling surface of the corridor, from the near edge to the far end, turns into a vast starry night sky: many small stars tinted faintly pale cyan to match the cold colour grading, a few brighter stars with soft cross-shaped glints, and a slightly lighter indigo glow toward the far end of the corridor. No moon, no clouds, no ceiling panel seams on the sky. The fluorescent tube, the round vent, the small round ceiling lights, the camera and the hanging fixtures stay exactly as they are, in the same places and still lit, and the edges where the ceiling meets the walls, shutters and signs stay exactly where they are. Do not touch the floor, the shutters, the pillar, the standing sign, the walls or anything below the ceiling line. Completely plain and unmarked: no text, letters, numbers, logos or constellation lines anywhere. Do not add anything else. Output 3:2 1536x1024. Keep the camera angle exactly as the source. Match the original look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```

- **保持するもの**: 蛍光灯・丸型設備・小さな丸灯・カメラ・吊り器具・柱・シャッター・看板・壁・床のすべて。天井の下（y>162）には何も足さない。
- **分類 / フェーズ / 目立ち度**: surreal / late / obvious（anomaly_type: state_change）。大面積。
- **視認性の注意**: 暗い青灰色の天井が濃紺と白い星に変わり、面積が大きいので差分は出る。器具（特に左上の白い蛍光灯）を残すため、ポリゴン内でも差分が一様にならない。星空が暗すぎて元の天井と見分けにくいテイクは、星を明るく増やす方向で選ぶ。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: 同カメラの天井の変化は小物のみ（折り鶴・点検板・設備の形・板の木目・染み）で、天井一面の別の物に置き換わる異変は無い。台帳の大面積の天井の吊り飾り（AR-01-ceiling-lanterns・AR-06-ceiling-umbrellas・AR-07-ceiling-white-sheets）は「天井から物が垂れる」型で、これは天井面そのものが別の景色になる型で、足す物が無い。AR-06-teru-teru-bozu（CAM06）とは物が別。
- **台帳登録案**: `id: 'AR-02-ceiling-starry-sky'` / `element_id: 'CAM02-E01'` / `category: 'surreal'` / `anomaly_type: 'state_change'` / `location: 'CAM02-E01 の天井一面、差分左上 (0,0) px'` / `detail: '天井一面の暗い青灰の天井板が、一面の星空に変わる'` / `phase: late` / `subtlety: 'obvious'` / `candidate_id: 'AR-02-ceiling-starry-sky'`。note の先頭に「大面積」と書き、ポリゴン実面積と alpha bbox、排他の相手（上記）と、登録前に出し直した同カメラの box 重なり表を貼る。

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

CAM03（South Exit）の新規画像異変 8 件の**制作仕様**（Issue #47。偏り是正＝person / add_person / surreal / state_change / remove_object を中心に。add_creature・add_object・color_shift は 0 件）。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。採用して制作に進む時は、その項を削除して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。box は `x1,y1,x2,y2`（`scripts/composite-anomaly.py` の `--box` と同じ。括弧内は幅x高さ）で書いた作業用の最終値（台帳には貼り込み後の alpha bbox から出した `overlay_origin` / `dimensions` を入れる）。

| ID | category | anomaly_type | 変化 | 大小 |
| --- | --- | --- | --- | --- |
| AR-03-floor-shadows | person | add_person | 壁の向こうに立つ人の影だけが床に並ぶ（大面積） | 大面積 |
| AR-03-shutter-fingers | person | add_person | 左シャッターの横縞の隙間から白い指が数本だけ覗く | 小物 |
| AR-03-floor-line-break | environment | state_change | 床のタイル目地の線が一本だけ途中で途切れる | 小物 |
| AR-03-tube-light-bent | environment | state_change | 右上の蛍光灯の光が、床の反射と違う向きへ折れ曲がる | 小物 |
| AR-03-ceiling-eye | surreal | surreal | 天井の暗い隙間から白い目が一つ覗く | 小物 |
| AR-03-dark-tile | object | state_change | 通路中央の床に座布団ほどの暗いタイルが一枚だけ混じる | 小物 |
| AR-03-roll-vanish | object | remove_object | 壁際の銀白色の巻いた物が消える | 小物 |

- **配置の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3` で台帳の CAM03 全 30 件の `overlay_origin` と overlay の実際の alpha bbox を測定）: 小物 7 件の box は、大面積 2 件（AR-03-shutter-blank-papers (0,102,258,650)・AR-03-floor-tatami (29,457,676,900)）を除く既存 overlay の alpha bbox から**30px 以上**離れ、本節の他の小物 box どうしも 30px 以上離れている（最小は 30.0px で、AR-03-floor-line-break↔AR-03-shutter-raised と AR-03-tube-light-bent↔AR-03-ceiling-eye。最寄りは各項に記載）。羽毛ぼかしやにじみで overlay が広がる分、制作後に alpha bbox で測り直す（36px 未満の項は特に必須）。大面積 AR-03-floor-shadows と小物の box 重なりは項に px² で記載（README の大面積の例外。排他は項に明記）。
- **偏り是正の内訳**: add_person 2（影・シャッターの指）／surreal 1（天井の目）／state_change 4（床の目地・蛍光灯の向き・暗いタイル・シャッターの裾）／remove_object 1（銀白色の巻いた物）。台帳に CAM03 の add_person・remove_object は無く、person カテゴリも CAM03 にまだ無い。
- **大面積**: 1 件（AR-03-floor-shadows、box 91,540 px²）。同カメラの既存大面積は AR-03-shutter-blank-papers（左壁）と AR-03-floor-tatami（手前の床）で、本件は奥〜中央の床で box が重ならない（距離は項に記載）。
- **人・生き物の安全範囲**: 影・指だけ・目だけ。story.md の禁則（実在の企業・商品名、台詞や統計の捏造、勝ち負けの語）に触れない。文字・ロゴは入れない。
- **共通手順**（制作スキルの手順 5〜8 と同じ）: ① 各項の「6倍クロップ」（大面積は 3:2 の窓）を `public/images/cam3.webp`（676x900）から切り出して 1536x1024 へ拡大（webp は PNG にしてから渡す。大面積の窓は `composite-polygon.py crop --crop 0,225,676,675`）。② 明示的な `$imagegen` で各項のプロンプトを 3 テイク生成し、採否は人間が決める（0 バイト・数 KB の壊れた PNG は撮り直す。文字・ロゴらしき刻印が出たテイクは捨てる）。③ 小物は選んだ結果を元のクロップ寸法へ縮小して baseline の同じ位置へ貼り戻し、`scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold`/`--margin` を 8/12/16/18 で試す）。大面積は `composite-polygon.py restore` → 影のポリゴンを `cutout` する。④ 最終 overlay の alpha bbox で既存との距離を測り直し、台帳へ登録して `uv run scripts/check-visibility.py --id <id>` を通す（通らなければ強めて作り直すか、この節へ戻す）。⑤ 登録・コミットしたら `experiments/` の作業物を即削除する。

### AR-03-floor-shadows — 壁の向こうに立つ人の影だけが床に並ぶ（大面積）

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 右の壁・シャッターの根元から手前左へ、人の形をした長い影だけが 14 本ほぼ平行に床へ落ちる。本人は写らない（壁の向こうに立つ老人たちの記憶という読み。story.md の「通路に現れていた像は老人3人の記憶」に沿う）。
- **box (x1,y1,x2,y2)**: (278,226,676,456)（398x230。面積 398x230 = 91,540 px²、画像の 15.0%。1/8 = 76,050 を満たす）
- **最寄り既存 overlay と実測距離**: 大面積どうし: AR-03-shutter-blank-papers (0,102,258,650) と x で 20px 離れ重ならない。AR-03-floor-tatami (29,457,676,900) とは y で 1px 離れ重ならない（box 下端を 456 で止める。影の先端が 457 を越えたらポリゴンで切る）。小物との重なりは下の表。
- **窓**: 3:2 の窓 1 枚: `composite-polygon.py crop --base public/images/cam3.webp --crop 0,225,676,675`（676x450、縮尺 2.272 倍）。box は窓内で (632,2)–(1536,525)。窓の下端はたたみの上端 y457 を含むが、貼り戻しは床ポリゴンの内側だけ採用する。
- **面積の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3`）: 影 14 本を、足元が右壁の根元 (612,230)→(676,374)・長さ 170→408px・傾き約 11°・頭は円の仮ポリゴンで描いて測ると、**実面積 約 37,900 px²**（box 91,540 の 41%）、**alpha bbox (278,227)–(676,457) = 398x230 = 91,540 px²**（≥ 約 90,000 を満たす）。実面積は box より大幅に小さいが、README の大面積は `dimensions`（alpha bbox）の面積で判定する。ただし余裕は約 1.7% しかないので、制作後に alpha bbox を測り直し、90,000 を割ったら最も長い 2〜3 本を伸ばす（先端 x≈278・足元 x≈676・y 227〜456 の全域に影が届くこと）。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 2.272x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: on the grey tile floor of the corridor, fourteen long, soft-edged dark shadows of standing people, all nearly parallel and fanned out slightly. Each shadow is a clearly human silhouette (round head, shoulders, torso, two legs) stretched very long in perspective. They all start at the base line where the right-hand wall and the right-hand shutter meet the floor, between roughly x=1390 and x=1536 and y=10 to y=340 in the 1536x1024 frame, and run toward the lower left across the floor and over the tile joints at a gentle slope of about 11 degrees. The farthest (upper) shadows are the shortest, ending around x=1050 to 1150, and the nearest (lower) ones are the longest, their heads reaching about x=640, y=520. Spacing between neighbouring shadows is about 25 to 35 px at the far end and 40 to 55 px at the near end, lengths vary between about 390 and 930 px. Shadows are the same darkness as the existing floor shadow patches, darker where tile joints cross them, with a gentle blurred edge. There is no person, body, or object anywhere; only the shadows. Do not touch the green sign, the wooden crate, the left shutter, the white floor reflections, the ceiling or the far end of the corridor. Do not change the wall or the shutter on the right. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 2.272x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: thirteen tall, thin, long human-shaped dark shadows lying on the grey tile floor, parallel to each other, as if thirteen people stood in a row just behind the right-hand wall, out of the camera's view. Each shadow has a round head, narrow shoulders and legs, stretched far in perspective toward the lower left of the frame at a shallow slope. Their feet ends sit on the wall-to-floor line on the right (x about 1390 to 1536, y about 10 to 340) and the head ends reach from x about 1050 (far, short ones) down to x about 650, y about 520 (near, long ones). Neighbouring shadows are about 30 to 50 px apart; every shadow slightly different in length. Soft, slightly blurred edges, dark grey-blue, tile joints visible through them. No people, no objects, only shadows on the floor. Preserve the green sign, crate, shutter, reflections, ceiling and everything else exactly. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 2.272x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: twelve narrow, elongated shadows of standing adults and two shorter ones of children's height mixed in, lying side by side on the grey tile floor, parallel, all stretching toward the lower left at a shallow slope from the right wall base (x about 1380 to 1536, y about 10 to 345) to heads at about x=640 to 1100, y=250 to 525. The shadows have no detail inside, just clean human outlines (head, shoulders, arms hanging, legs together) with soft edges and low contrast against the tiles, as if cast by a light source far behind the right wall. No person or object is visible, only shadows on the floor. Do not alter the green sign, crate, shutter, reflections or ceiling; do not add anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-floor-shadows'
    candidate_id: 'AR-03-floor-shadows'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM03-E16 の奥右〜中央の床、差分左上は貼り込み後の alpha bbox で再計測（box 目安 (278,226)）'
    detail: '右壁の根元から手前左へ、人の形の長い影だけが14本ほぼ平行に床へ落ちる（本人は写らない）。'
    overlay: 'assets/anomaly-overlays/cam03/floor-shadows.webp'
    # phase / 目立ち度: mid / obvious
    note: '大面積（影の先端まで含む alpha bbox が約 90,000 px² 以上、最低でも 1/8 = 76,050 以上であること）。同プレイで共存させない: AR-03-dark-tile / AR-03-floor-line-break（同じ床の面）。併存可: 壁・看板・既存の床小物（影ポリゴンは物の接地部で止め、`cutout --hole` で抜く）。'
  ```
- **相互参照 / 重複精査**: 同型は CAM08 の AR-08-old-man-back などの『人の姿』だが、本件は姿を描かず影だけで、面（床）一面の大面積。CR-03-42（床の反射に傘の影）・CR-03-35（吊り器具の影）は物の影で別物。CR-01-06（奥の人影）は CAM01。既存の CAM03 台帳に影・人物の異変はない。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-dark-tile / AR-03-floor-line-break（同じ床の面）。併存可=壁面・看板・既存の床小物（影は物の接地部で止める）。既存 overlay との重なり px²（box 基準）: AR-03-sign-glow-blue 13,081 / AR-03-slipper-single 3,074 / AR-03-walking-cat 2,800 / AR-03-coffee-text-missing 2,535 / AR-03-crate-duplicate 2,508 / AR-03-face-ornament 1,600 / AR-03-sunken-opening-floor 972 / AR-03-shutter-faded-poster 896 / AR-03-white-cap 660 / AR-03-pink-ornament 140。本節の新規小物との重なり: AR-03-dark-tile 3,150 / AR-03-floor-line-break 1,892（ともに排他）、AR-03-roll-vanish 840 / AR-03-shutter-raised 1,176（併存可）。

### AR-03-shutter-fingers — 左シャッターの横縞の隙間から白い指が数本だけ覗く

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E06
- **物と変化**: 左の大きな横縞シャッターの、横縞の間の隙間に、内側から板の縁をつかむように青白い指が数本だけ現れる（手のひら・腕・顔は写らない。指だけ）。閉店後の店の中に誰かがいる。
- **box (x1,y1,x2,y2)**: (104,380,160,422)（56x42）
- **最寄り既存 overlay と実測距離**: AR-03-shutter-wave (71.0)、次点 AR-03-newspaper (72.0)。大面積 AR-03-shutter-blank-papers の alpha（貼り紙・シャッター面）と box が重なる（alpha 重なり 2,083 px²。小物と大面積の重なりは README の例外）。
- **6倍クロップ範囲**: 6倍クロップ (36,311)–(292,482)（256x171）。box は窓内で (408,414)–(744,666)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: four pale, slender, slightly curled human fingers (index to little finger, only the first two joints, no palm, hand, wrist or arm) pushed out through the dark gap between two horizontal slats of the grey roll-up shutter, as if someone behind the shutter is gripping the edge of the slat. They sit across one slat gap, about x=408 to 744 and y=414 to 666 in the 1536x1024 frame, with a thin dark shadow under them. Plain bare skin in cold blue-grey light, no rings, no nail polish, no marks. Do not change the slats, the stains, the screw head or anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: three pale fingers (only the tips and first joints, slightly bent, no hand visible) hooked over the lower edge of one horizontal slat of the grey roll-up shutter, coming out of the dark slat gap, at about x=420 to 730, y=420 to 660 in the 1536x1024 frame, with a soft shadow below. Plain skin, no rings, no marks, no nails decoration. Everything else stays identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: a pair of pale, thin human fingers (two fingers only, slightly curled, fingertips only) poking out through the gap between two shutter slats from the dark behind, at about x=430 to 720, y=430 to 650 in the 1536x1024 frame, slightly lit by the cold light, a thin dark shadow beneath. No hand, no arm, no face. Do not alter the shutter, the stains or anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-shutter-fingers'
    candidate_id: 'AR-03-shutter-fingers'
    camera_id: 'CAM03'
    element_id: 'CAM03-E06'
    base_photo: 'public/images/cam3.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM03-E06 の左シャッター中ほど、差分左上 (104,380) 付近（貼り込み後に再計測）'
    detail: '左の横縞シャッターの隙間から、内側から縁をつかむように白い指が数本だけ覗く（手のひら・腕・顔は写らない）。'
    overlay: 'assets/anomaly-overlays/cam03/shutter-fingers.webp'
    # phase / 目立ち度: early / medium
    note: '最寄り既存 overlay は AR-03-shutter-wave（box 距離 71px）。大面積 AR-03-shutter-blank-papers と同じシャッター面で alpha が重なるため排他（同プレイで共存させない）。小さな指だけで視認性下限が厳しいので、check-visibility を必ず通す（通らなければ指を増やすか太くする）。'
  ```
- **相互参照 / 重複精査**: 同型の人物は CAM01 AR-01-back-view-paper-bag・CAM05 AR-05-old-woman-in-glass・CAM06 AR-06-worker・CAM08 AR-08-old-man-back（いずれも全身の後ろ姿）で、本件は指だけ・シャッターの内側から。CAM04 AR-04-glass-fog-handprints（ガラスの手形）とは面も表現も別。台帳に CAM03 の人物の異変は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-shutter-blank-papers（同じシャッター面）。併存可=床・看板・天井の異変。新規小物どうしの最寄りは AR-03-roll-vanish で 300px 以上。

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

### AR-03-tube-light-bent — 右上の蛍光灯の光が、床の反射と違う向きへ折れ曲がる

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E04
- **物と変化**: 右上から斜めに下がる長い白色蛍光灯の光の帯が、中ほどで折れ、先の半分が元と違う急な向きへ曲がって伸びる。床の白い反射（E17）は元の向きのまま残るので、光源と反射の向きが食い違う。灯の消失（AR-07-lamp-off など）ではなく、光の向きだけが狂う。
- **box (x1,y1,x2,y2)**: (604,60,676,150)（72x90）
- **最寄り既存 overlay と実測距離**: AR-03-shutter-faded-poster (36.0)、次点 AR-03-sunken-opening-floor (62.0)。新規小物との最寄りは AR-03-ceiling-eye (30.0)。
- **6倍クロップ範囲**: 6倍クロップ (420,20)–(676,191)（256x171）。box は窓内で (1104,240)–(1536,780)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the long bright white fluorescent tube in the upper right (about x=1100 to 1536, y=280 to 740 in the 1536x1024 frame) is bent: its straight diagonal strip kinks at its middle, and the outer half swings up toward the top-right corner at a steeper angle than the original diagonal, like a bent glowing bar, with its glow and the faint halo on the ceiling following the new direction. The ceiling board, the right wall and the shutter below do not change. The bright floor reflection far below is not part of this edit and stays as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the diagonal white fluorescent light at the top right (about x=1100 to 1536, y=280 to 740 in the 1536x1024 frame) changes direction half way along its length: the lower-left half stays as it is, the upper-right half is rotated about 30 degrees upward so that the light strip forms a clear obtuse angle, with a soft glow along both parts. Nothing else in the frame changes, including the shutter, the wall and the ceiling. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the long fluorescent tube light in the upper right corner (x about 1100 to 1536, y about 280 to 740 in the 1536x1024 frame) is bent into a shallow V shape at the middle, its two halves pointing in different directions, the glow and ceiling halo following the shape. Preserve every other pixel, including the right shutter and the wall below. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-tube-light-bent'
    candidate_id: 'AR-03-tube-light-bent'
    camera_id: 'CAM03'
    element_id: 'CAM03-E04'
    base_photo: 'public/images/cam3.webp'
    category: 'environment'
    anomaly_type: 'state_change'
    location: 'CAM03-E04 の右上の蛍光灯、差分左上 (604,60) 付近（貼り込み後に再計測）'
    detail: '右上の長い蛍光灯の光の帯が中ほどで折れ、床の反射と違う向きへ曲がる。'
    overlay: 'assets/anomaly-overlays/cam03/tube-light-bent.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-03-shutter-faded-poster（box 距離 36px。ぼかしで広がるので制作後に再測）。床反射 E17 は元のまま残す（光源の向きと反射がずれる違和感が狙い）。灯は消えない（AR-07-lamp-off・AR-08-panel-off とは別）。'
  ```
- **相互参照 / 重複精査**: 灯が消える型（台帳 AR-07-lamp-off・AR-08-panel-off、プール CR-03-04・CR-03-30）とは別で、本件は灯は点いたまま向きだけ変わる。CAM03 の天井灯の異変は台帳に無い（AR-03-amber-lamp-glow は色）。
- **同カメラ内の排他と併存**: 排他なし（天井の光の変化。床の異変とは別の面）。併存可=床・壁・シャッターの異変。ただし AR-03-ceiling-eye とは box が 30px しか離れないので、同プレイで共存させないほうが読み取りやすい。

### AR-03-ceiling-eye — 天井の暗い隙間から白い目が一つ覗く

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E01
- **物と変化**: 右奥寄りの暗い天井板の一枚が、縦に細く抜けて黒い隙間になり、その奥から人の目が一つだけこちらを見ている（目だけ。顔・まつげ・ほかの部位は無い）。閉店後の地下街の天井裏に誰かがいる。
- **box (x1,y1,x2,y2)**: (548,66,574,120)（26x54）
- **最寄り既存 overlay と実測距離**: AR-03-amber-lamp-glow (33.8)、次点 AR-03-sign-frame-square (59.1)。新規小物との最寄りは AR-03-tube-light-bent (30.0)。
- **6倍クロップ範囲**: 6倍クロップ (420,20)–(676,191)（256x171）。box は窓内で (768,276)–(924,600)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: in the dark ceiling panel (about x=768 to 924, y=276 to 600 in the 1536x1024 frame) one ceiling board is missing, leaving a narrow vertical black gap with straight edges that follow the ceiling perspective. Inside the gap a single open human eye is visible, white sclera and a dark iris, looking straight at the camera, lit very faintly by cold light; only the eye, no face, no eyelashes detail, no other features. Everything else on the ceiling, the light fixtures and the signs stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: a narrow, dark rectangular opening in the ceiling (about x=770 to 920, y=280 to 595 in the 1536x1024 frame), as if a ceiling tile has been slid aside, and a single pale eye with a dark iris peering out of the darkness toward the camera. No face is visible around the eye, just the eye. Do not change anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: a thin vertical slit in the dark ceiling (x about 775 to 915, y about 285 to 590 in the 1536x1024 frame) with a single bloodless-white human eye with a small dark iris looking out of it toward the viewer. The slit is dark with a faint cold rim light on its edges. Only the eye, nothing else changes. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-ceiling-eye'
    candidate_id: 'AR-03-ceiling-eye'
    camera_id: 'CAM03'
    element_id: 'CAM03-E01'
    base_photo: 'public/images/cam3.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM03-E01 の右奥寄りの天井、差分左上 (548,66) 付近（貼り込み後に再計測）'
    detail: '右奥寄りの暗い天井板が縦に細く抜けて黒い隙間になり、そこから白い目が一つだけ覗く。'
    overlay: 'assets/anomaly-overlays/cam03/ceiling-eye.webp'
    # phase / 目立ち度: late / medium
    note: '最寄り既存 overlay は AR-03-amber-lamp-glow（box 距離 34px。ぼかしで広がるので制作後に再測）。新規小物との最寄りは AR-03-tube-light-bent（30px）。目だけで顔・体は描かない。'
  ```
- **相互参照 / 重複精査**: 人の姿の異変（CAM01 AR-01-back-view-paper-bag・CAM05 AR-05-old-woman-in-glass・CAM06 AR-06-worker・CAM08 AR-08-old-man-back）は全身の後ろ姿で、本件は天井から覗く目だけ。CR-03-20（天井の器具から細いリボン）とは別物。台帳・候補に『目』の異変は無い（grep 済み）。
- **同カメラ内の排他と併存**: 排他なし。併存可=床・壁・シャッターの異変。AR-03-tube-light-bent とは box が 30px しか離れないので、同プレイで共存させないほうが読み取りやすい。

### AR-03-dark-tile — 通路中央の床に座布団ほどの暗いタイルが一枚だけ混じる

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 通路の右寄りの床で、タイル一枚（座布団ほどの大きさ）だけが炭のように暗い黒灰色に変わる。穴ではなく平らな面で、目地には揃ったまま、光沢と周りの反射がうっすら残る。
- **box (x1,y1,x2,y2)**: (545,300,615,345)（70x45）
- **最寄り既存 overlay と実測距離**: AR-03-shutter-faded-poster (54.4)、次点 AR-03-sunken-opening-floor (56.0)。新規小物との最寄りは AR-03-floor-line-break (38.0)・AR-03-shutter-raised (33.4)。
- **6倍クロップ範囲**: 6倍クロップ (420,252)–(676,423)（256x171）。box は窓内で (750,288)–(1170,558)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: one floor tile in the marked area (about x=750 to 1170, y=288 to 558 in the 1536x1024 frame) has turned deep charcoal black-grey, about the size of a floor cushion. It is perfectly flat, not a hole, its edges aligned with the tile joints and the perspective, its surface slightly glossy so the soft white reflections of the lights still show faintly across it. The neighbouring tiles, their speckles, joints and reflections stay exactly as they are. Add no object. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: a single floor tile at about x=760 to 1160, y=295 to 550 in the 1536x1024 frame is a much darker slate-black than the grey speckled tiles around it, with crisp edges along the joints and a faint glossy reflection. Flat surface, not a hole, no object on it. Do not change anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: one tile of the grey speckled floor (about x=750 to 1170, y=288 to 558 in the 1536x1024 frame) is replaced by a near-black polished tile of the same size and perspective, aligned with the joints, with a very faint reflection of the ceiling light. The other tiles and everything else are untouched. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-dark-tile'
    candidate_id: 'AR-03-dark-tile'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'object'
    anomaly_type: 'state_change'
    location: 'CAM03-E16 の床右寄り、差分左上 (545,300) 付近（貼り込み後に再計測）'
    detail: '床の右寄りで、タイル一枚だけが炭のように暗い黒灰色に変わる（平らで穴ではない）。'
    overlay: 'assets/anomaly-overlays/cam03/dark-tile.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-03-shutter-faded-poster（box 距離 54px）。新規小物との最寄りは AR-03-shutter-raised（33px）。大面積 AR-03-floor-shadows と排他（同じ床の面。同プレイで共存させない）。AR-03-floor-line-break とも近いので同プレイで共存させない。'
  ```
- **相互参照 / 重複精査**: AR-03-blue-floor-tile（タイルの色が青）・AR-03-tile-diagonal（タイルの向き）とは別の面と色。AR-03-sunken-opening-floor（奥の開口の床が沈む）とは場所も見え方も別。CR-03-xx に暗いタイルの候補は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-floor-shadows / AR-03-floor-line-break（同じ床の面）。併存可=壁・天井・シャッターの異変。

### AR-03-roll-vanish — 壁際の銀白色の巻いた物が消える

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 奥の左壁際の床に斜めに横たわる、銀白色の細い巻物が 2 本（原寸 6 倍で確認: 巻いて束ねた薄いシート状の物。養生マットか巻いたシートに見える。細部は不鮮明）が消え、壁の根元と床だけが続く。すぐ奥の暗い木箱はそのまま残る。
- **box (x1,y1,x2,y2)**: (482,238,508,268)（26x30。幅が狭い）
- **最寄り既存 overlay と実測距離**: AR-03-sign-frame-square (43.0)、次点 AR-03-sunken-opening-floor (44.0)。
- **6倍クロップ範囲**: 6倍クロップ (369,167)–(625,338)（256x171）。box は窓内で (678,426)–(834,606)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Remove only this: the two pale, silvery-white thin rolled sheets (like rolled-up foil mats or rolled paper, lying diagonally side by side) at the foot of the left wall with their small shadow (about x=678 to 834, y=426 to 606 in the 1536x1024 frame). In their place, continue the wall base and the glossy grey floor tiles naturally with their reflections. Keep the dark small crate just behind them, the shop front on the left and everything else exactly as is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Remove only this: the pair of white-silver cylindrical rolled sheets lying on the floor along the wall base, near x=678 to 834, y=426 to 606 in the 1536x1024 frame, including their shadow. Fill with plain floor tiles and the wall skirting in the same perspective and the same soft reflections. Do not change the dark crate, the shop window or any other part of the image. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Remove only this: the light grey rolled bundles at the foot of the wall (x=678 to 834, y=426 to 606 in the 1536x1024 frame) and their soft shadow, restoring the floor-wall corner as a clean continuous surface with faint reflections. Everything else must stay identical, including the dark crate behind them. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-roll-vanish'
    candidate_id: 'AR-03-roll-vanish'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'object'
    anomaly_type: 'remove_object'
    location: 'CAM03-E16 の奥の左壁際の床、差分左上 (482,238) 付近（貼り込み後に再計測）'
    detail: '奥の左壁際の床に斜めに横たわる銀白色の巻いたシートが消え、壁の根元と床だけが続く。'
    overlay: 'assets/anomaly-overlays/cam03/roll-vanish.webp'
    # phase / 目立ち度: early / subtle
    note: '最寄り既存 overlay は AR-03-sign-frame-square（box 距離 43px）。元写真の物は原寸 6 倍で確認済み（銀白色の巻いた細いシート 2 本。木箱の手前）。box 幅 26px と狭い小物の消失で視認性下限が厳しいため、check-visibility を必ず通す（通らなければ取り下げて候補へ戻す）。'
  ```
- **相互参照 / 重複精査**: 台帳に CAM03 の remove_object は無い（remove_object 自体が台帳に AR-06-missing-flower のみ）。CR-03-01〜等の物の向き・複製とは別。
- **同カメラ内の排他と併存**: 排他なし。併存可=床・壁・天井の異変。大面積 AR-03-floor-shadows とは box が 840 px² 重なるが併存可（影は物の接地部で止める）。

### 既存との重複精査（共通）

- 台帳 CAM03 の全 30 件（大面積 2 件を含む）と candidate-pool の CAM03 候補（CR-03-xx と要素の状態・関係の CR-03-28〜42）を、対象要素・変化・見え方で照合した。実質同じものは無い。近いもの（AR-03-tube-light-bent↔CR-03-30/CR-03-04・AR-07-lamp-off・AR-08-panel-off、AR-03-floor-line-break・AR-03-dark-tile↔AR-03-sunken-opening-floor / AR-03-tile-diagonal）は各項に差を書いた。制作前に見比べ、実質同じと判断したら取り下げる。
- 昇格元: AR-03-shutter-raised は CR-03-12（台帳の `candidate_id` は `CR-03-12`。採用時に candidate-pool の CR-03-12 の行を削除する。この節では他の行を編集していない）。それ以外の 7 件の `candidate_id` は見出しの ID。
- 他カメラ・台帳との型の重複を避けた経緯: 初稿の『床の鳩』（鳥は無いが生き物の追加）・『床の穴』・『蛍光灯が消える』・『床の脱ぎ捨てたコート』・『うずくまる人影』は、既存の穴・消灯・服・後ろ姿の型と近いため取り下げ、上の別案に差し替えた。看板の脚が床にめり込む案と木箱の蓋が持ち上がる案は、看板・木箱の周りに既存 overlay（AR-03-sign-glow-blue・AR-03-crate-duplicate・AR-03-slipper-single）が密集して 30px の余白が取れないため、同型（surreal / state_change）の別の場所の案に変えた。

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

- **座標**: すべて baseline px（cam4 は 676x900。`public/images/cam4.webp` を実際に見て、床・壁・天井・物の位置を確認した）。box は `x1,y1,x2,y2`（左上と右下の baseline px。`scripts/composite-anomaly.py --box` と同じ並び。各項の幅x高さは併記）で、作業用の最終値。台帳の `overlay_origin` / `dimensions` は貼り込み後の alpha bbox で再計測して書く。
- **配置の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3`。台帳の `overlay_origin` / `dimensions` から CAM04 の全 29 件の alpha bbox を出し、**各辺 +2px（羽毛ぼかし分）広げた矩形**と box の間のユークリッド距離を測った）: 小物 7 件の box は、既存の**小物**の全 overlay から 30px 以上離れる（各項に最近傍と距離。最小は wall-panel-fallen の 32.0px で、他は 34px 以上）。同カメラの既存の大面積（`AR-04-window-alley` 166,278px² = 右壁、`AR-04-glass-fog-handprints` 103,045px² = 左ガラス）は、小物なら重なってよい。距離は台帳の最終 overlay（alpha bbox）が基準で、制作後の自分の overlay も同じ方法で測り直す。羽毛ぼかしで overlay が広がる分、制作後に alpha bbox で測り直す（距離 32px 以下の項は必須）。台帳は日々増えるので、登録時に同じ測定を出し直し、結果を台帳 note に貼る。
- **内訳（台帳全体の偏り是正）**: 8 件の `anomaly_type` は multiply 1 / add_person 2 / add_creature 1 / state_change 2 / reflection 1 / displace 1。add_object と color_shift は 0 件。
- **共通手順**（小物。制作スキルの手順 5〜8 と同じ）: ① 各項の「6倍クロップ」を `public/images/cam4.webp` から切り出し 1536x1024 へ拡大（webp は PNG に変換してから渡す）。② 明示的な `$imagegen` で各項の 3 テイクを生成して目視で選ぶ（0 バイトや数 KB の壊れた PNG は撮り直し。文字・ロゴ風の刻印が出たテイクは捨てる）。③ 選んだ結果を元のクロップ寸法へ縮小して baseline PNG の同位置へ貼り戻し、その全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。④ 最終 overlay の alpha bbox で既存との距離を測り直す。台帳へ登録し `check-visibility.py` を通す。⑤ 登録・コミットしたら `experiments/` の作業物を即削除する。
- **人・生き物の安全範囲と禁則**: 人は影・後ろ姿・シルエットのみ（顔・肌・指・服の柄は描かない）、生き物は光る目だけ（猫の姿は描かない）。`docs/story.md` に反しない（事件は殺人と断定されていないので、血・遺体・暴力を連想させる描写は避ける。実在の商品名・番組名・人物名は使わない。人の気配は「居なくなった」「通った」止まりで、説明しない）。文字・数字・ロゴ・実在の企業名・店名は全項で描かない（出たテイクは没）。
- **共通プロンプト末尾**（各項のプロンプトに全文を含めてある）: `Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **フェーズ配分**: early 2（wall-plaster-peel / wall-panel-fallen）・mid 3（glass-umbrella-reflection / floor-reflection-gap / left-edge-eyes）・late 3（glass-silhouette / shadow-behind-camera / floor-shoes-rows）。

### 一覧

| 候補ID | 対象ID | 変化 | category / anomaly_type | box (x1,y1,x2,y2) | 最寄り既存と距離（alpha bbox +2px 基準） |
| --- | --- | --- | --- | --- | --- |
| AR-04-glass-silhouette | CAM04-E10 | 奥左のガラス越しの人影 | person / add_person | `(264,296,294,388)` | AR-04-door-gap 34.0px |
| AR-04-shadow-behind-camera | CAM04-E15 | カメラの背後の人の影 | person / add_person | `(176,824,264,900)` | AR-04-hatch-frame-round 34.0px |
| AR-04-glass-umbrella-reflection | CAM04-E14 | 右の黒いガラスにだけ映る傘 | surreal / reflection | `(482,402,542,486)` | AR-04-red-lantern 34.0px |
| AR-04-wall-plaster-peel | CAM04-E14 | 漆喰壁の剥落 | environment / state_change | `(625,120,676,220)` | AR-04-red-lantern 36.1px |
| AR-04-floor-reflection-gap | CAM04-E17 | 白い反射の中の一枚だけ映らないタイル | environment / state_change | `(256,571,344,621)` | AR-04-orange-tile 36.0px |
| AR-04-wall-panel-fallen | CAM04-E14 | 腰壁の板が外れて倒れかかる | object / displace | `(500,520,560,605)` | AR-04-puddle 32.0px |
| AR-04-left-edge-eyes | CAM04-E18 | 左端の暗がりに光る目 | surreal / add_creature | `(0,630,50,692)` | AR-04-randoseru-red 34.0px |
| AR-04-floor-shoes-rows（大面積） | CAM04-E15 | 床の通路帯に整然と並ぶ無人の靴 | object / multiply | `(202,380,458,900)` = 実面積 127,515 px²（画像の 21.0%） | 大面積どうしの距離 3px・4px（window-alley / glass-fog。重ならない） |

### AR-04-glass-silhouette — 奥左のガラス越しの人影

- **カメラ / 対象**: CAM04 / CAM04-E10（物の説明・座標はインベントリが正本）
- **物と変化**: 奥正面の扉の左隣にある淡い緑灰色のガラス面（E10 の左パネル）の向こうに、こちらへ背を向けて立つ大人の黒い影が一人現れる（顔・服の柄なし。ガラス越しなので輪郭はやや柔らかい）。影が足を乗せる床は写真のまま。人は影のみ。顔・肌・服の柄は描かない。扉や取手には触れない。
- **box (x1,y1,x2,y2)**: `(264,296,294,388)`（30x92。ガラスパネル x 264〜298 の左寄りに収め、右側の扉との距離を取る）。
- **最寄り既存 overlay と実測距離**: AR-04-door-gap 34.0px、次点 AR-04-handle 49.0px（台帳 overlay の alpha bbox を各辺 +2px した矩形との距離・2026-11-05 実測）。
- **6倍クロップ**: `(153,256)–(409,427)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 666〜846 / y 240〜792（縦長の淡いパネルの中））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Inside the pale grey-green glass panel just left of the double door at the far end of the corridor (about x 666-846, y 240-792 of this frame), add one adult person seen from behind as a soft dark silhouette standing still and facing away from the camera, head and shoulders and long coat shape only, as if behind frosted glass. No face, no skin, no clothing pattern, no hands visible. The silhouette is dark navy-black with slightly blurred edges and fills the panel height about 90 percent. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Behind the pale glass panel to the left of the far double door (x 666-846, y 240-792 of this frame), add a single standing human silhouette, back turned, arms hanging, wearing a plain dark hat and long overcoat, rendered as a flat dark shape with softly blurred outline as seen through frosted glass. No facial features, no pattern. It stands still, centred in the panel. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). In the glass panel left of the far door (x 666-846, y 240-792 of this frame), add a tall thin dark human shape standing very still with its back to us, shoulders slightly rounded, outline softened by the glass; slightly stronger contrast than the surroundings so it reads clearly even in the dim light. No face, no details, no light of its own. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-glass-silhouette` / `element_id: CAM04-E10` / `category: person` / `anomaly_type: add_person` / `location: 'CAM04-E10 の周辺（奥の両開き扉の左隣のガラスパネル）、差分左上 (264,296) px'` / `detail: '奥の扉の左隣のガラス越しに、こちらに背を向けて立つ黒い人影が一人現れる(影のみ・顔なし)'` / `phase: late` / `subtlety: 'medium'` / `candidate_id: 'AR-04-glass-silhouette'` / `note: 最近傍の既存 AR-04-door-gap 34px（alpha bbox +2px 基準）。CR-04-11（左ガラス店先の「反射」に映る人影・pool 内）とは、映る物が反射か実体の向こうか・位置（左手前の店先と奥の扉脇）が違う。CR-01-06（CAM01 の小さすぎる人影）とは別カメラ。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: CR-04-11 は左の店先ガラスの反射内で、人影が「映っているだけ」。本案は奥の扉脇のガラスの向こうに立つ。差は位置・見え方（反射か透過か）で別異変として残す（ただし同プレイで両方は出さない運用が望ましい。台帳 note に併記）。AR-04-door-gap / AR-04-handle と距離 30px 以上（34px）で、扉本体には触れない。

### AR-04-shadow-behind-camera — カメラの背後の人の影

- **カメラ / 対象**: CAM04 / CAM04-E15（物の説明・座標はインベントリが正本）
- **物と変化**: 手前の床の下端に、カメラの真後ろに誰かが立っているかのような、頭と肩の長い影だけが画面の下から伸びて落ちる（人は写らない。影のみ）。影だけ。人体・顔・手足は描かない。床タイルの目地と反射は保つ。
- **box (x1,y1,x2,y2)**: `(176,824,264,900)`（88x76。画面下端に接する）。
- **最寄り既存 overlay と実測距離**: AR-04-hatch-frame-round 34.0px、次点 AR-04-earbud-single 35.0px（台帳 overlay の alpha bbox を各辺 +2px した矩形との距離・2026-11-05 実測）。
- **6倍クロップ**: `(92,729)–(348,900)`（256x171 を 1536x1024 へ拡大。影は crop 内 x 504〜1032 / y 570〜1024（画面下端から立ち上がる））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the floor at the very bottom of this frame (x 504-1032, y 570-1024), add a dark soft shadow of a person's head and shoulders, as if someone is standing right behind the camera and the shadow falls forward onto the floor tiles, running off the bottom edge of the frame. Only the shadow is visible; no person, no face, no limbs. The shadow is elongated along the floor perspective, soft-edged, about 60 percent darker than the tiles, and follows the tile joints naturally. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). At the bottom of the frame on the grey floor tiles (x 504-1032, y 570-1024), add the long soft shadow of a standing person cast forward from behind the camera: a rounded head shape on a broad shoulder shape, widening toward the bottom edge. Shadow only, no body, no face. Dark blue-black, soft penumbra, tile joints still visible through it. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Cast onto the floor at the lower middle of this frame (x 504-1032, y 570-1024) the shadow of a person with slightly bowed head standing just behind the viewpoint, extending upward from the bottom edge of the frame. Only a flat dark head-and-shoulders shadow; absolutely no person, no face, no details. Keep the white floor reflection to its right unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-shadow-behind-camera` / `element_id: CAM04-E15` / `category: person` / `anomaly_type: add_person` / `location: 'CAM04-E15 の周辺（手前左の床の下端）、差分左上 (176,824) px'` / `detail: '手前の床の下端に、カメラの背後に立つ人の頭と肩の影だけが落ちる(人は写らない)'` / `phase: late` / `subtlety: 'medium'` / `candidate_id: 'AR-04-shadow-behind-camera'` / `note: 最近傍の既存 AR-04-hatch-frame-round 34px / AR-04-earbud-single 35px（alpha bbox +2px 基準）。影のみで人は描かない。AR-04-floor-shoes-rows（大面積）の床と box が重なるため同プレイで共存させない。要つまみ調整ではなく標準でも見える暗さに作る。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: 既存の床の人影系（CAM02 床の足跡・CAM06 濡れた足跡）は「通った跡」で、本案は「今そこにいる者の影」。CR-04-11 とは見え方が違う（反射か床の影か）。stock 表の「shadow appears」の CAM04 具体化。

### AR-04-glass-umbrella-reflection — 右の黒いガラスにだけ映る傘

- **カメラ / 対象**: CAM04 / CAM04-E14（物の説明・座標はインベントリが正本）
- **物と変化**: 右の黒い店舗ガラスの、通路が映り込む面に、通路にも壁にも無い黒い洋傘が一本、先を下にして真っすぐ立っているように映る（反射像だけ。傘の実物も持ち主も、どこにも無い）。無地の黒で、石突きと柄だけが冷たい白でわずかに光る。手・人・顔は描かない。ガラスの枠と他の反射は触らない。
- **box (x1,y1,x2,y2)**: `(482,402,542,486)`（60x84 = 5,040 px²）。
- **最寄り既存 overlay と実測距離**: AR-04-tin-robot 38.0px、次点 AR-04-red-lantern 34.0px（台帳 overlay の alpha bbox を各辺 +2px した矩形との距離・2026-11-05 実測）。AR-04-wall-panel-fallen（本節の box y1=520）とは y 方向に 34px。
- **6倍クロップ**: `(420,350)–(676,521)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 372〜732 / y 312〜816（右の黒いガラス窓の中程））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Inside the black storefront glass window on the right side of the frame (x 372-732, y 312-816), where the corridor is faintly mirrored, add the reflection of one plain black closed umbrella standing upright with its tip on the floor and its curved handle at the top, reflected only in the glass. There is no umbrella anywhere in the corridor itself. Solid black canopy folded shut, thin cool-white glint on the metal tip and the handle. No hand, no person, no text. The window frame and the other reflections stay unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). In the dark glass of the right-hand shop window (x 372-732, y 312-816) add one reflected black umbrella leaning slightly against an unseen wall, folded, hooked handle upward, seen only as a mirror image in the glass with the same softness as the other reflections. Nothing in the real corridor casts it. No hand, no person, no markings. The rest of the glass and the frame are unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Reflected in the black window glass on the right (x 372-732, y 312-816) show a single opened black umbrella resting upside down on the floor like a bowl, visible only as a faint mirror image with a pale rim light on its ribs; the real floor in front of the window is empty. No hand, no person, no text, no logo. Frame and other reflections unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: 'AR-04-glass-umbrella-reflection'` / `element_id: 'CAM04-E14'` / `category: 'surreal'` / `anomaly_type: 'reflection'` / `location: 'CAM04-E14 の周辺、差分左上 (482,402) px'` / `detail: '右の黒い店舗ガラスにだけ、通路にはない黒い傘が立って映る'` / `phase: mid` / `subtlety: 'medium'` / `candidate_id: 'AR-04-glass-umbrella-reflection'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: CR-04-17（店舗ガラスに傘だけが映る・pool 内）を昇格する案。登録時にその行を pool から削除する。AR-02-shutter-shadow は人影の反射で、本案は物の反射（別の物・別カメラ）。CAM04 の既存に反射系の異変はなく、AR-04-window-alley（右壁一面が窓）とは同じ壁面のため排他。AR-04-hatch-reflection-extra は床の点検口の反射で別物。

### AR-04-wall-plaster-peel — 漆喰壁の剥落

- **カメラ / 対象**: CAM04 / CAM04-E14（物の説明・座標はインベントリが正本）
- **物と変化**: 右の漆喰壁（右端の黒い柱の右側）の一角が、手のひら大〜座布団大に剥がれ落ち、下から古い赤茶色のレンガ下地が四角く覗く。剥がれた漆喰の屑が壁際にわずかに落ちている。剥落面は不揃いな縁。レンガに文字・刻印なし。壁の他の部分と黒い柱は触らない。
- **box (x1,y1,x2,y2)**: `(625,120,676,220)`（51x100。画面右端に接する）。
- **最寄り既存 overlay と実測距離**: AR-04-red-lantern 36.1px、次点 AR-04-ceiling-balloon 77.0px（台帳 overlay の alpha bbox を各辺 +2px した矩形との距離・2026-11-05 実測）。
- **6倍クロップ**: `(420,84)–(676,255)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 1230〜1536 / y 216〜816（画面右端に接する））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the rough pale plaster wall at the right edge of the frame, to the right of the vertical black pillar (x 1230-1536, y 216-816), show one irregular patch of plaster fallen off, exposing an old reddish-brown brick underlayer in a rough rectangle with jagged cracked edges. A few plaster crumbs lie at the bottom of the patch. The brick shows plain mortar lines and no marks or letters. The rest of the wall and the black pillar are unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the textured plaster wall at the right side of the frame (x 1230-1536, y 216-816), the plaster has peeled away in a ragged oval about the size of a cushion, revealing dark grey concrete and a few old orange bricks beneath, with curled plaster flakes hanging at the edge. No marks, no writing. Do not alter anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). In the right-hand plaster wall (x 1230-1536, y 216-816) a rectangular chunk has broken away, revealing coarse old brick work in muted red-brown with grey mortar, edges chipped and uneven, fine white dust at the lower edge. No letters or stamps on the bricks. Everything else identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-wall-plaster-peel` / `element_id: CAM04-E14` / `category: environment` / `anomaly_type: state_change` / `location: 'CAM04-E14 の周辺（右端の漆喰壁の上部）、差分左上 (625,120) px'` / `detail: '右の漆喰壁の一角が剥がれ落ち、下から古いレンガ下地が四角く覗く'` / `phase: early` / `subtlety: 'medium'` / `candidate_id: 'AR-04-wall-plaster-peel'` / `note: 最近傍 AR-04-red-lantern 36px（alpha bbox +2px 基準）。右壁一面の大面積 AR-04-window-alley と box が重なる（大面積の例外。同プレイで共存させない＝壁面を覆うため排他）。AR-04-tote-bag（右端壁フック）とは 250px 以上離れる。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: AR-08-notice-residue（CAM08 の貼り紙の剥がし跡）は紙の跡で別カメラ・別物。本案は壁材そのものの剥落で下地が見える。AR-04-window-alley（右壁一面が窓）とは同じ壁面のため排他。

### AR-04-floor-reflection-gap — 白い反射の中の一枚だけ映らないタイル

- **カメラ / 対象**: CAM04 / CAM04-E17（物の説明・座標はインベントリが正本）
- **物と変化**: 床中央の縦長の強い白い反射だまりの中で、タイル一枚ぶんの四角形だけ反射が映らず、反射が乗る前の素の暗い灰色のタイルに見える。そこだけ光が途切れている。穴・凹み・物ではない。目地とタイルの縁は保つ。周囲のタイルの反射は変えない。
- **box (x1,y1,x2,y2)**: `(256,571,344,621)`（88x50 = 4,400 px²）。
- **最寄り既存 overlay と実測距離**: AR-04-hatch-reflection-extra 36.0px、次点 AR-04-hatch-frame-round 37.0px / AR-04-orange-tile 36.0px（台帳 overlay の alpha bbox を各辺 +2px した矩形との距離・2026-11-05 実測）。
- **6倍クロップ**: `(172,510)–(428,681)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 504〜1032 / y 366〜666）。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Within the bright vertical white glare on the floor in the middle of this frame, make exactly one floor tile (x 504-1032, y 366-666) lose the reflection: that single tile-shaped rectangle in perspective shows plain matt dark-grey stone with no glare, as if the light simply does not reach it, while every neighbouring tile keeps its white reflection. Tile joints and edges stay straight and unchanged; it is not a hole and has no depth. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the white glare patch on the floor (x 504-1032, y 366-666), one tile is unlit: a clean rectangle the size of a single tile in perspective, uniformly dim blue-grey without any highlight, sharply bounded by the joints, surrounded by glossy glare-lit tiles. No hole, no object, no change to the other tiles. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Inside the strong reflection on the floor tiles (x 504-1032, y 366-666) erase the glare from just one tile so that it appears as dull dark grey stone, slightly darker than the ordinary floor tone, with the glare edge cut exactly along the joints. The neighbouring reflected tiles remain bright. Nothing else changes. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: 'AR-04-floor-reflection-gap'` / `element_id: 'CAM04-E17'` / `category: 'environment'` / `anomaly_type: 'state_change'` / `location: 'CAM04-E17 の周辺、差分左上 (256,571) px'` / `detail: '床中央の白い反射の中で、タイル一枚ぶんだけ反射が途切れて暗い灰色の素のタイルになる'` / `phase: mid` / `subtlety: 'medium'` / `candidate_id: 'AR-04-floor-reflection-gap'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: CR-04-14（床タイルに花模様）は模様の追加、AR-04-orange-tile は色変化、AR-04-hatch-reflection-extra は点検口の反射の増加で、いずれも別物（本案は「あるはずの反射が一枚だけ無い」）。床の大面積 AR-04-floor-shoes-rows と box が重なるため同プレイで共存させない。

### AR-04-wall-panel-fallen — 腰壁の板が外れて倒れかかる

- **カメラ / 対象**: CAM04 / CAM04-E14（物の説明・座標はインベントリが正本）
- **物と変化**: 右の黒いガラス窓の下にあるクリーム色の腰壁の一枚が、上辺だけ外れて床へ斜めに倒れかかり、壁の下地の暗い隙間が覗く。板に文字・マークなし。壁の他の板と窓枠は触らない。
- **box (x1,y1,x2,y2)**: `(500,520,560,605)`（60x85）。
- **最寄り既存 overlay と実測距離**: AR-04-puddle 32.0px、次点 AR-04-tote-bag 38.0px（台帳 overlay の alpha bbox を各辺 +2px した矩形との距離・2026-11-05 実測。32px 以下のため制作後に必ず測り直す）。
- **6倍クロップ**: `(402,477)–(658,648)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 588〜948 / y 258〜768（クリーム色の腰壁部分））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). On the lower cream-coloured wall panel beneath the dark glass window on the right (x 588-948, y 258-768), show one wall panel pulled away at its top edge and leaning diagonally outward onto the floor, exposing a dark gap behind it. The panel keeps the same cream colour and surface as its neighbours and casts a small contact shadow on the floor. No marks, no letters. Windows, frames and other panels unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). The cream wall skirting panel under the right-hand window (x 588-948, y 258-768) has come loose: its upper edge tilts away from the wall toward the camera, bottom edge still on the floor, a black gap and a few dust motes visible behind. Same colour and texture as neighbours. Nothing else changed. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). One cream wall-base panel under the dark window on the right (x 588-948, y 258-768) is displaced, tipping away from the wall about 30 degrees, wedged against the floor; a thin dark opening behind it. Matching material, small contact shadow. No text. Rest of the wall identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-wall-panel-fallen` / `element_id: CAM04-E14` / `category: object` / `anomaly_type: displace` / `location: 'CAM04-E14 の周辺（右の窓下のクリーム色の腰壁）、差分左上 (500,520) px'` / `detail: '右の窓の下のクリーム色の腰壁の板が一枚、上辺が外れて床へ斜めに倒れかかる'` / `phase: early` / `subtlety: 'medium'` / `candidate_id: 'AR-04-wall-panel-fallen'` / `note: 最近傍 AR-04-puddle 32px / AR-04-tote-bag 38px（alpha bbox +2px 基準）。右壁の大面積 AR-04-window-alley と box が重なる（大面積の例外・排他）。腰壁の位置は6倍クロップで確認して box を微調整（要原寸確認）。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: 既存に壁パネル・幅木の異変はない（grep で「巾木・腰壁・幅木」ゼロ）。AR-04-wall-plaster-peel は漆喰の剥落で、本案は板の位置のズレ。同じ右壁でも面が違う（上部と腰壁）が、AR-04-window-alley とは排他。

### AR-04-left-edge-eyes — 左端の暗がりに光る目

- **カメラ / 対象**: CAM04 / CAM04-E18（物の説明・座標はインベントリが正本）
- **物と変化**: 左端の床際の黒い縦枠の影の中に、床すれすれの高さで、小さな二つの目が淡い白黄色に光って見える（正体は写らず、輪郭は闇に溶けている）。目の周りの体・顔は描かない。目だけ。瞳孔のみの無表情な光点。
- **box (x1,y1,x2,y2)**: `(0,630,50,692)`（50x62。画面左端に接する）。
- **最寄り既存 overlay と実測距離**: AR-04-randoseru-red 34.0px、次点 AR-04-orange-tile 35.0px（台帳 overlay の alpha bbox を各辺 +2px した矩形との距離・2026-11-05 実測）。
- **6倍クロップ**: `(0,578)–(256,749)`（256x171 を 1536x1024 へ拡大。物は crop 内 x 0〜300 / y 312〜684（画面左端、暗い床際））。
- **生成プロンプト（3 テイク）**: 3 テイクは表現を振った別案。目視で選ぶ。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). In the darkest shadow at the left edge of the frame near the floor, under the black vertical storefront frame (x 0-300, y 312-684), add exactly two small round eyes glowing pale yellow-white, side by side, close to the floor level, with a faint soft halo. Nothing else of the creature is visible: no head, no body, no outline, only the two glowing points swallowed by darkness. The eyes are about 20 px wide in this enlarged frame with a 60 px halo. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). In the black shadow at the far left edge near the floor (x 0-300, y 312-684), add two pale white-yellow glowing eyes, slightly oval, horizontally paired with a gap between them, giving a faint glow on the nearby floor tile. Only the eyes; no creature, no face, no shape. Do not change the frame or the floor. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, enlarged crop). Add two dim cold white eyes glowing from the dark gap at the base of the left storefront frame (x 0-300, y 312-684), low to the ground, round and unblinking, with a very faint bloom. The rest of the shadow stays pure black with no creature shape. No text, no logo. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-left-edge-eyes` / `element_id: CAM04-E18` / `category: surreal` / `anomaly_type: add_creature` / `location: 'CAM04-E18 の周辺（左端の床際の黒い縦枠の影）、差分左上 (0,630) px'` / `detail: '左端の暗がりの床際に、正体の見えない小さな二つの目だけが光る'` / `phase: mid` / `subtlety: 'subtle'` / `candidate_id: 'AR-04-left-edge-eyes'` / `note: 最近傍 AR-04-randoseru-red 34px / AR-04-orange-tile 35px（alpha bbox +2px 基準）。左ガラスの大面積 AR-04-glass-fog-handprints と box が重なる（大面積の例外）。目は面積が小さいのでプロンプトで光点とにじみを約2.5倍に誇張し、check-visibility.py を必ず通す（下回れば halo を広げる）。`
- **相互参照・重複精査**（制作スキル「追加前の類似チェック」。台帳と candidate-pool を CAM04 だけでなく全カメラで照合）: 本案は正体が写らない目だけ。CR-04-23（扉の前に猫が座る・pool 内）は猫そのものが見える別案で、見え方が違う。台帳の猫（AR-02-cat / AR-08-cat / AR-07-stairs-cat ほか）は別カメラ。左下端の既存 AR-04-randoseru-red・AR-04-orange-tile とは 30px 以上（34px・35px）離れる。

### AR-04-floor-shoes-rows — 床の通路帯に整然と並ぶ無人の靴（大面積）

- **カメラ / 対象**: CAM04 / CAM04-E15（灰白色の床タイル。物の説明・座標はインベントリが正本）
- **物と変化**: 手前〜中景の床の中央帯（x 202〜458）一面に、持ち主のいない靴が左右対で整然と並び、全てのつま先が奥の扉に向く。革靴・草履・下駄・子供の運動靴・白い室内履きが混じる（全て無地・無刻印）。行ごとに遠近で小さくなり、床タイルは靴の間に見える。不気味さの狙いは、持ち主だけが消えた「昭和の玄関」の気配。靴が履かれた形跡はなく、全員が同じ方向（奥の扉）へ向かって脱いだように見える（`docs/story.md` の行方不明・「帰らない」の記憶と整合。説明はしない）。
- **box (x1,y1,x2,y2)**: `(202,380,458,900)` = 256x520 = 133,120 px²。**cutout の実面積（下のポリゴンを 676x900 に塗って実測）は 127,515 px²（画像 608,400px² の 21.0%。1/8 = 76,050px² の 1.68 倍）、alpha bbox は (202,382)–(459,900) = 257x518 = 133,126 px²**。左右の端を x=202 / x=458 で打ち切るのは、同カメラの大面積 AR-04-glass-fog-handprints（x13〜198）・AR-04-window-alley（x462〜676）と**重ねない**ため（bbox 同士の距離 4px・3px。各辺 +2px で拡張しても 2px・1px で離れる）。alpha bbox が 1/8 を割ったら登録しない（靴の列を奥側 y≈430 まで伸ばして作り直す）。
- **面のポリゴン（cutout 用）**: 床の台形を x=202〜458 で切る。遠端 `(272,382)(400,382)`、右は右の腰壁際の床縁に沿って `(458,455)`、下端 `(458,900)(202,900)`、左は左の店先の床縁に沿って `(202,480)`。接地線・巾木・枠・点検口の縁を止める線にする（点検口の上にも靴を置いてよい）。
- **最寄り既存 overlay と実測距離**: 大面積どうし = AR-04-window-alley 3px / AR-04-glass-fog-handprints 4px（alpha bbox を +2px 拡張しても重ならない）。小物は大面積の例外で重なってよいが、**床を覆い隠す小物は排他**（同プレイで共存させない）: AR-04-puddle / AR-04-tin-robot / AR-04-newspaper / AR-04-earbud-single / AR-04-hatch-frame-round / AR-04-hatch-reflection-extra / AR-04-paper-cup / AR-04-orange-tile、および本節の AR-04-floor-reflection-gap / AR-04-shadow-behind-camera。AR-04-door-gap（box 重なり 5px）・AR-04-pot-duplicate（y 450 まで）は面が違うので共存可。台帳 note に「同プレイで共存させない」と書く。
- **3:2 の窓**: cam4 は 676x900。全幅 676 × 高さ 450 の窓 2 枚。`composite-polygon.py crop --base public/images/cam4.webp --crop 0,370,676,820 --out <PNG>`（窓 A: y370〜820。box 上端 380 に 10px の余裕。A が担うのは y370〜820、y820〜900 は B だけが担う）→ 生成 → `restore --base public/images/cam4.webp --gen <A> --crop 0,370,676,820 --out <全画面>`。続いて `crop --crop 0,450,676,900`（窓 B。重なり 370px）→ 生成（B の入力は A を貼り戻した全画面から切る。依存する絵は直列）→ `restore --base <A 貼り戻し済み> --gen <B> --crop 0,450,676,900 --blend-px 100 --blend-edges t --out <全画面>`。**継ぎ目**: A と B は y450〜820 の 370px が重なり、B の上端 100px（y450〜550）は A の貼り戻し結果から B へ滑らかに混ぜる（`--blend-edges t` = 上辺だけ）。y550 より下は B、y450 より上は A だけで、靴の列は境目（y≈450〜550）をまたいで続く。貼り戻し後に y450〜550 を拡大し、列が途切れる・二重になる・靴の向きがずれるなら B を撮り直す（blend-px を増やして誤魔化さない）。縮尺は 1536/676 = 約 2.27 倍で、プロンプトの x 459〜1041 は box x 202〜458 に当たる。最後に `cutout --base public/images/cam4.webp --gen <全画面> --polygon <上の面のポリゴン> --feather 2 --out assets/anomaly-overlays/cam04/floor-shoes-rows.webp`。
- **生成プロンプト（3 テイク。窓 A・B とも同じプロンプトを使う）**: 窓 B では「すでに靴が並んでいる上半分と同じ列・同じ種類で、下へ自然に続ける」を 1 文足す。
  - テイク1: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, wide 3:2 window of the floor). Keep the corridor walls, glass storefronts, ceiling, lights, floor tile joints and the square floor hatch exactly unchanged. Add the shoes only on the floor inside the central lane between x 459 and x 1041 of this 1536-wide frame (a lane about 38 percent of the width), following the tile perspective so each row gets smaller toward the far glass door. Fill the lane with dense neat rows of empty unattended shoes, left and right of each pair aligned side by side, every toe pointing toward the far door at the end of the corridor: plain brown leather shoes, straw zori sandals, wooden geta, small children's canvas sneakers and plain white indoor slippers mixed together. About 4 cm of floor tile is visible between pairs. All shoes completely plain with no logos, no marks, no letters, no soles patterns. Each pair casts a small dark contact shadow and picks up the cool reflection of the ceiling lamps. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, wide 3:2 window of the floor). Keep the corridor walls, glass storefronts, ceiling, lights, floor tile joints and the square floor hatch exactly unchanged. Add the shoes only on the floor inside the central lane between x 459 and x 1041 of this 1536-wide frame (a lane about 38 percent of the width), following the tile perspective so each row gets smaller toward the far glass door. Arrange the shoes in two long straight columns of paired shoes running down the lane along the tile joints, with a one-tile-wide gap between the columns, toes all pointing toward the far door. Mix old leather shoes, straw zori, wooden geta and small children's sneakers; very neat and orderly, as if lined up at a school entrance. Everything plain: no logos, no markings, no text. Soft contact shadows and light reflections on the glossy tiles. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image (a low-fi CCTV photo of a Showa-era underground shopping arcade corridor, wide 3:2 window of the floor). Keep the corridor walls, glass storefronts, ceiling, lights, floor tile joints and the square floor hatch exactly unchanged. Add the shoes only on the floor inside the central lane between x 459 and x 1041 of this 1536-wide frame (a lane about 38 percent of the width), following the tile perspective so each row gets smaller toward the far glass door. Cover the lane with several dozen empty pairs of shoes in staggered rows (like a shoe shelf laid on the floor), every pair facing the far door, sizes ranging from tiny children's shoes to large men's leather shoes and flat straw sandals; the nearest rows large and sharp, the farthest rows small and dim. Completely plain and unmarked, no text, no logos. Subtle contact shadows, no motion blur. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. Change nothing outside the described area. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**: `id: AR-04-floor-shoes-rows` / `element_id: CAM04-E15` / `category: object` / `anomaly_type: multiply` / `location: 'CAM04-E15 の周辺（床の中央帯）、差分左上 (202,382) px'` / `detail: '手前〜中景の床の中央帯一面に、持ち主のいない靴が左右対で整然と並び、全てのつま先が奥の扉に向く(革靴・草履・下駄・子供の運動靴・白い室内履き。無地)'` / `phase: late` / `subtlety: 'obvious'` / `candidate_id: 'AR-04-floor-shoes-rows'` / `note: 大面積。alpha bbox (202,382)–(459,900)、実面積 127,515 px²（画像比 21.0%）。同カメラの大面積 AR-04-window-alley・AR-04-glass-fog-handprints と重ならない（距離 3px・4px）。排他（同プレイで共存させない）: 床を覆う小物 AR-04-puddle ほか（上記）と、AR-04-floor-reflection-gap / AR-04-shadow-behind-camera。登録時に box 重なり表を機械出力して貼る。`
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

## 制作仕様（未制作）— CAM 06

CAM06（Shop Front Row）の画像異変 7 件の**制作仕様**（#47。台帳の偏り是正が目的）。物・変化・配置（box／polygon）・生成プロンプトまで確定済みで、まだ生成していない。採用して制作に進む時は、その項を削除して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。ここの box は作業用の最終値で、台帳には最終 overlay の alpha bbox から出た `overlay_origin` / `dimensions` を入れる。

| ID | タイプ | カテゴリ | 規模 | 変化 |
| --- | --- | --- | --- | --- |
| AR-06-floor-tile-rotated | state_change | surreal | 大面積（床一面） | 前景の床一面のタイルが全部同じ向きに45度回り、目地が斜めのひし形の格子になる |
| AR-06-door-gap-light | state_change | environment | 小物 | 右の扉の下の隙間から暖かい橙色の光が漏れる |
| AR-06-floor-light-slant | state_change | environment | 小物 | 床の中ほど左に、右の反射帯と逆向きに斜めへ傾く白い光の帯が一本映る |
| AR-06-wall-gecko | add_creature | object | 小物 | 右の粗い壁にヤモリが一匹張り付く |
| AR-06-tile-sky | surreal | surreal | 小物 | 床タイル1枚が抜けて青空が見える |
| AR-06-leaf-shadows-aligned | state_change | object | 小物 | 前景左下の床の植物の影が、全部同じ一方向へ平行に揃う |
| AR-06-wall-height-marks | add_object | object | 小物 | 右壁に子供の背比べのような色鉛筆の横線が刻まれる |

- **配分**: 7件中 add_object は1件（AR-06-wall-height-marks）、add_person・multiply・color_shift・reflection は0件（台帳の偏り是正）。state_change が4件（AR-06-floor-tile-rotated・AR-06-door-gap-light・AR-06-floor-light-slant・AR-06-leaf-shadows-aligned）、surreal・add_creature・add_object が各1件。大面積は1件（AR-06-floor-tile-rotated）。
- **配置の実測**（2026-11-05）: 小物の box は、`anomalies.yaml` の CAM06 全 overlay の**実際の alpha bbox**（overlay 画像の alpha>0 の範囲）から**矩形間距離 30px 以上**あることを `uv run --with pyyaml --with numpy --with pillow python3` で実測した（README「配置の基準」）。本節の小物どうしも 30px 以上。実測は各 box を各辺 +2px した矩形（最終 overlay の alpha bbox の見込み）で行い、すべて 31.0px 以上の余裕を持たせた（最小は AR-06-floor-light-slant と AR-06-tile-sky の相互 31.0px、AR-06-tile-sky と AR-06-umbrella の 31.1px。ちょうど 30.0px の組は残していない）。台帳には最終 alpha bbox で測り直した値を書く。AR-06-tile-sky は距離を確保するため旧案の (300,515,366,580) から (294,524,360,589) へ動かした。既存の大面積（AR-06-wall-puddle・AR-06-ceiling-umbrellas・AR-06-wall-same-poster）は小物の距離計算から除いた（大面積とは重なってよい）。
- **大面積の重なり**: 本節の大面積は AR-06-floor-tile-rotated の1件のみ（polygon 面積 129,519 px²、bbox 149,640 px²）。既存の大面積とは面が違う（天井一面・右壁一面・床の中ほど y432-634 に対し、本案は前景の床 y≥668 で 34px 空ける）。ただし bbox は AR-06-wall-same-poster の bbox と 20,735 px² 重なる（本案 (0,668,645,900) と poster (500,40,672,811) の交差。床と壁で面は違うが大面積どうしなので排他と明記する）。小物（AR-06-wet-footprints・AR-06-red-bucket・AR-06-styrofoam-box と本節の AR-06-leaf-shadows-aligned）とは重なるが、ゲームは1カメラにつき未検出の異変を同時に1件しか出さない（`spawnAnomaly`）ので、台帳 note に「大面積」「同プレイで共存させない」と書く。
- **共通手順**（小物。`.agents/skills/corona-road-anomaly/SKILL.md` の手順 5〜8 と同じ）:
  1. 各項の「6倍クロップ」を `public/images/cam6.webp`（675x900）から切り出し、1536x1024 へ拡大する（webp は PNG に変換してから渡す）。
  2. 明示的な `$imagegen` で各項のプロンプトを3テイク生成し、目視で選ぶ。0バイトや数KBの壊れた PNG は撮り直す。文字・ロゴらしき刻印が出たテイクは捨てる。
  3. 選んだ結果を元のクロップ寸法へ縮小して baseline PNG の同じ位置へ貼り戻し、その全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。
  4. 最終 overlay の alpha bbox で既存との距離を測り直す。台帳へ登録し `check-visibility.py` を通す。通らなければ強めて作り直すか、この節へ戻す。
  5. 登録・コミットしたら `experiments/` 配下の作業物を即削除する。
- **大面積の手順**: 後述の AR-06-floor-tile-rotated を参照（`scripts/composite-polygon.py` の `crop` → imagegen → `restore` → `cutout`）。

### AR-06-floor-tile-rotated — 前景の床一面のタイルが全部45度回って市松の向きが変わる（大面積）

- **camera / element_id**: CAM06 / CAM06-E16
- **物と変化**: 前景の床（灰色の正方形タイル面）の一面で、タイルが全部同じ向きに45度回り、目地が通路の奥行き方向ではなく斜め（ひし形の格子）に走る。タイルの色・質感・大きさ・光の当たり方は元のまま。何も置かず、足すものもない（床の「向き」だけが一面で変わる state_change。物や人は一切写さない）
- **面**（baseline px。polygon）: `165,668 585,668 645,900 0,900 0,750 156,750`（床の前景。左は観葉植物の鉢 AR-06-tin-planter の下端 y743 を避けて y750 から、右は壁の巾木の線、奥は y668）。実測（2026-11-05、shoelace）: polygon 面積 129,519 px²（画像 607,500 px² の 21.3%）、polygon の bbox 645x232=149,640 px²。どちらも大面積の目安（約90,000 px² 以上、README の基準）を満たす。`composite-polygon.py cutout --polygon` にこの値を渡す
- **3:2 窓**（baseline px）: `0,450,675,900`（675x450 ちょうど3:2。1536x1024 へ拡大して imagegen に渡し、`restore --crop 0,450,675,900` で貼り戻す。1窓で足りる）
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 3:2 (1536x1024) crop of a low-fi surveillance camera photo showing the lower half of a shop corridor. Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every wall, plant, shop front, shadow and the long white fluorescent reflection band exactly unchanged. Make ONLY this single change: rotate the whole grid of grey granite floor tiles in the near part of the frame (the floor in the lower 55% of the image, from the bottom edge up to roughly the middle) by 45 degrees, so that every tile becomes a diamond and all the joint lines run diagonally instead of along the corridor, with the same perspective convergence, the same tile size, the same granite speckle, the same grey colour and the same lighting and shadows on the floor as before. The tiles are only turned, nothing is added to or removed from the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the left plant and its pot, the walls, the baseboard on the right, the door, the metal strips or the long white fluorescent reflection band (its brightness stays, only the joint lines under it turn). No person, object or foot is visible on the floor. Place the changed floor so that it covers the lower 55% of the image. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 3:2 (1536x1024) crop of a low-fi surveillance camera photo showing the lower half of a shop corridor. Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every wall, plant, shop front, shadow and the long white fluorescent reflection band exactly unchanged. Make ONLY this single change: turn the pattern of the floor tiles in the near half of the frame into a diamond layout: every grey granite tile there is rotated by exactly 45 degrees in the floor plane, all in the same direction, so the joint lines form a clear diagonal lattice receding toward the far end of the corridor. Keep the tile colour, granite texture, tile size, and every light pool and shadow lying on the floor the same as before. Nothing is placed on the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the left plant and its pot, the walls, the baseboard on the right, the door, the metal strips or the long white fluorescent reflection band (its brightness stays, only the joint lines under it turn). No person, object or foot is visible on the floor. Place the changed floor so that it covers the lower 55% of the image. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 3:2 (1536x1024) crop of a low-fi surveillance camera photo showing the lower half of a shop corridor. Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every wall, plant, shop front, shadow and the long white fluorescent reflection band exactly unchanged. Make ONLY this single change: re-lay the foreground floor, from the bottom edge up to about the middle of the frame, as if all the square grey tiles had been rotated by 45 degrees together: the joints now form a diagonal checker (diamond) lattice that follows the floor perspective, with crisp dark joint lines about 1.3x more visible than natural so that the change reads at a glance. Same tile material, same colour, same granite speckle, same light and shadow on the floor. Nothing is added to the floor. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the left plant and its pot, the walls, the baseboard on the right, the door, the metal strips or the long white fluorescent reflection band (its brightness stays, only the joint lines under it turn). No person, object or foot is visible on the floor. Place the changed floor so that it covers the lower 55% of the image. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・壁・植物・店先・蛍光灯の反射帯・床の光だまりと影。polygon の外（奥の床・壁・植物の鉢）には回転した目地を出させない（出たら polygon が切り落とす）。
- **合成**: `restore` で貼り戻した全体画像を `--gen` に、上の polygon を `cutout`（`--feather 2`）へ。生成が polygon の外へ延びても polygon が正。生成が目地を斜めに並べきれない・歪む場合は、`tile` で別生成の45度回転タイル1枚の素材を polygon に敷く方法に切り替える（`--layout grid`）。
- **最寄り既存 overlay と実測距離**: 既存の大面積 AR-06-wall-puddle（(135,432)-(675,634)）とは 34px 空ける（polygon 上端 y668）。alpha bbox は polygon の bbox (0,668,645,900) と一致する見込み。最終 overlay の alpha bbox で測り直す。小物とは重なってよい（AR-06-wet-footprints・AR-06-red-bucket・AR-06-styrofoam-box と本節の AR-06-leaf-shadows-aligned）。同じ面の複数の異変は同時に出ない。
- **排他（同プレイ非共存）**: AR-06-wall-same-poster（大面積。bbox 重なり 20,735 px²。実測: 本案 bbox (0,668,645,900) と poster bbox (500,40,672,811) の交差。床と壁の面は違うが、大面積どうしなので念のため排他）・AR-06-wall-puddle（大面積。重ならないが同じ「床」を扱う大面積）・AR-06-ceiling-umbrellas（大面積。重ならない）。本節の AR-06-leaf-shadows-aligned は polygon の内側に入るので排他。
- **分類 / フェーズ / 目立ち度**: surreal / late / obvious
- **視認性の注意**: 目地の向きが変わるだけで、色・明るさの差は小さい。標準状態での差分は、目地線の位置が全面で入れ替わる量（max 差分 40 以上・平均 3.0 以上）で通る見込みだが、確証はない。登録後に `uv run scripts/check-visibility.py --id AR-06-floor-tile-rotated` を必ず通し、下限を割れば目地線の暗さを強める（テイク3 の指定）か、タイルの色を回転後だけ少し明るくして作り直す。
- **台帳登録案**: `id: 'AR-06-floor-tile-rotated'` / `element_id: 'CAM06-E16'` / `category: 'surreal'` / `anomaly_type: 'state_change'` / `location: 'CAM06-E16 の前景の床一面、差分左上 (0,668) px（polygon 165,668 585,668 645,900 0,900 0,750 156,750）'` / `detail: '前景の床一面のタイルが全部同じ向きに45度回り、目地が斜めのひし形の格子になる'` / `phase: late` / `subtlety: 'obvious'` / `candidate_id: 'AR-06-floor-tile-rotated'`。note に「大面積。排他（同プレイ非共存）: AR-06-wall-same-poster（bbox 重なり 20,735）・AR-06-wall-puddle・AR-06-ceiling-umbrellas・AR-06-leaf-shadows-aligned。最寄りの既存大面積 AR-06-wall-puddle と 34px」と最終 alpha bbox の実測を書く。
- **相互参照 / 重複精査**: AR-03-tile-diagonal（CAM03。床タイル1枚に斜めの目地が入り三角形に割れる小物）は1枚・割れる変化、本案は面一面・向きが回る変化で、カメラも規模も違う。AR-06-ceiling-checker（CAM06 の天井パネルの市松）は天井。CR-06-13/14（床タイル1枚の水玉・淡い緑）は1枚の模様・色。CR-02-14（床の一枚だけ市松）は1枚。CAM05 の床一面の白い折り鶴・CAM04 の AR-04-floor-shoes-rows のように物を床に敷く案とは違い、本案は物を足さない。

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
- **台帳登録案**: `id: 'AR-06-door-gap-light'` / `element_id: 'CAM06-E15'` / `category: 'environment'` / `anomaly_type: 'state_change'` / `location: 'CAM06-E15 の周辺、差分左上 (548,596) px'` / `detail: '右の黒枠の扉の下の隙間から暖かい橙色の光が漏れ、足元の床に光の筋が広がる（扉は閉じたまま）'` / `phase: mid` / `subtlety: 'medium'` / `candidate_id: 'AR-06-door-gap-light'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く（昭和の「閉店後も誰かが残っている」気配。人は写さない）。
- **相互参照 / 重複精査**: AR-06-reopened（CAM06 左の店先ガラスの向こうに喫茶店の灯りが戻る）は同じ「暖かい灯り」だが、場所（左のガラス vs 右の扉の足元）・見え方（ガラス奥の灯り vs 床に漏れる光の筋）・タイプが違う。CAM03 の CR-03-12（シャッターの隙間が真っ暗）は暗部で逆の方向。CR-06-18（扉の取手の左右）とは別。同一カメラで AR-06-wet-footprints の反射帯と見間違えないよう、扉の足元の局所の光にとどめる。

### AR-06-floor-light-slant — 床の光の帯が一本だけ実物と逆向きに傾く

- **camera / element_id**: CAM06 / CAM06-E16（光の帯の基準は CAM06-E17 の床中央右の白い反射帯）
- **物と変化**: 床の中ほど左（タイルの上）に、右の長い白い反射帯と同じ質感の白い光の細い帯が一本だけ映る。右の反射帯が通路の奥行きに沿って縦に伸びるのに対し、この帯だけは遠近に逆らって斜めに傾く（天井の灯りの映り込みの向きが一本だけ実物と合わない。物も人も写さない）
- **最終 box**（baseline px）: `215,624,355,672`（140x48）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `157,563,413,734`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (58,61)-(198,109)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the grey floor tiles in the middle of the frame, add one thin, soft-edged band of white light, like the reflection of a fluorescent tube on the polished floor, lying across the tiles diagonally, leaning the opposite way to the perspective lines of the corridor and to the long white reflection band on the right (which runs along the corridor). The band is about 1.5x brighter than the floor, with slightly blurred ends, and the tile joints faintly continue through it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the long white fluorescent reflection band on the right, the tile joints, the plant shadows on the left, the A-frame menu board, or the box below. No person or object is visible. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 55% of the image width and 28% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: make the floor reflect one more fluorescent light, but wrongly: a single slender band of pale white light, lying slanted across the floor tiles at about 40 degrees to the corridor direction, as if it were reflected from a tube hanging the other way. Soft glow, brighter than the surrounding tiles by about 1.5x, with the tile joints still visible through it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the long white fluorescent reflection band on the right, the tile joints, the plant shadows on the left, the A-frame menu board, or the box below. No person or object is visible. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 55% of the image width and 28% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: paint a single bright, narrow reflection streak on the floor tiles that tilts against the floor perspective (its far end leaning to the left while the real reflection band on the right leans the other way), pale white with a soft edge, clearly lighter than the grey tiles so that it reads at a glance, with the joint lines continuing faintly across it. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the long white fluorescent reflection band on the right, the tile joints, the plant shadows on the left, the A-frame menu board, or the box below. No person or object is visible. Place the object, including its shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 55% of the image width and 28% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特にthe long white fluorescent reflection band on the right, the tile joints, the plant shadows on the left, the A-frame menu board, or the box below（英語プロンプトの Do not touch に同じ）。
- **最寄り既存 overlay と実測距離**: AR-06-tile-sky（本節）まで 31.0px（box を各辺+2px した、最終 alpha bbox の見込みの矩形で測定。矩形間のユークリッド距離。次点: AR-06-styrofoam-box 32.0px / AR-06-wet-footprints 39.0px）。最終 overlay の alpha bbox で再測定する（30px を割れば動かす）。
- **分類 / フェーズ / 目立ち度**: environment / mid / medium
- **視認性の注意**: 灰色の床に白い帯なので差分は出やすいが、床の光だまりと紛れないよう帯は細長く、右の反射帯より明るくしすぎない（床の明るさ1.5倍程度）。つまみは明るさを上げると帯が際立つ。 登録後に `uv run scripts/check-visibility.py --id AR-06-floor-light-slant` を必ず通す。
- **台帳登録案**: `id: 'AR-06-floor-light-slant'` / `element_id: 'CAM06-E16'` / `category: 'environment'` / `anomaly_type: 'state_change'` / `location: 'CAM06-E16 の床中ほど左、差分左上 (215,624) px'` / `detail: '床の中ほど左に、右の反射帯と逆向きに斜めへ傾いた白い光の帯が一本だけ映る'` / `phase: mid` / `subtlety: 'medium'` / `candidate_id: 'AR-06-floor-light-slant'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。
- **相互参照 / 重複精査**: AR-06-wet-footprints（反射帯の濡れた裸足の足跡）は反射帯そのものの上の足跡で、本案は帯の外に現れる別の帯。AR-06-wall-puddle（床の水たまりが蛍光灯と壁を映す大面積）は水面の映り込み、本案は細い1本の帯の向きだけ。AR-06-reflected-umbrella・AR-06-reflection（ガラスの映り込み）とは面が違う。本案は反射帯を直接改変しない（反射帯の上は AR-06-wet-footprints の領域で、30px の距離基準を満たせないため、帯の外の床に置く）。

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
- **台帳登録案**: `id: 'AR-06-wall-gecko'` / `element_id: 'CAM06-E15'` / `category: 'object'` / `anomaly_type: 'add_creature'` / `location: 'CAM06-E15 の周辺、差分左上 (622,290) px'` / `detail: '右の粗い壁に、灰茶色のヤモリが一匹張り付く'` / `phase: mid` / `subtlety: 'medium'` / `candidate_id: 'AR-06-wall-gecko'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く（壁面の小動物。物の置き物と区別）。
- **相互参照 / 重複精査**: CAM06 の AR-06-blue-pinwheel（壁に貼る小物）とは別物。生き物の案は既存の猫・鳥系（CR-06-25/26 は猫）と種が違う。他カメラの生き物（猫・鳥など）と見比べ、ヤモリは台帳に未登録（2026-11 時点で grep 済み）。

### AR-06-tile-sky — 床タイルが抜けて青空が見える

- **camera / element_id**: CAM06 / CAM06-E16
- **物と変化**: 床のタイルが一枚だけ四角く抜け落ち、穴の底に昼の青空と白い雲が見える（空間が反転したような不自然さ）
- **最終 box**（baseline px）: `294,524,360,589`（66x65）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `199,471,455,642`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (95,53)-(161,118)
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
- **最寄り既存 overlay と実測距離**: AR-06-umbrella まで 31.1px（box を各辺+2px した、最終 alpha bbox の見込みの矩形で測定。矩形間のユークリッド距離。次点: AR-06-floor-light-slant（本節）31.0px / AR-06-wet-footprints 34.0px）。最終 overlay の alpha bbox で再測定する（30px を割れば動かす）。
- **分類 / フェーズ / 目立ち度**: surreal / late / obvious
- **視認性の注意**: 青空の彩度と明度で差分は十分に出る見込み。タイル1枚分に収める（隣のタイルに広げない）。 登録後に `uv run scripts/check-visibility.py --id AR-06-tile-sky` を必ず通す。
- **台帳登録案**: `id: 'AR-06-tile-sky'` / `element_id: 'CAM06-E16'` / `category: 'surreal'` / `anomaly_type: 'surreal'` / `location: 'CAM06-E16 の周辺、差分左上 (294,524) px'` / `detail: '床のタイルが一枚だけ四角く抜け、穴の底に青空と白い雲が見える'` / `phase: late` / `subtlety: 'obvious'` / `candidate_id: 'AR-06-tile-sky'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く（昭和の「空の記憶」。1タイル限定）。
- **相互参照 / 重複精査**: CAM06 の AR-06-wall-puddle（水たまりが蛍光灯と壁を映す、大面積）は床の映り込み、本案は床が『抜ける』。CR-06-13/14（床タイルの水玉・淡い緑）は模様・色の変化で、空が見える穴ではない。他カメラの床の穴・空の案を検索したが、青空の穴は未登録。

### AR-06-leaf-shadows-aligned — 床の植物の影の葉先が全部同じ一方向へ揃う

- **camera / element_id**: CAM06 / CAM06-E16（影の元は CAM06-E09 の左手前の大型観葉植物）
- **物と変化**: 前景の左下の床に落ちる大きな観葉植物の葉の影が、本来は葉ごとに向きがばらばらに広がるのに、全部同じ一方向（通路の奥）へ、平行に揃って細長く伸びる（葉も植物も元のまま。影だけが揃う。物も人も写さない）
- **最終 box**（baseline px）: `22,782,150,884`（128x102）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `0,729,256,900`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (22,53)-(150,155)
- **生成プロンプト**（3テイク作って目視で選ぶ）:

  テイク1:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: in the dark foreground floor at the lower left of the frame, redraw the soft shadow of the big plant's leaves so that every leaf shadow becomes a long narrow leaf shape pointing in exactly the same direction, toward the far end of the corridor, all parallel to each other, instead of fanning out in different directions. The shadows are dark charcoal, about 1.3x darker than the floor, with soft edges, and follow the tile joints in perspective. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the plant and its pot, the pink and blue cloth, the box to the right, the tile joints or the walls. No object, leaf or person is added. Place the object, including its shadow, centered at about 34% from the left and 61% from the top of the image, occupying roughly 50% of the image width and 60% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク2:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: change the pattern of the leaf shadows lying on the dark floor tiles at the lower left: all of them now point the same way, like a set of parallel blades stretching toward the back of the corridor, each with a leaf-shaped tip. Dark soft shadow, clearly readable against the grey tiles, with the tile joints continuing across them. No leaf or plant is added. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the plant and its pot, the pink and blue cloth, the box to the right, the tile joints or the walls. No object, leaf or person is added. Place the object, including its shadow, centered at about 34% from the left and 61% from the top of the image, occupying roughly 50% of the image width and 60% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク3:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: make the plant shadows on the dark foreground floor at the lower left all lean in one single direction: five or six narrow leaf-shaped shadows laid parallel to each other, pointing away from the camera toward the far end of the corridor, stronger and darker than natural so that they read at a glance, with the floor tile joints faintly visible through them. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels or printed patterns anywhere in the image. Do not touch the plant and its pot, the pink and blue cloth, the box to the right, the tile joints or the walls. No object, leaf or person is added. Place the object, including its shadow, centered at about 34% from the left and 61% from the top of the image, occupying roughly 50% of the image width and 60% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特にthe plant and its pot, the pink and blue cloth, the box to the right, the tile joints or the walls（英語プロンプトの Do not touch に同じ）。
- **最寄り既存 overlay と実測距離**: AR-06-tin-planter まで 37.0px（box を各辺+2px した、最終 alpha bbox の見込みの矩形で測定。矩形間のユークリッド距離。次点: AR-06-styrofoam-box 41.0px）。最終 overlay の alpha bbox で再測定する（30px を割れば動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 暗い床の影どうしの差は小さく、下限を割りやすい。影は元より濃く（炭色）、葉先を細長く揃えて輪郭を立てる。下限未満なら本数を減らして太くする。 登録後に `uv run scripts/check-visibility.py --id AR-06-leaf-shadows-aligned` を必ず通す。通らなければ同じ型（state_change）の別案にして節へ戻す。
- **台帳登録案**: `id: 'AR-06-leaf-shadows-aligned'` / `element_id: 'CAM06-E16'` / `category: 'object'` / `anomaly_type: 'state_change'` / `location: 'CAM06-E16 の前景左下の床、差分左上 (22,782) px'` / `detail: '前景左下の床に落ちる植物の葉の影が、全部同じ一方向（通路の奥）へ平行に揃って伸びる'` / `phase: mid` / `subtlety: 'medium'` / `candidate_id: 'AR-06-leaf-shadows-aligned'`。note に「大面積 AR-06-floor-tile-rotated の polygon の内側に入るので排他」と最寄り既存 id・最終 alpha bbox の実測距離を書く。
- **相互参照 / 重複精査**: CR-06-05（大きな葉の影が葉の向きと逆側へ伸びる。候補のまま）は影が葉と逆向き、本案は影どうしが全部同じ向きに揃う。同じ元の植物の影なので、CR-06-05 を採用する場合は本案と同プレイで共存させない。CR-06-26（茶トラ猫が植物の足元に座る）・CR-06-12（葉の陰の人形のような生物）とは別。

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
- **台帳登録案**: `id: 'AR-06-wall-height-marks'` / `element_id: 'CAM06-E15'` / `category: 'object'` / `anomaly_type: 'add_object'` / `location: 'CAM06-E15 の周辺、差分左上 (622,410) px'` / `detail: '右の粗い壁に、子供の背比べのような色鉛筆の横線が何本か刻まれる（数字・文字なし）'` / `phase: late` / `subtlety: 'medium'` / `candidate_id: 'AR-06-wall-height-marks'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く（子供の気配。add_object 枠は本節でこの1件のみ）。
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

## 制作仕様（未制作）— CAM 08

CAM08（Security Office）向けの新規の画像異変 7 件（小物 5 件・大面積 2 件）の**制作仕様**。台帳の偏り（object / add_object が大半）を是正する狙いで、生き物・状態変化・増殖・質感の置換から選んだ（add_object は 1 件、color_shift は 0 件、person は 0 件）。物・変化・box・生成プロンプトまで確定済みで、まだ生成していない。制作に進む時は、その項を丸ごと削除して `anomalies.yaml` に一度だけ登録する（`candidate_id` に見出しの ID を入れる）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）。ここには重ねて書かない。

- **7 件の一覧**（ID は台帳の id と同じ）:

  | ID | 要素 | category / anomaly_type | 規模 | 変化 |
  | --- | --- | --- | --- | --- |
  | AR-08-floor-tile-groove | E16 | environment / state_change | 小物 | 柱の右の床のタイル一枚が一段沈み、四辺の目地が黒い溝になる |
  | AR-08-pillar-sparrow | E11 | object / add_creature | 小物 | 柱の根元の角に、雀が一羽とまっている |
  | AR-08-ceiling-light-inverse | E01 | surreal / state_change | 小物 | 右上の天井の丸い天井灯が、光る代わりに周りの天井へ黒い影の暈を広げる |
  | AR-08-column-door-ajar | E15 | environment / state_change | 小物 | 右の黒い柱の下の暗い帯の引き戸が、指一本ぶん開いて細い光が漏れる |
  | AR-08-hanten-floor | E16 | object / add_object | 小物 | 左の床に、藍色の半纏が脱ぎ捨てたように丸まっている |
  | AR-08-ceiling-light-grid | E01 | environment / multiply | **大面積** | 天井一面に、同じ丸い天井灯が格子状にびっしり並ぶ |
  | AR-08-wall-drawers | E14 | surreal / multiply | **大面積** | 右の壁と柱の面が、同じ小さな引き出しの壁になる（百味箪笥） |

- **配置の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3`。台帳の CAM08 全 overlay の alpha bbox を実測。台帳は日々増えるので、登録時に必ず測り直す）: 小物 5 件の box は、大面積 2 件（`AR-08-floor-water-mirror`・`AR-08-stacked-crt-tvs`）を除く既存の全 overlay の alpha bbox から**矩形間距離 30px 以上**（最小 32.0px。各項に最寄りを書く）。小物どうしも 30px 以上離れる（tile-groove・sparrow・ceiling-light-inverse・door・hanten の box は互いに 100px 以上）。**30px 前後の余裕の小物（tile-groove 32.0px・sparrow 32.0px・hanten 33.0px・ceiling-light-inverse 35.0px）は、台帳に載る最終 overlay（羽・布・暈・溝で box より広がる）の alpha bbox で測り直し、30px を割ったら動かす。** 各項にも書く。
- **大面積の実測**: 画像 675x900=607,500 px² の 1/8 は 75,938 px²。
  - AR-08-ceiling-light-grid: 面ポリゴン `0,0 675,0 675,135 600,131 462,131 250,137 0,141`（天井の粒状の面と、その下の一段下がった面＝折り上げの下の面まで含める）。実面積 91,626 px²（1/8 の 75,938 px² に対し余裕 21%。旧案は 78,520 px² で余裕 3% しかなく広げた）・外接矩形 675x142=95,850 px²（15.8%）。
  - AR-08-wall-drawers: 面ポリゴン `462,134 600,134 600,140 675,140 675,720 600,696 540,660 500,514 462,417`。実面積 106,068 px²・外接矩形 213x586=124,818 px²（20.5%）。
  - 2 件の面は重ならない（ポリゴンの重なり 0 px²。x462〜600 では天井の下端 y131 と壁の上端 y134 で 2 行離れ、x600〜675 では y131〜135 と y140）。外接矩形は x462〜675・y134〜141 で重なるが、画素は 0 px²。既存の大面積との**画素（alpha）の重なりは 0 px²**: `AR-08-floor-water-mirror`（床）・`AR-08-stacked-crt-tvs`（左 x0〜248・y145〜518）のどちらとも 0。ただし水鏡の外接矩形（0,270,675,630）は壁の外接矩形と重なる（壁の下端が床の接地線 y≈420〜720 まで届くため。画素は重ならない）。壁の件は水鏡と**排他**にする（水面なら壁の引き出しも映り込むはずで、昭和の夕焼けだけを映す水鏡と矛盾するため。「同プレイで共存させない」を台帳 note に書く）。
- **共通手順**（小物。SKILL.md の手順 5〜8 と同じ）: ①各項の「6倍クロップ」を `public/images/cam8.webp` から切り出して 1536x1024 へ拡大する（webp は PNG に変換してから渡す）。②明示的な `$imagegen` で 3 テイクを生成し目視で選ぶ（0 バイトや数 KB の壊れた PNG は撮り直す。文字・ロゴらしき刻印が出たテイクは捨てる）。③選んだ結果を元のクロップ寸法へ縮小して baseline の PNG の同じ位置へ貼り戻し、その全体画像を `scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold` / `--margin` を 8/12/16/18 で試す）。④最終 overlay の alpha bbox で既存との距離を測り直し、30px を割ったら動かす。台帳へ登録し `uv run scripts/check-visibility.py --id <ledger id>` を通す。通らなければ大きく・暗く・平らな場所へ強めて作り直す。⑤登録・コミットしたら `experiments/` の作業物を即削除する。
- **共通手順**（大面積。この節の各項の窓）: 大面積は `scripts/composite-polygon.py` を使う（`crop` で全幅 675x450 の 3:2 窓を切り出し、生成結果を `restore` で元寸へ貼り戻し、面のポリゴンで `cutout --polygon … --feather 2`。複数窓は `restore --blend-px 100 --blend-edges t`）。窓は 1536/675≈2.2756 倍。生成は 1 件ずつ、生成画像は見ずに合成まで進め、採否は人間が決める運用。
- **共通プロンプト末尾**（各プロンプトに全文を含めてある。小物は「クロップ」、大面積は「窓」の意味）: `Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **共通の禁止**: 文字・数字・ロゴ・実在の店名・家紋の混入（出たテイクは没）。人の顔・体は描かない（人の気配は影・服・足元だけ）。性的・不適切の独自判定はしない（生成物はそのまま報告）。

### AR-08-floor-tile-groove — 床タイル一枚が一段沈み、四辺が黒い溝になる

- **camera / element_id**: CAM08 / CAM08-E16（床タイル）
- **物と変化**: 柱の右の床の、タイル一枚だけが一段沈み、その四辺の目地が太い真っ黒な溝になって一周する。沈んだタイルの表面は元の石目のまま（少し暗い）。人も物もない。「床が静かに下がっている」という、誰も触れていない変化。
- **不気味さの狙い**: 誰も歩いていないのに、床の一枚だけが下がって縁が黒く口を開けている。出河さんが「そこだけ、床が下がってません？」と聞き、樫原くんが「いや、前からじゃ…」と自信なく返す、地味で長く残る違和感。
- **差し替えの経緯**: 旧案（床に伸びる人影）は他カメラの人影系と型が重複するため差し替え。第一案の「柱の台座が沈み、境に黒い溝が一周」は、台座まわりが AR-08-pillar-sparrow の box と AR-08-pillar-second の alpha bbox（x358〜411）に重なり 30px 離せないため見送り、同じ「沈んで黒い溝が一周する」型を、旧人影案が測定済みの床の空き枠（下の最終 box）へ移した。
- **最終 box**（baseline px）: `448,460,524,542`（76x82）。`composite-anomaly.py --box` にはこの値を渡す。
- **6倍クロップ**（baseline px）: `358,416,614,587`（256x171）。box はクロップ内の (90,44)-(166,126)。下端はラムネ瓶の玉（AR-08-floor-ramune-marbles、y575〜）の上辺にわずかに触れるので「触らない」を明記する。
- **生成プロンプト**（3 テイク。T1 は基本、T2 は溝をより太く、T3 は沈んだタイルをさらに暗く）:

  T1:
  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other tile, joint line, light pool and wall exactly unchanged. Make ONLY this single change: on the gray floor tiles at the centre of the frame, pick one single floor tile and make it sink one step below its neighbours: the whole tile is lowered, and the joint lines on all four sides of that tile become one thick groove of pure black that runs all the way around it, with a thin pale edge on the near rim of the groove where it catches the light. The sunken tile keeps exactly the same speckled stone surface and the same gray tone as the other tiles, only slightly darker. Draw the tile in the floor's perspective as a parallelogram, with its groove continuing into the neighbouring joint lines. Make the groove about 1.3x thicker than real scale so it reads clearly. Do not touch the pillar, the wall at the right, the other tiles, or the small round balls at the very bottom edge of the frame. Place the sunken tile, including its groove, centred at about 50% from the left and 50% from the top of the image, occupying roughly 30% of the image width and 48% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  T2: T1 の "thick groove of pure black" を "very thick groove of pure black, about as wide as a finger" に置き換え、他は同じ（全文を渡す）。

  T3: T1 の "only slightly darker" を "clearly darker, as if lying in shade" に置き換え、他は同じ（全文を渡す）。
- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の床タイル・光の斑・右の壁。
- **最寄り既存 overlay と実測距離**: AR-08-panel まで 32.0px、次点 AR-08-floor-ramune-marbles 33.0px、AR-08-wall-band-wave 34.0px（box 基準・矩形間のユークリッド距離。台帳 CAM08 の alpha bbox を 2026-11-05 に実測、大面積 2 件を除く）。溝が box を超えて広がる分、制作後に最終 overlay の alpha bbox で測り直す（30px 未満は動かす）。
- **分類 / フェーズ / 目立ち度**: environment / mid / medium
- **視認性の注意**: 床は中間灰で、真っ黒な溝は十分に対比する。光の斑（白飛び）の上は避ける。溝が細いと面積比で通りにくいので T2 が有力。登録後に `uv run scripts/check-visibility.py --id AR-08-floor-tile-groove` を必ず通す。
- **台帳登録時**: `id: 'AR-08-floor-tile-groove'` / `candidate_id: 'AR-08-floor-tile-groove'` / `element_id: 'CAM08-E16'` / `category: 'environment'` / `anomaly_type: 'state_change'` / `location: 'CAM08-E16、柱の右の床。差分左上 (x,y) px'` / `detail: '柱の右の床のタイル一枚が一段沈み、四辺の目地が黒い溝になる'` / `phase: 'mid'` / 目立ち度 `medium` / note「小物。CAM08-E16。最近傍の既存は AR-08-panel（32.0px、alpha bbox 基準）。」
- **相互参照 / 重複精査**: 床の沈みは候補 CR-01-40（CAM01・タイル一枚が隣より少し沈む。溝なし・subtle で別カメラ）と近縁だが、本件は四辺が黒い溝になる強い変化で、別カメラなので許容。AR-08-tile-concentric（CAM08・タイルの模様）は模様の変化で別物。床の置き物系（AR-08-n1〜n5）は「物」で別。

### AR-08-pillar-sparrow — 柱の根元の雀

- **camera / element_id**: CAM08 / CAM08-E11（中央の大きな四角柱。根元の台座の角）
- **物と変化**: 柱の根元の左前の角、床と台座の境に、茶色い雀が一羽とまっている。地下街に鳥がいるはずのない、小さな違和感（昭和の店先では雀が入り込んで巣を作った記憶と結びつく）。
- **最終 box**（baseline px）: `256,380,326,442`（70x62）。
- **6倍クロップ**（baseline px）: `163,326,419,497`（256x171）。box はクロップ内の (93,54)-(163,116)。
- **生成プロンプト**（3 テイク。T1 は正面向き、T2 は横向きで頭を傾ける、T3 は一回り大きく羽を少し広げる）:

  T1:
  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, the pillar, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: at the front-left corner where the pale floor meets the base of the square pillar, place one small brown house sparrow standing on the floor facing the camera, with a chestnut-brown back, a pale grey belly and a dark bib under the beak. Make it about 1.5x larger than real scale so it reads clearly. Give it a strong dark contact shadow on the floor. Draw it as a natural bird photographed by a dim surveillance camera: no text, no tag, no ring, nothing in its beak. Do not touch the pillar, the electrical outlet on the pillar, the wall, the bright floor reflection or the tile joints. Place the bird, including its shadow, centred at about 50% from the left and 50% from the top of the image, occupying roughly 27% of the image width and 36% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  T2: T1 の "standing on the floor facing the camera" を "standing on the floor in side view, head turned and tilted slightly toward the camera" に置き換え、他は同じ（全文）。

  T3: T1 の "about 1.5x larger" を "about 2x larger" に、"standing on the floor facing the camera" を "standing on the floor facing the camera with both wings held slightly open" に置き換え、他は同じ（全文）。
- **保持するもの**: 柱の面・台座の面取り・コンセント（E13）・床の光（E17）。
- **最寄り既存 overlay と実測距離**: AR-08-pillar-second まで 32.0px、次点 AR-08-floor-reflection-no-pillar 34.0px（box 基準）。余裕が薄い（30px との差は 2px）ので、制作後に台帳に載る最終 overlay の alpha bbox で再測定する（羽毛・接地影で広がる。30px を割ったら動かす）。
- **分類 / フェーズ / 目立ち度**: object（生き物は README の暫定でこの分類）/ early / medium
- **視認性の注意**: 台座の足元は白い床反射（E17）に近く白飛びしやすい。茶色の背と暗い接地影で沈めないようにする。小さい（約 50x40px）ので 1.5〜2 倍に誇張する。**check-visibility の想定**（README の視認性基準・scripts/check-visibility.py。標準つまみで最大差 40 以上・平均差 3.0 以上、差分 25 以上の画素が 100 個以上または overlay の alpha 面積の 25% 以上）: 雀は誇張後 約 75x60px（alpha 面積 数千 px²）で、茶色の背・暗い接地影が白い床反射との差を出すので通る見込みだが、羽毛の縁が床に溶けると平均差が 3.0 に届かないので、登録後に `uv run scripts/check-visibility.py --id AR-08-pillar-sparrow` を必ず通す。通らなければ T3（2 倍・羽を開く）を採用する。
- **台帳登録時**: `id: 'AR-08-pillar-sparrow'` / `candidate_id: 'AR-08-pillar-sparrow'` / `element_id: 'CAM08-E11'` / `category: 'object'` / `anomaly_type: 'add_creature'` / `detail: '中央の柱の根元の左前の角に、茶色い雀が一羽とまっている'` / `phase: 'early'` / 目立ち度 `medium` / note「小物。CAM08-E11。最近傍の既存は AR-08-pillar-second（32.0px）。」
- **相互参照 / 重複精査**: 生き物系は AR-08-cat（CAM08・左の店先の猫。別の位置・別の生き物。猫と鳥なので観察対象が別）・AR-02-cat など猫の反復モチーフ。柱まわりの既存は AR-08-pillar-notice（正面の貼り紙）・AR-08-pillar-second（裏の二本目の柱）で、いずれも別の面・別の変化。

### AR-08-ceiling-light-inverse — 光らずに影を放つ天井灯

- **camera / element_id**: CAM08 / CAM08-E01（天井面。E04 の丸い天井灯と同じ形を右上に置く）
- **物と変化**: 画面右上の天井に、既存の丸い天井灯（E04）と同じ白い円盤が一つだけある。ただし周りへ光を放つ代わりに、円盤を中心に真っ黒な影の暈が天井へ広がる（灯のそばほど濃く、縁へ向けて薄れる）。円盤自体は白いまま。光と影の向きが逆になった灯。
- **不気味さの狙い**: 見ているのに明るくならない灯が、天井を暗く染めている。理由が説明できない。出河さんが「あの灯、周りだけ暗くないですか」と聞く。
- **差し替えの経緯**: 旧案（天井板がずれ落ちる）は AR-01-ceiling-tile-drop と実質同一（台帳 AR-04-ceiling-corner-fold も近い）のため差し替え。指示の既定案「天井の丸い天井灯の一つだけが、影を床へ落とす向きが逆になる」は、フレーム内に天井灯の影を床へ落とす空き枠が無く（床の空き枠は AR-08-floor-tile-groove が使う）、天井灯の真下は既存 overlay に重なるため、**天井側で光と影を逆にする**同じ発想へ具体化した。
- **最終 box**（baseline px）: `602,2,674,68`（72x66）。
- **6倍クロップ**（baseline px）: `419,0,675,171`（256x171）。box はクロップ内の (183,2)-(255,68)。
- **生成プロンプト**（3 テイク。T1 は基本、T2 は暈をより濃く広く、T3 は円盤をやや大きく）:

  T1:
  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object exactly unchanged. Make ONLY this single change: in the upper right corner of the frame, on the pale speckled ceiling, place one round flush-mounted ceiling light that works backwards: a small plain white disc with a thin grey rim, and instead of a soft glow of light around it, a wide soft halo of deep black shadow spreads outward over the pale ceiling around the disc, darkest next to the disc and fading toward its edge, as if the light were casting darkness onto the ceiling. The disc itself stays bright white. The ceiling keeps exactly the same speckled surface pattern outside the halo. Make the disc and halo about 1.3x larger than real scale so they read clearly. Do not touch the hanging dome camera near the bottom right of the crop, the existing ceiling lights, the dark band at the bottom or the ceiling tiles elsewhere. Place the light, including its dark halo, centred at about 86% from the left and 20% from the top of the image, occupying roughly 28% of the image width and 39% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  T2: T1 の "a wide soft halo of deep black shadow" を "a very wide soft halo of pure black shadow, nearly opaque next to the disc," に置き換え、他は同じ（全文を渡す）。

  T3: T1 の "a small plain white disc" を "a plain white disc about twice the size of an ordinary ceiling light" に置き換え、他は同じ（全文を渡す）。
- **保持するもの**: 天井の点状汚れ・光の勾配・右奥のドーム（E03。AR-08-vent-paper-plug が占める）・天井の下端の暗い帯。
- **最寄り既存 overlay と実測距離**: AR-08-n6（天井の凧）まで 35.0px、AR-08-vent-paper-plug 35.0px（box 基準・alpha bbox。2026-11-05 実測）。暈が box を超えて広がる分、制作後に最終 overlay の alpha bbox で測り直す（30px 未満は暈を小さくする）。
- **分類 / フェーズ / 目立ち度**: surreal / mid / medium
- **視認性の注意**: 天井は明るい灰で、黒い暈は十分に対比する。暈を淡くしすぎない（T2 が有力）。登録後に `uv run scripts/check-visibility.py --id AR-08-ceiling-light-inverse` を必ず通す。
- **台帳登録時**: `id: 'AR-08-ceiling-light-inverse'` / `candidate_id: 'AR-08-ceiling-light-inverse'` / `element_id: 'CAM08-E01'` / `category: 'surreal'` / `anomaly_type: 'state_change'` / `location: 'CAM08-E01、右上の天井。差分左上 (x,y) px'` / `detail: '右上の天井の丸い天井灯が、光る代わりに周りの天井へ黒い影の暈を広げる'` / `phase: 'mid'` / 目立ち度 `medium` / note「小物。CAM08-E01。最近傍の既存は AR-08-n6・AR-08-vent-paper-plug（どちらも 35.0px）。大面積 AR-08-ceiling-light-grid とは同じ天井面なので排他（同プレイで共存させない）。」
- **相互参照 / 重複精査**: 天井灯の変化は AR-08-light-blue-bleed・AR-08-fixture-dark-red（CAM08・灯の色）・候補 CR-03-04（CAM03・天井灯が消える）で、本件は灯が増え、光と影が逆になる別の変化。影が光源と逆を向く系は runtime 在庫の wrong shadow と同系だが、画像の異変としては未制作。別カメラの天井板系（AR-01-ceiling-tile-drop・AR-04-ceiling-corner-fold）とは観察対象が別。

### AR-08-column-door-ajar — 黒い柱の下の引き戸が開く

- **camera / element_id**: CAM08 / CAM08-E15（右端手前の黒い四角柱。下の暗い帯）
- **物と変化**: 右の黒い柱の、下側のパネル（光る長方形の下）の暗い帯に、元は壁と同じ黒だった目立たない引き戸が、指一本ぶん開いている。細い縦の枠と、開いた隙間から漏れる細い暖色の白い光が見える。柱に扉があるはずがない。
- **最終 box**（baseline px）: `566,574,638,672`（72x98）。
- **6倍クロップ**（baseline px）: `419,538,675,709`（256x171）。box はクロップ内の (147,36)-(219,134)。
- **生成プロンプト**（3 テイク。T1 は暖色の細い隙間、T2 は隙間をやや太く、T3 は光が床側にも薄くこぼれる）:

  T1:
  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object exactly unchanged. Make ONLY this single change: in the dark lower band of the black square pillar at the right of the frame, below the lower glowing cream panel, one narrow plain sliding door is slightly open by about the width of a finger: a thin dark-wood vertical frame, and through the opening a thin vertical strip of warm white light from inside, with a faint warm glow on the dark surface right beside it. The door has no handle plate, no sign and no marking. Make the door and the strip of light clearly visible at about 1.3x real scale. Do not touch the two glowing cream panels, the black middle band between them, the floor, the wall at the left or the edges of the pillar. Place the door, including its glow, centred at about 71% from the left and 50% from the top of the image, occupying roughly 28% of the image width and 57% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  T2: T1 の "by about the width of a finger" を "by about the width of a hand" に置き換え、他は同じ（全文）。

  T3: T1 の末尾の "faint warm glow on the dark surface right beside it" の後に ", and a thin trail of the same warm light spilling onto the floor at its foot" を足し、他は同じ（全文）。
- **保持するもの**: 上下 2 枚の光る乳白パネル（AR-08-panel / AR-08-panel-off / AR-08-blue-panel が手を入れる物）、柱の縁、右の壁との境。
- **最寄り既存 overlay と実測距離**: AR-08-n5（床の段ボール箱）まで 58.0px、次点 AR-08-floor-ramune-marbles 62.0px（box 基準）。同じ柱の光るパネル系（AR-08-panel y339〜472）とは 100px 以上離れる。
- **分類 / フェーズ / 目立ち度**: environment / mid / medium
- **視認性の注意**: 黒い面の上の光る細線は差分が強く出る。細すぎると面積比で通りにくいので、隙間は T2 の幅（手の幅）が有力。登録後に `check-visibility.py` を通す。
- **台帳登録時**: `id: 'AR-08-column-door-ajar'` / `candidate_id: 'AR-08-column-door-ajar'` / `element_id: 'CAM08-E15'` / `category: 'environment'` / `anomaly_type: 'state_change'` / `detail: '右の黒い柱の下の暗い帯にある引き戸が、指一本ぶん開き、細い暖色の光が漏れる'` / `phase: 'mid'` / 目立ち度 `medium` / note「小物。CAM08-E15。最近傍の既存は AR-08-n5（58.0px）。大面積 AR-08-wall-drawers とは同じ柱の面なので排他（同プレイで共存させない）。AR-06-door-gap-light（CAM06）と近縁なので同プレイで両方出さない。」
- **相互参照 / 重複精査**: **AR-06-door-gap-light（CAM06・右の扉の下の隙間から暖かい光が漏れる）と近縁**（どちらも戸の隙間から漏れる暖色の細い光）。別カメラ・別の面（本件は柱の暗い帯に隠れていた引き戸の縦の隙間、CAM06 は床の近くの扉の下の隙間）として台帳には両方載せてよいが、**同じプレイで両方は出さない**（観察対象が同じ「戸の隙間の光」で、2 件目が間違い探しとして重複して見えるため）。この節にだけ書く。CAM06 側の案は別担当が修正中なので、そちらの節には書かない。「閉じた扉やシャッターが開いて光が漏れる」昭和テーマの CAM01〜04 の既存（AR-01-shutter-light 系）は別カメラ・店のシャッターで、本件は柱の暗い帯に隠れていた戸。CAM08 の E15 は光る柱で、既存の AR-08-panel（パネルが増える）・panel-off（上が消灯）・blue-panel（色）はパネルの変化、本件は下の暗い帯の戸で別の面。候補 CR-08-11（第三の発光パネル）は上下パネルの間で別の面。

### AR-08-hanten-floor — 脱ぎ捨てられた半纏

- **camera / element_id**: CAM08 / CAM08-E16（床タイル）
- **物と変化**: 左の床に、無地の藍色の木綿の半纏が、たった今袖を抜いて脱いだように丸まって落ちている（片袖が床へ伸びる。服だけで持ち主の姿はない）。行方不明のテーマ（人が消えて服だけが残る）に沿う。
- **最終 box**（baseline px）: `4,486,90,574`（86x88）。
- **6倍クロップ**（baseline px）: `0,445,256,616`（256x171）。box はクロップ内の (4,41)-(90,129)。
- **生成プロンプト**（3 テイク。T1 は丸まった山、T2 は袖を長く広げて落ちる、T3 は襟を上に向けて畳み損ねたような形）:

  T1:
  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: on the gray floor tiles at the left of the frame, place one plain indigo-blue cotton hanten work jacket lying crumpled on the floor, as if someone had just slipped out of it: a loose heap of fabric with the collar showing on top and one sleeve stretched out along the floor. Completely plain indigo cloth with no pattern, no emblem, no crest, no print and no writing, with ordinary visible folds. Make it about 1.3x larger than real scale. Give it a strong dark contact shadow on the floor and a clear tone difference from the grey floor. No person, no body, no hands, no face. Do not touch the bright floor reflection at the right of the crop, the tile joints or the wall. Place the jacket, including its shadow, centred at about 18% from the left and 50% from the top of the image, occupying roughly 34% of the image width and 51% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  T2: T1 の "one sleeve stretched out along the floor" を "both sleeves flung out wide along the floor" に置き換え、他は同じ（全文）。

  T3: T1 の "a loose heap of fabric with the collar showing on top and one sleeve stretched out along the floor" を "a half-folded bundle of fabric with the collar turned up, one sleeve folded under and the other hanging off the heap" に置き換え、他は同じ（全文）。
- **保持するもの**: 床の目地・光の斑・左端の暗い店先との境。
- **最寄り既存 overlay と実測距離**: AR-08-floor-reflection-no-pillar まで 33.0px、次点 AR-08-n2（床の傘）35.0px（box 基準）。n3（赤いゴムまり）は 39.0px。余裕が薄い（30px との差は 3px）ので、制作後に台帳に載る最終 overlay の alpha bbox で再測定する（袖・接地影で広がる。30px を割ったら動かす）。
- **分類 / フェーズ / 目立ち度**: object / mid / medium
- **視認性の注意**: 藍色（暗い青）は暗い床に沈みやすい。明るい床タイル（左手前の床は中間灰）に対し、襟や折り目の縁に明るい線を入れ、接地影を濃くする。登録後に `check-visibility.py` を通す。
- **台帳登録時**: `id: 'AR-08-hanten-floor'` / `candidate_id: 'AR-08-hanten-floor'` / `element_id: 'CAM08-E16'` / `category: 'object'` / `anomaly_type: 'add_object'` / `detail: '左の床に、藍色の半纏が脱ぎ捨てられたように丸まって落ちている（持ち主はいない）'` / `phase: 'mid'` / 目立ち度 `medium` / note「小物。CAM08-E16。最近傍の既存は AR-08-floor-reflection-no-pillar（33.0px）。昭和の服（行方不明のテーマ）。」
- **相互参照 / 重複精査**: 床の置き物系の既存（AR-08-n1 洗濯板・n2 傘・n3 ゴムまり・n5 段ボール箱）は「物」で、服は無い。服系は AR-08-bag（暗いガラスに映る紙袋）・AR-08-suit（壁に映る背広の後ろ姿）・AR-05-old-woman-in-glass（CAM05・割烹着姿の老婆の後ろ姿）・CAM07 の下駄・CR06N-6 の雨合羽（別カメラ・別の物）。本件は「服だけが床に残る」で、人の姿そのものは出さない点が別。add_object は本節で唯一（偏り是正の対象外の 1 件）。

### AR-08-ceiling-light-grid — 天井一面の同じ丸い天井灯（大面積）

- **ID / camera / element_id**: AR-08-ceiling-light-grid / CAM08 / CAM08-E01（天井面。E04 の丸い天井灯を増殖）
- **面**: ポリゴン `0,0 675,0 675,135 600,131 462,131 250,137 0,141`（粒状の面と、その下の一段下がった面の下端まで。2026-11-05 に numpy で実測。手元の画像で下端は y≈141（左端）・y≈131（x462〜600）・y≈135（右端））。実面積 91,626 px²・外接矩形 675x142（95,850 px²、15.8%）。**制作後の alpha bbox と実面積は約 90,000 px² 以上（alpha bbox は高さ 134 以上＝ 675x134=90,450 px² 以上）になるよう、左下の一段下がった面（x≤250・y 125〜137）まで灯を置く**。
- **物と変化**: 天井全面に、既存の右寄りの白い丸い天井灯（E04）と同じ形の灯が、遠近に沿って等間隔の格子状に、びっしりと並んで点灯する（奥へ行くほど小さく密になる。手前の天井ほど大きい）。灯は全部まったく同じで、数は数十〜百個。
- **不気味さの狙い**: 無人の警備室の天井が、数えきれない同じ丸い目に見張られているように見える（同じ物がどこまでも反復する空間の不気味さ）。丸灯は 1 個なら普通だが、全面だと不気味。
- **保持するもの**: 柱・左のガラス戸・右壁・店先・既存の灯と器具（E02 の左奥の短い白い灯の列、E04 の丸い天井灯、E03 の右奥のドーム。面の内側にあるが、そのまま残して新しい灯を重ねない）・面の下の暗い隙間。灯は天井面（ポリゴン）の外へはみ出さない。下端は、左端 x0 で y≤139、x250 で y≤135、x462〜600 で y≤129、右端 x675 で y≤133（ポリゴンの 2px 内側）。
- **窓**: 1 枚。`crop --crop 0,0,675,450`（box は y0〜141 で窓の上端に接する。画像上端なので余裕不要）。窓内の位置は元画像の実寸 px ×2.2756。
- **生成プロンプト**（3 テイク。T1 は暖白色・中密度、T2 は寒色の白・中密度、T3 は暖白色でさらに密）:

  T1:
  ```text
  $imagegen Edit the attached surveillance camera photo of an underground shopping arcade corridor (the ceiling occupies the top 16% of the frame, from the top edge down to the line where it meets the shop fronts and the walls: the pale speckled upper part and the slightly darker lower step beneath it).
  Make ONLY this change: fill the entire visible ceiling surface, including its darker lower step, with a regular perspective grid of identical small round flush-mounted white ceiling lights, all switched on, each exactly like the one existing round white ceiling light near the centre of the lower step (a plain white disc with a thin grey rim). The grid is regular and evenly spaced, in about 4 rows running toward the far end of the corridor, with correct perspective: the discs are large and sparse near the camera (top of the frame) and become smaller and denser toward the far end, so that about 60 to 100 discs are visible in total. Each disc emits a soft white glow onto the ceiling around it, but the corridor below does not get brighter. All discs are completely identical: no numbers, no marks, no text. The pale speckled ceiling texture and its panel joints stay visible between the discs.
  Do not touch the floor, the walls, the pillar, the shop fronts, the dark gap under the ceiling's lower step, the existing short row of white lights, the existing round white light and the dome camera, or anything below the ceiling line. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```

  T2: T1 の "a plain white disc" を "a plain cold-white disc" に、"a soft white glow" を "a soft cold blue-white glow" に置き換え、他は同じ（全文）。

  T3: T1 の "about 4 rows" を "about 6 rows" に、"about 60 to 100 discs" を "about 120 to 180 discs" に置き換え、他は同じ（全文）。
- **作り方**: ①割付図: 天井の台形（ポリゴン）に、奥の通路の消失点へ向かう流線と、灯の位置・サイズ（手前 28px → 奥 5px）の格子を先に描く。向きは文章でなく図。②窓 1 枚で 3 テイク（天井以外は元画像で上書きして `restore`）。③`cutout --polygon "0,0 675,0 675,135 600,131 462,131 250,137 0,141" --feather 2 --out assets/anomaly-overlays/cam08/ceiling-light-grid.webp`。差分抽出（`--threshold`）は天井の粒状を拾って巨大化するので使わない。④alpha bbox と alpha の実面積を実測し、約 90,000 px² 以上（alpha bbox は高さ 134 以上）を確認する（割ったら登録しない。実測値を台帳 note に書く）。既存の灯（E02・E03・E04）の画素を覆っていないことも確認する。
- **難所と没基準**: 灯が文字・数字・模様になるテイク、灯の大きさが遠近と合わない（手前が小さい等）テイク、面の下の暗い隙間・蛍光灯の列・丸い天井灯・ドームを覆うテイク、灯が壁や柱に出るテイクは没。灯が 1 種類に揃っていないテイク（形・色が混ざる）は没。
- **フェーズ / 目立ち度**: mid / obvious。
- **台帳案**: `id: 'AR-08-ceiling-light-grid'` / `element_id: 'CAM08-E01'` / `category: 'environment'` / `anomaly_type: 'multiply'` / `location: 'CAM08-E01（天井一面）、差分左上 (0,0) px'` / `detail: '天井一面に、同じ丸い天井灯が遠近に沿って格子状にびっしり並んで点灯する'` / `phase: 'mid'` / 目立ち度 `obvious` / note に「大面積。CAM08-E01。alpha bbox WxH=…px²（実測値）。排他（同プレイで共存させない。どちらも天井の面）: AR-08-ceiling-light-inverse・AR-08-vent-square・AR-08-light-blue-bleed・AR-08-fixture-dark-red・AR-08-vent-paper-plug・AR-08-n6（凧）。」
- **排他**: 天井の既存の小物（上の note の列挙。面を広げた新ポリゴンの画素が重なるのは vent-square 8,306 px²・n6 5,431 px²・light-blue-bleed 4,362 px²・fixture-dark-red 1,369 px²・vent-paper-plug 1,188 px²）。新規の AR-08-ceiling-light-inverse は同じ天井面なので併存させない。大面積どうしは重ならない（AR-08-wall-drawers と 2px 離れる）。**共存可**: 床・左ガラス・右壁・柱の小物と大面積（床の水鏡は天井と画素が重ならない）。
- **相互参照 / 重複精査**: 別カメラの天井一面は CR-LG-01-01（CAM01・提灯と紙飾り）・CR-LG-06-02（CAM06・逆さの傘）・CR-LG-07-02（CAM07・白いシーツ）。いずれも「物を吊る」で、本件は**天井自体の灯の増殖**（吊らない・同じ丸灯が格子）で観察対象が別。CAM08 内の近縁は AR-08-light-blue-bleed・AR-08-fixture-dark-red（E02・E05 の灯の色）で、本件は E04 の形の増殖。候補 CR-03-04（CAM03・天井灯の一つが消える）は別カメラ・減る側。
- **生成枚数の最小見積り**: 全景 3 テイク。

### AR-08-wall-drawers — 右壁と柱一面の小さな引き出し（百味箪笥）（大面積）

- **ID / camera / element_id**: AR-08-wall-drawers / CAM08 / CAM08-E14（右の長い壁。柱 E15 の前面も同じ面）
- **面**: ポリゴン `462,134 600,134 600,140 675,140 675,720 600,696 540,660 500,514 462,417`。実面積 106,068 px²・外接矩形 213x586（124,818 px²、20.5%）。右の壁の面（E14）と右端の黒い柱の前面（E15）を 1 枚の面として扱う。
- **物と変化**: 右の壁と柱の面が、昭和の薬屋の百味箪笥（小さな引き出しがびっしり並ぶ木箱）の壁に変わる。同じ形・同じ大きさの小さな引き出し（中央に小さな丸い真鍮の取手）が、縦横の格子で壁と柱の面を隙間なく覆い、遠近に沿って奥へ行くほど小さくなる。ラベル・文字・数字は一切ない。既存の 2 枚の光る乳白パネルは、引き出しの壁の前に埋め込まれたままそのまま見える。
- **不気味さの狙い**: 昭和の薬屋の懐かしい箪笥が、警備室の壁一面になる。どれも同じで、どの引き出しにも何が入っているかわからない（老人たちの記憶の引き出し）。開ける者がいない。
- **保持するもの**: 天井との境（y≈134）、右奥のドーム（E03・x≥614、y≤140）、床との接地線（ポリゴンの下辺。水鏡の画素と重ならない）、左の黒い細い柱（x445〜462）、2 枚の光る乳白パネル（引き出しの壁の上でそのまま光る）、床。
- **窓**: **2 枚**（全幅 675x450）。A は `crop --crop 0,110,675,560`、B は `crop --crop 0,280,675,730`（重なり 280px。box 上端 134 に 24px の余裕、下端 720 に 10px の余裕）。先に A を生成・採用して `restore` で貼り戻し、B の入力はその全画面から `crop` で切り出す（依存する絵は直列）。B の結果は A の貼り戻し済み全画面を `--base` にして `restore --blend-px 100 --blend-edges t` で貼る。窓内の位置は元画像の実寸 px ×2.2756。
- **生成プロンプト**（窓 A・B とも同じ文で、3 テイク。T1 は濃い茶の木・真鍮の取手、T2 は黒漆・淡い取手、T3 は淡い木・小さな黒い取手。窓 B のときは「the upper part」を「the lower part」に読み替える）:

  T1:
  ```text
  $imagegen Edit the attached surveillance camera photo of an underground shopping arcade corridor (the dark right wall and the black square pillar at the right edge occupy the right third of the frame).
  Make ONLY this change: cover the entire surface of the right wall and the front face of the black pillar at the right with a wall of small identical wooden drawers, like a traditional Japanese apothecary herb chest: a regular grid of dark brown wooden drawer fronts, each with one small round brass knob in its centre, packed together with thin dark gaps and no space between them, following the perspective of the wall (the drawers are large near the camera and become smaller toward the far end of the corridor, and follow the slanting plane of the wall). All drawers are completely identical: no labels, no paper tags, no numbers, no writing, no marks, no carvings. The two existing glowing cream rectangular panels on the pillar stay exactly as they are, as if embedded in the front of the drawer wall, and keep glowing.
  Do not touch the ceiling, the dome camera at the upper right, the floor, the thin black post at the left edge of the wall, the pillar in the centre of the frame, the shop at the far end or anything at the left half of the frame. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```

  T2: T1 の "dark brown wooden drawer fronts, each with one small round brass knob" を "black lacquered drawer fronts, each with one small round pale-grey metal knob" に置き換え、他は同じ（全文）。

  T3: T1 の "dark brown wooden drawer fronts, each with one small round brass knob" を "pale unfinished wooden drawer fronts, each with one small round black knob" に置き換え、他は同じ（全文）。
- **作り方**: ①割付図: 壁面（E14）の台形と柱前面（E15）の長方形を別の面として描き、引き出しの格子（壁面は消失点へ向かう縦線・斜めの横線、柱前面は正面の格子）と、2 枚の光る乳白パネルの矩形（柱前面の x≈570〜650・y≈245〜350 と y≈460〜565）を避ける・埋め込む位置を決める。向きは文章でなく図。②窓 A→B の順に各 3 テイク。③`cutout --polygon "462,134 600,134 600,140 675,140 675,720 600,696 540,660 500,514 462,417" --feather 2`（生成を採用した全画面を `--gen` に渡す。下辺は接地線に沿わせ、床へはみ出さない）。差分抽出（`--threshold`）は壁の粒状を拾うので使わない。引き出しが単調に見えて破綻する場合は、素材（引き出し 1 ブロック）を別生成して `tile` で敷き詰める。④alpha bbox を実測し ≥75,938 px² を確認する。
- **難所と没基準**: 引き出しに文字風の模様・ラベルが出たら没。引き出しの大きさが遠近と合わない（壁が平面に見える）テイク、天井・ドーム・床を覆うテイク、左の黒い細い柱を覆うテイクは没。光る乳白パネルが消える・位置がずれるテイクは没。A と B の継ぎ目で引き出しの格子がずれる場合は、B の `--blend-px` を増やすか B を撮り直す。
- **フェーズ / 目立ち度**: late / obvious。
- **台帳案**: `id: 'AR-08-wall-drawers'` / `element_id: 'CAM08-E14'` / `category: 'surreal'` / `anomaly_type: 'multiply'` / `location: 'CAM08-E14/E15（右の壁と柱の前面）、差分左上 (462,134) px'` / `detail: '右の壁と柱の面が、同じ小さな引き出しがびっしり並ぶ百味箪笥の壁になる'` / `phase: 'late'` / 目立ち度 `obvious` / note に「大面積。CAM08-E14/E15。alpha bbox WxH=…px²（実測値）。排他（同プレイで共存させない）: AR-08-floor-water-mirror（外接矩形が重なる。水面なら壁も映るため）・AR-08-column-door-ajar・AR-08-panel・AR-08-panel-off・AR-08-blue-panel・AR-08-wall-band-wave・AR-08-suit（同じ壁・柱の面）。」
- **排他**: **同じ壁・柱の面を覆う小物**は併存させない: AR-08-panel（ポリゴンと 12,115 px² 重なる）・AR-08-panel-off（6,708 px²）・AR-08-blue-panel（6,708 px²）・AR-08-suit（13,528 px²）・AR-08-wall-band-wave（12,234 px²）・新規 AR-08-column-door-ajar。さらに AR-08-floor-water-mirror（上の大面積の実測を参照。画素は 0 だが外接矩形が重なり、水鏡が壁の引き出しを映すべきかの矛盾があるため）。候補 CR-08-06（右壁の白帯が柱の裏にも連続）・CR-08-11（柱の第三の発光パネル）も同じ面なので併存させない。AR-08-ceiling-light-grid とは 2px 離れ、重ならない。
- **相互参照 / 重複精査**: 壁一面の反復は CR-LG-06-01（CAM06・右壁一面の同じポスター）・CR-LG-01-02（CAM01・左壁一面の顔写真）・CR-LG-04-01（CAM04・右壁の窓の外）で、いずれも「貼る・窓」で、本件は**壁の面そのものが同じ箪笥になる**（質感の置換）。CAM08 内の大面積は AR-08-stacked-crt-tvs（左のガラス戸にテレビ）と AR-08-floor-water-mirror（床）で別の面。
- **生成枚数の最小見積り**: 窓 A・B の各 3 テイク（計 6 枚）。

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
