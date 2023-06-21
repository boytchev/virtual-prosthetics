
//
//	Virtual Prosthetics 1.0
//	Round Hand parts
//
//	class RoundFinger( filename, length=1.0, width=0.3, thickness=0.3 )
//	class RoundPalmLeft( length=1.4, width=1.4, thickness=0.3 )
//	class RoundPalmRight( length=1.4, width=1.4, thickness=0.3 )
//


import * as THREE from "../libs/three.module.min.js";
import { ConvexGeometry } from "../libs/geometries/ConvexGeometry.js";
import { GLTFPart} from "./part-gltf.js";
import { getScene } from "./scene.js";
import { physics } from "./engine.js";


const VERTICES = {
	'round-finger-5.glb': [[0.14,0.09,0.14],[0.14,0.09,-0.14],[0.15,0.03,0.15],[0.15,0.03,-0.15],[0.15,-0.03,0.15],[0.15,-0.03,-0.15],[0.14,-0.13,0.14],[0.14,-0.13,-0.14],[-0.14,0.21,-0.14],[-0.14,0.21,0.14],[-0.15,0.03,-0.15],[-0.15,0.03,0.15],[-0.15,-0.03,-0.15],[-0.15,-0.03,0.15],[-0.14,-0.25,-0.14],[-0.14,-0.25,0.14]],
	'round-finger-8.glb': [[0.13,0.24,0.13],[0.13,0.24,-0.13],[0.15,0.11,0.15],[0.15,0.11,-0.15],[0.15,-0.11,0.15],[0.15,-0.11,-0.15],[0.13,-0.3,0.13],[0.13,-0.3,-0.13],[-0.13,0.35,-0.13],[-0.13,0.35,0.13],[-0.15,0.11,-0.15],[-0.15,0.11,0.15],[-0.15,-0.11,-0.15],[-0.15,-0.11,0.15],[-0.13,-0.4,-0.13],[-0.13,-0.4,0.13]],
	'round-tip.glb': [[0.1/2,0.25/2,0.08/2],[0.1/2,0.25/2,-0.08/2],[0.15/2,0.08/2,0.15/2],[0.15/2,0.08/2,-0.15/2],[0.15/2,-0.06/2,0.15/2],[0.15/2,-0.06/2,-0.15/2],[0.14/2,-0.13/2,0.14/2],[0.14/2,-0.13/2,-0.14/2],[-0.06/2,0.25/2,-0.08/2],[-0.06/2,0.25/2,0.08/2],[-0.15/2,0.08/2,-0.15/2],[-0.15/2,0.08/2,0.15/2],[-0.15/2,-0.06/2,-0.15/2],[-0.15/2,-0.06/2,0.15/2],[-0.14/2,-0.25/2,-0.14/2],[-0.14/2,-0.25/2,0.14]],
}

const FACES = {
	'round-finger-5.glb': [[0,2,3,1],[2,4,5,3],[4,6,7,5],[1,3,10,8],[3,5,12,10],[5,7,14,12],[8,10,11,9],[10,12,13,11],[12,14,15,13],[9,11,2,0],[11,13,4,2],[13,15,6,4],[1,8,9,0],[6,15,14,7]],
	'round-finger-8.glb': [[0,2,3,1],[2,4,5,3],[4,6,7,5],[1,3,10,8],[3,5,12,10],[5,7,14,12],[8,10,11,9],[10,12,13,11],[12,14,15,13],[9,11,2,0],[11,13,4,2],[13,15,6,4],[1,8,9,0],[6,15,14,7]],
	'round-tip.glb': [[0,2,3,1],[2,4,5,3],[4,6,7,5],[1,3,10,8],[3,5,12,10],[5,7,14,12],[8,10,11,9],[10,12,13,11],[12,14,15,13],[9,11,2,0],[11,13,4,2],[13,15,6,4],[1,8,9,0],[6,15,14,7]],
}




