
//
//	Part for Virtual prosthetics
//
//	class Part extends THREE.Group
//		constructor( )
//		setMotor( axis, min=-Infinity, max=Infinity, def=0 )
//		addSlot( x, y, z )
//		attachToSlot( parentPart, slot=0 )
//		attachToPosition( parentPart, x=0, y=0, z=0 )
//		getAngle( )
//		setAngle( x )
//

import * as THREE from "../libs/three.module.js";
import { ConvexGeometry } from "../libs/geometries/ConvexGeometry.js";
import {Slot} from "./slot.js";


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
	}

	setMotor( axis, min=-Infinity, max=Infinity, def=0 )
	{
		this.axis = axis;
		this.min = Math.min( min, max );
		this.max = Math.max( min, max );
		this.def = THREE.MathUtils.clamp( def, this.min, this.max );
		
		this.setAngle( def );
	}
	
	addSlot( ...params )
	{
		var slot = new Slot( ...params );
		this.slots.push( slot );
		this.add( slot );
		return slot;
	}
	
	attachToSlot( parentPart, slot=0 )
	{
		if( parentPart.slots instanceof Array )
		{
			if( slot >= parentPart.slots.length )
				throw 'Error: invalid slot';
			
			parentPart.slots[slot].add( this );
		}
		else
		{
			parentPart.add( this );
		}
		return this;
	}
	
	attachToPosition( parentPart, x=0, y=0, z=0, ...rotParams )
	{
		var pseudoSlot = new THREE.Group( );
			pseudoSlot.position.set( x, y, z );
			pseudoSlot.rotation.set( ...rotParams );
			pseudoSlot.add( this );
			
		parentPart.add( pseudoSlot );
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

	
	
}

export { Part };