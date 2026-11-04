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

## 制作仕様（未制作）— CAM 03

CAM03（South Exit）の新規画像異変 8 件の**制作仕様**（Issue #47。偏り是正＝person / add_person / add_creature / surreal / state_change / remove_object を中心に。add_object は 1 件、color_shift は 0 件）。物・変化・配置（box）・生成プロンプトまで確定済みで、まだ生成していない。採用して制作に進む時は、その項を削除して `anomalies.yaml` に一度だけ登録する（ID を `candidate_id` 相当として note に残す。候補と制作データを二重に残さない）。物の説明・座標の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)、手順の正本は制作スキル（`.agents/skills/corona-road-anomaly/SKILL.md`）で、ここには重ねて書かない。box は作業用の最終値（台帳には貼り込み後の alpha bbox から出した `overlay_origin` / `dimensions` を入れる）。

| ID | category | anomaly_type | 変化 | 大小 |
| --- | --- | --- | --- | --- |
| AR-03-floor-shadows | person | add_person | 壁の向こうに立つ人の影だけが床に並ぶ（大面積） | 大面積 |
| AR-03-crouching-silhouette | person | add_person | 通路中央にうずくまる人影 | 小物 |
| AR-03-pigeon | object | add_creature | 床に立つ一羽の鳩 | 小物 |
| AR-03-floor-hole | surreal | surreal | 床タイルが一枚抜けて下から暖色の光 | 小物 |
| AR-03-tube-removed | environment | remove_object | 右上の長い蛍光灯が消える | 小物 |
| AR-03-shutter-raised | environment | state_change | 右のシャッターの裾が少し上がる | 小物 |
| AR-03-roll-vanish | object | remove_object | 壁際の白い筒状の物が消える | 小物 |
| AR-03-black-coat | object | add_object | 床に脱ぎ捨てられた黒いコート | 小物 |

- **配置の実測**（2026-11-05、`uv run --with pyyaml --with numpy --with pillow python3` で台帳の CAM03 全 23 件の `overlay_origin`/`dimensions` と overlay の alpha bbox を測定）: 小物 7 件の box は、大面積 2 件（AR-03-shutter-blank-papers (0,102,258,650)・AR-03-floor-tatami (29,457,676,900)）を除く既存 overlay の alpha bbox から**30px 以上**離れ、本節の他の小物 box どうしも 30px 以上離れている（最小は pigeon と floor-hole の 32px、最寄りは各項に記載）。羽毛ぼかしで overlay が広がる分、制作後に alpha bbox で測り直す（36px 未満の項は特に必須）。
- **偏り是正の内訳**: add_person 2（影・うずくまる人影）／add_creature 1（鳩）／surreal 1（床の穴）／state_change 1（シャッターの裾）／remove_object 2（蛍光灯・白い筒）／add_object 1（黒いコート）。台帳に CAM03 の add_person・add_creature（猫のみ）・remove_object は無く、person カテゴリも CAM03 にまだ無い。
- **大面積**: 1 件（AR-03-floor-shadows、box 86,850 px²）。同カメラの既存大面積は AR-03-shutter-blank-papers（左壁）と AR-03-floor-tatami（手前の床）で、本件は奥〜中央の床で box が重ならない（距離は項に記載）。
- **人・生き物の安全範囲**: 影・後ろ向きの黒いシルエット（顔・服柄なし）・服だけ・鳥のみ。story.md の禁則（実在の企業・商品名、台詞や統計の捏造、勝ち負けの語）に触れない。文字・ロゴは入れない。
- **共通手順**（制作スキルの手順 5〜8 と同じ）: ① 各項の「6倍クロップ」（大面積は 3:2 の窓）を `public/images/cam3.webp`（676x900）から切り出して 1536x1024 へ拡大（webp は PNG にしてから渡す。大面積の窓は `composite-polygon.py crop --crop 0,225,676,675`）。② 明示的な `$imagegen` で各項のプロンプトを 3 テイク生成し、採否は人間が決める（0 バイト・数 KB の壊れた PNG は撮り直す。文字・ロゴらしき刻印が出たテイクは捨てる）。③ 小物は選んだ結果を元のクロップ寸法へ縮小して baseline の同じ位置へ貼り戻し、`scripts/composite-anomaly.py --gen` に渡す（`--box` は各項の最終 box。FAIL は再生成でなく `--threshold`/`--margin` を 8/12/16/18 で試す）。大面積は `composite-polygon.py restore` → 影のポリゴンを `cutout` する。④ 最終 overlay の alpha bbox で既存との距離を測り直し、台帳へ登録して `uv run scripts/check-visibility.py --id <id>` を通す（通らなければ強めて作り直すか、この節へ戻す）。⑤ 登録・コミットしたら `experiments/` の作業物を即削除する。

