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

## 制作仕様（未制作）— CAM 02

CAM02（Main Corridor）の画像異変 8 件（小物 7 件・大面積 1 件）の**制作仕様**。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。台帳の物の偏り（object / add_object が大半）を是正するため、足す物ではなく**人・影・状態の変化・消失・増殖**を中心にした（add_object と color_shift は 0 件）。2026-11-05 作成（#47）。

- **昇格**: 制作に採用した件は、この節の該当項を**削除**して `anomalies.yaml` へ一度だけ登録する（`candidate_id` に見出しの ID を入れる。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md) のままで、ここの box は作業用の最終値。方針の正本は [`README.md`](./README.md) の「配置の基準」と大面積の例外、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。
- **座標**: すべて baseline px（676x900）。小物の box は 2026-11-05 時点の台帳（CAM02 は 35 件）の overlay_origin / dimensions と実測し、大面積を除く全 overlay から **30px 以上離れる**ことを確かめた。台帳は日々増えるので、登録時に必ず再測定する。この 7 件の box どうしも互いに 30px 以上離れる。
- **偏りの内訳**: state_change 2（点検口・蛍光灯）／remove_object 1／add_person 1／reflection 1（人の影）／multiply 2（壁の鳥・天井の大面積）／surreal 1。人や生き物は、影・服だけ・同一形の人形に限り、顔・手・肌は描かない（story.md の人物の扱いと禁則に反しない）。
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
- **相互参照 / 重複精査**: 既存・候補に蛍光灯そのものの変化は無い（AR-02-rusty-vent は CAM02-E03 の丸型設備、AR-02-tanabata-paper-chain は天井の吊り飾り）。他カメラの蛍光灯系は別カメラ。
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

#### AR-02-empty-cardigan — 柱と看板の間の床に、人が抜け出たように袖を広げた灰色のカーディガンが一着、中身なしで落ちている

- **camera / element_id**: CAM02 / CAM02-E20
- **物と変化**: 柱と看板の間の床に、人が抜け出たように袖を広げた灰色のカーディガンが一着、中身なしで落ちている。
- **最終 box**（baseline px、x0,y0,x1,y1）: `362,352,408,426`（46x74）。`composite-anomaly.py --box` にはこの値を渡す
- **6倍クロップ**（baseline px）: `257,304,513,475`（256x171。1536x1024 へ拡大して imagegen に渡し、結果を縮小して同じ位置へ貼り戻す）。box はクロップ内の (105,48)-(151,122)
- **生成プロンプト**（3テイク作って目視で選ぶ。テイクごとに変化の描き方だけを変えてある）:

  テイク A:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the gray floor tiles between the pillar and the green standing sign, place one plain gray knitted cardigan lying flat on the floor as if its wearer had just slipped out of it: the body flattened, both sleeves spread out loosely, the collar toward the far end of the corridor. No person, no head, no hands, no skin visible; the cardigan is empty. Plain buttons, no pattern, no label. Give it a soft dark contact shadow. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 18% of the image width and 43% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク B:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the gray floor tiles between the pillar and the green standing sign, place one plain faded beige knitted cardigan lying on the floor in a slumped heap with one sleeve stretched toward the sign and the other curled under, as if its wearer had just slipped out of it. No person, no head, no hands, no skin visible; the cardigan is empty. Plain buttons, no pattern, no label. Give it a soft dark contact shadow. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 18% of the image width and 43% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

  テイク C:

  ```text
  $imagegen Edit the attached image, which is a 6x enlarged crop of a low-fi surveillance camera photo (3:2, 1536x1024). Keep exactly the same framing and zoom: do not recompose, re-crop, re-zoom or enlarge. Keep the low-fi CCTV look, film grain, compression artifacts, perspective, lighting, color grade and every other object, wall, floor tile, joint line, light pool and reflection exactly unchanged. Make ONLY this single change: On the gray floor tiles between the pillar and the green standing sign, place one plain dark brown old-fashioned knitted cardigan lying flat on the floor with both sleeves bent as if the wearer had sat down and vanished, a plain flat cap lying a little above the collar. No person, no head, no hands, no skin visible; the clothes are empty. Plain buttons, no pattern, no label. Give it a soft dark contact shadow. Completely plain and unmarked: do not add any text, letters, numbers, logos, labels, printed text or printed logos anywhere in the image. Place the changed area, including any shadow, centered at about 50% from the left and 50% from the top of the image, occupying roughly 18% of the image width and 43% of its height. Do not add anything else. Output the same 3:2 1536x1024 image.
  ```

