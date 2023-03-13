call rollup src\virtual-prosthetics.js --file build\bundle.js --validate

misc\jsmin\jsmin <build\bundle.js >build\bundle.min.js

REM IMPORTANT: Between "echo " and "//" there are invisible
REM characters for UTF-8 BOM. If you delete these characters,
REM they can be recovered in this way:
REM		1. type EF BB BF between "echo " and "//"
REM		2. use NotePad++ 
REM		3. select EF BB BF
REM		4. Plugins|Convert| HEX to ASCI
REM		5. the text EF BB BF collapses into invisible
REM			characters alternative: the same chars are
REM			between these quotes:    "﻿"

echo ﻿// Virtual Prosthetics >build\prefix.js
copy /b build\prefix.js+build\bundle.min.js build\virtual-prosthetics.js

del build\bundle.js
del build\bundle.min.js
del build\prefix.js
