# 異変候補プール

異変の台帳は `anomalies.yaml`（全異変の正本）。ここは、台帳に planned で載せた画像案の**制作仕様の詳細**（box・生成プロンプトなど）と、案出しの方針の説明だけを置く。

## 正本と運用

- 全異変（制作済み `produced`・未制作 `planned`・runtime）の正本は台帳（`anomalies.yaml`。書式と昇格ルールは [`README.md`](./README.md) の「台帳の書式」）。採用/不採用の状態はプールに持たない。不要な案は台帳から削除する。
- プールに残るのは「残す案の制作仕様の詳細」（下の「制作仕様（未制作）」各節。制作して昇格したら、その案の `###` 節を削除する）と、「Runtime / 背景非依存の異変在庫」節の方針の説明だけ。
- 写っている物の説明・座標・カメラ写真の正本は [`camera-element-inventory.md`](./camera-element-inventory.md)。ここでは要素IDだけ参照し、物体説明や座標を複製しない。
- 画像異変の目標は約300件（総数は `npm run ledger:summary` が真実）。案を足す前に、既存の台帳と重複しないか（対象・変化・見え方・報告カテゴリの類似）を確認する。
- カテゴリは `camera` / `object` / `environment` / `person` / `surreal`、フェーズは `early` / `mid` / `late`。目立ち度は `subtle` / `medium` / `obvious`。
- 文字の改変案は、元の文字を原寸で読み直してから具体的な文言を決める。

## 制作仕様（未制作）— CAM 01

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。



## 制作仕様（未制作）— CAM 02

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

### AR-02-pillar-wax-melt — 柱の左の白い面の下半分が、蝋のように溶けて垂れ落ちる

- **カメラ**: CAM02（`cam2.webp`、676x900）／対象要素: CAM02-E10
- **型 / カテゴリ / フェーズ / 目立ち度**: surreal / surreal / late / medium
- **物**: 中央の白灰色の角柱の左の面の下半分から根元（約 x=272〜318, y=306〜346）。柱の足元には黒い幅木が走る。
- **変化**: 柱の白い面の下半分がとろけて、蝋のように下へ縦に垂れ落ち、根元の幅木の上に白い溜まりを作る（垂れの筋は 4〜5 本、長さ約 40 px）。溶けた跡の面は一段暗い灰色のコンクリートが露出する。壁・床の傷みでなく『物理が壊れる』変化（柱が液体のように流れる）。
- **box (x1,y1,x2,y2)**: (272,308,318,344)（46x36）
- **最寄り既存 overlay と実測距離**: AR-02-chalk-hopscotch (30.0)、次点 AR-02-bw-television (30.0)。
- **6倍クロップ範囲**: 6倍クロップ (167,241)–(423,412)（256x171）。box は窓内で (630,402)–(906,618)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: On the pale-grey square pillar at the centre of the crop, the lower part of its left face (about x=630 to 906, y=402 to 618 in the 1536x1024 frame, down to the black skirting board at its base) melts like candle wax: the white surface droops in four or five long vertical drips, each about 240 px long on screen, and a soft white puddle pools on top of the black base moulding. Where the surface has melted away a darker grey bare concrete layer shows through. Keep the pillar's right face, the pillar's top, the floor and all other objects unchanged. No text, no extra objects. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: Edit only the lower left face of the central pillar, inside x=630 to 906, y=402 to 618 (1536x1024 frame): the pale plaster sags and drips downward like melted wax, long drips ending in a rounded blob resting on the black skirting at the foot. The rest of the pillar, the floor and the corridor are untouched. The drips have the same cold grey-white colour as the pillar and a faint wet highlight. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle right, white fluorescent lights). Edit only this: The base of the pale pillar at the centre is melting: in the area x=630 to 906, y=402 to 618 (1536x1024 frame) the white painted surface runs down in thick wax-like streaks over the dark baseboard, leaving a darker grey mark above. Everything else, including the right face of the pillar and the floor, remains exactly as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 柱の白い面に暗い灰色の露出面と垂れが入るので、境の差分は 40 を超える見込み。平均差分は小さめで、差分25以上の画素は 400 画素規模。垂れの本数と暗い露出面を強めに指示し、check-visibility を必ず通す（通らなければ露出面を広く暗くする）。
- **台帳登録案**:
  ```yaml
  - id: 'AR-02-pillar-wax-melt'
    candidate_id: 'AR-02-pillar-wax-melt'
    camera_id: 'CAM02'
    element_id: 'CAM02-E10'
    base_photo: 'public/images/cam2.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM02-E10 の差分左上 (272,308) 付近（貼り込み後に再計測）'
    detail: '柱の左の白い面の下半分が、蝋のように溶けて垂れ落ちる。'
    overlay: 'assets/anomaly-overlays/cam02/pillar-wax-melt.webp'
    # phase / 目立ち度: late / medium
    note: '最寄り既存 overlay は AR-02-chalk-hopscotch（box 距離 30px）と AR-02-bw-television（30px）。AR-02-floor-footprints（床一面・大面積）と box は重ならないが、溜まりは幅木の上に収め、床の面に出さない。'
  ```
