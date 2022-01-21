import * as THREE from "../three.module.js";
import CSG from "../three-csg.js";

// Torre
export function crearCuarto() {
    const room = new THREE.Group();

    const mWall = new THREE.MeshBasicMaterial({color: 'aliceblue'}); 
    const wall1 = new THREE.Mesh(new THREE.BoxGeometry(2, 30, 40), mWall);
    const wall2 = wall1.clone();
    const windowHole = new THREE.Mesh(new THREE.BoxGeometry(3, 12, 20));
    const wall3 = new THREE.Mesh(new THREE.BoxGeometry(62, 30, 2), mWall);

    wall1.position.x = -30;
    wall2.position.x = 30;
    windowHole.position.x = 30;
    wall3.position.z = -20;

    wall2.updateMatrix();
    windowHole.updateMatrix();

    let bspWall = CSG.fromMesh( wall2 ); 
    let bspWindow = CSG.fromMesh( windowHole ); 

    let bspResult = bspWall.subtract(bspWindow);

    let meshResultWindow = CSG.toMesh( bspResult, wall2.matrix, wall2.material );

    const wall4 = wall3.clone();
    const door = new THREE.Mesh(new THREE.BoxGeometry(10,30,3),new THREE.MeshBasicMaterial({color: 'rgb(139,69,19)'}));
    const doorHole = door.clone();

    wall4.position.z = 20;
    door.position.z = 20;
    door.position.x = -15;
    door.position.y = -1;
    doorHole.position.z = 20;
    doorHole.position.x = -15;
    doorHole.position.y = -10;

    wall4.updateMatrix();
    doorHole.updateMatrix();

    let bspWall4 = CSG.fromMesh( wall4 ); 
    let bspDoor = CSG.fromMesh( doorHole ); 

    let bspResultDoor = bspWall4.subtract(bspDoor);

    let meshResultDoor = CSG.toMesh( bspResultDoor, wall4.matrix, wall4.material );

    const roof = new THREE.Mesh(new THREE.BoxGeometry(62, 1, 42), new THREE.MeshBasicMaterial({
        color: "rgb(210,225,225)"
    }));
    roof.position.y = 15;

    room.add(wall1);
    room.add(meshResultWindow);
    room.add(wall3);
    room.add(meshResultDoor);
    room.add(roof)

    return room;
}