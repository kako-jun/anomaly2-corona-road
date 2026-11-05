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


### AR-01-ceiling-spider — 天井の継ぎ目に、手のひら大の大きな蜘蛛が張り付く

- **カメラ**: CAM01（`cam1.webp`、675x900）／対象要素: CAM01-E01
- **型 / カテゴリ / フェーズ / 目立ち度**: `add_creature` / `object` / mid / medium
- **物と変化**: 右寄りの天井の粒状の天井板の上に、脚を広げた大きな黒い蜘蛛が一匹とまっている（天井灯のそばの暗い面に濃い影を落とさず、天井に張り付く）。無地・文字なし。無人の地下街に何か生き物がいる異変。
- **box (x1,y1,x2,y2)**: (500,198,550,229)（50x31）
- **最寄り既存 overlay と実測距離**: 最寄り既存 overlay は AR-01-ceiling-tile-drop (30.0)、次点 AR-01-ceiling-panel-round (31.0)。
- **6倍クロップ範囲**: 6倍クロップ (397,128)–(653,299)（256x171）。box は窓内で (618,420)–(918,606)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: add one large black spider clinging to the ceiling board in the marked area of the right half of the corridor ceiling: a glossy dark body about 8 source pixels across with eight long thin angular legs spread to a total width of about 40 source pixels, seen from below, in the correct perspective of the ceiling, with a very soft contact shadow and the same cool blue-grey colour cast as the ceiling. Nothing else is added or changed. The edit area is about x=618 to 918, y=420 to 606 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: a big spider (body and eight jointed legs, black with slightly lighter leg joints) sits on the ceiling surface in the edit area, viewed from underneath. Make it clearly a spider, about a hand-span in real size, and keep the speckled ceiling board, the fluorescent light and all other fixtures exactly as they are. The edit area is about x=618 to 918, y=420 to 606 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: one huge dark spider rests motionless on the speckled ceiling in the edit area, legs spread, partly in the dim light of the ceiling; no web, no text. Keep ceiling texture and the neighbouring light tubes unchanged. The edit area is about x=618 to 918, y=420 to 606 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
- **視認性の見立て**: 黒い蜘蛛は明るい灰色の天井との対比が大きく、最大差分は十分。ただし約 50x31 の中で細い脚が多く、画素数条件は面積比（25%）で通す想定。check-visibility を通すこと。
- **台帳登録案**:
  ```yaml
  - id: 'AR-01-ceiling-spider'
    candidate_id: 'AR-01-ceiling-spider'
    camera_id: 'CAM01'
    element_id: 'CAM01-E01'
    base_photo: 'public/images/cam1.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM01-E01 の対象箇所、差分左上 (500,198) 付近（貼り込み後に再計測）'
    detail: '天井の継ぎ目に、手のひら大の大きな蜘蛛が張り付く。'
    overlay: 'assets/anomaly-overlays/cam01/ceiling-spider.webp'
    # phase / 目立ち度: mid / medium
    note: 'category は camera/object/environment/person/surreal の5分類で生き物は暫定 object（README の方針に従う）。台帳では add_creature。同じカメラの add_creature は AR-01-threshold-pigeon（右の店先の白い鳩）のみで、天井の蜘蛛とは場所も生き物も違う。天井一面の大面積 AR-01-ceiling-lanterns と右の店先の壁一面の大面積 AR-01-right-wall-lattice-doors の両方と box が重なる（大面積の例外。同プレイで共存させない=排他）。'
  ```
- **相互参照 / 重複精査**: 鳩は床の敷居・白い鳥、本案は天井・黒い蜘蛛。台帳に昆虫・節足動物の案は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-01-ceiling-lanterns（天井一面の大面積）・AR-01-right-wall-lattice-doors（右の店先の壁一面の大面積）。併存可=床・壁・右の店先の異変。

### AR-01-window-peeping-face — 左の窓の暗いガラスの上部から、白い顔がこちらを覗く

