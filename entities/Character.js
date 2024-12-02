import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AnimationMixer, Object3D } from "three";
import { FBXLoader } from "three/addons";

export class Character extends Object3D {
  position;
  speed;
  model;
  mixer;

  constructor(fbxPath, speed, position) {
    super();

    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      fbxPath,
      (model) => {
        model.scale.set(0.15, 0.15, 0.15);
        model.rotateY(Math.PI);
        this.model = model;
        this.add(model);

        this.mixer = new AnimationMixer(this.model);
        const action = this.mixer.clipAction(this.model.animations[0]);
        action.play();
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model:", error);
      }
    );

    this.position = position;
    this.speed = speed;
  }
}
