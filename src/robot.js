
//	Robot API
//	Virtual Prosthetics 1.0
//
//
//	class Robot extends THREE.Group
//
//	constructor( )
//
//	addChain( ...parts )
//
//	showSlots( )
//
//	getParts( )
//	getMotors( )
//
//	getPosition( )
//	setPosition( position )
//	setPosition( x, y, z )
//
//	setRotation( x, y, z, order='XYZ' )
//
//	getAngle( index )
//	setAngle( index, angle )
//
//	getAngles( )
//	setAngles( ...angles )



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


	setPosition( x, y, z )
	{
		var scene = getScene();
		
		if( x === undefined )
		{
			scene.remove( this );
		}
		else
		if( x instanceof Array )
		{
			this.setPosition( ...x );
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
	
	
	setAngles( ...angles )
	{
		this.#prepare( );
		
		var n = Math.min( this.motors.length, angles.length );
		
		for( var i=0; i<n; i++ )
			this.motors[i].setAngle( angles[i] );
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


	getAngle( index )
	{
		this.#prepare( );
		
		if( typeof this.motors[index] === 'undefined' )
			return 0;
		
		return this.motors[index].getAngle( );
	}
	
} // class Robot


export { Robot };