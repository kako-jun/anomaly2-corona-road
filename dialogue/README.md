# 台詞台帳（dialogue/）

ゲームの会話の**唯一の正本**。ビルド時に `vite.config.ts` の `dialogue-ledger` プラグインが読み、`virtual:dialogue` として配る。書式違反はビルド失敗（該当ファイルと id を表示）。仕組みの経緯は Issue #29、実装は #74、保存は `docs/save-data.md`、設定は `docs/story.md`。

ここにある `*-sample-NN` は動作確認用の実例で、本制作ではない（本制作は量産の型で行い、置き換える）。

## ゲームでの使われ方

再生は `src/hooks/useSubtitle.ts`、選択は `src/utils/dialogueEngine.ts`、時間などの設定値は `src/utils/gameConfig.ts` の `DIALOGUE_CONFIG`（開始待ち 4 秒、雑談の間の無言 30 秒、中間コメント 240 秒）。優先順位は フラグ会話 > 誤報 > 中間コメント > 雑談。誤報は即座に、フラグ会話は表示中の字幕の直後に割り込む（中断された会話の残りは捨てる）。ただしフラグ会話の最中は誤報も別のフラグも割り込まず、待たせる。会話は最初の1行が画面に出た時に使用済みになる（出る前に割り込まれた会話は使われない）。中間コメントも実際に再生した時に済みになる。`closing` の `ending` 台詞は、`child` フラグ成立後に新たに発生した異変を一件も報告せず時間切れになった時に再生され、同時に画面が `public/images/ending-bar.webp`（1か月後のバー）に切り替わる（判定は `src/utils/endingJudge.ts`、Issue #86。令和の印（`REIWA_IDS` が空、#83）が入るまで `child` は通常プレイでは立たず、ending には到達できない（テストと localStorage への手動注入でのみ確認できる）。`final` フラグは使わない。撤収は ending にならない）。

## ファイル

| ファイル             | 種類                                   | `when`                                                             |
| -------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| `flags.yaml`         | フラグの定義                           | （下記）                                                           |
| `opening.yaml`       | 開始時の定番のやり取り                 | なし                                                               |
| `closing.yaml`       | 終了時の会話                           | `result: dawn \| withdraw \| ending`（夜明け／撤収／エンディング） |
| `midpoint.yaml`      | 経過時点の中間コメント                 | `stage: few \| mid \| many`（その回の見つけた数の段階）            |
| `chatter.yaml`       | 雑談                                   | なし（`tone: light` のみ）                                         |
| `story.yaml`         | フラグ会話                             | `flag: <flags.yaml のフラグ名>`                                    |
| `false-report.yaml`  | 共通の誤報の会話（ヒントなし）         | なし                                                               |
| `anomaly-lines.yaml` | 異変ごとの会話（ヒント入りの誤報会話） | `anomaly: <prompts/anomalies.yaml の id>`                          |

## 1通りの形

```yaml
dialogues:
  - id: chatter-sample-01
    tone: light # light | serious
    when: { ... } # 種類ごと（上の表）。「なし」の種類では書かない
    unlock: elder1 # 任意。指定フラグ成立後に候補へ加わる（whenとは独立）
    lines: # 1通り＝2〜4行を想定
      - { who: M, text: '昨日の特番　見ました?' } # who: A（刑事）| M（若い男）
      - { who: A, text: 'いや　興味ないから' }
```

- 通常の会話は2〜4行。`closing` の `ending` だけは、1か月後のバーで自動進行するエンディング会話劇として長い1件にまとめる。
- `id` はファイル全体で一意。接頭辞は種類で決まる: `opening-` `closing-` `midpoint-` `chatter-` `story-` `false-report-`、異変ごとは `an-<異変id>-`（例: `an-AR-01-notice-sample-01`）。末尾は連番（実例は `sample-NN`）。
- `tone`: `serious`（フラグ会話・誤報のヒント・深刻な中間コメントなど）の直後は、一定時間（既定20秒）雑談を出さない。何が `serious` かは台詞ごとの印で決める。雑談は `light` のみ（ビルドで検証）。
- `who`: `A` = ベテラン刑事（おばさん）、`M` = 若い警備員。画面に話者は出さず、口調で見分けさせる。

## 字幕規約（ビルドで検証）

- 句読点（、 。 と半角・全角のカンマ／ピリオド）を使わない。
- 区切りは**全角スペース**。半角スペース・改行・タブは使えない。行の前後の全角スペースは削らずそのまま残る。
- `?` `!` `…` は使える。
- 実在の番組名・商品名・人物名・商標は使わない（伏せるか架空名）。

## フラグ（`flags.yaml`）

フラグの条件は**ここだけ**に書く（節目の数値を他に書かない）。会話側はフラグ名だけを参照する。1つのフラグの条件はすべて AND で、数値は「以上」。

```yaml
flags:
  elder1:
    foundUnique: 20 # 見つけた異変の種類の数（重複なし。foundIds の長さ）
  child:
    foundUnique: 120
    reiwaFound: 3 # 令和の異変を重複なしで3つ
    requires: [elder3] # 他のフラグが先に立っていること
```

使えるキー: `foundUnique`（重複なしの異変数）、`foundTotal`（重複ありの正解報告数）、`reiwaFound`、`loops`（周回数）、`found`（見つけているべき異変 id のリスト）、`requires`（フラグ名のリスト）。定義済みのフラグ名は `elder1` `elder2` `elder3` `child` `childResponse`。`childResponse` は `child` と同時に立ち、直後に短いストーリー会話を再生する。エンディングは累計進行フラグではなく、子供発見後の同一勤務の特殊条件で起動する。節目の数値は**仮の例**で確定ではない（`docs/story.md` 未決）。

`unlock` はすべての会話種類に指定できる任意のフラグ名。`story.when.flag` は「立ったフラグに対応する会話」の指定であり、`unlock` はその会話が候補に入る時期を遅らせる条件。未成立の会話は抽選袋に入らず、使用済みにもならない。成立後は通常の抽選対象になる。未指定なら従来どおり常に候補になる。`flags.yaml` に無いフラグ名を指定するとビルドが失敗する。`loops` 条件のフラグは、周回が終わった次の勤務の開始時に立つ（`foundUnique` `foundTotal` は報告の瞬間に立つ）。
