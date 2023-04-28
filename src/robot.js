
//
//	Virtual Prosthetics 1.0
//	Robot
//
//	class Robot extends THREE.Group
//		constructor( )
//		addChain( ...parts )
//		showSlots( )
//		getPosition( )
//		setPosition( x, y=0, z=0 )
//		setRotation( x, y=0, z=0, order='XYZ' )
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


import * as THREE from "../libs/three.module.min.js";
import {getScene} from "./scene.js";
import {Part} from "./part.js";
import {Sensor} from "./sensor.js";


	
	
class Robot extends THREE.Group
{
	constructor( )
	{
		super( );
		
		this.receiveShadow = true;
		this.castShadow = true;
		
		this.parts = null;
		this.motors = null;
		this.sensors = null;
			
		getScene().add( this );
	}

	getPosition( )
	{
		return [this.position.x, this.position.y, this.position.z ];
	}

	setPosition( x, y=0, z=0 )
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

	setRotation( x, y=0, z=0, order='XYZ' )
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
			this.sensors = [];
			
			this.traverse( x => {
				if( x instanceof Part )
				{
					this.parts.push( x );
				}
				if( x instanceof Sensor )
				{
					this.sensors.push( x );
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
	
	getSensors( )
	{
		this.#prepare( );
		
		return this.sensors;
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