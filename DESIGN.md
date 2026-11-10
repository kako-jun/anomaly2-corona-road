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

The in-game screen is a single cabinet (`.cabinet` in `src/styles/retro.css`): the CRT monitor on top and the control panel below on phones (tube first, panel under it, full-bleed up to 440 px and at most 560 px wide); at ≥ 900 px the cabinet fills the viewport with the 3:4 monitor on the left and the control panel on the right (panel scaled up with `zoom` from 1200 px). Image preload (#284): `index.html` preloads the cabinet images with `link[data-cabinet-image]`, `src/utils/uiPreload.ts` decodes them and the Caveat font, and the start key waits for that for at most 5 s (the timer is cleared when preload finishes first) before the shift starts. On portrait the `.tube` width constants in `retro.css` (`100dvh - 410px` / `- 337px`) are the measured height of everything except the picture; the cabinet has `min-height: 100dvh` so no band is left under it. The result screen is its own layout (`.result-screen`, max 460 px, `src/components/result.css`): logo, the taped investigation note (status line, tonight's correct reports, false reports and shift duration, totals) and a RESTART SHIFT key. Its status reads WITHDRAWN (3 false reports), DAWN (enough reports at dawn), TIME UP (dawn with too few reports) or THE TRUTH AT DAWN (true ending). The start screen is a single-viewport equipment nameplate (`src/styles/start.css`, `start-*` classes, max 460 px wide, no scrolling): logo, cream nameplate panel with the rules, and the "勤務開始" key.

---

## 8. Components

The in-game components are the retro hardware parts from §11, implemented in `src/components/` with styling in `src/styles/retro.css` (tokens scoped to `.retro`). `Cabinet.tsx` assembles them and owns the local UI state (knob positions, report dialog, last result OSD, subtitles). The result screen is described in §7; the start screen is the nameplate described in §7. The Material-style Button and Card below remain general design references.

| Part                       | File                                                            | Notes                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRT monitor                | `CameraView.tsx`, `NoiseCanvas.tsx`                             | Picture, glow, scanlines, moving noise, vignette, REC, `CAM n`, result OSD, subtitles, anomaly overlay image (no hint that one is active). Swipe / mouse drag switches cameras.                                                                                                                                                                                                     |
| Display windows            | `GameHUD.tsx`                                                   | SHIFT TIME and REPORTS (VFD), STRIKES (one amber lamp per allowed false report, lit by misreports). No progress bar.                                                                                                                                                                                                                                                                |
| Knobs                      | `Knob.tsx`, `src/utils/knob.ts`                                 | BRIGHTNESS / CONTRAST. Horizontal drag, arrow keys (Shift = big step), Home / End; click, Enter or Space resets to centre. `role="slider"`. Values map to the picture's CSS `brightness()` / `contrast()`. |
| Camera select              | `CameraStrip.tsx`                                               | Numbered push buttons (`role="group"`, each button `aria-pressed`). Green lamp = selected. No anomaly indicator (the player must spot the difference). At 360–899px width the eight buttons share one row, leaving more height for the camera picture. |
| REPORT key and type picker | `ReportPanel.tsx`                                               | Red REPORT key with lamp (always enabled; opening the picker costs nothing, choosing a wrong type costs a strike). The picker is a modal dialog outside `.cabinet`, which is `inert` while it is open. Esc, backdrop and CANCEL close it.                                                                                                                                           |
| Report result (OSD)        | `CameraView.tsx` (`.osd-result`)                                | Green `CONFIRMED - ...` / red `FALSE REPORT - ...` on the picture; replaces the old toast and flash. Visible while `feedback` is set (1.5 s), then fades.                                                                                                                                                                                                                           |
| Subtitles                  | `useSubtitle.ts`, `src/utils/subtitle.ts`, `dialogue/` (ledger) | Movie-style (not a live region: subtitles are never announced by screen readers): white italic, one line at a time, no punctuation marks, bottom of the picture. Font size is `4.9cqw` of the picture (`.glass` is a size container), so it scales with the monitor at every width and layout; no clamp and no width @media (measured 4.9% at 360 / 390 / 768 / 1280 wide; the glass at 360 is ~218px so text is ~10.7px, still legible; #295). Conversations come from the dialogue ledger (`dialogue/README.md`): opening, then chatter with silences; a false report cuts in with that anomaly's lines. The lines are samples until the real script is written. |

Keyboard (playing, report dialog closed): ← / → and A / D switch cameras, 1-8 select one (`useCameraKeys.ts`).

### 8.1 Button / 8.2 Card

The general-purpose button and card classes (`.btn`, `.card`) were removed with the old `App.css`; no screen uses them. Buttons and panels are specific to each screen (cabinet keys in `retro.css`, `start-*` in `start.css`, `result-*` in `result.css`). `src/App.css` now only holds the page background for viewports wider than 480 px.

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

**Part images (kako-jun approved, 2026-11-05, #48):** the cabinet is dressed with raster part images made to resemble the reference photo, in `public/ui/` (webp, about 250KB in total; the budget is 600KB). They are generated artwork and the licence is the author's. The reference photo itself is never bundled, and no real maker or model name is reproduced (the printed model name is the invented `VIDEO MONITOR CR-42`, drawn as CSS text). Generation sources and rejected takes are not kept in the repo (#48 "作業物は消す").

| Part                                             | File(s)                                               | How it is applied                                                                                                                                                                    |
| ------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cabinet face                                     | `surface.webp`                                        | seamless tile behind `.cabinet`; the wear overlay `.cabinet::before` is weakened to 30%                                                                                              |
| Monitor frame                                    | `bezel_mon.webp`                                      | one portrait picture as `.bezel` background (the tube is always about 3:4), with a transparent opening; `.glass` sits in the opening and is cut to the tube outline with `clip-path` |
| Display windows (SHIFT TIME / REPORTS / STRIKES) | `window9.webp`                                        | `border-image` 9-slice on `.vfd` and `.lamps` (6px top/bottom so the window height is unchanged); digits and glow stay CSS                                                           |
| Camera keys, REPORT key                          | `cam-key(-pressed).webp`, `report-key(-pressed).webp` | `border-image` on `.key`; numbers and labels stay CSS text; pressed = second image plus a 3px drop                                                                                   |
| Knobs                                            | `knob.webp`                                           | background of `.knob`; the index line `.mark` stays CSS and is what rotates                                                                                                          |
| Lamps (green camera, amber strikes, red REPORT)  | `lamp-{green,amber,red}-{on,off}.webp`                | background of `.lamp` / `.lamp-big`; the lit glow is a CSS `box-shadow`                                                                                                              |
| Speaker grille                                   | `speaker_tile.webp`                                   | a wide strip (`repeat-x`) along the bottom edge. A small square grille block was tried and rejected: the strip is preferred and it keeps the phone page height unchanged             |

Kept as CSS (not images): scanlines, noise, glow, vignette, OSD (REC / CAM n / subtitles), every label and number, the glass haze, and the handwritten note paper and tape of the SELECT CATEGORY dialog (`.cat-note`, #236). The start screen and the result screen both use the new design.

**Known changes from the images:** DOM, sizes and the 44px touch targets are unchanged and the page height equals the pre-image build (display windows are fixed at the old height on purpose). The visible glass shrinks to about 85% of its old area on phones (about -15%) and about 80% on desktop (about -20%), and the tube's rounded corners hide a little of the picture (about 2.1% of the box). OSD texts are moved inward to stay clear of the corners.

**Wear A/B:** `?wear=0` (clean) to `?wear=1` (default); the grime overlays on the face, windows and glass still follow `--wear`.

---

**Last updated:** 2026-11-05
**Owner:** kako-jun
