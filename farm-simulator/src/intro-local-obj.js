const OBJ_BASE_PATH = "./assets/imported/quaternius/OBJ/";

const INTRO_LAYOUT = [
  {
    file: "BigBarn.obj",
    targetHeight: 7.1,
    position: [-8.8, 0, -8.2],
    rotationY: Math.PI * 0.18,
    color: "#b88356",
  },
  {
    file: "Silo_House.obj",
    targetHeight: 5.8,
    position: [8.4, 0, -8.6],
    rotationY: -Math.PI * 0.12,
    color: "#9db18d",
  },
  {
    file: "TowerWindmill.obj",
    targetHeight: 8.4,
    position: [10.8, 0, -1.8],
    rotationY: Math.PI * 0.88,
    color: "#b08f61",
    spin: true,
  },
  {
    file: "Well.obj",
    targetHeight: 2.5,
    position: [4.8, 0, 2.8],
    rotationY: Math.PI * 0.32,
    color: "#8f7c66",
  },
  {
    file: "Fence2.obj",
    targetHeight: 1.9,
    position: [-12.8, 0, 2.1],
    rotationY: Math.PI * 0.52,
    color: "#8c623d",
  },
];

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const safe = normalized.length === 3
    ? `${normalized[0]}${normalized[0]}${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}`
    : normalized;
  const value = Number.parseInt(safe, 16);
  if (!Number.isFinite(value)) return { r: 170, g: 170, b: 170 };
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function shadeRgb(rgb, lum) {
  const clamped = Math.max(0, Math.min(1.2, lum));
  const r = Math.max(0, Math.min(255, Math.round(rgb.r * clamped)));
  const g = Math.max(0, Math.min(255, Math.round(rgb.g * clamped)));
  const b = Math.max(0, Math.min(255, Math.round(rgb.b * clamped)));
  return `rgb(${r}, ${g}, ${b})`;
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function normalize(v) {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function rotateY(v, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0] * c - v[2] * s, v[1], v[0] * s + v[2] * c];
}

function parseObj(text) {
  const vertices = [];
  const faces = [];
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("v ")) {
      const parts = trimmed.split(/\s+/);
      if (parts.length < 4) continue;
      vertices.push([
        Number.parseFloat(parts[1]) || 0,
        Number.parseFloat(parts[2]) || 0,
        Number.parseFloat(parts[3]) || 0,
      ]);
      continue;
    }

    if (trimmed.startsWith("f ")) {
      const parts = trimmed.split(/\s+/).slice(1);
      const indices = [];
      parts.forEach((part) => {
        const token = part.split("/")[0];
        const raw = Number.parseInt(token, 10);
        if (!Number.isFinite(raw)) return;
        const index = raw < 0 ? vertices.length + raw : raw - 1;
        if (index >= 0 && index < vertices.length) {
          indices.push(index);
        }
      });

      for (let i = 1; i < indices.length - 1; i += 1) {
        faces.push([indices[0], indices[i], indices[i + 1]]);
      }
    }
  }

  return { vertices, faces };
}

function normalizeMesh(mesh, targetHeight) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  mesh.vertices.forEach((v) => {
    min[0] = Math.min(min[0], v[0]);
    min[1] = Math.min(min[1], v[1]);
    min[2] = Math.min(min[2], v[2]);
    max[0] = Math.max(max[0], v[0]);
    max[1] = Math.max(max[1], v[1]);
    max[2] = Math.max(max[2], v[2]);
  });

  const centerX = (min[0] + max[0]) * 0.5;
  const centerZ = (min[2] + max[2]) * 0.5;
  const height = Math.max(0.001, max[1] - min[1]);
  const scale = targetHeight / height;

  const vertices = mesh.vertices.map((v) => [
    (v[0] - centerX) * scale,
    (v[1] - min[1]) * scale,
    (v[2] - centerZ) * scale,
  ]);

  return { vertices, faces: mesh.faces };
}

async function loadMesh(file, targetHeight) {
  const response = await fetch(`${OBJ_BASE_PATH}${file}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${file}: ${response.status}`);
  }
  const text = await response.text();
  return normalizeMesh(parseObj(text), targetHeight);
}

