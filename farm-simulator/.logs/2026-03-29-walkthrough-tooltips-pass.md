# 2026-03-29 Seed UX + Walkthrough Pass

## Goal
- Add interactive seed selection UI, contextual nudges, tooltips, and a guided game walkthrough.

## Implemented
- Added interactive seed card panel in UI:
  - Click to select Turnip/Corn/Rice
  - Live stock badges per seed type
  - Dynamic seed stat hint text
- Added contextual nudge banner:
  - Surfaces quick tips for seed selection, purchases, and common mistakes
- Added tooltip system:
  - Hover/focus tooltips for tool buttons and seed cards
  - Viewport-safe tooltip placement logic
- Added walkthrough panel:
  - Step-by-step guidance for first gameplay loop
  - Steps track real actions: move, till, select seed, plant, water, harvest
  - Controls: Next, Skip, Replay
- Integrated walkthrough progression hooks into gameplay actions.

## Notes
- Existing controls remain unchanged and still work with keyboard + mouse.
- Walkthrough resets on level 1 unless it has already been completed.
