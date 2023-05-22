@echo off
call :optimize phalange11x3, 2
call :optimize phalange10x3, 2
call :optimize phalange8x3, 2
call :optimize phalange5x3, 2
call :optimize endPhalange5x3, 2

echo.
pause
exit /b 0

:optimize
	echo.
	echo Optimizing file %~1.glb
	call gltf-transform weld %~1.glb step1.glb --tolerance 0.1
	for /L %%a in (1,1,%~2) do (
		call gltf-transform simplify step1.glb step2.glb --ratio 0.2 --error 0.0001
		call gltf-transform simplify step2.glb step1.glb --ratio 0.2 --error 0.0001
	)
	call gltf-transform weld step1.glb step2.glb --tolerance 0.1
	copy step2.glb ..\%~1.glb /b/v/y
	
	del step1.glb
	del step2.glb
exit /b 0

