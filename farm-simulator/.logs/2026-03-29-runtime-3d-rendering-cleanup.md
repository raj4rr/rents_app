## Runtime 3D Rendering + Visual Cleanup

### User request
- Upgrade to true runtime 3D model rendering using Quaternius OBJ/FBX files via Three.js.
- Remove overlapping background images/animations and keep icon-based UI.

### Changes made
- Added `src/scene3d.js`:
  - Uses Three.js module imports from CDN.
  - Loads Quaternius files directly at runtime:
    - OBJ/MTL: `BigBarn`, `Silo_House`, `Well`, `Fence2`
    - FBX: `TowerWindmill`
  - Adds lighting, farm ground, camera, and renderer lifecycle (`renderFrame`, `resize`).
  - Includes graceful fallback meshes if a model fails to load.

- Updated `src/game.js`:
  - Dynamically imports and initializes `initFarm3DScene` at runtime.
  - Falls back gracefully to 2D overlay-only mode if 3D modules fail to load.
  - Wired 3D rendering into the main frame loop.
  - Disabled overlapping 2D visual animation layers:
    - Premium background image composition.
    - Rain animation overlay.
    - Particle spawn/update/draw effects.
    - Tile flash decay animation.
    - Crop sway/bounce and cursor pulsing.
  - Removed runtime calls to old environment/rain init functions.

- Updated `styles.css`:
  - Removed hover motion transitions on tool buttons and seed cards.
  - Kept icon visuals while eliminating motion effects.

### Notes
- Existing premium/background draw helpers are still present in `game.js` but no longer used by render flow.
- Runtime 3D relies on CDN module imports for Three.js because local package install was unavailable.
