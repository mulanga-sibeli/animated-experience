import { Sky } from "three/addons/objects/Sky.js";
import * as THREE from "three";
import { Scene } from "three";

export class StreetScene {
    sky;
    sun;
    scene;

    constructor(camera, renderer) {
        this.scene = new Scene();

        const helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
        this.scene.add( helper );

        this.sky = new Sky();
        this.sky.scale.setScalar( 450000 );
        this.scene.add( this.sky );
        this.sun = new THREE.Vector3();
        this.addSunToScene(this.scene, camera, renderer);
    }

    addSunToScene(scene, camera, renderer) {
        const effectController = {
            turbidity: 10,
            rayleigh: 3,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.7,
            elevation: 2,
            azimuth: 180,
            exposure: renderer.toneMappingExposure
        };

        const uniforms = this.sky.material.uniforms;
        uniforms['turbidity'].value = effectController.turbidity;
        uniforms['rayleigh'].value = effectController.rayleigh;
        uniforms['mieCoefficient'].value = effectController.mieCoefficient;
        uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

        const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
        const theta = THREE.MathUtils.degToRad(effectController.azimuth);

        this.sun.setFromSphericalCoords(1, phi, theta);

        uniforms['sunPosition'].value.copy(this.sun);

        renderer.toneMappingExposure = effectController.exposure;
    }
}