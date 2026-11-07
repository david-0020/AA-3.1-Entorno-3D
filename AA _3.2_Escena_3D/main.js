import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#08060d');
const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 8;
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#mi-canvas'), antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
scene.add(new THREE.AmbientLight('#c9b9dd', 1.5));
const light = new THREE.PointLight('#a43cff', 35);
light.position.set(1, 2, 4);
scene.add(light);

const sword = new THREE.Group();
sword.position.x = -1.25;
scene.add(sword);
const black = new THREE.MeshStandardMaterial({ color: '#17151d', metalness: 0.85, roughness: 0.22 });
const purple = new THREE.MeshStandardMaterial({ color: '#7022aa', metalness: 0.7, roughness: 0.25, emissive: '#310a50' });
const glow = new THREE.MeshStandardMaterial({ color: '#d8a4ff', emissive: '#a43cff', emissiveIntensity: 1.4, metalness: 0.7 });

const blade = new THREE.Shape();
blade.moveTo(0.08, -0.12);
blade.quadraticCurveTo(1.7, -0.2, 3.75, -0.12);
blade.lineTo(4.35, 0);
blade.quadraticCurveTo(3.9, 0.17, 0.08, 0.12);
blade.closePath();
const steel = new THREE.Mesh(new THREE.ExtrudeGeometry(blade, { depth: 0.1, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 2 }), black);
sword.add(steel);

const edge = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0.1, -0.12, 0.07), new THREE.Vector3(1.6, -0.18, 0.07),
  new THREE.Vector3(3.6, -0.13, 0.07), new THREE.Vector3(4.28, -0.02, 0.07),
]);
sword.add(new THREE.Mesh(new THREE.TubeGeometry(edge, 48, 0.018, 8), glow));

const guard = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.07, 10, 28), purple);
guard.position.x = 0.02;
sword.add(guard);
const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 1.55, 12), black);
handle.rotation.z = Math.PI / 2;
handle.position.x = -0.82;
sword.add(handle);
const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 12), purple);
pommel.position.x = -1.68;
sword.add(pommel);

for (let i = 0; i < 6; i++) {
  const wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.045, 12), purple);
  wrap.rotation.z = Math.PI / 2;
  wrap.position.x = -1.45 + i * 0.23;
  sword.add(wrap);
}

function animate() {
  sword.rotation.y += 0.009;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
animate();
