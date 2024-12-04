import { StreetScene } from "../scenes/StreetScene.js";
import { GameState } from "../core/GameState.js";
import { Character } from "../entities/Character.js";
import { Move } from "../enums/Actions.js";

export function initializeGame() {
  const currentScene = new StreetScene();
  const character = new Character("characters/mid20s.glb", 0.5, {
    x: 0,
    y: 10,
    z: 500,
  });
  currentScene.add(character);
  const gameState = new GameState(currentScene, character);
  return gameState;
}

export function handleAction(gameState, keys) {
  const characterSpeed = gameState.character.speed;
  let action = Move.IDLE;
  switch (true) {
    case keys["w"]:
      gameState.character.position.z -= characterSpeed;
      action = Move.FORWARD;
      break;
    case keys["s"]:
      gameState.character.position.z += characterSpeed;
      action = Move.BACKWARD;
  }

  if (gameState.character.animations) {
    const currentAnimation = gameState.character.animations.find(
      (animation) => animation.name === action
    );

    if (!currentAnimation) return;
    const actionClip = gameState.character.mixer.clipAction(currentAnimation);

    // TODO: There has to be a better way to do this.
    gameState.character.mixer._actions.forEach((action) => {
      if (action !== actionClip) {
        action.stop();
      }
    });
    actionClip.play();
  }
}
