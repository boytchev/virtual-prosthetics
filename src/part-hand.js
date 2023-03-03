
//
//	Shapes for Virtual prosthetics
//
//	class Phalange( length=1.0, width=0.3, thickness=0.3 )
//	class EndPhalange( length=1.0, width=0.3, thickness=0.3 )
//	class LeftPalm( length=1.4, width=1.4, thickness=0.3 )
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
		
		this.addSlot( 0, length, 0 );
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
	} // EndPhalange.constructor
	
} // EndPhalange



class LeftPalm extends Part
{
	constructor ( length=1.4, width=1.4, thickness=0.3 )
	{
		super( );
		
		// profile shape (2D)
		var L = length,
			W = width/2,
			I = width / 8;
			
		var shape = [
				-W+I,   0,			// 0
				 W-2*I, 0,			// 1
				 W,     2*I,		// 2
				 W,     L,			// 3
				-W,     L,			// 4
				-W  ,   L/2,		// 5
			];
		
		// create main mesh
		this.add( extrudeShape(shape,thickness) );
		
		var that = this;
		function addSlot( pointA, pointB, k )
		{
			var xA = shape[2*pointA],
				xB = shape[2*pointB],
				yA = shape[2*pointA+1],
				yB = shape[2*pointB+1];
				
			var slot = that.addSlot( xA*(1-k) + k*xB, yA*(1-k) + k*yB, 0 );
				slot.setRotation( 0, Math.PI/2, Math.PI+Math.atan2( yB-yA, xB-xA ), 'ZXY' );
		}
		
		addSlot( 2, 3, 1/4 ); // slot 0
		addSlot( 3, 4, 1/8 ); // slot 1  
		addSlot( 3, 4, 3/8 ); // slot 2
		addSlot( 3, 4, 5/8 ); // slot 3
		addSlot( 3, 4, 7/8 ); // slot 4
		
	} // LeftPalm.constructor
	
} // LeftPalm



class RightPalm extends Part
{
	constructor ( length=1.4, width=1.4, thickness=0.3 )
	{
		super( );
		
		// profile shape (2D)
		var L = length,
			W = width/2,
			I = width/8;
			
		var shape = [
				 W-I,   0,			// 0
				-W+2*I, 0,			// 1
				-W,     2*I,		// 2
				-W,     L,			// 3
				 W,     L,			// 4
				 W  ,   L/2,		// 5
			];
		
		// create main mesh
		this.add( extrudeShape(shape,thickness) );
		
		var that = this;
		function addSlot( pointA, pointB, k )
		{
			var xA = shape[2*pointA],
				xB = shape[2*pointB],
				yA = shape[2*pointA+1],
				yB = shape[2*pointB+1];
				
			var slot = that.addSlot( xA*(1-k) + k*xB, yA*(1-k) + k*yB, 0 );
				slot.setRotation( 0, Math.PI/2, Math.atan2( yB-yA, xB-xA ), 'ZXY' );
		}
		
		addSlot( 2, 3, 1/4 ); // slot 0
		addSlot( 3, 4, 1/8 ); // slot 1  
		addSlot( 3, 4, 3/8 ); // slot 2
		addSlot( 3, 4, 5/8 ); // slot 3
		addSlot( 3, 4, 7/8 ); // slot 4
		
	} // RightPalm.constructor
	
} // RightPalm


export { Phalange, EndPhalange, LeftPalm, RightPalm };