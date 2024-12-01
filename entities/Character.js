import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Object3D } from "three";

export class Character extends Object3D {
    position;
    speed;
    constructor(gltfPath, speed , position){
        super();

        this.speed = speed;
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            gltfPath,
            (gltf) => {
                gltf.scene.scale.set(20, 20, 20);
                this.add(gltf.scene);
            },
            undefined,
            (error) => {
                console.error('Error loading GLTF model:', error);
            }
        );

        this.position = position;
        this.speed = speed;
    }
}