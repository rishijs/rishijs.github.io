import * as THREE from "three";

import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';

import {scene, renderer, world} from "./app.js";

import {setworld0, setworld1, setworld2, setworld3,worldsTraversed} from "./interface.js";

let water;
var skyUniforms;

export function renderLayout(){
    //water
    const waterPlane = new THREE.PlaneGeometry( 100000, 100000 );
    water = new Water(waterPlane,
    {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load( '/textures/Water_1_M_Normal.jpg', function ( watertext ) {
            watertext.wrapS = watertext.wrapT = THREE.RepeatWrapping;
        } ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 9,
        fog: true
    });
    water.rotation.x = - Math.PI / 2;
    water.position.y = -20
    scene.add(water);
    updateWater();

    //sky setup
    let sun = new THREE.Vector3();
    let sky = new Sky();
    sky.scale.setScalar( 100000 );
    scene.add(sky);
    skyUniforms = sky.material.uniforms;

    skyUniforms[ 'turbidity' ].value = 20;
    skyUniforms[ 'rayleigh' ].value = 2;
    skyUniforms[ 'mieCoefficient' ].value = 0.001;
    skyUniforms[ 'mieDirectionalG' ].value = 0.8;
    const parameters = {
        elevation: 2,
        azimuth: 180
    };
    
    //sky update
    let renderTarget;
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    function updateSun() {
        const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
        const theta = THREE.MathUtils.degToRad( parameters.azimuth );
        sun.setFromSphericalCoords( 1, phi, theta );
        sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
        water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();
        if ( renderTarget !== undefined ) renderTarget.dispose();
        renderTarget = pmremGenerator.fromScene( sky );
        scene.environment = renderTarget.texture;
    }
    scene.background = new THREE.Color(0x000000);
    updateSun();

    function updateScene(){
        requestAnimationFrame(updateScene);
        //Sky variance
        if(worldsTraversed<3){
            switch (world){
                case 0:      
                    skyUniforms[ 'turbidity' ].value = 10;
                    skyUniforms[ 'rayleigh' ].value = 0;
                    skyUniforms[ 'mieCoefficient' ].value = 0.001;
                    skyUniforms[ 'mieDirectionalG' ].value = 0.8;
                break;
            case 1:
                    skyUniforms[ 'turbidity' ].value = 10;
                    skyUniforms[ 'rayleigh' ].value = 2;
                    skyUniforms[ 'mieCoefficient' ].value = 0.001;
                    skyUniforms[ 'mieDirectionalG' ].value = 0.8;
                break;
            case 2:
                    skyUniforms[ 'turbidity' ].value = 10;
                    skyUniforms[ 'rayleigh' ].value = 4;
                    skyUniforms[ 'mieCoefficient' ].value = 0.001;
                    skyUniforms[ 'mieDirectionalG' ].value = 0.8;
                break;
            }
        }

        else if(worldsTraversed == 3){

            if(skyUniforms[ 'turbidity' ].value <= -175){
                skyUniforms[ 'turbidity' ].value += -0.1 / 10;
            }
            else if(skyUniforms[ 'turbidity' ].value <= 0){
                skyUniforms[ 'turbidity' ].value += -1.5 / 10;
            }
            else if(skyUniforms[ 'turbidity' ].value <= 20){
                skyUniforms[ 'turbidity' ].value += -0.25 / 10;
            }
        }
    }

    updateScene();
}

function updateWater(){
    requestAnimationFrame(updateWater);
    //Water Movement
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
}

function updateSky(){
    //sky setup
    let sun = new THREE.Vector3();
    let sky = new Sky();
    sky.scale.setScalar( 100000 );
    scene.add(sky);
    skyUniforms = sky.material.uniforms;   
    switch(world) {
        //World Colors
        case 0:
            if(setworld0){         
                skyUniforms[ 'turbidity' ].value = 10;
                skyUniforms[ 'rayleigh' ].value = 0;
                skyUniforms[ 'mieCoefficient' ].value = 0.001;
                skyUniforms[ 'mieDirectionalG' ].value = 0.8;
            }
            break;
        case 1:
            if(setworld1){
                skyUniforms[ 'turbidity' ].value = 10;
                skyUniforms[ 'rayleigh' ].value = 2;
                skyUniforms[ 'mieCoefficient' ].value = 0.001;
                skyUniforms[ 'mieDirectionalG' ].value = 0.8;
            }
            break;
        case 2:
            if(setworld2){
                skyUniforms[ 'turbidity' ].value = 10;
                skyUniforms[ 'rayleigh' ].value = 4;
                skyUniforms[ 'mieCoefficient' ].value = 0.001;
                skyUniforms[ 'mieDirectionalG' ].value = 0.8;
            }
            break;
        case 3:
            if(setworld3){
                skyUniforms[ 'turbidity' ].value = 5;
                skyUniforms[ 'rayleigh' ].value = 0;
                skyUniforms[ 'mieCoefficient' ].value = 0.005;
                skyUniforms[ 'mieDirectionalG' ].value = 0.5;
            }
            break;
    }
    const parameters = {
        elevation: 2,
        azimuth: 180
    };
}