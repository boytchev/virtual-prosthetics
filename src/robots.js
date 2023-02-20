
//
//	Robots and robot parts for Virtual prosthetics
//
//	RobotPart( shape, dof1, dof2, ... )
//
//	DOFZ( min=0, max=PI/2, initial=0 )
//


import * as THREE from "three";


class RobotPart extends THREE.Group
{
	constructor( shape, ...dofs )
	{
		super( );

		this.rotation.reorder( 'YZX' );
		
		this.dofs = dofs;
		this.slots = shape.slots();
		
		this.add( shape );
		
		this.reset( );
	}
	
	angles( ...angles )
	{
		for( var i=0; i<Math.min(this.dofs.length,angles.length); i++ )
		{
			var dof = this.dofs[i];
			this.rotation[dof.axis] = THREE.MathUtils.clamp( angles[i], dof.min, dof.max );
		}
	}
	
	reset( )
	{
		for( var dof of this.dofs )
		{
			this.rotation[dof.axis] = dof.initial;
		}
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



export { RobotPart, DOFZ };