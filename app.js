import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { OBJLoader } from "./OBJLoader.js";
import { MTLLoader } from "./MTLLoader.js";
import { crearTorre } from "./Objetos/torre.js";
import { crearCuarto } from "./Objetos/room.js";
import { crearDesk } from "./Objetos/desk.js";
import { crearFan } from "./Objetos/fan.js";
import { crearEspejo } from "./Objetos/mirror.js";
import { crearSillon } from "./Objetos/sillon.js";
import * as Items from "./Objetos/deskItems.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

/*
const loader = new THREE.TextureLoader();
loader.load('./img/bg.jpg', (texture) => {
    scene.background = texture;
});
*/

const miny = 5;

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    5
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 60;
camera.position.y = 20;

// controles
const controls = new OrbitControls(camera, renderer.domElement);

controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});

// PAREDES
const textureFloor = new THREE.TextureLoader().load( './img/floor.jpg' );
textureFloor.wrapT = THREE.RepeatWrapping;
textureFloor.repeat.y = 8;
textureFloor.wrapS = THREE.RepeatWrapping;
textureFloor.repeat.x = 4;

const mFloor = new THREE.MeshBasicMaterial( { map: textureFloor, side: THREE.DoubleSide } );

const floor = new THREE.Mesh(new THREE.PlaneGeometry(150, 150), mFloor);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

const room = crearCuarto();
room.position.y = 15;
scene.add(room);

// TORRE
const torre = crearTorre();
torre.position.z = -15;
torre.position.x = -25;
torre.position.y = 12;
scene.add(torre);

// ESCRITORIO
const desk = crearDesk();
desk.position.z = -15;
desk.position.y = 4;
desk.position.x = -10;
scene.add(desk);

// MONITOR
const monitor = Items.crearMonitor();
monitor.position.z = -15;
monitor.position.y = 11.5;
scene.add(monitor);

// TECLADO
const teclado = Items.crearTeclado();
teclado.position.z = -12;
teclado.position.y = 8.35;
scene.add(teclado);

// ABANICO
const fan = crearFan();
fan.position.y = 29;
scene.add(fan);

// ESPEJO
const mirror = crearEspejo();
mirror.position.z = -19;
mirror.position.y = 21;
scene.add(mirror);

// SILLON
const sillon = crearSillon();
sillon.position.y = 4;
sillon.rotation.y = Math.PI;
sillon.position.z = 13;
sillon.position.x = 10;
scene.add(sillon);

var ambientLight = new THREE.AmbientLight('#fff');
scene.add(ambientLight);

// SILLA IMPORTADA
// // https://free3d.com/3d-model/office-chair-871087.html
const sillaMtl = new MTLLoader().load('./Objetos/Office_chair.mtl', function(materials) {
    materials.preload();
    
    new OBJLoader().setMaterials(materials).load(
        './Objetos/Office_chair.obj', 
        (object) => {
            object.rotation.y = Math.PI;
            object.scale.x = 0.013;
            object.scale.y = 0.013;
            object.scale.z = 0.013;
            object.position.z = -6;
            scene.add( object );
        });
})

// animaciones
let animate = () => {
    requestAnimationFrame(animate);
    
    if (camera.position.y <= miny) { // limitar movimiento vertical
        camera.position.y = miny;
    }

    renderer.render(scene, camera);
}

animate();