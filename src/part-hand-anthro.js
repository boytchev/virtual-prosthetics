
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




var loader = new GLTFLoader();

class GLTFPart extends Part
{
	constructor ( filename )
	{
		super( );

		this.mainMesh = new THREE.Mesh( GEOMETRY, MATERIAL );
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
		super( filename );
		
		// profile shape (2D)
		var L = length,
			T = thickness/2,
			I = Math.min( length, thickness ) / 8,
			W = width,
			E = 0.003;
			
		this.addSlot( 0, length, 0 );
/*		
		// 3D convex shape
		var vertices = [
							[ -T,   I -L/2,      W/2 ],
							[ -T+I, E -L/2,      W/2 ],
							[  0,   E -L/2,      W/2 ],
							[  T,   T -L/2,  	 W/2 ],
							[  T,   L-T-E -L/2,  W/2 ],
							[  0,   L-E -L/2,    W/2 ],
							[ -T+I, L-E -L/2,    W/2 ],
							[ -T,   L-I -L/2,    W/2 ],

							[ -T,   I -L/2,     -W/2 ],
							[ -T+I, E -L/2,     -W/2 ],
							[  0,   E -L/2,     -W/2 ],
							[  T,   T -L/2,  	-W/2 ],
							[  T,   L-T-E -L/2, -W/2 ],
							[  0,   L-E -L/2,   -W/2 ],
							[ -T+I, L-E -L/2,   -W/2 ],
							[ -T,   L-I -L/2,   -W/2 ]
						];
						
		var faces = [
						[0,1,2,3,4,5,6,7],
						[15,14,13,12,11,10,9,8],
						[0,8,9,1],
						[1,9,10,2],
						[2,10,11,3],
						[3,11,12,4],
						[4,12,13,5],
						[5,13,14,6],
						[6,14,15,7],
						[7,15,8,0]
					];
		
		// physics
		this.physics = physics.convex( vertices, faces );
		this.physics.threejs = this;
		
		getBodies().push( this );
*/
	} // PhalangeAnthro.constructor

	
} // PhalangeAnthro



class EndPhalangeAnthro extends GLTFPart
{
	constructor ( filename, length=1.0, width=0.3, thickness=0.3 )
	{
		super( filename );
		
		// profile shape (2D)
		var L = length,
			T = thickness/2,
			I = Math.min( length, thickness ) / 8,
			W = width,
			E = 0.003;
			
		this.addSlot( 0, length, 0 );

/*
		// 3D convex shape
		var vertices = [
							[ -T,   I -L/2,      W/2 ],
							[ -T+I, E -L/2,      W/2 ],
							[  0,   E -L/2,      W/2 ],
							[  T,   T -L/2,      W/2 ],
							[  T,   L-I-E -L/2,  W/2 ],
							[  T-I, L-E -L/2,    W/2 ],
							[ -T+I, L-E -L/2,    W/2 ],
							[ -T,   L-I -L/2,    W/2 ],
						
							[ -T,   I -L/2,     -W/2 ],
							[ -T+I, E -L/2,     -W/2 ],
							[  0,   E -L/2,     -W/2 ],
							[  T,   T -L/2,     -W/2 ],
							[  T,   L-I-E -L/2, -W/2 ],
							[  T-I, L-E -L/2,   -W/2 ],
							[ -T+I, L-E -L/2,   -W/2 ],
							[ -T,   L-I -L/2,   -W/2 ],
						];
						
		var faces = [
						[0,1,2,3,4,5,6,7],
						[15,14,13,12,11,10,9,8],
						[0,8,9,1],
						[1,9,10,2],
						[2,10,11,3],
						[3,11,12,4],
						[4,12,13,5],
						[5,13,14,6],
						[6,14,15,7],
						[7,15,8,0]
					];
		
		
		// physics
		this.physics = physics.convex( vertices, faces );
		this.physics.threejs = this;
		
		getBodies( ).push( this );
*/
	} // EndPhalangeAnthro.constructor
	
} // EndPhalangeAnthro


export { PhalangeAnthro, EndPhalangeAnthro };