import { Sky } from "three/addons/objects/Sky.js";
import * as THREE from "three";
import { Scene } from "three";

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    ambientLight.position.set(0, 100, -50);
    this.add(ambientLight);
  }
}
