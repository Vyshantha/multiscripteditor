#!/bin/sh

### Server-Deploy : Heroku
### Remove/Comment out all SSL instances & NODE_TLS_REJECT_UNAUTHORIZED in tasks.js before deployment
cd /Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor_server
cp ./routes/environments/sva_config_prod.json ./routes/environments/sva_config.json
cp ./routes/environments/sva_config_prod.properties ./routes/environments/sva_config.properties
curl https://cli-assets.heroku.com/install.sh | sh
heroku login
git init
heroku git:remote -a worldscriptsexplorer
git add .
git commit -am "*-WSEv1"
git push heroku master

### Client-Deploy : Firebase
cd /Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/editorClient
cp ./editorClient/src/assets/environments/sva_config_prod.json ./editorClient/src/assets/environments/sva_config.json
sudo npm install -g firebase-tools
firebase login
firebase init
ng build --prod --build-optimizer
firebase deploy