- **保持するもの**: 構図・遠近・照明・粒状感・圧縮ノイズ・他の物すべて。特に 柱・自立看板（箱と干渉しない）・床のタイル目地・遠景。看板の台座には触れない。
- **最寄り既存 overlay と実測距離**: AR-02-chalk-hopscotch まで 33.0px（box 基準・矩形間のユークリッド距離、次点 AR-02-duplicate-coffee-sign 80.0px。台帳の overlay_origin/dimensions と 2026-11-05 に実測、大面積の AR-02-floor-footprints / AR-02-shutter-crayon-drawings は除く）。**最終 overlay の alpha bbox で再測定必須**（羽毛ぼかしで box より広がる。30px 割れなら位置を動かす）。
- **分類 / フェーズ / 目立ち度**: person / late / medium（anomaly_type: add_person）
- **視認性の注意**: box は縦長（46x74）。奥行き方向へ長く寝かせた姿で収める。顔・手・肌は描かない（服だけ）。story.md の「老人の記憶」の系統だが、特定の人物像を作らない。 登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: AR-02-maroon-cushion（座布団）・AR-02-leather-footprints（革靴の足跡）・AR-02-chalk-hopscotch（石蹴り）は「人の痕跡」の系統だが、服が人の形で残る点は新しい。CR-02-10（反射の足）とは面が別。
- **台帳登録案**: `id: 'AR-02-empty-cardigan'` / `element_id: 'CAM02-E20'` / `category: 'person'` / `anomaly_type: 'add_person'` / `location: 'CAM02-E20 の周辺、差分左上 (362,352) px'` / `detail: '柱と看板の間の床に、人が抜け出たような形の灰色のカーディガンが一着だけ落ちている（中身なし）'` / `phase: late`/ `subtlety: 'medium'` / `candidate_id: 'AR-02-empty-cardigan'`。note に最寄り既存 id と最終 alpha bbox 実測距離を書く。

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

#### AR-02-ceiling-teruteru-rows — 天井一面から同じてるてる坊主が整列して垂れる（大面積）

- **camera / element_id**: CAM02 / CAM02-E01（天井面）
- **物と変化**: 天井一面から、顔のない白いてるてる坊主が同じ形・同じ向きで奥へ整列して無数に垂れ下がる。Exit 8 のように同じ物が面一杯に並ぶ不気味さを狙う（昭和の子供の記憶。文字なし）。
- **面（box）**: `172,0,650,190`（478x190 = 90,820 px²。画像 676x900 = 608,400 px² の 1/8 = 76,050 px² 以上、約14.9%）。ここは面の外接矩形で、台帳の overlay_origin / dimensions は貼り込み後の alpha bbox で再計測する。bbox が 76,050 px² を割ったら登録せず、面（吊る範囲）を広げて作り直す。
- **大面積どうしの重なり**（2026-11-05 実測）: AR-02-floor-footprints（0,338,676x562）とは y 方向に 148px 離れる。AR-02-shutter-crayon-drawings（0,57,165x541）とは x 方向に 7px 空くだけで box は重ならない（面も別: 左シャッターと天井）。
- **排他**: 天井一面を覆うので、天井の小物（AR-02-tanabata-paper-chain・AR-02-rusty-vent。どちらも天井・丸型設備の面）とは同プレイで共存させない。AR-02-pillar-sign-gone は柱の上部に重なるため、同プレイで共存させない。
- **3:2 の窓**（共通手順の正本は過去の制作仕様節 = git 履歴 253db1d の「3:2 の窓と元画像への復元」）: `composite-polygon.py crop --base public/images/cam2.webp --crop 0,0,676,450 --out <PNG>`（box の高さ 190 は 450 以下なので窓 1 枚。box は窓の上端に接するが、画像の上端なので余裕は不要）。復元は `restore --crop 0,0,676,450`。
- **作り方**: 1 回の生成で多数を描かせると顔崩れ・文字風の模様が出るので、**素材 1 体を別生成 → `tile` で天井面へ敷き詰める**（`--layout scatter` は使わず、列と行を揃える）。割付図（天井面の台形、概略。原寸で確定）: 手前の縁 `(190,8)-(650,0)`、奥の縁 `(300,168)-(520,168)`、5 列 x 4 行、奥ほど小さく間隔を詰める。下に垂れる長さは奥行きに合わせて短くする。素材の 3:2（スプライト採取用）の復元は不要。合成は `cutout --polygon`（天井と吊る物のポリゴン、赤い看板と壁の上に垂れる部分を含む）で、ポリゴン外の alpha は厳密に 0。
- **生成プロンプト（素材の 3 テイク）**:

  テイク A:

  ```text
  $imagegen Generate one single plain white cloth teru-teru-bozu (traditional Japanese paper-doll charm): a round ball head wrapped in white cloth, a gathered skirt-like body, tied at the neck with a thin white string, hanging straight down from a short thread. Completely blank: no face, no eyes, no mouth, no drawing, no text. Slightly crumpled soft cloth with gentle shading. Centered on a flat plain mid-gray background with generous empty margin, front view, evenly lit, no shadow on the background. Output 3:2 1536x1024. No text, no letters, no numbers, no logos, no watermark.
  ```

  テイク B:

  ```text
  $imagegen Generate one single plain slightly yellowed old white cloth teru-teru-bozu (traditional Japanese charm): a round ball head wrapped in old cloth, a gathered body with a few soft folds, tied at the neck with a thin string, hanging straight down from a short thread. Completely blank: no face, no eyes, no mouth, no drawing, no text. Centered on a flat plain mid-gray background with generous empty margin, front view, evenly lit, no shadow on the background. Output 3:2 1536x1024. No text, no letters, no numbers, no logos, no watermark.
  ```

  テイク C:

  ```text
  $imagegen Generate one single plain white tissue-paper teru-teru-bozu (traditional Japanese charm): a round paper-wrapped ball head, a body of thin crinkled tissue paper, tied at the neck with a thin white string, hanging straight down from a short thread, slightly translucent. Completely blank: no face, no eyes, no mouth, no drawing, no text. Centered on a flat plain mid-gray background with generous empty margin, front view, evenly lit, no shadow on the background. Output 3:2 1536x1024. No text, no letters, no numbers, no logos, no watermark.
  ```

