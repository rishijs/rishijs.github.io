import * as THREE from "three";

//Init
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 5000);
export const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

//Lighting
const ambientLight = new THREE.AmbientLight(0x953553, 5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight( 0x953553, 5 );
scene.add(directionalLight);


//Cubes
let outline_geo = new THREE.BoxGeometry(111,111,111);
let outline_mat1 = new THREE.MeshBasicMaterial({
color: 0x800080,
side: THREE.BackSide,
emissive: 0x800080,
emissiveIntensity: 100,
transparent: true,
opacity:0.8,
blending: THREE.AdditiveBlending
});
let outline_mat2 = new THREE.MeshBasicMaterial({
color: 0xFA5F55,
side: THREE.BackSide,
emissive: 0xFA5F55,
emissiveIntensity: 100,
transparent: true,
blending: THREE.AdditiveBlending
});
let outline_mat3 = new THREE.MeshBasicMaterial({
color: 0x191970,
side: THREE.BackSide,
emissive: 0x191970,
emissiveIntensity: 100,
transparent: true,
blending: THREE.AdditiveBlending
});

let cubeGeometry = new THREE.BoxGeometry(110,110,110);
let cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });


let cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
let outlinePlayer1 = new THREE.Mesh(outline_geo, outline_mat1);

let cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
let outlinePlayer2 = new THREE.Mesh(outline_geo, outline_mat2);

let cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
let outlinePlayer3 = new THREE.Mesh(outline_geo, outline_mat3);

scene.add(cube1);
cube1.add(outlinePlayer1);
cube1.rotation.set(0,0,0);

scene.add(cube2);
cube2.add(outlinePlayer2);
cube2.rotation.set(Math.PI/4,Math.PI/4,Math.PI/4);

scene.add(cube3);
cube3.add(outlinePlayer3);
cube1.rotation.set(Math.PI/2,Math.PI/2,Math.PI/2);

camera.position.copy(cube1.position);
camera.position.y +=1;
camera.position.z +=100;
camera.lookAt(cube1.position);


//Rendering
window.addEventListener("resize", onWindowResize );

function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    cube1.rotation.y+=0.001;
    cube1.rotation.x+=0.001;
    cube1.rotation.z+=0.001;

    cube2.rotation.y+=0.002;
    cube2.rotation.x+=0.002;
    cube2.rotation.z+=0.002;

    cube3.rotation.y+=0.003;
    cube3.rotation.x+=0.003;
    cube3.rotation.z+=0.003;

}

animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    return false;
}