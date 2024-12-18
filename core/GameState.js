export class GameState {
  currentScene;
  camera;
  constructor(currentScene, camera) {
    this.currentScene = currentScene;
    this.camera = camera;
  }
}
