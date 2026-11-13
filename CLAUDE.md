# Anomaly²: Corona Road - Development Documentation

## 🎮 Game Concept

**Anomaly²: Corona Road** is an anomaly detection horror game set in an underground shopping corridor in Japan. The core concept is a meta-horror experience where the rules of anomaly detection themselves break down in later stages.

### Tagline

"Monitor the cameras. Report the anomalies. Trust your eyes... or don't."

> **Setting and story:** the single master is [`docs/story.md`](docs/story.md) (era, case, characters, the twist, open questions). Dialogue is shown as movie-style subtitles (white, tilted 9°, one speaker at a time, no 、 or 。, ！？ and numbers in full-width (０-９; half-width `! ? 0-9` fail the ledger check; `node scripts/fullwidth-ja.mjs` converts, #334 #352); a line breaks only between the phrases the script marks with full-width spaces, a phrase is at most `MAX_PHRASE_CHARS` (`src/utils/subtitle.ts`) characters, `npm run check:subtitle`, #323). A line may carry an optional English `en` (#326; no full-width space or line break, ordinary punctuation allowed, wrapped by words, not by phrases; `npm run check:subtitle-en` prints the untranslated line counts; shown only when the language is English, the line has an `en` and `SUBTITLE_EN_ENABLED` in `gameConfig.ts` is true, which it is not yet: subtitles stay Japanese until the Japanese has been playtested; how to write it: `dialogue/README.md`). The second person exists so that the small hint for each wrong report (お手つき) can be delivered naturally as their lines.

> **Dialogue system direction (kako-jun, 2026-10-30):** the story advances across playthroughs (loops), so progress needs flag management. Dialogue has three patterns: fully random chatter, loop-progress story lines, and per-anomaly lines. Each anomaly gets several alternative lines and a "used once" record to avoid repeats. Design notes and open questions live in Issue #29. Save data design (storage choice, schema, rules): [`docs/save-data.md`](docs/save-data.md).

> **Dialogue wiring (#74):** the ledger [`dialogue/`](dialogue/README.md) is the single source of the lines (`virtual:dialogue`, validated at build). `src/hooks/useSubtitle.ts` plays it: the opening after `openingDelayMs` (4 s), then chatter conversations (2-4 lines) with `chatterIntervalMs` (30 s) of silence between them; a false report cuts in at once (the anomaly's own lines first, then the common ones; one waiting before the opening comes right after it); the spawn hint (#343, priority flag > false report > spawn hint > midpoint > chatter): an anomaly unreported for `hintDelayMs` (45 s of play time) gets an opportunity every `hintMinGapMs` (20 s of play time), and each opportunity speaks with probability `hintChance` (0.5, one roll per opportunity; a miss waits for the next one) - one `spawn-hints.yaml` conversation (its own pool, separate from the false-report `anomaly-lines.yaml`, never marked used and nothing saved, so it repeats while the anomaly stays unreported, avoiding the one shown last for that anomaly); a hit that cannot play within its opportunity (a conversation is on screen) is dropped, not carried over (intended: the effective chance is slightly below `hintChance`), every hint is `tone: serious` so chatter is held back for `seriousQuietMs` after it (by design), it never cuts a conversation on screen, a hint already started is shown to the end, `hintMinGapMs` (wall clock) also spaces two hints, nothing is said for an anomaly without a spawn-hint (no fallback), and `hintEnabled` switches it off (all four in `DIALOGUE_CONFIG`, provisional values to tune by playing; the per-frame check reads the save only for gated entries; `npm run check:spawn-hints` fails on an anomaly with fewer than 3 hints or a duplicate id and prints the most repeated lines and predicates; `dialogue/spawn-hints.yaml` holds 3 conversations per produced image anomaly (a new anomaly must bring its own)); a flag that just rose cuts in after the line on screen (a story already waiting at the start does not cut the opening; it plays right after it), and a flag's story is never cut by a false report or another flag (an unplayed story is kept in the save as `pendingStories` and plays at the next start); a conversation counts as used when its first line is shown; one midpoint comment at `midpointAtSec` (half of `totalDurationMs`, 240 s); at the end the closing conversation plays before the result screen. Any entry may carry `unlock: <flag>`: until that flag is raised it is not a candidate and is not marked used (#266). Selection and priority are the pure functions in `src/utils/dialogueEngine.ts`; counting, flags and loops are saved by `src/utils/shiftProgress.ts` through `src/utils/saveData.ts`. Settings: `DIALOGUE_CONFIG` in `src/utils/gameConfig.ts`. `SaveNotice` shows "進行を保存できません" whenever storage fails. True ending (#86, `src/utils/endingJudge.ts`): once the `child` flag is saved, anomalies come faster and more at once (`CHILD_FOUND_PACING` in `gameConfig.ts`: interval 15 s decided by kako-jun 2026-11-12 (#273), caps 4 / 8 decided by kako-jun 2026-11-11 (#344); reading "the end" as "after the child is found" confirmed by kako-jun 2026-11-12, #325/#344) for the rest of that shift and for later shifts (the flag persists); if time runs out and at least one anomaly appeared after the child was found but none of those was reported, the result is `ending` (a win, one loop; anomalies from before the child and false reports do not count; a withdraw is never `ending`; no `final` flag is used). On `ending` the closing conversation `result: ending` plays over `public/images/ending-bar.webp` (`ENDING_BAR_CAMERA`, shown instead of the camera; the monitor frame stays). It is a virtual camera that exists only for the ending, and its label "CAM 09" is intentional (kako-jun 2026-11-12, #273: it shows how the two are doing afterwards, deliberately not too realistic; it is not one of the 8 cameras): while it is shown no camera select key is lit or pressed, the keys are disabled, and camera keys and edge taps are ignored (`Cabinet`, `CameraStrip` `disabled`), and the REPORT lamp is off too (never lit, never blinking; the REPORT key itself stays, and a report made then is ignored because the shift has ended). The OSD reads "CAM 09" (`osdNumber`). After that the ordinary win screen follows. Reaching it saves `endingReached` (#294): `startGame` then refuses to start, the result note's handwritten action becomes "Back to title" and the title offers START OVER only (one confirmation, then `resetProgress()` wipes everything but the display settings and raises the save's `epoch` (generation number) so the reset also wins over other tabs' older memory; the source of truth is `docs/save-data.md`). Reiwa anomalies (#83): an image+produced ledger entry with the explicit optional field `reiwa: true` (validated by the ledger parser; currently the six CR-RZ-01..06 entries; `candidate_id` is only a production number and is not used to decide) carries `reiwa: true` in `virtual:anomalies`, and `REIWA_IDS` in `shiftProgress.ts` is derived from those (no id list in code; the ledger is the only source). `child` therefore rises once the `dialogue/flags.yaml` condition holds (3 distinct Reiwa reports + `foundUnique` + `elder3`). Reiwa entries are not draw candidates until the `elder3` flag is saved (`pickLedgerEntry`'s `reiwaUnlocked`, read from the save at each spawn, so one raised mid-shift counts from the next spawn); after that they form one group in the draw (#286): while both Reiwa and ordinary candidates exist, `REIWA_DRAW_SHARE` (provisional 6%, in `gameConfig.ts`) of the spawns go to Reiwa and the rest to the ordinary weighted draw; if only one side has candidates it is used as is (no extra rng call), so nothing-left / camera-full fallbacks and repeat avoidance are unchanged. The sound Reiwa anomalies (CR-RZ-07..09, non-image) are synthesized and wired (#79); the sound foundation is in (`docs/audio.md`: `src/utils/audioEngine.ts` shared AudioContext unlocked by the first user gesture + master volume / mute, silent fallback on any failure; `audioSettings.ts` saves `settings.volume` (0-100; 0 is the mute, there is no separate mute switch; a legacy `muted: true` in an old save reads as 0 and is dropped on the next save); `synthSounds.ts` WebAudio recipes; the ledger's 18 sound entries are classified there as synthesizable or needing recorded/generated material; the VOL knob next to BRIGHTNESS / CONTRAST on the control panel sets the volume, decided by kako-jun 2026-11-12: knob rather than a mute button; normal sounds and twelve synthesized sound anomalies play; tuning by ear remains). Result memos (#325): the ledger's optional `memo_flag` (`shutter` / `food` / `reiwa`, a name or a list; `reiwa: true` also raises `reiwa`) and `memo` (`ja` / `en` one-liner) reach the game as `memoFlags` / `memo` in `virtual:anomalies`; a correct report queues them in the save (`pendingMemoFlags`, `pendingMemos`), and when the shift ends `recordShiftEnd` picks at most one hypothesis (oldest waiting whose `knownFrom` stage is reached; wording `MEMO_FLAG_TEXT` in `investigationNotes.ts`, confirmed by kako-jun 2026-11-12, #325/#344) and one one-liner (seeded random among the waiting, `src/utils/memoSelect.ts`), moves them to shown, and writes them into `lastShift` so the result note shows the same lines when reopened; nothing is shown twice, the rest carries over, ERASE ALL clears all four lists; every ledger entry carries a `memo` (stage 2 of #325: 374 entries, Japanese 20 characters / English 40 at most, no wording or motif repeated; a new entry must bring its own, vitest requires it). The wording was approved by kako-jun (2026-11-12) and the ledger is the only master: fix a line by editing `prompts/anomalies.yaml` directly (there is no regeneration script; the draft and its script are deleted). "シャッター" is allowed inside a memo only as the name of the object seen in the feed (kako-jun, Issue #325); the hypothesis line `MEMO_FLAG_TEXT` stays `knownFrom: 'child'` and the other spoiler words stay banned in memos; if an edit adds a character that is not in `public/fonts/note-chars.txt`, vitest (`investigationNotes.test.ts`, which reads every ledger `memo`) fails until the list gains it and `scripts/build-note-fonts.py build` is rerun (`npm run check:note-fonts` then verifies the woff2 has every listed glyph). `npm run check:note-wrap` measures every `memo` of the ledger and renders the widest game-drawable one; the note fonts grew with the characters (`docs/save-data.md`, `prompts/README.md`

> **Memo scribbles (#325):** the ledger's optional `memo_image` (`<id>.webp` in `public/note-sketches/`, only on an entry with a `memo`) draws a doodle beside an anomaly's one-liner on the result note. Layout, budget and checks: DESIGN.md (the investigation note); how to add one: `prompts/README.md`; no save key (`docs/save-data.md`).

---

## 📋 Game Specifications

### Core Mechanics

> **Direction (kako-jun, 2026-10-30):** the rules below are the _current implementation_ and are provisional. Corona Road is meant to be much harder and more analog than typical anomaly games (target ~300 anomalies, retro display and knobs; see `DESIGN.md` §11 and `prompts/README.md`). It will **not** use the standard rule of being attacked when time runs out and losing life. Direction so far: each wrong report (お手つき) gives the player a small hint, and the number of wrong reports allowed is kept strict (low) so that spam-reporting is not a viable strategy. The other rules (timing, any other way to lose) are undecided.

#### 1. Time System

- **Total Duration**: 8 minutes (480 seconds)
- **In-game Time**: 22:00 - 06:00 (`msToGameTime`; label `TIME`)
- **Real-time Mapping**: 1 real second = 1 in-game minute
- **Phases**: thirds of the shift (derived from `totalDurationMs`)
- **Win Condition**: Survive until 06:00 AM

#### 2. Anomaly System

- **First Anomaly Delay**: 12 seconds
- **Spawn Interval**: 30 seconds (cap of 4 concurrent, 8 once the child is found — see Game Balance)
- **Total Anomalies**: up to 16 per 8-minute playthrough (16 if every anomaly is reported promptly; fewer if reports lag so far that the simultaneous-anomaly cap blocks spawns)
- **Source**: the anomaly ledger `prompts/anomalies.yaml` (single source of truth for ALL anomalies: image / non*image, produced / planned; terms: glossary in `prompts/README.md`; format and promotion rule in `prompts/README.md` "台帳の書式", counts via `npm run ledger:summary [ledger path]`, Node >=22.18 for type stripping, see `engines` in package.json). The game draws from `kind: image` + `status: produced` entries and from `kind: non_image` + `status: produced` ones (the latter only when an effect exists for the id, see "Non-image anomalies" below). Each image one is a transparent WebP overlay (`assets/anomaly-overlays/camNN/*.webp`) drawn over the camera's base photo at the ledger's pixel position. The game never tells the player where or what: no description, no on-screen marker (the REPORT lamp only counts how many are still unreported, #344); the one exception is the spawn-hint subtitle (#343), which says only a direction or position, never the kind, and only after an anomaly stayed unreported for a while — spotting the difference \_is\* the game (#5).
- **How it is wired** (#46): `vite.config.ts` validates every ledger entry and reads the image+produced ones into the `virtual:anomalies` module (only `id`, camera, category (the first of the ledger's `category`), optional `categories` (all correct reports when `category` is an array), `anomaly_type`, overlay path, origin, size, and `reiwa: true` for a Reiwa entry; a broken entry fails the build and names the entry); `src/data/anomalyLedger.ts` resolves overlay URLs; `src/utils/anomalyLedger.ts` / `anomalyData.ts` / `anomalyOverlay.ts` are the pure parse / pick / placement helpers; `CameraView.tsx` draws the overlay (order: base photo, glow, overlay, then scanlines etc.); the overlay images are preloaded on idle time once play starts (`src/utils/preload.ts`). Minimum browser: CSS container query size units (Safari 16+ / Chrome 105+ / Firefox 110+); older ones show the photo uncovered but visible, and overlay percentages still hold. Selection (#221): only a camera with no anomaly now and an entry not already used this shift, drawn in four steps so the ledger's skew (many `add_object`, few `displace`) is damped: camera (uniform), then category (weighted by its unused count ^ 0.75), then `anomaly_type` (same weight), then one entry (uniform); the counts are the unused entries inside the chosen camera, and the exponent is `DRAW_WEIGHT_EXPONENT` (0.75) in `gameConfig.ts` (0 uniform, 1 proportional to count); empty categories / types are never candidates; when the ledger runs out, spawning stops; if only no camera is free, it retries after 1 s instead of waiting a whole interval; an entry whose image cannot be resolved is skipped with a console warning. Playthrough-to-playthrough repeat avoidance needs save data (not implemented, `docs/save-data.md`).
  - **Non-image anomalies in play** (#77): `virtual:non-image-anomalies` (vite.config.ts) hands over the `kind: non_image` + `status: produced` entries (`NonImageEntry`: no camera, no overlay). They use the same slot as image ones: the same cap (4, 8 after the child), one anomaly per camera, no id twice in a shift, retry after 1 s when no camera is free. `pickSpawn` (`src/utils/anomalyData.ts`) first decides the side while both sides have a candidate (Reiwa is split off first, `REIWA_DRAW_SHARE` of all draws, so Reiwa stays ~6%; then one extra rng call: `NON_IMAGE_DRAW_SHARE` in `gameConfig.ts`, PROVISIONAL 20%, validated to [0, 1], phase weights undecided), then draws an image entry as before or a non-image entry (type weighted like images, then the entry) on a camera drawn **at random from the free ones every time** (the ledger fixes no camera, #70). An entry appears only if `src/utils/nonImageEffects.ts` has an effect for it (`hasNonImageEffect`; test `nonImageSpawn.test.ts` reads the ledger: every produced non_image entry has an effect). Draw gates (`spawnableEntries` / `EntryGate`, applied to both sides): the ledger's `unlock: { flag }` keeps an entry out until the flag is saved (`load().flags`; the flag name is checked against `dialogue/flags.yaml` at build time), its `exclusive` group keeps it out while an unreported anomaly of that group runs (`Anomaly.exclusiveGroup`), and `sound` entries are out while `isAudible()` (`audioSettings.ts`: saved volume > 0 and not muted) is false - one already running stays. An entry waiting on a gate is not "exhausted": the spawner keeps retrying. A `feed_glitch` carries a kind picked at random among those of its ledger id (exposure: bright or dark; shake: small or hard) and `useGameState` returns `feedGlitchHere`, the glitch of the unreported feed_glitch on the watched camera, which `Cabinet` passes to `CameraView` (`?glitch=` still wins in dev). **Reporting** (`src/utils/reportTarget.ts`): an unreported anomaly is a target if it is `scope: monitor` (ui_corruption, rule_break: any camera, `reportScopeOf`) or on the watched camera (image, feed_glitch, sound); the correct category (the ledger's `category` array) clears it - it gets `detectedAt`, so everything drawn from it (overlay, glitch) simply stops; a wrong one is a false report as before, and the right category from another camera is false for a camera-scope anomaly. A reported non-image anomaly counts like an image one: `recordFound(id)` adds it to `foundIds` (so it counts toward the milestones 10/30/60/100, `foundUnique`, and keeps the true-ending check (`afterChildIdsRef`) and the memo/Reiwa lookups working: `MEMO_INDEX` and the Reiwa ids read both lists).
- **Categories**: 5 types (the ledger's `category` is one string or an array (#347: players should not lose a report over a near-miss kind): the first is the primary (feedback `CONFIRMED — …`, the draw, per-category counts, the `feed_glitch` check), any listed one is a correct report; a thing on a wall, the floor or the ceiling (any thing, animals included; stuck / hung / placed / dropped / scattered) lists both `object` and `environment`, because a correct report is any category whose key note fits (#347; not floating things, things on a stand or shelf, behind glass, or light / shadow only; `prompts/README.md`); an image entry cannot have `camera` first but may list it second or later for a big surface change; counted by `npm run ledger:summary`; definitions and the subject-based boundary are in `prompts/README.md` "カテゴリ"; the correct report is the category of the anomaly on the camera you are watching). The SELECT CATEGORY dialog shows a handwritten note under every key (always visible, English only; font Caveat self-hosted in `public/fonts/`, OFL). The investigation note (result screen and the screen before a shift, #297; each sentence is tagged `knownFrom` and shown only from the stage where the detective can know it, pinned by vitest) and the title's sticky-note pictures follow the browser's language (ja/en, decided from `navigator.languages` at every start, never saved, no switch on screen, #292; `settings.language` in the save is reserved and unused); machine parts stay English; Japanese note fonts (Zen Kurenaido, Yomogi, OFL) are subsets in `public/fonts/` rebuilt by `scripts/build-note-fonts.py`
- **Category notes (#346)**: the sticky note under each key of SELECT CATEGORY is a picture per category and language (`public/report-notes/{ja,en}-<category>.webp`, the language follows the browser, the keys stay English). The words are the single table `src/data/reportNotes.json` (bullets, same content as the category definitions in `prompts/README.md`; change both together); `scripts/report-notes.py` draws the pictures from it (`alt=""`, the words are an sr-only text for `aria-describedby`). Preloaded on idle time for the browser's language (`preloadReportNotes`, #396), outside the 800KB UI budget with their own ceilings (`reportNotes.ts`). Details: DESIGN.md, REPORT row.
  - Camera: the whole feed going wrong (picture glitches). Handled as a non-image anomaly, not an image overlay, so no `kind: image` entry uses it (the ledger carries it as a `feed_glitch` non_image entry); changes to a thing in the picture are Object. Feed-glitch rendering (#78): `src/utils/feedGlitch.ts` maps each effect (17 kinds) to its ledger id (RT-FEED-01-06, 11, 19-26; test `feedGlitch.test.ts`); `CameraView` takes `feedGlitch` and draws it only on the watched camera's `.glass` (`data-glitch`, `src/styles/feedGlitch.css`, SVG filters `FeedGlitchFilters.tsx`, canvas `GlitchCanvas.tsx`). The loupe magnifies the glitched picture too (`Loupe` gets `data-glitch`; the same CSS rules apply to the magnified frame, scaling about the held spot; monitor-sized layers (blocks, dead pixels, burn, black frame, black screen) sit with the noise in `.loupe__fx`, so grain and lines stay at monitor size; a lost feed is black in the loupe). Knobs, edge tap and report keys are unaffected (the effect layers are `pointer-events: none` and the glass keeps its box). RT-FEED-11 shows `NO SIGNAL` so it is not mistaken for a failed photo load. RT-FEED-07-10 and 12-18 are skipped for now (reasons in each entry's `note`). In play a produced `feed_glitch` entry spawns on a random camera and is cleared by a Camera report on that camera (#77, see "Non-image anomalies in play" above); the dev-only `?glitch=<kind>` (`import.meta.env.DEV`; a production build ignores it) still forces one on every camera. RT-FEED-01-06, 11, 19-26 are `produced`.
  - Object: Physical items appearing/disappearing/changing
  - Environment: Lighting, structure, atmosphere changes (boundary with Object: see `prompts/README.md`)
  - Person: Human figures, shadows, movements
  - Surreal: Reality-breaking phenomena

#### 3. Phase System

Anomalies become progressively more disturbing and rule-breaking:

> The phases below are the design intent. The implementation currently does not weight the ledger by phase (the entry comes from the four-step draw in "Selection" under "How it is wired": camera, then category, then `anomaly_type`, then one unused entry); `Anomaly.phase` is only recorded.

**Early Phase (22:00 - 00:40 in game, 0-160 s real)**

- Small, subtle anomalies
- Focus: Objects and environment
- Examples: Missing signs, flickering lights, frozen timestamps

**Mid Phase (00:40 - 03:20 in game, 160-320 s real)**

- More obvious environmental changes
- Introduction of human elements
- Examples: Camera angle shifts, corridor elongation, backwards movement

**Late Phase (03:20 - 06:00 in game, 320-480 s real)**

- Surreal and meta-anomalies
- Rules themselves break down
- Examples: UI corruption, time reversal, impossible geometry
- **10% chance for meta-anomalies**

#### 4. Meta-Anomaly System

Meta-anomalies challenge the player's trust in the game interface itself (not implemented; the old placeholder text templates were removed in #46):

- Report button disappears
- Camera labels randomize
- Timer runs backwards
- UI text becomes corrupted
- Multiple cameras show identical feeds

#### 5. Win/Lose Conditions

**Win Conditions:**

- Survive until 06:00 AM
- Correctly report at least 4 anomalies

**Lose Conditions:**

- 3 false reports (strikes)
- Missing too many anomalies (< 4 detected)

---

## 🎨 Design Philosophy

### Atmosphere

- **Retro Horror**: Inspired by analog horror and surveillance footage aesthetics
- **English-only UI (HUD and equipment labels)**: Creates alienation and professional surveillance system feel. Subtitles are Japanese (see `docs/story.md`); the title notes follow the chosen language (DESIGN.md §7)
- **Minimalist**: Focus on tension, not jump scares
- **Showa Era Aesthetics**: 1960s-80s Japanese underground corridor design

### Accessibility

- **Color-blind Safe**: Anomaly categories are always text labels, never color-only and never emoji (see DESIGN.md §2.3)
- **Multi-input controls**: keyboard (← → / A D / 1–8), the numbered camera buttons, and a short tap on the monitor's frame (left band = previous, right band = next; never on the picture, #354) — all these paths switch cameras
- **Magnifier loupe (#341)**: press the monitor's picture (`.glass`) and a round loupe shows on the control panel at once, with no hold wait (#409, kako-jun 2026-11-13; it was a 180 ms hold before); moving while pressing moves the magnified spot (smoothed), letting go removes it. There is no camera swipe or drag any more: sideways movement only moves the loupe, never the camera (cameras change by frame tap, number buttons, keys). `.glass` is `touch-action: none` so the browser takes no scroll / zoom gesture from a press on the picture. A short tap on the picture flashes the loupe for a moment (accepted); `LOUPE.TAP_MAX_MS` (180 ms) and `TAP_SLOP_PX` (12 px) are now only the ceilings of a short tap (edge tap, knock). Only the picture is magnified (`ZOOM`); the noise and scanlines are drawn above it at the monitor's own size (same grain). All numbers are in `src/utils/loupe.ts`. No on-screen hint explains the loupe (kako-jun's instruction, 2026-11-12). Pointer events for touch / mouse / pen; mouse / touch only (no keyboard)
- **Noise off (#342)**: shaking the phone or double-tapping the picture switches the noise grain (`NoiseCanvas`, its tear bands included) and the horizontal scanlines (`.scan`, the only horizontal-line layer on the monitor; kako-jun: "noise" means the lines too) off for `NOISE_OFF_MS` (10 s); glare, vignette, REC / CAM and the picture stay; the opacity goes to 0 by a CSS transition (`.glass.noise-off` / `.loupe.noise-off` on `.noise` and `.scan`, `loupe.css`, pinned by `noiseOffCss.test.ts`), so the loupe's grain and lines go too. A new shake / knock restarts the 10 s (no adding up, no cool-down, nothing saved). Knock = two short taps that began on the picture (`.glass`), the second ending within `KNOCK_GAP_MS` and `KNOCK_SLOP_PX` of the first (`isKnock`; the exit is `onKnock` of `useLoupeGesture`: a single short tap on the picture still does nothing apart from the loupe flash; every way out of a press except a short tap on the picture (a long press, a drag, a bezel tap) clears the pending first tap; mouse double-click is the same). Shake = `SHAKE_COUNT` peaks over `SHAKE_THRESHOLD` (m/s^2, gravity-free acceleration, else gravity-included minus 1 g) within `SHAKE_WINDOW_MS`; a peak counts only on the way up (the strength must have dropped to the threshold or below since the last one, so one long hard movement is one peak), peaks closer than `SHAKE_MIN_GAP_MS` are one; a hidden tab ignores motion (`createShakeDetector`, `useNoiseOff.ts`). iOS: `DeviceMotionEvent.requestPermission()` is called only inside a tap (`click` on `.bezel`), refusal / error / no API = the shake is silently off (the knock always works); elsewhere the shake listens from the start. All numbers are in `src/utils/noiseOff.ts`. There is no on-screen label for it, by kako-jun's decision ("案内文字はいらない", 2026-11-12: no guidance text on the screen). With `prefers-reduced-motion` the feature is off (read when triggered). The real-phone shake (threshold feel, iOS prompt) is to be confirmed on a device
- **Edge tap (#354)**: a short tap (released within `LOUPE.TAP_MAX_MS`, moved at most `TAP_SLOP_PX`) on the left of the monitor goes to the previous camera, on the right to the next (cameras wrap, like the number keys). The pointer handlers are on the whole `.bezel`: the zone is only the frame outside the picture: left of the `.glass` box = previous, right of it = next (`edgeTapDirection` in `src/utils/loupe.ts`); the top / bottom band counts only in those same columns, so the corners extend the side bands. The direction and the zone test use the x where the press began, and only a press that began on the frame counts: a press that began on the picture (`.glass`) never switches, wherever it is released. A tap on the picture does nothing, short or not, and the middle of the top / bottom band does nothing. A press that drifted past `TAP_SLOP_PX` or was held never switches. The loupe only starts for a press that began on the picture (`.glass`). The zone is invisible: no mark or label is drawn (see DESIGN.md, no guidance on the monitor screen); the number buttons and the arrow keys do the same
- **Clear Feedback**: A green / red on-screen display (OSD) message on the monitor for every report (correct / wrong)
- **Mobile-first, desktop-equal**: 480 px column on desktop, full-bleed on mobile; never assumes a touchscreen

### Visual Design

See **DESIGN.md** for the unified design system (Material 3-inspired tokens for color, typography, spacing, elevation, and motion). All component CSS references `:root` CSS variables — no hardcoded hex in components.

- Scanline CRT overlay
- Monospace JetBrains Mono stack
- Google-family semantic palette (green/blue/amber/red/violet)
- Vignette on the camera feeds; nothing on the picture changes to signal an anomaly

---

## 🏗️ Current Implementation Status

### ✅ Completed Features

#### Core Systems

- [x] Game state management (idle/playing/win/lose)
- [x] 6-minute game loop with real-time conversion
- [x] Anomaly spawning system (first at 12 s, then every 30 s; see Anomaly System)
- [x] Phase-based difficulty progression
- [x] Win/lose condition checking

#### UI Components

- [x] Start screen with instructions
- [x] Display windows (shift time, reports, strike lamps)
- [x] Camera view (frame-tap / button / key controls; the swipe was removed in #409)
- [x] REPORT key and type-picker dialog
- [x] REPORT lamp blinks while 3+ anomalies are unreported (`ALERT_UNREPORTED_MIN` in `gameConfig.ts`, `shouldAlert`; steady lit under reduced motion; no caption by decision; #344)
- [x] Game over screens (win/lose)

#### Camera System

- [x] 8 camera feeds defined (with provisional WebP imagery)
- [x] Multi-input navigation (keyboard / numbered buttons / frame tap; swipe and drag removed in #409)
- [x] Numbered camera buttons with a green selected lamp (no anomaly indicator)
- [x] Anomalies shown as transparent overlay images on the base photo, with the same brightness / contrast filter as the photo
- [x] Monitor OSD (`CAM n`, REC)

#### Anomaly System

- [x] 5 anomaly categories implemented
- [x] Ledger-driven anomaly selection (`prompts/anomalies.yaml`)

#### Reporting System

- [x] Category-based reporting (5 types, text labels)
- [x] Correct/incorrect detection
- [x] Strike counter (3 max)
- [x] Report button **always enabled** — false reports cost a strike (intentional risk/reward; the player decides when to act)
- [x] OSD result message on the monitor for every report

#### Visual Polish

- [x] Unified design-token system (see DESIGN.md)
- [x] Retro CRT cabinet UI: scanlines, moving noise, knobs (brightness / contrast / VOL), movie-style subtitles (see DESIGN.md §8, §11; lines come from the dialogue ledger, sample text only until it is written)
- [x] Monospace JetBrains Mono styling
- [x] Material 3-style semantic palette
- [x] Mobile-optimized layout, centered on desktop

#### DevOps

- [x] GitHub Actions deployment
- [x] Automatic publishing (Cloudflare Pages on push to `main`)
- [x] ESLint + Prettier setup
- [x] Vitest + Testing Library (see Testing below)
- [x] Pre-commit hooks (Husky + lint-staged)
- [x] TypeScript strict mode

---

## 🚧 Future Implementation Roadmap

### Phase 1: Visual Content (High Priority)

#### 1.1 Camera Feed Images

**Goal**: Replace placeholder with actual Corona Road imagery

**Tasks:**

- [ ] Source reference photos of underground corridors
  - Real Corona Road (大阪コロナの地下街) if possible
  - Alternative: Similar Japanese underground shopping areas
- [ ] Create 4 distinct camera angles
  - North Entrance
  - Main Corridor
  - South Exit
  - Underground Junction
- [ ] Process images for surveillance camera aesthetic
  - Lower resolution
  - Slight blur/grain
  - Desaturated colors
  - Timestamp overlay

**Tools:**

- Photography/photo sourcing
- Image editing (Photoshop/GIMP)
- AI upscaling for consistency

#### 1.2 Anomaly Image Generation

**Goal**: Create visual representations of each anomaly

**Tasks:**

- [ ] Generate anomaly variations for each base image
  - Use AI (Stable Diffusion, Midjourney) for modifications
  - Manual editing for subtle changes
- [ ] Create anomaly image sets
  - Early phase: 3-4 variants per camera (12-16 images)
  - Mid phase: 4-5 variants per camera (16-20 images)
  - Late phase: 5-6 variants per camera (20-24 images)
  - **Total: ~50-60 anomaly images**
- [x] Implement image preloading system (#284, see DESIGN.md §7; overlays on idle: `src/utils/preload.ts`; the eight cameras' base photos on idle after the UI parts, `preloadCameraImages` in `src/utils/uiPreload.ts`, #396: about 3MB, outside the 800KB UI budget, START does not wait)
- [ ] Create image transition system

**Anomaly Types to Visualize:**

- Objects appearing/disappearing
- Lighting changes
- Human figures/shadows
- Distorted perspectives
- Impossible geometry

### Phase 2: Audio System (Medium Priority)

#### 2.1 Ambient Sound

- [ ] Underground corridor ambience
  - Ventilation hum
  - Distant footsteps
  - Fluorescent light buzz
  - Occasional drips
- [ ] Dynamic mixing based on anomaly presence

#### 2.2 UI Sound Effects

- [ ] Camera switch sound (mechanical click)
- [ ] Report button sound (confirmation beep)
- [ ] Correct report (positive chime)
- [ ] Wrong report (negative buzz/static)
- [ ] Warning sound (approaching strike limit)

#### 2.3 Horror Audio

- [ ] Anomaly detection stingers
- [ ] Phase transition sounds
- [ ] Late-phase reality distortion sounds
- [ ] Meta-anomaly glitch sounds

**Technical:**

- Use Web Audio API
- Implement sound pooling
- Add volume controls
- Mute: volume 0 on the VOL knob (no separate toggle)

### Phase 3: Enhanced Meta-Anomalies (Medium Priority)

#### 3.1 UI Corruption Effects

**Current:** Not implemented

**Tasks:**

- [ ] Button disappearance animation
- [ ] Text scrambling effect
- [ ] Timer glitch/reversal visual
- [ ] Camera label randomization
- [ ] HUD element displacement

#### 3.2 Advanced Meta-Mechanics

- [ ] False positive anomalies (player sees anomaly that isn't there)
- [ ] Forced wrong reports (UI lies about category)
- [ ] Multiple anomalies on same camera
- [ ] "No anomaly" as correct report when system glitches

#### 3.3 Fourth Wall Breaking

- [ ] Direct messages to player
- [ ] System error messages
- [ ] "Someone is watching you" notifications
- [ ] Camera perspective shifts to watch player

### Phase 4: Content Expansion (Low Priority)

#### 4.1 Additional Cameras

- [ ] Expand from 4 to 6-8 cameras
- [ ] Emergency stairwell camera
- [ ] Shop interior cameras
- [ ] Maintenance corridor
- [ ] Security office (recursive camera watching cameras)

#### 4.2 More Anomaly Types

- [ ] Time-based anomalies (only visible at certain times)
- [ ] Multi-camera anomalies (affects multiple feeds)
- [ ] Progressive anomalies (gets worse over time)
- [ ] Interactive anomalies (respond to player actions)

#### 4.3 Difficulty Modes

- [ ] Easy: Longer intervals, fewer anomalies
- [ ] Normal: Current settings
- [ ] Hard: Faster spawns, more subtle changes
- [ ] Nightmare: Meta-anomalies from start, no UI hints

#### 4.4 Endless Mode

- [ ] Continue past 06:00 AM
- [ ] Increasing difficulty
- [ ] Leaderboard integration
- [ ] Score multipliers

### Phase 5: Polish & Optimization (Ongoing)

#### 5.1 Performance

- [ ] Image lazy loading
- [ ] Reduce bundle size
- [ ] Optimize animations
- [ ] Better mobile performance

#### 5.2 Accessibility

- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] Adjustable text size
- [ ] Reduce motion option
- [ ] High contrast mode

#### 5.3 Localization

- [ ] Japanese translation (for authenticity)
- [ ] Multiple language support
- [ ] Maintain English-only option

#### 5.4 Analytics

- [ ] Track anomaly detection rates
- [ ] Identify too-easy/too-hard anomalies
- [ ] Player progression metrics
- [ ] A/B testing for difficulty

### Phase 6: Social Features (Future)

#### 6.1 Sharing

- [ ] Screenshot sharing
- [ ] Results screen sharing
- [ ] Anomaly gallery
- [ ] "Share your scariest anomaly" feature

#### 6.2 Community

- [ ] Custom anomaly submissions
- [ ] Community voting on best anomalies
- [ ] Daily challenge mode
- [ ] Speedrun leaderboards

---

## 🛠️ Technical Architecture

### Current Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Custom hooks (useGameState)
- **PWA (#388)**: installable (`vite-plugin-pwa` in `vite.config.ts`, `registerType: 'prompt'`, `injectRegister: false`; the worker is registered in `src/utils/swUpdate.ts`, production builds only). Manifest: name `Anomaly²: Corona Road`, short_name `Corona Road`, `display: standalone`, theme/background `#030a04` (the icon rim; `index.html` carries the same `theme-color`, the plugin injects the manifest link), icons `icon-192.webp` / `icon-512.webp` purpose `any` only (no maskable, no SVG). Offline = the app shell only: precache of HTML / JS / CSS, fonts, `ui/`, `note/`, `title-notes/`, the title photo and the icons (about 2.1 MB, 43 entries; most of it is the JS bundle); the camera pictures and the bundled overlay pictures are NOT precached but cached as they are played (`StaleWhileRevalidate`, so a picture replaced under the same name is refreshed in the background; cache `game-images`, same-origin `image` requests, at most 700 entries / 30 days), so offline play works for the pictures already loaded (played, or preloaded on idle time by #396). `navigateFallback: '/index.html'` is the worker's twin of the host's `/* /index.html 200` (`public/_redirects`). A new version waits and is applied (reload) only when the player is on the title itself (`App` tells `swUpdate.ts` when it is on the title: `setUpdateSafe`); never in a shift, result, ending or the note before a shift. With several tabs, the tab on the title activates the waiting worker and `clientsClaim` makes the plugin ask every tab to reload (`onNeedReload`); a tab that is mid-shift only remembers it and reloads when it is back on the title (`createUpdater`, tested in `swUpdate.test.ts`). Install suggestion: `src/utils/installPrompt.ts` (decision `decideOffer`, the held `beforeinstallprompt`) + `InstallBanner` under the title (shown the moment the title appears when a night has been played, loops >= 1), details in DESIGN.md. Do not add a dependency to a worktree through the shared `node_modules` symlink; after merging a dependency change run `npm ci` in the shared clone.
- **Deployment**: Cloudflare Pages (Git integration): a push to `main` builds and publishes to https://anomaly2.llll-ll.com/. GitHub Actions CI lints, runs the text-only checks (`check:fullwidth`, `check:spawn-hints`), tests and builds

### File Structure

```
DESIGN.md               # Design-token system (Material 3-inspired, single source of truth)
src/
├── components/          # React components
│   ├── Cabinet.tsx      # In-game screen: monitor + control panel, local UI state
│   ├── CameraView.tsx   # CRT monitor (picture, noise, OSD, subtitles)
│   ├── NoiseCanvas.tsx
│   ├── Loupe.tsx        # The round magnifier on the control panel (#341; gesture in hooks/useLoupeGesture.ts, numbers in utils/loupe.ts)
│   ├── (noise off #342: hooks/useNoiseOff.ts, numbers in utils/noiseOff.ts)
│   ├── (sound foundation #79: utils/audioEngine.ts, audioSettings.ts, synthSounds.ts; plan in docs/audio.md)
│   ├── CameraStrip.tsx  # Numbered camera push buttons
│   ├── Knob.tsx         # BRIGHTNESS / CONTRAST / VOL knob
│   ├── GameHUD.tsx      # Display windows (time, reports, strike lamps)
│   ├── ReportPanel.tsx  # REPORT key + type-picker dialog
│   ├── GameOverScreen.tsx
│   ├── SaveNotice.tsx   # always-on "進行を保存できません" when storage fails
│   └── StartScreen.tsx
├── data/
│   └── anomalyLedger.ts # ledger (virtual:anomalies) + overlay URLs
├── hooks/              # Custom React hooks
│   ├── useGameState.ts
│   ├── useCameraKeys.ts
│   └── useSubtitle.ts
├── types/              # TypeScript definitions
│   └── game.ts
├── utils/              # Game logic and pure UI helpers
│   ├── anomalyData.ts      # pick a ledger entry / build the running anomaly
│   ├── anomalyLedger.ts    # parse + validate ledger entries (used by vite.config.ts)
│   ├── anomalyOverlay.ts   # overlay % placement on the base photo
│   ├── dialogueLedger.ts   # parse + validate dialogue/*.yaml (used by vite.config.ts)
│   ├── dialogueEngine.ts   # pure selection: bags, priority, flags, midpoint stage
│   ├── saveData.ts         # save store (localStorage, load / update)
│   ├── shiftProgress.ts    # record finds, flags and loops into the save
│   ├── gameConfig.ts       # shift config, cameras, DIALOGUE_CONFIG
│   ├── knob.ts         # Knob value <-> angle / filter maths
│   ├── subtitle.ts     # Subtitle gap and hold time
│   ├── wear.ts         # ?wear= parsing
│   └── cx.ts
├── styles/
│   └── retro.css       # Cabinet UI styles (tokens scoped to .retro); part images in public/ui/ (DESIGN.md §11)
├── App.tsx
├── main.tsx
├── App.css             # Page background for wide viewports only
└── index.css           # Design tokens (:root vars), reset, keyframes
```

### Key Design Patterns

- **Hook-based State**: All game state in `useGameState` hook
- **Component Composition**: Screen-based component structure
- **Type Safety**: Strict TypeScript for all game logic
- **Separation of Concerns**: UI components separate from game logic
- **Screen transitions (#336)**: `App` returns `[screenKey, screen]` and `ScreenTransition` fades between them (dip to black; lengths only in `transitionTiming(from, to)` of `src/utils/screenTransition.ts`: 200+200 ms, but every shift start (note or result -> monitor) is 200 dark + 1000 slow rise from black, #336). State is committed at once; the old element is kept (same place, not remounted) and inert, global keys are stopped, so input during a change cannot double-run; the game clock of a new shift runs while the veil is black. Dev-only `?transition=fade|cross|none` for comparing; reduced motion disables it. Details: DESIGN.md "Screen transitions".

---

## 📊 Game Balance

### Current Tuning

- **First Anomaly**: 12 seconds (no dead opening)
- **Anomaly Spawn Interval**: 30 seconds (15 seconds after the child is found, decided by kako-jun 2026-11-12, #273: `CHILD_FOUND_PACING`)
- **Concurrent Anomaly Cap**: 4 active at once, 8 after the child is found (`CHILD_FOUND_PACING`); the numbers 4 / 8 were decided by kako-jun (2026-11-11, #344); treating "the end" as "after the child is found" (`CHILD_FOUND_PACING`) was confirmed by kako-jun (2026-11-12, #325/#344). One per camera at most; spawn skipped while at cap
- **Required Reports**: Minimum 4 correct
- **Allowed Errors**: 3 false reports
- **Phase Timing**: 2 minutes per phase

### Balance Considerations

- Players should feel tension but not overwhelm
- Early phase builds familiarity with mechanics
- Mid phase introduces challenge
- Late phase should feel chaotic but still fair
- Meta-anomalies are rare enough to surprise

### Potential Adjustments

- Increase spawn rate in late phase only
- Reduce required reports to 3 (easier)
- Allow 4-5 false reports (more forgiving)
- Make meta-anomalies 15-20% in late phase

---

## 🎯 Success Metrics

### Player Experience Goals

- **First Play**: 30-40% win rate (challenging but achievable)
- **Average Playtime**: 8 minutes (one full shift)
- **Replay Rate**: 50%+ players try again after losing
- **Scary Factor**: At least 1 genuine scare per playthrough

### Technical Goals

- **Load Time**: < 3 seconds on 3G connection
- **Performance**: 60 FPS on mid-range mobile devices
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile Support**: 100% of features work on touch devices

---

## 🐛 Known Issues & Limitations

### Current Limitations

1. **Provisional Imagery**: 8 WebP feeds in place, but variants per anomaly state are not yet rendered
2. **No Audio**: Silent gameplay, relies only on visuals
3. **Meta-Anomalies Not Implemented**: No UI corruption effects
4. **Limited Anomaly Pool**: the ledger is being grown toward ~300 entries (`prompts/README.md`); until then a shift can run out of unused entries
5. **Persistence is localStorage only**: progress (finds, flags, used lines, loops) is saved; no hand-over code or settings UI yet (`docs/save-data.md`)

### Technical Debt

- Sound system architecture needed
- Better mobile gesture detection
- Reduce re-renders in game loop
- Add error boundaries

---

## 🤝 Contributing Guidelines

### For Future Development

#### Adding New Anomalies

1. Add the overlay under `assets/anomaly-overlays/camNN/` and register it in `prompts/anomalies.yaml` (workflow: `prompts/README.md`). No code change: the game reads the ledger as is.
2. Categorize correctly (Camera/Object/Environment/Person/Surreal)
3. Consider visibility and difficulty

#### Adding New Features

1. Update this document first
2. Create feature branch
3. Implement with TypeScript
4. Add tests (see Testing below)
5. Update README.md

#### Testing

- Run with `npm test` (once) or `npm run test:watch`. CI runs **lint → `check:fullwidth` → `check:spawn-hints` → test → build** in that order (`.github/workflows/ci.yml`); the two checks are text-only and fast. Checks that open a real browser (`check:title`, `check:foot`, `check:scroll`, `check:note-wrap`, etc.) are not in CI.
- Vitest + Testing Library. Tests sit next to the code as `*.test.ts` / `*.test.tsx`; shared setup is `src/test/setup.ts`.
- Environments: the default is **node**, for pure functions (`src/utils/`). Hooks and components need the DOM: put `// @vitest-environment jsdom` at the top of that test file.
- jsdom cannot verify: the real blocking effect of `inert`, touch input, the moving noise, and anything about CSS appearance. Check these in a real browser (production build served statically) before calling UI work done.

#### Code Style

- Follow existing ESLint/Prettier rules
- Use TypeScript strict mode
- Prefer hooks over class components
- Keep components small and focused
- Comment complex game logic

---

## 📝 Design Notes

### Why English-Only UI?

- Creates sense of alienation
- Professional surveillance system aesthetic
- Broader international appeal
- Retro "imported game" feeling

### Why Mobile-First?

- Anomaly games are popular on mobile
- Vertical orientation suits security camera theme
- Touch controls are more immediate than mouse
- Easier to play in dark environments

### Why Meta-Horror?

- Subverts player expectations
- Creates unique identity
- Memorable "did that just happen?" moments
- Rewards multiple playthroughs

### Why Corona Road?

- Real location adds authenticity
- Underground corridors are inherently eerie
- Japanese underground shopping streets have unique atmosphere
- "Corona" (crown) has multiple meanings, adds mystery

---

## 🔮 Long-term Vision

### Version 1.0 (Current)

- Playable core loop
- Basic anomaly detection
- Win/lose states

### Version 2.0 (Next Release)

- Full image implementation
- Audio system
- Visual meta-anomaly effects
- 60+ unique anomaly images

### Version 3.0 (Future)

- Additional cameras
- Difficulty modes
- Endless mode
- Community features

### Version 4.0 (Dream Version)

- Procedurally generated anomalies
- AI-driven anomaly creation
- VR support
- Multiplayer co-op monitoring

---

## 📚 References & Inspiration

### Games

- The Exit 8
- I'm on Observation Duty series
- SCP: Containment Breach
- The Stanley Parable (meta elements)

### Media

- Analog horror (The Backrooms, Local 58)
- Japanese horror cinema
- Surveillance footage aesthetics
- SCP Foundation wiki

### Locations

- Osaka Corona Underground Shopping Street
- Tokyo underground corridors
- 1960s-80s Japanese architecture

---

## 📞 Contact & Support

For development questions, feature requests, or bug reports:

- GitHub Issues: https://github.com/kako-jun/anomaly2-corona-road/issues
- Repository: https://github.com/kako-jun/anomaly2-corona-road

---

**Last Updated**: 2026-05-20
**Version**: 1.1.0
**Status**: Playable prototype with unified design system; content expansion (audio, anomaly imagery, meta UI corruption) pending
