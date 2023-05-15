import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import {scene,manager,endOfWorld} from "./app.js";

var markerCount = 10;

export function drawMarkers(){

    const loader = new GLTFLoader(manager);
    for (let i=2; i<markerCount; i++){
        loader.load( '/meshes/marker.glb', function ( gltf ) {
            let marker = gltf.scene;
            marker.scale.set( 80, 80, 80);
            marker.position.set(i*((Math.random() * 10)+(-1*endOfWorld/markerCount/3.3)),-80,-i*(-1*endOfWorld/markerCount));
            marker.rotation.set((Math.random() * 2)-1,(Math.random() * 2)-1,(Math.random() * 2)-1);
    
            let outline_geo = new THREE.IcosahedronGeometry(1+0.1, 1);
            let outline_mat = new THREE.MeshBasicMaterial({
            color : 0x110000, 
            side: THREE.BackSide});
            let outlineCube = new THREE.Mesh(outline_geo, outline_mat);
            marker.add(outlineCube);
    
            scene.add(marker);
        }, undefined, function ( error ) {
            console.error( error );
        } );
        loader.load( '/meshes/marker.glb', function ( gltf ) {
            let marker = gltf.scene;
            marker.scale.set( 80, 80, 80);
            marker.position.set(-i*((Math.random() * 10)+(-1*endOfWorld/markerCount/3.3)),-80,-i*(-1*endOfWorld/markerCount));
            marker.rotation.set((Math.random() * 2)-1,(Math.random() * 2)-1,(Math.random() * 2)-1);
    
            let outline_geo = new THREE.IcosahedronGeometry(1+0.1, 1);
            let outline_mat = new THREE.MeshBasicMaterial({
            color : 0x110000, 
            side: THREE.BackSide});
            let outlineCube = new THREE.Mesh(outline_geo, outline_mat);
            marker.add(outlineCube);
    
            scene.add(marker);
        }, undefined, function ( error ) {
            console.error( error );
        } );
        loader.load( '/meshes/marker.glb', function ( gltf ) {
            let marker = gltf.scene;
            marker.scale.set( 80, 80, 80);
            marker.position.set((Math.random() * 30)-15,-80,-i*(-1*endOfWorld/markerCount));
            marker.rotation.set((Math.random() * 2)-1,(Math.random() * 2)-1,(Math.random() * 2)-1);
            
            let outline_geo = new THREE.IcosahedronGeometry(1+0.1, 1);
            let outline_mat = new THREE.MeshBasicMaterial({
            color : 0x110000, 
            side: THREE.BackSide});
            let outlineCube = new THREE.Mesh(outline_geo, outline_mat);
            marker.add(outlineCube);
    
            scene.add(marker);
        }, undefined, function ( error ) {
            console.error( error );
        } );
    }
}