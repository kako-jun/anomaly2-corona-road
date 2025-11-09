# Anomaly²: Corona Road

An anomaly detection horror game set in an underground shopping corridor.

## Game Concept
- **Duration**: 6 minutes (0:00 - 6:00 in-game time)
- **Objective**: Survive until dawn by detecting and reporting anomalies
- **Anomaly Detection**: Switch between security cameras and report anomalies
- **Meta Element**: The rules themselves will break in the later stages

## Features
- Mobile-optimized vertical display
- English-only UI for retro horror atmosphere
- Multiple camera views of Corona Road
- 5 anomaly categories: Camera, Object, Environment, Person, Surreal
- Accessibility-friendly design (color-blind safe, simple controls)

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS

## Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

### Linting & Formatting
```bash
npm run lint
npm run format
```

## Deployment

This project is automatically deployed to GitHub Pages when you push to the `main` branch.

### Setup GitHub Pages (First Time Only)
1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to the `main` branch - the site will automatically deploy!

### Access Your Game
After deployment, your game will be available at:
```
https://kako-jun.github.io/anomaly2-corona-road/
```

The GitHub Actions workflow will:
- Install dependencies
- Run build
- Deploy to GitHub Pages automatically

Check the **Actions** tab in your repository to see deployment status.