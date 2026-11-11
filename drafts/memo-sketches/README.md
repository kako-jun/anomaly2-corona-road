# 捜査メモの落書き候補

出河さんがメモの余白に描いた絵の候補。全異変に付けず、描いたら面白いものだけを選ぶ（Issue #325）。文字メモと異変IDを共有する。既存のシャッター絵 `git show 09355c6:public/note/corridor.svg` の、少し揺れた灰色の線と青いペンを参照。画像・配置は未承認の案で、ゲームには接続していない。

## 生成・軽量化の記録

- 生成: 組み込み画像生成ツールで、上記シャッター絵をスタイル参照にした透過背景の線画を題材ごとに生成。黒灰色の少し不揃いな線、必要に応じて控えめな青いペン、文字・紙・枠なしを指定。各題材は下表の異変台帳 `prompts/anomalies.yaml` の `detail` に対応する。
- 個別の修正: ビー玉は初回生成が8個だったため、画像生成ツールで1個を取り除いて台帳どおり7個に修正した。
- 保存: 縦横比を維持し、長辺が384pxを超える生成画像だけ384px以下に縮小。透過を保持したWebP（ImageMagick `magick <生成PNG> -resize '384x384>' -quality 75 <異変ID>.webp`）。`-quality 75` は非可逆WebPの品質設定で、元画像が無劣化で残るという意味ではない。
- 検討: 猫の384pxの無劣化WebPと品質75版を紙色の背景に並べて目視比較し、線の見え方を保ちつつ約18KBから約10KBに低減した。紙面への最終表示サイズは未確定なので、ゲーム接続時に実表示でも確認し、必要なら生成元から調整する。
- 生成元のPNGは開発環境の画像生成ディレクトリに置かれた一時的な原本で、このリポジトリには含めていない。長期的な正本はこのディレクトリのWebP。元PNGの永続保存は保証しない。
- 既存の `public/note/*.svg` は各4KB未満で、タイトルの付箋もWebPのため、品質を落とす追加の変換はしていない。

| 異変ID | 題材 | 画像 |
| --- | --- | --- |
| AR-02-cat | シャッター脇の猫 | [猫](AR-02-cat.webp) |
| AR-07-crane | 吊られた折り鶴 | [折り鶴](AR-07-crane.webp) |
| AR-06-reflected-umbrella | ガラスだけの傘 | [映った傘](AR-06-reflected-umbrella.webp) |
| AR-05-aisle-goldfish | 金魚の袋 | [金魚](AR-05-aisle-goldfish.webp) |
| AR-02-tricycle | 三輪車 | [三輪車](AR-02-tricycle.webp) |
| AR-07-shoe-v2 | 片方の子供靴 | [子供靴](AR-07-shoe-v2.webp) |
| AR-05-wind-chime | 風鈴 | [風鈴](AR-05-wind-chime.webp) |
| AR-01-milk-bottle-crate | 瓶の入った木箱 | [牛乳瓶](AR-01-milk-bottle-crate.webp) |
| AR-04-red-telephone | ダイヤル式電話 | [電話](AR-04-red-telephone.webp) |
| AR-04-red-lantern | 赤い提灯 | [提灯](AR-04-red-lantern.webp) |
| AR-06-wet-footprints | 濡れた足跡 | [足跡](AR-06-wet-footprints.webp) |
| AR-01-red-rubber-ball | ゴムまり | [まり](AR-01-red-rubber-ball.webp) |
| AR-03-pendant-lamp | 吊り下がる灯り | [灯り](AR-03-pendant-lamp.webp) |
| AR-04-ceiling-balloon | 天井の風船 | [風船](AR-04-ceiling-balloon.webp) |
| AR-05-marbles-scattered | 床に散らばるビー玉 | [ビー玉](AR-05-marbles-scattered.webp) |
| AR-01-yellow-boots | 揃った長靴 | [長靴](AR-01-yellow-boots.webp) |
| AR-02-floor-footprints | 一方向に続く足跡 | [靴跡](AR-02-floor-footprints.webp) |
| AR-07-wall-clocks | 異なる時刻の時計 | [時計](AR-07-wall-clocks.webp) |
| AR-06-ceiling-umbrellas | 逆さに吊られた傘 | [傘](AR-06-ceiling-umbrellas.webp) |
| AR-04-glass-fog-handprints | 曇りガラスの手形と絵 | [手形](AR-04-glass-fog-handprints.webp) |
| AR-05-floor-white-cranes | 床に敷き詰められた折り鶴 | [折り鶴の群れ](AR-05-floor-white-cranes.webp) |
| AR-01-straw-hat | 床の麦わら帽子 | [帽子](AR-01-straw-hat.webp) |
| AR-07-ceiling-white-sheets | 天井から垂れるシーツ | [シーツ](AR-07-ceiling-white-sheets.webp) |
| AR-02-navy-handy-fan | 小型の携帯扇風機 | [扇風機](AR-02-navy-handy-fan.webp) |
| AR-01-threshold-pigeon | 敷居の鳩 | [鳩](AR-01-threshold-pigeon.webp) |
| AR-02-wall-bird-triplet | 三羽の鳥の飾り | [鳥の飾り](AR-02-wall-bird-triplet.webp) |
| AR-05-aisle-silhouette | 帽子と虫取り網の少年の影 | [少年の影](AR-05-aisle-silhouette.webp) |
| AR-04-floor-shoes-rows | 奥を向いて並ぶ靴 | [並ぶ靴](AR-04-floor-shoes-rows.webp) |
| AR-08-pillar-sparrow | 柱の根元の雀 | [雀](AR-08-pillar-sparrow.webp) |
| AR-06-plant-doll-creature | 葉陰の小さな人形のような生物 | [葉陰の生物](AR-06-plant-doll-creature.webp) |
