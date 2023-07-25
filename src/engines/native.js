
//	Native Engine
//	Virtual Prosthetics 1.0
//
//
//	init( scene, ground )
//	update( fps, time, dTime )
//
//	convex( vertices, faces )
//	ball( radius )
//	box( sizex, sizey, sizez )


import * as THREE from "../../libs/three.module.min.js";

var scene, bodies;

const BodyType = {
	BALL:  0,
	BOX:  1,
	CONVEX: 2,
	PLANE: 3,
}

function init( _scene, ground, _bodies )
{
	bodies = _bodies;
	
	scene = _scene;
	scene.physics = {}; // native physics (if needed)
	
	ground.physics = {
		type: BodyType.PLANE,
		level: 0.
	};  // native physics (if needed)
	ground.physics.threejs = ground; // back link

} // createNativeScene


var _v = new THREE.Vector3;

// animation cycle

function update( fps, time, dTime )
{
	// world positions needed.
	for( var body of bodies ) if( body.mainMesh )
	{
		body.mainMesh.getWorldPosition( _v );	
		body.physics.position.copy( _v );
	}

	// do the math
	for( var body of bodies )
	{
		// do something with the body
		let pos = body.physics.position;

		for( let other of bodies ) {
			if(other === body) continue;
			let other_pos = other.physics.position;

			// a very simple check to proove the system is working
			let distance = pos.distanceTo(other_pos);
			if(distance < 0.4) {
				body.beginContact(other);
			} else {
				body.endContact(other);
			}
		}
	}
}


// TODO: later
function convex( _vertices, _faces )
{
	// vertices = [ [x1, y1, z1], [x2, y2, z2], ... ]
	// faces = [ [ccw vertex indices], [ccw vertex indices], ... ]
	
	var body = { 
		type: BodyType.CONVEX,
		vertices: _vertices,
		faces: _faces,
		position: new THREE.Vector3(0,0,0),
	}; // physics data
	
	return body;
}


function ball( _radius )
{
	var body = { 
		type: BodyType.BALL,
		radius: _radius,
		position: new THREE.Vector3(0,0,0),
	}; // physics data
	
	return body;
}


function box( sizex, sizey, sizez )
{
	var body = {
		type: BodyType.BOX,
		size: new THREE.Vector3(sizex, sizey, sizez),
		position: new THREE.Vector3(0,0,0),
	}; // physics data
	
	return body;
}


export { init, update, convex, ball, box, bodies };