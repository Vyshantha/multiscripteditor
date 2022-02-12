#!/bin/sh

### Server-Deploy : Heroku
### Push - Github Integration Deploy https://dashboard.heroku.com/apps/worldscriptsexplorer/deploy/github
### Manual Deployment - Remove SSL instances in tasks.js before deployment
cd /Users/yshant/Documents/MSE_server_deploy
cp ./routes/environments/sva_config_prod.json ./routes/environments/sva_config.json
cp ./routes/environments/sva_config_prod.properties ./routes/environments/sva_config.properties
curl https://cli-assets.heroku.com/install.sh | sh
heroku login
git init
heroku git:remote -a worldscriptsexplorer
git add .
git commit -am "*-WSEv1"
git push heroku master

### Client-Deploy - Firebase Deploy https://console.firebase.google.com/u/0/project/worldscriptsexplorer/hosting/sites
cd /Users/yshant/Documents/GitHub/multiscripteditor/editorClient
cp ./editorClient/src/assets/environments/sva_config_prod.json ./editorClient/src/assets/environments/sva_config.json
sudo npm install -g firebase-tools
firebase login
firebase init
ng build --prod --build-optimizer
firebase deploy --project worldscriptsexplorer
