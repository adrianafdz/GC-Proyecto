import * as THREE from "../three.module.js";
import { Reflector } from '../Reflector.js';

// Función para crear un espejo
export function crearEspejo() {
    const whole = new THREE.Group();

    // parte de madera
    const textureWood = new THREE.TextureLoader().load( '../img/wood.jpg' );
    const mWood = new THREE.MeshLambertMaterial( { map: textureWood } );
    const back = new THREE.Shape();

    const x = 0, y = 0;

    back.arc(x, y, 6, 0, Math.PI, false);
    back.lineTo(x-6, y-11);
    back.lineTo(x+6, y-11);

    const geoBack = new THREE.ExtrudeGeometry( back, {depth: 0.25} );
    const meshBack = new THREE.Mesh( geoBack, mWood ) ;

    // espejo
    const front = new THREE.Shape();

    front.arc(x, y, 5, 0, Math.PI, false);
    front.lineTo(x-5, y-10);
    front.lineTo(x+5, y-10);

    const geoFront = new THREE.ShapeGeometry( front );    

    const mMirror =  new Reflector( geoFront, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x777777
    } );

    mMirror.position.z = 0.5;

    meshBack.receiveShadow = true;
    meshBack.castShadow = true;

    whole.add(meshBack);
    whole.add(mMirror);

    return whole;
}