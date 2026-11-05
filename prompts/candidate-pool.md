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

### AR-01-outlets-multiply — 右の壁の小さなコンセントが、縦に何個も増える

- **カメラ**: CAM01（`cam1.webp`、675x900）／対象要素: CAM01-E12
- **型 / カテゴリ / フェーズ / 目立ち度**: `multiply` / `object` / early / subtle
- **物と変化**: 右の店先の脇の白い壁にある小さなコンセントの差込口（元は一つ）が、同じ形・同じ大きさで縦に六個ほど等間隔に並ぶ。ほかの壁面・柱・店先はそのまま。数の増殖で、気づくと壁が穴だらけで不気味。
- **box (x1,y1,x2,y2)**: (468,480,490,540)（22x60）
- **最寄り既存 overlay と実測距離**: 最寄り既存 overlay は AR-01-crouching-silhouette (30.0)、次点 AR-01-yellow-boots (30.0)。右の格子壁一面の AR-01-right-wall-lattice-doors とは大面積の例外（排他）。
- **6倍クロップ範囲**: 6倍クロップ (351,425)–(607,596)（256x171）。box は窓内で (702,330)–(834,690)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: on the cream-coloured wall beside the closed right-hand shop front, in the marked area, the single small wall outlet plate (a tiny white plate with two dark slots) is multiplied: six identical outlet plates now sit in one evenly spaced vertical column on the wall, same size, same dark slots, same dim lighting and perspective as the original. The wall, the skirting and the floor stay exactly as they were. The edit area is about x=702 to 834, y=330 to 690 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: add five more copies of the small white wall outlet plate in the edit area, stacked vertically under and above the original with equal spacing, all in the same perspective and brightness, so that a column of six identical outlets appears. Nothing else is added. The edit area is about x=702 to 834, y=330 to 690 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (blue-grey speckled floor tiles with long white light reflections, a rough grey textured wall on the left, closed shop fronts with wooden lattice doors on the right, white fluorescent ceiling lights). Edit only this: the lone electric outlet on the right wall is replaced by a neat vertical row of about six identical outlets of the same size and colour. The remaining wall texture and lighting are untouched. The edit area is about x=702 to 834, y=330 to 690 in the 1536x1024 frame. All other pixels stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No logos, no watermark.`
- **視認性の見立て**: 元のコンセントは約 6x10 と極小で、複製も小さい。差分の面積は 22x60 に散らばり、白い板と暗い穴は壁の淡色とコントラストがあるが弱め。check-visibility を通らなければ、板を大きめ（実寸比で）にして間隔を詰めない。要つまみ調整（明るさを下げる方向で壁の白と穴の差が出やすい）。
- **台帳登録案**:
  ```yaml
  - id: 'AR-01-outlets-multiply'
    candidate_id: 'AR-01-outlets-multiply'
    camera_id: 'CAM01'
    element_id: 'CAM01-E12'
    base_photo: 'public/images/cam1.webp'
    category: 'object'
    anomaly_type: 'multiply'
    location: 'CAM01-E12 の対象箇所、差分左上 (468,480) 付近（貼り込み後に再計測）'
    detail: '右の壁の小さなコンセントが、縦に何個も増える。'
    overlay: 'assets/anomaly-overlays/cam01/outlets-multiply.webp'
    # phase / 目立ち度: early / subtle
    note: '元の位置のコンセント一つを起点に縦に増殖。右の店先壁は大面積案と排他。'
  ```
- **相互参照 / 重複精査**: AR-01-power-bank（床の黒い物）は物も壁も別。台帳に壁の設備を増殖させる案は無い。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-01-right-wall-lattice-doors（右の店先の壁一面）。併存可=床・天井・左壁。

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

### AR-03-tile-shifted — 床のタイル一枚だけが横にずれ、継ぎ目に黒い隙間ができる

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E16（床）
- **型 / カテゴリ / フェーズ / 目立ち度**: displace / environment / mid / medium
- **物と変化**: 手前左寄りの床の大きなタイル一枚（目地に囲まれた約150px四方）が、右へ数センチずれて、元の位置との間に細い黒い隙間（約8px）が開き、反対側の目地は重なってタイルの端が少し隣へ乗り上げる。タイルの色・斑点は同じ。『同じ物が少し違う位置にある』変化で、色や柄は変わらない（タイルの色・斜め目地の異変とは別）。
- **box (x1,y1,x2,y2)**: (200,790,350,890)（150x100）
- **最寄り既存 overlay と実測距離**: AR-03-tricycle (41.0)、次点 AR-03-blue-floor-tile (43.0)。
- **6倍クロップ範囲**: 6倍クロップ (147,729)–(403,900)（256x171）。box は窓内で (318,366)–(1218,966)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the large floor tile in the lower-left of the frame that fills about x=318 to 1218, y=366 to 966. The whole tile has slid sideways to the right by about 50 px: along its left edge a thin black gap about 48 px wide has opened between it and the neighbouring tile, and its right edge slightly overlaps onto the next tile. The tile keeps exactly the same colour, speckles and reflection. Nothing else changes. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: one floor tile in the area x=318 to 1218, y=366 to 966 is misaligned: it has been pushed to the right, leaving a dark narrow crack on its left side and riding up over the joint on its right side. Same grey speckled stone, same light. All other tiles, joints and reflections stay exactly the same. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the single big floor tile at x=318 to 1218, y=366 to 966 is shifted out of line with its neighbours by about one hand width, so that the joint lines no longer match up along the edge, with a visible black gap on one side. No colour change, no pattern change, no hole, no new object. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-tile-shifted'
    candidate_id: 'AR-03-tile-shifted'
    camera_id: 'CAM03'
    element_id: 'CAM03-E16'
    base_photo: 'public/images/cam3.webp'
    category: 'environment'
    anomaly_type: 'displace'
    location: '手前左寄りの床、差分左上 (200,790) 付近（貼り込み後に再計測）'
    detail: '床のタイル一枚が右へずれ、継ぎ目に黒い隙間ができる。'
    overlay: 'assets/anomaly-overlays/cam03/tile-shifted.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-03-tricycle（box 距離 41px）。大面積 AR-03-floor-tatami とは同じ床の面なので排他。'
  ```
