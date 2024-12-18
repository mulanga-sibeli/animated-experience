import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as TransitionFunction from "../utils/StateTransition.js";

export class GameEngine {
  camera;
  renderer;
  controls;
  keys;
  gameState;
  clock;

  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;
    document.body.appendChild(this.renderer.domElement);

    this.gameState = TransitionFunction.initializeGame();

    this.keys = {};
    this.clock = new THREE.Clock();

    this.animate = this.animate.bind(this);
    this.render = this.render.bind(this);

    this.controls = new OrbitControls(
      this.gameState.camera,
      this.renderer.domElement
    );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 200;

    this.controls.addEventListener("change");

    window.addEventListener("resize", this.onWindowResize.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
    this.animate();
  }

  onWindowResize() {
    this.gameState.camera.aspect = window.innerWidth / window.innerHeight;
    this.gameState.camera.updateProjectionMatrix();
    this.gameState.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  onKeyDown(event) {
    this.keys[event.key.toLowerCase()] = true;
  }

  onKeyUp(event) {
    this.keys[event.key.toLowerCase()] = false;
  }

  animate() {
    requestAnimationFrame(this.animate);
    TransitionFunction.handleAction(this.gameState, this.keys);
    this.render();
  }

  render() {
    this.renderer.render(this.gameState.currentScene, this.gameState.camera);
  }
}
