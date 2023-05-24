
//
//	Part for Virtual prosthetics
//
//	class Part extends THREE.Group
//		constructor( )
//		setMotor( axis, min=-Infinity, max=Infinity, def=0 )
//		addSlot( x, y, z )
//		attachToSlot( parentPart, slot=0 )
//		getAngle( )
//		setAngle( x )
//		setAngleRelative( x )
//		setPosition( x, y=0, z=0 )
//		setRotation( x, y=0, z=0, order='XYZ' )
//	.	beginContact( otherObject )
//	.	endContact( otherObject )
//

import * as THREE from "../libs/three.module.min.js";
import { ConvexGeometry } from "../libs/geometries/ConvexGeometry.js";
import { Slot } from "./slot.js";
import { getScene } from "./scene.js";
import { OPTION_DEBUG_PHYSICS } from "./engine.js";

// base class for robot parts

class Part extends THREE.Group
{
	constructor( )
	{
		super( );

		this.receiveShadow = true;
		this.castShadow = true;
		
		this.slots = [];
		
		// rotation
		this.axis = null;
		this.min = null;
		this.max = null;
		this.def = null;
		
		// physics
		this.physics = null;
		this.collisions = [];
		
		getScene().add( this );
	}

	setMotor( axis, min=-Infinity, max=Infinity, def=0 )
	{
		this.axis = axis;
		this.min = Math.min( min, max );
		this.max = Math.max( min, max );
		this.def = THREE.MathUtils.clamp( def, this.min, this.max );
		
		this.setAngle( def );
	}
	
	addSlot( x, y, z )
	{
		var slot = new Slot( x, y, z );
		this.slots.push( slot );
		this.add( slot );
		return slot;
	}
	
	attachToSlot( parentPart, slot=0 )
	{
		// attachToSlot( Part, Slot )
		if( slot instanceof Slot )
		{
			parentPart.add( slot );
			slot.add( this );
			return this;
		}
		
		// attachToSlot( Part, index )
		if( parentPart.slots )
		if( parentPart.slots[slot] )
		{
			parentPart.slots[slot].add( this );
			return this;
		}
		
		// attachToSlot( Part )
		// attachToSlot( Scene )
		parentPart.add( this );
		return this;
	}

	getAngle( )
	{
		if( this.axis )
			return this.rotation[this.axis];
		else
			return 0;
	}
	
	setAngle( x )
	{
		if( x === null )
			return;
		
		if( this.axis )
			this.rotation[this.axis] = THREE.MathUtils.clamp( x, this.min, this.max );
		else
			throw `Error: body part '${this.name}' cannot rotate`;
	}
	
	setAngleRelative( x )
	{
		if( x === null )
			return;
		
		if( this.axis )
			this.rotation[this.axis] = THREE.MathUtils.clamp( this.rotation[this.axis]+x, this.min, this.max );
		else
			throw `Error: body part '${this.name}' cannot rotate`;
	}

	setPosition( x, y=0, z=0 )
	{
		this.position.set( x, y, z );
	}

	setRotation( x, y=0, z=0, order='XYZ' )
	{
		this.rotation.set( x, y, z, order );
	}
	
	beginContact( otherObject )
	{
		this.collisions.push( otherObject );

		if( this.mainMesh )
			this.mainMesh.material.emissiveIntensity = 1;

//		console.log( 'contact', this.constructor.name, 'with', otherObject.constructor.name );
	}

	endContact( otherObject )
	{
		this.collisions = this.collisions.filter( object => object!==otherObject );

		if( this.mainMesh && (this.collisions.length==0)  )
			this.mainMesh.material.emissiveIntensity = 0;

//		console.log( 'no contact', this.constructor.name, 'with', otherObject.constructor.name );

	}

	debugConvex( vertices, faces )
	{
		if( !OPTION_DEBUG_PHYSICS ) return;

		var points = [];

		for( var f of faces )
		for( var i=0; i<f.length; i++ )
		{
			var v = vertices[f[i]];
			points.push( v.x, v.y, v.z );
			
			v = vertices[f[(i+1)%f.length]];
			points.push( v.x, v.y, v.z );
		}

		var geometry = new THREE.BufferGeometry( ),
			material = new THREE.LineBasicMaterial({ color: 'crimson' });
			
		geometry.setAttribute( 'position', new THREE.BufferAttribute( 
			new Float32Array(points),3 ) );
		
		var lines = new THREE.LineSegments( geometry, material );

		this.mainMesh.add( lines );
	}
}

export { Part };