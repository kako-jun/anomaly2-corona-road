# Fonts

`caveat-latin.woff2` is Caveat, under `OFL-Caveat.txt`.

`yomogi-start.woff2` is a subset of [Yomogi](https://github.com/satsuyako/YomogiFont) for the Japanese start-screen instructions, under `OFL-Yomogi.txt`. Its characters come from `src/components/StartScreen.tsx` and `src/utils/startScreen.ts`. When either file changes, regenerate the subset and commit it with the text:

```sh
curl -fsSL https://raw.githubusercontent.com/google/fonts/24ddc1f324cac5d9f5aedca126d298f56e3f1640/ofl/yomogi/Yomogi-Regular.ttf -o /tmp/yomogi.ttf
cat src/components/StartScreen.tsx src/utils/startScreen.ts > /tmp/yomogi-text.txt
uv run --with fonttools --with brotli python3 -m fontTools.subset /tmp/yomogi.ttf --text-file=/tmp/yomogi-text.txt --flavor=woff2 --output-file=public/fonts/yomogi-start.woff2
```
