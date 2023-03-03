
//
//	Motors for Virtual prosthetics
//
//	class MotorX( min, max, def, width=0.1, height=0.05 )
//	class MotorY( min, max, def, width=0.3, height=0.05 )
//	class MotorZ( min, max, def, width=0.1, height=0.05 )
//



import * as THREE from "../libs/three.module.js";
import {Part} from "./part.js";



// reusable geоmetries and materials

const MATERIAL = new THREE.MeshPhongMaterial({
			color: 0x404040,
			shininess: 100,
		});
		
const GEOMETRY_16 = new THREE.CylinderGeometry( 1, 1, 1, 16 );
const GEOMETRY_48 = new THREE.CylinderGeometry( 1, 1, 1, 48 );



// a simple motor that rotates around X axis
// it looks like a horizontal cylinder

class MotorX extends Part
{
	constructor ( min, max, def, width=0.1, height=0.05 )
	{
		super( );
		
		this.setMotor( 'x', min, max, def );
		this.addSlot( 0, 0, 0 );
		
		var image = new THREE.Mesh(	GEOMETRY_16, MATERIAL );
			image.rotation.z = Math.PI/2;
			image.scale.set( height/2, width, height/2 );
			image.receiveShadow = true;
			image.castShadow = true;
		
		this.add( image );
	}
	
} // MotorX



class MotorY extends Part
{
	constructor ( min, max, def, width=0.3, height=0.05 )
	{
		super( );
		
		this.setMotor( 'y', min, max, def );
		this.addSlot( 0, height, 0 );
		
		var image = new THREE.Mesh(	GEOMETRY_48, MATERIAL );
			image.position.y = height/2;
			image.scale.set( width/2, height, width/2 );
			image.castShadow = true;
			image.receiveShadow = true;

		this.add( image );
	}
	
} // MotorY



class MotorZ extends Part
{
	constructor ( min, max, def, width=0.1, height=0.05 )
	{
		super( );
		
		this.setMotor( 'z', min, max, def );
		this.addSlot( 0, 0, 0 );
		
		var image = new THREE.Mesh(	GEOMETRY_16, MATERIAL );
			image.rotation.x = Math.PI/2;
			image.scale.set( height/2, width, height/2 );
			image.receiveShadow = true;
			image.castShadow = true;

		this.add( image );
	}

} // MotorZ



export { MotorX, MotorY, MotorZ };