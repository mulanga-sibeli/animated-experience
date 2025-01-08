import * as THREE from "three";
import * as TransitionFunction from "../utils/StateTransition.js";

const ROTATION_SPEED = 0.001;

export class GameEngine {
  camera;
  renderer;
  keys;
  gameState;
  clock;
  canOrbit;
  cameraTarget;
  lastMousePosition;

  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(2);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;
    document.body.appendChild(this.renderer.domElement);

    this.gameState = TransitionFunction.initializeGame();
    this.gameState.camera.lookAt(this.gameState.cameraTarget);

    this.keys = {};
    this.clock = new THREE.Clock();
    this.canOrbit = false;
    this.lastMousePosition = null;

    this.animate = this.animate.bind(this);
    this.render = this.render.bind(this);

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
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      if (this.lastMousePosition === null) {
        this.lastMousePosition = { x: mouseX, y: mouseY };
        return;
      }

      const deltaX = mouseX - this.lastMousePosition.x;
      const deltaY = this.lastMousePosition.y - mouseY;
      this.lastMousePosition = { x: mouseX, y: mouseY };

      const radius = this.gameState.cameraTarget.distanceTo(
        this.gameState.camera.position
      );
      const theta = Math.atan2(
        this.gameState.cameraTarget.z - this.gameState.camera.position.z,
        this.gameState.cameraTarget.x - this.gameState.camera.position.x
      );

      this.gameState.cameraTarget.x =
        this.gameState.camera.position.x +
        radius * Math.cos(theta + deltaX * ROTATION_SPEED);
      this.gameState.cameraTarget.z =
        this.gameState.camera.position.z +
        radius * Math.sin(theta + deltaX * ROTATION_SPEED);

      let phi = deltaY * ROTATION_SPEED;
      const currentPitch = Math.asin(
        (this.gameState.cameraTarget.y - this.gameState.camera.position.y) /
          radius
      );
      phi = Math.max(Math.min(phi, Math.PI / 1.2), -Math.PI / 1.2);
      this.gameState.cameraTarget.y =
        this.gameState.camera.position.y +
        radius * Math.sin(currentPitch + phi);
      this.gameState.camera.lookAt(this.gameState.cameraTarget);
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
    this.lastMousePosition = null;
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
