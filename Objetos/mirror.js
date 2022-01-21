import * as THREE from "../three.module.js";

export function crearEspejo() {
    const whole = new THREE.Group();

    const mWood = new THREE.MeshBasicMaterial({color: "rgb(89,60,31)"});
    const back = new THREE.Shape();

    const x = 0, y = 0;

    back.arc(x, y, 6, 0, Math.PI, false);
    back.lineTo(x-6, y-11);
    back.lineTo(x+6, y-11);

    const geoBack = new THREE.ExtrudeGeometry( back, {depth: 0.25} );
    const meshBack = new THREE.Mesh( geoBack, mWood ) ;

    const mMirror = new THREE.MeshBasicMaterial({color: "lightgray"});
    const front = new THREE.Shape();

    front.arc(x, y, 5, 0, Math.PI, false);
    front.lineTo(x-5, y-10);
    front.lineTo(x+5, y-10);

    const geoFront = new THREE.ExtrudeGeometry( front, {depth: 0.25} );
    const meshFront = new THREE.Mesh( geoFront, mMirror ) ;
    meshFront.position.z = 0.1;

    whole.add(meshBack);
    whole.add(meshFront);

    return whole;
}