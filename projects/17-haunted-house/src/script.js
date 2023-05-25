import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Fog
const fog = new THREE.Fog('#262837',1,15);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load('textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const windowColorTexture = textureLoader.load('textures/window/color.jpg');
const windowAlphaTexture = textureLoader.load('/textures/window/opacity.jpg');
const windowAmbientOcclusionTexture = textureLoader.load('/textures/window/windowOcclusion.jpg');
const windowHeightTexture = textureLoader.load('/textures/window/height.png');
const windowNormalTexture = textureLoader.load('/textures/window/normal.jpg');
const windowMetalnessTexture = textureLoader.load('/textures/window/metalness.jpg');
const windowRoughnessTexture = textureLoader.load('/textures/window/roughness.jpg');

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.png',
    '/textures/environmentMaps/1/nx.png',
    '/textures/environmentMaps/1/py.png',
    '/textures/environmentMaps/1/ny.png',
    '/textures/environmentMaps/1/pz.png',
    '/textures/environmentMaps/1/nz.png',
]);

grassColorTexture.repeat.set(8,8);
grassAmbientOcclusionTexture.repeat.set(8,8);
grassNormalTexture.repeat.set(8,8);
grassRoughnessTexture.repeat.set(8,8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Group
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,3,4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
    })
);
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2)
);
walls.position.y = 3 * 0.5;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.3,4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
);
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 3 + 0.65;
house.add(roof);

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
);
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
);
door.position.y = 2 / 2;
// half depth of walls
door.position.z = 2 + 0.01;
house.add(door);



// window frames
const frameGeometry = new THREE.BoxGeometry(0.85,0.05,0.08,);
const frameMaterial = new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,

});

const leftBottomFrame = new THREE.Mesh(frameGeometry,frameMaterial);
leftBottomFrame.position.y = 2.05;
leftBottomFrame.position.x = -1.20;
leftBottomFrame.position.z = 2 + 0.05;

const leftTopFrame = new THREE.Mesh(frameGeometry,frameMaterial);
leftTopFrame.position.y = 2.85;
leftTopFrame.position.x = -1.20;
leftTopFrame.position.z = 2 + 0.05;

const leftWindowVerticalFrame = new THREE.Mesh(frameGeometry,frameMaterial);
leftWindowVerticalFrame.rotation.z = Math.PI / 2;
leftWindowVerticalFrame.position.y = 2.45;
leftWindowVerticalFrame.position.x = -1.20;
leftWindowVerticalFrame.position.z = 2 + 0.05;

const leftWindowHorizontalFrame = new THREE.Mesh(frameGeometry,frameMaterial);
leftWindowHorizontalFrame.position.y = 2.45;
leftWindowHorizontalFrame.position.x = -1.20;
leftWindowHorizontalFrame.position.z = 2 + 0.05;

const leftWindowLeftFrame = new THREE.Mesh(frameGeometry,frameMaterial);
leftWindowLeftFrame.rotation.z = Math.PI / 2;
leftWindowLeftFrame.position.y = 2.45;
leftWindowLeftFrame.position.x = -1.60;
leftWindowLeftFrame.position.z = 2 + 0.05;

const leftWindowRightFrame = new THREE.Mesh(frameGeometry,frameMaterial);
leftWindowRightFrame.rotation.z = Math.PI / 2;
leftWindowRightFrame.position.y = 2.45;
leftWindowRightFrame.position.x = -.75;
leftWindowRightFrame.position.z = 2 + 0.05;

leftBottomFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(leftBottomFrame.geometry.attributes.uv.array,2));
leftTopFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(leftTopFrame.geometry.attributes.uv.array,2));
leftWindowVerticalFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(leftWindowVerticalFrame.geometry.attributes.uv.array,2));
leftWindowHorizontalFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(leftWindowHorizontalFrame.geometry.attributes.uv.array,2));
leftWindowLeftFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(leftWindowLeftFrame.geometry.attributes.uv.array,2));
leftWindowRightFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(leftWindowRightFrame.geometry.attributes.uv.array,2));

house.add(leftBottomFrame,leftTopFrame,leftWindowVerticalFrame,leftWindowLeftFrame,leftWindowRightFrame,leftWindowHorizontalFrame);

// Right window
const rightBottomFrame = new THREE.Mesh(frameGeometry,frameMaterial);
rightBottomFrame.position.y = 2.05;
rightBottomFrame.position.x = 1.20;
rightBottomFrame.position.z = 2 + 0.05;

const rightTopFrame = new THREE.Mesh(frameGeometry,frameMaterial);
rightTopFrame.position.y = 2.85;
rightTopFrame.position.x = 1.20;
rightTopFrame.position.z = 2 + 0.05;

const rightWindowVerticalFrame = new THREE.Mesh(frameGeometry,frameMaterial);
rightWindowVerticalFrame.rotation.z = Math.PI / 2;
rightWindowVerticalFrame.position.y = 2.45;
rightWindowVerticalFrame.position.x = 1.20;
rightWindowVerticalFrame.position.z = 2 + 0.05;

const rightWindowHorizontalFrame = new THREE.Mesh(frameGeometry,frameMaterial);
rightWindowHorizontalFrame.position.y = 2.45;
rightWindowHorizontalFrame.position.x = 1.20;
rightWindowHorizontalFrame.position.z = 2 + 0.05;

const rightWindowLeftFrame = new THREE.Mesh(frameGeometry,frameMaterial);
rightWindowLeftFrame.rotation.z = Math.PI / 2;
rightWindowLeftFrame.position.y = 2.45;
rightWindowLeftFrame.position.x = 1.60;
rightWindowLeftFrame.position.z = 2 + 0.05;

