
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
//

import * as THREE from "../libs/three.module.js";
import { ConvexGeometry } from "../libs/geometries/ConvexGeometry.js";
import { Slot } from "./slot.js";


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
		if( parentPart.slots instanceof Array )
		{
			if( slot >= parentPart.slots.length )
				throw 'Error: invalid slot';
			
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

	setPosition( x, y, z )
	{
		this.position.set( x, y, z );
		//if( this.physics )
		//	this.physics.position.set( x, y, z );
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
		for( var i in this.collisions )
			if( this.collisions[i] === otherObject )
			{
				this.collisions.splice( i, 1 );
				break;
			}

		if( this.mainMesh )
		if( this.collisions.length==0  )
			this.mainMesh.material.emissiveIntensity = 0;

//		console.log( 'no contact', this.constructor.name, 'with', otherObject.constructor.name );

	}

}

export { Part };