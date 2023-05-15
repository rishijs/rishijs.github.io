import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import {startInit} from "./init.js";
import {initParticles, updateParticles, resetParticles} from "./particles.js";
import {renderLayout} from "./layout.js";
import {updateLandMap, updateWorldMap, updateUI, resetTempWorlds, tutorial} from "./interface.js";
import {drawGeometry} from "./arrangeGeometry.js";
import {drawLand} from "./islands.js";
import {drawMarkers} from "./markers.js";
import {drawText} from "./text.js";
import {spawnCrystals,crystalCollision,crystalsCollected} from "./crystals.js";


//variables
export var world = 0;
export var maxWorlds = 3;
export var endOfWorld = -20000;
export var landnum = 0;
var baseJetspeed = -12.5;
var jetspeed = -12.5;
export var jetY = 100;
var jetZ = -30;
var jetFloorY = 30;
var baseMoveSpeed = -jetspeed*0.37;
var moveSpeed = -jetspeed*0.37;
var basePlayerSpeed = 5;
var playerSpeed = 5;
var pX = 0;
export var cameraMode = 1;
var landing = false;
export var loading = true;
export var lowres = false;
var muted=true;
var startMusic,initMusic=false;
let listener,listener2,background,sfx;
var progressBarWidth=100;
var iBaseJetspeed = -12.5;
var iBasePlayerSpeed = 5;
var deltaMultiplier = 200;
export var renderError = false;

//scene set up
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 5000);
const cameratop = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 2000);
export let renderer;
try{
    renderer = new THREE.WebGLRenderer();
}
catch(error){
    console.log(error);
    renderError = true;
}
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
let clock = new THREE.Clock();

//Loading
export var manager = new THREE.LoadingManager();
manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    var progress = itemsLoaded / itemsTotal;
    document.getElementById("ProgressBarProgress").style.width = progress * progressBarWidth + 'px';
};
var countdown = 20;

export function setCountdownZero(){
    countdown = 1;
}

if(countdown>0){
    document.getElementById("count").textContent = countdown+'';
    let intervalId = setInterval(function(){
        if (countdown > 0) {
            document.getElementById("count").textContent = countdown + '';
            countdown -= 1;
        } else {
            clearInterval(intervalId);
        }
    },1000)
}

//post process
const renderScene = new RenderPass( scene, camera );
const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
let composer = new EffectComposer( renderer );

renderer.toneMappingExposure = Math.pow( 0.95 , 4.0 );
bloomPass.threshold = 0.5;
bloomPass.strength = 100;
bloomPass.radius = 1000;

composer.addPass( renderScene );
composer.addPass( bloomPass );

//stats
startInit();

//sun, water, sky
renderLayout();

//Adding jet
const loader = new GLTFLoader(manager);
export let jet;
let dusk;
let seva;
loader.load( '/meshes/neolowpolyjetnotext.glb', function ( gltf ) {
    jet = gltf.scene;
    jet.position.set( pX, jetFloorY, -700 );
    jet.rotation.set(0,0,0);
    jet.scale.set(40,30,40);
    scene.add(jet);
}, undefined, function ( error ) {
    console.error( error );
} );
loader.load( '/meshes/dusktext.glb', function ( gltf ) {
    dusk = gltf.scene;
    dusk.position.set( pX, jetY, jetZ );
    dusk.scale.set( 0.5, 0.5, 0.5 );
    scene.add(dusk);
}, undefined, function ( error ) {
    console.error( error );
} );
loader.load( '/meshes/sevatext.glb', function ( gltf ) {
    seva = gltf.scene;
    seva.position.set( pX, jetY, jetZ );
    seva.scale.set( 0.4, 0.4, 0.4 );
    scene.add(seva);
}, undefined, function ( error ) {
    console.error( error );
} );
const geometryj = new THREE.BoxGeometry(500, 3, 500);
let materialj = new THREE.MeshStandardMaterial({color: 0x000000});
let landj = new THREE.Mesh(geometryj, materialj);
landj.position.set(0,0,-700);
scene.add(landj);

