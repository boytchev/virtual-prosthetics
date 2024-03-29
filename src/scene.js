
//	Scene API
//	Virtual Prosthetics 1.0
//
//
//	setAnimation( func, fps=30 )
//	getTime( )
//
//	setCameraPosition( position )
//	setCameraPosition( x, y, z )
//
//	setCameraTarget( target )
//	setCameraTarget( x, y, z )
//
//	getScene( )



import * as THREE from "../libs/three.module.min.js";
import { OrbitControls } from "../libs/controls/OrbitControls.js";
import { physics } from "./engines/engine.js";



var FPS = 30;

var renderer, scene, camera, light, controls, ground,
	logo = new THREE.Group( );

var animate,
	oldTime = 0,
	currentTime = 0;

/*var bodies = [];*/



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
	scene.fog = new THREE.Fog('gainsboro', 100, 400);

	camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(4, 4, 7);

	light = new THREE.DirectionalLight('white', 0.4);
	light.position.set(5, 18, 3);
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;
	light.shadow.blurSamples = 10;
	light.shadow.radius = 2;
	light.shadow.bias = -0.00001;
	light.shadow.bias = -0.0001;
	light.castShadow = true;
	
	// temporary narrow camera (only for the logo)
	light.shadow.camera.left = -1;
	light.shadow.camera.right = 1;
	light.shadow.camera.top = 1;
	light.shadow.camera.bottom = -1;
	
	scene.add(light, new THREE.HemisphereLight('white', 'cornsilk', 0.6));

	function onWindowResize(event)
	{
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight, true);
	}
	window.addEventListener('resize', onWindowResize, false);
	onWindowResize();

	class Ground extends THREE.Mesh {};
	
	ground = new Ground(
		new THREE.CircleGeometry( 2000 ),
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

	physics.init( scene, ground/*, bodies*/ );
	
} // createScene

createScene( );
createLogo( );


function createLogo( )
{
	var s = Math.sin( 30 * Math.PI/180 ),
		c = Math.cos( 30 * Math.PI/180 );

	var	n = 1,
		d = 0.15*n, // thickness
		r = 0.16*n,
		r2 = 0.136*n; // hole
		
	var shapeV = new THREE.Shape();
		shapeV.moveTo( 0, 0 );
		shapeV.absarc( 0, 0, r, 330 * Math.PI/180, 210 * Math.PI/180, true );
		shapeV.absarc( -n*s, n*c, r, 210 * Math.PI/180, 30 * Math.PI/180, true );
		shapeV.lineTo( 0, 2*r );
		shapeV.absarc( n*s, n*c, r, 150 * Math.PI/180, -30 * Math.PI/180, true );

	var hole1 = new THREE.Shape();
		hole1.absarc( 0, 0, r2, 0, 2*Math.PI );

	var hole2 = new THREE.Shape();
		hole2.absarc( n*s, n*c, r2, 0, 2*Math.PI );

	var hole3 = new THREE.Shape();
		hole3.absarc( -n*s, n*c, r2, 0, 2*Math.PI );

		shapeV.holes = [hole1, hole2, hole3];

	var extrudeSettings = {
		steps: 1,
		curveSegments: 40,
		depth: d,
		bevelEnabled: true,
		bevelThickness: 0.02,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 10
	};
	
	var geometry = new THREE.ExtrudeGeometry( shapeV, extrudeSettings ).translate(0,0,-d/2),
		material = new THREE.MeshPhysicalMaterial({
							color: 'white',
							roughness: 0.5,
							metalness: 1,
						});
		

	var	object = new THREE.Mesh( geometry, material );
		object.position.y = 2*r;
		object.castShadow = true;
		object.receiveShadow = true;
		
	// second top shape
	
	var px = 0.12*n,
		py = n*c-r;

	var wx = 0.305*n,
		wy = n*c+r+n/50;

	var qx = 0.34*n,
		qy = n*c+r+n/50;
	
	var k = 0.8,
		ux = px*(1-k)+k*wx,
		uy = py*(1-k)+k*wy;
	
	k = 0.95;
	var vx = px*(1-k)+k*wx,
		vy = py*(1-k)+k*wy;
	
	var shapeT = new THREE.Shape( );
		shapeT.moveTo( px, py );
		shapeT.lineTo( ux, uy );
		shapeT.quadraticCurveTo( vx, vy, qx, qy ); 
		shapeT.lineTo( -qx, qy );
		shapeT.quadraticCurveTo( -vx, vy, -ux, uy ); 
		shapeT.lineTo( -px, py );
						
	var geometryT = new THREE.ExtrudeGeometry( shapeT, extrudeSettings ).translate(0,0,-d/2),
		objectT = new THREE.Mesh( geometryT, material );
		objectT.position.y = 2*r;
		objectT.castShadow = true;
		objectT.receiveShadow = true;
		
		
	logo.add( object, objectT );
	
	scene.add( logo );

}

function setCameraPosition( x, y, z )
{
	if( x instanceof Array )
	{
		setCameraPosition( ...x );
		return;
	}
	
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
	
	currentTime = time;
	
	var dTime = time-oldTime;
	
	if( dTime > 1/FPS )
	{
		
		if( animate ) animate( time, dTime );
		
		physics.update( FPS, time, dTime );
	
		if( logo?.visible )
		{
			// if there is another element added after the logo
			// then hide the logo immediately
			if( scene.children[scene.children.length-1] != logo )
			{
				logo.visible = false;
					light.shadow.camera.left = -10;
					light.shadow.camera.right = 10;
					light.shadow.camera.top = 10;
					light.shadow.camera.bottom = -10;
			}
			else
			{
				logo.rotation.y = ((time/2) % (2*Math.PI));
				logo.children[1].rotation.y = Math.PI*Math.sin( (time/2) % (Math.PI/2) )**60;
			}
		}
		
		oldTime = time;
		
		controls.update( );
		renderer.render(scene, camera);
	}
}


function getScene( )
{
	return scene;
}


function getTime( )
{
	return currentTime;
}




export { setAnimation, getScene, setCameraPosition, setCameraTarget, getTime };