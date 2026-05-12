const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scene3dCanvas = document.getElementById("scene3dCanvas");
const canvasStackEl = document.getElementById("canvasStack");
const gamePanelEl = document.querySelector(".game-panel");

const statusTextEl = document.getElementById("statusText");
const weatherTextEl = document.getElementById("weatherText");
const weatherSunEl = document.getElementById("weatherSun");
const weatherRainEl = document.getElementById("weatherRain");
const statLevelEl = document.getElementById("statLevel");
const statDayEl = document.getElementById("statDay");
const statCoinsEl = document.getElementById("statCoins");
const statSeedsEl = document.getElementById("statSeeds");
const statWaterEl = document.getElementById("statWater");
const statActionsEl = document.getElementById("statActions");
const streakValueEl = document.getElementById("streakValue");
const questValueEl = document.getElementById("questValue");
const toolButtons = Array.from(document.querySelectorAll(".tool-button"));
const seedSelectorEl = document.getElementById("seedSelector");
let seedButtons = [];
const seedHintTextEl = document.getElementById("seedHintText");
const inventoryPanelEl = document.getElementById("inventoryPanel");
const nudgeBannerEl = document.getElementById("nudgeBanner");
const walkthroughPanelEl = document.getElementById("walkthroughPanel");
const walkthroughTextEl = document.getElementById("walkthroughText");
const walkthroughStepMetaEl = document.getElementById("walkthroughStepMeta");
const walkthroughNextEl = document.getElementById("walkthroughNext");
const walkthroughSkipEl = document.getElementById("walkthroughSkip");
const walkthroughReplayEl = document.getElementById("walkthroughReplay");
const uiTooltipEl = document.getElementById("uiTooltip");
const introOverlayEl = document.getElementById("introOverlay");
const introCaptionEl = document.getElementById("introCaption");
const introSkipBtnEl = document.getElementById("introSkipBtn");
const rulesOverlayEl = document.getElementById("rulesOverlay");
const startGameBtnEl = document.getElementById("startGameBtn");
const rulesDifficultyTextEl = document.getElementById("rulesDifficultyText");
const rulesSoilTextEl = document.getElementById("rulesSoilText");
const rulesStreakTextEl = document.getElementById("rulesStreakText");
const applyToolBtnEl = document.getElementById("applyToolBtn");
const buySeedsBtnEl = document.getElementById("buySeedsBtn");
const endDayBtnEl = document.getElementById("endDayBtn");
const zoomOutBtnEl = document.getElementById("zoomOutBtn");
const zoomInBtnEl = document.getElementById("zoomInBtn");
const inventoryToggleBtnEl = document.getElementById("inventoryToggleBtn");
const nextLevelBtnEl = document.getElementById("nextLevelBtn");
const restartBtnEl = document.getElementById("restartBtn");
const inventoryPinned = !inventoryToggleBtnEl;

// Safety: remove walkthrough UI if a stale cached HTML still includes it.
document.querySelectorAll(".walkthrough-panel").forEach((panel) => panel.remove());

const seedStockElements = {};
const PREMIUM_ASSET_FILES = {};
const premiumAssets = {};
const cropSprites = {};
let nudgeTimer = null;
let farm3DScene = null;
const toolSpritePaths = {
  hoe: "./assets/imported/farm-assets/Tools/Hoe.png",
  seed: "./assets/imported/farm-assets/Tools/Seed Bag.png",
  water: "./assets/imported/farm-assets/Tools/Watering Can.png",
  harvest: "./assets/imported/farm-assets/Tools/Scythe.png",
};

const COLS = 12;
const ROWS = 8;
const TILE = 56;
const FIELD_X = 34;
const FIELD_Y = 90;
const BASE_ISO_TILE_W = 74;
const BASE_ISO_TILE_H = 38;
let ISO_SCALE = 1;
let ISO_TILE_W = BASE_ISO_TILE_W;
let ISO_TILE_H = BASE_ISO_TILE_H;
let ISO_HALF_W = ISO_TILE_W / 2;
let ISO_HALF_H = ISO_TILE_H / 2;
const MIN_ZOOM_FACTOR = 0.7;
const MAX_ZOOM_FACTOR = 1.7;
const ZOOM_STEP = 0.12;
const INTRO_DURATION_MS = 9000;

const APP_PHASE = {
  INTRO: "intro",
  RULES: "rules",
  GAME: "game",
};

const INTRO_TIMELINE = [
  { at: 0, text: "Loading Quaternius farm buildings..." },
  { at: 1800, text: "Establishing 3D farm camera flythrough..." },
  { at: 4200, text: "Placing barns, silo, well and windmill..." },
  { at: 6800, text: "Finalizing scene. Gameplay rules coming up..." },
];

const appState = {
  phase: APP_PHASE.INTRO,
  introStartedAt: 0,
  introCaptionIndex: -1,
  gameStarted: false,
  inventoryOpen: inventoryPinned,
  lastTapCol: -1,
  lastTapRow: -1,
  lastTapAt: 0,
};

const TOOLS = ["hoe", "seed", "water", "harvest"];

const STAGE = {
  GRASS: 0,
  TILLED: 1,
  SEEDED: 2,
  SPROUT: 3,
  READY: 4,
  WITHERED: 5,
};

const STAGE_COLORS = {
  [STAGE.GRASS]: "#74b85c",
  [STAGE.TILLED]: "#8f5a2a",
  [STAGE.SEEDED]: "#9f6c39",
  [STAGE.SPROUT]: "#56ad55",
  [STAGE.READY]: "#f0b930",
  [STAGE.WITHERED]: "#4b4b4b",
};

const STAGE_TOP_COLORS = {
  [STAGE.GRASS]: "#89cf6b",
  [STAGE.TILLED]: "#a06e3e",
  [STAGE.SEEDED]: "#b57f47",
  [STAGE.SPROUT]: "#72c96d",
  [STAGE.READY]: "#f7cd57",
  [STAGE.WITHERED]: "#636363",
};

const CROP_TYPES = {
  turnip: {
    label: "Turnip",
    shortLabel: "TRN",
    growthDays: 2,
    waterCapacity: 2,
    sellPrice: 14,
    buyCost: 10,
    buyAmount: 4,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Turnip.png",
    colors: {
      seed: "#734722",
      sprout: "#67be5a",
      stem: "#4e8f46",
      produce: "#d7b4eb",
      accent: "#f2e2ff",
    },
  },
  carrot: {
    label: "Carrot",
    shortLabel: "CAR",
    growthDays: 2,
    waterCapacity: 2,
    sellPrice: 16,
    buyCost: 11,
    buyAmount: 4,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Carrot.png",
    colors: {
      seed: "#80502a",
      sprout: "#6db95f",
      stem: "#4f8a3f",
      produce: "#f39a3c",
      accent: "#ffd8a6",
    },
  },
  tomato: {
    label: "Tomato",
    shortLabel: "TMT",
    growthDays: 3,
    waterCapacity: 3,
    sellPrice: 22,
    buyCost: 15,
    buyAmount: 3,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Tomato.png",
    colors: {
      seed: "#7a4827",
      sprout: "#64b856",
      stem: "#46883d",
      produce: "#e44a42",
      accent: "#ffb3aa",
    },
  },
  corn: {
    label: "Corn",
    shortLabel: "CRN",
    growthDays: 3,
    waterCapacity: 3,
    sellPrice: 24,
    buyCost: 16,
    buyAmount: 3,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Corn.png",
    colors: {
      seed: "#7b572b",
      sprout: "#79c35b",
      stem: "#5e8d34",
      produce: "#efc74d",
      accent: "#f8e38a",
    },
  },
  cabbage: {
    label: "Cabbage",
    shortLabel: "CAB",
    growthDays: 4,
    waterCapacity: 3,
    sellPrice: 30,
    buyCost: 20,
    buyAmount: 2,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Cabbage Green.png",
    colors: {
      seed: "#6e542f",
      sprout: "#70b85f",
      stem: "#4b7f3a",
      produce: "#82cf6e",
      accent: "#d4f1c9",
    },
  },
  pumpkin: {
    label: "Pumpkin",
    shortLabel: "PMK",
    growthDays: 5,
    waterCapacity: 4,
    sellPrice: 42,
    buyCost: 26,
    buyAmount: 2,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Pumpkin.png",
    colors: {
      seed: "#6f4728",
      sprout: "#6ab15e",
      stem: "#4f7f3e",
      produce: "#f39b3d",
      accent: "#ffd6ae",
    },
  },
  strawberry: {
    label: "Strawberry",
    shortLabel: "STR",
    growthDays: 3,
    waterCapacity: 2,
    sellPrice: 26,
    buyCost: 18,
    buyAmount: 3,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Strawberries.png",
    colors: {
      seed: "#7c4a29",
      sprout: "#67bb5e",
      stem: "#4d823e",
      produce: "#df4d57",
      accent: "#ffc3cb",
    },
  },
  grape: {
    label: "Grape",
    shortLabel: "GRP",
    growthDays: 4,
    waterCapacity: 3,
    sellPrice: 34,
    buyCost: 22,
    buyAmount: 2,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Grapes Purple.png",
    colors: {
      seed: "#67462b",
      sprout: "#70b95e",
      stem: "#4a7f3f",
      produce: "#8f5cc8",
      accent: "#dcc8f8",
    },
  },
  pepper: {
    label: "Pepper",
    shortLabel: "PPR",
    growthDays: 4,
    waterCapacity: 3,
    sellPrice: 32,
    buyCost: 21,
    buyAmount: 2,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Pepper Red.png",
    colors: {
      seed: "#7a4d2a",
      sprout: "#67b657",
      stem: "#4a843a",
      produce: "#dc4a44",
      accent: "#ffb9b4",
    },
  },
  watermelon: {
    label: "Watermelon",
    shortLabel: "WTM",
    growthDays: 6,
    waterCapacity: 4,
    sellPrice: 52,
    buyCost: 30,
    buyAmount: 1,
    spritePath: "./assets/imported/farm-assets/Fruits and Vegetables/Watermelon.png",
    colors: {
      seed: "#6d4f33",
      sprout: "#65b760",
      stem: "#4e8a46",
      produce: "#52b468",
      accent: "#f57d83",
    },
  },
};

const CROP_ORDER = Object.keys(CROP_TYPES);
const SEED_HOTKEYS = ["5", "6", "7", "8", "9", "0", "-", "="];

const CROP_TRAITS = {
  turnip: { name: "Resilient", dryBonus: 1, tooltip: "+1 dry-day tolerance." },
  carrot: { name: "Bulk Pack", packBonus: 1, tooltip: "+1 seed when buying packs." },
  tomato: { name: "Market Favorite", sellBonus: 0.12, tooltip: "+12% sale value." },
  corn: { name: "Deep Roots", waterFillBonus: 1, tooltip: "+1 moisture each watering." },
  cabbage: { name: "Pest Guard", pestGuard: 0.2, tooltip: "20% lower pest chance." },
  pumpkin: { name: "Heavy Yield", sellBonus: 0.18, growthPenalty: 1, tooltip: "+18% value, +1 day grow." },
  strawberry: { name: "Quick Sprout", growthBonus: 1, tooltip: "Matures 1 day faster." },
  grape: { name: "Retentive Vine", waterRetention: 1, tooltip: "Loses less moisture daily." },
  pepper: { name: "Hard Skin", dryBonus: 1, tooltip: "Extra dry resistance." },
  watermelon: { name: "Drought Giant", dryBonus: 2, waterCapacityBonus: 1, tooltip: "+2 dry tolerance." },
};

const SOIL_TYPES = {
  loam: {
    label: "Loam",
    tileTint: "rgba(111, 165, 78, 0.12)",
    growthBonus: 0,
    moistureDelta: 0,
    dryBonus: 0,
    sellBonus: 0,
  },
  rich: {
    label: "Rich",
    tileTint: "rgba(121, 189, 84, 0.18)",
    growthBonus: 1,
    moistureDelta: 0,
    dryBonus: 0,
    sellBonus: 0.08,
  },
  sandy: {
    label: "Sandy",
    tileTint: "rgba(200, 171, 98, 0.17)",
    growthBonus: 0,
    moistureDelta: -1,
    dryBonus: -1,
    sellBonus: 0,
  },
  clay: {
    label: "Clay",
    tileTint: "rgba(158, 124, 103, 0.14)",
    growthBonus: -1,
    moistureDelta: 1,
    dryBonus: 1,
    sellBonus: 0.04,
  },
};

const SOIL_ORDER = Object.keys(SOIL_TYPES);

