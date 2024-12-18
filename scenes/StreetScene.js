import * as THREE from "three";
import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class StreetScene extends Scene {
  sky;
  name;
  animations;

  constructor() {
    super();
    this.name = "StreetScene";
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "buildings/mulangas_apartment.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1.1, 1);

        this.animations = gltf.animations;
        this.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading gltf model:", error);
      }
    );

    gltfLoader.load(
      "skyboxes/unreal_engine_4_sky.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(2, 2, 2);

        this.animations = gltf.animations;
        this.sky = model;
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

    const directionalLight = new THREE.DirectionalLight(0xfffffe, 5);
    directionalLight.position.set(100, 100, 100);
    this.add(directionalLight);

    const axesHelper = new THREE.AxesHelper(10000);
    this.add(axesHelper);

    this.children.forEach((child) => {
      console.log(child.type);
    });
  }
}