- **視認性の見立て**: 隙間の黒い線が太さ約8px・長さ約100px で面積は小さめ。check-visibility を必ず通す（通らなければ隙間を広げ、乗り上げる側の影を濃くする）。
- **相互参照 / 重複精査**: 床の穴・沈み（AR-03-sunken-opening-floor）、斜め目地（AR-03-tile-diagonal）、タイルの色（AR-03-blue-floor-tile / AR-03-dark-tile）、取り下げ案 AR-03-floor-line-break（目地が消える）とは別で、『タイルが位置ごとずれる』だけ。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-floor-tatami（床の面を使う大面積）。併存可=壁・天井・シャッター・看板の異変。

### AR-03-shutter-dents-many — 左シャッターの下のほうの小さな凹みが、数個から十数個に増える

- **カメラ**: CAM03（`cam3.webp`、676x900）／対象要素: CAM03-E06（左のシャッター）
- **型 / カテゴリ / フェーズ / 目立ち度**: multiply / object / mid / medium
- **物と変化**: 左シャッターの下のほう（床に近い側）に、握りこぶし大の細長い凹みが、もとは数か所しか無いのに、十数個、不揃いに散らばる。凹みはすべて同じ形・同じ向き（横板に沿った細い楕円）で、増えた数だけが不気味。新しい物を足す add_object や同じ物の複製 duplicate とは違い、『もとの傷の数』が増える multiply。
- **box (x1,y1,x2,y2)**: (0,440,62,590)（62x150）
- **最寄り既存 overlay と実測距離**: AR-03-shutter-fingers (33.0)、次点 AR-03-paper-bag (41.0)。
- **6倍クロップ範囲**: 6倍クロップ (0,430)–(256,601)（256x171）。box は窓内で (0,60)–(372,960)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the lower-left part of the closed grey roll-up shutter at x=0 to 372, y=60 to 960. Add about fourteen small horizontal oval dents, each about 40 px long and 18 px tall, scattered irregularly across the slats there, each with a light edge on top and a dark shadow beneath, all with the same shape and the same orientation along the slats. The shutter colour, slats and existing scratches stay as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: many small identical dents appear on the shutter slats in the area x=0 to 372, y=60 to 960: around twelve to sixteen of them, like knuckle-sized bumps pressed from inside, all oval, all aligned with the slat direction, evenly dark in the centre. No other change to the shutter. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (grey speckled floor tiles, a closed grey roll-up shutter on the left, a green glowing standing sign in the middle, white fluorescent lights). Edit only this: the shutter in the area x=0 to 372, y=60 to 960 is dotted with a crowd of identical small oval dents (about fifteen), as if something has been pushing from the inside over and over. Same grey metal, same lighting, no colour change, no hole, no text. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **台帳登録案**:
  ```yaml
  - id: 'AR-03-shutter-dents-many'
    candidate_id: 'AR-03-shutter-dents-many'
    camera_id: 'CAM03'
    element_id: 'CAM03-E06'
    base_photo: 'public/images/cam3.webp'
    category: 'object'
    anomaly_type: 'multiply'
    location: '左シャッターの下寄り、差分左上 (0,440) 付近（貼り込み後に再計測）'
    detail: '左シャッターの下のほうに、同じ形の小さな凹みが十数個に増える。'
    overlay: 'assets/anomaly-overlays/cam03/shutter-dents-many.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-03-shutter-fingers（box 距離 33px）。大面積 AR-03-shutter-blank-papers（シャッターの同じ面）・AR-03-floor-tatami（box が畳の上端と重なる）とは排他。'
  ```
