# 2026-03-28 Initial Build Log

## Scope
- Started a browser-based farm simulation from scratch.
- Targeted milestone 1 and 2: playable loop plus crop lifecycle.

## Implemented
- Project scaffold with `index.html`, `styles.css`, and `src/game.js`.
- `PLAN.md` with game definition and milestones.
- Canvas-based 12x8 tile field with keyboard + mouse support.
- Tools: hoe, seed, water, harvest.
- Resources: coins, seeds, water, daily action budget.
- Day advancement, weather (clear/rain), crop growth, and crop withering.
- Win/fail conditions and restart flow.

## Current Balancing
- Start: 20 coins, 10 seeds.
- Goal: 200 coins by day 20.
- Harvest reward: +15 coins and +1 seed.
- Buy seeds: 5 seeds for 10 coins.

## Notes
- Kept stack dependency-free for fast local execution.
- Next iteration should add save state, animations, and richer crop variety.
