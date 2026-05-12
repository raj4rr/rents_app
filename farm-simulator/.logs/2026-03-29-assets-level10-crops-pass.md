# 2026-03-29 Imported Assets + Level 10 Expansion

## Goal
- Use provided asset archives to beautify the game, add more fruits/vegetables, and extend progression to level 10.

## Imported Asset Sources
- `/Users/rajesh/Downloads/farm assets.rar`
  - Extracted to `assets/imported/farm-assets/`
  - Includes fruit/vegetable PNG sprites and tool PNGs
- `/Users/rajesh/Downloads/Farm Buildings by Quaternius.zip`
  - Extracted to `assets/imported/quaternius/`
  - Includes `Preview.png` and 3D model source files (`OBJ`, `FBX`, `Blend`)

## Implemented
- Expanded crop roster to 10 fruit/vegetable types with imported PNG sprites:
  - turnip, carrot, tomato, corn, cabbage, pumpkin, strawberry, grape, pepper, watermelon
- Added dynamic seed card UI generation from crop config:
  - Live stock counts
  - Rich crop stats
  - Tooltip + hotkey labels
- Wired imported tool icons from the RAR pack into toolbelt UI.
- Updated in-field crop rendering to display imported produce sprites when crops mature.
- Updated background rendering to use Quaternius `Preview.png` for a richer environment backdrop.
- Reworked campaign progression from 3 levels to 10 generated levels with escalating difficulty.
- Updated docs and control hints for the expanded seed/crop and level system.

## Notes
- Kept existing gameplay loop and onboarding systems intact while scaling content breadth.
- `node --check src/game.js` passed after integration.
