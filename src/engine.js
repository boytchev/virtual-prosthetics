
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
	engine = options.searchParams.get( 'engine' ) || 'cannon',
	physics;


switch( engine )
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


export { physics };