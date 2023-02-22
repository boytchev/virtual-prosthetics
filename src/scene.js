
//
//	Sceen environment for virtual prosthetics
//
//	scene
//	createScene( loop )
//

import * as THREE from "three";
import { OrbitControls } from "libs/controls/OrbitControls.js";


var renderer, scene, camera, light, clock, controls;

var userLoop = null;

function createScene( loop )
{
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.style = 'width:100%; height:100%; position:fixed; top:0; left:0;';
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;
	renderer.setAnimationLoop(drawFrame);
	document.body.appendChild(renderer.domElement);

	userLoop = loop;
	
	scene = new THREE.Scene();
	scene.background = new THREE.Color('gainsboro');
	scene.fog = new THREE.Fog('gainsboro', 20, 50);

	camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 2000);
	camera.position.set(4, 4, 7);

	light = new THREE.DirectionalLight('white', 0.4);
	light.position.set(5, 18, 3);
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;
	light.shadow.blurSamples = 10;
	light.shadow.radius = 2;
	light.shadow.bias = -0.001;
	light.castShadow = true;
	
	light.shadow.camera.left = -10;
	light.shadow.camera.right = 10;
	light.shadow.camera.top = 10;
	light.shadow.camera.bottom = -10;
	
	scene.add(light, new THREE.HemisphereLight('white', 'cornsilk', 0.6));

//	const helper = new THREE.DirectionalLightHelper( light, 5 );
//	scene.add( helper );

	function onWindowResize(event)
	{
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight, true);
	}
	window.addEventListener('resize', onWindowResize, false);
	onWindowResize();

	var ground = new THREE.Mesh(
		new THREE.PlaneGeometry(1000, 1000),
		new THREE.MeshLambertMaterial(
		{
			color: 'lightgray',
		})
	);
	ground.receiveShadow = true;
	ground.rotation.x = -Math.PI / 2;
	scene.add(ground);

	clock = new THREE.Clock();
	
	controls = new OrbitControls( camera, renderer.domElement );
	controls.target = new THREE.Vector3( 0, 1, 0 );
	
	return scene;
} // createScene


function drawFrame()
{
	clock.getElapsedTime();
	
	if( userLoop ) userLoop( clock.elapsedTime, clock.elapsedTime-clock.oldTime );
	controls.update( );
	renderer.render(scene, camera);
}


export { scene, createScene };