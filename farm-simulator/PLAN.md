# Farm Simulator Plan

## Player Goal
- Build a profitable farm before the season ends.
- Clear all 10 campaign levels, each with its own coin target and season limits.

## Main Loop
- Select a tile.
- Use tools to prepare soil, plant crops, water crops, and harvest mature crops.
- Spend a fixed number of actions each day, then advance to next day.
- Manage seeds, water, and coins to sustain crop cycles.

## Inputs and Controls
- Move cursor: Arrow keys or WASD
- Use selected tool: Space or Enter
- Select tool: `1` Hoe, `2` Seed, `3` Water, `4` Harvest
- Select seeds: seed cards, `Q`/`E` cycle, or quick hotkeys (`5 6 7 8 9 0 - =`)
- Buy seeds pack: `B`
- Continue after level clear: `N`
- Restart after win/lose: `R`

## Win and Fail States
- Win: clear level 10 target and complete final season.
- Fail: season ends before level target is reached.

## Progression and Difficulty
- Crop growth requires watering each day.
- Missing water for multiple days withers crops.
- Water refills daily, but actions per day are capped.
- Buying seeds costs coins, forcing economic tradeoffs.
- Multi-level campaign increases difficulty each level (higher goals, tighter resources, lower rain chance).
- Multiple crop/seed types use different water capacities and growth speeds.

## Visual Direction
- Cozy pixel-like flat color style on canvas.
- Soft sky and field background.
- Distinct tile colors for farm states.
- High-contrast cursor and compact stats panel.

## Stack and Hosting Assumptions
- Stack: plain HTML, CSS, JavaScript with Canvas 2D.
- No build tools required for initial milestone.
- Can run locally via static file server.
- Can later migrate to Next.js + Phaser if needed.

## Milestone Order
1. Playable farm grid with input and tool selection.
2. Crop lifecycle, day progression, and resources.
3. Win/fail states and restart flow.
4. UI polish, balancing values, and responsive layout.
5. Level progression, seed variety, and 3D-style farm rendering.
6. Premium visual pass (higher-fidelity props, sky lighting, post effects).
7. Optional: richer art, sound, save/load, weather events.