function drawBackdrop(ctx, width, height) {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#b7dcff");
  sky.addColorStop(0.52, "#d7ecff");
  sky.addColorStop(1, "#d2edbc");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(105, 165, 82, 0.45)";
  ctx.beginPath();
  ctx.ellipse(width * 0.52, height * 0.78, width * 0.44, height * 0.19, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawLoadingState(ctx, width, height, message) {
  drawBackdrop(ctx, width, height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  ctx.fillRect(width * 0.26, height * 0.38, width * 0.48, height * 0.2);
  ctx.strokeStyle = "rgba(25, 54, 36, 0.3)";
  ctx.strokeRect(width * 0.26, height * 0.38, width * 0.48, height * 0.2);
  ctx.fillStyle = "#244531";
  ctx.font = "bold 20px Trebuchet MS";
  ctx.fillText("Building 3D intro", width * 0.33, height * 0.46);
  ctx.font = "15px Trebuchet MS";
  ctx.fillText(message, width * 0.3, height * 0.52);
}

export function initFallbackObjIntro(canvas) {
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) {
    return {
      renderIntroFrame: () => {},
      resize: () => {},
    };
  }

  const state = {
    loading: true,
    failed: false,
    loadingMessage: "Loading OBJ files...",
    models: [],
  };

  Promise.all(
    INTRO_LAYOUT.map(async (layout) => {
      state.loadingMessage = `Loading ${layout.file}...`;
      const mesh = await loadMesh(layout.file, layout.targetHeight);
      return {
        ...layout,
        colorRgb: hexToRgb(layout.color),
        mesh,
      };
    })
  )
    .then((models) => {
      state.models = models;
      state.loading = false;
      state.loadingMessage = "Loaded";
    })
    .catch((error) => {
      console.error("Local OBJ intro loading failed", error);
      state.loading = false;
      state.failed = true;
      state.loadingMessage = "Could not load local OBJ assets.";
    });

  function resize() {
    const width = canvas.clientWidth || canvas.width;
    const height = canvas.clientHeight || canvas.height;
    if (!width || !height) return;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function renderIntroFrame(frameTime = 0) {
    resize();
    const width = canvas.width;
    const height = canvas.height;

    if (state.loading || state.failed) {
      drawLoadingState(ctx, width, height, state.loadingMessage);
      return;
    }

    drawBackdrop(ctx, width, height);

    const t = frameTime * 0.00025;
    const cameraPos = [Math.cos(t) * 22, 10.9 + Math.sin(t * 1.7) * 1.5, Math.sin(t) * 17];
    const target = [0, 2.7, 0];
    const forward = normalize(sub(target, cameraPos));
    const right = normalize(cross(forward, [0, 1, 0]));
    const up = cross(right, forward);
    const lightDir = normalize([0.4, 0.9, 0.24]);

    const focal = Math.min(width, height) * 1.08;
    const near = 0.2;
    const polygons = [];

    state.models.forEach((model) => {
      const extraSpin = model.spin ? frameTime * 0.0007 : 0;
      const modelRotation = model.rotationY + extraSpin;
      const worldVerts = model.mesh.vertices.map((v) => {
        const rotated = rotateY(v, modelRotation);
        return [
          rotated[0] + model.position[0],
          rotated[1] + model.position[1],
          rotated[2] + model.position[2],
        ];
      });

      model.mesh.faces.forEach((face) => {
        const w1 = worldVerts[face[0]];
        const w2 = worldVerts[face[1]];
        const w3 = worldVerts[face[2]];
        if (!w1 || !w2 || !w3) return;

        const c1 = sub(w1, cameraPos);
        const c2 = sub(w2, cameraPos);
        const c3 = sub(w3, cameraPos);

        const z1 = dot(c1, forward);
        const z2 = dot(c2, forward);
        const z3 = dot(c3, forward);
        if (z1 < near || z2 < near || z3 < near) return;

        const x1 = dot(c1, right);
        const x2 = dot(c2, right);
        const x3 = dot(c3, right);
        const y1 = dot(c1, up);
        const y2 = dot(c2, up);
        const y3 = dot(c3, up);

        const points = [
          [width * 0.5 + (x1 * focal) / z1, height * 0.57 - (y1 * focal) / z1],
          [width * 0.5 + (x2 * focal) / z2, height * 0.57 - (y2 * focal) / z2],
          [width * 0.5 + (x3 * focal) / z3, height * 0.57 - (y3 * focal) / z3],
        ];

        const normal = normalize(cross(sub(w2, w1), sub(w3, w1)));
        const lum = Math.max(0.2, Math.min(1.15, dot(normal, lightDir) * 0.65 + 0.45));
        polygons.push({
          points,
          depth: (z1 + z2 + z3) / 3,
          fill: shadeRgb(model.colorRgb, lum),
        });
      });
    });

    polygons.sort((a, b) => b.depth - a.depth);

    polygons.forEach((poly) => {
      ctx.beginPath();
      ctx.moveTo(poly.points[0][0], poly.points[0][1]);
      ctx.lineTo(poly.points[1][0], poly.points[1][1]);
      ctx.lineTo(poly.points[2][0], poly.points[2][1]);
      ctx.closePath();
      ctx.fillStyle = poly.fill;
      ctx.fill();
      ctx.strokeStyle = "rgba(24, 46, 30, 0.2)";
      ctx.lineWidth = 0.55;
      ctx.stroke();
    });
  }

  resize();

  return {
    renderFrame: renderIntroFrame,
    renderIntroFrame,
    resize,
  };
}
