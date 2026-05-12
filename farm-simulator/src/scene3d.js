import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/loaders/FBXLoader.js";
import { MTLLoader } from "https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/loaders/OBJLoader.js";

const OBJ_BASE_PATH = "./assets/imported/quaternius/OBJ/";
const FBX_BASE_PATH = "./assets/imported/quaternius/FBX/";

const MODEL_LAYOUT = [
  {
    kind: "obj",
    name: "BigBarn",
    targetHeight: 7.2,
    position: [-8.5, 0, -9],
    rotationY: Math.PI * 0.2,
  },
  {
    kind: "obj",
    name: "Silo_House",
    targetHeight: 5.6,
    position: [8.5, 0, -8.5],
    rotationY: -Math.PI * 0.14,
  },
  {
    kind: "obj",
    name: "Well",
    targetHeight: 2.4,
    position: [4.6, 0, 2.8],
    rotationY: Math.PI * 0.3,
  },
  {
    kind: "obj",
    name: "Fence2",
    targetHeight: 1.8,
    position: [-13, 0, 2.4],
    rotationY: Math.PI * 0.5,
  },
  {
    kind: "fbx",
    name: "TowerWindmill",
    targetHeight: 8.2,
    position: [11.2, 0, -1.5],
    rotationY: Math.PI * 0.88,
  },
];

function setMaterialColorSpace(material) {
  if (!material) return;
  if (material.map) {
    material.map.colorSpace = THREE.SRGBColorSpace;
  }
}

function prepareObject(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = true;
    child.receiveShadow = true;

    if (Array.isArray(child.material)) {
      child.material.forEach((material) => setMaterialColorSpace(material));
    } else {
      setMaterialColorSpace(child.material);
    }
  });
}

function normalizeObjectHeight(object, targetHeight) {
  const bounds = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  bounds.getSize(size);

  if (size.y > 0) {
    const scale = targetHeight / size.y;
    object.scale.multiplyScalar(scale);
  }

  const normalizedBounds = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  normalizedBounds.getCenter(center);

  object.position.x -= center.x;
  object.position.z -= center.z;
  object.position.y -= normalizedBounds.min.y;
}

function placeObject(scene, object, layout, spinTargets) {
  normalizeObjectHeight(object, layout.targetHeight);
  prepareObject(object);

  const holder = new THREE.Group();
  holder.position.set(layout.position[0], layout.position[1], layout.position[2]);
  holder.rotation.y = layout.rotationY;
  holder.add(object);
  scene.add(holder);

  if (layout.name.toLowerCase().includes("windmill")) {
    spinTargets.push(holder);
  }
}

function loadOBJModel(name) {
  const mtlLoader = new MTLLoader();
  const objLoader = new OBJLoader();

  return new Promise((resolve, reject) => {
    mtlLoader.setPath(OBJ_BASE_PATH);
    mtlLoader.load(
      `${name}.mtl`,
      (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.setPath(OBJ_BASE_PATH);
        objLoader.load(`${name}.obj`, resolve, undefined, reject);
      },
      undefined,
      reject
    );
  });
}

function loadFBXModel(name) {
  const fbxLoader = new FBXLoader();
  return new Promise((resolve, reject) => {
    fbxLoader.load(`${FBX_BASE_PATH}${name}.fbx`, resolve, undefined, reject);
  });
}

function createFallbackMesh(layout) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, layout.targetHeight, 2.4),
    new THREE.MeshStandardMaterial({
      color: 0xa67a4f,
      roughness: 0.86,
      metalness: 0.03,
    })
  );
  mesh.position.y = layout.targetHeight * 0.5;
  return mesh;
}

function addFarmBase(scene) {
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(26, 72),
    new THREE.MeshStandardMaterial({ color: 0x8abb65, roughness: 0.95, metalness: 0.02 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);

  const field = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 12),
    new THREE.MeshStandardMaterial({ color: 0x719349, roughness: 0.96, metalness: 0.01 })
  );
  field.rotation.x = -Math.PI / 2;
  field.position.set(0, 0.02, 2.5);
  field.receiveShadow = true;
  scene.add(field);
}

async function populateModels(scene, spinTargets) {
  await Promise.all(
    MODEL_LAYOUT.map(async (layout) => {
      try {
        const object =
          layout.kind === "obj" ? await loadOBJModel(layout.name) : await loadFBXModel(layout.name);
        placeObject(scene, object, layout, spinTargets);
      } catch (error) {
        console.error(`Failed to load model ${layout.name}`, error);
        const fallback = createFallbackMesh(layout);
        const holder = new THREE.Group();
        holder.position.set(layout.position[0], layout.position[1], layout.position[2]);
        holder.rotation.y = layout.rotationY;
        holder.add(fallback);
        scene.add(holder);
        if (layout.name.toLowerCase().includes("windmill")) {
          spinTargets.push(holder);
        }
      }
    })
  );
}

export function initFarm3DScene(canvas) {
  if (!canvas) {
    return {
      renderFrame: () => {},
      resize: () => {},
    };
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
  } catch (error) {
    console.error("WebGL renderer failed", error);
    return {
      renderFrame: () => {},
      resize: () => {},
    };
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xc2e4ff);
  scene.fog = new THREE.Fog(0xc2e4ff, 32, 76);

  const camera = new THREE.PerspectiveCamera(56, 1, 0.1, 220);
  camera.position.set(0, 12.5, 21);
  camera.lookAt(0, 2, 0);

  const hemiLight = new THREE.HemisphereLight(0xeaf6ff, 0x4f6a42, 0.75);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfff5d2, 1.08);
  sunLight.position.set(10, 22, 11);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 90;
  sunLight.shadow.camera.left = -24;
  sunLight.shadow.camera.right = 24;
  sunLight.shadow.camera.top = 24;
  sunLight.shadow.camera.bottom = -24;
  scene.add(sunLight);

  const spinTargets = [];
  addFarmBase(scene);
  populateModels(scene, spinTargets).catch((error) => {
    console.error("3D scene model population failed", error);
  });

  function resize() {
    const width = canvas.clientWidth || canvas.width;
    const height = canvas.clientHeight || canvas.height;
    if (!width || !height) return;

    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
    }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function renderIntroFrame(frameTime = 0) {
    resize();
    const t = frameTime * 0.00026;
    const radius = 21;
    const camX = Math.cos(t) * radius;
    const camZ = Math.sin(t) * radius * 0.78;
    const camY = 10.8 + Math.sin(t * 1.8) * 1.6;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(0, 2.8, 0);

    spinTargets.forEach((target) => {
      target.rotation.y += 0.004;
    });
    renderer.render(scene, camera);
  }

  resize();

  return {
    renderFrame: renderIntroFrame,
    renderIntroFrame,
    resize,
  };
}
