import { StreetScene } from '../scenes/StreetScene.js';

export class TransitionFunction {
    currentScene;
    camera;
    renderer;
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        this.currentScene = new StreetScene(this.camera, this.renderer);
    }
}
