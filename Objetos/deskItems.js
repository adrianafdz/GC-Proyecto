import * as THREE from "../three.module.js";

// En este archivo se encuentran algunas funciones pequeñas para crear algunos objetos que van sobre el escritorio

export function crearMonitor() {
    const whole = new THREE.Group();

    const mMonitor = new THREE.MeshBasicMaterial({color: 'black'});
    const pantalla = new THREE.Mesh(new THREE.BoxGeometry(10,4,0.25), mMonitor);

    pantalla.position.z = -0.2;

    const baseArc = new THREE.Mesh(new THREE.TorusGeometry(2,0.2,5,10,3), mMonitor);
    baseArc.rotation.x = - Math.PI  / 2;
    baseArc.position.y = -3;
    baseArc.position.z = 1;

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2,2),mMonitor)
    base.position.y = -2;
    base.position.z = -0.5;

    whole.add(pantalla);
    whole.add(baseArc);
    whole.add(base);

    return whole;
}

export function crearTeclado() {
    const textureTeclado = new THREE.TextureLoader().load( '../img/keyboard.png' );
    const mTeclado = new THREE.MeshBasicMaterial( { map: textureTeclado } );

    const teclado = new THREE.Mesh(new THREE.BoxGeometry(6,0.25,2), mTeclado);
    return teclado;
}