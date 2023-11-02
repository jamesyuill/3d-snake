import * as THREE from 'three';
import { scene } from './scene';
import Bomb from './bomb';

export default class Snake extends THREE.Mesh {
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

    this.dir = (xdir, ydir) => {
      this.xSpeed = xdir;
      this.ySpeed = ydir;
    };

    this.update = () => {
      this.position.x += this.xSpeed * 0.03;
      this.position.y += this.ySpeed * 0.03;
    };

    this.eat = (pos) => {
      let rounded = {
        x: Math.round(this.position.x),
        y: Math.round(this.position.y),
        z: 0,
      };
      if (rounded.x === pos.x && rounded.y === pos.y) {
        this.total++;
        setTimeout(() => {
          this.dropBomb(pos.x, pos.y);
        }, 1000);

        return true;
      } else {
        return false;
      }
    };

    this.dropBomb = (posX, posY) => {
      const bomb = new Bomb(posX, posY);
      scene.add(bomb);
    };

    //   this.explode = (array) => {
    //     let rounded = {
    //       x: Math.round(this.position.x),
    //       y: Math.round(this.position.y),
    //       z: 0,
    //     };

    //     for (let i = 0; i < array.length; i++) {
    //       if (rounded.x === array[i].x && rounded.y === array[i].y) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
    //   };
  }
}
