#!/bin/bash
# Install NodeJS (on Windows, Linux or Mac) 14.15 - https://nodejs.org/download/release/v14.15.0/
npm install
sudo npm i -g nodemon

# AngularJS 11.x
cd editorClient
sudo npm install -g "@angular/cli" 
npm install
cd ..

# Python 3.4 and above is installed
pip install easyocr
pip install gibberish_detector
pip install stanza
# To Fix - <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1049)>
# Open or Double-Click /Applications/Python 3.x/Install Certificates.command && /Applications/Python 3.x/Update Shell Profile.command

./startMSE.sh # permission for executing startMSE.sh

# open https://$HOSTNAME:4200/ (Multi-Script Editor)
