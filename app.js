import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { crearTorre } from "./Objetos/torre.js";
import { crearCuarto } from "./Objetos/room.js";
import { crearDesk } from "./Objetos/desk.js";
import { crearFan } from "./Objetos/fan.js";
import { crearEspejo } from "./Objetos/mirror.js";
import * as Items from "./Objetos/deskItems.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

/*
const loader = new THREE.TextureLoader();
loader.load('./img/bg.jpg', (texture) => {
    scene.background = texture;
});
*/

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    5,
    150
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 60;
camera.position.y = 10;

// controles
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});


// PAREDES
const floor = new THREE.Mesh(new THREE.PlaneGeometry(150, 150), new THREE.MeshBasicMaterial({color: "rgb(184,160,140)",side: THREE.DoubleSide}));
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

const monitor = Items.crearMonitor();
monitor.position.z = -15;
monitor.position.y = 11.5;
scene.add(monitor);

const teclado = Items.crearTeclado();
teclado.position.z = -12;
teclado.position.y = 8.25;
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

// animaciones
let animate = () => {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();