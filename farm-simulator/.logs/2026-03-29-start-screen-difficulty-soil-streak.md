## Start Screen + Nudge Messaging Update

### Request
- Show difficulty, soil type guidance, and streak info on the start/rules screen.
- Include the same information in nudges.

### Implemented
- Added rules-screen info rows:
  - `rulesDifficultyText`
  - `rulesSoilText`
  - `rulesStreakText`
- Added dynamic helpers in game logic:
  - `difficultySummary(...)`
  - `soilGuideSummary()`
  - `streakGuideSummary()`
  - `updateStartScreenInfo()`
- Wired updates:
  - On rules-screen display (`showRulesPhase`)
  - On game start setup (`startGame`)
  - On level start (`startLevel`)
- Updated nudges to include:
  - difficulty summary
  - soil guide summary
  - streak bonus summary
  - quest summary
- Bumped cache version in `index.html` so latest text/UI updates load immediately.
