
Suica.CIRCLECOUNT = 40;


function createEndPhalange( )
{
	oxyz();
	
	// main rectangular body
	body = cube( [0,0,0], [WIDTH, HEIGHT+2*WIDTH], 'gray' );
	extraBody = cube( [0,0,0], [WIDTH, HEIGHT+2*WIDTH, 0.25*WIDTH], 'gray' );

	// curved polishing of body edges
	curve = sphere( [0,0,0], [WIDTH*1.3, HEIGHT+WIDTH*0.8] );
	curve2 = sphere( [0.025,-WIDTH*0.3,0], [WIDTH*1.3, HEIGHT+WIDTH*0.8] );


	// axial openings for attaching other elemtns
	axisDown = prism( 20, [0,-HEIGHT/2,-WIDTH], [WIDTH*1.3/3,2*WIDTH] );
		its.spinV = 90;

	// circular cut at bottom
	cutDown = prism( 8, [0.4*WIDTH,-HEIGHT/2-0.5*WIDTH,-0.3*WIDTH/2], [2*WIDTH,0.3*WIDTH], 'yellow' );
		its.spinV = 90;
		
	var g = group(body,extraBody,curve,axisDown,cutDown,curve2);
		its.visible = false;

	var endPhalange = construct( '( body + extraBody - axisDown )*curve * curve2 - cutDown' );
		its.color = 'white';
		its.threejs.material.vertexColors = true;


	// recolor phalange

	var geom = endPhalange.threejs.geometry,
		pos = geom.getAttribute( 'position' ),
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
	
	
	element( 'size' ).innerHTML = endPhalange.threejs.geometry.getAttribute( 'position' ).count;

	return endPhalange;	
}


function createEndPhalangeFrame( )
{
	// build a 3-layers cube
	
	var phalangeFrame = cube( [0,0,0], 1 );
		its.threejs.material = new THREE.MeshBasicMaterial({color: 'crimson'});
		its.threejs.geometry = new THREE.BoxGeometry( WIDTH, HEIGHT, WIDTH, 1, 3, 1 );
	
	
	// update vertices to mimic the phalange shape
	
	var geom = phalangeFrame.threejs.geometry,
		pos = geom.getAttribute( 'position' );
		
	function RANGE(a,b) {return THREE.MathUtils.mapLinear( HEIGHT, 0.5, 1.1, a, b )}
	const
		TOP_ROW = HEIGHT/2-0.1,
		MID_ROW = HEIGHT/4-0.1,
		BOT_ROW = -HEIGHT/2+0.1,
		
		TOP_SHRINK = RANGE( 0.55, 0.75 ),
		TOP_SHIFT = RANGE( 0.02, 0.02 ),
	
		MID_MOVE = RANGE( 0.02, 0 ),

		BOT_SHRINK = RANGE( 0.90, 0.85 ),
		BOT_MOVE = RANGE( 0.06, 0.05 ),
		BOT_SLOPE = RANGE( 0.4, 0.3 );
	
	for( var i=0; i<pos.count; i++ )
	{
		var x = pos.getX( i ),
			y = pos.getY( i ),
			z = pos.getZ( i );

		if( y > TOP_ROW )
		{
			pos.setX( i, TOP_SHRINK*x+TOP_SHIFT );
			pos.setZ( i, TOP_SHRINK*z );
		}
		else
		if( y > MID_ROW )
		{
		}
		else
		if( y > BOT_ROW )
		{
			pos.setY( i, y + MID_MOVE );
		}
		else
		{
			pos.setX( i, BOT_SHRINK*x );
			pos.setY( i, y + BOT_MOVE + BOT_SLOPE*x );
			pos.setZ( i, BOT_SHRINK*z );
		}
	}		
	geom.needsUpdate = true;
	
	
	// hash all vertices to eliminate duplicates
	// hashes[hash] = vertex index
	var hashes = {};
	function hash(i) { return pos.getX(i)+7*pos.getY(i)+13*pos.getZ(i) }
	for( var i=0; i<pos.count; i++ )
		hashes[ hash(i) ] = i;
	
	// get a list of indices of unique vertices
	var uniqueIndices = Object.values( hashes );
	
	// build JS code for unique vertices
	var vertices = [],
		prec = 2;
	for( var i in uniqueIndices )
		vertices.push( `[${+pos.getX(i).toFixed(prec)},${+pos.getY(i).toFixed(prec)},${+pos.getZ(i).toFixed(prec)}]` );
	vertices = `'${NAME}': [${vertices.join(',')}],`;
	phalangeFrame.verts = vertices;

	// from a face of 4 arbitrary indices make a face of 4 unique indices
	function face( a, b, c, d )
	{
		// ab  -> acdb
		// cd
		function idx( n ) { return uniqueIndices.indexOf( hashes[hash(n)] ); }
		
		return `[${idx(a)},${idx(c)},${idx(d)},${idx(b)}]`;
	};
	
	// build JS code for faces
	var faces = [
		face(0,1,2,3), face(2,3,4,5), face(4,5,6,7),
		face(1,8,3,10), face(3,10,5,12), face(5,12,7,14),
		face(8,9,10,11), face(10,11,12,13), face(12,13,14,15),
		face(9,0,11,2), face(11,2,13,4), face(13,4,15,6),
		face(1,0,8,9), face(6,7,15,14)
	]
	faces = `'${NAME}': [${faces.join(',')}],`;
	phalangeFrame.faces = faces;

	// debug a face by adding increasing spheres
	// indices are arbitrary, not unique
	function debug( ia, ib, ic, id )
	{
		var a = sphere([pos.getX(ia),pos.getY(ia),pos.getZ(ia)],0.1),
			b = sphere([pos.getX(ib),pos.getY(ib),pos.getZ(ib)],0.14);
			c = sphere([pos.getX(ic),pos.getY(ic),pos.getZ(ic)],0.18);
			d = sphere([pos.getX(id),pos.getY(id),pos.getZ(id)],0.22);

		phalangeFrame.threejs.add( a.threejs );
		phalangeFrame.threejs.add( b.threejs );
		phalangeFrame.threejs.add( c.threejs );
		phalangeFrame.threejs.add( d.threejs );
	}
	//debug(6,7,15,14);
	
	phalangeFrame.threejs.material.wireframe = true;
	
	return phalangeFrame;
}
		
		
function saveModel()
{
	model.save( NAME, [object] );
}


function getModelFrame()
{
	var text = objectFrame.verts+'\n\n'+objectFrame.faces;

	navigator.clipboard.writeText(text).then(
		function()
		{
			alert( 'Copied to clipboard' );
		},
		function( err )
		{
			console.log( text );
			alert( 'Copied to the console' );
		});
}


function loop( t )
{
	objectGroup.spinS = -45+45*Math.sin(t);
}
