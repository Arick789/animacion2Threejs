import * as THREE from './three/three.module.js'
import {GLTFLoader} from './three/GLTFLoader.js'
import { OrbitControls } from './three/OrbitControls.js'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

//Background
scene.background = new THREE.Color(0x333333)

//Directional Light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 5, 5)
scene.add(light)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = -1
camera.position.z = 10
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//loader
const loader = new GLTFLoader()

loader.load('./animacion1san.glb', function(gltf){
    const model = gltf.scene
    scene.add(model)
})

//OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true

//Animate
 const animate= function() {
	requestAnimationFrame( animate );

    controls.update();
    
	renderer.render( scene, camera );
}
animate();
