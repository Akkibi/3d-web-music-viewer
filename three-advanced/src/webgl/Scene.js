import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import pane from "../components/Pane.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import Line from "./objects/Line.js";
import Cube from "./objects/Cube.js";
import LogoIut from "./objects/LogoIut.js";
import Board from "./objects/Board.js";
import Plane from "./objects/Plane.js";

class SCENE {
  setup(canvas) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = canvas;

    this.setupStats();
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.postProcessing();
    this.setupGLFTLoader();
    this.setupTextureLoader();

    this.addObjects();
    this.addEvents();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
  }

  setupStats() {
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);
  }
  setupScene() {
    this.scene = new THREE.Scene();
  }
  setupTextureLoader() {
    this.textureLoader = new THREE.TextureLoader();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      28,
      this.width / this.height,
      0.1,
      2000
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

    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.75));
  }

  addEvents() {
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
  postProcessing = () => {
    this.bloomParams = {
      bloomStrength: 1,
      bloomRadius: 0.5,
      threshold: 0,
    };

    //add bloom
    //add chromatic aberration
    this.composer = new EffectComposer(this.renderer);
    this.scenePass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width / this.height),
      this.bloomParams.bloomStrength,
      this.bloomParams.bloomRadius,
      this.bloomParams.threshold
    );

    this.composer.addPass(this.scenePass);
    this.composer.addPass(this.bloomPass);

    this.postProcessFolder = pane.addFolder({ title: "Post Processing" });
    this.postProcessFolder
      .addBinding(this.bloomParams, "bloomStrength", {
        min: 0,
        max: 1,
        step: 0.1,
      })
      .on("change", (e) => {
        console.log(e.value);
        this.bloomPass.strength = e.value;
      });
    this.postProcessFolder
      .addBinding(this.bloomParams, "bloomRadius", {
        min: 0,
        max: 1,
        step: 0.1,
      })
      .on("change", (e) => {
        console.log(e.value);
        this.bloomPass.radius = e.value;
      });
    this.postProcessFolder
      .addBinding(this.bloomParams, "threshold", {
        min: 0,
        max: 1,
        step: 0.1,
      })
      .on("change", (e) => {
        console.log(e.value);
        this.bloomPass.threshold = e.value;
      });
  };

  addObjects() {
    this.cube = new Cube();
    this.line = new Line();
    this.LogoIut = new LogoIut();
    this.board = new Board();
    this.plane = new Plane();

    // this.scene.add(this.plane);
    this.selectedObject = this.plane;

    this.bloomPass.strength = 0.25;
    this.scene.add(this.selectedObject.group);

    this.camera.position.z = 55;
  }
  setupGLFTLoader() {
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.load("./logo-iut.glb", (gltf) => {
      this.scene.add(gltf.scene);
    });
  }
  pickvisualizer(index) {
    this.scene.remove(this.selectedObject.group);
    switch (index) {
      case 0:
        this.selectedObject = this.cube;
        this.bloomPass.strength = 1;
        break;
      case 1:
        this.selectedObject = this.line;
        this.bloomPass.strength = 1;
        break;
      case 2:
        this.selectedObject = this.LogoIut;
        this.bloomPass.strength = 1;
        break;
      case 3:
        this.selectedObject = this.board;
        this.bloomPass.strength = 0.5;
        break;
      case 4:
        this.selectedObject = this.plane;
        this.bloomPass.strength = 0.25;
      default:
        break;
    }
    this.scene.add(this.selectedObject.group);
  }

  tick = (time, deltatime, frame) => {
    this.stats.begin();
    this.selectedObject.tick(deltatime);
    this.controls.update();
    this.composer.render();

    this.stats.end();
  };
}

const Scene = new SCENE();
export default Scene;
