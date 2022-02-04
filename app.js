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

const loader = new THREE.TextureLoader();
loader.load('./img/bg.jpg', (texture) => {
    scene.background = texture;
});

const miny = 5;

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    5,
    200
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

camera.position.z = 60;
camera.position.y = 20;

// controles
const controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 3;
controls.maxDistance = 100;
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
textureFloor.repeat.y = 16;
textureFloor.wrapS = THREE.RepeatWrapping;
textureFloor.repeat.x = 8;

const mFloor = new THREE.MeshPhongMaterial( { map: textureFloor, side: THREE.DoubleSide } );

const floor = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), mFloor);
floor.receiveShadow = true;

floor.rotation.x = Math.PI / 2;
scene.add(floor);

const room = crearCuarto();
room.position.y = 15;
scene.add(room);

// TORRE
const torre = crearTorre();
torre.position.set(-25, 12, -15);
scene.add(torre);

// ESCRITORIO
const desk = crearDesk();
desk.position.set(-10,4,-15);
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
sillon.position.set(13,4,13);
sillon.rotation.y = Math.PI;
scene.add(sillon);

// SILLA IMPORTADA
// // https://free3d.com/3d-model/office-chair-871087.html
const sillaMtl = new MTLLoader().load('./Objetos/Office_chair.mtl', function(materials) {
    materials.preload();
    
    new OBJLoader().setMaterials(materials).load(
        './Objetos/Office_chair.obj', 
        (object) => {
            object.rotation.y = Math.PI;
            object.traverse(function(child){child.castShadow = true;});
            object.scale.set(0.013, 0.013, 0.013);
            object.position.z = -6;
            scene.add( object );
        });
})

// LUZ
let ambientLight = new THREE.AmbientLight('#fff', 0.65);
scene.add(ambientLight);

let luzSol = new THREE.DirectionalLight(0xFFFACD, 0.2)
luzSol.position.set(20, 80, 0);
scene.add(luzSol);

let luzFoco = new THREE.PointLight(0xFFFACD, 0.5, 100);
luzFoco.castShadow = true;
luzFoco.position.y = 25;
scene.add(luzFoco);

// INTERACCION - presionar enter para prender la luz y el abanico
let abanicoOn = false;
let maxspeed = 0.15;
let minspeed = 0.0005;
let speed = minspeed;

window.addEventListener("keydown", (event) => {
    if (event.code == 'Space') {
        abanicoOn = !abanicoOn;
    }
});

// animaciones
let animate = () => {
    requestAnimationFrame(animate);
    
    if (camera.position.y <= miny) { // limitar movimiento vertical
        camera.position.y = miny;
    }

    if (!abanicoOn) {
        luzFoco.intensity = 0;

        // efecto de que se va alentando
        if (speed > minspeed) {
            fan.rotation.y += speed;
            speed -= minspeed;
        }

    } else {
        luzFoco.intensity = 0.5;
        fan.rotation.y += speed;

        // efecto de que empieza lento
        if (speed >= maxspeed) {
            speed = maxspeed;
        } else {
            speed += minspeed;
        }
    }
    

    renderer.render(scene, camera);
}

animate();