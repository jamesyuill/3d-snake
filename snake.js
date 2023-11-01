import * as THREE from 'three';
import { scene } from './scene';

export default class Snake extends THREE.Mesh {
  constructor(posX, posY) {
    let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let material = new THREE.MeshStandardMaterial();
    super(geometry, material);
    this.material.color.set(0xff0000);
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
      const pastPosition = {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
      };
      this.history.push(pastPosition);
      if (this.total === this.tail.length) {
        for (let i = 0; i < this.total - 1; i++) {
          this.tail[i] = this.tail[i + 1];
        }
      }
      this.tail[this.total - 1] = new THREE.Vector3(
        this.position.x,
        this.position.y,
        this.position.z
      );

      this.position.x += this.xSpeed * 0.03;
      this.position.y += this.ySpeed * 0.03;
      //   this.x = this.x + this.xSpeed;
      //   this.y = this.y + this.ySpeed;
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
      for (let i = 0; i < this.tail.length; i++) {
        const segmentGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const segmentMat = new THREE.MeshStandardMaterial({ color: 0x00ffff });
        const segmentMesh = new THREE.Mesh(segmentGeo, segmentMat);
        segmentMesh.position.x = this.tail[i].x;
        segmentMesh.position.y = this.tail[i].y;
        setTimeout(() => {
          scene.add(segmentMesh);
        }, 200);
        setTimeout(() => {
          segmentGeo.dispose();
          segmentMat.dispose();
          scene.remove(segmentMesh);
        }, 320);
      }
    };

    this.death = () => {
      let rounded = {
        x: Math.round(this.position.x),
        y: Math.round(this.position.y),
        z: 0,
      };

      for (let i = 0; i < this.tail.length; i++) {
        let pos = this.tail[i];
        if (rounded.x === pos.x && rounded.y === pos.y) {
          console.log('death');
        }
      }
    };
  }
}
