
//
//	Robot parts shapes for Virtual prosthetics
//
//	Phalange( length=1.0, width=0.3, thickness=0.3 )
//	EndPhalange( length=1.0, width=0.3, thickness=0.3 )
//



import * as THREE from "../libs/three.module.js";
import {scene} from "./scene.js";
import {Part} from "./part.js";


class Robot extends THREE.Group
{
	constructor( )
	{
		super( );
		
		this.receiveShadow = true;
		this.castShadow = true;
		
		scene.add( this );
		
		this.parts = null;
		this.motors = null;
	}

	getPosition( )
	{
		return [this.position.x, this.position.y, this.position.z ];
	}

	setPosition( x, y, z )
	{
		if( isNaN(x) || isNaN(y) || isNaN(z) )
		{
			scene.remove( this );
		}
		else
		{
			this.position.set( x, y, z );
			if( this.parent !== scene ) scene.add( this );
		}
	}

	chain( ...parts )
	{
		for( var i=1; i<parts.length; i++ )
			parts[i].attachTo( parts[i-1] );
	}
	
	prepare( )
	{
		if( this.parts === null )
		{
			this.parts = [];
			this.motors = [];
			
			this.traverse( x => {
				if( x instanceof Part )
				{
					this.parts.push( x );
				}
				if( x.axis != null )
				{
					this.motors.push( x );
				}
			} );
		}
	}
	
	getParts( )
	{
		this.prepare( );
		
		return this.parts;
	}
	
	getMotors( )
	{
		this.prepare( );
		
		return this.motors;
	}
	
	getDOF( )
	{
		this.prepare( );
		
		return this.motors.length;
	}
	
	setAngles( ...angles )
	{
		this.prepare( );
		
		var n = Math.min( this.motors.length, angles.length );
		
		for( var i=0; i<n; i++ )
			this.motors[i].setAngle( angles[i] );
	}
	
	getAngles( )
	{
		this.prepare( );
		
		var angles = [];
		
		for( var motor of this.motors )
			angles.push( motor.getAngle() );
		
		return angles;
	}
	
	setAngle( index, angle )
	{
		this.prepare( );
		
		if( typeof this.motors[index] === 'undefined' )
			return;
		
		if( !Number.isNaN(angle) )
			return;
		
		this.motors[index][1].setAngle( angle );
	}

	getAngle( index )
	{
		this.prepare( );
		
		if( typeof this.motors[index] === 'undefined' )
			return 0;
		
		return this.motors[index][1].getAngle( );
	}
}


export { Robot };