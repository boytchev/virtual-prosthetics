
//
//



import * as THREE from "../libs/three.module.js";
import { ConvexGeometry } from "../libs/geometries/ConvexGeometry.js";
import {Part} from "./part.js";



// default materials 
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



//

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


export { Phalange, EndPhalange };