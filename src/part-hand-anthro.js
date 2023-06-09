
//
//	Virtual Prosthetics 1.0
//	Antropomorphic Hand parts
//
//	class GLTFPart( filename );
//	class PhalangeAnthro( filename, length=1.0, width=0.3, thickness=0.3 )
//	class EndPhalangeAnthro( filename, length=1.0, width=0.3, thickness=0.3 )
//	class LeftPalm( length=1.4, width=1.4, thickness=0.3 )
//	class RightPalm( length=1.4, width=1.4, thickness=0.3 )
//


import * as THREE from "../libs/three.module.min.js";
import { ConvexGeometry } from "../libs/geometries/ConvexGeometry.js";
import { GLTFLoader } from "../libs/loaders/GLTFLoader.js";
import { Part} from "./part.js";
import { getBodies, getScene } from "./scene.js";
import { physics, OPTION_TOUCH_COLOR } from "./engine.js";


// default materials 
const GEOMETRY = new THREE.BoxGeometry( 1, 1, 1 );

const MATERIAL = new THREE.MeshPhysicalMaterial({
				color: 'white',
				
				clearcoat: 1.0,
				clearcoatRoughness: 0.0,
				
				metalness: 0.0,
				roughness: 0.0,
	
				specularIntensity: 1,
				specularColor: 'crimson',
				
				emissive: OPTION_TOUCH_COLOR,
				emissiveIntensity: 0,
				
				vertexColors: true,
			});

const VERTICES = {
	'phalange5x3.glb': [[0.14,0.09,0.14],[0.14,0.09,-0.14],[0.15,0.03,0.15],[0.15,0.03,-0.15],[0.15,-0.03,0.15],[0.15,-0.03,-0.15],[0.14,-0.13,0.14],[0.14,-0.13,-0.14],[-0.14,0.21,-0.14],[-0.14,0.21,0.14],[-0.15,0.03,-0.15],[-0.15,0.03,0.15],[-0.15,-0.03,-0.15],[-0.15,-0.03,0.15],[-0.14,-0.25,-0.14],[-0.14,-0.25,0.14]],
	'phalange8x3.glb': [[0.13,0.24,0.13],[0.13,0.24,-0.13],[0.15,0.11,0.15],[0.15,0.11,-0.15],[0.15,-0.11,0.15],[0.15,-0.11,-0.15],[0.13,-0.3,0.13],[0.13,-0.3,-0.13],[-0.13,0.35,-0.13],[-0.13,0.35,0.13],[-0.15,0.11,-0.15],[-0.15,0.11,0.15],[-0.15,-0.11,-0.15],[-0.15,-0.11,0.15],[-0.13,-0.4,-0.13],[-0.13,-0.4,0.13]],
	'phalange10x3.glb': [[0.13,0.34,0.13],[0.13,0.34,-0.13],[0.15,0.16,0.15],[0.15,0.16,-0.15],[0.15,-0.16,0.15],[0.15,-0.16,-0.15],[0.13,-0.4,0.13],[0.13,-0.4,-0.13],[-0.13,0.44,-0.13],[-0.13,0.44,0.13],[-0.15,0.16,-0.15],[-0.15,0.16,0.15],[-0.15,-0.16,-0.15],[-0.15,-0.16,0.15],[-0.13,-0.5,-0.13],[-0.13,-0.5,0.13]],
	'phalange11x3.glb': [[0.13,0.4,0.13],[0.13,0.4,-0.13],[0.15,0.18,0.15],[0.15,0.18,-0.15],[0.15,-0.18,0.15],[0.15,-0.18,-0.15],[0.13,-0.46,0.13],[0.13,-0.46,-0.13],[-0.13,0.49,-0.13],[-0.13,0.49,0.13],[-0.15,0.18,-0.15],[-0.15,0.18,0.15],[-0.15,-0.18,-0.15],[-0.15,-0.18,0.15],[-0.13,-0.55,-0.13],[-0.13,-0.55,0.13]],
	'endPhalange5x3.glb': [[0.1,0.25,0.08],[0.1,0.25,-0.08],[0.15,0.08,0.15],[0.15,0.08,-0.15],[0.15,-0.06,0.15],[0.15,-0.06,-0.15],[0.14,-0.13,0.14],[0.14,-0.13,-0.14],[-0.06,0.25,-0.08],[-0.06,0.25,0.08],[-0.15,0.08,-0.15],[-0.15,0.08,0.15],[-0.15,-0.06,-0.15],[-0.15,-0.06,0.15],[-0.14,-0.25,-0.14],[-0.14,-0.25,0.14]],
}