const QUEST_TYPES = ["harvest", "water", "plant", "earn", "clearWeeds", "clearPests"];
const MASTERY_THRESHOLDS = [0, 4, 9, 15];

const WALKTHROUGH_STEPS = [
  {
    title: "Move Cursor",
    body: "Move with Arrow keys or WASD to pick your first tile.",
    flag: "moved",
  },
  {
    title: "Prepare Soil",
    body: "Use Hoe (1) on a grass tile to prepare it for planting.",
    flag: "tilled",
  },
  {
    title: "Select Seed",
    body: "Choose a seed card below (or cycle with Q/E).",
    flag: "seedSelected",
  },
  {
    title: "Plant Crop",
    body: "Use Seed tool (2) on tilled soil to plant.",
    flag: "planted",
  },
  {
    title: "Water Crop",
    body: "Use Water tool (3) to fill moisture based on seed capacity.",
    flag: "watered",
  },
  {
    title: "Harvest Crop",
    body: "When mature, use Harvest (4) to earn coins and recover seeds.",
    flag: "harvested",
  },
];

const LEVEL_NAMES = [
  "Starter Fields",
  "Misty Meadow",
  "Dry Summer",
  "Breezy Harvest",
  "Stone Valley",
  "Heatwave Ridge",
  "Storm Break",
  "Golden Orchard",
  "Night Market",
  "Master Harvest",
];

function buildStartSeeds(levelIndex) {
  const startSeeds = {};
  CROP_ORDER.forEach((cropType, index) => {
    const tierBase = index < 3 ? 5 : index < 6 ? 4 : index < 8 ? 3 : 2;
    startSeeds[cropType] = Math.max(1, tierBase - Math.floor(levelIndex / 3));
  });
  return startSeeds;
}

const LEVELS = LEVEL_NAMES.map((name, index) => ({
  name,
  goalCoins: 180 + index * 85 + index * index * 6,
  seasonDays: Math.max(14, 20 - Math.floor(index / 3)),
  actionsPerDay: Math.max(7, 12 - Math.floor(index / 2)),
  maxWaterPerDay: Math.max(6, 11 - Math.floor(index / 2)),
  rainChance: Math.max(0.09, 0.38 - index * 0.028),
  dryPenalty: Math.min(4, Math.floor(index / 2)),
  seedCostMultiplier: Number((1 + index * 0.12).toFixed(2)),
  startCoins: 28 + index * 7,
  startSeeds: buildStartSeeds(index),
}));

function difficultyLabel(levelIndex = gameState.levelIndex) {
  if (levelIndex <= 1) return "Easy";
  if (levelIndex <= 3) return "Normal";
  if (levelIndex <= 5) return "Challenging";
  if (levelIndex <= 7) return "Hard";
  return "Extreme";
}

function difficultySummary(levelIndex = gameState.levelIndex) {
  const level = LEVELS[levelIndex];
  const rain = Math.round(level.rainChance * 100);
  return `${difficultyLabel(levelIndex)} (rain ${rain}%, dry penalty ${level.dryPenalty})`;
}

function soilGuideSummary() {
  return "Loam=balanced, Rich=fast+value, Sandy=dries fast, Clay=holds water";
}

function streakGuideSummary() {
  const bonusPct = Math.round(gameState.questStreak * 18);
  return `Quest streak bonus ${bonusPct}% (18% per completed day)`;
}

const gameState = {
  cursorCol: 0,
  cursorRow: 0,
  selectedTool: 0,
  selectedSeedType: "turnip",
  zoomFactor: 1,
  levelIndex: 0,
  day: 1,
  actionsLeft: LEVELS[0].actionsPerDay,
  coins: LEVELS[0].startCoins,
  seedInventory: { ...LEVELS[0].startSeeds },
  water: LEVELS[0].maxWaterPerDay,
  status: "Welcome to your farm. Prepare soil and plant your first crop.",
  gameOver: false,
  won: false,
  levelCleared: false,
  weatherLabel: "Clear",
  questStreak: 0,
  dailyQuest: null,
  questProgress: null,
  seedMastery: {},
  seedMasteryXp: {},
  harvestBursts: [],
  tiles: [],
  particles: [],
  rainDrops: [],
  clouds: [],
  birds: [],
  terrainDecor: [],
  clock: 0,
  lastFrameTime: 0,
  walkthrough: {
    enabled: true,
    collapsed: false,
    completed: false,
    stepIndex: 0,
    flags: {
      moved: false,
      tilled: false,
      seedSelected: false,
      planted: false,
      watered: false,
      harvested: false,
    },
  },
};

function updateStartScreenInfo() {
  const level = currentLevel();
  if (rulesDifficultyTextEl) {
    rulesDifficultyTextEl.textContent = `Difficulty: ${difficultySummary()} • Level ${gameState.levelIndex + 1} (${level.name})`;
  }
  if (rulesSoilTextEl) {
    rulesSoilTextEl.textContent = `Soil types: ${soilGuideSummary()}`;
  }
  if (rulesStreakTextEl) {
    rulesStreakTextEl.textContent = `Quest streak: ${streakGuideSummary()}`;
  }
}

function createQuestProgress() {
  return {
    harvest: 0,
    water: 0,
    plant: 0,
    earn: 0,
    clearWeeds: 0,
    clearPests: 0,
  };
}

function createSeedNumberMap() {
  const map = {};
  CROP_ORDER.forEach((cropType) => {
    map[cropType] = 0;
  });
  return map;
}

function masteryLevelFromXp(xp) {
  let level = 0;
  for (let i = 0; i < MASTERY_THRESHOLDS.length; i += 1) {
    if (xp >= MASTERY_THRESHOLDS[i]) {
      level = i;
    }
  }
  return Math.min(3, level);
}

function getCropRuntime(cropType) {
  const crop = CROP_TYPES[cropType];
  const trait = CROP_TRAITS[cropType] ?? {};
  const masteryXp = gameState.seedMasteryXp[cropType] ?? 0;
  const masteryLevel = masteryLevelFromXp(masteryXp);

  const growthDays = Math.max(
    1,
    crop.growthDays + (trait.growthPenalty ?? 0) - (trait.growthBonus ?? 0) - (masteryLevel >= 2 ? 1 : 0)
  );
  const waterCapacity = Math.max(
    1,
    crop.waterCapacity + (trait.waterCapacityBonus ?? 0) + Math.floor(masteryLevel / 2)
  );
  const waterFill = Math.max(1, 1 + (trait.waterFillBonus ?? 0) + (masteryLevel >= 3 ? 1 : 0));
  const sellPrice = Math.max(
    1,
    Math.round(crop.sellPrice * (1 + (trait.sellBonus ?? 0) + masteryLevel * 0.06))
  );

  return {
    ...crop,
    traitName: trait.name ?? "Standard",
    traitTip: trait.tooltip ?? "",
    masteryLevel,
    masteryXp,
    growthDays,
    waterCapacity,
    waterFill,
    sellPrice,
    dryBonus: (trait.dryBonus ?? 0) + Math.floor(masteryLevel / 2),
    waterRetention: trait.waterRetention ?? 0,
    pestGuard: Math.min(0.5, (trait.pestGuard ?? 0) + masteryLevel * 0.05),
    packBonus: (trait.packBonus ?? 0) + (masteryLevel >= 1 ? 1 : 0),
  };
}

function rollSoilType(levelIndex = gameState.levelIndex) {
  const richChance = Math.max(0.12, 0.24 - levelIndex * 0.01);
  const sandyChance = Math.min(0.3, 0.12 + levelIndex * 0.014);
  const clayChance = Math.min(0.22, 0.1 + levelIndex * 0.008);
  const roll = Math.random();

  if (roll < richChance) return "rich";
  if (roll < richChance + sandyChance) return "sandy";
  if (roll < richChance + sandyChance + clayChance) return "clay";
  return "loam";
}

function buildDailyQuest(levelIndex = gameState.levelIndex, day = gameState.day) {
  const questType = QUEST_TYPES[Math.floor(Math.random() * QUEST_TYPES.length)];
  const rank = levelIndex + Math.max(0, day - 1) * 0.15;
  const targetByType = {
    harvest: 2 + Math.floor(rank * 0.55),
    water: 4 + Math.floor(rank * 0.9),
    plant: 3 + Math.floor(rank * 0.75),
    earn: 34 + Math.floor(rank * 10),
    clearWeeds: 1 + Math.floor(rank * 0.45),
    clearPests: 1 + Math.floor(rank * 0.35),
  };
  const rewardCoins = 18 + levelIndex * 5 + Math.floor(rank * 4);
  const rewardSeedType = CROP_ORDER[(day + levelIndex) % CROP_ORDER.length];
  const rewardSeeds = 1 + Math.floor(levelIndex / 3);

  return {
    type: questType,
    target: targetByType[questType],
    rewardCoins,
    rewardSeedType,
    rewardSeeds,
    completed: false,
  };
}

function questDescription(quest = gameState.dailyQuest) {
  if (!quest) return "No active quest.";
  const progress = gameState.questProgress?.[quest.type] ?? 0;
  const targetLabel = {
    harvest: `Harvest ${quest.target} crops`,
    water: `Water ${quest.target} crops`,
    plant: `Plant ${quest.target} seeds`,
    earn: `Earn ${quest.target} coins`,
    clearWeeds: `Clear ${quest.target} weeds`,
    clearPests: `Treat ${quest.target} pest tiles`,
  };
  return `${targetLabel[quest.type] ?? "Complete tasks"} (${Math.min(progress, quest.target)}/${quest.target})`;
}

function refreshQuestProgressDisplay() {
  if (!gameState.dailyQuest || !gameState.questProgress) return;
  const progress = gameState.questProgress[gameState.dailyQuest.type] ?? 0;
  gameState.dailyQuest.completed = progress >= gameState.dailyQuest.target;
}

function addQuestProgress(type, value = 1) {
  if (!gameState.questProgress || !gameState.dailyQuest) return;
  if (!(type in gameState.questProgress)) return;
  const wasComplete = gameState.dailyQuest.completed;
  gameState.questProgress[type] += value;
  refreshQuestProgressDisplay();
  if (!wasComplete && gameState.dailyQuest.completed) {
    showNudge("Daily quest target reached! Finish the day to claim rewards.", 2600);
    playSfx("success");
  }
}

function awardDailyQuestIfComplete() {
  if (!gameState.dailyQuest) return;
  refreshQuestProgressDisplay();

  if (gameState.dailyQuest.completed) {
    const streakMultiplier = 1 + gameState.questStreak * 0.18;
    const coinReward = Math.round(gameState.dailyQuest.rewardCoins * streakMultiplier);
    gameState.coins += coinReward;
    gameState.seedInventory[gameState.dailyQuest.rewardSeedType] += gameState.dailyQuest.rewardSeeds;
    gameState.questStreak += 1;
    showNudge(
      `Quest complete! +${coinReward} coins, +${gameState.dailyQuest.rewardSeeds} ${CROP_TYPES[gameState.dailyQuest.rewardSeedType].label} seed(s). Streak ${gameState.questStreak}.`,
      3800
    );
    return;
  }

  if (gameState.questStreak > 0) {
    showNudge("Daily quest missed. Streak reset.");
  }
  gameState.questStreak = 0;
}

function isGameplayActive() {
  return appState.phase === APP_PHASE.GAME;
}

function syncPhaseLayout() {
  if (!gamePanelEl) return;
  gamePanelEl.classList.toggle("pre-game-phase", appState.phase !== APP_PHASE.GAME);
}

function setInventoryOpen(open, silent = false) {
  appState.inventoryOpen = inventoryPinned ? true : Boolean(open);

  if (inventoryPanelEl) {
    inventoryPanelEl.classList.toggle("hidden", !appState.inventoryOpen);
  }
  if (canvasStackEl && !inventoryPinned) {
    canvasStackEl.classList.toggle("inventory-open", appState.inventoryOpen);
  }

  if (inventoryToggleBtnEl) {
    inventoryToggleBtnEl.textContent = appState.inventoryOpen ? "Hide Inventory" : "Inventory";
    inventoryToggleBtnEl.setAttribute("aria-expanded", appState.inventoryOpen ? "true" : "false");
  }
  if (isGameplayActive()) {
    resizeGameCanvasToContainer();
  }

  if (!silent && isGameplayActive() && !inventoryPinned) {
    setStatus(appState.inventoryOpen ? "Inventory open. Select a seed card." : "Inventory closed.");
  }
}

