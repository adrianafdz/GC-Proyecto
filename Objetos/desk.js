import * as THREE from "../three.module.js";

// Torre
export function crearDesk() {
    const desk = new THREE.Group();

    const mWood = new THREE.MeshBasicMaterial({color: "rgb(160,82,45)"});
    const mPlatic = new THREE.MeshBasicMaterial({color: "gray"});

    const side1 = new THREE.Mesh(new THREE.BoxGeometry(0.5,8,10), mPlatic);
    const side2 = side1.clone();
    const table = new THREE.Mesh(new THREE.BoxGeometry(22,0.5,11), mWood);

    side2.position.x = 20;
    table.position.x = 10;
    table.position.y = 4;

    desk.add(side1);
    desk.add(side2);
    desk.add(table);

    return desk;
}