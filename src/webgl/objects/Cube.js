import * as THREE from "three";
import AudioController from "../../components/AudioController";

export default class Cube {
  constructor() {
    this.geometry = new THREE.BoxGeometry(10, 10, 10);
    this.material = new THREE.MeshNormalMaterial({});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.group = new THREE.Group();
    this.group.add(this.mesh);
  }

  tick(deltatime) {
    this.mesh.scale.set(
      Math.sin(0.5 + AudioController.fdata[0] / 255),
      Math.sin(0.5 + AudioController.fdata[1] / 255),
      Math.sin(0.5 + AudioController.fdata[2] / 255)
    );
    this.mesh.position.set(
      Math.sin(
        AudioController.fdata[6] / 25.5 - AudioController.fdata[3] / 25.5
      ),
      Math.sin(
        AudioController.fdata[7] / 25.5 - AudioController.fdata[4] / 25.5
      ),
      Math.sin(
        AudioController.fdata[8] / 25.5 - AudioController.fdata[5] / 25.5
      )
    );

    this.mesh.rotation.x = (AudioController.fdata[9] / 255) * 0.05 * deltatime;
    this.mesh.rotation.y = (AudioController.fdata[10] / 255) * 0.05 * deltatime;
  }
}
