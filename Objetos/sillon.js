import * as THREE from "../three.module.js";

// Función para crear un sillon
export function crearSillon() {
    const sillon = new THREE.Group();

    const textureTela = new THREE.TextureLoader().load( '../img/sillon.jpg' );
    const mTela = new THREE.MeshBasicMaterial( { map: textureTela } );

    const mPata = new THREE.MeshBasicMaterial( { color: 'black' } );

    const pata1 = new THREE.Mesh(new THREE.BoxGeometry(1.5,4,1.5), mPata);
    const pata2 = pata1.clone()
    const pata3 = pata1.clone()
    const pata4 = pata1.clone()

    pata1.position.y = -2;
    pata1.position.x = -10;
    pata1.position.z = -3;

    pata2.position.y = -2;
    pata2.position.x = -10;
    pata2.position.z = 4.25;

    pata3.position.y = -2;
    pata3.position.x = 10;
    pata3.position.z = -3;

    pata4.position.y = -2;
    pata4.position.x = 10;
    pata4.position.z = 4.25;  
    
    const base = new THREE.Shape(); 

    const x = 0, y = 0;

    base.lineTo(x+22, y);
    base.lineTo(x+22, y-7);
    base.lineTo(x, y-7);

    const geoBase = new THREE.ExtrudeGeometry( base, {depth: 1.25, bevelThickness: 0.5, bevelSegments: 3} );
    const meshBase = new THREE.Mesh( geoBase, mTela ) ;

    const respaldo = new THREE.Shape(); 

    respaldo.lineTo(x+22, y);
    respaldo.lineTo(x+22, y-7);
    respaldo.lineTo(x, y-7);

    const geoResp = new THREE.ExtrudeGeometry( respaldo, {depth: 1.25, bevelThickness: 0.5, bevelSegments: 3} );
    const meshResp = new THREE.Mesh( geoResp, mTela ) ;

    meshResp.rotation.x = - Math.PI / 10;
    meshResp.position.y = 6.25;
    meshResp.position.x = -11;
    meshResp.position.z = -5.5;

    meshBase.rotation.x = Math.PI / 2;
    meshBase.position.y = 1;
    meshBase.position.x = -11;
    meshBase.position.z = 5;

    sillon.add(meshResp);
    sillon.add(meshBase);

    sillon.add(pata1);
    sillon.add(pata2);
    sillon.add(pata3);
    sillon.add(pata4);

    return sillon;
}