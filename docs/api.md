# Virtual prosthetics API

The Virtual Prosthetics library provides an API for all its
functionalily.

All times are in seconds.
All sizes are in meters.
All angles are in radians.
All indices start from 0.

* **[Scene](#scene)**
	* [setAnimation](#setanimation)
	* [setCameraPosition](#setcameraposition)
* **[Robot construction](#robot-construction)**
	* [Robot](#robot)
	* [addChain](#addchain)
	* [getPosition](#getposition), [setPosition](#setposition)
* **[Robot control](#robot-control)**
	* [getAngle](#getangle), [setAngle](#setangle), [getAngles](#getangles), [setAngles](#setangles)
	* [getParts](#getparts), [getMotors](#getmotors), [getDOF](#getdof)

# Scene

The Virtual Prosthetics library automatically creates a 3D
scene that will hold all created prosthetic devices.

### setAnimation

```js
setAnimation( func, fps )
```

Function. Defines a custom function `func` that is called
`fps` times per second. The function has two parameters:
* `time` elapsed time since the start of the library
* `dTime` elapsed time since the previous frame

By default `fps` (frame per seconds) is set to 30. Higher
`fps` produces smoother motion, but consumes more power. The
maximal value for `fps` is controlled by the browser and is
usually 60 or above.

Example:

```js
Prosthetic.setAnimation( loop, 60 );

function loop( t, dT )
{
	// changing devices postures
};
```


### setCameraPosition

```js
setCameraPosition( x, y, z );
```

Method. Moves the camera to coordinates (`x`,`y`,`z`).

Example:

```js
setCameraPosition( 10, 2, 0 );
```



# Robot Construction

### Robot

Base class. Defines the overall functionality of a robot. A
custom robot is a class that extends this base class.

Example:

```js
class MyRobot extends Prosthetic.Robot
{
	constructor( )
	{
		super( );

		// defining robot parts
		// joining robot parts
	}
}
```


### addChain

```js
addChain( part1, part2, ... );
```

Method. Used in the constructor of a custom robot to
automatically connect parts `part1`, `part2` and so on in
a chain. The variable `this` can be used to mark the robot
itself. If `this` is used in `addChain` it must be the first
parameter. At least one of the chains in a robot mst start
with `this`, otherwise robot parts will stay invisible.


Example:

```js
class MyRobot extends Prosthetic.Robot
{
	constructor( )
	{
		super( );

		this.partA = ...;
		this.partB = ...;
		
		this.addChain( this, this.partA, this.partB );
	}
}
```

Adding a chain always attaches parts to slot 0. If another
slot or a custom position is needed, use [`attachTo`](#attachto) and [`attachToPosition`](#attachtoposition) methods of the
robot parts. 


### getPosition

```js
getPosition( );
```

Method. Gets the position of a robot as an array of [x, y, z]
coordinates.

Example:

```js
pos = robot.getPosition( );
```



### setPosition

```js
setPosition( x, y, z );
```

Method. Sets the position of a robot to `[x,y,z]`. If the
coordinates are not provided, the robot is removed from the
scene, but it is not deleted. The default position of a
robot is [0,0,0].

Example:

```js
robot.setPosition( 0, 10, 5 );
```



# Robot control


### getAngle

```js
getAngle( index );
```

Method. Gets the angle of the `index`-th motor. If such
motor does not exist, the result is 0.

Example:

```js
a = robot.getAngle( 1 );
```



### setAngle

```js
setAngle( index, angle );
```

Method. Sets the `angle` of the `index`-th motor. If such
motor does not exist or if the `angle` is `null`, the
operation is ignored.

Example:

```js
robot.setAngle( 1, Math.PI );
```



### getAngles

```js
getAngles( );
```

Method. Gets an array with angles of all motors.

Example:

```js
a = robot.getAngles( );
```



### setAngles

```js
setAngles( angle1, angle2, ... );
```

Method. Sets the angles of all motors. `angles` is an array
of the angles. If a value of some angle is `null`, then the
corresponding motor's angle is unchanged.

Example:

```js
robot.setAngles( Math.PI, 0, -Math.PI/2 );
```



### getParts

```js
getParts( );
```

Method. Gets an array of all robot parts, including motors.

Example:

```js
parts = robot.getParts( );
```



### getMotors

```js
getMotors( );
```

Method. Gets an array of all robot motors. 

Example:

```js
motors = robot.getMotors( );
```



### getDOF

```js
getDOF( );
```

Method. Gets the overall degree of freedom (DOF) in a robot.
The DOF is effectively equal to the number of motors.

Example:

```js
dof = robot.getDOF( );
```



