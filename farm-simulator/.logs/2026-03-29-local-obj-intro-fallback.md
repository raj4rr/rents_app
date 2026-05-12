## Local OBJ Intro Fallback

### Problem
- Intro was showing dialog only because Three.js modules were loaded from CDN.
- In this environment DNS/network resolution for CDN is unavailable, so 3D module imports fail.

### Fix
- Added `src/intro-local-obj.js`:
  - Loads Quaternius OBJ files directly from local project assets.
  - Parses vertices/faces and renders animated 3D intro on `scene3dCanvas` using software projection.
  - Uses multiple models (`BigBarn`, `Silo_House`, `TowerWindmill`, `Well`, `Fence2`).
- Updated `tryInitRuntime3D` in `src/game.js`:
  - Attempt Three.js intro first.
  - If it fails, automatically fall back to local OBJ intro renderer (no internet dependency).
  - If fallback also fails, only then skip to rules screen.
- Reduced intro overlay opacity and moved intro card to lower-left so 3D assets remain visible.
