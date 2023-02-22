
//
//	Robot parts shapes for Virtual prosthetics
//
//	Phalange( length=1.0, width=0.3, thickness=0.3 )
//	EndPhalange( length=1.0, width=0.3, thickness=0.3 )
//



import * as THREE from "three";
import { ConvexGeometry } from "libs/geometries/ConvexGeometry.js";



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
				shininess: 200,
			});
			
const JOINT_RADUIS = 0.05;
const JOINT_HEIGHT = 0.02;

const JOINT_GEOMETRY = new THREE.CylinderGeometry( 1, 1, 1 );



class Part extends THREE.Group
{
	constructor( ...dofs )
	{
		super( );

		this.rotation.reorder( 'YZX' );
		this.receiveShadow = true;
		this.castShadow = true;
		
		this.dofs = dofs;
		this.slots = [];
		
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
	
	// add edges (for visual effect)
	image.add( new THREE.LineSegments(
				new THREE.EdgesGeometry( image.geometry ),
				EDGE_MATERIAL
			) );
			
	return image;
}


function dofZ( width )
{
	// add a joint for DOF=1
	var joint = new THREE.Mesh(	JOINT_GEOMETRY, JOINT_MATERIAL );
		joint.scale.set( JOINT_RADUIS, 0.6*width, JOINT_RADUIS );
		joint.rotation.x = Math.PI/2;
		
	return joint;
}


function dofY( width )
{
	// add a joint for DOF=1
	var joint = new THREE.Mesh(	JOINT_GEOMETRY, JOINT_MATERIAL );
		joint.scale.set( 0.5*width, JOINT_HEIGHT, 0.5*width );
		
	return joint;
}


class Phalange extends Part
{
	constructor ( length=1.0, width=0.3, thickness=0.3, ...dofs )
	{
		super( ...dofs );
		
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
		this.add( dofZ(width) );
		this.add( dofY(width) );
		
		this.slots = [new THREE.Vector3(0,length,0)];
	} // Phalange.constructor

	
} // Phalange



class EndPhalange extends Part
{
	constructor ( length=1.0, width=0.3, thickness=0.3, ...dofs )
	{
		super( ...dofs );
		
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
		this.add( dofZ(width) );
		
		this.slots = [];
	} // EndPhalange.constructor
	
} // EndPhalange



export { Phalange, EndPhalange };