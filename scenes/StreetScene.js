import { Sky } from "three/addons/objects/Sky.js";
import * as THREE from "three";
import { AnimationMixer, Scene } from "three";
import { FBXLoader } from "three/addons";

export class StreetScene extends Scene {
  sky;
  sun;
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

    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      "/Byc_sketchfab.fbx",
      (model) => {
        model.scale.set(0.5, 0.5, 0.5);
        model.rotateX(-Math.PI / 2);
        model.traverse((child) => {});
        this.model = model;
        this.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading FBX model:", error);
      }
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    ambientLight.position.set(0, 100, 50); // Set the desired position
    this.add(ambientLight);
  }
}
