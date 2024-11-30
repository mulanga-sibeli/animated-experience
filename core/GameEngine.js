import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { motion } from "../constants/motion.js";
import { TransitionFunction } from "./TransitionFunction.js";

export class GameEngine {
    camera;
    renderer;
    controls;
    transitionFunction;
    keys;

    constructor() {
        // Add view camera
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 10, 20000);

        // Initialize the renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.5;
        document.body.appendChild(this.renderer.domElement);

        // Initialize the transition function
        this.transitionFunction = new TransitionFunction(this.camera, this.renderer);

        // Add controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.render = this.render.bind(this);
        this.controls.addEventListener('change', this.render);
        this.keys = {};

        this.animate = this.animate.bind(this);

        // Add event listeners
        window.addEventListener( 'resize', this.onWindowResize.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.render();
    }

    onKeyDown(event) {
        this.keys[event.key.toLowerCase()] = true;
    }

    onKeyUp(event) {
        this.keys[event.key.toLowerCase()] = false;
    }

    animate() {
        requestAnimationFrame(this.animate);

        if (this.keys['w']) this.camera.position.z -= motion.MOVE_SPEED;
        if (this.keys['s']) this.camera.position.z += motion.MOVE_SPEED;
        if (this.keys['a']) this.camera.position.x -= motion.MOVE_SPEED;
        if (this.keys['d']) this.camera.position.x += motion.MOVE_SPEED;
        if (this.keys['q']) this.camera.position.y -= motion.MOVE_SPEED;
        if (this.keys['e']) this.camera.position.y += motion.MOVE_SPEED;

        this.render();
    }

    render() {
        this.renderer.render(this.transitionFunction.currentScene.scene, this.camera);
    }
}

