### Server-Deploy : Heroku
cd /Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor_server
curl https://cli-assets.heroku.com/install.sh | sh
heroku login
git init
heroku git:remote -a worldscriptsexplorer
git add .
git commit -am "*-WSEv1"
git push heroku master

### Client-Deploy : Firebase
cd /Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/editorClient
sudo npm install -g firebase-tools
firebase login
firebase init
ng build --prod --build-optimizer
firebase deploy