- **カメラ**: CAM01（`cam1.webp`、675x900）／対象要素: CAM01-E10
- **型 / カテゴリ / フェーズ / 目立ち度**: `add_person` / `person` / late / medium
- **物と変化**: 左手前の縦長の窓の、上部の暗いガラスの面に、色白の無表情な顔が一つ、窓の内側からこちらを覗くように浮かぶ。首から下は暗がりに溶けて見えない。化粧・服・文字なし。報告カテゴリは person になる。
- **box (x1,y1,x2,y2)**: (50,272,108,312)（58x40）
- **最寄り既存 overlay と実測距離**: 最寄り既存 overlay は AR-01-ceiling-lamp-off (56.0)、次点 AR-01-ceiling-seam-circle (56.5)、AR-01-notice (73.0)。同じ窓の AR-01-wiped-window・AR-01-cat-in-frosted-window は窓の下部の明るい曇り面で、box は 75px 以上離れている。
- **6倍クロップ範囲**: 6倍クロップ (0,207)–(256,378)（256x171）。box は窓内で (300,390)–(648,630)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: in the marked area at the top of the tall window on the left-hand wall, where the glass is dark, a pale, expressionless human face appears behind the glass as if someone were standing inside the closed shop and looking out: oval face, closed-lipped mouth, dark eye hollows, short dark hair, a faint cold reflection on the glass over it. The neck and body fade into darkness. Frame, glass tone and surroundings stay exactly the same. No text. The edit area is about x=300 to 648, y=390 to 630 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: add a person's face looking out of the dark upper pane of the left window in the edit area: a pale colourless face with calm unreadable eyes, slightly blurred as through dirty glass, merging into the shadowy room behind. Do not add a body, hands, or any extra object; keep the window frame, the frosted lower glass and the wall unchanged. The edit area is about x=300 to 648, y=390 to 630 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: behind the dark glass at the top of the left window, one white face stares toward the camera: small, flat, almost featureless, partly veiled by the glass reflection and the surveillance noise. Nothing else is changed. The edit area is about x=300 to 648, y=390 to 630 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
- **視認性の見立て**: 暗い窓ガラスに淡い顔が出るので差分は大きい（暗→明）。約 58x40 で面積も十分。check-visibility を通すこと。
- **台帳登録案**:
  ```yaml
  - id: 'AR-01-window-peeping-face'
    candidate_id: 'AR-01-window-peeping-face'
    camera_id: 'CAM01'
    element_id: 'CAM01-E10'
    base_photo: 'public/images/cam1.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM01-E10 の対象箇所、差分左上 (50,272) 付近（貼り込み後に再計測）'
    detail: '左の窓の暗いガラスの上部から、白い顔がこちらを覗く。'
    overlay: 'assets/anomaly-overlays/cam01/window-peeping-face.webp'
    # phase / 目立ち度: late / medium
    note: 'person カテゴリ。窓の上部の暗いガラス＝閉店した店の中に誰かがいる、という見え方で、廊下に人影が立つ AR-01-back-view-paper-bag・AR-01-crouching-silhouette とは位置・見え方が違う（窓の中の顔）。'
  ```
- **相互参照 / 重複精査**: AR-01-cat-in-frosted-window は同じ窓の下部に映る猫の影（reflection）で、場所・対象が違う。同カメラには AR-01-wall-faces（左壁一面に無表情の顔写真が格子状に並ぶ duplicate）があり、顔という題材は近いが、見え方が違う（窓ガラスの奥に顔が一つだけ・生きた人が覗く／壁一面に写真の顔が多数）。同プレイでは共存させない。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-01-wall-faces（顔の題材が近い。box は重ならない）。併存可=床・天井・右の店先の異変。

## 制作仕様（未制作）— CAM 02

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

## 制作仕様（未制作）— CAM 03

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。


## 制作仕様（未制作）— CAM 04

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

### AR-04-rat-left-floor — 左の床際を、黒っぽいネズミが一匹横切る

