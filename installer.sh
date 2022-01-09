#!/bin/bash
# Install NodeJS (on Windows, Linux or Mac) 14.15 - https://nodejs.org/download/release/v14.15.0/
npm install
sudo npm i -g nodemon
cd editorClient
# AngularJS 11.x
sudo npm install -g "@angular/cli" 
npm install
cd ..
./startMSE.sh # permission for executing startMSE.sh
# https://$HOSTNAME:4200/ (Multi-Script Editor)
