call rollup src\virtual-prosthetics.js --file build\bundle.js  --validate

misc\jsmin\jsmin <build\bundle.js >build\virtual-prosthetics.js "Virtual Prosthetics (+ Three.js + Cannon-ES.js)"

del build\bundle.js

pause
