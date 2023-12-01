import * as THREE from "three";
import AudioController from "../../components/AudioController";
import Scene from "../Scene";

// eslint-disable-next-line import/no-webpack-loader-syntax
import fragmentShader from "../../shaders/plane/fragment.glsl";

// ../../shaders/plane/fragment.glsl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import vertexShader from "../../shaders/plane/vertex.glsl";

export default class Plane {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(20, 20, 512, 512);
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uMap: {
          value: null,
        },
        uBassFrequency: {
          value: 0,
        },
        uTime: {
          value: 0,
        },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });
    this.mesh = new THREE.Points(this.geometry, this.material);
    this.group = new THREE.Group();
    this.group.add(this.mesh);
    this.rotation = [0, 0];
  }

  updateCover(image) {
    console.log(image);
    Scene.textureLoader.load(image, (texture) => {
      this.material.uniforms.uMap.value = texture;
      this.material.needsUpdate = true;
    });
  }

  tick(deltatime) {
    this.material.uniforms.uTime.value += deltatime * 0.001;
    this.material.uniforms.uBassFrequency.value = AudioController.fdata[0];
    // this.rotation[0] += 0.01;
    // this.rotation[1] += 0.0125;
    // this.group.rotation.x = Math.sin(this.rotation[0]);
    // this.group.rotation.y = Math.sin(this.rotation[1]);
  }
}
