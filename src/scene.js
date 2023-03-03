
//
//	Robot parts shapes for Virtual prosthetics
//
//	Phalange( length=1.0, width=0.3, thickness=0.3 )
//	EndPhalange( length=1.0, width=0.3, thickness=0.3 )
//



import * as THREE from "../libs/three.module.js";
import { OrbitControls } from "../libs/controls/OrbitControls.js";


var FPS = 30;

var renderer, scene, camera, light, controls;

var animate,
	oldTime = 0;

function createScene( )
{
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.style = 'width:100%; height:100%; position:fixed; top:0; left:0;';
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;
	renderer.setAnimationLoop( drawFrame );
	document.body.appendChild(renderer.domElement);

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


	controls = new OrbitControls( camera, renderer.domElement );
	controls.target = new THREE.Vector3( 0, 1, 0 );
} // createScene

createScene( );

function setCameraPosition( x, y, z )
{
	camera.position.set( x, y, z );
	camera.lookAt( controls.target );
}

function setCameraTarget( x, y, z )
{
	controls.target.set( x, y, z );
	camera.lookAt( controls.target );
}

function setAnimation( func, fps=30 )
{
	animate = func;
	FPS = fps;
}


function drawFrame( time )
{
	time /= 1000; // convert to seconds
	
	var dTime = time-oldTime;
	
	if( dTime > 1/FPS )
	{
		
		if( animate ) animate( time, dTime );
		
		oldTime = time;
		
		controls.update( );
		renderer.render(scene, camera);
	}
}


function getScene( )
{
	return scene;
}


export { scene, setAnimation, getScene, setCameraPosition };