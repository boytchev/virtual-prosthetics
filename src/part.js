
//
//	Robot parts shapes for Virtual prosthetics
//
//	Phalange( length=1.0, width=0.3, thickness=0.3 )
//	EndPhalange( length=1.0, width=0.3, thickness=0.3 )
//



import * as THREE from "../libs/three.module.js";
import { ConvexGeometry } from "../libs/geometries/ConvexGeometry.js";



const MATERIAL = new THREE.MeshLambertMaterial({
				color: 'White',
				polygonOffset: true,
				polygonOffsetUnits: 1,
				polygonOffsetFactor: 1,
			});

const EDGE_MATERIAL = new THREE.LineBasicMaterial({
					color: 'Black',
					transparent: true,
					opacity: 0.3,
				});

const JOINT_MATERIAL = new THREE.MeshPhongMaterial({
				color: 0x404040,
				shininess: 100,
			});
			
const JOINT_RADUIS = 0.05;
const JOINT_HEIGHT = 0.02;

const JOINT_GEOMETRY = new THREE.CylinderGeometry( 1, 1, 1, 30 );
const JOINT_GEOMETRY_Y = new THREE.CylinderGeometry( 1, 1, 1 ).translate(0,0.5,0);



class Part extends THREE.Group
{
	constructor( )
	{
		super( );

		this.name = `part${this.id}`;
		
		this.receiveShadow = true;
		this.castShadow = true;
		
		this.slots = [];
		
		// rotation
		this.axis = null;
		this.min = null;
		this.max = null;
		this.def = null;
		
		//this.attached = [];
		
		//this.reset( );
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
	
	reset( )
	{
		if( this.axis && this.def )
			this.rotation[this.axis] = this.def;
	}
	
	attachTo( parentPart, slot=0 )
	{
		if( parentPart.slots instanceof Array )
		{
			if( slot >= parentPart.slots.length )
				throw 'Error: invalid slot';
			
			this.position.copy( parentPart.slots[slot] );
		}

		parentPart.add( this );
	}
	
	attachToPosition( parentPart, x=0, y=0, z=0 )
	{
		this.position.set( x, y, z );
		parentPart.add( this );
	}
	
}


function extrudeShape( shape, width )
{
	// shape is array of 2D coordinates
	// convert it to array of 3D vectors
	var vertices = [];
	for( var i=0; i<shape.length; i+=2 )
	{
		vertices.push( new THREE.Vector3( shape[i], shape[i+1], width/2 ) );
		vertices.push( new THREE.Vector3( shape[i], shape[i+1], -width/2 ) );
	}

	// build the 3D shape
	var image = new THREE.Mesh(new ConvexGeometry( vertices ), MATERIAL); 
		image.receiveShadow = true;
		image.castShadow = true;
		
	// add edges (for visual effect)
	image.add( new THREE.LineSegments(
				new THREE.EdgesGeometry( image.geometry ),
				EDGE_MATERIAL
			) );
			
	return image;
}





class MotorX extends Part
{
	constructor ( min, max, def, width=0.1, radius=0.02 )
	{
		super( );
		
		this.axis = 'x';
		this.min = Math.min( min, max );
		this.max = Math.max( min, max );
		this.def = THREE.MathUtils.clamp( def, this.min, this.max );
		
		var image = new THREE.Mesh(	JOINT_GEOMETRY, JOINT_MATERIAL );
			image.rotation.z = Math.PI/2;
			image.scale.set( radius, width, radius );

		// create main mesh
		this.add( image );
		
		this.slots = [new THREE.Vector3(0,radius/2,0)];
		
		this.reset( );
	} // MotorX.constructor

} // MotorX



class MotorY extends Part
{
	constructor ( min, max, def, radius=0.1, length=0.02 )
	{
		super( );
		
		this.axis = 'y';
		this.min = Math.min( min, max );
		this.max = Math.max( min, max );
		this.def = THREE.MathUtils.clamp( def, this.min, this.max );
		
		var image = new THREE.Mesh(	JOINT_GEOMETRY_Y, JOINT_MATERIAL );
			image.scale.set( radius, length, radius );

		// add edges (for visual effect)
		// image.add( new THREE.LineSegments(
				// new THREE.EdgesGeometry( image.geometry, 60 ),
				// EDGE_MATERIAL
			// ) );

		// create main mesh
		this.add( image );
		
		this.slots = [new THREE.Vector3(0,length,0)];
		
		this.reset( );
	} // MotorY.constructor

} // MotorY



class MotorZ extends Part
{
	constructor ( min, max, def, width=0.1, radius=0.02 )
	{
		super( );
		
		this.axis = 'z';
		this.min = Math.min( min, max );
		this.max = Math.max( min, max );
		this.def = THREE.MathUtils.clamp( def, this.min, this.max );
		
		var image = new THREE.Mesh(	JOINT_GEOMETRY, JOINT_MATERIAL );
			image.rotation.x = Math.PI/2;
			image.scale.set( radius, width, radius );

		// add edges (for visual effect)
		// image.add( new THREE.LineSegments(
				// new THREE.EdgesGeometry( image.geometry, 60 ),
				// EDGE_MATERIAL
			// ) );
			
		// create main mesh
		this.add( image );
		
		this.slots = [new THREE.Vector3(0,radius/2,0)];
		
		this.reset( );
	} // MotorZ.constructor

} // MotorZ



class Phalange extends Part
{
	constructor ( length=1.0, width=0.3, thickness=0.3 )
	{
		super( );
		
		// profile shape (2D)
		var L = length,
			T = thickness/2,
			I = Math.min( length, thickness ) / 8,
			E = 0.003;
			
		var shape = [
				-T,   I,
				-T+I, E,
				 0,   E,
				 T,   T,
				 T,   L-T-E,
				 0,   L-E,
				-T+I, L-E,
				-T,   L-I ];
		
		// create main mesh
		this.add( extrudeShape(shape,width) );
		
		this.slots = [new THREE.Vector3(0,length,0)];
	} // Phalange.constructor

	
} // Phalange



class EndPhalange extends Part
{
	constructor ( length=1.0, width=0.3, thickness=0.3 )
	{
		super( );
		
		// profile shape (2D)
		var L = length,
			T = thickness/2,
			I = Math.min( length, thickness ) / 8,
			E = 0.003;
			
		var shape = [
				-T,   I,
				-T+I, E,
				 0,   E,
				 T,   T,
				 T,   L-I-E,
				 T-I, L-E,
				-T+I, L-E,
				-T,   L-I ];
		
		// create main mesh
		this.add( extrudeShape(shape,width) );
		
		this.slots = [];
	} // EndPhalange.constructor
	
} // EndPhalange


export { Part, Phalange, EndPhalange, MotorX, MotorY, MotorZ };