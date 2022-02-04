import * as THREE from "../three.module.js";
import CSG from "../three-csg.js";

// Función para crear la torre para gato
export function crearTorre() {
    const torre = new THREE.Group();

    // Pisos
    const textureTela = new THREE.TextureLoader().load( '../img/tela.jpg' );
    const mLevel = new THREE.MeshLambertMaterial( { map: textureTela } );

    const topLevel = new THREE.BoxGeometry(5,0.2,5);

    const level11 = new THREE.Mesh(topLevel, mLevel);
    const level12 = new THREE.Mesh(topLevel, mLevel);
    const level21 = new THREE.Mesh(new THREE.BoxGeometry(6.5,0.2,5), mLevel);

    const floor = new THREE.Mesh(new THREE.BoxGeometry(12,0.2,5), mLevel);

    level12.position.x = 5.5;
    level21.position.x = 0.5;
    level21.position.y = -4.5;
    floor.position.y = -12;
    floor.position.x = 3;

    torre.add(level11);
    torre.add(level12);
    torre.add(level21);
    torre.add(floor);

    level11.castShadow = true;
    level12.castShadow = true;
    level21.castShadow = true
    floor.castShadow = true;

    level11.receiveShadow = true;
    level12.receiveShadow = true;
    level21.receiveShadow = true;
    floor.receiveShadow = true;

    // Caja
    let outsideBox = new THREE.Mesh(new THREE.BoxGeometry(6,5,5), mLevel)
    let insideBox = new THREE.Mesh(new THREE.BoxGeometry(5.6,4.6,2.6), new THREE.MeshBasicMaterial({color: "black"}));
    let subbox = new THREE.Mesh(new THREE.BoxGeometry(4,6,6)); // caja para cortar las otras dos

    outsideBox.position.x = 5;
    outsideBox.position.y = -8;
    insideBox.position.x = 5;
    insideBox.position.y = -8;

    subbox.position.set(1, -8, 1.5);
    subbox.rotation.y = 0.75;

    outsideBox.updateMatrix();
    insideBox.updateMatrix();
    subbox.updateMatrix();
    
    let bspA = CSG.fromMesh( outsideBox ); 
    let bspB = CSG.fromMesh( insideBox );                   
    let bspC = CSG.fromMesh( subbox );

    let bspResult1 = bspA.subtract(bspC);
    let bspResult2 = bspB.subtract(bspC);

    let meshResult1 = CSG.toMesh( bspResult1, outsideBox.matrix, outsideBox.material );
    let meshResult2 = CSG.toMesh( bspResult2, insideBox.matrix, insideBox.material );
    
    meshResult2.position.x -= 0.1;

    meshResult1.castShadow = true;
    meshResult2.castShadow = true;
    meshResult1.receiveShadow = true;
    meshResult2.receiveShadow = true;

    torre.add(meshResult1);
    torre.add(meshResult2);

    // Tubos
    const textureTubo = new THREE.TextureLoader().load( '../img/mecate.jpg' );
    textureTubo.wrapT = THREE.RepeatWrapping;
    textureTubo.repeat.y = 10;

    const mTubo = new THREE.MeshLambertMaterial( { map: textureTubo } );
    const gTubo = new THREE.CylinderGeometry(0.5, 0.5, 12, 30);

    const tubo1 = new THREE.Mesh(gTubo,mTubo);
    const tubo2 = new THREE.Mesh(gTubo,mTubo);
    const tubo3 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1, 30), mTubo);

    tubo1.position.y = -6;
    tubo2.position.x = 6;
    tubo2.position.y = -6;
    tubo3.position.y = -5;
    tubo3.position.x = 3;

    tubo1.castShadow = true;
    tubo2.castShadow = true;
    tubo3.castShadow = true;
    tubo1.receiveShadow = true;
    tubo2.receiveShadow = true;
    tubo3.receiveShadow = true;

    torre.add(tubo1);
    torre.add(tubo2);
    torre.add(tubo3);

    return torre;
}