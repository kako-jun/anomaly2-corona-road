# Anomaly Catalog

Corona Road 用の異変在庫。先にこの一覧から必要数を選び、各背景に割り当ててから生成する。

制作順:

1. 実在看板を架空名へ差し替え、sanitized baseline を作る。
2. このカタログから異変の種類と数を決める。
3. 背景依存の異変を、適したカメラ/背景に分配する。
4. 画像が必要なものだけ ChatGPT Images2 + Photoshop 合成で作る。
5. 画像不要の runtime 異変は実装タスクとして分ける。

## 参照した傾向

- Observation Duty 系: object disappearance / object movement / extra object / intruder / camera malfunction / distortion が基本型。
- Exit 8 系: ドア、ポスター、照明、床、人物挙動、通路奥など、反復空間の差分が強い。
- Corona Road では「実在地下街の監視映像」らしさを優先し、序盤は小さく、中盤は確信でき、終盤はルール自体が壊れる構成にする。

## 分類軸

- `asset`: 画像差分が必要。
- `runtime`: CSS/Canvas/Web Audio/状態管理で出せる。画像生成不要。
- `hybrid`: 画像差分と runtime 演出を組み合わせる。
- `background-bound`: 看板、シャッター、通路奥など、特定背景に依存する。
- `background-free`: 画面揺れ、音、camera lost など、背景に依存しない。

## 画像異変

### 物体

- object disappears: 看板、ゴミ箱、椅子、ポスター、消火器、案内板が消える。
- object appears: 置かれていない台車、傘、紙袋、古い人形、カラーコーンが現れる。
- object moves: ベンチ、看板、三角コーン、ゴミ箱が数十cmずれる。
- object floats: 消火器、ポスター、傘立てが少し浮く。
- object duplicates: 同じポスター、案内板、蛍光灯、ゴミ箱が増える。
- object multiplies: 通路に同じ椅子や貼り紙が異常に並ぶ。
- object scales: 看板やゴミ箱が不自然に大きい/小さい。
- object rotates: 貼り紙や看板だけが上下逆、横向きになる。
- object phase: 壁に半分埋まった傘、床から出た標識。
- forbidden object: 屋内に濡れた道路標識、海の浮き輪、墓石のような場違い物。

### 看板・文字・ポスター

- real signage sanitized: 実在店名を架空名に差し替える。異変ではなく公開前処理。
- sign text changes: 店名、出口、営業時間、案内文が別文字になる。
- sign language drift: 日本語看板が英語/記号/読めない文字へ変わる。
- sign count changes: 禁煙/出口/案内ポスターが増える。
- poster face changes: ポスター人物の目線、口、顔の比率が変わる。
- poster watches camera: ポスターの人物が監視カメラ側を見る。
- poster swaps content: 広告が古い白黒写真、顔写真、警告文へ変わる。
- text warning: 壁やドアに短い警告文が現れる。
- text missing: 看板から文字だけ消え、板だけ残る。
- impossible typography: 遠近や曲面に合わない文字が貼り付く。

### 建物・通路

- door opens: 閉じていたシャッター、店扉、非常口が少し開く。
- door missing: 扉が壁になる、入口が消える。
- door extra: 何もない壁に扉が増える。
- shutter state change: シャッターが半開き、内側が真っ黒。
- corridor extends: 通路奥が長くなりすぎる。
- corridor blocks: 通路奥に壁、布、柵、黒い空間が現れる。
- floor pattern changes: タイルの一部だけ模様が変わる。
- floor damage: タイルが割れる、沈む、穴が空く。
- ceiling change: 蛍光灯、配線、天井板の数や向きが変わる。
- perspective bend: 壁や床のパースが少し曲がる。
- impossible geometry: 角が増える、階段が突然ある、通路がループして見える。

### 光・色・環境

- light off: 特定の蛍光灯だけ消える。
- light on: 暗い店内や奥だけ点灯する。
- flicker source: 画像差分では明滅対象を作り、runtimeで点滅させる。
- color temperature shift: 一部だけ赤/緑/青っぽい照明になる。
- shadow appears: 物体なしの影が床や壁に出る。
- shadow wrong direction: 影だけ光源と逆を向く。
- reflection wrong: ガラス/金属面に存在しない人影が映る。
- wet floor: 床が濡れる、水たまりができる。
- flood: 赤茶色/黒い水が通路に流れる。
- fog/haze: 奥だけ霧や煙で白む。
- dust/soot: 壁や天井が焦げる、汚れが増える。
- part color: 監視映像風の中で特定物だけ色が残る。

### 人物・生物

