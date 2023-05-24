
//
//	Virtual Prosthetics 1.0
//	Scene
//
//	Public:
//		cannonInit(  )
//


import * as CANNON from "./engine.cannon.js";
import * as NATIVE from "./engine.native.js";


var options = new URL( window.location.href ),
	physics;


const OPTION_ENGINE = options.searchParams.get( 'engine' ) || 'cannon';
const OPTION_TOUCH_COLOR = options.searchParams.get( 'touch-color' ) || 'black';
const OPTION_DEBUG_PHYSICS = options.searchParams.has( 'debug-physics' ) || false;


switch( OPTION_ENGINE )
{
	case 'cannon':
		physics = {
			init: 	CANNON.init,
			update: CANNON.update,
			convex: CANNON.convex,
			ball: 	CANNON.ball,
			box: 	CANNON.box,
		};
		break;
	case 'native':
		physics = {
			init: 	NATIVE.init,
			update: NATIVE.update,
			convex: NATIVE.convex,
			ball: 	NATIVE.ball,
			box: 	NATIVE.box,
		};
		break;
	default: throw 'Unknown engine';
}


export { physics, OPTION_ENGINE, OPTION_TOUCH_COLOR, OPTION_DEBUG_PHYSICS };
