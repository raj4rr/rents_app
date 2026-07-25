const fs = require('fs');
const path = require('path');

const srcDir = '/Users/rajesh/.gemini/antigravity-ide/brain/f1a81d35-ba10-4352-b148-ef7e5c443fc2';
const destDir = path.resolve(__dirname, 'uploads');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  { src: '3d_bedroom_cozy_1784148718912.png', dest: '3d-bedroom-1.png' },
  { src: '3d_bedroom_1_1784149019849.png', dest: '3d-bedroom-2.png' },
  { src: '3d_bedroom_2_1784149033736.png', dest: '3d-bedroom-3.png' },
  { src: '3d_bedroom_3_1784149047019.png', dest: '3d-bedroom-4.png' },
  { src: '3d_bedroom_4_1784149060270.png', dest: '3d-bedroom-5.png' },
  { src: '3d_bedroom_5_1784149076190.png', dest: '3d-bedroom-6.png' },
  { src: '3d_bedroom_6_1784149091358.png', dest: '3d-bedroom-7.png' },
  { src: '3d_living_room_modern_1784148731402.png', dest: '3d-living-1.png' },
  { src: '3d_living_1_1784149108450.png', dest: '3d-living-2.png' },
  { src: '3d_living_2_1784149125237.png', dest: '3d-living-3.png' },
  { src: '3d_living_3_1784149141605.png', dest: '3d-living-4.png' },
  { src: '3d_kitchen_sleek_1784148743784.png', dest: '3d-kitchen.png' },
  { src: '3d_bathroom_clean_1784148756497.png', dest: '3d-bathroom.png' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} to ${f.dest}`);
  } else {
    console.log(`Source file not found: ${srcPath}`);
  }
});
