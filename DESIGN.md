# Anomaly²: Corona Road — Design System

A surveillance-horror game UI built on a unified token system inspired by **Google Material Design 3**: an opinionated palette, type scale, spacing scale, elevation, and motion. Horror atmosphere is layered _on top of_ Material-style hierarchy and consistency, not against it.

The goal is that **any new screen or component can be assembled out of these tokens without inventing new colors, spacings, or fonts.** If something doesn't fit, the token system is what we extend — not the component.

---

## 1. Design Principles

1. **Hierarchy before atmosphere.** Time, strikes, and the report action are the player's anchors; horror flourishes (scanlines, vignette, flicker) layer on top, never compete.
2. **One color per intent.** Green = system OK / start / correct. Amber = caution / cameras with activity. Red = strike / terminate / wrong. Cyan = informational / inert. Surreal violet is reserved for late-phase meta-anomalies.
3. **State is visible.** Every interactive surface has resting, hover, pressed, focused, and disabled states drawn from a 5-step state-layer opacity scale.
4. **Motion is meaningful.** 120 ms for ack (button press), 240 ms for transitions (camera switch, panel reveal), 600 ms for atmospheric pulses (anomaly flash). No motion outside this scale.
5. **Mobile-first, desktop-equal.** Touch swipes, mouse drags, on-screen arrows, and keyboard arrows all switch cameras. The game never assumes a touchscreen.

---

## 2. Color Tokens

All colors expressed as CSS custom properties on `:root`. Always reference tokens; never hardcode hex inside components.

### 2.1 Surface

| Token              | Hex       | Use                              |
| ------------------ | --------- | -------------------------------- |
| `--surface-0`      | `#0a0a0b` | App background (true near-black) |
| `--surface-1`      | `#121316` | Panels, HUD, cards               |
| `--surface-2`      | `#1c1d22` | Elevated cards, dialog           |
| `--surface-3`      | `#26282f` | Hover overlays                   |
| `--scrim`          | `#000000` | 80 % alpha overlays, modal scrim |
| `--outline`        | `#3a3d46` | Default borders                  |
| `--outline-strong` | `#5a5e6b` | Focus rings, primary borders     |

### 2.2 Semantic

| Token             | Hex       | Use                                                  |
| ----------------- | --------- | ---------------------------------------------------- |
| `--primary`       | `#34a853` | Start, confirm, correct report — Google green family |
| `--primary-on`    | `#0a1f0e` | Text/icon on `--primary` surface                     |
| `--secondary`     | `#4285f4` | Info, neutral CTA, restart — Google blue family      |
| `--secondary-on`  | `#07142b` | Text/icon on `--secondary` surface                   |
| `--warning`       | `#fbbc04` | Active anomaly indicator, strike 1–2 — Google amber  |
| `--danger`        | `#ea4335` | Strike 3, wrong report, terminate — Google red       |
| `--accent-violet` | `#a36bff` | "Person" category & late-phase meta-anomaly accent   |
| `--text-hi`       | `#e8eaed` | Primary text                                         |
| `--text-mid`      | `#9aa0a6` | Secondary text, labels                               |
| `--text-low`      | `#5f6368` | Tertiary, footnotes, time-stamps                     |

### 2.3 Category palette

Anomaly categories are shown as **text labels** (CAMERA, OBJECT, ENVIRONMENT, PERSON, SURREAL), never by color or icon alone, and never with emoji (kako-jun, 2026-10-30). The in-game cabinet UI (§8, §11) uses the cream/amber/green/red hardware palette scoped to `.retro` in `src/styles/retro.css`; the old per-category colors are no longer used there.

### 2.4 State-layer opacities

