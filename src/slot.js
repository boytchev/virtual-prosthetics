
//
//	Slot for Virtual prosthetics
//
//	class Slot extends THREE.Group
//		constructor( )
//		draw( )
//

import * as THREE from "../libs/three.module.js";



// slot ring

var RING_GEOMETRY = new THREE.TorusGeometry( 0.1, 0.01 ).rotateX( Math.PI/2 ),
	RING_MATERIAL = new THREE.MeshLambertMaterial( {color: 'crimson'} );

// slot plane

var PLANE_GEOMETRY = new THREE.CircleGeometry( 0.1 ).rotateX( Math.PI/2 ),
	PLANE_MATERIAL = new THREE.MeshLambertMaterial( {
		color: 'crimson',
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.3,
	} );
	
	
	
// class for slots

class Slot extends THREE.Group
{
	constructor( x=0, y=0, z=0, rotX=0, rotY=0, rotZ=0, rotOrder='XYZ' )
	{
		super( );

		this.position.set( x, y, z );
		this.rotation.set( rotX, rotY, rotZ, rotOrder );
	}

	show( )
	{
		var ring = new THREE.Mesh( RING_GEOMETRY, RING_MATERIAL ),
			plane = new THREE.Mesh( PLANE_GEOMETRY, PLANE_MATERIAL ),
			axes = new THREE.AxesHelper( 0.2 );
		
		axes.scale.set( 1, 1, 0.5 );
		axes.setColors( 'crimson', 'crimson', 'crimson' );
		
		this.add( ring, plane, axes );
	}
	
}

export { Slot };