# Virtual prosthetics API

The Virtual Prosthetics library provides an API for all its
functionalily.

All times are in seconds.
All sizes are in meters.
All angles are in radians.
All indices start from 0.

* Scene
	* [setAnimation](#setanimation)
	* [setCameraPosition](#setcameraposition)
* Robot
	* [Robot](#robot)
	* [getPosition](#getposition), [setPosition](#setposition)
	* [getAngle](#getangle), [setAngle](#setangle), [getAngles](#getangles), [setAngles](#setangles)
	* [getParts](#getparts), [getMotors](#getmotors), [getDOF](#getdof)
	* [chain](#chain)

# Scene

The Virtual Prosthetics library automatically creates a 3D
scene that will hold all created prosthetic devices.

## setAnimation

```js
setAnimation( func, fps )
```

Function. Defines a custom function `func` that is called
*fps* times per second. `function` may have two parameters:
* `time` elapsed time since the start of the library
* `dTime` elapsed time since the previous frame

By default FPS (frame per seconds) is set to 30. Higher `fps` 
produces smoother motion, but consumes more power. The maximal
value for `fps` is controlled by the browser.

Example:

```js
Prosthetic.setAnimation( loop, 60 );

function loop( t, dT )
{
	// setting robot posture
};
```


### setCameraPosition

```js
setCameraPosition( x, y, z );
```

Method. Sets the position of the camera to `[x,y,z]`.

Example:

```js
setCameraPosition( 10, 2, 0 );
```



## Robot

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



### getPosition

```js
getPosition( );
```

Function. Gets the position of a robot as an array of
[x,y,z] coordinates.

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



### getAngle

```js
getAngle( index );
```

Function. Gets the angle of the `index`-th motor. If such
motor does not exist, the result is 0.

Example:

```js
a = robot.getAngle( 1 );
```



### setAngle

```js
setAngle( index, angle );
```

Method. Sets the angle of the `index`-th motor. If such
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

Function. Gets an array with angles of all motors.

Example:

```js
a = robot.getAngles( );
```



### setAngles

```js
setAngles( angles );
```

Method. Sets the angles of all motors. `angles` is an array
of the angles. If a value in `angles` is null, the corresponding
motor is unchanged.

Example:

```js
robot.setAngles( [Math.PI, 0, -Math.PI/2] );
```



### getParts

```js
getParts( );
```

Function. Gets an array of all robot parts, including motors.
Each element of the array is *[name, part]*, where *name* is
the internal name of the *part*.

Example:

```js
parts = robot.getParts( );
```



### getMotors

```js
getMotors( );
```

Function. Gets an array of all robot motors. Each element of
the array is *[name, motor]*, where *name* is the internal name
of the *motor*.

Example:

```js
motors = robot.getMotors( );
```



### getDOF

```js
getDOF( );
```

Function. Gets the degree of freedom (DOF) in a robot. The
DOF is effectively equal to the number of motors.

Example:

```js
dof = robot.getDOF( );
```



### chain

```js
chain( part1, part2, ... );
```

Method. Used in the constructor of a custom robot to
automatically connect parts *part1*, *part2* and so on in
a chain. The variable `this` can be used to mark the robot
itself. If `this` is used in `chain` it must be the first
parameter.


Example:

```js
class MyRobot extends Prosthetic.Robot
{
	constructor( )
	{
		super( );

		this.partA = ...;
		this.partB = ...;
		
		this.chain( this, this.partA, this.partB );
	}
}
```
