
//	Engine API
//	Virtual Prosthetics 1.0
//
//
//	physics.init( scene, ground )
//	physics.update( fps, time, dTime )
//
//	physics.convex( vertices, faces )
//	physics.ball( radius )
//	physics.box( sizex, sizey, sizez )


import * as CANNON from "./cannon.js";
import * as NATIVE from "./native.js";


var options = new URL( window.location.href ),
	physics;


const OPTION_ENGINE = options.searchParams.get( 'engine' ) || 'cannon';
const OPTION_TOUCH_COLOR = options.searchParams.get( 'touch-color' ) || 'black';
const OPTION_DEBUG_PHYSICS = options.searchParams.has( 'debug-physics' ) || false;
const OPTION_SHOW_SLOTS = options.searchParams.has( 'show-slots' ) || false;


switch( OPTION_ENGINE )
{
	case 'cannon':
		physics = {
			init: 	CANNON.init,
			update: CANNON.update,
			convex: CANNON.convex,
			ball: 	CANNON.ball,
			box: 	CANNON.box,
			bodies:	CANNON.bodies,
		};
		break;
	case 'native':
		physics = {
			init: 	NATIVE.init,
			update: NATIVE.update,
			convex: NATIVE.convex,
			ball: 	NATIVE.ball,
			box: 	NATIVE.box,
			bodies:	NATIVE.bodies,
		};
		break;
	default: throw 'Unknown engine';
}


export { physics, OPTION_ENGINE, OPTION_TOUCH_COLOR, OPTION_DEBUG_PHYSICS, OPTION_SHOW_SLOTS };
