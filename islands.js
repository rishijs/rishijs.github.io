import * as THREE from "three";

import {scene} from "./app.js";


export function drawLand(){
    const geometry = new THREE.BoxGeometry(2000, 60, 2000);
    let colorsland = [
        new THREE.Color(0x1E6648).multiplyScalar(0.03),
        new THREE.Color(0x197D31).multiplyScalar(0.06),
        new THREE.Color(0x5FC66A).multiplyScalar(0.09),
        new THREE.Color(0x008000).multiplyScalar(0.01)
    ];
    geometry.attributes.color = new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.count * 3), 3);
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        let color = colorsland[Math.floor(Math.random() * 4)];
        geometry.attributes.color.setXYZ(i, color.r, color.g, color.b);
    }

    let material = new THREE.MeshStandardMaterial({ vertexColors: THREE.VertexColors });
    let land = new THREE.Mesh(geometry, material);
    let land2 = new THREE.Mesh(geometry, material);
    let land3 = new THREE.Mesh(geometry, material);
    let halfway = new THREE.Mesh(geometry, material);
    land.position.set(4000, -30, -12500);
    land2.position.set(-5000, -30, -15000);
    land3.position.set(0, -30, -17500);
    halfway.position.set(0, -30, -10000);

    let outline_geo = new THREE.BoxGeometry(2000+5, 60+30, 2000+5);
    let outline_mat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide,
    });

    let outlineLand1 = new THREE.Mesh(outline_geo, outline_mat);
    let outlineLand2 = new THREE.Mesh(outline_geo, outline_mat);
    let outlineLand3 = new THREE.Mesh(outline_geo, outline_mat);
    let outlineLand4 = new THREE.Mesh(outline_geo, outline_mat);
    land.add(outlineLand1);
    land2.add(outlineLand2);
    land3.add(outlineLand3);
    halfway.add(outlineLand4);
    land.position.set(4000, -30, -12500);
    land2.position.set(-5000, -30, -15000);
    land3.position.set(0, -30, -17500);
    halfway.position.set(0, -30, -10000);
    scene.add(land);
    scene.add(land2);
    scene.add(land3);
    scene.add(halfway);
}