function showCanvasForPhase(phase) {
  if (!canvas || !scene3dCanvas) return;
  if (phase === APP_PHASE.GAME) {
    scene3dCanvas.classList.add("hidden");
    canvas.classList.remove("hidden");
    return;
  }
  scene3dCanvas.classList.remove("hidden");
  canvas.classList.add("hidden");
}

function updateIntroCaption(frameTime) {
  if (!introCaptionEl) return;
  const elapsed = frameTime - appState.introStartedAt;
  for (let i = INTRO_TIMELINE.length - 1; i >= 0; i -= 1) {
    if (elapsed >= INTRO_TIMELINE[i].at) {
      if (appState.introCaptionIndex !== i) {
        appState.introCaptionIndex = i;
        introCaptionEl.textContent = INTRO_TIMELINE[i].text;
      }
      break;
    }
  }
}

function showRulesPhase() {
  appState.phase = APP_PHASE.RULES;
  syncPhaseLayout();
  setInventoryOpen(false, true);
  if (introOverlayEl) introOverlayEl.classList.add("hidden");
  if (rulesOverlayEl) rulesOverlayEl.classList.remove("hidden");
  updateStartScreenInfo();
  showCanvasForPhase(APP_PHASE.RULES);
}

function startGameplayPhase() {
  if (appState.gameStarted) {
    appState.phase = APP_PHASE.GAME;
    syncPhaseLayout();
    setInventoryOpen(false, true);
    if (rulesOverlayEl) rulesOverlayEl.classList.add("hidden");
    if (introOverlayEl) introOverlayEl.classList.add("hidden");
    showCanvasForPhase(APP_PHASE.GAME);
    resizeGameCanvasToContainer();
    canvas.focus();
    return;
  }

  appState.gameStarted = true;
  appState.phase = APP_PHASE.GAME;
  syncPhaseLayout();
  setInventoryOpen(false, true);
  if (rulesOverlayEl) rulesOverlayEl.classList.add("hidden");
  if (introOverlayEl) introOverlayEl.classList.add("hidden");
  showCanvasForPhase(APP_PHASE.GAME);
  resizeGameCanvasToContainer();
  startLevel(0);
  canvas.focus();
}

function setupIntroFlowControls() {
  if (introSkipBtnEl) {
    introSkipBtnEl.addEventListener("click", () => {
      showRulesPhase();
    });
  }
  if (startGameBtnEl) {
    startGameBtnEl.addEventListener("click", () => {
      startGameplayPhase();
    });
  }
}

function beginIntroPhase() {
  appState.phase = APP_PHASE.INTRO;
  syncPhaseLayout();
  setInventoryOpen(false, true);
  appState.introStartedAt = 0;
  appState.introCaptionIndex = -1;
  if (introOverlayEl) introOverlayEl.classList.remove("hidden");
  if (rulesOverlayEl) rulesOverlayEl.classList.add("hidden");
  showCanvasForPhase(APP_PHASE.INTRO);
}

function currentLevel() {
  return LEVELS[gameState.levelIndex];
}

function currentSeedConfig() {
  return getCropRuntime(gameState.selectedSeedType);
}

function createSeedInventory(seedCounts) {
  const inventory = {};
  for (const cropType of CROP_ORDER) {
    inventory[cropType] = seedCounts[cropType] ?? 0;
  }
  return inventory;
}

function pickAvailableSeedType() {
  for (const cropType of CROP_ORDER) {
    if ((gameState.seedInventory[cropType] ?? 0) > 0) {
      return cropType;
    }
  }
  return CROP_ORDER[0];
}

function createTile() {
  return {
    stage: STAGE.GRASS,
    soilType: rollSoilType(),
    cropType: null,
    growthProgress: 0,
    moisture: 0,
    watered: false,
    dryDays: 0,
    weeds: false,
    pests: false,
    pestDamage: 0,
    flash: 0,
  };
}

function initTiles() {
  gameState.tiles = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => createTile())
  );
}

function createRainDrop() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 6 + Math.random() * 7,
    length: 10 + Math.random() * 11,
  };
}

function initRain() {
  gameState.rainDrops = Array.from({ length: 74 }, () => createRainDrop());
}

function preloadPremiumAssets() {
  for (const [key, src] of Object.entries(PREMIUM_ASSET_FILES)) {
    const image = new Image();
    image.src = src;
    premiumAssets[key] = image;
  }
}

function preloadCropSprites() {
  for (const [cropType, crop] of Object.entries(CROP_TYPES)) {
    if (!crop.spritePath) continue;
    const image = new Image();
    image.src = crop.spritePath;
    cropSprites[cropType] = image;
  }
}

function applyImportedToolIcons() {
  toolButtons.forEach((button) => {
    const toolIndex = Number(button.dataset.toolIndex);
    const tool = TOOLS[toolIndex];
    const image = button.querySelector("img");
    const src = toolSpritePaths[tool];
    if (!image || !src) return;
    image.src = src;
  });
}

function renderSeedCards() {
  if (!seedSelectorEl) return;

  seedSelectorEl.innerHTML = "";
  CROP_ORDER.forEach((cropType) => {
    const crop = getCropRuntime(cropType);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "seed-card";
    button.dataset.seedType = cropType;
    button.dataset.tooltip = `${crop.label} (${crop.traitName}): grow ${crop.growthDays}d, cap ${crop.waterCapacity}, sell ${crop.sellPrice}.`;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", `${crop.label} seeds`);
    button.innerHTML = `
      <img class="seed-card-icon" src="${crop.spritePath}" alt="${crop.label} icon" />
      <span class="seed-stock" id="seedStock-${cropType}">x0</span>
    `;

    seedSelectorEl.appendChild(button);
  });

  seedButtons = Array.from(seedSelectorEl.querySelectorAll(".seed-card"));
  CROP_ORDER.forEach((cropType) => {
    seedStockElements[cropType] = document.getElementById(`seedStock-${cropType}`);
  });
}

function createCloud(index) {
  return {
    x: Math.random() * (canvas.width + 200) - 100,
    y: 44 + Math.random() * 140,
    w: 86 + Math.random() * 72,
    h: 24 + Math.random() * 18,
    speed: 0.08 + Math.random() * 0.14 + index * 0.004,
    alpha: 0.24 + Math.random() * 0.3,
  };
}

function createBird() {
  return {
    x: Math.random() * canvas.width,
    y: 54 + Math.random() * 120,
    wing: Math.random() * Math.PI * 2,
    speed: 0.26 + Math.random() * 0.2,
    scale: 0.6 + Math.random() * 0.5,
  };
}

function initEnvironmentDecor() {
  gameState.clouds = Array.from({ length: 9 }, (_, index) => createCloud(index));
  gameState.birds = Array.from({ length: 6 }, () => createBird());
  gameState.terrainDecor = Array.from({ length: 44 }, () => ({
    x: FIELD_X - 10 + Math.random() * (COLS * TILE + 320),
    y: FIELD_Y - 18 + Math.random() * (ROWS * TILE + 62),
    size: 1 + Math.random() * 3,
    hue: 88 + Math.random() * 42,
    alpha: 0.1 + Math.random() * 0.2,
  }));
}

function updateEnvironmentActors(dt) {
  const step = dt / 16;

  for (const cloud of gameState.clouds) {
    cloud.x += cloud.speed * step;
    if (cloud.x > canvas.width + 140) {
      cloud.x = -cloud.w - 120;
      cloud.y = 44 + Math.random() * 140;
    }
  }

  for (const bird of gameState.birds) {
    bird.x += bird.speed * step;
    bird.wing += 0.12 * step;
    if (bird.x > canvas.width + 60) {
      bird.x = -40;
      bird.y = 58 + Math.random() * 130;
    }
  }
}

function showNudge(message, duration = 2800) {
  if (!nudgeBannerEl) return;

  nudgeBannerEl.textContent = message;
  nudgeBannerEl.classList.remove("hidden");

  if (nudgeTimer) {
    clearTimeout(nudgeTimer);
  }

  nudgeTimer = setTimeout(() => {
    nudgeBannerEl.classList.add("hidden");
  }, duration);
}

function currentWalkStep() {
  return WALKTHROUGH_STEPS[gameState.walkthrough.stepIndex] ?? null;
}

function refreshWalkthroughPanel() {
  if (!walkthroughPanelEl || !walkthroughTextEl || !walkthroughStepMetaEl) return;

  if (gameState.walkthrough.collapsed) {
    walkthroughPanelEl.classList.add("is-collapsed");
  } else {
    walkthroughPanelEl.classList.remove("is-collapsed");
  }

  if (!gameState.walkthrough.enabled) {
    walkthroughStepMetaEl.textContent = "Hidden";
    walkthroughTextEl.textContent = "Walkthrough hidden. Press Replay to show tips again.";
    return;
  }

  if (gameState.walkthrough.completed) {
    walkthroughStepMetaEl.textContent = "Complete";
    walkthroughTextEl.textContent = "Walkthrough complete. Replay anytime for guided hints.";
    return;
  }

  const step = currentWalkStep();
  if (!step) return;

  walkthroughStepMetaEl.textContent = `Step ${gameState.walkthrough.stepIndex + 1}/${WALKTHROUGH_STEPS.length}`;
  walkthroughTextEl.textContent = step.body;
}

function setWalkFlag(flag) {
  if (!gameState.walkthrough.enabled || gameState.walkthrough.completed) return;
  if (gameState.walkthrough.flags[flag]) return;

  gameState.walkthrough.flags[flag] = true;
  tryAdvanceWalkthrough();
}

function tryAdvanceWalkthrough() {
  if (!gameState.walkthrough.enabled || gameState.walkthrough.completed) return;

  while (gameState.walkthrough.stepIndex < WALKTHROUGH_STEPS.length) {
    const step = WALKTHROUGH_STEPS[gameState.walkthrough.stepIndex];
    if (!gameState.walkthrough.flags[step.flag]) break;

    gameState.walkthrough.stepIndex += 1;
    if (gameState.walkthrough.stepIndex < WALKTHROUGH_STEPS.length) {
      const nextStep = WALKTHROUGH_STEPS[gameState.walkthrough.stepIndex];
      showNudge(`Walkthrough: ${step.title} done. Next: ${nextStep.title}.`, 2500);
    }
  }

  if (gameState.walkthrough.stepIndex >= WALKTHROUGH_STEPS.length) {
    gameState.walkthrough.completed = true;
    gameState.walkthrough.collapsed = true;
    showNudge("Walkthrough completed. Great start.", 3000);
  }

  refreshWalkthroughPanel();
}

function resetWalkthrough() {
  gameState.walkthrough.enabled = true;
  gameState.walkthrough.collapsed = false;
  gameState.walkthrough.completed = false;
  gameState.walkthrough.stepIndex = 0;
  gameState.walkthrough.flags = {
    moved: false,
    tilled: false,
    seedSelected: false,
    planted: false,
    watered: false,
    harvested: false,
  };
  refreshWalkthroughPanel();
}

function setupWalkthroughControls() {
  if (walkthroughNextEl) {
    walkthroughNextEl.addEventListener("click", () => {
      if (!gameState.walkthrough.enabled) {
        showNudge("Walkthrough is hidden. Press Replay to show it.");
        return;
      }
      if (gameState.walkthrough.completed) {
        showNudge("Walkthrough already complete.");
        return;
      }

      const step = currentWalkStep();
      if (!step) return;

      if (!gameState.walkthrough.flags[step.flag]) {
        showNudge(`Complete this step first: ${step.title}.`);
        return;
      }

      tryAdvanceWalkthrough();
    });
  }

  if (walkthroughSkipEl) {
    walkthroughSkipEl.addEventListener("click", () => {
      gameState.walkthrough.enabled = false;
      gameState.walkthrough.collapsed = true;
      refreshWalkthroughPanel();
      showNudge("Walkthrough hidden. Press Replay whenever you need it.");
    });
  }

  if (walkthroughReplayEl) {
    walkthroughReplayEl.addEventListener("click", () => {
      resetWalkthrough();
      showNudge("Walkthrough restarted.");
    });
  }
}

function showTooltip(text, x, y) {
  if (!uiTooltipEl) return;
  uiTooltipEl.textContent = text;
  uiTooltipEl.classList.remove("hidden");
  moveTooltip(x, y);
}

function hideTooltip() {
  if (!uiTooltipEl) return;
  uiTooltipEl.classList.add("hidden");
}

function moveTooltip(x, y) {
  if (!uiTooltipEl || uiTooltipEl.classList.contains("hidden")) return;
  const rect = uiTooltipEl.getBoundingClientRect();
  const nextX = Math.min(window.innerWidth - rect.width - 12, x + 14);
  const nextY = Math.min(window.innerHeight - rect.height - 12, y + 14);
  uiTooltipEl.style.left = `${Math.max(8, nextX)}px`;
  uiTooltipEl.style.top = `${Math.max(8, nextY)}px`;
}

