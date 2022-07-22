#!/bin/sh

### Server-Deploy : Heroku
### Manual Deployment - Remove SSL instances in tasks.js before deployment
cd /Users/yshant/Documents/MSE_server_deploy
cp ./routes/environments/sva_config_prod.json ./routes/environments/sva_config.json
cp ./routes/environments/sva_config_prod.properties ./routes/environments/sva_config.properties
curl https://cli-assets.heroku.com/install.sh | sh # ONLY first time
heroku login # ONLY first time
git init # ONLY first time
heroku git:remote -a worldscriptsexplorer
git add .
git commit -am "*-WSEv1"
git push heroku master
## Currently using Manual Github Integration Deploy : https://dashboard.heroku.com/apps/worldscriptsexplorer/deploy/github

# Python and Pip package setup on Heroku  ### ONLY first time
cat /etc/os-release
curl -o get-pip.py https://bootstrap.pypa.io/get-pip.py
python get-pip.py
wget http://archive.ubuntu.com/ubuntu/pool/universe/p/python-pip/python3-pip_20.0.2-5ubuntu1_all.deb
dpkg -i python3-pip_20.0.2-5ubuntu1_all.deb
apt-get install -f ./python3-pip_20.0.2-5ubuntu1_all.deb

### Client-Deploy - Firebase Deploy https://console.firebase.google.com/u/0/project/worldscriptsexplorer/hosting/sites
cd /Users/yshant/Documents/GitHub/multiscripteditor/editorClient
sudo npm install -g firebase-tools # ONLY first time
firebase login # ONLY first time
firebase init # ONLY first time
firebase deploy # ONLY first time
cp ./src/assets/environments/sva_config_prod.json ./src/assets/environments/sva_config.json && ng build --prod --build-optimizer && firebase deploy --project worldscriptsexplorer
cp ./src/assets/environments/sva_config_calc.json ./src/assets/environments/sva_config.json && ng build --prod --build-optimizer && firebase deploy --project worldscriptscalculator


### Update Process
git stash save --include-untracked
git stash
ng update @angular/core@12 @angular/cli@12 --allow-dirty
git stash pop