- **視認性の見立て**: 凹み1個は小さいが、十数個の合計面積と影の差で下限を満たす見立て。check-visibility を必ず通す（通らなければ凹みを大きく・数を増やす）。
- **相互参照 / 重複精査**: AR-03-shutter-fingers（隙間から覗く白い指）・AR-03-shutter-wave（板が波形）とは別で、『傷・凹みの数が増える』だけ。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-03-shutter-blank-papers（同じシャッター面）/ AR-03-floor-tatami（box が床の畳の上端と重なる。大面積）。併存可=天井・看板の異変。

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

### AR-06-ceiling-vent-triple — 天井の黒い長方形の換気口と同じ物が、左上の天井にも三つ並ぶ

- **カメラ**: CAM06（`cam6.webp`、675x900）／対象要素: CAM06-E05
- **型 / カテゴリ / フェーズ / 目立ち度**: `multiply` / `environment` / `mid` / `medium`
- **物と変化**: 天井中央の黒い長方形の換気口（元の物はそのまま）と同じ形・同じ黒の格子状の小さな換気口が、左上の何もない天井にも三つ、右上がりの斜めの列で並ぶ（手前ほど大きく、奥ほど小さく、遠近に沿わせる）。元と合わせて4つになる。数が増えるだけで光らず、色も変えない。
- **box (x1,y1,x2,y2)**: (150,4,258,44)（108x40）
- **最寄り既存 overlay と実測距離**: AR-06-lamp-squared (31.0)、次点 AR-06-teru-teru-bozu (32.0)・AR-06-ceiling-balloons (42.0)。大面積 AR-06-ceiling-umbrellas の bbox 内。（台帳の `overlay_origin`＋`dimensions` の矩形距離の実測。制作後は最終 overlay の alpha bbox で再測定する）
- **6倍クロップ範囲**: 6倍クロップ (100,0)–(356,171)（256x171）。box は窓内で (300,24)–(948,264)。
- **生成プロンプト（3 テイク。先頭は `$imagegen` で明示起動。入力は上の範囲を切り出して拡大した 1536x1024 の PNG）**:
  - テイク1: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (a dark grey rough-concrete ceiling, a round white recessed light at the lower left, the top of a red-orange hanging sign at the bottom edge, and a black skewed rectangular ceiling vent at the far right edge). Edit only this: three more black rectangular ceiling vents appear in the empty ceiling at the upper left of the marked area (area about x=300 to 948, y=24 to 264 in the 1536x1024 frame), each the same flat black skewed rectangle with faint slats as the original vent at the right edge of the image, arranged in a diagonal row that gets a little smaller toward the upper left, following the perspective of the ceiling. The original vent is unchanged. The round light, the sign and the rest of the ceiling stay exactly as they are. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク2: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (a dark grey rough-concrete ceiling, a round white recessed light at the lower left, the top of a red-orange hanging sign at the bottom edge, and a black skewed rectangular ceiling vent at the far right edge). Edit only this: the ceiling has a row of identical black rectangular vents: besides the one at the right edge, three copies of the same black skewed vent sit evenly spaced along a line from about (330,230) to (900,50) in the 1536x1024 frame, each about 190 px wide at the nearest and 120 px wide at the farthest, with the same dark slat texture. Nothing else is added or moved. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
  - テイク3: `$imagegen Edit the attached image. It is a 6x enlarged crop (3:2, 1536x1024) of a low-light surveillance photograph of an empty, closed Showa-era underground shopping arcade corridor (a dark grey rough-concrete ceiling, a round white recessed light at the lower left, the top of a red-orange hanging sign at the bottom edge, and a black skewed rectangular ceiling vent at the far right edge). Edit only this: in the empty rough ceiling at the upper left (area x=300 to 948, y=24 to 264) three small black rectangular ceiling vents of the same kind as the one at the right edge are lined up, each slightly smaller than the one before, parallel to the ceiling edge. Their edges are crisp black with a faint lighter rim, like the original. Keep the round recessed light, the hanging sign, the concrete speckles and everything outside the marked area unchanged. Keep the camera angle, framing, zoom, perspective and aspect ratio exactly as the source; do not recompose, re-crop, rotate or zoom. Output 3:2 1536x1024. Match the original low-light surveillance look: cold blue-grey colour grading, fine film grain, mild JPEG compression, soft vignette. No text, no letters, no numbers, no logos, no watermark.`
