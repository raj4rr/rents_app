# 2026-03-29 Levels + Seeds + 3D Pass

## Goal
- Add level progression, higher difficulty scaling, multiple seed types with water-capacity behavior, and 3D-styled farm components.

## Implemented
- Added 3-level campaign with increasing difficulty:
  - Level-specific coin goals
  - Level-specific season length
  - Lower actions/day and water/day at higher levels
  - Lower rain chance at higher levels
  - Seed cost multiplier per level
- Added crop/seed system with 3 types:
  - Turnip, Corn, Rice
  - Different growth days, sell price, buy pack cost/size
  - Different water capacities that control stored moisture
- Added key controls for seed management:
  - `Q`/`E` cycle seed type
  - `5`/`6`/`7` direct seed type select
  - `B` buy pack of selected seed
  - `N` continue to next level when level target is met
- Added level-complete and end-of-run overlays.
- Added pseudo-3D canvas environment details:
  - Raised farm platform with side faces
  - Fences
  - 3D barn
  - 3D water tower
  - 3D crate props
- Updated docs and in-game controls text to reflect new systems.

## Notes
- Existing animation systems (particles, rain, crop sway, cursor pulse) were preserved and integrated with the new progression logic.
- HUD now shows level and selected seed inventory context.
