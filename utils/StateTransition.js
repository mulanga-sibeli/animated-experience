import { StreetScene } from "../scenes/StreetScene.js";
import { GameState } from "../core/GameState.js";
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
  const gameState = new GameState(
    currentScene,
    camera,
    new THREE.Vector3(0, 9.5, 5)
  );
  return gameState;
}

export function handleAction(gameState, keys) {
  const characterSpeed = 0.1;

  // TODO: Fix rotated movement.
  switch (true) {
    case keys["w"]:
      if (gameState.cameraTarget.z < gameState.camera.position.z)
        gameState.camera.position.z -= characterSpeed;
      else gameState.camera.position.z += characterSpeed;

      break;
    case keys["s"]:
      if (gameState.cameraTarget.z < gameState.camera.position.z)
        gameState.camera.position.z += characterSpeed;
      else gameState.camera.position.z -= characterSpeed;
      break;
  }

  if (gameState.currentScene.sky)
    gameState.currentScene.sky.rotation.y += 0.0001;
}