### AR-03-floor-shadows — 壁の向こうに立つ人の影だけが床に並ぶ（大面積）

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 右の壁・シャッターの根元から手前左へ、人の形をした長い影だけが 8 本ほぼ平行に床へ落ちる。本人は写らない（壁の向こうに立つ老人たちの記憶という読み。story.md の「通路に現れていた像は老人3人の記憶」に沿う）。
- **box (x1,y1,x2,y2)（幅x高さ。x,y,w,h なら先頭2値と末尾の幅x高さ）**: (290,230,676,455)／面積 386x225 = 86,850 px²（画像の 14.3%。1/8 = 75,938 を満たす。alpha bbox は影の先端が x≈290・y≈455 付近まで届くことを条件に再計測する）
- **最寄り既存 overlay と実測距離**: 大面積どうし: AR-03-shutter-blank-papers (0,102,258,650) と x で 32px 離れ重ならない。AR-03-floor-tatami (29,457,676,900) とは y で 2px 離れ重ならない（box 下端を 455 で止める。影の先端が 457 を越えたらポリゴンで切る）。小物との重なりは下の表。
- **窓**: 3:2 の窓 1 枚: `composite-polygon.py crop --base public/images/cam3.webp --crop 0,225,676,675`（676x450、縮尺 2.272 倍）。box は窓内で (659,11)–(1536,522)。窓の下端はたたみの上端 y457 を含むが、貼り戻しは床ポリゴンの内側だけ採用する。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 2.272x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: on the grey tile floor of the corridor, eight long, soft-edged dark shadows of standing people, all nearly parallel. Each shadow is a clearly human silhouette (round head, shoulders, torso, two legs) stretched very long in perspective. They all start at the base line where the right-hand wall and the right-hand shutter meet the floor, between roughly x=1150 and x=1500 and y=40 to y=330 in the 1536x1024 frame, and run diagonally toward the lower left across the floor and over the tile joints, the nearest heads reaching about x=660, y=520 and the farthest shorter ones ending around x=1000, y=300. Spacing between neighbouring shadows is about 70 px, lengths vary between about 350 and 750 px. Shadows are the same darkness as the existing floor shadow patches, darker where tile joints cross them, with a gentle blurred edge. There is no person, body, or object anywhere; only the shadows. Do not touch the green sign, the wooden crate, the left shutter, the white floor reflections, the ceiling or the far end of the corridor. Do not change the wall or the shutter on the right. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 2.272x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: seven tall, thin, long human-shaped dark shadows lying on the grey tile floor, parallel to each other, as if seven people stood in a row just behind the right-hand wall, out of the camera's view. Each shadow has a round head, narrow shoulders and legs, stretched far in perspective toward the lower left of the frame. Their feet ends sit on the wall-to-floor line on the right (x about 1200 to 1500, y about 60 to 320) and the head ends reach as far as x about 680 to 900, y about 420 to 520. Neighbouring shadows are about 85 px apart; every shadow slightly different in length. Soft, slightly blurred edges, dark grey-blue, tile joints visible through them. No people, no objects, only shadows on the floor. Preserve the green sign, crate, shutter, reflections, ceiling and everything else exactly. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 2.272x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: nine narrow, elongated shadows of standing adults and two shorter ones of children's height mixed in, lying side by side on the grey tile floor, parallel, all stretching diagonally from the right wall base (x about 1100 to 1520, y about 30 to 340) toward the lower left (heads at about x=660 to 1000, y=300 to 530). The shadows have no detail inside, just clean human outlines (head, shoulders, arms hanging, legs together) with soft edges and low contrast against the tiles, as if cast by a light source far behind the right wall. No person or object is visible, only shadows on the floor. Do not alter the green sign, crate, shutter, reflections or ceiling; do not add anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-floor-shadows'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM03-E16 の奥右〜中央の床、差分左上は貼り込み後の alpha bbox で再計測（box 目安 (290,230)）'
    detail: '右壁の根元から手前左へ、人の形の長い影だけが8本ほぼ平行に床へ落ちる（本人は写らない）。'
    overlay: 'assets/anomaly-overlays/cam03/floor-shadows.webp'
    # phase / 目立ち度: mid / obvious
    note: '大面積（影の先端まで含む alpha bbox が 1/8 以上であること）。同プレイで共存させない: AR-03-crouching-silhouette / AR-03-pigeon / AR-03-floor-hole（同じ床の面・人影の主題）。併存可: 壁・看板・既存の床小物（影ポリゴンは物の接地部で止め、`cutout --hole` で抜く）。'
  ```
- **相互参照 / 重複精査**: 同型は CAM08 の AR-08-old-man-back などの『人の姿』だが、本件は姿を描かず影だけで、面（床）一面の大面積。CR-03-42（床の反射に傘の影）・CR-03-35（吊り器具の影）は物の影で別物。CR-01-06（奥の人影）は CAM01。既存の CAM03 台帳に影・人物の異変はない。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-crouching-silhouette / AR-03-pigeon / AR-03-floor-hole。併存可=壁面・看板・既存の床小物（影は物の接地部で止める）。既存 overlay との重なり px²（box 基準）: AR-03-sign-glow-blue 13,081 / AR-03-walking-cat 2,800 / AR-03-coffee-text-missing 2,535 / AR-03-slipper-single 2,378 / AR-03-crate-duplicate 1,995 / AR-03-face-ornament 1,440 / AR-03-sunken-opening-floor 756 / AR-03-shutter-faded-poster 768 / AR-03-white-cap 660 / AR-03-pink-ornament 84。

### AR-03-crouching-silhouette — 通路中央にうずくまる人影

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 通路の奥寄りの床に、背を向けて膝を抱えてうずくまる黒い人影が一つ現れる（顔・服の柄は描かない。逆光のシルエット）。candidate-pool の汎用タイプ『crawling figure（低い姿勢の人影）』の昇格。
- **box (x1,y1,x2,y2)（幅x高さ。x,y,w,h なら先頭2値と末尾の幅x高さ）**: (545,296,591,346)（46x50）
- **最寄り既存 overlay と実測距離**: AR-03-sunken-opening-floor (52.0)、次点 AR-03-walking-cat (66.0)
- **6倍クロップ範囲**: 6倍クロップ (420,227)–(676,398)（256x171。右端に接するので x を 676 へ寄せた）。box は窓内で (750,414)–(1026,714)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: one person crouching on the floor, seen from behind, knees drawn up and head bowed, as a solid near-black silhouette with a faint cold rim light along the back. It sits at the centre of the corridor floor, occupying about x=750 to 1026 and y=414 to 714 in the 1536x1024 frame, with a short dark contact shadow on the tiles under it. A plain dark long coat, no visible face, no hands, no clothing detail. Do not change anything else: floor reflections, the dark opening in the distance, the right wall and the ceiling stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: a small crouching human figure with its back to the camera, arms wrapped round its knees, drawn as a flat dark grey-black silhouette with soft edges, resting on the tile floor in the middle of the corridor, about x=760 to 1020, y=420 to 710 in the 1536x1024 frame. Short soft contact shadow below it. No face, no skin, no clothing details. Everything else must remain identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: one hunched figure in a dark coat squatting on the floor, facing away from the camera toward the far end of the corridor, head slightly lowered, as a dim backlit silhouette (almost black with slight blue edge light), at about x=740 to 1030, y=410 to 720 in the 1536x1024 frame, with a faint shadow on the tiles. No facial or hand details. Do not alter the far opening, the floor reflections, the walls or the ceiling. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-crouching-silhouette'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM03-E16 の通路中央奥寄りの床、差分左上 (545,296) 付近（貼り込み後に再計測）'
    detail: '通路中央の奥寄りの床に、背を向けて膝を抱えてうずくまる黒い人影が一つ現れる。'
    overlay: 'assets/anomaly-overlays/cam03/crouching-silhouette.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-03-sunken-opening-floor（box 距離 52px）。制作後に alpha bbox で測り直す。AR-03-floor-shadows と排他。'
  ```
