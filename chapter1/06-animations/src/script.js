import * as THREE from 'three';
import gsap from 'gsap';


// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

// Sizes
const sizes = {
    width: 800,
    height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width,sizes.height);


{/* Same animation speed regardless of FPS on monitor/computer */}

// Time
// let time = Date.now();

// Animate
// const tick = () => {
//     // Time
//     const currentTime = Date.now();
//     const deltaTime = currentTime - time;
//     time = currentTime;

//     // Update Objects
//     mesh.rotation.y += 0.002 * deltaTime;
//     // Render
//     renderer.render(scene,camera);
//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick);

// };
// tick();


// CLOCK
// const clock = new THREE.Clock();

gsap.to(mesh.position,{duration: 1,delay: 1,x: 2});
gsap.to(mesh.position,{duration: 1,delay: 2,x: 0});
gsap.to(mesh.position,{duration: 1,delay: 3,x: -2});

// Animations
const tick = () => {
    // CLOCK
    // const elapsedTime = clock.getElapsedTime();

    // Update Objects
    // camera.position.y = Math.sin(elapsedTime);
    // camera.position.x = Math.cos(elapsedTime);
    // camera.lookAt(mesh.position);

    // Render
    renderer.render(scene,camera);
    // call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();

{/* Same animation speed regardless of FPS on monitor/computer */}
