import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Snake from './snake';
import Food from './food';
import { scene } from './scene';

//SCENE & CAMERA
let scl = 0.5;

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 15);

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x333333, 1);

document.body.appendChild(renderer.domElement);

//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

//CAMERA CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 7;
controls.dynamicDampingFactor = 0.1;
controls.update();

//GEOMETRY
const snake = new Snake(0, 0);
scene.add(snake);

document.onkeydown = checkKey;

function checkKey(e) {
  switch (e.keyCode) {
    case 38:
      snake.dir(0, 1);
      break;
    case 40:
      snake.dir(0, -1);
      break;
    case 37:
      snake.dir(-1, 0);
      break;
    case 39:
      snake.dir(1, 0);
      break;
  }
}

let food;
function pickLocation() {
  let cols = Math.floor(5);

  let rows = Math.floor(5);
  food = new Food(
    Math.floor(Math.random() * cols),
    Math.floor(Math.random() * rows)
  );
  scene.add(food);
}

pickLocation();

//ANIMATE
function animate() {
  snake.death();
  snake.update();
  snake.showTail();
  // for (let i = 0; i < snake.tail.length; i++) {
  //   const segmentGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  //   const segmentMat = new THREE.MeshStandardMaterial({ color: 0x00ffff });
  //   const segmentMesh = new THREE.Mesh(segmentGeo, segmentMat);
  //   segmentMesh.position.x = snake.tail[i].x;
  //   segmentMesh.position.y = snake.tail[i].y;
  //   tailArray.push(segmentMesh);
  //   scene.add(segmentMesh);
  // }

  // setTimeout(() => {
  //   tailArray.forEach((obj) => {
  //     obj.geometry.dispose();
  //     obj.material.dispose();
  //     scene.remove(obj);
  //   });
  // }, 500);

  if (snake.eat(food.position)) {
    console.log('food eaten');
    food.loseFood();
    scene.remove(food);
    pickLocation();
  }
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

//EVENT HANDLER
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
