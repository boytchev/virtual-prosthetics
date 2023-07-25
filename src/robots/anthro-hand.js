
//	Robot Anthropomorphic Hand
//	Virtual Prosthetics 1.0
//
//
//	class RoundHand extends Robot
//
//	new RoundHand( isLeft = true )
//
//	flexFinger( i, angle )
//	flexFingers( angle )
//	spreadFinger( i, angle )
//	spreadFingers( angle, includeThumb=false )


import {Robot} from "../robot.js";
import {Box} from "../part-shapes.js";
import {GLTFPart} from "../part-gltf.js";
import {RoundFinger} from "../part-hand-round.js";
import {AnthroThumb, AnthroPalm} from "../part-hand-anthro.js";
import {MotorX, MotorY, MotorZ} from "../motor.js";


const PI = Math.PI;



class AnthroHand extends Robot
{
	
	constructor( isLeft = true )
	{
		super( );

		this.isLeft = isLeft;

		if( isLeft )
			this.palm = new AnthroPalm( true, '../assets/gltf/anthro-palm.glb' );
		else
			this.palm = new AnthroPalm( false, '../assets/gltf/anthro-palm.glb' );
		
		this.palm.attachToSlot( this );

		this.spread = [];
		for( var i=0; i<5; i++ )
			this.spread[i] = this.addFinger( i );
	} // RoundHand.constructor
	

	addFinger( slot )
	{
		var root, rootMotor;
			
		if( slot == 0 )
		{	// thumb

			// thumb opposition
			root = new MotorZ( 0, 2, 0, 0.75, 0.07 );

			var rootMotorZ = new MotorZ( -1.75, 0.25, 0, 0.2, 0.06 ).setName( '<small>&ndash; proximal</small>' );
			rootMotor = new MotorX( -0.75, 2, 0, 0.14, 0.06 ).setName( 'Thumb1' ); // long vertical motor from thumb plate to thumb
			var spread1 = new MotorY( -0.5, 1, 0, 0.07, 0.2 ).setName( '<small>&ndash; twist</small>' );
			
			
			var box = new AnthroThumb( this.isLeft, '../assets/gltf/anthro-thumb.glb' );

			this.addChain( 
					this.palm, // slot 0 is for thumb
					root,
					box,
					rootMotor,
					spread1,
					rootMotorZ,
					);
		root.name = ['Palm','Index finger','Middle finger','Ring finger','Little finger'][slot];

		this.addChain( 
				rootMotorZ,
				new RoundFinger( '../assets/gltf/round-finger-8.glb', 0.8 ),
				new MotorZ( 0, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; middle</small>' ),
				new RoundFinger( '../assets/gltf/round-finger-5.glb', 0.5 ),
				new MotorZ( 0, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; distal</small>' ),
				new RoundFinger( '../assets/gltf/round-tip.glb', 0.5 ),
			);
		}
		else
		{
			rootMotor = new MotorX( -0.4, 0.4, 0, 0, 0 );
			root = new MotorZ( PI/4, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; proximal</small>' );
			this.addChain( 
					rootMotor.attachToSlot( this.palm, slot ),
					root,
					);
		rootMotor.name = ['Thumb','Index finger','Middle finger','Ring finger','Little finger'][slot];

		this.addChain( 
				root,
				new RoundFinger( '../assets/gltf/round-finger-8.glb', 0.8 ),
				new MotorZ( 0, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; middle</small>' ),
				new RoundFinger( '../assets/gltf/round-finger-5.glb', 0.5 ),
				new MotorZ( 0, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; distal</small>' ),
				new RoundFinger( '../assets/gltf/round-tip.glb', 0.5 ),
			);
		}
		
			
		return root;
	}		
	

	flexFinger( i, angle )
	{
		var motors = this.getMotors();
		
		motors[4*i+1].setAngle( -angle );
		motors[4*i+2].setAngle( -angle );
		motors[4*i+3].setAngle( -angle );
	}


	flexFingers( angle )
	{
		for( var i=0; i<5; i++ )
			this.flexFinger( i, angle );
	}
	
	
	spreadFinger( i, angle )
	{
		var motors = this.getMotors();
		
		motors[4*i].setAngle( this.palm.flip * angle );
	}


	spreadFingers( angle, includeThumb=false )
	{
		if( includeThumb )
		{
			this.spreadFinger( 0, 3*angle );
		}
		
		this.spreadFinger( 1,  1.0*angle );
		this.spreadFinger( 2,  0.3*angle );
		this.spreadFinger( 3, -0.3*angle );
		this.spreadFinger( 4, -1.0*angle );
	}
	
} // class AnthroHand

export { AnthroHand };
