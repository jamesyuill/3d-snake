import * as THREE from 'three';
import { scene } from './scene';

export default class Bomb extends THREE.Mesh {
  constructor(posX, posY) {
    let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    let material = new THREE.MeshStandardMaterial();
    super(geometry, material);
    this.material.color.set(0xff0000);
    this.name = 'Bomb';
    this.position.x = posX;
    this.position.y = posY;
    this.z = 0;
  }
}