- **相互参照 / 重複精査**: AR-04-ceiling-corner-fold（別カメラ・天井板の角が垂れる）・AR-01-ceiling-wet-stain（別カメラ・天井の染み）とは対象も見え方も別。AR-02-pillar-sign-gone・AR-02-pillar-notice は柱の看板・紙で別。柱の壁面が溶ける案は他に無い。
- **同カメラ内の排他と併存**: 併存可=天井・右壁・左シャッター・床の小さな異変。

## 制作仕様（未制作）— CAM 03

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。


## 制作仕様（未制作）— CAM 04

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

### AR-04-wall-small-door — 右の漆喰の壁に、子供ほどの背丈の小さな扉が現れる

- **カメラ**: CAM04（`cam4.webp`、676x900）／対象要素: CAM04-E14
- **物と変化**: 右端の下部の漆喰の壁面（x≈622–674, y≈598–738。壁と床の境の巾木の線の上）。右の壁の下部に、周りの壁と同じクリーム色に塗られた小さな木の扉（高さ約100 px、通常の扉の半分ほど）が、壁に埋め込まれて現れる。細い暗い枠、丸い真鍮のノブ。下辺は巾木の線に沿う。空間の寸法が崩れた異変。
- **box (x1,y1,x2,y2)**: (622,598,674,738)（52x140）
- **最寄り既存 overlay と実測距離**: AR-04-thermos (47.0)、AR-04-tote-bag (49.0)。
- **6倍クロップ範囲**: 6倍クロップ (420,583)–(676,754)（256x171）。box は窓内で (1212,90)–(1524,930)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: in the lower right plaster wall (the area at about x=1212 to 1524, y=90 to 930), a small closed wooden door appears set flush into the wall: about 270 px wide and 800 px tall in this frame, painted the same cream colour as the wall, with a thin dark frame, a small round brass knob on the left side and its bottom edge following the skirting line (slanted by the corridor's perspective). The wall's plaster texture, the dark pillar to its left and the floor stay. The edit area is about x=1212 to 1524, y=90 to 930. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: add a half-height door to the right wall at x=1212 to 1524, y=90 to 930: cream-painted wood, narrow dark frame, a small round brass doorknob, flat panels, closed, perspective-matched to the receding wall, with a thin shadow line around the frame. Nothing else changes. The edit area is about x=1212 to 1524, y=90 to 930. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: a small child-sized door has appeared in the lower part of the right plaster wall (x=1212 to 1524, y=90 to 930): cream wooden door in a dark thin frame with a round brass knob, standing closed on the skirting line. The plaster around it is unchanged. The edit area is about x=1212 to 1524, y=90 to 930. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: クリーム色の壁に暗い枠と真鍮ノブの輪郭で差が出る。大きさは約50x140 px と十分。通る見込み。check-visibility で確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-04-wall-small-door'
    candidate_id: 'AR-04-wall-small-door'
    camera_id: 'CAM04'
    element_id: 'CAM04-E14'
    base_photo: 'public/images/cam4.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM04-E14、差分左上 (622,598) 付近（貼り込み後に再計測）'
    detail: '右の漆喰の壁の下部に、周りと同じ色の小さな木の扉（真鍮のノブ付き）が現れる。'
    overlay: 'assets/anomaly-overlays/cam04/wall-small-door.webp'
    # phase / 目立ち度: late / obvious
    note: '中型。最近傍 AR-04-thermos（47.0px）・AR-04-tote-bag（49.0px）。右壁の大面積 AR-04-window-alley と box が重なる（大面積の例外・排他）。扉に文字・マークなし。'
  ```
- **相互参照 / 重複精査**: AR-07-mini-door（奥の金属扉の4分の1の複製が床に自立・duplicate・CAM07）とは別カメラ・別の見え方（壁に埋まる実用サイズの小扉 vs 床に立つ複製）。AR-04-door-gap とは別の扉。AR-04-window-alley（壁が窓になる）とは同じ壁で排他。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-04-window-alley（大面積）。併存可=左・天井・奥の異変。

## 制作仕様（未制作）— CAM 05

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 06

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。


## 制作仕様（未制作）— CAM 07

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 08

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

### AR-08-ceiling-hole-upside-corridor — 左の天井に丸い穴が開き、上下逆さの同じ通路が見える

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E01
- **型 / カテゴリ / フェーズ / 目立ち度**: surreal / surreal / late / medium
- **物と変化**: 左上の天井の薄灰色の面に、扁平な楕円（遠近で潰れた丸）の穴が一つ開き、その中に、この写真と同じ通路が上下逆さに見える（床のタイルと照明の反射が上、天井が下）。穴の縁はなめらかな金属の縁取りで、穴の周りの天井の斑点は縁で切れる。物理的にありえない空間の裏返し。AR-08-vent-square（四角い換気口）と違い、穴の向こうが別の空間。
- **box (x1,y1,x2,y2)**: (95,2,185,48)（90x46）
- **最寄り既存 overlay と実測距離**: AR-08-light-blue-bleed (30.0)、次点 AR-08-vent-square (73.0)。
- **6倍クロップ範囲**: 6倍クロップ (12,0)–(268,171)（256x171）。box は窓内で (498,12)–(1038,288)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: a flat oval opening (a circular hole squashed by perspective) appears in the pale speckled ceiling in the marked area at the top left: through it we see the same corridor upside down, with the grey granite floor and its white lamp reflections at the top of the hole and a ceiling with small lights at the bottom, in the same cold blue-grey tones. The hole has a thin smooth metal rim, and the ceiling speckles end sharply at the rim. Everything else is unchanged. The edit area is about x=498 to 1038, y=12 to 288 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: cut one elliptical hole into the ceiling in the marked area; inside it, an upside-down view of this same arcade corridor (floor on top, ceiling below), dimmer than the ceiling around it, with a thin brushed-metal rim and no light spill onto the ceiling. Nothing else changes. The edit area is about x=498 to 1038, y=12 to 288 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: in the marked area of the ceiling, a round hole viewed at a steep angle shows a mirrored-upside-down copy of the corridor: the floor tiles and the lamp reflections are overhead inside the hole. A thin pale rim edges it. The surrounding ceiling's grain and speckles continue right up to the rim. The edit area is about x=498 to 1038, y=12 to 288 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 天井の明るい灰色の面に暗い楕円が開くので、標準でも見える。つまみ（明るさを上げる）で穴の中の逆さの通路が見えやすくなる。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-ceiling-hole-upside-corridor'
    candidate_id: 'AR-08-ceiling-hole-upside-corridor'
    camera_id: 'CAM08'
    element_id: 'CAM08-E01'
    base_photo: 'public/images/cam8.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM08-E01 の左上の天井面、差分左上 (95,2) 付近（貼り込み後に再計測）'
    detail: '左上の天井に楕円の穴が開き、上下逆さの同じ通路が見える。'
    overlay: 'assets/anomaly-overlays/cam08/ceiling-hole-upside-corridor.webp'
    # phase / 目立ち度: late / medium
    note: 'box は左上の天井（x 95〜185、y 2〜48）に収める。AR-08-ceiling-light-grid（大面積）と同じ面なので同プレイで共存させない。最寄り既存 overlay は AR-08-light-blue-bleed（box 距離 30px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-vent-square（四角い換気口）は黒い口で向こう側が見えない。AR-08-floor-water-mirror・AR-08-pillar-second・AR-08-floor-reflection-two-tier は別の surreal。台帳に穴の向こうの空間を描く異変は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-ceiling-light-grid / AR-08-vent-square（天井の左上の面）。併存可=柱・床・右壁の異変。大面積（AR-08-ceiling-light-grid）とは box が重なっても併存可。

### AR-08-floor-tile-upright — 床タイルが一枚だけ、板のように垂直に立つ

- **カメラ**: CAM08（`cam8.webp`、675x900）／対象要素: CAM08-E16
- **型 / カテゴリ / フェーズ / 目立ち度**: surreal / surreal / mid / medium
- **物と変化**: 左手前の床の灰色の大判タイルのうち一枚が、その場でぱたりと起き上がり、墓石のように床に垂直に立つ。立った面は元の斑点模様のまま、足元は黒い四角の穴になり、そこから薄い灰色の埃が一筋たなびく。床のほかのタイルは並んだまま。AR-08-floor-tile-groove（タイルが沈む）・AR-08-tile-concentric（模様が変わる）と違い、タイルが物として動く。
- **box (x1,y1,x2,y2)**: (122,627,172,688)（50x61）
- **最寄り既存 overlay と実測距離**: AR-08-tile-concentric (31.0)、次点 AR-08-n1 (32.0)。
- **6倍クロップ範囲**: 6倍クロップ (19,572)–(275,743)（256x171）。box は窓内で (618,330)–(918,696)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: one grey granite floor tile in the marked area (left foreground) has flipped up and stands upright like a thin slab, about 55 px tall in the source (about 330 px in this frame), its face showing the same fine speckles, with a soft pale highlight on its top edge. Where it was, a dark square hole shows the black underside, with a faint thin trail of pale dust. The neighbouring tiles and joints stay as they are. The edit area is about x=618 to 918, y=330 to 696 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: make a single floor tile stand on its edge, perpendicular to the floor, like a gravestone: its surface keeps the original grey speckled texture and the cool light from the ceiling; its base is a black square opening in the floor with a thin ragged edge. Keep the camera angle, tile joints and nearby reflections exactly the same. The edit area is about x=618 to 918, y=330 to 696 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled granite floor tiles with a few soft white lamp reflections, a square pale concrete pillar in the middle, closed dark-wood glass doors on the left, a black wall with glowing cream panels on the right, a pale speckled ceiling with small ceiling lights). Edit only this: in the marked area of the left foreground floor, one tile is raised straight up, a grey speckled slab with a clean edge catching the light, and its former place is an empty dark rectangular pit. A small wisp of grey dust drifts above the pit. Everything else on the floor remains unchanged. The edit area is about x=618 to 918, y=330 to 696 in the 1536x1024 frame. Everything outside the edit area stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 灰色の床に黒い四角の穴と立ち上がった板が出るので、標準でも見える。つまみ（コントラストを上げる）でさらに。
- **台帳登録案**:
  ```yaml
  - id: 'AR-08-floor-tile-upright'
    candidate_id: 'AR-08-floor-tile-upright'
    camera_id: 'CAM08'
    element_id: 'CAM08-E16'
    base_photo: 'public/images/cam8.webp'
    category: 'surreal'
    anomaly_type: 'surreal'
    location: 'CAM08-E16 の左手前の床タイル、差分左上 (122,627) 付近（貼り込み後に再計測）'
    detail: '左手前の床タイルが一枚だけ垂直に立ち上がり、足元が黒い穴になる。'
    overlay: 'assets/anomaly-overlays/cam08/floor-tile-upright.webp'
    # phase / 目立ち度: mid / medium
    note: '左手前の床の空き（約 55x65）に収める。最寄り既存 overlay は AR-08-tile-concentric（box 距離 31px）。check-visibility を必ず通す。'
  ```
- **相互参照 / 重複精査**: AR-08-floor-tile-groove（タイル一枚が沈んで縁が溝になる）は『沈む』、こちらは『起き上がる』で見え方が逆。AR-08-tile-concentric は模様で別。台帳に床タイルが立つ異変は無い（他カメラの床の穴・沈みとも違う）。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-08-floor-water-mirror（大面積。同じ床面）/ AR-08-tile-concentric・AR-08-floor-tile-groove（床タイルの変化同士）。併存可=柱・壁・天井の異変。大面積（AR-08-floor-water-mirror）とは box が重なっても併存可。

## Runtime / 背景非依存の異変在庫の方針

runtime 異変（画面の乱れ・音・UI・ルール）の在庫は台帳（`anomalies.yaml` の `kind: runtime`）が正本。ここには配分と視点の方針だけを置く。画像差分を作らず、CSS / Canvas / Web Audio / 状態管理で出す。写真要素に紐づかないため要素IDは持たない（効果の実装は別タスク）。

**報告できない系統の扱い**: 報告は「見ているカメラの異変のカテゴリを選ぶ」だけなので、カメラに結びつかない異変（UI・メタ、ゲームルール系）は現状の報告方式では受け付けられず、採用の前提に窓口の設計が要る（#80）（別議論。報告ボタンを消す案も、報告手段を失うため同様）。カメラに結びつく系統（カメラ画像そのもの、音）は現方式のまま扱える。これらは画像系と違い特定のカメラに固定せず、**出現のたびにカメラを無作為に選ぶ**（kako-jun 決定。設計は Issue #70）。

分類軸: `asset`（画像差分が必要）/ `runtime`（画像生成不要）/ `hybrid`（両方）。`background-bound`（看板・シャッター・通路奥など背景依存）/ `background-free`（画面揺れ・音・camera lost など）。

### 配分の目安（初期案。MVP 40 件想定・現状の台帳件数とは別）

本文の件数は現状の pool 件数・台帳件数とは無関係。

- 内訳: sanitized baseline は全カメラ、画像異変 24、runtime カメラ 6、音 4、UI/メタ 6。
- フェーズ: early 12（小さな物体・看板・照明・音の違和感）/ mid 16（扉・通路奥・人影・camera lost・画面揺れ）/ late 12（物理崩壊・人物異常・UI 破壊・タイマー異常）。
- 背景別: 看板が強い背景は signage/text/poster 系、通路奥は intruder/corridor/door/fog 系、シャッター・店先は door/shutter/peek/knock 系、蛍光灯・天井は light/flicker/ceiling/shadow 系、余白・暗部は creature/surreal/reflection 系。camera lost・shake・static・audio・UI/meta はどの背景にも置ける。
- 方針: 序盤は小さく、中盤は確信でき、終盤はルール自体が壊れる構成にする（反復空間の間違い探し系ゲームの差分を参考）。

### 汎用タイプの視点（取りこぼし防止）

画像異変の汎用タイプは `anomaly_type` enum（README）と台帳の画像案で足りる。enum の名前だけでは見落としやすい視点を、案出しのチェックとして残す。

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