- **カメラ**: CAM04（`cam4.webp`、676x900）／対象要素: CAM04-E15
- **物と変化**: 左手前の明るい床タイル（x≈125–195, y≈566–600）。左手前の明るい床の上を、灰黒色の大きなネズミが一匹、壁際へ向かって小走りに横切る（横向き、尾は弧を描く）。足元に薄い接地影。
- **box (x1,y1,x2,y2)**: (125,566,195,600)（70x34）
- **最寄り既存 overlay と実測距離**: AR-04-hatch-reflection-extra (33.0)、AR-04-orange-tile (32.0)。
- **6倍クロップ範囲**: 6倍クロップ (32,495)–(288,666)（256x171）。box は窓内で (558,426)–(978,630)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: on the pale grey polished floor tiles at about x=558 to 978, y=426 to 630, one dark grey-black rat is scurrying across the floor in side view, body about 320 px long in this frame, nose pointing left towards the glass wall, tail curled in an S, tiny pink feet, a soft thin contact shadow and a faint blur of motion. Lit by the same cool ceiling light. No other change. The edit area is about x=558 to 978, y=426 to 630. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: add a single large grey-brown rat on the left-front floor tiles (x=558 to 978, y=426 to 630), seen from the side, mid-stride, body about 300 px long, whiskers visible, glossy dark fur reflecting a little of the ceiling lights, natural contact shadow. Nothing else is added or altered. The edit area is about x=558 to 978, y=426 to 630. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (pale speckled ceiling, blue-black glass shopfronts, pale grey polished floor tiles, white fluorescent lights). Edit only this: one dark rat stands on the floor near the left glass wall at x=558 to 978, y=426 to 630, its body slightly raised, head turned toward the camera, tail extended behind it along a floor tile joint, with a short shadow. Colour grading and grain match the surrounding tiles. The edit area is about x=558 to 978, y=426 to 630. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 明るい床に濃い灰黒のネズミは差分が大きい（体長約50x25 px）。通る見込み。毛の暗さで下限を満たす。
- **台帳登録案**:
  ```yaml
  - id: 'AR-04-rat-left-floor'
    candidate_id: 'AR-04-rat-left-floor'
    camera_id: 'CAM04'
    element_id: 'CAM04-E15'
    base_photo: 'public/images/cam4.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM04-E15、差分左上 (125,566) 付近（貼り込み後に再計測）'
    detail: '左手前の明るい床の上を、黒っぽいネズミが一匹横切っている。'
    overlay: 'assets/anomaly-overlays/cam04/rat-left-floor.webp'
    # phase / 目立ち度: mid / medium
    note: '小物。最近傍 AR-04-orange-tile（32.0px）・AR-04-hatch-reflection-extra（33.0px）。左の大面積 AR-04-glass-fog-handprints と box が重なる（大面積の例外・排他）。小動物の分類は猫と同じく object に仮分類（README）。'
  ```
- **相互参照 / 重複精査**: AR-04-left-edge-eyes（暗がりの目だけ・surreal）は『正体を見せない』、本案は『はっきり見える小動物』で別。AR-01-threshold-pigeon（鳩・CAM01）・AR-02-leather-footprints とは種も場所も別。AR-04-puddle とは位置・種が別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-04-glass-fog-handprints（大面積）。併存可=右・天井・奥の異変。

## 制作仕様（未制作）— CAM 05

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

### AR-05-floor-turtle — 手前の床に、大きな亀が一匹いる