- intruder standing: 通路奥や店先に人影が立つ。
- intruder peeking: 扉、柱、シャッターの隙間から覗く。
- intruder seated: ベンチや床に座る人影。
- human disappears: もともといた人や影が消える。
- faceless person: 顔だけの情報が消える。
- smiling person: 口元だけが不自然に笑う。
- wrong gaze: ポスター/人物がカメラを見る。
- giant/tiny human: 通路奥の人影のサイズが不自然。
- duplicate person: 同じ人物が複数箇所にいる。
- twins: 同じ姿の2人が左右対称に立つ。
- fast figure: 画像では残像、runtimeで一瞬横切る。
- crawling figure: 床や壁際に低い姿勢の人影。
- creature: 小さな非人間、長い手、黒い塊。
- mannequin/doll: 店先に人形が増える。

### カメラ画像そのもの

- frame crop: 同じカメラなのに少しズームされている。
- angle shifted: カメラ角度が数度ずれる。
- focus blur: 一部/全体のピントが外れる。
- exposure shift: 白飛び、黒潰れ。
- compression artifact: ブロックノイズが異常に増える。
- scanline burn: 走査線や焼き付きが増える。
- freeze frame marker: 時刻だけ進むが映像が止まったように見える。
- duplicate feed image: 別カメラと同じ映像になる。

## Runtime 異変

### カメラ・映像

- camera lost: カメラ一覧から1台消える、または黒画面になる。
- camera feed swapped: ラベルと映像が入れ替わる。
- camera label shuffle: CAM番号や場所名がランダムに変わる。
- camera locked: 一時的に特定カメラへ切替不能。
- camera auto switch: 勝手に別カメラへ切り替わる。
- camera delayed: 数秒前の映像のように時刻だけ遅れる。
- camera rewind: 短く巻き戻る。
- camera loop: 同じ数秒をループする。
- shake: 画面が小刻みに揺れる。
- hard shake: 報告を急がせる大きい揺れ。
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
- distant footsteps: 奥から足音。
- running footsteps: 近づく速い足音。
- knock: シャッター/壁/ガラスを叩く音。
- whisper: 聞き取れない囁き。
- reversed announcement: 逆再生の館内放送。
- wrong location sound: 見ていないカメラの音が鳴る。
- report stinger: 異変中だけ短い不協和音。
- silence after report: 正報後に一瞬無音。

### UI・メタ

- report button disappears: 報告ボタンが短時間消える。
- report button moves: 報告ボタン位置がずれる。
- wrong category labels: カテゴリ名だけ入れ替わる。
- disabled category: 正しいカテゴリが一時的に押せない。
- false strike display: strike表示が増えたように見える。
- timer backwards: 時刻が逆走する。
- timer jumps: 0:00/6:00付近へ一瞬飛ぶ。
- time frozen: 映像は動くが時刻が止まる。
- text corruption: UI文字が壊れる。
- language drift: 英語UIに日本語/記号が混ざる。
- notification lies: toastが嘘を言う。
- badge appears without anomaly: 警告バッジだけ出る。
- badge missing: 異変中なのに警告バッジが出ない。
- cursor/hover glitch: desktop時のみカーソルやhoverが乱れる。

### ゲームルール

- extra active anomaly: 同時発生上限を一時的に超える。
- anomaly refuses report: 正しく報告しても一度だけ直らない。
- wrong camera accepted: 別カメラの報告が通る。
- category inversion: 特定時間だけカテゴリ判定が逆になる。
- safe camera unsafe: 何もないはずのカメラでstrike誘導が起きる。
- tutorial rule break: 画面上のルール文が変わる。

## Corona Road 向け初期配分案

MVPでは 40 件を目安にする。

- sanitized baseline: 全カメラ。
- image anomalies: 24件。
- runtime camera anomalies: 6件。
- audio anomalies: 4件。
- UI/meta anomalies: 6件。

フェーズ配分:

- early 12件: 小さな物体、看板、照明、音の違和感。
- mid 16件: 扉、通路奥、人影、camera lost、画面揺れ。
- late 12件: 物理崩壊、人物異常、UI破壊、タイマー異常。

背景別の割り当て基準:

- 看板が強い背景: signage/text/poster 系。
- 通路奥が強い背景: intruder/corridor/door/fog 系。
- シャッターや店先がある背景: door/shutter/peek/knock 系。
- 蛍光灯や天井が目立つ背景: light/flicker/ceiling/shadow 系。
- 余白や暗部がある背景: creature/surreal/reflection 系。
- どの背景にも置けるもの: camera lost、shake、static、audio、UI/meta 系。
