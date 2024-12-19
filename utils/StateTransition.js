import { StreetScene } from "../scenes/StreetScene.js";
import { GameState } from "../core/GameState.js";
import { Move } from "../enums/Actions.js";
import * as THREE from "three";

export function initializeGame() {
  const currentScene = new StreetScene();
  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    5,
    200
  );

  camera.position.set(0, 10, 0);
  const gameState = new GameState(currentScene, camera);
  return gameState;
}

export function handleAction(gameState, keys) {
  const characterSpeed = 0.1;

  switch (true) {
    case keys["w"]:
      gameState.camera.position.z -= characterSpeed;
      break;
    case keys["s"]:
      gameState.camera.position.z += characterSpeed;
      break;
    case keys["a"]:
      gameState.camera.position.x -= characterSpeed;
      break;
    case keys["d"]:
      gameState.camera.position.x += characterSpeed;
  }

  if (gameState.currentScene.sky)
    gameState.currentScene.sky.rotation.y += 0.0001;
}
