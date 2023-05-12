call :optimize phalange10x3, 2
call :optimize phalange5x3, 2
pause
exit /b 0

:optimize
	@call gltf-transform weld %~1.glb step1.glb
	for /L %%a in (1,1,%~2) do (
		@call gltf-transform simplify step1.glb step2.glb --ratio 0.1 --error 0.001
		@call gltf-transform simplify step2.glb step1.glb --ratio 0.1 --error 0.001
	)
	@del %~1.min.glb
	@copy step1.glb %~1.min.glb
	
	del step1.glb
	del step2.glb
exit /b 0

