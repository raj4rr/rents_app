## Intro + Rules + 2D Gameplay Recovery

### Request addressed
- Fix game flow so it works reliably.
- Play a Three.js 3D OBJ/FBX intro first.
- Show gameplay rules screen next.
- Start the 2D farm game after rules, keeping seed/tool assets.

### Implemented
- Added phase-based app flow in `src/game.js`:
  - `intro` -> `rules` -> `game`.
  - Gameplay input is blocked until the game phase starts.
  - Intro supports `Skip Intro`, rules supports `Start Farming`.
- Updated render loop:
  - During intro/rules, only 3D intro scene is rendered.
  - After start, switches to 2D canvas gameplay rendering.
- Added UI overlays in `index.html`:
  - Intro overlay (`introOverlay`, `introCaption`, `introSkipBtn`)
  - Rules overlay (`rulesOverlay`, `startGameBtn`)
- Added styling for overlays in `styles.css`.
- Updated `scene3d.js`:
  - Uses Quaternius OBJ/MTL + FBX models.
  - Added cinematic camera orbit + windmill spin for intro animation.
  - Removed interactive orbit controls for a video-like intro.
- Kept seed/tool icon asset pipeline intact for 2D gameplay.

### Fallback behavior
- If Three.js intro fails to load, app shows rules screen automatically and still allows 2D gameplay.
