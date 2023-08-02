﻿
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
import {RoundFinger} from "../parts/round-hand.js";
import {AnthroThumb, AnthroPalm} from "../parts/anthro-hand.js";
import {MotorX, MotorY, MotorZ} from "../motor.js";


const PI = Math.PI;



class AnthroHand extends Robot
{
	
	constructor( isLeft = true )
	{
		super( );

		this.isLeft = isLeft;

		this.palm = new AnthroPalm( isLeft, '../assets/gltf/anthro-palm.glb' );
		this.palm.attachToSlot( this );

		this.spread = [];
		for( var i=0; i<5; i++ )
			this.spread[i] = this.addFinger( i );
	} // AnthroHand.constructor
	

	addFinger( slot )
	{
		var root, mainMotor;
		
		var lastPart;
		
		if( slot == 0 )
		{	// thumb
			root = new MotorZ( 0, 2, 0, 0.75, 0.07 ).flip( !this.isLeft );
			mainMotor = new MotorX( -0.75, 2, 0, 0.14, 0.06 ).flip( !this.isLeft ); 
			
			lastPart = this.addChain( 
					this.palm, // slot 0 is for thumb
					root,
					new AnthroThumb( this.isLeft, '../assets/gltf/anthro-thumb.glb' ),
					mainMotor,
					new MotorY( -0.5, 1, 0, 0.07, 0.2 ).flip( !this.isLeft ).setName( '<small>&ndash; twist</small>' ),
					new MotorZ( -1.75, 0.25, 0, 0.2, 0.06 ).setName( '<small>&ndash; proximal</small>' ),
					);
			root.name = 'Palm';

		}
		else
		{	// other fingers
			root = new MotorZ( PI/4, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; proximal</small>' );
			mainMotor = new MotorX( -0.4, 0.4, 0, 0, 0 ).flip( this.isLeft );
			
			lastPart = this.addChain( 
					mainMotor.attachToSlot( this.palm, slot ),
					root,
					);
		}
		
		this.addChain( 
			lastPart,
			new RoundFinger( '../assets/gltf/round-finger-8.glb', 0.8 ),
			new MotorZ( 0, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; middle</small>' ),
			new RoundFinger( '../assets/gltf/round-finger-5.glb', 0.5 ),
			new MotorZ( 0, -PI/2, -PI/8, 0.2, 0.07 ).setName( '<small>&ndash; distal</small>' ),
			new RoundFinger( '../assets/gltf/round-tip.glb', 0.5 ),
		);
			
		mainMotor.name = ['Thumb','Index finger','Middle finger','Ring finger','Little finger'][slot];
		
		return root;
	}		
	

	flexFinger( i, angle )
	{
		var motors = this.getMotors();
		
		motors[4*i+3].setAngle( -angle );
		motors[4*i+4].setAngle( -angle );
		motors[4*i+5].setAngle( -angle );
	}


	flexFingers( angle )
	{
		for( var i=0; i<5; i++ )
			this.flexFinger( i, angle );
	}
	
	
	spreadFinger( i, angle )
	{
		var motors = this.getMotors();
		
		motors[4*i+(i?2:1)].setAngle( -angle );
	}


	spreadFingers( angle, includeThumb=false )
	{
		if( includeThumb )
		{
			this.spreadFinger( 0, 0.5-2*angle );
		}
		
		this.spreadFinger( 1,  1.0*angle );
		this.spreadFinger( 2,  0.3*angle );
		this.spreadFinger( 3, -0.3*angle );
		this.spreadFinger( 4, -1.0*angle );
	}
	
} // class AnthroHand

export { AnthroHand };
