function createPhalange( )
{
	// main rectangular body
	body = cube( [0,HEIGHT/2,0], [WIDTH, HEIGHT+2*WIDTH], 'gray' );
	extraBody = cube( [0,HEIGHT/2,0], [WIDTH, HEIGHT+2*WIDTH, 0.25*WIDTH], 'gray' );

	// curved polishing of body edges
	curve = sphere( [0,HEIGHT/2,0], [WIDTH*1.3, HEIGHT+WIDTH*0.8] );

	// axial openings for attaching other elemtns
	axisUp = prism( 20, [0,HEIGHT,-WIDTH], [WIDTH*1.3/3,2*WIDTH] );
		its.spinV = 90;
	axisDown = axisUp.clone;
		its.y = 0;

	//flatUp = cube( [WIDTH/2,HEIGHT,0], [WIDTH,WIDTH,2*WIDTH], 'yellow' );
	cutUp = prism( 30, [0.4*WIDTH,HEIGHT+0.5*WIDTH,-WIDTH], [2*WIDTH,2*WIDTH], 'yellow' );
		its.spinV = 90;
		
	// circular cut at bottom
	cutDown = prism( 10, [0.4*WIDTH,-0.5*WIDTH,-0.3*WIDTH/2], [2*WIDTH,0.3*WIDTH], 'yellow' );
		its.spinV = 90;
		
	g = group(body,extraBody,curve,axisUp,axisDown,cutDown,cutUp);
		its.visible = false;

	phalange = construct( '( body - cutUp + extraBody - (axisUp + axisDown) )*curve - cutDown' );
		its.color = 'white';
}