- **カメラ**: CAM05（`cam5.webp`、676x900）／対象要素: CAM05-E13
- **型 / カテゴリ / フェーズ / 目立ち度**: `add_creature` / object / mid / medium
- **物と変化**: 手前中央寄りの暗い床に、甲羅が30〜40cmほどのくすんだオリーブ色の亀が一匹、首をわずかに伸ばして立っている（四肢が短く、顔は左前方を向く）。無人の地下街に迷い込んだ生き物。亀に模様や文字は無く、足元に濃い接地影が落ちる。台帳の生き物（猫・金魚・鳩・ヤモリ・雀）とは種も見え方も別。
- **box (x1,y1,x2,y2)**: (205,670,290,740)（85x70）
- **最寄り既存 overlay と実測距離**: AR-05-pet-bottle (31.0)、AR-05-marbles-scattered (51.0)。大面積の AR-05-floor-white-cranes の範囲内（排他）。
- **6倍クロップ範囲**: 6倍クロップ (119,620)–(375,791)（256x171）。box は窓内で (516,300)–(1026,720)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed underground shopping arcade corner (a closed glass-fronted shop block wrapped in grey vertical curtains with a red-brown brick base, large grey square floor tiles, a narrow side aisle on the left with small closed shops, white recessed ceiling lights and a long fluorescent tube). Edit only this: add one large tortoise on the grey tiled floor inside the marked area (about x=516 to 1026, y=300 to 720 in the 1536x1024 frame): a dull olive-brown domed shell with lighter growth rings, a small head stretched a little forward toward the left, four short stubby legs planted on the floor, shell about 450 pixels wide in this frame. A strong dark contact shadow under it and a faint pale highlight along the top of the shell so it stands out from the floor. It has no pattern, no letters, no marks. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text other than what is specified, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed underground shopping arcade corner (a closed glass-fronted shop block wrapped in grey vertical curtains with a red-brown brick base, large grey square floor tiles, a narrow side aisle on the left with small closed shops, white recessed ceiling lights and a long fluorescent tube). Edit only this: in the marked area (about x=516 to 1026, y=300 to 720) a single plain tortoise stands on the floor tiles, seen from slightly above, shell dark olive with a paler edge, head pointing to the left, short legs, a soft dark shadow around its feet. It straddles no tile joint cleanly: the joints run through under its shell naturally. Add nothing else, keep all other floor, light and reflections unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text other than what is specified, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed underground shopping arcade corner (a closed glass-fronted shop block wrapped in grey vertical curtains with a red-brown brick base, large grey square floor tiles, a narrow side aisle on the left with small closed shops, white recessed ceiling lights and a long fluorescent tube). Edit only this: add a single big tortoise (plain, unmarked, olive-green and brown shell, wrinkled legs, calm) on the floor in the marked area (about x=516 to 1026, y=300 to 720), its body about 500 pixels long in this frame, with a dark contact shadow. Do not add any other animal or object. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text other than what is specified, no logos, no watermark.`
- **視認性の見立て**: 灰色の暗い床に、オリーブ色の甲羅と暗い接地影。大きさ約85x70pxで面積は十分。床の明暗に溶けないよう、甲羅のハイライトと接地影を強める。
- **台帳登録案**:
  ```yaml
  - id: 'AR-05-floor-turtle'
    candidate_id: 'AR-05-floor-turtle'
    camera_id: 'CAM05'
    element_id: 'CAM05-E13'
    base_photo: 'public/images/cam5.webp'
    category: 'object'
    anomaly_type: 'add_creature'
    location: 'CAM05-E13 の手前中央寄りの床、差分左上 (205,670) 付近（貼り込み後に再計測）'
    detail: '手前中央寄りの床に、大きな亀が一匹立っている（無地・文字なし）。'
    overlay: 'assets/anomaly-overlays/cam05/floor-turtle.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-05-pet-bottle（box 距離 31.0）。亀の足元が色の濃い接地影を持つこと。報告カテゴリは object（猫・小動物の仮分類に従う）。'
  ```
- **相互参照 / 重複精査**: 生き物の異変は CAM05 に金魚（AR-05-aisle-goldfish）。亀は台帳のどのカメラにも無い。床の人影（AR-05-floor-child-shadow）とも別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-05-floor-white-cranes。併存可=壁・天井・ガラス・通路の異変。

## 制作仕様（未制作）— CAM 06

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。


### AR-06-feet-at-edge — 画面の下端に、こちらに向かって立つ人の足先が見切れている

- **カメラ**: CAM06（`cam6.webp`、675x900）／対象要素: CAM06-E18
- **型 / カテゴリ / フェーズ / 目立ち度**: `add_person` / `person` / `mid` / `medium`
- **物と変化**: 手前の床の下端（画面の最下部）に、通路の奥を向いて立つ人の足先が見切れている。暗い灰色の裾と、飾りのない黒い革靴のつま先が二つ並んで写り、足首から上は画面の外。人は通路にいなかったはずなのに、カメラの真下に誰かが立っている、という違和感。
- **box (x1,y1,x2,y2)**: (200,845,310,900)（110x55）
- **最寄り既存 overlay と実測距離**: AR-06-styrofoam-box (33.0)、次点 AR-06-leaf-shadows-aligned (84.0)。大面積 AR-06-floor-tile-rotated の bbox 内。（台帳の `overlay_origin`＋`dimensions` の矩形距離の実測。制作後は最終 overlay の alpha bbox で再測定する）
- **6倍クロップ範囲**: 6倍クロップ (150,729)–(406,900)（256x171）。box は窓内で (300,696)–(960,1024)（窓の縦 171px は 6 倍で 1026 になるため、1536x1024 へ拡大する際に縦だけ約 0.998 倍に縮め、box の下端は 1024 とする）。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled square floor tiles with thin dark joints seen from above at the very bottom of the frame, a soft white light patch on the tiles, cold blue-grey light). Edit only this: the toes of a pair of plain black leather shoes enter from the bottom edge of the frame in the marked area (area about x=300 to 960, y=696 to 1024 in the 1536x1024 frame), side by side, pointing up toward the far end of the corridor, with the dark grey trouser hems just above them; the legs are cut off by the frame bottom so no more than the shoes and hems show. Soft cold light on the toe caps and a faint shadow on the tile. Nothing else is added or changed. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled square floor tiles with thin dark joints seen from above at the very bottom of the frame, a soft white light patch on the tiles, cold blue-grey light). Edit only this: at the bottom edge of the image, in the area x=300 to 960, y=696 to 1024 of the 1536x1024 frame, two black shoes and the lower hems of dark grey trousers stand on the floor tiles, as if a person were standing just below the camera facing the corridor. The shoes are ordinary plain shoes with glossy toe caps; the person is cut off at the ankle by the bottom of the frame. The tiles, joints and light patch stay as in the source. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled square floor tiles with thin dark joints seen from above at the very bottom of the frame, a soft white light patch on the tiles, cold blue-grey light). Edit only this: add the lower part of one person standing at the bottom of the frame: two dark plain shoes close together and the hems of dark trousers, entering from the bottom edge inside x=300 to 960, y=696 to 1024 (1536x1024 frame), the toes pointing up the corridor, slightly turned outward, with a short soft shadow. Nothing above the ankle is visible. No other change to the floor. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 灰色の明るい床に黒い靴と暗い裾なので、最大差分は 100 超。面積も 110x55 で下限を超える見込み。標準状態で見える。
- **台帳登録案**:
  ```yaml
  - id: 'AR-06-feet-at-edge'
    candidate_id: 'AR-06-feet-at-edge'
    camera_id: 'CAM06'
    element_id: 'CAM06-E18'
    base_photo: 'public/images/cam6.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM06-E18 の画面下端の床、差分左上 (200,845) 付近（貼り込み後に再計測）'
    detail: '画面の下端に、人の足先（黒い靴と暗い灰色の裾）が見切れていて、誰かがカメラの真下に立っている。'
    overlay: 'assets/anomaly-overlays/cam06/feet-at-edge.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-06-styrofoam-box（box 距離 33px）。大面積 AR-06-floor-tile-rotated と排他（前景の床一面）。'
  ```
- **相互参照 / 重複精査**: AR-04-shadow-behind-camera（カメラの背後の人の頭と肩の影だけ）は影、こちらは実物の靴と裾。AR-04-floor-shoes-rows（持ち主のいない靴が床一面に並ぶ）・AR-07-shoe-v2（CAM07、片方だけの子供靴）は持ち主のいない靴で、足首から上の「立っている人」を示さない。AR-06-wet-footprints（足跡のみ）とも別。CAM06 では AR-06-worker（奥の後ろ姿）と違い、手前でカメラの真下。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-06-floor-tile-rotated（前景の床一面がひし形になる。靴の足元の床と合わない）。併存可=その他の小物。

## 制作仕様（未制作）— CAM 07

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

### AR-07-opening-white-figure — 中央の黒い開口の奥に白い服の人が立つ

- **カメラ**: CAM07（`cam7.webp`、675x900）／対象要素: CAM07-E11
- **型 / カテゴリ / フェーズ / 目立ち度**: add_person / person / late / medium
- **物と変化**: 中央の壁にある深い黒色の縦長開口（E11）。下の方は真っ黒で何も見えない。開口の暗がりの下の方に、白い上着と暗いズボンの人が、こちらに背を向けて直立している（高さ約 45px の小さな人影、顔は見えない）。ほとんど動きのない廊下に人が一人いるのが異変。開口の暗さと対照的な白い上着で見える。
- **box (x1,y1,x2,y2)**: (302,293,350,343)（48x50）
- **最寄り既存 overlay と実測距離**: AR-07-warm-light (30.0)。距離は台帳 CAM07 の全 overlay 矩形との実測（大面積の overlay は 30px 規則の例外で除く）。
- **6倍クロップ範囲**: 6倍クロップ (198,233)–(454,404)（256x171）。box は窓内で (624,360)–(912,660)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: add one person: inside the deep black rectangular opening, in its lower part (marked area x=624 to 912, y=360 to 660 in the 1536x1024 frame), a person stands upright seen from behind, wearing a pale off-white jacket and dark trousers, about 45 px tall at original scale (270 px in this frame), standing still with arms down. No face visible. The person is in the dark opening and slightly dimmer than the white wall; do not add any light source. Everything else stays exactly as it is. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: add a single small human figure standing deep inside the black doorway opening, facing away from the camera: pale grey-white jacket, dark trousers, short dark hair, about 270 px tall in this 1536x1024 frame, feet on the dark floor at the bottom of the opening (area x=624 to 912, y=360 to 660). They stand perfectly still. No face, no light, no other change. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground passage hall (glossy grey terrazzo floor tiles with soft white fluorescent reflections, a wide staircase and a white wall with a grey metal door, a dark glass shop front on the left, a dark staircase on the right). Edit only this: inside the pitch-black tall opening in the centre wall, near its bottom, one person stands upright with their back to us: a light cream jacket that catches a little of the corridor light, dark legs, arms hanging down, about 270 px tall in this frame (area x=624 to 912, y=360 to 660). Realistic, low-light, slightly noisy like the rest of the image. Nothing else is added or changed. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: medium。標準状態で見つけられる強さ。つまみで見やすくなる。 登録前に `uv run scripts/check-visibility.py --id` で下限（最大差分 ≥ 40 / 平均差分 ≥ 3 / 差分25以上が100画素以上か面積の25%以上）を確認する。
- **台帳登録案**:
  ```yaml
  - id: 'AR-07-opening-white-figure'
    candidate_id: 'AR-07-opening-white-figure'
    camera_id: 'CAM07'
    element_id: 'CAM07-E11'
    base_photo: 'public/images/cam7.webp'
    category: 'person'
    anomaly_type: 'add_person'
    location: 'CAM07-E11 の周辺、差分左上 (302,293) 付近（貼り込み後に再計測）'
    detail: '中央の黒い開口の奥の下の方に、白い上着の人が背を向けて立つ。'
    overlay: 'assets/anomaly-overlays/cam07/opening-white-figure.webp'
    # phase / 目立ち度: late / medium
    note: '最寄り既存 overlay は AR-07-warm-light（距離 30px、黒い開口の奥の灯）。AR-07-warm-light・AR-07-crane は同じ開口で、人影と灯りが同時に出ると主従が曖昧になるので同プレイで共存させない。AR-07-wall-clocks（大面積・同じ壁面）と排他。人物は暗がりでコントラストが落ちるので、上着の白を強めて check-visibility を通す。'
  ```
- **相互参照 / 重複精査**: 台帳の person は AR-07-stair-figures（右階段の重なる人影）のみ。場所（中央の黒い開口）・見え方（一人が立つ）が別。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-07-warm-light / AR-07-wall-clocks（大面積・重なる）/ AR-07-floor-frost（大面積・距離 9px で近い）。大面積の AR-07-ceiling-white-sheets・AR-07-floor-uphill は遠く、併存可。併存可=階段・右壁・左ガラス・天井・床下側の異変。

## 制作仕様（未制作）— CAM 08

台帳に `planned` で載せた画像案の制作仕様の詳細。制作して昇格したら、その案の `###` 節を削除する。

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