- **視認性の見立て**: 黒い換気口が灰色の天井に増えるので、黒対灰の差分は大きい（最大差分は 100 を超える見込み）。三つで面積比も十分。標準状態で見える。
- **台帳登録案**:
  ```yaml
  - id: 'AR-06-ceiling-vent-triple'
    candidate_id: 'AR-06-ceiling-vent-triple'
    camera_id: 'CAM06'
    element_id: 'CAM06-E05'
    base_photo: 'public/images/cam6.webp'
    category: 'environment'
    anomaly_type: 'multiply'
    location: 'CAM06-E05 の元の換気口の左上の天井、差分左上 (150,4) 付近（貼り込み後に再計測）'
    detail: '天井の黒い長方形の換気口と同じ物が、左上の天井にも三つ斜めに並び、計4つになる。'
    overlay: 'assets/anomaly-overlays/cam06/ceiling-vent-triple.webp'
    # phase / 目立ち度: mid / medium
    note: '最寄り既存 overlay は AR-06-lamp-squared（box 距離 31px）。大面積 AR-06-ceiling-umbrellas と排他。AR-06-ceiling-checker は元の換気口の面を使うが、こちらは別の天井位置なので併存可。'
  ```
- **相互参照 / 重複精査**: AR-08-ceiling-light-grid（CAM08、丸い天井灯が天井一面に格子状）とは物（黒い換気口と光る丸灯）も数（3つ増と一面の格子）も違う。AR-07-wall-clocks（時計が無数）・AR-01-right-wall-lattice-doors（戸の連続）は壁の面。CAM06 の天井では AR-06-ceiling-checker（換気口の面の模様変化）が同じ換気口を使うが、あちらは元の換気口の面が市松に変わるだけで、増えない。
- **同カメラ内の排他と併存**: 同プレイで共存させない=AR-06-ceiling-umbrellas（天井一面。換気口が傘に隠れる）。併存可=AR-06-ceiling-balloons（距離 42px。天井が賑やかになるので同プレイは避けるのが望ましい）・壁・床・看板・右の蛍光灯の異変。

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
