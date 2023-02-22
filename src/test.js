
//
// virtual prosthetics
//

import * as THREE from "three";
import { scene, createScene } from "./scene.js";
import { Phalange, EndPhalange } from "./shapes.js";
import * as Virtual from "./robots.js";


const PI = Math.PI;


createScene( animate );



// robot A

class RobotA extends Virtual.Robot
{
	constructor( )
	{
		super( );
		
		var RootDOF = new Virtual.DOFZ(0,-PI/2,0),
			DOF = new Virtual.DOFZ(0,-PI/2,-PI/4);
		
		this.node0 = new Phalange( 1, 0.3, 0.3, RootDOF ),
		this.node1 = new Phalange( 1.3, 0.2, 0.1, DOF ),
		this.node2 = new Phalange( 0.3, 0.1, 0.1, DOF ),
		this.node3 = new EndPhalange( 0.3, 0.1, 0.1, DOF );

		this.node0.attachTo( this );
		this.node1.attachTo( this.node0 );
		this.node2.attachTo( this.node1 );
		this.node3.attachTo( this.node2 );
		
		this.speed = Math.random()+1;
		this.offset = Math.random()*2*PI;
	}
}


var A = new RobotA;
	A.attachTo( scene, new THREE.Vector3(0,0,-1) );

	
// robot B

var b1 = new Phalange( 1, 0.3, 0.3, new Virtual.DOFZ(0,-PI/2,0) ),
	b2 = new Phalange( 1, 0.3, 0.3, new Virtual.DOFZ(0,-PI/2,-PI/4) ),
	b3 = new EndPhalange( 0.3, 1, 0.1, new Virtual.DOFZ(0,-PI/2,-PI/4) );

b1.attachTo( scene, new THREE.Vector3(0,0,1) );
b2.attachTo( b1 );
b3.attachTo( b2 );


// robot C

var c1 = new Phalange( 1, 1, 0.3, new Virtual.DOFZ(0,-PI/2,0) );
	c1.attachTo( scene );
	
var c1_left = new Phalange( 0.5, 0.3, 0.3, new Virtual.DOFZ(0,-PI/2,-PI/4) );
	c1_left.attachTo( c1, new THREE.Vector3(0,1,-0.3) );
	
var c1_right = new Phalange( 0.5, 0.3, 0.3, new Virtual.DOFZ(0,-PI/2,-PI/4) );
	c1_right.attachTo( c1, new THREE.Vector3(0,1,0.3) );
	
var c1_left2 = new EndPhalange( 0.5, 0.3, 0.3, new Virtual.DOFZ(0,-PI/2,-PI/4) );
	c1_left2.attachTo( c1_left );
	
var c1_right2 = new EndPhalange( 0.5, 0.3, 0.3, new Virtual.DOFZ(0,-PI/2,-PI/4) );
	c1_right2.attachTo( c1_right );



function animate( t )
{
	A.node1.angles( -PI/2*(0.5+1.5*Math.sin(t)) );
	A.node2.angles( -PI/2*(0.5+0.5*Math.sin(t)) );
	A.node3.angles( -PI/2*(0.5+0.5*Math.sin(2*t)) );
	
	b2.angles( -PI/2*(0.5+0.5*Math.sin(3*t)) );
	b3.angles( -PI/2*(0.5+0.5*Math.sin(3*t-200)) );
	
	c1_left.angles( -PI/2*(0.5+0.5*Math.sin(2*t)) );
	c1_right.angles( -PI/2*(0.5+0.5*Math.sin(2*t-100)) );
	
	c1_left2.angles( -PI/2*(0.5+1.0*Math.sin(1.5*t)) );
	c1_right2.angles( -PI/2*(0.5+1.0*Math.sin(1.5*t-100)) );
}


