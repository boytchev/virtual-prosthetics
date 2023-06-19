# Virtual prosthetics API

The Virtual Prosthetics library provides a set of APIs for constructing simple 
virtual robots. In this document all times are in seconds, all sizes are in
meters, all angles are in radians and all indices start from 0.


* **[Introduction](#introduction)**
* **[Scene API](#scene-api)**<small><br>
 &ndash; [setAnimation](#setanimation), [getTime](#gettime), [getScene](#getscene), [setCameraPosition](#setcameraposition), [setCameraTarget](#setcameratarget)</small>
 
* **[Robot API](#robot-api)**:<small> [Robot](#robot)<br>
 &ndash; [addChain](#addchain), [getParts](#getparts), [getMotors](#getmotors), [getSensors](#getsensors)<br>
 &ndash; [getPosition](#getposition), [setPosition](#setposition), [setRotation](#setrotation), [getAngle](#getangle), [setAngle](#setangle), [getAngles](#getangles), [setAngles](#setangles)</small>
 
* **[Part API](#part-api)**:<small> [Part](#part)<br>
 &ndash; [addSlot](#addslot), [attachToSlot](#attachtoslot), [beginContact](#begincontact), [endContact](#endcontact)<br>
 &ndash; [setPosition](#setposition-1), [setRotation](#setrotation-1)</small>

* **[Motor API](#motor-api)**:<small> [Motor](#motor)<br>
 &ndash; [getAngle](#getangle-1), [setAngle](#setangle-1)</small>
 
* **[Slot API](#slot-api)**:<small> [Slot](#slot)<br>
 &ndash; [setPosition](#setposition-2), [setRotation](#setrotation-2)</small>
 
* **[Sensor API](#sensor-api)**:<small> [Sensor](#sensor)<br>
 &ndash; [senseDistance](#sensedistance), [senseTouch](#sensetouch), [sensePosition](#senseposition), [senseCollision](#sensecollision), [senseObjects](#senseobjects), [senseObject](#senseobject)</small>




# Introduction

The Virtual Prosthetics library allows construction of virtual robots from a
JavaScript program. The robots can be viewed and manipulated on desktop and
mobile platforms. The library is base on the following main concepts:

* [**Scene**](#scene-api) – a virtual environment where robots are placed and controlled;
* [**Robot**](#robot-api) – a virtual mechanism constructed programmatically of sevral parts;
* [**Part**](#part-api) – a building element of a robot &ndash; a shape, a motor or a sensor;
* [**Motor**](#motor-api) – a robot part that can be rotated around a predefined axis;
* [**Slot**](#slot-api) – a place on a robot part to which another elements can be attached;
* [**Sensor**](#sensor-api) – a robot part that can sense its environment and generate feedback.

<center><img src="images/architecture.png"></center>


# Scene API

The Virtual Prosthetics library automatically creates a 3D scene that contains
all created prosthetic devices.

Source code: [src/scene.js](https://github.com/boytchev/virtual-prosthetics/blob/main/src/scene.js)


> ### setAnimation

```js
setAnimation( func, fps=30 )
```

Function. Defines a callback function `func` to be called `fps` times per second.
Higher `fps` (or frames-per-second) produces smoother motion, but consumes more
computational resources. The maximal value for `fps` is controlled by the
browser and is usually 60 or more.

The callback function has optional parameters `time` for the elapsed time since
the start of the library; and `dTime` for the elapsed time since the previous frame.


Example:

```js
Prosthetic.setAnimation( loop, 60 );

function loop( time, dTime )
{
   // one step of the animation
};
```


> ### getTime

```js
getTime( );
```

Function. Gets the current time since the initialization of the library. Inside
the animation loop, the time is available as a parameter.

Example:

```js
time = Prosthetic.getTime( );
```


> ### getScene

```js
getScene( );
```

Function. Gets the scene as a [`THREE.Scene`](https://threejs.org/docs/#api/en/scenes/Scene)
object that can be manipulated by [Three.js](https://threejs.org/), e.g. for
adding custom Three.js objects.

Example:

```js
scene = Prosthetic.getScene( );
```


> ### setCameraPosition

```js
setCameraPosition( position )
setCameraPosition( x, y, z )
```

Function. Places the camera at given `position` which is a list of coordinates
(`x,y,z`). The position can also be provided as three individual values.
Initially the camera is placed at (4,4,7). The camera position can be changed in
the animation loop to control its motion programmatically.

Example:

```js
position = [10, 2, 0];
Prosthetic.setCameraPosition( position );

Prosthetic.setCameraPosition( 10, 2, 0 );
```


> ### setCameraTarget

```js
setCameraTarget( target )
setCameraTarget( x, y, z )
```

Function. Turns the camera towards given `target` which is a list of coordinates
(`x,y,z`). The target can also be provided as three individual values.
Initially the camera target is (0,0,0). The camera target can be changed in the
animation loop to control its rotation programmatically.

Example:

```js
target = [0, 2, 0];
Prosthetic.setCameraTarget( target );

Prosthetic.setCameraTarget( 0, 2, 0 );
```



# Robot API

A robot is a mechanism made of various robot parts. Some parts are just 3D shapes,
others are motors or sensors.

Source code: [src/robot.js](https://github.com/boytchev/virtual-prosthetics/blob/main/src/robot.js)


> ### Robot

Base class. Defines the overall functionality of a robot. User-defined robots
are classes that extends this base class.

Example:

```js
class MyRobot extends Prosthetic.Robot
{
	constructor( )
	{
		super( );

		// definitions of robot parts
	}
}
```


> ### addChain

```js
addChain( part1, part2, ... )
```

Method. Used in the constructor of a custom robot to automatically connect parts
`part1`, `part2` and so on in a chain. Method `addChain` is a shorthand
for a sequence of [`attachToSlot`](#attachtoslot). The variable `this` can be
used to mark the robot itself. If `this` is used in `addChain` it must be the
first parameter. At least one of the chains in a robot must start with `this`,
otherwise the robot parts will be unattached to the robot.

Example:

```js
class MyRobot extends Prosthetic.Robot
{
	constructor( )
	{
		super( );

		var partA = ...;
		var partB = ...;
		
		this.addChain( this, partA, partB );
	}
}
```

Adding a chain always attaches parts to slot 0. If another slot or a custom
slot position is needed, use [`attachToSlot`](#attachtoslot). 


> ### getParts

```js
getParts( )
```

Method. Gets a list of all robot parts, including motors.

Example:

```js
parts = robot.getParts( );
```



> ### getMotors

```js
getMotors( )
```

Method. Gets a list of all robot motors. The number of motors defines the
robot's DOF ([Degree of freedom](https://en.wikipedia.org/wiki/Degrees_of_freedom_(mechanics))) as each motor
can be manipulated independently on other motors.

Example:

```js
motors = robot.getMotors( );
```



> ### getSensors

```js
getSensors( )
```

Method. Gets a list of all robot sensors. 

Example:

```js
sensors = robot.getSensors( );
```



> ### getPosition

```js
getPosition( )
```

Method. Gets the position of a robot as a list of [**x, y, z**] coordinates.

Example:

```js
pos = robot.getPosition( );
```



> ### setPosition

```js
setPosition( position )
setPosition( x, y, z )
```

Method. Sets the position of a robot to `position` which is a list of 
coordinates (`x,y,z`). The position can also be provided as three individual
values. If no position is provided, the robot is removed from the scene, but it
is not deleted. The default position of a robot is (0,0,0).

Example:

```js
position = [0, 10, 5];
robot.setPosition( position );

robot.setPosition( 0, 10, 5 );
```



> ### setRotation

```js
setRotation( x, y, z, order='XYZ' )
```

Method. Sets the orientation of a robot defined by [Euler angles](https://threejs.org/docs/#api/en/math/Euler)
(`x,y,z`) and optional `order` of rotations.

Example:

```js
robot.setRotation( 0, Math.PI/2, 0 );
```



> ### getAngle

```js
getAngle( index )
```

Method. Gets the angle of the `index`-th motor. If such motor does not exist,
the result is 0. Use [`getAngles`](#getangles) to get all angles at once.

Example:

```js
a = robot.getAngle( 1 );
```



> ### setAngle

```js
setAngle( index, angle )
```

Method. Sets the `angle` of the `index`-th motor. If such motor does not exist
or if the `angle` is `null`, the operation is ignored. Use
[`setAngles`](#setangles) to set all angles at once.

Example:

```js
robot.setAngle( 1, Math.PI );
```



### getAngles

```js
getAngles( )
```

Method. Gets an array with angles of all motors. Use [`getAngle`](#getangle) to
get an individual angle.

Example:

```js
a = robot.getAngles( );
```



### setAngles

```js
setAngles( angle1, angle2, ... )
```

Method. Sets the angles `angle1`, `angle2`, ... of all motors. If a value of
some angle is `null`, then the corresponding motor's angle is unchanged. Use
[`setAngle`](#setangle) to set an individual angle.

Example:

```js
robot.setAngles( Math.PI, 0, -Math.PI/2 );
```




# Part API

> ### Part

Base class. Defines the core functionality of a robot part. Parts used in robots
are extensions of this base class. Each part may have slots where other parts
can be attached. [Motors](#motor-api) and [sensors](#sensor-api) are parts too.
The base class part is invisible and has no 3D shape. 



> ### addSlot

```js
addSlot( x, y, z )
```

Method. Adds a new [slot](#slot-api) to a robot part. The slot is at coordinates
(`x,y,z`) relative to the part. To rotate a slot use its method
[`setRotation`](#setrotation-1).

Example:

```js
part.addSlot( 2, 0, 1 );
```



> ### attachToSlot

```js
attachToSlot( parent )
attachToSlot( parent, slot=0 )
```

Method. Attaches the part to a `slot` of the `parent` part. The `slot` can be
a number for the slot index or a [`Slot`](#slot) object. If no slot is given,
the part is attached to the first slot of the parent. If the parent has no  slots, the the part is attached to the parent itself.

Example:

```js
partB.attachToSlot( partA );
partB.attachToSlot( partA, 2 );
partB.attachToSlot( partA, new Prosthetic.Slot(0,3,0) );
```



### beginContact

```js
beginContact( otherPart )
```

Method. This method is automatically called when the physics engine detects a
contact of this part with another part. The other part is passed as
`otherObject` parameter. The `beginContect` method is used to define a reaction
on collision of parts.

Example:

```js
class MyPart extends Part
{
	beginContact( otherPart )
	{
		// reaction of contact
	}
}
```



### endContact

```js
endContact( otherPart )
```

Method. This method is automatically called when the physics engine detects a
lost of contact of this part with another part. The other part is passed as
`otherObject` parameter. The `endContect` method is to define a reaction when
a part parts away from another part.

Example:

```js
class MyPart extends Part
{
	endContact( otherPart )
	{
		// reaction of lost contact
	}
}
```



> ### setPosition

```js
setPosition( position )
setPosition( x, y, z )
```

Method. Sets the position of a part to `position` which is a list of 
coordinates (`x,y,z`). The position can also be provided as three individual
values. The position is relative to the part's parent. The method `setPosition`
is used to manually set the position of a part. When a part is attached to a
slot, it assumes its position. If a part is not attached, then its position is
in the 3D scene.

Example:

```js
position = [0, 10, 5];
part.setPosition( position );

part.setPosition( 0, 10, 5 );
```


> ### setRotation

```js
setRotation( x, y, z, order='XYZ' )
```

Method. Sets the orientation of a part to [Euler angles](https://threejs.org/docs/#api/en/math/Euler)
(`x,y,z`) and `order` of rotations. The rotation is relative to the part's parent.
The method `setRotation` is used to manually set the orientation
of a part. When a part is attached to a slot, it assumes its orientation. If a part
is not attached, then its orientation is in the 3D scene.

Example:

```js
part.setRotation( 0, Math.PI/2, 0 );
```


# Motor API

Motors are [parts](#part-api) that can rotate around a predefined axis and have
DOF=1. Several motors can be attached in a row in order to achieve complex
rotation and higher DOF. As motors are parts, all methods of parts are available
for motors too. 

Source code: [src/motor.js](https://github.com/boytchev/virtual-prosthetics/blob/main/src/motor.js)


> ### Motor

```js
new Motor( axis, min=-Infinity, max=Infinity, def=0 )
```

Base class. Defines the overall functionality of a motor. User-defined motors
are classes that extends this base class. Each motor has one `axis` of rotation,
one of the strings `'x'`, `'y'` or `'z'`. The range of rotation is bound by
`min` and `max`, and the default angle is `def`. The base motor has no image.



> ### getAngle

```js
getAngle( )
```

Method. Gets the angle of a motor.

Example:

```js
a = motor.getAngle( );
```



> ### setAngle

```js
setAngle( angle )
```

Method. Sets the motor's `angle`. If `angle` is `null`, the operation is ignored.

Example:

```js
motor.setAngle( Math.PI );
```



# Slot API 

A slot is a place on a robot part where another part can be attach. The
orientation of the slot affects the orientation of the attached part. Several
parts can be attached to one slot.

Source code: [src/slot.js](https://github.com/boytchev/virtual-prosthetics/blob/main/src/slot.js)


> ### Slot

```js
Slot( )
Slot( position )
Slot( x, y, z )
```

Class. Defines a slot at a given `position` which is a list of coordinates
(`x,y,z`). The position can also be provided as three individual values. These
coordinates are relative to the robot part to which the slot is added with
[`addSlot`](#addslot). If no position is provided, the slot is created at (0,0,0).

Example:

```js
slot = new Prosthetic.Slot( );

position = [0, 4, 1];
slot = new Prosthetic.Slot( position );

slot = new Prosthetic.Slot( 0, 4, 1 );
```


> ### setPosition

```js
setPosition( position )
setPosition( x, y, z )
```

Method. Sets the slot's `position` which is a list of coordinates (`x,y,z`). The
position can also be provided as three individual values. 

Example:

```js
position = [0, 10, 5];
slot.setPosition( position );

slot.setPosition( 0, 10, 5 );
```


> ### setRotation

```js
setRotation( x, y, z, order='XYZ' );
```

Method. Sets the orientation of a slot to [Euler angles](https://threejs.org/docs/#api/en/math/Euler)
(`x,y,z`) and `order` of rotations. The orientation is relative to the robot
part of the slot.


Example:

```js
slot.setRotation( 0, Math.PI/2, 0 );
```



# Sensor API

A sensor is a robot part that measures some property and returns its value as a
feedback. Sensors are attached to slots (with [`attachToSlot`](#attachtoslot))
and use their position and orientation. Sensors are also robot parts so they
have their methods like [`setPosition`](#setposition) and [`setRotation`](#setrotation).


Source code: [src/sensor.js](https://github.com/boytchev/virtual-prosthetics/blob/main/src/sensor.js),
[src/laser.js](https://github.com/boytchev/virtual-prosthetics/blob/main/src/laser.js)
and [src/textures.js](https://github.com/boytchev/virtual-prosthetics/blob/main/src/textures.js)


> ### Sensor

```js
Sensor( visible=true, laserColor )
```

Class. Defines a sensor. If `visible` is true, the sensor pad is drawn,
otherwise the sensor is invisible, but still functional. If present, `laserColor`
defines the color of a laser beam, emitted by the sesonsor. The value of
`laserColor` is [color name](https://www.w3schools.com/tags/ref_colornames.asp), 
[Three.js Color](https://threejs.org/docs/#api/en/math/Color) or just `true`
for a default crimson color.
 

<img src="images/sensor.png">

Example:

```js
sensor = new Prosthetic.Sensor( );
```


> ### senseDistance

```js
senseDistance( )
```

Method. Gets the distance from the sensor position to the nearest object
(including the ground) along the direction of the sensor. If there is no object,
the result is `Infinity`. The minimal sensed distance is 0.05, which is the sizes
of the sensor pad.

<img src="images/senseDistance.png">

Example:

```js
dist = sensor.senseDistance( );
```



> ### senseTouch

```js
senseTouch( )
```

Method. Gets the close-up distance from the sensor position to the nearest
object (including the ground) along the direction of the sensor. Touching is
similar to sensing distance, but it only senses distances from 0 to 0.05, i.e.
inside the sensor pad. The returned value is a number from 0 to 1 indicating the
level of touching, i.e. 0 means no touching, 1 means complete touching. If there
is no object that close, the result is 0.

<img src="images/senseTouch.png">

Example:

```js
touch = sensor.senseTouch( );
```



> ### sensePosition

```js
sensePosition( )
```

Method. Gets the 3D position of the sensor as an array of [`x,y,z`] coordinates.

<img src="images/sensePosition.png">

Example:

```js
pos = sensor.sensePosition( );
```



> ### senseCollision

```js
senseCollision( )
```

Method. Returns `true` when the part containing the sensor collides (or
intersects) another part or the ground, otherwise returns `false`. Collision
sensing relies on the physics engine and is aware of only those parts, that are
defined as physical parts.

<img src="images/senseCollision.png">

Example:

```js
if( sensor.senseCollision( ) )
{
   ...
}
```



> ### senseObjects

```js
senseObjects( )
```

Method. Returns a list of all parts that collide (or intersects) with the part,
containing the sensor. Sensing objects relies on the physics engine and is aware
of only those parts, that are defined as physical parts.

Example:

```js
objects = sensor.senseObjects( );
```


> ### senseObject

```js
senseObject( otherObject )
```

Method. Returns `true` when the part containing the sensor collides (or
intersects) the `otherObject`, otherwise returns `false`. Sensing objects relies
on the physics engine and is aware of only those parts, that are defined as
physical parts.

Example:

```js
if( sensor.senseObject( ball ) )
{
   ...
}
```
