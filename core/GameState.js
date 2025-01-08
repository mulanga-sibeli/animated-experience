export class GameState {
  currentScene;
  camera;
  cameraTarget;
  constructor(currentScene, camera, cameraTarget) {
    this.currentScene = currentScene;
    this.camera = camera;
    this.cameraTarget = cameraTarget;
  }
}
