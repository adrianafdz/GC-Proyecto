import * as THREE from "../three.module.js";

// Función para crear el escritorio
export function crearDesk() {
    const desk = new THREE.Group();

    const textureWood = new THREE.TextureLoader().load( '../img/wood.jpg' );
    const mWood = new THREE.MeshPhongMaterial( { map: textureWood } );

    const texturePlastic = new THREE.TextureLoader().load( '../img/plastic.jpg' );
    const mPlatic = new THREE.MeshLambertMaterial( { map: texturePlastic } );

    const side1 = new THREE.Mesh(new THREE.BoxGeometry(0.5,8,10), mPlatic);
    const side2 = side1.clone();
    const table = new THREE.Mesh(new THREE.BoxGeometry(22,0.5,11), mWood);

    side2.position.x = 20;
    table.position.x = 10;
    table.position.y = 4;

    side1.receiveShadow = true;
    side1.castShadow = true;
    side2.receiveShadow = true;
    side2.castShadow = true;
    table.receiveShadow = true;
    table.castShadow = true;

    desk.add(side1);
    desk.add(side2);
    desk.add(table);

    return desk;
}