const rightWindowRightFrame = new THREE.Mesh(frameGeometry,frameMaterial);
rightWindowRightFrame.rotation.z = Math.PI / 2;
rightWindowRightFrame.position.y = 2.45;
rightWindowRightFrame.position.x = .75;
rightWindowRightFrame.position.z = 2 + 0.05;

rightBottomFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(rightBottomFrame.geometry.attributes.uv.array,2));
rightTopFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(rightTopFrame.geometry.attributes.uv.array,2));
rightWindowVerticalFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(rightWindowVerticalFrame.geometry.attributes.uv.array,2));
rightWindowHorizontalFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(rightWindowHorizontalFrame.geometry.attributes.uv.array,2));
rightWindowLeftFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(rightWindowLeftFrame.geometry.attributes.uv.array,2));
rightWindowRightFrame.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(rightWindowRightFrame.geometry.attributes.uv.array,2));

house.add(rightBottomFrame,rightTopFrame,rightWindowVerticalFrame,rightWindowHorizontalFrame,rightWindowLeftFrame,rightWindowRightFrame);

// Windows
const windows = new THREE.PlaneGeometry(0.83,0.74,100,100);
const windowMaterial = new THREE.MeshStandardMaterial({
    map: windowColorTexture,
    transparent: true,
    alphaMap: windowAlphaTexture,
    aoMap: windowAmbientOcclusionTexture,
    displacementMap: windowHeightTexture,
    displacementScale: 0.1,
    normalMap: windowNormalTexture,
    metalnessMap: windowMetalnessTexture,
    roughnessMap: windowRoughnessTexture
});


const leftWindow = new THREE.Mesh(windows,windowMaterial);
leftWindow.position.y = 2.45;
leftWindow.position.x = -1.19;
leftWindow.position.z = 2 + 0.01;

const rightWindow = new THREE.Mesh(windows,windowMaterial);
rightWindow.position.y = 2.45;
rightWindow.position.x = 1.19;
rightWindow.position.z = 2 + 0.01;

leftWindow.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(leftWindow.geometry.attributes.uv.array,2)
);
rightWindow.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(rightWindow.geometry.attributes.uv.array,2)
);
house.add(leftWindow,rightWindow);

// Window Glass
const windowGlass = new THREE.MeshStandardMaterial();
windowGlass.metalness = 0.75;
windowGlass.roughness = 0.1;
windowGlass.envMap = environmentMapTexture;

const leftWindowGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(0.83,0.74,100,100),
    windowGlass
);
leftWindowGlass.position.x = -1.19;
leftWindowGlass.position.y = 2.45;
leftWindowGlass.position.z = 2 + 0.02;
leftWindowGlass.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(leftWindowGlass.geometry.attributes.uv.array,2));

const rightWindowGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(0.83,0.74,100,100),
    windowGlass
);
rightWindowGlass.position.x = 1.19;
rightWindowGlass.position.y = 2.45;
rightWindowGlass.position.z = 2 + 0.02;
rightWindowGlass.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(rightWindowGlass.geometry.attributes.uv.array,2));

house.add(leftWindowGlass,rightWindowGlass);

// gui.add(windowGlass,'metalness').min(0).max(1).step(0.0001);
// gui.add(windowGlass,'roughness').min(0).max(1).step(0.0001);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16);
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'});

const bush1 = new THREE.Mesh(bushGeometry,bushMaterial);
bush1.scale.set(0.5,0.5,0.5);
bush1.position.set(0.8,0.2,2.2);

const bush2 = new THREE.Mesh(bushGeometry,bushMaterial);
bush2.scale.set(0.25,0.25,0.25);
bush2.position.set(1.4,0.1,2.1);


const bush3 = new THREE.Mesh(bushGeometry,bushMaterial);
bush3.scale.set(0.4,0.4,0.4);
bush3.position.set(-0.8,0.1,2.2);

const bush4 = new THREE.Mesh(bushGeometry,bushMaterial);
bush4.scale.set(0.15,0.15,0.15);
bush4.position.set(-1,0.05,2.6);

house.add(bush1,bush2,bush3,bush4);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2);
const graveMaterial = new THREE.MeshStandardMaterial({color: '#b2b6b1'});

for(let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry,graveMaterial);
    grave.position.set(x,0.3,z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true;
    graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
);
floor.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2));
floor.rotation.x = - Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff',0.12);
gui.add(ambientLight,'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff',0.12);
moonLight.position.set(4,5,- 2);
gui.add(moonLight,'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position,'x').min(- 5).max(5).step(0.001);
gui.add(moonLight.position,'y').min(- 5).max(5).step(0.001);
gui.add(moonLight.position,'z').min(- 5).max(5).step(0.001);
scene.add(moonLight);

// Door Light
const doorLight = new THREE.PointLight('#ff7d46',1,7);
doorLight.position.set(0,2.2,2.7);
house.add(doorLight);

// left window light
// const leftWindowLight = new THREE.PointLight('#ff0',1,7);
// leftWindowLight.position.set(2.2,2.2,2.7);
// house.add(leftWindowLight);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff',2,3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff',2,3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00',2,3);
scene.add(ghost3);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize',() => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width,sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,0.1,100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setClearColor('#262837');

/**
 * Shadows
 */

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
leftBottomFrame.castShadow = true;
leftTopFrame.castShadow = true;
rightTopFrame.castShadow = true;
rightBottomFrame.castShadow = true;
leftWindowLeftFrame.castShadow = true;
leftWindowRightFrame.castShadow = true;
rightWindowLeftFrame.castShadow = true;
rightWindowRightFrame.castShadow = true;

floor.receiveShadow = true;
house.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;


/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = - elapsedTime * 0.35;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = elapsedTime * 0.18;
    ghost3.position.x = Math.cos(ghost3Angle) * (Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene,camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();