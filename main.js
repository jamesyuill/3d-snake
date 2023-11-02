import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Snake from './snake';
import Food from './food';
import { scene } from './scene';

let scl = 0.5;
let food;
let isGameOver = false;
let foodHistory = [];
let location;
//SCENE & CAMERA
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

function generateLocation() {
  let cols = Math.floor(Math.random() * 12) - 5;
  let rows = Math.floor(Math.random() * 12) - 5;
  let newX = Math.floor(Math.random() * cols);
  let newY = Math.floor(Math.random() * rows);
  return { x: newX, y: newY };
}

function createAndPlaceFood() {
  location = generateLocation();
  food = new Food(location.x, location.y);
  scene.add(food);
}

//ANIMATE
function animate() {
  snake.update();
  snake.tail();
  // if (snake.explode(snake.foodHistory)) {
  //   isGameOver = true;
  // }

  if (food) {
    if (snake.eat(food.position)) {
      foodHistory.push({ x: food.position.x, y: food.position.y });

      food.loseFood();
      scene.remove(food);
      createAndPlaceFood();
    }
  }

  isGameOver ? null : requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();
createAndPlaceFood();
//EVENT HANDLER
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
