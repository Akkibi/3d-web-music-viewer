import * as THREE from "three";
import AudioController from "../../components/AudioController";

export default class Board {
  constructor() {
    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    this.material1 = new THREE.MeshBasicMaterial({ color: 0xdc95f4 });
    this.material2 = new THREE.MeshBasicMaterial({ color: 0xbcf9dc });
    this.group = new THREE.Group();
    this.group.add(this.mesh);

    this.sideNb = 16;

    for (let x = 0; x < this.sideNb; x++) {
      for (let y = 0; y < this.sideNb; y++) {
        let mesh;
        if (x % 2 == 0) {
          mesh = new THREE.Mesh(this.geometry, this.material1);
        } else {
          mesh = new THREE.Mesh(this.geometry, this.material2);
        }
        mesh.position.set(
          x * 0.5 - (this.sideNb * 0.5) / 2,
          y * 0.5 - (this.sideNb * 0.5) / 2,
          0
        );

        this.group.add(mesh);
      }
    }
  }
  tick() {
    this.group.rotation.x += 0.01;
    this.group.rotation.y += 0.01;
    for (let i = 0; i < this.group.children.length; i++) {
      this.group.children[i].scale.z = 1 + AudioController.fdata[i] ** 2 / 300;
    }
  }
}
