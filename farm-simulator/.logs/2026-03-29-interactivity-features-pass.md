## Interactivity Feature Pass (1,2,3,6)

Implemented requested feature groups:

1) Clear reward loop
- Added daily quests with progress tracking:
  - Harvest / Water / Plant / Earn coins / Clear weeds / Treat pests
- Added quest rewards (coins + seeds) and streak multiplier bonuses.
- Added quest status in top bar and quest nudges on completion/start of day.

2) Richer tile interactions
- Added soil types per tile (`loam`, `rich`, `sandy`, `clay`) with gameplay effects:
  - growth bonus/penalty
  - moisture behavior
  - dry tolerance
  - sale bonus
- Added hazard events:
  - Weeds can appear on growing crops and reduce growth/moisture.
  - Pests can appear and reduce growth/harvest quality.
- Tool interactions:
  - Hoe clears weeds on growing crops.
  - Water treats pests while watering.

3) Distinct seeds + upgrades
- Added seed trait system per crop (e.g. sell bonus, dry resistance, pack bonus, faster growth, etc.).
- Added crop mastery progression from harvesting:
  - mastery XP per crop
  - mastery levels unlock improved effective stats (sell value, growth, water capacity/fill).
- Updated seed cards and seed hint text to show effective values + mastery.

6) Feedback and polish
- Added lightweight WebAudio SFX for tool feedback (`tap/success/harvest/fail`).
- Added harvest celebration burst effect around harvested tile.
- Added dynamic cursor context hint bubble based on tool + tile state.
- Updated how-to list with quests, weeds/pests, and mastery info.

Notes
- Existing intro/rules/game flow is preserved.
- Walkthrough panel removal remains enforced.
