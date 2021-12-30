#!/bin/bash
# Install NodeJS (on Windows, Linux or Mac) 
npm install
npm i -g nodemon
npm install -g "@angular/cli"
cd editorClient
npm install
cd ..
./startMSE.sh # permission for executing startMSE.sh
# https://hostname:4200/ (Multi-Script Editor)