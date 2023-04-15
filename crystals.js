import * as THREE from "three";

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import {jetY, jet, sphere, scene, manager, cameraMode, loading, world} from "./app.js";
import {setPos0,setPos1,setPos2,setPos3,updatePos0,updatePos1,updatePos2,updatePos3} from "./interface.js";

export var crystalsCollected = 0;
var crystralScale = 40;
var crystal1,crystal2,crystal3,crystal4,crystal5,crystal6,crystal7,crystal8,crystal9,crystal10;
var crytalSize = 40;

export function spawnCrystals(){

    const loader = new GLTFLoader(manager);

    //Crystal 1 - World 1
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal1 = gltf.scene;
        crystal1.position.set( 500,jetY-50,-650);
        crystal1.scale.set(crystralScale, crystralScale, crystralScale);
        scene.add(crystal1);
    }, undefined, function ( error ) {
        console.error( error );
    } );

    //Crystal 2 - World 1
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal2 = gltf.scene;
        crystal2.position.set( 300+9999, jetY-50+9999, -17000+9999);
        crystal2.scale.set(crystralScale , crystralScale, crystralScale);
        scene.add(crystal2);
    }, undefined, function ( error ) {
        console.error( error );
    } );

    //Crystal 3 - World 2
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal3 = gltf.scene;
        crystal3.position.set( -400+9999, jetY-50+9999, -10200+9999);
        crystal3.scale.set(crystralScale , crystralScale, crystralScale);
        scene.add(crystal3);
    }, undefined, function ( error ) {
        console.error( error );
    } );

    //Crystal 4 - World 2
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal4 = gltf.scene;
        crystal4.position.set( 4000+9999, jetY-50+9999, -12500+9999);
        crystal4.scale.set(crystralScale , crystralScale, crystralScale);
        scene.add(crystal4);
    }, undefined, function ( error ) {
        console.error( error );
    } );

    //Crystal 5 - World 3
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal5 = gltf.scene;
        crystal5.position.set( -600+9999, jetY-50+9999, -10000+9999);
        crystal5.scale.set(crystralScale , crystralScale, crystralScale);
        scene.add(crystal5);
    }, undefined, function ( error ) {
        console.error( error );
    } );

    //Crystal 6 - World 3
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal6 = gltf.scene;
        crystal6.position.set( -5200+9999, jetY-50+9999, -15200+9999);
        crystal6.scale.set(crystralScale , crystralScale, crystralScale);
        scene.add(crystal6);
    }, undefined, function ( error ) {
        console.error( error );
    } );

    //Crystal 7 - World 3
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal7 = gltf.scene;
        crystal7.position.set( 600+9999, jetY-50+9999, -18200+9999);
        crystal7.scale.set(crystralScale , crystralScale, crystralScale);
        scene.add(crystal7);
    }, undefined, function ( error ) {
        console.error( error );
    } );

    //Crystal 8 - World 3
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal8 = gltf.scene;
        crystal8.position.set( 4200+9999, jetY-50+9999, -12300+9999);
        crystal8.scale.set(crystralScale , crystralScale, crystralScale);
        scene.add(crystal8);
    }, undefined, function ( error ) {
        console.error( error );
    } );

    //Crystal 9 - World 4
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal9 = gltf.scene;
        crystal9.position.set( 1000, jetY-50, -13500);
        crystal9.scale.set(crystralScale , crystralScale, crystralScale);
        scene.add(crystal9);
    }, undefined, function ( error ) {
        console.error( error );
    } );

    //Crystal 10 - World 1
    loader.load( '/meshes/crystal.glb', function ( gltf ) {
        crystal10 = gltf.scene;
        crystal10.position.set( -2500+9999, jetY-50+9999, -7500+9999);
        crystal10.scale.set(crystralScale , crystralScale, crystralScale);
        scene.add(crystal10);
    }, undefined, function ( error ) {
        console.error( error );
    } );
}

