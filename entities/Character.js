import { AnimationMixer, FrontSide, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Character extends Object3D {
  position;
  speed;
  mixer;

  constructor(fbxPath, speed, position) {
    super();

    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      "/characters/mid20s.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.rotateY(Math.PI);
        model.scale.set(15, 15, 15);

        model.traverse((node) => {
          if (node.isMesh) {
            const material = node.material;

            material.transparent = false;
            material.opacity = 1;
            material.depthWrite = true;
            material.side = FrontSide;

            material.needsUpdate = true;
          }
        });

        this.add(model);

        this.mixer = new AnimationMixer(model);
        const animations = gltf.animations;
        const action = this.mixer.clipAction(animations[9]);
        action.play();
      },
      undefined,
      (error) => {
        console.error("Error loading gltf model:", error);
      }
    );

    this.position = position;
    this.speed = speed;
  }
}
