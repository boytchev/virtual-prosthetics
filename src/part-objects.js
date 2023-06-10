
//
//	Shapes for Virtual prosthetics
//
//	class Ball( radius = 1, color = 'dimgray' )
//


import * as THREE from "../libs/three.module.min.js";
import { Part } from "./part.js";
import { getScene } from "./scene.js";
import { physics, OPTION_TOUCH_COLOR } from "./engine.js";



//

class Ball extends Part
{
	constructor ( radius=1.0, color='dimgray' )
	{
		super( );
		
		this.mainMesh = new THREE.Mesh(
			new THREE.IcosahedronGeometry( radius, 10 ),
			new THREE.MeshLambertMaterial( {
					color: color,
					emissive: OPTION_TOUCH_COLOR,
					emissiveIntensity: 0,
				} )
		);
		this.mainMesh.receiveShadow = true;
		this.mainMesh.castShadow = true;

		this.add( this.mainMesh );
		
		// physics
		this.physics = physics.ball( radius );
		this.physics.threejs = this;
		
		physics.bodies.push( this );

	} // Ball.constructor
	
} // Ball


class Box extends Part
{
	constructor ( sizex=1.0, sizey=1.0, sizez=1.0, color='dimgray' )
	{
		super( );
		
		this.mainMesh = new THREE.Mesh(
			new THREE.BoxGeometry( sizex, sizey, sizez ),
			new THREE.MeshLambertMaterial( {
				color: color,
				emissive: OPTION_TOUCH_COLOR,
				emissiveIntensity: 0,
			} )
		);
		this.mainMesh.receiveShadow = true;
		this.mainMesh.castShadow = true;
		
		this.add( this.mainMesh );
		
		
		// physics
		this.physics = physics.box( sizex, sizey, sizez );
		this.physics.threejs = this;

		physics.bodies.push( this );

	} // Box.constructor
	
} // Box


export { Ball, Box };