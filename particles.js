import * as THREE from "three";

import {scene, cameraMode, jet} from "./app.js";

var particlesActive = true;

let particleSystem;
let particleSystemw;
let particleSystemf;
let particleSystemf2;

let particleCount;
let particles;
let positions;
let colors;
let particleMaterial;

let particleCountw;
let particlesw;
let positionsw;
let colorsw;
let particleMaterialw;

let particleCountf;
let particlesf;
let particleColors;
let particleMaterialf;
  
//smoke
export function initParticles(){
    particleCount = 200;
    particles = new THREE.BufferGeometry();
    positions = new Float32Array(particleCount * 3);
    colors = new Float32Array(particleCount * 3);
    particleMaterial = new THREE.PointsMaterial({
        size: 2,
        map: new THREE.TextureLoader().load("/textures/smoke.jpeg"),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true 
    });

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = Math.random() * 3 - 1.5;
        positions[i3 + 1] = Math.random() * 3 - 1.5;
        positions[i3 + 2] = Math.random() * 3 - 1.5;
        colors[i3] = Math.random()*0.6+0.2;
        colors[i3 + 1] = Math.random()*0.6+0.2;
        colors[i3 + 2] = Math.random()*0.6+0.2;
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    //wind
    particleCountw = 50;
    particlesw = new THREE.BufferGeometry();
    positionsw = new Float32Array(particleCount * 3);
    colorsw = new Float32Array(particleCount * 3);
    particleMaterialw = new THREE.PointsMaterial({
        size: 0.2,
        map: new THREE.TextureLoader().load("/textures/smoke.jpeg"),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true
    });

    for (let i = 0; i < particleCountw; i++) {
        const i3 = i * 3;
        positionsw[i3] = Math.random() * 40 - 20;
        positionsw[i3 + 1] = Math.random() * 40 - 20;
        positionsw[i3 + 2] = Math.random() * 40 - 20;
        colorsw[i3] = Math.random();
        colorsw[i3 + 1] = Math.random();
        colorsw[i3 + 2] = Math.random();
    }
    particlesw.setAttribute("position", new THREE.BufferAttribute(positionsw, 3));
    particlesw.setAttribute("color", new THREE.BufferAttribute(colorsw, 3));
    particleSystemw = new THREE.Points(particlesw, particleMaterialw);
    scene.add(particleSystemw);

    //burn
    particleColors = [0xFF4500, 0xFF8C00, 0xFFFF00, 0xFFD700];
    particleCountf = 100;
    particlesf = new THREE.BufferGeometry();
    particlesf.setAttribute('position', new THREE.Float32BufferAttribute(particleCountf * 3, 3));
    particlesf.setAttribute('color', new THREE.Float32BufferAttribute(particleCountf * 3, 3)); // add color attribute

    for (let i = 0; i < particleCountf; i++) {
        const particlef = new THREE.Vector3(Math.random() * 0.02 - 0.1, Math.random() * 0.02 - 0.1, 0);
        particlesf.attributes.position.array[i * 3] = particlef.x;
        particlesf.attributes.position.array[i * 3 + 1] = particlef.y;
        particlesf.attributes.position.array[i * 3 + 2] = particlef.z;
        const color = new THREE.Color(particleColors[i % particleColors.length]);
        particlesf.attributes.color.array[i * 3] = color.r;
        particlesf.attributes.color.array[i * 3 + 1] = color.g;
        particlesf.attributes.color.array[i * 3 + 2] = color.b;}

    particlesf.attributes.position.needsUpdate = true;
    particlesf.attributes.color.needsUpdate = true;
    particleMaterialf = new THREE.PointsMaterial({size: 0.6,vertexColors: true});
    particleSystemf = new THREE.Points(particlesf, particleMaterialf);
    particleSystemf2 = particleSystemf.clone();
    scene.add(particleSystemf);
    scene.add(particleSystemf2);
}

function updateSmoke() {
    const speed = 0.25;
    const positions = particles.getAttribute("position").array;
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += speed;
        if (positions[i3 + 1] > 3) {
            positions[i3 + 1] = -3;
        }
    }
    particles.getAttribute("position").needsUpdate = true;
}

function updateWind() {
    const speedw = 0.05;
    const positionsw = particlesw.getAttribute("position").array;
    for (let i = 0; i < particleCountw; i++) {
        const i3 = i * 3;
        positionsw[i3 + 1] += speedw;
        if (positionsw[i3 + 1] > 10) {
            positionsw[i3 + 1] = -10;
        }
    }
    particlesw.getAttribute("position").needsUpdate = true;
}

function updateBurn(){
particlesf.attributes.position.array.forEach((particle, index) => {
    if (index % 3 === 1) {
        particle += Math.random() * 0.05;
        if (particle > 1) {
            particle = -0.25;
        }
        particlesf.attributes.position.array[index] = particle;
    } else if (index % 3 === 0) {
        particle += Math.random() * 0.016 - 0.008;
        particlesf.attributes.position.array[index] = particle;
    } else {
        particle += Math.random() * 0.016 - 0.008;
        particlesf.attributes.position.array[index] = particle;
    }
    if(index>100){
        setTimeout(() => {
            particlesf.attributes.position.array[index] = 99999;
        }, 5000);
    }
});
particlesf.attributes.position.needsUpdate = true;
particlesf.attributes.color.needsUpdate = true;
}

//reset particle system
export function resetParticles(){
    particleSystem.geometry.dispose();
    particleSystem.material.dispose();
    scene.remove(particleSystem);
    particleSystemw.geometry.dispose();
    particleSystemw.material.dispose();
    scene.remove(particleSystemw);
    particleSystemf.geometry.dispose();
    particleSystemf.material.dispose();
    scene.remove(particleSystemf);

    particlesActive = false;
}

//adjust particles to be on jet
export function updateParticles(){

    if(cameraMode == 0){

        if(particlesActive == false){
            initParticles();
            particlesActive = true;
        }

        updateSmoke();
        updateWind();
        updateBurn();

        particleSystem.position.copy(jet.position);
        particleSystem.rotation.x = Math.PI / 3;
        particleSystem.position.x += 0.25;
        particleSystem.position.z += 6;
        particleSystem.position.y -= 3;

        particleSystemw.position.copy(jet.position);
        particleSystemw.rotation.x = Math.PI / 3;
        particleSystemw.position.y -= 3;

        particleSystemf.position.copy(jet.position);
        particleSystemf2.position.copy(jet.position);
        particleSystemf.rotation.x = Math.PI / 3;
        particleSystemf.rotation.y *= -1;
        particleSystemf2.rotation.copy(particleSystemf.rotation);
        particleSystemf.rotation.z=jet.rotation.z;
        particleSystemf2.rotation.z=jet.rotation.z;

        particleSystemf.position.y += particleSystemf.rotation.z;
        particleSystemf2.position.y += particleSystemf2.rotation.z;
        if(particleSystemf.rotation.z < 0){
            particleSystemf.position.y -= 2*particleSystemf.rotation.z;
            particleSystemf2.position.y -= 2*particleSystemf2.rotation.z;
        }
        
        particleSystemf.position.z += 4.9;
        particleSystemf.position.x -= 0.5;
        particleSystemf.position.y -= 0.8;
        particleSystemf2.position.z += 4.9;
        particleSystemf2.position.x += 0.9;
        particleSystemf2.position.y -= 0.8;
    }
    else if(cameraMode == 1){
        resetParticles();
    }

}