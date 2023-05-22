﻿function createPhalange( )
{
	// main rectangular body
	body = cube( [0,HEIGHT/2,0], [WIDTH, HEIGHT+WIDTH] );
	extraBody = cube( [0,HEIGHT/2,0], [WIDTH, HEIGHT+2*WIDTH, 0.25*WIDTH] );

	// curved polishing of body edges
	curve = sphere( [0,HEIGHT/2,0], [WIDTH*1.3, HEIGHT+WIDTH*0.8] );

	// axial openings for attaching other elemtns
	axisDown = prism( 20, [0,0,-WIDTH], [WIDTH*1.3/3,2*WIDTH] );
		its.spinV = 90;
		its.y = 0;

	//flatUp = cube( [WIDTH/2,HEIGHT,0], [WIDTH,WIDTH,2*WIDTH], 'yellow' );
	cutUp = prism( 50, [0.4*WIDTH,HEIGHT+0.5*WIDTH,-WIDTH], [2*WIDTH,2*WIDTH], 'yellow' );
		its.spinV = 90;
		
	// circular cut at bottom
	cutDown = prism( 8, [0.4*WIDTH,-0.5*WIDTH,-0.3*WIDTH/2], [2*WIDTH,0.3*WIDTH], 'yellow' );
		its.spinV = 90;
		
	g = group(body,extraBody,curve,axisDown,cutDown,cutUp);
		its.visible = false;

	phalange = construct( '( body - (cutUp - extraBody + axisDown) )*curve - cutDown' );
		its.color = 'white';

	// recolor phalange
	
	phalange.threejs.material.vertexColors = true;
	
	geom = phalange.threejs.geometry;
	pos = geom.getAttribute( 'position' );
	nor = geom.getAttribute( 'normal' );
	
	var colors = [];

	for( var i=0; i<pos.count; i++ )
	{
		var nx = Math.abs( nor.getX(i) ),
			nz = Math.abs( nor.getZ(i) );

		if( nx==1 || nz==1 )
			colors.push( 1, 1, 1 );	
		else
			colors.push( 0.5, 0.7, 0.9 );
	}

	geom.setAttribute( 
      'color',
      new THREE.BufferAttribute(new Float32Array(colors), 3));
	  
	geom.needsUpdate = true;
}