function setupTooltips() {
  const targets = document.querySelectorAll("[data-tooltip]");

  targets.forEach((target) => {
    target.addEventListener("mouseenter", (event) => {
      const text = target.getAttribute("data-tooltip");
      if (!text) return;
      showTooltip(text, event.clientX, event.clientY);
    });

    target.addEventListener("mousemove", (event) => {
      moveTooltip(event.clientX, event.clientY);
    });

    target.addEventListener("mouseleave", () => {
      hideTooltip();
    });

    target.addEventListener("focus", () => {
      const rect = target.getBoundingClientRect();
      const text = target.getAttribute("data-tooltip");
      if (!text) return;
      showTooltip(text, rect.left + rect.width / 2, rect.top);
    });

    target.addEventListener("blur", () => {
      hideTooltip();
    });
  });
}

function setupSeedButtons() {
  seedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      const seedType = button.dataset.seedType;
      if (!seedType) return;
      selectSeed(seedType);
      setInventoryOpen(false, true);
      canvas.focus();
    });
  });
}

function setStatus(text) {
  gameState.status = text;
  if (statusTextEl) {
    statusTextEl.textContent = text;
  }
}

function currentTool() {
  return TOOLS[gameState.selectedTool];
}

function tileAtCursor() {
  return gameState.tiles[gameState.cursorRow][gameState.cursorCol];
}

function sumAllSeeds() {
  return CROP_ORDER.reduce((sum, cropType) => sum + (gameState.seedInventory[cropType] ?? 0), 0);
}

function isGrowingTile(tile) {
  return tile.stage === STAGE.SEEDED || tile.stage === STAGE.SPROUT;
}

function canInteractWithFarm() {
  return !gameState.gameOver && !gameState.levelCleared;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setZoomFactor(nextZoom, silent = false) {
  const clampedZoom = clamp(nextZoom, MIN_ZOOM_FACTOR, MAX_ZOOM_FACTOR);
  if (Math.abs(clampedZoom - gameState.zoomFactor) < 0.0001) return;

  gameState.zoomFactor = clampedZoom;
  updateIsoMetrics();
  if (!silent && isGameplayActive()) {
    setStatus(`Zoom: ${Math.round(gameState.zoomFactor * 100)}%`);
  }
}

function updateIsoMetrics() {
  const width = Math.max(1, canvas?.width || 1);
  const height = Math.max(1, canvas?.height || 1);
  const baseHalfW = BASE_ISO_TILE_W / 2;
  const baseHalfH = BASE_ISO_TILE_H / 2;
  const boardWidth = (COLS + ROWS) * baseHalfW;
  const boardHeight = (COLS + ROWS) * baseHalfH + 22;

  const widthScale = (width - 26) / boardWidth;
  const heightScale = (height - 52) / boardHeight;
  const fitScale = clamp(Math.min(widthScale, heightScale), 0.42, 1);
  const targetScale = fitScale * gameState.zoomFactor;
  const minScale = fitScale * MIN_ZOOM_FACTOR;
  const maxScale = fitScale * MAX_ZOOM_FACTOR;
  ISO_SCALE = clamp(targetScale, minScale, maxScale);

  ISO_TILE_W = BASE_ISO_TILE_W * ISO_SCALE;
  ISO_TILE_H = BASE_ISO_TILE_H * ISO_SCALE;
  ISO_HALF_W = ISO_TILE_W / 2;
  ISO_HALF_H = ISO_TILE_H / 2;
}

function resizeGameCanvasToContainer() {
  if (!canvas || !isGameplayActive()) return false;

  const width = Math.max(1, Math.round(canvas.clientWidth || canvas.width));
  const height = Math.max(1, Math.round(canvas.clientHeight || canvas.height));
  const changed = canvas.width !== width || canvas.height !== height;
  if (changed) {
    canvas.width = width;
    canvas.height = height;
  }

  updateIsoMetrics();
  return changed;
}

function selectTool(toolIndex) {
  if (toolIndex < 0 || toolIndex >= TOOLS.length) return;
  gameState.selectedTool = toolIndex;
  syncHud();
}

function selectSeed(seedType, silent = false) {
  if (!CROP_TYPES[seedType]) return;
  gameState.selectedSeedType = seedType;
  const seedCount = gameState.seedInventory[seedType] ?? 0;
  const runtime = getCropRuntime(seedType);

  if (!silent) {
    setStatus(
      `${runtime.label} selected. Trait ${runtime.traitName}. Cap ${runtime.waterCapacity}, growth ${runtime.growthDays} days.`
    );
    if (seedCount <= 0) {
      showNudge(`No ${runtime.label} seeds in bag. Buy a pack with B.`);
      playSfx("fail");
    } else {
      showNudge(`${runtime.label} selected. ${runtime.traitTip} Stock: ${seedCount}.`, 2400);
      playSfx("tap");
    }
  }

  setWalkFlag("seedSelected");
  syncHud();
}

function cycleSeed(direction) {
  const index = CROP_ORDER.indexOf(gameState.selectedSeedType);
  const nextIndex = (index + direction + CROP_ORDER.length) % CROP_ORDER.length;
  selectSeed(CROP_ORDER[nextIndex]);
}

function syncHud() {
  const level = currentLevel();
  const seed = getCropRuntime(gameState.selectedSeedType);
  const selectedSeedCount = gameState.seedInventory[gameState.selectedSeedType] ?? 0;
  const seedPackCost = Math.ceil(seed.buyCost * level.seedCostMultiplier);

  if (statLevelEl) statLevelEl.textContent = `Level ${gameState.levelIndex + 1}`;
  if (statDayEl) statDayEl.textContent = `Day ${gameState.day}/${level.seasonDays}`;
  if (statCoinsEl) statCoinsEl.textContent = `${gameState.coins}/${level.goalCoins}`;
  if (statSeedsEl) statSeedsEl.textContent = `${seed.shortLabel}: ${selectedSeedCount}`;
  if (statWaterEl) statWaterEl.textContent = `${gameState.water}/${level.maxWaterPerDay}`;
  if (statActionsEl) statActionsEl.textContent = `${gameState.actionsLeft}/${level.actionsPerDay}`;
  if (streakValueEl) streakValueEl.textContent = `Streak: ${gameState.questStreak}`;
  if (questValueEl) questValueEl.textContent = questDescription();

  if (weatherTextEl) weatherTextEl.textContent = gameState.weatherLabel;
  if (weatherSunEl && weatherRainEl) {
    const rain = gameState.weatherLabel === "Rain";
    weatherSunEl.classList.toggle("hidden", rain);
    weatherRainEl.classList.toggle("hidden", !rain);
  }

  toolButtons.forEach((button, index) => {
    const active = index === gameState.selectedTool;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (seedHintTextEl) {
    seedHintTextEl.textContent = `Selected: ${seed.label} x${selectedSeedCount} (hover icons for details)`;
  }

  seedButtons.forEach((button) => {
    const seedType = button.dataset.seedType;
    if (!seedType) return;

    const count = gameState.seedInventory[seedType] ?? 0;
    const active = seedType === gameState.selectedSeedType;
    const runtime = getCropRuntime(seedType);
    const statsEl = button.querySelector(".seed-card-stats");

    button.classList.toggle("active", active);
    button.classList.toggle("empty", count <= 0);
    button.setAttribute("aria-pressed", active ? "true" : "false");
    button.dataset.tooltip = `${runtime.label} (${runtime.traitName}): grow ${runtime.growthDays}d, cap ${runtime.waterCapacity}, sell ${runtime.sellPrice}.`;
    if (statsEl) {
      statsEl.textContent = `Grow ${runtime.growthDays}d • Cap ${runtime.waterCapacity} • Sell ${runtime.sellPrice} • M${runtime.masteryLevel}`;
    }
  });

  for (const seedType of CROP_ORDER) {
    const stockEl = seedStockElements[seedType];
    if (!stockEl) continue;
    stockEl.textContent = `x${gameState.seedInventory[seedType] ?? 0}`;
  }

  if (buySeedsBtnEl) {
    buySeedsBtnEl.textContent = `Buy ${seed.label} (${seedPackCost})`;
    buySeedsBtnEl.disabled = !canInteractWithFarm();
  }
  if (applyToolBtnEl) {
    applyToolBtnEl.textContent = `Use ${currentTool().toUpperCase()}`;
    applyToolBtnEl.disabled = !canInteractWithFarm();
  }
  if (endDayBtnEl) {
    endDayBtnEl.disabled = !canInteractWithFarm();
  }
  if (zoomOutBtnEl) {
    zoomOutBtnEl.disabled = !isGameplayActive() || gameState.zoomFactor <= MIN_ZOOM_FACTOR + 0.001;
    zoomOutBtnEl.textContent = "Zoom -";
  }
  if (zoomInBtnEl) {
    zoomInBtnEl.disabled = !isGameplayActive() || gameState.zoomFactor >= MAX_ZOOM_FACTOR - 0.001;
    zoomInBtnEl.textContent = "Zoom +";
  }
  if (inventoryToggleBtnEl) {
    inventoryToggleBtnEl.disabled = !isGameplayActive();
    inventoryToggleBtnEl.classList.toggle("active", appState.inventoryOpen);
  }
  if (nextLevelBtnEl) {
    nextLevelBtnEl.classList.toggle("hidden", !gameState.levelCleared);
  }
  if (restartBtnEl) {
    restartBtnEl.classList.toggle("hidden", !(gameState.gameOver || gameState.levelCleared));
  }
}

function markTileActivity(tile) {
  tile.flash = 0;
}

function isoOrigin() {
  const boardWidth = (COLS + ROWS) * ISO_HALF_W;
  const boardHeight = (COLS + ROWS) * ISO_HALF_H;
  const left = (canvas.width - boardWidth) * 0.5;
  const top = (canvas.height - boardHeight) * 0.5;

  return {
    x: Math.round(left + ROWS * ISO_HALF_W),
    y: Math.round(top + ISO_HALF_H),
  };
}

function gridToIso(col, row) {
  const origin = isoOrigin();
  return {
    x: origin.x + (col - row) * ISO_HALF_W,
    y: origin.y + (col + row) * ISO_HALF_H,
  };
}

function diamondContainsPoint(px, py, cx, cy) {
  const dx = Math.abs(px - cx) / ISO_HALF_W;
  const dy = Math.abs(py - cy) / ISO_HALF_H;
  return dx + dy <= 1;
}

function isoToGrid(x, y) {
  const origin = isoOrigin();
  const dx = x - origin.x;
  const dy = y - origin.y;

  const approxCol = Math.round((dx / ISO_HALF_W + dy / ISO_HALF_H) / 2);
  const approxRow = Math.round((dy / ISO_HALF_H - dx / ISO_HALF_W) / 2);

  let best = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      const col = approxCol + colOffset;
      const row = approxRow + rowOffset;
      if (col < 0 || col >= COLS || row < 0 || row >= ROWS) continue;

      const center = gridToIso(col, row);
      if (!diamondContainsPoint(x, y, center.x, center.y)) continue;

      const score =
        Math.abs(x - center.x) / ISO_HALF_W + Math.abs(y - center.y) / ISO_HALF_H;
      if (score < bestScore) {
        bestScore = score;
        best = { col, row };
      }
    }
  }

  return best;
}

function drawDiamondPath(cx, cy, halfWidth = ISO_HALF_W, halfHeight = ISO_HALF_H) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - halfHeight);
  ctx.lineTo(cx + halfWidth, cy);
  ctx.lineTo(cx, cy + halfHeight);
  ctx.lineTo(cx - halfWidth, cy);
  ctx.closePath();
}

function tileCenter(col, row) {
  return {
    ...gridToIso(col, row),
  };
}

function spawnParticles(col, row, colors, count) {
  return;
}

function updateParticles(dt) {
  return;
}

function drawParticles() {
  return;
}

let audioCtx = null;

