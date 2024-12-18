import { StreetScene } from "../scenes/StreetScene.js";
import { GameState } from "../core/GameState.js";
import { Character } from "../entities/Character.js";
import { Move } from "../enums/Actions.js";
import * as THREE from "three";

export function initializeGame() {
  const currentScene = new StreetScene();
  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    10,
    20000
  );

  camera.position.set(0, 25, 0);
  camera.lookAt(
    camera.position.x,
    camera.position.y - 5,
    camera.position.z - 10
  );
  const gameState = new GameState(currentScene, camera);
  return gameState;
}

export function handleAction(gameState, keys) {
  const characterSpeed = 0.01;
  let action = Move.IDLE;
  switch (true) {
    case keys["w"]:
      gameState.camera.position.z -= characterSpeed;
      action = Move.FORWARD;
      break;
    case keys["s"]:
      gameState.camera.position.z += characterSpeed;
      action = Move.BACKWARD;
  }

  if (gameState.currentScene.sky) {
    gameState.currentScene.sky.rotation.y += 0.0001;
  }
}
