
//
//	Virtual Prosthetics 1.0
//	Robot
//
//	class Robot extends THREE.Group
//		constructor( )
//		addChain( ...parts )
//		showSlots( )
//		getPosition( )
//		setPosition( x, y, z )
//		setRotation( x, y, z, order='XYZ' )
//		getParts( )
//		getMotors( )
//		getDOF( )
//		setAngles( ...angles )
//		setAnglesRelative( ...angles )
//		getAngles( )
//		setAngle( index, angle )
//		setAngleRelative( index, angle )
//		getAngle( index )
//


import * as THREE from "../libs/three.module.js";
import {getScene} from "./scene.js";
import {Part} from "./part.js";


	
	
class Robot extends THREE.Group
{
	constructor( )
	{
		super( );
		
		this.receiveShadow = true;
		this.castShadow = true;
		
		getScene().add( this );
		
		this.parts = null;
		this.motors = null;
	}

	getPosition( )
	{
		return [this.position.x, this.position.y, this.position.z ];
	}

	setPosition( x, y, z )
	{
		var scene = getScene();
		
		if( x === undefined )
		{
			scene.remove( this );
		}
		else
		{
			this.position.set( x, y, z );
			if( this.parent !== scene ) scene.add( this );
		}
	}

	setRotation( x, y, z, order='XYZ' )
	{
		this.rotation.set( x, y, z, order );
	}

	addChain( ...parts )
	{
		for( var i=1; i<parts.length; i++ )
			parts[i].attachToSlot( parts[i-1] );
	}
	
	#prepare( )
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
	
	showSlots( )
	{
		this.#prepare( );
		for( var part of this.parts )
			for( var slot of part.slots )
				slot.show( );
	}
	
	getParts( )
	{
		this.#prepare( );
		
		return this.parts;
	}
	
	getMotors( )
	{
		this.#prepare( );
		
		return this.motors;
	}
	
	getDOF( )
	{
		this.#prepare( );
		
		return this.motors.length;
	}
	
	setAngles( ...angles )
	{
		this.#prepare( );
		
		var n = Math.min( this.motors.length, angles.length );
		
		for( var i=0; i<n; i++ )
			this.motors[i].setAngle( angles[i] );
	}
	
	setAnglesRelative( ...angles )
	{
		this.#prepare( );
		
		var n = Math.min( this.motors.length, angles.length );
		
		for( var i=0; i<n; i++ )
			this.motors[i].setAngleRelative( angles[i] );
	}
	
	getAngles( )
	{
		this.#prepare( );
		
		var angles = [];
		
		for( var motor of this.motors )
			angles.push( motor.getAngle() );
		
		return angles;
	}
	
	setAngle( index, angle )
	{
		this.#prepare( );

		if( typeof this.motors[index] === 'undefined' )
			return;
		
		if( Number.isNaN(angle) )
			return;
		this.motors[index].setAngle( angle );
	}

	setAngleRelative( index, angle )
	{
		this.#prepare( );

		if( typeof this.motors[index] === 'undefined' )
			return;
		
		if( Number.isNaN(angle) )
			return;
		this.motors[index].setAngleRelative( angle );
	}

	getAngle( index )
	{
		this.#prepare( );
		
		if( typeof this.motors[index] === 'undefined' )
			return 0;
		
		return this.motors[index].getAngle( );
	}
}


export { Robot };