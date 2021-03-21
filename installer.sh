#!/bin/bash
# Install NodeJS (on Windows, Linux or Mac) 
npm install
npm i -g nodemon
npm install -g "@angular/cli"
cd editorClient
npm install
cd ..
./startSVA.sh # permission for executing startSVA.sh or startSVA.bat
# http://hostname:4200/sva (Soil Viewer)