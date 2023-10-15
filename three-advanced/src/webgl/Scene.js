import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import Cube from "./objects/Cube.js";

class SCENE {
  setup(canvas) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = canvas;

    this.setupStats();
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();

    this.addObjects();
    this.addEvents();
  }

  setupStats() {
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);
  }
  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      28,
      this.width / this.height,
      0.1,
      10000
    );
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: false,
      alpha: true,
    });

    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.5));
  }

  addEvents() {
    // gsap.ticker.add((time, deltaTime, frame) =>
    //   this.tick(time, deltaTime, frame)
    // );

    gsap.ticker.add(this.tick);
    gsap.ticker.fps(60);
    window.addEventListener("resize", () => this.resize);
  }
  resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  };

  addObjects() {
    this.cube = new Cube();

    this.scene.add(this.cube.mesh);

    this.camera.position.z = 5;
  }

  tick = () => {
    this.stats.begin();
    this.cube.tick();
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
  };
}

const Scene = new SCENE();
export default Scene;
