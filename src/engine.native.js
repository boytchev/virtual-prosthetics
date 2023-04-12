
//
//	Virtual Prosthetics 1.0
//




var scene, bodies;


function init( _scene, ground, _bodies )
{
	bodies = _bodies;
	
	scene = _scene;
	scene.physics = {}; // native physics (if needed)
	
	ground.physics = {};  // native physics (if needed)
	ground.physics.threejs = ground; // back link

} // createNativeScene



// animation cycle

function update( fps, time, dTime )
{
	for( var body of bodies )
	{
		// do something with the body
		
		// body.physics = physics data
		// body.mainMesh = THREE.Object3D
		
		// body.beginContact( otherBody );
		// body.endContact( otherBody );
	}
}


function convex( vertices, faces )
{
	// vertices = [ [x1, y1, z1], [x2, y2, z2], ... ]
	// faces = [ [ccw vertex indices], [ccw vertex indices], ... ]
	
	var body = { }; // physics data
	
	return body;
}


function ball( radius )
{
	var body = { }; // physics data
	
	return body;
}


function box( sizex, sizey, sizez )
{
	var body = { }; // physics data
	
	return body;
}


export { init, update, convex, ball, box };