import * as THREE from "../three.module.js";

// Función para crear un sillon
export function crearSillon() {
    const sillon = new THREE.Group();

    const textureTela = new THREE.TextureLoader().load( '../img/sillon.jpg' );
    const mTela = new THREE.MeshLambertMaterial( { map: textureTela } );

    const mPata = new THREE.MeshLambertMaterial( { color: 'black' } );

    const pata1 = new THREE.Mesh(new THREE.BoxGeometry(1.5,4,1.5), mPata);
    const pata2 = pata1.clone()
    const pata3 = pata1.clone()
    const pata4 = pata1.clone()

    pata1.position.set(-10, -2, -3);
    pata2.position.set(-10, -2, 4.25);
    pata3.position.set(10, -2, -3);
    pata4.position.set(10, -2, 4.25);
    
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
    meshResp.position.set(-11, 6.25, -5.5);

    meshBase.rotation.x = Math.PI / 2;
    meshBase.position.set(-11, 1, 5);

    pata1.receiveShadow = true;
    pata1.castShadow = true;
    pata2.receiveShadow = true;
    pata2.castShadow = true;
    pata3.receiveShadow = true;
    pata3.castShadow = true;
    pata4.receiveShadow = true;
    pata4.castShadow = true;
    meshResp.castShadow = true;
    meshBase.castShadow = true;

    sillon.add(meshResp);
    sillon.add(meshBase);

    sillon.add(pata1);
    sillon.add(pata2);
    sillon.add(pata3);
    sillon.add(pata4);

    return sillon;
}