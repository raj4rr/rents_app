## Mobile + Click-Based Controls Pass

Implemented a mobile-friendly, tap-first interaction model:

- Added a touch action bar with on-screen buttons:
  - `Use Tool`
  - `Buy Seeds`
  - `End Day`
  - `Next Level`
  - `Restart`
- Added responsive styles for action bar and larger touch targets on small screens.
- Switched farm interaction from `mousedown` to `pointerdown`.
- Updated tile interaction to tap-first:
  - First tap selects tile and shows context hint.
  - Quick second tap on same tile uses selected tool.
- Added dynamic action button states in HUD sync:
  - button labels update (e.g. buy seed with cost, current tool name)
  - enable/disable and show/hide based on game state.
- Updated on-screen instructions to prioritize tap/click controls over keyboard.
- Added cache-bust version update in `index.html` so latest mobile control changes load immediately.
