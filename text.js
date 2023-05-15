import * as THREE from "three";

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

import {scene,manager,world} from "./app.js";

var initialLoading = true;

function createText(text, type, size, height, px, py, pz, rx, ry, rz, color){

    let textMesh;
    const geometry = new TextGeometry(text, {
        font: type,
        size: size,
        height: height,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const material = new THREE.MeshBasicMaterial(color);
    textMesh = new THREE.Mesh(geometry, material);
    textMesh.rotation.set(rx, ry, rz);
    textMesh.position.set(px, py, pz);

    return textMesh;

}

export function drawText(){
    var o1,o2,o3,o4;
    var l1,l2,l3,l4;


    const loaderf = new FontLoader(manager);
    loaderf.load('https://threejs.org/examples/fonts/optimer_bold.typeface.json', function (font) {

        if(initialLoading == true){
            initialLoading = false;

            //o1 = createText('RishiJSD Resume',
                //font,75,2,-100,0,400,-Math.PI/2,0,0,{ color: 0x483d8b });
            //o2 = createText('Website Updated Regularly \n Press spacebar -> jet \n Press ESC -> return to origin',
                //font,30,2,650,50,550,-Math.PI/3,0,0,{ color: 0xff0000 });
            //o3 = createText('10 Crystals are located in essential \n parts of this resume. Each one grants \n  10% Increased Movement Speed.',
                //font,30,2,-650,50,550,-Math.PI/3,0,0,{ color: 0xFFFF00 });
            o4 = createText('          Introduction   Expertise   Aspiration    \n GameDev   Projects   Music   Graphics   Design',
                font,20,1,-25,40,650,-Math.PI/2,0,0,{ color: 0x00FFFF });

            scene.add(o1);
            scene.add(o2);
            scene.add(o3);
            scene.add(o4);

            l1 = createText('FIRST MIDDLE',
                font,200,25,-800,0,-10400,-Math.PI/4,0,0,{ color: 0x9F2305 });
            l2 = createText('RIGHT',
                font,200,25,3200,0,-12900,-Math.PI/4,0,0,{ color: 0x9F2305 });
            l3 = createText('LEFT',
                font,200,25,-5800,0,-15400,-Math.PI/4,0,0,{ color: 0x9F2305 });
            l4 = createText('LAST MIDDLE',
                font,200,25,-800,0,-17900,-Math.PI/4,0,0,{ color: 0x9F2305 });

            scene.add(l1);
            scene.add(l2);
            scene.add(l3);
            scene.add(l4);

        }

    });
}