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
  const characterSpeed = 0.25;
  const forwardDirection = new THREE.Vector3();
  gameState.camera.getWorldDirection(forwardDirection);

  forwardDirection.y = 0;
  forwardDirection.normalize();

  let rightDirection = new THREE.Vector3();
  rightDirection
    .crossVectors(forwardDirection, gameState.camera.up)
    .normalize();

  switch (true) {
    case keys["w"]:
      gameState.camera.position.addScaledVector(
        forwardDirection,
        characterSpeed
      );
      break;
    case keys["s"]:
      gameState.camera.position.addScaledVector(
        forwardDirection,
        -characterSpeed
      );
      break;
    case keys["a"]:
      gameState.camera.position.addScaledVector(
        rightDirection,
        -characterSpeed
      );
      break;
    case keys["d"]:
      gameState.camera.position.addScaledVector(rightDirection, characterSpeed);
      break;
  }

  if (gameState.currentScene.sky)
    gameState.currentScene.sky.rotation.y += 0.00025;
}
