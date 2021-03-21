#!/bin/bash
# Install NodeJS (on Windows, Linux or Mac) 
npm install
npm i -g nodemon
npm install -g "@angular/cli"
cd client/
npm install
cd ..
./startSVA.sh # permission for executing startSVA.sh or startSVA.bat
# http://hostname:4200/sva (Soil Viewer)

# Add new / edit existing Soil Fact-sheet
# Token-based authentication
# Publically accessible URL
# Print solution
# Make "District" logic dynamic in list view