function updateJetText(){
    if(jet!=null && dusk!=null && seva !=null){
        dusk.position.set(jet.position.x+0.02,jet.position.y+0.7,jet.position.z);
        dusk.rotation.set(jet.rotation.x+0.5,jet.rotation.y,jet.rotation.z+0.5);
        seva.position.set(jet.position.x+0.15,jet.position.y+0.5,jet.position.z);
        seva.rotation.copy(dusk.rotation);
    }
}

//Particle system for jet
initParticles();


//lights
const ambientLight = new THREE.AmbientLight(0x953553, 5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight( 0x953553, 5 );
scene.add(directionalLight);

//sound
listener = new THREE.AudioListener();
camera.add(listener);
const audioFiles = [
'music/Supernova.mp3',
'music/Dusklight.mp3',
'music/Flux.mp3',
'music/Zenith.mp3',
'music/testing.wav'
];
background = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
let currentIndex = Math.floor(Math.random() * 4);
if(currentIndex == 0){
    document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Supernova';
}
if(currentIndex == 1){
    document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Dusklight';
}
if(currentIndex == 2){
    document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Flux';
}
if(currentIndex == 3){
    document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Zenith';
}
if(currentIndex == 4){
    document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Testing';
}
audioLoader.load(audioFiles[currentIndex], function(buffer) {
    background.setBuffer(buffer);
    background.setLoop(false);
    background.play();
});
background.onEnded = function() {
    currentIndex = Math.floor(Math.random() * 4);
    audioLoader.load(audioFiles[currentIndex], function(buffer) {
        background.stop();
        background.setBuffer(buffer);
        background.setLoop(false);
        background.play();
    });
    if(currentIndex == 0){
        document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Supernova';
    }
    if(currentIndex == 1){
        document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Dusklight';
    }
    if(currentIndex == 2){
        document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Flux';
    }
    if(currentIndex == 3){
        document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Zenith';
    }
    if(currentIndex == 4){
        document.getElementById("activeSong").textContent = 'Now Playing: Sevadusk - Testing';
    }
};
background.setVolume(0);


listener2 = new THREE.AudioListener();
camera.add(listener2);
sfx = new THREE.Audio(listener2);
const sfxLoader = new THREE.AudioLoader();
sfxLoader.load("sfx/jetEngine.mp3", function(buffer) {
    sfx.setBuffer(buffer);
    sfx.setLoop(true);
});

//controls
document.addEventListener("keydown", keyInput, false);
document.addEventListener("keyup", keyRelease, false);
window.addEventListener("resize", onWindowResize );
window.addEventListener('beforeunload', function(event) {
    background.stop();
    sfx.stop();
});

let moveLeft = false;
let moveRight = false;
let playerUp = false;
let playerLeft = false;
let playerRight = false;
let playerDown = false;


function keyInput(event) {
    switch (event.keyCode) {
        //Spacebar
        case 32:
            if(cameraMode==0 && landing == true && loading == false && lowres == false){
                stopMovement();
                cameraMode = 1;
                jet.position.set( jet.position.x, jetFloorY, jet.position.z );
                jet.rotation.set(0,0,0);
                jet.scale.set(40,30,40);
                updateLandNum();

            }
            else if(loading == false && lowres == false){
                stopMovement();
                cameraMode = 0;
                jet.scale.set(1,1,1);
                jet.position.y = jetY;
                startMusic = true;
                document.getElementById("infob1").style.display = 'none';
                document.getElementById("infop1").style.display = 'none';
                document.getElementById("infob2").style.display = 'none';
                document.getElementById("infop2").style.display = 'none';
                document.getElementById("infob3").style.display = 'none';
                document.getElementById("infop3").style.display = 'none';
            }
            break;
        //w
        case 87:
            if(cameraMode == 1){
                playerUp = true;
            }
            break;
        //a
        case 65:
            if(cameraMode == 0){
                moveLeft = true;
            }
            if(cameraMode == 1){
                playerLeft = true;
            }
            break;
        //s
        case 83:
            if(cameraMode==0 && landing == true && loading == false && lowres == false){
                stopMovement();
                cameraMode = 1;
                sphere.position.set(jet.position.x,jetY,jet.position.z);
                updateLandNum();
                jet.position.set( jet.position.x, jetFloorY, jet.position.z );
                jet.rotation.set(0,0,0);
                jet.scale.set(40,30,40);

            }
            if(cameraMode == 1){
                playerDown = true;
            }
            break;
        //d
        case 68:
            if(cameraMode == 0){
                moveRight = true;
            }
            if(cameraMode == 1){
                playerRight = true;
            }
            break;
        //m
        case 77:
            if(muted == false){
                muted = true;
                document.getElementById("mutedText").textContent = "Muted";
            }
            else if(muted == true){
                muted = false;
                document.getElementById("mutedText").textContent = "Unmuted";
            }
            break;
        //esc
        case 27:  
            stopMovement();
            landnum = 0;
            cameraMode = 1;
            sphere.position.set(0,jetY,800);
            jet.position.set( pX, jetFloorY, -700 );
            jet.rotation.set(0,0,0);
            jet.scale.set(40,30,40);

            break;
    }
    return false;
}
function keyRelease(event) {
    switch (event.keyCode) {
        //w
        case 87:
            playerUp = false;
            break;
        //a
        case 65:
            moveLeft = false;
            playerLeft = false;
            break;
        //s
        case 83:
            playerDown = false;
            break;
        //d
        case 68:
            moveRight = false;
            playerRight = false;
            break;
    }
    return false;
}

function updateLandNum(){

    switch (landnum){
        case 0:
            jet.position.z = -700;
            break;
        case 1:
            jet.position.z = -10700;
            break;
        case 2:
            jet.position.z = -13200;
            sphere.position.x = 4000;
            break;
        case 3:
            jet.position.z = -15700;
            sphere.position.x = -5000;
            break;
        case 4:
            jet.position.z = -18200;
            break;
    }
}


function stopMovement(){
    landing = false;
    moveLeft = false;
    moveRight = false;
    playerUp = false;
    playerLeft = false;
    playerRight = false;
    playerDown = false;
}

//player
let outline_geo_s = new THREE.SphereGeometry(15,32,32);
let outline_mat_s = new THREE.MeshBasicMaterial({
  color: 0x000000,
  side: THREE.BackSide,
});
let sphereGeometry = new THREE.SphereGeometry(8, 80, 80);
let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
export let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(300,jetY,800);
let outlinePlayer = new THREE.Mesh(outline_geo_s, outline_mat_s);
scene.add(sphere);
sphere.add(outlinePlayer);

//Geometry Random Decoration
drawGeometry(45,45,0,0,0,1100,500,100);
drawGeometry(2,3,0,0,-10000,1100,500,100);
drawGeometry(3,2,4000,0,-12500,1100,500,100);
drawGeometry(2,3,-5000,0,-15000,1100,500,100);
drawGeometry(3,2,0,0,-17500,1100,500,100);


function handleCollision(){

    //const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
    //sphereBounds.center = sphere.position;

}

//camera movement
function updateCamera() {

    if(cameraMode == 0){
        camera.position.copy(jet.position);
        camera.position.y += 5;
        camera.position.z += 7;
        camera.lookAt(jet.position);
    }
    else if(cameraMode == 1){
        cameratop.position.copy(sphere.position);
        cameratop.position.y += 100;
        cameratop.position.z += 50;
        cameratop.lookAt(sphere.position);
    }

}

//Land
drawLand();

function alertLanding(){

    if(cameraMode == 0){
        //C
        if(jet.position.x > -1000 && jet.position.x < 1000){
            if(jet.position.z > -10000-1000 && jet.position.z < -10000+1000){
                landing = true;
                landnum = 1
            }
            else if(jet.position.z > -17500-1000 && jet.position.z < -17500+1000){
                landing = true;
                landnum = 4
            }
            else{
                landing = false;
            }
        }
        //R
        else if(jet.position.x > 4000-1000 && jet.position.x < 4000+1000){
            if(jet.position.z > -12500-1000 && jet.position.z < -12500+1000){
                landing = true;
                landnum = 2
            }
            else{
                landing = false;
            }
        }
        //L
        else if(jet.position.x > -5000-2000 && jet.position.x < -5000+2000){
            if(jet.position.z > -15000-1000 && jet.position.z < -15000+1000){
                landing = true;
                landnum = 3
            }
            else{
                landing = false;
            }
        }
        else{
            landing = false;
        }

        if(landing == true){
            document.getElementById("stop").style.display = 'block';
        }
        else{
            document.getElementById("stop").style.display = 'none';
        }
    }
    else{
        document.getElementById("stop").style.display = 'none';
    }

    //update land ui
    updateLandMap();
}

//Update Text Location
drawText();

//Walls
const geometryw = new THREE.BoxGeometry(30,5000,endOfWorld);
const materialw = new THREE.MeshBasicMaterial({color: 0x2e1133});
const leftWall = new THREE.Mesh(geometryw, materialw);
const rightWall = new THREE.Mesh(geometryw, materialw);
leftWall.position.set(3000,-100,-1500);
leftWall.rotation.y = -0.318
rightWall.position.set(-3000,-100,-1500);
rightWall.rotation.y = 0.318;

const outline_g = new THREE.BoxGeometry(500 , 5000 , -endOfWorld );
const outline_m = new THREE.MeshBasicMaterial({
  color: 0x1E2230,
  side: THREE.BackSide
});
const outline = new THREE.Mesh(outline_g, outline_m);

leftWall.add(outline.clone());
rightWall.add(outline.clone());
scene.add(leftWall);
scene.add(rightWall);


//Marker generation
drawMarkers();

//Crystals
spawnCrystals();

function animate() {

    requestAnimationFrame(animate);

    if(countdown == 0){
        loading = false;
    }

    //Change MS based on framerate
    var deltaTime=clock.getDelta();
    var iJetspeed;
    var iPlayerSpeed;

    if(crystalsCollected==0){
        baseJetspeed = -12.5*deltaTime*deltaMultiplier;
        baseMoveSpeed = -iBaseJetspeed*0.4*deltaTime*deltaMultiplier*9/10;
        basePlayerSpeed = 5*deltaTime*deltaMultiplier;
        playerSpeed = Math.round(basePlayerSpeed * Math.pow(1.1,crystalsCollected));
        moveSpeed = Math.round(baseMoveSpeed * Math.pow(1.1,crystalsCollected));
        jetspeed = Math.round(baseJetspeed * Math.pow(1.1,crystalsCollected));
        iPlayerSpeed = iBasePlayerSpeed;
        iJetspeed = iBaseJetspeed;
    
    }

    else if(crystalsCollected!=0){
        baseJetspeed = -12.5*deltaTime*deltaMultiplier;
        baseMoveSpeed = -iBaseJetspeed*0.4*deltaTime*deltaMultiplier*9/10;
        basePlayerSpeed = 5*deltaTime*deltaMultiplier;
        playerSpeed = Math.round(basePlayerSpeed * Math.pow(1.1,crystalsCollected));
        moveSpeed = Math.round(baseMoveSpeed * Math.pow(1.1,crystalsCollected));
        jetspeed = Math.round(baseJetspeed * Math.pow(1.1,crystalsCollected));
        iPlayerSpeed = Math.round(iBasePlayerSpeed * Math.pow(1.1,crystalsCollected));
        iJetspeed = Math.round(iBaseJetspeed * Math.pow(1.1,crystalsCollected));
    }

    if(cameraMode == 0){
        document.getElementById("ms").textContent = -iJetspeed + " MS";
    }
    else if (cameraMode == 1){
        document.getElementById("ms").textContent = iPlayerSpeed + " MS";
    }
    
    //Input [Jet]
    if(jet != null && loading==false && lowres==false){
        if(cameraMode == 0){
            let dx = 0;
            if (moveLeft) {
                dx -= moveSpeed;
                if(jet.rotation.z<1){
                    jet.rotation.z += 0.01
                }
            }
            else if (moveRight) {
                dx += moveSpeed;
                if(jet.rotation.z>-1){
                    jet.rotation.z -= 0.01
                }
            }
            else{
                if(jet.rotation.z<0){
                    jet.rotation.z += 0.005
                }
                else if(jet.rotation.z>0){
                    jet.rotation.z -= 0.005
                }
            }

            //Apply Movement
            jet.position.set(jet.position.x + dx, jet.position.y, jet.position.z);
            jet.position.z += jetspeed;

            //Reset position
            if(jet.position.z <= endOfWorld){
                jet.position.set(jet.position.x/10.0,jet.position.y,jetZ-1000);
                if(world==maxWorlds){
                    world=-1;
                }
                if(world<maxWorlds){
                    world++;
                }
                resetParticles();
            }
        }

        //Input [Player]
        if(cameraMode == 1){
            let dx = 0;
            let dz = 0;
            
            if (playerUp == true) {
                dz -= playerSpeed;
            }
            else if (playerDown == true) {
                dz += playerSpeed;
            }
            else{
                dz = 0;
            }
            if (playerRight == true) {
                dx += playerSpeed;
            }
            else if (playerLeft == true) {
                dx -= playerSpeed;
            }
            else{
                dx = 0;
            }

            //Apply Movement
            sphere.position.set(sphere.position.x + dx, sphere.position.y, sphere.position.z+dz);
            limitMovement();   

        } 
        

        alertLanding();
        handleCollision();
        updateCamera();
        updateParticles();
        updateJetText();
    }

    function limitMovement(){

        if(landnum == 0){
            if(sphere.position.x >= 800){
                sphere.position.x = 795;
            }
            if(sphere.position.x <= -800){
                sphere.position.x = -795;
            }
            if(sphere.position.z >= 800){
                sphere.position.z = 795;
            }
            if(sphere.position.z <= -800){
                sphere.position.z = -795;
            }
        }
        else if(landnum == 1){
            if(sphere.position.x >= 800){
                sphere.position.x = 795;
            }
            if(sphere.position.x <= -800){
                sphere.position.x = -795;
            }
            if(sphere.position.z <= -10800){
                sphere.position.z = -10795;
            }
            if(sphere.position.z >= -9200){
                sphere.position.z = -9205;
            }
        }
        else if(landnum == 2){
            if(sphere.position.x >= 4800){
                sphere.position.x = 4795;
            }
            if(sphere.position.x <= 3200){
                sphere.position.x = 3205;
            }
            if(sphere.position.z <= -13300){
                sphere.position.z = -13295;
            }
            if(sphere.position.z >= -11700){
                sphere.position.z = -11705;
            }
        }
        else if(landnum == 3){
            if(sphere.position.x <= -5800){
                sphere.position.x = -5795;
            }
            if(sphere.position.x >= -4200){
                sphere.position.x = -4205;
            }
            if(sphere.position.z <= -15800){
                sphere.position.z = -15795;
            }
            if(sphere.position.z >= -14200){
                sphere.position.z = -14205;
            }
        }
        else if(landnum == 4){
            if(sphere.position.x >= 800){
                sphere.position.x = 795;
            }
            if(sphere.position.x <= -800){
                sphere.position.x = -795;
            }
            if(sphere.position.z <= -18300){
                sphere.position.z = -18295;
            }
            if(sphere.position.z >= -16700){
                sphere.position.z = -16705;
            }
        }
    }

    if(loading == false){

        //mute
        if(muted == false && startMusic == true){
            if(initMusic == false){
                initMusic = true;
                background.play();
                sfx.play();
            }
            if(cameraMode == 0){
                background.setVolume(0.15);
                sfx.setVolume(0.03);
            }
            else{
                background.setVolume(0.05);
                sfx.setVolume(0.0);
            }
            document.getElementById("activeSong").style.display = 'block';
            document.getElementById("mutedText").textContent = "Unmuted";
        }
        else if(muted == true){
            background.setVolume(0.0);
            sfx.setVolume(0.0);
            document.getElementById("activeSong").style.display = 'none';
            document.getElementById("mutedText").textContent = "Muted";
        }

        crystalCollision();

        //World Config
        updateWorldMap();
        resetTempWorlds();

        if(window.innerWidth < 700 || window.innerHeight < 400){
            lowres = true;
        }
        else if(window.innerWidth >= 700 && window.innerHeight >= 400){
            lowres = false;
        }

        if(loading == true || lowres == true){
            document.getElementById("loading").style.display = 'block';
        }
        else if(loading == false && lowres == false){
            document.getElementById("loading").style.display = 'none';
        }

        if(loading == false || lowres == true){
            updateUI();
        }

        if(cameraMode == 0){
            renderer.render(scene, camera);
        }
        else if(cameraMode == 1){
            renderer.render(scene, cameratop);
        }
    }
}

animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    cameratop.aspect = window.innerWidth / window.innerHeight;
    cameratop.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

    return false;
}