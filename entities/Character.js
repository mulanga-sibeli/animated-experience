import * as THREE from "three";

export class Character extends THREE.Mesh {
    position;
    speed;
    constructor(width, height, depth, color, speed, position){
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshBasicMaterial({color: color});
        super(geometry, material);
        this.position = position;
        this.speed = speed;
    }
}