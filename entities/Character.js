import { AnimationMixer, FrontSide, LoopOnce, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Character extends Object3D {
  position;
  speed;
  mixer;
  animations;

  constructor(gltfPath, speed, position) {
    super();

    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      gltfPath,
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
        this.animations = gltf.animations;
        this.add(model);

        this.mixer = new AnimationMixer(model);
        const idleAnimation = this.animations.find(
          (animation) => animation.name === "idle_breathing"
        );
        const action = this.mixer.clipAction(idleAnimation);
        action.setLoop(LoopOnce);
        action.clampWhenFinished = true;
        action.play();
        action.onFinished = () => {
          this.mixer.uncacheAction(action);
        };
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
