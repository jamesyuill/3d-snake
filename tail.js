import * as THREE from 'three';
import { scene } from './scene';

export default class Tail extends THREE.Mesh {
  constructor(posX, posY) {
    let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let material = new THREE.MeshStandardMaterial();
    super(geometry, material);
    this.material.color.set(0xffff00);
    this.name = 'snake';
    this.x = posX;
    this.y = posY;
    this.z = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.history = [];

    this.dir = (xdir, ydir) => {
      this.xSpeed = xdir;
      this.ySpeed = ydir;
    };

    this.update = () => {
      this.position.x += this.xSpeed * 0.01;
      this.position.y += this.ySpeed * 0.01;
    };

    this.eat = (pos) => {
      let rounded = {
        x: Math.round(this.position.x),
        y: Math.round(this.position.y),
        z: 0,
      };

      if (rounded.x === pos.x && rounded.y === pos.y) {
        this.total++;
        return true;
      } else {
        return false;
      }
    };

    this.showTail = () => {
      const pastPosition = {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
      };
      this.history.push(pastPosition);

      for (let i = 0; i < this.total; i++) {
        const segmentGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const segmentMat = new THREE.MeshStandardMaterial({ color: 0x00ffff });
        const segmentMesh = new THREE.Mesh(segmentGeo, segmentMat);
        segmentMesh.position.x = this.history[this.history.length - 54].x;
        segmentMesh.position.y = this.history[this.history.length - 54].y;
        scene.add(segmentMesh);
        setTimeout(() => {
          segmentGeo.dispose();
          segmentMat.dispose();
          scene.remove(segmentMesh);
        }, 60);
      }
    };
  }
}
