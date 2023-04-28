
//
//	Virtual Prosthetics 1.0
//	Sensor
//
//	class Sensor extends Part
//		constructor( visible=true )
//		addLaser( color='crimson' )
//		getLaser( )
//		senseDistance( )
//		senseTouch( )
//		sensePosition( )
//		senseCollision( )
//		senseObjects( )
//		senseObject( otherObject )
//

import * as THREE from "../libs/three.module.min.js";
import { getScene, getTime } from "./scene.js";
import { Part } from "./part.js";
import { Laser } from "./laser.js";
import { sensorTexture } from "./textures.js";




var GEOMETRY = new THREE.SphereGeometry( 1, 32, 8, 0, 2*Math.PI, 0, Math.PI/2 ),
	MATERIAL = new THREE.MeshLambertMaterial( {color: 'lightgray', map: sensorTexture} );

// shared position, direction and raycaster
var pos = new THREE.Vector3(),
	dir = new THREE.Vector3();
	
var raycaster = new THREE.Raycaster();
	raycaster.params = {
			Mesh: {},
			Line: { threshold: 0 },
			LOD: {},
			Points: { threshold: 0 },
			Sprite: {}
		};

// dummy vectors, can be reused at any time for any purpose
var v = new THREE.Vector3(),
	u = new THREE.Vector3();

	
// class for sensors

class Sensor extends Part
{
	constructor( visible=true )
	{
		super( );

		if( visible )
		{
			var pad = new THREE.Mesh( GEOMETRY, MATERIAL );
				pad.scale.set( 0.1, 0.05, 0.1 );
			
			this.add( pad );
		}
		this.laser = undefined;
	}

	getWorldDirectionY( target )
	{
		this.updateWorldMatrix( true, false );
		var e = this.matrixWorld.elements;
		return target.set( e[4], e[5], e[6] ).normalize();
	}

	addLaser( color='crimson' )
	{
		if( this.laser ) return;
		this.laser = new Laser( color );
		getScene().add( this.laser );
		
		return this;
	}
	
	getLaser( )
	{
		return this.laser;
	}
	
	senseDistance( )
	{
		raycaster.near = 0.05;
		raycaster.far = Infinity;
		
		this.getWorldPosition( pos );
		this.getWorldDirectionY( dir );
		
		raycaster.set( pos, dir );
		
		var intersect = raycaster.intersectObject( getScene(), true );
		if( intersect.length > 0 )
		{
			if( this.laser )
			{
				// set the end point of laser
				this.laser.set( pos, intersect[0].point );
			}
			return intersect[0].distance;
		}
		else
		{
			if( this.laser )
			{
				// set "infinite" end point of laser
				v.set( 0, 0.055, 0 );
				this.laser.set( pos, this.localToWorld(v) );
			}
			return Infinity;
		}
	}
	
	senseTouch( )
	{
		raycaster.near = 0;
		raycaster.far = 0.05;

		this.getWorldPosition( pos );
		this.getWorldDirectionY( dir );
		
		raycaster.set( pos, dir );
		
		if( this.laser )
		{
			// set the end point of laser
			// the shift in X is to eliminate the chance
			// of the raycaster to hit the laser
			u.set( 0.01, raycaster.near, 0 );
			v.set( 0.01, raycaster.far, 0 );
			this.laser.set( this.localToWorld(u), this.localToWorld(v) );
		}

		var intersect = raycaster.intersectObject( getScene(), true );
		
		if( intersect.length > 0 )
		{
//			console.log( intersect );
			return 1 - intersect[0].distance/(raycaster.far-raycaster.near);
		}
		else
			return 0;
	}
	
	sensePosition( )
	{
		this.getWorldPosition( pos );
		return [pos.x, pos.y, pos.z];
	}
	
	senseCollision( )
	{
		for( var object=this.parent; object; object=object.parent )
			if( object.collisions )
				return object.collisions.length > 0;
		
		return false;
	}
	
	senseObjects( )
	{
		for( var object=this.parent; object; object=object.parent )
			if( object.collisions )
				return object.collisions;
		
		return [];
	}
	
	senseObject( otherObject )
	{
		for( var object=this.parent; object; object=object.parent )
			if( object.collisions )
				return object.collisions.indexOf( otherObject ) >= 0;

		return false;
	}
}


export { Sensor };