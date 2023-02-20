
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

const JOINT_GEOMETRY = new THREE.CylinderGeometry( 1, 1, 1 );




class Phalange extends THREE.Mesh
{
	constructor ( length=1.0, width=0.3, thickness=0.3 )
	{
		// profile shape (2D)
		var L = length,
			W = width/2,
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
		
		// extrude 2D shape to a list of 3D points
		var vertices = [];
		for( var i=0; i<shape.length; i+=2 )
		{
			vertices.push( new THREE.Vector3( shape[i], shape[i+1], W ) );
			vertices.push( new THREE.Vector3( shape[i], shape[i+1], -W ) );
		}

		// create main mesh
		super( new ConvexGeometry( vertices ), MATERIAL );
		
		this.length = length;
		this.receiveShadow = true;
		this.castShadow = true;
		
		// add edges (for visual effect)
		this.add( new THREE.LineSegments(
					new THREE.EdgesGeometry( this.geometry ),
					EDGE_MATERIAL
				) );

		// add a joint for DOF=1
		var joint = new THREE.Mesh(	JOINT_GEOMETRY, JOINT_MATERIAL );
			joint.scale.set( JOINT_RADUIS, 0.6*width, JOINT_RADUIS );
			joint.rotation.x = Math.PI/2;
		this.add( joint );
	} // Phalange.constructor


	// slots for attaching next elements
	slots( )
	{
		return [new THREE.Vector3( 0, this.length, 0 )];
	} // Phalange.slots

	
} // Phalange



class EndPhalange extends THREE.Mesh
{
	constructor ( length=1.0, width=0.3, thickness=0.3 )
	{
		// profile shape (2D)
		var L = length,
			W = width/2,
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
		
		// extrude 2D shape to a list of 3D points
		var vertices = [];
		for( var i=0; i<shape.length; i+=2 )
		{
			vertices.push( new THREE.Vector3( shape[i], shape[i+1], W ) );
			vertices.push( new THREE.Vector3( shape[i], shape[i+1], -W ) );
		}

		// create main mesh
		super( new ConvexGeometry( vertices ), MATERIAL );
		
		this.length = length;
		this.receiveShadow = true;
		this.castShadow = true;
		
		// add edges (for visual effect)
		this.add( new THREE.LineSegments(
					new THREE.EdgesGeometry( this.geometry ),
					EDGE_MATERIAL
				) );

		// add a joint for DOF=1
		var joint = new THREE.Mesh(	JOINT_GEOMETRY, JOINT_MATERIAL );
			joint.scale.set( JOINT_RADUIS, 0.6*width, JOINT_RADUIS );
			joint.rotation.x = Math.PI/2;
		this.add( joint );
	} // EndPhalange.constructor


	// slots for attaching next elements
	slots( )
	{
		return [];
	} // EndPhalange.slots
	
} // EndPhalange



export { Phalange, EndPhalange };