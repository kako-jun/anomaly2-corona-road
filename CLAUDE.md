# Anomaly²: Corona Road - Development Documentation

## 🎮 Game Concept

**Anomaly²: Corona Road** is an anomaly detection horror game set in an underground shopping corridor in Japan. The core concept is a meta-horror experience where the rules of anomaly detection themselves break down in later stages.

### Tagline

"Monitor the cameras. Report the anomalies. Trust your eyes... or don't."

---

## 📋 Game Specifications

### Core Mechanics

#### 1. Time System

- **Total Duration**: 6 minutes (360 seconds)
- **In-game Time**: 0:00 AM - 6:00 AM
- **Real-time Mapping**: 1 real minute = 1 in-game hour
- **Win Condition**: Survive until 6:00 AM

#### 2. Anomaly System

- **First Anomaly Delay**: 12 seconds
- **Spawn Interval**: 30 seconds (cap of 2 concurrent — see Game Balance)
- **Total Anomalies**: 6-11 per playthrough depending on report cadence
- **Categories**: 5 types
  - 📹 Camera: Technical glitches, feed anomalies
  - 📦 Object: Physical items appearing/disappearing/changing
  - 🌆 Environment: Lighting, structure, atmosphere changes
  - 🚶 Person: Human figures, shadows, movements
  - 👁️ Surreal: Reality-breaking phenomena

#### 3. Phase System

Anomalies become progressively more disturbing and rule-breaking:

**Early Phase (0:00 - 2:00)**

- Small, subtle anomalies
- Focus: Objects and environment
- Examples: Missing signs, flickering lights, frozen timestamps

**Mid Phase (2:00 - 4:00)**

- More obvious environmental changes
- Introduction of human elements
- Examples: Camera angle shifts, corridor elongation, backwards movement

**Late Phase (4:00 - 6:00)**

- Surreal and meta-anomalies
- Rules themselves break down
- Examples: UI corruption, time reversal, impossible geometry
- **10% chance for meta-anomalies**

#### 4. Meta-Anomaly System

Meta-anomalies challenge the player's trust in the game interface itself:

- Report button disappears
- Camera labels randomize
- Timer runs backwards
- UI text becomes corrupted
- Multiple cameras show identical feeds

#### 5. Win/Lose Conditions

**Win Conditions:**

- Survive until 6:00 AM
- Correctly report at least 4 anomalies

**Lose Conditions:**

- 3 false reports (strikes)
- Missing too many anomalies (< 4 detected)

---

## 🎨 Design Philosophy

### Atmosphere

- **Retro Horror**: Inspired by analog horror and surveillance footage aesthetics
- **English-only UI**: Creates alienation and professional surveillance system feel
- **Minimalist**: Focus on tension, not jump scares
- **Showa Era Aesthetics**: 1960s-80s Japanese underground corridor design

### Accessibility

- **Color-blind Safe**: Anomaly categories pair one icon with one color (see DESIGN.md §2.3)
- **Multi-input controls**: Touch swipe, mouse drag, on-screen ‹ › buttons, keyboard (← → / A D / 1–8), and the camera strip — all five paths switch cameras
- **Clear Feedback**: Flash overlay + toast on every report (correct / wrong)
- **Mobile-first, desktop-equal**: 480 px column on desktop, full-bleed on mobile; never assumes a touchscreen

### Visual Design

See **DESIGN.md** for the unified design system (Material 3-inspired tokens for color, typography, spacing, elevation, and motion). All component CSS references `:root` CSS variables — no hardcoded hex in components.

- Scanline CRT overlay
- Monospace JetBrains Mono stack
- Google-family semantic palette (green/blue/amber/red/violet)
- Vignette + glitch-shake on camera feeds during active anomalies

---

## 🏗️ Current Implementation Status

### ✅ Completed Features

#### Core Systems

- [x] Game state management (idle/playing/win/lose)
- [x] 6-minute game loop with real-time conversion
- [x] Anomaly spawning system (45s intervals)
- [x] Phase-based difficulty progression
- [x] Win/lose condition checking

#### UI Components

- [x] Start screen with instructions
- [x] Game HUD (time, stats display)
- [x] Camera view with swipe controls
- [x] Report panel with category selection
- [x] Game over screens (win/lose)

#### Camera System

- [x] 8 camera feeds defined (with provisional WebP imagery)
- [x] Multi-input navigation (touch swipe / mouse drag / ‹ › buttons / keyboard / strip tap)
- [x] Camera selector strip below the view with anomaly dot indicators
- [x] Visual feedback for anomaly presence (badge + description + glitch-shake)
- [x] Camera info overlay (name, location, timestamp, REC)

#### Anomaly System

- [x] 5 anomaly categories implemented
- [x] Template-based anomaly generation
- [x] Phase-appropriate anomaly selection
- [x] Weighted random selection by phase
- [x] Meta-anomaly templates (10% in late phase)

#### Reporting System

- [x] Category-based reporting (5 types, each with icon + color)
- [x] Correct/incorrect detection
- [x] Strike counter (3 max)
- [x] Report button **always enabled** — false reports cost a strike (intentional risk/reward; the player decides when to act)
- [x] Flash overlay + toast feedback on every report

#### Visual Polish

- [x] Unified design-token system (see DESIGN.md)
- [x] Retro CRT scanline effect
- [x] Monospace JetBrains Mono styling
- [x] Material 3-style semantic palette
- [x] Vignette + glitch-shake camera effect during anomalies
- [x] Mobile-optimized layout, centered on desktop

#### DevOps

- [x] GitHub Actions deployment
- [x] Automatic GitHub Pages publishing
- [x] ESLint + Prettier setup
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
- [ ] Implement image preloading system
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

**Current:** Only in templates, not visually implemented

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

- [ ] Continue past 6:00 AM
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
- **Deployment**: GitHub Pages via GitHub Actions

### File Structure

```
DESIGN.md               # Design-token system (Material 3-inspired, single source of truth)
src/
├── components/          # React components
│   ├── CameraView.tsx
│   ├── CameraStrip.tsx  # Camera selector tiles below the view
│   ├── GameHUD.tsx
│   ├── GameOverScreen.tsx
│   ├── ReportPanel.tsx
│   └── StartScreen.tsx
├── hooks/              # Custom React hooks
│   └── useGameState.ts
├── types/              # TypeScript definitions
│   └── game.ts
├── utils/              # Game logic utilities
│   ├── anomalyData.ts
│   └── gameConfig.ts
├── App.tsx
├── main.tsx
├── App.css             # Component classes — all values reference :root tokens
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
- **Average Playtime**: 6 minutes (one full shift)
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
3. **Meta-Anomalies Not Visual**: Templates exist but no UI corruption effects
4. **Limited Anomaly Pool**: Only template text, not varied enough
5. **No Persistence**: No save states or progress tracking

### Technical Debt

- Image preloading system needed
- Sound system architecture needed
- Better mobile gesture detection
- Reduce re-renders in game loop
- Add error boundaries

---

## 🤝 Contributing Guidelines

### For Future Development

#### Adding New Anomalies

1. Add template to `src/utils/anomalyData.ts`
2. Categorize correctly (Camera/Object/Environment/Person/Surreal)
3. Assign to appropriate phase (early/mid/late)
4. Consider visibility and difficulty

#### Adding New Features

1. Update this document first
2. Create feature branch
3. Implement with TypeScript
4. Add tests (if applicable)
5. Update README.md

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
