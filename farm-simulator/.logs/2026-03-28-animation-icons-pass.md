# 2026-03-28 Animation + Icon Pass

## Goal
- Improve interactivity with animations, SVG imagery, and icon-driven controls.

## Implemented
- Added SVG icon set under `assets/icons/`:
  - hoe, seed, water, harvest, coin, day, sun, rain, barn
- Reworked UI:
  - clickable toolbelt with SVG tool icons
  - live stat chips with icons
  - weather indicator with dynamic sun/rain icon
  - live status line beneath the canvas
- Added animation systems in `src/game.js`:
  - particle effects for each farming action
  - crop sway animation for sprout and ready stages
  - pulse glow for mature crops
  - tile flash feedback after interactions and growth transitions
  - pulsing cursor outline
  - animated rain overlay during rainy days

## Notes
- Existing farming logic and balancing were preserved.
- Keyboard controls continue to work; tool buttons provide mouse-based selection.
