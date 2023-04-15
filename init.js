import {loading,lowres} from "./app.js";

function createStats() {
    let stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';
    stats.domElement.style.display = 'none';

    return stats;
}

export function startInit(){
    const stats = createStats();
    document.body.appendChild( stats.domElement );

    function update() {
        if(loading == true || lowres == true){
            stats.domElement.style.display = 'none';
        }
        else if(loading == false && lowres == false){
            stats.domElement.style.display = 'block';
        }
        requestAnimationFrame(update);
        stats.update();
    }

    update();
}
