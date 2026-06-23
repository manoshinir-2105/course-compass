
// Smooth scroll (Zoho style UX)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(a.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* ================= 3D HERO (Three.js) ================= */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// GOLD SPHERE (AI CORE VISUAL)
const geometry = new THREE.IcosahedronGeometry(1.5, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xd4af37,
  wireframe: true
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// LIGHT ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.003;
  sphere.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();

// RESPONSIVE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});