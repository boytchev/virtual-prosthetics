
//
//	Sensor for Virtual prosthetics
//
//	class Sensor extends THREE.Group
//		constructor( x, y, z )
//		setRotation( x, y, z, order='XYZ' )
//		addLaser( color='crimson' )
//		getLaser( )
//		senseDistance( )
//		senseTouch( )
//		sensePosition( )
//

import * as THREE from "../libs/three.module.js";
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

// dummy vector, can be reused at any time for any purpose
var v = new THREE.Vector3();

	
// class for sensors

class Sensor extends Part
{
	constructor( )
	{
		super( );

		var pad = new THREE.Mesh( GEOMETRY, MATERIAL );
			pad.scale.set( 0.1, 0.05, 0.1 );
		
		this.laser = undefined;
		
		this.add( pad );
	}

	setRotation( x, y, z, order='XYZ' )
	{
		this.rotation.set( x, y, z, order );
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
		raycaster.far = 0.15;

		this.getWorldPosition( pos );
		this.getWorldDirectionY( dir );
		
		raycaster.set( pos, dir );
		
		var intersect = raycaster.intersectObject( getScene(), true );
		if( intersect.length > 0 )
			return intersect[0].distance/raycaster.far;
		else
			return 0;
	}
	
	sensePosition( )
	{
		this.getWorldPosition( pos );
		return [pos.x, pos.y, pos.z];
	}
}


export { Sensor };