import * as THREE from "three";
import AudioController from "../../components/AudioController";

export default class Line {
  constructor() {
    this.colors = [0xdc95f4, 0xbcf9dc, 0x46a4da];

    this.group = new THREE.Group();

    this.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    this.material = new THREE.MeshBasicMaterial();

    this.materials = [];
    this.colors.forEach((color) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
      });
      this.materials.push(material);
    });

    this.linecount = 255;
    let n = 0;
    this.spacing = 0;

    for (let i = 0; i < this.linecount; i++) {
      if (i % Math.round(this.linecount / this.colors.length) == 0) {
        n++;
      }
      const line = new THREE.Mesh(this.geometry, this.materials[n - 1]);
      line.position.x =
        i * 0.1 +
        i * this.spacing -
        (this.linecount * this.spacing + this.linecount * 0.1) / 2;
      this.group.add(line);
    }
  }
  tick() {
    for (let i = 0; i < this.group.children.length; i++) {
      // console.log(this.group.children[i].scale);
      this.group.children[i].scale.set(
        1,
        1 + AudioController.fdata[i] ** 2 / 300,
        1
      );
    }
  }
}