export function crystalCollision(){
    if(loading == false){
        switch (world){
            case 0:
                if(setPos0 == true){
                    updatePos0();
                    if(crystal1!=null){
                        crystal1.position.set(crystal1.position.x, crystal1.position.y, crystal1.position.z);
                    }
                    if(crystal2!=null){
                        crystal2.position.set(crystal2.position.x-9999, crystal2.position.y-9999, crystal2.position.z-9999);
                    }
                    if(crystal9!=null){
                        crystal9.position.set(crystal9.position.x+9999, crystal9.position.y+9999, crystal9.position.z+9999);
                    }
                    if(crystal10!=null){
                        crystal10.position.set(crystal10.position.x-9999, crystal10.position.y-9999, crystal10.position.z-9999);
                    }
                }
                break;
            case 1:
                if(setPos1 == true){
                    updatePos1();
                    if(crystal1!=null){
                        crystal1.position.set(crystal1.position.x, crystal1.position.y, crystal1.position.z);
                    }
                    if(crystal2!=null){
                        crystal2.position.set(crystal2.position.x+9999, crystal2.position.y+9999, crystal2.position.z+9999);
                    }
                    if(crystal3!=null){
                        crystal3.position.set(crystal3.position.x-9999, crystal3.position.y-9999, crystal3.position.z-9999);
                    }
                    if(crystal4!=null){
                        crystal4.position.set(crystal4.position.x-9999, crystal4.position.y-9999, crystal4.position.z-9999);
                    }
                    if(crystal10!=null){
                        crystal10.position.set(crystal10.position.x+9999, crystal10.position.y+9999, crystal10.position.z+9999);
                    }
                }
                break;
            case 2:
                if(setPos2 == true){
                    updatePos2();
                    if(crystal3!=null){
                        crystal3.position.set(crystal3.position.x+9999, crystal3.position.y+9999, crystal3.position.z+9999);
                    }
                    if(crystal4!=null){
                        crystal4.position.set(crystal4.position.x+9999, crystal4.position.y+9999, crystal4.position.z-9999);
                    }
                    if(crystal5!=null){
                        crystal5.position.set(crystal5.position.x-9999, crystal5.position.y-9999, crystal5.position.z-9999);
                    }
                    if(crystal6!=null){
                        crystal6.position.set(crystal6.position.x-9999, crystal6.position.y-9999, crystal6.position.z-9999);
                    }
                    if(crystal7!=null){
                        crystal7.position.set(crystal7.position.x-9999, crystal7.position.y-9999, crystal7.position.z-9999);
                    }
                    if(crystal8!=null){
                        crystal8.position.set(crystal8.position.x-9999, crystal8.position.y-9999, crystal8.position.z-9999);
                    }
                }
                break;
            case 3:
                if(setPos3 == true){
                    updatePos3();
                    if(crystal5!=null){
                        crystal5.position.set(crystal5.position.x+9999, crystal5.position.y+9999, crystal5.position.z+9999);
                    }
                    if(crystal6!=null){
                        crystal6.position.set(crystal6.position.x+9999, crystal6.position.y+9999, crystal6.position.z+9999);
                    }
                    if(crystal7!=null){
                        crystal7.position.set(crystal7.position.x+9999, crystal7.position.y+9999, crystal7.position.z+9999);
                    }
                    if(crystal8!=null){
                        crystal8.position.set(crystal8.position.x+9999, crystal8.position.y+9999, crystal8.position.z+9999);
                    }
                    if(crystal9!=null){
                        crystal9.position.set(crystal9.position.x-9999, crystal9.position.y-9999, crystal9.position.z-9999);
                    }
                }
                break;
        }
        if(crystal1!=null){
            const minPointc1 = new THREE.Vector3(crystal1.position.x-crytalSize, crystal1.position.y-crytalSize, 
                crystal1.position.z-crytalSize);
            const maxPointc1 = new THREE.Vector3(crystal1.position.x+crytalSize, crystal1.position.y+crytalSize, 
                crystal1.position.z+crytalSize);
            const crystalBoundsc1 = new THREE.Box3(minPointc1, maxPointc1);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc1)){
                    scene.remove(crystal1);
                    crystal1 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc1)){
                    scene.remove(crystal1);
                    crystal1 = null;
                    crystalsCollected++;
                }
            }
        }
        if(crystal2!=null){
            const minPointc2 = new THREE.Vector3(crystal2.position.x-crytalSize, crystal2.position.y-crytalSize, 
                crystal2.position.z-crytalSize);
            const maxPointc2 = new THREE.Vector3(crystal2.position.x+crytalSize, crystal2.position.y+crytalSize, 
                crystal2.position.z+crytalSize);
            const crystalBoundsc2 = new THREE.Box3(minPointc2, maxPointc2);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc2)){
                    scene.remove(crystal2);
                    crystal2 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc2)){
                    scene.remove(crystal2);
                    crystal2 = null;
                    crystalsCollected++;
                }
            }
        }
        if(crystal3!=null){
            const minPointc3 = new THREE.Vector3(crystal3.position.x-crytalSize, crystal3.position.y-crytalSize, 
                crystal3.position.z-crytalSize);
            const maxPointc3 = new THREE.Vector3(crystal3.position.x+crytalSize, crystal3.position.y+crytalSize, 
                crystal3.position.z+crytalSize);
            const crystalBoundsc3 = new THREE.Box3(minPointc3, maxPointc3);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc3)){
                    scene.remove(crystal3);
                    crystal3 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc3)){
                    scene.remove(crystal3);
                    crystal3 = null;
                    crystalsCollected++;
                }
            }
        }
        if(crystal4!=null){
            const minPointc4 = new THREE.Vector3(crystal4.position.x-crytalSize, crystal4.position.y-crytalSize, 
                crystal4.position.z-crytalSize);
            const maxPointc4 = new THREE.Vector3(crystal4.position.x+crytalSize, crystal4.position.y+crytalSize, 
                crystal4.position.z+crytalSize);
            const crystalBoundsc4 = new THREE.Box3(minPointc4, maxPointc4);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc4)){
                    scene.remove(crystal4);
                    crystal4 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc4)){
                    scene.remove(crystal4);
                    crystal4 = null;
                    crystalsCollected++;
                }
            }
        }
        if(crystal5!=null){
            const minPointc5 = new THREE.Vector3(crystal5.position.x-crytalSize, crystal5.position.y-crytalSize, 
                crystal5.position.z-crytalSize);
            const maxPointc5 = new THREE.Vector3(crystal5.position.x+crytalSize, crystal5.position.y+crytalSize, 
                crystal5.position.z+crytalSize);
            const crystalBoundsc5 = new THREE.Box3(minPointc5, maxPointc5);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc5)){
                    scene.remove(crystal5);
                    crystal5 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc5)){
                    scene.remove(crystal5);
                    crystal5 = null;
                    crystalsCollected++;
                }
            }
        }
        if(crystal6!=null){
            const minPointc6 = new THREE.Vector3(crystal6.position.x-crytalSize, crystal6.position.y-crytalSize, 
                crystal6.position.z-crytalSize);
            const maxPointc6 = new THREE.Vector3(crystal6.position.x+crytalSize, crystal6.position.y+crytalSize, 
                crystal6.position.z+crytalSize);
            const crystalBoundsc6 = new THREE.Box3(minPointc6, maxPointc6);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc6)){
                    scene.remove(crystal6);
                    crystal6 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc6)){
                    scene.remove(crystal6);
                    crystal6 = null;
                    crystalsCollected++;
                }
            }
        }
        if(crystal7!=null){
            const minPointc7 = new THREE.Vector3(crystal7.position.x-crytalSize, crystal7.position.y-crytalSize, 
                crystal7.position.z-crytalSize);
            const maxPointc7 = new THREE.Vector3(crystal7.position.x+crytalSize, crystal7.position.y+crytalSize, 
                crystal7.position.z+crytalSize);
            const crystalBoundsc7 = new THREE.Box3(minPointc7, maxPointc7);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc7)){
                    scene.remove(crystal7);
                    crystal7 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc7)){
                    scene.remove(crystal7);
                    crystal7 = null;
                    crystalsCollected++;
                }
            }
        }
        if(crystal8!=null){
            const minPointc8 = new THREE.Vector3(crystal8.position.x-crytalSize, crystal8.position.y-crytalSize, 
                crystal8.position.z-crytalSize);
            const maxPointc8 = new THREE.Vector3(crystal8.position.x+crytalSize, crystal8.position.y+crytalSize, 
                crystal8.position.z+crytalSize);
            const crystalBoundsc8 = new THREE.Box3(minPointc8, maxPointc8);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc8)){
                    scene.remove(crystal8);
                    crystal8 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc8)){
                    scene.remove(crystal8);
                    crystal8 = null;
                    crystalsCollected++;
                }
            }
        }
        if(crystal9!=null){
            const minPointc9 = new THREE.Vector3(crystal9.position.x-crytalSize, crystal9.position.y-crytalSize, 
                crystal9.position.z-crytalSize);
            const maxPointc9 = new THREE.Vector3(crystal9.position.x+crytalSize, crystal9.position.y+crytalSize, 
                crystal9.position.z+crytalSize);
            const crystalBoundsc9 = new THREE.Box3(minPointc9, maxPointc9);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc9)){
                    scene.remove(crystal9);
                    crystal9 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc9)){
                    scene.remove(crystal9);
                    crystal9 = null;
                    crystalsCollected++;
                }
            }
        }
        if(crystal10!=null){
            const minPointc10 = new THREE.Vector3(crystal10.position.x-crytalSize, crystal10.position.y-crytalSize, 
                crystal10.position.z-crytalSize);
            const maxPointc10 = new THREE.Vector3(crystal10.position.x+crytalSize, crystal10.position.y+crytalSize, 
                crystal10.position.z+crytalSize);
            const crystalBoundsc10 = new THREE.Box3(minPointc10, maxPointc10);

            if(cameraMode == 1){
                const sphereBounds = new THREE.Sphere(new THREE.Vector3(), 16);
                sphereBounds.center = sphere.position;
                if(sphereBounds.intersectsBox(crystalBoundsc10)){
                    scene.remove(crystal10);
                    crystal10 = null;
                    crystalsCollected++;
                }
            }
    
            if(cameraMode == 0){
                const minPointJ = new THREE.Vector3(jet.position.x-20, jet.position.y-20, jet.position.z-20);
                const maxPointJ = new THREE.Vector3(jet.position.x+20, jet.position.y+20, jet.position.z+20);
                const jetBounds = new THREE.Box3(minPointJ, maxPointJ);
                if(jetBounds.intersectsBox(crystalBoundsc10)){
                    scene.remove(crystal10);
                    crystal10 = null;
                    crystalsCollected++;
                }
            }
        }
    }
}