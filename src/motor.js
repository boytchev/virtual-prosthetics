
//	Motor API
//	Virtual Prosthetics 1.0
//
//
//	class Motor( axis, min=-Infinity, max=Infinity, def=0 ) extends Part
//
//	getAngle( )
//	setAngle( x )
//
//	class MotorX( min, max, def, width=0.1, height=0.05 )
//	class MotorY( min, max, def, width=0.3, height=0.05 )
//	class MotorZ( min, max, def, width=0.1, height=0.05 )




import * as THREE from "../libs/three.module.min.js";
import {Part} from "./part.js";



// reusable geоmetries and materials

const MATERIAL = new THREE.MeshPhongMaterial({
			color: 0x404040,
			shininess: 100,
		});
		
const GEOMETRY_16 = new THREE.CylinderGeometry( 1, 1, 1, 16 );
const GEOMETRY_48 = new THREE.CylinderGeometry( 1, 1, 1, 48 );



class Motor extends Part
{
	constructor( axis, min=-Infinity, max=Infinity, def=0 )
	{
		super( );
		
		// rotation
		this.axis = axis;
		this.min = Math.min( min, max );
		this.max = Math.max( min, max );
		this.def = THREE.MathUtils.clamp( def, this.min, this.max );
	}

	getAngle( )
	{
		if( this.axis )
			return this.rotation[this.axis];
		else
			return 0;
	}
	
	setAngle( x )
	{
		if( x === null )
			return;
		
		if( this.axis )
			this.rotation[this.axis] = THREE.MathUtils.clamp( x, this.min, this.max );
		else
			throw `Error: body part '${this.name}' cannot rotate`;
	}
	
	setName( name )
	{
		this.name = name;
		return this;
	}

}


// a simple motor that rotates around X axis
// it looks like a horizontal cylinder

class MotorX extends Motor
{
	constructor ( min, max, def, width=0.1, height=0.05 )
	{
		super( 'x', min, max, def );

		this.addSlot( 0, 0, 0 );		
		
		var image = new THREE.Mesh(	GEOMETRY_16, MATERIAL );
			image.rotation.z = Math.PI/2;
			image.scale.set( height/2, width, height/2 );
			image.receiveShadow = true;
			image.castShadow = true;
		
		this.add( image );
	}
	
} // MotorX



class MotorY extends Motor
{
	constructor ( min, max, def, width=0.3, height=0.05 )
	{
		super( 'y', min, max, def );

		this.addSlot( 0, height, 0 );		
		
		var image = new THREE.Mesh(	GEOMETRY_48, MATERIAL );
			image.position.y = height/2;
			image.scale.set( width/2, height, width/2 );
			image.castShadow = true;
			image.receiveShadow = true;

		this.add( image );
	}
	
} // MotorY



class MotorZ extends Motor
{
	constructor ( min, max, def, width=0.1, height=0.05 )
	{
		super( 'z', min, max, def );

		this.addSlot( 0, 0, 0 );		
		
		var image = new THREE.Mesh(	GEOMETRY_16, MATERIAL );
			image.rotation.x = Math.PI/2;
			image.scale.set( height/2, width, height/2 );
			image.receiveShadow = true;
			image.castShadow = true;

		this.add( image );
	}

} // MotorZ



export { Motor, MotorX, MotorY, MotorZ };