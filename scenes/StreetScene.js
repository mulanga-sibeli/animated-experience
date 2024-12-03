import { Sky } from "three/addons/objects/Sky.js";
import * as THREE from "three";
import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { FBXLoader } from "three/addons";

export class StreetScene extends Scene {
  sky;
  character;
  name;

  constructor() {
    super();

    this.name = "StreetScene";
    const helper = new THREE.GridHelper(10000, 2, 0xffffff, 0xffffff);
    this.add(helper);

    this.sky = new Sky();
    this.sky.scale.setScalar(450000);
    this.add(this.sky);

    // const gltfLoader = new GLTFLoader();

    // gltfLoader.load(
    //   "/maps/big_terrain/scene.gltf",
    //   (gltf) => {
    //     const model = gltf.scene;
    //     model.position.set(0, -200, 0);
    //     this.add(model);
    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading gltf model:", error);
    //   }
    // );

    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    ambientLight.position.set(0, 100, -50); // Set the desired position
    this.add(ambientLight);
  }
}