Apply on top of base color (rgba with the base color's RGB).

| State    | Opacity                      |
| -------- | ---------------------------- |
| Resting  | 0.00                         |
| Hover    | 0.08                         |
| Focus    | 0.12                         |
| Pressed  | 0.16                         |
| Selected | 0.12                         |
| Disabled | 0.38 (whole element opacity) |

---

## 3. Typography

A single font stack. Game UI is monospace for the surveillance-terminal feel; titles use the same stack to keep visual unity.

```
--font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
--font-sans: Inter, system-ui, sans-serif;  /* reserved for long-form copy only */
```

### Type scale (rem)

| Token            | Size | Line | Weight | Use                              |
| ---------------- | ---- | ---- | ------ | -------------------------------- |
| `--text-display` | 2.5  | 1.1  | 700    | Game-over title                  |
| `--text-h1`      | 1.75 | 1.2  | 700    | Start screen logo fallback       |
| `--text-h2`      | 1.25 | 1.3  | 600    | Section heads, nav-button glyphs |
| `--text-time`    | 1.5  | 1.2  | 600    | HUD time read-out (tabular-nums) |
| `--text-body`    | 0.95 | 1.5  | 400    | Default body                     |
| `--text-label`   | 0.8  | 1.3  | 500    | HUD labels, button text          |
| `--text-caption` | 0.7  | 1.3  | 400    | Camera location, version stamp   |

All numeric read-outs use `font-variant-numeric: tabular-nums`.

---

## 4. Spacing & Radius

8 px base grid. Spacing tokens map to multiples.

| Token       | Value                       |
| ----------- | --------------------------- |
| `--space-0` | 2 px (half-step; sparingly) |
| `--space-1` | 4 px                        |
| `--space-2` | 8 px                        |
| `--space-3` | 12 px                       |
| `--space-4` | 16 px                       |
| `--space-5` | 24 px                       |
| `--space-6` | 32 px                       |
| `--space-8` | 48 px                       |

| Token           | Value  | Use                  |
| --------------- | ------ | -------------------- |
| `--radius-sm`   | 4 px   | Chips, tags          |
| `--radius-md`   | 8 px   | Buttons, cards       |
| `--radius-lg`   | 12 px  | Panels, dialogs      |
| `--radius-pill` | 999 px | Pill buttons, badges |

---

## 5. Elevation (Material-style)

Five elevation steps via box-shadow. Surfaces also bump one step in `--surface-N`.

| Level | Shadow                                                    |
| ----- | --------------------------------------------------------- |
| 0     | none                                                      |
| 1     | `0 1px 2px rgba(0,0,0,0.6)`                               |
| 2     | `0 2px 6px rgba(0,0,0,0.55)`                              |
| 3     | `0 6px 16px rgba(0,0,0,0.5)`                              |
| 4     | `0 12px 28px rgba(0,0,0,0.5), 0 4px 10px rgba(0,0,0,0.4)` |

---

## 6. Motion

Two easings (in/standard + emphasized-out) and four durations.

```
--ease:      cubic-bezier(0.2, 0, 0, 1);   /* Material standard ease (in & out) */
--ease-out:  cubic-bezier(0, 0, 0.2, 1);   /* emphasized decelerate (toast/flash) */
--dur-fast:  120ms;   /* press / state change                    */
--dur-base:  240ms;   /* transitions, panel reveal               */
--dur-slow:  600ms;   /* atmospheric pulses, anomaly flash       */
--dur-toast: 1500ms;  /* toast auto-dismiss, end-of-game delay   */
```

| Pattern               | Duration | Ease                      |
| --------------------- | -------- | ------------------------- |
| Button press          | 120 ms   | `--ease`                  |
| Camera switch (fade)  | 240 ms   | `--ease`                  |
| Report panel slide-up | 240 ms   | `--ease`                  |
| Feedback flash        | 600 ms   | `cubic-bezier(0,0,0.2,1)` |
| Anomaly alert pulse   | 1200 ms  | linear, infinite          |

---

## 7. Layout

The in-game screen is a single cabinet (`.cabinet` in `src/styles/retro.css`): the CRT monitor on top and the control panel below on phones (tube first, panel under it, full-bleed up to 440 px and at most 560 px wide); at ≥ 900 px the cabinet fills the viewport with the 3:4 monitor on the left and the control panel on the right (panel scaled up with `zoom` from 1200 px). Image preload (#284): `index.html` preloads the cabinet images with `link[data-cabinet-image]`, `src/utils/uiPreload.ts` decodes them and the Caveat font, and the start key waits for that for at most 5 s (the timer is cleared when preload finishes first) before the shift starts. On portrait the `.tube` width constants in `retro.css` (`(100dvh - 369px - var(--plate-h))` / `- 296px - var(--plate-h)`, times the frame picture ratio 1246/1679) are the measured height of everything except the picture: constant = base 380 / 307 (44px HUD windows, knob gap 0) plus the fixed terms listed right below and, as a separate variable term, the bottom strip `- var(--plate-h)` (#311, see §10; 20px on portrait), applied to both constants and pinned by `retro.test.ts` (a later PR that changes another height adds its own row to the list and the test). The cabinet has `min-height: 100dvh` so no band is left under it. The result screen and the screen before a shift are the same paper, the detective's investigation note (#297; `src/components/InvestigationNote.tsx` + `investigationNote.css`, built from the save by `src/utils/investigationNote.ts`, wording in `src/data/investigationNotes.ts`, the only place for it). The paper is drawn at a fixed 340 x 620 and scaled to fit the window (contain, 12 px margin), so it never scrolls and the type stays in proportion (smallest text measured 12.2 px at 360 x 640). Layout top to bottom: title and night number, stamps, four sketch frames (1st to 3rd old person, the child; a frame stays a dashed "?" until its flag is raised; a frame filled in the last shift carries a red "found" mark), the synopsis on CSS ruled lines (7 lines at most; every line one colour) and, on the same ruled sheet directly under its last line, the detective's blue scribbles (tilted on the rules, never detached below a gap), a two-column form (last night or tonight / all nights, blanks on the first night) with the Shift row under both columns and, at the bottom right, one handwritten action (see below). The Shift row is the in-game clock, not real time: "Until 06:00" for a night that ran out (dawn, true ending), "Withdrew at 01:20" for a withdraw (`msToGameTime` of the saved real ms; the save keeps the real milliseconds). Before a shift (title -> START SHIFT -> note -> the handwritten "Start the shift" / 「勤務を始める」) the stamp is BACKGROUND on the first night and SO FAR afterwards and the synopsis is the story so far (a table per stage: none / elder1 / elder2 / elder3 / child, from the saved flags; nothing the story has not reached is written); after a shift the stamps are TONIGHT plus DAWN or WITHDRAWN, two stock lines (a night with more distinct kinds than before, a night with no new kinds = "no new leads" (never "no progress": every night moves the investigation forward, docs/story.md), withdrawn, the true ending) and the kept tail of the stage (same colour as the rest), and the action is "Once more" / 「もう一度」 (after the true ending "Back to title" / 「タイトルへ」, #294; no note is put before the title's START OVER). The action is not a key but the detective's handwriting (`NoteAction.tsx`, wording `LABELS.btn*`, which follows the note's language, not the machine keys): words in red ballpoint (a little bolder than the body), a hand-drawn underline (a thin quad that thickens to the right, ends sticking out, static SVG) and a right-pointing arrow (static SVG), tilted by `TILT.action`; no fill, border, shadow or rounded corners. Still a `<button>` named by its words (strokes aria-hidden); the transparent box is 44 px or more both ways (the tap area); hover (pointer devices) darkens the ink and thickens the underline, press moves it 2 px down, keyboard focus draws a hand-drawn loop around it; `npm run check:note-wrap` checks the tap area, that the strokes stay on the paper and 3 px or more from the number box. Body text is real text: Zen Kurenaido and Yomogi for Japanese (SIL OFL 1.1, subset to the characters in `public/fonts/note-chars.txt` by `scripts/build-note-fonts.py`, licence texts `OFL-ZenKurenaido.txt` / `OFL-Yomogi.txt`), Caveat for English; rules, frames, stamps, tape and the paper are CSS; only the sketches (`public/note/*.svg`, static self-made drawings, never user-supplied, a few KB each) are images. They are the detective's own drawings: she cannot draw and draws oddly, earnestly cute pictures (round puffy outlines, a big head on a tiny body, eyes and nose a little off, lines that wobble because the path points themselves are jittered; the faces and frames use no filter, only the shutter in `corridor.svg` keeps the internal `<filter>` (feTurbulence, referenced inside its own document) of its original shape), pencil-grey on the paper, with the ballpoint blue kept for scribbles. Every frame on the note is hand-ruled: four separate straight edges (never a closed rectangle or a curve), each with its own small tilt (0.2-1.2 deg, opposite edges not parallel), a corner overshoot or gap (0.5-3 px), uneven thickness (up to 1.5x along an edge) and a slightly different ink. The sketch frames are written into `public/note/*.svg` by `scripts/note-frames.py`; the red stamps and the number form draw theirs with `HandFrame` from the fixed table `src/data/noteFrames.ts` (a different shape for each; rules in `noteFrames.test.ts`). The frames of the four missing-person boxes are straight lines (only the drawings inside wobble) and the corridor sketch keeps its original shutter. The tilt of every hand-placed element (tape, night number, stamps, "found" tag, scribbles, frame labels) is a fixed, uneven angle in `src/data/noteTilt.ts` (no neighbours alike, enforced by vitest and `npm run check:note-wrap`); the red stamps also have uneven borders, corners and a small offset so they are not perfect rectangles. The four faces keep their traits (angry brows / red cheeks and a bun / one brow raised and a smirk / a line on the top of the head). The images and both note fonts are preloaded (`data-note-image` links in `index.html`, `uiPreload.ts`) and count against the 600KB budget with `public/ui` (test in `uiAssets.test.ts`). Language (#292): `ja` or `en`, default from `navigator.language` (ja* = ja, else en), the choice saved in the save's `settings.language`; the title always shows a JA / EN switch (also on the START OVER title) and applies it at once. Only the note and the title card's sentences follow the language; machine parts (START SHIFT, REPORT, TIME, the cabinet) are always English, subtitles stay Japanese. The start screen is a single-viewport equipment nameplate (`src/styles/start.css`, `start-*` classes, max 460 px wide, no scrolling): logo, cream nameplate panel with the rules (`src/data/titleCard.ts`), and the START SHIFT key. After the true ending (#294) the start key is replaced by START OVER only (a closed-investigation note is always shown; one confirmation, ERASE ALL / CANCEL, wipes the progress).

- Knob circle to its BRIGHTNESS / CONTRAST label gap: +9px (kako-jun's choice in #309; 18px in #300 was too wide, 3px too tight; pinned at 9px).
- HUD windows (TIME / REPORTS / STRIKES) 44 → 36px: -8px (kako-jun's choice in #314).
- Knob circle on phones 60 → 48px: -12px (kako-jun's choice in #313; the knob stays above the 44px touch minimum and the index mark is scaled with it).
- Bottom strip (speaker grille + model plate, #311): `- var(--plate-h)` (20px on portrait), a variable term written as `var()` in the constants, not part of the fixed sum.

On a 390 x 844 phone the picture (`.bezel`) is 2.9px shorter than before the #308 frame: it is width-limited, so it now follows the frame image's 1246/1679 aspect ratio exactly (it used to stretch about 0.6% taller). That comes from #308, not from the HUD change in #314.

`text-box: trim-both cap alphabetic` (digit centring in the HUD windows, #314) is supported from Chrome 133, Safari 18.2 and Firefox 154 ([MDN browser-compat-data](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-box.json)). Only older browsers use the fallback (1em line box, nudged down 1px): the windows stay 36px and the digits sit within about 2px of the centre (1280 is zoomed) instead of exactly on it.


---

## 8. Components

The in-game components are the retro hardware parts from §11, implemented in `src/components/` with styling in `src/styles/retro.css` (tokens scoped to `.retro`). `Cabinet.tsx` assembles them and owns the local UI state (knob positions, report dialog, last result OSD, subtitles). The result screen is described in §7; the start screen is the nameplate described in §7. The Material-style Button and Card below remain general design references.

| Part                       | File                                                            | Notes                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRT monitor                | `CameraView.tsx`, `NoiseCanvas.tsx`                             | Picture, glow, scanlines, moving noise, vignette, REC, `CAM n`, result OSD, subtitles, anomaly overlay image (no hint that one is active). Swipe / mouse drag switches cameras.                                                                                                                                                                                                     |
| Display windows            | `GameHUD.tsx`                                                   | TIME and REPORTS (VFD), STRIKES (one amber lamp per allowed false report, lit by misreports). No progress bar.                                                                                                                                                                                                                                                                |
| Knobs                      | `Knob.tsx`, `src/utils/knob.ts`                                 | BRIGHTNESS / CONTRAST. Horizontal drag, arrow keys (Shift = big step), Home / End; click, Enter or Space resets to centre. `role="slider"`. Values map to the picture's CSS `brightness()` / `contrast()`. |
| Camera select              | `CameraStrip.tsx`                                               | Numbered push buttons (`role="group"`, each button `aria-pressed`). Green lamp = selected. No anomaly indicator (the player must spot the difference). At 360–899px width the eight buttons share one row, leaving more height for the camera picture. |
| REPORT key and type picker | `ReportPanel.tsx`                                               | Red REPORT key with lamp (always enabled; opening the picker costs nothing, choosing a wrong type costs a strike). The picker is a modal dialog outside `.cabinet`, which is `inert` while it is open. Esc, backdrop and CANCEL close it.                                                                                                                                           |
| Report result (OSD)        | `CameraView.tsx` (`.osd-result`)                                | Green `CONFIRMED - ...` / red `FALSE REPORT - ...` on the picture; replaces the old toast and flash. Visible while `feedback` is set (1.5 s), then fades.                                                                                                                                                                                                                           |
| Subtitles                  | `useSubtitle.ts`, `src/utils/subtitle.ts`, `dialogue/` (ledger) | Movie-style (not a live region: subtitles are never announced by screen readers): white, tilted 9° with `skewX(-9deg)` (`font-style` stays `normal`: Japanese fonts have no true italic, so `italic` would not control the angle; English is tilted the same way by the skew; #306), one line at a time, no punctuation marks, bottom of the picture. Font size is `4.9cqw` of the picture (`.glass` is a size container), so it scales with the monitor at every width and layout; no clamp and no width @media (the longest ledger line still fits in 3 lines at the narrowest width, so a minimum size is not needed; measurements in Issue #295). Conversations come from the dialogue ledger (`dialogue/README.md`): opening, then chatter with silences; a false report cuts in with that anomaly's lines. The lines are samples until the real script is written. |
| OSD texts                  | `CameraView.tsx`, `retro.css` (`.osd-cam`, `.osd-rec`, `.rec-dot`, `.osd-result`) | `CAM 1`, `● REC` and the report result (`CONFIRMED — …`, `FALSE REPORT — …`) are sized like the subtitles: font size, corner distances, REC dot, gap and padding are `cqw` of the picture (`.glass`), each preceded by a fallback value, with no width @media; the values are the 1280x720 look (picture 441px wide). `max()` gives a floor (cam 10px, REC 9px, result 10px, dot 5px) because the picture on a 360x640 phone is only 203px wide. The result text wraps only between words (each word is a nowrap span, `text-wrap: balance`, the dash stays with the word before it). Measurements in Issue #316. |

Keyboard (playing, report dialog closed): ← / → and A / D switch cameras, 1-8 select one (`useCameraKeys.ts`).

### 8.1 Button / 8.2 Card

The general-purpose button and card classes (`.btn`, `.card`) were removed with the old `App.css`; no screen uses them. Buttons and panels are specific to each screen (cabinet keys in `retro.css`, `start-*` in `start.css`, `note-*` in `investigationNote.css`). `src/App.css` now only holds the page background for viewports wider than 480 px.

---

## 9. Accessibility Tokens

- **Focus ring:** 2 px solid `--outline-strong`, offset 2 px. Always visible on keyboard focus.
- **Tap target:** minimum 44 × 44 px.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables anomaly pulse, flash, and camera fade.
- **Color-blind safety:** every semantic color paired with a text label (lamps are always next to or inside a labelled control).

---

## 10. Implementation Notes

- All tokens live in `src/index.css` under `:root`.
- Tailwind utility classes are allowed for layout, but **all colors and durations must come from CSS variables** (`text-[color:var(--text-hi)]`, `transition-[transform_var(--dur-fast)_var(--ease)]`, etc.). Inline-hex use is a lint smell.
- Components consume tokens directly; no per-component constant files.
- **State-layer mixing**: prefer `color-mix(in srgb, var(--semantic) <opacity%>, transparent)` over hand-rolled rgba literals.
- **Raw `rgba(0, 0, 0, …)` is permitted** for pure black-occlusion ramps (shadow gradients, vignettes) — these express geometry of light, not a brand color, and tokenizing them would over-couple. Anything else with brand intent must use a semantic token.
- **Bottom strip (#304)** (`.cabinet > .cabinet-foot`, `retro.css`): one row along the cabinet's bottom edge, speaker grille (`.speaker`) on the left filling the width, model plate (`model-plate.webp`, `alt` only) fixed at the right end, bottoms aligned (`align-items: flex-end`). `left: 4px; right: 6px` is deliberate (the cabinet face's bevel is wider on the right).
  - Height `--plate-h`: 20px on portrait (< 900 px; the smallest height at which the outlined "42" still reads at DPR 1; "Video Monitor CR-" is allowed to blur), 40px at >= 900 px. Portrait `.tube` constants subtract it as a separate term, so a height-limited picture is 20px shorter than without the strip (width-limited ones, about 412 x 915 and larger, are unchanged). `.cabinet` (portrait) / `.panel` (>= 900 px, divided by `--pz`) get bottom padding of the strip + 6px so nothing sits under it. `--pz` is the panel's zoom (1.3 from 1200 px, 1.45 from 1400 px), set at the same two breakpoints as `--col-min`.
  - Slots: always **two rows** (kako-jun, #304). `speaker_tile.webp` (27x42, two rows per tile) is scaled by `--hole-p` (row pitch; tile = 2 x pitch): 10px on portrait, 14px at >= 900 px (grille 28px tall inside the 40px strip). `background-repeat: round no-repeat` nudges the tile width so a whole number of slots fills the width: the right-end slot is never clipped and all slots share one shape. The nudge is within +-2% of the tile width at every width (measured +1.94% at 1024x768, -1.52% at 1280x720, -2.04% at 360).
  - >= 900 px: the strip spans the control-panel column. The 3:4 picture height `--tube-h` is `min(100vh - 16px, (100vw - 30px - --col-min) * 1679/1246)`, so on tall screens (900x1000, 1024x1366) the picture shrinks before the column gets narrower than `--col-min` (340px; 442px / 493px under the 1.3 / 1.45 panel zoom), which keeps the plate (155px) and the REPORT key on screen.
  - Not measurable in vitest/jsdom (no layout): `npm run check:foot` opens the game in a real Chromium at 12 sizes (360x640 ... 2560x1440) and checks strip / plate / panel inside the viewport, no overlap with REPORT, no scroll, two rows, `round`, whole slots. It is not in CI (needs a Chromium; `playwright` is an inline `uv` script dependency, not in package.json).
- **Layout reservations** that link absolutely-positioned overlays to other components are tokenized (e.g. `--camera-info-h`) so changes never collide via magic numbers.

---

## 11. Retro display reference

**Direction (kako-jun, 2026-10-30):** the game watches a corona-era underground arcade, so the _display_ should look like old physical surveillance hardware while the _interaction_ stays modern and phone-native (touch targets, gestures, readable controls). Retro is a rendering layer, not a behavior change.

**Reference:** `assets/reference/crt-monitor/panasonic-wv-bm140.jpg` — Panasonic WV-BM140 surveillance video monitor, photographed by kako-jun. Reference only: it is not bundled into the game (the part images below only resemble it), and the Panasonic mark must not be reproduced (use invented names, as with the signage baselines). EXIF is stripped; pixels are unchanged from the original.

What to take from it:

- **Screen:** rounded-corner rectangle (large radius), thick dark inner bezel, full-color picture (the reference unit is monochrome; the game is not), clearly visible horizontal scanlines, low contrast, soft glow.
- **Housing:** aged cream/beige matte plastic with a recessed frame around the tube.
- **Control strip:** square recessed power button with a red LED, slide switches, knobs with an indicator line, four numbered push buttons with arrow marks, a speaker slit grid, and silkscreened labels.

**Analog operation (kako-jun, 2026-10-30):**

- Corona Road is meant to be unusually fine-grained and hard, unlike click-only spot-the-difference games (target scale: see `prompts/README.md`). Operation should feel analog.
- Adjustments such as brightness are knobs: operated by touch (drag/rotate) but drawn as physical knobs.
- The picture stays in color. Analog noise is added and drifts subtly over time (not a visible loop, not frozen static).
- Rounded corners on the screen and on the parts.
- The Report buttons, the camera selector tabs, and every other control use the same retro hardware look (push buttons, switches, lamps), not Material-style buttons. The reference's numbered push buttons (1-4) are the model for the camera selector. Touch-target size and readability stay modern. The §8 components are reskinned to this look.
- Every knob and button shows a visible label; no hidden operations.
- Decided (2026-11-02, replaces the 2026-10-30 note): every anomaly must be at least slightly visible at the default knob setting; knobs only make an already-visible anomaly easier to see, and an anomaly that is invisible without adjusting a knob is not made. The visibility floor and how it is measured are in `prompts/README.md` ("視認性の基準"); how the ledger marks knob-sensitive anomalies is still decided when the knobs are implemented.

**Implementation:** the retro UI is built into the game (`src/components/`, `src/styles/retro.css`; parts table in §8). The earlier standalone prototype `prototypes/retro-ui/` was removed once integrated (it remains in git history, PR #43). Knobs are operated by horizontal drag, slider-style (right = clockwise = increase), plus arrow keys. Append `?wear=0` (clean) or `?wear=1` (default grime; values in between work) to the game URL to compare the wear overlay A/B.

**Part images (kako-jun approved, 2026-11-05, #48):** the cabinet is dressed with raster part images made to resemble the reference photo, in `public/ui/` (webp, about 250KB in total; the budget is 600KB). They are generated artwork and the licence is the author's. The reference photo itself is never bundled, and no real maker or model name is reproduced (the printed model plate is the image `model-plate.webp`, at the right end of the bottom strip; `CR-42` is an invented model number, and no real maker or model name is drawn). Generation sources and rejected takes are not kept in the repo (#48 "作業物は消す").

| Part                                             | File(s)                                               | How it is applied                                                                                                                                                                    |
| ------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cabinet face                                     | `surface.webp`                                        | seamless tile behind `.cabinet`; the wear overlay `.cabinet::before` is weakened to 30%                                                                                              |
| Monitor frame                                    | `bezel_mon.webp`                                      | one portrait picture as `.bezel` background (the tube is always about 3:4), with a transparent opening; `.glass` sits in the opening and is cut to the tube outline with `clip-path` |
| Display windows (TIME / REPORTS / STRIKES) | `window9.webp`                                        | `border-image` 9-slice on `.vfd` and `.lamps` (6px top/bottom; the windows are 36px tall (#314: -8px from 44px, digits keep 4px above/below the cap-height)); digits and glow stay CSS; the digit boxes are trimmed to cap-height..baseline (`text-box: trim-both cap alphabetic`, older-browser fallback below) so the digits sit at the exact vertical centre of the window (#314)                                                           |
| Camera keys, REPORT key                          | `cam-key(-pressed).webp`, `report-key(-pressed).webp` | `border-image` on `.key`; numbers and labels stay CSS text; pressed = second image plus a 3px drop                                                                                   |
| Knobs                                            | `knob.webp`                                           | background of `.knob`; the index line `.mark` stays CSS and is what rotates                                                                                                          |
| Lamps (green camera, amber strikes, red REPORT)  | `lamp-{green,amber,red}-{on,off}.webp`                | background of `.lamp` / `.lamp-big`; the lit glow is a CSS `box-shadow`                                                                                                              |
| Speaker grille                                   | `speaker_tile.webp`                                   | a wide strip (`repeat-x`) along the bottom edge. A small square grille block was tried and rejected: the strip is preferred and it keeps the phone page height unchanged             |

**Monitor frame geometry (#283):** `bezel_mon.webp` is 1246x1679 and `.bezel` declares exactly that `aspect-ratio`, so `background-size: 100% 100%` is an unstretched fit (corners and grain stay round and square at every width; the phone height is the tube width divided by that ratio, and at 900 px and up the tube width is its height times it). The picture's four rim+recess bands are equal (99 / 99 / 100 / 99 picture px: left, top, right, bottom), so the frame looks equally thick on all sides. The opening is ONE numeric group (`--img-w/h`, `--open-l/t/r/b`, `--open-pad` on `.glass`): the glass box derives from it and the `clip-path` polygon is traced from the same alpha. `scripts/bezel-frame.py` ties all of it to the real picture: `check` (run by `npm run check:bezel`, vitest and CI) compares the group, the aspect and the polygon against the webp's alpha (polygon vs opening: max deviation within 1 picture px), and `apply` rewrites the group and polygon in `retro.css` after the picture is replaced.

Kept as CSS (not images): scanlines, noise, glow, vignette, OSD (REC / CAM n / subtitles), every label and number, the glass haze, and the handwritten note paper and tape of the SELECT CATEGORY dialog (`.cat-note`, #236). The start screen and the result screen both use the new design.

**Known changes from the images:** DOM, sizes and the 44px touch targets are unchanged and the page height equals the pre-image build (display windows are fixed at the old height on purpose). The visible glass shrinks to about 85% of its old area on phones (about -15%) and about 80% on desktop (about -20%), and a further about 4% for the equal frame of #283. The frame picture's four corners are fully visible: `.bezel` has no CSS `border-radius`/`box-shadow` box (that box showed a second outline outside the picture's edge and clipped the corners by about 2.1%); a soft `filter: drop-shadow` follows the picture's transparent corners instead. Alternative M (box matched to the picture's outer corner, measured radius 4.4% / 3.6%, with `box-shadow: 0 3px 6px 1px rgba(40,25,10,.5)`) was compared and left a faint ring at the corners, so it is not used; to switch, replace the `filter` line in the last `.bezel` rule of `retro.css` with those two properties. OSD texts are moved inward to stay clear of the corners.

**Wear A/B:** `?wear=0` (clean) to `?wear=1` (default); the grime overlays on the face, windows and glass still follow `--wear`.

---

**Last updated:** 2026-11-05
**Owner:** kako-jun