- **相互参照 / 重複精査**: 後ろ姿の人物は CAM01 AR-01-back-view-paper-bag・CAM05 AR-05-old-woman-in-glass・CAM06 AR-06-worker・CAM08 AR-08-old-man-back が既にあるため、立ち姿の後ろ姿でなく『うずくまる』姿勢で差別化した（別カメラ・別姿勢）。CAM03 に人物の異変は無い。CR-01-06 は CAM01。

### AR-03-pigeon — 床に立つ一羽の鳩

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 緑看板の手前の床に、鳩が一羽ぽつんと立つ。閉店後の地下に鳥がいる不気味さ。既存の猫（AR-03-walking-cat）とは別種の生き物。
- **box (x1,y1,x2,y2)（幅x高さ。x,y,w,h なら先頭2値と末尾の幅x高さ）**: (452,402,500,446)（48x44）
- **最寄り既存 overlay と実測距離**: AR-03-sign-glow-blue (36.9)、次点 AR-03-white-cap (46.7)
- **6倍クロップ範囲**: 6倍クロップ (348,339)–(604,510)（256x171）。box は窓内で (624,378)–(912,642)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: one plain grey city pigeon standing on the tile floor, side-on, head slightly raised, with a dark grey head, a faintly iridescent green-purple neck, two darker wing bars, and thin pinkish-grey legs. It occupies about x=624 to 912 and y=378 to 642 in the 1536x1024 frame, with a small dark contact shadow beneath it. Realistic photograph, no ring on the leg, no marking. Do not change the floor, the white light reflections, the sign base or anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: a single white-and-grey pigeon standing still on the floor tiles, facing the camera slightly turned, round dark eye, small beak, puffed chest, about x=630 to 905 and y=385 to 640 in the 1536x1024 frame, with a soft contact shadow. Realistic, no tags, no markings. Everything else stays identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: one dark slate-grey pigeon with a glossy neck standing on the tile floor in profile, looking toward the left of the frame, at about x=620 to 915, y=380 to 645 in the 1536x1024 frame, small shadow underneath. Natural and photographic, no markings. Do not touch the sign, floor reflections or anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-pigeon'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM03-E16 の緑看板の手前右の床、差分左上 (452,402) 付近（貼り込み後に再計測）'
    detail: '緑の看板の手前右の床に、鳩が一羽ぽつんと立っている。'
    overlay: 'assets/anomaly-overlays/cam03/pigeon.webp'
    # phase / 目立ち度: early / medium
    note: '最寄り既存 overlay は AR-03-sign-glow-blue（box 距離 36.9px。羽毛ぼかしで広がるので制作後に再測）。猫など小動物は現行 category を object に仮分類する運用（README）。AR-03-floor-shadows と排他。'
  ```
- **相互参照 / 重複精査**: CAM03 の生き物は AR-03-walking-cat（猫）のみ。別カメラの動物は猫のみ（AR-02-cat・AR-07-stairs-cat・AR-08-cat）で、鳥は台帳・候補に無い（grep 済み）。

### AR-03-floor-hole — 床タイルが一枚抜けて下から暖色の光

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 手前寄りの床の中央付近、タイル一枚ぶんが長方形の穴になり、下から温かい橙の光が漏れる。足元が空いている不気味さ。
- **box (x1,y1,x2,y2)（幅x高さ。x,y,w,h なら先頭2値と末尾の幅x高さ）**: (532,396,602,446)（70x50）
- **最寄り既存 overlay と実測距離**: AR-03-walking-cat (67.0)、次点 AR-03-sake-bottle (93.6)
- **6倍クロップ範囲**: 6倍クロップ (420,336)–(676,507)（256x171）。box は窓内で (672,360)–(1092,660)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: one floor tile has dropped away, leaving a clean rectangular hole that follows the perspective of the tile joints, about x=672 to 1092 and y=360 to 660 in the 1536x1024 frame. Inside is a dark void, with a soft warm amber glow rising from below that lightly lights the inner edges of the neighbouring tiles. The tile edges have visible thickness (a thin slab edge). Nothing else visible inside the hole. Do not change the neighbouring tiles' pattern, the reflections or anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: a single tile-sized opening in the floor, rectangular and aligned with the joints, at about x=680 to 1085, y=365 to 655 in the 1536x1024 frame, black inside and with a faint orange light leaking up from beneath, brightening the cut edges of the surrounding tiles a little. No stairs, no objects, no people inside. Everything else identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: one floor tile is missing; a clean-cut square hole in the perspective of the floor at about x=660 to 1100, y=355 to 665 in the 1536x1024 frame, deep black with a warm yellow-amber glow at the bottom and a thin visible slab thickness on the tile edges. No other change. Do not alter the reflections, neighbouring tiles, or any other part of the frame. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-floor-hole'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM03-E16 の床右中央、差分左上 (532,396) 付近（貼り込み後に再計測）'
    detail: '床のタイル一枚ぶんが長方形の穴になり、下から温かい橙の光が漏れる。'
    overlay: 'assets/anomaly-overlays/cam03/floor-hole.webp'
    # phase / 目立ち度: late / obvious
    note: '最寄り既存 overlay は AR-03-walking-cat（box 距離 67px）。AR-03-floor-shadows と排他。AR-03-floor-tatami とは別の面（tatami の上端 y457 より上）で距離 11px。'
  ```
