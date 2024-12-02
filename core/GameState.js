export class GameState {
  scenes = {};
  currentScene;
  character;
  constructor(currentScene, character) {
    this.scenes[currentScene.name] = currentScene;
    this.currentScene = currentScene;
    this.character = character;
  }
}
