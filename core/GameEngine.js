import * as THREE from "three";
import * as TransitionFunction from "../utils/StateTransition.js";

const ROTATION_SPEED = 0.0025;

export class GameEngine {
  camera;
  renderer;
  keys;
  gameState;
  clock;
  canOrbit;
  spherical;
  currentLookAt;
  lastMousePosition;

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
    this.canOrbit = false;

    this.animate = this.animate.bind(this);
    this.render = this.render.bind(this);

    this.currentLookAt = new THREE.Vector3();
    this.spherical = new THREE.Spherical(10, Math.PI / 2, Math.PI / 4);

    this.lastMousePosition = {
      x: this.gameState.camera.position.x,
      y: this.gameState.camera.position.y - 1,
    };

    window.addEventListener("resize", this.onWindowResize.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("mousedown", this.onMouseUp.bind(this));
    window.addEventListener("mouseup", this.onMouseDown.bind(this));
    this.animate();
  }

  onWindowResize() {
    this.gameState.camera.aspect = window.innerWidth / window.innerHeight;
    this.gameState.camera.updateProjectionMatrix();
    this.gameState.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  onMouseMove(event) {
    if (this.canOrbit === true) {
      const deltaX = event.clientX - this.lastMousePosition.x;
      const deltaY = event.clientY - this.lastMousePosition.y;

      this.lastMousePosition = { x: event.clientX, y: event.clientY };
      this.spherical.theta -= deltaX * ROTATION_SPEED;
      this.spherical.phi += deltaY * ROTATION_SPEED;

      this.spherical.theta = this.spherical.theta % (2 * Math.PI);
      this.spherical.phi = Math.max(
        Math.PI / 6,
        Math.min(Math.PI - Math.PI / 6, this.spherical.phi)
      );
      this.lookAtPosition = new THREE.Vector3().setFromSpherical(
        new THREE.Spherical(
          this.spherical.radius,
          this.spherical.phi,
          this.spherical.theta
        )
      );
      this.gameState.camera.lookAt(this.lookAtPosition);
    }
  }

  onKeyDown(event) {
    this.keys[event.key.toLowerCase()] = true;
  }

  onKeyUp(event) {
    this.keys[event.key.toLowerCase()] = false;
  }

  onMouseDown() {
    this.canOrbit = !this.canOrbit;
  }

  onMouseUp() {
    this.canOrbit = !this.canOrbit;
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
