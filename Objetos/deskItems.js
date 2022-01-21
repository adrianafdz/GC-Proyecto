import * as THREE from "../three.module.js";

export function crearMonitor() {
    console.log("crear monitor")
    const whole = new THREE.Group();

    const mMonitor = new THREE.MeshBasicMaterial({color: 'black'});
    const pantallaOut = new THREE.Mesh(new THREE.BoxGeometry(10,4,0.25), mMonitor);

    pantallaOut.position.z = -0.2;

    const baseArc = new THREE.Mesh(new THREE.TorusGeometry(2,0.2,5,10,3), mMonitor);
    baseArc.rotation.x = - Math.PI  / 2;
    baseArc.position.y = -3;
    baseArc.position.z = 1;

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2,2),mMonitor)
    base.position.y = -2;
    base.position.z = -0.5;

    whole.add(pantallaOut);
    whole.add(baseArc);
    whole.add(base);

    return whole;
}

export function crearTeclado() {
    const teclado = new THREE.Mesh(new THREE.BoxGeometry(6,0.5,2), new THREE.MeshBasicMaterial({color: 'aliceblue'}));
    return teclado;
}