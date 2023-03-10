
//
//	Slot for Virtual prosthetics
//
//	class Slot extends THREE.Group
//		constructor( x, y, z )
//		setRotation( x, y, z, order='XYZ' )
//		show( )
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
	constructor( x, y, z )
	{
		super( );

		this.position.set( x, y, z );
	}

	setRotation( x, y, z, order='XYZ' )
	{
		this.rotation.set( x, y, z, order );
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