
//
//	Robots and robot parts for Virtual prosthetics
//
//	Robot( )
//	Part( shape, dof1, dof2, ... )
//
//	DOFZ( min=0, max=PI/2, initial=0 )
//


import * as THREE from "three";
import { scene } from "./scene.js";



class DOFZ
{
	constructor( min=0, max=PI/2, initial=0 )
	{
		this.axis = 'z';
		this.initial = initial;
		this.min = Math.min( min, max );
		this.max = Math.max( min, max );
	}
}

class DOFY
{
	constructor( min=0, max=PI/2, initial=0 )
	{
		this.axis = 'z';
		this.initial = initial;
		this.min = Math.min( min, max );
		this.max = Math.max( min, max );
	}
}



class Robot extends THREE.Group
{
	constructor( )
	{
		super( );
		
		scene.add( this );
	}

	attachTo( parentPart, slot=0 )
	{
		if( slot instanceof THREE.Vector3 )
			this.position.copy( slot );
		else
		{
			if( parentPart.slots instanceof Array )
			{
				if( slot >= parentPart.slots.length )
					throw 'Error: invalid slot';
				
				this.position.copy( parentPart.slots[slot] );
			}
		}
		
		parentPart.add( this );
	}
}



export { Robot, DOFZ };