import {StreetScene} from "../scenes/StreetScene.js";
import {GameState} from "../core/GameState.js";
import {Character} from "../entities/Character.js";

export function initializeGame() {
    const currentScene = new StreetScene();
    const character = new Character('/teen_boy.glb', 1, { x: 0, y: 0, z: 0 });
    currentScene.add(character);
    const gameState = new GameState(currentScene, character);
    return gameState;
}

export function handleAction(gameState, keys){
    const characterSpeed = gameState.character.speed;
    if(keys['w']){
        gameState.character.position.z -= characterSpeed;
    }
    if(keys['s']){
        gameState.character.position.z += characterSpeed;
    }
    if(keys['a']){
        gameState.character.position.x -= characterSpeed;
    }
    if(keys['d']){
        gameState.character.position.x += characterSpeed;
    }
}