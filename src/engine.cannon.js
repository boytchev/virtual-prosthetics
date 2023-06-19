
//	Cannon-es Engine
//	Virtual Prosthetics 1.0
//
//
//	init( scene, ground )
//	update( fps, time, dTime )
//
//	convex( vertices, faces )
//	ball( radius )
//	box( sizex, sizey, sizez )




import * as THREE from "../libs/three.module.min.js";
import * as CANNON from "../libs/cannon-es.js";



var scene, bodies = [];

// init cannon physics world and ground

function init( _scene, ground/*, _bodies*/ )
{
	/*bodies = _bodies;*/
	
	scene = _scene;
	scene.physics = new CANNON.World();
	scene.physics.gravity.set(0, 0, 0);
	
	ground.physics = new CANNON.Body({
				mass: 0, // static
				type: CANNON.Body.STATIC,
				shape: new CANNON.Plane(),
			});
	ground.physics.threejs = ground;
	ground.physics.quaternion.setFromEuler( -Math.PI / 2, 0, 0 );


	scene.physics.addBody( ground.physics );

	scene.physics.addEventListener( 'beginContact', (event) =>
	{	
		//console.log( event.bodyA.threejs.constructor.name, '<-[+]->', event.bodyB.threejs.constructor.name );

		if( event.bodyA.threejs )
		if( event.bodyA.threejs.beginContact )
			event.bodyA.threejs.beginContact( event.bodyB.threejs );

		if( event.bodyB.threejs )
		if( event.bodyB.threejs.beginContact )
			event.bodyB.threejs.beginContact( event.bodyA.threejs );
//		console.log( event.target.contacts );
	});

	scene.physics.addEventListener( 'endContact', (event) =>
	{	
		//console.log( event.bodyA.threejs.constructor.name, '<-[|]->', event.bodyB.threejs.constructor.name );

		if( event.bodyA.threejs )
		if( event.bodyA.threejs.endContact )
			event.bodyA.threejs.endContact( event.bodyB.threejs );

		if( event.bodyB.threejs )
		if( event.bodyB.threejs.endContact )
			event.bodyB.threejs.endContact( event.bodyA.threejs );
	});
} // createCannonScene



// animation cycle

var _v = new THREE.Vector3,
	_q = new THREE.Quaternion;
	
function update( fps, time, dTime )
{
	for( var body of bodies ) if( body.mainMesh )
	{
		body.mainMesh.updateMatrix( );
		body.mainMesh.updateMatrixWorld( true );
		body.mainMesh.updateWorldMatrix( true, true );
		body.mainMesh.getWorldPosition( _v );
		body.mainMesh.getWorldQuaternion( _q );
		
		body.physics.position.copy( _v );
		body.physics.quaternion.copy( _q );
	}
	
	scene.physics.step( 1/fps, dTime, 3 );
	
	for( var body of bodies ) if( body.mainMesh )
	{
		body.mainMesh.getWorldPosition( _v );
		body.mainMesh.getWorldQuaternion( _q );
		
		body.physics.position.copy( _v );
		body.physics.quaternion.copy( _q );
	}
}


function convex( vertices, faces )
{
	for( var i in vertices )
		vertices[i] = new CANNON.Vec3( ...vertices[i] );
	
	var body = new CANNON.Body({
			mass: 0,
			type: CANNON.Body.DYNAMIC,
			position: new CANNON.Vec3(0, 0, 0),
			shape: new CANNON.ConvexPolyhedron({ vertices: vertices, faces: faces }),
		});
		
	body.collisionResponse = 0;
	
	scene.physics.addBody( body );
	
	return body;
}


function ball( radius )
{
	var body = new CANNON.Body({
			mass: 0,
			type: CANNON.Body.DYNAMIC,
			position: new CANNON.Vec3(0, 0, 0),
			shape: new CANNON.Sphere( radius ),
		});
		
	body.collisionResponse = 0;
	
	scene.physics.addBody( body );
	
	return body;
}


function box( sizex, sizey, sizez )
{
	var body = new CANNON.Body({
			mass: 0,
			type: CANNON.Body.DYNAMIC,
			position: new CANNON.Vec3(0, 0, 0),
			shape: new CANNON.Box( new CANNON.Vec3(sizex/2, sizey/2, sizez/2) ),
		});
		
	body.collisionResponse = 0;
	
	scene.physics.addBody( body );
	
	return body;
}


export { init, update, convex, ball, box, bodies };