- **相互参照 / 重複精査**: 近い既存: AR-03-sunken-opening-floor（奥の開口の床が一段低く見える。奥の E13 内で控えめ）、AR-03-tile-diagonal / AR-03-blue-floor-tile（手前の床タイルの変化）。本件は『穴＋下の光』で、タイルの向き・色でなく足元が抜ける変化。穴という点で sunken-opening-floor と見え方が近いので、制作前に見比べる。

### AR-03-tube-removed — 右上の長い蛍光灯が消える

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E04
- **物と変化**: 右上から斜めに下がる長い白色蛍光灯（E04）が灯具ごと消え、そこには何もない天井板だけが続く。床の白い照明反射（E17）はそのまま残る。
- **box (x1,y1,x2,y2)（幅x高さ。x,y,w,h なら先頭2値と末尾の幅x高さ）**: (600,60,676,150)（76x90）
- **最寄り既存 overlay と実測距離**: AR-03-shutter-faded-poster (36.0)、次点 AR-03-sunken-opening-floor (62.0)
- **6倍クロップ範囲**: 6倍クロップ (420,20)–(676,191)（256x171）。box は窓内で (1080,240)–(1536,780)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Remove only this: the long bright white fluorescent tube in the upper right, its fixture and the bright glow it casts on the ceiling and wall (about x=1080 to 1536, y=240 to 780 in the 1536x1024 frame). In its place, continue the plain dark blue-grey ceiling panel with faint seam lines and the right wall behind it, in the same perspective, with no light and no fixture. Do not change the wall, the shutter, the poster or anything else; do not add objects. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Remove only this: the diagonal white fluorescent light at the top right and its halo, so that the ceiling there is just dark grey-blue ceiling board with a subtle panel seam and a little dust texture, running in the same perspective toward the vanishing point. The area is about x=1080 to 1536, y=240 to 780 in the 1536x1024 frame. Everything else remains unchanged, including the right shutter and the wall. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Remove only this: the long fluorescent tube light in the top right corner and the soft white glow around it. Fill the vacated area with the same dim ceiling surface and the top of the right wall continuing naturally (about x=1080 to 1536, y=240 to 780 in the 1536x1024 frame). The area stays dark and unlit. Preserve every other pixel, including the shutter and the wall below. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-tube-removed'
    camera_id: 'CAM03'
    element_id: 'CAM03-E04'
    base_photo: 'public/images/cam3.webp'
    category: 'environment'
    anomaly_type: 'remove_object'
    location: 'CAM03-E04 の右上の長い蛍光灯、差分左上 (600,60) 付近（貼り込み後に再計測）'
    detail: '右上の長い白色蛍光灯が灯具ごと消え、何もない暗い天井板だけが続く（床の白い反射はそのまま残る）。'
    overlay: 'assets/anomaly-overlays/cam03/tube-removed.webp'
    # phase / 目立ち度: mid / obvious
    note: '最寄り既存 overlay は AR-03-shutter-faded-poster（box 距離 36px。ぼかしで広がるので制作後に再測）。床反射 E17 は残す前提（光源が無いのに反射がある違和感が狙い）。'
  ```
- **相互参照 / 重複精査**: 近い候補: CR-03-30（長い蛍光灯の奥側だけが暗く短く見える。部分的な減光）、CR-03-04（天井灯の一つだけ消え反射は残る。E05 の灯）。本件は E04 を『灯具ごと全部消す』remove_object で、見え方が近いので、制作時にどれかを取り下げるか決める。台帳に天井灯の消失は無い（AR-03-amber-lamp-glow は色）。

### AR-03-shutter-raised — 右のシャッターの裾が少し上がる

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E10
- **物と変化**: 右側の閉じた横縞シャッターの下端が、床から少し持ち上がり、隙間の奥が真っ暗になる。CR-03-12（右側の閉じたシャッターが上がる）の昇格で、中ほどまでは上げず裾だけに絞る。
- **box (x1,y1,x2,y2)（幅x高さ。x,y,w,h なら先頭2値と末尾の幅x高さ）**: (648,350,676,392)（28x42）
- **最寄り既存 overlay と実測距離**: AR-03-shutter-faded-poster (96.0)、次点 AR-03-sunken-opening-floor (114.0)
- **6倍クロップ範囲**: 6倍クロップ (420,286)–(676,457)（256x171）。box は窓内で (1368,384)–(1536,636)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the bottom of the grey horizontal-slat roll-up shutter on the far right edge of the frame (about x=1368 to 1536, y=384 to 636 in the 1536x1024 frame) is lifted off the floor by a gap of about 150 px in this enlarged view. Through the gap there is only pitch black darkness. The slats above are unchanged; the lowest slat edge now hangs in mid-air with a thin bright rim; a dark strip of floor is visible only inside the gap. Do not change the rest of the shutter, the wall, the floor or anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the right-hand shutter, at the lower end only (about x=1368 to 1536, y=384 to 636 in the 1536x1024 frame), is raised so that a black horizontal gap about 120 px high opens between the last slat and the floor. Darkness fills the gap completely, nothing is visible inside. The shutter slats keep their original look. Everything else stays exactly the same. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the bottom edge of the right shutter lifts off the floor, opening a 180 px high very dark gap over its visible width (x=1368 to 1536, y=384 to 636 in the 1536x1024 frame). The gap is black. The raised bottom slat catches a little cold light along its lower edge. Keep the wall, the floor tiles and every other element unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-shutter-raised'
    camera_id: 'CAM03'
    element_id: 'CAM03-E10'
    base_photo: 'public/images/cam3.webp'
    category: 'environment'
    anomaly_type: 'state_change'
    location: 'CAM03-E10 の右端シャッターの下端、差分左上 (648,350) 付近（貼り込み後に再計測）'
    detail: '右側の閉じたシャッターの下端が床から持ち上がり、隙間の奥が真っ暗になる。'
    overlay: 'assets/anomaly-overlays/cam03/shutter-raised.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-03-shutter-faded-poster（box 距離 96px）。CR-03-12 の昇格（採用時は candidate-pool の CR-03-12 の行を削除）。右端で幅が 28px と狭いため、視認性基準を check-visibility で必ず確認し、下限未満なら隙間を高くして作り直す。'
  ```
