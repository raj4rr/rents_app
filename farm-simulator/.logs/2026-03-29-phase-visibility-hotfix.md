## Phase Visibility Hotfix

### Issue observed
- Intro/rules/gameplay screen transitions were inconsistent.
- Start button appeared unresponsive.

### Root cause
- `.hidden` utility class was overridden by later CSS rules (`.canvas-stack canvas`, `.rules-overlay`, etc.), so elements tagged `hidden` still displayed.

### Fix
- Updated `.hidden` to `display: none !important;` in `styles.css`.
- This ensures:
  - Intro overlay can hide.
  - Rules overlay can hide.
  - Gameplay canvas can toggle correctly.
