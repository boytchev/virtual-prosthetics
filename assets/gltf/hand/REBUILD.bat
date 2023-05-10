call gltf-transform weld phalange4x1.glb step1.glb
call gltf-transform simplify step1.glb step2.glb
call gltf-transform simplify step2.glb step1.glb
call gltf-transform simplify step1.glb step2.glb
call gltf-transform simplify step2.glb step1.glb
call gltf-transform simplify step1.glb phalange4x1.min.glb

del step1.glb
del step2.glb

