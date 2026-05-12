# Browser Farm Simulator

Small browser-based farm simulation prototype built with HTML/CSS/JS canvas.

## Run

Option 1: open `index.html` directly in a browser.

Option 2: use a local static server:

```bash
cd /Users/rajesh/Documents/farm-simulator
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Controls

- Move cursor: Arrow keys or WASD
- Select tool: `1` Hoe, `2` Seed, `3` Water, `4` Harvest
- Click SVG tool icons in the toolbelt to switch tools
- Select seed type: `Q`/`E` (cycle), click seed cards, or hotkeys `5 6 7 8 9 0 - =` (first 8 seeds)
- Click seed cards to switch seed types with live stat hints
- Use tool: Space or Enter
- Buy selected seed pack: `B`
- Continue after clearing level: `N`
- Restart run after clear/fail/win: `R`
- Use walkthrough controls: Next, Skip, Replay
- Hover tool/seed cards for contextual tooltips

## Rules

- The game now has **10 levels** with increasing difficulty.
- Each level has its own season length, daily actions, water tank size, and coin target.
- You must hit each level target before season end to continue.
- Different fruit/vegetable seed types have different growth times, sell value, and **water capacity**.
- Current crop roster includes turnip, carrot, tomato, corn, cabbage, pumpkin, strawberry, grape, pepper, and watermelon.
- Water capacity controls how much moisture a crop can store between days.

## Visual Upgrades

- Animated SVG icon toolbelt and weather badge
- Live stat chips with iconography
- Crop sway animation, cursor pulse, and tile flash feedback
- Action particles for hoe, seed, water, and harvest actions
- Rain weather overlay animation during rainy days
- Added pseudo-3D farm environment pieces (raised field platform, fences, barn, water tower, crates)
- Added a premium-style world asset pack under `assets/premium/`:
  - farmhouse, windmill, tractor, tree, silo, hay bales, rock cluster, water channel
- Added cinematic rendering effects:
  - dynamic sky lighting and sun rays
  - moving cloud and bird layers
  - terrain micro-detail and vignette post effect
- Added onboarding UX:
  - interactive seed selection cards
  - contextual nudge banner
  - hover/focus tooltips
  - guided walkthrough panel

## Project Files

- `PLAN.md`: implementation plan
- `.logs/`: progress logs
- `index.html`, `styles.css`, `src/game.js`: game app
