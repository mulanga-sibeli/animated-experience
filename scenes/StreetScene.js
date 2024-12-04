import * as THREE from "three";
import { AnimationMixer, FrontSide, LoopOnce, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class StreetScene extends Scene {
  sky;
  character;
  name;
  animations;
  mixer;

  constructor() {
    super();

    this.name = "StreetScene";

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "buildings/luo_hut/test2.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 0.8, 1);

        this.animations = gltf.animations;
        this.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading gltf model:", error);
      }
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    ambientLight.position.set(-100, -10, -50);
    this.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfffffe, 5); // Bright white light
    directionalLight.position.set(100, 100, 100);
    this.add(directionalLight);

    this.children.forEach((child) => {
      console.log(child.type);
    });
  }
}
