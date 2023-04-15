import * as THREE from "three";

import {scene} from "./app.js";

let sphereColors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x8f00ff];
let sphereSizes = [14, 16, 18, 20, 22, 24, 26];
let cubeColors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x8f00ff];
let cubeSizes = [28, 32, 36, 40, 44, 48, 52];


export function drawGeometry(spheresDeco,cubesDeco,x,y,z,spawnX,spawnZ,spawnY){
    for (let i=0; i<spheresDeco; i++){
        let sphereSize = sphereSizes[Math.floor(Math.random() * sphereSizes.length)];
        let outline_geo_s2 = new THREE.SphereGeometry(sphereSize+5,32,32);
        let outline_mat_s2 = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.BackSide,
        });
        let sphereColor = sphereColors[Math.floor(Math.random() * sphereColors.length)];
        let sphereMaterial2 = new THREE.MeshBasicMaterial({ color: sphereColor });
        var sphere2 = new THREE.Mesh(new THREE.SphereGeometry(sphereSize, 32, 32), sphereMaterial2);
        sphere2.position.set(x+Math.random()*spawnX*2 - spawnX,y+Math.random()*spawnY+spawnY/5,z+Math.random()*spawnZ*2 - spawnZ);
        scene.add(sphere2);
        let outlineSphere2 = new THREE.Mesh(outline_geo_s2, outline_mat_s2);
        sphere2.add(outlineSphere2);
    }

    for (let i=0; i<cubesDeco; i++){
        let cubeSize = cubeSizes[Math.floor(Math.random() * cubeSizes.length)];
        let outline_geo_c = new THREE.BoxGeometry(cubeSize+5,cubeSize+5,cubeSize+5);
        let outline_mat_c = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.BackSide,
        });
        let cubeColor = cubeColors[Math.floor(Math.random() * cubeColors.length)];
        let cubeMaterial = new THREE.MeshBasicMaterial({ color: cubeColor });
        var cube = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), cubeMaterial);
        cube.position.set(x+Math.random()*spawnX*2 - spawnX,y+Math.random()*spawnY+spawnY/5,z+Math.random()*spawnZ*2 - spawnZ);
        scene.add(cube);
        let outlineCube = new THREE.Mesh(outline_geo_c, outline_mat_c);
        cube.add(outlineCube);
    }
}