- **全景を 1 回で生成させる場合のプロンプト**（素材方式が崩れた場合の代替。窓 `0,0,676,450` を入力する）:

  ```text
  $imagegen Edit the attached image, which is a 3:2 window (1536x1024) cut from a low-fi surveillance camera photo. Keep exactly the same framing, zoom, perspective and aspect ratio: do not recompose, re-crop, rotate or zoom. Keep the low-fi CCTV look, film grain, compression artifacts, lighting, color grade and every wall, pillar, shutter, sign and floor exactly unchanged. Make ONLY this single change: from the ceiling of the corridor, hang many identical plain white cloth teru-teru-bozu charms (blank, no faces, no drawing) on short threads, in evenly spaced straight rows running toward the far end of the corridor, getting smaller with distance in correct perspective, all hanging straight down and all perfectly identical in size for their depth and shape, each with a faint soft shadow on the ceiling. They fill the whole ceiling area evenly, 5 columns by 4 rows, and the rows hang in front of the upper part of the wall and the red sign at the right edge. Completely plain and unmarked: no text, letters, numbers or logos anywhere. Do not touch the floor, the shutters, the pillar, the standing sign or anything below the ceiling line. Do not add anything else. Output 3:2 1536x1024. Keep the camera angle exactly as the source. Match the original look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.
  ```

- **保持するもの**: 天井の板継ぎ目・丸型設備・蛍光灯・柱・シャッター・看板・床のすべて。天井の下（y>190）には何も足さない。
- **分類 / フェーズ / 目立ち度**: surreal / late / obvious（anomaly_type: multiply）。大面積。
- **視認性の注意**: 白い布は暗い青灰色の天井に強く出るが、蛍光灯の光に溶けないよう、蛍光灯（x<224）の手前には吊らない。登録後に `uv run scripts/check-visibility.py --id <ledger id>` を必ず通す。
- **相互参照 / 重複精査**: CAM06 の AR-06-teru-teru-bozu（天井に 1 つだけ。小物 add_object）は同じ物の単数で、こちらは整列した無数（multiply・大面積・別カメラ）。CAM01 の天井の吊り飾りの大面積（AR-01-ceiling-lanterns・AR-01-bunting-flags）とは物・カメラが別。CR-02-21（吊り器具から折り鶴 1 つ）・CR-02-19（天井板の木目）は小さな変化で、面が重なるが排他にする。
- **台帳登録案**: `id: 'AR-02-ceiling-teruteru-rows'` / `element_id: 'CAM02-E01'` / `category: 'surreal'` / `anomaly_type: 'multiply'` / `location: 'CAM02-E01 の天井一面、差分左上 (172,0) px'` / `detail: '天井一面から、顔のない白いてるてる坊主が同じ形で奥へ整列して無数に垂れ下がる'` / `phase: late` / `subtlety: 'obvious'` / `candidate_id: 'AR-02-ceiling-teruteru-rows'`。note の先頭に「大面積」と書き、排他の相手（上記）と、登録前に出し直した同カメラの box 重なり表を貼る。

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
