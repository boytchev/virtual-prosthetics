
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
import {RoundFinger} from "../part-hand-round.js";
import {AnthroPalm} from "../part-hand-anthro.js";
import {MotorX, MotorY, MotorZ} from "../motor.js";


const PI = Math.PI;


class AnthroHand extends Robot
{
	
	constructor( isLeft = true )
	{
		super( );

		this.isLeft = isLeft;

		if( isLeft )
			this.palm = new AnthroPalm( true, '../assets/gltf/round-palm.glb' );
		else
			this.palm = new AnthroPalm( false, '../assets/gltf/round-palm.glb' );
		
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
			root = new MotorZ( -0.5, 2, 0, 2, 0.05 ).setName( 'Thumb1' );

			var spread1 = new MotorX( -Math.PI/4, Math.PI/2, 0, 0.1, 0.1 ).setName( '<small>&ndash; spreading</small>' );
			
			rootMotor = new MotorZ( -Math.PI/2, Math.PI/2, 0, 1, 0.03 ).setName( '<small>&ndash; flexing</small>' );
			
			var box = new Box(0.3,0.3,0.8);

			var newSlot = box.addSlot(0,-0.3,0);
				newSlot.rotation.set(Math.PI/2,0,Math.PI/4,'YZX');
				
			this.addChain( 
					this.palm, // slot 0 is for thumb
					root,
					box,
					spread1,
					rootMotor,
					);
		root.name = ['Thumb','Index finger','Middle finger','Ring finger','Little finger'][slot];

		this.addChain( 
				rootMotor,
				new RoundFinger( '../assets/gltf/round-finger-5.glb', 0.5 ),
				new MotorZ( 0, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; middle</small>' ),
				new RoundFinger( '../assets/gltf/round-finger-5.glb', 0.5 ),
				new MotorZ( 0, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; distal</small>' ),
				new RoundFinger( '../assets/gltf/round-tip.glb', 0.5 ),
			);
		}
		else
		{
			root = new MotorX( -0.4, 0.4, 0, 0, 0 );
			rootMotor = new MotorZ( PI/4, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; proximal</small>' );
			this.addChain( 
					root.attachToSlot( this.palm, slot ),
					rootMotor,
					);
		root.name = ['Thumb','Index finger','Middle finger','Ring finger','Little finger'][slot];

		this.addChain( 
				rootMotor,
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
