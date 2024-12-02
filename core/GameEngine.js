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
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      10,
      20000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;
    document.body.appendChild(this.renderer.domElement);

    this.gameState = TransitionFunction.initializeGame();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener("change", this.render);
    this.keys = {};

    this.clock = new THREE.Clock();

    this.animate = this.animate.bind(this);
    this.render = this.render.bind(this);

    window.addEventListener("resize", this.onWindowResize.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  onKeyDown(event) {
    this.keys[event.key.toLowerCase()] = true;
  }

  onKeyUp(event) {
    this.keys[event.key.toLowerCase()] = false;
  }

  animate() {
    const deltaTime = this.clock.getDelta();
    if (this.gameState.character.mixer) {
      this.gameState.character.mixer.update(deltaTime);
    }
    requestAnimationFrame(this.animate);
    TransitionFunction.handleAction(this.gameState, this.keys);
    this.render();
  }

  render() {
    const deltaTime = this.clock.getDelta();
    if (this.gameState.character.mixer) {
      this.gameState.character.mixer.update(deltaTime);
    }
    this.camera.position.set(
      this.gameState.character.position.x,
      this.gameState.character.position.y + 25,
      this.gameState.character.position.z + 70
    );
    this.renderer.render(this.gameState.currentScene, this.camera);
  }
}