function playSfx(type = "tap") {
  try {
    audioCtx = audioCtx ?? new (window.AudioContext || window.webkitAudioContext)();
    if (!audioCtx) return;

    const profile = {
      tap: { freq: 420, duration: 0.06, gain: 0.028, wave: "triangle" },
      success: { freq: 560, duration: 0.08, gain: 0.035, wave: "sine" },
      harvest: { freq: 720, duration: 0.1, gain: 0.045, wave: "square" },
      fail: { freq: 180, duration: 0.08, gain: 0.026, wave: "sawtooth" },
    }[type] ?? { freq: 380, duration: 0.06, gain: 0.025, wave: "triangle" };

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = profile.wave;
    osc.frequency.setValueAtTime(profile.freq, now);
    osc.frequency.exponentialRampToValueAtTime(profile.freq * 1.12, now + profile.duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(profile.gain, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + profile.duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + profile.duration + 0.02);
  } catch {
    // Ignore audio failures in restricted environments.
  }
}

function spawnHarvestBurst(col, row) {
  const center = tileCenter(col, row);
  gameState.harvestBursts.push({
    x: center.x,
    y: center.y,
    life: 440,
    maxLife: 440,
    radius: 6,
  });
}

function updateHarvestBursts(dt) {
  for (let i = gameState.harvestBursts.length - 1; i >= 0; i -= 1) {
    const burst = gameState.harvestBursts[i];
    burst.life -= dt;
    burst.radius += dt * 0.025;
    if (burst.life <= 0) {
      gameState.harvestBursts.splice(i, 1);
    }
  }
}

function drawHarvestBursts() {
  gameState.harvestBursts.forEach((burst) => {
    const alpha = Math.max(0, burst.life / burst.maxLife);
    ctx.strokeStyle = `rgba(255, 223, 124, ${0.9 * alpha})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = `rgba(255, 244, 197, ${0.35 * alpha})`;
    ctx.beginPath();
    ctx.arc(burst.x, burst.y, burst.radius * 0.55, 0, Math.PI * 2);
    ctx.fill();
  });
}

function resetTileToTilled(tile) {
  tile.stage = STAGE.TILLED;
  tile.cropType = null;
  tile.growthProgress = 0;
  tile.moisture = 0;
  tile.watered = false;
  tile.dryDays = 0;
  tile.weeds = false;
  tile.pests = false;
  tile.pestDamage = 0;
}

function allowedDryDays(cropType) {
  const level = currentLevel();
  const crop = getCropRuntime(cropType);
  return Math.max(1, crop.waterCapacity + 1 + crop.dryBonus - level.dryPenalty);
}

function checkCoinObjectiveReached() {
  const level = currentLevel();
  if (gameState.coins < level.goalCoins) return false;

  if (gameState.levelIndex < LEVELS.length - 1) {
    gameState.levelCleared = true;
    setStatus(
      `Level ${gameState.levelIndex + 1} complete! Press N to start level ${gameState.levelIndex + 2}.`
    );
    return true;
  }

  gameState.gameOver = true;
  gameState.won = true;
  setStatus("All levels cleared. You mastered the farm simulation! Press R to restart.");
  return true;
}

function spendAction() {
  if (!canInteractWithFarm()) return;

  gameState.actionsLeft -= 1;
  if (checkCoinObjectiveReached()) {
    return;
  }

  if (gameState.actionsLeft <= 0) {
    advanceDay();
  }
}

function assignDailyQuest() {
  gameState.dailyQuest = buildDailyQuest();
  gameState.questProgress = createQuestProgress();
  refreshQuestProgressDisplay();
}

function trySpawnTileHazards(tile) {
  if (!isGrowingTile(tile) || !tile.cropType) return;

  const crop = getCropRuntime(tile.cropType);
  const levelFactor = gameState.levelIndex * 0.01;
  const baseWeedChance = 0.1 + levelFactor;
  const basePestChance = 0.08 + levelFactor * 0.9;

  if (!tile.weeds && Math.random() < baseWeedChance) {
    tile.weeds = true;
  }
  if (!tile.pests && Math.random() < Math.max(0.02, basePestChance - crop.pestGuard)) {
    tile.pests = true;
  }
}

function simulateCropDay(tile, rainToday) {
  if (!isGrowingTile(tile) || !tile.cropType) return;

  const crop = getCropRuntime(tile.cropType);
  const soil = SOIL_TYPES[tile.soilType] ?? SOIL_TYPES.loam;
  const previousStage = tile.stage;

  if (rainToday) {
    tile.moisture = Math.min(crop.waterCapacity, tile.moisture + Math.max(1, 1 + soil.moistureDelta));
  }

  if (tile.weeds) {
    tile.moisture = Math.max(0, tile.moisture - 1);
  }

  if (tile.moisture > 0) {
    const moistureDrain = Math.max(0, 1 - soil.moistureDelta - crop.waterRetention);
    tile.moisture = Math.max(0, tile.moisture - moistureDrain);

    let growthGain = Math.max(0, 1 + soil.growthBonus);
    if (tile.weeds) growthGain = Math.max(0, growthGain - 1);
    if (tile.pests) {
      growthGain = Math.max(0, growthGain - 1);
      tile.pestDamage += 1;
    }
    tile.growthProgress += growthGain;
    tile.dryDays = 0;

    if (tile.growthProgress >= crop.growthDays) {
      tile.stage = STAGE.READY;
    } else {
      tile.stage = STAGE.SPROUT;
    }
  } else {
    tile.dryDays += 1;
    if (tile.dryDays > allowedDryDays(tile.cropType) + (soil.dryBonus ?? 0)) {
      tile.stage = STAGE.WITHERED;
      tile.cropType = null;
      tile.growthProgress = 0;
      tile.moisture = 0;
      tile.dryDays = 0;
      tile.weeds = false;
      tile.pests = false;
      tile.pestDamage = 0;
    }
  }

  tile.watered = false;
  if (tile.stage !== previousStage) {
    markTileActivity(tile);
  }
}

function advanceDay() {
  if (!canInteractWithFarm()) return;

  const level = currentLevel();
  awardDailyQuestIfComplete();
  gameState.day += 1;
  gameState.actionsLeft = level.actionsPerDay;
  gameState.water = level.maxWaterPerDay;

  const rainToday = Math.random() < level.rainChance;
  gameState.weatherLabel = rainToday ? "Rain" : "Clear";
  let weedSpawns = 0;
  let pestSpawns = 0;

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const tile = gameState.tiles[row][col];
      const weedsBefore = tile.weeds;
      const pestsBefore = tile.pests;
      simulateCropDay(tile, rainToday);
      trySpawnTileHazards(tile);
      if (!weedsBefore && tile.weeds) weedSpawns += 1;
      if (!pestsBefore && tile.pests) pestSpawns += 1;
    }
  }

  if (checkCoinObjectiveReached()) {
    return;
  }

  if (gameState.day > level.seasonDays) {
    gameState.gameOver = true;
    gameState.won = false;
    setStatus(
      `Level ${gameState.levelIndex + 1} failed. Target ${level.goalCoins} coins not reached. Press R.`
    );
    return;
  }

  assignDailyQuest();
  const hazardInfo =
    weedSpawns + pestSpawns > 0
      ? ` New hazards: ${weedSpawns} weeds, ${pestSpawns} pests.`
      : " Farm looks stable.";
  setStatus(`Day ${gameState.day} started (${level.name}). Weather: ${gameState.weatherLabel}.${hazardInfo}`);
  showNudge(
    `Quest: ${questDescription()} | Difficulty: ${difficultySummary()} | ${streakGuideSummary()}`,
    3600
  );
}

function useHoe(tile, col, row) {
  if (isGrowingTile(tile) && tile.weeds) {
    tile.weeds = false;
    markTileActivity(tile);
    addQuestProgress("clearWeeds", 1);
    setStatus("Weeds cleared with Hoe.");
    playSfx("success");
    spendAction();
    return;
  }

  if (tile.stage === STAGE.READY) {
    setStatus("Crop is ready. Harvest it before tilling this tile.");
    playSfx("fail");
    return;
  }

  if (tile.stage === STAGE.GRASS || tile.stage === STAGE.WITHERED) {
    resetTileToTilled(tile);
    markTileActivity(tile);
    spawnParticles(col, row, ["#8f5a2a", "#b57a45", "#9a622f"], 9);
    setStatus("Soil prepared.");
    setWalkFlag("tilled");
    playSfx("tap");
    spendAction();
    return;
  }

  setStatus("Hoe works on grass or withered crop tiles.");
  playSfx("fail");
}

function useSeed(tile, col, row) {
  const seedType = gameState.selectedSeedType;
  const seed = getCropRuntime(seedType);

  if ((gameState.seedInventory[seedType] ?? 0) <= 0) {
    setStatus(`No ${seed.label} seeds left. Press B to buy a pack.`);
    showNudge(`Out of ${seed.label} seeds. Press B to buy.`);
    playSfx("fail");
    return;
  }

  if (tile.stage === STAGE.TILLED) {
    tile.stage = STAGE.SEEDED;
    tile.cropType = seedType;
    tile.growthProgress = 0;
    tile.moisture = 0;
    tile.watered = false;
    tile.dryDays = 0;
    tile.weeds = false;
    tile.pests = false;
    tile.pestDamage = 0;
    gameState.seedInventory[seedType] -= 1;

    markTileActivity(tile);
    spawnParticles(col, row, [seed.colors.seed, seed.colors.sprout, "#7b5e34"], 10);
    setStatus(
      `${seed.label} planted (${seed.traitName}). Cap ${seed.waterCapacity}, growth ${seed.growthDays} days.`
    );
    addQuestProgress("plant", 1);
    playSfx("success");
    setWalkFlag("planted");
    spendAction();
    return;
  }

  setStatus("Plant seeds only on tilled soil.");
  playSfx("fail");
}

function useWater(tile, col, row) {
  if (gameState.water <= 0) {
    setStatus("Water tank empty for today. Wait for next day.");
    playSfx("fail");
    return;
  }

  if (!isGrowingTile(tile) || !tile.cropType) {
    setStatus("Only growing crops need water.");
    playSfx("fail");
    return;
  }

  const crop = getCropRuntime(tile.cropType);
  const treatedPests = tile.pests;
  if (treatedPests) {
    tile.pests = false;
    addQuestProgress("clearPests", 1);
  }

  if (tile.moisture >= crop.waterCapacity && !treatedPests) {
    setStatus(`${crop.label} already at max moisture (${crop.waterCapacity}).`);
    playSfx("fail");
    return;
  }

  tile.moisture = Math.min(crop.waterCapacity, tile.moisture + crop.waterFill);
  tile.watered = true;
  gameState.water -= 1;

  markTileActivity(tile);
  spawnParticles(col, row, ["#5ba8f0", "#8fc4ff", "#3a90df"], 12);
  setStatus(
    treatedPests
      ? `${crop.label} treated for pests and watered (${tile.moisture}/${crop.waterCapacity}).`
      : `${crop.label} watered (${tile.moisture}/${crop.waterCapacity}).`
  );
  addQuestProgress("water", 1);
  playSfx("tap");
  setWalkFlag("watered");
  spendAction();
}

function useHarvest(tile, col, row) {
  if (tile.stage !== STAGE.READY || !tile.cropType) {
    setStatus("Harvest only mature crops.");
    return;
  }

  const cropType = tile.cropType;
  const crop = getCropRuntime(cropType);
  const soil = SOIL_TYPES[tile.soilType] ?? SOIL_TYPES.loam;
  const pestPenalty = Math.min(0.42, tile.pestDamage * 0.06);
  const qualityMultiplier = Math.max(0.52, 1 + (soil.sellBonus ?? 0) - pestPenalty);
  const earnedCoins = Math.max(1, Math.round(crop.sellPrice * qualityMultiplier));

  gameState.coins += earnedCoins;
  gameState.seedInventory[cropType] += 1;
  gameState.seedMasteryXp[cropType] = (gameState.seedMasteryXp[cropType] ?? 0) + 1;
  const previousLevel = gameState.seedMastery[cropType] ?? 0;
  const nextLevel = masteryLevelFromXp(gameState.seedMasteryXp[cropType]);
  gameState.seedMastery[cropType] = nextLevel;
  resetTileToTilled(tile);

  markTileActivity(tile);
  spawnParticles(col, row, [crop.colors.produce, crop.colors.accent, "#e6a53f"], 18);
  spawnHarvestBurst(col, row);
  addQuestProgress("harvest", 1);
  addQuestProgress("earn", earnedCoins);
  playSfx("harvest");
  if (nextLevel > previousLevel) {
    showNudge(`${crop.label} mastery reached M${nextLevel}. Upgraded stats unlocked!`, 3200);
  }
  setStatus(
    `Harvested ${crop.label}: +${earnedCoins} coins and +1 seed (${soil.label} soil ${
      pestPenalty > 0 ? "with pest penalty" : "quality harvest"
    }).`
  );
  setWalkFlag("harvested");
  spendAction();
}

function useCurrentTool() {
  if (gameState.levelCleared) {
    setStatus(`Level ${gameState.levelIndex + 1} complete. Press N to continue.`);
    return;
  }

  if (gameState.gameOver) {
    setStatus("Run ended. Press R to restart from level 1.");
    return;
  }

  const tile = tileAtCursor();
  const col = gameState.cursorCol;
  const row = gameState.cursorRow;
  const tool = currentTool();

  if (tool === "hoe") useHoe(tile, col, row);
  if (tool === "seed") useSeed(tile, col, row);
  if (tool === "water") useWater(tile, col, row);
  if (tool === "harvest") useHarvest(tile, col, row);
}

function buySeeds() {
  if (!canInteractWithFarm()) {
    if (gameState.levelCleared) {
      setStatus("Press N to start the next level.");
    }
    return;
  }

  const level = currentLevel();
  const seedType = gameState.selectedSeedType;
  const seed = getCropRuntime(seedType);
  const packCost = Math.ceil(seed.buyCost * level.seedCostMultiplier);
  const packAmount = seed.buyAmount + seed.packBonus;

  if (gameState.coins < packCost) {
    setStatus(`Not enough coins for ${seed.label} pack (${packCost} coins).`);
    playSfx("fail");
    return;
  }

  gameState.coins -= packCost;
  gameState.seedInventory[seedType] += packAmount;
  spawnParticles(gameState.cursorCol, gameState.cursorRow, ["#f7c75c", "#ddad3b"], 10);
  setStatus(`Bought ${packAmount} ${seed.label} seeds for ${packCost} coins.`);
  showNudge(`${seed.label} seed pack purchased.`);
  playSfx("success");
}

function endDayEarly() {
  if (!canInteractWithFarm()) {
    if (gameState.levelCleared) {
      setStatus(`Level ${gameState.levelIndex + 1} complete. Press Next Level.`);
    }
    return;
  }
  advanceDay();
}

function moveCursor(dx, dy) {
  const beforeCol = gameState.cursorCol;
  const beforeRow = gameState.cursorRow;
  gameState.cursorCol = Math.max(0, Math.min(COLS - 1, gameState.cursorCol + dx));
  gameState.cursorRow = Math.max(0, Math.min(ROWS - 1, gameState.cursorRow + dy));

  if (beforeCol !== gameState.cursorCol || beforeRow !== gameState.cursorRow) {
    setWalkFlag("moved");
  }
}

function startLevel(levelIndex) {
  const level = LEVELS[levelIndex];
  const freshRun = levelIndex === 0;
  gameState.levelIndex = levelIndex;
  gameState.cursorCol = 0;
  gameState.cursorRow = 0;
  gameState.selectedTool = 0;
  gameState.seedInventory = createSeedInventory(level.startSeeds);
  gameState.selectedSeedType = pickAvailableSeedType();
  gameState.day = 1;
  gameState.actionsLeft = level.actionsPerDay;
  gameState.coins = level.startCoins;
  gameState.water = level.maxWaterPerDay;
  gameState.weatherLabel = "Clear";
  gameState.levelCleared = false;
  gameState.gameOver = false;
  gameState.won = false;
  gameState.particles = [];
  gameState.harvestBursts = [];
  gameState.lastFrameTime = 0;

  if (freshRun) {
    gameState.seedMastery = createSeedNumberMap();
    gameState.seedMasteryXp = createSeedNumberMap();
    gameState.questStreak = 0;
  }
  if (!gameState.seedMastery || Object.keys(gameState.seedMastery).length === 0) {
    gameState.seedMastery = createSeedNumberMap();
  }
  if (!gameState.seedMasteryXp || Object.keys(gameState.seedMasteryXp).length === 0) {
    gameState.seedMasteryXp = createSeedNumberMap();
  }
  gameState.questProgress = createQuestProgress();
  assignDailyQuest();

  initTiles();

  if (levelIndex === 0 && !gameState.walkthrough.completed) {
    resetWalkthrough();
  } else {
    refreshWalkthroughPanel();
  }

  setStatus(
    `Level ${levelIndex + 1}: ${level.name}. Reach ${level.goalCoins} coins in ${level.seasonDays} days.`
  );
  showNudge(
    `Difficulty: ${difficultySummary(levelIndex)}. Soil guide: ${soilGuideSummary()}. ${streakGuideSummary()}. Quest: ${questDescription()}`,
    5200
  );
  updateStartScreenInfo();
  syncHud();
}

function restartGame() {
  startLevel(0);
}

function startNextLevel() {
  if (!gameState.levelCleared) return;
  const nextLevel = gameState.levelIndex + 1;
  if (nextLevel >= LEVELS.length) return;
  startLevel(nextLevel);
}

function handlePointer(event) {
  if (!isGameplayActive()) return;

  event.preventDefault();
  if (!inventoryPinned && appState.inventoryOpen) {
    setInventoryOpen(false, true);
  }
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  const target = isoToGrid(x, y);
  if (!target) return;
  const { col, row } = target;

  const now = performance.now();
  const isSameTile = appState.lastTapCol === col && appState.lastTapRow === row;
  const isFastRepeat = now - appState.lastTapAt < 500;
  gameState.cursorCol = col;
  gameState.cursorRow = row;
  appState.lastTapCol = col;
  appState.lastTapRow = row;
  appState.lastTapAt = now;

  if (isSameTile && isFastRepeat) {
    useCurrentTool();
    return;
  }

  const hint = buildCursorHint();
  if (hint) {
    setStatus(hint);
  }
}

function setupToolButtons() {
  toolButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      const toolIndex = Number(button.dataset.toolIndex);
      selectTool(toolIndex);
      canvas.focus();
    });
  });
}

function setupActionButtons() {
  if (applyToolBtnEl) {
    applyToolBtnEl.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      useCurrentTool();
      canvas.focus();
    });
  }

  if (buySeedsBtnEl) {
    buySeedsBtnEl.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      buySeeds();
      canvas.focus();
    });
  }

  if (endDayBtnEl) {
    endDayBtnEl.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      endDayEarly();
      canvas.focus();
    });
  }

  if (zoomOutBtnEl) {
    zoomOutBtnEl.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      setZoomFactor(gameState.zoomFactor - ZOOM_STEP);
      canvas.focus();
    });
  }

  if (zoomInBtnEl) {
    zoomInBtnEl.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      setZoomFactor(gameState.zoomFactor + ZOOM_STEP);
      canvas.focus();
    });
  }

  if (inventoryToggleBtnEl) {
    inventoryToggleBtnEl.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      setInventoryOpen(!appState.inventoryOpen);
      canvas.focus();
    });
  }

  if (nextLevelBtnEl) {
    nextLevelBtnEl.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      startNextLevel();
      canvas.focus();
    });
  }

  if (restartBtnEl) {
    restartBtnEl.addEventListener("click", () => {
      if (!isGameplayActive()) return;
      restartGame();
      canvas.focus();
    });
  }
}

function setupInput() {
  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (!isGameplayActive()) {
      if (key === "escape" && appState.phase === APP_PHASE.INTRO) {
        showRulesPhase();
      }
      if (key === "enter" && appState.phase === APP_PHASE.RULES) {
        startGameplayPhase();
      }
      return;
    }

    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
      event.preventDefault();
    }

    if (key === "arrowup" || key === "w") moveCursor(0, -1);
    if (key === "arrowdown" || key === "s") moveCursor(0, 1);
    if (key === "arrowleft" || key === "a") moveCursor(-1, 0);
    if (key === "arrowright" || key === "d") moveCursor(1, 0);

    if (key === "1") selectTool(0);
    if (key === "2") selectTool(1);
    if (key === "3") selectTool(2);
    if (key === "4") selectTool(3);

    const hotkeyIndex = SEED_HOTKEYS.indexOf(key);
    if (hotkeyIndex >= 0 && hotkeyIndex < CROP_ORDER.length) {
      selectSeed(CROP_ORDER[hotkeyIndex]);
    }

    if (key === "q") cycleSeed(-1);
    if (key === "e") cycleSeed(1);
    if (key === "i") setInventoryOpen(!appState.inventoryOpen);

    if (key === " " || key === "enter") {
      useCurrentTool();
    }

    if (key === "b") buySeeds();
    if (key === "n" && gameState.levelCleared) startNextLevel();
    if (key === "r" && (gameState.gameOver || gameState.levelCleared)) restartGame();
  });

  canvas.addEventListener("pointerdown", handlePointer);
}

function updateTileAnimations(dt) {
  return;
}

function drawSeedMoistureBar(tile, x, y) {
  if (!tile.cropType || !isGrowingTile(tile)) return;

  const crop = getCropRuntime(tile.cropType);
  const ratio = Math.min(1, tile.moisture / crop.waterCapacity);
  const barWidth = Math.max(22, ISO_TILE_W * 0.46);
  const barX = x - barWidth / 2;
  const barY = y + ISO_HALF_H - 6;

  ctx.fillStyle = "rgba(14, 31, 20, 0.35)";
  ctx.fillRect(barX, barY, barWidth, 4);
  ctx.fillStyle = "rgba(93, 171, 235, 0.85)";
  ctx.fillRect(barX, barY, barWidth * ratio, 4);
}

function drawReadyCrop(cropType, x, y, sway, glow) {
  const crop = CROP_TYPES[cropType];
  if (!crop) return;
  const sprite = cropSprites[cropType];

  ctx.fillStyle = `rgba(255, 243, 178, ${glow * 0.85})`;
  ctx.beginPath();
  ctx.arc(x, y - 10, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = crop.colors.stem;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x + sway * 0.6, y - 20);
  ctx.stroke();

  ctx.fillStyle = crop.colors.sprout;
  ctx.beginPath();
  ctx.ellipse(x - 5 + sway * 0.8, y - 13, 5, 9, 0.5, 0, Math.PI * 2);
  ctx.ellipse(x + 5 + sway * 0.8, y - 14, 5, 9, -0.5, 0, Math.PI * 2);
  ctx.fill();

  if (sprite && sprite.complete) {
    ctx.drawImage(sprite, x - 13 + sway * 0.35, y - 24, 26, 26);
    return;
  }

  ctx.fillStyle = crop.colors.produce;
  ctx.beginPath();
  ctx.ellipse(x, y - 4, 9, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = crop.colors.accent;
  ctx.beginPath();
  ctx.arc(x - 4, y - 7, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawTile(col, row, tile) {
  const center = gridToIso(col, row);
  const x = center.x;
  const y = center.y;
  const sway = 0;
  const soil = SOIL_TYPES[tile.soilType] ?? SOIL_TYPES.loam;
  const topY = y - ISO_HALF_H;
  const bottomY = y + ISO_HALF_H;
  const sideDepth = Math.max(6, 13 * ISO_SCALE);

  ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
  ctx.beginPath();
  ctx.ellipse(x, y + ISO_HALF_H + 8, ISO_HALF_W * 0.68, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(70, 106, 58, 0.58)";
  ctx.beginPath();
  ctx.moveTo(x, bottomY);
  ctx.lineTo(x - ISO_HALF_W, y);
  ctx.lineTo(x - ISO_HALF_W, y + sideDepth);
  ctx.lineTo(x, bottomY + sideDepth);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(55, 88, 46, 0.64)";
  ctx.beginPath();
  ctx.moveTo(x, bottomY);
  ctx.lineTo(x + ISO_HALF_W, y);
  ctx.lineTo(x + ISO_HALF_W, y + sideDepth);
  ctx.lineTo(x, bottomY + sideDepth);
  ctx.closePath();
  ctx.fill();

  const topGradient = ctx.createLinearGradient(x, topY, x, bottomY);
  topGradient.addColorStop(0, STAGE_TOP_COLORS[tile.stage]);
  topGradient.addColorStop(1, STAGE_COLORS[tile.stage]);
  ctx.fillStyle = topGradient;
  drawDiamondPath(x, y);
  ctx.fill();

  if (soil.tileTint) {
    ctx.fillStyle = soil.tileTint;
    drawDiamondPath(x, y);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.11)";
  ctx.beginPath();
  ctx.moveTo(x, topY + 1);
  ctx.lineTo(x + ISO_HALF_W - 2, y);
  ctx.lineTo(x, y - 2);
  ctx.lineTo(x - ISO_HALF_W + 2, y);
  ctx.closePath();
  ctx.fill();

  if (tile.stage === STAGE.TILLED || tile.stage === STAGE.SEEDED) {
    ctx.strokeStyle = "rgba(54, 34, 18, 0.32)";
    ctx.lineWidth = 1.2;
    for (let groove = 0; groove < 3; groove += 1) {
      const gy = y - 8 + groove * 8;
      ctx.beginPath();
      ctx.moveTo(x - ISO_HALF_W * 0.54, gy);
      ctx.lineTo(x + ISO_HALF_W * 0.54, gy);
      ctx.stroke();
    }
  }

  if (tile.stage === STAGE.SEEDED && tile.cropType) {
    const crop = CROP_TYPES[tile.cropType];
    const sprite = cropSprites[tile.cropType];
    ctx.fillStyle = crop.colors.seed;
    ctx.beginPath();
    ctx.arc(x - 6 + sway * 0.2, y + 3, 3, 0, Math.PI * 2);
    ctx.arc(x + 5 - sway * 0.2, y + 8, 2.6, 0, Math.PI * 2);
    ctx.fill();
    if (sprite && sprite.complete) {
      ctx.globalAlpha = 0.8;
      ctx.drawImage(sprite, x - 7, y - 7, 14, 14);
      ctx.globalAlpha = 1;
    }
  }

  if (tile.stage === STAGE.SPROUT && tile.cropType) {
    const crop = CROP_TYPES[tile.cropType];
    ctx.strokeStyle = crop.colors.stem;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.quadraticCurveTo(x + sway * 0.35, y - 1, x + sway * 0.75, y - 18);
    ctx.stroke();

    ctx.fillStyle = crop.colors.sprout;
    ctx.beginPath();
    ctx.ellipse(x - 4 + sway, y - 12, 6, 10, 0.5, 0, Math.PI * 2);
    ctx.ellipse(x + 6 + sway, y - 13, 6, 10, -0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  if (tile.stage === STAGE.READY && tile.cropType) {
    const glow = 0.72;
    drawReadyCrop(tile.cropType, x, y, sway, glow);
  }

  if (tile.stage === STAGE.WITHERED) {
    ctx.strokeStyle = "#2f2f2f";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 10);
    ctx.lineTo(x + 10, y + 10);
    ctx.moveTo(x + 10, y - 10);
    ctx.lineTo(x - 10, y + 10);
    ctx.stroke();
  }

  if (tile.weeds && isGrowingTile(tile)) {
    ctx.strokeStyle = "#2f7d35";
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 3; i += 1) {
      const wx = x - 11 + i * 8;
      ctx.beginPath();
      ctx.moveTo(wx, y + 2);
      ctx.lineTo(wx + 2, y - 9);
      ctx.lineTo(wx + 4, y + 2);
      ctx.stroke();
    }
  }

  if (tile.pests && isGrowingTile(tile)) {
    ctx.fillStyle = "rgba(168, 47, 47, 0.85)";
    ctx.beginPath();
    ctx.arc(x + ISO_HALF_W - 10, y - 8, 3.2, 0, Math.PI * 2);
    ctx.arc(x + ISO_HALF_W - 5, y - 2, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(20, 38, 27, 0.38)";
  ctx.font = "bold 9px Trebuchet MS";
  ctx.fillText(soil.label[0], x - 4, y + ISO_HALF_H - 3);

  drawSeedMoistureBar(tile, x, y);

  if (tile.flash > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${0.45 * tile.flash})`;
    drawDiamondPath(x, y);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
  drawDiamondPath(x, y);
  ctx.stroke();
}

function drawField() {
  for (let depth = 0; depth <= COLS + ROWS - 2; depth += 1) {
    for (let row = 0; row < ROWS; row += 1) {
      const col = depth - row;
      if (col < 0 || col >= COLS) continue;
      drawTile(col, row, gameState.tiles[row][col]);
    }
  }
}

function buildCursorHint() {
  if (!isGameplayActive()) return "";
  const tile = tileAtCursor();
  if (!tile) return "";

  const soil = SOIL_TYPES[tile.soilType] ?? SOIL_TYPES.loam;
  const tool = currentTool();
  let hint = `${soil.label} soil`;

  if (tool === "hoe") {
    if (isGrowingTile(tile) && tile.weeds) hint = "Hoe clears weeds on this crop";
    else if (tile.stage === STAGE.GRASS || tile.stage === STAGE.WITHERED) hint = "Hoe to prepare soil";
    else hint = "Hoe works on grass/withered tiles";
  }

  if (tool === "seed") {
    const seed = getCropRuntime(gameState.selectedSeedType);
    if ((gameState.seedInventory[gameState.selectedSeedType] ?? 0) <= 0) hint = `Buy ${seed.label} seeds (B)`;
    else if (tile.stage === STAGE.TILLED) hint = `Plant ${seed.label} (${seed.traitName})`;
    else hint = "Seed tool needs tilled soil";
  }

  if (tool === "water") {
    if (!isGrowingTile(tile) || !tile.cropType) hint = "Water tool needs a growing crop";
    else {
      const crop = getCropRuntime(tile.cropType);
      if (tile.pests) hint = `Treat pests + water ${crop.label}`;
      else hint = `Water ${crop.label}: ${tile.moisture}/${crop.waterCapacity}`;
    }
  }

  if (tool === "harvest") {
    if (tile.stage === STAGE.READY && tile.cropType) {
      const crop = getCropRuntime(tile.cropType);
      hint = `Harvest ${crop.label} for ~${crop.sellPrice} coins`;
    } else {
      hint = "Harvest mature crops only";
    }
  }

  return hint;
}

function drawCursorHint() {
  const hint = buildCursorHint();
  if (!hint) return;

  const center = tileCenter(gameState.cursorCol, gameState.cursorRow);
  ctx.font = "12px Trebuchet MS";
  const x = center.x + ISO_HALF_W + 8;
  const y = center.y - ISO_HALF_H - 18;
  const textWidth = ctx.measureText(hint).width + 16;
  const boxX = Math.min(canvas.width - textWidth - 8, Math.max(8, x));
  const boxY = Math.max(8, y);

  ctx.fillStyle = "rgba(14, 30, 19, 0.84)";
  ctx.fillRect(boxX, boxY, textWidth, 20);
  ctx.strokeStyle = "rgba(177, 229, 186, 0.5)";
  ctx.strokeRect(boxX, boxY, textWidth, 20);
  ctx.fillStyle = "#ecfff0";
  ctx.fillText(hint, boxX + 8, boxY + 14);
}

function drawCursor() {
  const center = tileCenter(gameState.cursorCol, gameState.cursorRow);
  const pulse = 0.58 + Math.sin(gameState.clock * 0.01) * 0.2;

  ctx.lineWidth = 2.8;
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + pulse * 0.6})`;
  drawDiamondPath(center.x, center.y, ISO_HALF_W - 2, ISO_HALF_H - 1);
  ctx.stroke();

  ctx.lineWidth = 1.6;
  ctx.strokeStyle = `rgba(19, 49, 31, ${0.55 + pulse * 0.4})`;
  drawDiamondPath(center.x, center.y, ISO_HALF_W - 6, ISO_HALF_H - 4);
  ctx.stroke();
}

function drawTopBar() {
  const level = currentLevel();
  const selectedSeed = currentSeedConfig();
  const seedCount = gameState.seedInventory[gameState.selectedSeedType] ?? 0;
  const questText = questDescription();
  const compactQuest = questText.length > 58 ? `${questText.slice(0, 55)}...` : questText;

  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  ctx.fillRect(20, 12, canvas.width - 40, 78);
  ctx.strokeStyle = "rgba(21, 37, 26, 0.25)";
  ctx.strokeRect(20, 12, canvas.width - 40, 78);

  ctx.fillStyle = "#13271a";
  ctx.font = "bold 20px Trebuchet MS";
  ctx.fillText(`Farm Simulator - L${gameState.levelIndex + 1}: ${level.name}`, 32, 35);

  ctx.font = "15px Trebuchet MS";
  ctx.fillText(`Tool: ${currentTool().toUpperCase()}`, 32, 56);
  ctx.fillText(
    `Seed: ${selectedSeed.label} M${selectedSeed.masteryLevel} (${seedCount}) cap ${selectedSeed.waterCapacity}`,
    200,
    56
  );
  ctx.fillText(`Inventory total: ${sumAllSeeds()}`, 548, 56);
  ctx.fillText(`Goal: ${level.goalCoins}c`, 760, 56);
  ctx.font = "12px Trebuchet MS";
  ctx.fillStyle = "#1f4a2e";
  ctx.fillText(`Quest: ${compactQuest} | Streak ${gameState.questStreak}`, 32, 73);
}

function drawBottomPanel() {
  const level = currentLevel();
  const panelWidth = canvas.width - 40;
  const panelHeight = 82;
  const panelY = canvas.height - panelHeight - 12;
  const dayRatio = Math.min(gameState.day, level.seasonDays) / level.seasonDays;
  const coinRatio = Math.min(gameState.coins, level.goalCoins) / level.goalCoins;

  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillRect(20, panelY, panelWidth, panelHeight);
  ctx.strokeStyle = "rgba(20, 41, 28, 0.22)";
  ctx.strokeRect(20, panelY, panelWidth, panelHeight);

  ctx.fillStyle = gameState.gameOver && !gameState.won ? "#7d0f0f" : "#213d2b";
  ctx.font = "15px Trebuchet MS";
  ctx.fillText(gameState.status, 30, panelY + 22);

  ctx.fillStyle = "#dce8d6";
  ctx.fillRect(30, panelY + 36, panelWidth - 60, 14);
  ctx.fillStyle = "#4b9f58";
  ctx.fillRect(30, panelY + 36, (panelWidth - 60) * coinRatio, 14);
  ctx.strokeStyle = "rgba(19, 33, 22, 0.3)";
  ctx.strokeRect(30, panelY + 36, panelWidth - 60, 14);

  ctx.fillStyle = "#dce8d6";
  ctx.fillRect(30, panelY + 56, panelWidth - 60, 12);
  ctx.fillStyle = gameState.gameOver && !gameState.won ? "#ad4545" : "#5d8cc7";
  ctx.fillRect(30, panelY + 56, (panelWidth - 60) * dayRatio, 12);
  ctx.strokeStyle = "rgba(19, 33, 22, 0.3)";
  ctx.strokeRect(30, panelY + 56, panelWidth - 60, 12);

  ctx.fillStyle = "#173121";
  ctx.font = "12px Trebuchet MS";
  ctx.fillText(`Coin progress: ${gameState.coins}/${level.goalCoins}`, 34, panelY + 47);

  const seasonLabel = gameState.levelCleared
    ? "Level complete. Press N to continue."
    : gameState.gameOver
    ? gameState.won
      ? "All levels cleared. Press R to restart."
      : `Level failed (${level.name}). Press R to retry from level 1.`
    : `Season day ${Math.min(gameState.day, level.seasonDays)} / ${level.seasonDays} | Quest streak ${gameState.questStreak}`;
  ctx.fillText(seasonLabel, 34, panelY + 66);
}

function drawImageAsset(name, x, y, width, height, shadowAlpha = 0.16) {
  const image = premiumAssets[name];
  if (!image || !image.complete) return false;

  ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height + 7, width * 0.44, height * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.drawImage(image, x, y, width, height);
  return true;
}

function drawPremiumSkyLighting() {
  const sunX = 760;
  const sunY = 76;

  const sunGradient = ctx.createRadialGradient(sunX, sunY, 18, sunX, sunY, 140);
  sunGradient.addColorStop(0, "rgba(255, 239, 174, 0.82)");
  sunGradient.addColorStop(1, "rgba(255, 239, 174, 0)");
  ctx.fillStyle = sunGradient;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 247, 184, 0.88)";
  ctx.beginPath();
  ctx.arc(sunX, sunY, 28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.09)";
  for (let i = 0; i < 4; i += 1) {
    const beamW = 170 + i * 40;
    const beamH = 360 + i * 40;
    ctx.beginPath();
    ctx.moveTo(sunX - 20, sunY + 12);
    ctx.lineTo(sunX + 20, sunY + 12);
    ctx.lineTo(sunX + beamW, sunY + beamH);
    ctx.lineTo(sunX - beamW, sunY + beamH);
    ctx.closePath();
    ctx.fill();
  }
}

function drawCloudLayer() {
  for (const cloud of gameState.clouds) {
    ctx.fillStyle = `rgba(255, 255, 255, ${cloud.alpha})`;
    ctx.beginPath();
    ctx.ellipse(cloud.x, cloud.y, cloud.w * 0.35, cloud.h * 0.62, 0, 0, Math.PI * 2);
    ctx.ellipse(
      cloud.x + cloud.w * 0.24,
      cloud.y - 4,
      cloud.w * 0.29,
      cloud.h * 0.52,
      0,
      0,
      Math.PI * 2
    );
    ctx.ellipse(
      cloud.x - cloud.w * 0.22,
      cloud.y + 1,
      cloud.w * 0.28,
      cloud.h * 0.54,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

function drawBirds() {
  ctx.strokeStyle = "rgba(24, 33, 48, 0.55)";
  for (const bird of gameState.birds) {
    const flap = Math.sin(bird.wing) * 3.2 * bird.scale;
    const wingSpan = 7.5 * bird.scale;
    ctx.lineWidth = 1.5 * bird.scale;
    ctx.beginPath();
    ctx.moveTo(bird.x - wingSpan, bird.y);
    ctx.quadraticCurveTo(bird.x - wingSpan * 0.4, bird.y - flap, bird.x, bird.y);
    ctx.quadraticCurveTo(bird.x + wingSpan * 0.4, bird.y - flap, bird.x + wingSpan, bird.y);
    ctx.stroke();
  }
}

function drawFieldPlatform3D() {
  const x = FIELD_X - 12;
  const y = FIELD_Y - 12;
  const width = COLS * TILE + 24;
  const height = ROWS * TILE + 24;
  const depth = 24;
  const skew = 22;

  const topGradient = ctx.createLinearGradient(x, y, x, y + height);
  topGradient.addColorStop(0, "#95d778");
  topGradient.addColorStop(1, "#73b45d");
  ctx.fillStyle = topGradient;
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.fillRect(x, y, width, 16);

  ctx.fillStyle = "#5f8c4d";
  ctx.beginPath();
  ctx.moveTo(x, y + height);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width - skew, y + height + depth);
  ctx.lineTo(x + skew, y + height + depth);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#4d7440";
  ctx.beginPath();
  ctx.moveTo(x + width, y);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width - skew, y + height + depth);
  ctx.lineTo(x + width - skew, y + depth);
  ctx.closePath();
  ctx.fill();

  for (const blade of gameState.terrainDecor) {
    ctx.fillStyle = `hsla(${blade.hue} 42% 38% / ${blade.alpha})`;
    ctx.fillRect(blade.x, blade.y, blade.size * 0.8, blade.size * 1.9);
  }
}

function drawFence3D() {
  const left = FIELD_X - 14;
  const top = FIELD_Y - 14;
  const right = FIELD_X + COLS * TILE + 14;
  const bottom = FIELD_Y + ROWS * TILE + 14;

  ctx.strokeStyle = "#6b4f2d";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(right, top);
  ctx.stroke();

  ctx.strokeStyle = "rgba(248, 225, 182, 0.35)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(left, top - 1);
  ctx.lineTo(right, top - 1);
  ctx.stroke();

  ctx.strokeStyle = "#6b4f2d";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, bottom);
  ctx.stroke();

  for (let x = left; x <= right; x += 38) {
    ctx.fillStyle = "#7b5a32";
    ctx.fillRect(x - 2, top - 5, 4, 11);
    ctx.fillStyle = "rgba(245, 227, 188, 0.28)";
    ctx.fillRect(x - 2, top - 5, 1.3, 11);
  }
  for (let y = top; y <= bottom; y += 38) {
    ctx.fillStyle = "#7b5a32";
    ctx.fillRect(left - 4, y - 2, 10, 4);
    ctx.fillStyle = "rgba(245, 227, 188, 0.25)";
    ctx.fillRect(left - 4, y - 2, 10, 1.2);
  }
}

function drawBarn3D() {
  const x = 770;
  const y = 132;
  const width = 114;
  const height = 84;
  const depth = 30;
  const roofHeight = 34;

  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(x + width / 2 + 18, y + height + 20, 78, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#c64e4d";
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = "#a84243";
  ctx.beginPath();
  ctx.moveTo(x + width, y);
  ctx.lineTo(x + width + depth, y - 12);
  ctx.lineTo(x + width + depth, y + height - 12);
  ctx.lineTo(x + width, y + height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#9d3537";
  ctx.beginPath();
  ctx.moveTo(x - 8, y);
  ctx.lineTo(x + width / 2, y - roofHeight);
  ctx.lineTo(x + width + 8, y);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#7f292e";
  ctx.beginPath();
  ctx.moveTo(x + width + 8, y);
  ctx.lineTo(x + width / 2, y - roofHeight);
  ctx.lineTo(x + width / 2 + depth, y - roofHeight - 12);
  ctx.lineTo(x + width + depth, y - 12);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#f0ead8";
  ctx.fillRect(x + 44, y + 38, 26, 46);
  ctx.strokeStyle = "#d5c5a2";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 57, y + 38);
  ctx.lineTo(x + 57, y + 84);
  ctx.stroke();

  ctx.fillStyle = "#edf4fb";
  ctx.fillRect(x + 16, y + 28, 14, 12);
  ctx.fillRect(x + 84, y + 28, 14, 12);
}

function drawWaterTower3D() {
  const x = 868;
  const y = 265;
  const width = 38;
  const height = 78;

  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(x + 20, y + height + 20, 42, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#89a7bf";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "#7290a8";
  ctx.fillRect(x + width, y + 6, 10, height - 6);

  ctx.fillStyle = "#a6bfd1";
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y, width / 2, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#5f7c91";
  ctx.beginPath();
  ctx.ellipse(x + width / 2 + 10, y + 6, width / 2, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#4e6371";
  ctx.fillRect(x + 2, y + height, 6, 22);
  ctx.fillRect(x + 14, y + height, 6, 22);
  ctx.fillRect(x + 26, y + height, 6, 22);
}

function drawCrates3D() {
  const x = 774;
  const y = 430;

  ctx.fillStyle = "#b07a45";
  ctx.fillRect(x, y, 40, 30);
  ctx.fillStyle = "#8f6035";
  ctx.beginPath();
  ctx.moveTo(x + 40, y);
  ctx.lineTo(x + 56, y - 10);
  ctx.lineTo(x + 56, y + 20);
  ctx.lineTo(x + 40, y + 30);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#c3894f";
  ctx.fillRect(x + 52, y + 18, 34, 26);
  ctx.fillStyle = "#9b6a3d";
  ctx.beginPath();
  ctx.moveTo(x + 86, y + 18);
  ctx.lineTo(x + 98, y + 10);
  ctx.lineTo(x + 98, y + 36);
  ctx.lineTo(x + 86, y + 44);
  ctx.closePath();
  ctx.fill();
}

function drawPremiumProps() {
  const swayA = Math.sin(gameState.clock * 0.0012) * 2.2;
  const swayB = Math.cos(gameState.clock * 0.0011) * 1.8;

  drawImageAsset("tree", 16, 188 + swayA, 118, 146, 0.2);
  drawImageAsset("farmhouse", 734, 96 + swayA, 206, 144, 0.24);
  drawImageAsset("windmill", 655, 60 + swayB, 126, 170, 0.22);
  drawImageAsset("silo", 870, 186 + swayB, 74, 126, 0.2);
  drawImageAsset("tractor", 712, 408 + swayA, 168, 102, 0.2);
  drawImageAsset("hayBale", 816, 470 + swayB, 120, 70, 0.17);
  drawImageAsset("rockCluster", 6, 478, 132, 74, 0.14);
  drawImageAsset("waterChannel", 690, 330 + swayA * 0.4, 220, 70, 0.11);
}

function drawBackground() {
  const field = ctx.createLinearGradient(0, 0, 0, canvas.height);
  field.addColorStop(0, "#b9dc93");
  field.addColorStop(0.45, "#a8cf82");
  field.addColorStop(1, "#97bf72");
  ctx.fillStyle = field;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRain(dt) {
  return;
}

function drawOverlayMessages() {
  if (!gameState.levelCleared && !gameState.gameOver) return;

  const panelWidth = 500;
  const panelHeight = 142;
  const x = (canvas.width - panelWidth) / 2;
  const y = (canvas.height - panelHeight) / 2;

  ctx.fillStyle = "rgba(10, 24, 16, 0.48)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(248, 255, 247, 0.95)";
  ctx.fillRect(x, y, panelWidth, panelHeight);
  ctx.strokeStyle = "rgba(39, 74, 53, 0.42)";
  ctx.strokeRect(x, y, panelWidth, panelHeight);

  ctx.fillStyle = "#1d3c29";
  ctx.font = "bold 27px Trebuchet MS";

  if (gameState.levelCleared) {
    ctx.fillText(`Level ${gameState.levelIndex + 1} Cleared`, x + 28, y + 44);
    ctx.font = "16px Trebuchet MS";
    ctx.fillText("Press N to continue to the next level.", x + 28, y + 78);
    ctx.fillText("Press R to restart from level 1.", x + 28, y + 104);
    return;
  }

  if (gameState.won) {
    ctx.fillText("All Levels Cleared", x + 28, y + 44);
    ctx.font = "16px Trebuchet MS";
    ctx.fillText("You completed the full farm simulation campaign.", x + 28, y + 78);
    ctx.fillText("Press R to start over.", x + 28, y + 104);
    return;
  }

  ctx.fillText("Season Failed", x + 28, y + 44);
  ctx.font = "16px Trebuchet MS";
  ctx.fillText("You did not hit the target before season end.", x + 28, y + 78);
  ctx.fillText("Press R to restart from level 1.", x + 28, y + 104);
}

function render(frameTime = 0) {
  if (appState.introStartedAt === 0) {
    appState.introStartedAt = frameTime;
  }
  if (gameState.lastFrameTime === 0) {
    gameState.lastFrameTime = frameTime;
  }
  const dt = Math.min(42, frameTime - gameState.lastFrameTime || 16);
  gameState.lastFrameTime = frameTime;
  gameState.clock = frameTime;

  if (appState.phase === APP_PHASE.INTRO) {
    if (farm3DScene && farm3DScene.renderIntroFrame) {
      farm3DScene.renderIntroFrame(frameTime);
    }
    updateIntroCaption(frameTime);
    if (frameTime - appState.introStartedAt >= INTRO_DURATION_MS) {
      showRulesPhase();
    }
    requestAnimationFrame(render);
    return;
  }

  if (appState.phase === APP_PHASE.RULES) {
    if (farm3DScene && farm3DScene.renderIntroFrame) {
      farm3DScene.renderIntroFrame(frameTime);
    }
    requestAnimationFrame(render);
    return;
  }

  if (resizeGameCanvasToContainer()) {
    gameState.lastFrameTime = frameTime;
  }

  updateTileAnimations(dt);
  updateParticles(dt);
  updateHarvestBursts(dt);
  syncHud();

  drawBackground();
  drawField();
  drawRain(dt);
  drawParticles();
  drawHarvestBursts();
  drawCursor();
  drawCursorHint();
  drawOverlayMessages();

  requestAnimationFrame(render);
}

function tryInitRuntime3D() {
  if (!scene3dCanvas) {
    showRulesPhase();
    return;
  }

  import("./scene3d.js?v=20260329d")
    .then(({ initFarm3DScene }) => {
      farm3DScene = initFarm3DScene(scene3dCanvas);
      window.addEventListener("resize", () => {
        farm3DScene?.resize();
      });
    })
    .catch(async (error) => {
      console.warn("Three.js intro unavailable. Falling back to local OBJ intro renderer.", error);
      if (introCaptionEl) {
        introCaptionEl.textContent = "Three.js unavailable, loading local OBJ intro...";
      }

      try {
        const { initFallbackObjIntro } = await import("./intro-local-obj.js?v=20260329d");
        farm3DScene = initFallbackObjIntro(scene3dCanvas);
        window.addEventListener("resize", () => {
          farm3DScene?.resize();
        });
        if (introCaptionEl) {
          introCaptionEl.textContent = "Local OBJ intro ready.";
        }
      } catch (fallbackError) {
        console.warn("Local OBJ intro failed. Opening rules screen.", fallbackError);
        if (introCaptionEl) {
          introCaptionEl.textContent = "3D intro unavailable. Opening gameplay rules...";
        }
        setTimeout(() => {
          if (appState.phase === APP_PHASE.INTRO) {
            showRulesPhase();
          }
        }, 1000);
      }
    });
}

function startGame() {
  beginIntroPhase();
  syncPhaseLayout();
  updateStartScreenInfo();
  setupIntroFlowControls();
  tryInitRuntime3D();
  preloadCropSprites();
  renderSeedCards();
  setInventoryOpen(false, true);
  applyImportedToolIcons();
  setupToolButtons();
  setupActionButtons();
  setupSeedButtons();
  setupWalkthroughControls();
  setupTooltips();
  setupInput();
  syncHud();
  render();
}

startGame();