- **相互参照 / 重複精査**: CR-03-12（右シャッターが中ほどまで上がる）の昇格案で、裾の隙間だけに絞った変化。CR-03-03（右シャッターの板一枚の間隔が倍）は別の変化。CAM02 の AR-02-shop-reopens（左シャッター）とは別カメラ・別の物。台帳に CAM03 のシャッター開閉は無い。

### AR-03-roll-vanish — 壁際の白い筒状の物が消える

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 奥の左壁際の床に横たわる、白っぽい筒状の物（束ねた紙か包みのように見える。正体は不確実）が消え、壁の根元と床だけが続く。
- **box (x1,y1,x2,y2)（幅x高さ。x,y,w,h なら先頭2値と末尾の幅x高さ）**: (480,236,514,268)（34x32）
- **最寄り既存 overlay と実測距離**: AR-03-sunken-opening-floor (38.0)、次点 AR-03-sign-frame-square (41.0)
- **6倍クロップ範囲**: 6倍クロップ (369,167)–(625,338)（256x171）。box は窓内で (666,414)–(870,606)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Remove only this: the pale, roughly cylindrical bundle (like rolled paper or a wrapped package) lying at the base of the left wall, with its small shadow (about x=666 to 870, y=414 to 606 in the 1536x1024 frame). In its place, continue the wall base and the glossy grey floor tiles naturally with their reflections. Keep the dark small crate behind it, the shop front on the left and everything else exactly as is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Remove only this: the white cylindrical objects lying on the floor along the wall base, near x=666 to 870, y=414 to 606 in the 1536x1024 frame, including their shadow. Fill with plain floor tiles and the wall skirting in the same perspective and the same soft reflections. Do not change the dark crate, the shop window or any other part of the image. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Remove only this: the light grey rolled bundle at the foot of the wall (x=666 to 870, y=414 to 606 in the 1536x1024 frame) and its soft shadow, restoring the floor-wall corner as a clean continuous surface with faint reflections. Everything else must stay identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-roll-vanish'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'object'
    anomaly_type: 'remove_object'
    location: 'CAM03-E16 の奥の左壁際の床、差分左上 (480,236) 付近（貼り込み後に再計測）'
    detail: '奥の左壁際の床に横たわる白っぽい筒状の物が消え、壁の根元と床だけが続く。'
    overlay: 'assets/anomaly-overlays/cam03/roll-vanish.webp'
    # phase / 目立ち度: early / subtle
    note: '最寄り既存 overlay は AR-03-sunken-opening-floor（box 距離 38px）。元写真の物の正体は不確実（制作前に原寸で確認する）。小さな物の消失で視認性下限が厳しいため、check-visibility を必ず通す（通らなければ取り下げて候補へ戻す）。'
  ```
- **相互参照 / 重複精査**: 台帳に CAM03 の remove_object は無い（remove_object 自体が台帳に AR-06-missing-flower のみ）。CR-03-01〜等の物の向き・複製とは別。

### AR-03-black-coat — 床に脱ぎ捨てられた黒いコート

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16
- **物と変化**: 床の中央手前寄りに、黒い厚手のコートが、持ち主だけ消えたように平たく崩れて落ちている（人は写らない、服だけ）。
- **box (x1,y1,x2,y2)（幅x高さ。x,y,w,h なら先頭2値と末尾の幅x高さ）**: (285,462,355,510)（70x48）
- **最寄り既存 overlay と実測距離**: AR-03-round-puddle (33.0)、次点 AR-03-crate-duplicate (38.0)
- **6倍クロップ範囲**: 6倍クロップ (192,401)–(448,572)（256x171）。box は窓内で (558,366)–(978,654)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: a plain black wool overcoat lying crumpled and flat on the floor, as if its owner had just vanished from it: collar, two sleeves spread untidily, hem folded, slight wrinkles, about x=558 to 978 and y=366 to 654 in the 1536x1024 frame, with a dark contact shadow. Completely plain, no labels, no buttons with markings, no patterns. No person or body part is visible. Do not change the floor, the reflections, the puddle or anything else. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: a dark charcoal long coat dropped on the tile floor in a heap, one sleeve stretched out, the other folded under, at about x=565 to 970, y=370 to 650 in the 1536x1024 frame; soft contact shadow; plain fabric, no markings. Nobody is in it or near it. Everything else identical. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Add only this: a black trench-style coat lying open and flat on the floor with its belt loosely trailing, as if slipped off, at about x=550 to 985, y=360 to 655 in the 1536x1024 frame; subtle sheen on the fabric; shadow under the folds; completely plain, no labels, no logos. No person visible. Preserve the rest of the image exactly. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-black-coat'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'object'
    anomaly_type: 'add_object'
    location: 'CAM03-E16 の床中央手前寄り、差分左上 (285,462) 付近（貼り込み後に再計測）'
    detail: '床の中央手前寄りに、黒いコートが持ち主だけ消えたように平たく崩れて落ちている。'
    overlay: 'assets/anomaly-overlays/cam03/black-coat.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-03-round-puddle（box 距離 33px）。box は AR-03-floor-tatami の bbox（上端 y457）の内側にあるため、tatami と排他（同プレイで共存させない）。'
  ```
