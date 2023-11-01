import * as THREE from 'three';

export default class Food extends THREE.Mesh {
  constructor(posX, posY) {
    let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let material = new THREE.MeshStandardMaterial();
    super(geometry, material);
    this.material.color.set(0xffffff);
    this.name = 'food';
    this.position.x = posX;
    this.position.y = posY;

    this.loseFood = () => {
      geometry.dispose();
      material.dispose();
    };
  }
}
