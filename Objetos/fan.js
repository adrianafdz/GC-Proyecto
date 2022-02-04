import * as THREE from "../three.module.js";

// Función para crear un aspa de madera y el tubo que la conecta al centro del abanico 
function crearAspa() {
    const whole = new THREE.Group();

    const textureWood = new THREE.TextureLoader().load( '../img/wood.jpg' );
    const mWood = new THREE.MeshLambertMaterial( { map: textureWood } );
    const aspa = new THREE.Shape();

    const x = 0, y = 0;

    aspa.arc(x, y - 3, 1, 0, Math.PI, false);
    aspa.arc(x+1, y - 7, 1, Math.PI, 0, false);

    const geometry = new THREE.ExtrudeGeometry( aspa, {depth: 0.25} );
    const meshAspa = new THREE.Mesh( geometry, mWood ) ;

    const mMetal = new THREE.MeshPhongMaterial({color: "black"});
    const palo = new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,3,20), mMetal);

    palo.position.y = -1;

    whole.add(palo);
    whole.add(meshAspa);

    whole.rotation.x = Math.PI / 2;

    return whole;
}

// Torre
export function crearFan() {
    const fan = new THREE.Group();
    
    for (let i=0; i<5; i++) {
        let aspa = crearAspa();
        aspa.rotation.z = (i * 2 * Math.PI) / 5;
        fan.add(aspa);
    }

    const mMetal = new THREE.MeshPhongMaterial({color: "black"});
    const center = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,2,20), mMetal);

    const baseFoco = new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,20), mMetal);
    baseFoco.position.z = 1;

    const foco = new THREE.Mesh(new THREE.SphereGeometry(0.65,15,15), new THREE.MeshBasicMaterial({color: 0xFFFACD}));
    foco.position.y = -1.5;

    baseFoco.receiveShadow = true;
    baseFoco.castShadow = true;
    center.receiveShadow = true;
    center.castShadow = true;

    fan.add(baseFoco);
    fan.add(center);
    fan.add(foco);
    
    return fan;
}