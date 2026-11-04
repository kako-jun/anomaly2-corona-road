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