class RoundFinger extends GLTFPart
{
	constructor ( filename, length=0.8 )
	{
		super( filename, length, recolor );
		
		this.addSlot( 0, length, 0 );
		
		filename = filename.split('/').pop();
		if( VERTICES[filename] && FACES[filename] )
		{
			// 3D convex shape
			var vertices = [...VERTICES[filename]];
			var faces = FACES[filename];

			// physics
			this.physics = physics.convex( vertices, faces );
			this.physics.threejs = this;
			this.debugConvex( vertices, faces );
		
			physics.bodies.push( this );
		}
		
		var that = this;
		function recolor( )
		{
			that.recolor( [0,0.21,1], [0.3,0.3,0.3] );
		}
	} // RoundFinger.constructor

	
} // RoundFinger





class RoundPalmLeft extends GLTFPart
{
	constructor ( filename, length=1.4, width=1.4, thickness=0.3 )
	{
		super( filename, length, recolor );
		
		this.flip = 1;
		
		var slot = this.addSlot( 0.58*length, 0.55*length, 0 );
		slot.setRotation( Math.PI, -Math.PI/2, Math.PI/2+0.12, 'ZXY' );
		
		slot = this.addSlot( 0.36*length, 1.13*length, -0.0*length );
		slot.setRotation( 0, Math.PI/2, -3*Math.PI/180, 'ZXY' );
		
		slot = this.addSlot( 0.12*length, 1.17*length, -0.0*length );
		slot.setRotation( 0, Math.PI/2, -1*Math.PI/180, 'ZXY' );
		
		slot = this.addSlot( -0.12*length, 1.16*length, -0.0*length );
		slot.setRotation( 0, Math.PI/2, 1*Math.PI/180, 'ZXY' );

		slot = this.addSlot( -0.36*length, 1.09*length, -0.0*length );
		slot.setRotation( 0, Math.PI/2, 3*Math.PI/180, 'ZXY' );
		
		filename = filename.split('/').pop();
		if( VERTICES[filename] && FACES[filename] )
		{
			
			// 3D convex shape
			var vertices = [...VERTICES[filename]];
			var faces = FACES[filename];
			
			// physics
			this.physics = physics.convex( vertices, faces );
			this.physics.threejs = this;
			this.debugConvex( vertices, faces );
		
			physics.bodies.push( this );
		}

		var that = this;
		function recolor( )
		{
			that.recolor( [0,0.21,1], [0.3,0.3,0.3] );
		}
	} // RoundPalmLeft.constructor
	
} // RoundPalmLeft




class RoundPalmRight extends GLTFPart
{
	constructor ( filename, length=1.4, width=1.4, thickness=0.3 )
	{
		super( filename, length, recolor );
		
		this.flip = -1;
		
		var slot = this.addSlot( -0.58*length, 0.55*length, 0 );
		slot.setRotation( Math.PI*0, Math.PI/2, Math.PI/2-0.12, 'ZXY' );
		
		slot = this.addSlot( -0.36*length, 1.13*length, -0.0*length );
		slot.setRotation( 0, Math.PI/2, 3*Math.PI/180, 'ZXY' );
		
		slot = this.addSlot( -0.12*length, 1.17*length, -0.0*length );
		slot.setRotation( 0, Math.PI/2, 1*Math.PI/180, 'ZXY' );
		
		slot = this.addSlot( 0.12*length, 1.16*length, -0.0*length );
		slot.setRotation( 0, Math.PI/2, -1*Math.PI/180, 'ZXY' );

		slot = this.addSlot( 0.36*length, 1.09*length, -0.0*length );
		slot.setRotation( 0, Math.PI/2, -3*Math.PI/180, 'ZXY' );
		
		filename = filename.split('/').pop();
		if( VERTICES[filename] && FACES[filename] )
		{
			
			// 3D convex shape
			var vertices = [...VERTICES[filename]];
			var faces = FACES[filename];
			
			// physics
			this.physics = physics.convex( vertices, faces );
			this.physics.threejs = this;
			this.debugConvex( vertices, faces );
		
			physics.bodies.push( this );
		}

		var that = this;
		function recolor( )
		{
			that.recolor( [0,0.21,1], [0.3,0.3,0.3] );
		}
	} // RoundPalmRight.constructor
	
} // RoundPalmRight


export { RoundFinger, RoundPalmLeft, RoundPalmRight };