
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
	constructor ( filename, length )
	{
		super( );

		this.mainMesh = new THREE.Mesh( GEOMETRY, MATERIAL.clone() );
		this.mainMesh.castShadow = true;
		this.mainMesh.receiveShadow = true;

		loader.load( filename, gltf => {
			this.mainMesh.geometry = gltf.scene.children[0].geometry;
		} );
		
		// create main mesh
		this.mainMesh.position.y = length/2;
		
		var overMesh = new THREE.Group();
		overMesh.add( this.mainMesh );
		this.add( overMesh );
	} // GLTFPart.constructor
	
} // GLTFPart






class PhalangeAnthro extends GLTFPart
{
	constructor ( filename, length=1.0, width=0.3, thickness=0.3 )
	{
		super( filename, length );
		
		// profile shape (2D)
		var L = length,
			T = thickness/2,
			I = Math.min( length, thickness ) / 8,
			W = width,
			E = 0.003;
			
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
		
	} // PhalangeAnthro.constructor

	
} // PhalangeAnthro



class EndPhalangeAnthro extends GLTFPart
{
	constructor ( filename, length=1.0, width=0.3, thickness=0.3 )
	{
		super( filename, length );
		
		// profile shape (2D)
		var L = length,
			T = thickness/2,
			I = Math.min( length, thickness ) / 8,
			W = width,
			E = 0.003;
			
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
		
	} // EndPhalangeAnthro.constructor
	
} // EndPhalangeAnthro


export { PhalangeAnthro, EndPhalangeAnthro };