- **相互参照 / 重複精査**: 服だけの異変は台帳・候補に無い（コートの grep は台帳・候補とも 0 件。CAM07 の靴の異変は靴そのものの変化で別物）。CAM01 AR-01-back-view-paper-bag など人物の異変とは『人が写らない』点で別。

### 既存との重複精査（共通）

- 台帳 CAM03 の全 23 件（大面積 2 件を含む）と candidate-pool の CAM03 候補（CR-03-xx と要素の状態・関係の CR-03-28〜42）を、対象要素・変化・見え方で照合した。実質同じものは無い。近いもの（AR-03-floor-hole↔AR-03-sunken-opening-floor、AR-03-tube-removed↔CR-03-30/CR-03-04）は各項に差を書いた。制作前に見比べ、実質同じと判断したら取り下げる。
- 昇格元: AR-03-shutter-raised は CR-03-12。採用時に candidate-pool の CR-03-12 の行を削除する（この節では他の行を編集していない）。AR-03-crouching-silhouette は汎用タイプ『crawling figure』の具体化。
- 他カメラとの型の重複: 後ろ姿の人物（CAM01/05/06/08）・猫（CAM02/07/08）は既にあるため、CAM03 では『うずくまる』姿勢と『鳥』にずらした。影だけの大面積（AR-03-floor-shadows）は台帳に同型が無い。

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
