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

Each anomaly category has exactly **one color** and **one icon**. Both icon and color must appear together — never color-only or icon-only.

| Category    | Icon | Color token                |
| ----------- | ---- | -------------------------- |
| Camera      | 📹   | `--secondary` (blue)       |
| Object      | 📦   | `--warning` (amber)        |
| Environment | 🌆   | `--primary` (green)        |
| Person      | 🚶   | `--accent-violet` (violet) |
| Surreal     | 👁️   | `--danger` (red)           |

> "Surreal" the category is the meta-rule breaker — it wears danger red so the player feels the stakes. The violet `--accent-violet` token belongs to the "Person" category specifically; it is reused for meta-anomaly accents in late phase.

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

Mobile-first vertical stack:

```
┌──────────────────┐
│       HUD        │  56 px fixed, surface-1
├──────────────────┤
│                  │
│   Camera View    │  flex-1 min-height 55vh, surface-0
│                  │
├──────────────────┤
│  Camera Strip    │  64 px fixed, surface-1 — anomaly badges
├──────────────────┤
│   Report Panel   │  fits content, surface-1, elevation 3
└──────────────────┘
```

On desktop (≥768 px), the column is centered with `max-width: 480px`. The game preserves a tall-phone shape regardless of viewport.

---

## 8. Components

### 8.1 Button

Three variants. All share radius `--radius-md`, padding `--space-3 --space-4`, type `--text-label`, motion `--dur-fast`.

| Variant  | Bg          | Border             | Text           | Use           |
| -------- | ----------- | ------------------ | -------------- | ------------- |
| Filled   | `--primary` | none               | `--primary-on` | Primary CTA   |
| Outlined | transparent | `--outline-strong` | semantic       | Secondary CTA |
| Ghost    | transparent | none               | `--text-mid`   | Cancel, back  |

Disabled = opacity 0.38, pointer-events none, no hover.

### 8.2 Card / Panel

Bg `--surface-1` (or `--surface-2` if nested), border `1px --outline`, radius `--radius-lg`, padding `--space-4`. Elevation 1.

### 8.3 Chip

Used for status flags (REC, anomaly counters). Bg `rgba(<semantic>, 0.16)`, text full semantic, radius `--radius-pill`, padding `2px --space-3`, type `--text-caption`.

### 8.4 Camera selector strip

A row of 8 tiles below the camera view. Each tile shows camera number; tiles with active anomalies show an animated amber dot. The active camera tile uses the selected state layer.

### 8.5 Report panel

Two states:

- **Collapsed:** single primary outlined button "REPORT ANOMALY" (red outline) — _always enabled_; opening the panel costs nothing, choosing the wrong category in the expanded state costs a strike.
- **Expanded:** 5 category tiles in a 2-column grid (asymmetric — the 5th tile spans the bottom row's left cell; this is intentional, matching a casino-style "odd one out") + cancel ghost button. The asymmetry doubles as a visual cue that "Surreal" is the rule-breaker.

### 8.6 Toast

For correct/wrong report feedback. Position: top center under HUD. Auto-dismiss 1.5 s. Bg `rgba(<semantic>, 0.16)` over `--surface-2`, border `1px <semantic>`, radius `--radius-md`.

---

## 9. Accessibility Tokens

- **Focus ring:** 2 px solid `--outline-strong`, offset 2 px. Always visible on keyboard focus.
- **Tap target:** minimum 44 × 44 px.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables anomaly pulse, flash, and camera fade.
- **Color-blind safety:** every semantic color paired with an icon or text label.

---

## 10. Implementation Notes

- All tokens live in `src/index.css` under `:root`.
- Tailwind utility classes are allowed for layout, but **all colors and durations must come from CSS variables** (`text-[color:var(--text-hi)]`, `transition-[transform_var(--dur-fast)_var(--ease)]`, etc.). Inline-hex use is a lint smell.
- Components consume tokens directly; no per-component constant files.
- **State-layer mixing**: prefer `color-mix(in srgb, var(--semantic) <opacity%>, transparent)` over hand-rolled rgba literals.
- **Raw `rgba(0, 0, 0, …)` is permitted** for pure black-occlusion ramps (shadow gradients, vignettes) — these express geometry of light, not a brand color, and tokenizing them would over-couple. Anything else with brand intent must use a semantic token.
- **Layout reservations** that link absolutely-positioned overlays to other components are tokenized (e.g. `--camera-info-h`) so changes never collide via magic numbers.

---

**Last updated:** 2026-05-20
**Owner:** kako-jun