const FACES = {
	'phalange5x3.glb': [[0,2,3,1],[2,4,5,3],[4,6,7,5],[1,3,10,8],[3,5,12,10],[5,7,14,12],[8,10,11,9],[10,12,13,11],[12,14,15,13],[9,11,2,0],[11,13,4,2],[13,15,6,4],[1,8,9,0],[6,15,14,7]],
	'phalange8x3.glb': [[0,2,3,1],[2,4,5,3],[4,6,7,5],[1,3,10,8],[3,5,12,10],[5,7,14,12],[8,10,11,9],[10,12,13,11],[12,14,15,13],[9,11,2,0],[11,13,4,2],[13,15,6,4],[1,8,9,0],[6,15,14,7]],
	'phalange10x3.glb': [[0,2,3,1],[2,4,5,3],[4,6,7,5],[1,3,10,8],[3,5,12,10],[5,7,14,12],[8,10,11,9],[10,12,13,11],[12,14,15,13],[9,11,2,0],[11,13,4,2],[13,15,6,4],[1,8,9,0],[6,15,14,7]],
	'phalange11x3.glb': [[0,2,3,1],[2,4,5,3],[4,6,7,5],[1,3,10,8],[3,5,12,10],[5,7,14,12],[8,10,11,9],[10,12,13,11],[12,14,15,13],[9,11,2,0],[11,13,4,2],[13,15,6,4],[1,8,9,0],[6,15,14,7]],
	'endPhalange5x3.glb': [[0,2,3,1],[2,4,5,3],[4,6,7,5],[1,3,10,8],[3,5,12,10],[5,7,14,12],[8,10,11,9],[10,12,13,11],[12,14,15,13],[9,11,2,0],[11,13,4,2],[13,15,6,4],[1,8,9,0],[6,15,14,7]],
}



var loader = new GLTFLoader();



class GLTFPart extends Part
{
	constructor ( filename, length, callback )
	{
		super( );

		this.mainMesh = new THREE.Mesh( GEOMETRY, MATERIAL.clone() );
		this.mainMesh.castShadow = true;
		this.mainMesh.receiveShadow = true;

		loader.load( filename, gltf => {
			this.mainMesh.geometry = gltf.scene.children[0].geometry;
			this.mainMesh.scale.copy( gltf.scene.children[0].scale );
			if( callback ) callback();
		} );
		
		// create main mesh
		this.mainMesh.position.y = length/2;
		
		var overMesh = new THREE.Group();
		overMesh.add( this.mainMesh );
		this.add( overMesh );
	} // GLTFPart.constructor

	recolor( fromColor, toColor, eps=0.01 )
	{
		var col = this.mainMesh.geometry.getAttribute( 'color' );

		for( var i=0; i<col.count; i++ )
		{
			var r = col.getX( i ),
				g = col.getY( i ),
				b = col.getZ( i );
			
			if( Math.abs(r-fromColor[0]) < eps )
			if( Math.abs(g-fromColor[1]) < eps )
			if( Math.abs(b-fromColor[2]) < eps )
			{
				col.setXYZ( i, ...toColor );
			}
		}
		
		col.needsUpdate = true;
	}
	
} // GLTFPart






class PhalangeAnthro extends GLTFPart
{
	constructor ( filename, length=1.0, width=0.3, thickness=0.3 )
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
		
			getBodies().push( this );
		}
		
		var that = this;
		function recolor( )
		{
			that.recolor( [0,0.21,1], [0.2,0.7,1] );
		}
	} // PhalangeAnthro.constructor

	
} // PhalangeAnthro



class EndPhalangeAnthro extends PhalangeAnthro
{
} // EndPhalangeAnthro




class LeftPalmAnthro extends GLTFPart
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
		
			getBodies().push( this );
		}

		var that = this;
		function recolor( )
		{
			that.recolor( [0,0.21,1], [0.2,0.7,1] );
		}
	} // LeftPalmAnthro.constructor
	
} // LeftPalmAnthro




class RightPalmAnthro extends GLTFPart
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
		
			getBodies().push( this );
		}

		var that = this;
		function recolor( )
		{
			that.recolor( [0,0.21,1], [0.2,0.7,1] );
		}
	} // RightPalmAnthro.constructor
	
} // RightPalmAnthro


export { PhalangeAnthro, EndPhalangeAnthro, LeftPalmAnthro, RightPalmAnthro };