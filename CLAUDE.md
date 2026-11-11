# Anomaly²: Corona Road - Development Documentation

## 🎮 Game Concept

**Anomaly²: Corona Road** is an anomaly detection horror game set in an underground shopping corridor in Japan. The core concept is a meta-horror experience where the rules of anomaly detection themselves break down in later stages.

### Tagline

"Monitor the cameras. Report the anomalies. Trust your eyes... or don't."

> **Setting and story:** the single master is [`docs/story.md`](docs/story.md) (era, case, characters, the twist, open questions). Dialogue is shown as movie-style subtitles (white, tilted 9°, one speaker at a time, no 、 or 。; a line breaks only between the phrases the script marks with full-width spaces, a phrase is at most `MAX_PHRASE_CHARS` (`src/utils/subtitle.ts`) characters, `npm run check:subtitle`, #323). The second person exists so that the small hint for each wrong report (お手つき) can be delivered naturally as their lines.

> **Dialogue system direction (kako-jun, 2026-10-30):** the story advances across playthroughs (loops), so progress needs flag management. Dialogue has three patterns: fully random chatter, loop-progress story lines, and per-anomaly lines. Each anomaly gets several alternative lines and a "used once" record to avoid repeats. Design notes and open questions live in Issue #29. Save data design (storage choice, schema, rules): [`docs/save-data.md`](docs/save-data.md).

> **Dialogue wiring (#74):** the ledger [`dialogue/`](dialogue/README.md) is the single source of the lines (`virtual:dialogue`, validated at build). `src/hooks/useSubtitle.ts` plays it: the opening after `openingDelayMs` (4 s), then chatter conversations (2-4 lines) with `chatterIntervalMs` (30 s) of silence between them; a false report cuts in at once (the anomaly's own lines first, then the common ones; one waiting before the opening comes right after it); a flag that just rose cuts in after the line on screen (a story already waiting at the start does not cut the opening; it plays right after it), and a flag's story is never cut by a false report or another flag (an unplayed story is kept in the save as `pendingStories` and plays at the next start); a conversation counts as used when its first line is shown; one midpoint comment at `midpointAtSec` (half of `totalDurationMs`, 240 s); at the end the closing conversation plays before the result screen. Any entry may carry `unlock: <flag>`: until that flag is raised it is not a candidate and is not marked used (#266). Selection and priority are the pure functions in `src/utils/dialogueEngine.ts`; counting, flags and loops are saved by `src/utils/shiftProgress.ts` through `src/utils/saveData.ts`. Settings: `DIALOGUE_CONFIG` in `src/utils/gameConfig.ts`. `SaveNotice` shows "進行を保存できません" whenever storage fails. True ending (#86, `src/utils/endingJudge.ts`): once the `child` flag is saved, anomalies come faster and more at once (`CHILD_FOUND_PACING` in `gameConfig.ts`, placeholder values) for the rest of that shift and for later shifts (the flag persists); if time runs out and at least one anomaly appeared after the child was found but none of those was reported, the result is `ending` (a win, one loop; anomalies from before the child and false reports do not count; a withdraw is never `ending`; no `final` flag is used). On `ending` the closing conversation `result: ending` plays over `public/images/ending-bar.webp` (`ENDING_BAR_CAMERA`, shown instead of the camera; the monitor frame stays) and then the ordinary win screen follows. Reaching it saves `endingReached` (#294): `startGame` then refuses to start, the result note's handwritten action becomes "Back to title" and the title offers START OVER only (one confirmation, then `resetProgress()` wipes everything but the display settings and raises the save's `epoch` (generation number) so the reset also wins over other tabs' older memory; the source of truth is `docs/save-data.md`). Reiwa anomalies (#83): an image+produced ledger entry with the explicit optional field `reiwa: true` (validated by the ledger parser; currently the six CR-RZ-01..06 entries; `candidate_id` is only a production number and is not used to decide) carries `reiwa: true` in `virtual:anomalies`, and `REIWA_IDS` in `shiftProgress.ts` is derived from those (no id list in code; the ledger is the only source). `child` therefore rises once the `dialogue/flags.yaml` condition holds (3 distinct Reiwa reports + `foundUnique` + `elder3`). Reiwa entries are not draw candidates until the `elder3` flag is saved (`pickLedgerEntry`'s `reiwaUnlocked`, read from the save at each spawn, so one raised mid-shift counts from the next spawn); after that they join the same weighted draw. The sound Reiwa anomalies (CR-RZ-07..09, non-image) are not implemented (#79).

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
- **Spawn Interval**: 30 seconds (cap of 2 concurrent — see Game Balance)
- **Total Anomalies**: up to 16 per 8-minute playthrough (16 if every anomaly is reported promptly; about 11 when late reports stall the simultaneous-anomaly cap)
- **Source**: the anomaly ledger `prompts/anomalies.yaml` (single source of truth for ALL anomalies: image / non*image, produced / planned; terms: glossary in `prompts/README.md`; format and promotion rule in `prompts/README.md` "台帳の書式", counts via `npm run ledger:summary [ledger path]`, Node >=22.18 for type stripping, see `engines` in package.json). The game draws only from `kind: image` + `status: produced` entries. Each of those is a transparent WebP overlay (`assets/anomaly-overlays/camNN/*.webp`) drawn over the camera's base photo at the ledger's pixel position. The game never tells the player where or what: no lamp, no description, no on-screen hint — spotting the difference \_is\* the game (#5).
- **How it is wired** (#46): `vite.config.ts` validates every ledger entry and reads the image+produced ones into the `virtual:anomalies` module (only `id`, camera, category, optional `also_categories`, `anomaly_type`, overlay path, origin, size, and `reiwa: true` for a Reiwa entry; a broken entry fails the build and names the entry); `src/data/anomalyLedger.ts` resolves overlay URLs; `src/utils/anomalyLedger.ts` / `anomalyData.ts` / `anomalyOverlay.ts` are the pure parse / pick / placement helpers; `CameraView.tsx` draws the overlay (order: base photo, glow, overlay, then scanlines etc.); the overlay images are preloaded on idle time once play starts (`src/utils/preload.ts`). Minimum browser: CSS container query size units (Safari 16+ / Chrome 105+ / Firefox 110+); older ones show the photo uncovered but visible, and overlay percentages still hold. Selection (#221): only a camera with no anomaly now and an entry not already used this shift, drawn in four steps so the ledger's skew (many `add_object`, few `displace`) is damped: camera (uniform), then category (weighted by its unused count ^ 0.75), then `anomaly_type` (same weight), then one entry (uniform); the counts are the unused entries inside the chosen camera, and the exponent is `DRAW_WEIGHT_EXPONENT` (0.75) in `gameConfig.ts` (0 uniform, 1 proportional to count); empty categories / types are never candidates; when the ledger runs out, spawning stops; if only no camera is free, it retries after 1 s instead of waiting a whole interval; an entry whose image cannot be resolved is skipped with a console warning. Playthrough-to-playthrough repeat avoidance needs save data (not implemented, `docs/save-data.md`).
- **Categories**: 5 types (the ledger's `category`, plus the optional `also_categories` array for a genuinely split anomaly — any of them is a correct report; definitions and the subject-based boundary are in `prompts/README.md` "カテゴリ"; the correct report is the category of the anomaly on the camera you are watching). The SELECT CATEGORY dialog shows a handwritten note under every key (always visible, English only; font Caveat self-hosted in `public/fonts/`, OFL). The investigation note (result screen and the screen before a shift, #297; each sentence is tagged `knownFrom` and shown only from the stage where the detective can know it, pinned by vitest) and the title's sticky-note pictures follow the browser's language (ja/en, decided from `navigator.languages` at every start, never saved, no switch on screen, #292; `settings.language` in the save is reserved and unused); machine parts stay English; Japanese note fonts (Zen Kurenaido, Yomogi, OFL) are subsets in `public/fonts/` rebuilt by `scripts/build-note-fonts.py`
  - Camera: the whole feed going wrong (picture glitches). Handled as a non-image anomaly, not an image overlay, so no `kind: image` entry uses it (the ledger carries it as a `feed_glitch` non_image entry); changes to a thing in the picture are Object
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
- **Multi-input controls**: Touch swipe, mouse drag, keyboard (← → / A D / 1–8), and the numbered camera buttons — all four paths switch cameras
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
- [x] Camera view with swipe controls
- [x] REPORT key and type-picker dialog
- [x] Game over screens (win/lose)

#### Camera System

- [x] 8 camera feeds defined (with provisional WebP imagery)
- [x] Multi-input navigation (touch swipe / mouse drag / keyboard / numbered buttons)
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
- [x] Retro CRT cabinet UI: scanlines, moving noise, knobs (brightness / contrast), movie-style subtitles (see DESIGN.md §8, §11; lines come from the dialogue ledger, sample text only until it is written)
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
- [x] Implement image preloading system (#284, see DESIGN.md §7; overlays on idle: `src/utils/preload.ts`)
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
- Optional mute toggle

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
- **Deployment**: Cloudflare Pages (Git integration): a push to `main` builds and publishes to https://anomaly2.llll-ll.com/. GitHub Actions CI only lints, tests and builds

### File Structure

```
DESIGN.md               # Design-token system (Material 3-inspired, single source of truth)
src/
├── components/          # React components
│   ├── Cabinet.tsx      # In-game screen: monitor + control panel, local UI state
│   ├── CameraView.tsx   # CRT monitor (picture, noise, OSD, subtitles)
│   ├── NoiseCanvas.tsx
│   ├── CameraStrip.tsx  # Numbered camera push buttons
│   ├── Knob.tsx         # BRIGHTNESS / CONTRAST knob
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

---

## 📊 Game Balance

### Current Tuning

- **First Anomaly**: 12 seconds (no dead opening)
- **Anomaly Spawn Interval**: 30 seconds
- **Concurrent Anomaly Cap**: 2 active at once (spawn skipped while at cap)
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

- Run with `npm test` (once) or `npm run test:watch`. CI runs **lint → test → build** in that order (`.github/workflows/ci.yml`).
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
