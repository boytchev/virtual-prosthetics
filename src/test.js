
//
// virtual prosthetics
//

import * as THREE from "three";
import { createScene } from "./scene.js";
import { Phalange, EndPhalange } from "./shapes.js";
import { RobotPart, DOFZ } from "./robots.js";


const PI = Math.PI;


var scene = createScene( animate );



// robot A

var a1 = new RobotPart( new Phalange(), new DOFZ(0,-PI/2,0) ),
	a2 = new RobotPart( new Phalange(1.3,0.2,0.1), new DOFZ(0,-PI/2,-PI/4) ),
	a3 = new RobotPart( new Phalange(0.3,0.1,0.1), new DOFZ(0,-PI/2,-PI/4) ),
	a4 = new RobotPart( new EndPhalange(0.3,0.1,0.1), new DOFZ(0,-PI/2,-PI/4) );

a1.attachTo( scene, new THREE.Vector3(0,0,-1) );
a2.attachTo( a1 );
a3.attachTo( a2 );
a4.attachTo( a3 );


// robot B

var b1 = new RobotPart( new Phalange(), new DOFZ(0,-PI/2,0) ),
	b2 = new RobotPart( new Phalange(), new DOFZ(0,-PI/2,-PI/4) ),
	b3 = new RobotPart( new EndPhalange(0.3,1,0.1), new DOFZ(0,-PI/2,-PI/4) );

b1.attachTo( scene, new THREE.Vector3(0,0,1) );
b2.attachTo( b1 );
b3.attachTo( b2 );


// robot C

var c1 = new RobotPart( new Phalange(1,1), new DOFZ(0,-PI/2,0) );
	c1.attachTo( scene );
	
var c1_left = new RobotPart( new Phalange(0.5,0.3), new DOFZ(0,-PI/2,-PI/4) );
	c1_left.attachTo( c1, new THREE.Vector3(0,1,-0.3) );
	
var c1_right = new RobotPart( new Phalange(0.5,0.3), new DOFZ(0,-PI/2,-PI/4) );
	c1_right.attachTo( c1, new THREE.Vector3(0,1,0.3) );
	
var c1_left2 = new RobotPart( new EndPhalange(0.5,0.3), new DOFZ(0,-PI/2,-PI/4) );
	c1_left2.attachTo( c1_left );
	
var c1_right2 = new RobotPart( new EndPhalange(0.5,0.3), new DOFZ(0,-PI/2,-PI/4) );
	c1_right2.attachTo( c1_right );



function animate( t )
{
	a2.angles( -PI/2*(0.5+1.5*Math.sin(t)) );
	a3.angles( -PI/2*(0.5+0.5*Math.sin(t)) );
	a4.angles( -PI/2*(0.5+0.5*Math.sin(2*t)) );
	
	b2.angles( -PI/2*(0.5+0.5*Math.sin(3*t)) );
	b3.angles( -PI/2*(0.5+0.5*Math.sin(3*t-200)) );
	
	c1_left.angles( -PI/2*(0.5+0.5*Math.sin(2*t)) );
	c1_right.angles( -PI/2*(0.5+0.5*Math.sin(2*t-100)) );
	
	c1_left2.angles( -PI/2*(0.5+1.0*Math.sin(1.5*t)) );
	c1_right2.angles( -PI/2*(0.5+1.0*Math.sin(1.5*t-100)) );
}


